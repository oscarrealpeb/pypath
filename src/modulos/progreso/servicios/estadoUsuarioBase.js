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
    completedUnitAssessments: [],
    completedCourseAssessments: [],
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
    completedUnitAssessments: value?.completedUnitAssessments ?? [],
    completedCourseAssessments: value?.completedCourseAssessments ?? [],
  }
}

export function construirEstadoUsuarioDesdePerfil(profile = {}) {
  return {
    onboarding: normalizarEstadoDiagnostico(profile.onboarding),
    progress: normalizarProgreso(profile.progress),
    mustResetPassword: false,
  }
}
