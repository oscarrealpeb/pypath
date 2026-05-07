import { useContext } from 'react'
import { ContextoAccionesApp, ContextoEstadoApp } from './ContextosEstadoApp.js'

export function useEstadoApp() {
  const context = useContext(ContextoEstadoApp)

  if (!context) {
    throw new Error('useEstadoApp debe usarse dentro de ProveedorEstadoApp')
  }

  return context
}

export function useAccionesApp() {
  const context = useContext(ContextoAccionesApp)

  if (!context) {
    throw new Error('useAccionesApp debe usarse dentro de ProveedorEstadoApp')
  }

  return context
}

