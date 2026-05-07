export const evaluacionesPySide6 = {
  unitAssessments: {
    'boot-sequence': {
      id: 'pyside6-boot-checkpoint',
      title: 'Evaluación de unidad: Secuencia de arranque',
      summary: 'Cierra esta unidad comprobando que ya entiendes la ventana inicial, el botón y el event loop.',
      passingScore: 2,
      successMessage: 'Unidad aprobada. Ya puedes entrar a la parte de señales y entrada de texto en PySide6.',
      questions: [
        {
          id: 'pyside-boot-q1',
          prompt: '¿Qué objeto suele crearse primero al iniciar una app con PySide6?',
          options: [
            {
              id: 'a',
              label: 'QApplication'
            },
            {
              id: 'b',
              label: 'QVBoxLayout'
            },
            {
              id: 'c',
              label: 'QLineEdit'
            }
          ],
          correctOptionId: 'a',
          explanation: 'QApplication prepara la aplicación y el loop principal.'
        },
        {
          id: 'pyside-boot-q2',
          prompt: '¿Qué llamada hace visible una ventana o widget?',
          options: [
            {
              id: 'a',
              label: 'exec()'
            },
            {
              id: 'b',
              label: 'show()'
            },
            {
              id: 'c',
              label: 'connect()'
            }
          ],
          correctOptionId: 'b',
          explanation: 'show() hace que el widget se muestre en pantalla.'
        },
        {
          id: 'pyside-boot-q3',
          prompt: '¿Qué hace clicked.connect(handler)?',
          options: [
            {
              id: 'a',
              label: 'Conecta una señal del botón a una función'
            },
            {
              id: 'b',
              label: 'Cierra la app'
            },
            {
              id: 'c',
              label: 'Cambia el tema visual'
            }
          ],
          correctOptionId: 'a',
          explanation: 'Conecta el evento del clic con la lógica que debe ejecutarse.'
        }
      ]
    },
    'signal-hub': {
      id: 'pyside6-signals-checkpoint',
      title: 'Evaluación de unidad: Centro de señales',
      summary: 'Demuestra que ya puedes reaccionar a clics y cambios de texto dentro de la interfaz.',
      passingScore: 2,
      successMessage: 'Unidad aprobada. Ya puedes pasar a la etapa de layouts y organización visual.',
      questions: [
        {
          id: 'pyside-signal-q1',
          prompt: 'En PySide6, ¿qué es un slot?',
          options: [
            {
              id: 'a',
              label: 'Una función que responde a una señal'
            },
            {
              id: 'b',
              label: 'Un tipo de layout'
            },
            {
              id: 'c',
              label: 'Una ventana secundaria'
            }
          ],
          correctOptionId: 'a',
          explanation: 'Un slot es la función que reacciona cuando una señal se dispara.'
        },
        {
          id: 'pyside-signal-q2',
          prompt: '¿Qué señal te sirve para detectar cambios en un QLineEdit?',
          options: [
            {
              id: 'a',
              label: 'clicked'
            },
            {
              id: 'b',
              label: 'textChanged'
            },
            {
              id: 'c',
              label: 'valuePrinted'
            }
          ],
          correctOptionId: 'b',
          explanation: 'textChanged se activa cuando el texto del campo cambia.'
        },
        {
          id: 'pyside-signal-q3',
          prompt: '¿Para qué sirve setPlaceholderText(...) en un campo?',
          options: [
            {
              id: 'a',
              label: 'Para mostrar una guía dentro del input'
            },
            {
              id: 'b',
              label: 'Para cerrar el campo'
            },
            {
              id: 'c',
              label: 'Para cambiar el tamaño de la ventana'
            }
          ],
          correctOptionId: 'a',
          explanation: 'El placeholder orienta al usuario antes de que escriba.'
        }
      ]
    },
    'layout-lab': {
      id: 'pyside6-layout-checkpoint',
      title: 'Evaluación de unidad: Laboratorio de layouts',
      summary: 'Comprueba que ya sabes organizar widgets en vertical y horizontal con una estructura limpia.',
      passingScore: 2,
      successMessage: 'Unidad aprobada. Ya cerraste la parte de layouts y estás listo para la evaluación final del curso.',
      questions: [
        {
          id: 'pyside-layout-q1',
          prompt: '¿Qué layout usarías para apilar widgets uno debajo del otro?',
          options: [
            {
              id: 'a',
              label: 'QHBoxLayout'
            },
            {
              id: 'b',
              label: 'QVBoxLayout'
            },
            {
              id: 'c',
              label: 'QWidgetLayout'
            }
          ],
          correctOptionId: 'b',
          explanation: 'QVBoxLayout organiza widgets de forma vertical.'
        },
        {
          id: 'pyside-layout-q2',
          prompt: '¿Qué método agrega widgets dentro de un layout?',
          options: [
            {
              id: 'a',
              label: 'setText'
            },
            {
              id: 'b',
              label: 'addWidget'
            },
            {
              id: 'c',
              label: 'appendChild'
            }
          ],
          correctOptionId: 'b',
          explanation: 'addWidget es la forma común de añadir controles a un layout.'
        },
        {
          id: 'pyside-layout-q3',
          prompt: '¿Qué método conecta el layout con la ventana principal?',
          options: [
            {
              id: 'a',
              label: 'setLayout'
            },
            {
              id: 'b',
              label: 'showLayout'
            },
            {
              id: 'c',
              label: 'bindLayout'
            }
          ],
          correctOptionId: 'a',
          explanation: 'setLayout asigna el layout al contenedor para que renderice los widgets.'
        }
      ]
    }
  },
  finalAssessment: {
    id: 'pyside6-final',
    title: 'Evaluación final del curso: PySide6',
    summary: 'Valida que ya entiendes widgets, señales, handlers y layouts para construir herramientas de escritorio.',
    passingScore: 3,
    successMessage: 'Curso finalizado. Ya completaste el curso de PySide6 con evaluación final aprobada.',
    questions: [
      {
        id: 'pyside-final-q1',
        prompt: '¿Qué trío define el arranque básico de una app con PySide6?',
        options: [
          {
            id: 'a',
            label: 'QApplication, widget visible y app.exec()'
          },
          {
            id: 'b',
            label: 'QLineEdit, while y print'
          },
          {
            id: 'c',
            label: 'QVBoxLayout, dict y return'
          }
        ],
        correctOptionId: 'a',
        explanation: 'La app necesita una instancia principal, un widget visible y el event loop.'
      },
      {
        id: 'pyside-final-q2',
        prompt: '¿Qué objetivo cumple clicked.connect(handle_click)?',
        options: [
          {
            id: 'a',
            label: 'Cambiar el idioma del editor'
          },
          {
            id: 'b',
            label: 'Vincular un evento con una función'
          },
          {
            id: 'c',
            label: 'Crear un widget oculto'
          }
        ],
        correctOptionId: 'b',
        explanation: 'Conecta la señal del botón con la acción que debe ejecutarse.'
      },
      {
        id: 'pyside-final-q3',
        prompt: '¿Cuál es una buena razón para usar layouts?',
        options: [
          {
            id: 'a',
            label: 'Organizar widgets sin posicionarlos manualmente'
          },
          {
            id: 'b',
            label: 'Evitar usar show()'
          },
          {
            id: 'c',
            label: 'Quitar señales de los botones'
          }
        ],
        correctOptionId: 'a',
        explanation: 'Los layouts hacen la UI más ordenada y mantenible.'
      },
      {
        id: 'pyside-final-q4',
        prompt: '¿Qué widget es adecuado para entrada de texto simple?',
        options: [
          {
            id: 'a',
            label: 'QPushButton'
          },
          {
            id: 'b',
            label: 'QLineEdit'
          },
          {
            id: 'c',
            label: 'QHBoxLayout'
          }
        ],
        correctOptionId: 'b',
        explanation: 'QLineEdit está pensado para escribir texto corto en formularios.'
      }
    ]
  }
}
