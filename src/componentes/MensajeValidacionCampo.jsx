const STATUS_CLASS_BY_TYPE = {
  available: 'text-primary',
  owned: 'text-primary',
  invalid: 'text-danger',
  taken: 'text-danger',
  checking: 'text-mute',
  unknown: 'text-warning',
}

export function MensajeValidacionCampo({ feedback, className = '' }) {
  if (!feedback?.message) {
    return null
  }

  const toneClass = STATUS_CLASS_BY_TYPE[feedback.status] ?? 'text-mute'

  return <p className={`text-xs leading-6 ${toneClass} ${className}`.trim()}>{feedback.message}</p>
}
