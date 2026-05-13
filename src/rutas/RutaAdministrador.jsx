import { Navigate, Outlet } from 'react-router-dom'
import { PantallaCargandoAutenticacion } from '../componentes/PantallaCargandoAutenticacion.jsx'
import {
  esCorreoAdminPrivilegiado,
  firebaseAuth,
} from '../modulos/autenticacion/servicios/clienteFirebase.js'
import { useEstadoApp } from '../modulos/progreso/contexto/useEstadoApp.js'

export function RutaAdministrador() {
  const { authReady, user } = useEstadoApp()
  const resolvedSessionEmail = user?.email ?? firebaseAuth?.currentUser?.email ?? ''

  if (!authReady) {
    return <PantallaCargandoAutenticacion />
  }

  if (!user) {
    return <Navigate to="/control" replace />
  }

  if (!esCorreoAdminPrivilegiado(resolvedSessionEmail)) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
