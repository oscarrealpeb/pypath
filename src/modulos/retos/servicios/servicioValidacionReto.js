function normalizeOutput(text) {
  return String(text ?? '')
    .replace(/\r\n/g, '\n')
    .split('\n')
    .filter((line) => line.trim() !== '')
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .join('\n')
    .trim()
}

function normalizeForComparison(text) {
  return String(text ?? '')
    .replace(/\r\n/g, '\n')
    .split('\n')
    .filter((line) => line.trim() !== '')
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .join('\n')
    .toLowerCase()
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

  // Removemos comentarios para no validar código comentado
  let codeWithoutComments = code
    .replace(/\/\*[\s\S]*?\*\//g, '') // /* JS multiline */
    .replace(/\/\/.*/g, '')           // // JS single line
    .replace(/#.*/g, '')              // # Python single line

  // Evitar validación exitosa si no ha modificado el starter code en absoluto
  if (trimmedCode === lesson.challenge.starterCode.trim()) {
    return {
      status: 'error',
      message: 'Parece que no has modificado el código base. Intenta resolver el reto antes de validar.',
      missingKeywords: [],
    }
  }

  const normalizedCode = codeWithoutComments.trim().toLowerCase()
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

    if (expectedOutput.includes('x.x.x')) {
      const prefix = expectedOutput.split('x.x.x')[0].trim()
      const versionPattern = new RegExp(
        `^${prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\d+\\.\\d+\\.\\d+$`,
        'i',
      )
      const versionMatch = actualOutput
        .split('\n')
        .some((line) => versionPattern.test(line))

      if (!versionMatch) {
        return {
          status: 'error',
          message: 'Tu solución ya corre, pero la salida todavía no coincide con el formato de versión esperado.',
          missingKeywords: [],
          expectedOutput: lesson.challenge.expectedResult,
          actualOutput: executionResult.output,
        }
      }

      return {
        status: 'success',
        message: lesson.challenge.successMessage,
        missingKeywords: [],
      }
    }

    if (expectedOutput && actualOutput !== expectedOutput) {
      const expectedNormalized = normalizeForComparison(lesson.challenge.expectedResult)
      const actualNormalized = normalizeForComparison(executionResult.output)

      if (expectedNormalized !== actualNormalized) {
        return {
          status: 'error',
          message: 'Tu solución ya corre, pero la salida todavía no coincide con el resultado esperado.',
          missingKeywords: [],
          expectedOutput: lesson.challenge.expectedResult,
          actualOutput: executionResult.output,
        }
      }

      return {
        status: 'success',
        message: lesson.challenge.successMessage,
        missingKeywords: [],
      }
    }
  }

  return {
    status: 'success',
    message: lesson.challenge.successMessage,
    missingKeywords: [],
  }
}

