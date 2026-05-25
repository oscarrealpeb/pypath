export function crearEstadoDiagnosticoInicial() {
  return {
    completed: false,
    path: null,
    assessmentAttempt: null,
    assessmentResult: null,
  }
}

export function crearProgresoInicial() {
  return {
    completedLessons: [],
    completedExercises: [],
    completedUnitAssessments: [],
    completedCourseAssessments: [],
    revealedSolutionExercises: [],
    lessonExerciseSnapshots: {},
    unitLessonSnapshots: {},
    courseUnitSnapshots: {},
  }
}

export function crearEstadoUsuarioInicial() {
  return {
    onboarding: crearEstadoDiagnosticoInicial(),
    progress: crearProgresoInicial(),
    mustResetPassword: false,
  }
}

export function normalizarEstadoDiagnostico(value) {
  return {
    ...crearEstadoDiagnosticoInicial(),
    ...(value ?? {}),
  }
}

export function normalizarProgreso(value) {
  return {
    ...crearProgresoInicial(),
    ...(value ?? {}),
    completedLessons: value?.completedLessons ?? [],
    completedExercises: value?.completedExercises ?? [],
    completedUnitAssessments: value?.completedUnitAssessments ?? [],
    completedCourseAssessments: value?.completedCourseAssessments ?? [],
    revealedSolutionExercises: value?.revealedSolutionExercises ?? [],
    lessonExerciseSnapshots:
      value?.lessonExerciseSnapshots && typeof value.lessonExerciseSnapshots === 'object'
        ? value.lessonExerciseSnapshots
        : {},
    unitLessonSnapshots:
      value?.unitLessonSnapshots && typeof value.unitLessonSnapshots === 'object'
        ? value.unitLessonSnapshots
        : {},
    courseUnitSnapshots:
      value?.courseUnitSnapshots && typeof value.courseUnitSnapshots === 'object'
        ? value.courseUnitSnapshots
        : {},
  }
}

export function construirEstadoUsuarioDesdePerfil(profile = {}) {
  return {
    onboarding: normalizarEstadoDiagnostico(profile.onboarding),
    progress: normalizarProgreso(profile.progress),
    mustResetPassword: false,
  }
}
