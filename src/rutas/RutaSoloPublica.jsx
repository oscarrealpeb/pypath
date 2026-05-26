import { Navigate, Outlet } from 'react-router-dom'
import { PantallaCargandoAutenticacion } from '../componentes/PantallaCargandoAutenticacion.jsx'
import {
  esUsuarioAdministrador,
  requiereVerificacionCorreo,
  tieneAccesoPortalAdminActivo,
} from '../modulos/autenticacion/servicios/servicioFirebaseAutenticacion.js'
import { useEstadoApp } from '../modulos/progreso/contexto/useEstadoApp.js'

export function RutaSoloPublica() {
  const { authReady, user } = useEstadoApp()

  if (!authReady) {
    return <PantallaCargandoAutenticacion />
  }

  if (!user) {
    return <Outlet />
  }

  if (esUsuarioAdministrador(user)) {
    if (tieneAccesoPortalAdminActivo()) {
      return <Navigate to="/admin/contenido" replace />
    }

    return <Outlet />
  }

  if (requiereVerificacionCorreo(user)) {
    return <Navigate to="/verify-email" replace />
  }

  return <Navigate to="/dashboard" replace />
}
