import { obtenerEvaluacionesCursos } from '../../contenido/servicios/repositorioContenido.js'
import { obtenerCursoPorId } from '../../cursos/selectores/selectoresCursos.js'

export function obtenerRutaEvaluacionUnidad(courseId, unitId) {
  return `/course/${courseId}/unit/${unitId}/evaluation`
}

export function obtenerRutaEvaluacionFinal(courseId) {
  return `/course/${courseId}/final-evaluation`
}

export function obtenerRegistroEvaluacionUnidad(courseId, unitId) {
  const evaluacionesCursos = obtenerEvaluacionesCursos()
  const course = obtenerCursoPorId(courseId)
  const unit = course?.units.find((item) => item.id === unitId) ?? null
  const assessment = evaluacionesCursos[courseId]?.unitAssessments?.[unitId] ?? null

  if (!course || !unit || !assessment) {
    return null
  }

  return {
    type: 'unit',
    course,
    unit,
    assessment,
    path: obtenerRutaEvaluacionUnidad(courseId, unitId),
  }
}

export function obtenerRegistroEvaluacionFinal(courseId) {
  const evaluacionesCursos = obtenerEvaluacionesCursos()
  const course = obtenerCursoPorId(courseId)
  const assessment = evaluacionesCursos[courseId]?.finalAssessment ?? null

  if (!course || !assessment) {
    return null
  }

  return {
    type: 'course',
    course,
    assessment,
    path: obtenerRutaEvaluacionFinal(courseId),
  }
}

export function obtenerRutaEvaluacionDesdePaso(step) {
  if (!step) {
    return null
  }

  if (step.type === 'lesson') {
    return `/lesson/${step.lessonId}`
  }

  return step.path
}
