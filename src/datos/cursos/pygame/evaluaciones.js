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
    },
    'pygame-proyecto-final': {
      id: 'pygame-proyecto-checkpoint',
      title: 'Evaluación de unidad: Proyecto Snake',
      summary: 'Demuestra que dominas la lógica detrás de uno de los juegos más clásicos de la historia.',
      passingScore: 3,
      successMessage: '¡Increíble! Acabas de completar tu proyecto final. Solo te queda la evaluación final del curso.',
      questions: [
        {
          id: 'pygame-snake-q1',
          prompt: 'En el juego de Snake, ¿cómo se representa idealmente el cuerpo de la serpiente?',
          options: [
            { id: 'a', label: 'Como una lista de objetos Rect, donde cada uno es un segmento' },
            { id: 'b', label: 'Como una sola imagen muy larga' },
            { id: 'c', label: 'Como múltiples ventanas de Pygame' }
          ],
          correctOptionId: 'a',
          explanation: 'Una lista permite rastrear de forma individual la posición de la cabeza y de cada segmento de la cola.'
        },
        {
          id: 'pygame-snake-q2',
          prompt: '¿Cómo logramos el efecto visual de que la serpiente "avanza"?',
          options: [
            { id: 'a', label: 'Clonamos la cabeza, la movemos, la insertamos al inicio de la lista y eliminamos el último elemento' },
            { id: 'b', label: 'Le sumamos +1 a todos los elementos al mismo tiempo' },
            { id: 'c', label: 'Borramos toda la serpiente y la dibujamos de nuevo un píxel más allá' }
          ],
          correctOptionId: 'a',
          explanation: 'El algoritmo de la "oruga" es mucho más eficiente que calcular vectores para cada segmento individualmente.'
        },
        {
          id: 'pygame-snake-q3',
          prompt: '¿Qué sucede a nivel de código cuando la serpiente "come" una manzana?',
          options: [
            { id: 'a', label: 'Omitimos el paso de eliminar el último elemento (el pop), haciendo que la lista sea 1 elemento más larga' },
            { id: 'b', label: 'Creamos una segunda lista llamada "estomago"' },
            { id: 'c', label: 'Multiplicamos el tamaño del Rect de la cabeza por 2' }
          ],
          correctOptionId: 'a',
          explanation: 'Al insertar una nueva cabeza y no borrar la cola antigua, la longitud neta de la serpiente crece.'
        },
        {
          id: 'pygame-snake-q4',
          prompt: 'Para movernos en una "cuadrícula" invisible, la velocidad (vel_x, vel_y) de la serpiente debe ser:',
          options: [
            { id: 'a', label: 'Exactamente igual al tamaño de la celda (ej. 20 píxeles)' },
            { id: 'b', label: 'Un número aleatorio' },
            { id: 'c', label: 'Siempre 1 píxel por fotograma' }
          ],
          correctOptionId: 'a',
          explanation: 'Mover la cabeza en incrementos del ancho exacto de una celda asegura que siempre encaje en el grid imaginario.'
        },
        {
          id: 'pygame-snake-q5',
          prompt: '¿Cuál es la forma más limpia en Python de comprobar si la serpiente ha chocado consigo misma (Game Over)?',
          options: [
            { id: 'a', label: 'if nueva_cabeza in serpiente:' },
            { id: 'b', label: 'Creando un loop for anidado de 10 niveles' },
            { id: 'c', label: 'Midiendo la distancia entre la cabeza y el centro de la pantalla' }
          ],
          correctOptionId: 'a',
          explanation: 'El operador "in" de Python permite buscar eficientemente si un objeto idéntico ya existe dentro de una lista.'
        }
      ]
    }
  },
  finalAssessment: {
    id: 'pygame-final',
    title: 'Evaluación final del curso: Pygame',
    summary: 'Demuestra que estás listo para crear tus propios juegos dominando todas las mecánicas vistas en el curso.',
    passingScore: 14,
    successMessage: '¡Felicidades! Has completado y aprobado el curso de Pygame. Eres oficialmente un desarrollador de videojuegos en Python.',
    questions: [
      {
        id: 'pygame-final-q1',
        prompt: '¿Qué método debes llamar para configurar la ventana gráfica principal del juego?',
        options: [
          { id: 'a', label: 'pygame.display.set_mode()' },
          { id: 'b', label: 'pygame.window.create()' },
          { id: 'c', label: 'pygame.init_screen()' }
        ],
        correctOptionId: 'a',
        explanation: 'set_mode() es la función que inicializa la ventana principal donde se dibujará todo.'
      },
      {
        id: 'pygame-final-q2',
        prompt: 'Para mantener el juego corriendo a una velocidad estable (ej: 60 FPS), ¿qué usas dentro del game loop?',
        options: [
          { id: 'a', label: 'clock.tick(60)' },
          { id: 'b', label: 'pygame.time.sleep(60)' },
          { id: 'c', label: 'event.wait(60)' }
        ],
        correctOptionId: 'a',
        explanation: 'clock.tick() regula los fotogramas por segundo pausando el loop lo necesario.'
      },
      {
        id: 'pygame-final-q3',
        prompt: '¿Cómo dibujas una imagen (surface) encima de la ventana principal?',
        options: [
          { id: 'a', label: 'Usando screen.blit(imagen, (x, y))' },
          { id: 'b', label: 'Usando screen.draw(imagen)' },
          { id: 'c', label: 'Usando pygame.render(imagen)' }
        ],
        correctOptionId: 'a',
        explanation: 'blit (Block Transfer) copia los píxeles de una superficie sobre otra.'
      },
      {
        id: 'pygame-final-q4',
        prompt: 'Al escalar una imagen, ¿qué método de Pygame se usa?',
        options: [
          { id: 'a', label: 'pygame.transform.scale()' },
          { id: 'b', label: 'imagen.resize()' },
          { id: 'c', label: 'pygame.image.zoom()' }
        ],
        correctOptionId: 'a',
        explanation: 'El módulo transform contiene las funciones para escalar, rotar y espejar superficies.'
      },
      {
        id: 'pygame-final-q5',
        prompt: '¿Qué método es la forma estándar de saber si dos objetos han chocado en Pygame?',
        options: [
          { id: 'a', label: 'rect1.colliderect(rect2)' },
          { id: 'b', label: 'rect1.touch(rect2)' },
          { id: 'c', label: 'rect1.intersect(rect2)' }
        ],
        correctOptionId: 'a',
        explanation: 'colliderect compara las geometrías de dos Rects para ver si se superponen.'
      },
      {
        id: 'pygame-final-q6',
        prompt: '¿Qué clase se encarga puramente de la geometría invisible (posiciones x/y, ancho, alto) sin dibujarse?',
        options: [
          { id: 'a', label: 'pygame.Rect' },
          { id: 'b', label: 'pygame.Hitbox' },
          { id: 'c', label: 'pygame.Surface' }
        ],
        correctOptionId: 'a',
        explanation: 'El Rect es el corazón de las matemáticas de colisión y posicionamiento en Pygame.'
      },
      {
        id: 'pygame-final-q7',
        prompt: 'Si quieres simular gravedad, ¿qué debes hacer en cada frame?',
        options: [
          { id: 'a', label: 'Sumar un valor constante a la velocidad vertical (vel_y += gravedad)' },
          { id: 'b', label: 'Aumentar la posición X constantemente' },
          { id: 'c', label: 'Restar a la velocidad Y constantemente' }
        ],
        correctOptionId: 'a',
        explanation: 'La gravedad es una aceleración constante hacia abajo (eje Y positivo en Pygame).'
      },
      {
        id: 'pygame-final-q8',
        prompt: 'Para evitar que un jugador atraviese el suelo al caer, al detectar colisión debes:',
        options: [
          { id: 'a', label: 'Alinear jugador.bottom = suelo.top y poner su vel_y a 0' },
          { id: 'b', label: 'Restar vel_y de su posición' },
          { id: 'c', label: 'Destruir el suelo' }
        ],
        correctOptionId: 'a',
        explanation: 'Esto asegura que el sprite quede reposando exactamente sobre la plataforma sin hundirse.'
      },
      {
        id: 'pygame-final-q9',
        prompt: '¿Qué paso previo es obligatorio para dibujar texto dinámico (como un puntaje) en pantalla?',
        options: [
          { id: 'a', label: 'Usar fuente.render() para convertir el string en una imagen primero' },
          { id: 'b', label: 'Usar screen.write("Texto")' },
          { id: 'c', label: 'Convertir el texto a números' }
        ],
        correctOptionId: 'a',
        explanation: 'Pygame no dibuja texto directo; renderiza el texto en una Surface que luego bliteas.'
      },
      {
        id: 'pygame-final-q10',
        prompt: 'Al cargar imágenes con fondos transparentes, ¿qué método mejora drásticamente el rendimiento?',
        options: [
          { id: 'a', label: '.convert_alpha()' },
          { id: 'b', label: '.optimize()' },
          { id: 'c', label: '.fast_render()' }
        ],
        correctOptionId: 'a',
        explanation: 'Alinea el formato de color de la imagen con el del monitor para aceleración por hardware.'
      },
      {
        id: 'pygame-final-q11',
        prompt: '¿Por qué es altamente recomendable usar Clases (POO) en Pygame?',
        options: [
          { id: 'a', label: 'Porque agrupa el Rect, velocidades y métodos de cada entidad de forma independiente' },
          { id: 'b', label: 'Porque Pygame obliga a heredar de sus clases' },
          { id: 'c', label: 'Porque hace que el juego cargue más rápido' }
        ],
        correctOptionId: 'a',
        explanation: 'La POO evita un mar de variables globales y permite tener múltiples enemigos y proyectiles fácilmente.'
      },
      {
        id: 'pygame-final-q12',
        prompt: 'Para guardar el "High Score" en disco y que no se pierda al cerrar el juego, lo más sencillo es:',
        options: [
          { id: 'a', label: 'Usar el manejo de archivos nativo de Python con open("archivo.txt", "w")' },
          { id: 'b', label: 'Crear una variable global' },
          { id: 'c', label: 'Usar pygame.save_state()' }
        ],
        correctOptionId: 'a',
        explanation: 'Pygame delega en Python estándar todo lo que tiene que ver con escritura y lectura de archivos.'
      },
      {
        id: 'pygame-final-q13',
        prompt: 'En el algoritmo clásico de Snake, ¿cómo se mueve el cuerpo fluidamente por la cuadrícula?',
        options: [
          { id: 'a', label: 'Se clona la cabeza, se mueve a la nueva posición, se inserta al inicio y se borra la cola (pop)' },
          { id: 'b', label: 'Se recalculan las coordenadas x/y de todos los segmentos con un bucle for' },
          { id: 'c', label: 'Se dibuja un Rect que se estira y se encoge' }
        ],
        correctOptionId: 'a',
        explanation: 'Este enfoque de tipo "oruga" usando listas es extremadamente eficiente y fácil de programar.'
      },
      {
        id: 'pygame-final-q14',
        prompt: 'En la lógica del juego Snake, ¿qué pasa si la serpiente choca con la manzana?',
        options: [
          { id: 'a', label: 'Omitimos la eliminación de la cola (pop), de manera que la serpiente crece en 1 segmento' },
          { id: 'b', label: 'Le sumamos ancho y alto a todos sus rectángulos' },
          { id: 'c', label: 'La cabeza cambia de color' }
        ],
        correctOptionId: 'a',
        explanation: 'Al insertar una nueva cabeza y no borrar la cola vieja, el tamaño del array aumenta naturalmente.'
      },
      {
        id: 'pygame-final-q15',
        prompt: '¿Por qué es obligatorio iterar sobre pygame.event.get() en el loop principal?',
        options: [
          { id: 'a', label: 'Para evitar que la ventana se congele procesando las señales del sistema (como clics o el botón de cerrar)' },
          { id: 'b', label: 'Para que los sprites se muevan más rápido' },
          { id: 'c', label: 'Para calcular los FPS del juego' }
        ],
        correctOptionId: 'a',
        explanation: 'El sistema operativo necesita que tu juego escuche y procese eventos; si no lo haces, creerá que el juego colapsó.'
      },
      {
        id: 'pygame-final-q16',
        prompt: 'Para detectar el movimiento continuo de un personaje al mantener pulsada una tecla (ej: flechas de dirección), debes usar:',
        options: [
          { id: 'a', label: 'pygame.key.get_pressed()' },
          { id: 'b', label: 'Esperar un evento KEYDOWN específico cada frame' },
          { id: 'c', label: 'pygame.mouse.get_pressed()' }
        ],
        correctOptionId: 'a',
        explanation: 'get_pressed() te da una lista constante de qué teclas están hundidas en ese preciso frame, ideal para caminar fluidamente.'
      },
      {
        id: 'pygame-final-q17',
        prompt: 'Después de usar screen.blit() para pintar elementos y fondos en un frame, ¿qué falta para que el jugador realmente lo vea?',
        options: [
          { id: 'a', label: 'Llamar a pygame.display.flip() o update()' },
          { id: 'b', label: 'Llamar a pygame.display.show()' },
          { id: 'c', label: 'Nada, blit() actualiza la pantalla de forma instantánea' }
        ],
        correctOptionId: 'a',
        explanation: 'Pygame dibuja en la sombra (buffer oculto). flip() intercambia ese buffer con la ventana para que se vea sin parpadeos.'
      },
      {
        id: 'pygame-final-q18',
        prompt: '¿Qué clase de Pygame pre-carga audios cortos en memoria para reproducirlos al instante sin lag?',
        options: [
          { id: 'a', label: 'pygame.mixer.Sound' },
          { id: 'b', label: 'pygame.audio.Effect' },
          { id: 'c', label: 'pygame.music.Short' }
        ],
        correctOptionId: 'a',
        explanation: 'Los objetos Sound son perfectos para efectos repetitivos como láseres, saltos o colisiones.'
      },
      {
        id: 'pygame-final-q19',
        prompt: '¿Cuál es la forma más estructurada de separar tu "Menú Principal" de la pantalla del "Juego"?',
        options: [
          { id: 'a', label: 'Usar una variable de estado (ej: estado = "MENU") y bifurcar la lógica en el loop con if/elif' },
          { id: 'b', label: 'Abrir una segunda ventana de Pygame' },
          { id: 'c', label: 'Cargar un archivo .py completamente distinto' }
        ],
        correctOptionId: 'a',
        explanation: 'Las máquinas de estado te permiten usar la misma ventana y el mismo loop, simplemente cambiando qué reglas se ejecutan.'
      }
    ]
  }
}
