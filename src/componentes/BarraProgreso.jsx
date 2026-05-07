import { combinarClases } from '../utilidades/combinarClases.js'

const widthSteps = [
  'w-0',
  'w-1/12',
  'w-2/12',
  'w-3/12',
  'w-4/12',
  'w-5/12',
  'w-6/12',
  'w-7/12',
  'w-8/12',
  'w-9/12',
  'w-10/12',
  'w-11/12',
  'w-full',
]

function getWidthClass(value, total) {
  if (!total) {
    return widthSteps[0]
  }

  const ratio = value / total
  const index = Math.max(0, Math.min(12, Math.round(ratio * 12)))
  return widthSteps[index]
}

export function BarraProgreso({
  value,
  total,
  label,
  showValue = true,
  className,
  tone = 'primary',
}) {
  const fillClass =
    tone === 'teal'
      ? 'bg-gradient-to-r from-teal to-primary-soft'
      : 'bg-gradient-to-r from-primary to-primary-soft'

  return (
    <div className={combinarClases('space-y-2', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-sm text-mute">
          <span>{label}</span>
          {showValue && (
            <span className="font-medium text-foam">
              {value}/{total}
            </span>
          )}
        </div>
      )}
      <div className="h-3 overflow-hidden rounded-full bg-white/5 ring-1 ring-inset ring-border/80">
        <div
          className={combinarClases(
            'h-full rounded-full transition-all duration-300 ease-out',
            fillClass,
            getWidthClass(value, total),
          )}
        />
      </div>
    </div>
  )
}

