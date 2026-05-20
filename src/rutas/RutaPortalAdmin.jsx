import { Navigate, Outlet } from 'react-router-dom'
import { PantallaCargandoAutenticacion } from '../componentes/PantallaCargandoAutenticacion.jsx'
import { esUsuarioAdministrador } from '../modulos/autenticacion/servicios/servicioFirebaseAutenticacion.js'
import { useEstadoApp } from '../modulos/progreso/contexto/useEstadoApp.js'

export function RutaPortalAdmin() {
  const { authReady, user } = useEstadoApp()

  if (!authReady) {
    return <PantallaCargandoAutenticacion />
  }

  if (user && esUsuarioAdministrador(user)) {
    return <Navigate to="/admin/contenido" replace />
  }

  return <Outlet />
}
