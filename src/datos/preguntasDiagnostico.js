export const CANTIDAD_PREGUNTAS_DIAGNOSTICO = 15
export const TIEMPO_LIMITE_DIAGNOSTICO_SEGUNDOS = 8 * 60
export const DURACION_DIAGNOSTICO_MINUTOS =
  TIEMPO_LIMITE_DIAGNOSTICO_SEGUNDOS / 60

export const bancoPreguntasDiagnosticoPorTema = {
  variables: [
    {
      id: 'variables-print',
      type: 'multiple-choice',
      domain: 'python',
      prompt: '¿Qué se imprime al ejecutar este código?',
      snippet: `nombre = "PyPath"\nprint(nombre)\n`,
      points: 1,
      options: [
        { id: 'a', label: 'nombre' },
        { id: 'b', label: '"PyPath"' },
        { id: 'c', label: 'PyPath', correct: true },
        { id: 'd', label: 'Nada' },
      ],
    },
    {
      id: 'variables-reasignacion',
      type: 'multiple-choice',
      domain: 'python',
      prompt: 'Después de este código, ¿cuál es el valor de `edad`?',
      snippet: `edad = 17\nedad = edad + 1\n`,
      points: 1,
      options: [
        { id: 'a', label: '16' },
        { id: 'b', label: '17' },
        { id: 'c', label: '18', correct: true },
        { id: 'd', label: '"18"' },
      ],
    },
    {
      id: 'variables-concatenar',
      type: 'code-reading',
      domain: 'python',
      prompt: '¿Qué se imprime aquí?',
      snippet: `saludo = "Hola"\nnombre = "Luna"\nprint(saludo, nombre)\n`,
      points: 1,
      options: [
        { id: 'a', label: 'HolaLuna' },
        { id: 'b', label: 'Hola Luna', correct: true },
        { id: 'c', label: 'Hola, Luna' },
        { id: 'd', label: 'Error' },
      ],
    },
    {
      id: 'variables-expresion',
      type: 'multiple-choice',
      domain: 'python',
      prompt: 'Si `a = 3` y `b = a * 2`, ¿qué contiene `b`?',
      points: 1,
      options: [
        { id: 'a', label: '2' },
        { id: 'b', label: '3' },
        { id: 'c', label: '6', correct: true },
        { id: 'd', label: 'a * 2' },
      ],
    },
  ],
  condicionales: [
    {
      id: 'if-basico',
      type: 'code-reading',
      domain: 'python',
      prompt: '¿Qué imprime este bloque?',
      snippet: `edad = 19\nif edad >= 18:\n    print("mayor")\nelse:\n    print("menor")\n`,
      points: 1,
      options: [
        { id: 'a', label: 'menor' },
        { id: 'b', label: 'mayor', correct: true },
        { id: 'c', label: '19' },
        { id: 'd', label: 'No imprime nada' },
      ],
    },
    {
      id: 'if-operador',
      type: 'multiple-choice',
      domain: 'python',
      prompt: '¿Qué operador se usa para preguntar si dos valores son iguales?',
      points: 1,
      options: [
        { id: 'a', label: '=' },
        { id: 'b', label: '==', correct: true },
        { id: 'c', label: '!=' },
        { id: 'd', label: '>=' },
      ],
    },
    {
      id: 'if-bug',
      type: 'bug-detection',
      domain: 'python',
      prompt: '¿Qué problema tiene este condicional?',
      snippet: `nota = 4\nif nota > 3\n    print("aprobó")\n`,
      points: 1,
      options: [
        { id: 'a', label: 'Falta el `:` al final del `if`', correct: true },
        { id: 'b', label: 'El `print` debe ir antes del `if`' },
        { id: 'c', label: 'Python no permite comparar números' },
        { id: 'd', label: 'La variable `nota` no puede llamarse así' },
      ],
    },
    {
      id: 'if-elif',
      type: 'multiple-choice',
      domain: 'python',
      prompt: '¿Qué imprime si `puntos == 7` en este bloque?',
      snippet: `puntos = 7\nif puntos >= 10:\n    print("Excelente")\nelif puntos >= 5:\n    print("Bien")\nelse:\n    print("Sigue practicando")\n`,
      points: 1,
      options: [
        { id: 'a', label: 'Excelente' },
        { id: 'b', label: 'Bien', correct: true },
        { id: 'c', label: 'Sigue practicando' },
        { id: 'd', label: 'Error' },
      ],
    },
  ],
  ciclos: [
    {
      id: 'for-range',
      type: 'code-reading',
      domain: 'python',
      prompt: '¿Qué valores imprime este `for`?',
      snippet: `for numero in range(3):\n    print(numero)\n`,
      points: 1,
      options: [
        { id: 'a', label: '1, 2, 3' },
        { id: 'b', label: '0, 1, 2', correct: true },
        { id: 'c', label: '0, 1, 2, 3' },
        { id: 'd', label: 'Solo 3' },
      ],
    },
    {
      id: 'while-basico',
      type: 'multiple-choice',
      domain: 'python',
      prompt: '¿Cuándo se repite un `while`?',
      points: 1,
      options: [
        { id: 'a', label: 'Mientras la condición sea verdadera', correct: true },
        { id: 'b', label: 'Solo una vez' },
        { id: 'c', label: 'Mientras la condición sea falsa' },
        { id: 'd', label: 'Nunca' },
      ],
    },
    {
      id: 'for-suma',
      type: 'code-reading',
      domain: 'python',
      prompt: '¿Qué valor final tiene `total`?',
      snippet: `total = 0\nfor valor in [2, 4, 6]:\n    total += valor\n`,
      points: 1,
      options: [
        { id: 'a', label: '10' },
        { id: 'b', label: '12', correct: true },
        { id: 'c', label: '14' },
        { id: 'd', label: '0' },
      ],
    },
    {
      id: 'for-lista',
      type: 'multiple-choice',
      domain: 'python',
      prompt: '¿Qué imprime este bucle?\n\nfrutas = ["pera", "uva"]\nfor fruta in frutas:\n    print(fruta)\n',
      points: 1,
      options: [
        { id: 'a', label: 'pera' },
        { id: 'b', label: 'uva' },
        { id: 'c', label: 'pera\nuva', correct: true },
        { id: 'd', label: 'Error' },
      ],
    },
  ],
  funciones: [
    {
      id: 'funcion-def',
      type: 'multiple-choice',
      domain: 'python',
      prompt: '¿Con qué palabra se define una función en Python?',
      points: 1,
      options: [
        { id: 'a', label: 'function' },
        { id: 'b', label: 'func' },
        { id: 'c', label: 'def', correct: true },
        { id: 'd', label: 'lambda' },
      ],
    },
    {
      id: 'funcion-retorno',
      type: 'code-reading',
      domain: 'python',
      prompt: '¿Qué devuelve esta función cuando se llama con `sumar(2, 3)`?',
      snippet: `def sumar(a, b):\n    return a + b\n`,
      points: 1,
      options: [
        { id: 'a', label: '23' },
        { id: 'b', label: '5', correct: true },
        { id: 'c', label: '"5"' },
        { id: 'd', label: 'Nada' },
      ],
    },
    {
      id: 'funcion-indentacion',
      type: 'bug-detection',
      domain: 'python',
      prompt: '¿Cuál es el error principal en esta función?',
      snippet: `def saludar(nombre):\nprint("Hola", nombre)\n`,
      points: 1,
      options: [
        { id: 'a', label: 'La función debería llamarse `hola`' },
        { id: 'b', label: 'Falta la indentación del cuerpo de la función', correct: true },
        { id: 'c', label: 'No se puede usar `print` dentro de una función' },
        { id: 'd', label: 'El parámetro debe ir entre comillas' },
      ],
    },
    {
      id: 'funcion-parametro',
      type: 'multiple-choice',
      domain: 'python',
      prompt: '¿Qué imprime la siguiente llamada?\n\ndef saludar(nombre):\n    print(f"Hola, {nombre}")\n\nsaludar("Luna")\n',
      points: 1,
      options: [
        { id: 'a', label: 'Imprime Hola, Luna', correct: true },
        { id: 'b', label: 'Devuelve el string Hola, Luna' },
        { id: 'c', label: 'Crea una función llamada Luna' },
        { id: 'd', label: 'No hace nada' },
      ],
    },
  ],
  colecciones: [
    {
      id: 'lista-len',
      type: 'multiple-choice',
      domain: 'python',
      prompt: '¿Qué devuelve `len(["a", "b", "c"])`?',
      points: 1,
      options: [
        { id: 'a', label: '2' },
        { id: 'b', label: '3', correct: true },
        { id: 'c', label: '"3"' },
        { id: 'd', label: 'Error' },
      ],
    },
    {
      id: 'lista-index',
      type: 'code-reading',
      domain: 'python',
      prompt: '¿Qué imprime este acceso a lista?',
      snippet: `frutas = ["mango", "pera", "uva"]\nprint(frutas[1])\n`,
      points: 1,
      options: [
        { id: 'a', label: 'mango' },
        { id: 'b', label: 'pera', correct: true },
        { id: 'c', label: 'uva' },
        { id: 'd', label: '1' },
      ],
    },
    {
      id: 'diccionario-clave',
      type: 'multiple-choice',
      domain: 'python',
      prompt: 'Si `persona = {"nombre": "Ana", "edad": 20}`, ¿cómo accedes a `Ana`?',
      points: 1,
      options: [
        { id: 'a', label: 'persona.nombre' },
        { id: 'b', label: 'persona["nombre"]', correct: true },
        { id: 'c', label: 'persona(0)' },
        { id: 'd', label: 'persona->nombre' },
      ],
    },
    {
      id: 'set-unique',
      type: 'multiple-choice',
      domain: 'python',
      prompt: '¿Qué devuelve `len(set([1, 1, 2]))`?',
      points: 1,
      options: [
        { id: 'a', label: '1' },
        { id: 'b', label: '2', correct: true },
        { id: 'c', label: '3' },
        { id: 'd', label: 'Error' },
      ],
    },
  ],
  logica: [
    {
      id: 'bool-not',
      type: 'multiple-choice',
      domain: 'python',
      prompt: 'Si `activo = False`, ¿qué valor tiene `not activo`?',
      points: 1,
      options: [
        { id: 'a', label: 'False' },
        { id: 'b', label: 'True', correct: true },
        { id: 'c', label: '0' },
        { id: 'd', label: 'None' },
      ],
    },
    {
      id: 'operador-and',
      type: 'multiple-choice',
      domain: 'python',
      prompt: '¿Cuándo una condición con `and` da `True`?',
      points: 1,
      options: [
        { id: 'a', label: 'Cuando al menos una parte es verdadera' },
        { id: 'b', label: 'Solo cuando las dos partes son verdaderas', correct: true },
        { id: 'c', label: 'Siempre' },
        { id: 'd', label: 'Nunca' },
      ],
    },
    {
      id: 'entrada-int',
      type: 'bug-detection',
      domain: 'python',
      prompt: '¿Qué ajuste suele hacer falta aquí para sumar bien dos números?',
      snippet: `edad = input("Edad: ")\nprint(edad + 1)\n`,
      points: 1,
      options: [
        { id: 'a', label: 'Quitar el `print`' },
        { id: 'b', label: 'Convertir la entrada con `int(...)`', correct: true },
        { id: 'c', label: 'Usar `len(edad)`' },
        { id: 'd', label: 'Cambiar `input` por `return`' },
      ],
    },
    {
      id: 'membership-not-in',
      type: 'multiple-choice',
      domain: 'python',
      prompt: '¿Qué devuelve `"x" not in ["a", "x", "z"]`?',
      points: 1,
      options: [
        { id: 'a', label: 'True' },
        { id: 'b', label: 'False', correct: true },
        { id: 'c', label: '"x"' },
        { id: 'd', label: 'Error' },
      ],
    },
  ],
  pandas: [
    {
      id: 'pandas-readcsv',
      type: 'multiple-choice',
      domain: 'pandas',
      prompt: '¿Qué hace `pd.read_csv("datos.csv")` en Pandas?',
      points: 1,
      options: [
        { id: 'a', label: 'Lee un archivo CSV y crea un DataFrame', correct: true },
        { id: 'b', label: 'Guarda un DataFrame en CSV' },
        { id: 'c', label: 'Convierte una lista en fila' },
        { id: 'd', label: 'Abre un archivo de texto' },
      ],
    },
    {
      id: 'pandas-filtro',
      type: 'code-reading',
      domain: 'pandas',
      prompt: '¿Qué selecciona este filtro?\n\ndf[df["ventas"] > 100]\n',
      points: 1,
      options: [
        { id: 'a', label: 'Filas con ventas mayores a 100', correct: true },
        { id: 'b', label: 'Columnas con venta 100' },
        { id: 'c', label: 'Filas con ventas menores a 100' },
        { id: 'd', label: 'Todo el DataFrame' },
      ],
    },
    {
      id: 'pandas-groupby',
      type: 'multiple-choice',
      domain: 'pandas',
      prompt: '¿Qué hace `df.groupby("categoria").sum()`?',
      points: 1,
      options: [
        { id: 'a', label: 'Agrupa por categoría y suma valores', correct: true },
        { id: 'b', label: 'Ordena el DataFrame por categoría' },
        { id: 'c', label: 'Elimina double entries' },
        { id: 'd', label: 'Convierte categorías en números' },
      ],
    },
    {
      id: 'pandas-series',
      type: 'multiple-choice',
      domain: 'pandas',
      prompt: '¿Qué tipo de objeto es el resultado de `df["precio"]`?',
      points: 1,
      options: [
        { id: 'a', label: 'DataFrame' },
        { id: 'b', label: 'Series', correct: true },
        { id: 'c', label: 'Lista' },
        { id: 'd', label: 'Diccionario' },
      ],
    },
  ],
  pygame: [
    {
      id: 'pygame-init',
      type: 'multiple-choice',
      domain: 'pygame',
      prompt: '¿Qué función se usa para inicializar Pygame?',
      points: 1,
      options: [
        { id: 'a', label: 'pygame.start()' },
        { id: 'b', label: 'pygame.init()', correct: true },
        { id: 'c', label: 'pygame.begin()' },
        { id: 'd', label: 'pygame.launch()' },
      ],
    },
    {
      id: 'pygame-quit',
      type: 'multiple-choice',
      domain: 'pygame',
      prompt: '¿Qué evento se usa para cerrar una ventana en Pygame?',
      points: 1,
      options: [
        { id: 'a', label: 'pygame.QUIT', correct: true },
        { id: 'b', label: 'pygame.EXIT' },
        { id: 'c', label: 'pygame.CLOSE' },
        { id: 'd', label: 'pygame.STOP' },
      ],
    },
    {
      id: 'pygame-display',
      type: 'code-reading',
      domain: 'pygame',
      prompt: '¿Qué hace `pygame.display.set_mode((640, 480))`?',
      points: 1,
      options: [
        { id: 'a', label: 'Crea una ventana de 640x480', correct: true },
        { id: 'b', label: 'Carga una imagen de 640x480' },
        { id: 'c', label: 'Inicia el modo de depuración' },
        { id: 'd', label: 'Detiene el juego' },
      ],
    },
    {
      id: 'pygame-flip',
      type: 'multiple-choice',
      domain: 'pygame',
      prompt: '¿Por qué se usa `pygame.display.flip()` en el bucle de juego?',
      points: 1,
      options: [
        { id: 'a', label: 'Para actualizar la pantalla con los nuevos trazos', correct: true },
        { id: 'b', label: 'Para pausar el juego' },
        { id: 'c', label: 'Para cerrar la ventana' },
        { id: 'd', label: 'Para cargar una nueva imagen' },
      ],
    },
  ],
  pyside6: [
    {
      id: 'pyside-app',
      type: 'multiple-choice',
      domain: 'pyside6',
      prompt: '¿Qué clase se usa para iniciar una aplicación de PySide6?',
      points: 1,
      options: [
        { id: 'a', label: 'QApplication', correct: true },
        { id: 'b', label: 'QMainWindow' },
        { id: 'c', label: 'QWidget' },
        { id: 'd', label: 'QLayout' },
      ],
    },
    {
      id: 'pyside-boton',
      type: 'multiple-choice',
      domain: 'pyside6',
      prompt: '¿Qué método conecta una señal `clicked` a una función en PySide6?',
      points: 1,
      options: [
        { id: 'a', label: 'connect()', correct: true },
        { id: 'b', label: 'bind()' },
        { id: 'c', label: 'attach()' },
        { id: 'd', label: 'link()' },
      ],
    },
    {
      id: 'pyside-layout',
      type: 'multiple-choice',
      domain: 'pyside6',
      prompt: '¿Qué clase se usa para apilar widgets en forma vertical?',
      points: 1,
      options: [
        { id: 'a', label: 'QVBoxLayout', correct: true },
        { id: 'b', label: 'QHBoxLayout' },
        { id: 'c', label: 'QGridLayout' },
        { id: 'd', label: 'QStackedLayout' },
      ],
    },
    {
      id: 'pyside-show',
      type: 'multiple-choice',
      domain: 'pyside6',
      prompt: '¿Qué método muestra una ventana en pantalla?',
      points: 1,
      options: [
        { id: 'a', label: 'show()', correct: true },
        { id: 'b', label: 'run()' },
        { id: 'c', label: 'display()' },
        { id: 'd', label: 'open()' },
      ],
    },
  ],
  ciberseguridad: [
    {
      id: 'hashlib-sha256',
      type: 'multiple-choice',
      domain: 'python',
      prompt: '¿Qué sirve `hashlib.sha256(...)` en Python?',
      points: 1,
      options: [
        { id: 'a', label: 'Generar un hash seguro de un texto', correct: true },
        { id: 'b', label: 'Encriptar texto reversible' },
        { id: 'c', label: 'Crear un archivo protegido' },
        { id: 'd', label: 'Firmar un certificado' },
      ],
    },
    {
      id: 'seguridad-input',
      type: 'multiple-choice',
      domain: 'python',
      prompt: '¿Por qué es importante validar entradas del usuario?',
      points: 1,
      options: [
        { id: 'a', label: 'Para evitar errores y ataques', correct: true },
        { id: 'b', label: 'Para hacer más rápido el código' },
        { id: 'c', label: 'Para cambiar el formato del texto' },
        { id: 'd', label: 'Para que el usuario no pueda escribir' },
      ],
    },
    {
      id: 'try-except',
      type: 'code-reading',
      domain: 'python',
      prompt: '¿Qué hace este bloque si ocurre un error?\n\ntry:\n    valor = int(input())\nexcept ValueError:\n    print("Error")\n',
      points: 1,
      options: [
        { id: 'a', label: 'Imprime Error si la conversión falla', correct: true },
        { id: 'b', label: 'Ignora la entrada' },
        { id: 'c', label: 'Cierra el programa sin mensaje' },
        { id: 'd', label: 'Convierte a float automáticamente' },
      ],
    },
    {
      id: 'ciberseguridad-token',
      type: 'multiple-choice',
      domain: 'python',
      prompt: '¿Qué protege mejor un token de acceso?',
      points: 1,
      options: [
        { id: 'a', label: 'Acceso a recursos sin compartir credenciales', correct: true },
        { id: 'b', label: 'La velocidad de la aplicación' },
        { id: 'c', label: 'El estilo de la interfaz' },
        { id: 'd', label: 'El tamaño del archivo' },
      ],
    },
  ],
  poo: [
    {
      id: 'poo-init',
      type: 'multiple-choice',
      domain: 'python',
      prompt: '¿Cuál es el método que se usa para inicializar un objeto en una clase?',
      points: 1,
      options: [
        { id: 'a', label: '__start__' },
        { id: 'b', label: '__init__', correct: true },
        { id: 'c', label: '__new__' },
        { id: 'd', label: 'constructor' },
      ],
    },
    {
      id: 'poo-instancia',
      type: 'code-reading',
      domain: 'python',
      prompt: 'Si tengo la clase `Robot`, ¿cómo creo un objeto de esa clase?',
      points: 1,
      options: [
        { id: 'a', label: 'mi_robot = new Robot()' },
        { id: 'b', label: 'mi_robot = Robot()', correct: true },
        { id: 'c', label: 'mi_robot = create Robot' },
        { id: 'd', label: 'mi_robot -> Robot()' },
      ],
    },
    {
      id: 'poo-self',
      type: 'multiple-choice',
      domain: 'python',
      prompt: '¿Qué representa el parámetro `self` en los métodos de una clase?',
      points: 1,
      options: [
        { id: 'a', label: 'Una variable global' },
        { id: 'b', label: 'La instancia actual del objeto', correct: true },
        { id: 'c', label: 'El nombre de la clase' },
        { id: 'd', label: 'Un error de sintaxis' },
      ],
    },
  ],
}

function mezclarLista(lista) {
  return [...lista].sort(() => Math.random() - 0.5)
}

function aplanarBanco() {
  return Object.entries(bancoPreguntasDiagnosticoPorTema).flatMap(([tema, preguntas]) =>
    preguntas.map((pregunta) => ({ ...pregunta, topic: tema })),
  )
}

export function obtenerPreguntasDiagnosticoPorIds(ids = []) {
  const bancoPlano = aplanarBanco()

  return ids
    .map((id) => bancoPlano.find((pregunta) => pregunta.id === id))
    .filter(Boolean)
}

export function crearIntentoDiagnosticoAleatorio() {
  const grupos = Object.values(bancoPreguntasDiagnosticoPorTema)
  const seleccionBase = grupos
    .map((preguntas) => mezclarLista(preguntas)[0])
    .filter(Boolean)
  const idsBase = new Set(seleccionBase.map((pregunta) => pregunta.id))
  const preguntasRestantes = mezclarLista(aplanarBanco()).filter(
    (pregunta) => !idsBase.has(pregunta.id),
  )
  const seleccion = mezclarLista([
    ...seleccionBase,
    ...preguntasRestantes.slice(
      0,
      Math.max(CANTIDAD_PREGUNTAS_DIAGNOSTICO - seleccionBase.length, 0),
    ),
  ]).slice(0, CANTIDAD_PREGUNTAS_DIAGNOSTICO)

  return {
    questionIds: seleccion.map((pregunta) => pregunta.id),
    answers: {},
    currentIndex: 0,
    startedAt: new Date().toISOString(),
    expiresAt: new Date(
      Date.now() + TIEMPO_LIMITE_DIAGNOSTICO_SEGUNDOS * 1000,
    ).toISOString(),
  }
}
