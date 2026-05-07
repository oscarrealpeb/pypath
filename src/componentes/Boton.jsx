import { combinarClases } from '../utilidades/combinarClases.js'

const variantClasses = {
  primary:
    'border-primary bg-primary text-slate-950 shadow-glow hover:-translate-y-0.5 hover:bg-primary-soft',
  secondary:
    'border-border bg-panel-2/80 text-foam hover:border-primary/40 hover:bg-panel/90',
  ghost: 'border-transparent bg-transparent text-mute hover:bg-white/5 hover:text-foam',
}

const sizeClasses = {
  sm: 'px-3.5 py-2 text-sm',
  md: 'px-5 py-3 text-sm',
  lg: 'px-6 py-3.5 text-base',
}

export function Boton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  ...props
}) {
  return (
    <button
      className={combinarClases(
        'inline-flex items-center justify-center gap-2 rounded-2xl border font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

