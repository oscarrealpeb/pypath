import { crearIntentoDiagnosticoAleatorio } from '../../../datos/preguntasDiagnostico.js'

function obtenerRecomendacionPorPorcentaje(score, total) {
  const percentage = total > 0 ? score / total : 0

  if (percentage < 0.5) {
    return {
      level: 'Principiante',
      recommendedCourseId: 'python-fundamentals',
      recommendedUnitId: 'python-boot',
      recommendedLessonId: 'hola-python',
      canSkipFundamentals: false,
      summary:
        'Todavía necesitas construir la base. Empieza por Fundamentos de Python en la lección inicial antes de abrir cualquier otro curso.',
    }
  }

  if (percentage < 0.8) {
    return {
      level: 'Intermedio',
      recommendedCourseId: 'python-fundamentals',
      recommendedUnitId: 'python-tools',
      recommendedLessonId: 'funciones-python',
      canSkipFundamentals: false,
      summary:
        'Tu lógica de Python va mejorando. Continúa en Fundamentos de Python en una unidad más avanzada antes de pasar a otros cursos.',
    }
  }

  return {
    level: 'Avanzado',
    recommendedCourseId: null,
    recommendedUnitId: null,
    recommendedLessonId: null,
    canSkipFundamentals: true,
    summary:
      'Tu resultado fue bastante alto. Si quieres, puedes saltarte Fundamentos y entrar directo a los cursos activos que mejor encajen con tu perfil.',
  }
}

export function crearIntentoDiagnostico() {
  return crearIntentoDiagnosticoAleatorio()
}

export function evaluarDiagnostico(
  answers,
  preguntas,
  { timedOut = false } = {},
) {
  const score = preguntas.reduce((total, pregunta) => {
    const opcionCorrecta = pregunta.options.find((option) => option.correct)
    const respuestaSeleccionada = answers[pregunta.id]

    return opcionCorrecta?.id === respuestaSeleccionada
      ? total + pregunta.points
      : total
  }, 0)
  const total = preguntas.reduce((sum, pregunta) => sum + pregunta.points, 0)
  const answeredCount = preguntas.filter((pregunta) => answers[pregunta.id]).length
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0

  return {
    score,
    total,
    percentage,
    answeredCount,
    timedOut,
    ...obtenerRecomendacionPorPorcentaje(score, total),
  }
}
