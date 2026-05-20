// Plantilla base para las evaluaciones de un curso nuevo.
// Usa exactamente el mismo id de curso que en `src/datos/cursos/...`.

export const evaluacionesCursoPlantilla = {
  unitAssessments: {
    'unidad-demo': {
      id: 'unidad-demo-checkpoint',
      title: 'Evaluación de unidad: Nombre de la unidad',
      summary: 'Resume qué valida esta evaluación.',
      passingScore: 2,
      successMessage: 'Mensaje mostrado al aprobar la evaluación de unidad.',
      questions: [
        {
          id: 'unidad-demo-q1',
          prompt: 'Pregunta de ejemplo',
          options: [
            { id: 'a', label: 'Opción A' },
            { id: 'b', label: 'Opción B' },
            { id: 'c', label: 'Opción C' },
          ],
          correctOptionId: 'a',
          explanation: 'Explicación breve de por qué la respuesta correcta es A.',
        },
      ],
    },
  },
  finalAssessment: {
    id: 'curso-demo-final',
    title: 'Evaluación final del curso: Nombre del curso',
    summary: 'Resume qué valida el cierre del curso.',
    passingScore: 3,
    successMessage: 'Mensaje mostrado al aprobar la evaluación final.',
    questions: [
      {
        id: 'curso-demo-final-q1',
        prompt: 'Pregunta final de ejemplo',
        options: [
          { id: 'a', label: 'Opción A' },
          { id: 'b', label: 'Opción B' },
          { id: 'c', label: 'Opción C' },
        ],
        correctOptionId: 'a',
        explanation: 'Explicacion breve de la respuesta correcta.',
      },
    ],
  },
}
