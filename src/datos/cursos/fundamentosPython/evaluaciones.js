export const evaluacionesFundamentosPython = {
  unitAssessments: {
    'python-boot': {
      id: 'python-boot-checkpoint',
      title: 'Evaluación de unidad: Arranque en Python',
      summary: 'Cierra esta unidad demostrando que entiendes variables, print, decisiones y bucles.',
      passingScore: 2,
      successMessage: 'Unidad aprobada. Ya puedes pasar a la siguiente parte de Fundamentos con una base más firme.',
      questions: [
        {
          id: 'boot-q1',
          prompt: '¿Qué hace print("Hola") en Python?',
          options: [
            {
              id: 'a',
              label: 'Muestra Hola en consola'
            },
            {
              id: 'b',
              label: 'Guarda Hola en una variable'
            },
            {
              id: 'c',
              label: 'Cierra el programa'
            }
          ],
          correctOptionId: 'a',
          explanation: 'print sirve para mostrar texto o valores en la salida de consola.'
        },
        {
          id: 'boot-q2',
          prompt: '¿Qué estructura se usa para repetir acciones recorriendo una lista?',
          options: [
            {
              id: 'a',
              label: 'if'
            },
            {
              id: 'b',
              label: 'for'
            },
            {
              id: 'c',
              label: 'def'
            }
          ],
          correctOptionId: 'b',
          explanation: 'for permite iterar sobre listas, cadenas y otros elementos recorribles.'
        },
        {
          id: 'boot-q3',
          prompt: 'Si quieres imprimir solo "practicar" dentro de una lista, ¿qué falta además del for?',
          options: [
            {
              id: 'a',
              label: 'Una condición if'
            },
            {
              id: 'b',
              label: 'Otra función print dentro de def'
            },
            {
              id: 'c',
              label: 'Un diccionario'
            }
          ],
          correctOptionId: 'a',
          explanation: 'La condición if te permite filtrar qué elemento quieres mostrar.'
        }
      ]
    },
    'python-tools': {
      id: 'python-tools-checkpoint',
      title: 'Evaluación de unidad: Herramientas base',
      summary: 'Comprueba que ya puedes encapsular lógica con funciones y leer datos desde colecciones.',
      passingScore: 2,
      successMessage: 'Unidad aprobada. Ya dominaste las herramientas base de Python dentro de este curso.',
      questions: [
        {
          id: 'tools-q1',
          prompt: '¿Para qué sirve una función en Python?',
          options: [
            {
              id: 'a',
              label: 'Para repetir lógica sin copiarla muchas veces'
            },
            {
              id: 'b',
              label: 'Para declarar listas'
            },
            {
              id: 'c',
              label: 'Para cerrar bucles automáticamente'
            }
          ],
          correctOptionId: 'a',
          explanation: 'Las funciones te ayudan a agrupar y reutilizar comportamiento.'
        },
        {
          id: 'tools-q2',
          prompt: '¿Cómo accedes al valor de la clave "rol" en perfil = {"rol": "programadora"}?',
          options: [
            {
              id: 'a',
              label: 'perfil("rol")'
            },
            {
              id: 'b',
              label: 'perfil["rol"]'
            },
            {
              id: 'c',
              label: 'perfil.rol()'
            }
          ],
          correctOptionId: 'b',
          explanation: 'En un diccionario se accede por clave usando corchetes.'
        },
        {
          id: 'tools-q3',
          prompt: 'Si una función recibe un argumento, ¿qué representa ese dato?',
          options: [
            {
              id: 'a',
              label: 'El valor que entra a la función para usarlo dentro'
            },
            {
              id: 'b',
              label: 'Una condición del while'
            },
            {
              id: 'c',
              label: 'El resultado final del programa'
            }
          ],
          correctOptionId: 'a',
          explanation: 'Los argumentos son entradas que la función puede usar para trabajar.'
        }
      ]
    }
  },
  finalAssessment: {
    id: 'python-fundamentals-final',
    title: 'Evaluación final del curso: Fundamentos de Python',
    summary: 'Esta evaluación final valida que ya puedes avanzar a bibliotecas como PySide6 o Pygame.',
    passingScore: 3,
    successMessage: 'Curso finalizado. Fundamentos de Python ya quedó aprobado y se desbloquean las bibliotecas dependientes.',
    questions: [
      {
        id: 'fund-final-q1',
        prompt: '¿Qué combinación es clave para mostrar un dato legible en consola?',
        options: [
          {
            id: 'a',
            label: 'Variable + print'
          },
          {
            id: 'b',
            label: 'while + dict'
          },
          {
            id: 'c',
            label: 'class + import'
          }
        ],
        correctOptionId: 'a',
        explanation: 'Declarar una variable y mostrarla con print es parte de la base de Python.'
      },
      {
        id: 'fund-final-q2',
        prompt: '¿Qué estructura usarías para ejecutar una acción solo si se cumple una condición?',
        options: [
          {
            id: 'a',
            label: 'for'
          },
          {
            id: 'b',
            label: 'if'
          },
          {
            id: 'c',
            label: 'print'
          }
        ],
        correctOptionId: 'b',
        explanation: 'if evalúa una condición y permite decidir qué bloque ejecutar.'
      },
      {
        id: 'fund-final-q3',
        prompt: '¿Cuál es la mejor descripción de una función?',
        options: [
          {
            id: 'a',
            label: 'Un bloque reutilizable de código con nombre'
          },
          {
            id: 'b',
            label: 'Una lista ordenada'
          },
          {
            id: 'c',
            label: 'Una variable especial para loops'
          }
        ],
        correctOptionId: 'a',
        explanation: 'Una función encapsula lógica y puede llamarse varias veces.'
      },
      {
        id: 'fund-final-q4',
        prompt: '¿Qué tipo de estructura es perfil = {"nombre": "Ana"}?',
        options: [
          {
            id: 'a',
            label: 'Una tupla'
          },
          {
            id: 'b',
            label: 'Un diccionario'
          },
          {
            id: 'c',
            label: 'Un condicional'
          }
        ],
        correctOptionId: 'b',
        explanation: 'Ese formato clave-valor corresponde a un diccionario.'
      }
    ]
  }
}
