export const CANTIDAD_PREGUNTAS_DIAGNOSTICO = 10
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
        { id: 'a', label: '=', },
        { id: 'b', label: '==', correct: true },
        { id: 'c', label: '!=', },
        { id: 'd', label: '>=', },
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
