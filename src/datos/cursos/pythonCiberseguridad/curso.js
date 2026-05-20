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
    'Aprende a usar Python para revisar integridad, trabajar hashing y cifrado, leer tráfico y HTTP, plantear scripts de auditoría y detectar señales sospechosas dentro de laboratorios controlados.',
  difficulty: 'Intermedio (8/10) - técnico, guiado y orientado a laboratorio',
  units: [
    {
      id: 'ciber-arranque',
      title: 'Unidad 1: Primeros pasos y mentalidad de análisis',
      summary:
        'Aterriza el vocabulario base, el laboratorio, el alcance ético y las buenas prácticas antes de tocar conceptos más densos.',
      lessons: [
        {
          id: 'ciber-panorama-python',
          title: 'Misión 01: Qué hace Python en ciberseguridad',
          duration: '12 min',
          xp: 120,
          objective:
            'Entender por qué Python aparece tanto en automatización, análisis de artefactos, defensa y reconocimiento técnico.',
          resources: {
            videoTitle: 'Estas son las PRINCIPALES LIBRERÍAS de PYTHON para HACKING ÉTICO y CIBERSEGURIDAD',
            videoUrl: 'https://www.youtube.com/embed/TSkYt-kGj24',
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
              'Aquí asumimos que ya traes bases de Python. La idea no es repetir sintaxis elemental, sino mostrar por qué Python se convirtió en un lenguaje natural para automatizar tareas defensivas, revisar artefactos y construir pequeñas utilidades de análisis.',
            bloquesApoyo: [
              {
                id: 'ciber-panorama-bloque-1',
                tipo: 'texto',
                titulo: 'Dónde entra Python en seguridad real',
                contenido:
                  'Python destaca en ciberseguridad porque permite pasar rápido de una idea a una herramienta funcional. Un analista puede leer archivos, extraer patrones, consultar servicios web, revisar eventos repetidos y resumir hallazgos sin tener que montar aplicaciones enormes. En la práctica, eso lo vuelve ideal para tareas de integridad, revisión de logs, validaciones de red y automatización de pequeños flujos de auditoría.',
                puntos: [
                  'Integridad: calcular hashes y comparar evidencias.',
                  'Red: probar puertos, tiempos de respuesta y resolución de nombres.',
                  'Web: consultar endpoints, cabeceras y metadatos.',
                  'Logs: filtrar eventos, contar repeticiones y priorizar señales.',
                ],
              },
              {
                id: 'ciber-panorama-bloque-2',
                tipo: 'texto',
                titulo: 'Lo importante no es sonar a hacker, sino resolver',
                contenido:
                  'Este curso no usa Python como adorno ni como caricatura de "hacking". Lo usa como herramienta para entender datos, validar supuestos y producir evidencia legible. Si un script te ayuda a observar mejor un problema, explicar un riesgo o automatizar una revisión repetitiva, entonces ya está cumpliendo un rol profesional valioso.',
              },
            ],
          },
          instructions: {
            overview:
              'Teoría: Python aparece mucho en ciberseguridad porque sirve como pegamento entre datos, reglas y automatización. No reemplaza el criterio del analista, pero sí le permite leer artefactos, transformar información, detectar repeticiones y producir salidas claras con muy poco código. Antes de estudiar hashing, red o logs, conviene entender esta idea base: Python no es el objetivo del curso; es la herramienta con la que vamos a observar, resumir y verificar situaciones técnicas dentro de un laboratorio controlado.',
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
            videoTitle: '',
            videoUrl: '',
            documentationLinks: [
              doc('OWASP Testing Guide', 'https://owasp.org/www-project-web-security-testing-guide/'),
              doc('Python lists', 'https://docs.python.org/3/tutorial/datastructures.html'),
            ],
            exampleTitle: 'Lista de sistemas permitidos',
            exampleCode: `targets_permitidos = ["127.0.0.1", "lab.local"]
print("Solo laboratorio")
print(len(targets_permitidos))`,
            supportNote:
              'Una cosa es aprender reconocimiento ético y otra distinta salirte del alcance. En seguridad, una automatización correcta no solo hace algo útil: también deja claro sobre qué sistemas puede operar y cuándo debe detenerse.',
            bloquesApoyo: [
              {
                id: 'ciber-laboratorio-bloque-1',
                tipo: 'texto',
                titulo: 'Por qué esta lección importa tanto',
                contenido:
                  'Cuando un curso técnico habla de red, scraping, enumeración o revisión de servicios, el verdadero riesgo no suele estar en la sintaxis del script, sino en el contexto en que se ejecuta. Un mismo programa puede ser una práctica educativa dentro de un laboratorio o un problema serio si se lanza contra sistemas ajenos. Por eso aquí el alcance no es una nota legal decorativa: es parte del diseño de la herramienta.',
              },
              {
                id: 'ciber-laboratorio-bloque-2',
                tipo: 'texto',
                titulo: 'Cómo se traduce el alcance a código',
                contenido:
                  'La forma más simple de respetar el alcance es convertirlo en datos explícitos. Una allowlist te obliga a declarar qué hosts, dominios o entornos son válidos antes de automatizar una acción. Esa idea es valiosa porque convierte una regla humana en una barrera técnica concreta.',
                puntos: [
                  'Si el objetivo no está en la lista permitida, el script no debería ejecutarse.',
                  'La allowlist ayuda a evitar errores de dedo, pruebas fuera de entorno y automatizaciones ambiguas.',
                  'Documentar el alcance desde el inicio también mejora la trazabilidad del trabajo.',
                ],
              },
            ],
          },
          instructions: {
            overview:
              'Teoría: en ciberseguridad no basta con que un script funcione; también debe quedar claro dónde puede ejecutarse y con qué permiso. Esta misión introduce la idea de alcance controlado: todo lo que hagamos en el curso se queda dentro de laboratorios, ejemplos cerrados o entornos expresamente autorizados. La allowlist no es solo una lista de nombres; es una forma de traducir una regla ética y operativa a una estructura concreta dentro del programa.',
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
            videoTitle: '',
            videoUrl: '',
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
              'En seguridad muchas veces no empiezas con un exploit ni con un escáner, sino con evidencia parcial. Saber leer nombres, extensiones y contexto es una habilidad básica para no perder tiempo revisando ruido.',
            bloquesApoyo: [
              {
                id: 'ciber-rastros-bloque-1',
                tipo: 'texto',
                titulo: 'Qué es un artefacto en este curso',
                contenido:
                  'Llamamos artefacto a cualquier archivo o salida que deja una pista técnica aprovechable: logs, zips, configuraciones, volcados, reportes o capturas de herramientas. No todos valen lo mismo. Algunos te dicen muy poco y otros pueden concentrar eventos, errores, indicadores o cambios de configuración que merecen atención inmediata.',
              },
              {
                id: 'ciber-rastros-bloque-2',
                tipo: 'texto',
                titulo: 'Priorizar antes de abrir archivos al azar',
                contenido:
                  'Una forma madura de trabajar no consiste en abrir todo indiscriminadamente, sino en priorizar. La extensión no te da la verdad completa, pero sí una primera aproximación. Un .log suele indicar eventos o actividad; un .zip puede contener evidencia empaquetada; un .pdf probablemente documente algo, pero no siempre será tu primer punto de entrada para un análisis técnico rápido.',
                puntos: [
                  'Primero filtra lo que probablemente contiene eventos o configuraciones.',
                  'Luego abre los artefactos más prometedores con una hipótesis clara.',
                  'Finalmente resume por qué algo fue relevante y qué dejaste fuera.',
                ],
              },
            ],
          },
          instructions: {
            overview:
              'Teoría: una revisión técnica rara vez empieza con certeza; normalmente empieza con una carpeta, un conjunto de archivos o un lote de evidencia parcial. Esta misión enseña a hacer un primer triage simple: mirar nombres, extensiones y contexto para decidir por dónde comenzar. El objetivo no es adivinar todo con la extensión, sino aprender a priorizar rápido con criterios razonables.',
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
            videoTitle: '',
            videoUrl: '',
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
              'La práctica profesional no premia el dramatismo. Premia la capacidad de separar hechos, contexto y prioridad, y de explicar por qué un evento merece escalarse mientras otro puede quedar en observación.',
            bloquesApoyo: [
              {
                id: 'ciber-analista-bloque-1',
                tipo: 'texto',
                titulo: 'Severidad no es lo mismo que ruido',
                contenido:
                  'Una lista de eventos sin criterio termina convirtiéndose en fatiga. Por eso los analistas trabajan con prioridades, severidades y contexto. Un evento con severidad alta no se vuelve automáticamente una crisis, pero sí merece una revisión más cuidadosa que uno claramente menor. Este tipo de filtrado evita que el análisis se convierta en una reacción emocional.',
              },
              {
                id: 'ciber-analista-bloque-2',
                tipo: 'texto',
                titulo: 'Primero filtra, luego interpreta',
                contenido:
                  'La secuencia sana es sencilla: primero separas lo importante de lo trivial, luego cuentas, comparas y ordenas, y solo al final intentas concluir algo. Si inviertes ese orden, corres el riesgo de construir una historia atractiva pero mal sustentada. Este ejercicio es pequeño, pero entrena exactamente ese reflejo.',
                puntos: [
                  'No todo evento merece la misma atención.',
                  'La prioridad ayuda a organizar el trabajo, no a exagerarlo.',
                  'Contar, filtrar y justificar es mejor que intuir y dramatizar.',
                ],
              },
            ],
          },
          instructions: {
            overview:
              'Teoría: un analista no trabaja solo con hechos sueltos, sino con hechos ordenados por relevancia. Esta misión introduce una idea central para el resto del curso: no basta con detectar que algo ocurrió; hay que estimar si merece prioridad. Para eso usamos severidad, conteo y contexto como filtros iniciales antes de sacar conclusiones más ambiciosas.',
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
            videoTitle: 'Python Tutorial #48 HASHLIB module',
            videoUrl: 'https://www.youtube.com/embed/HTvVMbDyQns',
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
              'Hashing no es reversible; base64 sí es una representación reversible. Esa diferencia cambia por completo el propósito de cada técnica y es una de las confusiones más comunes cuando alguien empieza a mezclar conceptos de seguridad.',
            bloquesApoyo: [
              {
                id: 'ciber-hashing-bloque-1',
                tipo: 'texto',
                titulo: 'Tres ideas que no debes mezclar',
                contenido:
                  'Hashing, encoding y cifrado no cumplen la misma función. Un hash produce una huella para verificar integridad o comparar datos sin guardar el original. Una codificación como base64 solo transforma la representación para transportar o almacenar datos en formatos compatibles. El cifrado, en cambio, busca proteger confidencialidad permitiendo una recuperación controlada del contenido.',
              },
              {
                id: 'ciber-hashing-bloque-2',
                tipo: 'texto',
                titulo: 'Por qué esta distinción importa en seguridad',
                contenido:
                  'Si confundes estas técnicas, puedes terminar diseñando soluciones falsas. Guardar algo en base64 no lo protege. Hashear una contraseña no te permite recuperarla después. Cifrar un dato no sirve como evidencia de integridad por sí solo. Esta misión busca fijar ese mapa mental antes de entrar a ejemplos más cercanos a escenarios reales.',
              },
            ],
          },
          instructions: {
            overview:
              'Teoría: muchas explicaciones superficiales meten en la misma bolsa a hashing, cifrado y codificación, pero en práctica responden a problemas distintos. Aquí usarás el mismo dato para obtener una huella criptográfica y una representación codificada, de modo que la diferencia no quede en una definición abstracta sino en la salida real del programa. La meta es que puedas mirar un string y entender si sirve para verificar, representar o proteger.',
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
            videoTitle: '',
            videoUrl: '',
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
              'En integridad no preguntas "¿me parece igual?", sino "¿su huella coincide exactamente con la esperada?". La diferencia parece pequeña, pero cambia por completo el nivel de confianza que tienes en un archivo o configuración.',
            bloquesApoyo: [
              {
                id: 'ciber-huellas-bloque-1',
                tipo: 'texto',
                titulo: 'Integridad significa evidencia exacta',
                contenido:
                  'Cuando verificas integridad no estás comparando impresiones visuales ni intuiciones. Estás comparando huellas exactas. Si el contenido cambia aunque sea en un solo carácter, el hash cambia de forma drástica. Esa propiedad vuelve a las funciones hash muy útiles para detectar modificaciones no autorizadas, corrupciones o diferencias entre una referencia confiable y una copia sospechosa.',
              },
              {
                id: 'ciber-huellas-bloque-2',
                tipo: 'texto',
                titulo: 'Patrón mental de esta lección',
                contenido:
                  'El flujo conceptual es simple y poderoso: tomas un contenido, calculas su huella, la comparas con una referencia y tomas una decisión. En escenarios reales, esto aplica a archivos descargados, configuraciones, backups, evidencia exportada o cualquier artefacto donde importe saber si algo fue alterado.',
              },
            ],
          },
          instructions: {
            overview:
              'Teoría: la integridad es una de las primeras preguntas serias en seguridad. Antes de interpretar un archivo, una configuración o una evidencia, conviene saber si coincide con la versión que esperabas. Esta misión entrena el patrón mínimo de verificación: calcular, comparar y decidir.',
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
            videoTitle: 'Python Tutorial #49 BASE64 module',
            videoUrl: 'https://www.youtube.com/embed/0_6AmCMdez0',
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
              'Hex y base64 no son seguridad por sí mismos, pero aparecen constantemente en evidencias, APIs, cabeceras, logs y herramientas. Entenderlos evita que trates una representación textual como si fuera magia criptográfica.',
            bloquesApoyo: [
              {
                id: 'ciber-bytes-bloque-1',
                tipo: 'texto',
                titulo: 'Por qué hablamos tanto de bytes',
                contenido:
                  'Muchas herramientas de seguridad trabajan en capas donde el texto bonito deja de ser suficiente. Un hash opera sobre bytes. Una respuesta de red puede contener bytes. Un archivo binario o una carga codificada también. Por eso conviene acostumbrarse a pasar de texto a bytes y de bytes a representaciones legibles sin perder el hilo de lo que realmente está ocurriendo.',
              },
              {
                id: 'ciber-bytes-bloque-2',
                tipo: 'texto',
                titulo: 'Hex y base64 como lenguajes de intercambio',
                contenido:
                  'Hexadecimal te da una vista muy directa del contenido binario, útil para inspección y comparaciones. Base64, en cambio, suele aparecer cuando necesitas transportar datos binarios en contextos textuales como JSON, cabeceras o algunos protocolos. Ambos son formatos de representación, no mecanismos de protección.',
              },
            ],
          },
          instructions: {
            overview:
              'Teoría: en seguridad es muy común encontrarte con datos que no se muestran directamente como texto legible. Esta misión te obliga a pasar por la capa intermedia de bytes y luego a observar dos representaciones frecuentes: hex y base64. La idea no es memorizar formatos, sino entender por qué aparecen tanto cuando revisas artefactos o salidas técnicas.',
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
            videoTitle: 'The FULL Guide To Secrets (Module) For Python Developers',
            videoUrl: 'https://www.youtube.com/embed/xVUjZGlqNFQ',
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
              'Cuando necesitas algo impredecible para seguridad, `secrets` es la opción correcta. `random` sirve para simulaciones, juegos o demos, pero no para generar tokens que luego van a influir en autenticación, enlaces sensibles o valores de recuperación.',
            bloquesApoyo: [
              {
                id: 'ciber-secrets-bloque-1',
                tipo: 'texto',
                titulo: 'Entropía y previsibilidad',
                contenido:
                  'Un secreto útil no es solo un string raro: es un valor difícil de adivinar incluso si un atacante conoce el contexto general del sistema. En seguridad, la previsibilidad mata. Por eso Python ofrece el módulo `secrets`, pensado para producir valores adecuados en escenarios donde una predicción podría comprometer un flujo entero.',
              },
              {
                id: 'ciber-secrets-bloque-2',
                tipo: 'texto',
                titulo: 'Pensar en propiedades, no en valores fijos',
                contenido:
                  'En esta lección no verificas un resultado exacto porque un token sano debe cambiar cada vez. Lo que sí puedes verificar son propiedades: longitud, forma, alfabeto permitido y, sobre todo, que la fuente venga de una API diseñada para secretos. Esa forma de pensar aparece mucho cuando pruebas mecanismos de autenticación o recuperación.',
              },
            ],
          },
          instructions: {
            overview:
              'Teoría: en seguridad no siempre validas contenido exacto; muchas veces validas propiedades de un valor. Un token sano debe ser impredecible, tener un formato razonable y salir de una fuente confiable. Esta misión te enseña justamente ese cambio de mentalidad: dejar de perseguir un string fijo y empezar a revisar características que indiquen si el valor fue generado correctamente.',
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
        'Explica cómo se validan mensajes, cómo se comparan secretos y cómo se piensa el cifrado sin falsas promesas ni atajos peligrosos.',
      lessons: [
        {
          id: 'ciber-password-salt',
          title: 'Misión 09: Contraseñas seguras y hashing con salt',
          duration: '18 min',
          xp: 190,
          objective:
            'Aplicar el patrón de concatenar una contraseña con un salt fijo de laboratorio antes de calcular su hash.',
          resources: {
            videoTitle: 'PYTHON : Salt and hash a password in Python',
            videoUrl: 'https://www.youtube.com/embed/kWTSSmowNuo',
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
              'Aquí no estamos construyendo un sistema real de autenticación, sino entendiendo por qué una contraseña no debería hashearse sola. El salt introduce variación y evita que dos entradas iguales produzcan siempre la misma huella visible.',
            bloquesApoyo: [
              {
                id: 'ciber-password-salt-bloque-1',
                tipo: 'texto',
                titulo: 'Qué resuelve el salt',
                contenido:
                  'Si dos personas usan la misma contraseña y el sistema la hashea sola, sus huellas serán idénticas. Eso facilita comparaciones masivas y búsquedas en tablas precalculadas. El salt rompe esa simetría añadiendo un valor extra antes del hash.',
                puntos: [
                  'Mismo password no implica misma huella si el salt cambia.',
                  'El salt no reemplaza un buen algoritmo, lo complementa.',
                  'Su función principal es dificultar reutilización y comparación directa de hashes.',
                ],
              },
              {
                id: 'ciber-password-salt-bloque-2',
                tipo: 'texto',
                titulo: 'Qué debe quedarte claro',
                contenido:
                  'Esta lección no busca que implementes un sistema de login completo, sino que entiendas la lógica mental detrás del patrón. Más adelante, cuando veas HMAC y cifrado, te servirá distinguir claramente entre proteger contraseñas, proteger mensajes y proteger contenido.',
              },
            ],
          },
          instructions: {
            overview:
              'Teoría: cuando una contraseña se procesa junto con un salt, la huella resultante deja de depender únicamente del texto secreto. Eso complica comparaciones triviales entre hashes y reduce ataques basados en tablas precalculadas. En este curso usamos un salt fijo de laboratorio para que la salida sea reproducible, pero el concepto importante es otro: mezclar contexto adicional antes de calcular la huella.',
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
            videoTitle: '',
            videoUrl: '',
            documentationLinks: [
              doc('hmac.compare_digest', 'https://docs.python.org/3/library/hmac.html#hmac.compare_digest'),
            ],
            exampleTitle: 'Comparar un token correcto y uno falso',
            exampleCode: `import hmac

esperado = "token-lab"
print(hmac.compare_digest(esperado, "token-lab"))
print(hmac.compare_digest(esperado, "token-falso"))`,
            supportNote:
              'La misión no trata de romper nada. Trata de comparar secretos de forma más razonable cuando el valor sí importa y cuando un simple == puede ocultar detalles de implementación que no conviene normalizar.',
            bloquesApoyo: [
              {
                id: 'ciber-compare-bloque-1',
                tipo: 'texto',
                titulo: 'Por qué no basta con pensar en True o False',
                contenido:
                  'En apariencia, cualquier comparación solo termina en verdadero o falso. Pero en seguridad también importa cómo llegas a ese resultado y qué hábitos de programación instalas. Esta misión te enseña a no tratar secretos como si fueran cualquier string corriente.',
              },
              {
                id: 'ciber-compare-bloque-2',
                tipo: 'texto',
                titulo: 'Regla práctica para recordar',
                contenido:
                  'Si el valor representa autenticidad, autorización o una verificación sensible, usa compare_digest. No porque todo sistema vaya a estar bajo un ataque sofisticado en ese instante, sino porque normaliza una práctica correcta desde el diseño.',
              },
            ],
          },
          instructions: {
            overview:
              'Teoría: no todas las comparaciones son iguales cuando el dato representa un secreto o una firma. Python ofrece compare_digest para validar valores sensibles con una semántica más adecuada que una comparación ingenua. Aquí el objetivo no es entrar en criptografía avanzada, sino adoptar un reflejo sano: cuando comparas tokens, firmas o candidatos sensibles, usa la herramienta pensada para eso.',
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
            videoTitle: 'Cryptography with Python 32: Implementing HMAC in Python',
            videoUrl: 'https://www.youtube.com/embed/Cj-z6r7eVr0',
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
              'HMAC no cifra el mensaje. Sirve para demostrar autenticidad e integridad cuando las partes comparten una clave secreta. Eso lo vuelve muy útil cuando quieres detectar si un contenido fue modificado o si viene de quien dice venir.',
            bloquesApoyo: [
              {
                id: 'ciber-hmac-bloque-1',
                tipo: 'texto',
                titulo: 'Qué aporta HMAC que un hash simple no aporta',
                contenido:
                  'Un hash simple sobre un mensaje puede ayudarte a detectar cambios si ya confías en el valor esperado. HMAC añade una clave secreta compartida, así que la validación no depende solo del texto, sino también de que la parte verificadora conozca el secreto correcto.',
                puntos: [
                  'Sirve para autenticidad e integridad.',
                  'No sirve para confidencialidad.',
                  'La clave compartida es parte central del mecanismo.',
                ],
              },
              {
                id: 'ciber-hmac-bloque-2',
                tipo: 'texto',
                titulo: 'Cómo pensar esta lección',
                contenido:
                  'Si el cifrado responde a la pregunta ¿quién puede leer esto?, HMAC responde mejor a ¿quién pudo haber generado esto? o ¿esto llegó intacto? Esa distinción vuelve más claro cuándo aplicar cada técnica sin mezclar objetivos.',
              },
            ],
          },
          instructions: {
            overview:
              'Teoría: HMAC combina una clave secreta con una función hash para generar una firma verificable del mensaje. Si el contenido cambia o si la clave no coincide, la firma esperada deja de encajar. Esta idea es importante porque separa dos preguntas que la gente suele mezclar: una cosa es ocultar contenido y otra distinta es demostrar que no fue alterado y que proviene de una fuente autorizada.',
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
            videoTitle: 'Python Encryption Tutorial: How to Encrypt & Decrypt Data',
            videoUrl: 'https://www.youtube.com/embed/es_5TMQc-Bk',
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
              'No queremos un cifrado inventado ni una falsa sensación de seguridad. Queremos que entiendas el flujo real de una librería seria y qué piezas conceptuales aparecen cuando hablamos de confidencialidad en un sistema real.',
            bloquesApoyo: [
              {
                id: 'ciber-cifrado-bloque-1',
                tipo: 'texto',
                titulo: 'Confidencialidad no es integridad',
                contenido:
                  'Cifrar sirve para ocultar el contenido ante terceros no autorizados. Eso no lo convierte automáticamente en un mecanismo perfecto de verificación ni en un sustituto directo de hashing o HMAC. Por eso este curso separa explícitamente estas técnicas y las estudia por capas.',
              },
              {
                id: 'ciber-cifrado-bloque-2',
                tipo: 'texto',
                titulo: 'Qué observar en el flujo',
                contenido:
                  'Más que memorizar nombres de métodos, conviene reconocer la secuencia: existe una clave, existe un mensaje en bytes, existe un resultado cifrado y existe una operación inversa autorizada. Si ese mapa te queda claro, más adelante podrás leer librerías y documentación con mucha más seguridad conceptual.',
              },
            ],
          },
          instructions: {
            overview:
              'Teoría: el cifrado simétrico protege el contenido para que solo quien tiene la clave adecuada pueda recuperar el mensaje original. En esta misión no perseguimos una implementación casera, sino el entendimiento del flujo moderno: generar clave, construir el objeto que cifra, producir un token cifrado y luego recuperar el plano. Es una lección de arquitectura mental tanto como de sintaxis.',
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
      title: 'Unidad 4: Redes, tráfico y reconocimiento técnico',
      summary:
        'Baja a tierra puertos, sockets, tráfico básico, DNS y reconocimiento ético en laboratorios controlados.',
      lessons: [
        {
          id: 'ciber-ip-puertos',
          title: 'Misión 13: IP, puertos, TCP y UDP',
          duration: '18 min',
          xp: 190,
          objective:
            'Entender con código la diferencia entre servicios que usarían TCP y servicios que suelen apoyarse en UDP.',
          resources: {
            videoTitle: 'Wireshark Basics for Beginners | TCP, UDP, HTTP Packet Capture',
            videoUrl: 'https://www.youtube.com/embed/aMu-hqTaspc',
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
              'Cuando hablas de IP, puertos, TCP y UDP no estás memorizando vocabulario por obligación. Estás aprendiendo cómo se organiza la conversación básica entre máquinas y por qué esa organización influye en lo que una herramienta puede observar o probar.',
            bloquesApoyo: [
              {
                id: 'ciber-ip-bloque-1',
                tipo: 'texto',
                titulo: 'Cómo se conectan estas piezas',
                contenido:
                  'No se trata de estudiar red como una materia aislada, sino de entender el mínimo necesario para automatizar revisiones. Si sabes que un host responde en cierto puerto y bajo cierta lógica de transporte, ya tienes una pista concreta sobre el servicio que podrías estar observando.',
                puntos: [
                  'La IP apunta al host.',
                  'El puerto apunta al servicio o proceso expuesto.',
                  'TCP y UDP describen comportamientos distintos de intercambio.',
                ],
              },
            ],
          },
          instructions: {
            overview:
              'Teoría: una IP ayuda a identificar dónde vive un host en la red; un puerto ayuda a distinguir qué servicio espera conexiones; y el protocolo de transporte define cómo se comporta esa conversación. Esta misión importa porque muchas tareas de reconocimiento y validación técnica parten precisamente de estas tres piezas: destino, servicio y forma de transporte.',
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
            videoTitle: '',
            videoUrl: '',
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
              'Un script de red que no define límites de tiempo puede quedarse esperando demasiado, producir resultados engañosos o bloquear tu flujo de trabajo. El timeout no es un detalle menor: es parte de cómo interpretas la respuesta del entorno.',
            bloquesApoyo: [
              {
                id: 'ciber-sockets-bloque-1',
                tipo: 'texto',
                titulo: 'Silencio también es información',
                contenido:
                  'Si un host no responde dentro del tiempo esperado, eso no significa automáticamente que el servicio no exista. Puede haber latencia, filtros, saturación o simplemente una política que retrase la respuesta. Por eso esta lección enfatiza tanto el control del tiempo como la lectura prudente de resultados.',
              },
            ],
          },
          instructions: {
            overview:
              'Teoría: cuando una aplicación abre un socket, no solo intenta llegar a un destino; también debe decidir cuánto tiempo está dispuesta a esperar. Esa decisión afecta tanto el rendimiento como la interpretación del resultado. Un timeout explícito vuelve más controlado el experimento y te obliga a pensar en respuestas, silencios y fallos como datos distintos.',
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
            videoTitle: 'LESSON 75: Analyzing HTTP and DNS Traffic in Wireshark',
            videoUrl: 'https://www.youtube.com/embed/DuOVskvd-gc',
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
              'DNS suele sentirse invisible porque muchas herramientas lo resuelven por ti. Pero en reconocimiento técnico es clave entender cómo un nombre termina apuntando a una dirección y por qué ese paso puede dejar pistas útiles o introducir errores de interpretación.',
            bloquesApoyo: [
              {
                id: 'ciber-dns-bloque-1',
                tipo: 'texto',
                titulo: 'Por qué DNS aparece en reconocimiento',
                contenido:
                  'Muchas revisiones comienzan con un nombre de dominio, no con una IP. Resolverlo te permite aterrizar la conversación en un destino concreto y, además, detectar si existen cambios, respuestas inesperadas o estructuras de nombres que valga la pena documentar.',
              },
            ],
          },
          instructions: {
            overview:
              'Teoría: la resolución de nombres traduce dominios legibles a direcciones que las máquinas realmente utilizan para comunicarse. Saber hacer esa conversión y observar su resultado es útil porque te conecta la capa más humana de un sistema web con la capa más operativa de la red. No estás montando un servidor DNS; estás entendiendo una pieza básica del mapa.',
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
            videoTitle: 'How to Build a Port Scanner in Python | Ethical Hacking',
            videoUrl: 'https://www.youtube.com/embed/3TpRicJAP0o',
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
              'El reconocimiento ético no consiste en lanzar peticiones sin criterio, sino en estructurar una revisión mínima con alcance explícito, objetivos limitados y resultados que puedas explicar sin exagerar lo observado.',
            bloquesApoyo: [
              {
                id: 'ciber-reconocimiento-bloque-1',
                tipo: 'texto',
                titulo: 'Reconocer no es invadir',
                contenido:
                  'Una de las confusiones más comunes es asumir que cualquier tarea de descubrimiento ya es ofensiva por definición. En un laboratorio controlado, reconocer significa observar, registrar y resumir dentro de un margen acordado. La ética no está separada del script: está incorporada en sus límites.',
              },
            ],
          },
          instructions: {
            overview:
              'Teoría: una revisión técnica responsable suele empezar con preguntas pequeñas: qué hosts están autorizados, qué servicios parecen visibles, qué resultados debo registrar y cuándo debo detenerme. Esta misión baja esas preguntas a una estructura simple de Python para que el proceso quede claro desde el diseño y no solo desde la intención.',
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
        'Separa bien la parte web para que HTTP, cabeceras, cookies y scripts de auditoría sobre endpoints se entiendan con calma.',
      lessons: [
        {
          id: 'ciber-http-status',
          title: 'Misión 17: HTTP, métodos y códigos de estado',
          duration: '18 min',
          xp: 190,
          objective:
            'Leer el patrón mínimo de una consulta HTTP y distinguir el significado de la respuesta por su estado.',
          resources: {
            videoTitle: 'Python Requests Tutorial | Requests Library | API, POST & Headers',
            videoUrl: 'https://www.youtube.com/embed/L8fDyiHawbg',
            documentationLinks: [
              doc('requests quickstart', 'https://requests.readthedocs.io/en/latest/user/quickstart/'),
              doc('HTTP response status codes', 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status'),
            ],
            exampleTitle: 'Consulta simple con requests',
            exampleCode: `import requests

response = requests.get("https://lab.local/status", timeout=3)
print(response.status_code)`,
            supportNote:
              'No hace falta memorizar todos los códigos HTTP. Sí conviene reconocer rápidamente si una respuesta habla de éxito, redirección, autenticación pendiente, recurso ausente o fallo del servidor.',
            bloquesApoyo: [
              {
                id: 'ciber-http-status-bloque-1',
                tipo: 'texto',
                titulo: 'Cómo leer familias de estados',
                contenido:
                  'Más que memorizar números exactos, conviene pensar por familias. Los 2xx suelen indicar éxito, los 3xx redirecciones, los 4xx problemas desde la perspectiva de la solicitud o acceso, y los 5xx fallos del lado del servicio. Esa lectura gruesa ya mejora mucho una revisión inicial.',
              },
            ],
          },
          instructions: {
            overview:
              'Teoría: HTTP es un diálogo entre una petición y una respuesta, y el código de estado resume cómo terminó esa interacción. Esta misión se centra en el patrón mínimo de lectura: lanzar una consulta, observar la respuesta y usar el estado como una señal de contexto. No todo 200 significa seguridad, ni todo 403 significa problema grave, pero los estados sí te dan una primera brújula.',
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
            videoTitle: '',
            videoUrl: '',
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
              'Las cabeceras no son la vulnerabilidad por sí mismas, pero sí pueden revelar tecnología, decisiones de endurecimiento o exposición innecesaria. Aprender a leerlas te vuelve más observador antes de sacar conclusiones mayores.',
            bloquesApoyo: [
              {
                id: 'ciber-http-headers-bloque-1',
                tipo: 'texto',
                titulo: 'Metadatos que hablan del servicio',
                contenido:
                  'A veces una revisión útil no descubre una falla evidente, pero sí documenta decisiones técnicas relevantes. Ver un servidor declarado, una política HSTS ausente o un conjunto mínimo de cabeceras puede ayudarte a clasificar madurez, exposición o consistencia sin tocar nada sensible.',
              },
            ],
          },
          instructions: {
            overview:
              'Teoría: una respuesta HTTP no solo trae cuerpo; también trae metadatos. Las cabeceras pueden sugerir servidor, políticas de transporte, caché, compresión o mecanismos de autenticación. Esta misión enseña a mirar esas piezas pequeñas porque, en conjunto, suelen contar bastante sobre el comportamiento de un servicio.',
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
            videoTitle: 'Cookies, Sessions, & Tokens Explained in 12 Minutes',
            videoUrl: 'https://www.youtube.com/embed/NlvngHl0cdc',
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
              'Aquí no estamos automatizando un login real. Queremos entender las piezas que sostienen estado entre una petición y otra: sesión, cookie y token, cada una con su propio rol dentro del flujo.',
            bloquesApoyo: [
              {
                id: 'ciber-cookies-bloque-1',
                tipo: 'texto',
                titulo: 'Tres piezas, tres funciones',
                contenido:
                  'Una cookie suele ser un contenedor de datos que viaja entre cliente y servidor. Una sesión ayuda a mantener contexto entre solicitudes. Un token puede servir para demostrar identidad o autorización en un formato portable. En la práctica, pueden convivir, pero no significan exactamente lo mismo.',
                puntos: [
                  'La sesión mantiene continuidad.',
                  'La cookie transporta o referencia estado.',
                  'El token suele representar autenticación o autorización.',
                ],
              },
            ],
          },
          instructions: {
            overview:
              'Teoría: muchas interacciones web requieren continuidad. Una solicitud sola rara vez cuenta toda la historia; lo importante es cómo se mantiene el contexto entre varias. Las cookies, las sesiones y los tokens resuelven ese problema desde ángulos distintos. Esta misión te ayuda a verlos como mecanismos de estado, no como palabras de moda intercambiables.',
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
            videoTitle: '',
            videoUrl: '',
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
              'El objetivo aquí no es explotar nada. Es reconocer qué partes de la superficie web parecen relevantes, repetibles o dignas de documentación para una revisión posterior más cuidadosa.',
            bloquesApoyo: [
              {
                id: 'ciber-fingerprinting-bloque-1',
                tipo: 'texto',
                titulo: 'Superficie expuesta como mapa inicial',
                contenido:
                  'Pensar en endpoints como piezas de una superficie te obliga a organizar la revisión. No todos los puntos tienen el mismo peso: algunos confirman salud, otros revelan paneles administrativos y otros solo documentan comportamiento normal. La clave es resumir lo observado de forma limpia y prudente.',
              },
            ],
          },
          instructions: {
            overview:
              'Teoría: fingerprinting básico significa observar señales externas de una aplicación o servicio sin entrar todavía en acciones agresivas. Revisar endpoints visibles, nombres, respuestas y pequeñas pistas de comportamiento te ayuda a construir una foto inicial de la superficie expuesta. Esta misión insiste en el verbo correcto: observar antes de interpretar demasiado.',
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
        'Cierra el curso con regex, análisis de autenticación, correlación de hallazgos y un mini analizador final que integra varias capas defensivas.',
      lessons: [
        {
          id: 'ciber-regex-iocs',
          title: 'Misión 21: Regex e indicadores de compromiso',
          duration: '18 min',
          xp: 200,
          objective:
            'Extraer IPs desde texto con expresiones regulares para empezar a tratar evidencia como datos procesables.',
          resources: {
            videoTitle: 'Log File Analysis with Regex: Extract Data Like a Pro!',
            videoUrl: 'https://www.youtube.com/embed/HwupHWmrXyc',
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
              'Regex no es magia. Es una forma de convertir texto desordenado en señales que ya puedes contar, filtrar y comparar. Su valor en seguridad está en volver tratable algo que antes solo parecía ruido textual.',
            bloquesApoyo: [
              {
                id: 'ciber-regex-bloque-1',
                tipo: 'texto',
                titulo: 'Del texto crudo al dato utilizable',
                contenido:
                  'Muchos hallazgos se pierden porque nadie convierte la evidencia a una forma manipulable. Regex aporta justamente ese puente: localiza estructuras repetidas dentro de texto sin obligarte a parsear todo el documento. Una vez extraído el patrón, ya puedes contar, agrupar o comparar.',
              },
            ],
          },
          instructions: {
            overview:
              'Teoría: una expresión regular no reemplaza el análisis, pero sí acelera la extracción de patrones repetidos. En seguridad eso importa porque los indicadores suelen venir incrustados en texto: IPs, dominios, nombres de archivo, hashes, rutas o errores. Esta misión te enseña a pasar del texto bruto a una lista concreta de elementos con los que ya puedes trabajar.',
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
            videoTitle: 'I Built a Brute Force Attack Detector in Python',
            videoUrl: 'https://www.youtube.com/embed/48yP10Gaq-w',
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
              'No toda repetición es ataque, pero sí es una señal. Esta misión te enseña a detectar el patrón antes de interpretarlo, para que primero observes el comportamiento y después decidas si merece escalarse.',
            bloquesApoyo: [
              {
                id: 'ciber-logs-bloque-1',
                tipo: 'texto',
                titulo: 'Por qué contar cambia el análisis',
                contenido:
                  'Contar por IP, usuario o ventana temporal te ayuda a distinguir entre ruido normal y comportamiento persistente. El objetivo no es gritar "ataque" al primer indicio, sino producir una señal mejor argumentada a partir de repeticiones observables.',
              },
            ],
          },
          instructions: {
            overview:
              'Teoría: los logs de autenticación suelen ser más útiles cuando los lees como series, no como líneas sueltas. Un solo fallo puede no significar nada; varios fallos repetidos desde el mismo origen ya cuentan otra historia. Aquí entrenas ese cambio de enfoque: pasar de eventos aislados a patrones de repetición cuantificables.',
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
            videoTitle: '',
            videoUrl: '',
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
              'Una señal sola puede ser débil. Varias señales pequeñas, vistas juntas, suelen contar una historia más convincente. Correlacionar no es complicar por gusto: es ordenar la evidencia para decidir con mejor criterio.',
            bloquesApoyo: [
              {
                id: 'ciber-correlacion-bloque-1',
                tipo: 'texto',
                titulo: 'Correlacionar es sumar contexto',
                contenido:
                  'Un host puede tener un indicador leve en autenticación, otro en cabeceras y otro en exposición de endpoints. Por separado parecen detalles menores; juntos, pueden cambiar la prioridad. La correlación te obliga a dejar de mirar cada hallazgo como si existiera en un vacío.',
              },
            ],
          },
          instructions: {
            overview:
              'Teoría: en seguridad muchas decisiones no salen de un único dato espectacular, sino de la suma de varias pistas moderadas. Esta misión usa un puntaje simple para enseñarte esa lógica: combinar observaciones parciales en una lectura priorizada. No pretende reemplazar un SIEM real, pero sí sembrar la intuición correcta sobre cómo se construye relevancia acumulada.',
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
            videoTitle: '3 Simple Projects for Your Portfolio | Cybersecurity',
            videoUrl: 'https://www.youtube.com/embed/gUod_PQgJKk',
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
              'El proyecto final no busca impresionar con complejidad artificial. Busca demostrar que ya puedes encadenar ideas del curso en un flujo pequeño pero coherente: observar, extraer, puntuar y resumir.',
            bloquesApoyo: [
              {
                id: 'ciber-sentinelpy-bloque-1',
                tipo: 'texto',
                titulo: 'Qué demuestra realmente el proyecto',
                contenido:
                  'Este cierre no se evalúa por tamaño, sino por integración. Si logras que una herramienta pequeña lea entradas, extraiga señales, produzca una prioridad y devuelva un resumen legible, entonces ya estás pensando como alguien que automatiza análisis con criterio.',
              },
              {
                id: 'ciber-sentinelpy-bloque-2',
                tipo: 'texto',
                titulo: 'Cómo leer tu propio crecimiento',
                contenido:
                  'Al principio del curso veías archivos, eventos y endpoints como piezas separadas. Aquí la idea es que ya puedas verlas como parte de un mismo pipeline: fuente, extracción, decisión y salida. Ese cambio de perspectiva es más valioso que cualquier reto aislado.',
              },
            ],
          },
          instructions: {
            overview:
              'Teoría: un proyecto final vale cuando integra decisiones, no solo sintaxis. SentinelPy representa justamente eso: tomar piezas vistas antes regex, conteo, priorización, lectura de artefactos y enfoque defensivo y convertirlas en un mini analizador con propósito claro. La meta no es construir una plataforma completa, sino mostrar que ya sabes unir varias capas en una herramienta entendible.',
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
