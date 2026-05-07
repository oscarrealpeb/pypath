export const opcionesRol = [
  { value: 'programadores', label: 'Programador/a' },
  { value: 'matematicos', label: 'Matemático/a' },
  { value: 'finanzas', label: 'Finanzas' },
  { value: 'analistas', label: 'Analista de datos' },
  { value: 'ciberseguridad', label: 'Ciberseguridad' },
]

export const opcionesInteres = [
  { value: 'bases', label: 'Fundamentos sólidos de Python' },
  { value: 'interfaces', label: 'Interfaces y herramientas visuales' },
  { value: 'videojuegos', label: 'Videojuegos y proyectos jugables' },
  { value: 'ciberseguridad', label: 'Ciberseguridad y automatización' },
  { value: 'datos', label: 'Análisis de datos' },
  { value: 'finanzas', label: 'Reportes y flujos financieros' },
  { value: 'automatizacion', label: 'Scripting y automatización' },
]

const allowedInterestValues = new Set(opcionesInteres.map((option) => option.value))

export function sanearSeleccionIntereses(values, fallback = ['bases']) {
  const sanitizedValues = [...new Set(values ?? [])]
    .filter((value) => allowedInterestValues.has(value))
    .slice(0, 4)

  if (sanitizedValues.length > 0) {
    return sanitizedValues
  }

  return fallback.filter((value) => allowedInterestValues.has(value))
}

export const opcionesExperiencia = [
  { value: 'principiante', label: 'Principiante' },
  { value: 'intermedio', label: 'Intermedio' },
  { value: 'avanzado', label: 'Avanzado' },
]

