import { Navigate, Outlet } from 'react-router-dom'
import { useEstadoApp } from '../modulos/progreso/contexto/useEstadoApp.js'

export function RutaEstudiante() {
  const { user } = useEstadoApp()

  if (user?.systemRole === 'admin') {
    return <Navigate to="/admin" replace />
  }

  return <Outlet />
}
