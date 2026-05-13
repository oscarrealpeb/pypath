export { requiereVerificacionCorreo } from './servicioFirebaseAutenticacion.js'

export function normalizarCuentasAutenticacionLocal() {
  return {}
}

export async function resolverSesionUsuario() {
  throw new Error(
    'La autenticación local fue retirada. Usa servicioFirebaseAutenticacion.js para trabajar con Firebase Auth.',
  )
}
