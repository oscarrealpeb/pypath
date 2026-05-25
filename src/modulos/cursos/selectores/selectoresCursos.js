import {
  obtenerEvaluacionesCursos,
  obtenerCursos,
} from '../../contenido/servicios/repositorioContenido.js'

const PREFIJO_MISION_REGEX = /^Misi[oó]n\s+\d+\s*:\s*/i
const DEFAULT_EXERCISE_XP = 120

function normalizarNumeroPositivo(value, fallback = null) {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback
}

function distribuirXpEquitativo(totalXp, count) {
  if (!count || totalXp <= 0) {
    return Array.from({ length: count }, () => 0)
  }

  const baseValue = Math.floor(totalXp / count)
  const remainder = totalXp % count

  return Array.from({ length: count }, (_, index) => baseValue + (index < remainder ? 1 : 0))
}

function construirIdEjercicio(lessonId, challenge, index) {
  return challenge?.id?.trim() || `${lessonId}::exercise::${index + 1}`
}

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

export function obtenerEjerciciosLeccion(lesson) {
  const rawChallenges =
    Array.isArray(lesson?.challenges) && lesson.challenges.length > 0
      ? lesson.challenges
      : lesson?.challenge
        ? [lesson.challenge]
        : []

  if (rawChallenges.length === 0) {
    return []
  }

  const lessonXp =
    normalizarNumeroPositivo(lesson?.xp, DEFAULT_EXERCISE_XP) ?? DEFAULT_EXERCISE_XP
  const explicitXpValues = rawChallenges.map((challenge) =>
    normalizarNumeroPositivo(challenge?.xp),
  )
  const explicitTotalXp = explicitXpValues.reduce((total, xp) => total + (xp ?? 0), 0)
  const missingXpIndexes = explicitXpValues.reduce((indexes, xp, index) => {
    if (xp == null) {
      indexes.push(index)
    }

    return indexes
  }, [])
  const xpPool = explicitTotalXp > 0 ? Math.max(0, lessonXp - explicitTotalXp) : lessonXp
  const distributedXp = distribuirXpEquitativo(xpPool, missingXpIndexes.length)
  let distributedIndex = 0

  return rawChallenges.map((challenge, index) => {
    const exerciseXp = explicitXpValues[index] ?? distributedXp[distributedIndex++] ?? 0
    const explicitPenalty = normalizarNumeroPositivo(challenge?.solutionPenaltyXp)

    return {
      ...challenge,
      id: construirIdEjercicio(lesson.id, challenge, index),
      xp: exerciseXp,
      solutionPenaltyXp: explicitPenalty ?? exerciseXp,
      exerciseIndex: index,
      lessonId: lesson.id,
    }
  })
}

export function obtenerXpTotalLeccion(lesson) {
  const exercises = obtenerEjerciciosLeccion(lesson)

  if (exercises.length === 0) {
    return normalizarNumeroPositivo(lesson?.xp, 0) ?? 0
  }

  return exercises.reduce((total, exercise) => total + (exercise.xp ?? 0), 0)
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
          exercises: obtenerEjerciciosLeccion(lesson),
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
  progressOrCompletedLessons,
  completedUnitAssessments = [],
  completedCourseAssessments = [],
) {
  const evaluacionesCursos = obtenerEvaluacionesCursos()
  const course = obtenerCursoPorId(courseId)

  if (!course) {
    return {
      completedLessonsCount: 0,
      totalLessons: 0,
      completedUnitAssessmentsCount: 0,
      totalUnitAssessments: 0,
      completedCourseAssessmentsCount: 0,
      totalCourseAssessments: 0,
      completedCount: 0,
      totalCount: 0,
      percentage: 0,
      lessonPercentage: 0,
      cursoEstaCompletado: false,
    }
  }

  const progress = Array.isArray(progressOrCompletedLessons)
    ? {
        completedLessons: progressOrCompletedLessons,
        completedUnitAssessments,
        completedCourseAssessments,
      }
    : (progressOrCompletedLessons ?? {})
  const normalizedCompletedLessons = new Set(progress.completedLessons ?? [])
  const normalizedCompletedUnitAssessments = new Set(progress.completedUnitAssessments ?? [])
  const normalizedCompletedCourseAssessments = new Set(progress.completedCourseAssessments ?? [])
  const currentUnitIds = course.units.map((unit) => unit.id)
  const snapshotUnitIds = Array.isArray(progress.courseUnitSnapshots?.[courseId])
    ? progress.courseUnitSnapshots[courseId].filter((unitId) => currentUnitIds.includes(unitId))
    : currentUnitIds
  const requiredUnits = course.units.filter((unit) => snapshotUnitIds.includes(unit.id))
  const requiredLessons = requiredUnits.flatMap((unit) => {
    const currentLessonIds = unit.lessons.map((lesson) => lesson.id)
    const snapshotLessonIds = Array.isArray(progress.unitLessonSnapshots?.[unit.id])
      ? progress.unitLessonSnapshots[unit.id].filter((lessonId) => currentLessonIds.includes(lessonId))
      : currentLessonIds

    return unit.lessons.filter((lesson) => snapshotLessonIds.includes(lesson.id))
  })
  const totalLessons = requiredLessons.length
  const completedLessonsCount = requiredLessons.filter((lesson) =>
    normalizedCompletedLessons.has(lesson.id),
  ).length
  const totalUnitAssessments = requiredUnits.filter(
    (unit) => evaluacionesCursos[courseId]?.unitAssessments?.[unit.id],
  ).length
  const completedUnitAssessmentsCount = requiredUnits.reduce((count, unit) => {
    const assessment = evaluacionesCursos[courseId]?.unitAssessments?.[unit.id]
    return assessment && normalizedCompletedUnitAssessments.has(assessment.id) ? count + 1 : count
  }, 0)
  const totalCourseAssessments = evaluacionesCursos[courseId]?.finalAssessment ? 1 : 0
  const completedCourseAssessmentsCount = totalCourseAssessments
    ? normalizedCompletedCourseAssessments.has(evaluacionesCursos[courseId].finalAssessment.id)
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
