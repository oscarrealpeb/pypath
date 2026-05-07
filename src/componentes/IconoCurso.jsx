import { combinarClases } from '../utilidades/combinarClases.js'

const sizeClasses = {
  sm: 'h-12 w-12',
  md: 'h-14 w-14',
  lg: 'h-16 w-16',
}

function IconFrame({ children, className, size = 'md' }) {
  return (
    <div
      className={combinarClases(
        'relative flex items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary shadow-glow',
        sizeClasses[size],
        className,
      )}
    >
      <div className="absolute inset-1 rounded-[14px] border border-white/5 bg-gradient-to-br from-primary/10 to-transparent" />
      <div className="relative">{children}</div>
    </div>
  )
}

function FundamentalsIcon({ size }) {
  return (
    <IconFrame size={size}>
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 18h44" opacity="0.55" />
        <rect x="10" y="14" width="44" height="36" rx="8" />
        <path d="m20 28 6 4-6 4" />
        <path d="M32 36h10" />
        <circle cx="18" cy="18" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="24" cy="18" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    </IconFrame>
  )
}

function PySideIcon({ size }) {
  return (
    <IconFrame size={size}>
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="10" y="14" width="44" height="36" rx="8" />
        <path d="M10 24h44" opacity="0.55" />
        <path d="M24 24v26" opacity="0.4" />
        <rect x="31" y="31" width="14" height="10" rx="3" />
        <path d="m18 34 4-4 4 4" />
      </svg>
    </IconFrame>
  )
}

function PygameIcon({ size }) {
  return (
    <IconFrame size={size}>
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 24h24c7 0 12 5 12 12v3c0 6-4 11-10 11-4 0-6-2-8-5l-2-3-2 3c-2 3-4 5-8 5-6 0-10-5-10-11v-3c0-7 5-12 12-12Z" />
        <path d="M24 34h8" />
        <path d="M28 30v8" />
        <circle cx="42" cy="34" r="1.8" fill="currentColor" stroke="none" />
        <circle cx="48" cy="38" r="1.8" fill="currentColor" stroke="none" />
      </svg>
    </IconFrame>
  )
}

function SecurityIcon({ size }) {
  return (
    <IconFrame size={size}>
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 12 48 18v11c0 10-6.8 18.7-16 22-9.2-3.3-16-12-16-22V18l16-6Z" />
        <path d="m26 31 4 4 8-8" />
      </svg>
    </IconFrame>
  )
}

function DataIcon({ size }) {
  return (
    <IconFrame size={size}>
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 48h36" />
        <path d="M20 44V28" />
        <path d="M32 44V20" />
        <path d="M44 44V32" />
        <path d="m18 20 12-6 12 8" opacity="0.55" />
      </svg>
    </IconFrame>
  )
}

export function IconoCurso({ courseId, className, size = 'md' }) {
  const props = { className, size }

  switch (courseId) {
    case 'python-fundamentals':
      return <FundamentalsIcon {...props} />
    case 'pyside6':
      return <PySideIcon {...props} />
    case 'pygame':
      return <PygameIcon {...props} />
    case 'python-ciberseguridad':
      return <SecurityIcon {...props} />
    case 'pandas-finanzas':
      return <DataIcon {...props} />
    default:
      return <FundamentalsIcon {...props} />
  }
}

