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
    'python-flow': {
      id: 'python-flow-checkpoint',
      title: 'Evaluación de unidad: Lógica y Control de Flujo',
      summary: 'Comprueba que ya puedes tomar decisiones con if, elif y operadores lógicos.',
      passingScore: 2,
      successMessage:
        'Unidad aprobada. Ya puedes construir decisiones más claras antes de pasar a ciclos más complejos.',
      questions: [
        {
          id: 'flow-q1',
          prompt: '¿Qué estructura usas para ejecutar un bloque solo cuando una condición se cumple?',
          options: [
            { id: 'a', label: 'if' },
            { id: 'b', label: 'for' },
            { id: 'c', label: 'print' },
          ],
          correctOptionId: 'a',
          explanation: 'if permite evaluar una condición y ejecutar código solo en ese caso.',
        },
        {
          id: 'flow-q2',
          prompt: '¿Para qué sirve elif dentro de una cadena de decisiones?',
          options: [
            { id: 'a', label: 'Para repetir el mismo bloque varias veces' },
            { id: 'b', label: 'Para evaluar un caso alternativo si el if anterior no se cumple' },
            { id: 'c', label: 'Para cerrar automáticamente un bucle' },
          ],
          correctOptionId: 'b',
          explanation: 'elif agrega caminos alternativos dentro de una decisión condicional.',
        },
        {
          id: 'flow-q3',
          prompt: '¿Qué operador lógico exige que dos condiciones sean verdaderas al mismo tiempo?',
          options: [
            { id: 'a', label: 'or' },
            { id: 'b', label: 'and' },
            { id: 'c', label: 'not' },
          ],
          correctOptionId: 'b',
          explanation: 'and solo devuelve verdadero cuando todas las condiciones implicadas se cumplen.',
        },
      ],
    },
    'python-loops': {
      id: 'python-loops-checkpoint',
      title: 'Evaluación de unidad: Iteración y Ciclos',
      summary: 'Verifica que ya sabes recorrer datos y controlar cuándo un ciclo continúa o se detiene.',
      passingScore: 2,
      successMessage:
        'Unidad aprobada. Ya puedes automatizar repeticiones y controlar mejor el flujo de ejecución.',
      questions: [
        {
          id: 'loops-q1',
          prompt: '¿Qué función se usa con frecuencia junto a for para generar una secuencia de números?',
          options: [
            { id: 'a', label: 'range()' },
            { id: 'b', label: 'len()' },
            { id: 'c', label: 'input()' },
          ],
          correctOptionId: 'a',
          explanation: 'range() produce secuencias numéricas muy útiles en ciclos for.',
        },
        {
          id: 'loops-q2',
          prompt: '¿Cuándo termina normalmente un bucle while?',
          options: [
            { id: 'a', label: 'Cuando el programa imprime un valor' },
            { id: 'b', label: 'Cuando la condición deja de ser verdadera' },
            { id: 'c', label: 'Cuando encuentra una lista vacía' },
          ],
          correctOptionId: 'b',
          explanation: 'while se ejecuta mientras la condición evaluada siga siendo verdadera.',
        },
        {
          id: 'loops-q3',
          prompt: '¿Qué hace la instrucción break dentro de un ciclo?',
          options: [
            { id: 'a', label: 'Salta a la siguiente iteración' },
            { id: 'b', label: 'Convierte el ciclo en una función' },
            { id: 'c', label: 'Interrumpe el ciclo por completo' },
          ],
          correctOptionId: 'c',
          explanation: 'break corta la ejecución del ciclo actual y sale de él de inmediato.',
        },
      ],
    },
    'python-functions': {
      id: 'python-functions-checkpoint',
      title: 'Evaluación de unidad: Modularización y Funciones',
      summary: 'Confirma que puedes declarar funciones, devolver resultados y entender el alcance de variables.',
      passingScore: 2,
      successMessage:
        'Unidad aprobada. Ya puedes organizar mejor tu código y reutilizar lógica en distintas partes.',
      questions: [
        {
          id: 'functions-q1',
          prompt: '¿Qué palabra reservada se usa para declarar una función en Python?',
          options: [
            { id: 'a', label: 'func' },
            { id: 'b', label: 'def' },
            { id: 'c', label: 'lambda' },
          ],
          correctOptionId: 'b',
          explanation: 'def es la palabra reservada estándar para declarar funciones con nombre.',
        },
        {
          id: 'functions-q2',
          prompt: '¿Qué hace return dentro de una función?',
          options: [
            { id: 'a', label: 'Repite la función automáticamente' },
            { id: 'b', label: 'Devuelve un resultado al lugar donde la función fue llamada' },
            { id: 'c', label: 'Convierte variables locales en globales' },
          ],
          correctOptionId: 'b',
          explanation: 'return entrega un valor de salida y cierra la ejecución de la función.',
        },
        {
          id: 'functions-q3',
          prompt: 'Cuando una variable se crea dentro de una función, normalmente su alcance es...',
          options: [
            { id: 'a', label: 'Global a todo el archivo' },
            { id: 'b', label: 'Local a la función' },
            { id: 'c', label: 'Visible solo dentro de los if' },
          ],
          correctOptionId: 'b',
          explanation: 'Las variables creadas dentro de una función suelen vivir solo en ese contexto local.',
        },
      ],
    },
    'python-lists': {
      id: 'python-lists-checkpoint',
      title: 'Evaluación de unidad: Listas y Colecciones I',
      summary: 'Verifica que entiendes índices, mutabilidad de listas y diferencias básicas con las tuplas.',
      passingScore: 2,
      successMessage:
        'Unidad aprobada. Ya puedes trabajar con colecciones ordenadas de forma más segura y flexible.',
      questions: [
        {
          id: 'lists-q1',
          prompt: '¿Con qué índice accedes al primer elemento de una lista?',
          options: [
            { id: 'a', label: '0' },
            { id: 'b', label: '1' },
            { id: 'c', label: '-1' },
          ],
          correctOptionId: 'a',
          explanation: 'Python usa indexación basada en cero para listas y otras secuencias.',
        },
        {
          id: 'lists-q2',
          prompt: '¿Qué significa que una lista sea mutable?',
          options: [
            { id: 'a', label: 'Que puede cambiarse después de creada' },
            { id: 'b', label: 'Que solo guarda números' },
            { id: 'c', label: 'Que no puede ordenarse' },
          ],
          correctOptionId: 'a',
          explanation: 'Las listas permiten agregar, eliminar o modificar elementos tras su creación.',
        },
        {
          id: 'lists-q3',
          prompt: '¿Cuál es una diferencia clave entre una lista y una tupla?',
          options: [
            { id: 'a', label: 'La tupla es inmutable y la lista no' },
            { id: 'b', label: 'La lista solo guarda texto' },
            { id: 'c', label: 'La tupla siempre tiene más elementos' },
          ],
          correctOptionId: 'a',
          explanation: 'La diferencia más importante aquí es que la tupla no se modifica una vez creada.',
        },
      ],
    },
    'python-dicts': {
      id: 'python-dicts-checkpoint',
      title: 'Evaluación de unidad: Diccionarios y Colecciones II',
      summary: 'Evalúa si ya sabes trabajar con claves, valores y colecciones únicas como los sets.',
      passingScore: 2,
      successMessage:
        'Unidad aprobada. Ya dominas estructuras clave-valor y colecciones sin duplicados.',
      questions: [
        {
          id: 'dicts-q1',
          prompt: '¿Cómo se llama la parte izquierda en un par "clave: valor" de un diccionario?',
          options: [
            { id: 'a', label: 'Índice' },
            { id: 'b', label: 'Clave' },
            { id: 'c', label: 'Atributo' },
          ],
          correctOptionId: 'b',
          explanation: 'En un diccionario, la clave identifica el dato asociado.',
        },
        {
          id: 'dicts-q2',
          prompt: '¿Qué haces si quieres cambiar el valor de una clave existente en un diccionario?',
          options: [
            { id: 'a', label: 'Asignar un nuevo valor usando esa misma clave' },
            { id: 'b', label: 'Usar break' },
            { id: 'c', label: 'Convertirlo en una lista' },
          ],
          correctOptionId: 'a',
          explanation: 'Se actualiza escribiendo de nuevo la clave y asignándole el nuevo valor.',
        },
        {
          id: 'dicts-q3',
          prompt: '¿Qué característica distingue a un set en Python?',
          options: [
            { id: 'a', label: 'Mantiene pares clave-valor' },
            { id: 'b', label: 'Permite elementos únicos sin repetidos' },
            { id: 'c', label: 'Solo puede tener enteros' },
          ],
          correctOptionId: 'b',
          explanation: 'Los sets destacan por evitar duplicados y facilitar operaciones de pertenencia.',
        },
      ],
    },
    'python-errors': {
      id: 'python-errors-checkpoint',
      title: 'Evaluación de unidad: Robustez y Excepciones',
      summary: 'Comprueba que ya entiendes cómo capturar errores y limpiar recursos al final de una operación.',
      passingScore: 2,
      successMessage:
        'Unidad aprobada. Ya puedes escribir programas más robustos frente a errores comunes.',
      questions: [
        {
          id: 'errors-q1',
          prompt: '¿Qué bloque se usa para capturar una excepción en Python?',
          options: [
            { id: 'a', label: 'catch' },
            { id: 'b', label: 'except' },
            { id: 'c', label: 'error' },
          ],
          correctOptionId: 'b',
          explanation: 'except es el bloque encargado de manejar errores dentro de una estructura try.',
        },
        {
          id: 'errors-q2',
          prompt: '¿Por qué conviene capturar errores específicos cuando es posible?',
          options: [
            { id: 'a', label: 'Porque así el manejo del error es más preciso y legible' },
            { id: 'b', label: 'Porque evita usar variables' },
            { id: 'c', label: 'Porque elimina todos los errores automáticamente' },
          ],
          correctOptionId: 'a',
          explanation: 'Capturar errores concretos ayuda a responder mejor a cada caso y evita ocultar fallos.',
        },
        {
          id: 'errors-q3',
          prompt: '¿Qué hace el bloque finally dentro de try/except?',
          options: [
            { id: 'a', label: 'Se ejecuta solo si no hubo error' },
            { id: 'b', label: 'Se ejecuta al final, haya o no excepción' },
            { id: 'c', label: 'Reemplaza al bloque except' },
          ],
          correctOptionId: 'b',
          explanation: 'finally sirve para limpieza o cierre de recursos independientemente del resultado.',
        },
      ],
    },
    'python-oop': {
      id: 'python-oop-checkpoint',
      title: 'Evaluación de unidad: Programación Orientada a Objetos',
      summary: 'Valida que reconoces clases, objetos, self y la idea de modificar el estado interno.',
      passingScore: 2,
      successMessage:
        'Unidad aprobada. Ya puedes leer y construir estructuras orientadas a objetos más básicas.',
      questions: [
        {
          id: 'oop-q1',
          prompt: '¿Qué representa una clase en Python?',
          options: [
            { id: 'a', label: 'Un plano o plantilla para crear objetos' },
            { id: 'b', label: 'Un ciclo especial para recorrer listas' },
            { id: 'c', label: 'Una excepción del sistema' },
          ],
          correctOptionId: 'a',
          explanation: 'La clase define atributos y comportamientos que luego tendrán sus objetos.',
        },
        {
          id: 'oop-q2',
          prompt: '¿Para qué se usa normalmente __init__?',
          options: [
            { id: 'a', label: 'Para inicializar atributos cuando nace un objeto' },
            { id: 'b', label: 'Para capturar errores automáticamente' },
            { id: 'c', label: 'Para imprimir la clase en pantalla' },
          ],
          correctOptionId: 'a',
          explanation: '__init__ permite configurar el estado inicial del objeto al crearlo.',
        },
        {
          id: 'oop-q3',
          prompt: '¿Qué papel cumple self dentro de un método de instancia?',
          options: [
            { id: 'a', label: 'Representa a la instancia actual del objeto' },
            { id: 'b', label: 'Es una palabra reservada para listas' },
            { id: 'c', label: 'Hace que el método sea global' },
          ],
          correctOptionId: 'a',
          explanation: 'self permite acceder al estado y atributos del objeto actual dentro del método.',
        },
      ],
    },
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
