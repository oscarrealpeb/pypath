import {
  obtenerEvaluacionesCursos,
  obtenerCursos,
} from '../../contenido/servicios/repositorioContenido.js'

const PREFIJO_MISION_REGEX = /^Misi[oó]n\s+\d+\s*:\s*/i

export function obtenerCursoPorId(courseId) {
  return obtenerCursos().find((course) => course.id === courseId) ?? null
}

export function obtenerEtiquetaVisibleLeccion(unitIndex, lessonIndexInUnit) {
  return `Unidad ${unitIndex + 1} · Misión ${lessonIndexInUnit + 1}`
}

export function obtenerTituloVisibleLeccion(lesson, lessonIndexInUnit) {
  const rawTitle = lesson?.title?.trim() ?? ''
  const cleanTitle = rawTitle.replace(PREFIJO_MISION_REGEX, '').trim()

  if (cleanTitle) {
    return cleanTitle
  }

  return rawTitle || `Misión ${lessonIndexInUnit + 1}`
}

export function obtenerRegistroUnidad(courseId, unitId) {
  const course = obtenerCursoPorId(courseId)
  const unitIndex = course?.units.findIndex((unit) => unit.id === unitId) ?? -1

  if (!course || unitIndex < 0) {
    return null
  }

  const unit = course.units[unitIndex]

  return {
    course,
    unit,
    unitIndex,
    previousUnit: course.units[unitIndex - 1] ?? null,
    nextUnit: course.units[unitIndex + 1] ?? null,
  }
}

export function obtenerTodasLasLecciones(courseId) {
  const course = obtenerCursoPorId(courseId)

  if (!course) {
    return []
  }

  return course.units.flatMap((unit, unitIndex) =>
    unit.lessons.map((lesson, lessonIndex) => ({
      ...lesson,
      unitId: unit.id,
      unitTitle: unit.title,
      unitIndex,
      lessonIndexInUnit: lessonIndex,
      courseId: course.id,
      courseTitle: course.title,
    })),
  )
}

export function obtenerRegistroLeccion(lessonId) {
  for (const course of obtenerCursos()) {
    for (let unitIndex = 0; unitIndex < course.units.length; unitIndex += 1) {
      const unit = course.units[unitIndex]
      const lessonIndexInUnit = unit.lessons.findIndex((lesson) => lesson.id === lessonId)

      if (lessonIndexInUnit >= 0) {
        const flatLessons = obtenerTodasLasLecciones(course.id)
        const flatLessonIndex = flatLessons.findIndex((lesson) => lesson.id === lessonId)
        const lesson = flatLessons[flatLessonIndex]

        return {
          course,
          unit,
          lesson,
          lessonIndex: flatLessonIndex,
          lessonIndexInUnit,
          unitIndex,
          previousLessonId:
            lessonIndexInUnit > 0 ? unit.lessons[lessonIndexInUnit - 1]?.id ?? null : null,
          nextLessonInUnitId: unit.lessons[lessonIndexInUnit + 1]?.id ?? null,
          totalLessons: flatLessons.length,
        }
      }
    }
  }

  return null
}

export function obtenerProgresoCurso(
  courseId,
  completedLessons,
  completedUnitAssessments = [],
  completedCourseAssessments = [],
) {
  const evaluacionesCursos = obtenerEvaluacionesCursos()
  const lessons = obtenerTodasLasLecciones(courseId)
  const totalLessons = lessons.length
  const completedLessonsCount = lessons.filter((lesson) =>
    completedLessons.includes(lesson.id),
  ).length
  const totalUnitAssessments = Object.keys(
    evaluacionesCursos[courseId]?.unitAssessments ?? {},
  ).length
  const completedUnitAssessmentsCount = completedUnitAssessments.filter((assessmentId) =>
    Object.values(evaluacionesCursos[courseId]?.unitAssessments ?? {}).some(
      (assessment) => assessment.id === assessmentId,
    ),
  ).length
  const totalCourseAssessments = evaluacionesCursos[courseId]?.finalAssessment ? 1 : 0
  const completedCourseAssessmentsCount = totalCourseAssessments
    ? completedCourseAssessments.includes(evaluacionesCursos[courseId].finalAssessment.id)
      ? 1
      : 0
    : 0
  const totalCount = totalLessons + totalUnitAssessments + totalCourseAssessments
  const completedCount =
    completedLessonsCount + completedUnitAssessmentsCount + completedCourseAssessmentsCount

  return {
    completedLessonsCount,
    totalLessons,
    completedUnitAssessmentsCount,
    totalUnitAssessments,
    completedCourseAssessmentsCount,
    totalCourseAssessments,
    completedCount,
    totalCount,
    percentage: totalCount ? Math.round((completedCount / totalCount) * 100) : 0,
    lessonPercentage: totalLessons
      ? Math.round((completedLessonsCount / totalLessons) * 100)
      : 0,
    cursoEstaCompletado:
      totalCount > 0 &&
      completedCount === totalCount &&
      completedCourseAssessmentsCount === totalCourseAssessments,
  }
}
