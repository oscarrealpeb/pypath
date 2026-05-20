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

function sanearListaIds(items = []) {
  return Array.from(
    new Set(
      (Array.isArray(items) ? items : [])
        .filter((item) => typeof item === 'string')
        .map((item) => item.trim())
        .filter(Boolean),
    ),
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

function preferirEntradaCurso(courseId, defaultCourse, persistedCourse, managedCourseIds) {
  if (!defaultCourse) {
    return persistedCourse ?? null
  }

  if (!persistedCourse) {
    return defaultCourse
  }

  if (managedCourseIds.has(courseId)) {
    return persistedCourse
  }

  return preferirCursoMasCompleto(defaultCourse, persistedCourse)
}

function preferirEntradaSimple(courseId, defaultEntry, persistedEntry, managedCourseIds, sourceById) {
  if (!defaultEntry) {
    return persistedEntry ?? null
  }

  if (!persistedEntry) {
    return defaultEntry
  }

  if (managedCourseIds.has(courseId)) {
    return persistedEntry
  }

  return sourceById.get(courseId) === 'default' ? defaultEntry : persistedEntry
}

function resolverCursos(
  defaultCourses = [],
  persistedCourses = [],
  managedCourseIds = new Set(),
  deletedCourseIds = new Set(),
) {
  const defaultById = indexarPorId(defaultCourses)
  const persistedById = indexarPorId(persistedCourses)
  const allIds = new Set([...defaultById.keys(), ...persistedById.keys()])
  const sourceById = new Map()

  const courses = Array.from(allIds).flatMap((courseId) => {
    if (deletedCourseIds.has(courseId)) {
      return []
    }

    const defaultCourse = defaultById.get(courseId)
    const persistedCourse = persistedById.get(courseId)
    const resolvedCourse = preferirEntradaCurso(
      courseId,
      defaultCourse,
      persistedCourse,
      managedCourseIds,
    )

    if (!resolvedCourse) {
      return []
    }

    sourceById.set(courseId, resolvedCourse === defaultCourse ? 'default' : 'persisted')
    return [resolvedCourse]
  })

  return { courses, sourceById }
}

function fusionarCatalogo(
  defaultCatalog = [],
  persistedCatalog = [],
  sourceById = new Map(),
  managedCourseIds = new Set(),
  deletedCourseIds = new Set(),
) {
  const defaultById = indexarPorId(defaultCatalog)
  const persistedById = indexarPorId(persistedCatalog)
  const allIds = new Set([...defaultById.keys(), ...persistedById.keys()])

  return Array.from(allIds).flatMap((courseId) => {
    if (deletedCourseIds.has(courseId)) {
      return []
    }

    const defaultMeta = defaultById.get(courseId)
    const persistedMeta = persistedById.get(courseId)
    const resolvedMeta = preferirEntradaSimple(
      courseId,
      defaultMeta,
      persistedMeta,
      managedCourseIds,
      sourceById,
    )

    return resolvedMeta ? [resolvedMeta] : []
  })
}

function fusionarEvaluaciones(
  defaultAssessments = {},
  persistedAssessments = {},
  sourceById = new Map(),
  managedCourseIds = new Set(),
  deletedCourseIds = new Set(),
) {
  const allIds = new Set([
    ...Object.keys(defaultAssessments ?? {}),
    ...Object.keys(persistedAssessments ?? {}),
  ])

  return Array.from(allIds).reduce((accumulator, courseId) => {
    if (deletedCourseIds.has(courseId)) {
      return accumulator
    }

    const defaultEntry = defaultAssessments?.[courseId]
    const persistedEntry = persistedAssessments?.[courseId]
    const resolvedEntry = preferirEntradaSimple(
      courseId,
      defaultEntry,
      persistedEntry,
      managedCourseIds,
      sourceById,
    )

    if (resolvedEntry) {
      accumulator[courseId] = resolvedEntry
    }

    return accumulator
  }, {})
}

export function normalizarContenidoPersistido(content) {
  const initialContent = crearContenidoInicial()
  const managedCourseIds = sanearListaIds(content?.cursosGestionadosCms)
  const managedCatalogIds = sanearListaIds(content?.catalogosGestionadosCms)
  const managedEvaluationIds = sanearListaIds(content?.evaluacionesGestionadasCms)
  const managedCourseIdSet = new Set(managedCourseIds)
  const managedCatalogIdSet = new Set(managedCatalogIds)
  const managedEvaluationIdSet = new Set(managedEvaluationIds)
  const deletedCourseIds = sanearListaIds(content?.cursosEliminadosCms).filter(
    (courseId) =>
      !managedCourseIdSet.has(courseId) &&
      !managedCatalogIdSet.has(courseId) &&
      !managedEvaluationIdSet.has(courseId),
  )
  const deletedCourseIdSet = new Set(deletedCourseIds)
  const { courses: cursos, sourceById } = resolverCursos(
    initialContent.cursos,
    Array.isArray(content?.cursos) ? content.cursos : [],
    managedCourseIdSet,
    deletedCourseIdSet,
  )
  const catalogoCursos = fusionarCatalogo(
    initialContent.catalogoCursos,
    Array.isArray(content?.catalogoCursos) ? content.catalogoCursos : [],
    sourceById,
    managedCatalogIdSet,
    deletedCourseIdSet,
  )
  const evaluacionesCursos = fusionarEvaluaciones(
    initialContent.evaluacionesCursos,
    content?.evaluacionesCursos && typeof content.evaluacionesCursos === 'object'
      ? content.evaluacionesCursos
      : {},
    sourceById,
    managedEvaluationIdSet,
    deletedCourseIdSet,
  )

  return {
    ...initialContent,
    ...(content ?? {}),
    cursos,
    catalogoCursos,
    evaluacionesCursos,
    cursosGestionadosCms: managedCourseIds,
    catalogosGestionadosCms: managedCatalogIds,
    evaluacionesGestionadasCms: managedEvaluationIds,
    cursosEliminadosCms: deletedCourseIds,
    // Los borradores por codigo siempre salen del repo para mantener compatibilidad con la plantilla.
    cursosBorrador: initialContent.cursosBorrador,
  }
}

export function serializarContenidoPersistible(content) {
  const normalizedContent = normalizarContenidoPersistido(content)
  const managedCourseIdSet = new Set(normalizedContent.cursosGestionadosCms)
  const managedCatalogIdSet = new Set(normalizedContent.catalogosGestionadosCms)
  const managedEvaluationIdSet = new Set(normalizedContent.evaluacionesGestionadasCms)
  const evaluacionesCursos = Object.fromEntries(
    Object.entries(normalizedContent.evaluacionesCursos).filter(([courseId]) =>
      managedEvaluationIdSet.has(courseId),
    ),
  )

  return {
    cursos: normalizedContent.cursos.filter((course) => managedCourseIdSet.has(course.id)),
    catalogoCursos: normalizedContent.catalogoCursos.filter((course) =>
      managedCatalogIdSet.has(course.id),
    ),
    evaluacionesCursos,
    cursosGestionadosCms: normalizedContent.cursosGestionadosCms,
    catalogosGestionadosCms: normalizedContent.catalogosGestionadosCms,
    evaluacionesGestionadasCms: normalizedContent.evaluacionesGestionadasCms,
    cursosEliminadosCms: normalizedContent.cursosEliminadosCms,
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
