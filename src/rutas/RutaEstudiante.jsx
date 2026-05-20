import { Navigate, Outlet } from 'react-router-dom'
import {
  esUsuarioAdministrador,
  tieneAccesoPortalAdminActivo,
} from '../modulos/autenticacion/servicios/servicioFirebaseAutenticacion.js'
import { useEstadoApp } from '../modulos/progreso/contexto/useEstadoApp.js'

export function RutaEstudiante() {
  const { user } = useEstadoApp()

  if (esUsuarioAdministrador(user)) {
    return <Navigate to={tieneAccesoPortalAdminActivo() ? '/admin/contenido' : '/control'} replace />
  }

  return <Outlet />
}
