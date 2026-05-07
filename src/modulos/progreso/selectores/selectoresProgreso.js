import { obtenerCursos } from '../../contenido/servicios/repositorioContenido.js'
import {
  obtenerRutaEvaluacionDesdePaso,
  obtenerRegistroEvaluacionFinal,
  obtenerRegistroEvaluacionUnidad,
} from '../../evaluaciones/selectores/selectoresEvaluaciones.js'
import {
  obtenerCursoPorId,
  obtenerProgresoCurso,
  obtenerRegistroLeccion,
} from '../../cursos/selectores/selectoresCursos.js'

function getRankTitle(completedLessonsCount) {
  if (completedLessonsCount >= 8) {
    return 'Arquitecto de cursos'
  }

  if (completedLessonsCount >= 5) {
    return 'Constructor de interfaces'
  }

  if (completedLessonsCount >= 3) {
    return 'Operador en progreso'
  }

  return 'Recluta inicial'
}

export function puedeOmitirFundamentosConDiagnostico(assessmentResult) {
  return Boolean(assessmentResult?.canSkipFundamentals)
}

export function cursoEstaCompletado(
  courseId,
  completedLessons,
  completedUnitAssessments = [],
  completedCourseAssessments = [],
) {
  const progress = obtenerProgresoCurso(
    courseId,
    completedLessons,
    completedUnitAssessments,
    completedCourseAssessments,
  )

  return progress.cursoEstaCompletado
}

function areCoursePrerequisitesCompleted(
  course,
  completedLessons,
  completedUnitAssessments,
  completedCourseAssessments,
  assessmentResult = null,
) {
  return (course.requiredCourseIds ?? []).every((requiredCourseId) =>
    requiredCourseId === 'python-fundamentals' && puedeOmitirFundamentosConDiagnostico(assessmentResult)
      ? true
      : cursoEstaCompletado(
          requiredCourseId,
          completedLessons,
          completedUnitAssessments,
          completedCourseAssessments,
        ),
  )
}

export function leccionEstaCompletada(completedLessons, lessonId) {
  return completedLessons.includes(lessonId)
}

export function evaluacionUnidadEstaCompletada(completedUnitAssessments, assessmentId) {
  return completedUnitAssessments.includes(assessmentId)
}

export function evaluacionCursoEstaCompletada(completedCourseAssessments, assessmentId) {
  return completedCourseAssessments.includes(assessmentId)
}

export function unidadEstaDesbloqueada(
  completedLessons,
  completedUnitAssessments,
  completedCourseAssessments,
  courseId,
  unitId,
  assessmentResult = null,
) {
  const record = obtenerRegistroEvaluacionUnidad(courseId, unitId)

  if (!record) {
    return false
  }

  const { course, unit } = record
  const unitIndex = course.units.findIndex((item) => item.id === unit.id)

  if (unitIndex === 0) {
    return areCoursePrerequisitesCompleted(
      course,
      completedLessons,
      completedUnitAssessments,
      completedCourseAssessments,
      assessmentResult,
    )
  }

  const previousUnit = course.units[unitIndex - 1]
  const previousAssessmentRecord = obtenerRegistroEvaluacionUnidad(courseId, previousUnit.id)

  return previousAssessmentRecord
    ? evaluacionUnidadEstaCompletada(
        completedUnitAssessments,
        previousAssessmentRecord.assessment.id,
      )
    : false
}

export function leccionEstaDesbloqueada(
  completedLessons,
  completedUnitAssessments,
  completedCourseAssessments,
  lessonId,
  assessmentResult = null,
) {
  const record = obtenerRegistroLeccion(lessonId)

  if (!record) {
    return false
  }

  if (leccionEstaCompletada(completedLessons, lessonId)) {
    return true
  }

  if (!record.previousLessonId) {
    return unidadEstaDesbloqueada(
      completedLessons,
      completedUnitAssessments,
      completedCourseAssessments,
      record.course.id,
      record.unit.id,
      assessmentResult,
    )
  }

  return completedLessons.includes(record.previousLessonId)
}

export function evaluacionUnidadEstaDesbloqueada(
  completedLessons,
  completedUnitAssessments,
  completedCourseAssessments,
  courseId,
  unitId,
  assessmentResult = null,
) {
  const record = obtenerRegistroEvaluacionUnidad(courseId, unitId)

  if (!record) {
    return false
  }

  if (evaluacionUnidadEstaCompletada(completedUnitAssessments, record.assessment.id)) {
    return true
  }

  const allLessonsCompleted = record.unit.lessons.every((lesson) =>
    completedLessons.includes(lesson.id),
  )

  return (
    unidadEstaDesbloqueada(
      completedLessons,
      completedUnitAssessments,
      completedCourseAssessments,
      courseId,
      unitId,
      assessmentResult,
    ) && allLessonsCompleted
  )
}

export function evaluacionFinalEstaDesbloqueada(
  completedLessons,
  completedUnitAssessments,
  completedCourseAssessments,
  courseId,
) {
  const record = obtenerRegistroEvaluacionFinal(courseId)

  if (!record) {
    return false
  }

  if (evaluacionCursoEstaCompletada(completedCourseAssessments, record.assessment.id)) {
    return true
  }

  const allLessonsCompleted = record.course.units.every((unit) =>
    unit.lessons.every((lesson) => completedLessons.includes(lesson.id)),
  )

  const allUnitAssessmentsCompleted = record.course.units.every((unit) => {
    const unitAssessmentRecord = obtenerRegistroEvaluacionUnidad(courseId, unit.id)

    return (
      !unitAssessmentRecord ||
      completedUnitAssessments.includes(unitAssessmentRecord.assessment.id)
    )
  })

  return allLessonsCompleted && allUnitAssessmentsCompleted
}

export function obtenerSiguientePasoCurso(courseId, progress) {
  const course = obtenerCursoPorId(courseId)

  if (!course) {
    return null
  }

  const {
    completedLessons = [],
    completedUnitAssessments = [],
    completedCourseAssessments = [],
    assessmentResult = null,
  } = progress

  if (
    !areCoursePrerequisitesCompleted(
      course,
      completedLessons,
      completedUnitAssessments,
      completedCourseAssessments,
      assessmentResult,
    )
  ) {
    return null
  }

  for (const unit of course.units) {
    if (
      !unidadEstaDesbloqueada(
        completedLessons,
        completedUnitAssessments,
        completedCourseAssessments,
        course.id,
        unit.id,
        assessmentResult,
      )
    ) {
      return null
    }

    for (const lesson of unit.lessons) {
      if (!completedLessons.includes(lesson.id)) {
        return {
          type: 'lesson',
          lessonId: lesson.id,
          title: lesson.title,
          label: 'Continuar misión',
          path: `/lesson/${lesson.id}`,
        }
      }
    }

    const unitAssessmentRecord = obtenerRegistroEvaluacionUnidad(course.id, unit.id)

    if (
      unitAssessmentRecord &&
      !completedUnitAssessments.includes(unitAssessmentRecord.assessment.id)
    ) {
      return {
        type: 'unit-assessment',
        assessmentId: unitAssessmentRecord.assessment.id,
        courseId: course.id,
        unitId: unit.id,
        title: unitAssessmentRecord.assessment.title,
        label: 'Resolver evaluación de unidad',
        path: unitAssessmentRecord.path,
      }
    }
  }

  const finalAssessmentRecord = obtenerRegistroEvaluacionFinal(course.id)

  if (
    finalAssessmentRecord &&
    !completedCourseAssessments.includes(finalAssessmentRecord.assessment.id)
  ) {
    return {
      type: 'course-assessment',
      assessmentId: finalAssessmentRecord.assessment.id,
      courseId: course.id,
      title: finalAssessmentRecord.assessment.title,
      label: 'Resolver evaluación final',
      path: finalAssessmentRecord.path,
    }
  }

  return null
}

export function obtenerInicioRecomendado(courseId, assessmentResult) {
  if (!assessmentResult) {
    return null
  }

  const resolvedCourseId = courseId ?? assessmentResult.recommendedCourseId
  const course = obtenerCursoPorId(resolvedCourseId)
  const unit = course?.units.find((item) => item.id === assessmentResult.recommendedUnitId)
  const lesson = unit?.lessons.find((item) => item.id === assessmentResult.recommendedLessonId)

  if (!course || !unit || !lesson) {
    return null
  }

  return {
    courseId: course.id,
    courseTitle: course.title,
    unitTitle: unit.title,
    lessonTitle: lesson.title,
    lessonId: lesson.id,
  }
}

export function obtenerEstadisticasGamificadas(completedLessons) {
  const totalLessons = obtenerCursos().reduce(
    (count, course) => count + course.units.reduce((sum, unit) => sum + unit.lessons.length, 0),
    0,
  )

  return {
    xp: completedLessons.length * 120,
    lessonsCleared: completedLessons.length,
    unlockedLessons: Math.min(completedLessons.length + 1, totalLessons),
    rankTitle: getRankTitle(completedLessons.length),
  }
}

export function obtenerResumenCurso(courseId, progress) {
  const assessmentResult = progress.assessmentResult ?? null
  const courseProgress = obtenerProgresoCurso(
    courseId,
    progress.completedLessons,
    progress.completedUnitAssessments,
    progress.completedCourseAssessments,
  )
  const nextStep = obtenerSiguientePasoCurso(courseId, {
    ...progress,
    assessmentResult,
  })

  return {
    ...courseProgress,
    nextStep,
    nextPath: obtenerRutaEvaluacionDesdePaso(nextStep),
    prerequisitesResolved:
      !obtenerCursoPorId(courseId)?.requiredCourseIds?.length ||
      areCoursePrerequisitesCompleted(
        obtenerCursoPorId(courseId),
        progress.completedLessons,
        progress.completedUnitAssessments,
        progress.completedCourseAssessments,
        assessmentResult,
      ),
  }
}
