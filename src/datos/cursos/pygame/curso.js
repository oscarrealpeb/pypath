export const cursoPygame = {
  id: 'pygame',
  title: 'Juegos 2D con Pygame',
  library: 'Pygame',
  requiredCourseIds: [
    'python-fundamentals'
  ],
  summary: 'Una biblioteca muy didáctica para aprender loops, eventos, sprites y colisiones mientras construyes juegos y proyectos jugables sencillos.',
  difficulty: 'Fácil (6/10) - Visual y amigable para practicar lógica',
  units: [
    {
      id: 'pygame-intro',
      title: 'Introducción a Pygame',
      summary: 'Comprende cómo funciona Pygame y crea tus primeras aplicaciones interactivas con ventanas, eventos y movimiento básico.',
      lessons: [
        {
          id: 'pygame-instalacion',
          title: 'Misión 01: Instalación y primer programa',
          duration: '8 min',
          xp: 100,
          objective: 'Instalar Pygame y ejecutar tu primer script paso a paso.',
          resources: {
            videoTitle: 'Instalación de Pygame paso a paso',
            videoUrl: 'https://www.youtube.com/embed/jO6qQDNa2UY',
            documentationLinks: [
              { label: 'Instalación oficial de Pygame', url: 'https://www.pygame.org/wiki/GettingStarted' },
              { label: 'Documentación principal de Pygame', url: 'https://www.pygame.org/docs/' }
            ],
            exampleTitle: 'Primer programa con Pygame',
            exampleCode: `import pygame\n\npygame.init()\nprint("Pygame listo")\npygame.quit()`,
            supportNote: 'Vamos a hacer este proceso en dos partes muy sencillas para entender cada paso.'
          },
          instructions: {
            overview: 'Pygame requiere inicializarse antes de usarse y cerrarse correctamente al terminar.',
            steps: [
              'Paso 1: Importar e inicializar la librería.',
              'Paso 2: Liberar recursos cerrando Pygame correctamente.'
            ],
            hint: 'Asegúrate de inicializar antes de imprimir, y de cerrar al final.'
          },
          challenges: [
            {
              exerciseType: 'Completar código',
              title: 'Paso 1: Inicializa Pygame',
              prompt: 'Importa pygame, inicialízalo usando pygame.init() y muestra un mensaje en consola.',
              starterCode: `import pygame\n\n# Llama a pygame.init() aquí\n\nprint("Pygame listo para usar!")`,
              expectedKeywords: ['pygame.init'],
              successCriteria: 'El código debe inicializar pygame y no mostrar errores.',
              expectedResult: 'Pygame listo para usar!',
              solutionCode: `import pygame\n\npygame.init()\nprint("Pygame listo para usar!")`,
              solutionNote: 'init() prepara todos los módulos internos de Pygame.',
              salidaGuiada: 'Pygame listo para usar!',
              executionNote: 'Excelente. Pygame está cargado en memoria.',
              successMessage: '¡Bien hecho! Ahora Pygame está listo.'
            },
            {
              exerciseType: 'Completar código',
              title: 'Paso 2: Cierre limpio',
              prompt: 'Ahora añade pygame.quit() al final para liberar los recursos correctamente.',
              starterCode: `import pygame\n\npygame.init()\nprint("Pygame funcionando")\n\n# Llama a pygame.quit() aquí`,
              expectedKeywords: ['pygame.quit'],
              successCriteria: 'El código debe incluir la limpieza al final con quit().',
              expectedResult: 'Pygame funcionando',
              solutionCode: `import pygame\n\npygame.init()\nprint("Pygame funcionando")\npygame.quit()`,
              solutionNote: 'quit() es lo contrario a init().',
              salidaGuiada: 'Pygame funcionando',
              executionNote: 'Recursos liberados correctamente.',
              successMessage: 'Entorno listo y limpio. Ya puedes empezar a construir.'
            }
          ]
        },
        {
          id: 'pygame-ventanas',
          title: 'Misión 02: Ventanas y colores',
          duration: '10 min',
          xp: 115,
          objective: 'Crear una ventana con un color de fondo sólido paso a paso.',
          resources: {
            videoTitle: 'Ventanas y colores en Pygame',
            videoUrl: 'https://www.youtube.com/embed/xtk5lR150fg',
            documentationLinks: [
              { label: 'pygame.display — módulo de pantalla', url: 'https://www.pygame.org/docs/ref/display.html' }
            ],
            exampleTitle: 'Ventana con fondo azul',
            exampleCode: `import pygame\npygame.init()\nscreen = pygame.display.set_mode((800, 600))\nscreen.fill((30, 30, 80))\npygame.display.flip()\npygame.quit()`,
            supportNote: 'Los colores en Pygame se expresan como tuplas RGB: (rojo, verde, azul).'
          },
          instructions: {
            overview: 'Vamos a construir la ventana en dos partes: primero crearla y luego pintarla.',
            steps: [
              'Usa set_mode para crear el tamaño.',
              'Usa fill y flip para pintarla.'
            ],
            hint: 'Acuérdate de display.flip() para ver los cambios.'
          },
          challenges: [
            {
              exerciseType: 'Completar código',
              title: 'Paso 1: Crea la pantalla',
              prompt: 'Crea una ventana de 800x600 y asígnala a la variable screen.',
              starterCode: `import pygame\npygame.init()\n\n# Usa pygame.display.set_mode((800, 600))\nscreen = \n`,
              expectedKeywords: ['set_mode', '800', '600'],
              successCriteria: 'La ventana debe crearse con las dimensiones correctas.',
              expectedResult: 'Ventana de 800x600 abierta (fondo negro por defecto).',
              solutionCode: `import pygame\npygame.init()\nscreen = pygame.display.set_mode((800, 600))`,
              solutionNote: 'set_mode() crea la superficie principal.',
              salidaGuiada: 'Ventana creada',
              executionNote: 'Superficie de juego en memoria.',
              successMessage: '¡Ventana creada!'
            },
            {
              exerciseType: 'Completar código',
              title: 'Paso 2: Rellena y muestra',
              prompt: 'Rellena la pantalla screen con un color y usa pygame.display.flip() para mostrarlo.',
              starterCode: `import pygame\npygame.init()\nscreen = pygame.display.set_mode((800, 600))\n\n# Usa screen.fill((30, 30, 80))\n\n# Usa pygame.display.flip()`,
              expectedKeywords: ['fill', 'flip'],
              successCriteria: 'Debes pintar el fondo y actualizar la pantalla.',
              expectedResult: 'Ventana de 800x600 con fondo de color.',
              solutionCode: `import pygame\npygame.init()\nscreen = pygame.display.set_mode((800, 600))\nscreen.fill((30, 30, 80))\npygame.display.flip()`,
              solutionNote: 'fill pinta en la memoria, flip lo traslada al monitor.',
              salidaGuiada: 'Ventana pintada',
              executionNote: '¡El lienzo ya tiene color!',
              successMessage: 'Lienzo listo. Ya tienes dónde dibujar tu juego.'
            }
          ]
        },
        {
          id: 'pygame-gameloop',
          title: 'Misión 03: El game loop',
          duration: '11 min',
          xp: 130,
          objective: 'Implementar el loop principal de un juego dividiendo la lógica en etapas simples.',
          resources: {
            videoTitle: 'Game loop explicado en Pygame',
            videoUrl: 'https://www.youtube.com/embed/S5D2-IOwQfM',
            documentationLinks: [
              { label: 'Estructura básica', url: 'https://www.pygame.org/docs/ref/pygame.html' }
            ],
            exampleTitle: 'Loop principal mínimo',
            exampleCode: `running = True\nwhile running:\n    for event in pygame.event.get():\n        if event.type == pygame.QUIT:\n            running = False\n    pygame.display.flip()`,
            supportNote: 'El game loop es el corazón del juego.'
          },
          instructions: {
            overview: 'Crearemos el loop paso a paso.',
            steps: [
              'Configura el bucle while.',
              'Añade el procesador de eventos para no quedarte trabado.',
              'Añade el refresco de pantalla en cada vuelta.'
            ],
            hint: 'Divide y vencerás: el bucle primero, los eventos después.'
          },
          challenges: [
            {
              exerciseType: 'Completar código',
              title: 'Paso 1: Bucle infinito controlado',
              prompt: 'Define running = True y crea un bucle while running:',
              starterCode: `# running = True\n\n# while running:\n    # print("Loop activo")\n    # running = False # para que no sea infinito aquí`,
              expectedKeywords: ['running', 'while'],
              successCriteria: 'Debes usar el while con la bandera.',
              expectedResult: 'Loop activo',
              solutionCode: `running = True\nwhile running:\n    print("Loop activo")\n    running = False`,
              solutionNote: 'Un bucle básico usando un booleano.',
              salidaGuiada: 'Loop activo',
              executionNote: 'Estructura base correcta.',
              successMessage: '¡Bucle listo!'
            },
            {
              exerciseType: 'Completar código',
              title: 'Paso 2: Detectar el botón de cierre',
              prompt: 'Dentro del bucle, recorre pygame.event.get() y detén el bucle si detectas pygame.QUIT.',
              starterCode: `running = True\nwhile running:\n    # for event in pygame.event.get():\n        # if event.type == pygame.QUIT:\n            # running = False`,
              expectedKeywords: ['event.get', 'QUIT'],
              successCriteria: 'Debes atrapar el evento QUIT.',
              expectedResult: 'Juego responde a eventos de ventana.',
              solutionCode: `running = True\nwhile running:\n    for event in pygame.event.get():\n        if event.type == pygame.QUIT:\n            running = False`,
              solutionNote: 'Así el jugador puede cerrar la ventana de forma natural.',
              salidaGuiada: 'Escuchando eventos...',
              executionNote: 'Eventos integrados.',
              successMessage: '¡Ahora el juego puede cerrarse sin crashear!'
            },
            {
              exerciseType: 'Completar código',
              title: 'Paso 3: Refresco continuo',
              prompt: 'Al final de tu bucle (fuera del for de eventos), añade screen.fill y pygame.display.flip()',
              starterCode: `running = True\nwhile running:\n    for event in pygame.event.get():\n        if event.type == pygame.QUIT:\n            running = False\n    # screen.fill((0,0,0))\n    # pygame.display.flip()`,
              expectedKeywords: ['fill', 'flip'],
              successCriteria: 'La pantalla debe limpiarse y actualizarse cada frame.',
              expectedResult: 'Juego corriendo y redibujando.',
              solutionCode: `running = True\nwhile running:\n    for event in pygame.event.get():\n        if event.type == pygame.QUIT:\n            running = False\n    screen.fill((0, 0, 0))\n    pygame.display.flip()`,
              solutionNote: 'El loop está completo: procesa entrada, estado y dibujo.',
              salidaGuiada: 'Loop completo y activo',
              executionNote: 'Todo el pipeline gráfico funciona.',
              successMessage: 'Loop funcionando al 100%. Tu juego ya tiene pulso propio.'
            }
          ]
        },
        {
          id: 'pygame-eventos',
          title: 'Misión 04: Eventos y teclado',
          duration: '12 min',
          xp: 140,
          objective: 'Detectar pulsaciones de teclas separando la lógica en pequeños retos.',
          resources: {
            videoTitle: 'Entrada de teclado en Pygame',
            videoUrl: 'https://www.youtube.com/embed/i6xMBig-pP4',
            documentationLinks: [
              { label: 'pygame.key — módulo de teclado', url: 'https://www.pygame.org/docs/ref/key.html' }
            ],
            exampleTitle: 'Detectar flechas',
            exampleCode: `keys = pygame.key.get_pressed()\nif keys[pygame.K_LEFT]:\n    print("← izquierda")`,
            supportNote: 'get_pressed() devuelve el estado de TODAS las teclas en el momento exacto.'
          },
          instructions: {
            overview: 'Haremos la detección en dos fases: obtener el estado y evaluarlo.',
            steps: [
              'Guarda el array de teclas presionadas.',
              'Comprueba si una tecla específica está presionada.'
            ],
            hint: 'Las teclas se identifican con prefijo K_, como K_LEFT.'
          },
          challenges: [
            {
              exerciseType: 'Completar código',
              title: 'Paso 1: Leer el estado del teclado',
              prompt: 'Usa pygame.key.get_pressed() y guárdalo en una variable llamada "keys".',
              starterCode: `# Obtén las teclas\nkeys = `,
              expectedKeywords: ['get_pressed'],
              successCriteria: 'Debes invocar get_pressed().',
              expectedResult: 'Se obtuvo el array de teclado.',
              solutionCode: `keys = pygame.key.get_pressed()`,
              solutionNote: 'Esto nos da un mapa completo del teclado.',
              salidaGuiada: 'Array de teclas cargado',
              executionNote: 'Lectura exitosa.',
              successMessage: '¡Bien! Tienes acceso al teclado.'
            },
            {
              exerciseType: 'Completar código',
              title: 'Paso 2: Detectar el movimiento',
              prompt: 'Usa el array keys para imprimir un mensaje si pygame.K_RIGHT está siendo presionada.',
              starterCode: `keys = pygame.key.get_pressed()\n\n# if keys[pygame.K_RIGHT]:\n    # print("A la derecha!")`,
              expectedKeywords: ['K_RIGHT', 'print'],
              successCriteria: 'Debes comprobar K_RIGHT.',
              expectedResult: 'A la derecha!',
              solutionCode: `keys = pygame.key.get_pressed()\nif keys[pygame.K_RIGHT]:\n    print("A la derecha!")`,
              solutionNote: 'Compruebas un índice del array para saber si es True o False.',
              salidaGuiada: 'A la derecha!',
              executionNote: '¡Movimiento detectado!',
              successMessage: 'Teclado conectado de forma correcta.'
            }
          ]
        },
        {
          id: 'pygame-figuras',
          title: 'Misión 05: Dibujar figuras simples',
          duration: '11 min',
          xp: 130,
          objective: 'Pintar de manera fácil rectángulos y círculos paso a paso.',
          resources: {
            videoTitle: 'Dibujar formas en Pygame',
            videoUrl: 'https://www.youtube.com/embed/AnEmNG69xv8',
            documentationLinks: [
              { label: 'pygame.draw', url: 'https://www.pygame.org/docs/ref/draw.html' }
            ],
            exampleTitle: 'Formas',
            exampleCode: `pygame.draw.rect(screen, (0, 255, 100), (100, 100, 60, 60))`,
            supportNote: 'Los parámetros son: superficie, color y forma (x, y, ancho, alto).'
          },
          instructions: {
            overview: 'Primero dibujaremos un cuadrado y luego probaremos con otra figura.',
            steps: [
              'Llama a pygame.draw.rect()',
              'Llama a pygame.draw.circle()'
            ],
            hint: 'Recuerda que todas toman `screen` como primer argumento.'
          },
          challenges: [
            {
              exerciseType: 'Completar código',
              title: 'Paso 1: Tu primer rectángulo',
              prompt: 'Usa pygame.draw.rect(screen, color, (x, y, w, h)) para dibujar una caja roja.',
              starterCode: `rojo = (255, 0, 0)\n# Dibuja la caja en x=10, y=10 con tamaño 50x50\n# pygame.draw.rect(screen, rojo, (10, 10, 50, 50))`,
              expectedKeywords: ['draw.rect'],
              successCriteria: 'Un rectángulo se debe renderizar.',
              expectedResult: 'Un cuadrado rojo visible.',
              solutionCode: `rojo = (255, 0, 0)\npygame.draw.rect(screen, rojo, (10, 10, 50, 50))`,
              solutionNote: 'rect es la función más útil y usada para crear UI temporal.',
              salidaGuiada: 'Rectángulo rojo dibujado',
              executionNote: '¡Bien! El render funciona.',
              successMessage: '¡Caja dibujada!'
            },
            {
              exerciseType: 'Completar código',
              title: 'Paso 2: Dibuja un círculo',
              prompt: 'Añade pygame.draw.circle(screen, color, (x, y), radio) al lado.',
              starterCode: `rojo = (255, 0, 0)\npygame.draw.rect(screen, rojo, (10, 10, 50, 50))\n\nverde = (0, 255, 0)\n# Dibuja un círculo en (100, 100) con radio 25`,
              expectedKeywords: ['draw.circle'],
              successCriteria: 'El círculo debe dibujarse.',
              expectedResult: 'Cuadrado y círculo visibles.',
              solutionCode: `rojo = (255, 0, 0)\npygame.draw.rect(screen, rojo, (10, 10, 50, 50))\nverde = (0, 255, 0)\npygame.draw.circle(screen, verde, (100, 100), 25)`,
              solutionNote: 'Las coordenadas del círculo marcan su centro, no su esquina superior izquierda.',
              salidaGuiada: 'Círculo dibujado',
              executionNote: 'Geometría superada.',
              successMessage: 'Escena básica lista. Ya puedes dibujar props.'
            }
          ]
        },
        {
          id: 'pygame-movimiento',
          title: 'Misión 06: Movimiento básico',
          duration: '13 min',
          xp: 150,
          objective: 'Desplazar formas alterando variables de posición.',
          resources: {
            videoTitle: 'Mover objetos',
            videoUrl: 'https://www.youtube.com/embed/i6xMBig-pP4',
            documentationLinks: [
              { label: 'pygame.Rect', url: 'https://www.pygame.org/docs/ref/rect.html' }
            ],
            exampleTitle: 'Coordenadas variables',
            exampleCode: `x += speed\npygame.draw.rect(screen, color, (x, y, 40, 40))`,
            supportNote: 'Separar x e y en variables te permite modificarlas antes de pasarlas a draw.'
          },
          instructions: {
            overview: 'Vamos a mover un objeto modificando sus coordenadas antes de pintarlo.',
            steps: [
              'Altera la X.',
              'Pinta la figura en las nuevas coordenadas.'
            ],
            hint: 'Si restas a Y, el objeto sube. Si sumas a X, va a la derecha.'
          },
          challenges: [
            {
              exerciseType: 'Completar código',
              title: 'Paso 1: Variables dinámicas',
              prompt: 'Cambia x restándole la variable speed cuando se pulse izquierda.',
              starterCode: `x, y = 400, 300\nspeed = 4\nkeys = pygame.key.get_pressed()\n\n# if keys[pygame.K_LEFT]:\n    # x -= speed`,
              expectedKeywords: ['K_LEFT', '-='],
              successCriteria: 'Debes modificar x restando velocidad.',
              expectedResult: 'x disminuye',
              solutionCode: `x, y = 400, 300\nspeed = 4\nkeys = pygame.key.get_pressed()\nif keys[pygame.K_LEFT]:\n    x -= speed`,
              solutionNote: 'Restar a X nos mueve a la izquierda.',
              salidaGuiada: 'Calculando nueva posición...',
              executionNote: 'La lógica matemática es correcta.',
              successMessage: '¡Bien calculado!'
            },
            {
              exerciseType: 'Completar código',
              title: 'Paso 2: Aplicar y dibujar',
              prompt: 'Usa esas variables (x, y) para dibujar un rectángulo.',
              starterCode: `x, y = 400, 300\nkeys = pygame.key.get_pressed()\nif keys[pygame.K_LEFT]: x -= 4\n\n# Usa pygame.draw.rect(screen, (255,255,255), (x, y, 40, 40))`,
              expectedKeywords: ['draw.rect', '(x, y'],
              successCriteria: 'El rectángulo debe dibujarse usando (x, y).',
              expectedResult: 'Cuadrado desplazado en la pantalla.',
              solutionCode: `x, y = 400, 300\nkeys = pygame.key.get_pressed()\nif keys[pygame.K_LEFT]: x -= 4\npygame.draw.rect(screen, (255,255,255), (x, y, 40, 40))`,
              solutionNote: 'Este patrón de "actualizar lógica" -> "dibujar" es la base de todos los juegos.',
              salidaGuiada: 'Cuadrado movido',
              executionNote: 'El render usa tus variables.',
              successMessage: 'Movimiento fluido y funcional.'
            }
          ]
        },
        {
          id: 'pygame-fps',
          title: 'Misión 07: Control de FPS',
          duration: '9 min',
          xp: 120,
          objective: 'Estabilizar el loop paso a paso para evitar fluctuaciones.',
          resources: {
            videoTitle: 'FPS y Clock',
            videoUrl: 'https://www.youtube.com/embed/S5D2-IOwQfM',
            documentationLinks: [
              { label: 'pygame.time.Clock', url: 'https://www.pygame.org/docs/ref/time.html#pygame.time.Clock' }
            ],
            exampleTitle: 'Clock a 60 FPS',
            exampleCode: `clock = pygame.time.Clock()\nclock.tick(60)`,
            supportNote: 'Un juego demasiado rápido es injugable.'
          },
          instructions: {
            overview: 'Haremos esto súper fácil: crea el reloj, luego úsalo.',
            steps: [
              'Instancia el Clock.',
              'Llama a tick(60) dentro de tu loop.'
            ],
            hint: 'Clock va antes del while; tick va dentro del while.'
          },
          challenges: [
            {
              exerciseType: 'Completar código',
              title: 'Paso 1: Preparar el reloj',
              prompt: 'Crea la instancia de Clock y guárdala en una variable clock.',
              starterCode: `# Instancia el reloj\n# clock = pygame.time.Clock()`,
              expectedKeywords: ['time.Clock'],
              successCriteria: 'Debes instanciar Clock().',
              expectedResult: 'Reloj en memoria',
              solutionCode: `clock = pygame.time.Clock()`,
              solutionNote: 'Esto crea el manejador de tiempo.',
              salidaGuiada: 'Reloj inicializado',
              executionNote: 'Listo.',
              successMessage: 'Reloj listo.'
            },
            {
              exerciseType: 'Completar código',
              title: 'Paso 2: Aplicar el límite',
              prompt: 'Al final de tu loop, llama a clock.tick(60).',
              starterCode: `clock = pygame.time.Clock()\nrunning = True\nwhile running:\n    # logica...\n    # clock.tick(60)`,
              expectedKeywords: ['tick', '60'],
              successCriteria: 'El loop debe ser limitado a 60 fps.',
              expectedResult: '60 FPS estables',
              solutionCode: `clock = pygame.time.Clock()\nrunning = True\nwhile running:\n    clock.tick(60)`,
              solutionNote: 'tick(60) garantiza que el juego no se vuelva loco.',
              salidaGuiada: 'Corriendo a 60 frames por segundo.',
              executionNote: 'Rendimiento estabilizado.',
              successMessage: 'Velocidad predecible lograda con éxito.'
            }
          ]
        }
      ]
    },
    {
      id: 'pygame-imagenes-sprites',
      title: 'Imágenes y sprites',
      summary: 'Aprende a cargar imágenes, posicionar sprites, animarlos y construir fondos de manera sencilla.',
      lessons: [
        {
          id: 'pygame-cargar-imagen',
          title: 'Misión 01: Mostrar imágenes sin estrés',
          duration: '10 min',
          xp: 120,
          objective: 'Cargar un archivo y plasmarlo en pantalla poco a poco.',
          resources: {
            videoTitle: 'Cargar imágenes en Pygame',
            videoUrl: 'https://www.youtube.com/embed/VO8rTszcW4s',
            documentationLinks: [
              { label: 'pygame.image', url: 'https://www.pygame.org/docs/ref/image.html' }
            ],
            exampleTitle: 'Mostrar imagen',
            exampleCode: `img = pygame.image.load("hero.png")\nscreen.blit(img, (10, 10))`,
            supportNote: 'blit es como usar un sello de goma para pegar una imagen en la pantalla.'
          },
          instructions: {
            overview: 'Primero la cargamos en la RAM, luego la sellamos en pantalla.',
            steps: [
              'Carga con load().',
              'Sella con blit().'
            ],
            hint: 'Asegúrate de pasarle las coordenadas a blit.'
          },
          challenges: [
            {
              exerciseType: 'Completar código',
              title: 'Paso 1: Traer la imagen',
              prompt: 'Carga el archivo "jugador.png" usando pygame.image.load y añade .convert_alpha() al final.',
              starterCode: `# img = pygame.image.load("jugador.png").convert_alpha()`,
              expectedKeywords: ['image.load', 'convert_alpha'],
              successCriteria: 'La imagen debe ser cargada.',
              expectedResult: 'Surface lista en RAM.',
              solutionCode: `img = pygame.image.load("jugador.png").convert_alpha()`,
              solutionNote: 'convert_alpha hace que el juego vaya mucho más fluido dibujando PNGs con fondo transparente.',
              salidaGuiada: 'Imagen cargada en memoria',
              executionNote: 'Paso de carga completado.',
              successMessage: '¡Tienes el archivo!'
            },
            {
              exerciseType: 'Completar código',
              title: 'Paso 2: Sellar en pantalla',
              prompt: 'Usa screen.blit() para pintar esa imagen en las coordenadas (200, 200).',
              starterCode: `img = pygame.image.load("jugador.png").convert_alpha()\n# screen.blit(img, (200, 200))`,
              expectedKeywords: ['blit', '200'],
              successCriteria: 'blit debe pintar la imagen en (200, 200).',
              expectedResult: 'Imagen visible.',
              solutionCode: `img = pygame.image.load("jugador.png").convert_alpha()\nscreen.blit(img, (200, 200))`,
              solutionNote: 'blit es súper rápido y esencial.',
              salidaGuiada: 'Personaje dibujado en (200, 200)',
              executionNote: 'Gráficos 2D aplicados.',
              successMessage: 'Primer sprite en pantalla. ¡Gran hito!'
            }
          ]
        },
        {
          id: 'pygame-transform',
          title: 'Misión 02: Transformar a nuestro gusto',
          duration: '11 min',
          xp: 130,
          objective: 'Ajustar tamaño y orientación de forma amena.',
          resources: {
            videoTitle: 'Transformaciones de sprites',
            videoUrl: 'https://www.youtube.com/embed/BE2I5rimk4g',
            documentationLinks: [
              { label: 'pygame.transform', url: 'https://www.pygame.org/docs/ref/transform.html' }
            ],
            exampleTitle: 'Escalar',
            exampleCode: `img2 = pygame.transform.scale(img, (80, 80))`,
            supportNote: 'Transform crea una copia modificada. No sobreescribe tu imagen original.'
          },
          instructions: {
            overview: 'Escalaremos la imagen paso a paso.',
            steps: [
              'Escala la imagen original a 64x64.',
              'Muéstrala.'
            ],
            hint: 'transform.scale recibe tu superficie original y una tupla de nuevo tamaño.'
          },
          challenges: [
            {
              exerciseType: 'Completar código',
              title: 'Paso 1: Escalar',
              prompt: 'Usa transform.scale para cambiar el tamaño de la imagen a (64, 64).',
              starterCode: `img = pygame.image.load("jugador.png").convert_alpha()\n# img_peque = pygame.transform.scale(img, (64, 64))`,
              expectedKeywords: ['transform.scale', '64'],
              successCriteria: 'Debe usar scale correctamente.',
              expectedResult: 'Surface más pequeña.',
              solutionCode: `img = pygame.image.load("jugador.png").convert_alpha()\nimg_peque = pygame.transform.scale(img, (64, 64))`,
              solutionNote: 'Muy útil si los assets originales son gigantes.',
              salidaGuiada: 'Imagen re-escalada con éxito',
              executionNote: 'Transformación exitosa.',
              successMessage: '¡Escalado perfecto!'
            },
            {
              exerciseType: 'Completar código',
              title: 'Paso 2: Mostrar el resultado',
              prompt: 'Aplica blit usando tu nueva imagen pequeña.',
              starterCode: `img_peque = pygame.transform.scale(img, (64, 64))\n# screen.blit(img_peque, (100, 100))`,
              expectedKeywords: ['blit', 'img_peque'],
              successCriteria: 'Dibujar la versión transformada.',
              expectedResult: 'Sprite pequeño en pantalla.',
              solutionCode: `img_peque = pygame.transform.scale(img, (64, 64))\nscreen.blit(img_peque, (100, 100))`,
              solutionNote: 'Siempre es buena idea tener variables descriptivas.',
              salidaGuiada: 'Dibujado sprite ajustado',
              executionNote: 'Listo.',
              successMessage: 'Ya sabes controlar el tamaño de tus recursos gráficos.'
            }
          ]
        },
        {
          id: 'pygame-movimiento-sprite',
          title: 'Misión 03: Movimiento con Rects',
          duration: '13 min',
          xp: 150,
          objective: 'Combinar imágenes y rectángulos para movimiento estructurado.',
          resources: {
            videoTitle: 'Rects explicados',
            videoUrl: 'https://www.youtube.com/embed/AnEmNG69xv8',
            documentationLinks: [
              { label: 'pygame.Rect', url: 'https://www.pygame.org/docs/ref/rect.html' }
            ],
            exampleTitle: 'Caja de colisión (Rect)',
            exampleCode: `rect = img.get_rect(center=(200, 200))\nscreen.blit(img, rect)`,
            supportNote: 'Los Rect manejan toda tu posición matemática automáticamente.'
          },
          instructions: {
            overview: 'El patrón avanzado usa Rects. Haremos un rect y lo moveremos.',
            steps: [
              'Extrae el rect de la imagen.',
              'Pásaselo a blit en lugar de una tupla suelta.'
            ],
            hint: 'blit() es lo suficientemente listo como para entender un objeto Rect directamente.'
          },
          challenges: [
            {
              exerciseType: 'Completar código',
              title: 'Paso 1: Generar el Rect',
              prompt: 'Usa get_rect(center=(400, 300)) sobre la imagen para obtener su "hitbox".',
              starterCode: `img = pygame.image.load("jugador.png").convert_alpha()\n# rect = img.get_rect(center=(400, 300))`,
              expectedKeywords: ['get_rect', 'center'],
              successCriteria: 'La función get_rect debe invocarse en la imagen.',
              expectedResult: 'Rectángulo virtual generado.',
              solutionCode: `img = pygame.image.load("jugador.png").convert_alpha()\nrect = img.get_rect(center=(400, 300))`,
              solutionNote: 'El Rect envuelve mágicamente la superficie.',
              salidaGuiada: 'Rect generado en (400, 300)',
              executionNote: 'La caja geométrica existe en RAM.',
              successMessage: '¡Caja delimitadora lista!'
            },
            {
              exerciseType: 'Completar código',
              title: 'Paso 2: Pintar con Rect',
              prompt: 'Usa el rect en la función blit de la pantalla para posicionar la imagen mágicamente.',
              starterCode: `rect = img.get_rect(center=(400, 300))\n# Modificamos rect.x para moverlo: \nrect.x += 5\n# screen.blit(img, rect)`,
              expectedKeywords: ['blit', 'rect'],
              successCriteria: 'Debes dibujar la imagen pasándole el rect.',
              expectedResult: 'Sprite dibujado guiado por la hitbox.',
              solutionCode: `rect = img.get_rect(center=(400, 300))\nrect.x += 5\nscreen.blit(img, rect)`,
              solutionNote: 'blit acepta tuplas o Rects, siendo el Rect la opción más pro.',
              salidaGuiada: 'Sprite dibujado en x=405',
              executionNote: '¡Magia de la programación orientada a objetos!',
              successMessage: 'Lograste la forma estándar y potente de mover gráficos en Pygame.'
            }
          ]
        },
        {
          id: 'pygame-fondos',
          title: 'Misión 04: Fondos y escenarios rápidos',
          duration: '10 min',
          xp: 120,
          objective: 'Montar un nivel simple combinando fondo y personaje.',
          resources: {
            videoTitle: 'Fondos en Pygame',
            videoUrl: 'https://www.youtube.com/embed/BE2I5rimk4g',
            documentationLinks: [],
            exampleTitle: 'Orden de dibujado',
            exampleCode: `screen.blit(fondo, (0,0))\nscreen.blit(img, rect)`,
            supportNote: 'Pygame dibuja como un pintor pintando un cuadro: lo último tapa a lo primero.'
          },
          instructions: {
            overview: 'Para tener un fondo sin arruinar el jugador, debemos respetar el orden de pintado.',
            steps: [
              'Primero blit del fondo.',
              'Segundo blit del jugador encima.'
            ],
            hint: 'Asegúrate de escalar el fondo para que cubra la pantalla.'
          },
          challenges: [
            {
              exerciseType: 'Completar código',
              title: 'Paso 1: El fondo gigante',
              prompt: 'Carga el fondo y pégalo en la esquina superior izquierda (0,0).',
              starterCode: `fondo = pygame.image.load("fondo.png").convert()\n# screen.blit(fondo, (0, 0))`,
              expectedKeywords: ['blit', 'fondo', '0'],
              successCriteria: 'Dibujar el fondo atrás de todo.',
              expectedResult: 'Escenario visible.',
              solutionCode: `fondo = pygame.image.load("fondo.png").convert()\nscreen.blit(fondo, (0, 0))`,
              solutionNote: '.convert() (sin alpha) es más rápido para imágenes gigantes opacas.',
              salidaGuiada: 'Pantalla cubierta por imagen',
              executionNote: 'El pintor ha dado la primera capa.',
              successMessage: '¡Fondo puesto!'
            },
            {
              exerciseType: 'Completar código',
              title: 'Paso 2: Protagonista al frente',
              prompt: 'Justo después, dibuja a tu jugador encima.',
              starterCode: `screen.blit(fondo, (0, 0))\n# screen.blit(jugador_img, jugador_rect)`,
              expectedKeywords: ['blit', 'jugador_img'],
              successCriteria: 'El jugador se dibuja en la siguiente instrucción.',
              expectedResult: 'Mundo completo renderizado.',
              solutionCode: `screen.blit(fondo, (0, 0))\nscreen.blit(jugador_img, jugador_rect)`,
              solutionNote: 'La segunda capa es la del jugador, dando la ilusión de un mundo interactivo.',
              salidaGuiada: 'Jugador presente frente a escenario.',
              executionNote: '¡El mundo cobra vida!',
              successMessage: 'Misión cumplida. Tu juego está completamente ensamblado.'
            }
          ]
        }
      ]
    },
    {
      id: 'pygame-colisiones',
      title: 'Colisiones e interacción',
      summary: 'Crear interacción entre objetos del juego.',
      lessons: [
        {
          id: 'pygame-intro-rect',
          title: 'Misión 01: Introducción a Rect',
          duration: '10 min',
          xp: 120,
          objective: 'Entender cómo los Rectángulos (Rect) son la base de las interacciones.',
          resources: {
            videoTitle: 'Pygame Rects',
            videoUrl: 'https://www.youtube.com/embed/AnEmNG69xv8',
            documentationLinks: [{ label: 'pygame.Rect', url: 'https://www.pygame.org/docs/ref/rect.html' }],
            exampleTitle: 'Atributos de Rect',
            exampleCode: `rect = pygame.Rect(10, 10, 50, 50)\nprint(rect.center)`,
            supportNote: 'Los Rect tienen atributos útiles como top, bottom, left, right y center.'
          },
          instructions: {
            overview: 'Un Rect no solo dibuja, también calcula. Probemos sus atributos.',
            steps: [
              'Crea un Rect.',
              'Imprime su centro.'
            ],
            hint: 'Usa la clase pygame.Rect(x, y, ancho, alto).'
          },
          challenges: [
            {
              exerciseType: 'Completar código',
              title: 'Paso 1: Crear un Rect manual',
              prompt: 'Crea un Rect en (0, 0) de tamaño 100x100.',
              starterCode: `import pygame\n# mi_rect = pygame.Rect(0, 0, 100, 100)`,
              expectedKeywords: ['pygame.Rect'],
              successCriteria: 'Debes instanciar un Rect.',
              expectedResult: 'Rect creado',
              solutionCode: `import pygame\nmi_rect = pygame.Rect(0, 0, 100, 100)`,
              solutionNote: 'Este Rect virtual existe aunque no lo dibujes.',
              salidaGuiada: 'Rect(0, 0, 100, 100)',
              executionNote: 'Instancia correcta.',
              successMessage: 'Rect creado en memoria.'
            },
            {
              exerciseType: 'Completar código',
              title: 'Paso 2: Consultar su centro',
              prompt: 'Imprime el atributo center de tu Rect.',
              starterCode: `import pygame\nmi_rect = pygame.Rect(0, 0, 100, 100)\n# print(mi_rect.center)`,
              expectedKeywords: ['center', 'print'],
              successCriteria: 'Debes imprimir el centro.',
              expectedResult: '(50, 50)',
              solutionCode: `import pygame\nmi_rect = pygame.Rect(0, 0, 100, 100)\nprint(mi_rect.center)`,
              solutionNote: 'Pygame calcula el centro automáticamente basado en x, y, width y height.',
              salidaGuiada: '(50, 50)',
              executionNote: 'Cálculo correcto.',
              successMessage: '¡Ves! Pygame hace las matemáticas por ti.'
            }
          ]
        },
        {
          id: 'pygame-deteccion-colisiones',
          title: 'Misión 02: Detección de colisiones',
          duration: '12 min',
          xp: 130,
          objective: 'Detectar cuando dos cajas (Rects) se superponen.',
          resources: {
            videoTitle: 'Colisiones en Pygame',
            videoUrl: 'https://www.youtube.com/embed/1_H7InPMjaY',
            documentationLinks: [{ label: 'colliderect', url: 'https://www.pygame.org/docs/ref/rect.html#pygame.Rect.colliderect' }],
            exampleTitle: 'Uso de colliderect',
            exampleCode: `if rect1.colliderect(rect2):\n    print("¡Choque!")`,
            supportNote: 'colliderect devuelve True si los dos rectángulos se tocan.'
          },
          instructions: {
            overview: 'El corazón de la interacción es saber si dos objetos se tocan.',
            steps: [
              'Usa colliderect entre dos Rects.',
              'Imprime un mensaje si chocan.'
            ],
            hint: 'Llama al método desde un rect y pásale el otro como argumento.'
          },
          challenges: [
            {
              exerciseType: 'Completar código',
              title: 'Paso 1: Colisión simple',
              prompt: 'Verifica si jugador_rect colisiona con enemigo_rect usando colliderect.',
              starterCode: `import pygame\njugador_rect = pygame.Rect(10, 10, 50, 50)\nenemigo_rect = pygame.Rect(40, 40, 50, 50)\n\n# if jugador_rect.colliderect(enemigo_rect):\n    # print("Colisión")`,
              expectedKeywords: ['colliderect'],
              successCriteria: 'Debes usar colliderect.',
              expectedResult: 'Colisión',
              solutionCode: `import pygame\njugador_rect = pygame.Rect(10, 10, 50, 50)\nenemigo_rect = pygame.Rect(40, 40, 50, 50)\nif jugador_rect.colliderect(enemigo_rect):\n    print("Colisión")`,
              solutionNote: 'Se tocan porque sus coordenadas se superponen.',
              salidaGuiada: 'Colisión detectada',
              executionNote: 'Intersección calculada.',
              successMessage: '¡Colisión exitosa!'
            },
            {
              exerciseType: 'Completar código',
              title: 'Paso 2: Reaccionar',
              prompt: 'Si colisionan, cambia el color a rojo (255, 0, 0).',
              starterCode: `color = (0, 255, 0)\n# if jugador_rect.colliderect(enemigo_rect):\n    # color = (255, 0, 0)`,
              expectedKeywords: ['color ='],
              successCriteria: 'El color debe cambiar.',
              expectedResult: 'Color alterado',
              solutionCode: `color = (0, 255, 0)\nif jugador_rect.colliderect(enemigo_rect):\n    color = (255, 0, 0)`,
              solutionNote: 'Altera estados visuales en respuesta a lógica de juego.',
              salidaGuiada: 'Color cambiado a rojo',
              executionNote: 'Estado modificado.',
              successMessage: 'Las colisiones ya tienen consecuencias.'
            }
          ]
        },
        {
          id: 'pygame-objetos-interactivos',
          title: 'Misión 03: Objetos interactivos',
          duration: '11 min',
          xp: 130,
          objective: 'Hacer que un objeto responda al click del ratón.',
          resources: {
            videoTitle: 'Ratón en Pygame',
            videoUrl: 'https://www.youtube.com/embed/1_H7InPMjaY',
            documentationLinks: [{ label: 'collidepoint', url: 'https://www.pygame.org/docs/ref/rect.html#pygame.Rect.collidepoint' }],
            exampleTitle: 'Click en botón',
            exampleCode: `if event.type == pygame.MOUSEBUTTONDOWN:\n    if boton_rect.collidepoint(event.pos):\n        print("Click!")`,
            supportNote: 'collidepoint chequea si un punto (x, y) está dentro de un Rect.'
          },
          instructions: {
            overview: 'Los botones en los juegos son solo Rects que detectan clicks.',
            steps: [
              'Detecta el evento MOUSEBUTTONDOWN.',
              'Usa collidepoint con la posición del ratón.'
            ],
            hint: 'event.pos te da la (x, y) donde ocurrió el click.'
          },
          challenges: [
            {
              exerciseType: 'Completar código',
              title: 'Paso 1: Detectar el click',
              prompt: 'Añade la comprobación if event.type == pygame.MOUSEBUTTONDOWN:',
              starterCode: `for event in pygame.event.get():\n    # if event.type == pygame.MOUSEBUTTONDOWN:\n        # print("Ratón pulsado")`,
              expectedKeywords: ['MOUSEBUTTONDOWN'],
              successCriteria: 'Debes capturar el evento del ratón.',
              expectedResult: 'Ratón pulsado',
              solutionCode: `for event in pygame.event.get():\n    if event.type == pygame.MOUSEBUTTONDOWN:\n        print("Ratón pulsado")`,
              solutionNote: 'Este evento se dispara una vez por cada click.',
              salidaGuiada: 'Evento de ratón detectado',
              executionNote: 'Lectura de hardware exitosa.',
              successMessage: 'El ratón está conectado.'
            },
            {
              exerciseType: 'Completar código',
              title: 'Paso 2: Saber dónde clicaste',
              prompt: 'Usa boton_rect.collidepoint(event.pos) para saber si diste en el blanco.',
              starterCode: `boton_rect = pygame.Rect(100, 100, 200, 50)\nfor event in pygame.event.get():\n    if event.type == pygame.MOUSEBUTTONDOWN:\n        # if boton_rect.collidepoint(event.pos):\n            # print("Click en el botón")`,
              expectedKeywords: ['collidepoint', 'event.pos'],
              successCriteria: 'Usar collidepoint con la posición del evento.',
              expectedResult: 'Click en el botón',
              solutionCode: `boton_rect = pygame.Rect(100, 100, 200, 50)\nfor event in pygame.event.get():\n    if event.type == pygame.MOUSEBUTTONDOWN:\n        if boton_rect.collidepoint(event.pos):\n            print("Click en el botón")`,
              solutionNote: 'Así funcionan las interfaces gráficas por debajo.',
              salidaGuiada: 'Botón pulsado',
              executionNote: 'Intersección punto-rectángulo correcta.',
              successMessage: '¡Felicidades, acabas de crear un botón desde cero!'
            }
          ]
        },
        {
          id: 'pygame-recoleccion',
          title: 'Misión 04: Recolección de objetos',
          duration: '14 min',
          xp: 140,
          objective: 'Eliminar objetos al tocarlos (recolectar monedas).',
          resources: {
            videoTitle: 'Listas y colisiones',
            videoUrl: 'https://www.youtube.com/embed/1_H7InPMjaY',
            documentationLinks: [],
            exampleTitle: 'Borrando elementos',
            exampleCode: `for moneda in monedas[:]:\n    if jugador.colliderect(moneda):\n        monedas.remove(moneda)`,
            supportNote: 'Iterar sobre una copia de la lista ([:]) es clave cuando vas a eliminar elementos de ella.'
          },
          instructions: {
            overview: 'Recolectar es igual a: si choco, elimino el objeto de mi lista.',
            steps: [
              'Itera sobre la lista de monedas.',
              'Si chocas, haz remove().'
            ],
            hint: 'Asegúrate de iterar sobre monedas[:] (una copia) para evitar bugs extraños.'
          },
          challenges: [
            {
              exerciseType: 'Completar código',
              title: 'Paso 1: Detectar moneda',
              prompt: 'Itera la lista e imprime un mensaje si colisionas con una moneda.',
              starterCode: `jugador = pygame.Rect(0, 0, 50, 50)\nmonedas = [pygame.Rect(10, 10, 10, 10)]\n\n# for moneda in monedas:\n    # if jugador.colliderect(moneda):\n        # print("Toco moneda")`,
              expectedKeywords: ['for', 'colliderect'],
              successCriteria: 'Iterar y detectar colisión.',
              expectedResult: 'Toco moneda',
              solutionCode: `jugador = pygame.Rect(0, 0, 50, 50)\nmonedas = [pygame.Rect(10, 10, 10, 10)]\nfor moneda in monedas:\n    if jugador.colliderect(moneda):\n        print("Toco moneda")`,
              solutionNote: 'Buscas colisiones uno a uno contra una lista.',
              salidaGuiada: 'Colisión detectada',
              executionNote: 'Detección múltiple exitosa.',
              successMessage: 'Sabes cuándo tocas los items.'
            },
            {
              exerciseType: 'Completar código',
              title: 'Paso 2: Eliminar al tocar',
              prompt: 'Si hay colisión, elimínala con monedas.remove(moneda). Itera sobre monedas[:].',
              starterCode: `jugador = pygame.Rect(0, 0, 50, 50)\nmonedas = [pygame.Rect(10, 10, 10, 10)]\n\nfor moneda in monedas[:]:\n    if jugador.colliderect(moneda):\n        # monedas.remove(moneda)`,
              expectedKeywords: ['remove'],
              successCriteria: 'Remover el elemento de la lista original.',
              expectedResult: 'monedas ahora está vacío.',
              solutionCode: `jugador = pygame.Rect(0, 0, 50, 50)\nmonedas = [pygame.Rect(10, 10, 10, 10)]\nfor moneda in monedas[:]:\n    if jugador.colliderect(moneda):\n        monedas.remove(moneda)`,
              solutionNote: 'Al desaparecer de la lista, ya no se dibujará en el siguiente frame.',
              salidaGuiada: 'Moneda recolectada',
              executionNote: 'Lista de entidades actualizada.',
              successMessage: 'Mecánica de recolección terminada. ¡Puntos para Gryffindor!'
            }
          ]
        },
        {
          id: 'pygame-obstaculos',
          title: 'Misión 05: Obstáculos y límites',
          duration: '15 min',
          xp: 150,
          objective: 'Evitar que el jugador salga de la pantalla o atraviese muros.',
          resources: {
            videoTitle: 'Limites de pantalla',
            videoUrl: 'https://www.youtube.com/embed/1_H7InPMjaY',
            documentationLinks: [],
            exampleTitle: 'Limitar valores',
            exampleCode: `if rect.left < 0: rect.left = 0\nif rect.right > 800: rect.right = 800`,
            supportNote: 'Los atributos de borde de Rect te permiten encajar objetos fácilmente.'
          },
          instructions: {
            overview: 'Un muro sólido se hace impidiendo que el Rect lo pase.',
            steps: [
              'Revisa si el Rect se salió.',
              'Si se salió, devuélvelo al borde.'
            ],
            hint: 'rect.left < 0 significa que se salió por la izquierda.'
          },
          challenges: [
            {
              exerciseType: 'Completar código',
              title: 'Paso 1: Borde izquierdo',
              prompt: 'Haz que si el jugador pasa de x=0 (left < 0), su left vuelva a ser 0.',
              starterCode: `jugador = pygame.Rect(-10, 50, 40, 40)\n\n# if jugador.left < 0:\n    # jugador.left = 0`,
              expectedKeywords: ['left < 0', 'left = 0'],
              successCriteria: 'El borde izquierdo no se puede superar.',
              expectedResult: 'jugador.left corregido a 0.',
              solutionCode: `jugador = pygame.Rect(-10, 50, 40, 40)\nif jugador.left < 0:\n    jugador.left = 0`,
              solutionNote: 'Forzamos la posición matemáticamente.',
              salidaGuiada: 'Corrección aplicada (x=0)',
              executionNote: 'Límite reforzado.',
              successMessage: 'No más caídas al vacío por la izquierda.'
            },
            {
              exerciseType: 'Completar código',
              title: 'Paso 2: Borde derecho',
              prompt: 'Haz lo mismo para la derecha: si right > 800, ajusta right a 800.',
              starterCode: `jugador = pygame.Rect(790, 50, 40, 40)\n\n# if jugador.right > 800:\n    # jugador.right = 800`,
              expectedKeywords: ['right >', 'right ='],
              successCriteria: 'El borde derecho debe ser un muro duro.',
              expectedResult: 'jugador.right corregido.',
              solutionCode: `jugador = pygame.Rect(790, 50, 40, 40)\nif jugador.right > 800:\n    jugador.right = 800`,
              solutionNote: 'Los atributos virtuales del Rect (right, bottom) alteran la X y la Y reales por ti.',
              salidaGuiada: 'Corrección aplicada (derecha)',
              executionNote: 'Límites completos.',
              successMessage: 'Tu mundo de juego ahora es una caja sólida. Muy bien.'
            }
          ]
        }
      ]
    },
    {
      id: 'pygame-fisica',
      title: 'Física básica y jugabilidad',
      summary: 'Agregar mecánicas más dinámicas y realistas como gravedad y saltos.',
      lessons: [
        {
          id: 'pygame-velocidad',
          title: 'Misión 01: Velocidad y dirección',
          duration: '10 min',
          xp: 120,
          objective: 'Usar vectores simples (velocidad_x, velocidad_y) para movimiento continuo.',
          resources: {
            videoTitle: 'Vectores de velocidad',
            videoUrl: 'https://www.youtube.com/embed/AnEmNG69xv8',
            documentationLinks: [],
            exampleTitle: 'Velocidad XY',
            exampleCode: `rect.x += vel_x\nrect.y += vel_y`,
            supportNote: 'En lugar de sumar fijos al pulsar botones, sumas una variable de velocidad cada frame.'
          },
          instructions: {
            overview: 'El movimiento inercial se logra sumando velocidad cada frame.',
            steps: [
              'Declara vel_x y vel_y.',
              'Súmalas a x e y cada frame.'
            ],
            hint: 'Si vel_x es 0, no se mueve. Si es 5, se mueve rápido a la derecha.'
          },
          challenges: [
            {
              exerciseType: 'Completar código',
              title: 'Paso 1: Actualizar con velocidad',
              prompt: 'Suma vel_x a la x del Rect.',
              starterCode: `rect = pygame.Rect(10, 10, 20, 20)\nvel_x = 5\n\n# rect.x += vel_x`,
              expectedKeywords: ['rect.x', '+='],
              successCriteria: 'Modificar posición con la variable de velocidad.',
              expectedResult: 'rect.x es 15',
              solutionCode: `rect = pygame.Rect(10, 10, 20, 20)\nvel_x = 5\nrect.x += vel_x`,
              solutionNote: 'Esto ocurre cada frame en el loop principal.',
              salidaGuiada: 'Posición actualizada inercialmente',
              executionNote: 'Cálculo dinámico aplicado.',
              successMessage: 'Tienes las bases de la inercia.'
            },
            {
              exerciseType: 'Completar código',
              title: 'Paso 2: Rebote básico',
              prompt: 'Si rect.right > 800, invierte la velocidad (vel_x = -vel_x).',
              starterCode: `rect = pygame.Rect(790, 10, 20, 20)\nvel_x = 15\nrect.x += vel_x\n\n# if rect.right > 800:\n    # vel_x = -vel_x`,
              expectedKeywords: ['vel_x = -vel_x'],
              successCriteria: 'Debe invertir el signo de la velocidad.',
              expectedResult: 'Velocidad invertida para rebotar.',
              solutionCode: `rect = pygame.Rect(790, 10, 20, 20)\nvel_x = 15\nrect.x += vel_x\nif rect.right > 800:\n    vel_x = -vel_x`,
              solutionNote: 'Multiplicar por -1 cambia el sentido del vector.',
              salidaGuiada: 'Rebote calculado (vel_x invertida)',
              executionNote: 'Vector reflejado.',
              successMessage: 'Acabas de programar la física básica del Pong.'
            }
          ]
        },
        {
          id: 'pygame-gravedad',
          title: 'Misión 02: Saltos y gravedad',
          duration: '14 min',
          xp: 140,
          objective: 'Simular gravedad sumando a la velocidad Y constantemente.',
          resources: {
            videoTitle: 'Gravedad en 2D',
            videoUrl: 'https://www.youtube.com/embed/AnEmNG69xv8',
            documentationLinks: [],
            exampleTitle: 'Gravedad',
            exampleCode: `vel_y += gravedad\nrect.y += vel_y`,
            supportNote: 'La gravedad acelera: aumenta la velocidad vertical en cada paso.'
          },
          instructions: {
            overview: 'Para caer, la velocidad Y crece hacia abajo cada frame.',
            steps: [
              'Aumenta vel_y con la gravedad.',
              'Aplica vel_y a la posición.'
            ],
            hint: 'Saltar es simplemente poner vel_y en un número negativo grande.'
          },
          challenges: [
            {
              exerciseType: 'Completar código',
              title: 'Paso 1: Aplicar gravedad',
              prompt: 'Suma la variable gravedad a vel_y, y luego vel_y a rect.y.',
              starterCode: `rect = pygame.Rect(50, 50, 20, 20)\nvel_y = 0\ngravedad = 1\n\n# vel_y += gravedad\n# rect.y += vel_y`,
              expectedKeywords: ['vel_y += gravedad', 'rect.y +='],
              successCriteria: 'La aceleración debe modificar la velocidad.',
              expectedResult: 'El objeto cae más rápido cada vez.',
              solutionCode: `rect = pygame.Rect(50, 50, 20, 20)\nvel_y = 0\ngravedad = 1\nvel_y += gravedad\nrect.y += vel_y`,
              solutionNote: 'Esta es la ecuación básica de movimiento uniformemente acelerado.',
              salidaGuiada: 'Fuerza g aplicada.',
              executionNote: 'Cálculo gravitacional activo.',
              successMessage: 'El mundo ahora tiene peso.'
            },
            {
              exerciseType: 'Completar código',
              title: 'Paso 2: El salto',
              prompt: 'Si se pulsa espacio (suponiendo is_jump_pressed=True), pon vel_y a -15.',
              starterCode: `vel_y = 10\nis_jump_pressed = True\n\n# if is_jump_pressed:\n    # vel_y = -15`,
              expectedKeywords: ['vel_y = -15'],
              successCriteria: 'El impulso anula la caída y propulsa hacia arriba.',
              expectedResult: 'Velocidad negativa (subiendo).',
              solutionCode: `vel_y = 10\nis_jump_pressed = True\nif is_jump_pressed:\n    vel_y = -15`,
              solutionNote: 'Al ser negativa, el personaje subirá hasta que la gravedad gane de nuevo.',
              salidaGuiada: 'Impulso hacia arriba (vel_y = -15)',
              executionNote: 'Fuerza contraria aplicada.',
              successMessage: 'Ya tienes la mecánica de Mario Bros lista.'
            }
          ]
        },
        {
          id: 'pygame-plataformas',
          title: 'Misión 03: Plataformas simples',
          duration: '15 min',
          xp: 150,
          objective: 'Detener la caída cuando se colisiona con el suelo.',
          resources: {
            videoTitle: 'Colisión con el suelo',
            videoUrl: 'https://www.youtube.com/embed/1_H7InPMjaY',
            documentationLinks: [],
            exampleTitle: 'Aterrizar',
            exampleCode: `if rect.colliderect(suelo):\n    rect.bottom = suelo.top\n    vel_y = 0`,
            supportNote: 'Igualar bottom con top hace que el personaje quede perfectamente apoyado.'
          },
          instructions: {
            overview: 'Al chocar con el suelo cayendo, frenamos.',
            steps: [
              'Detectar colisión con suelo.',
              'Poner la velocidad Y en 0.',
              'Ajustar la posición.'
            ],
            hint: 'Alinea la parte baja de tu Rect con la parte alta del suelo.'
          },
          challenges: [
            {
              exerciseType: 'Completar código',
              title: 'Paso 1: Frenar la caída',
              prompt: 'Dentro del if de colisión, pon vel_y a 0.',
              starterCode: `jugador = pygame.Rect(10, 490, 40, 40)\nsuelo = pygame.Rect(0, 500, 800, 100)\nvel_y = 10\n\nif jugador.colliderect(suelo):\n    # vel_y = 0`,
              expectedKeywords: ['vel_y = 0'],
              successCriteria: 'La gravedad no debe seguir empujando tras chocar.',
              expectedResult: 'Velocidad cero al tocar suelo.',
              solutionCode: `jugador = pygame.Rect(10, 490, 40, 40)\nsuelo = pygame.Rect(0, 500, 800, 100)\nvel_y = 10\nif jugador.colliderect(suelo):\n    vel_y = 0`,
              solutionNote: 'Sin esto, atravesarías el piso.',
              salidaGuiada: 'Impacto absorbido (vel=0)',
              executionNote: 'Energía cinética anulada.',
              successMessage: 'Caída detenida de forma correcta.'
            },
            {
              exerciseType: 'Completar código',
              title: 'Paso 2: Ajuste perfecto',
              prompt: 'Añade jugador.bottom = suelo.top para que no quede hundido.',
              starterCode: `jugador = pygame.Rect(10, 490, 40, 40)\nsuelo = pygame.Rect(0, 500, 800, 100)\n\nif jugador.colliderect(suelo):\n    vel_y = 0\n    # jugador.bottom = suelo.top`,
              expectedKeywords: ['bottom', 'top'],
              successCriteria: 'Alinear las geometrías perfectamente.',
              expectedResult: 'Pies sobre el suelo exacto.',
              solutionCode: `jugador = pygame.Rect(10, 490, 40, 40)\nsuelo = pygame.Rect(0, 500, 800, 100)\nif jugador.colliderect(suelo):\n    vel_y = 0\n    jugador.bottom = suelo.top`,
              solutionNote: 'Este es el secreto de todo juego de plataformas 2D.',
              salidaGuiada: 'Alineación perfecta lograda',
              executionNote: 'Snap geométrico correcto.',
              successMessage: 'Aterrizaje suave e impecable. Cero bugs visuales.'
            }
          ]
        },
        {
          id: 'pygame-proyectiles',
          title: 'Misión 04: Disparos y proyectiles',
          duration: '14 min',
          xp: 140,
          objective: 'Crear objetos en tiempo real que se desplazan solos.',
          resources: {
            videoTitle: 'Disparar en Pygame',
            videoUrl: 'https://www.youtube.com/embed/AnEmNG69xv8',
            documentationLinks: [],
            exampleTitle: 'Generar bala',
            exampleCode: `balas.append(pygame.Rect(jugador.x, jugador.y, 10, 5))`,
            supportNote: 'Los proyectiles son solo Rects guardados en una lista que se actualiza cada frame.'
          },
          instructions: {
            overview: 'Disparar es añadir un Rect a una lista. Luego mover todos los de la lista.',
            steps: [
              'Añade un Rect a la lista balas al disparar.',
              'Mueve todas las balas cada frame.'
            ],
            hint: 'Usa append() para meter nuevos objetos en tu mundo.'
          },
          challenges: [
            {
              exerciseType: 'Completar código',
              title: 'Paso 1: Generar la bala',
              prompt: 'Añade un Rect pequeño (10x5) a la lista balas desde la posición de la nave.',
              starterCode: `nave_x, nave_y = 50, 100\nbalas = []\n\n# balas.append(pygame.Rect(nave_x, nave_y, 10, 5))`,
              expectedKeywords: ['append', 'Rect'],
              successCriteria: 'Instanciar una bala en la lista.',
              expectedResult: 'Bala en la recámara/mundo.',
              solutionCode: `nave_x, nave_y = 50, 100\nbalas = []\nbalas.append(pygame.Rect(nave_x, nave_y, 10, 5))`,
              solutionNote: 'Al instanciar dinámicamente, puedes disparar infinidad de veces.',
              salidaGuiada: 'Proyectil generado en memoria',
              executionNote: 'Objeto instanciado.',
              successMessage: '¡Pew pew! Bala creada.'
            },
            {
              exerciseType: 'Completar código',
              title: 'Paso 2: Mover la ráfaga',
              prompt: 'Itera sobre la lista de balas y aumenta su x en 10.',
              starterCode: `balas = [pygame.Rect(50, 100, 10, 5)]\n\n# for bala in balas:\n    # bala.x += 10`,
              expectedKeywords: ['for', 'bala.x += 10'],
              successCriteria: 'Las balas deben desplazarse.',
              expectedResult: 'Balas moviéndose a la derecha.',
              solutionCode: `balas = [pygame.Rect(50, 100, 10, 5)]\nfor bala in balas:\n    bala.x += 10`,
              solutionNote: 'Esto hace que cada frame todas avancen automáticamente.',
              salidaGuiada: 'Proyectiles en movimiento',
              executionNote: 'Actualización en lote completada.',
              successMessage: 'Tienes un sistema de proyectiles funcional.'
            }
          ]
        },
        {
          id: 'pygame-enemigos',
          title: 'Misión 05: Enemigos básicos',
          duration: '12 min',
          xp: 130,
          objective: 'Programar una IA muy sencilla: moverse hacia el jugador.',
          resources: {
            videoTitle: 'Enemigos simples',
            videoUrl: 'https://www.youtube.com/embed/1_H7InPMjaY',
            documentationLinks: [],
            exampleTitle: 'Perseguir',
            exampleCode: `if enemigo.x < jugador.x:\n    enemigo.x += 1`,
            supportNote: 'La persecución se basa en comparar coordenadas y reducir la distancia.'
          },
          instructions: {
            overview: 'Para que el enemigo persiga, debe saber dónde estás.',
            steps: [
              'Compara la X del enemigo con la tuya.',
              'Muévelo en la dirección correcta.'
            ],
            hint: 'Si él está a la izquierda (x menor), debe sumar a su X.'
          },
          challenges: [
            {
              exerciseType: 'Completar código',
              title: 'Paso 1: Ir a la derecha',
              prompt: 'Si el enemigo está a la izquierda del jugador (enemigo.x < jugador.x), aumenta su x.',
              starterCode: `jugador = pygame.Rect(400, 100, 40, 40)\nenemigo = pygame.Rect(100, 100, 40, 40)\n\n# if enemigo.x < jugador.x:\n    # enemigo.x += 2`,
              expectedKeywords: ['<', '+='],
              successCriteria: 'El enemigo debe acercarse por la izquierda.',
              expectedResult: 'Enemigo avanza a la derecha.',
              solutionCode: `jugador = pygame.Rect(400, 100, 40, 40)\nenemigo = pygame.Rect(100, 100, 40, 40)\nif enemigo.x < jugador.x:\n    enemigo.x += 2`,
              solutionNote: 'Lógica simple de seguimiento de objetivo.',
              salidaGuiada: 'Acercándose al objetivo...',
              executionNote: 'Distancia reducida.',
              successMessage: '¡El enemigo te ha visto!'
            },
            {
              exerciseType: 'Completar código',
              title: 'Paso 2: Ir a la izquierda',
              prompt: 'Añade un elif para cuando enemigo.x > jugador.x, restando a su x.',
              starterCode: `jugador = pygame.Rect(100, 100, 40, 40)\nenemigo = pygame.Rect(400, 100, 40, 40)\n\nif enemigo.x < jugador.x:\n    enemigo.x += 2\n# elif enemigo.x > jugador.x:\n    # enemigo.x -= 2`,
              expectedKeywords: ['elif', '-='],
              successCriteria: 'Debe acercarse también desde la derecha.',
              expectedResult: 'Enemigo avanza hacia la izquierda.',
              solutionCode: `jugador = pygame.Rect(100, 100, 40, 40)\nenemigo = pygame.Rect(400, 100, 40, 40)\nif enemigo.x < jugador.x:\n    enemigo.x += 2\nelif enemigo.x > jugador.x:\n    enemigo.x -= 2`,
              solutionNote: 'Esto crea una inteligencia artificial rudimentaria pero efectiva.',
              salidaGuiada: 'Enemigo corrigiendo rumbo a la izquierda.',
              executionNote: 'Comportamiento predictivo exitoso.',
              successMessage: 'Comportamiento de enemigo terminado. Ya tienes un verdadero reto.'
            }
          ]
        }
      ]
    },
    {
      id: 'pygame-sonido-ui',
      title: 'Sonido e interfaz',
      summary: 'Mejorar la experiencia del jugador con feedback de audio y visual.',
      lessons: [
        {
          id: 'pygame-sonidos',
          title: 'Misión 01: Sonidos y música',
          duration: '10 min',
          xp: 120,
          objective: 'Reproducir efectos de sonido cortos paso a paso.',
          resources: {
            videoTitle: 'Audio en Pygame',
            videoUrl: 'https://www.youtube.com/embed/VO8rTszcW4s',
            documentationLinks: [{ label: 'pygame.mixer', url: 'https://www.pygame.org/docs/ref/mixer.html' }],
            exampleTitle: 'Sonido simple',
            exampleCode: `salto_snd = pygame.mixer.Sound("jump.wav")\nsalto_snd.play()`,
            supportNote: 'Los archivos WAV o OGG son mejores para efectos cortos.'
          },
          instructions: {
            overview: 'Pygame requiere cargar el sonido en memoria y luego darle al play.',
            steps: [
              'Carga el archivo de sonido.',
              'Reprodúcelo en respuesta a un evento.'
            ],
            hint: 'Asegúrate de inicializar el mixer (normalmente pygame.init() ya lo hace).'
          },
          challenges: [
            {
              exerciseType: 'Completar código',
              title: 'Paso 1: Cargar el efecto',
              prompt: 'Usa pygame.mixer.Sound para cargar "laser.wav" en la variable snd.',
              starterCode: `# snd = pygame.mixer.Sound("laser.wav")`,
              expectedKeywords: ['mixer.Sound'],
              successCriteria: 'Objeto Sound creado.',
              expectedResult: 'Sonido en memoria',
              solutionCode: `snd = pygame.mixer.Sound("laser.wav")`,
              solutionNote: 'Esto pre-carga el audio para evitar lag al disparar.',
              salidaGuiada: 'Efecto de láser cargado',
              executionNote: 'Buffer de audio listo.',
              successMessage: 'Audio preparado en RAM.'
            },
            {
              exerciseType: 'Completar código',
              title: 'Paso 2: Disparar el sonido',
              prompt: 'Llama al método .play() en la variable snd.',
              starterCode: `snd = pygame.mixer.Sound("laser.wav")\n# snd.play()`,
              expectedKeywords: ['play()'],
              successCriteria: 'El sonido debe reproducirse.',
              expectedResult: '¡Pew!',
              solutionCode: `snd = pygame.mixer.Sound("laser.wav")\nsnd.play()`,
              solutionNote: 'Coloca esto dentro del evento de apretar el botón de disparo.',
              salidaGuiada: '*Sonido de láser*',
              executionNote: 'Señal enviada a la tarjeta de sonido.',
              successMessage: '¡El juego ahora se escucha genial!'
            }
          ]
        },
        {
          id: 'pygame-texto',
          title: 'Misión 02: Mostrar texto en pantalla',
          duration: '13 min',
          xp: 130,
          objective: 'Renderizar texto en imágenes para dibujarlo como sprites.',
          resources: {
            videoTitle: 'Fuentes y texto',
            videoUrl: 'https://www.youtube.com/embed/VO8rTszcW4s',
            documentationLinks: [{ label: 'pygame.font', url: 'https://www.pygame.org/docs/ref/font.html' }],
            exampleTitle: 'Render de texto',
            exampleCode: `fuente = pygame.font.Font(None, 36)\ntexto = fuente.render("Hola", True, (255,255,255))\nscreen.blit(texto, (10, 10))`,
            supportNote: 'El texto en Pygame se "pinta" convirtiéndolo en una imagen estática (Surface) primero.'
          },
          instructions: {
            overview: 'El texto no se dibuja directo. Se fabrica una imagen con el texto y se le hace blit.',
            steps: [
              'Crea una fuente.',
              'Renderiza la fuente a una imagen.',
              'Pégala con blit.'
            ],
            hint: 'El True en render() es para aplicar antialiasing (bordes suaves).'
          },
          challenges: [
            {
              exerciseType: 'Completar código',
              title: 'Paso 1: Renderizar la imagen',
              prompt: 'Usa fuente.render("Puntos: 10", True, (255, 255, 255)) para fabricar la imagen del texto.',
              starterCode: `fuente = pygame.font.Font(None, 36)\n# texto_img = fuente.render("Puntos: 10", True, (255, 255, 255))`,
              expectedKeywords: ['render', 'True'],
              successCriteria: 'Generar la superficie a partir del string.',
              expectedResult: 'Surface con forma de letras.',
              solutionCode: `fuente = pygame.font.Font(None, 36)\ntexto_img = fuente.render("Puntos: 10", True, (255, 255, 255))`,
              solutionNote: 'La fuente base "None" usa la del sistema por defecto.',
              salidaGuiada: 'Píxeles generados a partir de texto.',
              executionNote: 'Procesamiento tipográfico correcto.',
              successMessage: 'Tienes tu texto en forma gráfica.'
            },
            {
              exerciseType: 'Completar código',
              title: 'Paso 2: Mostrar el texto',
              prompt: 'Aplica blit de texto_img en la posición (20, 20).',
              starterCode: `fuente = pygame.font.Font(None, 36)\ntexto_img = fuente.render("Puntos: 10", True, (255, 255, 255))\n# screen.blit(texto_img, (20, 20))`,
              expectedKeywords: ['blit', 'texto_img'],
              successCriteria: 'Dibujar la superficie de texto.',
              expectedResult: 'Letras visibles en pantalla.',
              solutionCode: `fuente = pygame.font.Font(None, 36)\ntexto_img = fuente.render("Puntos: 10", True, (255, 255, 255))\nscreen.blit(texto_img, (20, 20))`,
              solutionNote: 'Se trata exactamente igual que un PNG o un personaje.',
              salidaGuiada: 'HUD dibujado con texto',
              executionNote: 'Superficie estampada.',
              successMessage: 'Tu juego ahora puede comunicarse visualmente con el jugador.'
            }
          ]
        },
        {
          id: 'pygame-puntajes',
          title: 'Misión 03: Puntajes y vidas',
          duration: '14 min',
          xp: 140,
          objective: 'Gestionar variables numéricas que representan progreso.',
          resources: {
            videoTitle: 'Puntajes en pantalla',
            videoUrl: 'https://www.youtube.com/embed/S5D2-IOwQfM',
            documentationLinks: [],
            exampleTitle: 'Puntaje',
            exampleCode: `score += 10\ntexto = font.render(f"Puntos: {score}", True, (255,255,255))`,
            supportNote: 'Los f-strings de Python son ideales para meter variables dentro de textos.'
          },
          instructions: {
            overview: 'Para el HUD, solo necesitas una variable entera y renderizarla a texto.',
            steps: [
              'Aumenta el puntaje al tocar una moneda.',
              'Renderiza ese puntaje en pantalla.'
            ],
            hint: 'Asegúrate de renderizar el texto en cada frame dentro de tu loop principal.'
          },
          challenges: [
            {
              exerciseType: 'Completar código',
              title: 'Paso 1: Sumar puntos',
              prompt: 'Aumenta la variable score en 10 si hay colisión.',
              starterCode: `score = 0\ncolision = True\n\n# if colision:\n    # score += 10`,
              expectedKeywords: ['score += 10'],
              successCriteria: 'La lógica debe aumentar la variable correctamente.',
              expectedResult: 'score es 10',
              solutionCode: `score = 0\ncolision = True\nif colision:\n    score += 10`,
              solutionNote: 'La lógica de negocio se separa del dibujo.',
              salidaGuiada: 'Puntos sumados internamente',
              executionNote: 'Variable actualizada.',
              successMessage: 'La recompensa funciona.'
            },
            {
              exerciseType: 'Completar código',
              title: 'Paso 2: Mostrar Puntos',
              prompt: 'Usa f"Score: {score}" en la función render.',
              starterCode: `fuente = pygame.font.Font(None, 36)\nscore = 10\n\n# texto = fuente.render(f"Score: {score}", True, (255, 255, 255))`,
              expectedKeywords: ['f"Score:', '{score}"'],
              successCriteria: 'El render debe usar interpolación de strings.',
              expectedResult: 'Texto "Score: 10"',
              solutionCode: `fuente = pygame.font.Font(None, 36)\nscore = 10\ntexto = fuente.render(f"Score: {score}", True, (255, 255, 255))`,
              solutionNote: 'Cada vez que la variable cambie, el texto cambiará visualmente.',
              salidaGuiada: 'Renderizado de puntaje correcto',
              executionNote: 'HUD actualizado.',
              successMessage: 'El jugador ahora tiene motivación.'
            }
          ]
        },
        {
          id: 'pygame-estados',
          title: 'Misión 03: Pantallas de inicio y Game Over',
          duration: '15 min',
          xp: 150,
          objective: 'Usar variables de estado para cambiar entre menús y juego.',
          resources: {
            videoTitle: 'Estados del juego',
            videoUrl: 'https://www.youtube.com/embed/S5D2-IOwQfM',
            documentationLinks: [],
            exampleTitle: 'Máquina de estados simple',
            exampleCode: `if estado == "MENU":\n    dibujar_menu()\nelif estado == "JUEGO":\n    dibujar_juego()`,
            supportNote: 'El game loop entero puede bifurcarse dependiendo de un simple string de estado.'
          },
          instructions: {
            overview: 'Un string llamado "estado" decide qué parte del juego corre.',
            steps: [
              'Añade un if basado en el estado.',
              'Ejecuta lógica diferente para "MENU" y "JUEGO".'
            ],
            hint: 'Solo necesitas if y elif.'
          },
          challenges: [
            {
              exerciseType: 'Completar código',
              title: 'Paso 1: Dirigir el tráfico',
              prompt: 'Escribe un if para "MENU" y un elif para "JUEGO" imprimiendo en qué estado estás.',
              starterCode: `estado = "MENU"\n\n# if estado == "MENU":\n    # print("Mostrando menú")\n# elif estado == "JUEGO":\n    # print("Jugando")`,
              expectedKeywords: ['if estado', 'elif'],
              successCriteria: 'Evaluar los dos estados principales.',
              expectedResult: 'Mostrando menú',
              solutionCode: `estado = "MENU"\nif estado == "MENU":\n    print("Mostrando menú")\nelif estado == "JUEGO":\n    print("Jugando")`,
              solutionNote: 'Esta es la arquitectura básica de casi cualquier aplicación interactiva.',
              salidaGuiada: 'Mostrando menú',
              executionNote: 'Bifurcación de estado correcta.',
              successMessage: 'Ya tienes la estructura de pantallas.'
            },
            {
              exerciseType: 'Completar código',
              title: 'Paso 2: Transición',
              prompt: 'Cambia el estado a "JUEGO" y evalúa de nuevo.',
              starterCode: `estado = "MENU"\n# Cambia estado a JUEGO\n# estado = "JUEGO"\n\nif estado == "JUEGO":\n    print("El juego ha comenzado")`,
              expectedKeywords: ['estado = "JUEGO"'],
              successCriteria: 'Modificar la variable cambia la pantalla.',
              expectedResult: 'El juego ha comenzado',
              solutionCode: `estado = "JUEGO"\nif estado == "JUEGO":\n    print("El juego ha comenzado")`,
              solutionNote: 'Al pulsar "START" en el menú, simplemente harás esto.',
              salidaGuiada: 'Transición a JUEGO exitosa',
              executionNote: 'Cambio de contexto activo.',
              successMessage: 'Las transiciones de nivel o menús ya no tienen secretos para ti.'
            }
          ]
        }
      ]
    },
    {
      id: 'pygame-organizacion',
      title: 'Organización de juegos',
      summary: 'Aprende a estructurar proyectos más grandes con clases y carpetas.',
      lessons: [
        {
          id: 'pygame-clases',
          title: 'Misión 01: Uso de clases (POO)',
          duration: '15 min',
          xp: 160,
          objective: 'Agrupar variables sueltas (x, y, vel) en un objeto Player estructurado.',
          resources: {
            videoTitle: 'POO en Pygame',
            videoUrl: 'https://www.youtube.com/embed/nOHwv__awVU',
            documentationLinks: [{ label: 'pygame.sprite.Sprite', url: 'https://www.pygame.org/docs/ref/sprite.html' }],
            exampleTitle: 'Clase básica',
            exampleCode: `class Jugador:\n    def __init__(self):\n        self.rect = pygame.Rect(0,0,50,50)`,
            supportNote: 'Las clases te salvan cuando empiezas a tener decenas de enemigos y balas.'
          },
          instructions: {
            overview: 'Un personaje tiene datos y acciones. Las clases juntan ambos.',
            steps: [
              'Crea una clase con __init__.',
              'Añade un método actualizar().'
            ],
            hint: 'Usa self para guardar las propiedades que pertenecen al objeto.'
          },
          challenges: [
            {
              exerciseType: 'Completar código',
              title: 'Paso 1: El constructor',
              prompt: 'Guarda un rect en self.rect dentro de __init__.',
              starterCode: `import pygame\nclass Jugador:\n    def __init__(self):\n        # self.rect = pygame.Rect(10, 10, 40, 40)`,
              expectedKeywords: ['self.rect', 'Rect'],
              successCriteria: 'La instancia debe tener su propia hitbox.',
              expectedResult: 'Clase con atributos inicializados.',
              solutionCode: `import pygame\nclass Jugador:\n    def __init__(self):\n        self.rect = pygame.Rect(10, 10, 40, 40)`,
              solutionNote: 'Así cada enemigo o jugador tiene su propia caja independiente.',
              salidaGuiada: 'Plano de Jugador creado',
              executionNote: 'Molde preparado.',
              successMessage: 'Constructor listo.'
            },
            {
              exerciseType: 'Completar código',
              title: 'Paso 2: Crear el comportamiento',
              prompt: 'Añade un método mover(self) que sume 5 a self.rect.x',
              starterCode: `import pygame\nclass Jugador:\n    def __init__(self):\n        self.rect = pygame.Rect(10, 10, 40, 40)\n    \n    # def mover(self):\n        # self.rect.x += 5`,
              expectedKeywords: ['def mover', 'self.rect.x'],
              successCriteria: 'El objeto debe saber moverse a sí mismo.',
              expectedResult: 'Método incorporado.',
              solutionCode: `import pygame\nclass Jugador:\n    def __init__(self):\n        self.rect = pygame.Rect(10, 10, 40, 40)\n    def mover(self):\n        self.rect.x += 5`,
              solutionNote: 'El código principal solo tendrá que llamar a j.mover() para todos los cálculos.',
              salidaGuiada: 'Comportamiento de clase listo',
              executionNote: 'Encapsulamiento exitoso.',
              successMessage: 'Pasaste de escribir scripts a programar una arquitectura real.'
            }
          ]
        },
        {
          id: 'pygame-archivos',
          title: 'Misión 02: Organización de archivos y carpetas',
          duration: '10 min',
          xp: 120,
          objective: 'Entender cómo separar imágenes, sonidos y código.',
          resources: {
            videoTitle: 'Estructura de proyecto',
            videoUrl: 'https://www.youtube.com/embed/nOHwv__awVU',
            documentationLinks: [],
            exampleTitle: 'Rutas relativas',
            exampleCode: `img = pygame.image.load("assets/images/hero.png")`,
            supportNote: 'Es importante crear carpetas para no tener un desastre de archivos.'
          },
          instructions: {
            overview: 'Al crecer el juego, movemos todo a carpetas.',
            steps: [
              'Carga un recurso desde la carpeta assets.',
              'Carga un sonido desde la carpeta audio.'
            ],
            hint: 'Usa la barra / para entrar a las carpetas.'
          },
          challenges: [
            {
              exerciseType: 'Completar código',
              title: 'Paso 1: Cargar desde assets',
              prompt: 'Cambia la ruta para que cargue "assets/player.png".',
              starterCode: `# img = pygame.image.load("assets/player.png")`,
              expectedKeywords: ['assets/player.png'],
              successCriteria: 'La ruta debe apuntar al directorio correcto.',
              expectedResult: 'Imagen cargada desde subcarpeta',
              solutionCode: `img = pygame.image.load("assets/player.png")`,
              solutionNote: 'Este pequeño cambio te permite tener cientos de imágenes ordenadas.',
              salidaGuiada: 'Ruta procesada',
              executionNote: 'Organización correcta.',
              successMessage: 'Buena práctica adquirida.'
            },
            {
              exerciseType: 'Completar código',
              title: 'Paso 2: Rutas de audio',
              prompt: 'Carga "audio/jump.wav" usando el mixer.',
              starterCode: `# snd = pygame.mixer.Sound("audio/jump.wav")`,
              expectedKeywords: ['audio/jump.wav'],
              successCriteria: 'Sonido cargado desde su carpeta.',
              expectedResult: 'Sonido listo',
              solutionCode: `snd = pygame.mixer.Sound("audio/jump.wav")`,
              solutionNote: 'Separar audio e imagen es vital en la industria.',
              salidaGuiada: 'Archivo wav localizado',
              executionNote: 'Ruta de audio correcta.',
              successMessage: 'Tu proyecto ahora está limpio y profesional.'
            }
          ]
        },
        {
          id: 'pygame-guardado',
          title: 'Misión 03: Guardado básico de datos',
          duration: '14 min',
          xp: 140,
          objective: 'Guardar el High Score en un archivo de texto para que no se borre al cerrar.',
          resources: {
            videoTitle: 'Guardar datos en Python',
            videoUrl: 'https://www.youtube.com/embed/nOHwv__awVU',
            documentationLinks: [],
            exampleTitle: 'Escribir archivo',
            exampleCode: `with open("save.txt", "w") as f:\n    f.write(str(score))`,
            supportNote: 'Python básico es todo lo que necesitas para guardar progreso.'
          },
          instructions: {
            overview: 'Pygame no tiene sistema de guardado propio. Usamos archivos de texto de Python.',
            steps: [
              'Escribe el score en un archivo.',
              'Lee el score del archivo al empezar.'
            ],
            hint: 'Usa modo "w" para escribir y modo "r" para leer.'
          },
          challenges: [
            {
              exerciseType: 'Completar código',
              title: 'Paso 1: Guardar partida',
              prompt: 'Usa with open("score.txt", "w") para guardar el número 100.',
              starterCode: `score = 100\n# with open("score.txt", "w") as file:\n    # file.write(str(score))`,
              expectedKeywords: ['open', '"w"', 'write'],
              successCriteria: 'El archivo debe escribirse con el score en formato string.',
              expectedResult: 'score.txt creado.',
              solutionCode: `score = 100\nwith open("score.txt", "w") as file:\n    file.write(str(score))`,
              solutionNote: 'Cualquier cosa guardada en disco sobrevivirá al apagar el juego.',
              salidaGuiada: 'Archivo escrito en disco',
              executionNote: 'Operación I/O completada.',
              successMessage: '¡Progreso salvado!'
            },
            {
              exerciseType: 'Completar código',
              title: 'Paso 2: Cargar partida',
              prompt: 'Usa with open("score.txt", "r") para leer y convertir a int.',
              starterCode: `# with open("score.txt", "r") as file:\n    # guardado = int(file.read())`,
              expectedKeywords: ['"r"', 'int(file.read())'],
              successCriteria: 'Leer el archivo y convertir a entero.',
              expectedResult: 'El score es 100.',
              solutionCode: `with open("score.txt", "r") as file:\n    guardado = int(file.read())`,
              solutionNote: 'Al inicio del juego debes intentar leer esto para recuperar el progreso.',
              salidaGuiada: 'Archivo leído: 100',
              executionNote: 'Datos cargados a memoria.',
              successMessage: 'High scores persistentes listos para usar.'
            }
          ]
        },
        {
          id: 'pygame-optimizacion',
          title: 'Misión 04: Optimización simple',
          duration: '11 min',
          xp: 130,
          objective: 'Aprender trucos básicos para que tu juego vaya a 60 fps en cualquier PC.',
          resources: {
            videoTitle: 'Optimizar Pygame',
            videoUrl: 'https://www.youtube.com/embed/nOHwv__awVU',
            documentationLinks: [],
            exampleTitle: 'Convert',
            exampleCode: `img = pygame.image.load("bg.png").convert()`,
            supportNote: 'Pygame es lento procesando formato PNG puro. Al hacer convert() adaptas la imagen a la tarjeta gráfica.'
          },
          instructions: {
            overview: 'El cuello de botella #1 es blitear imágenes sin convert().',
            steps: [
              'Usa .convert() para imágenes sin fondo transparente.',
              'Usa .convert_alpha() para imágenes con transparencia.'
            ],
            hint: 'Llama a .convert() justo después del load().'
          },
          challenges: [
            {
              exerciseType: 'Completar código',
              title: 'Paso 1: Fondos rápidos',
              prompt: 'Carga "fondo.jpg" y encadena .convert() al final.',
              starterCode: `# fondo = pygame.image.load("fondo.jpg").convert()`,
              expectedKeywords: ['convert()'],
              successCriteria: 'La imagen debe ser convertida al pixel format display.',
              expectedResult: 'Surface optimizada',
              solutionCode: `fondo = pygame.image.load("fondo.jpg").convert()`,
              solutionNote: 'Esto hace que dibujar el fondo 60 veces por segundo consuma casi un 80% menos de CPU.',
              salidaGuiada: 'Conversión hardware aplicada',
              executionNote: 'Mejora de rendimiento habilitada.',
              successMessage: 'Fondo optimizado.'
            },
            {
              exerciseType: 'Completar código',
              title: 'Paso 2: Personajes rápidos',
              prompt: 'Carga "hero.png" y encadena .convert_alpha() al final.',
              starterCode: `# hero = pygame.image.load("hero.png").convert_alpha()`,
              expectedKeywords: ['convert_alpha()'],
              successCriteria: 'Mantener la transparencia usando alpha.',
              expectedResult: 'Surface con canal alpha optimizado.',
              solutionCode: `hero = pygame.image.load("hero.png").convert_alpha()`,
              solutionNote: 'Si no pones esto, Pygame calculará la transparencia pixel por pixel cada frame por software, que es lentísimo.',
              salidaGuiada: 'Transparencia acelerada por hardware',
              executionNote: 'Framerate asegurado.',
              successMessage: 'Tu juego está profesionalmente optimizado. ¡Felicidades por terminar el curso!'
            }
          ]
        }
      ]
    }
  ]
}
