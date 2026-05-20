import assert from 'node:assert/strict'

import {
  alternarPublicacionCursoEnContenido,
  actualizarCursoEnContenido,
  actualizarEvaluacionFinalEnContenido,
  actualizarEvaluacionUnidadEnContenido,
  actualizarLeccionEnContenido,
  actualizarUnidadEnContenido,
  construirBorradorCurso,
  construirBorradorEvaluacion,
  construirBorradorLeccion,
  crearCursoEnContenido,
  crearLeccionEnContenido,
  crearUnidadEnContenido,
} from '../src/modulos/administracion/servicios/servicioAdminContenido.js'
import {
  cursoEstaPublicado,
  crearContenidoInicial,
  actualizarSnapshotContenido,
  obtenerCatalogoCursos,
  obtenerCursosPublicados,
} from '../src/modulos/contenido/servicios/repositorioContenido.js'
import {
  normalizarContenidoPersistido,
  serializarContenidoPersistible,
} from '../src/modulos/contenido/servicios/servicioContenidoFirebase.js'
import {
  obtenerCursoPorId,
  obtenerRegistroLeccion,
} from '../src/modulos/cursos/selectores/selectoresCursos.js'
import {
  obtenerRegistroEvaluacionFinal,
  obtenerRegistroEvaluacionUnidad,
} from '../src/modulos/evaluaciones/selectores/selectoresEvaluaciones.js'

function findCourse(content, courseId) {
  return content.cursos.find((course) => course.id === courseId) ?? null
}

function findCourseMeta(content, courseId) {
  return content.catalogoCursos.find((course) => course.id === courseId) ?? null
}

function findUnit(content, courseId, unitId) {
  return findCourse(content, courseId)?.units.find((unit) => unit.id === unitId) ?? null
}

function findLesson(content, courseId, unitId, lessonId) {
  return findUnit(content, courseId, unitId)?.lessons.find((lesson) => lesson.id === lessonId) ?? null
}

function assertPublicProjection(courseId, unitId, lessonId, expectation) {
  const publicCatalog = obtenerCatalogoCursos()
  const publicCourse = obtenerCursoPorId(courseId)
  const lessonRecord = obtenerRegistroLeccion(lessonId)
  const unitAssessmentRecord = obtenerRegistroEvaluacionUnidad(courseId, unitId)
  const finalAssessmentRecord = obtenerRegistroEvaluacionFinal(courseId)

  assert.ok(
    publicCatalog.some((course) => course.id === courseId),
    'The public catalog should contain the edited course.',
  )
  assert.ok(publicCourse, 'The public course selector should resolve the edited course.')
  assert.equal(publicCourse.summary, expectation.courseSummary)
  assert.equal(publicCourse.units.length, 1)
  assert.equal(publicCourse.units[0].summary, expectation.unitSummary)

  assert.ok(lessonRecord, 'The public lesson selector should resolve the edited lesson.')
  assert.equal(lessonRecord.lesson.title, expectation.lessonTitle)
  assert.equal(lessonRecord.lesson.objective, expectation.lessonObjective)
  assert.equal(lessonRecord.lesson.resources.videoUrl, expectation.videoUrl)
  assert.equal(lessonRecord.lesson.resources.imageUrl, expectation.imageUrl)
  assert.equal(
    lessonRecord.lesson.resources.documentationLinks[0]?.url,
    expectation.documentationUrl,
  )
  assert.equal(lessonRecord.lesson.instructions.overview, expectation.instructionsOverview)
  assert.equal(lessonRecord.lesson.instructions.steps.length, 3)
  assert.equal(lessonRecord.lesson.challenge.expectedResult, expectation.expectedResult)

  assert.ok(unitAssessmentRecord, 'The public unit assessment selector should resolve the checkpoint.')
  assert.equal(unitAssessmentRecord.assessment.title, expectation.unitAssessmentTitle)
  assert.equal(unitAssessmentRecord.assessment.questions.length, 2)

  assert.ok(finalAssessmentRecord, 'The public final assessment selector should resolve the final exam.')
  assert.equal(finalAssessmentRecord.assessment.title, expectation.finalAssessmentTitle)
  assert.equal(finalAssessmentRecord.assessment.questions.length, 2)
}

const initialContent = crearContenidoInicial()
let content = structuredClone(initialContent)

const { content: contentWithCourse, courseId } = crearCursoEnContenido(content, 'Automation Ops')
content = contentWithCourse

assert.ok(courseId, 'The CMS should create a course id.')
assert.ok(findCourse(content, courseId), 'The created course should exist in editable content.')
assert.ok(findCourseMeta(content, courseId), 'The created course should exist in the catalog metadata.')
assert.ok(content.evaluacionesCursos[courseId], 'The created course should get assessments scaffolding.')

const courseDraft = construirBorradorCurso(findCourse(content, courseId), findCourseMeta(content, courseId))
courseDraft.title = 'Automation Ops'
courseDraft.library = 'Automatizacion'
courseDraft.summary = 'Aprende a automatizar tareas operativas con scripts reutilizables.'
courseDraft.difficulty = 'Proyecto aplicado'
courseDraft.description = 'Crea pipelines pequenos con Python y tareas programadas.'
courseDraft.status = 'live'
courseDraft.statusLabel = 'Disponible ahora'
courseDraft.intensity = 'Alta'
courseDraft.duration = '3 semanas'
courseDraft.audienceText = 'Equipos DevOps\nAnalistas tecnicos'
courseDraft.prerequisitesText = 'Manejo basico de terminal\nPython basico'
courseDraft.recommendedBeforeText = 'Fundamentos de Python'
courseDraft.nextAfterText = 'Observabilidad aplicada\nMás automatización'
courseDraft.personaTagsText = 'programadores, devops'
courseDraft.interestTagsText = 'automatizacion, scripting'
courseDraft.experienceTagsText = 'intermedio'
courseDraft.requiredCourseIdsText = 'python-fundamentals'
courseDraft.pitch = 'Automatiza tareas repetitivas con una ruta corta y directa.'
courseDraft.recommendedOrder = '90'
content = actualizarCursoEnContenido(content, courseId, courseDraft)

const { content: contentWithUnit, unitId } = crearUnidadEnContenido(content, courseId, 'Pipelines operativos')
content = contentWithUnit
assert.ok(unitId, 'The CMS should create a unit id.')

content = actualizarUnidadEnContenido(content, courseId, unitId, {
  title: 'Pipelines operativos',
  summary: 'Orquesta tareas pequeñas, logs y ejecuciones programadas.',
})

let unitAssessmentDraft = construirBorradorEvaluacion(
  content.evaluacionesCursos[courseId].unitAssessments[unitId],
)
unitAssessmentDraft.title = 'Checkpoint: pipelines operativos'
unitAssessmentDraft.summary = 'Valida que entiendes ejecución programada y logs.'
unitAssessmentDraft.passingScore = '2'
unitAssessmentDraft.successMessage = 'Checkpoint de unidad aprobado.'
unitAssessmentDraft.questionsJson = JSON.stringify(
  [
    {
      id: `${courseId}-${unitId}-q1`,
      prompt: '¿Qué módulo usar para lanzar procesos?',
      options: [
        { id: 'a', label: 'subprocess' },
        { id: 'b', label: 'random' },
      ],
      correctOptionId: 'a',
      explanation: 'subprocess permite invocar procesos del sistema.',
    },
    {
      id: `${courseId}-${unitId}-q2`,
      prompt: '¿Qué conviene guardar después de cada corrida?',
      options: [
        { id: 'a', label: 'Logs' },
        { id: 'b', label: 'Solo emojis' },
      ],
      correctOptionId: 'a',
      explanation: 'Los logs ayudan a auditar la ejecución.',
    },
  ],
  null,
  2,
)
content = actualizarEvaluacionUnidadEnContenido(content, courseId, unitId, unitAssessmentDraft)

const { content: contentWithLesson, lessonId } = crearLeccionEnContenido(
  content,
  courseId,
  unitId,
  'Orquestar scripts',
)
content = contentWithLesson
assert.ok(lessonId, 'The CMS should create a lesson id.')

const lessonDraft = construirBorradorLeccion(findLesson(content, courseId, unitId, lessonId))
lessonDraft.title = 'Mision 1: Orquestar scripts'
lessonDraft.duration = '14 min'
lessonDraft.xp = '240'
lessonDraft.objective = 'Construye un flujo simple que ejecute scripts y deje rastro en logs.'
lessonDraft.videoTitle = 'Flujo de automatización'
lessonDraft.videoUrl = 'https://www.youtube.com/embed/automation-demo'
lessonDraft.documentationLinksText = [
  'Cron jobs | https://docs.example.com/cron',
  'Subprocess | https://docs.python.org/3/library/subprocess.html',
].join('\n')
lessonDraft.exampleTitle = 'Ejemplo de scheduler'
lessonDraft.exampleCode = 'print("scheduler online")\n'
lessonDraft.supportNote = 'Primero valida la secuencia general y luego los detalles de implementacion.'
lessonDraft.imageUrl = 'data:image/png;base64,AAA'
lessonDraft.supportBlocksJson = JSON.stringify(
  [
    {
      id: 'visual-pipeline',
      tipo: 'imagen',
      disposicion: 'arriba',
      titulo: 'Pipeline base',
      contenido: 'Vista rápida del flujo de automatización.',
      imageUrl: 'data:image/png;base64,BBB',
      imageAlt: 'Pipeline de automatización',
      leyenda: 'Cada paso deja un log.',
    },
  ],
  null,
  2,
)
lessonDraft.supportLayoutJson = JSON.stringify(['video', 'blocks', 'documentation', 'example'], null, 2)
lessonDraft.instructionsOverview = 'Levanta un script principal, ejecuta una tarea y registra el resultado.'
lessonDraft.instructionsStepsText = [
  'Crea un archivo principal para lanzar el flujo.',
  'Ejecuta una tarea con subprocess.',
  'Guarda un log con el resultado.',
].join('\n')
lessonDraft.instructionsHint = 'Empieza por una version minima que escriba una sola linea en el log.'
lessonDraft.runtimeMode = 'guided'
lessonDraft.exerciseType = 'Completar código'
lessonDraft.challengeTitle = 'Reto: orquestar scripts'
lessonDraft.prompt = 'Completa el flujo para ejecutar una tarea y registrar el resultado.'
lessonDraft.starterCode = 'resultado = "ok"\nprint(resultado)\n'
lessonDraft.expectedKeywordsText = 'print, resultado'
lessonDraft.successCriteria = 'La solución debe imprimir el estado final del pipeline.'
lessonDraft.expectedResult = 'ok'
lessonDraft.solutionCode = 'resultado = "ok"\nprint(resultado)\n'
lessonDraft.solutionNote = 'Una primera version funcional es suficiente.'
lessonDraft.salidaGuiada = 'ok'
lessonDraft.executionNote = 'Esta misión se valida de forma guiada.'
lessonDraft.successMessage = 'Pipeline validado.'
content = actualizarLeccionEnContenido(content, courseId, unitId, lessonId, lessonDraft)

let finalAssessmentDraft = construirBorradorEvaluacion(content.evaluacionesCursos[courseId].finalAssessment)
finalAssessmentDraft.title = 'Evaluación final: Automation Ops'
finalAssessmentDraft.summary = 'Comprueba que puedes ensamblar un flujo pequeño de automatización.'
finalAssessmentDraft.passingScore = '2'
finalAssessmentDraft.successMessage = 'Evaluación final aprobada.'
finalAssessmentDraft.questionsJson = JSON.stringify(
  [
    {
      id: `${courseId}-final-q1`,
      prompt: 'Que debes revisar si una tarea automatizada falla?',
      options: [
        { id: 'a', label: 'Los logs' },
        { id: 'b', label: 'Solo el nombre del archivo' },
      ],
      correctOptionId: 'a',
      explanation: 'Los logs ayudan a diagnosticar el error.',
    },
    {
      id: `${courseId}-final-q2`,
      prompt: '¿Qué gana el equipo con automatización?',
      options: [
        { id: 'a', label: 'Repetibilidad' },
        { id: 'b', label: 'Mas trabajo manual' },
      ],
      correctOptionId: 'a',
      explanation: 'La automatización mejora repetibilidad y consistencia.',
    },
  ],
  null,
  2,
)
content = actualizarEvaluacionFinalEnContenido(content, courseId, finalAssessmentDraft)

assert.ok(content.cursosGestionadosCms.includes(courseId))
assert.ok(content.catalogosGestionadosCms.includes(courseId))
assert.ok(content.evaluacionesGestionadasCms.includes(courseId))

actualizarSnapshotContenido(content)

const liveCatalogIds = obtenerCatalogoCursos()
  .filter((course) => course.status === 'live')
  .map((course) => course.id)

assert.ok(
  liveCatalogIds.includes(courseId),
  'A published CMS course should appear in the live public catalog.',
)
assert.ok(cursoEstaPublicado(courseId), 'The course should be marked as published.')
assert.ok(
  obtenerCursosPublicados().some((course) => course.id === courseId),
  'The published course should appear in the published course list.',
)

assertPublicProjection(courseId, unitId, lessonId, {
  courseSummary: 'Aprende a automatizar tareas operativas con scripts reutilizables.',
  unitSummary: 'Orquesta tareas pequeñas, logs y ejecuciones programadas.',
  lessonTitle: 'Mision 1: Orquestar scripts',
  lessonObjective: 'Construye un flujo simple que ejecute scripts y deje rastro en logs.',
  videoUrl: 'https://www.youtube.com/embed/automation-demo',
  imageUrl: 'data:image/png;base64,AAA',
  documentationUrl: 'https://docs.example.com/cron',
  instructionsOverview: 'Levanta un script principal, ejecuta una tarea y registra el resultado.',
  expectedResult: 'ok',
  unitAssessmentTitle: 'Checkpoint: pipelines operativos',
  finalAssessmentTitle: 'Evaluación final: Automation Ops',
})

content = alternarPublicacionCursoEnContenido(content, courseId)
actualizarSnapshotContenido(content)

assert.ok(
  !obtenerCatalogoCursos()
    .filter((course) => course.status === 'live')
    .some((course) => course.id === courseId),
  'An unpublished course should disappear from the live public catalog.',
)
assert.equal(cursoEstaPublicado(courseId), false, 'The course should stop being marked as published.')
assert.ok(
  !obtenerCursosPublicados().some((course) => course.id === courseId),
  'The unpublished course should disappear from the published course list.',
)

content = alternarPublicacionCursoEnContenido(content, courseId)

const serializedContent = serializarContenidoPersistible(content)
const rehydratedContent = normalizarContenidoPersistido(serializedContent)
actualizarSnapshotContenido(rehydratedContent)

assert.ok(
  obtenerCatalogoCursos()
    .filter((course) => course.status === 'live')
    .some((course) => course.id === courseId),
  'The live course should still be visible after the CMS Firestore round trip.',
)
assert.ok(cursoEstaPublicado(courseId), 'The round-tripped course should stay published.')
assert.ok(
  obtenerCursosPublicados().some((course) => course.id === courseId),
  'The round-tripped course should stay in the published course list.',
)

assertPublicProjection(courseId, unitId, lessonId, {
  courseSummary: 'Aprende a automatizar tareas operativas con scripts reutilizables.',
  unitSummary: 'Orquesta tareas pequeñas, logs y ejecuciones programadas.',
  lessonTitle: 'Mision 1: Orquestar scripts',
  lessonObjective: 'Construye un flujo simple que ejecute scripts y deje rastro en logs.',
  videoUrl: 'https://www.youtube.com/embed/automation-demo',
  imageUrl: 'data:image/png;base64,AAA',
  documentationUrl: 'https://docs.example.com/cron',
  instructionsOverview: 'Levanta un script principal, ejecuta una tarea y registra el resultado.',
  expectedResult: 'ok',
  unitAssessmentTitle: 'Checkpoint: pipelines operativos',
  finalAssessmentTitle: 'Evaluación final: Automation Ops',
})

console.log('CMS admin content flow verified successfully.')
console.log(`Course id: ${courseId}`)
console.log(`Unit id: ${unitId}`)
console.log(`Lesson id: ${lessonId}`)
console.log('Verified:')
console.log('- course creation and publication')
console.log('- unit and lesson creation')
console.log('- lesson text, video, image, docs and challenge updates')
console.log('- unit/final assessment updates')
console.log('- visibility in the live public catalog')
console.log('- published-course gating helpers')
console.log('- public selectors after a simulated Firestore round trip')
