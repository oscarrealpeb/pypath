import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { PantallaCargandoAutenticacion } from '../componentes/PantallaCargandoAutenticacion.jsx'
import { requiereVerificacionCorreo } from '../modulos/autenticacion/servicios/servicioFirebaseAutenticacion.js'
import { useEstadoApp } from '../modulos/progreso/contexto/useEstadoApp.js'

export function RutaProtegida({ allowUnverified = false }) {
  const { authReady, user } = useEstadoApp()
  const location = useLocation()

  if (!authReady) {
    return <PantallaCargandoAutenticacion />
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (!allowUnverified && requiereVerificacionCorreo(user)) {
    return <Navigate to="/verify-email" replace />
  }

  return <Outlet />
}
