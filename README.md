# PyPath

PyPath es una plataforma web para aprender Python de forma progresiva.

La app permite:

- explorar cursos desde una home pública
- crear cuenta o iniciar sesión
- hacer un diagnóstico opcional
- avanzar por cursos y lecciones
- resolver retos con editor de código
- ver progreso
- presentar evaluaciones
- administrar contenido desde un panel interno

Este README está pensado para el equipo. La idea es que puedan:

- clonar el proyecto
- instalarlo sin enredarse
- ejecutarlo
- entender cómo funciona React aquí
- ubicarse en las carpetas
- saber qué archivos tocar y cuáles no

---

## 1. Antes de empezar

### Qué se está usando

La app está hecha principalmente con:

- React
- Vite
- React Router
- Tailwind CSS
- CodeMirror
- localStorage para guardar datos en el navegador

### Versiones importantes

No hace falta instalar estas librerías una por una.  
Están definidas en `package.json` y se instalan solas con `npm install`.

Las versiones principales hoy son:

- Node recomendado -> `20`
- React -> `19.2.5`
- React Router -> `7.14.2`
- Vite -> `8.0.10`
- Tailwind CSS -> `3.4.17`
- CodeMirror -> `4.25.9` en su wrapper de React

### Lo importante de verdad

La idea en la práctica es esta:

1. clonan el repo
2. abren la carpeta del proyecto en VS Code
3. abren una terminal ahí mismo
4. ejecutan `npm install`
5. ejecutan `npm run dev`

Y ya.

No deberían tener problemas raros porque:

- el proyecto ya trae su `package.json`
- el `package-lock.json` ayuda a mantener versiones consistentes
- no hace falta configurar nada extraño a mano

---

## 2. Instalación y ejecución

### Requisito mínimo

- tener Node.js instalado

### Recomendación

- usar Node `20`

### Cómo comprobar si Node ya está instalado

Antes de hacer nada, en una terminal pueden ejecutar:

```bash
node -v
npm -v
```

Si todo está bien, debería salir algo parecido a:

```txt
v20.x.x
10.x.x
```

Si `node` o `npm` no se reconocen, primero hay que instalar Node.js.

### Pasos

#### 1. Clonar o descargar el proyecto

```bash
git clone https://github.com/oscarrealpeb/pypath.git
cd pypath
```
#### 1.1 Revisar la rama y crear una rama propia

La base del proyecto es `main`.

Para ver en qué rama están parados:

```bash
git branch
```

La rama actual aparece con `*`.

La idea de trabajo es esta:

1. pararse en `main`
2. traer lo último de `main`
3. crear una rama propia desde ahí

Ejemplo:

```bash
git checkout main
git pull origin main
git checkout -b NombreDeTuRama
git push -u origin NombreDeTuRama
```

Ejemplos de nombres de rama:

- `OscarFase1`
- `JassonFase1`
- `GabrielaFase1`
- `MailoFase1`
- `JoseLuisFase1`

Lo importante aquí es esto:

- no trabajar directamente sobre `main`
- crear la rama propia desde `main`
- no crear ramas nuevas desde la rama personal de otra persona

#### 2. Abrir la carpeta del proyecto

La forma más cómoda es:

-> abrir VS Code  
-> `Archivo -> Abrir carpeta`  
-> seleccionar la carpeta del proyecto, idealmente `pypath`

#### 3. Abrir una terminal en esa carpeta

Lo más práctico es usar:

-> la terminal integrada de VS Code  
-> o PowerShell dentro de la carpeta del proyecto

En VS Code:

-> `Terminal -> New Terminal`

Si la carpeta está bien abierta, la terminal debería quedar ya ubicada dentro del proyecto.

Para comprobarlo, pueden ejecutar:

```bash
pwd
```

o en Windows también basta con mirar la ruta que aparece en la terminal.

Debería apuntar a algo como:

```txt
...\pypath
```

#### 4. Instalar dependencias

```bash
npm install
```

Cómo saber si funcionó:

-> la terminal termina sin errores  
-> aparece la carpeta `node_modules`  
-> se puede ejecutar el siguiente paso sin que falle

#### 5. Ejecutar en desarrollo

```bash
npm run dev
```

Luego abre la URL que te muestre Vite, normalmente:

```txt
http://localhost:5173/
```

Cómo saber si funcionó:

-> la terminal muestra que Vite levantó el servidor  
-> aparece una URL local  
-> al abrirla en el navegador se ve la app

Si quieren detener el servidor:

```bash
Ctrl + C
```

### Otros comandos útiles

Revisar lint:

```bash
npm run lint
```

Crear build:

```bash
npm run build
```

Ver el build ya compilado:

```bash
npm run preview
```

---

## 3. Cómo funciona React en este proyecto

### La idea general

Este proyecto no funciona como un sitio con muchas páginas HTML separadas.

Funciona como una app de React:

- hay un HTML base
- React se monta ahí
- luego React decide qué pantalla mostrar según la ruta y el estado

### Flujo básico

El flujo real aquí es:

`index.html` -> `src/principal.jsx` -> `src/Aplicacion.jsx` -> `src/rutas/RutasApp.jsx` -> página correspondiente

### Qué es JSX

Un archivo `.jsx` es básicamente JavaScript que también puede escribir interfaz.

O sea:

- un `.js` normal suele tener lógica pura
- un `.jsx` suele tener lógica + estructura visual

Ejemplo mental:

- `servicioAutenticacion.js` -> lógica
- `PaginaAutenticacion.jsx` -> pantalla visual + eventos + algo de lógica

### Diferencia entre `.js` y `.jsx`

#### `.js`

Se usa normalmente para:

- servicios
- utilidades
- selectores
- datos
- lógica sin interfaz

Ejemplos:

- `servicioDiagnostico.js`
- `selectoresProgreso.js`
- `almacenamiento.js`

#### `.jsx`

Se usa normalmente para:

- páginas
- componentes visuales
- layouts
- modales

Ejemplos:

- `PaginaCurso.jsx`
- `Boton.jsx`
- `Modal.jsx`

### Cómo se relacionan lógica, UI y CSS

En esta app puedes pensarlo así:

- `JS / servicios / selectores` -> hacen trabajo o resuelven reglas
- `JSX` -> pinta la pantalla y conecta botones, inputs y eventos
- `CSS` -> decide cómo se ve esa pantalla

Más simple:

- lógica -> qué debe pasar
- JSX -> qué se muestra
- CSS -> cómo se ve

### Dónde está el HTML de cada pantalla

No existe un `login.html`, `perfil.html` o `curso.html`.

El “HTML” de cada pantalla está escrito dentro de archivos `.jsx`.

Por ejemplo:

- `PaginaAutenticacion.jsx` -> estructura visual del login y registro
- `PaginaCurso.jsx` -> estructura visual del curso
- `PaginaLeccion.jsx` -> estructura visual de la lección

### Dónde está el CSS

Hay dos niveles:

- CSS global -> `src/index.css`
- clases visuales dentro de `className` en los `.jsx`

O sea:

- el diseño global vive sobre todo en `index.css`
- el layout fino de cada pantalla se arma dentro del JSX con clases

---

## 4. Cómo funciona PyPath por dentro

El flujo técnico principal es este:

1. [index.html](/c:/Users/Usuario/Desktop/pypath/index.html:1) contiene el contenedor base
2. [src/principal.jsx](/c:/Users/Usuario/Desktop/pypath/src/principal.jsx:1) arranca React
3. [src/Aplicacion.jsx](/c:/Users/Usuario/Desktop/pypath/src/Aplicacion.jsx:1) carga la app
4. [src/rutas/RutasApp.jsx](/c:/Users/Usuario/Desktop/pypath/src/rutas/RutasApp.jsx:1) decide qué pantalla abrir
5. [src/modulos/progreso/contexto/ProveedorEstadoApp.jsx](/c:/Users/Usuario/Desktop/pypath/src/modulos/progreso/contexto/ProveedorEstadoApp.jsx:1) mantiene el estado global
6. los módulos leen datos y renderizan pantallas
7. si algo cambia, React vuelve a renderizar solo lo necesario

---

## 5. Rutas principales

- `/` -> inicio público
- `/login` -> inicio de sesión
- `/register` -> registro
- `/onboarding` -> diagnóstico inicial
- `/dashboard` -> panel del estudiante
- `/profile` -> perfil
- `/course/:id` -> vista de curso
- `/lesson/:id` -> vista de lección
- `/course/:id/unit/:unitId/evaluation` -> evaluación de unidad
- `/course/:id/final-evaluation` -> evaluación final del curso
- `/control` -> acceso interno de administración
- `/admin` -> resumen del panel admin
- `/admin/contenido` -> panel de contenido
- `/admin/usuarios` -> panel de usuarios
- `/admin/metricas` -> panel de métricas

---

## 6. Estructura general del proyecto

```txt
pypath/
  dist/
  node_modules/
  public/
  src/
  .gitignore
  eslint.config.js
  index.html
  package-lock.json
  package.json
  postcss.config.js
  README.md
  tailwind.config.js
  vite.config.js
```

### Qué es cada cosa de la raíz


#### `dist/`

Versión compilada de producción.

La crea Vite con `npm run build`.

No se edita a mano.

#### `node_modules/`

Dependencias instaladas.

No se edita a mano.

#### `public/`

Archivos públicos estáticos.

Aquí conviene guardar:

- favicon
- íconos
- capturas de cursos -> `public/capturas/`

#### `src/`

Código fuente real del proyecto.

Aquí vive casi toda la app.

#### `index.html`

HTML base donde React se monta.

#### `package.json`

Scripts y dependencias.

#### `package-lock.json`

Versión exacta de lo instalado por npm.

#### `tailwind.config.js`

Configuración de Tailwind.

#### `vite.config.js`

Configuración de Vite.

#### `eslint.config.js`

Configuración del lint.

---

## 7. Estructura de `src/`

```txt
src/
  assets/
  componentes/
  datos/
  modulos/
  rutas/
  utilidades/
  Aplicacion.jsx
  index.css
  principal.jsx
```

### `src/principal.jsx`

Es el verdadero punto de arranque de React.

Hace esto:

- monta React
- monta `BrowserRouter`
- monta el proveedor global de estado

### `src/Aplicacion.jsx`

Es un componente raíz pequeño.

Su trabajo principal es cargar `RutasApp`.

### `src/index.css`

CSS global de la plataforma.

Aquí viven:

- variables visuales
- tema claro / oscuro
- estilos base
- clases compartidas del proyecto

Tócalo con cuidado, porque puede afectar toda la app.

### `src/assets/`

Reservado para recursos del frontend.

Hoy las capturas de cursos no deberían ir aquí.  
Es mejor dejarlas en `public/capturas/`.

---

## 8. `src/componentes/`

Aquí están los componentes reutilizables de toda la plataforma.

Archivos actuales:

- [BarraProgreso.jsx](/c:/Users/Usuario/Desktop/pypath/src/componentes/BarraProgreso.jsx:1)
- [Boton.jsx](/c:/Users/Usuario/Desktop/pypath/src/componentes/Boton.jsx:1)
- [EditorCodigo.jsx](/c:/Users/Usuario/Desktop/pypath/src/componentes/EditorCodigo.jsx:1)
- [IconoCurso.jsx](/c:/Users/Usuario/Desktop/pypath/src/componentes/IconoCurso.jsx:1)
- [LayoutAdministracion.jsx](/c:/Users/Usuario/Desktop/pypath/src/componentes/LayoutAdministracion.jsx:1)
- [LayoutPlataforma.jsx](/c:/Users/Usuario/Desktop/pypath/src/componentes/LayoutPlataforma.jsx:1)
- [Modal.jsx](/c:/Users/Usuario/Desktop/pypath/src/componentes/Modal.jsx:1)
- [SelectorIntereses.jsx](/c:/Users/Usuario/Desktop/pypath/src/componentes/SelectorIntereses.jsx:1)
- [SelectorTema.jsx](/c:/Users/Usuario/Desktop/pypath/src/componentes/SelectorTema.jsx:1)
- [Tarjeta.jsx](/c:/Users/Usuario/Desktop/pypath/src/componentes/Tarjeta.jsx:1)

### Qué hace cada uno

- `Boton.jsx` -> botón base reutilizable
- `Tarjeta.jsx` -> contenedor visual tipo card
- `BarraProgreso.jsx` -> barra de progreso
- `Modal.jsx` -> ventana modal reutilizable
- `EditorCodigo.jsx` -> editor con CodeMirror
- `IconoCurso.jsx` -> iconos por curso o biblioteca
- `LayoutPlataforma.jsx` -> navbar y layout del estudiante
- `LayoutAdministracion.jsx` -> navbar y layout del admin
- `SelectorTema.jsx` -> menú del tema
- `SelectorIntereses.jsx` -> selección de intereses del perfil o registro

### Cuándo tocar `componentes/`

Tócalo cuando:

- algo visual se repite en varias páginas
- quieras cambiar un componente base que afecta muchas vistas

---

## 9. `src/rutas/`

Aquí está el sistema de navegación.

Archivos:

- [RutasApp.jsx](/c:/Users/Usuario/Desktop/pypath/src/rutas/RutasApp.jsx:1)
- [RutaProtegida.jsx](/c:/Users/Usuario/Desktop/pypath/src/rutas/RutaProtegida.jsx:1)
- [RutaSoloPublica.jsx](/c:/Users/Usuario/Desktop/pypath/src/rutas/RutaSoloPublica.jsx:1)
- [RutaAdministrador.jsx](/c:/Users/Usuario/Desktop/pypath/src/rutas/RutaAdministrador.jsx:1)
- [RutaEstudiante.jsx](/c:/Users/Usuario/Desktop/pypath/src/rutas/RutaEstudiante.jsx:1)

### Qué hace cada uno

- `RutasApp.jsx` -> mapa principal de rutas
- `RutaProtegida.jsx` -> exige sesión
- `RutaSoloPublica.jsx` -> evita entrar a login/register si ya hay sesión
- `RutaAdministrador.jsx` -> permite pasar solo al admin
- `RutaEstudiante.jsx` -> protege el flujo del estudiante

### Qué no conviene tocar sin avisar

- `RutasApp.jsx`

Porque cambiarlo mal puede romper:

- navegación
- redirecciones
- permisos

---

## 10. `src/utilidades/`

Helpers genéricos.

Archivos:

- [almacenamiento.js](/c:/Users/Usuario/Desktop/pypath/src/utilidades/almacenamiento.js:1)
- [combinarClases.js](/c:/Users/Usuario/Desktop/pypath/src/utilidades/combinarClases.js:1)

### Qué hace cada uno

- `almacenamiento.js` -> ayuda a leer y guardar cosas en `localStorage`
- `combinarClases.js` -> junta clases CSS condicionales

Si un helper no pertenece a un módulo concreto, normalmente va aquí.

---

## 11. `src/datos/`

Aquí vive el contenido base del proyecto.

Archivos:

- [cursos/](/c:/Users/Usuario/Desktop/pypath/src/datos/cursos)
- [catalogoCursos.js](/c:/Users/Usuario/Desktop/pypath/src/datos/catalogoCursos.js:1)
- [cursos.js](/c:/Users/Usuario/Desktop/pypath/src/datos/cursos.js:1)
- [evaluacionesCursos.js](/c:/Users/Usuario/Desktop/pypath/src/datos/evaluacionesCursos.js:1)
- [opcionesPerfilUsuario.js](/c:/Users/Usuario/Desktop/pypath/src/datos/opcionesPerfilUsuario.js:1)
- [preguntasDiagnostico.js](/c:/Users/Usuario/Desktop/pypath/src/datos/preguntasDiagnostico.js:1)

### Qué hace cada uno

- `cursos/` -> contenido real separado por curso
- `cursos.js` -> agrega todos los cursos
- `catalogoCursos.js` -> agrega el catálogo
- `evaluacionesCursos.js` -> agrega evaluaciones
- `opcionesPerfilUsuario.js` -> roles, intereses y opciones de perfil
- `preguntasDiagnostico.js` -> banco de preguntas del diagnóstico

### `src/datos/cursos/`

Esta es una de las carpetas más importantes para el equipo.

Cada curso vive en su propia carpeta:

```txt
src/datos/cursos/fundamentosPython/
  curso.js
  catalogo.js
  evaluaciones.js
  index.js
```

### Regla importante

Cada persona debería trabajar dentro de la carpeta de su curso.

Ejemplo:

- alguien hace `pyside6/`
- otra persona hace `pygame/`
- otra persona hace `pandasFinanzas/`

### Archivo sensible aquí

- [src/datos/cursos/index.js](/c:/Users/Usuario/Desktop/pypath/src/datos/cursos/index.js:1)

Ese archivo conecta cursos con toda la app.

Si varias personas lo editan al tiempo, es muy fácil que haya conflictos en Git.

### Guías útiles

- [README de cursos](/c:/Users/Usuario/Desktop/pypath/src/datos/cursos/README.md:1)
- [README de capturas](/c:/Users/Usuario/Desktop/pypath/public/capturas/README.md:1)

---

## 12. `src/modulos/`

Aquí está la app dividida por funcionalidad.

Módulos actuales:

- `administracion`
- `autenticacion`
- `contenido`
- `cursos`
- `diagnostico`
- `evaluaciones`
- `inicio`
- `lecciones`
- `perfil`
- `progreso`
- `retos`

En general:

- `paginas/` -> pantallas completas
- `componentes/` -> piezas internas del módulo
- `servicios/` -> lógica operativa
- `selectores/` -> funciones que leen datos y devuelven respuestas derivadas
- `contexto/` -> estado compartido importante

### 12.1 `modulos/inicio`

Archivos principales:

- [PaginaInicio.jsx](/c:/Users/Usuario/Desktop/pypath/src/modulos/inicio/paginas/PaginaInicio.jsx:1)
- [VisualPrincipal.jsx](/c:/Users/Usuario/Desktop/pypath/src/modulos/inicio/componentes/VisualPrincipal.jsx:1)
- [DialogoAcceso.jsx](/c:/Users/Usuario/Desktop/pypath/src/modulos/inicio/componentes/DialogoAcceso.jsx:1)
- [DialogoVistaCurso.jsx](/c:/Users/Usuario/Desktop/pypath/src/modulos/inicio/componentes/DialogoVistaCurso.jsx:1)
- [servicioRecomendacionCursos.js](/c:/Users/Usuario/Desktop/pypath/src/modulos/inicio/servicios/servicioRecomendacionCursos.js:1)

Qué hace:

- home pública
- catálogo
- recomendador inicial
- diálogos de acceso y vista previa

### 12.2 `modulos/autenticacion`

Archivos principales:

- [PaginaAutenticacion.jsx](/c:/Users/Usuario/Desktop/pypath/src/modulos/autenticacion/paginas/PaginaAutenticacion.jsx:1)
- [servicioAutenticacion.js](/c:/Users/Usuario/Desktop/pypath/src/modulos/autenticacion/servicios/servicioAutenticacion.js:1)

Qué hace:

- login
- registro
- validación local de acceso

### 12.3 `modulos/diagnostico`

Archivos principales:

- [PaginaDiagnostico.jsx](/c:/Users/Usuario/Desktop/pypath/src/modulos/diagnostico/paginas/PaginaDiagnostico.jsx:1)
- [CuestionarioDiagnostico.jsx](/c:/Users/Usuario/Desktop/pypath/src/modulos/diagnostico/componentes/CuestionarioDiagnostico.jsx:1)
- [servicioDiagnostico.js](/c:/Users/Usuario/Desktop/pypath/src/modulos/diagnostico/servicios/servicioDiagnostico.js:1)

Qué hace:

- crea el intento del diagnóstico
- controla tiempo y respuestas
- calcula resultado y recomendación

### 12.4 `modulos/cursos`

Archivos principales:

- [PaginaPanel.jsx](/c:/Users/Usuario/Desktop/pypath/src/modulos/cursos/paginas/PaginaPanel.jsx:1)
- [PaginaCurso.jsx](/c:/Users/Usuario/Desktop/pypath/src/modulos/cursos/paginas/PaginaCurso.jsx:1)
- [TarjetaCurso.jsx](/c:/Users/Usuario/Desktop/pypath/src/modulos/cursos/componentes/TarjetaCurso.jsx:1)
- [TarjetaUnidad.jsx](/c:/Users/Usuario/Desktop/pypath/src/modulos/cursos/componentes/TarjetaUnidad.jsx:1)
- [selectoresCursos.js](/c:/Users/Usuario/Desktop/pypath/src/modulos/cursos/selectores/selectoresCursos.js:1)

Qué hace:

- panel del estudiante
- vista general del curso
- tarjetas de curso y unidad

### 12.5 `modulos/lecciones`

Archivo principal:

- [PaginaLeccion.jsx](/c:/Users/Usuario/Desktop/pypath/src/modulos/lecciones/paginas/PaginaLeccion.jsx:1)

Qué hace:

- muestra la lección
- renderiza video, docs, capturas, ejemplo, instrucciones y reto

### 12.6 `modulos/retos`

Archivos principales:

- [EspacioReto.jsx](/c:/Users/Usuario/Desktop/pypath/src/modulos/retos/componentes/EspacioReto.jsx:1)
- [servicioEjecucionPython.js](/c:/Users/Usuario/Desktop/pypath/src/modulos/retos/servicios/servicioEjecucionPython.js:1)
- [servicioRuntimePython.js](/c:/Users/Usuario/Desktop/pypath/src/modulos/retos/servicios/servicioRuntimePython.js:1)
- [servicioValidacionReto.js](/c:/Users/Usuario/Desktop/pypath/src/modulos/retos/servicios/servicioValidacionReto.js:1)

Qué hace:

- editor
- ejecutar
- validar
- mostrar salida
- mostrar solución

### 12.7 `modulos/evaluaciones`

Archivos principales:

- [PaginaEvaluacion.jsx](/c:/Users/Usuario/Desktop/pypath/src/modulos/evaluaciones/paginas/PaginaEvaluacion.jsx:1)
- [selectoresEvaluaciones.js](/c:/Users/Usuario/Desktop/pypath/src/modulos/evaluaciones/selectores/selectoresEvaluaciones.js:1)
- [servicioPuntajeEvaluacion.js](/c:/Users/Usuario/Desktop/pypath/src/modulos/evaluaciones/servicios/servicioPuntajeEvaluacion.js:1)

Qué hace:

- evaluaciones de unidad
- evaluación final
- cálculo de resultados

### 12.8 `modulos/perfil`

Archivos principales:

- [PaginaPerfil.jsx](/c:/Users/Usuario/Desktop/pypath/src/modulos/perfil/paginas/PaginaPerfil.jsx:1)
- [servicioResumenPerfil.js](/c:/Users/Usuario/Desktop/pypath/src/modulos/perfil/servicios/servicioResumenPerfil.js:1)

Qué hace:

- perfil del usuario
- resumen de progreso

### 12.9 `modulos/progreso`

Archivos principales:

- [ContextosEstadoApp.js](/c:/Users/Usuario/Desktop/pypath/src/modulos/progreso/contexto/ContextosEstadoApp.js:1)
- [ProveedorEstadoApp.jsx](/c:/Users/Usuario/Desktop/pypath/src/modulos/progreso/contexto/ProveedorEstadoApp.jsx:1)
- [useEstadoApp.js](/c:/Users/Usuario/Desktop/pypath/src/modulos/progreso/contexto/useEstadoApp.js:1)
- [selectoresProgreso.js](/c:/Users/Usuario/Desktop/pypath/src/modulos/progreso/selectores/selectoresProgreso.js:1)
- [servicioEstadoApp.js](/c:/Users/Usuario/Desktop/pypath/src/modulos/progreso/servicios/servicioEstadoApp.js:1)

Qué hace:

- estado global
- guardado en localStorage
- progreso del usuario
- desbloqueos
- tema
- diagnóstico

Este es uno de los módulos más sensibles del proyecto.

### 12.10 `modulos/administracion`

Archivos principales:

- [PaginaAdminInicio.jsx](/c:/Users/Usuario/Desktop/pypath/src/modulos/administracion/paginas/PaginaAdminInicio.jsx:1)
- [PaginaAdminContenido.jsx](/c:/Users/Usuario/Desktop/pypath/src/modulos/administracion/paginas/PaginaAdminContenido.jsx:1)
- [PaginaAdminUsuarios.jsx](/c:/Users/Usuario/Desktop/pypath/src/modulos/administracion/paginas/PaginaAdminUsuarios.jsx:1)
- [PaginaAdminMetricas.jsx](/c:/Users/Usuario/Desktop/pypath/src/modulos/administracion/paginas/PaginaAdminMetricas.jsx:1)
- [selectoresAdmin.js](/c:/Users/Usuario/Desktop/pypath/src/modulos/administracion/selectores/selectoresAdmin.js:1)
- [servicioAdminContenido.js](/c:/Users/Usuario/Desktop/pypath/src/modulos/administracion/servicios/servicioAdminContenido.js:1)

Qué hace:

- panel admin
- contenido
- usuarios
- métricas

### Qué significa CMS

`CMS` significa `Content Management System`.

En palabras simples:

-> es un panel para crear, editar y publicar contenido sin tener que tocar directamente los archivos del código

En PyPath, cuando hablamos del CMS de contenido, hablamos sobre todo de:

- [PaginaAdminContenido.jsx](/c:/Users/Usuario/Desktop/pypath/src/modulos/administracion/paginas/PaginaAdminContenido.jsx:1)
- [servicioAdminContenido.js](/c:/Users/Usuario/Desktop/pypath/src/modulos/administracion/servicios/servicioAdminContenido.js:1)

### 12.11 `modulos/contenido`

Archivo principal:

- [repositorioContenido.js](/c:/Users/Usuario/Desktop/pypath/src/modulos/contenido/servicios/repositorioContenido.js:1)

Qué hace:

-> expone el contenido vivo de cursos, catálogo y evaluaciones

También es un archivo sensible.

---

## 13. Qué no tocar nunca o casi nunca

### No tocar manualmente

- `node_modules/`
- `dist/`
- `.codex-temp/`

### Tocar solo si sabes bien por qué

- [index.html](/c:/Users/Usuario/Desktop/pypath/index.html:1)
- [src/index.css](/c:/Users/Usuario/Desktop/pypath/src/index.css:1)
- [src/rutas/RutasApp.jsx](/c:/Users/Usuario/Desktop/pypath/src/rutas/RutasApp.jsx:1)
- [src/modulos/progreso/contexto/ProveedorEstadoApp.jsx](/c:/Users/Usuario/Desktop/pypath/src/modulos/progreso/contexto/ProveedorEstadoApp.jsx:1)
- [src/modulos/progreso/servicios/servicioEstadoApp.js](/c:/Users/Usuario/Desktop/pypath/src/modulos/progreso/servicios/servicioEstadoApp.js:1)
- [src/modulos/contenido/servicios/repositorioContenido.js](/c:/Users/Usuario/Desktop/pypath/src/modulos/contenido/servicios/repositorioContenido.js:1)
- [src/datos/cursos/index.js](/c:/Users/Usuario/Desktop/pypath/src/datos/cursos/index.js:1)
- [package.json](/c:/Users/Usuario/Desktop/pypath/package.json:1)
- [package-lock.json](/c:/Users/Usuario/Desktop/pypath/package-lock.json:1)

---

## 14. Qué tocar según la tarea

### Si te toca login o registro

- `src/modulos/autenticacion/`
- quizá `src/componentes/SelectorIntereses.jsx`

### Si te toca perfil

- `src/modulos/perfil/`
- quizá `src/modulos/progreso/`

### Si te toca diagnóstico

- `src/modulos/diagnostico/`
- `src/datos/preguntasDiagnostico.js`

### Si te toca un curso

- `src/datos/cursos/<tuCurso>/`
- y solo al final `src/datos/cursos/index.js`

### Si te toca retos o editor

- `src/modulos/retos/`
- `src/componentes/EditorCodigo.jsx`

### Si te toca administración

- `src/modulos/administracion/`

### Si te toca apariencia general

- `src/componentes/`
- `src/index.css`

---

## 15. Convenciones importantes

- los cursos se trabajan por carpeta
- las capturas van en `public/capturas/<curso>/`
- los `id` no deben duplicarse
- las reglas de desbloqueo deberían vivir en `selectoresProgreso.js`
- si una pieza visual se repite mucho, debería convertirse en componente

---

## 16. Estado actual del proyecto

Hoy el proyecto ya está en un punto bastante bueno para trabajo en equipo.

Lo fuerte ahora mismo:

- estructura por módulos
- cursos separados por carpeta
- flujo base del estudiante
- diagnóstico funcional
- retos con editor
- evaluaciones
- panel admin funcional
- tema claro / oscuro / sistema

Lo más sensible todavía:

- integración final de cursos nuevos
- progreso global
- rutas y guards
- archivos centrales del estado y del contenido

---

## 17. Orden recomendado para ubicarse rápido

Al empezar con el repo, conviene leer en este orden:

1. este `README`
2. [src/rutas/RutasApp.jsx](/c:/Users/Usuario/Desktop/pypath/src/rutas/RutasApp.jsx:1)
3. [src/datos/cursos/README.md](/c:/Users/Usuario/Desktop/pypath/src/datos/cursos/README.md:1)
4. la carpeta del módulo o curso que le toque

Con eso ya debería ubicarse bastante bien sin perderse.
