import { sanearSeleccionIntereses } from '../../../datos/opcionesPerfilUsuario.js'
import { obtenerCatalogoCursos } from '../../contenido/servicios/repositorioContenido.js'

const roleReasons = {
  programadores: 'porque vienes con foco en construccion de software',
  matematicos: 'porque tu perfil encaja bien con lógica y modelado',
  finanzas: 'porque conecta con flujos y automatización financiera',
  analistas: 'porque apunta a exploración, limpieza y lectura de datos',
  ciberseguridad: 'porque se alinea con scripting y tareas técnicas de seguridad',
}

const interestReasons = {
  bases: 'refuerza los fundamentos que vas a reutilizar en cualquier biblioteca',
  interfaces: 'te acerca a herramientas visuales y flujos interactivos',
  videojuegos: 'te permite aprender creando juegos sencillos y muy didácticos',
  ciberseguridad: 'te mete en automatización aplicada a seguridad',
  datos: 'te sirve para trabajar con tablas, análisis y reportes',
  finanzas: 'te ayuda a construir automatizaciones útiles para negocio',
  automatizacion: 'te da material para scripts y ahorro de trabajo repetitivo',
}

const roleWeightsByCourse = {
  'python-fundamentals': {
    programadores: 3,
    matematicos: 3,
    finanzas: 3,
    analistas: 3,
    ciberseguridad: 3,
  },
  pyside6: {
    programadores: 5,
    matematicos: 3,
    finanzas: 1,
    analistas: 1,
    ciberseguridad: 2,
  },
  pygame: {
    programadores: 4,
    matematicos: 6,
    finanzas: 0,
    analistas: 1,
    ciberseguridad: 0,
  },
  'python-ciberseguridad': {
    programadores: 5,
    matematicos: 1,
    finanzas: 0,
    analistas: 1,
    ciberseguridad: 10,
  },
  'pandas-finanzas': {
    programadores: 2,
    matematicos: 5,
    finanzas: 10,
    analistas: 10,
    ciberseguridad: 1,
  },
}

const interestWeightsByCourse = {
  'python-fundamentals': {
    bases: 9,
    interfaces: 1,
    videojuegos: 1,
    ciberseguridad: 1,
    datos: 1,
    finanzas: 1,
    automatizacion: 2,
  },
  pyside6: {
    bases: 2,
    interfaces: 10,
    videojuegos: 2,
    ciberseguridad: 0,
    datos: 0,
    finanzas: 0,
    automatizacion: 5,
  },
  pygame: {
    bases: 2,
    interfaces: 4,
    videojuegos: 10,
    ciberseguridad: 0,
    datos: 0,
    finanzas: 0,
    automatizacion: 0,
  },
  'python-ciberseguridad': {
    bases: 1,
    interfaces: 0,
    videojuegos: 0,
    ciberseguridad: 10,
    datos: 2,
    finanzas: 0,
    automatizacion: 4,
  },
  'pandas-finanzas': {
    bases: 1,
    interfaces: 0,
    videojuegos: 0,
    ciberseguridad: 0,
    datos: 10,
    finanzas: 10,
    automatizacion: 5,
  },
}

const experienceWeightsByCourse = {
  'python-fundamentals': {
    principiante: 10,
    intermedio: 5,
    avanzado: -4,
  },
  pyside6: {
    principiante: 2,
    intermedio: 5,
    avanzado: 4,
  },
  pygame: {
    principiante: 3,
    intermedio: 5,
    avanzado: 3,
  },
  'python-ciberseguridad': {
    principiante: -7,
    intermedio: 5,
    avanzado: 7,
  },
  'pandas-finanzas': {
    principiante: 2,
    intermedio: 5,
    avanzado: 4,
  },
}

function normalizeProfile(formState = {}) {
  return {
    role: formState.role ?? formState.profile ?? 'programadores',
    interests: sanearSeleccionIntereses(
      formState.interests?.length > 0
        ? formState.interests
        : formState.objective
          ? [formState.objective]
          : ['bases'],
    ),
    experience: formState.experience ?? 'principiante',
  }
}

function getRoleScore(courseId, role) {
  return roleWeightsByCourse[courseId]?.[role] ?? 0
}

function getInterestScore(courseId, interests) {
  return interests.reduce((score, interest) => {
    return score + (interestWeightsByCourse[courseId]?.[interest] ?? 0)
  }, 0)
}

function getExperienceScore(courseId, experience) {
  return experienceWeightsByCourse[courseId]?.[experience] ?? 0
}

function getStatusScore(course) {
  if (course.status === 'live') {
    return 1
  }

  return -2
}

function getFoundationScore(course, normalizedState) {
  let score = getRoleScore(course.id, normalizedState.role)
  score += getInterestScore(course.id, normalizedState.interests)
  score += getExperienceScore(course.id, normalizedState.experience)
  score += getStatusScore(course)
  return score
}

function getSpecialtyScore(course, normalizedState) {
  if (course.id === 'python-fundamentals') {
    return getFoundationScore(course, normalizedState)
  }

  let score = getRoleScore(course.id, normalizedState.role) * 1.2
  score += getInterestScore(course.id, normalizedState.interests) * 1.35
  score += getExperienceScore(course.id, normalizedState.experience)
  score += getStatusScore(course)

  if (
    normalizedState.role === 'programadores' &&
    normalizedState.interests.includes('interfaces') &&
    course.id === 'pyside6'
  ) {
    score += 5
  }

  if (
    normalizedState.interests.includes('videojuegos') &&
    course.id === 'pygame'
  ) {
    score += 6
  }

  if (
    normalizedState.role === 'ciberseguridad' &&
    course.id === 'python-ciberseguridad'
  ) {
    score += 6
  }

  if (
    (normalizedState.role === 'finanzas' || normalizedState.role === 'analistas') &&
    course.id === 'pandas-finanzas'
  ) {
    score += 6
  }

  if (
    normalizedState.interests.includes('bases') &&
    normalizedState.interests.length === 1 &&
    course.id !== 'python-fundamentals'
  ) {
    score -= 3
  }

  return score
}

function buildReason(course, normalizedState, targetCourseId) {
  const catalogoCursos = obtenerCatalogoCursos()

  if (course.id === 'python-fundamentals' && targetCourseId && targetCourseId !== course.id) {
    return `Te conviene como base para desbloquear y aprovechar mejor ${catalogoCursos.find((item) => item.id === targetCourseId)?.title}.`
  }

  const reasonParts = []

  if (course.personaTags.includes(normalizedState.role)) {
    reasonParts.push(roleReasons[normalizedState.role])
  }

  const matchedInterest = normalizedState.interests.find((interest) =>
    course.interestTags.includes(interest),
  )

  if (matchedInterest) {
    reasonParts.push(interestReasons[matchedInterest])
  }

  if (reasonParts.length === 0) {
    return 'Tiene buena afinidad con tu perfil actual.'
  }

  return `Te la sugiero ${reasonParts.join(' y ')}.`
}

function getMatchTags(course, normalizedState, targetCourseId) {
  const matchedInterests = normalizedState.interests.filter((interest) =>
    course.interestTags.includes(interest),
  )

  const tags = []

  if (course.id === targetCourseId) {
    tags.push('Curso objetivo')
  }

  if (course.id === 'python-fundamentals' && targetCourseId !== 'python-fundamentals') {
    tags.push('Base recomendada')
  }

  if (course.personaTags.includes(normalizedState.role)) {
    tags.push('Rol alineado')
  }

  matchedInterests.slice(0, 2).forEach((interest) => {
    tags.push(interestReasons[interest])
  })

  return tags
}

function getFitLabel(score) {
  if (score >= 22) {
    return 'Ajuste alto'
  }

  if (score >= 14) {
    return 'Buen ajuste'
  }

  return 'Ajuste inicial'
}

function sharesMeaningfulContext(course, normalizedState) {
  const sharesInterest = normalizedState.interests.some(
    (interest) => interest !== 'bases' && course.interestTags.includes(interest),
  )
  const sharesSpecializedRole =
    normalizedState.role !== 'programadores' &&
    course.personaTags.includes(normalizedState.role)
  const sharesBroadRoleWithFocusedInterest =
    normalizedState.role === 'programadores' &&
    course.personaTags.includes('programadores') &&
    sharesInterest

  return sharesInterest || sharesSpecializedRole || sharesBroadRoleWithFocusedInterest
}

function resolveTargetCourse(normalizedState) {
  const catalogoCursos = obtenerCatalogoCursos()
  const specialtyCourses = catalogoCursos
    .filter((course) => course.id !== 'python-fundamentals')
    .map((course) => ({
      ...course,
      specialtyScore: getSpecialtyScore(course, normalizedState),
    }))
    .sort((left, right) => right.specialtyScore - left.specialtyScore)

  const strongestSpecialty = specialtyCourses[0]
  const baseOnlyProfile =
    normalizedState.interests.length === 1 && normalizedState.interests[0] === 'bases'

  if (!strongestSpecialty || strongestSpecialty.specialtyScore < 10 || baseOnlyProfile) {
    return catalogoCursos.find((course) => course.id === 'python-fundamentals')
  }

  return strongestSpecialty
}

function buildOrderedCourses(normalizedState, targetCourse) {
  const catalogoCursos = obtenerCatalogoCursos()
  const fundamentals = catalogoCursos.find((course) => course.id === 'python-fundamentals')

  const scoredCourses = catalogoCursos.map((course) => {
    const displayScore =
      course.id === 'python-fundamentals'
        ? getFoundationScore(course, normalizedState)
        : getSpecialtyScore(course, normalizedState)

    return {
      ...course,
      score: displayScore,
    }
  })

  const specialtyRanking = scoredCourses
    .filter((course) => course.id !== 'python-fundamentals')
    .sort((left, right) => right.score - left.score)

  if (!targetCourse || targetCourse.id === 'python-fundamentals') {
    return [
      scoredCourses.find((course) => course.id === 'python-fundamentals'),
      ...specialtyRanking,
    ].filter(Boolean)
  }

  const secondSpecialty = specialtyRanking.find((course) => course.id !== targetCourse.id)

  return [
    scoredCourses.find((course) => course.id === targetCourse.id),
    scoredCourses.find((course) => course.id === fundamentals.id),
    secondSpecialty,
    ...specialtyRanking.filter(
      (course) => course.id !== targetCourse.id && course.id !== secondSpecialty?.id,
    ),
  ].filter(Boolean)
}

function filterVisibleRecommendations(cursos, normalizedState, targetCourseId) {
  const targetCourse = cursos.find((course) => course.id === targetCourseId) ?? cursos[0]
  const baseCourse =
    targetCourseId !== 'python-fundamentals'
      ? cursos.find((course) => course.id === 'python-fundamentals') ?? null
      : null
  const additionalCourses = cursos.filter(
    (course) => course.id !== targetCourse?.id && course.id !== baseCourse?.id,
  )

  const targetScore = targetCourse?.score ?? 1
  const strongAlternatives = additionalCourses.filter((course) => {
    if (!sharesMeaningfulContext(course, normalizedState)) {
      return false
    }

    if (course.score >= Math.max(10, Math.round(targetScore * 0.5))) {
      return true
    }

    return targetCourseId === 'python-fundamentals' && course.score >= 11
  })

  return [targetCourse, baseCourse, strongAlternatives[0]].filter(
    (course, index, array) =>
      course && array.findIndex((item) => item?.id === course.id) === index,
  )
}

export function recomendarCursosPorPerfil(formState) {
  const normalizedState = normalizeProfile(formState)
  const targetCourse = resolveTargetCourse(normalizedState)
  const orderedCourses = buildOrderedCourses(normalizedState, targetCourse)
  const topScore = Math.max(...orderedCourses.map((course) => course.score), 1)

  const mappedCourses = orderedCourses.map((course) => {
    const fitPercentage = Math.max(18, Math.round((course.score / topScore) * 100))

    return {
      ...course,
      fitPercentage,
      fitLabel: getFitLabel(course.score),
      reason: buildReason(course, normalizedState, targetCourse?.id),
      matchTags: getMatchTags(course, normalizedState, targetCourse?.id),
    }
  })

  return filterVisibleRecommendations(mappedCourses, normalizedState, targetCourse?.id)
}

export function construirPlanRecomendacion(formState) {
  const normalizedState = normalizeProfile(formState)
  const resolvedTargetCourse = resolveTargetCourse(normalizedState)
  const rankedCourses = recomendarCursosPorPerfil(normalizedState)
  const baseCourse =
    rankedCourses.find((course) => course.id === 'python-fundamentals') ?? rankedCourses[0]
  const targetCourse =
    resolvedTargetCourse?.id === 'python-fundamentals'
      ? baseCourse
      : rankedCourses.find((course) => course.id === resolvedTargetCourse?.id) ??
        rankedCourses.find((course) => course.id !== 'python-fundamentals') ??
        baseCourse
  const shouldStartWithBase = targetCourse.id !== 'python-fundamentals'
  const startCourse = shouldStartWithBase ? baseCourse : targetCourse
  const thirdStep =
    rankedCourses.find(
      (course) =>
        course.id !== startCourse.id &&
        course.id !== targetCourse.id &&
        sharesMeaningfulContext(course, normalizedState) &&
        course.score >= Math.max(12, Math.round((targetCourse.score ?? 0) * 0.55)),
    ) ?? null
  const steps = [startCourse, targetCourse, thirdStep].filter(
    (course, index, array) =>
      course && array.findIndex((item) => item?.id === course.id) === index,
  )

  const summary = shouldStartWithBase
    ? `Tu perfil apunta sobre todo a ${targetCourse.title}, pero en PyPath conviene empezar por ${baseCourse.title} para desbloquear ese curso con mejor base.`
    : `Tu perfil encaja mejor con ${targetCourse.title}, así que ese puede ser tu curso principal de arranque.`

  return {
    profile: normalizedState,
    rankedCourses,
    startCourse,
    targetCourse,
    nextMilestone:
      steps[1]?.title ??
      targetCourse.nextAfter?.[0] ??
      'Seguir profundizando con proyectos prácticos',
    shouldStartWithBase,
    summary,
    headline: shouldStartWithBase
      ? `Empieza por ${startCourse.title} y luego ve a ${targetCourse.title}`
      : `Tu mejor siguiente curso es ${targetCourse.title}`,
    actionLabel: shouldStartWithBase
      ? `Quiero empezar por ${startCourse.title}`
      : `Quiero seguir con ${targetCourse.title}`,
    steps,
  }
}
