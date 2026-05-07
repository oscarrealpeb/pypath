# Guía para crear cursos

Esta carpeta guarda el contenido académico de PyPath.

La idea es simple:

- cada curso vive dentro de su propia carpeta
- dentro de esa carpeta están el contenido, el catálogo y las evaluaciones
- cuando el curso ya está listo, se conecta a la app desde `src/datos/cursos/index.js`

La idea es que, si se va a crear `Fundamentos`, `Pygame`, `Pandas` o cualquier otro curso, esta guía sirva para hacerlo sin perderse.

## 1. Estructura general

Cada curso debe verse así:

```txt
src/datos/cursos/nombreCurso/
  curso.js
  catalogo.js
  evaluaciones.js
  index.js
```

Qué hace cada archivo:

- `curso.js`: contiene unidades, lecciones, recursos, capturas, instrucciones y retos.
- `catalogo.js`: define cómo aparece ese curso en home, panel y recomendador.
- `evaluaciones.js`: guarda las evaluaciones por unidad y la evaluación final.
- `index.js`: reexporta todo lo de esa carpeta para que los imports sean más limpios.

## 2. Flujo recomendado para el equipo

La forma más segura de trabajar es esta:

1. cada integrante trabaja dentro de la carpeta de su curso
2. completa `curso.js`, `catalogo.js` y `evaluaciones.js`
3. prueba localmente que el contenido se ve bien
4. cuando el curso ya esté listo, una sola persona lo conecta en `src/datos/cursos/index.js`

Así se evitan conflictos en Git.

## 3. Paso a paso para crear un curso nuevo

### Paso 1: copiar la plantilla

Usa la carpeta:

- [plantilla](/c:/Users/Usuario/Desktop/pypath/src/datos/cursos/plantilla)

Cópiala y renómbrala, por ejemplo:

```txt
src/datos/cursos/flaskBasico/
```

### Paso 2: cambiar los exports

Dentro de la carpeta nueva, renombra los exports para que coincidan con tu curso.

Por ejemplo:

- en `curso.js`:
```js
export const cursoFlaskBasico = { ... }
```

- en `catalogo.js`:
```js
export const catalogoFlaskBasico = { ... }
```

- en `evaluaciones.js`:
```js
export const evaluacionesFlaskBasico = { ... }
```

- en `index.js`:
```js
export { cursoFlaskBasico } from './curso.js'
export { catalogoFlaskBasico } from './catalogo.js'
export { evaluacionesFlaskBasico } from './evaluaciones.js'
```

### Paso 3: completar `curso.js`

Aquí defines:

- datos generales del curso
- unidades
- lecciones
- recursos de apoyo
- reto de cada lección

### Paso 4: completar `catalogo.js`

Aquí defines cómo se mostrará el curso en:

- home
- panel
- recomendador
- tarjetas del catálogo

### Paso 5: completar `evaluaciones.js`

Aquí defines:

- evaluación de cada unidad
- evaluación final del curso

### Paso 6: conectar el curso con la app

Cuando el curso ya esté listo, agrégalo en:

- [src/datos/cursos/index.js](/c:/Users/Usuario/Desktop/pypath/src/datos/cursos/index.js)

Ahí se decide si entra a:

- `cursos`
- `catalogoCursos`
- `evaluacionesCursos`

Si todavía está en construcción, puede quedarse fuera de `cursos` y aparecer solo como borrador o curso en cola.

## 4. Estructura de `curso.js`

Un curso tiene esta forma general:

```js
export const cursoDemo = {
  id: 'curso-demo',
  title: 'Nombre del curso',
  library: 'Biblioteca',
  requiredCourseIds: ['python-fundamentals'],
  summary: 'Resumen del curso',
  difficulty: 'Nivel esperado',
  units: [
    {
      id: 'unidad-demo',
      title: 'Nombre de la unidad',
      summary: 'Qué aprende la persona aquí',
      lessons: [
        {
          id: 'leccion-demo',
          title: 'Misión 01: ...',
          duration: '10 min',
          xp: 120,
          objective: 'Objetivo de la lección',
          resources: { ... },
          instructions: { ... },
          challenge: { ... },
        },
      ],
    },
  ],
}
```

## 5. Qué significa cada campo de `curso.js`

### Nivel curso

#### `id`

Ejemplo:

```js
id: 'pygame'
```

Qué es:
- el identificador interno del curso

Dónde se usa:
- en las rutas
- en el progreso
- en prerrequisitos
- en evaluaciones
- en el catálogo

Regla:
- debe ser único
- no debería cambiarse después de que el curso ya esté conectado

#### `title`

Ejemplo:

```js
title: 'Juegos 2D con Pygame'
```

Qué es:
- el nombre visible del curso

Dónde se usa:
- encabezado del curso
- tarjetas
- panel
- perfil

#### `library`

Ejemplo:

```js
library: 'Pygame'
```

Qué es:
- el nombre corto de la biblioteca o tecnología principal

Dónde se usa:
- etiquetas visuales
- catálogo
- cards

#### `requiredCourseIds`

Ejemplo:

```js
requiredCourseIds: ['python-fundamentals']
```

Qué es:
- lista de cursos que deben completarse antes

Dónde se usa:
- lógica de desbloqueo
- recomendación
- catálogo

#### `summary`

Qué es:
- resumen corto del curso

Dónde se usa:
- vista del curso
- panel
- catálogo interno

#### `difficulty`

Qué es:
- texto breve sobre el nivel del curso

Dónde se usa:
- vista del curso
- tarjetas y resumen

#### `units`

Qué es:
- lista de unidades del curso

Dónde se usa:
- mapa del curso
- desbloqueo progresivo
- cálculo de progreso

### Nivel unidad

#### `unit.id`

Qué es:
- identificador único de la unidad dentro del curso

Dónde se usa:
- evaluación de unidad
- desbloqueo
- navegación

#### `unit.title`

Qué es:
- nombre visible de la unidad

#### `unit.summary`

Qué es:
- breve explicación del objetivo de la unidad

#### `unit.lessons`

Qué es:
- lista de lecciones de esa unidad

### Nivel lección

#### `lesson.id`

Qué es:
- identificador único de la lección

Dónde se usa:
- URL de la lección
- progreso
- desbloqueo
- guardado del reto completado

Regla:
- debe ser único en toda la app

#### `lesson.title`

Qué es:
- nombre visible de la lección

#### `duration`

Qué es:
- duración estimada

Dónde se usa:
- chips informativos
- cards

#### `xp`

Qué es:
- experiencia que gana el usuario al completar la lección

Dónde se usa:
- progreso y gamificación

#### `objective`

Qué es:
- objetivo visible de la lección

Dónde se usa:
- cabecera de la lección
- contexto del usuario

## 6. Estructura de `resources`

Aquí vive el apoyo previo al reto.

```js
resources: {
  videoTitle: 'Video corto',
  videoUrl: 'https://www.youtube.com/embed/...',
  documentationLinks: [
    { label: 'Doc oficial', url: 'https://...' },
  ],
  exampleTitle: 'Ejemplo guiado',
  exampleCode: 'print("Hola")',
  supportNote: 'Nota breve',
  bloquesApoyo: [ ... ],
}
```

### `videoTitle`

Qué es:
- título visible del video

Dónde se usa:
- arriba del iframe del video

### `videoUrl`

Qué es:
- URL embebible de YouTube

Dónde se usa:
- iframe del video

Regla:
- debe ser URL tipo `https://www.youtube.com/embed/...`

### `documentationLinks`

Qué es:
- lista de enlaces de apoyo

Cada elemento tiene:

- `label`: texto que ve el usuario
- `url`: enlace real

Dónde se usa:
- sección de documentación en la lección

### `exampleTitle`

Qué es:
- nombre del bloque de ejemplo

Dónde se usa:
- encima del código de referencia

### `exampleCode`

Qué es:
- código de referencia que el usuario puede leer antes del reto

Dónde se usa:
- bloque “Referencia rápida”

### `supportNote`

Qué es:
- nota corta previa al resto de recursos

Dónde se usa:
- tarjeta de apoyo dentro de la lección

### `bloquesApoyo`

Qué es:
- arreglo de bloques visuales o textuales opcionales

Dónde se usa:
- sección “Recursos de apoyo” de la lección

Esto es lo que vuelve la plantilla versátil.

## 7. Tipos de `bloquesApoyo`

### Caso `texto`

Sirve para:
- un párrafo solo
- aclaración
- checklist
- cierre breve

Ejemplo:

```js
{
  id: 'intro',
  tipo: 'texto',
  titulo: 'Qué vas a revisar',
  contenido: 'Primero observa el resultado esperado.',
}
```

### Caso `imagenTexto`

Sirve para:
- una captura con explicación al lado o debajo

Ejemplo:

```js
{
  id: 'ventana-esperada',
  tipo: 'imagenTexto',
  disposicion: 'arriba',
  titulo: 'Así debería verse',
  contenido: 'Revisa el botón y el título de la ventana.',
  imageUrl: '/capturas/pyside6/ventana-01.png',
  imageAlt: 'Ventana de PySide6 con botón visible',
  leyenda: 'Estado esperado al final del paso.',
}
```

### Caso `galeria`

Sirve para:
- dos o más capturas lado a lado
- comparar antes/después
- mostrar pasos visuales

Ejemplo:

```js
{
  id: 'comparacion',
  tipo: 'galeria',
  columnas: 2,
  titulo: 'Comparación visual',
  contenido: 'Mira el antes y el después.',
  imagenes: [
    {
      imageUrl: '/capturas/pyside6/boton-01.png',
      imageAlt: 'Primer estado',
      leyenda: 'Antes del cambio.',
    },
    {
      imageUrl: '/capturas/pyside6/boton-02.png',
      imageAlt: 'Segundo estado',
      leyenda: 'Después del cambio.',
    },
  ],
}
```

## 8. Qué significa cada campo de un bloque visual

### `id`

Qué es:
- identificador interno del bloque

Dónde se usa:
- renderizado estable en React

### `tipo`

Valores comunes:
- `texto`
- `imagenTexto`
- `galeria`

Qué hace:
- le dice a la plantilla cómo dibujar ese bloque

### `disposicion`

Valores:
- `arriba`
- `izquierda`
- `derecha`

Qué hace:
- define cómo se acomoda imagen y texto en `imagenTexto`

Cómo elegirla:
- `arriba`: cuando la captura es lo más importante
- `izquierda`: cuando quieres leer el texto mientras miras la captura
- `derecha`: lo mismo, pero invertido

### `titulo`

Qué es:
- título visible del bloque

### `contenido`

Qué es:
- párrafo o explicación principal del bloque

### `puntos`

Qué es:
- lista de bullets o recordatorios cortos

Ejemplo:

```js
puntos: [
  'Revisa el texto del botón.',
  'Comprueba que la ventana esté visible.',
]
```

### `imageUrl`

Qué es:
- ruta de la imagen

Dónde se usa:
- etiqueta `<img>` del bloque

Convención recomendada:
- guardar capturas en `public/capturas/<curso>/...`

Ejemplo:

```js
imageUrl: '/capturas/pygame/frame-jugador.png'
```

### `imageAlt`

Qué es:
- descripción accesible de la imagen

Dónde se usa:
- atributo `alt` de la etiqueta `<img>`

Regla:
- describe lo que se ve
- no pongas solo “imagen 1”

Buen ejemplo:

```js
imageAlt: 'Ventana de Pygame con un rectángulo verde representando al jugador'
```

### `leyenda`

Qué es:
- texto corto debajo o asociado a la imagen

Sirve para:
- remarcar un detalle visual
- decir “antes del cambio”, “después del cambio”, etc.

### `columnas`

Qué es:
- cuántas columnas usa una `galeria`

Dónde se usa:
- distribución visual de varias imágenes

Valores recomendados:
- `2` para comparaciones
- `3` o `4` si de verdad hay varias capturas útiles

### `imagenes`

Qué es:
- arreglo de imágenes dentro de un bloque `galeria`

Cada imagen puede tener:

- `id`
- `imageUrl`
- `imageAlt`
- `titulo`
- `leyenda`

## 9. Estructura de `instructions`

```js
instructions: {
  overview: 'Contexto breve',
  steps: [
    'Paso 1...',
    'Paso 2...',
  ],
  hint: 'Pista corta',
}
```

### `overview`

Qué es:
- explicación general antes de los pasos

### `steps`

Qué es:
- lista de pasos concretos que debe seguir la persona

Dónde se usa:
- bloque “Instrucciones”

### `hint`

Qué es:
- pista breve sin resolver el reto

Dónde se usa:
- bloque “Pista útil”

## 10. Estructura de `challenge`

Aquí vive el ejercicio.

```js
challenge: {
  runtimeMode: 'python',
  exerciseType: 'Completar código',
  title: 'Título del reto',
  prompt: 'Qué debe hacer la persona',
  starterCode: '...',
  editorHeight: '310px',
  expectedKeywords: ['print'],
  successCriteria: 'Qué debe incluir la solución',
  expectedResult: 'Qué se espera ver',
  solutionCode: '...',
  solutionNote: 'Explicación breve',
  salidaGuiada: '...',
  executionNote: 'Cómo se evalúa',
  successMessage: 'Mensaje final',
}
```

### `runtimeMode`

Valores comunes:
- `python`
- `guided`

Qué hace:
- define si el reto usa Python real en navegador o validación guiada

Regla actual:
- `python` se usa sobre todo en Fundamentos
- `guided` es ideal para PySide6, Pygame y otros casos no ejecutables directamente

### `exerciseType`

Qué es:
- etiqueta visible del tipo de ejercicio

Ejemplos:
- `Completar código`
- `Lectura de código`
- `Detección de bug`

### `title`

Qué es:
- nombre del reto

### `prompt`

Qué es:
- explicación clara de qué debe resolver la persona

### `starterCode`

Qué es:
- código inicial que verá el usuario

### `editorHeight`

Qué es:
- altura del editor para esa lección

Cuándo usarlo:
- si el reto es corto, déjalo compacto
- si el reto es largo, dale más altura

Ejemplos:
- `250px`
- `310px`
- `370px`

### `expectedKeywords`

Qué es:
- lista de palabras clave que ayudan a validar la solución

### `successCriteria`

Qué es:
- descripción de lo que debe tener la solución correcta

### `expectedResult`

Qué es:
- resultado esperado visible para la persona

Ejemplo:
- texto que debería imprimirse
- comportamiento esperado
- cambio visual esperado

### `solutionCode`

Qué es:
- solución completa del reto

Dónde se usa:
- cuando el usuario decide ver la solución

### `solutionNote`

Qué es:
- breve explicación de por qué esa solución funciona

### `salidaGuiada`

Qué es:
- salida ilustrativa para retos guiados

Dónde se usa:
- cuando no hay ejecución real del ejercicio

### `executionNote`

Qué es:
- texto que aclara cómo se está evaluando la misión

Ejemplo:
- si usa Python real
- si usa validación guiada

### `successMessage`

Qué es:
- mensaje mostrado al completar correctamente la lección

## 11. Estructura de `catalogo.js`

Este archivo controla cómo aparece el curso fuera de la página interna.

Campos más importantes:

- `id`: debe coincidir con el `id` del curso
- `library`: nombre corto
- `requiredCourseIds`: prerrequisitos
- `title`: título visible
- `description`: descripción corta de tarjeta
- `status`: `live`, `draft` o `soon`
- `statusLabel`: etiqueta visible del estado
- `intensity`: carga o ritmo estimado
- `duration`: duración estimada
- `audience`: a quién va dirigido
- `prerequisites`: texto visible de prerrequisitos
- `nextAfter`: qué sigue después
- `personaTags`: perfiles a los que aplica
- `interestTags`: intereses relacionados
- `experienceTags`: niveles esperados
- `pitch`: mini argumento comercial del curso
- `recommendedOrder`: orden sugerido en catálogo y recomendador

## 12. Estructura de `evaluaciones.js`

Este archivo tiene:

- `unitAssessments`
- `finalAssessment`

### `unitAssessments`

Es un objeto donde cada clave suele ser el `id` de la unidad.

Cada evaluación de unidad tiene:

- `id`
- `title`
- `summary`
- `passingScore`
- `successMessage`
- `questions`

### `finalAssessment`

Es la evaluación final del curso.

Tiene la misma forma general:

- `id`
- `title`
- `summary`
- `passingScore`
- `successMessage`
- `questions`

### Estructura de una pregunta

```js
{
  id: 'boot-q1',
  prompt: '¿Qué hace print("Hola") en Python?',
  options: [
    { id: 'a', label: 'Muestra Hola en consola' },
    { id: 'b', label: 'Guarda Hola en una variable' },
  ],
  correctOptionId: 'a',
  explanation: 'print sirve para mostrar texto o valores.',
}
```

Qué significa cada campo:

- `id`: identificador de la pregunta
- `prompt`: enunciado visible
- `options`: respuestas posibles
- `correctOptionId`: id de la opción correcta
- `explanation`: explicación posterior

## 13. Capturas y dónde guardarlas

La convención recomendada es esta:

```txt
public/capturas/pyside6/
  ventana-01.png
  boton-02.png

public/capturas/pygame/
  loop-01.png
  colision-02.png
```

Y luego en el curso usar rutas como:

```js
imageUrl: '/capturas/pyside6/ventana-01.png'
```

O dentro de una galería:

```js
imagenes: [
  { imageUrl: '/capturas/pyside6/ventana-01.png', imageAlt: 'Primer estado' },
  { imageUrl: '/capturas/pyside6/ventana-02.png', imageAlt: 'Segundo estado' },
]
```

## 14. Dos formas típicas de usar la plantilla

### Caso A: párrafo arriba, dos capturas, párrafo abajo

```js
bloquesApoyo: [
  {
    id: 'intro',
    tipo: 'texto',
    contenido: 'Aquí explicas qué van a comparar.',
  },
  {
    id: 'comparacion',
    tipo: 'galeria',
    columnas: 2,
    imagenes: [
      { imageUrl: '/capturas/pyside6/boton-01.png', imageAlt: 'Primer estado' },
      { imageUrl: '/capturas/pyside6/boton-02.png', imageAlt: 'Segundo estado' },
    ],
  },
  {
    id: 'cierre',
    tipo: 'texto',
    contenido: 'Aquí cierras la explicación.',
  },
]
```

### Caso B: captura arriba + explicación lateral

```js
bloquesApoyo: [
  {
    id: 'frame-general',
    tipo: 'imagenTexto',
    disposicion: 'arriba',
    titulo: 'Frame esperado',
    contenido: 'Mira primero el resultado completo.',
    imageUrl: '/capturas/pygame/frame-01.png',
    imageAlt: 'Frame general del juego',
  },
  {
    id: 'detalle',
    tipo: 'imagenTexto',
    disposicion: 'izquierda',
    titulo: 'Qué revisar',
    contenido: 'Ahora enfócate en este detalle.',
    imageUrl: '/capturas/pygame/frame-02.png',
    imageAlt: 'Detalle del jugador dentro del frame',
  },
]
```

## 15. Errores comunes que hay que evitar

- no repetir `id` entre cursos, unidades o lecciones
- no cambiar el `id` de un curso ya conectado sin revisar progreso, evaluaciones y rutas
- no usar `videoUrl` normal de YouTube; debe ser embed
- no dejar `imageAlt` vacío si la captura realmente importa
- no meter capturas en cualquier carpeta; usa `public/capturas/<curso>/`
- no editar al tiempo `src/datos/cursos/index.js` entre varias personas

## 16. Checklist antes de dar un curso por listo

- el curso tiene `id`, `title`, `summary`, `difficulty` y `units`
- cada unidad tiene `id`, `title`, `summary` y `lessons`
- cada lección tiene objetivo, recursos, instrucciones y reto
- el reto tiene `starterCode`, `successCriteria`, `expectedResult`, `solutionCode` y `successMessage`
- el catálogo está completo
- las evaluaciones tienen preguntas y respuestas correctas
- si hay capturas, ya están guardadas en `public/capturas/<curso>/`
- el curso ya puede conectarse a `src/datos/cursos/index.js`

## 17. Archivos clave que sí o sí debes revisar

- [plantilla del curso](/c:/Users/Usuario/Desktop/pypath/src/datos/cursos/plantilla/curso.js:1)
- [plantilla del catálogo](/c:/Users/Usuario/Desktop/pypath/src/datos/cursos/plantilla/catalogo.js:1)
- [plantilla de evaluaciones](/c:/Users/Usuario/Desktop/pypath/src/datos/cursos/plantilla/evaluaciones.js:1)
- [punto de unión de cursos](/c:/Users/Usuario/Desktop/pypath/src/datos/cursos/index.js:1)
- [guía de capturas](/c:/Users/Usuario/Desktop/pypath/public/capturas/README.md:1)

## 18. Consejo final

Si una lección te obliga a meter video, documentos, cuatro capturas y tres textos para que “encaje”, probablemente la estructura está mal pensada.

La plantilla está hecha para que uses solo lo necesario:

- si una misión necesita solo texto y reto, está bien
- si necesita video y docs, también
- si necesita capturas comparativas, usa `galeria`

La meta no es rellenar campos: la meta es que la lección se entienda bien.
