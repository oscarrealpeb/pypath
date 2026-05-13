import { doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore'
import { asegurarFirebaseConfigurado, firebaseDb } from '../../autenticacion/servicios/clienteFirebase.js'
import { crearContenidoInicial } from './repositorioContenido.js'

const CONTENT_COLLECTION = 'platform'
const CONTENT_DOCUMENT = 'content-cms'

function obtenerReferenciaContenido() {
  asegurarFirebaseConfigurado()
  return doc(firebaseDb, CONTENT_COLLECTION, CONTENT_DOCUMENT)
}

function contarLecciones(course) {
  return (course?.units ?? []).reduce(
    (total, unit) => total + (Array.isArray(unit?.lessons) ? unit.lessons.length : 0),
    0,
  )
}

function indexarPorId(items = []) {
  return new Map(
    items
      .filter((item) => item && typeof item === 'object' && item.id)
      .map((item) => [item.id, item]),
  )
}

function preferirCursoMasCompleto(defaultCourse, persistedCourse) {
  if (!defaultCourse) {
    return persistedCourse ?? null
  }

  if (!persistedCourse) {
    return defaultCourse
  }

  const defaultUnits = Array.isArray(defaultCourse.units) ? defaultCourse.units.length : 0
  const persistedUnits = Array.isArray(persistedCourse.units) ? persistedCourse.units.length : 0
  const defaultLessons = contarLecciones(defaultCourse)
  const persistedLessons = contarLecciones(persistedCourse)

  if (
    defaultUnits > persistedUnits ||
    (defaultUnits === persistedUnits && defaultLessons > persistedLessons)
  ) {
    return defaultCourse
  }

  return persistedCourse
}

function resolverCursos(defaultCourses = [], persistedCourses = []) {
  const defaultById = indexarPorId(defaultCourses)
  const persistedById = indexarPorId(persistedCourses)
  const allIds = new Set([...defaultById.keys(), ...persistedById.keys()])
  const sourceById = new Map()

  const courses = Array.from(allIds).map((courseId) => {
    const defaultCourse = defaultById.get(courseId)
    const persistedCourse = persistedById.get(courseId)
    const resolvedCourse = preferirCursoMasCompleto(defaultCourse, persistedCourse)

    sourceById.set(courseId, resolvedCourse === defaultCourse ? 'default' : 'persisted')
    return resolvedCourse
  })

  return { courses, sourceById }
}

function fusionarCatalogo(defaultCatalog = [], persistedCatalog = [], sourceById = new Map()) {
  const defaultById = indexarPorId(defaultCatalog)
  const persistedById = indexarPorId(persistedCatalog)
  const allIds = new Set([...defaultById.keys(), ...persistedById.keys()])

  return Array.from(allIds).map((courseId) => {
    const defaultMeta = defaultById.get(courseId)
    const persistedMeta = persistedById.get(courseId)

    if (!defaultMeta) {
      return persistedMeta ?? null
    }

    if (!persistedMeta) {
      return defaultMeta
    }

    return sourceById.get(courseId) === 'default' ? defaultMeta : persistedMeta
  })
}

function fusionarEvaluaciones(defaultAssessments = {}, persistedAssessments = {}, sourceById = new Map()) {
  const allIds = new Set([
    ...Object.keys(defaultAssessments ?? {}),
    ...Object.keys(persistedAssessments ?? {}),
  ])

  return Array.from(allIds).reduce((accumulator, courseId) => {
    const defaultEntry = defaultAssessments?.[courseId]
    const persistedEntry = persistedAssessments?.[courseId]

    if (!defaultEntry) {
      accumulator[courseId] = persistedEntry
      return accumulator
    }

    if (!persistedEntry || sourceById.get(courseId) === 'default') {
      accumulator[courseId] = defaultEntry
      return accumulator
    }

    accumulator[courseId] = persistedEntry
    return accumulator
  }, {})
}

export function normalizarContenidoPersistido(content) {
  const initialContent = crearContenidoInicial()
  const { courses: cursos, sourceById } = resolverCursos(
    initialContent.cursos,
    Array.isArray(content?.cursos) ? content.cursos : [],
  )
  const catalogoCursos = fusionarCatalogo(
    initialContent.catalogoCursos,
    Array.isArray(content?.catalogoCursos) ? content.catalogoCursos : [],
    sourceById,
  )
  const evaluacionesCursos = fusionarEvaluaciones(
    initialContent.evaluacionesCursos,
    content?.evaluacionesCursos && typeof content.evaluacionesCursos === 'object'
      ? content.evaluacionesCursos
      : {},
    sourceById,
  )

  return {
    ...initialContent,
    ...(content ?? {}),
    cursos,
    catalogoCursos,
    evaluacionesCursos,
    // Los borradores por codigo siempre salen del repo para mantener compatibilidad con la plantilla.
    cursosBorrador: initialContent.cursosBorrador,
  }
}

export function serializarContenidoPersistible(content) {
  const normalizedContent = normalizarContenidoPersistido(content)

  return {
    cursos: normalizedContent.cursos,
    catalogoCursos: normalizedContent.catalogoCursos,
    evaluacionesCursos: normalizedContent.evaluacionesCursos,
  }
}

export function suscribirContenidoCms(onContentChange, onError) {
  const reference = obtenerReferenciaContenido()

  return onSnapshot(
    reference,
    (snapshot) => {
      const remoteContent = snapshot.data()?.content ?? null
      onContentChange(normalizarContenidoPersistido(remoteContent))
    },
    onError,
  )
}

export async function guardarContenidoCms(content, user = null) {
  const reference = obtenerReferenciaContenido()

  await setDoc(
    reference,
    {
      content: serializarContenidoPersistible(content),
      updatedAt: serverTimestamp(),
      updatedBy: user
        ? {
            id: user.id,
            email: user.email ?? '',
            name: user.name ?? '',
          }
        : null,
    },
    { merge: true },
  )
}
