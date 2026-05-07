import { combinarClases } from '../utilidades/combinarClases.js'

export function Tarjeta({ children, className, accent = false }) {
  return (
    <div
      className={combinarClases(
        'panel p-6',
        accent && 'border-primary/30 bg-panel shadow-glow',
        className,
      )}
    >
      {children}
    </div>
  )
}

