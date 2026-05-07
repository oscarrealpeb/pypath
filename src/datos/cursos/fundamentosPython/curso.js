export const cursoFundamentosPython = {
  id: 'python-fundamentals',
  title: 'Fundamentos de Python',
  library: 'Python',
  requiredCourseIds: [],
  summary: 'El módulo base obligatorio de PyPath para entender sintaxis, control de flujo, funciones y colecciones antes de pasar a bibliotecas especializadas.',
  difficulty: 'Esencial para todo perfil',
  units: [
    {
      id: 'python-boot',
      title: 'Arranque en Python',
      summary: 'Sintaxis inicial, variables, decisiones y bucles para que el resto del catálogo tenga sentido.',
      lessons: [
        {
          id: 'hola-python',
          title: 'Misión 01: Tu primer script',
          duration: '7 min',
          xp: 100,
          objective: 'Usar print y variables simples para producir una salida clara en consola.',
          resources: {
            videoTitle: 'Print, datos y variables en Python',
            videoUrl: 'https://www.youtube.com/embed/aoF-Tu8utSk',
            documentationLinks: [
              {
                label: 'Introducción oficial a Python',
                url: 'https://docs.python.org/3/tutorial/introduction.html'
              },
              {
                label: 'Tutorial para usar print y cadenas',
                url: 'https://docs.python.org/3/tutorial/inputoutput.html'
              }
            ],
            exampleTitle: 'Ejemplo guiado',
            exampleCode: `nombre = "PyPath"
mensaje = f"Hola, {nombre}"
print(mensaje)
`,
            supportNote: 'Empieza con una variable y una salida legible. Esa costumbre hace mucho más fácil depurar después.'
          },
          instructions: {
            overview: 'Antes de hablar de librerías, necesitas sentirte cómodo escribiendo instrucciones simples y legibles en Python.',
            steps: [
              'Declara una variable con tu nombre o alias.',
              'Crea un mensaje de texto usando esa variable.',
              'Usa print para mostrar el resultado en consola.'
            ],
            hint: 'Puedes crear una variable mensaje y luego imprimirla con print().'
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar código',
            title: 'Escribe tu primer mensaje',
            prompt: 'Completa el starter usando la variable nombre para construir un mensaje y mostrarlo con print.',
            starterCode: `nombre = "PyPath"

# Usa la variable nombre para crear mensaje = f"Hola, {nombre}"
# Luego muestra ese mensaje con print(mensaje)
`,
            expectedKeywords: [
              'nombre',
              'mensaje',
              'print'
            ],
            successCriteria: 'Debes reutilizar la variable nombre, construir una variable mensaje y mostrar ese resultado con print.',
            expectedResult: 'Hola, PyPath',
            solutionCode: `nombre = "PyPath"
mensaje = f"Hola, {nombre}"
print(mensaje)
`,
            solutionNote:
              'La solución usa la variable nombre para construir mensaje y luego imprime exactamente ese texto en consola.',
            salidaGuiada: 'Hola, PyPath',
            executionNote: 'Aquí la salida sí se ejecuta de verdad en el navegador usando Python.',
            successMessage: 'Listo. Ya diste el primer paso para crear scripts claros y legibles.'
          }
        },
        {
          id: 'flujo-python',
          title: 'Misión 02: Decisiones y bucles',
          duration: '10 min',
          xp: 120,
          objective: 'Practicar if y for para controlar el flujo del programa.',
          resources: {
            videoTitle: 'Bucle for en Python',
            videoUrl: 'https://www.youtube.com/embed/abKLLfMn-pI',
            documentationLinks: [
              {
                label: 'Control de flujo en Python',
                url: 'https://docs.python.org/3/tutorial/controlflow.html'
              },
              {
                label: 'Estructuras de datos básicas',
                url: 'https://docs.python.org/3/tutorial/datastructures.html'
              }
            ],
            exampleTitle: 'Filtrado simple',
            exampleCode: `tareas = ["leer", "practicar", "descansar"]

for tarea in tareas:
    if tarea != "descansar":
        print(tarea)
`,
            supportNote: 'Combinar if con for te prepara para recorrer resultados, widgets, archivos o eventos más adelante.'
          },
          instructions: {
            overview: 'Casi cualquier biblioteca de Python asume que ya dominas decisiones y repeticiones.',
            steps: [
              'Crea una lista simple de tareas o valores.',
              'Recorre la lista con for.',
              'Agrega una condición if dentro del bucle.'
            ],
            hint: 'Piensa en un if pequeño dentro de un for. Esa combinación aparece por todas partes.'
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Corregir lógica',
            title: 'Combina if con for',
            prompt: 'Actualiza el starter para recorrer una lista y filtrar elementos con if.',
            starterCode: `tareas = ["leer", "practicar", "descansar"]

# Recorre tareas con for
# Usa if para imprimir solo "practicar"
`,
            expectedKeywords: [
              'for',
              'if',
              'print'
            ],
            successCriteria: 'Debes recorrer la lista tareas con for y usar una condición if para imprimir únicamente la tarea "practicar".',
            expectedResult: 'practicar',
            solutionCode: `tareas = ["leer", "practicar", "descansar"]

for tarea in tareas:
    if tarea == "practicar":
        print(tarea)
`,
            solutionNote:
              'Aquí el for recorre toda la lista, pero el if filtra para mostrar solo la tarea que coincide con "practicar".',
            salidaGuiada: 'practicar',
            executionNote: 'Una salida corta y controlada suele ser la primera señal de que tu flujo está funcionando.',
            successMessage: 'Control de flujo activo. Ya tienes una base mucho más útil para cualquier biblioteca.'
          }
        }
      ]
    },
    {
      id: 'python-tools',
      title: 'Herramientas base',
      summary: 'Funciones, listas y diccionarios para pensar en reutilización y datos estructurados.',
      lessons: [
        {
          id: 'funciones-python',
          title: 'Misión 03: Encapsular con funciones',
          duration: '10 min',
          xp: 130,
          objective: 'Definir una función simple y reutilizarla con distintos argumentos.',
          resources: {
            videoTitle: 'Funciones en Python',
            videoUrl: 'https://www.youtube.com/embed/nOHwv__awVU',
            documentationLinks: [
              {
                label: 'Funciones definidas por el usuario',
                url: 'https://docs.python.org/3/tutorial/controlflow.html#defining-functions'
              },
              {
                label: 'Cómo pensar en argumentos',
                url: 'https://docs.python.org/3/tutorial/controlflow.html#more-on-defining-functions'
              }
            ],
            exampleTitle: 'Función reusable',
            exampleCode: `def saludar(nombre):
    print(f"Hola, {nombre}")

saludar("Ana")
saludar("Luis")
`,
            supportNote: 'Las funciones son la antesala natural a clases, handlers de eventos y utilidades reutilizables.'
          },
          instructions: {
            overview: 'Las funciones te ayudan a no repetir lógica. Son fundamentales antes de tocar frameworks o bibliotecas grandes.',
            steps: [
              'Define una función con def.',
              'Recibe al menos un parámetro.',
              'Devuelve o imprime un valor usando ese parámetro.'
            ],
            hint: 'Si dudas, empieza con una función que reciba un nombre y construya un saludo.'
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar código',
            title: 'Crea una función útil',
            prompt: 'Escribe una función con def y llámala al menos una vez.',
            starterCode: `nombre = "PyPath"

# Define una función saludar(nombre_usuario) que imprima un saludo
# Luego llama a la función usando la variable nombre
`,
            expectedKeywords: [
              'def',
              'saludar',
              'print'
            ],
            successCriteria: 'Debes definir una función, recibir un nombre como argumento y llamarla usando la variable nombre para imprimir el saludo.',
            expectedResult: 'Hola, PyPath',
            solutionCode: `nombre = "PyPath"

def saludar(nombre_usuario):
    print(f"Hola, {nombre_usuario}")

saludar(nombre)
`,
            solutionNote:
              'La función recibe el dato por parámetro y luego se reutiliza llamándola con la variable nombre ya creada en el script.',
            salidaGuiada: 'Hola, PyPath',
            executionNote: 'Cuando encapsulas lógica, la consola suele ayudarte a verificar entradas y salidas rápido.',
            successMessage: 'Función creada. Ya puedes empezar a empaquetar lógica sin repetir código.'
          }
        },
        {
          id: 'colecciones-python',
          title: 'Misión 04: Trabajar con colecciones',
          duration: '11 min',
          xp: 140,
          objective: 'Manipular una lista o un diccionario para acceder a datos estructurados.',
          resources: {
            videoTitle: 'Diccionarios en Python',
            videoUrl: 'https://www.youtube.com/embed/fZrDJ2K6rX8',
            documentationLinks: [
              {
                label: 'Listas y diccionarios',
                url: 'https://docs.python.org/3/tutorial/datastructures.html'
              },
              {
                label: 'Más sobre diccionarios',
                url: 'https://docs.python.org/3/tutorial/datastructures.html#dictionaries'
              }
            ],
            exampleTitle: 'Colección sencilla',
            exampleCode: `perfil = {"nombre": "Ana", "rol": "programadora"}
print(perfil["rol"])
`,
            supportNote: 'Las colecciones aparecen en APIs, configuraciones, resultados de consultas y contenido renderizado.'
          },
          instructions: {
            overview: 'Listas y diccionarios aparecen en APIs, juegos, interfaces y scripts de automatización.',
            steps: [
              'Crea una lista o un diccionario.',
              'Accede a uno de sus valores.',
              'Imprime el resultado o guárdalo en una variable.'
            ],
            hint: 'Un diccionario pequeño con nombre y rol es una buena práctica para empezar.'
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Lectura de código',
            title: 'Lee datos de una colección',
            prompt: 'Completa el starter usando una lista o un diccionario y muestra un valor con print.',
            starterCode: `perfil = {"nombre": "Ana", "rol": "programadora"}

# Usa la clave "rol" del diccionario perfil
# Guarda ese valor en una variable y muéstralo con print
`,
            expectedKeywords: [
              'perfil',
              'rol',
              'print'
            ],
            successCriteria: 'Debes leer el valor asociado a la clave "rol" dentro del diccionario perfil y mostrarlo en consola.',
            expectedResult: 'programadora',
            solutionCode: `perfil = {"nombre": "Ana", "rol": "programadora"}

rol = perfil["rol"]
print(rol)
`,
            solutionNote:
              'La clave está en acceder al diccionario con ["rol"], guardar ese valor y luego mostrarlo con print.',
            salidaGuiada: 'programadora',
            executionNote: 'La salida real te deja comprobar enseguida si estás leyendo la clave correcta.',
            successMessage: 'Colección dominada. Esta base te va a servir en prácticamente todos los cursos siguientes.'
          }
        }
      ]
    }
  ]
}
