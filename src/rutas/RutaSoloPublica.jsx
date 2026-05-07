import { Navigate, Outlet } from 'react-router-dom'
import { useEstadoApp } from '../modulos/progreso/contexto/useEstadoApp.js'

export function RutaSoloPublica() {
  const { user } = useEstadoApp()

  if (!user) {
    return <Outlet />
  }

  if (user.systemRole === 'admin') {
    return <Navigate to="/admin" replace />
  }

  return <Navigate to="/dashboard" replace />
}
