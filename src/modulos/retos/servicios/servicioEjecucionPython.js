export function ejecutarSimulacionReto(code, lesson) {
  const trimmedCode = code.trim()

  if (!trimmedCode) {
    return {
      status: 'idle',
      title: 'Vista previa en espera',
      output: 'Aún no hay código suficiente para revisar esta misión.',
      details: 'Escribe algo en el editor y luego pulsa Ejecutar.',
    }
  }

  const normalizedCode = trimmedCode.toLowerCase()
  const matchedKeywords = lesson.challenge.expectedKeywords.filter((keyword) =>
    normalizedCode.includes(keyword.toLowerCase()),
  )

  if (matchedKeywords.length === lesson.challenge.expectedKeywords.length) {
    return {
      status: 'success',
      title: 'Estructura detectada',
      output: lesson.challenge.salidaGuiada ?? 'La simulación terminó sin errores visibles.',
      details:
        lesson.challenge.executionNote ??
        'La salida es ilustrativa y resume lo que debería ocurrir cuando esta misión se lleve a un entorno real.',
    }
  }

  if (matchedKeywords.length > 0) {
    return {
      status: 'warning',
      title: 'Estructura parcial',
      output: `Se detectaron ${matchedKeywords.length} de ${lesson.challenge.expectedKeywords.length} pistas del reto.`,
      details: `La solución aún parece incompleta. Revisa estas claves del ejercicio: ${lesson.challenge.expectedKeywords.join(', ')}.`,
    }
  }

  return {
    status: 'warning',
    title: 'Falta la base del reto',
    output: 'La revisión guiada todavía no detecta la base de la solución.',
    details: `Prueba agregando algunas de estas pistas: ${lesson.challenge.expectedKeywords.join(', ')}.`,
  }
}

