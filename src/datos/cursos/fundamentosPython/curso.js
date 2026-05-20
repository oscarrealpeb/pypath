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
      title: 'Unidad 1: Bases y Tipos de Datos',
      summary: 'Fundamentos de memoria, variables y conversión de tipos.',
      lessons: [
        {
          id: 'u1-l1',
          title: 'Misión 01: Hola Python y Variables',
          duration: '15 min',
          xp: 150,
          objective: 'Comprender la sintaxis básica y la asignación en memoria.',
          resources: {
            videoTitle: 'Introducción a Python',
            videoUrl: 'https://www.youtube.com/embed/aoF-Tu8utSk',
            exampleCode: `mensaje = "Hola Mundo"\nprint(mensaje)`,
            supportNote: 'Python ejecuta el código línea por línea de arriba hacia abajo.'
          },
          instructions: {
            overview: 'Teoría: Las variables son etiquetas que apuntan a un espacio en memoria. La función print() nos permite ver el valor en la consola.',
            steps: ['Crea una variable.', 'Asigna un texto.', 'Usa print para mostrarla.'],
            hint: 'Asegúrate de usar comillas para los textos (strings).'
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar código',
            title: 'Tu primer programa',
            prompt: 'Crea una variable llamada "saludo" con el texto "Hola" e imprímela.',
            starterCode: `# Tu código aquí`,
            expectedKeywords: ['saludo', 'print', '"Hola"'],
            successCriteria: 'Debe imprimir Hola.',
            expectedResult: 'Hola',
            solutionCode: `saludo = "Hola"\nprint(saludo)`,
            successMessage: '¡Excelente inicio!'
          }
        },
        {
          id: 'u1-l2',
          title: 'Misión 02: Tipado Dinámico y Matemáticas',
          duration: '15 min',
          xp: 150,
          objective: 'Realizar operaciones aritméticas con distintos tipos de datos numéricos.',
          resources: {
            videoTitle: 'Operadores Matemáticos',
            videoUrl: 'https://www.youtube.com/embed/abKLLfMn-pI',
            exampleCode: `a = 10\nb = 3.5\nprint(a + b)`,
            supportNote: 'Python maneja enteros (int) y decimales (float) automáticamente.'
          },
          instructions: {
            overview: 'Teoría: Python soporta operaciones como suma (+), resta (-), multiplicación (*) y división (/).',
            steps: ['Define dos variables numéricas.', 'Súmalas.', 'Imprime el resultado.'],
            hint: 'No uses comillas para los números.'
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar código',
            title: 'Calculadora Básica',
            prompt: 'Suma 15 y 20.5, y muestra el resultado.',
            starterCode: `num1 = 15\nnum2 = 20.5\n# Imprime la suma`,
            expectedKeywords: ['print', '+', 'num1', 'num2'],
            successCriteria: 'Debe imprimir 35.5',
            expectedResult: '35.5',
            solutionCode: `num1 = 15\nnum2 = 20.5\nprint(num1 + num2)`,
            successMessage: '¡Matemáticas dominadas!'
          }
        },
        {
          id: 'u1-l3',
          title: 'Misión 03: Casting de Datos',
          duration: '15 min',
          xp: 150,
          objective: 'Comprender cómo Python gestiona la conversión de tipos.',
          resources: {
            videoTitle: 'Casting y f-strings',
            videoUrl: 'https://www.youtube.com/embed/nOHwv__awVU',
            exampleCode: `valor = "10"\nnumero = int(valor)\nprint(f"Doble: {numero * 2}")`,
            supportNote: 'El casting convierte un valor de un tipo a otro (ej. str a int).'
          },
          instructions: {
            overview: 'Teoría: Cuando recibes datos de texto, debes convertirlos a números para operar matemáticamente con ellos usando int() o float().',
            steps: ['Convierte el string a int.', 'Suma 5.', 'Imprime.'],
            hint: 'Usa int(variable).'
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar código',
            title: 'Conversor de Tipos',
            prompt: 'Convierte "20" a entero, súmale 5 y muestra: "Resultado: 25"',
            starterCode: `dato = "20"\n# Tu código aquí`,
            expectedKeywords: ['int', 'print', 'f"'],
            successCriteria: 'Imprime exactamente: Resultado: 25',
            expectedResult: 'Resultado: 25',
            solutionCode: `dato = "20"\nnum = int(dato) + 5\nprint(f"Resultado: {num}")`,
            successMessage: '¡Casting comprendido!'
          }
        }
      ]
    },
    {
      id: 'python-flow',
      title: 'Unidad 2: Lógica y Control de Flujo',
      summary: 'Algoritmos de decisión y lógica booleana.',
      lessons: [
        {
          id: 'u2-l1',
          title: 'Misión 04: Condicionales If y Else',
          duration: '20 min',
          xp: 200,
          objective: 'Tomar decisiones en el código basándose en condiciones.',
          resources: {
            videoTitle: 'Estructuras Condicionales',
            videoUrl: 'https://www.youtube.com/embed/DpX6it8X6Lw',
            exampleCode: `if edad >= 18:\n    print("Mayor")\nelse:\n    print("Menor")`,
            supportNote: 'La indentación en Python es obligatoria para definir el alcance del bloque if.'
          },
          instructions: {
            overview: 'Teoría: Las estructuras if/else permiten que tu programa tome distintos caminos dependiendo de si una evaluación es verdadera (True) o falsa (False).',
            steps: ['Evalúa la variable.', 'Usa if y else.', 'Asegura la indentación.'],
            hint: 'No olvides los dos puntos (:) al final de if y else.'
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Corregir lógica',
            title: 'Sistema de Calificación',
            prompt: 'Si la nota es >= 3, imprime "Aprobado", de lo contrario "Reprobado".',
            starterCode: `nota = 2.5\n# Tu lógica aquí`,
            expectedKeywords: ['if', 'else', 'print'],
            successCriteria: 'Debe imprimir Reprobado.',
            expectedResult: 'Reprobado',
            solutionCode: `nota = 2.5\nif nota >= 3:\n    print("Aprobado")\nelse:\n    print("Reprobado")`,
            successMessage: 'Lógica impecable.'
          }
        },
        {
          id: 'u2-l2',
          title: 'Misión 05: Evaluaciones Múltiples (Elif)',
          duration: '20 min',
          xp: 200,
          objective: 'Manejar múltiples caminos lógicos.',
          resources: {
            videoTitle: 'Uso de Elif',
            videoUrl: 'https://www.youtube.com/embed/fZrDJ2K6rX8',
            exampleCode: `if x > 0:\n    print("Positivo")\nelif x < 0:\n    print("Negativo")\nelse:\n    print("Cero")`,
            supportNote: 'Elif es la contracción de "else if". Puedes usar tantos como necesites.'
          },
          instructions: {
            overview: 'Teoría: Cuando tienes más de dos posibles resultados, elif te permite encadenar comprobaciones sin anidar demasiados if.',
            steps: ['Comprueba primera condición.', 'Usa elif para la segunda.', 'Cierra con else.'],
            hint: 'El orden importa: Python ejecuta el primer bloque que sea verdadero.'
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar código',
            title: 'Categorías de Edad',
            prompt: 'Si edad < 13 imprime "Niño", si es < 18 imprime "Adolescente", sino "Adulto". Usa edad = 15.',
            starterCode: `edad = 15\n# Tu código`,
            expectedKeywords: ['if', 'elif', 'else'],
            successCriteria: 'Debe imprimir Adolescente.',
            expectedResult: 'Adolescente',
            solutionCode: `edad = 15\nif edad < 13:\n    print("Niño")\nelif edad < 18:\n    print("Adolescente")\nelse:\n    print("Adulto")`,
            successMessage: 'Múltiples caminos dominados.'
          }
        },
        {
          id: 'u2-l3',
          title: 'Misión 06: Operadores Lógicos (AND / OR)',
          duration: '20 min',
          xp: 200,
          objective: 'Combinar múltiples condiciones en una sola evaluación.',
          resources: {
            videoTitle: 'Lógica Booleana Compleja',
            videoUrl: 'https://www.youtube.com/embed/aoF-Tu8utSk',
            exampleCode: `if saldo > 0 and activo:\n    print("Puede comprar")`,
            supportNote: 'AND requiere que ambas condiciones sean True. OR requiere que al menos una sea True.'
          },
          instructions: {
            overview: 'Teoría: Los operadores and y or te permiten construir condiciones complejas en una sola línea, reduciendo la necesidad de ifs anidados.',
            steps: ['Crea la condición con and.', 'Verifica que ambas se cumplan.', 'Imprime el resultado.'],
            hint: 'x > 10 and y < 5'
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar código',
            title: 'Acceso Seguro',
            prompt: 'Si user == "admin" y password == "123", imprime "Acceso", sino "Denegado".',
            starterCode: `user = "admin"\npassword = "123"\n# Tu validación`,
            expectedKeywords: ['and', '=='],
            successCriteria: 'Debe imprimir Acceso.',
            expectedResult: 'Acceso',
            solutionCode: `user = "admin"\npassword = "123"\nif user == "admin" and password == "123":\n    print("Acceso")\nelse:\n    print("Denegado")`,
            successMessage: 'Lógica combinada perfecta.'
          }
        }
      ]
    },
    {
      id: 'python-loops',
      title: 'Unidad 3: Iteración y Ciclos',
      summary: 'Automatización de tareas repetitivas usando For y While.',
      lessons: [
        {
          id: 'u3-l1',
          title: 'Misión 07: Bucle For y Función Range',
          duration: '25 min',
          xp: 250,
          objective: 'Ejecutar código una cantidad específica de veces.',
          resources: {
            videoTitle: 'Bucle For',
            videoUrl: 'https://www.youtube.com/embed/nOHwv__awVU',
            exampleCode: `for i in range(3):\n    print(f"Intento {i}")`,
            supportNote: 'range(a, b) genera números desde "a" hasta "b-1".'
          },
          instructions: {
            overview: 'Teoría: El bucle for es ideal cuando sabes exactamente cuántas veces necesitas repetir una acción.',
            steps: ['Inicia el for.', 'Usa range.', 'Imprime la variable iteradora.'],
            hint: 'range(1, 4) generará 1, 2 y 3.'
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
        },
        {
          id: 'u3-l2',
          title: 'Misión 08: Bucle While',
          duration: '25 min',
          xp: 250,
          objective: 'Iterar mientras una condición sea verdadera.',
          resources: {
            videoTitle: 'El bucle While',
            videoUrl: 'https://www.youtube.com/embed/abKLLfMn-pI',
            exampleCode: `vidas = 3\nwhile vidas > 0:\n    print("Jugando...")\n    vidas -= 1`,
            supportNote: 'Siempre asegúrate de modificar la variable de control dentro del while para evitar bucles infinitos.'
          },
          instructions: {
            overview: 'Teoría: While repite el bloque de código mientras la condición evaluada sea True. Es útil cuando no sabes de antemano cuántas iteraciones habrá.',
            steps: ['Define variable de control.', 'Inicia while.', 'Actualiza variable dentro del bucle.'],
            hint: 'usa contador -= 1 para reducir su valor.'
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar código',
            title: 'Cuenta Regresiva',
            prompt: 'Crea un while que imprima 3, 2, 1 bajando el valor de la variable "n".',
            starterCode: `n = 3\n# Tu while aquí`,
            expectedKeywords: ['while', '>', '-= 1'],
            successCriteria: 'Imprime 3, 2, 1',
            expectedResult: '3\n2\n1',
            solutionCode: `n = 3\nwhile n > 0:\n    print(n)\n    n -= 1`,
            successMessage: 'Bucle controlado.'
          }
        },
        {
          id: 'u3-l3',
          title: 'Misión 09: Break y Continue',
          duration: '25 min',
          xp: 250,
          objective: 'Alterar el flujo normal de un bucle.',
          resources: {
            videoTitle: 'Control de Bucles',
            videoUrl: 'https://www.youtube.com/embed/DpX6it8X6Lw',
            exampleCode: `for i in range(5):\n    if i == 3:\n        break\n    print(i)`,
            supportNote: 'Break rompe el bucle por completo. Continue salta a la siguiente iteración.'
          },
          instructions: {
            overview: 'Teoría: A veces necesitas salir prematuramente de un bucle (break) o saltarte ciertas ejecuciones sin romper el ciclo entero (continue).',
            steps: ['Itera sobre un rango.', 'Evalúa si es 2.', 'Aplica break para detener el bucle.'],
            hint: 'Coloca el if con el break antes del print.'
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar código',
            title: 'Freno de Emergencia',
            prompt: 'Itera del 1 al 5. Si el número es 3, usa break. Imprime los números procesados.',
            starterCode: `for i in range(1, 6):\n    # Tu lógica`,
            expectedKeywords: ['break', 'if', '=='],
            successCriteria: 'Solo debe imprimir 1 y 2.',
            expectedResult: '1\n2',
            solutionCode: `for i in range(1, 6):\n    if i == 3:\n        break\n    print(i)`,
            successMessage: 'Control total de la ejecución.'
          }
        }
      ]
    },
    {
      id: 'python-functions',
      title: 'Unidad 4: Modularización y Funciones',
      summary: 'Creación de código reutilizable y organización lógica.',
      lessons: [
        {
          id: 'u4-l1',
          title: 'Misión 10: Declaración y Parámetros',
          duration: '30 min',
          xp: 300,
          objective: 'Definir funciones propias para no repetir código.',
          resources: {
            videoTitle: 'Funciones (def)',
            videoUrl: 'https://www.youtube.com/embed/aoF-Tu8utSk',
            exampleCode: `def saludar(nombre):\n    print(f"Hola {nombre}")\n\nsaludar("Ana")`,
            supportNote: 'La palabra clave "def" indica a Python que estás creando un nuevo bloque reutilizable.'
          },
          instructions: {
            overview: 'Teoría: Las funciones agrupan código bajo un nombre. Los parámetros son variables locales que reciben datos cuando invocas la función.',
            steps: ['Usa def.', 'Añade un parámetro.', 'Llama la función pasándole un valor.'],
            hint: 'No olvides indentar el cuerpo de la función.'
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar código',
            title: 'Mensaje Personalizado',
            prompt: 'Crea una función "alerta" que reciba "msg" e imprima "Alerta: " + msg. Llámala con "Batería baja".',
            starterCode: `# Define la funcion aqui`,
            expectedKeywords: ['def', 'alerta', 'print'],
            successCriteria: 'Debe imprimir Alerta: Batería baja',
            expectedResult: 'Alerta: Batería baja',
            solutionCode: `def alerta(msg):\n    print(f"Alerta: {msg}")\nalerta("Batería baja")`,
            successMessage: 'Función ejecutada correctamente.'
          }
        },
        {
          id: 'u4-l2',
          title: 'Misión 11: Retorno de Valores (Return)',
          duration: '30 min',
          xp: 300,
          objective: 'Extraer resultados calculados dentro de una función.',
          resources: {
            videoTitle: 'La sentencia Return',
            videoUrl: 'https://www.youtube.com/embed/fZrDJ2K6rX8',
            exampleCode: `def sumar(a, b):\n    return a + b\nres = sumar(2, 3)`,
            supportNote: 'El return expulsa el dato de la función y termina su ejecución inmediatamente.'
          },
          instructions: {
            overview: 'Teoría: Mientras print() solo muestra información en pantalla, return devuelve el dato al programa principal para que pueda ser almacenado en una variable o usado en otra operación.',
            steps: ['Define la función.', 'Haz el cálculo y usa return.', 'Imprime el resultado de la invocación.'],
            hint: 'Si olvidas el return, la función devuelve "None".'
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar código',
            title: 'Área de Círculo',
            prompt: 'Crea función "area" que reciba "r" y retorne r * 3.14. Imprime area(10).',
            starterCode: `def area(r):\n    # Tu código`,
            expectedKeywords: ['return', 'print', 'area('],
            successCriteria: 'Debe imprimir 31.4',
            expectedResult: '31.4',
            solutionCode: `def area(r):\n    return r * 3.14\nprint(area(10))`,
            successMessage: '¡Retorno capturado!'
          }
        },
        {
          id: 'u4-l3',
          title: 'Misión 12: Scope (Alcance de Variables)',
          duration: '25 min',
          xp: 250,
          objective: 'Comprender la diferencia entre variables locales y globales.',
          resources: {
            videoTitle: 'Scope en Python',
            videoUrl: 'https://www.youtube.com/embed/abKLLfMn-pI',
            exampleCode: `x = 10  # Global\ndef test():\n    y = 5  # Local\n    print(x + y)`,
            supportNote: 'Las variables creadas dentro de una función se destruyen cuando la función termina.'
          },
          instructions: {
            overview: 'Teoría: Una variable definida en la raíz del archivo es global y accesible en todas partes. Una variable dentro de un "def" es local y solo existe allí.',
            steps: ['Usa la variable global.', 'Define una local.', 'Suma ambas y retorna.'],
            hint: 'Intenta acceder a la variable global desde adentro de la función.'
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Lectura de código',
            title: 'Leyendo el Scope',
            prompt: 'Tienes variable global G=10. Crea funcion "suma" que sume G con local L=5 y retorna el valor. Imprímelo.',
            starterCode: `G = 10\ndef suma():\n    L = 5\n    # retorna suma\nprint(suma())`,
            expectedKeywords: ['return', 'G + L', 'print'],
            successCriteria: 'Debe imprimir 15.',
            expectedResult: '15',
            solutionCode: `G = 10\ndef suma():\n    L = 5\n    return G + L\nprint(suma())`,
            successMessage: 'Scope dominado.'
          }
        }
      ]
    },
    {
      id: 'python-lists',
      title: 'Unidad 5: Listas y Colecciones I',
      summary: 'Almacenamiento de múltiples datos en estructuras ordenadas.',
      lessons: [
        {
          id: 'u5-l1',
          title: 'Misión 13: Creación e Índices de Listas',
          duration: '25 min',
          xp: 250,
          objective: 'Agrupar elementos y acceder a ellos por su posición.',
          resources: {
            videoTitle: 'Introducción a Listas',
            videoUrl: 'https://www.youtube.com/embed/DpX6it8X6Lw',
            exampleCode: `frutas = ["Manzana", "Pera", "Uva"]\nprint(frutas[0])`,
            supportNote: 'Los índices en Python empiezan en 0. El primer elemento es lista[0].'
          },
          instructions: {
            overview: 'Teoría: Las listas son contenedores que almacenan múltiples valores bajo un solo nombre de variable.',
            steps: ['Define la lista usando corchetes [].', 'Accede al primer elemento usando [0].', 'Imprímelo.'],
            hint: 'El índice 0 es el primero. El -1 es el último.'
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar código',
            title: 'Extracción de Datos',
            prompt: 'Dada la lista "datos = [10, 20, 30]", imprime el número 20.',
            starterCode: `datos = [10, 20, 30]\n# Tu código`,
            expectedKeywords: ['datos[1]', 'print'],
            successCriteria: 'Debe imprimir 20.',
            expectedResult: '20',
            solutionCode: `datos = [10, 20, 30]\nprint(datos[1])`,
            successMessage: 'Índice correcto.'
          }
        },
        {
          id: 'u5-l2',
          title: 'Misión 14: Métodos de Listas (Mutabilidad)',
          duration: '30 min',
          xp: 300,
          objective: 'Modificar, agregar y eliminar elementos de una lista.',
          resources: {
            videoTitle: 'Métodos de Listas',
            videoUrl: 'https://www.youtube.com/embed/nOHwv__awVU',
            exampleCode: `lista = [1, 2]\nlista.append(3)\nlista.pop(0)`,
            supportNote: 'Las listas son mutables: su contenido puede cambiar en tiempo de ejecución sin crear una nueva lista.'
          },
          instructions: {
            overview: 'Teoría: append() agrega un elemento al final, y pop() remueve y devuelve un elemento por su índice.',
            steps: ['Agrega un elemento a la lista.', 'Elimina el primero.', 'Imprime la lista resultante.'],
            hint: 'usa mi_lista.append(valor).'
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar código',
            title: 'Gestor de Tareas',
            prompt: 'A la lista "tareas = [\'A\']", agrégale "B" y luego imprime toda la lista.',
            starterCode: `tareas = ["A"]\n# Tu código`,
            expectedKeywords: ['append', '"B"', 'print'],
            successCriteria: 'Debe imprimir [\'A\', \'B\']',
            expectedResult: "['A', 'B']",
            solutionCode: `tareas = ["A"]\ntareas.append("B")\nprint(tareas)`,
            successMessage: 'Lista mutada exitosamente.'
          }
        },
        {
          id: 'u5-l3',
          title: 'Misión 15: Tuplas (Colecciones Inmutables)',
          duration: '20 min',
          xp: 200,
          objective: 'Proteger datos usando estructuras de solo lectura.',
          resources: {
            videoTitle: 'Tuplas en Python',
            videoUrl: 'https://www.youtube.com/embed/fZrDJ2K6rX8',
            exampleCode: `coordenadas = (4.5, -7.2)\nprint(coordenadas[0])`,
            supportNote: 'A diferencia de las listas, las tuplas usan paréntesis () y no tienen métodos como append().'
          },
          instructions: {
            overview: 'Teoría: Las tuplas son más rápidas y seguras en memoria que las listas, ideales para datos que no deben modificarse, como coordenadas o credenciales maestras.',
            steps: ['Define una tupla con paréntesis.', 'Accede a su índice.', 'Imprímelo.'],
            hint: 'Se acceden igual que las listas: tupla[indice].'
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Lectura de código',
            title: 'Datos Constantes',
            prompt: 'Crea una tupla llamada "rgb" con los valores 255, 0, 0. Imprime el primer valor.',
            starterCode: `# Crea la tupla y accede`,
            expectedKeywords: ['rgb', '=', '(', ')', 'print', '[0]'],
            successCriteria: 'Debe imprimir 255.',
            expectedResult: '255',
            solutionCode: `rgb = (255, 0, 0)\nprint(rgb[0])`,
            successMessage: 'Tupla comprendida.'
          }
        }
      ]
    },
    {
      id: 'python-dicts',
      title: 'Unidad 6: Diccionarios y Colecciones II',
      summary: 'Mapeo de datos usando Clave-Valor y Conjuntos.',
      lessons: [
        {
          id: 'u6-l1',
          title: 'Misión 16: Estructura de Diccionarios',
          duration: '30 min',
          xp: 300,
          objective: 'Asociar valores a claves descriptivas.',
          resources: {
            videoTitle: 'Diccionarios Clave-Valor',
            videoUrl: 'https://www.youtube.com/embed/aoF-Tu8utSk',
            exampleCode: `user = {"name": "Jasson", "role": "Admin"}\nprint(user["name"])`,
            supportNote: 'Los diccionarios usan llaves {} y pares separados por dos puntos (:).'
          },
          instructions: {
            overview: 'Teoría: A diferencia de las listas que usan índices numéricos, los diccionarios usan "claves" (como etiquetas). Esto los hace extremadamente eficientes.',
            steps: ['Crea el diccionario.', 'Accede mediante la clave.', 'Imprime el valor.'],
            hint: 'Usa corchetes con el nombre de la clave como un string.'
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Lectura de código',
            title: 'Acceso a Datos JSON',
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
          id: 'u6-l2',
          title: 'Misión 17: Modificación de Diccionarios',
          duration: '25 min',
          xp: 250,
          objective: 'Actualizar y agregar nuevas claves dinámicamente.',
          resources: {
            videoTitle: 'Manipulando Diccionarios',
            videoUrl: 'https://www.youtube.com/embed/abKLLfMn-pI',
            exampleCode: `coche = {"marca": "Ford"}\ncoche["año"] = 2023`,
            supportNote: 'Si asignas un valor a una clave existente, se sobrescribe; si no existe, se crea.'
          },
          instructions: {
            overview: 'Teoría: Los diccionarios son mutables. Puedes enriquecer objetos en tiempo real añadiendo nuevos campos.',
            steps: ['Apunta a una nueva clave en el diccionario.', 'Asígnale un valor con =.', 'Imprime el diccionario.'],
            hint: 'dict["nueva_clave"] = valor'
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar código',
            title: 'Actualización de Perfil',
            prompt: 'Al diccionario "perfil = {}" agrégale la clave "nivel" con el valor 10. Imprime el perfil.',
            starterCode: `perfil = {}\n# Tu código`,
            expectedKeywords: ['perfil', '"nivel"', '=', '10', 'print'],
            successCriteria: "Debe mostrar {'nivel': 10}",
            expectedResult: "{'nivel': 10}",
            solutionCode: `perfil = {}\nperfil["nivel"] = 10\nprint(perfil)`,
            successMessage: 'Diccionario expandido.'
          }
        },
        {
          id: 'u6-l3',
          title: 'Misión 18: Sets (Conjuntos Únicos)',
          duration: '20 min',
          xp: 200,
          objective: 'Manejar colecciones de datos donde los duplicados no están permitidos.',
          resources: {
            videoTitle: 'Conjuntos (Sets)',
            videoUrl: 'https://www.youtube.com/embed/DpX6it8X6Lw',
            exampleCode: `numeros = {1, 2, 2, 3}\nprint(numeros) # Imprime {1, 2, 3}`,
            supportNote: 'Los sets usan llaves {} como los diccionarios, pero sin el formato clave-valor.'
          },
          instructions: {
            overview: 'Teoría: Un Set es una colección desordenada que elimina automáticamente elementos repetidos.',
            steps: ['Define una lista con duplicados.', 'Conviértela a set usando set().', 'Imprímela.'],
            hint: 'set([1, 1, 2]) filtrará el 1 repetido.'
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar código',
            title: 'Filtro Anti-Spam',
            prompt: 'Convierte la lista "correos = [1, 1, 2]" en un set y asígnala a "unicos". Imprime unicos.',
            starterCode: `correos = [1, 1, 2]\n# Tu código`,
            expectedKeywords: ['set', 'correos', 'print', 'unicos'],
            successCriteria: 'Debe mostrar {1, 2}',
            expectedResult: '{1, 2}',
            solutionCode: `correos = [1, 1, 2]\nunicos = set(correos)\nprint(unicos)`,
            successMessage: 'Filtro aplicado con éxito.'
          }
        }
      ]
    },
    {
      id: 'python-errors',
      title: 'Unidad 7: Robustez y Excepciones',
      summary: 'Protege tu aplicación contra fallos inesperados de ejecución.',
      lessons: [
        {
          id: 'u7-l1',
          title: 'Misión 19: El bloque Try-Except',
          duration: '30 min',
          xp: 300,
          objective: 'Atrapar errores para que el programa no colapse.',
          resources: {
            videoTitle: 'Manejo de Excepciones',
            videoUrl: 'https://www.youtube.com/embed/DpX6it8X6Lw',
            exampleCode: `try:\n    n = 1/0\nexcept:\n    print("Error")`,
            supportNote: 'Es mejor pedir perdón (try-except) que pedir permiso (if-else para todo).'
          },
          instructions: {
            overview: 'Teoría: En producción, los errores son inevitables. El bloque try-except permite atrapar estos errores para que la app continúe corriendo.',
            steps: ['Coloca código riesgoso en try.', 'Define el except.', 'Imprime mensaje de salvaguarda.'],
            hint: 'La indentación dentro del try es crítica.'
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar código',
            title: 'A prueba de colapsos',
            prompt: 'Intenta dividir 10 entre 0. En el except, imprime "Fallo detectado".',
            starterCode: `try:\n    # Código que falla\nexcept:\n    # Captura`,
            expectedKeywords: ['try', 'except', 'print'],
            successCriteria: 'Debe imprimir Fallo detectado.',
            expectedResult: 'Fallo detectado',
            solutionCode: `try:\n    res = 10 / 0\nexcept:\n    print("Fallo detectado")`,
            successMessage: '¡Software robusto!'
          }
        },
        {
          id: 'u7-l2',
          title: 'Misión 20: Captura de Errores Específicos',
          duration: '25 min',
          xp: 250,
          objective: 'Reaccionar de manera distinta dependiendo del error.',
          resources: {
            videoTitle: 'ZeroDivision y ValueError',
            videoUrl: 'https://www.youtube.com/embed/nOHwv__awVU',
            exampleCode: `try:\n    int("Hola")\nexcept ValueError:\n    print("Dato inválido")`,
            supportNote: 'Puedes encadenar múltiples except para un solo bloque try.'
          },
          instructions: {
            overview: 'Teoría: Capturar errores genéricos oscurece los bugs. Es mejor capturar el tipo exacto de error, como ValueError o ZeroDivisionError.',
            steps: ['Usa try para parsear un texto a int.', 'Añade except ValueError.', 'Imprime la alerta.'],
            hint: 'except ValueError:'
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Lectura de código',
            title: 'Filtro de Datos de Usuario',
            prompt: 'Intenta ejecutar int("A"). Captura el ValueError e imprime "Error de valor".',
            starterCode: `try:\n    int("A")\n# Tu captura`,
            expectedKeywords: ['except ValueError', 'print'],
            successCriteria: 'Debe imprimir Error de valor',
            expectedResult: 'Error de valor',
            solutionCode: `try:\n    int("A")\nexcept ValueError:\n    print("Error de valor")`,
            successMessage: 'Captura quirúrgica exitosa.'
          }
        },
        {
          id: 'u7-l3',
          title: 'Misión 21: El bloque Finally',
          duration: '20 min',
          xp: 200,
          objective: 'Ejecutar limpieza de memoria o cierre de archivos sin importar si hubo error.',
          resources: {
            videoTitle: 'El bloque Finally',
            videoUrl: 'https://www.youtube.com/embed/fZrDJ2K6rX8',
            exampleCode: `try:\n    print("Trabajando")\nfinally:\n    print("Limpiando")`,
            supportNote: 'Finally se ejecuta SIEMPRE al final del try-except.'
          },
          instructions: {
            overview: 'Teoría: Finally es esencial para cerrar conexiones de bases de datos o archivos, garantizando que el sistema no deje "procesos huérfanos".',
            steps: ['Abre bloque try.', 'Abre bloque finally.', 'Imprime "Cerrado" en el finally.'],
            hint: 'El bloque finally va al mismo nivel de indentación que try y except.'
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar código',
            title: 'Cierre Seguro',
            prompt: 'En el try, imprime "Abriendo". En el finally, imprime "Cerrado".',
            starterCode: `# Try y Finally`,
            expectedKeywords: ['try', 'finally', 'print'],
            successCriteria: 'Debe imprimir Abriendo, luego Cerrado.',
            expectedResult: 'Abriendo\nCerrado',
            solutionCode: `try:\n    print("Abriendo")\nfinally:\n    print("Cerrado")`,
            successMessage: 'Recursos gestionados correctamente.'
          }
        }
      ]
    },
    {
      id: 'python-oop',
      title: 'Unidad 8: Programación Orientada a Objetos',
      summary: 'Arquitectura avanzada usando Clases, Métodos y Atributos.',
      lessons: [
        {
          id: 'u8-l1',
          title: 'Misión 22: Clases y el Método __init__',
          duration: '35 min',
          xp: 400,
          objective: 'Modelar realidades en código usando constructores.',
          resources: {
            videoTitle: 'Clases e Instancias',
            videoUrl: 'https://www.youtube.com/embed/aoF-Tu8utSk',
            exampleCode: `class User:\n    def __init__(self, name):\n        self.name = name`,
            supportNote: 'Una clase es un molde, un objeto es lo que sale de ese molde.'
          },
          instructions: {
            overview: 'Teoría: La POO organiza el código. El método __init__ es el "constructor", se ejecuta automáticamente cuando creas un objeto. "self" representa al objeto en sí.',
            steps: ['Define la clase.', 'Crea __init__ con self y parámetros.', 'Guarda el estado con self.atributo = valor.'],
            hint: 'class NombreClase con mayúscula inicial por convención.'
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar código',
            title: 'Fábrica de Robots',
            prompt: 'Crea una clase Robot que en __init__ asigne un "nombre". Instancia un robot "Arturo" e imprime su nombre.',
            starterCode: `class Robot:\n    def __init__(self, nombre):\n        # Tu código`,
            expectedKeywords: ['class', 'self', '__init__', 'print'],
            successCriteria: 'Debe imprimir Arturo.',
            expectedResult: 'Arturo',
            solutionCode: `class Robot:\n    def __init__(self, nombre):\n        self.nombre = nombre\n\nobj = Robot("Arturo")\nprint(obj.nombre)`,
            successMessage: '¡Constructor creado!'
          }
        },
        {
          id: 'u8-l2',
          title: 'Misión 23: Métodos de Instancia',
          duration: '30 min',
          xp: 350,
          objective: 'Añadir comportamiento y acciones a los objetos.',
          resources: {
            videoTitle: 'Métodos en POO',
            videoUrl: 'https://www.youtube.com/embed/abKLLfMn-pI',
            exampleCode: `class Perro:\n    def ladrar(self):\n        print("Guau")\nobj = Perro()\nobj.ladrar()`,
            supportNote: 'Los métodos son funciones que viven dentro de una clase. Siempre deben recibir "self" como primer parámetro.'
          },
          instructions: {
            overview: 'Teoría: Los atributos son lo que el objeto "es" o "tiene", los métodos son lo que el objeto "hace".',
            steps: ['Crea una clase vacía.', 'Define un método con def y self.', 'Instancia el objeto y llama al método.'],
            hint: 'Usa la notación de punto: objeto.metodo()'
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar código',
            title: 'Acciones del Sistema',
            prompt: 'Crea clase Servidor con un método "iniciar" que imprima "Online". Instancia un servidor y llámalo.',
            starterCode: `class Servidor:\n    # Define iniciar`,
            expectedKeywords: ['class', 'def', 'self', 'print', 'iniciar'],
            successCriteria: 'Debe imprimir Online.',
            expectedResult: 'Online',
            solutionCode: `class Servidor:\n    def iniciar(self):\n        print("Online")\ns = Servidor()\ns.iniciar()`,
            successMessage: 'Comportamiento definido.'
          }
        },
        {
          id: 'u8-l3',
          title: 'Misión 24: Modificando el Estado (Self)',
          duration: '35 min',
          xp: 400,
          objective: 'Permitir que los métodos cambien los atributos del objeto.',
          resources: {
            videoTitle: 'Mutación del Estado',
            videoUrl: 'https://www.youtube.com/embed/DpX6it8X6Lw',
            exampleCode: `class Cuenta:\n    def __init__(self, saldo):\n        self.saldo = saldo\n    def ganar(self):\n        self.saldo += 10`,
            supportNote: 'Usar "self" te permite acceder y modificar los atributos de la instancia desde cualquier método.'
          },
          instructions: {
            overview: 'Teoría: El estado del objeto evoluciona con el tiempo. Los métodos pueden actualizar los valores almacenados en los atributos.',
            steps: ['Define atributo inicial en __init__.', 'Crea método que modifique ese atributo con self.', 'Imprime el nuevo estado.'],
            hint: 'Recuerda self.variable para acceder al estado.'
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Lectura de código',
            title: 'Sistema de Puntos',
            prompt: 'Crea clase Jugador que inicie con 0 puntos. Crea método "anotar" que sume 1 a puntos. Llama anotar e imprime los puntos.',
            starterCode: `# Clase Jugador`,
            expectedKeywords: ['class Jugador', '__init__', 'anotar', 'self.puntos', '+= 1'],
            successCriteria: 'Debe imprimir 1.',
            expectedResult: '1',
            solutionCode: `class Jugador:\n    def __init__(self):\n        self.puntos = 0\n    def anotar(self):\n        self.puntos += 1\nj = Jugador()\nj.anotar()\nprint(j.puntos)`,
            successMessage: '¡POO dominada al 100%!'
          }
        }
      ]
    }
  ]
};