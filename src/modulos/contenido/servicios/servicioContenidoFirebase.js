import { doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore'
import { asegurarFirebaseConfigurado, firebaseDb } from '../../autenticacion/servicios/clienteFirebase.js'
import { crearContenidoInicial } from './repositorioContenido.js'

const CONTENT_COLLECTION = 'platform'
const CONTENT_DOCUMENT = 'content-cms'

function obtenerReferenciaContenido() {
  asegurarFirebaseConfigurado()
  return doc(firebaseDb, CONTENT_COLLECTION, CONTENT_DOCUMENT)
}

export function normalizarContenidoPersistido(content) {
  const initialContent = crearContenidoInicial()

  return {
    ...initialContent,
    ...(content ?? {}),
    cursos: Array.isArray(content?.cursos) ? content.cursos : initialContent.cursos,
    catalogoCursos: Array.isArray(content?.catalogoCursos)
      ? content.catalogoCursos
      : initialContent.catalogoCursos,
    evaluacionesCursos:
      content?.evaluacionesCursos && typeof content.evaluacionesCursos === 'object'
        ? content.evaluacionesCursos
        : initialContent.evaluacionesCursos,
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
