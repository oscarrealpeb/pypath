import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { normalizarCorreo } from './servicioValidacionAutenticacion.js'

const env = import.meta.env ?? {}

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID,
}

const AUTH_LANGUAGE = 'es'
export const BOOTSTRAP_ADMIN_EMAIL = 'admin@pypath.com'
const BOOTSTRAP_ADMIN_EMAIL_NORMALIZED = normalizarCorreo(BOOTSTRAP_ADMIN_EMAIL)

export function estaFirebaseConfigurado() {
  return Object.values(firebaseConfig).every(Boolean)
}

const firebaseApp = estaFirebaseConfigurado()
  ? getApps().length > 0
    ? getApp()
    : initializeApp(firebaseConfig)
  : null

export const firebaseAuth = firebaseApp ? getAuth(firebaseApp) : null
export const firebaseDb = firebaseApp ? getFirestore(firebaseApp) : null
export const googleAuthProvider = firebaseApp ? new GoogleAuthProvider() : null

if (firebaseAuth) {
  firebaseAuth.languageCode = AUTH_LANGUAGE
}

if (googleAuthProvider) {
  googleAuthProvider.setCustomParameters({ prompt: 'select_account', hl: AUTH_LANGUAGE })
}

export function asegurarFirebaseConfigurado() {
  if (firebaseApp) {
    return
  }

  throw new Error(
    'Firebase no está configurado. Agrega las variables VITE_FIREBASE_* antes de usar autenticación.',
  )
}

export function esCorreoAdminPrivilegiado(email = '') {
  return normalizarCorreo(email) === BOOTSTRAP_ADMIN_EMAIL_NORMALIZED
}

export function obtenerActionCodeSettings(path = '/login') {
  if (typeof window === 'undefined') {
    return undefined
  }

  return {
    url: `${window.location.origin}${path}`,
    handleCodeInApp: false,
  }
}
