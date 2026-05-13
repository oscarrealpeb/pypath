export const evaluacionesPygame = {
  unitAssessments: {
    'pygame-intro': {
      id: 'pygame-intro-checkpoint',
      title: 'Evaluación de unidad: Introducción a Pygame',
      summary: 'Cierra esta unidad demostrando que entiendes instalación, ventana, game loop, teclado y movimiento básico.',
      passingScore: 3,
      successMessage: 'Unidad aprobada. Ya puedes pasar a imágenes y sprites.',
      questions: [
        {
          id: 'pygame-intro-q1',
          prompt: '¿Qué llamada inicia los módulos principales de Pygame?',
          options: [
            { id: 'a', label: 'pygame.init()' },
            { id: 'b', label: 'pygame.start()' },
            { id: 'c', label: 'pygame.window()' }
          ],
          correctOptionId: 'a',
          explanation: 'pygame.init() prepara todos los módulos necesarios antes de usar cualquier función.'
        },
        {
          id: 'pygame-intro-q2',
          prompt: '¿Qué crea la ventana principal del juego?',
          options: [
            { id: 'a', label: 'pygame.event.get()' },
            { id: 'b', label: 'pygame.display.set_mode(...)' },
            { id: 'c', label: 'pygame.Rect(...)' }
          ],
          correctOptionId: 'b',
          explanation: 'set_mode crea la superficie principal donde dibuja el juego.'
        },
        {
          id: 'pygame-intro-q3',
          prompt: '¿Qué evento suele usarse para cerrar el juego de forma limpia?',
          options: [
            { id: 'a', label: 'pygame.QUIT' },
            { id: 'b', label: 'pygame.OPEN' },
            { id: 'c', label: 'pygame.END' }
          ],
          correctOptionId: 'a',
          explanation: 'QUIT permite detectar que el usuario quiere cerrar la ventana.'
        },
        {
          id: 'pygame-intro-q4',
          prompt: '¿Qué método se usa para leer teclas sostenidas en cada frame?',
          options: [
            { id: 'a', label: 'pygame.key.get_pressed()' },
            { id: 'b', label: 'pygame.event.get()' },
            { id: 'c', label: 'pygame.key.read()' }
          ],
          correctOptionId: 'a',
          explanation: 'get_pressed() devuelve el estado de todas las teclas en el frame actual.'
        },
        {
          id: 'pygame-intro-q5',
          prompt: '¿Para qué sirve clock.tick(60) dentro del game loop?',
          options: [
            { id: 'a', label: 'Para limitar el juego a 60 frames por segundo' },
            { id: 'b', label: 'Para contar 60 eventos de teclado' },
            { id: 'c', label: 'Para pausar el juego 60 segundos' }
          ],
          correctOptionId: 'a',
          explanation: 'tick(60) pausa el loop el tiempo necesario para no superar 60 FPS.'
        }
      ]
    },
    'pygame-imagenes-sprites': {
      id: 'pygame-imagenes-sprites-checkpoint',
      title: 'Evaluación de unidad: Imágenes y sprites',
      summary: 'Comprueba que ya entiendes cómo cargar imágenes, transformarlas, moverlas y animarlas en pantalla.',
      passingScore: 3,
      successMessage: 'Unidad aprobada. Ya cerraste la etapa de imágenes y estás listo para la evaluación final del curso.',
      questions: [
        {
          id: 'pygame-sprites-q1',
          prompt: '¿Qué función carga una imagen desde disco en Pygame?',
          options: [
            { id: 'a', label: 'pygame.image.load(...)' },
            { id: 'b', label: 'pygame.surface.open(...)' },
            { id: 'c', label: 'pygame.draw.image(...)' }
          ],
          correctOptionId: 'a',
          explanation: 'image.load() lee el archivo y devuelve una Surface lista para usar.'
        },
        {
          id: 'pygame-sprites-q2',
          prompt: '¿Qué hace pygame.transform.scale(imagen, (80, 80))?',
          options: [
            { id: 'a', label: 'Rota la imagen 80 grados' },
            { id: 'b', label: 'Redimensiona la imagen a 80x80 píxeles' },
            { id: 'c', label: 'Recorta la imagen a 80x80' }
          ],
          correctOptionId: 'b',
          explanation: 'scale() devuelve una nueva Surface con las dimensiones indicadas.'
        },
        {
          id: 'pygame-sprites-q3',
          prompt: '¿Qué método dibuja una imagen sobre la ventana?',
          options: [
            { id: 'a', label: 'screen.blit(imagen, posicion)' },
            { id: 'b', label: 'screen.draw(imagen, posicion)' },
            { id: 'c', label: 'screen.render(imagen, posicion)' }
          ],
          correctOptionId: 'a',
          explanation: 'blit() copia la Surface de la imagen sobre la Surface destino en la posición dada.'
        },
        {
          id: 'pygame-sprites-q4',
          prompt: 'Para animar un sprite con varios fotogramas, ¿qué estructura se usa habitualmente?',
          options: [
            { id: 'a', label: 'Una lista de frames y un contador para cambiarlos cada ciertos ticks' },
            { id: 'b', label: 'Un diccionario de colores por frame' },
            { id: 'c', label: 'Un Rect por cada fotograma de la animación' }
          ],
          correctOptionId: 'a',
          explanation: 'Una lista de imágenes y un contador de frames controlan la velocidad de la animación.'
        },
        {
          id: 'pygame-sprites-q5',
          prompt: '¿En qué orden hay que dibujar fondo y sprites para que el personaje quede visible?',
          options: [
            { id: 'a', label: 'Primero los sprites, luego el fondo' },
            { id: 'b', label: 'Primero el fondo, luego los sprites encima' },
            { id: 'c', label: 'El orden no importa en Pygame' }
          ],
          correctOptionId: 'b',
          explanation: 'Lo que se dibuja primero queda debajo; el fondo debe ir antes para no tapar a los personajes.'
        }
      ]
    },
    'pygame-colisiones': {
      id: 'pygame-colisiones-checkpoint',
      title: 'Evaluación de unidad: Colisiones e interacción',
      summary: 'Demuestra que dominas los Rects, la detección de impactos y las barreras de tu juego.',
      passingScore: 3,
      successMessage: 'Unidad aprobada. Tus juegos ahora tienen interacciones reales.',
      questions: [
        {
          id: 'pygame-colisiones-q1',
          prompt: '¿Qué método devuelve True si dos rectángulos se tocan?',
          options: [
            { id: 'a', label: 'rect1.colliderect(rect2)' },
            { id: 'b', label: 'rect1.touch(rect2)' },
            { id: 'c', label: 'rect1.intersect(rect2)' }
          ],
          correctOptionId: 'a',
          explanation: 'colliderect es el método estándar de Pygame para detectar superposición entre Rects.'
        },
        {
          id: 'pygame-colisiones-q2',
          prompt: '¿Qué método verifica si el cursor del ratón está dentro de un botón?',
          options: [
            { id: 'a', label: 'collidepoint(event.pos)' },
            { id: 'b', label: 'mouse_inside()' },
            { id: 'c', label: 'check_click()' }
          ],
          correctOptionId: 'a',
          explanation: 'collidepoint comprueba si una coordenada (x, y) cae dentro de la caja del Rect.'
        },
        {
          id: 'pygame-colisiones-q3',
          prompt: 'Al recorrer una lista de monedas para eliminarlas al chocar, ¿por qué iteramos sobre una copia (monedas[:])?',
          options: [
            { id: 'a', label: 'Para evitar saltarse elementos, ya que eliminar modifica los índices de la lista original' },
            { id: 'b', label: 'Para que Pygame dibuje más rápido' },
            { id: 'c', label: 'Para duplicar la cantidad de monedas' }
          ],
          correctOptionId: 'a',
          explanation: 'Modificar una lista mientras se itera sobre ella es un error común en Python que causa saltos de índice.'
        },
        {
          id: 'pygame-colisiones-q4',
          prompt: '¿Cómo evitas que el jugador salga por el borde derecho de la pantalla (ancho 800)?',
          options: [
            { id: 'a', label: 'if jugador.right > 800: jugador.right = 800' },
            { id: 'b', label: 'if jugador.x > 800: stop()' },
            { id: 'c', label: 'jugador.set_limit(800)' }
          ],
          correctOptionId: 'a',
          explanation: 'Restringir los atributos del Rect (right) matemáticamente es la forma de hacer muros inquebrantables.'
        },
        {
          id: 'pygame-colisiones-q5',
          prompt: '¿Qué clase de Pygame gestiona la información matemática de tamaño y posición sin tener que dibujarse?',
          options: [
            { id: 'a', label: 'pygame.Rect' },
            { id: 'b', label: 'pygame.Surface' },
            { id: 'c', label: 'pygame.Hitbox' }
          ],
          correctOptionId: 'a',
          explanation: 'Rect existe puramente como cálculo de geometría, ideal para manejar las lógicas invisibles.'
        }
      ]
    },
    'pygame-fisica': {
      id: 'pygame-fisica-checkpoint',
      title: 'Evaluación de unidad: Física básica',
      summary: 'Confirma tus conocimientos de vectores de velocidad, inercia, saltos y gravedad.',
      passingScore: 3,
      successMessage: 'Unidad aprobada. Tus personajes ahora se mueven de forma orgánica y realista.',
      questions: [
        {
          id: 'pygame-fisica-q1',
          prompt: '¿Cómo se implementa un movimiento inercial continuo?',
          options: [
            { id: 'a', label: 'Sumando una variable de velocidad (ej. vel_x) a la posición en cada frame' },
            { id: 'b', label: 'Llamando a la función move_forward()' },
            { id: 'c', label: 'Creando un loop for dentro del while' }
          ],
          correctOptionId: 'a',
          explanation: 'Modificar la posición cada frame basándose en una variable de velocidad crea el movimiento fluido y autónomo.'
        },
        {
          id: 'pygame-fisica-q2',
          prompt: '¿Cuál es la forma más simple de simular gravedad?',
          options: [
            { id: 'a', label: 'Incrementar la velocidad Y positiva en cada frame' },
            { id: 'b', label: 'Usar la librería pygame.physics' },
            { id: 'c', label: 'Restar a la velocidad Y constantemente' }
          ],
          correctOptionId: 'a',
          explanation: 'La gravedad es una aceleración hacia abajo, es decir, aumenta la velocidad positiva en el eje Y constantemente.'
        },
        {
          id: 'pygame-fisica-q3',
          prompt: 'Para hacer que un objeto rebote en una pared lateral, debes:',
          options: [
            { id: 'a', label: 'Invertir el signo de su velocidad X (vel_x = -vel_x)' },
            { id: 'b', label: 'Igualar su velocidad X a cero' },
            { id: 'c', label: 'Multiplicar su posición X por -1' }
          ],
          correctOptionId: 'a',
          explanation: 'Invertir el vector de velocidad horizontal provoca un rebote perfecto al cambiar la dirección instantáneamente.'
        },
        {
          id: 'pygame-fisica-q4',
          prompt: 'Al aterrizar, ¿qué ajuste previene que el jugador quede visualmente hundido en el suelo?',
          options: [
            { id: 'a', label: 'jugador.bottom = suelo.top' },
            { id: 'b', label: 'jugador.y = suelo.y' },
            { id: 'c', label: 'jugador.top = suelo.bottom' }
          ],
          correctOptionId: 'a',
          explanation: 'Alinear la parte inferior del jugador con la superior de la plataforma garantiza un aterrizaje visualmente impecable.'
        },
        {
          id: 'pygame-fisica-q5',
          prompt: '¿Cómo generas balas de forma infinita al disparar?',
          options: [
            { id: 'a', label: 'Añadiendo instancias de Rect a una lista cada vez que se pulsa el botón' },
            { id: 'b', label: 'Creando 1000 variables bala1, bala2...' },
            { id: 'c', label: 'Dibujando un punto que persigue a los enemigos' }
          ],
          correctOptionId: 'a',
          explanation: 'Usar una lista y el método append() permite poblar dinámicamente el juego de proyectiles u otros objetos.'
        }
      ]
    },
    'pygame-sonido-ui': {
      id: 'pygame-sonido-ui-checkpoint',
      title: 'Evaluación de unidad: Sonido e Interfaz',
      summary: 'Verifica tus habilidades para mostrar puntajes, reproducir audios y organizar tus pantallas.',
      passingScore: 3,
      successMessage: 'Unidad aprobada. Tu juego ahora comunica información y estímulos adecuadamente al jugador.',
      questions: [
        {
          id: 'pygame-sonido-q1',
          prompt: '¿Qué clase de Pygame está optimizada para reproducir efectos de sonido cortos como láseres o monedas?',
          options: [
            { id: 'a', label: 'pygame.mixer.Sound' },
            { id: 'b', label: 'pygame.audio.Effect' },
            { id: 'c', label: 'pygame.music.Play' }
          ],
          correctOptionId: 'a',
          explanation: 'mixer.Sound carga los audios cortos en memoria permitiendo reproducirlos sin lag.'
        },
        {
          id: 'pygame-sonido-q2',
          prompt: '¿Por qué no se puede dibujar un string de texto directamente con un método draw()?',
          options: [
            { id: 'a', label: 'Porque debe renderizarse primero como una Surface con fuente.render()' },
            { id: 'b', label: 'Porque Pygame no soporta letras' },
            { id: 'c', label: 'Porque hay que convertir el string a binario' }
          ],
          correctOptionId: 'a',
          explanation: 'Las tarjetas gráficas solo entienden píxeles; el render() fabrica una imagen usando la tipografía.'
        },
        {
          id: 'pygame-sonido-q3',
          prompt: '¿Qué característica nativa de Python es extremadamente útil para generar el texto del HUD (ej: Puntos)?',
          options: [
            { id: 'a', label: 'Los f-strings (f"Texto {variable}")' },
            { id: 'b', label: 'Las listas por comprensión' },
            { id: 'c', label: 'Los diccionarios' }
          ],
          correctOptionId: 'a',
          explanation: 'Los f-strings te permiten mezclar cadenas de texto con variables dinámicas de forma limpia y rápida.'
        },
        {
          id: 'pygame-sonido-q4',
          prompt: 'Al cargar imágenes PNG transparentes, ¿qué método mejora enormemente los frames por segundo (FPS)?',
          options: [
            { id: 'a', label: '.convert_alpha()' },
            { id: 'b', label: '.optimize()' },
            { id: 'c', label: '.fast_load()' }
          ],
          correctOptionId: 'a',
          explanation: 'Adapta el canal alfa de la imagen al formato interno de la gráfica, evitando cálculos por CPU en cada frame.'
        },
        {
          id: 'pygame-sonido-q5',
          prompt: '¿Cuál es la forma más común de programar un menú de inicio y una pantalla de juego separadas?',
          options: [
            { id: 'a', label: 'Usando una variable "estado" y estructuras if/elif en el game loop' },
            { id: 'b', label: 'Ejecutando dos archivos python distintos' },
            { id: 'c', label: 'Cerrando y abriendo otra ventana de pygame' }
          ],
          correctOptionId: 'a',
          explanation: 'Una máquina de estados finitos simple (usando strings o enums) controla qué lógica y dibujo se ejecutan en cada momento.'
        }
      ]
    },
    'pygame-organizacion': {
      id: 'pygame-organizacion-checkpoint',
      title: 'Evaluación de unidad: Organización',
      summary: 'Revisa lo aprendido sobre clases, guardado de archivos y estructura de proyecto.',
      passingScore: 3,
      successMessage: 'Unidad aprobada. Eres oficialmente un desarrollador estructurado. ¡A por el examen final!',
      questions: [
        {
          id: 'pygame-org-q1',
          prompt: '¿Cuál es la ventaja de usar Clases (POO) en tus juegos?',
          options: [
            { id: 'a', label: 'Permiten empaquetar variables (rect, vel) y métodos (mover) en entidades fáciles de instanciar' },
            { id: 'b', label: 'Hacen que Pygame renderice a más FPS' },
            { id: 'c', label: 'Evitan que uses variables de entorno' }
          ],
          correctOptionId: 'a',
          explanation: 'La POO es clave para escalar a decenas de personajes sin crear un caos de variables sueltas.'
        },
        {
          id: 'pygame-org-q2',
          prompt: 'Dentro del método __init__ de un Player, ¿cómo asignamos su Rect para que le pertenezca únicamente a él?',
          options: [
            { id: 'a', label: 'self.rect = pygame.Rect(...)' },
            { id: 'b', label: 'global rect' },
            { id: 'c', label: 'player_rect = pygame.Rect(...)' }
          ],
          correctOptionId: 'a',
          explanation: 'El prefijo self asegura que el atributo se asocie a la instancia específica que estamos creando.'
        },
        {
          id: 'pygame-org-q3',
          prompt: 'Para guardar el puntaje máximo incluso después de cerrar el juego, puedes usar:',
          options: [
            { id: 'a', label: 'with open("save.txt", "w") para escribir en un archivo de texto' },
            { id: 'b', label: 'Una variable global en Python' },
            { id: 'c', label: 'pygame.memory.save()' }
          ],
          correctOptionId: 'a',
          explanation: 'Python básico y sus capacidades de I/O de archivos son la forma más fácil de persistir datos locales.'
        },
        {
          id: 'pygame-org-q4',
          prompt: 'Al usar carpetas separadas para recursos (assets/images, assets/audio), tú código debe:',
          options: [
            { id: 'a', label: 'Incluir la ruta relativa completa: load("assets/images/player.png")' },
            { id: 'b', label: 'Buscar automáticamente en todos los directorios' },
            { id: 'c', label: 'Usar load("player.png") porque Pygame adivina la carpeta' }
          ],
          correctOptionId: 'a',
          explanation: 'Pygame necesita la ruta exacta respecto a donde se está ejecutando el script de Python.'
        },
        {
          id: 'pygame-org-q5',
          prompt: '¿Qué ocurre si cargas un fondo de pantalla gigante y no usas .convert() en él?',
          options: [
            { id: 'a', label: 'Pygame calculará la imagen por software cada frame, bajando severamente el rendimiento' },
            { id: 'b', label: 'El fondo aparecerá en blanco y negro' },
            { id: 'c', label: 'No se podrá dibujar' }
          ],
          correctOptionId: 'a',
          explanation: 'El formato de píxeles no coincidirá con el del monitor, forzando a la CPU a transformar cientos de miles de píxeles en tiempo real.'
        }
      ]
    }
  },
  finalAssessment: {
    id: 'pygame-final',
    title: 'Evaluación final del curso: Pygame',
    summary: 'Valida que ya puedes abrir la ventana, manejar el loop, dibujar figuras, mover sprites y construir un escenario básico.',
    passingScore: 3,
    successMessage: 'Curso finalizado. Ya completaste el curso de Pygame con su evaluación final aprobada.',
    questions: [
      {
        id: 'pygame-final-q1',
        prompt: '¿Qué necesitas antes de dibujar en un juego con Pygame?',
        options: [
          { id: 'a', label: 'Inicializar pygame y crear la ventana' },
          { id: 'b', label: 'Crear un diccionario de colores' },
          { id: 'c', label: 'Conectar un slot de señal' }
        ],
        correctOptionId: 'a',
        explanation: 'La ventana y la inicialización son el punto de partida obligatorio.'
      },
      {
        id: 'pygame-final-q2',
        prompt: '¿Para qué sirve el game loop principal?',
        options: [
          { id: 'a', label: 'Para mantener vivo el juego y procesar eventos cada frame' },
          { id: 'b', label: 'Para imprimir una sola línea en consola' },
          { id: 'c', label: 'Para crear variables globales del juego' }
        ],
        correctOptionId: 'a',
        explanation: 'El loop sostiene la lógica, el render y la respuesta a entradas frame a frame.'
      },
      {
        id: 'pygame-final-q3',
        prompt: '¿Cómo se mueve un sprite en Pygame?',
        options: [
          { id: 'a', label: 'Actualizando su Rect cada frame y redibujando en la nueva posición' },
          { id: 'b', label: 'Usando pygame.move() dentro del loop' },
          { id: 'c', label: 'Cambiando el color del sprite cada iteración' }
        ],
        correctOptionId: 'a',
        explanation: 'Modificar rect.x o rect.y y redibujar crea la ilusión de movimiento fluido.'
      },
      {
        id: 'pygame-final-q4',
        prompt: 'Después de dibujar objetos, ¿qué los hace visibles en pantalla?',
        options: [
          { id: 'a', label: 'pygame.display.flip() o update()' },
          { id: 'b', label: 'pygame.quit()' },
          { id: 'c', label: 'screen.show()' }
        ],
        correctOptionId: 'a',
        explanation: 'flip() vuelca el buffer interno a la ventana para mostrar el frame actual.'
      },
      {
        id: 'pygame-final-q5',
        prompt: '¿Qué convierte una lista de imágenes en una animación?',
        options: [
          { id: 'a', label: 'Un contador que cambia el índice de frame cada ciertos ticks' },
          { id: 'b', label: 'Un for que dibuja todas las imágenes a la vez' },
          { id: 'c', label: 'pygame.animate() con la lista como parámetro' }
        ],
        correctOptionId: 'a',
        explanation: 'Cambiar el fotograma mostrado a una velocidad controlada es todo lo que hace falta para animar.'
      }
    ]
  }
}
