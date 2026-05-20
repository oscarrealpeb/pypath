import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  runTransaction,
  setDoc,
  where,
  writeBatch,
} from 'firebase/firestore'
import { sanearSeleccionIntereses } from '../../../datos/opcionesPerfilUsuario.js'
import {
  construirEstadoUsuarioDesdePerfil,
  crearEstadoDiagnosticoInicial,
  crearProgresoInicial,
  normalizarEstadoDiagnostico,
  normalizarProgreso,
} from '../../progreso/servicios/estadoUsuarioBase.js'
import {
  asegurarFirebaseConfigurado,
  esCorreoAdminPrivilegiado,
  firebaseDb,
} from './clienteFirebase.js'
import {
  crearNombreCompleto,
  normalizarCorreo,
  normalizarNickname,
  normalizarNombreVisible,
  normalizarNombreVisibleLegacy,
  validarNickname,
} from './servicioValidacionAutenticacion.js'

const USERS_COLLECTION = 'users'
const EMAIL_INDEX_COLLECTION = 'emailIndex'
const DISPLAY_NAME_INDEX_COLLECTION = 'displayNameIndex'
const NICKNAME_INDEX_COLLECTION = 'nicknameIndex'
const PLATFORM_ACTIVITY_COLLECTION = 'platformActivity'
const AUTO_ASSIGNED_NAME_PREFIX = 'aprendiz'
const MAX_AUTO_ASSIGNED_NAME_ATTEMPTS = 100000
const BATCH_DELETE_LIMIT = 400

function obtenerProviderId(authUser) {
  return authUser?.providerData?.[0]?.providerId ?? authUser?.providerId ?? 'password'
}

function normalizarProvider(providerId) {
  return providerId === 'google.com' ? 'google' : 'email'
}

function obtenerNombrePerfil(authUser, currentProfile, profileSeed = {}) {
  const fallbackEmail = normalizarCorreo(authUser?.email ?? currentProfile?.email ?? '')
  const fallbackUid = (authUser?.uid ?? currentProfile?.id ?? '').toString().slice(0, 6).toLowerCase()
  const bootstrapAdminName =
    esCorreoAdminPrivilegiado(fallbackEmail) && fallbackUid
      ? `admin.${fallbackUid}`
      : ''

  return (
    profileSeed.name?.trim() ||
    currentProfile?.name ||
    authUser?.displayName ||
    bootstrapAdminName ||
    fallbackEmail.split('@')[0] ||
    'Operador'
  )
}

async function generarNombreVisiblePredeterminado(transaction, userId) {
  for (let attempt = 1; attempt <= MAX_AUTO_ASSIGNED_NAME_ATTEMPTS; attempt += 1) {
    const candidate = `${AUTO_ASSIGNED_NAME_PREFIX}${attempt}`
    const { exact, legacy } = construirClavesNombreVisible(candidate)
    const exactSnapshot = await transaction.get(obtenerReferenciaNombreVisible(exact))
    const legacySnapshot =
      legacy && legacy !== exact
        ? await transaction.get(obtenerReferenciaNombreVisible(legacy))
        : null

    const isTakenByExactMatch =
      (exactSnapshot?.exists() && exactSnapshot.data().userId !== userId) ||
      (legacySnapshot?.exists() &&
        legacySnapshot.data().userId !== userId &&
        coincideNombreVisibleExacto(legacySnapshot.data(), candidate))

    if (!isTakenByExactMatch) {
      return candidate
    }
  }

  throw new Error(
    'No pudimos reservar un nombre de usuario automático en este momento. Intenta de nuevo.',
  )
}

async function resolverNombrePerfil(transaction, authUser, currentProfile = {}, profileSeed = {}) {
  const provider = normalizarProvider(obtenerProviderId(authUser))
  const currentName = crearNombreCompleto(currentProfile.name ?? '')

  if (provider === 'google' && !currentName) {
    const generatedName = await generarNombreVisiblePredeterminado(transaction, authUser.uid)

    return {
      name: generatedName,
      nameAutoAssigned: true,
    }
  }

  return {
    name: crearNombreCompleto(obtenerNombrePerfil(authUser, currentProfile, profileSeed)),
    nameAutoAssigned: currentProfile.nameAutoAssigned ?? false,
  }
}

async function construirPerfilBase(transaction, authUser, currentProfile = {}, profileSeed = {}) {
  const email = normalizarCorreo(authUser?.email ?? currentProfile.email ?? '')
  const { name, nameAutoAssigned } = await resolverNombrePerfil(
    transaction,
    authUser,
    currentProfile,
    profileSeed,
  )
  const nickname = (profileSeed.nickname ?? currentProfile.nickname ?? '').trim()
  const provider = normalizarProvider(obtenerProviderId(authUser))
  const createdAt = currentProfile.createdAt ?? profileSeed.createdAt ?? new Date().toISOString()
  const onboarding = normalizarEstadoDiagnostico(
    currentProfile.onboarding ?? profileSeed.onboarding ?? crearEstadoDiagnosticoInicial(),
  )
  const progress = normalizarProgreso(
    currentProfile.progress ?? profileSeed.progress ?? crearProgresoInicial(),
  )

  return {
    id: authUser.uid,
    email,
    name,
    nameNormalized: normalizarNombreVisible(name),
    nameAutoAssigned,
    nickname,
    nicknameNormalized: nickname ? normalizarNickname(nickname) : '',
    photoURL: authUser.photoURL ?? currentProfile.photoURL ?? '',
    provider: currentProfile.provider ?? provider,
    role: currentProfile.role ?? profileSeed.role ?? 'programadores',
    interests: sanearSeleccionIntereses(currentProfile.interests ?? profileSeed.interests ?? ['bases']),
    experience: currentProfile.experience ?? profileSeed.experience ?? 'principiante',
    goalCourseId: currentProfile.goalCourseId ?? profileSeed.goalCourseId ?? null,
    systemRole: esCorreoAdminPrivilegiado(email)
      ? 'admin'
      : currentProfile.systemRole ?? profileSeed.systemRole ?? 'student',
    status: currentProfile.status ?? profileSeed.status ?? 'active',
    emailVerified: authUser.emailVerified ?? currentProfile.emailVerified ?? false,
    createdAt,
    lastLoginAt: profileSeed.lastLoginAt ?? currentProfile.lastLoginAt ?? null,
    onboarding,
    progress,
  }
}

function obtenerReferenciaUsuario(userId) {
  asegurarFirebaseConfigurado()
  return doc(firebaseDb, USERS_COLLECTION, userId)
}

function obtenerReferenciaCorreo(emailNormalized) {
  asegurarFirebaseConfigurado()
  return doc(firebaseDb, EMAIL_INDEX_COLLECTION, emailNormalized)
}

function obtenerReferenciaNombreVisible(nameNormalized) {
  asegurarFirebaseConfigurado()
  return doc(firebaseDb, DISPLAY_NAME_INDEX_COLLECTION, nameNormalized)
}

function obtenerReferenciaNickname(nicknameNormalized) {
  asegurarFirebaseConfigurado()
  return doc(firebaseDb, NICKNAME_INDEX_COLLECTION, nicknameNormalized)
}

function obtenerColeccionActividadPlataforma() {
  asegurarFirebaseConfigurado()
  return collection(firebaseDb, PLATFORM_ACTIVITY_COLLECTION)
}

function construirEstadoIndice(previousValue, nextValue, getRef) {
  return {
    previousValue,
    nextValue,
    nextRef: nextValue ? getRef(nextValue) : null,
    previousRef: previousValue && previousValue !== nextValue ? getRef(previousValue) : null,
  }
}

function construirEstadoIndices(currentProfile = {}, nextProfile = {}) {
  const nextNameKeys = construirClavesNombreVisible(nextProfile.name ?? '')

  return {
    email: construirEstadoIndice(
      normalizarCorreo(currentProfile.email ?? ''),
      normalizarCorreo(nextProfile.email ?? ''),
      obtenerReferenciaCorreo,
    ),
    name: {
      ...construirEstadoIndice(
        currentProfile.nameNormalized ?? normalizarNombreVisible(currentProfile.name ?? ''),
        nextProfile.nameNormalized ?? nextNameKeys.exact,
        obtenerReferenciaNombreVisible,
      ),
      exactValue: nextNameKeys.exact,
      legacyValue: nextNameKeys.legacy,
      legacyCollisionRef: nextNameKeys.legacy
        ? obtenerReferenciaNombreVisible(nextNameKeys.legacy)
        : null,
    },
    nickname: construirEstadoIndice(
      currentProfile.nicknameNormalized ?? normalizarNickname(currentProfile.nickname ?? ''),
      nextProfile.nicknameNormalized ?? normalizarNickname(nextProfile.nickname ?? ''),
      obtenerReferenciaNickname,
    ),
  }
}

async function leerSnapshotsIndices(transaction, indices) {
  const snapshotMap = new Map()
  const refsToRead = [
    indices.name.nextRef,
    indices.name.legacyCollisionRef,
    indices.nickname.nextRef,
  ].filter(Boolean)

  for (const ref of refsToRead) {
    if (snapshotMap.has(ref.path)) {
      continue
    }

    const snapshot = await transaction.get(ref)
    snapshotMap.set(ref.path, snapshot)
  }

  return snapshotMap
}

function validarIndices(userId, indices, snapshots, nextProfile) {
  const nameSnapshot = indices.name.nextRef ? snapshots.get(indices.name.nextRef.path) : null
  if (nameSnapshot?.exists() && nameSnapshot.data().userId !== userId) {
    throw new Error('Ese nombre de usuario ya está en uso. Elige otro distinto.')
  }

  const legacyNameSnapshot = indices.name.legacyCollisionRef
    ? snapshots.get(indices.name.legacyCollisionRef.path)
    : null
  if (
    legacyNameSnapshot?.exists() &&
    legacyNameSnapshot.data().userId !== userId &&
    coincideNombreVisibleExacto(legacyNameSnapshot.data(), nextProfile.name)
  ) {
    throw new Error('Ese nombre de usuario ya está en uso. Elige otro distinto.')
  }

  const nicknameSnapshot = indices.nickname.nextRef
    ? snapshots.get(indices.nickname.nextRef.path)
    : null
  if (nicknameSnapshot?.exists() && nicknameSnapshot.data().userId !== userId) {
    throw new Error('Ese nickname ya está en uso. Elige otro distinto.')
  }
}

function aplicarIndices(transaction, userId, currentProfile, nextProfile, indices) {
  const now = new Date().toISOString()

  if (indices.email.nextRef) {
    transaction.set(
      indices.email.nextRef,
      {
        userId,
        email: indices.email.nextValue,
        emailNormalized: indices.email.nextValue,
        updatedAt: now,
      },
      { merge: true },
    )
  }

  if (indices.name.nextRef) {
    transaction.set(
      indices.name.nextRef,
      {
        userId,
        email: normalizarCorreo(nextProfile.email ?? ''),
        emailNormalized: normalizarCorreo(nextProfile.email ?? ''),
        name: crearNombreCompleto(nextProfile.name ?? ''),
        nameNormalized: indices.name.nextValue,
        updatedAt: now,
      },
      { merge: true },
    )
  }

  if (indices.nickname.nextRef) {
    transaction.set(
      indices.nickname.nextRef,
      {
        userId,
        email: normalizarCorreo(nextProfile.email ?? ''),
        emailNormalized: normalizarCorreo(nextProfile.email ?? ''),
        nickname: (nextProfile.nickname ?? '').trim(),
        nicknameNormalized: indices.nickname.nextValue,
        updatedAt: now,
      },
      { merge: true },
    )
  }

  if (indices.email.previousRef) {
    transaction.delete(indices.email.previousRef)
  }

  if (indices.name.previousRef) {
    transaction.delete(indices.name.previousRef)
  }

  if (indices.nickname.previousRef) {
    transaction.delete(indices.nickname.previousRef)
  }
}

export function construirUsuarioAplicacion(authUser, profile = {}) {
  const email = normalizarCorreo(authUser?.email ?? profile.email ?? '')

  return {
    id: authUser?.uid ?? profile.id,
    email,
    name: profile.name ?? authUser?.displayName ?? 'Operador',
    nameNormalized:
      profile.nameNormalized ??
      normalizarNombreVisible(profile.name ?? authUser?.displayName ?? ''),
    nameAutoAssigned: profile.nameAutoAssigned ?? false,
    nickname: profile.nickname ?? '',
    nicknameNormalized: profile.nicknameNormalized ?? normalizarNickname(profile.nickname ?? ''),
    photoURL: authUser?.photoURL ?? profile.photoURL ?? '',
    provider: profile.provider ?? normalizarProvider(obtenerProviderId(authUser)),
    role: profile.role ?? 'programadores',
    interests: sanearSeleccionIntereses(profile.interests ?? ['bases']),
    experience: profile.experience ?? 'principiante',
    goalCourseId: profile.goalCourseId ?? null,
    systemRole: esCorreoAdminPrivilegiado(email) ? 'admin' : profile.systemRole ?? 'student',
    status: profile.status ?? 'active',
    emailVerified: authUser?.emailVerified ?? profile.emailVerified ?? false,
    createdAt: profile.createdAt ?? new Date().toISOString(),
    lastLoginAt: profile.lastLoginAt ?? null,
  }
}

export async function obtenerPerfilUsuario(userId) {
  const snapshot = await getDoc(obtenerReferenciaUsuario(userId))

  if (!snapshot.exists()) {
    return null
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  }
}

export async function asegurarPerfilUsuario(authUser, profileSeed = {}) {
  return runTransaction(firebaseDb, async (transaction) => {
    const userRef = obtenerReferenciaUsuario(authUser.uid)
    const userSnapshot = await transaction.get(userRef)
    const currentProfile = userSnapshot.exists() ? userSnapshot.data() : {}
    const nextProfile = await construirPerfilBase(transaction, authUser, currentProfile, profileSeed)
    const indices = construirEstadoIndices(currentProfile, nextProfile)
    const snapshots = await leerSnapshotsIndices(transaction, indices)

    validarIndices(authUser.uid, indices, snapshots, nextProfile)
    aplicarIndices(transaction, authUser.uid, currentProfile, nextProfile, indices)
    transaction.set(userRef, nextProfile, { merge: true })

    return nextProfile
  })
}

export async function guardarPerfilUsuario(userId, patch) {
  return runTransaction(firebaseDb, async (transaction) => {
    const userRef = obtenerReferenciaUsuario(userId)
    const userSnapshot = await transaction.get(userRef)
    const currentProfile = userSnapshot.exists() ? userSnapshot.data() : {}
    const nextName =
      patch.name != null
        ? crearNombreCompleto(patch.name)
        : crearNombreCompleto(currentProfile.name ?? '')
    const nextNickname =
      patch.nickname != null ? patch.nickname.trim() : (currentProfile.nickname ?? '').trim()
    const nextNameAutoAssigned =
      patch.nameAutoAssigned ??
      (patch.name != null ? false : currentProfile.nameAutoAssigned ?? false)
    const nextProfile = {
      ...currentProfile,
      ...patch,
      name: nextName,
      nameNormalized:
        patch.name != null || patch.nameNormalized != null
          ? normalizarNombreVisible(patch.name ?? patch.nameNormalized ?? '')
          : currentProfile.nameNormalized ?? normalizarNombreVisible(currentProfile.name ?? ''),
      nameAutoAssigned: nextNameAutoAssigned,
      nickname: nextNickname,
      nicknameNormalized:
        patch.nickname != null || patch.nicknameNormalized != null
          ? normalizarNickname(patch.nickname ?? patch.nicknameNormalized ?? '')
          : currentProfile.nicknameNormalized ?? '',
    }

    if (patch.email != null) {
      nextProfile.email = normalizarCorreo(patch.email)
    }

    if (patch.nickname == null && patch.nicknameNormalized == null && nextProfile.nickname === '') {
      nextProfile.nicknameNormalized = ''
    }

    const indices = construirEstadoIndices(currentProfile, nextProfile)
    const snapshots = await leerSnapshotsIndices(transaction, indices)

    validarIndices(userId, indices, snapshots, nextProfile)
    aplicarIndices(transaction, userId, currentProfile, nextProfile, indices)

    transaction.set(
      userRef,
      {
        ...nextProfile,
        id: userId,
      },
      { merge: true },
    )

    return {
      id: userId,
      ...nextProfile,
    }
  })
}

export async function guardarEstadoAprendizajeUsuario(userId, patch) {
  await setDoc(
    obtenerReferenciaUsuario(userId),
    {
      onboarding: normalizarEstadoDiagnostico(patch.onboarding),
      progress: normalizarProgreso(patch.progress),
    },
    { merge: true },
  )
}

function construirClavesNombreVisible(name) {
  const exact = normalizarNombreVisible(name)
  const legacy = normalizarNombreVisibleLegacy(name)

  return {
    exact,
    legacy: legacy && legacy !== exact ? legacy : '',
  }
}

function coincideNombreVisibleExacto(profileLike = {}, expectedName = '') {
  return crearNombreCompleto(profileLike.name ?? '') === crearNombreCompleto(expectedName)
}

async function recopilarReferenciasActividadUsuario(userId) {
  const activityCollection = obtenerColeccionActividadPlataforma()
  const [actorSnapshot, targetSnapshot] = await Promise.all([
    getDocs(query(activityCollection, where('userId', '==', userId))),
    getDocs(query(activityCollection, where('targetUserId', '==', userId))),
  ])

  const referencesByPath = new Map()

  for (const snapshot of [actorSnapshot, targetSnapshot]) {
    snapshot.docs.forEach((activityDoc) => {
      referencesByPath.set(activityDoc.ref.path, activityDoc.ref)
    })
  }

  return Array.from(referencesByPath.values())
}

async function eliminarReferenciasEnLotes(references = []) {
  if (references.length === 0) {
    return
  }

  for (let index = 0; index < references.length; index += BATCH_DELETE_LIMIT) {
    const chunk = references.slice(index, index + BATCH_DELETE_LIMIT)
    const batch = writeBatch(firebaseDb)

    chunk.forEach((reference) => {
      batch.delete(reference)
    })

    await batch.commit()
  }
}

export async function eliminarPerfilUsuarioYReferencias(userId, profileSeed = null) {
  asegurarFirebaseConfigurado()

  const profile = profileSeed ?? await obtenerPerfilUsuario(userId)
  const referencesByPath = new Map()
  const userRef = obtenerReferenciaUsuario(userId)

  referencesByPath.set(userRef.path, userRef)

  const emailNormalized = normalizarCorreo(profile?.email ?? '')
  const { exact: exactNameNormalized, legacy: legacyNameNormalized } = construirClavesNombreVisible(
    profile?.name ?? '',
  )
  const nameNormalized = profile?.nameNormalized ?? exactNameNormalized
  const nicknameNormalized =
    profile?.nicknameNormalized ?? normalizarNickname(profile?.nickname ?? '')

  if (emailNormalized) {
    const emailRef = obtenerReferenciaCorreo(emailNormalized)
    referencesByPath.set(emailRef.path, emailRef)
  }

  if (nameNormalized) {
    const nameRef = obtenerReferenciaNombreVisible(nameNormalized)
    referencesByPath.set(nameRef.path, nameRef)
  }

  if (exactNameNormalized && exactNameNormalized !== nameNormalized) {
    const exactNameRef = obtenerReferenciaNombreVisible(exactNameNormalized)
    referencesByPath.set(exactNameRef.path, exactNameRef)
  }

  if (legacyNameNormalized && legacyNameNormalized !== nameNormalized) {
    const legacyNameRef = obtenerReferenciaNombreVisible(legacyNameNormalized)
    referencesByPath.set(legacyNameRef.path, legacyNameRef)
  }

  if (nicknameNormalized) {
    const nicknameRef = obtenerReferenciaNickname(nicknameNormalized)
    referencesByPath.set(nicknameRef.path, nicknameRef)
  }

  const activityReferences = await recopilarReferenciasActividadUsuario(userId)
  activityReferences.forEach((reference) => {
    referencesByPath.set(reference.path, reference)
  })

  await eliminarReferenciasEnLotes(Array.from(referencesByPath.values()))

  if (!profile) {
    try {
      await deleteDoc(userRef)
    } catch {
      // Ignore: if the profile document no longer exists, the cleanup already succeeded.
    }
  }
}

export async function buscarPerfilPorNombreVisible(name, { allowLegacy = false } = {}) {
  asegurarFirebaseConfigurado()
  const expectedName = crearNombreCompleto(name)
  const { exact: nameNormalized, legacy: legacyNameNormalized } = construirClavesNombreVisible(name)

  if (!nameNormalized) {
    return null
  }

  const snapshot = await getDoc(obtenerReferenciaNombreVisible(nameNormalized))

  if (snapshot.exists()) {
    return {
      id: snapshot.data().userId,
      ...snapshot.data(),
    }
  }

  if (!allowLegacy || !legacyNameNormalized) {
    return null
  }

  const legacySnapshot = await getDoc(obtenerReferenciaNombreVisible(legacyNameNormalized))

  if (
    !legacySnapshot.exists() ||
    !coincideNombreVisibleExacto(legacySnapshot.data(), expectedName)
  ) {
    return null
  }

  return {
    id: legacySnapshot.data().userId,
    ...legacySnapshot.data(),
  }
}

export async function buscarPerfilPorCorreo(email) {
  asegurarFirebaseConfigurado()
  const emailNormalized = normalizarCorreo(email)

  if (!emailNormalized) {
    return null
  }

  const snapshot = await getDoc(obtenerReferenciaCorreo(emailNormalized))

  if (!snapshot.exists()) {
    return null
  }

  return {
    id: snapshot.data().userId,
    ...snapshot.data(),
  }
}

export async function buscarPerfilPorNickname(nickname) {
  asegurarFirebaseConfigurado()
  const nicknameNormalized = normalizarNickname(nickname)

  if (!nicknameNormalized) {
    return null
  }

  const snapshot = await getDoc(obtenerReferenciaNickname(nicknameNormalized))

  if (!snapshot.exists()) {
    return null
  }

  return {
    id: snapshot.data().userId,
    ...snapshot.data(),
  }
}

export async function verificarDisponibilidadNombreVisible(name, currentUserId = '') {
  const trimmedName = crearNombreCompleto(name)

  if (!trimmedName) {
    return {
      status: 'invalid',
      message: 'Ingresa un nombre de usuario para crear la cuenta.',
    }
  }

  try {
    const owner = await buscarPerfilPorNombreVisible(trimmedName, { allowLegacy: true })

    if (!owner) {
      return {
        status: 'available',
        message: 'Nombre de usuario disponible.',
      }
    }

    if (owner.id === currentUserId) {
      return {
        status: 'owned',
        message: 'Ese nombre de usuario ya te pertenece.',
      }
    }

    return {
      status: 'taken',
      message: 'Ese nombre de usuario ya está en uso. Elige otro distinto.',
    }
  } catch {
    if (!currentUserId) {
      return {
        status: 'unknown',
        message: 'Comprobaremos la disponibilidad del nombre al crear la cuenta.',
      }
    }

    return {
      status: 'unknown',
      message:
        'No pudimos confirmar si ese nombre de usuario ya existe. Igual lo volveremos a validar al guardar.',
    }
  }
}

export async function verificarDisponibilidadNickname(nickname, currentUserId = '') {
  const trimmedNickname = (nickname ?? '').trim()

  if (!trimmedNickname) {
    return {
      status: 'invalid',
      message: 'Elige un nickname para tu cuenta.',
    }
  }

  const nicknameMessage = validarNickname(trimmedNickname)

  if (nicknameMessage) {
    return {
      status: 'invalid',
      message: nicknameMessage,
    }
  }

  try {
    const owner = await buscarPerfilPorNickname(trimmedNickname)

    if (!owner) {
      return {
        status: 'available',
        message: 'Nickname disponible.',
      }
    }

    if (owner.id === currentUserId) {
      return {
        status: 'owned',
        message: 'Ese nickname ya te pertenece.',
      }
    }

    return {
      status: 'taken',
      message: 'Ese nickname ya está en uso. Elige otro distinto.',
    }
  } catch {
    return {
      status: 'unknown',
      message:
        'No pudimos confirmar si ese nickname ya existe. Igual lo volveremos a validar al guardar.',
    }
  }
}

export function suscribirPerfilesUsuarios(onChange, onError) {
  asegurarFirebaseConfigurado()

  return onSnapshot(
    collection(firebaseDb, USERS_COLLECTION),
    (snapshot) => {
      const profiles = snapshot.docs
        .map((profileDoc) => ({
          id: profileDoc.id,
          ...profileDoc.data(),
        }))
        .sort((left, right) => {
          const leftTime = new Date(left.createdAt ?? 0).getTime()
          const rightTime = new Date(right.createdAt ?? 0).getTime()
          return rightTime - leftTime
        })

      onChange(
        profiles.map((profile) => ({
          user: construirUsuarioAplicacion(null, profile),
          state: construirEstadoUsuarioDesdePerfil(profile),
        })),
      )
    },
    onError,
  )
}

