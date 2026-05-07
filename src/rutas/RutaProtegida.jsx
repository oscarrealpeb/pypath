import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useEstadoApp } from '../modulos/progreso/contexto/useEstadoApp.js'

export function RutaProtegida() {
  const { user } = useEstadoApp()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}
