// Borrador base para las evaluaciones del curso de Pandas.
// Cuando el curso este listo, registralas en `src/datos/cursos/index.js`.

export const evaluacionesPandasFinanzas = {
  unitAssessments: {
    'pandas-arranque': {
      id: 'pandas-arranque-checkpoint',
      title: 'Evaluacion de unidad: Arranque con tablas y Series',
      summary:
        'Verifica que ya entiendes la estructura base de un DataFrame y su creacion desde datos simples.',
      passingScore: 2,
      successMessage:
        'Unidad aprobada. Ya puedes continuar con limpieza, seleccion y transformacion de datos.',
      questions: [
        {
          id: 'pandas-arranque-q1',
          prompt: '¿Que estructura de Pandas representa una tabla con filas y columnas?',
          options: [
            { id: 'a', label: 'DataFrame' },
            { id: 'b', label: 'Widget' },
            { id: 'c', label: 'Signal' },
          ],
          correctOptionId: 'a',
          explanation:
            'DataFrame es la estructura tabular principal de Pandas.',
        },
      ],
    },
  },
  finalAssessment: {
    id: 'pandas-finanzas-final',
    title: 'Evaluacion final del curso: Pandas para datos y finanzas',
    summary:
      'Confirma que puedes crear, leer y transformar tablas basicas con Pandas.',
    passingScore: 3,
    successMessage:
      'Curso finalizado. Ya tienes una base funcional para trabajar con datos y reportes.',
    questions: [
      {
        id: 'pandas-final-q1',
        prompt: '¿Que alias se usa normalmente al importar Pandas?',
        options: [
          { id: 'a', label: 'pd' },
          { id: 'b', label: 'pg' },
          { id: 'c', label: 'df' },
        ],
        correctOptionId: 'a',
        explanation:
          'La convencion mas comun es `import pandas as pd`.',
      },
    ],
  },
}
