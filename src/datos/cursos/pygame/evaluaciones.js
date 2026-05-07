export const evaluacionesPygame = {
  unitAssessments: {
    'pygame-loop': {
      id: 'pygame-loop-checkpoint',
      title: 'Evaluación de unidad: Loop del juego',
      summary: 'Cierra esta unidad demostrando que entiendes inicialización, ventana y loop de eventos.',
      passingScore: 2,
      successMessage: 'Unidad aprobada. Ya puedes pasar a sprites y colisiones dentro de Pygame.',
      questions: [
        {
          id: 'pygame-loop-q1',
          prompt: '¿Qué llamada inicia los módulos principales de Pygame?',
          options: [
            {
              id: 'a',
              label: 'pygame.init()'
            },
            {
              id: 'b',
              label: 'pygame.start()'
            },
            {
              id: 'c',
              label: 'pygame.window()'
            }
          ],
          correctOptionId: 'a',
          explanation: 'pygame.init() prepara los módulos necesarios para empezar.'
        },
        {
          id: 'pygame-loop-q2',
          prompt: '¿Qué crea la ventana principal del juego?',
          options: [
            {
              id: 'a',
              label: 'pygame.event.get()'
            },
            {
              id: 'b',
              label: 'pygame.display.set_mode(...)'
            },
            {
              id: 'c',
              label: 'pygame.Rect(...)'
            }
          ],
          correctOptionId: 'b',
          explanation: 'set_mode crea la superficie principal donde dibuja el juego.'
        },
        {
          id: 'pygame-loop-q3',
          prompt: '¿Qué evento suele usarse para cerrar el juego de forma limpia?',
          options: [
            {
              id: 'a',
              label: 'pygame.QUIT'
            },
            {
              id: 'b',
              label: 'pygame.OPEN'
            },
            {
              id: 'c',
              label: 'pygame.END'
            }
          ],
          correctOptionId: 'a',
          explanation: 'QUIT permite detectar que el usuario quiere cerrar la ventana.'
        }
      ]
    },
    'pygame-sprites': {
      id: 'pygame-sprites-checkpoint',
      title: 'Evaluación de unidad: Sprites y colisiones',
      summary: 'Comprueba que ya entiendes rectángulos, dibujo básico y colisiones simples en pantalla.',
      passingScore: 2,
      successMessage: 'Unidad aprobada. Ya cerraste la etapa de sprites y estás listo para la evaluación final del curso.',
      questions: [
        {
          id: 'pygame-sprites-q1',
          prompt: '¿Qué objeto sencillo se usa mucho para representar jugadores o monedas?',
          options: [
            {
              id: 'a',
              label: 'pygame.Rect'
            },
            {
              id: 'b',
              label: 'pygame.Text'
            },
            {
              id: 'c',
              label: 'pygame.Signal'
            }
          ],
          correctOptionId: 'a',
          explanation: 'Rect es una base muy común para dibujar y detectar colisiones.'
        },
        {
          id: 'pygame-sprites-q2',
          prompt: '¿Qué función dibuja un rectángulo en pantalla?',
          options: [
            {
              id: 'a',
              label: 'pygame.draw.rect(...)'
            },
            {
              id: 'b',
              label: 'pygame.show.rect(...)'
            },
            {
              id: 'c',
              label: 'pygame.render.rect(...)'
            }
          ],
          correctOptionId: 'a',
          explanation: 'pygame.draw.rect permite pintar un rectángulo visible dentro del frame.'
        },
        {
          id: 'pygame-sprites-q3',
          prompt: '¿Qué método sirve para detectar si dos rectángulos se tocan?',
          options: [
            {
              id: 'a',
              label: 'touchrect'
            },
            {
              id: 'b',
              label: 'colliderect'
            },
            {
              id: 'c',
              label: 'detectRect'
            }
          ],
          correctOptionId: 'b',
          explanation: 'colliderect devuelve True cuando dos Rect se superponen.'
        }
      ]
    }
  },
  finalAssessment: {
    id: 'pygame-final',
    title: 'Evaluación final del curso: Pygame',
    summary: 'Valida que ya puedes abrir la ventana, manejar el loop, dibujar un jugador y detectar colisiones.',
    passingScore: 3,
    successMessage: 'Curso finalizado. Ya completaste el curso de Pygame con su evaluación final aprobada.',
    questions: [
      {
        id: 'pygame-final-q1',
        prompt: '¿Qué necesitas antes de dibujar en un juego con Pygame?',
        options: [
          {
            id: 'a',
            label: 'Inicializar pygame y crear la ventana'
          },
          {
            id: 'b',
            label: 'Crear un diccionario'
          },
          {
            id: 'c',
            label: 'Conectar un slot'
          }
        ],
        correctOptionId: 'a',
        explanation: 'La ventana y la inicialización son el punto de partida del juego.'
      },
      {
        id: 'pygame-final-q2',
        prompt: '¿Para qué sirve el loop principal?',
        options: [
          {
            id: 'a',
            label: 'Para mantener vivo el juego y procesar eventos'
          },
          {
            id: 'b',
            label: 'Para imprimir una sola línea'
          },
          {
            id: 'c',
            label: 'Para crear variables globales'
          }
        ],
        correctOptionId: 'a',
        explanation: 'El loop sostiene la lógica, el render y la respuesta a entradas.'
      },
      {
        id: 'pygame-final-q3',
        prompt: '¿Qué combinación resume mejor una colisión simple?',
        options: [
          {
            id: 'a',
            label: 'Dos Rect y colliderect dentro de un if'
          },
          {
            id: 'b',
            label: 'Un print y un while sin eventos'
          },
          {
            id: 'c',
            label: 'Un botón y setText'
          }
        ],
        correctOptionId: 'a',
        explanation: 'Las colisiones simples suelen partir de Rect e if con colliderect.'
      },
      {
        id: 'pygame-final-q4',
        prompt: 'Después de dibujar un objeto, ¿qué ayuda a reflejarlo en pantalla?',
        options: [
          {
            id: 'a',
            label: 'pygame.display.flip() o update()'
          },
          {
            id: 'b',
            label: 'pygame.quit()'
          },
          {
            id: 'c',
            label: 'button.show()'
          }
        ],
        correctOptionId: 'a',
        explanation: 'Hay que actualizar la superficie visible para que el frame se vea.'
      }
    ]
  }
}
