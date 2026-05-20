function doc(label, url) {
  return { label, url }
}

function retoPython({
  title,
  prompt,
  starterCode,
  expectedKeywords,
  successCriteria,
  expectedResult,
  solutionCode,
  successMessage,
  solutionNote,
  editorHeight = '310px',
}) {
  return {
    runtimeMode: 'python',
    exerciseType: 'Completar código',
    title,
    prompt,
    starterCode,
    editorHeight,
    expectedKeywords,
    successCriteria,
    expectedResult,
    solutionCode,
    solutionNote,
    successMessage,
  }
}

function retoGuiado({
  title,
  prompt,
  starterCode,
  expectedKeywords,
  successCriteria,
  expectedResult,
  solutionCode,
  successMessage,
  salidaGuiada,
  executionNote,
  solutionNote,
  editorHeight = '310px',
}) {
  return {
    runtimeMode: 'guided',
    exerciseType: 'Análisis guiado',
    title,
    prompt,
    starterCode,
    editorHeight,
    expectedKeywords,
    successCriteria,
    expectedResult,
    solutionCode,
    solutionNote,
    salidaGuiada,
    executionNote,
    successMessage,
  }
}

export const cursoPythonCiberseguridad = {
  id: 'python-ciberseguridad',
  title: 'Python aplicado a ciberseguridad',
  library: 'Python',
  requiredCourseIds: ['python-fundamentals'],
  summary:
    'Aprende a usar Python para revisar integridad, automatizar análisis de artefactos, entender red y web, y detectar señales sospechosas en laboratorios controlados.',
  difficulty: 'Intermedio (8/10) - técnico, guiado y orientado a laboratorio',
  units: [
    {
      id: 'ciber-arranque',
      title: 'Unidad 1: Primeros pasos y mentalidad de análisis',
      summary:
        'Aterriza el vocabulario base, el laboratorio y la forma correcta de leer señales antes de tocar conceptos más densos.',
      lessons: [
        {
          id: 'ciber-panorama-python',
          title: 'Misión 01: Qué hace Python en ciberseguridad',
          duration: '12 min',
          xp: 120,
          objective:
            'Entender por qué Python aparece tanto en automatización, análisis de artefactos, defensa y reconocimiento técnico.',
          resources: {
            videoTitle: 'Panorama de Python en seguridad',
            videoUrl: 'https://www.youtube.com/embed/rfscVS0vtbw',
            documentationLinks: [
              doc('Python tutorial oficial', 'https://docs.python.org/3/tutorial/index.html'),
              doc('Librería estándar de Python', 'https://docs.python.org/3/library/index.html'),
            ],
            exampleTitle: 'Mapa simple de trabajo',
            exampleCode: `areas = {
    "integridad": "hashes",
    "red": "puertos",
    "logs": "eventos",
}

for area, enfoque in areas.items():
    print(f"{area} -> {enfoque}")`,
            supportNote:
              'La idea del curso no es vender humo de "hacker", sino mostrar cómo Python resuelve tareas concretas de análisis y automatización.',
          },
          instructions: {
            overview:
              'Antes de tocar hashes, redes o logs, conviene ubicar en qué problemas reales entra Python y qué tipo de información suele procesar.',
            steps: [
              'Piensa en áreas de trabajo: integridad, red, web y registros.',
              'Asocia cada área con una tarea concreta que sí pueda automatizarse.',
              'Usa una estructura simple para mostrar el mapa en consola.',
            ],
            hint:
              'Un diccionario te permite asociar cada área con su tipo de tarea sin complicar el ejercicio.',
          },
          challenge: retoPython({
            title: 'Mapa rápido del curso',
            prompt:
              'Crea un diccionario llamado `mapa` con las claves `integridad`, `red` y `logs`, y asígnales respectivamente `hashes`, `puertos` y `eventos`. Luego recórrelo e imprime cada línea como `clave -> valor`.',
            starterCode: `# Crea aquí el mapa del curso

# Recorre el diccionario e imprime cada relación
`,
            expectedKeywords: ['mapa', 'integridad', 'red', 'logs', 'for', 'print'],
            successCriteria:
              'La solución debe construir el diccionario y mostrar las tres relaciones en líneas separadas.',
            expectedResult: `integridad -> hashes
red -> puertos
logs -> eventos`,
            solutionCode: `mapa = {
    "integridad": "hashes",
    "red": "puertos",
    "logs": "eventos",
}

for area, enfoque in mapa.items():
    print(f"{area} -> {enfoque}")`,
            successMessage:
              'Panorama claro. Ya tienes el mapa mental de lo que Python puede resolver en este curso.',
          }),
        },
        {
          id: 'ciber-laboratorio-etico',
          title: 'Misión 02: Laboratorio, ética y alcance',
          duration: '14 min',
          xp: 140,
          objective:
            'Comprender que todo el curso se mueve dentro de laboratorios controlados y con reglas explícitas de alcance.',
          resources: {
            videoTitle: 'Alcance y laboratorio controlado',
            videoUrl: 'https://www.youtube.com/embed/2ePf9rue1Ao',
            documentationLinks: [
              doc('OWASP Testing Guide', 'https://owasp.org/www-project-web-security-testing-guide/'),
              doc('Python lists', 'https://docs.python.org/3/tutorial/datastructures.html'),
            ],
            exampleTitle: 'Lista de sistemas permitidos',
            exampleCode: `targets_permitidos = ["127.0.0.1", "lab.local"]
print("Solo laboratorio")
print(len(targets_permitidos))`,
            supportNote:
              'Una cosa es aprender reconocimiento ético y otra distinta salirte del alcance. El curso siempre asume objetivos controlados.',
          },
          instructions: {
            overview:
              'Aquí fijamos una regla de producto y de aprendizaje: cualquier automatización del curso debe quedarse dentro de un laboratorio o de ejemplos cerrados.',
            steps: [
              'Define una allowlist pequeña de objetivos permitidos.',
              'Muestra un mensaje que recuerde el alcance.',
              'Imprime cuántos objetivos están permitidos.',
            ],
            hint:
              'Usa una lista para los objetivos permitidos y la función len() para contar cuántos hay.',
          },
          challenge: retoPython({
            title: 'Allowlist mínima de laboratorio',
            prompt:
              'Crea una lista llamada `targets_permitidos` con `127.0.0.1` y `lab.local`. Luego imprime `Solo laboratorio` y en la línea siguiente la cantidad de objetivos permitidos.',
            starterCode: `# Define la allowlist del laboratorio

# Imprime el recordatorio de alcance

# Imprime la cantidad de targets permitidos
`,
            expectedKeywords: ['targets_permitidos', '127.0.0.1', 'lab.local', 'print', 'len'],
            successCriteria:
              'La solución debe crear la lista, mostrar el mensaje de alcance y reportar que hay 2 objetivos.',
            expectedResult: `Solo laboratorio
2`,
            solutionCode: `targets_permitidos = ["127.0.0.1", "lab.local"]
print("Solo laboratorio")
print(len(targets_permitidos))`,
            successMessage:
              'Buen arranque. Ya fijaste el alcance y la lógica mínima de un laboratorio controlado.',
          }),
        },
        {
          id: 'ciber-rastros-archivos',
          title: 'Misión 03: Archivos, metadatos y rastros básicos',
          duration: '16 min',
          xp: 160,
          objective:
            'Leer una lista de artefactos y detectar cuáles merecen una revisión inicial por extensión o contexto.',
          resources: {
            videoTitle: 'Artefactos y metadatos útiles',
            videoUrl: 'https://www.youtube.com/embed/kqtD5dpn9C8',
            documentationLinks: [
              doc('pathlib', 'https://docs.python.org/3/library/pathlib.html'),
              doc('Tipos integrados', 'https://docs.python.org/3/library/stdtypes.html'),
            ],
            exampleTitle: 'Inventario de artefactos',
            exampleCode: `artefactos = [
    {"nombre": "auth.log", "extension": ".log"},
    {"nombre": "reporte.txt", "extension": ".txt"},
]

for item in artefactos:
    if item["extension"] == ".log":
        print(item["nombre"])`,
            supportNote:
              'En seguridad muchas veces no empiezas con "el ataque", sino con artefactos: logs, zips, configs, dumps o archivos extraños.',
          },
          instructions: {
            overview:
              'La misión es leer una colección simple de archivos y detectar cuáles resaltan por el tipo de pista que dejan.',
            steps: [
              'Trabaja con una lista de diccionarios.',
              'Filtra por extensión relevante.',
              'Muestra solo los nombres que ameritan revisión.',
            ],
            hint:
              'Puedes recorrer la lista con for y usar if para quedarte solo con extensiones concretas.',
          },
          challenge: retoPython({
            title: 'Detecta artefactos relevantes',
            prompt:
              'Recorre la lista `artefactos` y muestra solo los nombres de los archivos cuya extensión sea `.log` o `.zip`.',
            starterCode: `artefactos = [
    {"nombre": "auth.log", "extension": ".log"},
    {"nombre": "manual.pdf", "extension": ".pdf"},
    {"nombre": "evidencia.zip", "extension": ".zip"},
]

# Recorre la lista y muestra solo auth.log y evidencia.zip
`,
            expectedKeywords: ['for', 'if', '.log', '.zip', 'print'],
            successCriteria:
              'La solución debe imprimir únicamente los artefactos con extensión .log y .zip.',
            expectedResult: `auth.log
evidencia.zip`,
            solutionCode: `artefactos = [
    {"nombre": "auth.log", "extension": ".log"},
    {"nombre": "manual.pdf", "extension": ".pdf"},
    {"nombre": "evidencia.zip", "extension": ".zip"},
]

for item in artefactos:
    if item["extension"] in [".log", ".zip"]:
        print(item["nombre"])`,
            successMessage:
              'Buen ojo. Ya estás leyendo artefactos con criterio, no solo listando archivos.',
          }),
        },
        {
          id: 'ciber-mentalidad-analista',
          title: 'Misión 04: Leer eventos sin adivinar',
          duration: '18 min',
          xp: 180,
          objective:
            'Separar hechos, severidad y contexto antes de sacar conclusiones sobre un incidente o alerta.',
          resources: {
            videoTitle: 'Mentalidad de análisis en seguridad',
            videoUrl: 'https://www.youtube.com/embed/8ext9G7xspg',
            documentationLinks: [
              doc('Python sum()', 'https://docs.python.org/3/library/functions.html#sum'),
              doc('Python comprehensions', 'https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions'),
            ],
            exampleTitle: 'Eventos y severidad',
            exampleCode: `eventos = [
    {"actor": "api", "severidad": 3},
    {"actor": "vpn", "severidad": 8},
]

criticos = [e for e in eventos if e["severidad"] >= 7]
print(len(criticos))`,
            supportNote:
              'La práctica profesional no premia el dramatismo. Premia mirar datos, separar señales y explicar por qué algo importa.',
          },
          instructions: {
            overview:
              'Trabajaremos con eventos sencillos para diferenciar lo que solo pasó de lo que realmente merece atención prioritaria.',
            steps: [
              'Filtra los eventos con severidad alta.',
              'Cuenta cuántos quedaron.',
              'Muestra el actor del evento más relevante en este conjunto.',
            ],
            hint:
              'Puedes crear una lista nueva con comprensión y luego acceder al primer elemento crítico.',
          },
          challenge: retoPython({
            title: 'Filtra lo realmente importante',
            prompt:
              'A partir de `eventos`, crea una lista `criticos` con severidad mayor o igual a 7. Luego imprime cuántos eventos críticos hay y en la siguiente línea el actor del primer evento crítico.',
            starterCode: `eventos = [
    {"actor": "backup", "severidad": 2},
    {"actor": "vpn", "severidad": 8},
    {"actor": "web", "severidad": 9},
]

# Crea la lista criticos

# Imprime cuántos hay

# Imprime el actor del primer crítico
`,
            expectedKeywords: ['criticos', 'severidad', '>= 7', 'print'],
            successCriteria:
              'La solución debe detectar 2 eventos críticos y reportar que el primero es vpn.',
            expectedResult: `2
vpn`,
            solutionCode: `eventos = [
    {"actor": "backup", "severidad": 2},
    {"actor": "vpn", "severidad": 8},
    {"actor": "web", "severidad": 9},
]

criticos = [evento for evento in eventos if evento["severidad"] >= 7]
print(len(criticos))
print(criticos[0]["actor"])`,
            successMessage:
              'Mentalidad correcta. Ya estás separando señal de ruido antes de concluir.',
          }),
        },
      ],
    },
    {
      id: 'ciber-integridad',
      title: 'Unidad 2: Integridad, hashing y secretos',
      summary:
        'Introduce herramientas que ya se sienten muy cercanas a seguridad real: huellas, conversiones y generación segura de secretos.',
      lessons: [
        {
          id: 'ciber-hashing-encoding',
          title: 'Misión 05: Hashing, encoding y cifrado no son lo mismo',
          duration: '18 min',
          xp: 180,
          objective:
            'Usar Python para ver en la práctica que una huella criptográfica y una codificación producen resultados distintos y cumplen funciones distintas.',
          resources: {
            videoTitle: 'Hashing vs encoding',
            videoUrl: 'https://www.youtube.com/embed/2SxXlO0Zr8A',
            documentationLinks: [
              doc('hashlib', 'https://docs.python.org/3/library/hashlib.html'),
              doc('base64', 'https://docs.python.org/3/library/base64.html'),
            ],
            exampleTitle: 'Dos salidas distintas para el mismo dato',
            exampleCode: `import base64
import hashlib

dato = "alerta"
print(hashlib.sha256(dato.encode()).hexdigest()[:12])
print(base64.b64encode(dato.encode()).decode())`,
            supportNote:
              'Hashing no es reversible; base64 sí es una representación reversible. Esa diferencia cambia por completo el propósito de cada técnica.',
          },
          instructions: {
            overview:
              'Vamos a usar el mismo texto dos veces: una para producir una huella y otra para codificarlo. El resultado final te muestra por qué no son equivalentes.',
            steps: [
              'Importa hashlib y base64.',
              'Convierte el texto a bytes.',
              'Calcula una huella y una representación base64.',
            ],
            hint:
              'Recuerda que tanto hashlib como base64 trabajan sobre bytes, así que conviene usar encode().',
          },
          challenge: retoPython({
            title: 'Compara huella y codificación',
            prompt:
              'Con el texto `alerta`, imprime en la primera línea los primeros 12 caracteres del SHA-256 y en la segunda la versión en base64.',
            starterCode: `import base64
import hashlib

dato = "alerta"

# Imprime los primeros 12 caracteres del SHA-256

# Imprime la versión base64 del mismo dato
`,
            expectedKeywords: ['hashlib.sha256', 'base64.b64encode', 'encode', 'hexdigest', 'print'],
            successCriteria:
              'La solución debe producir una huella SHA-256 truncada y una codificación base64 del mismo texto.',
            expectedResult: `e09e637cd723
YWxlcnRh`,
            solutionCode: `import base64
import hashlib

dato = "alerta"
print(hashlib.sha256(dato.encode()).hexdigest()[:12])
print(base64.b64encode(dato.encode()).decode())`,
            successMessage:
              'Muy bien. Ya viste con resultados concretos por qué hash y encoding no son lo mismo.',
          }),
        },
        {
          id: 'ciber-huellas-archivos',
          title: 'Misión 06: Huellas digitales de archivos',
          duration: '18 min',
          xp: 190,
          objective:
            'Calcular una huella SHA-256 y compararla con el valor esperado para decidir si un artefacto conserva su integridad.',
          resources: {
            videoTitle: 'Verificación de integridad',
            videoUrl: 'https://www.youtube.com/embed/2lR1s0n7qZ8',
            documentationLinks: [
              doc('hashlib SHA-256', 'https://docs.python.org/3/library/hashlib.html#hash-algorithms'),
            ],
            exampleTitle: 'Comparación de hash esperado',
            exampleCode: `import hashlib

contenido = "config=estable"
esperado = hashlib.sha256(contenido.encode()).hexdigest()
actual = hashlib.sha256(contenido.encode()).hexdigest()
print(actual == esperado)`,
            supportNote:
              'En integridad no preguntas "¿me parece igual?", sino "¿su huella coincide exactamente con la esperada?".',
          },
          instructions: {
            overview:
              'Usaremos el contenido de un archivo como string para practicar el patrón básico: calcular, comparar y decidir.',
            steps: [
              'Calcula el hash del contenido actual.',
              'Compara ese hash con el esperado.',
              'Imprime True si coinciden.',
            ],
            hint:
              'Tanto el valor esperado como el actual deben ser cadenas hexadecimales producidas con hexdigest().',
          },
          challenge: retoPython({
            title: 'Valida integridad con SHA-256',
            prompt:
              'Calcula el SHA-256 de `contenido_actual` y compáralo con `hash_esperado`. Imprime `True` si coinciden.',
            starterCode: `import hashlib

contenido_actual = "config=estable"
hash_esperado = hashlib.sha256("config=estable".encode()).hexdigest()

# Calcula el hash actual

# Imprime si coincide con el esperado
`,
            expectedKeywords: ['hashlib.sha256', 'encode', 'hexdigest', 'print'],
            successCriteria:
              'La solución debe calcular el SHA-256 del contenido y reportar que coincide con el valor esperado.',
            expectedResult: 'True',
            solutionCode: `import hashlib

contenido_actual = "config=estable"
hash_esperado = hashlib.sha256("config=estable".encode()).hexdigest()
hash_actual = hashlib.sha256(contenido_actual.encode()).hexdigest()
print(hash_actual == hash_esperado)`,
            successMessage:
              'Integridad verificada. Ya puedes usar una huella para decidir si un artefacto cambió o no.',
          }),
        },
        {
          id: 'ciber-bytes-base64',
          title: 'Misión 07: Bytes, hex y base64 en la práctica',
          duration: '16 min',
          xp: 180,
          objective:
            'Convertir texto a bytes y representarlo en hex y base64, dos formatos que aparecen mucho en análisis de artefactos.',
          resources: {
            videoTitle: 'Bytes, hex y base64',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            documentationLinks: [
              doc('Bytes objects', 'https://docs.python.org/3/library/stdtypes.html#bytes-objects'),
              doc('base64', 'https://docs.python.org/3/library/base64.html'),
            ],
            exampleTitle: 'Dos representaciones del mismo dato',
            exampleCode: `import base64

mensaje = "IOC"
raw = mensaje.encode()
print(raw.hex())
print(base64.b64encode(raw).decode())`,
            supportNote:
              'Hex y base64 no son "seguridad" por sí mismos, pero sí aparecen por todas partes en evidencias, APIs y artefactos de laboratorio.',
          },
          instructions: {
            overview:
              'La misión consiste en tomar un texto corto, llevarlo a bytes y luego mostrarlo con dos codificaciones distintas.',
            steps: [
              'Convierte el texto a bytes con encode().',
              'Usa hex() para la representación hexadecimal.',
              'Usa base64.b64encode() para la codificación base64.',
            ],
            hint:
              'La salida base64 vuelve como bytes, así que conviene aplicar decode() antes de imprimir.',
          },
          challenge: retoPython({
            title: 'Normaliza un indicador',
            prompt:
              'Convierte `IOC` a bytes, imprime su representación hex y luego su versión base64.',
            starterCode: `import base64

mensaje = "IOC"

# Convierte a bytes

# Imprime el valor en hex

# Imprime el valor en base64
`,
            expectedKeywords: ['encode', 'hex', 'base64.b64encode', 'decode', 'print'],
            successCriteria:
              'La solución debe mostrar primero el valor en hex y luego el mismo contenido en base64.',
            expectedResult: `494f43
SU9D`,
            solutionCode: `import base64

mensaje = "IOC"
raw = mensaje.encode()
print(raw.hex())
print(base64.b64encode(raw).decode())`,
            successMessage:
              'Conversión clara. Ya puedes mover datos entre representaciones comunes de análisis.',
          }),
        },
        {
          id: 'ciber-secrets-tokens',
          title: 'Misión 08: Tokens, entropía y secretos seguros',
          duration: '16 min',
          xp: 190,
          objective:
            'Generar un token con el módulo secrets y comprobar una propiedad sencilla del resultado sin depender del valor exacto.',
          resources: {
            videoTitle: 'Generación segura de secretos',
            videoUrl: 'https://www.youtube.com/embed/uJYfKJr7s4E',
            documentationLinks: [
              doc('secrets', 'https://docs.python.org/3/library/secrets.html'),
              doc('random vs secrets', 'https://docs.python.org/3/library/secrets.html#module-secrets'),
            ],
            exampleTitle: 'Token seguro en hex',
            exampleCode: `import secrets

token = secrets.token_hex(4)
print(len(token))
print(token.isalnum())`,
            supportNote:
              'Cuando necesitas algo impredecible para seguridad, `secrets` es la opción correcta. `random` sirve para simulaciones, no para tokens.',
          },
          instructions: {
            overview:
              'Como el valor del token cambia cada vez, aquí validaremos propiedades del resultado, no una cadena fija.',
            steps: [
              'Importa el módulo secrets.',
              'Genera un token_hex de 4 bytes.',
              'Imprime el largo resultante y confirma que tiene forma alfanumérica.',
            ],
            hint:
              'Un token_hex de 4 bytes produce 8 caracteres hexadecimales en texto.',
          },
          challenge: retoPython({
            title: 'Genera un token seguro',
            prompt:
              'Crea un token con `secrets.token_hex(4)`. Luego imprime su longitud y en la línea siguiente si el token es alfanumérico.',
            starterCode: `import secrets

# Genera el token

# Imprime la longitud

# Imprime si es alfanumérico
`,
            expectedKeywords: ['secrets.token_hex', 'len', 'isalnum', 'print'],
            successCriteria:
              'La solución debe generar un token seguro y demostrar que su longitud es 8 y su forma es alfanumérica.',
            expectedResult: `8
True`,
            solutionCode: `import secrets

token = secrets.token_hex(4)
print(len(token))
print(token.isalnum())`,
            successMessage:
              'Secretos bajo control. Ya distingues entre aleatoriedad común y generación segura.',
          }),
        },
      ],
    },
    {
      id: 'ciber-autenticidad',
      title: 'Unidad 3: Contraseñas, autenticidad y protección de datos',
      summary:
        'Explica cómo se validan mensajes, cómo se comparan secretos y cómo se piensa el cifrado sin falsas promesas.',
      lessons: [
        {
          id: 'ciber-password-salt',
          title: 'Misión 09: Contraseñas seguras y hashing con salt',
          duration: '18 min',
          xp: 190,
          objective:
            'Aplicar el patrón de concatenar una contraseña con un salt fijo de laboratorio antes de calcular su hash.',
          resources: {
            videoTitle: 'Salt y hashing de contraseñas',
            videoUrl: 'https://www.youtube.com/embed/8ZtInClXe1Q',
            documentationLinks: [
              doc('hashlib', 'https://docs.python.org/3/library/hashlib.html'),
            ],
            exampleTitle: 'Huella con salt',
            exampleCode: `import hashlib

salt = "lab"
password = "pypath123"
digest = hashlib.sha256(f"{salt}:{password}".encode()).hexdigest()
print(digest[:16])`,
            supportNote:
              'Aquí no estamos construyendo un sistema real de autenticación, sino entendiendo el patrón básico de no hashear la contraseña "sola".',
          },
          instructions: {
            overview:
              'Usaremos un salt fijo de laboratorio para que la salida sea determinista y puedas ver el patrón sin introducir complejidad adicional.',
            steps: [
              'Construye una cadena con `salt:password`.',
              'Convierte a bytes con encode().',
              'Calcula la huella SHA-256 e imprime los primeros 16 caracteres.',
            ],
            hint:
              'Una f-string te permite unir salt y password con el formato exacto antes de hashear.',
          },
          challenge: retoPython({
            title: 'Hash con salt de laboratorio',
            prompt:
              'Usa `salt = "lab"` y `password = "pypath123"`, calcula `sha256` sobre `salt:password` e imprime los primeros 16 caracteres del resultado.',
            starterCode: `import hashlib

salt = "lab"
password = "pypath123"

# Calcula el hash con el formato salt:password

# Imprime solo los primeros 16 caracteres
`,
            expectedKeywords: ['hashlib.sha256', 'encode', 'hexdigest', 'print', 'salt'],
            successCriteria:
              'La solución debe hashear la cadena compuesta y mostrar únicamente los primeros 16 caracteres.',
            expectedResult: '85a69a6f413b1717',
            solutionCode: `import hashlib

salt = "lab"
password = "pypath123"
digest = hashlib.sha256(f"{salt}:{password}".encode()).hexdigest()
print(digest[:16])`,
            successMessage:
              'Buen patrón. Ya entiendes por qué el salt cambia por completo la huella final.',
          }),
        },
        {
          id: 'ciber-compare-digest',
          title: 'Misión 10: Comparación segura y errores comunes',
          duration: '16 min',
          xp: 180,
          objective:
            'Usar hmac.compare_digest para comparar valores esperados y candidatos sin caer en una igualdad demasiado ingenua.',
          resources: {
            videoTitle: 'Comparaciones seguras',
            videoUrl: 'https://www.youtube.com/embed/6jQ7y_qQYUA',
            documentationLinks: [
              doc('hmac.compare_digest', 'https://docs.python.org/3/library/hmac.html#hmac.compare_digest'),
            ],
            exampleTitle: 'Comparar un token correcto y uno falso',
            exampleCode: `import hmac

esperado = "token-lab"
print(hmac.compare_digest(esperado, "token-lab"))
print(hmac.compare_digest(esperado, "token-falso"))`,
            supportNote:
              'La misión no trata de romper nada. Trata de comparar secretos de forma más razonable cuando el valor sí importa.',
          },
          instructions: {
            overview:
              'Aquí practicamos un patrón pequeño pero importante: comparar un valor correcto y uno incorrecto usando compare_digest.',
            steps: [
              'Importa hmac.',
              'Compara el token esperado con el correcto.',
              'Compara el token esperado con uno falso.',
            ],
            hint:
              'La función devuelve True o False, así que basta con imprimir el resultado de ambas comparaciones.',
          },
          challenge: retoPython({
            title: 'Valida dos candidatos',
            prompt:
              'Usa `hmac.compare_digest` para comparar `esperado` con `candidato_ok` y con `candidato_falso`. Imprime ambos resultados.',
            starterCode: `import hmac

esperado = "token-lab"
candidato_ok = "token-lab"
candidato_falso = "token-falso"

# Imprime la comparación correcta

# Imprime la comparación falsa
`,
            expectedKeywords: ['hmac.compare_digest', 'candidato_ok', 'candidato_falso', 'print'],
            successCriteria:
              'La solución debe imprimir primero True y luego False.',
            expectedResult: `True
False`,
            solutionCode: `import hmac

esperado = "token-lab"
candidato_ok = "token-lab"
candidato_falso = "token-falso"

print(hmac.compare_digest(esperado, candidato_ok))
print(hmac.compare_digest(esperado, candidato_falso))`,
            successMessage:
              'Comparación correcta. Ya conoces una forma más segura de validar secretos pequeños.',
          }),
        },
        {
          id: 'ciber-hmac-mensajes',
          title: 'Misión 11: HMAC y validación de mensajes',
          duration: '18 min',
          xp: 200,
          objective:
            'Firmar un mensaje con HMAC y verificar que la firma calculada coincide con la esperada.',
          resources: {
            videoTitle: 'HMAC para autenticidad',
            videoUrl: 'https://www.youtube.com/embed/wf-BqAjZb8M',
            documentationLinks: [
              doc('hmac', 'https://docs.python.org/3/library/hmac.html'),
              doc('hashlib sha256', 'https://docs.python.org/3/library/hashlib.html'),
            ],
            exampleTitle: 'Firma y comparación',
            exampleCode: `import hashlib
import hmac

secret = b"lab-secret"
message = b"evento=login"
firma = hmac.new(secret, message, hashlib.sha256).hexdigest()
print(len(firma))
print(hmac.compare_digest(firma, firma))`,
            supportNote:
              'HMAC no cifra el mensaje. Sirve para demostrar autenticidad e integridad cuando compartes una clave secreta.',
          },
          instructions: {
            overview:
              'Primero calculamos la firma HMAC y luego validamos si coincide con un valor esperado dentro del mismo laboratorio.',
            steps: [
              'Importa hashlib y hmac.',
              'Crea la firma con la clave y el mensaje.',
              'Compara la firma calculada con la esperada e imprime el resultado.',
            ],
            hint:
              'Para este reto basta con generar la firma en hexadecimal y usar compare_digest sobre ese valor.',
          },
          challenge: retoPython({
            title: 'Comprueba una firma HMAC',
            prompt:
              'Crea una firma HMAC para `evento=login` usando la clave `lab-secret` y comprueba si coincide con `firma_esperada`.',
            starterCode: `import hashlib
import hmac

secret = b"lab-secret"
message = b"evento=login"
firma_esperada = hmac.new(secret, message, hashlib.sha256).hexdigest()

# Calcula la firma real

# Imprime si coincide con la esperada
`,
            expectedKeywords: ['hmac.new', 'hashlib.sha256', 'hexdigest', 'compare_digest', 'print'],
            successCriteria:
              'La solución debe calcular la firma HMAC y confirmar que coincide con el valor esperado.',
            expectedResult: 'True',
            solutionCode: `import hashlib
import hmac

secret = b"lab-secret"
message = b"evento=login"
firma_esperada = hmac.new(secret, message, hashlib.sha256).hexdigest()
firma_real = hmac.new(secret, message, hashlib.sha256).hexdigest()
print(hmac.compare_digest(firma_real, firma_esperada))`,
            successMessage:
              'Autenticidad validada. Ya puedes detectar si un mensaje firmado fue alterado o no.',
          }),
        },
        {
          id: 'ciber-cifrado-guiado',
          title: 'Misión 12: Cifrado simétrico en un laboratorio guiado',
          duration: '20 min',
          xp: 220,
          objective:
            'Entender el flujo básico de una librería moderna de cifrado simétrico sin depender de que el runtime del navegador la ejecute.',
          resources: {
            videoTitle: 'Cifrado simétrico con Fernet',
            videoUrl: 'https://www.youtube.com/embed/6z0zYQh4n4E',
            documentationLinks: [
              doc('cryptography Fernet', 'https://cryptography.io/en/latest/fernet/'),
              doc('Variables de entorno', 'https://docs.python.org/3/library/os.html#os.environ'),
            ],
            exampleTitle: 'Flujo mínimo de cifrado',
            exampleCode: `from cryptography.fernet import Fernet

key = Fernet.generate_key()
cipher = Fernet(key)
token = cipher.encrypt(b"reporte reservado")
print(token)`,
            supportNote:
              'No queremos un "cifrado inventado". Queremos que la persona entienda el flujo real de una librería seria aunque aquí la validación sea guiada.',
          },
          instructions: {
            overview:
              'La meta es reconocer las piezas del flujo: generar clave, construir el cifrador, cifrar y recuperar el contenido.',
            steps: [
              'Genera la clave con Fernet.generate_key().',
              'Crea la instancia Fernet con esa clave.',
              'Usa encrypt() y decrypt() sobre un mensaje en bytes.',
            ],
            hint:
              'Aunque aquí no corra la librería real en el navegador, la estructura del código sí debe quedar bien planteada.',
          },
          challenge: retoGuiado({
            title: 'Diseña el flujo de cifrado',
            prompt:
              'Completa la estructura para generar una clave, crear `cipher`, cifrar `mensaje` y luego descifrarlo.',
            starterCode: `from cryptography.fernet import Fernet

mensaje = b"reporte reservado"

# key = Fernet.generate_key()
# cipher = Fernet(key)
# token = cipher.encrypt(mensaje)
# plano = cipher.decrypt(token)

# print(plano)
`,
            expectedKeywords: [
              'Fernet.generate_key',
              'Fernet(',
              'encrypt',
              'decrypt',
              'print',
            ],
            successCriteria:
              'La solución debe mostrar correctamente el flujo mínimo de cifrado y descifrado con Fernet.',
            expectedResult:
              'La estructura debe generar una clave, cifrar el mensaje y recuperarlo como texto plano.',
            solutionCode: `from cryptography.fernet import Fernet

mensaje = b"reporte reservado"
key = Fernet.generate_key()
cipher = Fernet(key)
token = cipher.encrypt(mensaje)
plano = cipher.decrypt(token)
print(plano)`,
            salidaGuiada: "b'reporte reservado'",
            executionNote:
              'La revisión es guiada porque la misión depende de una librería de cifrado que aquí usamos como flujo de referencia.',
            successMessage:
              'Flujo entendido. Ya sabes cómo se vería una secuencia real de cifrado simétrico moderno.',
          }),
        },
      ],
    },
    {
      id: 'ciber-redes',
      title: 'Unidad 4: Redes y reconocimiento técnico',
      summary:
        'Baja a tierra puertos, sockets, DNS y reconocimiento ético en laboratorios controlados.',
      lessons: [
        {
          id: 'ciber-ip-puertos',
          title: 'Misión 13: IP, puertos, TCP y UDP',
          duration: '18 min',
          xp: 190,
          objective:
            'Entender con código la diferencia entre servicios que usarían TCP y servicios que suelen apoyarse en UDP.',
          resources: {
            videoTitle: 'TCP, UDP y puertos',
            videoUrl: 'https://www.youtube.com/embed/TNQsmPf24go',
            documentationLinks: [
              doc('socket', 'https://docs.python.org/3/library/socket.html'),
              doc('Direcciones IP', 'https://developer.mozilla.org/en-US/docs/Glossary/IP_Address'),
            ],
            exampleTitle: 'Dos tipos de transporte',
            exampleCode: `import socket

tcp = socket.SOCK_STREAM
udp = socket.SOCK_DGRAM
print(tcp, udp)`,
            supportNote:
              'No necesitas memorizar todo el stack. Sí necesitas reconocer cuándo estás describiendo un canal confiable o uno liviano.',
          },
          instructions: {
            overview:
              'La misión usa código guiado porque el objetivo principal es reconocer la estructura y el vocabulario correcto para hablar de puertos y transporte.',
            steps: [
              'Define el tipo de socket para TCP.',
              'Define el tipo de socket para UDP.',
              'Asocia puertos típicos con protocolos conocidos.',
            ],
            hint:
              'Busca las constantes `socket.SOCK_STREAM` y `socket.SOCK_DGRAM`.',
          },
          challenge: retoGuiado({
            title: 'Reconoce el transporte correcto',
            prompt:
              'Completa el ejemplo usando `socket.SOCK_STREAM` para TCP, `socket.SOCK_DGRAM` para UDP y muestra además los puertos 443 y 53 como referencia.',
            starterCode: `import socket

# tcp = socket.SOCK_STREAM
# udp = socket.SOCK_DGRAM

puerto_https = 443
puerto_dns = 53

# print(tcp, udp, puerto_https, puerto_dns)
`,
            expectedKeywords: [
              'socket.SOCK_STREAM',
              'socket.SOCK_DGRAM',
              '443',
              '53',
              'print',
            ],
            successCriteria:
              'La solución debe dejar clara la distinción entre TCP y UDP y mencionar puertos de referencia.',
            expectedResult:
              'El resultado debe reflejar que HTTPS suele asociarse con TCP/443 y DNS puede involucrar UDP/53.',
            solutionCode: `import socket

tcp = socket.SOCK_STREAM
udp = socket.SOCK_DGRAM

puerto_https = 443
puerto_dns = 53

print(tcp, udp, puerto_https, puerto_dns)`,
            salidaGuiada: 'SOCK_STREAM SOCK_DGRAM 443 53',
            executionNote:
              'La salida es ilustrativa: lo importante es que el código muestre el vocabulario correcto del transporte y los puertos.',
            successMessage:
              'Base de red lista. Ya puedes leer servicios sin que el lenguaje técnico te opaque.',
          }),
        },
        {
          id: 'ciber-sockets-timeouts',
          title: 'Misión 14: Sockets, timeouts y respuestas',
          duration: '20 min',
          xp: 210,
          objective:
            'Construir la forma básica de un chequeo de conectividad con socket y timeout sin depender de una conexión real desde el navegador.',
          resources: {
            videoTitle: 'Sockets y timeouts',
            videoUrl: 'https://www.youtube.com/embed/3QiPPX-KeSc',
            documentationLinks: [
              doc('socket.create_connection', 'https://docs.python.org/3/library/socket.html'),
              doc('Timeouts en socket', 'https://docs.python.org/3/library/socket.html#socket.socket.settimeout'),
            ],
            exampleTitle: 'Conectar con timeout',
            exampleCode: `import socket

sock = socket.socket()
sock.settimeout(2)
resultado = sock.connect_ex(("127.0.0.1", 80))
print(resultado)`,
            supportNote:
              'En un entorno real revisarías si el servicio responde o no. Aquí nos interesa que montes bien la estructura del intento.',
          },
          instructions: {
            overview:
              'Usaremos una versión guiada porque el navegador no es el mejor lugar para abrir sockets de prueba, pero sí para aprender la estructura correcta.',
            steps: [
              'Crea el socket.',
              'Aplica settimeout(2).',
              'Usa connect_ex sobre un host y un puerto.',
            ],
            hint:
              'connect_ex devuelve un código numérico en vez de levantar una excepción directa en muchos casos.',
          },
          challenge: retoGuiado({
            title: 'Estructura un chequeo de conectividad',
            prompt:
              'Completa la estructura de un socket con timeout y una llamada a `connect_ex` contra `127.0.0.1:80`.',
            starterCode: `import socket

# sock = socket.socket()
# sock.settimeout(2)
# resultado = sock.connect_ex(("127.0.0.1", 80))
# print(resultado)
`,
            expectedKeywords: ['socket.socket', 'settimeout', 'connect_ex', '127.0.0.1', '80'],
            successCriteria:
              'La solución debe mostrar el patrón mínimo para probar conectividad con timeout.',
            expectedResult:
              'El flujo debe crear el socket, aplicar timeout y producir un código de resultado.',
            solutionCode: `import socket

sock = socket.socket()
sock.settimeout(2)
resultado = sock.connect_ex(("127.0.0.1", 80))
print(resultado)`,
            salidaGuiada: '0',
            executionNote:
              'En un laboratorio real, 0 suele indicar que el servicio respondió; aquí usamos una vista guiada del flujo.',
            successMessage:
              'Estructura lista. Ya puedes plantear chequeos de red sin improvisar el patrón técnico.',
          }),
        },
        {
          id: 'ciber-dns-resolucion',
          title: 'Misión 15: DNS y resolución de nombres',
          duration: '18 min',
          xp: 200,
          objective:
            'Entender cómo traducir un nombre de host a una IP y cómo mostrarlo como parte de un flujo de revisión.',
          resources: {
            videoTitle: 'Resolución DNS con Python',
            videoUrl: 'https://www.youtube.com/embed/o8T8W5Iw7b4',
            documentationLinks: [
              doc('socket.gethostbyname', 'https://docs.python.org/3/library/socket.html#socket.gethostbyname'),
              doc('FQDN', 'https://developer.mozilla.org/en-US/docs/Glossary/FQDN'),
            ],
            exampleTitle: 'Resolver un host',
            exampleCode: `import socket

host = "lab.local"
print(socket.getfqdn(host))
print(socket.gethostbyname("localhost"))`,
            supportNote:
              'Aunque el DNS parezca infraestructura lejana, para scripts de análisis es una traducción muy cotidiana entre nombre e IP.',
          },
          instructions: {
            overview:
              'La misión se queda en un nivel controlado: reconocer la API correcta y usar funciones de resolución conocidas.',
            steps: [
              'Declara el host que quieres resolver.',
              'Muestra su FQDN cuando aplique.',
              'Resuelve localhost a una IP.',
            ],
            hint:
              'getfqdn y gethostbyname cumplen propósitos distintos y conviene ver ambos en el mismo ejemplo.',
          },
          challenge: retoGuiado({
            title: 'Resuelve un nombre de host',
            prompt:
              'Completa el flujo para imprimir el FQDN de `lab.local` y luego la IP de `localhost` con `socket.gethostbyname`.',
            starterCode: `import socket

host = "lab.local"

# print(socket.getfqdn(host))
# print(socket.gethostbyname("localhost"))
`,
            expectedKeywords: ['socket.getfqdn', 'socket.gethostbyname', 'lab.local', 'localhost', 'print'],
            successCriteria:
              'La solución debe usar las dos funciones de resolución pedidas y mostrar ambos resultados.',
            expectedResult:
              'La salida debe mostrar primero el nombre completo del host y luego una IP local para localhost.',
            solutionCode: `import socket

host = "lab.local"
print(socket.getfqdn(host))
print(socket.gethostbyname("localhost"))`,
            salidaGuiada: `lab.local
127.0.0.1`,
            executionNote:
              'La vista guiada resume el comportamiento esperado del flujo de resolución sin depender de DNS real.',
            successMessage:
              'Resolución entendida. Ya puedes conectar nombres de host con direcciones útiles para análisis.',
          }),
        },
        {
          id: 'ciber-reconocimiento-etico',
          title: 'Misión 16: Reconocimiento ético de servicios',
          duration: '22 min',
          xp: 230,
          objective:
            'Diseñar un pequeño flujo de reconocimiento que recorra una allowlist y resuma resultados sin salir del alcance.',
          resources: {
            videoTitle: 'Reconocimiento ético y alcance',
            videoUrl: 'https://www.youtube.com/embed/X2K7Qk5O4N8',
            documentationLinks: [
              doc('for loops en Python', 'https://docs.python.org/3/tutorial/controlflow.html#for-statements'),
              doc('socket overview', 'https://docs.python.org/3/library/socket.html'),
            ],
            exampleTitle: 'Resumen de hosts permitidos',
            exampleCode: `targets_permitidos = ["lab-api", "lab-db"]
resultados = []

for host in targets_permitidos:
    resultados.append(f"{host}: revisado")

print(resultados[0])`,
            supportNote:
              'La lógica ofensiva controlada empieza por el alcance: no preguntas primero "qué puedo tocar", sino "qué me autorizaron a revisar".',
          },
          instructions: {
            overview:
              'La misión une allowlist, bucle y resumen de resultados para que el reconocimiento se sienta técnico pero siempre disciplinado.',
            steps: [
              'Declara una lista de hosts permitidos.',
              'Recórrela y agrega un resumen por host.',
              'Imprime el primer resultado del análisis.',
            ],
            hint:
              'Puedes usar una lista llamada `resultados` y alimentarla con append dentro del for.',
          },
          challenge: retoGuiado({
            title: 'Resume una revisión permitida',
            prompt:
              'Completa el flujo para recorrer `targets_permitidos`, guardar un resumen en `resultados` y mostrar el primer elemento.',
            starterCode: `targets_permitidos = ["lab-api", "lab-db"]
resultados = []

# Recorre los hosts permitidos
# Agrega un texto tipo "host: revisado"

# Imprime el primer resultado
`,
            expectedKeywords: ['targets_permitidos', 'for', 'resultados.append', 'print'],
            successCriteria:
              'La solución debe recorrer la allowlist y construir un resumen básico por host.',
            expectedResult:
              'El flujo debe generar una lista de resultados y mostrar una línea similar a "lab-api: revisado".',
            solutionCode: `targets_permitidos = ["lab-api", "lab-db"]
resultados = []

for host in targets_permitidos:
    resultados.append(f"{host}: revisado")

print(resultados[0])`,
            salidaGuiada: 'lab-api: revisado',
            executionNote:
              'La salida guiada ilustra cómo se vería el resumen inicial de una revisión dentro del alcance permitido.',
            successMessage:
              'Reconocimiento con criterio. Ya puedes estructurar revisiones sin perder el control del alcance.',
          }),
        },
      ],
    },
    {
      id: 'ciber-web',
      title: 'Unidad 5: Web, HTTP y superficie expuesta',
      summary:
        'Separa bien la parte web para que HTTP, cabeceras, cookies y revisión de endpoints se entiendan con calma.',
      lessons: [
        {
          id: 'ciber-http-status',
          title: 'Misión 17: HTTP, métodos y códigos de estado',
          duration: '18 min',
          xp: 190,
          objective:
            'Leer el patrón mínimo de una consulta HTTP y distinguir el significado de la respuesta por su estado.',
          resources: {
            videoTitle: 'HTTP básico para scripts',
            videoUrl: 'https://www.youtube.com/embed/iYM2zFP3Zn0',
            documentationLinks: [
              doc('requests quickstart', 'https://requests.readthedocs.io/en/latest/user/quickstart/'),
              doc('HTTP response status codes', 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status'),
            ],
            exampleTitle: 'Consulta simple con requests',
            exampleCode: `import requests

response = requests.get("https://lab.local/status", timeout=3)
print(response.status_code)`,
            supportNote:
              'No hace falta memorizar todos los estados. Sí conviene reconocer rápido cuándo una respuesta sugiere éxito, autenticación pendiente o error del servidor.',
          },
          instructions: {
            overview:
              'La meta de la misión es entender la forma del flujo HTTP: petición, respuesta y lectura del estado.',
            steps: [
              'Haz una solicitud GET.',
              'Agrega un timeout explícito.',
              'Lee el status_code de la respuesta.',
            ],
            hint:
              'Aquí usamos revisión guiada porque el foco está en el patrón y no en golpear un servicio real desde el navegador.',
          },
          challenge: retoGuiado({
            title: 'Plantea una consulta HTTP mínima',
            prompt:
              'Completa el ejemplo usando `requests.get`, un `timeout=3` y luego muestra `response.status_code`.',
            starterCode: `import requests

# response = requests.get("https://lab.local/status", timeout=3)
# print(response.status_code)
`,
            expectedKeywords: ['requests.get', 'timeout=3', 'response.status_code', 'print'],
            successCriteria:
              'La solución debe construir la consulta GET y mostrar el código de estado.',
            expectedResult:
              'La estructura final debe dejar claro cómo se solicita un endpoint y cómo se interpreta su status HTTP.',
            solutionCode: `import requests

response = requests.get("https://lab.local/status", timeout=3)
print(response.status_code)`,
            salidaGuiada: '200',
            executionNote:
              'La salida guiada representa una respuesta exitosa típica. Lo importante es que la estructura del código quede clara.',
            successMessage:
              'HTTP aterrizado. Ya puedes leer respuestas web básicas sin mezclar conceptos.',
          }),
        },
        {
          id: 'ciber-http-headers',
          title: 'Misión 18: Cabeceras HTTP y metadatos',
          duration: '18 min',
          xp: 200,
          objective:
            'Inspeccionar cabeceras de respuesta y detectar si un servicio expone metadatos que valen la pena revisar.',
          resources: {
            videoTitle: 'Cabeceras y metadatos visibles',
            videoUrl: 'https://www.youtube.com/embed/l4aF0u4qk2A',
            documentationLinks: [
              doc('MDN HTTP headers', 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers'),
              doc('requests Response.headers', 'https://requests.readthedocs.io/en/latest/user/quickstart/#response-headers'),
            ],
            exampleTitle: 'Leer cabeceras concretas',
            exampleCode: `server = response.headers.get("Server", "desconocido")
hsts = response.headers.get("Strict-Transport-Security", "ausente")
print(server)
print(hsts)`,
            supportNote:
              'Las cabeceras no son "la vulnerabilidad" por sí mismas, pero sí son pistas sobre tecnología, endurecimiento y exposición innecesaria.',
          },
          instructions: {
            overview:
              'La misión busca que identifiques cómo leer cabeceras concretas sin perderte entre todo el contenido de la respuesta.',
            steps: [
              'Accede a response.headers.',
              'Usa get() para leer Server y Strict-Transport-Security.',
              'Muestra ambos valores en consola.',
            ],
            hint:
              'Usar get con un valor por defecto te evita errores si la cabecera no viene presente.',
          },
          challenge: retoGuiado({
            title: 'Inspecciona metadatos de respuesta',
            prompt:
              'Completa el flujo para leer `Server` y `Strict-Transport-Security` desde `response.headers` e imprimir ambos valores.',
            starterCode: `response = {
    "headers": {
        "Server": "nginx",
        "Strict-Transport-Security": "max-age=31536000",
    }
}

# server = response["headers"].get("Server")
# hsts = response["headers"].get("Strict-Transport-Security")
# print(server)
# print(hsts)
`,
            expectedKeywords: ['headers', 'get("Server"', 'Strict-Transport-Security', 'print'],
            successCriteria:
              'La solución debe extraer ambas cabeceras y mostrarlas en salida.',
            expectedResult: `nginx
max-age=31536000`,
            solutionCode: `response = {
    "headers": {
        "Server": "nginx",
        "Strict-Transport-Security": "max-age=31536000",
    }
}

server = response["headers"].get("Server")
hsts = response["headers"].get("Strict-Transport-Security")
print(server)
print(hsts)`,
            salidaGuiada: `nginx
max-age=31536000`,
            executionNote:
              'La vista guiada resume el hallazgo: un servidor identificado y una cabecera de endurecimiento presente.',
            successMessage:
              'Cabeceras bajo control. Ya sabes leer metadatos que suelen aparecer en una revisión web inicial.',
          }),
        },
        {
          id: 'ciber-cookies-sesiones',
          title: 'Misión 19: Cookies, sesiones y tokens',
          duration: '18 min',
          xp: 210,
          objective:
            'Reconocer cómo una sesión en requests conserva estado y cómo un token puede viajar en cabeceras.',
          resources: {
            videoTitle: 'Sesiones y tokens en automatización web',
            videoUrl: 'https://www.youtube.com/embed/qriL9Qe8pJc',
            documentationLinks: [
              doc('requests Session objects', 'https://requests.readthedocs.io/en/latest/user/advanced/#session-objects'),
              doc('HTTP cookies', 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies'),
            ],
            exampleTitle: 'Sesión con header de autorización',
            exampleCode: `import requests

session = requests.Session()
session.headers["Authorization"] = "Bearer lab-token"
print("Authorization" in session.headers)`,
            supportNote:
              'Aquí no estamos automatizando login real. Solo queremos que la persona entienda las piezas que sostienen estado entre una petición y otra.',
          },
          instructions: {
            overview:
              'La misión se centra en dos piezas: la sesión que guarda contexto y el token que puede viajar en headers.',
            steps: [
              'Crea un Session() de requests.',
              'Añade una cabecera Authorization.',
              'Comprueba que la cabecera quedó registrada.',
            ],
            hint:
              'Una sesión te permite compartir headers, cookies y otros datos entre varias solicitudes.',
          },
          challenge: retoGuiado({
            title: 'Modela una sesión simple',
            prompt:
              'Completa el código creando `requests.Session()`, agregando `Authorization` al header y comprobando que quedó presente.',
            starterCode: `import requests

# session = requests.Session()
# session.headers["Authorization"] = "Bearer lab-token"
# print("Authorization" in session.headers)
`,
            expectedKeywords: ['requests.Session', 'Authorization', 'session.headers', 'print'],
            successCriteria:
              'La solución debe crear una sesión y dejar visible que el token viaja como cabecera.',
            expectedResult: 'True',
            solutionCode: `import requests

session = requests.Session()
session.headers["Authorization"] = "Bearer lab-token"
print("Authorization" in session.headers)`,
            salidaGuiada: 'True',
            executionNote:
              'La salida guiada confirma que la sesión ya contiene el header necesario para reutilizar el token.',
            successMessage:
              'Sesión entendida. Ya sabes cómo se conserva contexto en automatizaciones web sencillas.',
          }),
        },
        {
          id: 'ciber-fingerprinting',
          title: 'Misión 20: Fingerprinting básico y revisión de endpoints',
          duration: '22 min',
          xp: 240,
          objective:
            'Diseñar un flujo de revisión de endpoints que recoja pequeñas pistas visibles y construya un resumen simple.',
          resources: {
            videoTitle: 'Fingerprints útiles sin exagerar',
            videoUrl: 'https://www.youtube.com/embed/VB7b8t7M8Wc',
            documentationLinks: [
              doc('requests quickstart', 'https://requests.readthedocs.io/en/latest/user/quickstart/'),
              doc('OWASP application fingerprinting', 'https://owasp.org/www-community/controls/Web_Application_Fingerprinting'),
            ],
            exampleTitle: 'Resumen por endpoint',
            exampleCode: `endpoints = ["/", "/health", "/admin"]
resumen = []

for endpoint in endpoints:
    resumen.append(f"{endpoint}: revisado")

print(resumen[-1])`,
            supportNote:
              'El objetivo aquí no es explotar nada. Es reconocer qué partes de la superficie web parecen relevantes o merecen endurecimiento.',
          },
          instructions: {
            overview:
              'Haremos un resumen básico por endpoint para que el patrón mental quede claro: recorrer, revisar y resumir.',
            steps: [
              'Declara la lista de endpoints.',
              'Recórrela con un for.',
              'Guarda un resumen por cada elemento y muestra uno de ellos.',
            ],
            hint:
              'Piensa en este reto como una plantilla de trabajo más que como una llamada real a internet.',
          },
          challenge: retoGuiado({
            title: 'Resume una revisión de endpoints',
            prompt:
              'Completa el flujo para recorrer `endpoints`, guardar un texto por cada uno en `resumen` y mostrar el último resultado.',
            starterCode: `endpoints = ["/", "/health", "/admin"]
resumen = []

# Recorre los endpoints
# Agrega un texto tipo "/health: revisado"

# Imprime el último resultado
`,
            expectedKeywords: ['endpoints', 'for', 'resumen.append', 'print'],
            successCriteria:
              'La solución debe construir un resumen sencillo de los endpoints revisados.',
            expectedResult: '/admin: revisado',
            solutionCode: `endpoints = ["/", "/health", "/admin"]
resumen = []

for endpoint in endpoints:
    resumen.append(f"{endpoint}: revisado")

print(resumen[-1])`,
            salidaGuiada: '/admin: revisado',
            executionNote:
              'La salida guiada ilustra el cierre de una revisión de endpoints dentro de un laboratorio controlado.',
            successMessage:
              'Superficie web resumida. Ya sabes convertir una inspección básica en un resultado explicable.',
          }),
        },
      ],
    },
    {
      id: 'ciber-deteccion',
      title: 'Unidad 6: Logs, correlación y proyecto final',
      summary:
        'Cierra el curso con regex, análisis de autenticación, correlación de hallazgos y un mini analizador final que integra varias capas.',
      lessons: [
        {
          id: 'ciber-regex-iocs',
          title: 'Misión 21: Regex e indicadores de compromiso',
          duration: '18 min',
          xp: 200,
          objective:
            'Extraer IPs desde texto con expresiones regulares para empezar a tratar evidencia como datos procesables.',
          resources: {
            videoTitle: 'Regex e indicadores',
            videoUrl: 'https://www.youtube.com/embed/K8L6KVGG-7o',
            documentationLinks: [
              doc('re', 'https://docs.python.org/3/library/re.html'),
              doc('Regex HOWTO', 'https://docs.python.org/3/howto/regex.html'),
            ],
            exampleTitle: 'Extraer IPs con findall',
            exampleCode: `import re

texto = "src=10.0.0.5 dst=172.16.0.2"
ips = re.findall(r"\\b\\d+\\.\\d+\\.\\d+\\.\\d+\\b", texto)
print(len(ips))
print(ips[0])`,
            supportNote:
              'Regex no es magia. Es una forma de convertir texto desordenado en señales que ya puedes contar, filtrar y comparar.',
          },
          instructions: {
            overview:
              'Trabajaremos con un texto breve que contiene dos IPs. La meta es extraerlas y demostrar que sabes localizarlas con findall.',
            steps: [
              'Importa re.',
              'Usa findall con un patrón de IP básico.',
              'Imprime la cantidad de coincidencias y la primera IP encontrada.',
            ],
            hint:
              'El patrón puede ser simple para esta misión; lo importante es reconocer el uso de findall sobre una evidencia textual.',
          },
          challenge: retoPython({
            title: 'Extrae IPs desde un log corto',
            prompt:
              'Usa `re.findall` para extraer las IPs del texto. Imprime primero cuántas encontraste y luego la primera.',
            starterCode: `import re

texto = "src=10.0.0.5 dst=172.16.0.2"

# Extrae las IPs a una lista

# Imprime la cantidad

# Imprime la primera IP
`,
            expectedKeywords: ['re.findall', '\\d+', 'ips', 'print'],
            successCriteria:
              'La solución debe encontrar 2 IPs y mostrar que la primera es 10.0.0.5.',
            expectedResult: `2
10.0.0.5`,
            solutionCode: `import re

texto = "src=10.0.0.5 dst=172.16.0.2"
ips = re.findall(r"\\b\\d+\\.\\d+\\.\\d+\\.\\d+\\b", texto)
print(len(ips))
print(ips[0])`,
            successMessage:
              'Regex útil. Ya convertiste texto crudo en indicadores concretos de trabajo.',
          }),
        },
        {
          id: 'ciber-logs-bruteforce',
          title: 'Misión 22: Logs de autenticación y fuerza bruta',
          duration: '20 min',
          xp: 220,
          objective:
            'Contar fallos de autenticación por IP para detectar patrones repetidos que merecen atención.',
          resources: {
            videoTitle: 'Analizar fallos de login',
            videoUrl: 'https://www.youtube.com/embed/2TqrbN7MLz8',
            documentationLinks: [
              doc('collections Counter', 'https://docs.python.org/3/library/collections.html#collections.Counter'),
              doc('splitlines', 'https://docs.python.org/3/library/stdtypes.html#str.splitlines'),
            ],
            exampleTitle: 'Conteo simple por IP',
            exampleCode: `from collections import Counter

ips = ["10.0.0.8", "10.0.0.8", "10.0.0.9"]
conteo = Counter(ips)
print(conteo["10.0.0.8"])`,
            supportNote:
              'No toda repetición es ataque, pero sí es una señal. Esta misión te enseña a detectar el patrón antes de interpretarlo.',
          },
          instructions: {
            overview:
              'Usaremos una lista pequeña de eventos fallidos para contar intentos por origen y detectar cuál IP repite más.',
            steps: [
              'Construye la lista de IPs fallidas.',
              'Cuenta cuántas veces aparece cada una.',
              'Imprime el total de la IP sospechosa de este ejemplo.',
            ],
            hint:
              'Counter te simplifica el conteo y te deja preguntar directamente por una IP concreta.',
          },
          challenge: retoPython({
            title: 'Cuenta intentos fallidos por IP',
            prompt:
              'Usa `Counter` para contar los fallos de autenticación y luego imprime cuántos intentos tuvo la IP `10.0.0.8`.',
            starterCode: `from collections import Counter

fallos = ["10.0.0.8", "10.0.0.8", "10.0.0.9", "10.0.0.8"]

# Crea el contador

# Imprime la cantidad de intentos de 10.0.0.8
`,
            expectedKeywords: ['Counter', 'fallos', 'conteo', '10.0.0.8', 'print'],
            successCriteria:
              'La solución debe contar correctamente los intentos fallidos y reportar 3 para la IP sospechosa.',
            expectedResult: '3',
            solutionCode: `from collections import Counter

fallos = ["10.0.0.8", "10.0.0.8", "10.0.0.9", "10.0.0.8"]
conteo = Counter(fallos)
print(conteo["10.0.0.8"])`,
            successMessage:
              'Patrón detectado. Ya puedes convertir un log repetitivo en una señal clara de atención.',
          }),
        },
        {
          id: 'ciber-correlacion-hallazgos',
          title: 'Misión 23: Correlación de hallazgos y severidad',
          duration: '22 min',
          xp: 240,
          objective:
            'Combinar varias señales simples en un puntaje total para decidir qué host requiere prioridad.',
          resources: {
            videoTitle: 'Correlación y prioridad',
            videoUrl: 'https://www.youtube.com/embed/3zq8CgV2DgU',
            documentationLinks: [
              doc('sum', 'https://docs.python.org/3/library/functions.html#sum'),
              doc('max', 'https://docs.python.org/3/library/functions.html#max'),
            ],
            exampleTitle: 'Score básico por host',
            exampleCode: `scores = {
    "lab-api": [2, 3, 4],
    "lab-db": [1, 0, 1],
}

totales = {host: sum(valores) for host, valores in scores.items()}
print(max(totales, key=totales.get))`,
            supportNote:
              'Correlacionar no significa inventar complejidad. Significa juntar señales distintas para priorizar mejor.',
          },
          instructions: {
            overview:
              'La misión combina tres señales por host: integridad, autenticación y superficie web. El objetivo es sumar y priorizar.',
            steps: [
              'Crea un diccionario con listas de puntajes por host.',
              'Suma los puntajes por cada host.',
              'Imprime el nombre del host con el total más alto.',
            ],
            hint:
              'Una comprensión de diccionario con sum() te deja listo el total para luego usar max().',
          },
          challenge: retoPython({
            title: 'Prioriza el host más delicado',
            prompt:
              'Suma los puntajes de cada host e imprime cuál quedó con mayor severidad total.',
            starterCode: `scores = {
    "lab-api": [2, 3, 4],
    "lab-db": [1, 0, 1],
    "lab-web": [1, 2, 1],
}

# Calcula el total por host

# Imprime el host con mayor puntaje
`,
            expectedKeywords: ['sum', 'for', 'scores.items', 'max', 'print'],
            successCriteria:
              'La solución debe sumar correctamente y detectar que lab-api es el host con mayor severidad.',
            expectedResult: 'lab-api',
            solutionCode: `scores = {
    "lab-api": [2, 3, 4],
    "lab-db": [1, 0, 1],
    "lab-web": [1, 2, 1],
}

totales = {host: sum(valores) for host, valores in scores.items()}
print(max(totales, key=totales.get))`,
            successMessage:
              'Correlación lista. Ya no solo ves eventos aislados: ya sabes priorizar por contexto.',
          }),
        },
        {
          id: 'ciber-sentinelpy-final',
          title: 'Misión 24: SentinelPy, el analizador final',
          duration: '40 min',
          xp: 450,
          objective:
            'Integrar hashing, HMAC, revisión web simulada, regex y correlación en un reporte final compacto que cierre el curso.',
          resources: {
            videoTitle: 'Proyecto final SentinelPy',
            videoUrl: 'https://www.youtube.com/embed/0HfIY8uFQtw',
            documentationLinks: [
              doc('hashlib', 'https://docs.python.org/3/library/hashlib.html'),
              doc('hmac', 'https://docs.python.org/3/library/hmac.html'),
              doc('re', 'https://docs.python.org/3/library/re.html'),
            ],
            exampleTitle: 'Qué hace SentinelPy',
            exampleCode: `# 1. Verifica integridad de artefactos
# 2. Comprueba que el feed firmado sea válido
# 3. Revisa señales web expuestas
# 4. Extrae IPs sospechosas del log
# 5. Produce un reporte resumido`,
            supportNote:
              'El proyecto final no cambia la mecánica de PyPath. Sigue siendo un reto dentro de la lección, pero esta vez ya junta casi todo lo visto en el curso.',
            bloquesApoyo: [
              {
                id: 'sentinelpy-caso',
                tipo: 'texto',
                titulo: 'Caso de laboratorio',
                contenido:
                  'SentinelPy recibe un artefacto con hash esperado, un feed firmado, una respuesta web con cabeceras y un log corto. Tu misión es correlacionarlo y producir un reporte final.',
                puntos: [
                  'Si el hash no coincide, hay integridad alterada.',
                  'Si el HMAC coincide, el feed es confiable.',
                  'Si aparece X-Debug, hay exposición visible.',
                  'Si el log contiene una IP repetida, debes reportarla.',
                ],
              },
            ],
          },
          instructions: {
            overview:
              'La última misión reúne varias capas del curso. No hace red real, pero sí procesa datos que representan lo que una revisión defensiva u ofensiva controlada te dejaría delante.',
            steps: [
              'Calcula el hash del artefacto y compáralo con el esperado.',
              'Valida con HMAC si el feed firmado es confiable.',
              'Lee si la respuesta web expone un header crítico.',
              'Extrae IPs del log y arma un resumen final de severidad.',
            ],
            hint:
              'Piensa el proyecto como cuatro subproblemas pequeños y luego une sus resultados en las líneas finales del reporte.',
          },
          challenge: retoPython({
            title: 'Construye el reporte final de SentinelPy',
            prompt:
              'Completa SentinelPy para verificar integridad, validar un feed firmado, revisar si existe `X-Debug`, extraer la primera IP sospechosa del log y cerrar con un reporte de severidad.',
            starterCode: `import hashlib
import hmac
import re

artefacto = "modo=debug"
hash_esperado = hashlib.sha256("modo=release".encode()).hexdigest()

secret = b"lab-secret"
feed = b"ioc=203.0.113.10"
firma_esperada = hmac.new(secret, feed, hashlib.sha256).hexdigest()

headers = {"Server": "lab-gateway", "X-Debug": "true"}
log = "src=203.0.113.10 user=ana action=login_failed"

# 1. Calcula si la integridad está alterada

# 2. Valida si la firma del feed coincide

# 3. Revisa si existe el header X-Debug

# 4. Extrae la primera IP del log

# 5. Imprime el reporte final con estas líneas exactas:
# Integridad: alterada
# Feed firmado: válido
# Header crítico: X-Debug
# IP sospechosa: 203.0.113.10
# Severidad: alta
`,
            expectedKeywords: [
              'hashlib.sha256',
              'hmac.new',
              'compare_digest',
              'headers.get',
              're.findall',
              'print',
            ],
            successCriteria:
              'La solución debe integrar hashing, HMAC, revisión de cabeceras y extracción de IP para producir el reporte final.',
            expectedResult: `Integridad: alterada
Feed firmado: válido
Header crítico: X-Debug
IP sospechosa: 203.0.113.10
Severidad: alta`,
            solutionCode: `import hashlib
import hmac
import re

artefacto = "modo=debug"
hash_esperado = hashlib.sha256("modo=release".encode()).hexdigest()

secret = b"lab-secret"
feed = b"ioc=203.0.113.10"
firma_esperada = hmac.new(secret, feed, hashlib.sha256).hexdigest()
headers = {"Server": "lab-gateway", "X-Debug": "true"}
log = "src=203.0.113.10 user=ana action=login_failed"

hash_actual = hashlib.sha256(artefacto.encode()).hexdigest()
integridad_alterada = hash_actual != hash_esperado

firma_real = hmac.new(secret, feed, hashlib.sha256).hexdigest()
feed_valido = hmac.compare_digest(firma_real, firma_esperada)

header_critico = "X-Debug" if headers.get("X-Debug") else "ausente"
ips = re.findall(r"\\b\\d+\\.\\d+\\.\\d+\\.\\d+\\b", log)

print("Integridad: alterada" if integridad_alterada else "Integridad: estable")
print("Feed firmado: válido" if feed_valido else "Feed firmado: inválido")
print(f"Header crítico: {header_critico}")
print(f"IP sospechosa: {ips[0]}")
print("Severidad: alta")`,
            solutionNote:
              'SentinelPy no necesita resolver todo con una sola operación. Lo importante es separar cada chequeo y luego unificar el resultado en un reporte breve.',
            successMessage:
              'Proyecto final completado. SentinelPy ya junta integridad, autenticidad, superficie web y análisis de logs en una sola salida.',
            editorHeight: '430px',
          }),
        },
      ],
    },
  ],
}
