// Plantilla base para las evaluaciones de un curso nuevo.
// Usa exactamente el mismo id de curso que en `src/datos/cursos/...`.

export const evaluacionesCursoPlantilla = {
  unitAssessments: {
    'unidad-demo': {
      id: 'unidad-demo-checkpoint',
      title: 'Evaluacion de unidad: Nombre de la unidad',
      summary: 'Resume que valida esta evaluacion.',
      passingScore: 2,
      successMessage: 'Mensaje mostrado al aprobar la evaluacion de unidad.',
      questions: [
        {
          id: 'unidad-demo-q1',
          prompt: 'Pregunta de ejemplo',
          options: [
            { id: 'a', label: 'Opcion A' },
            { id: 'b', label: 'Opcion B' },
            { id: 'c', label: 'Opcion C' },
          ],
          correctOptionId: 'a',
          explanation: 'Explicacion breve de por que la respuesta correcta es A.',
        },
      ],
    },
  },
  finalAssessment: {
    id: 'curso-demo-final',
    title: 'Evaluacion final del curso: Nombre del curso',
    summary: 'Resume que valida el cierre del curso.',
    passingScore: 3,
    successMessage: 'Mensaje mostrado al aprobar la evaluacion final.',
    questions: [
      {
        id: 'curso-demo-final-q1',
        prompt: 'Pregunta final de ejemplo',
        options: [
          { id: 'a', label: 'Opcion A' },
          { id: 'b', label: 'Opcion B' },
          { id: 'c', label: 'Opcion C' },
        ],
        correctOptionId: 'a',
        explanation: 'Explicacion breve de la respuesta correcta.',
      },
    ],
  },
}
