import { useEffect, useMemo, useRef, useState } from 'react'
import { useAccionesApp, useEstadoApp } from '../modulos/progreso/contexto/useEstadoApp.js'
import { combinarClases } from '../utilidades/combinarClases.js'

const opcionesTema = [
  { value: 'system', label: 'Sistema' },
  { value: 'light', label: 'Claro' },
  { value: 'dark', label: 'Oscuro' },
]

export function SelectorTema() {
  const { themePreference = 'system' } = useEstadoApp()
  const { setThemePreference } = useAccionesApp()
  const [menuAbierto, setMenuAbierto] = useState(false)
  const contenedorRef = useRef(null)
  const etiquetaActual = useMemo(
    () => opcionesTema.find((opcion) => opcion.value === themePreference)?.label ?? 'Sistema',
    [themePreference],
  )

  useEffect(() => {
    if (!menuAbierto) {
      return undefined
    }

    function manejarClickFuera(evento) {
      if (!contenedorRef.current?.contains(evento.target)) {
        setMenuAbierto(false)
      }
    }

    function manejarEscape(evento) {
      if (evento.key === 'Escape') {
        setMenuAbierto(false)
      }
    }

    document.addEventListener('mousedown', manejarClickFuera)
    document.addEventListener('keydown', manejarEscape)

    return () => {
      document.removeEventListener('mousedown', manejarClickFuera)
      document.removeEventListener('keydown', manejarEscape)
    }
  }, [menuAbierto])

  function seleccionarTema(valor) {
    setThemePreference(valor)
    setMenuAbierto(false)
  }

  return (
    <div ref={contenedorRef} className="relative z-[70]">
      <button
        type="button"
        aria-expanded={menuAbierto}
        aria-haspopup="menu"
        onClick={() => setMenuAbierto((actual) => !actual)}
        className="inline-flex items-center gap-2 rounded-2xl border border-border/80 bg-white/5 px-3 py-2 text-sm font-medium text-foam transition hover:border-primary/30 hover:bg-panel/90"
      >
        <span>Tema</span>
        <span className="hidden text-xs text-mute sm:inline">{etiquetaActual}</span>
        <span aria-hidden className="text-xs text-mute">
          ▾
        </span>
      </button>

      {menuAbierto && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+0.4rem)] z-[80] min-w-[11rem] rounded-2xl border border-border/80 bg-panel/95 p-2 shadow-card backdrop-blur"
        >
          <div className="space-y-1">
            {opcionesTema.map((opcion) => (
              <button
                key={opcion.value}
                type="button"
                role="menuitemradio"
                aria-checked={themePreference === opcion.value}
                onClick={() => seleccionarTema(opcion.value)}
                className={combinarClases(
                  'flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition',
                  themePreference === opcion.value
                    ? 'bg-primary/15 text-primary'
                    : 'text-mute hover:bg-white/5 hover:text-foam',
                )}
              >
                <span>{opcion.label}</span>
                {themePreference === opcion.value && (
                  <span className="text-xs font-semibold">Activo</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
