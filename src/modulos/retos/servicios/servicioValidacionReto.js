function normalizeOutput(text) {
  return String(text ?? '')
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join('\n')
    .trim()
}

export function validarReto(code, lesson, executionResult = null) {
  const trimmedCode = code.trim()

  if (!trimmedCode) {
    return {
      status: 'error',
      message: 'Escribe algo de código antes de ejecutar la validación.',
      missingKeywords: lesson.challenge.expectedKeywords,
    }
  }

  const normalizedCode = trimmedCode.toLowerCase()
  const missingKeywords = lesson.challenge.expectedKeywords.filter(
    (keyword) => !normalizedCode.includes(keyword.toLowerCase()),
  )

  if (missingKeywords.length > 0) {
    return {
      status: 'error',
      message: 'Vas bien, pero el validador aún no detecta varias señales clave de la misión.',
      missingKeywords,
    }
  }

  if (lesson.challenge.runtimeMode === 'python') {
    if (!executionResult) {
      return {
        status: 'error',
        message: 'Primero ejecuta el código para revisar si la salida coincide con lo esperado.',
        missingKeywords: [],
      }
    }

    if (executionResult.status === 'error') {
      return {
        status: 'error',
        message: 'Tu código todavía no se ejecuta correctamente. Corrige el error y vuelve a validar.',
        missingKeywords: [],
      }
    }

    const expectedOutput = normalizeOutput(lesson.challenge.expectedResult)
    const actualOutput = normalizeOutput(executionResult.output)

    if (expectedOutput && actualOutput !== expectedOutput) {
      return {
        status: 'error',
        message: 'Tu solución ya corre, pero la salida todavía no coincide con el resultado esperado.',
        missingKeywords: [],
        expectedOutput: lesson.challenge.expectedResult,
        actualOutput: executionResult.output,
      }
    }
  }

  return {
    status: 'success',
    message: lesson.challenge.successMessage,
    missingKeywords: [],
  }
}

