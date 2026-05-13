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
  }
}

let contentSnapshot = crearContenidoInicial()

export function actualizarSnapshotContenido(nextContent) {
  contentSnapshot = nextContent ?? crearContenidoInicial()
}

export function obtenerCursos() {
  return contentSnapshot.cursos
}

export function obtenerCatalogoCursos() {
  return contentSnapshot.catalogoCursos
}

export function obtenerEvaluacionesCursos() {
  return contentSnapshot.evaluacionesCursos
}
