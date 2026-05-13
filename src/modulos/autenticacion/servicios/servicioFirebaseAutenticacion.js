import {
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  onAuthStateChanged,
  reauthenticateWithCredential,
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
  buscarPerfilPorCorreo,
  buscarPerfilPorNombreVisible,
  guardarPerfilUsuario,
} from './servicioPerfilesFirebase.js'
import {
  crearNombreCompleto,
  esCorreoValido,
  normalizarCorreo,
  obtenerMensajeContrasenaMinima,
} from './servicioValidacionAutenticacion.js'

function mapFirebaseError(error) {
  switch (error?.code) {
    case 'auth/email-already-in-use':
      return 'Ya existe una cuenta con ese correo. Inicia sesión o usa otro email.'
    case 'auth/invalid-email':
      return 'Ese correo no tiene un formato válido.'
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'No encontramos una cuenta con ese correo, o la contraseña no coincide.'
    case 'auth/too-many-requests':
      return 'Hay demasiados intentos seguidos. Espera un momento antes de volver a intentar.'
    case 'auth/popup-blocked':
      return 'Tu navegador bloqueó la ventana de Google. Habilita popups para este sitio o inténtalo de nuevo.'
    case 'auth/popup-closed-by-user':
      return 'Cerraste la ventana de Google antes de terminar el acceso.'
    case 'auth/cancelled-popup-request':
      return 'Ya había un intento de acceso con Google en curso. Intenta otra vez.'
    case 'auth/account-exists-with-different-credential':
      return 'Ese correo ya existe con otro método de acceso. Entra primero con ese método y luego vincula Google.'
    case 'auth/network-request-failed':
      return 'No pudimos conectarnos con el servicio de acceso. Revisa tu conexión e intenta de nuevo.'
    case 'permission-denied':
      return 'No pudimos terminar de crear tu perfil. Revisa la configuración del proyecto e intenta otra vez.'
    default:
      return error?.message || 'No pudimos completar el acceso.'
  }
}

function createFirebaseError(error) {
  return new Error(mapFirebaseError(error), { cause: error })
}

const GOOGLE_REDIRECT_SEED_KEY = 'pypath_google_redirect_seed'

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

function esUsuarioAdminPrivilegiado(user) {
  return Boolean(user && (user.systemRole === 'admin' || esCorreoAdminPrivilegiado(user.email)))
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

  let firestoreLookupFailed = false

  try {
    const owner = await buscarPerfilPorCorreo(normalizedEmail)

    if (owner) {
      return {
        status: 'taken',
        message: 'Ese correo ya está registrado. Usa otro o inicia sesión.',
      }
    }
  } catch {
    firestoreLookupFailed = true
  }

  try {
    const methods = await fetchSignInMethodsForEmail(firebaseAuth, normalizedEmail)

    if (Array.isArray(methods) && methods.length > 0) {
      return {
        status: 'taken',
        message: 'Ese correo ya está registrado. Usa otro o inicia sesión.',
      }
    }

    if (firestoreLookupFailed) {
      return {
        status: 'unknown',
        message:
          'No pudimos confirmar si ese correo ya existe. Igual lo validaremos al crear la cuenta.',
      }
    }

    return {
      status: 'available',
      message: 'Correo disponible.',
    }
  } catch (error) {
    if (error?.code === 'auth/invalid-email') {
      return {
        status: 'invalid',
        message: 'Escribe un correo con formato válido.',
      }
    }

    return {
      status: 'unknown',
      message:
        'No pudimos confirmar si ese correo ya existe. Igual lo validaremos al crear la cuenta.',
    }
  }
}

export function requiereVerificacionCorreo(user) {
  return Boolean(
    user &&
      user.provider === 'email' &&
      !esUsuarioAdminPrivilegiado(user) &&
      !user.emailVerified,
  )
}

async function resolverCorreoDesdeIdentificador(identifier) {
  const trimmedIdentifier = (identifier ?? '').trim()

  if (!trimmedIdentifier) {
    throw new Error('Escribe tu correo o nombre de usuario, y tu contraseña.')
  }

  if (esCorreoValido(trimmedIdentifier)) {
    return normalizarCorreo(trimmedIdentifier)
  }

  const owner = await buscarPerfilPorNombreVisible(trimmedIdentifier)

  if (!owner) {
    throw new Error(
      'No encontramos una cuenta con ese correo o nombre de usuario, o la contraseña no coincide.',
    )
  }

  if (!owner.email) {
    throw new Error(
      'Ese nombre de usuario ya existe, pero todavía debes entrar una vez con tu correo para terminar de sincronizarlo.',
    )
  }

  return normalizarCorreo(owner.email)
}

export async function resolverEmailIngreso(identifier) {
  const trimmedIdentifier = (identifier ?? '').trim()

  if (!trimmedIdentifier) {
    throw new Error('Escribe tu correo y tu contraseña.')
  }

  if (!esCorreoValido(trimmedIdentifier)) {
    throw new Error('Por seguridad, el acceso con contraseña ahora se hace solo con correo.')
  }

  return normalizarCorreo(trimmedIdentifier)
}

async function sincronizarUltimoAcceso(user, seed = {}) {
  const now = new Date().toISOString()
  const profile = await asegurarPerfilUsuario(user, {
    ...seed,
    lastLoginAt: now,
    createdAt: seed.createdAt ?? now,
  })

  if (profile.status === 'disabled') {
    await signOut(firebaseAuth)
    throw new Error('Esta cuenta está deshabilitada. Reactívala desde administración.')
  }

  await guardarPerfilUsuario(user.uid, {
    emailVerified: user.emailVerified,
    lastLoginAt: now,
  })

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

  if (passwordMessage) {
    throw new Error(passwordMessage)
  }

  if (esCorreoAdminPrivilegiado(email)) {
    throw new Error(
      'La cuenta admin fija se crea directamente desde la consola del proyecto y no desde el registro público.',
    )
  }

  try {
    const credential = await createUserWithEmailAndPassword(firebaseAuth, email, formData.password)
    const displayName = crearNombreCompleto(formData.name)

    if (displayName) {
      await updateProfile(credential.user, { displayName })
    }

    if (!esCorreoAdminPrivilegiado(email)) {
      await sendEmailVerification(credential.user, obtenerActionCodeSettings('/login'))
    }

    const session = await sincronizarUltimoAcceso(credential.user, {
      ...profileSeed,
      name: displayName || profileSeed.name,
      createdAt: new Date().toISOString(),
    })

    return {
      ...session,
      activityType: 'register',
    }
  } catch (error) {
    throw createFirebaseError(error)
  }
}

export async function iniciarSesionConCorreoONickname(formData) {
  asegurarFirebaseConfigurado()

  try {
    const resolvedEmail = await resolverCorreoDesdeIdentificador(formData.identifier)
    const credential = await signInWithEmailAndPassword(
      firebaseAuth,
      resolvedEmail,
      formData.password ?? '',
    )
    const session = await sincronizarUltimoAcceso(credential.user)

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
    const session = await sincronizarUltimoAcceso(result.user, profileSeed)

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
    return
  }

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
