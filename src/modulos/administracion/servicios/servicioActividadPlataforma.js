import {
  collection,
  doc,
  getDocsFromServer,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import {
  asegurarFirebaseConfigurado,
  firebaseDb,
} from '../../autenticacion/servicios/clienteFirebase.js'

const PLATFORM_ACTIVITY_COLLECTION = 'platformActivity'
const DEFAULT_ACTIVITY_LIMIT = 20

function obtenerColeccionActividad() {
  asegurarFirebaseConfigurado()
  return collection(firebaseDb, PLATFORM_ACTIVITY_COLLECTION)
}

function sanearTexto(value = '') {
  return typeof value === 'string' ? value.trim() : ''
}

function normalizarTimestamp(value) {
  if (!value) {
    return null
  }

  if (typeof value?.toDate === 'function') {
    return value.toDate().toISOString()
  }

  return typeof value === 'string' ? value : null
}

function serializarEventoActividad(entry, actor = null) {
  const actorId = actor?.id ?? entry?.userId ?? ''

  return {
    id: entry.id,
    type: entry.type,
    timestamp: serverTimestamp(),
    userId: actorId,
    targetUserId: entry.targetUserId ?? null,
    courseId: entry.courseId ?? null,
    unitId: entry.unitId ?? null,
    lessonId: entry.lessonId ?? null,
    assessmentId: entry.assessmentId ?? null,
    recommendedCourseId: entry.recommendedCourseId ?? null,
    status: entry.status ?? null,
    systemRole: entry.systemRole ?? actor?.systemRole ?? null,
    provider: entry.provider ?? actor?.provider ?? null,
    actor: actorId
      ? {
          id: actorId,
          email: sanearTexto(actor?.email),
          name: sanearTexto(actor?.name),
          systemRole: actor?.systemRole ?? 'student',
        }
      : null,
  }
}

export async function registrarEventoPlataforma(entry, actor = null) {
  if (!entry?.id || !entry?.type) {
    return
  }

  const reference = doc(obtenerColeccionActividad(), entry.id)
  await setDoc(reference, serializarEventoActividad(entry, actor))
}

export function suscribirActividadPlataforma(onChange, onError, { limitCount = DEFAULT_ACTIVITY_LIMIT } = {}) {
  const activityQuery = query(
    obtenerColeccionActividad(),
    orderBy('timestamp', 'desc'),
    limit(limitCount),
  )

  return onSnapshot(
    activityQuery,
    (snapshot) => {
      onChange(
        snapshot.docs.map((eventDoc) => {
          const data = eventDoc.data()

          return {
            id: eventDoc.id,
            ...data,
            timestamp: normalizarTimestamp(data.timestamp) ?? new Date().toISOString(),
          }
        }),
      )
    },
    onError,
  )
}

export async function obtenerActividadPlataformaDesdeServidor({
  limitCount = DEFAULT_ACTIVITY_LIMIT,
} = {}) {
  const activityQuery = query(
    obtenerColeccionActividad(),
    orderBy('timestamp', 'desc'),
    limit(limitCount),
  )
  const snapshot = await getDocsFromServer(activityQuery)

  return snapshot.docs.map((eventDoc) => {
    const data = eventDoc.data()

    return {
      id: eventDoc.id,
      ...data,
      timestamp: normalizarTimestamp(data.timestamp) ?? new Date().toISOString(),
    }
  })
}
