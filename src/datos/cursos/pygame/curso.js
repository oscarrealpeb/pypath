export const cursoPygame = {
  id: 'pygame',
  title: 'Juegos 2D con Pygame',
  library: 'Pygame',
  requiredCourseIds: [
    'python-fundamentals'
  ],
  summary: 'Una biblioteca muy didactica para aprender loops, eventos, sprites y colisiones mientras construyes juegos y proyectos jugables sencillos.',
  difficulty: 'Visual y amigable para practicar lógica',
  units: [
    {
      id: 'pygame-loop',
      title: 'Loop del juego',
      summary: 'Abre la ventana del juego, escucha eventos y mantén vivo el loop principal.',
      lessons: [
        {
          id: 'pygame-window',
          title: 'Misión 01: Abrir la ventana',
          duration: '9 min',
          xp: 120,
          objective: 'Inicializar pygame y crear una ventana básica para tu juego.',
          resources: {
            videoTitle: 'Primera ventana en Pygame',
            videoUrl: 'https://www.youtube.com/embed/xtk5lR150fg',
            documentationLinks: [
              {
                label: 'Módulo display en Pygame',
                url: 'https://www.pygame.org/docs/ref/display.html'
              },
              {
                label: 'Primeros pasos con pygame.init()',
                url: 'https://www.pygame.org/docs/ref/pygame.html'
              }
            ],
            exampleTitle: 'Ventana minima de juego',
            exampleCode: `import pygame

pygame.init()
screen = pygame.display.set_mode((800, 600))
pygame.display.set_caption("PyPath Runner")
`,
            supportNote: 'En Pygame, una ventana visible te da feedback inmediato y hace el aprendizaje mucho más entretenido.'
          },
          instructions: {
            overview: 'Todo juego en Pygame necesita inicializacion, una superficie visible y un título.',
            steps: [
              'Importa pygame y llama a pygame.init().',
              'Crea la ventana con pygame.display.set_mode(...).',
              'Agrega un título para identificar tu juego o proyecto.'
            ],
            hint: 'Si no existe set_mode, no tendras una ventana real donde dibujar.'
          },
          challenge: {
            exerciseType: 'Completar código',
            title: 'Prepara el escenario',
            prompt: 'Completa el starter para inicializar pygame y abrir una ventana básica.',
            starterCode: `import pygame

# Llama a pygame.init()
# Crea screen = pygame.display.set_mode((800, 600))
# Opcional: agrega un título con pygame.display.set_caption(...)
`,
            expectedKeywords: [
              'pygame.init',
              'set_mode',
              'display'
            ],
            successCriteria: 'Debes inicializar pygame y crear una ventana principal usando pygame.display.set_mode(...).',
            expectedResult: 'Pygame se inicia y aparece una ventana básica lista para empezar a dibujar.',
            solutionCode: `import pygame

pygame.init()
screen = pygame.display.set_mode((800, 600))
pygame.display.set_caption("PyPath Runner")
`,
            solutionNote:
              'La solución real inicializa Pygame, crea la ventana principal con set_mode y deja un título para identificar el juego.',
            salidaGuiada: 'Pygame inicializado. Ventana 800x600 creada.',
            executionNote: 'Aquí usamos una vista guiada porque Pygame no puede abrir una ventana jugable completa dentro del navegador.',
            successMessage: 'Escenario listo. Ya tienes la base visual para crear un mini juego.'
          }
        },
        {
          id: 'pygame-input',
          title: 'Misión 02: Escuchar eventos',
          duration: '11 min',
          xp: 135,
          objective: 'Crear un loop que procese eventos y permita cerrar la ventana sin errores.',
          resources: {
            videoTitle: 'Eventos y teclas en Pygame',
            videoUrl: 'https://www.youtube.com/embed/S5D2-IOwQfM',
            documentationLinks: [
              {
                label: 'Cola de eventos en Pygame',
                url: 'https://www.pygame.org/docs/ref/event.html'
              },
              {
                label: 'Constantes y evento QUIT',
                url: 'https://www.pygame.org/docs/ref/pygame.html'
              }
            ],
            exampleTitle: 'Loop básico',
            exampleCode: `running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
`,
            supportNote: 'El loop es el corazón del juego. Entenderlo te ayuda a pensar en entradas, movimiento y render.'
          },
          instructions: {
            overview: 'Sin un loop de eventos, la ventana no responde y el juego no puede cerrarse correctamente.',
            steps: [
              'Crea una variable running = True.',
              'Usa while running para mantener vivo el juego.',
              'Recorre pygame.event.get() y detecta pygame.QUIT.'
            ],
            hint: 'QUIT suele usarse para cambiar running a False y salir de forma limpia.'
          },
          challenge: {
            exerciseType: 'Lectura de código',
            title: 'Mantener vivo el loop',
            prompt: 'Actualiza el starter para procesar eventos y detectar cuando el usuario cierra la ventana.',
            starterCode: `running = True

# Usa while running para mantener vivo el juego
# Recorre pygame.event.get() y detecta pygame.QUIT para salir
`,
            expectedKeywords: [
              'while',
              'pygame.event.get',
              'pygame.QUIT'
            ],
            successCriteria: 'Debes crear el loop principal del juego y detectar pygame.QUIT para cerrar la ventana sin bloquearla.',
            expectedResult: 'El loop queda activo y el juego se cierra de forma limpia cuando llega el evento QUIT.',
            solutionCode: `running = True

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
`,
            solutionNote:
              'El while mantiene vivo el juego y el for recorre la cola de eventos hasta encontrar QUIT para salir de forma limpia.',
            salidaGuiada: 'Loop activo. Evento QUIT detectado. Juego cerrado sin bloqueo.',
            executionNote: 'La vista guiada resume el comportamiento esperado del loop principal y su salida ordenada.',
            successMessage: 'Loop controlado. Ya puedes escuchar entradas sin congelar la aplicación.'
          }
        }
      ]
    },
    {
      id: 'pygame-sprites',
      title: 'Sprites y colisiones',
      summary: 'Dibuja elementos, mueve un jugador y detecta contactos basicos.',
      lessons: [
        {
          id: 'pygame-sprite',
          title: 'Misión 03: Dibujar un jugador',
          duration: '12 min',
          xp: 150,
          objective: 'Crear un rect básico y dibujarlo en la pantalla como jugador.',
          resources: {
            videoTitle: 'Mover rectangulos en Pygame',
            videoUrl: 'https://www.youtube.com/embed/AnEmNG69xv8',
            documentationLinks: [
              {
                label: 'pygame.draw y primitivas',
                url: 'https://www.pygame.org/docs/ref/draw.html'
              },
              {
                label: 'Rect en Pygame',
                url: 'https://www.pygame.org/docs/ref/rect.html'
              }
            ],
            exampleTitle: 'Jugador simple',
            exampleCode: `player = pygame.Rect(100, 100, 40, 40)
pygame.draw.rect(screen, (0, 255, 159), player)
pygame.display.flip()
`,
            supportNote: 'Un rectangulo simple es suficiente para aprender movimiento, limites y colisiones.'
          },
          instructions: {
            overview: 'No necesitas assets complejos para aprender la base. Un Rect y un draw ya te dejan iterar rápido.',
            steps: [
              'Crea un pygame.Rect con posicion y tamano.',
              'Dibujalo con pygame.draw.rect(...).',
              'Actualiza la pantalla para ver el cambio.'
            ],
            hint: 'Sin pygame.display.flip() o update(), el dibujo no se refleja en la ventana.'
          },
          challenge: {
            exerciseType: 'Completar código',
            title: 'Pinta el primer jugador',
            prompt: 'Completa el starter para crear un rect y dibujarlo con un color visible.',
            starterCode: `player = None

# Crea player = pygame.Rect(...)
# Dibuja ese rectángulo con pygame.draw.rect(...)
# Actualiza la pantalla para verlo
`,
            expectedKeywords: [
              'pygame.Rect',
              'draw.rect',
              'display'
            ],
            successCriteria: 'Debes crear un Rect para el jugador, dibujarlo con un color visible y actualizar la pantalla.',
            expectedResult: 'Se ve un rectángulo en pantalla que funciona como jugador básico dentro del frame.',
            solutionCode: `player = pygame.Rect(100, 100, 40, 40)
pygame.draw.rect(screen, (0, 255, 159), player)
pygame.display.flip()
`,
            solutionNote:
              'Primero se crea el Rect del jugador, luego se dibuja con draw.rect y al final se refresca la pantalla con display.flip().',
            salidaGuiada: 'Jugador dibujado en pantalla. Frame actualizado.',
            executionNote: 'Aquí mostramos una vista guiada del frame porque el dibujo pertenece al render de Pygame.',
            successMessage: 'Sprite básico visible. Ya puedes empezar a pensar en movimiento y estados.'
          }
        },
        {
          id: 'pygame-collision',
          title: 'Misión 04: Detectar colisión',
          duration: '13 min',
          xp: 165,
          objective: 'Usar colliderect para detectar cuando el jugador toca un objetivo.',
          resources: {
            videoTitle: 'Collisiones con colliderect en Pygame',
            videoUrl: 'https://www.youtube.com/embed/BE2I5rimk4g',
            documentationLinks: [
              {
                label: 'Rect y colliderect',
                url: 'https://www.pygame.org/docs/ref/rect.html'
              },
              {
                label: 'Actualizacion de tiempo básica',
                url: 'https://www.pygame.org/docs/ref/time.html'
              }
            ],
            exampleTitle: 'Chequeo de colisión',
            exampleCode: `player = pygame.Rect(100, 100, 40, 40)
coin = pygame.Rect(120, 110, 20, 20)

if player.colliderect(coin):
    print("Punto conseguido")
`,
            supportNote: 'Las colisiones son una puerta de entrada excelente para explicar reglas, puntaje y objetivos.'
          },
          instructions: {
            overview: 'Con colliderect puedes modelar reglas sencillas sin meterte aún en físicas complicadas.',
            steps: [
              'Crea dos Rect: jugador y objetivo.',
              'Usa player.colliderect(objetivo).',
              'Imprime o registra una respuesta cuando se detecte el contacto.'
            ],
            hint: 'Si ambos rectangulos se superponen, colliderect devuelve True.'
          },
          challenge: {
            exerciseType: 'Deteccion de bug',
            title: 'Haz que el punto cuente',
            prompt: 'Completa el starter para detectar la colisión entre el jugador y una moneda.',
            starterCode: `player = pygame.Rect(100, 100, 40, 40)
coin = pygame.Rect(120, 110, 20, 20)

# Usa if player.colliderect(coin):
# Si hay colisión, imprime un mensaje como "Punto conseguido"
`,
            expectedKeywords: [
              'colliderect',
              'print',
              'if'
            ],
            successCriteria: 'Debes usar colliderect dentro de un if para detectar el contacto e imprimir un mensaje cuando ocurra.',
            expectedResult: 'Cuando el jugador toca la moneda, el programa imprime un mensaje de punto conseguido.',
            solutionCode: `player = pygame.Rect(100, 100, 40, 40)
coin = pygame.Rect(120, 110, 20, 20)

if player.colliderect(coin):
    print("Punto conseguido")
`,
            solutionNote:
              'La regla se resuelve con un if sencillo: si colliderect devuelve True, entonces ya puedes lanzar la respuesta del juego.',
            salidaGuiada: 'Colision detectada. Punto conseguido.',
            executionNote: 'La vista guiada refuerza la regla del juego, aunque la colisión visual no se ejecute aquí como en Pygame real.',
            successMessage: 'Colisión lista. Ya tienes una mecánica base para crear objetivos y puntaje.'
          }
        }
      ]
    }
  ]
}
