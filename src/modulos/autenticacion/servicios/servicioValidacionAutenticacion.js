const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const NICKNAME_REGEX = /^[a-zA-Z0-9._-]{3,20}$/
const DISPLAY_NAME_REGEX = /^[A-Za-zÀ-ÿ0-9._-]{3,30}$/u

const NICKNAME_BLACKLIST = [
  // Español
  'puta',
  'puto',
  'mierda',
  'culo',
  'pene',
  'penes',
  'verga',
  'porno',
  'porn',
  'sexo',
  'tetas',
  'vagina',
  'semen',
  'gonorrea',
  'malparido',
  'hijueputa',
  'caremonda',
  'prostituta',

  // Inglés
  'fuck',
  'fucker',
  'shit',
  'bitch',
  'nude',
  'nudes',
  'dick',
  'cock',
  'penis',
  'asshole',
  'assholes',
  'arsehole',
  'arseholes',

  // Odio / racismo
  'nazi',
  'hitler',
  'racista',
  'racism',
  'nigger',
  'nigga',
  'niga',
  'nigg',

  // Violencia / abuso
  'rape',
  'violacion',
  'violaciones',
  'violador',
  'violadores',
  'masacre',
  'asesinato',
]

const LEET_NORMALIZATION_MAP = {
  '0': 'o',
  '1': 'i',
  '2': 'z',
  '3': 'e',
  '4': 'a',
  '5': 's',
  '6': 'g',
  '7': 't',
  '8': 'b',
  '9': 'g',
  '@': 'a',
  '$': 's',
  '!': 'i',
}

function normalizeForComparison(value) {
  return (value ?? '')
    .toString()
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function normalizarTextoParaFiltro(value) {
  return normalizeForComparison(value)
    .split('')
    .map((character) => LEET_NORMALIZATION_MAP[character] ?? character)
    .join('')
    .replace(/[^a-z0-9]/g, '')
}

const BLACKLIST_NORMALIZADA = NICKNAME_BLACKLIST.map((term) => normalizarTextoParaFiltro(term))

function contienePalabraProhibida(value) {
  const normalizedValue = normalizarTextoParaFiltro(value)
  return BLACKLIST_NORMALIZADA.some((term) => normalizedValue.includes(term))
}

export function normalizarCorreo(value) {
  return normalizeForComparison(value)
}

export function normalizarNickname(value) {
  return normalizeForComparison(value).replace(/[^a-z0-9._-]/g, '')
}

export function crearNombreCompleto(name) {
  return (name ?? '').trim().replace(/\s+/g, ' ')
}

export function normalizarNombreVisible(value) {
  return crearNombreCompleto(value)
}

export function normalizarNombreVisibleLegacy(value) {
  return normalizarTextoParaFiltro(crearNombreCompleto(value))
}

export function esCorreoValido(email) {
  return EMAIL_REGEX.test((email ?? '').trim())
}

export function validarNombreVisible(name) {
  const trimmedName = crearNombreCompleto(name)

  if (!trimmedName) {
    return 'Ingresa un nombre de usuario para crear la cuenta.'
  }

  if (!DISPLAY_NAME_REGEX.test(trimmedName)) {
    return 'El nombre de usuario debe tener entre 3 y 30 caracteres y usar solo letras, números, punto, guion o guion bajo. No se permiten espacios.'
  }

  if (contienePalabraProhibida(trimmedName)) {
    return 'Ese nombre de usuario no está permitido. Usa algo más neutro y respetuoso.'
  }

  return ''
}

export function validarNickname(nickname) {
  const trimmedNickname = (nickname ?? '').trim()

  if (!trimmedNickname) {
    return 'Elige un nickname para tu cuenta.'
  }

  if (!NICKNAME_REGEX.test(trimmedNickname)) {
    return 'El nickname debe tener entre 3 y 20 caracteres y usar solo letras, números, punto, guion o guion bajo.'
  }

  if (contienePalabraProhibida(trimmedNickname)) {
    return 'Ese nickname no está permitido. Usa algo más neutro y respetuoso.'
  }

  return ''
}

export function evaluarFortalezaContrasena(password) {
  const value = password ?? ''
  const checks = {
    minLength: value.length >= 8,
    lowercase: /[a-z]/.test(value),
    uppercase: /[A-Z]/.test(value),
    number: /\d/.test(value),
    special: /[^A-Za-z0-9]/.test(value),
    spaces: /\s/.test(value),
  }

  const score =
    Number(checks.minLength) +
    Number(checks.lowercase) +
    Number(checks.uppercase) +
    Number(checks.number) +
    Number(checks.special)

  let label = 'Muy débil'
  let toneClass = 'bg-danger'

  if (score >= 5) {
    label = 'Muy segura'
    toneClass = 'bg-primary'
  } else if (score >= 4) {
    label = 'Segura'
    toneClass = 'bg-emerald-400'
  } else if (score >= 3) {
    label = 'Media'
    toneClass = 'bg-warning'
  } else if (score >= 2) {
    label = 'Débil'
    toneClass = 'bg-orange-400'
  }

  const meetsMinimum =
    checks.minLength && checks.uppercase && checks.lowercase && checks.number && !checks.spaces

  return {
    score,
    label,
    toneClass,
    checks,
    meetsMinimum,
  }
}

export function obtenerMensajeContrasenaMinima(password) {
  const strength = evaluarFortalezaContrasena(password)

  if (strength.meetsMinimum) {
    return ''
  }

  if (strength.checks.spaces) {
    return 'La contraseña no puede llevar espacios.'
  }

  return 'Usa mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número.'
}

export function esIdentificadorCorreo(value) {
  return esCorreoValido((value ?? '').trim())
}
