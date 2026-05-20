import fs from 'node:fs'
import path from 'node:path'

function printUsage() {
  console.log(`Uso:
  node scripts/inspect-content-backup.mjs <ruta-backup-json>

Acepta:
  - un backup completo de localStorage (pypath-app-state)
  - o un JSON que ya contenga solo el objeto content
`)
}

function resolveInput(filePath) {
  if (!filePath || filePath === '--help' || filePath === '-h') {
    printUsage()
    process.exit(filePath ? 0 : 1)
  }

  const absolutePath = path.resolve(process.cwd(), filePath)

  if (!fs.existsSync(absolutePath)) {
    console.error(`No encontramos el archivo: ${absolutePath}`)
    process.exit(1)
  }

  return absolutePath
}

function loadJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch (error) {
    console.error(`No pudimos leer el JSON de ${filePath}`)
    console.error(error instanceof Error ? error.message : String(error))
    process.exit(1)
  }
}

function extractContent(payload) {
  if (payload?.content && typeof payload.content === 'object') {
    return payload.content
  }

  if (payload?.cursos && payload?.catalogoCursos) {
    return payload
  }

  console.error(
    'El archivo no parece ser un backup válido de PyPath. Esperábamos un objeto con content o con cursos/catalogoCursos.',
  )
  process.exit(1)
}

function countLessons(course) {
  return (course?.units ?? []).reduce(
    (total, unit) => total + (Array.isArray(unit?.lessons) ? unit.lessons.length : 0),
    0,
  )
}

function summarizeCourses(courses = []) {
  return courses.map((course) => ({
    id: course.id,
    title: course.title,
    units: Array.isArray(course.units) ? course.units.length : 0,
    lessons: countLessons(course),
  }))
}

const inputPath = resolveInput(process.argv[2])
const payload = loadJson(inputPath)
const content = extractContent(payload)
const courseSummary = summarizeCourses(content.cursos ?? [])

console.log(`Archivo: ${inputPath}`)
console.log(`Cursos visibles: ${courseSummary.length}`)
console.log(`Catálogo visible: ${(content.catalogoCursos ?? []).length}`)
console.log(
  `Evaluaciones visibles: ${Object.keys(content.evaluacionesCursos ?? {}).length}`,
)
console.log(
  `Cursos gestionados por CMS: ${(content.cursosGestionadosCms ?? []).join(', ') || '(ninguno)'}`,
)
console.log(
  `Catálogos gestionados por CMS: ${(content.catalogosGestionadosCms ?? []).join(', ') || '(ninguno)'}`,
)
console.log(
  `Evaluaciones gestionadas por CMS: ${(content.evaluacionesGestionadasCms ?? []).join(', ') || '(ninguno)'}`,
)
console.log(
  `Cursos eliminados por CMS: ${(content.cursosEliminadosCms ?? []).join(', ') || '(ninguno)'}`,
)
console.log('\nResumen de cursos:')

for (const course of courseSummary) {
  console.log(`- ${course.id}: ${course.title} | unidades=${course.units} | lecciones=${course.lessons}`)
}
