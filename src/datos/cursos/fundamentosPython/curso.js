export const cursoFundamentosPython = {
  id: 'python-fundamentals',
  title: 'Fundamentos Profesionales de Python',
  library: 'Python',
  requiredCourseIds: [],
  summary: 'De la sintaxis básica a la arquitectura de software. Un módulo exhaustivo que cubre lógica, estructuras de datos, POO y gestión de recursos.',
  difficulty: 'Nivel Universitario',
  units: [
    {
      id: 'python-boot',
      title: 'Unidad 1: Lógica y Control de Flujo',
      summary: 'Fundamentos de memoria, tipos de datos y algoritmos de decisión.',
      lessons: [
        {
          id: 'hola-python',
          title: 'Misión 01: Tipado Dinámico y Casting',
          duration: '15 min',
          xp: 150,
          objective: 'Comprender cómo Python gestiona la memoria y la conversión de tipos.',
          resources: {
            videoTitle: 'Variables y Tipos en Profundidad',
            videoUrl: 'https://www.youtube.com/embed/aoF-Tu8utSk',
            documentationLinks: [{ label: 'Tipos integrados', url: 'https://docs.python.org/3/library/stdtypes.html' }],
            exampleTitle: 'Casting de datos',
            exampleCode: `valor = "10"\nnumero = int(valor)\nprint(f"El doble es: {numero * 2}")`,
            supportNote: 'Python es de tipado dinámico (puedes cambiar el tipo de una variable) pero de tipado fuerte (no permite operaciones inválidas entre tipos distintos).'
          },
          instructions: {
            overview: 'Teoría: El casting es el proceso de convertir un valor de un tipo de dato a otro. Es vital cuando recibes datos de un usuario (que siempre llegan como texto) y necesitas realizar operaciones matemáticas.',
            steps: ['Recibe un dato.', 'Conviértelo a entero.', 'Calcula y formatea con f-strings.'],
            hint: 'Usa int() para números y str() para texto.'
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar código',
            title: 'Conversor de Datos',
            prompt: 'Convierte "20" a entero, súmale 5 y muestra: "Resultado: 25"',
            starterCode: `dato = "20"\n# Tu código aquí`,
            expectedKeywords: ['int', 'print', 'f"'],
            successCriteria: 'Imprime exactamente: Resultado: 25',
            expectedResult: 'Resultado: 25',
            solutionCode: `dato = "20"\nnum = int(dato) + 5\nprint(f"Resultado: {num}")`,
            successMessage: '¡Casting comprendido!'
          }
        },
        {
          id: 'flujo-python',
          title: 'Misión 02: Algoritmos de Decisión',
          duration: '15 min',
          xp: 150,
          objective: 'Aplicar lógica booleana y control de flujo anidado.',
          resources: {
            videoTitle: 'Condicionales y Lógica',
            videoUrl: 'https://www.youtube.com/embed/abKLLfMn-pI',
            exampleCode: `if puntos > 90:\n    print("A")\nelif puntos > 80:\n    print("B")\nelse:\n    print("C")`,
            supportNote: 'La indentación en Python no es estética, es obligatoria para definir bloques de código.'
          },
          instructions: {
            overview: 'Teoría: Las estructuras condicionales (if, elif, else) permiten que el programa tome caminos distintos. Python evalúa las condiciones de arriba hacia abajo y ejecuta solo el primer bloque que resulte verdadero.',
            steps: ['Evalúa una variable.', 'Usa elif para múltiples opciones.', 'Define un caso base con else.'],
            hint: 'No olvides los dos puntos (:) al final de cada condición.'
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Corregir lógica',
            title: 'Sistema de Calificación',
            prompt: 'Si la nota es mayor o igual a 3, imprime "Aprobado", de lo contrario "Reprobado".',
            starterCode: `nota = 2.5\n# Tu lógica aquí`,
            expectedKeywords: ['if', 'else', 'print'],
            successCriteria: 'Debe imprimir Reprobado.',
            expectedResult: 'Reprobado',
            solutionCode: `nota = 2.5\nif nota >= 3:\n    print("Aprobado")\nelse:\n    print("Reprobado")`,
            successMessage: 'Lógica impecable.'
          }
        },
        {
          id: 'bucles-python',
          title: 'Misión 03: Iteración y Rangos',
          duration: '20 min',
          xp: 200,
          objective: 'Dominar bucles determinados e indeterminados.',
          resources: {
            videoTitle: 'Bucles For y While',
            videoUrl: 'https://www.youtube.com/embed/nOHwv__awVU',
            exampleCode: `for i in range(3):\n    print(f"Intento {i}")`,
            supportNote: 'range(n) genera una secuencia desde 0 hasta n-1.'
          },
          instructions: {
            overview: 'Teoría: Los bucles permiten automatizar tareas repetitivas. "For" se usa cuando conocemos el número de iteraciones (ej. recorrer una lista), mientras que "While" se usa cuando dependemos de una condición que puede cambiar.',
            steps: ['Usa range() para definir límites.', 'Itera sobre una secuencia.', 'Imprime el índice actual.'],
            hint: 'range(1, 4) iterará 1, 2 y 3.'
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar código',
            title: 'Contador de Ciclos',
            prompt: 'Usa un for con range para imprimir los números del 1 al 3.',
            starterCode: `# Tu bucle aquí`,
            expectedKeywords: ['for', 'in', 'range', 'print'],
            successCriteria: 'Debe imprimir 1, 2 y 3 en líneas separadas.',
            expectedResult: '1\n2\n3',
            solutionCode: `for i in range(1, 4):\n    print(i)`,
            successMessage: '¡Automatización lograda!'
          }
        }
      ]
    },
    {
      id: 'python-tools',
      title: 'Unidad 2: Estructuras y Modularización',
      summary: 'Organización de código, gestión de datos y manejo de errores.',
      lessons: [
        {
          id: 'funciones-python',
          title: 'Misión 04: Modularización con Funciones',
          duration: '20 min',
          xp: 200,
          objective: 'Crear código reutilizable y entender el Scope (alcance).',
          resources: {
            videoTitle: 'Funciones en Python',
            videoUrl: 'https://www.youtube.com/embed/nOHwv__awVU',
            exampleCode: `def sumar(a, b):\n    return a + b`,
            supportNote: 'Las funciones ayudan a seguir el principio DRY (Don\'t Repeat Yourself).'
          },
          instructions: {
            overview: 'Teoría: Una función es un bloque de código con nombre que solo se ejecuta cuando se llama. Los parámetros son la información que le pasas, y el "return" es el resultado que la función devuelve al programa principal.',
            steps: ['Define con def.', 'Pasa parámetros.', 'Retorna un valor.'],
            hint: 'El return finaliza la ejecución de la función.'
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar código',
            title: 'Área de Círculo',
            prompt: 'Crea una función llamada area que reciba radio y devuelva radio * 3.14. Pruébala con radio 10.',
            starterCode: `def area(r):\n    # Tu código`,
            expectedKeywords: ['def', 'return', 'print'],
            successCriteria: 'Debe imprimir 31.4',
            expectedResult: '31.4',
            solutionCode: `def area(r):\n    return r * 3.14\nprint(area(10))`,
            successMessage: '¡Módulo creado!'
          }
        },
        {
          id: 'colecciones-python',
          title: 'Misión 05: Diccionarios y JSON',
          duration: '20 min',
          xp: 200,
          objective: 'Gestionar estructuras de datos complejas.',
          resources: {
            videoTitle: 'Estructuras de Datos',
            videoUrl: 'https://www.youtube.com/embed/fZrDJ2K6rX8',
            exampleCode: `user = {"name": "Jasson", "role": "Admin"}`,
            supportNote: 'Los diccionarios son colecciones desordenadas de pares clave-valor.'
          },
          instructions: {
            overview: 'Teoría: A diferencia de las listas que usan índices numéricos, los diccionarios usan "claves" (como etiquetas). Esto los hace extremadamente eficientes para buscar información específica, similar a cómo funcionan las bases de datos modernas.',
            steps: ['Crea el diccionario.', 'Accede mediante la clave.', 'Imprime el valor.'],
            hint: 'Usa corchetes [] o el método .get().'
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Lectura de código',
            title: 'Acceso a Datos',
            prompt: 'Imprime el valor de la clave "version" del diccionario app.',
            starterCode: `app = {"nombre": "PyPath", "version": 1.5}`,
            expectedKeywords: ['app', '"version"', 'print'],
            successCriteria: 'Debe mostrar 1.5',
            expectedResult: '1.5',
            solutionCode: `app = {"nombre": "PyPath", "version": 1.5}\nprint(app["version"])`,
            successMessage: 'Datos localizados.'
          }
        },
        {
          id: 'excepciones-python',
          title: 'Misión 06: Gestión de Errores (Try-Except)',
          duration: '25 min',
          xp: 250,
          objective: 'Escribir código robusto que no se detenga ante fallos.',
          resources: {
            videoTitle: 'Manejo de Excepciones',
            videoUrl: 'https://www.youtube.com/embed/DpX6it8X6Lw',
            exampleCode: `try:\n    n = 1/0\nexcept ZeroDivisionError:\n    print("Error detectado")`,
            supportNote: 'Es mejor pedir perdón (try-except) que pedir permiso (if-else para todo).'
          },
          instructions: {
            overview: 'Teoría: En producción, los errores son inevitables (un usuario ingresa texto en lugar de un número, un archivo no existe, etc.). El bloque try-except permite "atrapar" estos errores para que la aplicación no se cierre inesperadamente.',
            steps: ['Coloca el código riesgoso en el try.', 'Define el manejo en el except.', 'Asegura la continuidad del programa.'],
            hint: 'Usa except Exception: para atrapar cualquier error.'
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar código',
            title: 'Código a prueba de fallos',
            prompt: 'Intenta dividir 10 entre 0. En el except, imprime "Error".',
            starterCode: `try:\n    # Tu código aquí\nexcept:\n    # Tu código aquí`,
            expectedKeywords: ['try', 'except', 'print'],
            successCriteria: 'Debe imprimir Error.',
            expectedResult: 'Error',
            solutionCode: `try:\n    res = 10 / 0\nexcept:\n    print("Error")`,
            successMessage: '¡Software robusto!'
          }
        }
      ]
    },
    {
      id: 'python-advanced',
      title: 'Unidad 3: Objetos y Sistemas',
      summary: 'Paradigma orientado a objetos y persistencia de datos.',
      lessons: [
        {
          id: 'poo-python',
          title: 'Misión 07: Arquitectura con POO',
          duration: '30 min',
          xp: 350,
          objective: 'Modelar realidades mediante Clases y Objetos.',
          resources: {
            videoTitle: 'Clases y Métodos',
            videoUrl: 'https://www.youtube.com/embed/DpX6it8X6Lw',
            exampleCode: `class Hero:\n    def __init__(self, n):\n        self.name = n`,
            supportNote: 'La POO permite organizar el código como si fueran piezas de un motor.'
          },
          instructions: {
            overview: 'Teoría: La Programación Orientada a Objetos (POO) es un paradigma donde el código se organiza en "Clases" (planos o moldes) y "Objetos" (la pieza construida). El método __init__ es el constructor que inicializa los datos del objeto.',
            steps: ['Define la clase.', 'Inicializa con __init__.', 'Instancia el objeto con parámetros.'],
            hint: 'Self representa al objeto que se está creando.'
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar código',
            title: 'Constructor de Robots',
            prompt: 'Crea una clase Robot con atributo nombre. Instancia uno llamado "Arturo" e imprime su nombre.',
            starterCode: `class Robot:\n    def __init__(self, nombre):\n        # Tu código`,
            expectedKeywords: ['class', 'self', '__init__', 'print'],
            successCriteria: 'Debe imprimir Arturo.',
            expectedResult: 'Arturo',
            solutionCode: `class Robot:\n    def __init__(self, nombre):\n        self.nombre = nombre\n\nobj = Robot("Arturo")\nprint(obj.nombre)`,
            successMessage: '¡Arquitecto de software!'
          }
        },
        {
          id: 'archivos-python',
          title: 'Misión 08: Persistencia y Librerías',
          duration: '25 min',
          xp: 300,
          objective: 'Entender cómo interactuar con el sistema operativo y módulos.',
          resources: {
            videoTitle: 'Manejo de Archivos e Imports',
            videoUrl: 'https://www.youtube.com/embed/fZrDJ2K6rX8',
            exampleCode: `import math\nprint(math.sqrt(16))`,
            supportNote: 'Los módulos permiten usar código escrito por otros desarrolladores o por la comunidad.'
          },
          instructions: {
            overview: 'Teoría: Un programa no sirve de mucho si sus datos se borran al cerrarlo. La persistencia se logra guardando datos en archivos. Además, Python brilla por sus "librerías" (módulos), que son paquetes de funciones listas para usar simplemente importándolas.',
            steps: ['Importa un módulo con import.', 'Usa funciones del módulo.', 'Maneja datos externos.'],
            hint: 'Usa el nombre del módulo seguido de un punto, ej: math.pi'
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar código',
            title: 'Uso de Librerías',
            prompt: 'Importa el módulo math y usa math.isqrt(16) para imprimir la raíz cuadrada entera.',
            starterCode: `# Importa y usa math`,
            expectedKeywords: ['import math', 'print', 'isqrt'],
            successCriteria: 'Debe imprimir 4.',
            expectedResult: '4',
            solutionCode: `import math\nprint(math.isqrt(16))`,
            successMessage: '¡Curso completado con éxito!'
          }
        }
      ]
    }
  ]
};