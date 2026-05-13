import { Navigate, Outlet } from 'react-router-dom'
import { PantallaCargandoAutenticacion } from '../componentes/PantallaCargandoAutenticacion.jsx'
import {
  esCorreoAdminPrivilegiado,
  firebaseAuth,
} from '../modulos/autenticacion/servicios/clienteFirebase.js'
import { requiereVerificacionCorreo } from '../modulos/autenticacion/servicios/servicioFirebaseAutenticacion.js'
import { useEstadoApp } from '../modulos/progreso/contexto/useEstadoApp.js'

export function RutaSoloPublica() {
  const { authReady, user } = useEstadoApp()
  const resolvedSessionEmail = user?.email ?? firebaseAuth?.currentUser?.email ?? ''

  if (!authReady) {
    return <PantallaCargandoAutenticacion />
  }

  if (!user) {
    return <Outlet />
  }

  if (esCorreoAdminPrivilegiado(resolvedSessionEmail)) {
    return <Navigate to="/admin" replace />
  }

  if (requiereVerificacionCorreo(user)) {
    return <Navigate to="/verify-email" replace />
  }

  return <Navigate to="/dashboard" replace />
}
