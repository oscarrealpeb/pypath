import fs from 'node:fs'
import path from 'node:path'
import { cert, initializeApp } from '../functions/node_modules/firebase-admin/lib/app/index.js'
import { getAuth } from '../functions/node_modules/firebase-admin/lib/auth/index.js'
import { getFirestore } from '../functions/node_modules/firebase-admin/lib/firestore/index.js'
import {
  crearNombreCompleto,
  normalizarCorreo,
  normalizarNickname,
  normalizarNombreVisible,
  normalizarNombreVisibleLegacy,
} from '../src/modulos/autenticacion/servicios/servicioValidacionAutenticacion.js'

const USERS_COLLECTION = 'users'
const EMAIL_INDEX_COLLECTION = 'emailIndex'
const DISPLAY_NAME_INDEX_COLLECTION = 'displayNameIndex'
const NICKNAME_INDEX_COLLECTION = 'nicknameIndex'
const PLATFORM_ACTIVITY_COLLECTION = 'platformActivity'
const BOOTSTRAP_ADMIN_EMAIL = 'admin@pypath.com'
const DEFAULT_HOURS = 24
const PAGE_SIZE = 1000
const BATCH_DELETE_LIMIT = 400

function printUsage() {
  console.log(`Uso:
  node scripts/cleanup-unverified-users.mjs --service-account <service-account-json> [--hours 24] [--dry-run]

Ejemplos:
  node scripts/cleanup-unverified-users.mjs --service-account .\\keys\\firebase-admin.json --hours 24 --dry-run
  node scripts/cleanup-unverified-users.mjs --service-account .\\keys\\firebase-admin.json --hours 24

Qué hace:
  - revisa usuarios de Firebase Auth
  - detecta cuentas email/password no verificadas con más de N horas
  - borra su rastro en Firestore (users, índices y platformActivity)
  - borra la cuenta en Firebase Auth

Notas:
  - --dry-run no borra nada; solo muestra qué cuentas cumplen la regla
  - excluye admin@pypath.com
  - excluye cuentas Google o cuentas con proveedores mezclados
`)
}

function parseArgs(argv) {
  const args = {
    serviceAccount: '',
    hours: DEFAULT_HOURS,
    dryRun: false,
  }

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index]
    const next = argv[index + 1]

    if (current === '--service-account') {
      args.serviceAccount = next ?? ''
      index += 1
      continue
    }

    if (current === '--hours') {
      args.hours = Number(next ?? DEFAULT_HOURS)
      index += 1
      continue
    }

    if (current === '--dry-run') {
      args.dryRun = true
      continue
    }

    if (current === '--help' || current === '-h') {
      printUsage()
      process.exit(0)
    }
  }

  if (!args.serviceAccount || !Number.isFinite(args.hours) || args.hours <= 0) {
    printUsage()
    process.exit(1)
  }

  return {
    serviceAccount: path.resolve(process.cwd(), args.serviceAccount),
    hours: args.hours,
    dryRun: args.dryRun,
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

function isPasswordOnlyUser(userRecord) {
  const providerIds = (userRecord.providerData ?? [])
    .map((provider) => provider?.providerId)
    .filter(Boolean)

  return providerIds.length > 0 && providerIds.every((providerId) => providerId === 'password')
}

function getCreationTimeMs(userRecord) {
  const creationTime = userRecord?.metadata?.creationTime
  const timestamp = creationTime ? new Date(creationTime).getTime() : Number.NaN
  return Number.isFinite(timestamp) ? timestamp : Number.NaN
}

function formatLocalDate(value) {
  if (!value) {
    return '(sin fecha)'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toISOString()
}

function getUserAgeHours(userRecord, nowMs) {
  const creationMs = getCreationTimeMs(userRecord)

  if (!Number.isFinite(creationMs)) {
    return Number.NaN
  }

  return (nowMs - creationMs) / (1000 * 60 * 60)
}

function buildDisplayNameKeys(name) {
  const exact = normalizarNombreVisible(name)
  const legacy = normalizarNombreVisibleLegacy(name)

  return {
    exact,
    legacy: legacy && legacy !== exact ? legacy : '',
  }
}

function classifyUser(userRecord, nowMs, minHours) {
  const emailNormalized = normalizarCorreo(userRecord.email ?? '')

  if (!emailNormalized) {
    return { eligible: false, reason: 'missing_email' }
  }

  if (emailNormalized === normalizarCorreo(BOOTSTRAP_ADMIN_EMAIL)) {
    return { eligible: false, reason: 'bootstrap_admin' }
  }

  if (userRecord.emailVerified) {
    return { eligible: false, reason: 'already_verified' }
  }

  if (!isPasswordOnlyUser(userRecord)) {
    return { eligible: false, reason: 'non_password_provider' }
  }

  const ageHours = getUserAgeHours(userRecord, nowMs)

  if (!Number.isFinite(ageHours)) {
    return { eligible: false, reason: 'missing_creation_time' }
  }

  if (ageHours < minHours) {
    return { eligible: false, reason: 'too_recent' }
  }

  return {
    eligible: true,
    reason: 'eligible',
    ageHours,
  }
}

async function collectActivityRefs(db, userId) {
  const activityCollection = db.collection(PLATFORM_ACTIVITY_COLLECTION)
  const [actorSnapshot, targetSnapshot] = await Promise.all([
    activityCollection.where('userId', '==', userId).get(),
    activityCollection.where('targetUserId', '==', userId).get(),
  ])

  const refsByPath = new Map()

  for (const snapshot of [actorSnapshot, targetSnapshot]) {
    snapshot.docs.forEach((docSnapshot) => {
      refsByPath.set(docSnapshot.ref.path, docSnapshot.ref)
    })
  }

  return Array.from(refsByPath.values())
}

async function collectUserRefs(db, userRecord) {
  const refsByPath = new Map()
  const userRef = db.collection(USERS_COLLECTION).doc(userRecord.uid)
  const userSnapshot = await userRef.get()
  const profile = userSnapshot.exists ? userSnapshot.data() ?? {} : {}

  refsByPath.set(userRef.path, userRef)

  const emailNormalized = normalizarCorreo(profile.email ?? userRecord.email ?? '')
  const profileName = profile.name ?? userRecord.displayName ?? ''
  const nameNormalized = profile.nameNormalized ?? normalizarNombreVisible(profileName)
  const nicknameNormalized = profile.nicknameNormalized ?? normalizarNickname(profile.nickname ?? '')
  const { exact: exactNameNormalized, legacy: legacyNameNormalized } =
    buildDisplayNameKeys(profileName)

  if (emailNormalized) {
    const emailRef = db.collection(EMAIL_INDEX_COLLECTION).doc(emailNormalized)
    refsByPath.set(emailRef.path, emailRef)
  }

  if (nameNormalized) {
    const nameRef = db.collection(DISPLAY_NAME_INDEX_COLLECTION).doc(nameNormalized)
    refsByPath.set(nameRef.path, nameRef)
  }

  if (exactNameNormalized && exactNameNormalized !== nameNormalized) {
    const exactNameRef = db.collection(DISPLAY_NAME_INDEX_COLLECTION).doc(exactNameNormalized)
    refsByPath.set(exactNameRef.path, exactNameRef)
  }

  if (legacyNameNormalized && legacyNameNormalized !== nameNormalized) {
    const legacyNameRef = db.collection(DISPLAY_NAME_INDEX_COLLECTION).doc(legacyNameNormalized)
    refsByPath.set(legacyNameRef.path, legacyNameRef)
  }

  if (nicknameNormalized) {
    const nicknameRef = db.collection(NICKNAME_INDEX_COLLECTION).doc(nicknameNormalized)
    refsByPath.set(nicknameRef.path, nicknameRef)
  }

  const activityRefs = await collectActivityRefs(db, userRecord.uid)
  activityRefs.forEach((ref) => {
    refsByPath.set(ref.path, ref)
  })

  return {
    profile,
    refs: Array.from(refsByPath.values()),
    activityCount: activityRefs.length,
  }
}

async function deleteRefsInBatches(db, refs) {
  for (let index = 0; index < refs.length; index += BATCH_DELETE_LIMIT) {
    const chunk = refs.slice(index, index + BATCH_DELETE_LIMIT)
    const batch = db.batch()
    chunk.forEach((ref) => batch.delete(ref))
    await batch.commit()
  }
}

function buildUserLabel(userRecord, profile = {}) {
  return {
    uid: userRecord.uid,
    email: normalizarCorreo(profile.email ?? userRecord.email ?? ''),
    name: crearNombreCompleto(profile.name ?? userRecord.displayName ?? ''),
    createdAt: formatLocalDate(userRecord.metadata?.creationTime),
  }
}

async function deleteCandidate(auth, db, userRecord) {
  const { profile, refs, activityCount } = await collectUserRefs(db, userRecord)

  await deleteRefsInBatches(db, refs)
  await auth.deleteUser(userRecord.uid)

  return {
    ...buildUserLabel(userRecord, profile),
    refsDeleted: refs.length,
    activityDeleted: activityCount,
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const serviceAccount = readJson(args.serviceAccount)
  const app = initializeApp({
    credential: cert(serviceAccount),
    projectId: serviceAccount.project_id,
  })
  const auth = getAuth(app)
  const db = getFirestore(app)
  const nowMs = Date.now()
  const summary = {
    scanned: 0,
    eligible: 0,
    deleted: 0,
    failed: 0,
    skipped: {
      already_verified: 0,
      bootstrap_admin: 0,
      missing_creation_time: 0,
      missing_email: 0,
      non_password_provider: 0,
      too_recent: 0,
    },
  }
  const candidates = []
  let nextPageToken = undefined

  console.log(
    `${args.dryRun ? '[DRY RUN]' : '[LIVE]'} Limpieza manual de cuentas no verificadas > ${args.hours}h`,
  )
  console.log(`Proyecto: ${serviceAccount.project_id}`)

  do {
    const page = await auth.listUsers(PAGE_SIZE, nextPageToken)

    for (const userRecord of page.users) {
      summary.scanned += 1
      const decision = classifyUser(userRecord, nowMs, args.hours)

      if (!decision.eligible) {
        summary.skipped[decision.reason] += 1
        continue
      }

      summary.eligible += 1
      const ageHoursRounded = Number(decision.ageHours.toFixed(2))

      if (args.dryRun) {
        candidates.push({
          ...buildUserLabel(userRecord),
          ageHours: ageHoursRounded,
        })
        continue
      }

      try {
        const deletedUser = await deleteCandidate(auth, db, userRecord)
        summary.deleted += 1
        console.log(
          `Eliminada: ${deletedUser.email} | uid=${deletedUser.uid} | refs=${deletedUser.refsDeleted} | actividad=${deletedUser.activityDeleted} | edad=${ageHoursRounded}h`,
        )
      } catch (error) {
        summary.failed += 1
        console.error(
          `Falló la limpieza de ${userRecord.email ?? userRecord.uid}: ${
            error instanceof Error ? error.message : String(error)
          }`,
        )
      }
    }

    nextPageToken = page.pageToken
  } while (nextPageToken)

  if (args.dryRun) {
    if (candidates.length === 0) {
      console.log('No encontramos cuentas candidatas para borrar.')
    } else {
      console.log('Cuentas candidatas:')
      candidates.forEach((candidate) => {
        console.log(
          `- ${candidate.email} | uid=${candidate.uid} | creada=${candidate.createdAt} | edad=${candidate.ageHours}h`,
        )
      })
    }
  }

  console.log('')
  console.log('Resumen:')
  console.log(`- Revisadas: ${summary.scanned}`)
  console.log(`- Candidatas: ${summary.eligible}`)
  console.log(`- Eliminadas: ${summary.deleted}`)
  console.log(`- Fallidas: ${summary.failed}`)
  console.log(`- Saltadas verificadas: ${summary.skipped.already_verified}`)
  console.log(`- Saltadas admin: ${summary.skipped.bootstrap_admin}`)
  console.log(`- Saltadas Google/mixtas: ${summary.skipped.non_password_provider}`)
  console.log(`- Saltadas recientes: ${summary.skipped.too_recent}`)
  console.log(`- Saltadas sin correo: ${summary.skipped.missing_email}`)
  console.log(`- Saltadas sin fecha: ${summary.skipped.missing_creation_time}`)
}

main().catch((error) => {
  console.error('No pudimos completar la limpieza manual de cuentas no verificadas.')
  console.error(error instanceof Error ? error.stack ?? error.message : String(error))
  process.exit(1)
})
