import { catalogoCursos as defaultCourseCatalog } from '../../../datos/catalogoCursos.js'
import { evaluacionesCursos as defaultCourseAssessments } from '../../../datos/evaluacionesCursos.js'
import { cursos as defaultCourses, cursosBorrador as defaultDraftCourses } from '../../../datos/cursos.js'

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

export function crearContenidoInicial() {
  return {
    cursos: clone(defaultCourses),
    catalogoCursos: clone(defaultCourseCatalog),
    evaluacionesCursos: clone(defaultCourseAssessments),
    cursosBorrador: clone(defaultDraftCourses ?? {}),
    cursosGestionadosCms: [],
    catalogosGestionadosCms: [],
    evaluacionesGestionadasCms: [],
    cursosEliminadosCms: [],
  }
}

let contentSnapshot = crearContenidoInicial()

export function actualizarSnapshotContenido(nextContent) {
  contentSnapshot = nextContent ?? crearContenidoInicial()
}

export function obtenerCursos() {
  return contentSnapshot.cursos
}

export function obtenerCursoCatalogoPorId(courseId) {
  return contentSnapshot.catalogoCursos.find((course) => course.id === courseId) ?? null
}

export function cursoEstaPublicado(courseId) {
  return obtenerCursoCatalogoPorId(courseId)?.status === 'live'
}

export function obtenerCursosPublicados() {
  const publishedCourseIds = new Set(
    contentSnapshot.catalogoCursos
      .filter((course) => course.status === 'live')
      .map((course) => course.id),
  )

  return contentSnapshot.cursos.filter((course) => publishedCourseIds.has(course.id))
}

export function obtenerCatalogoCursos() {
  return contentSnapshot.catalogoCursos
}

export function obtenerCatalogoCursosPublicados() {
  return contentSnapshot.catalogoCursos.filter((course) => course.status === 'live')
}

export function obtenerEvaluacionesCursos() {
  return contentSnapshot.evaluacionesCursos
}
