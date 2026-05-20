import { useNavigate } from 'react-router-dom'
import { Boton } from '../../../componentes/Boton.jsx'
import { Tarjeta } from '../../../componentes/Tarjeta.jsx'
import { useEstadoApp } from '../../progreso/contexto/useEstadoApp.js'
import { obtenerMetricasAdmin } from '../selectores/selectoresAdmin.js'

export function PaginaAdminInicio() {
  const navigate = useNavigate()
  const { users, userStates, activity, content } = useEstadoApp()
  const metrics = obtenerMetricasAdmin(users, userStates, activity)
  const totalUnits = content.cursos.reduce((sum, course) => sum + course.units.length, 0)
  const totalLessons = content.cursos.reduce(
    (sum, course) =>
      sum + course.units.reduce((innerSum, unit) => innerSum + unit.lessons.length, 0),
    0,
  )

  return (
    <div className="space-y-8">
      <Tarjeta accent className="space-y-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <p className="eyebrow">Administración</p>
            <h1 className="font-display text-4xl font-semibold text-foam">
              Panel de control de la plataforma
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-mute">
              Desde aquí puedes crear y publicar contenido, revisar usuarios y ver métricas
              básicas de uso sin tocar archivos a mano.
            </p>
          </div>

          <Boton onClick={() => navigate('/admin/contenido')}>Abrir CMS de contenido</Boton>
        </div>
      </Tarjeta>

      <div className="grid gap-4 md:grid-cols-4">
        <Tarjeta className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-mute">Cursos editables</p>
          <p className="font-display text-3xl font-semibold text-foam">{content.cursos.length}</p>
        </Tarjeta>
        <Tarjeta className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-mute">Unidades</p>
          <p className="font-display text-3xl font-semibold text-foam">{totalUnits}</p>
        </Tarjeta>
        <Tarjeta className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-mute">Lecciones</p>
          <p className="font-display text-3xl font-semibold text-foam">{totalLessons}</p>
        </Tarjeta>
        <Tarjeta className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-mute">Usuarios activos</p>
          <p className="font-display text-3xl font-semibold text-foam">{metrics.activeUsers}</p>
        </Tarjeta>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Tarjeta className="space-y-4">
          <p className="eyebrow">CMS</p>
          <h2 className="font-display text-2xl font-semibold text-foam">
            Crear cursos, unidades y lecciones
          </h2>
          <p className="text-mute">
            La parte central del backlog ya está cubierta con un editor visual para títulos,
            videos, documentación, ejemplos, imágenes y retos.
          </p>
          <Boton variant="secondary" onClick={() => navigate('/admin/contenido')}>
            Ir a contenido
          </Boton>
        </Tarjeta>

        <Tarjeta className="space-y-4">
          <p className="eyebrow">Usuarios</p>
          <h2 className="font-display text-2xl font-semibold text-foam">
            Gestión de acceso y progreso
          </h2>
          <p className="text-mute">
            Revisa cuentas, cambia roles, deshabilita usuarios y marca reinicios de
            contraseña para pruebas de administración.
          </p>
          <Boton variant="secondary" onClick={() => navigate('/admin/usuarios')}>
            Ir a usuarios
          </Boton>
        </Tarjeta>

        <Tarjeta className="space-y-4">
          <p className="eyebrow">Métricas</p>
          <h2 className="font-display text-2xl font-semibold text-foam">
            Resumen rápido del uso
          </h2>
          <p className="text-mute">
            Consulta usuarios activos, cuentas deshabilitadas, cursos con más tracción y
            actividad sincronizada de la plataforma.
          </p>
          <Boton variant="secondary" onClick={() => navigate('/admin/metricas')}>
            Ir a métricas
          </Boton>
        </Tarjeta>
      </div>
    </div>
  )
}
