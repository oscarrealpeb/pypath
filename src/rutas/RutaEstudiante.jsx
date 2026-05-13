import { Navigate, Outlet } from 'react-router-dom'
import {
  esCorreoAdminPrivilegiado,
  firebaseAuth,
} from '../modulos/autenticacion/servicios/clienteFirebase.js'
import { useEstadoApp } from '../modulos/progreso/contexto/useEstadoApp.js'

export function RutaEstudiante() {
  const { user } = useEstadoApp()
  const resolvedSessionEmail = user?.email ?? firebaseAuth?.currentUser?.email ?? ''

  if (esCorreoAdminPrivilegiado(resolvedSessionEmail)) {
    return <Navigate to="/admin" replace />
  }

  return <Outlet />
}
