import { Navigate, Outlet } from 'react-router-dom'
import { useEstadoApp } from '../modulos/progreso/contexto/useEstadoApp.js'

export function RutaAdministrador() {
  const { user } = useEstadoApp()

  if (!user) {
    return <Navigate to="/control" replace />
  }

  if (user.systemRole !== 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
