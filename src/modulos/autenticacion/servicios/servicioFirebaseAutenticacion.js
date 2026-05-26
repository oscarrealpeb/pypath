import {
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  reload,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signInWithPopup,
  signOut,
  updatePassword,
  updateProfile,
} from 'firebase/auth'
import {
  asegurarFirebaseConfigurado,
  esCorreoAdminPrivilegiado,
  estaFirebaseConfigurado,
  firebaseAuth,
  googleAuthProvider,
  obtenerActionCodeSettings,
} from './clienteFirebase.js'
import {
  asegurarPerfilUsuario,
  buscarPerfilPorNombreVisible,
  obtenerPerfilUsuario,
} from './servicioPerfilesFirebase.js'
import {
  crearNombreCompleto,
  esCorreoValido,
  normalizarCorreo,
  obtenerMensajeContrasenaMinima,
} from './servicioValidacionAutenticacion.js'

const ADMIN_PORTAL_SESSION_KEY = 'pypath-admin-portal-session'

function obtenerSessionStorage() {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    return window.sessionStorage
  } catch {
    return null
  }
}

function mapFirebaseError(error) {
  switch (error?.code) {
    case 'auth/email-already-in-use':
      return 'Ya existe una cuenta con ese correo. Inicia sesión o usa otro email.'
    case 'auth/invalid-email':
      return 'Ese correo no tiene un formato válido.'
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'No encontramos una cuenta con ese correo o nombre de usuario, o la contraseña no coincide.'
    case 'auth/too-many-requests':
      return 'Hay demasiados intentos seguidos. Espera un momento antes de volver a intentar.'
    case 'auth/popup-blocked':
      return 'Tu navegador bloqueó la ventana de Google. Habilita popups para este sitio o inténtalo de nuevo.'
    case 'auth/user-cancelled':
    case 'auth/popup-closed-by-user':
      return 'Cancelaste el acceso con Google. Puedes intentarlo de nuevo cuando quieras.'
    case 'auth/cancelled-popup-request':
      return 'Ya había un intento de acceso con Google en curso. Intenta otra vez.'
    case 'auth/account-exists-with-different-credential':
      return 'Ese correo ya existe con otro método de acceso. Entra primero con ese método y luego vincula Google.'
    case 'auth/network-request-failed':
      return 'No pudimos conectarnos con el servicio de acceso. Revisa tu conexión e intenta de nuevo.'
    case 'auth/requires-recent-login':
      return 'Por seguridad, vuelve a confirmar tu acceso antes de completar esta acción.'
    case 'permission-denied':
      return 'No pudimos validar tu acceso en este momento. Intenta de nuevo.'
    default:
      return 'No pudimos completar el acceso.'
  }
}

function createFirebaseError(error) {
  return new Error(mapFirebaseError(error), { cause: error })
}

const GOOGLE_REDIRECT_SEED_KEY = 'pypath_google_redirect_seed'

export function activarAccesoPortalAdmin() {
  const sessionStorage = obtenerSessionStorage()

  if (!sessionStorage) {
    return
  }

  sessionStorage.setItem(ADMIN_PORTAL_SESSION_KEY, '1')
}

export function limpiarAccesoPortalAdmin() {
  const sessionStorage = obtenerSessionStorage()

  if (!sessionStorage) {
    return
  }

  sessionStorage.removeItem(ADMIN_PORTAL_SESSION_KEY)
}

export function tieneAccesoPortalAdminActivo() {
  const sessionStorage = obtenerSessionStorage()

  if (!sessionStorage) {
    return false
  }

  return sessionStorage.getItem(ADMIN_PORTAL_SESSION_KEY) === '1'
}

function guardarSemillaRedireccionGoogle(profileSeed) {
  if (typeof window === 'undefined' || !window.sessionStorage) {
    return
  }

  window.sessionStorage.setItem(GOOGLE_REDIRECT_SEED_KEY, JSON.stringify(profileSeed ?? {}))
}

export function consumirSemillaRedireccionGoogle() {
  if (typeof window === 'undefined' || !window.sessionStorage) {
    return null
  }

  const rawValue = window.sessionStorage.getItem(GOOGLE_REDIRECT_SEED_KEY)

  if (!rawValue) {
    return null
  }

  window.sessionStorage.removeItem(GOOGLE_REDIRECT_SEED_KEY)

  try {
    return JSON.parse(rawValue)
  } catch {
    return null
  }
}

export function esUsuarioAdministrador(user) {
  const resolvedEmail = user?.email ?? firebaseAuth?.currentUser?.email ?? ''
  return Boolean(user?.systemRole === 'admin' || esCorreoAdminPrivilegiado(resolvedEmail))
}

export async function verificarDisponibilidadCorreo(email) {
  const normalizedEmail = normalizarCorreo(email ?? '')

  if (!normalizedEmail) {
    return {
      status: 'idle',
      message: '',
    }
  }

  if (!esCorreoValido(normalizedEmail)) {
    return {
      status: 'invalid',
      message: 'Escribe un correo con formato válido.',
    }
  }

  if (esCorreoAdminPrivilegiado(normalizedEmail)) {
    return {
      status: 'taken',
      message: 'Ese correo está reservado para administración.',
    }
  }

  if (!estaFirebaseConfigurado() || !firebaseAuth) {
    return {
      status: 'unknown',
      message: 'No pudimos validar este correo por ahora.',
    }
  }

  return {
    status: 'idle',
    message: '',
  }
}

export function requiereVerificacionCorreo(user) {
  const resolvedProvider =
    user?.provider ??
    (firebaseAuth?.currentUser?.providerData?.[0]?.providerId === 'google.com' ? 'google' : 'email')
  const resolvedEmailVerified = user?.emailVerified ?? firebaseAuth?.currentUser?.emailVerified ?? false

  return Boolean(
    user &&
      resolvedProvider === 'email' &&
      !esUsuarioAdministrador(user) &&
      !resolvedEmailVerified,
  )
}

export async function resolverEmailIngreso(identifier) {
  const trimmedIdentifier = (identifier ?? '').trim()

  if (!trimmedIdentifier) {
    throw new Error('Escribe tu correo o nombre de usuario, y tu contraseña.')
  }

  if (esCorreoValido(trimmedIdentifier)) {
    return normalizarCorreo(trimmedIdentifier)
  }

  const owner = await buscarPerfilPorNombreVisible(trimmedIdentifier, { allowLegacy: true })

  if (!owner) {
    throw new Error(
      'No encontramos una cuenta con ese correo o nombre de usuario, o la contraseña no coincide.',
    )
  }

  const resolvedOwnerEmail = normalizarCorreo(owner.email ?? owner.emailNormalized ?? '')

  if (!resolvedOwnerEmail) {
    throw new Error(
      'Ese nombre de usuario existe, pero la cuenta todavía no tiene un correo sincronizado para iniciar sesión.',
    )
  }

  return resolvedOwnerEmail
}

async function sincronizarUltimoAcceso(user, seed = {}) {
  const now = new Date().toISOString()
  const currentProfile = await obtenerPerfilUsuario(user.uid)

  if (currentProfile?.status === 'disabled') {
    await signOut(firebaseAuth)
    throw new Error('Esta cuenta está deshabilitada. Reactívala desde administración.')
  }

  const profile = await asegurarPerfilUsuario(user, {
    ...seed,
    lastLoginAt: now,
    createdAt: seed.createdAt ?? now,
  })

  if (profile.status === 'disabled') {
    await signOut(firebaseAuth)
    throw new Error('Esta cuenta está deshabilitada. Reactívala desde administración.')
  }

  return {
    firebaseUser: firebaseAuth.currentUser ?? user,
    profile: {
      ...profile,
      emailVerified: user.emailVerified,
      lastLoginAt: now,
    },
  }
}

export async function registrarCuentaConCorreo(formData, profileSeed = {}) {
  asegurarFirebaseConfigurado()

  const email = normalizarCorreo(formData.email ?? '')
  const passwordMessage = obtenerMensajeContrasenaMinima(formData.password)
  let credential = null

  if (passwordMessage) {
    throw new Error(passwordMessage)
  }

  if (esCorreoAdminPrivilegiado(email)) {
    throw new Error(
      'La cuenta admin fija se crea directamente desde la consola del proyecto y no desde el registro público.',
    )
  }

  try {
    credential = await createUserWithEmailAndPassword(firebaseAuth, email, formData.password)
    const displayName = crearNombreCompleto(formData.name)

    if (displayName) {
      await updateProfile(credential.user, { displayName })
    }

    const session = await sincronizarUltimoAcceso(credential.user, {
      ...profileSeed,
      name: displayName || profileSeed.name,
      createdAt: new Date().toISOString(),
    })

    if (!esCorreoAdminPrivilegiado(email)) {
      try {
        await sendEmailVerification(credential.user, obtenerActionCodeSettings('/login'))
      } catch (error) {
        console.error('No pudimos enviar el correo inicial de verificación.', error)
      }
    }

    return {
      ...session,
      activityType: 'register',
    }
  } catch (error) {
    if (credential?.user) {
      try {
        await deleteUser(credential.user)
      } catch (cleanupError) {
        console.error('No pudimos revertir la cuenta creada tras un fallo de registro.', cleanupError)
      }
    }

    throw createFirebaseError(error)
  }
}

export async function iniciarSesionConCorreoONickname(formData) {
  asegurarFirebaseConfigurado()

  try {
    const resolvedEmail = await resolverEmailIngreso(formData.identifier)
    const credential = await signInWithEmailAndPassword(
      firebaseAuth,
      resolvedEmail,
      formData.password ?? '',
    )
    let session

    try {
      session = await sincronizarUltimoAcceso(credential.user)
    } catch (error) {
      await signOut(firebaseAuth)
      throw error
    }

    return {
      ...session,
      activityType: 'login',
    }
  } catch (error) {
    if (
      error?.code === 'auth/invalid-credential' ||
      error?.code === 'auth/user-not-found' ||
      error?.code === 'auth/wrong-password'
    ) {
      throw new Error(
        'No encontramos una cuenta con ese correo o nombre de usuario, o la contraseña no coincide.',
        { cause: error },
      )
    }

    throw createFirebaseError(error)
  }
}

export async function iniciarSesionConGoogle(profileSeed = {}) {
  asegurarFirebaseConfigurado()

  try {
    const result = await signInWithPopup(firebaseAuth, googleAuthProvider)
    let session

    try {
      session = await sincronizarUltimoAcceso(result.user, profileSeed)
    } catch (error) {
      await signOut(firebaseAuth)
      throw error
    }

    return {
      ...session,
      activityType: 'google_login',
    }
  } catch (error) {
    if (error?.code === 'auth/popup-blocked') {
      guardarSemillaRedireccionGoogle(profileSeed)
      await signInWithRedirect(firebaseAuth, googleAuthProvider)

      return {
        redirectStarted: true,
      }
    }

    throw createFirebaseError(error)
  }
}

export async function cerrarSesionFirebase() {
  if (!firebaseAuth) {
    limpiarAccesoPortalAdmin()
    return
  }

  limpiarAccesoPortalAdmin()
  await signOut(firebaseAuth)
}

export async function enviarCorreoRecuperacion(email) {
  asegurarFirebaseConfigurado()

  if (esCorreoAdminPrivilegiado(email)) {
    throw new Error(
      'La cuenta admin fija no usa recuperación por correo. Cambia su contraseña desde una sesión ya iniciada o con ayuda técnica del proyecto.',
    )
  }

  try {
    await sendPasswordResetEmail(
      firebaseAuth,
      normalizarCorreo(email ?? ''),
      obtenerActionCodeSettings('/login'),
    )
  } catch (error) {
    if (error?.code === 'auth/user-not-found') {
      return
    }

    throw createFirebaseError(error)
  }
}

export async function reenviarVerificacionCorreoActual() {
  asegurarFirebaseConfigurado()

  if (!firebaseAuth.currentUser) {
    throw new Error('No hay una sesión activa para reenviar el correo de verificación.')
  }

  try {
    await sendEmailVerification(firebaseAuth.currentUser, obtenerActionCodeSettings('/login'))
  } catch (error) {
    throw createFirebaseError(error)
  }
}

export async function refrescarUsuarioActualFirebase() {
  asegurarFirebaseConfigurado()

  if (!firebaseAuth.currentUser) {
    return null
  }

  await reload(firebaseAuth.currentUser)
  return firebaseAuth.currentUser
}

export async function actualizarContrasenaUsuarioActual({ currentPassword, nextPassword }) {
  asegurarFirebaseConfigurado()

  const currentUser = firebaseAuth.currentUser

  if (!currentUser?.email) {
    throw new Error('No hay una sesión con correo disponible para cambiar la contraseña.')
  }

  const passwordMessage = obtenerMensajeContrasenaMinima(nextPassword)

  if (passwordMessage) {
    throw new Error(passwordMessage)
  }

  try {
    const credential = EmailAuthProvider.credential(currentUser.email, currentPassword)
    await reauthenticateWithCredential(currentUser, credential)
    await updatePassword(currentUser, nextPassword)
  } catch (error) {
    throw createFirebaseError(error)
  }
}

export async function reautenticarUsuarioActualParaBorrado({ currentPassword = '' } = {}) {
  asegurarFirebaseConfigurado()

  const currentUser = firebaseAuth.currentUser

  if (!currentUser) {
    throw new Error('No hay una sesión activa para borrar la cuenta.')
  }

  const providerId = currentUser.providerData?.[0]?.providerId ?? 'password'

  if (providerId === 'password') {
    if (!currentUser.email) {
      throw new Error('No encontramos un correo válido para confirmar el borrado.')
    }

    if (!currentPassword.trim()) {
      throw new Error('Escribe tu contraseña actual para confirmar el borrado.')
    }

    try {
      const credential = EmailAuthProvider.credential(currentUser.email, currentPassword)
      await reauthenticateWithCredential(currentUser, credential)
      return
    } catch (error) {
      throw createFirebaseError(error)
    }
  }

  if (providerId === 'google.com') {
    try {
      await reauthenticateWithPopup(currentUser, googleAuthProvider)
      return
    } catch (error) {
      throw createFirebaseError(error)
    }
  }
}

export async function eliminarUsuarioActualAuth() {
  asegurarFirebaseConfigurado()

  const currentUser = firebaseAuth.currentUser

  if (!currentUser) {
    throw new Error('No hay una sesión activa para borrar la cuenta.')
  }

  try {
    await deleteUser(currentUser)
    limpiarAccesoPortalAdmin()
  } catch (error) {
    throw createFirebaseError(error)
  }
}

export async function actualizarNombreVisibleUsuarioActual(name) {
  asegurarFirebaseConfigurado()

  if (!firebaseAuth.currentUser) {
    return
  }

  await updateProfile(firebaseAuth.currentUser, { displayName: name.trim() })
}

export function suscribirSesionFirebase(onSessionChange, onError) {
  if (!estaFirebaseConfigurado()) {
    onSessionChange(null)
    return () => {}
  }

  return onAuthStateChanged(firebaseAuth, onSessionChange, onError)
}

