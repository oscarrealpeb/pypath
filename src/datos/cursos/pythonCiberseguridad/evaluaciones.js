export const evaluacionesPythonCiberseguridad = {
  unitAssessments: {
    'ciber-arranque': {
      id: 'ciber-arranque-checkpoint',
      title: 'Evaluación de unidad: Primeros pasos y mentalidad de análisis',
      summary:
        'Verifica que comprendes el alcance ético, los artefactos básicos y la idea de priorizar señales antes de concluir.',
      passingScore: 2,
      successMessage:
        'Unidad aprobada. Ya tienes el vocabulario base y una forma ordenada de mirar el laboratorio.',
      questions: [
        {
          id: 'ciber-arranque-q1',
          prompt: '¿Cuál es la regla central de alcance en este curso?',
          options: [
            { id: 'a', label: 'Trabajar solo sobre laboratorios o ejemplos controlados' },
            { id: 'b', label: 'Escanear cualquier host para practicar más rápido' },
            { id: 'c', label: 'Ignorar el alcance si el script funciona' },
          ],
          correctOptionId: 'a',
          explanation:
            'Todo el curso asume objetivos controlados y reglas explícitas de alcance.',
        },
        {
          id: 'ciber-arranque-q2',
          prompt: '¿Qué tipo de artefacto suele dejar una pista directa de eventos de autenticación?',
          options: [
            { id: 'a', label: 'Un archivo .log' },
            { id: 'b', label: 'Un archivo .png' },
            { id: 'c', label: 'Un archivo .mp3' },
          ],
          correctOptionId: 'a',
          explanation:
            'Los logs son una de las fuentes más comunes para revisar eventos y fallos de autenticación.',
        },
        {
          id: 'ciber-arranque-q3',
          prompt: '¿Qué hace un analista antes de afirmar que algo es crítico?',
          options: [
            { id: 'a', label: 'Cuenta señales, revisa contexto y prioriza' },
            { id: 'b', label: 'Asume lo peor de inmediato' },
            { id: 'c', label: 'Borra los artefactos para evitar ruido' },
          ],
          correctOptionId: 'a',
          explanation:
            'La disciplina del análisis empieza por separar hechos, contexto y severidad.',
        },
      ],
    },
    'ciber-integridad': {
      id: 'ciber-integridad-checkpoint',
      title: 'Evaluación de unidad: Integridad, hashing y secretos',
      summary:
        'Confirma que distingues hash, base64 y generación segura de tokens, y que sabes verificar integridad.',
      passingScore: 2,
      successMessage:
        'Unidad aprobada. Ya manejas huellas, conversiones y secretos con bastante criterio.',
      questions: [
        {
          id: 'ciber-integridad-q1',
          prompt: '¿Qué propiedad describe mejor a una huella SHA-256?',
          options: [
            { id: 'a', label: 'Sirve para verificar integridad y no es reversible' },
            { id: 'b', label: 'Es una forma reversible de codificar texto' },
            { id: 'c', label: 'Es lo mismo que cifrar un archivo' },
          ],
          correctOptionId: 'a',
          explanation:
            'Una huella criptográfica se usa para integridad; no está pensada para recuperar el dato original.',
        },
        {
          id: 'ciber-integridad-q2',
          prompt: '¿Qué módulo se recomienda para generar tokens seguros en Python?',
          options: [
            { id: 'a', label: 'random' },
            { id: 'b', label: 'secrets' },
            { id: 'c', label: 'math' },
          ],
          correctOptionId: 'b',
          explanation:
            'secrets está pensado para valores impredecibles usados en contextos sensibles.',
        },
        {
          id: 'ciber-integridad-q3',
          prompt: '¿Para qué sirve base64 en este contexto?',
          options: [
            { id: 'a', label: 'Para representar bytes en un formato textual común' },
            { id: 'b', label: 'Para validar firmas HMAC' },
            { id: 'c', label: 'Para reemplazar un algoritmo de hash' },
          ],
          correctOptionId: 'a',
          explanation:
            'base64 no aporta seguridad por sí mismo; sirve para transportar o mostrar bytes como texto.',
        },
      ],
    },
    'ciber-autenticidad': {
      id: 'ciber-autenticidad-checkpoint',
      title: 'Evaluación de unidad: Contraseñas, autenticidad y protección',
      summary:
        'Valida que entiendes salts, comparaciones seguras, HMAC y el flujo base de cifrado simétrico.',
      passingScore: 2,
      successMessage:
        'Unidad aprobada. Ya tienes una base clara para hablar de autenticidad e integridad de mensajes.',
      questions: [
        {
          id: 'ciber-autenticidad-q1',
          prompt: '¿Qué aporta un salt al hash de una contraseña?',
          options: [
            { id: 'a', label: 'Hace que la misma contraseña no produzca siempre la misma huella' },
            { id: 'b', label: 'Permite revertir el hash' },
            { id: 'c', label: 'Elimina la necesidad de hashear' },
          ],
          correctOptionId: 'a',
          explanation:
            'El salt introduce variación y evita que dos contraseñas iguales generen exactamente la misma huella.',
        },
        {
          id: 'ciber-autenticidad-q2',
          prompt: '¿Qué valida mejor HMAC en este curso?',
          options: [
            { id: 'a', label: 'Autenticidad e integridad de un mensaje' },
            { id: 'b', label: 'Velocidad de un puerto abierto' },
            { id: 'c', label: 'Resolución DNS de un dominio' },
          ],
          correctOptionId: 'a',
          explanation:
            'HMAC ayuda a comprobar si un mensaje coincide con una firma generada mediante una clave compartida.',
        },
        {
          id: 'ciber-autenticidad-q3',
          prompt: '¿Por qué la misión de Fernet se revisa de forma guiada?',
          options: [
            { id: 'a', label: 'Porque nos interesa el flujo real de cifrado sin depender del runtime del navegador' },
            { id: 'b', label: 'Porque Fernet no tiene documentación' },
            { id: 'c', label: 'Porque el cifrado nunca puede automatizarse' },
          ],
          correctOptionId: 'a',
          explanation:
            'La misión busca que entiendas la estructura correcta aunque el entorno no ejecute esa librería de forma nativa.',
        },
      ],
    },
    'ciber-redes': {
      id: 'ciber-redes-checkpoint',
      title: 'Evaluación de unidad: Redes y reconocimiento técnico',
      summary:
        'Comprueba que distingues puertos, protocolos y la estructura básica de sockets y resolución DNS.',
      passingScore: 2,
      successMessage:
        'Unidad aprobada. Ya puedes leer y plantear scripts de red con una base técnica más segura.',
      questions: [
        {
          id: 'ciber-redes-q1',
          prompt: '¿Qué constante se asocia con un socket tipo stream (TCP)?',
          options: [
            { id: 'a', label: 'socket.SOCK_STREAM' },
            { id: 'b', label: 'socket.SOCK_DGRAM' },
            { id: 'c', label: 'socket.SOCK_FILE' },
          ],
          correctOptionId: 'a',
          explanation:
            'SOCK_STREAM es la constante habitual para conexiones orientadas a stream, como TCP.',
        },
        {
          id: 'ciber-redes-q2',
          prompt: '¿Qué hace settimeout en un socket?',
          options: [
            { id: 'a', label: 'Define cuánto espera una operación antes de fallar' },
            { id: 'b', label: 'Cambia el protocolo de TCP a UDP' },
            { id: 'c', label: 'Cifra automáticamente la conexión' },
          ],
          correctOptionId: 'a',
          explanation:
            'Un timeout evita que el script se quede esperando indefinidamente por una respuesta.',
        },
        {
          id: 'ciber-redes-q3',
          prompt: '¿Qué función de socket usamos en la unidad para resolver localhost a una IP?',
          options: [
            { id: 'a', label: 'socket.gethostbyname()' },
            { id: 'b', label: 'socket.resolve_ip()' },
            { id: 'c', label: 'socket.port_scan()' },
          ],
          correctOptionId: 'a',
          explanation:
            'gethostbyname es una de las formas más conocidas de obtener una IP a partir de un nombre de host.',
        },
      ],
    },
    'ciber-web': {
      id: 'ciber-web-checkpoint',
      title: 'Evaluación de unidad: Web, HTTP y superficie expuesta',
      summary:
        'Valida que entiendes respuestas HTTP, lectura de cabeceras y el papel de cookies, sesiones y endpoints.',
      passingScore: 2,
      successMessage:
        'Unidad aprobada. Ya puedes revisar superficie web básica con bastante mejor criterio.',
      questions: [
        {
          id: 'ciber-web-q1',
          prompt: '¿Qué atributo de requests usamos para leer el estado HTTP de una respuesta?',
          options: [
            { id: 'a', label: 'response.status_code' },
            { id: 'b', label: 'response.port' },
            { id: 'c', label: 'response.token' },
          ],
          correctOptionId: 'a',
          explanation:
            'status_code es el atributo estándar para conocer el código HTTP devuelto por la respuesta.',
        },
        {
          id: 'ciber-web-q2',
          prompt: '¿Qué estructura usamos para leer Server o Strict-Transport-Security?',
          options: [
            { id: 'a', label: 'response.headers' },
            { id: 'b', label: 'response.cookies' },
            { id: 'c', label: 'response.payload' },
          ],
          correctOptionId: 'a',
          explanation:
            'Las cabeceras HTTP viven en response.headers y se consultan normalmente con get().',
        },
        {
          id: 'ciber-web-q3',
          prompt: '¿Qué aporta requests.Session() dentro del curso?',
          options: [
            { id: 'a', label: 'Permite conservar contexto como headers o cookies entre solicitudes' },
            { id: 'b', label: 'Reemplaza todas las validaciones HMAC' },
            { id: 'c', label: 'Abre sockets UDP automáticamente' },
          ],
          correctOptionId: 'a',
          explanation:
            'Una sesión ayuda a reutilizar estado y configuración entre varias peticiones web.',
        },
      ],
    },
    'ciber-deteccion': {
      id: 'ciber-deteccion-checkpoint',
      title: 'Evaluación de unidad: Logs, correlación y proyecto final',
      summary:
        'Confirma que puedes extraer indicadores, detectar repeticiones y priorizar hallazgos antes del cierre del curso.',
      passingScore: 2,
      successMessage:
        'Unidad aprobada. Ya estás listo para cerrar el curso con una lectura integrada de señales.',
      questions: [
        {
          id: 'ciber-deteccion-q1',
          prompt: '¿Qué función del módulo re usamos para extraer coincidencias desde un texto?',
          options: [
            { id: 'a', label: 're.findall()' },
            { id: 'b', label: 're.encrypt()' },
            { id: 'c', label: 're.timeout()' },
          ],
          correctOptionId: 'a',
          explanation:
            'findall devuelve todas las coincidencias del patrón dentro del texto analizado.',
        },
        {
          id: 'ciber-deteccion-q2',
          prompt: '¿Qué ventaja aporta Counter en el análisis de intentos fallidos?',
          options: [
            { id: 'a', label: 'Contar rápidamente cuántas veces aparece cada origen' },
            { id: 'b', label: 'Resolver nombres DNS automáticamente' },
            { id: 'c', label: 'Generar hashes más cortos' },
          ],
          correctOptionId: 'a',
          explanation:
            'Counter resume repeticiones por valor y sirve muy bien para detectar orígenes insistentes.',
        },
        {
          id: 'ciber-deteccion-q3',
          prompt: '¿Qué representa mejor la correlación en este curso?',
          options: [
            { id: 'a', label: 'Juntar varias señales para priorizar mejor un host o un caso' },
            { id: 'b', label: 'Cambiar una IP por un dominio' },
            { id: 'c', label: 'Volver reversible un hash' },
          ],
          correctOptionId: 'a',
          explanation:
            'Correlacionar significa mirar varias señales juntas para decidir qué merece más atención.',
        },
      ],
    },
  },
  finalAssessment: {
    id: 'python-ciberseguridad-final',
    title: 'Evaluación final del curso: Python aplicado a ciberseguridad',
    summary:
      'Revisa el mapa completo del curso: integridad, autenticidad, red, web y detección, con énfasis en automatización ética y análisis técnico.',
    passingScore: 4,
    successMessage:
      'Curso finalizado. Ya cerraste una ruta sólida para automatizar análisis técnicos de seguridad con Python.',
    questions: [
      {
        id: 'ciber-final-q1',
        prompt: 'Si quieres comprobar que un archivo no cambió, ¿qué enfoque encaja mejor con este curso?',
        options: [
          { id: 'a', label: 'Comparar su hash actual con el hash esperado' },
          { id: 'b', label: 'Mirarlo a ojo y asumir que está igual' },
          { id: 'c', label: 'Convertirlo a base64 y darlo por bueno' },
        ],
        correctOptionId: 'a',
        explanation:
          'La verificación de integridad en el curso se apoya en comparar la huella actual con un valor esperado.',
      },
      {
        id: 'ciber-final-q2',
        prompt: '¿Qué componente del curso se usó para validar autenticidad de mensajes?',
        options: [
          { id: 'a', label: 'HMAC' },
          { id: 'b', label: 'Counter' },
          { id: 'c', label: 'pathlib' },
        ],
        correctOptionId: 'a',
        explanation:
          'HMAC fue la pieza central para comprobar si un mensaje coincidía con una firma esperada.',
      },
      {
        id: 'ciber-final-q3',
        prompt: '¿Por qué varias misiones de red y web se resolvieron en modo guiado?',
        options: [
          { id: 'a', label: 'Porque nos interesa aprender la estructura real sin fingir conectividad completa desde el navegador' },
          { id: 'b', label: 'Porque Python no puede trabajar con sockets ni HTTP' },
          { id: 'c', label: 'Porque esas áreas no importan en seguridad' },
        ],
        correctOptionId: 'a',
        explanation:
          'El curso prioriza una explicación honesta: enseñar el flujo correcto sin depender de un runtime poco adecuado para ciertas conexiones.',
      },
      {
        id: 'ciber-final-q4',
        prompt: 'Dentro de SentinelPy, ¿qué significa correlacionar hallazgos?',
        options: [
          { id: 'a', label: 'Juntar integridad, señales web y logs para producir una prioridad final' },
          { id: 'b', label: 'Cambiar un token por una cookie' },
          { id: 'c', label: 'Reducir un SHA-256 a cuatro caracteres' },
        ],
        correctOptionId: 'a',
        explanation:
          'El proyecto final usa varias capas del curso para construir una severidad final más útil que una señal aislada.',
      },
      {
        id: 'ciber-final-q5',
        prompt: '¿Qué postura resume mejor el tono del curso?',
        options: [
          { id: 'a', label: 'Automatización técnica, ética y basada en laboratorio' },
          { id: 'b', label: 'Malware real y robo de credenciales' },
          { id: 'c', label: 'Escanear cualquier objetivo sin permiso' },
        ],
        correctOptionId: 'a',
        explanation:
          'Toda la ruta mantiene un enfoque técnico y serio, pero dentro de un laboratorio controlado y sin cruzar líneas peligrosas.',
      },
    ],
  },
}
