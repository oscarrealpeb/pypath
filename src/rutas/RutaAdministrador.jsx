import { Navigate, Outlet } from 'react-router-dom'
import { PantallaCargandoAutenticacion } from '../componentes/PantallaCargandoAutenticacion.jsx'
import { esUsuarioAdministrador } from '../modulos/autenticacion/servicios/servicioFirebaseAutenticacion.js'
import { useEstadoApp } from '../modulos/progreso/contexto/useEstadoApp.js'

export function RutaAdministrador() {
  const { authReady, user } = useEstadoApp()

  if (!authReady) {
    return <PantallaCargandoAutenticacion />
  }

  if (!user) {
    return <Navigate to="/control" replace />
  }

  if (!esUsuarioAdministrador(user)) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
