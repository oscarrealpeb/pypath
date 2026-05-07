import { sanearSeleccionIntereses } from '../../../datos/opcionesPerfilUsuario.js'

function wait(duration) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration)
  })
}

function makeUserId(email) {
  return `user-${email.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
}

function buildGoogleAccount(formData) {
  const baseName = formData.name?.trim() || 'Operador Google'
  const email =
    formData.email?.trim().toLowerCase() ||
    `${baseName.toLowerCase().replace(/[^a-z0-9]+/g, '.') || 'google.user'}@gmail.com`

  return {
    name: baseName,
    email,
  }
}

function resolveSystemRole(email, requestedSystemRole) {
  if (requestedSystemRole === 'admin') {
    return 'admin'
  }

  if (email === 'admin@pypath.dev') {
    return 'admin'
  }

  return 'student'
}

export async function autenticarUsuario(formData, mode = 'login') {
  await wait(250)

  const provider = formData.provider ?? 'email'
  const googleAccount = provider === 'google' ? buildGoogleAccount(formData) : null
  const email = (googleAccount?.email ?? formData.email ?? '').trim().toLowerCase()
  const fallbackName = email.split('@')[0] || 'operador'

  return {
    id: makeUserId(email || `${provider}.${Date.now()}`),
    email,
    name:
      googleAccount?.name ??
      (mode === 'register' ? formData.name.trim() : formData.name?.trim() || fallbackName),
    provider,
    role: formData.role ?? null,
    interests: sanearSeleccionIntereses(formData.interests ?? []),
    experience: formData.experience ?? 'principiante',
    goalCourseId: formData.goalCourseId ?? null,
    systemRole: resolveSystemRole(email, formData.systemRole),
  }
}

