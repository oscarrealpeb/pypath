import {
  cursoEstaPublicado,
  obtenerCursos,
} from '../../contenido/servicios/repositorioContenido.js'
import {
  obtenerRutaEvaluacionDesdePaso,
  obtenerRegistroEvaluacionFinal,
  obtenerRegistroEvaluacionUnidad,
} from '../../evaluaciones/selectores/selectoresEvaluaciones.js'
import {
  obtenerCursoPorId,
  obtenerEjerciciosLeccion,
  obtenerProgresoCurso,
  obtenerRegistroLeccion,
  obtenerXpTotalLeccion,
} from '../../cursos/selectores/selectoresCursos.js'

function getRankTitle(totalXp) {
  if (totalXp >= 960) {
    return 'Arquitecto de cursos'
  }

  if (totalXp >= 600) {
    return 'Constructor de interfaces'
  }

  if (totalXp >= 360) {
    return 'Operador en progreso'
  }

  return 'Recluta inicial'
}

function normalizarListaIds(items = []) {
  return Array.from(
    new Set(
      (Array.isArray(items) ? items : [])
        .filter((item) => typeof item === 'string')
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  )
}

function obtenerSetIds(items = []) {
  return new Set(normalizarListaIds(items))
}

function obtenerSnapshotLeccion(progress, lessonId) {
  const rawSnapshot = progress?.lessonExerciseSnapshots?.[lessonId]
  return normalizarListaIds(rawSnapshot)
}

function construirContextoProgreso(
  progressOrCompletedLessons,
  completedUnitAssessments = [],
  completedCourseAssessments = [],
  assessmentResult = null,
) {
  if (Array.isArray(progressOrCompletedLessons)) {
    return {
      completedLessons: normalizarListaIds(progressOrCompletedLessons),
      completedExercises: [],
      completedUnitAssessments: normalizarListaIds(completedUnitAssessments),
      completedCourseAssessments: normalizarListaIds(completedCourseAssessments),
      revealedSolutionExercises: [],
      lessonExerciseSnapshots: {},
      unitLessonSnapshots: {},
      courseUnitSnapshots: {},
      assessmentResult,
    }
  }

  const progress = progressOrCompletedLessons ?? {}

  return {
    ...progress,
    completedLessons: normalizarListaIds(progress.completedLessons),
    completedExercises: normalizarListaIds(progress.completedExercises),
    completedUnitAssessments: normalizarListaIds(progress.completedUnitAssessments),
    completedCourseAssessments: normalizarListaIds(progress.completedCourseAssessments),
    revealedSolutionExercises: normalizarListaIds(progress.revealedSolutionExercises),
    lessonExerciseSnapshots:
      progress.lessonExerciseSnapshots && typeof progress.lessonExerciseSnapshots === 'object'
        ? progress.lessonExerciseSnapshots
        : {},
    unitLessonSnapshots:
      progress.unitLessonSnapshots && typeof progress.unitLessonSnapshots === 'object'
        ? progress.unitLessonSnapshots
        : {},
    courseUnitSnapshots:
      progress.courseUnitSnapshots && typeof progress.courseUnitSnapshots === 'object'
        ? progress.courseUnitSnapshots
        : {},
    assessmentResult: progress.assessmentResult ?? assessmentResult,
  }
}

function obtenerIdsRequeridosDesdeSnapshot(snapshotMap, key, currentIds = []) {
  const normalizedCurrentIds = normalizarListaIds(currentIds)
  const rawSnapshot = snapshotMap?.[key]

  if (!Array.isArray(rawSnapshot) || rawSnapshot.length === 0) {
    return normalizedCurrentIds
  }

  return normalizarListaIds(rawSnapshot).filter((id) => normalizedCurrentIds.includes(id))
}

function obtenerUnidadesRequeridasCurso(progress, course) {
  return obtenerIdsRequeridosDesdeSnapshot(
    progress?.courseUnitSnapshots,
    course.id,
    course.units.map((unit) => unit.id),
  )
}

function obtenerLeccionesRequeridasUnidad(progress, unit) {
  return obtenerIdsRequeridosDesdeSnapshot(
    progress?.unitLessonSnapshots,
    unit.id,
    unit.lessons.map((lesson) => lesson.id),
  )
}

export function puedeOmitirFundamentosConDiagnostico(assessmentResult) {
  return Boolean(assessmentResult?.canSkipFundamentals)
}

export function cursoEstaCompletado(
  courseId,
  progressOrCompletedLessons,
  completedUnitAssessments = [],
  completedCourseAssessments = [],
  assessmentResult = null,
) {
  const progressContext = construirContextoProgreso(
    progressOrCompletedLessons,
    completedUnitAssessments,
    completedCourseAssessments,
    assessmentResult,
  )
  const courseProgress = obtenerProgresoCurso(courseId, progressContext)
  return courseProgress.cursoEstaCompletado
}

function areCoursePrerequisitesCompleted(
  course,
  progressOrCompletedLessons,
  completedUnitAssessments,
  completedCourseAssessments,
  assessmentResult = null,
) {
  const progress = construirContextoProgreso(
    progressOrCompletedLessons,
    completedUnitAssessments,
    completedCourseAssessments,
    assessmentResult,
  )

  return (course.requiredCourseIds ?? []).every((requiredCourseId) =>
    requiredCourseId === 'python-fundamentals' && puedeOmitirFundamentosConDiagnostico(assessmentResult)
      ? true
      : cursoEstaCompletado(
          requiredCourseId,
          progress,
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

export function obtenerEstadoEjerciciosLeccion(progress, lesson) {
  const exercises = obtenerEjerciciosLeccion(lesson)
  const currentExerciseIds = exercises.map((exercise) => exercise.id)
  const completedExercisesSet = obtenerSetIds(progress?.completedExercises)
  const revealedExercisesSet = obtenerSetIds(progress?.revealedSolutionExercises)
  const completedLessonsSet = obtenerSetIds(progress?.completedLessons)
  const lessonCompleted = completedLessonsSet.has(lesson.id)
  const snapshotExerciseIds = obtenerSnapshotLeccion(progress, lesson.id).filter((exerciseId) =>
    currentExerciseIds.includes(exerciseId),
  )
  const requiredExerciseIds = lessonCompleted
    ? snapshotExerciseIds.length > 0
      ? snapshotExerciseIds
      : currentExerciseIds
    : currentExerciseIds
  const optionalExerciseIds = currentExerciseIds.filter(
    (exerciseId) => !requiredExerciseIds.includes(exerciseId),
  )
  const hasExplicitRequiredProgress = requiredExerciseIds.some(
    (exerciseId) =>
      completedExercisesSet.has(exerciseId) || revealedExercisesSet.has(exerciseId),
  )
  const legacyResolvedRequired = lessonCompleted && requiredExerciseIds.length > 0 && !hasExplicitRequiredProgress
  const resolvedRequiredIds = legacyResolvedRequired
    ? requiredExerciseIds
    : requiredExerciseIds.filter(
        (exerciseId) =>
          completedExercisesSet.has(exerciseId) || revealedExercisesSet.has(exerciseId),
      )
  const unresolvedRequiredIds = requiredExerciseIds.filter(
    (exerciseId) => !resolvedRequiredIds.includes(exerciseId),
  )
  const resolvedOptionalIds = optionalExerciseIds.filter(
    (exerciseId) =>
      completedExercisesSet.has(exerciseId) || revealedExercisesSet.has(exerciseId),
  )

  return {
    exercises,
    currentExerciseIds,
    requiredExerciseIds,
    optionalExerciseIds,
    resolvedRequiredIds,
    unresolvedRequiredIds,
    resolvedOptionalIds,
    completedExercisesSet,
    revealedExercisesSet,
    legacyResolvedRequired,
    lessonCompleted,
    snapshotExerciseIds,
    allRequiredResolved: unresolvedRequiredIds.length === 0,
  }
}

export function ejercicioEstaCompletado(progress, lesson, exerciseId) {
  const state = obtenerEstadoEjerciciosLeccion(progress, lesson)

  if (state.legacyResolvedRequired && state.requiredExerciseIds.includes(exerciseId)) {
    return true
  }

  return state.completedExercisesSet.has(exerciseId)
}

export function ejercicioTieneSolucionRevelada(progress, exerciseId) {
  return obtenerSetIds(progress?.revealedSolutionExercises).has(exerciseId)
}

export function unidadEstaDesbloqueada(
  progressOrCompletedLessons,
  completedUnitAssessments,
  completedCourseAssessments,
  courseId,
  unitId,
  assessmentResult = null,
) {
  const progress = construirContextoProgreso(
    progressOrCompletedLessons,
    completedUnitAssessments,
    completedCourseAssessments,
    assessmentResult,
  )
  const course = obtenerCursoPorId(courseId)

  if (!course) {
    return false
  }

  const requiredUnitIds = obtenerUnidadesRequeridasCurso(progress, course)
  const unitIndex = requiredUnitIds.findIndex((id) => id === unitId)
  const unitIsOptional = !requiredUnitIds.includes(unitId)

  if (unitIsOptional) {
    return areCoursePrerequisitesCompleted(
      course,
      progress,
    )
  }

  if (unitIndex < 0) {
    return false
  }

  if (unitIndex === 0) {
    return areCoursePrerequisitesCompleted(
      course,
      progress,
    )
  }

  const previousUnitId = requiredUnitIds[unitIndex - 1]
  const previousUnit = course.units.find((item) => item.id === previousUnitId)

  if (!previousUnit) {
    return false
  }

  const previousAssessmentRecord = obtenerRegistroEvaluacionUnidad(courseId, previousUnit.id)
  const previousRequiredLessonIds = obtenerLeccionesRequeridasUnidad(progress, previousUnit)

  return previousAssessmentRecord
    ? evaluacionUnidadEstaCompletada(
        progress.completedUnitAssessments,
        previousAssessmentRecord.assessment.id,
      )
    : previousRequiredLessonIds.every((lessonId) => progress.completedLessons.includes(lessonId))
}

export function leccionEstaDesbloqueada(
  progressOrCompletedLessons,
  completedUnitAssessments,
  completedCourseAssessments,
  lessonId,
  assessmentResult = null,
) {
  const progress = construirContextoProgreso(
    progressOrCompletedLessons,
    completedUnitAssessments,
    completedCourseAssessments,
    assessmentResult,
  )
  const record = obtenerRegistroLeccion(lessonId)

  if (!record) {
    return false
  }

  if (leccionEstaCompletada(progress.completedLessons, lessonId)) {
    return true
  }

  const requiredLessonIds = obtenerLeccionesRequeridasUnidad(progress, record.unit)
  const lessonIndex = requiredLessonIds.findIndex((id) => id === lessonId)
  const lessonIsOptional = !requiredLessonIds.includes(lessonId)

  if (lessonIsOptional) {
    return unidadEstaDesbloqueada(
      progress,
      [],
      [],
      record.course.id,
      record.unit.id,
      progress.assessmentResult,
    )
  }

  if (lessonIndex <= 0) {
    return unidadEstaDesbloqueada(
      progress,
      [],
      [],
      record.course.id,
      record.unit.id,
      progress.assessmentResult,
    )
  }

  return progress.completedLessons.includes(requiredLessonIds[lessonIndex - 1])
}

export function evaluacionUnidadEstaDesbloqueada(
  progressOrCompletedLessons,
  completedUnitAssessments,
  completedCourseAssessments,
  courseId,
  unitId,
  assessmentResult = null,
) {
  const progress = construirContextoProgreso(
    progressOrCompletedLessons,
    completedUnitAssessments,
    completedCourseAssessments,
    assessmentResult,
  )
  const record = obtenerRegistroEvaluacionUnidad(courseId, unitId)

  if (!record) {
    return false
  }

  if (evaluacionUnidadEstaCompletada(progress.completedUnitAssessments, record.assessment.id)) {
    return true
  }

  const requiredLessonIds = obtenerLeccionesRequeridasUnidad(progress, record.unit)
  const allLessonsCompleted = requiredLessonIds.every((lessonId) =>
    progress.completedLessons.includes(lessonId),
  )

  return (
    unidadEstaDesbloqueada(
      progress,
      [],
      [],
      courseId,
      unitId,
      progress.assessmentResult,
    ) && allLessonsCompleted
  )
}

export function evaluacionFinalEstaDesbloqueada(
  progressOrCompletedLessons,
  completedUnitAssessments,
  completedCourseAssessments,
  courseId,
) {
  const progress = construirContextoProgreso(
    progressOrCompletedLessons,
    completedUnitAssessments,
    completedCourseAssessments,
  )
  const record = obtenerRegistroEvaluacionFinal(courseId)

  if (!record) {
    return false
  }

  if (evaluacionCursoEstaCompletada(progress.completedCourseAssessments, record.assessment.id)) {
    return true
  }

  const requiredUnitIds = obtenerUnidadesRequeridasCurso(progress, record.course)
  const requiredUnits = record.course.units.filter((unit) => requiredUnitIds.includes(unit.id))
  const allLessonsCompleted = requiredUnits.every((unit) =>
    obtenerLeccionesRequeridasUnidad(progress, unit).every((lessonId) =>
      progress.completedLessons.includes(lessonId),
    ),
  )
  const allUnitAssessmentsCompleted = requiredUnits.every((unit) => {
    const unitAssessmentRecord = obtenerRegistroEvaluacionUnidad(courseId, unit.id)
    return (
      !unitAssessmentRecord ||
      progress.completedUnitAssessments.includes(unitAssessmentRecord.assessment.id)
    )
  })

  return allLessonsCompleted && allUnitAssessmentsCompleted
}

export function obtenerSiguientePasoCurso(courseId, progress) {
  const course = obtenerCursoPorId(courseId)

  if (!course) {
    return null
  }

  const progressContext = construirContextoProgreso(progress)
  const {
    completedLessons,
    completedUnitAssessments,
    completedCourseAssessments,
    assessmentResult,
  } = progressContext
  const requiredUnitIds = obtenerUnidadesRequeridasCurso(progressContext, course)

  if (
    !areCoursePrerequisitesCompleted(
      course,
      progressContext,
    )
  ) {
    return null
  }

  for (const unitId of requiredUnitIds) {
    const unit = course.units.find((item) => item.id === unitId)

    if (!unit) {
      continue
    }

    if (
      !unidadEstaDesbloqueada(
        progressContext,
        [],
        [],
        course.id,
        unit.id,
        assessmentResult,
      )
    ) {
      return null
    }

    const requiredLessonIds = obtenerLeccionesRequeridasUnidad(progressContext, unit)

    for (const lessonId of requiredLessonIds) {
      const lesson = unit.lessons.find((item) => item.id === lessonId)

      if (!lesson) {
        continue
      }

      if (!completedLessons.includes(lesson.id)) {
        return {
          type: 'lesson',
          lessonId: lesson.id,
          title: lesson.title,
          label: 'Continuar mision',
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
        label: 'Resolver evaluacion de unidad',
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
      label: 'Resolver evaluacion final',
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

  if (!cursoEstaPublicado(resolvedCourseId)) {
    return null
  }

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

export function obtenerEstadisticasGamificadas(progressOrCompletedLessons) {
  const fallbackProgress = construirContextoProgreso(progressOrCompletedLessons)
  const totalLessons = obtenerCursos().reduce(
    (count, course) => count + course.units.reduce((sum, unit) => sum + unit.lessons.length, 0),
    0,
  )
  const completedExercisesSet = obtenerSetIds(fallbackProgress.completedExercises)
  const revealedExercisesSet = obtenerSetIds(fallbackProgress.revealedSolutionExercises)
  let earnedXp = 0
  let penaltyXp = 0

  obtenerCursos().forEach((course) => {
    course.units.forEach((unit) => {
      unit.lessons.forEach((lesson) => {
        const exerciseState = obtenerEstadoEjerciciosLeccion(fallbackProgress, lesson)

        if (exerciseState.legacyResolvedRequired) {
          earnedXp += obtenerXpTotalLeccion(lesson)
          return
        }

        exerciseState.exercises.forEach((exercise) => {
          if (completedExercisesSet.has(exercise.id)) {
            earnedXp += exercise.xp ?? 0
          }

          if (revealedExercisesSet.has(exercise.id)) {
            penaltyXp += exercise.solutionPenaltyXp ?? 0
          }
        })
      })
    })
  })

  const completedLessons = normalizarListaIds(fallbackProgress.completedLessons)
  const xp = Math.max(0, earnedXp - penaltyXp)

  return {
    xp,
    earnedXp,
    penaltyXp,
    lessonsCleared: completedLessons.length,
    unlockedLessons: Math.min(completedLessons.length + 1, totalLessons),
    rankTitle: getRankTitle(xp),
  }
}

export function obtenerResumenCurso(courseId, progress) {
  const progressContext = construirContextoProgreso(progress)
  const courseProgress = obtenerProgresoCurso(courseId, progressContext)
  const nextStep = obtenerSiguientePasoCurso(courseId, progressContext)

  return {
    ...courseProgress,
    nextStep,
    nextPath: obtenerRutaEvaluacionDesdePaso(nextStep),
    prerequisitesResolved:
      !obtenerCursoPorId(courseId)?.requiredCourseIds?.length ||
      areCoursePrerequisitesCompleted(
        obtenerCursoPorId(courseId),
        progressContext,
      ),
  }
}
