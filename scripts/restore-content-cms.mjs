import fs from 'node:fs'
import path from 'node:path'
import { cert, initializeApp } from '../functions/node_modules/firebase-admin/lib/app/index.js'
import { FieldValue, getFirestore } from '../functions/node_modules/firebase-admin/lib/firestore/index.js'
import {
  normalizarContenidoPersistido,
  serializarContenidoPersistible,
} from '../src/modulos/contenido/servicios/servicioContenidoFirebase.js'

function printUsage() {
  console.log(`Uso:
  node scripts/restore-content-cms.mjs --backup <backup-json> --service-account <service-account-json>

Ejemplo:
  node scripts/restore-content-cms.mjs --backup .\\backups\\pypath-app-state.json --service-account .\\keys\\firebase-admin.json

Acepta:
  - un backup completo de localStorage (pypath-app-state)
  - o un JSON que ya contenga solo el objeto content
`)
}

function parseArgs(argv) {
  const args = { backup: '', serviceAccount: '' }

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index]
    const next = argv[index + 1]

    if (current === '--backup') {
      args.backup = next ?? ''
      index += 1
      continue
    }

    if (current === '--service-account') {
      args.serviceAccount = next ?? ''
      index += 1
      continue
    }

    if (current === '--help' || current === '-h') {
      printUsage()
      process.exit(0)
    }
  }

  if (!args.backup || !args.serviceAccount) {
    printUsage()
    process.exit(1)
  }

  return {
    backup: path.resolve(process.cwd(), args.backup),
    serviceAccount: path.resolve(process.cwd(), args.serviceAccount),
  }
}

function readJson(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`No encontramos el archivo: ${filePath}`)
    process.exit(1)
  }

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
    'El archivo de backup no parece ser válido. Esperábamos un objeto con content o con cursos/catalogoCursos.',
  )
  process.exit(1)
}

function countLessons(course) {
  return (course?.units ?? []).reduce(
    (total, unit) => total + (Array.isArray(unit?.lessons) ? unit.lessons.length : 0),
    0,
  )
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const backupPayload = readJson(args.backup)
  const serviceAccount = readJson(args.serviceAccount)
  const rawContent = extractContent(backupPayload)
  const normalizedContent = normalizarContenidoPersistido(rawContent)
  const persistedContent = serializarContenidoPersistible(normalizedContent)

  const app = initializeApp({
    credential: cert(serviceAccount),
    projectId: serviceAccount.project_id,
  })
  const db = getFirestore(app)

  await db.collection('platform').doc('content-cms').set(
    {
      content: persistedContent,
      updatedAt: FieldValue.serverTimestamp(),
      updatedBy: {
        id: 'migration-script',
        email: 'local-migration@pypath.dev',
        name: 'Migración local PyPath',
      },
    },
    { merge: true },
  )

  console.log(`Restauración completada en el proyecto: ${serviceAccount.project_id}`)
  console.log(`Cursos visibles: ${(normalizedContent.cursos ?? []).length}`)
  console.log(
    `Cursos gestionados por CMS: ${(normalizedContent.cursosGestionadosCms ?? []).join(', ') || '(ninguno)'}`,
  )
  console.log(
    `Catálogos gestionados por CMS: ${(normalizedContent.catalogosGestionadosCms ?? []).join(', ') || '(ninguno)'}`,
  )
  console.log(
    `Evaluaciones gestionadas por CMS: ${(normalizedContent.evaluacionesGestionadasCms ?? []).join(', ') || '(ninguno)'}`,
  )

  for (const course of normalizedContent.cursos ?? []) {
    console.log(
      `- ${course.id}: ${course.title} | unidades=${course.units?.length ?? 0} | lecciones=${countLessons(course)}`,
    )
  }
}

main().catch((error) => {
  console.error('No pudimos restaurar el content-cms en Firestore.')
  console.error(error instanceof Error ? error.stack ?? error.message : String(error))
  process.exit(1)
})
