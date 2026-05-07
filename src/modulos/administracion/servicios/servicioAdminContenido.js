function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function withUniqueId(baseId, takenIds) {
  if (!takenIds.has(baseId)) {
    return baseId
  }

  let suffix = 2

  while (takenIds.has(`${baseId}-${suffix}`)) {
    suffix += 1
  }

  return `${baseId}-${suffix}`
}

function parseList(text, separator = '\n') {
  return text
    .split(separator)
    .map((item) => item.trim())
    .filter(Boolean)
}

export function parsearListaMultilinea(text) {
  return parseList(text)
}

export function parsearListaSeparadaPorComas(text) {
  return text
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

export function parsearEnlacesDocumentacion(text) {
  return parsearListaMultilinea(text).map((line) => {
    const [label, url] = line.split('|').map((item) => item.trim())
    return {
      label: label || url || 'Recurso',
      url: url || label || '',
    }
  })
}

export function serializarEnlacesDocumentacion(links = []) {
  return links.map((link) => `${link.label} | ${link.url}`).join('\n')
}

function createQuestion(prefix, index) {
  return {
    id: `${prefix}-q${index + 1}`,
    prompt: `Pregunta ${index + 1}: edita este enunciado desde el panel.`,
    options: [
      { id: 'a', label: 'Opción A' },
      { id: 'b', label: 'Opción B' },
      { id: 'c', label: 'Opción C' },
    ],
    correctOptionId: 'a',
    explanation: 'Explica aquí por qué la respuesta correcta es la opción A.',
  }
}

export function crearPlantillaCurso(name, allCourseIds = []) {
  const baseId = slugify(name || 'nuevo-curso') || 'nuevo-curso'
  const id = withUniqueId(baseId, new Set(allCourseIds))

  return {
    course: {
      id,
      title: name?.trim() || 'Nuevo curso',
      library: 'Python',
      requiredCourseIds: [],
      summary: 'Describe aquí qué aprende la persona y por qué este curso es útil.',
      difficulty: 'Ruta editable',
      units: [],
    },
    meta: {
      id,
      library: 'Python',
      requiredCourseIds: [],
      title: name?.trim() || 'Nuevo curso',
      description: 'Resumen corto para la tarjeta del catálogo.',
      status: 'draft',
      statusLabel: 'Borrador',
      intensity: 'Media',
      duration: '2 semanas',
      audience: ['Todos los perfiles'],
      prerequisites: [],
      recommendedBefore: [],
      nextAfter: ['Más práctica aplicada'],
      personaTags: ['programadores'],
      interestTags: ['bases'],
      experienceTags: ['principiante'],
      pitch: 'Ajusta este pitch desde el panel para que el curso se vea claro en home y dashboard.',
      recommendedOrder: allCourseIds.length + 1,
    },
    finalAssessment: {
      id: `${id}-final`,
      title: `Evaluación final del curso: ${name?.trim() || 'Nuevo curso'}`,
      summary: 'Cierra este curso con una validación final editable desde el CMS.',
      passingScore: 2,
      successMessage: 'Evaluación final aprobada. El curso ya quedó marcado como completado.',
      questions: [0, 1, 2].map((index) => createQuestion(`${id}-final`, index)),
    },
  }
}

export function crearPlantillaUnidad(name, courseId, unitCount = 0) {
  const baseId = slugify(name || `unidad-${unitCount + 1}`) || `unidad-${unitCount + 1}`
  const id = `${baseId}`

  return {
    unit: {
      id,
      title: name?.trim() || `Nueva unidad ${unitCount + 1}`,
      summary: 'Explica el objetivo principal de esta unidad.',
      lessons: [],
    },
    assessment: {
      id: `${courseId}-${id}-checkpoint`,
      title: `Evaluación de unidad: ${name?.trim() || `Nueva unidad ${unitCount + 1}`}`,
      summary: 'Ajusta este resumen para explicar qué valida la evaluación de esta unidad.',
      passingScore: 2,
      successMessage: 'Unidad aprobada. Ahora puedes desbloquear la siguiente parte del curso.',
      questions: [0, 1, 2].map((index) => createQuestion(`${courseId}-${id}`, index)),
    },
  }
}

export function crearPlantillaLeccion(name, courseId, unitId, lessonCount = 0) {
  const baseId = slugify(name || `leccion-${lessonCount + 1}`) || `leccion-${lessonCount + 1}`
  const id = `${courseId}-${unitId}-${baseId}`

  return {
    id,
    title: name?.trim() || `Nueva lección ${lessonCount + 1}`,
    duration: '8 min',
    xp: 120,
    objective: 'Describe qué habilidad práctica debe ganar la persona al completar esta misión.',
    resources: {
      videoTitle: 'Video corto en español',
      videoUrl: 'https://www.youtube.com/embed/aoF-Tu8utSk',
      documentationLinks: [
        {
          label: 'Documentación oficial',
          url: 'https://docs.python.org/3/tutorial/index.html',
        },
      ],
      exampleTitle: 'Ejemplo guiado',
      exampleCode: '# Ejemplo de referencia\nprint("Hola, PyPath")\n',
      supportNote: 'Puedes reforzar la explicación con una captura, una nota corta o ambos.',
      bloquesApoyo: [],
      imageUrl: '',
    },
    instructions: {
      overview: 'Introduce aquí el contexto de la misión antes de que la persona abra el reto.',
      steps: [
        'Paso 1: ajusta el starter.',
        'Paso 2: ejecuta la solución.',
        'Paso 3: valida el resultado esperado.',
      ],
      hint: 'Agrega una pista concreta y corta que ayude sin resolver todo.',
    },
    challenge: {
      runtimeMode: courseId === 'python-fundamentals' ? 'python' : 'guided',
      exerciseType: 'Completar código',
      title: `Reto: ${name?.trim() || `Nueva lección ${lessonCount + 1}`}`,
      prompt: 'Explica aquí qué debe construir o corregir la persona.',
      starterCode:
        '# Escribe tu solución aquí\nresultado = "PyPath"\nprint(resultado)\n',
      expectedKeywords: ['print'],
      successCriteria: 'Describe con claridad qué debe incluir la solución para considerarla correcta.',
      expectedResult: 'PyPath',
      salidaGuiada: 'PyPath',
      executionNote:
        courseId === 'python-fundamentals'
          ? 'Esta misión ejecuta Python en el navegador usando Pyodide.'
          : 'Esta misión usa validación guiada porque la biblioteca no corre completa en el navegador.',
      successMessage: 'Lección guardada con una meta clara y lista para publicarse.',
    },
  }
}

export function construirBorradorLeccion(lesson) {
  return {
    title: lesson.title,
    duration: lesson.duration,
    xp: String(lesson.xp ?? 120),
    objective: lesson.objective,
    videoTitle: lesson.resources.videoTitle,
    videoUrl: lesson.resources.videoUrl,
    documentationLinksText: serializarEnlacesDocumentacion(lesson.resources.documentationLinks),
    exampleTitle: lesson.resources.exampleTitle,
    exampleCode: lesson.resources.exampleCode,
    supportNote: lesson.resources.supportNote,
    imageUrl: lesson.resources.imageUrl ?? '',
    instructionsOverview: lesson.instructions.overview,
    instructionsStepsText: (lesson.instructions.steps ?? []).join('\n'),
    instructionsHint: lesson.instructions.hint,
    runtimeMode: lesson.challenge.runtimeMode ?? 'guided',
    exerciseType: lesson.challenge.exerciseType,
    challengeTitle: lesson.challenge.title,
    prompt: lesson.challenge.prompt,
    starterCode: lesson.challenge.starterCode,
    expectedKeywordsText: (lesson.challenge.expectedKeywords ?? []).join(', '),
    successCriteria: lesson.challenge.successCriteria,
    expectedResult: lesson.challenge.expectedResult,
    salidaGuiada: lesson.challenge.salidaGuiada,
    executionNote: lesson.challenge.executionNote,
    successMessage: lesson.challenge.successMessage,
  }
}

export function aplicarBorradorLeccion(lesson, draft, courseId) {
  return {
    ...lesson,
    title: draft.title.trim() || lesson.title,
    duration: draft.duration.trim() || lesson.duration,
    xp: Number(draft.xp) || lesson.xp,
    objective: draft.objective.trim() || lesson.objective,
    resources: {
      ...lesson.resources,
      videoTitle: draft.videoTitle.trim() || lesson.resources.videoTitle,
      videoUrl: draft.videoUrl.trim() || lesson.resources.videoUrl,
      documentationLinks: parsearEnlacesDocumentacion(draft.documentationLinksText),
      exampleTitle: draft.exampleTitle.trim() || lesson.resources.exampleTitle,
      exampleCode: draft.exampleCode,
      supportNote: draft.supportNote.trim() || lesson.resources.supportNote,
      imageUrl: draft.imageUrl?.trim() ?? '',
    },
    instructions: {
      overview: draft.instructionsOverview.trim() || lesson.instructions.overview,
      steps: parsearListaMultilinea(draft.instructionsStepsText),
      hint: draft.instructionsHint.trim() || lesson.instructions.hint,
    },
    challenge: {
      ...lesson.challenge,
      runtimeMode:
        draft.runtimeMode === 'python' && courseId === 'python-fundamentals'
          ? 'python'
          : draft.runtimeMode === 'python'
            ? 'guided'
            : draft.runtimeMode,
      exerciseType: draft.exerciseType.trim() || lesson.challenge.exerciseType,
      title: draft.challengeTitle.trim() || lesson.challenge.title,
      prompt: draft.prompt.trim() || lesson.challenge.prompt,
      starterCode: draft.starterCode,
      expectedKeywords: parsearListaSeparadaPorComas(draft.expectedKeywordsText),
      successCriteria: draft.successCriteria.trim() || lesson.challenge.successCriteria,
      expectedResult: draft.expectedResult.trim() || lesson.challenge.expectedResult,
      salidaGuiada: draft.salidaGuiada.trim() || lesson.challenge.salidaGuiada,
      executionNote: draft.executionNote.trim() || lesson.challenge.executionNote,
      successMessage: draft.successMessage.trim() || lesson.challenge.successMessage,
    },
  }
}

export function construirBorradorCurso(course, meta) {
  return {
    title: course.title,
    library: course.library,
    summary: course.summary,
    difficulty: course.difficulty,
    description: meta?.description ?? '',
    status: meta?.status ?? 'draft',
    statusLabel: meta?.statusLabel ?? 'Borrador',
    intensity: meta?.intensity ?? 'Media',
    duration: meta?.duration ?? '2 semanas',
    audienceText: (meta?.audience ?? []).join('\n'),
    prerequisitesText: (meta?.prerequisites ?? []).join('\n'),
    nextAfterText: (meta?.nextAfter ?? []).join('\n'),
    personaTagsText: (meta?.personaTags ?? []).join(', '),
    interestTagsText: (meta?.interestTags ?? []).join(', '),
    experienceTagsText: (meta?.experienceTags ?? []).join(', '),
    requiredCourseIdsText: (course.requiredCourseIds ?? []).join(', '),
    pitch: meta?.pitch ?? '',
    recommendedOrder: String(meta?.recommendedOrder ?? 1),
  }
}

export function aplicarBorradorCurso(course, meta, draft) {
  return {
    course: {
      ...course,
      title: draft.title.trim() || course.title,
      library: draft.library.trim() || course.library,
      summary: draft.summary.trim() || course.summary,
      difficulty: draft.difficulty.trim() || course.difficulty,
      requiredCourseIds: parsearListaSeparadaPorComas(draft.requiredCourseIdsText),
    },
    meta: {
      ...meta,
      title: draft.title.trim() || meta.title,
      library: draft.library.trim() || meta.library,
      description: draft.description.trim() || meta.description,
      status: draft.status,
      statusLabel: draft.statusLabel.trim() || meta.statusLabel,
      intensity: draft.intensity.trim() || meta.intensity,
      duration: draft.duration.trim() || meta.duration,
      audience: parsearListaMultilinea(draft.audienceText),
      prerequisites: parsearListaMultilinea(draft.prerequisitesText),
      nextAfter: parsearListaMultilinea(draft.nextAfterText),
      personaTags: parsearListaSeparadaPorComas(draft.personaTagsText),
      interestTags: parsearListaSeparadaPorComas(draft.interestTagsText),
      experienceTags: parsearListaSeparadaPorComas(draft.experienceTagsText),
      requiredCourseIds: parsearListaSeparadaPorComas(draft.requiredCourseIdsText),
      pitch: draft.pitch.trim() || meta.pitch,
      recommendedOrder: Number(draft.recommendedOrder) || meta.recommendedOrder,
    },
  }
}

export function construirBorradorEvaluacion(assessment) {
  return {
    title: assessment.title,
    summary: assessment.summary,
    passingScore: String(assessment.passingScore ?? 2),
    successMessage: assessment.successMessage,
  }
}

export function aplicarBorradorEvaluacion(assessment, draft) {
  return {
    ...assessment,
    title: draft.title.trim() || assessment.title,
    summary: draft.summary.trim() || assessment.summary,
    passingScore: Number(draft.passingScore) || assessment.passingScore,
    successMessage: draft.successMessage.trim() || assessment.successMessage,
  }
}

function cloneContent(content) {
  return clone(content)
}

export function crearCursoEnContenido(content, courseName) {
  const nextContent = cloneContent(content)
  const allCourseIds = nextContent.cursos.map((course) => course.id)
  const template = crearPlantillaCurso(courseName, allCourseIds)
  nextContent.cursos.push(template.course)
  nextContent.catalogoCursos.push(template.meta)
  nextContent.evaluacionesCursos[template.course.id] = {
    unitAssessments: {},
    finalAssessment: template.finalAssessment,
  }
  return {
    content: nextContent,
    courseId: template.course.id,
  }
}

export function actualizarCursoEnContenido(content, courseId, courseDraft) {
  const nextContent = cloneContent(content)
  const courseIndex = nextContent.cursos.findIndex((course) => course.id === courseId)
  const metaIndex = nextContent.catalogoCursos.findIndex((course) => course.id === courseId)

  if (courseIndex < 0 || metaIndex < 0) {
    return nextContent
  }

  const applied = aplicarBorradorCurso(
    nextContent.cursos[courseIndex],
    nextContent.catalogoCursos[metaIndex],
    courseDraft,
  )
  nextContent.cursos[courseIndex] = applied.course
  nextContent.catalogoCursos[metaIndex] = applied.meta
  return nextContent
}

export function alternarPublicacionCursoEnContenido(content, courseId) {
  const nextContent = cloneContent(content)
  const meta = nextContent.catalogoCursos.find((course) => course.id === courseId)

  if (!meta) {
    return nextContent
  }

  const nextStatus = meta.status === 'live' ? 'draft' : 'live'
  meta.status = nextStatus
  meta.statusLabel = nextStatus === 'live' ? 'Disponible ahora' : 'Borrador'
  return nextContent
}

export function crearUnidadEnContenido(content, courseId, unitName) {
  const nextContent = cloneContent(content)
  const course = nextContent.cursos.find((item) => item.id === courseId)

  if (!course) {
    return { content: nextContent, unitId: null }
  }

  const unitIds = new Set(course.units.map((unit) => unit.id))
  const template = crearPlantillaUnidad(unitName, courseId, course.units.length)
  template.unit.id = withUniqueId(template.unit.id, unitIds)
  template.assessment.id = `${courseId}-${template.unit.id}-checkpoint`
  course.units.push(template.unit)
  nextContent.evaluacionesCursos[courseId] ??= { unitAssessments: {}, finalAssessment: null }
  nextContent.evaluacionesCursos[courseId].unitAssessments[template.unit.id] = template.assessment

  return {
    content: nextContent,
    unitId: template.unit.id,
  }
}

export function actualizarUnidadEnContenido(content, courseId, unitId, patch) {
  const nextContent = cloneContent(content)
  const course = nextContent.cursos.find((item) => item.id === courseId)
  const unit = course?.units.find((item) => item.id === unitId)

  if (!course || !unit) {
    return nextContent
  }

  unit.title = patch.title?.trim() || unit.title
  unit.summary = patch.summary?.trim() || unit.summary

  const assessment = nextContent.evaluacionesCursos[courseId]?.unitAssessments?.[unitId]

  if (assessment) {
    assessment.title = patch.assessmentTitle?.trim() || assessment.title
    assessment.summary = patch.assessmentSummary?.trim() || assessment.summary
  }

  return nextContent
}

export function eliminarUnidadEnContenido(content, courseId, unitId) {
  const nextContent = cloneContent(content)
  const course = nextContent.cursos.find((item) => item.id === courseId)

  if (!course) {
    return nextContent
  }

  course.units = course.units.filter((unit) => unit.id !== unitId)

  if (nextContent.evaluacionesCursos[courseId]?.unitAssessments) {
    delete nextContent.evaluacionesCursos[courseId].unitAssessments[unitId]
  }

  return nextContent
}

export function actualizarEvaluacionUnidadEnContenido(content, courseId, unitId, draft) {
  const nextContent = cloneContent(content)
  const assessment = nextContent.evaluacionesCursos[courseId]?.unitAssessments?.[unitId]

  if (!assessment) {
    return nextContent
  }

  nextContent.evaluacionesCursos[courseId].unitAssessments[unitId] = aplicarBorradorEvaluacion(
    assessment,
    draft,
  )

  return nextContent
}

export function actualizarEvaluacionFinalEnContenido(content, courseId, draft) {
  const nextContent = cloneContent(content)
  const assessment = nextContent.evaluacionesCursos[courseId]?.finalAssessment

  if (!assessment) {
    return nextContent
  }

  nextContent.evaluacionesCursos[courseId].finalAssessment = aplicarBorradorEvaluacion(assessment, draft)
  return nextContent
}

export function crearLeccionEnContenido(content, courseId, unitId, lessonName) {
  const nextContent = cloneContent(content)
  const course = nextContent.cursos.find((item) => item.id === courseId)
  const unit = course?.units.find((item) => item.id === unitId)

  if (!course || !unit) {
    return { content: nextContent, lessonId: null }
  }

  const template = crearPlantillaLeccion(lessonName, courseId, unitId, unit.lessons.length)
  const takenIds = new Set(unit.lessons.map((lesson) => lesson.id))
  template.id = withUniqueId(template.id, takenIds)
  unit.lessons.push(template)

  return {
    content: nextContent,
    lessonId: template.id,
  }
}

export function actualizarLeccionEnContenido(content, courseId, unitId, lessonId, draft) {
  const nextContent = cloneContent(content)
  const course = nextContent.cursos.find((item) => item.id === courseId)
  const unit = course?.units.find((item) => item.id === unitId)
  const lessonIndex = unit?.lessons.findIndex((lesson) => lesson.id === lessonId) ?? -1

  if (!course || !unit || lessonIndex < 0) {
    return nextContent
  }

  unit.lessons[lessonIndex] = aplicarBorradorLeccion(unit.lessons[lessonIndex], draft, courseId)
  return nextContent
}

export function eliminarLeccionEnContenido(content, courseId, unitId, lessonId) {
  const nextContent = cloneContent(content)
  const course = nextContent.cursos.find((item) => item.id === courseId)
  const unit = course?.units.find((item) => item.id === unitId)

  if (!course || !unit) {
    return nextContent
  }

  unit.lessons = unit.lessons.filter((lesson) => lesson.id !== lessonId)
  return nextContent
}
