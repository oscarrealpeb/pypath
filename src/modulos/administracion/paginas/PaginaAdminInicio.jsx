import { useNavigate } from 'react-router-dom'
import { Boton } from '../../../componentes/Boton.jsx'
import { Tarjeta } from '../../../componentes/Tarjeta.jsx'
import { useEstadoApp } from '../../progreso/contexto/useEstadoApp.js'
import { IndicadorAyudaAdmin } from '../componentes/IndicadorAyudaAdmin.jsx'
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
            <p className="eyebrow">Administración / Resumen</p>
            <h1 className="font-display text-4xl font-semibold text-foam">
              Panel general de la plataforma
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-mute">
              Vista rápida del estado actual de PyPath. Este resumen reutiliza datos ya
              sincronizados del panel para no disparar lecturas extra en Firebase por cada
              tarjeta.
            </p>
          </div>

          <Boton onClick={() => navigate('/admin/contenido')}>Abrir CMS de contenido</Boton>
        </div>
      </Tarjeta>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <Tarjeta className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-mute">Usuarios totales</p>
          <p className="font-display text-3xl font-semibold text-foam">{metrics.totalUsers}</p>
        </Tarjeta>
        <Tarjeta className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-mute">Activas</p>
          <p className="font-display text-3xl font-semibold text-foam">{metrics.activeUsers}</p>
        </Tarjeta>
        <Tarjeta className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-mute">Deshabilitadas</p>
          <p className="font-display text-3xl font-semibold text-foam">
            {metrics.disabledUsers}
          </p>
        </Tarjeta>
        <Tarjeta className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-mute">Admins</p>
          <p className="font-display text-3xl font-semibold text-foam">{metrics.adminUsers}</p>
        </Tarjeta>
        <Tarjeta className="space-y-2">
          <div className="flex items-center gap-2">
            <p className="text-xs uppercase tracking-[0.24em] text-mute">
              Usuarios únicos con acceso en 7 días
            </p>
            <IndicadorAyudaAdmin title="Cómo se cuenta esta tarjeta" align="right" side="top">
              Cuenta usuarios distintos cuyo último acceso ocurrió dentro de los últimos 7 días.
              Si la misma cuenta entra varias veces, sigue contando solo una vez.
            </IndicadorAyudaAdmin>
          </div>
          <p className="font-display text-3xl font-semibold text-foam">
            {metrics.usersWithRecentSignIn}
          </p>
        </Tarjeta>
        <Tarjeta className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-mute">Cursos editables</p>
          <p className="font-display text-3xl font-semibold text-foam">{content.cursos.length}</p>
        </Tarjeta>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Tarjeta className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-mute">Estudiantes</p>
          <p className="font-display text-3xl font-semibold text-foam">{metrics.studentUsers}</p>
        </Tarjeta>
        <Tarjeta className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-mute">Accesos con correo</p>
          <p className="font-display text-3xl font-semibold text-foam">{metrics.emailUsers}</p>
        </Tarjeta>
        <Tarjeta className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-mute">Accesos con Google</p>
          <p className="font-display text-3xl font-semibold text-foam">{metrics.googleUsers}</p>
        </Tarjeta>
        <Tarjeta className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-mute">Correos verificados</p>
          <p className="font-display text-3xl font-semibold text-foam">
            {metrics.verifiedEmailUsers}
          </p>
        </Tarjeta>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Tarjeta className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-mute">Unidades</p>
          <p className="font-display text-3xl font-semibold text-foam">{totalUnits}</p>
        </Tarjeta>
        <Tarjeta className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-mute">Lecciones</p>
          <p className="font-display text-3xl font-semibold text-foam">{totalLessons}</p>
        </Tarjeta>
        <Tarjeta className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-mute">Cursos con avance</p>
          <p className="font-display text-3xl font-semibold text-foam">
            {metrics.coursePopularity.filter((course) => course.engagedUsers > 0).length}
          </p>
        </Tarjeta>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Tarjeta className="space-y-4">
          <p className="eyebrow">Contenido</p>
          <h2 className="font-display text-2xl font-semibold text-foam">
            Crear cursos, unidades y lecciones
          </h2>
          <p className="text-mute">
            Gestiona títulos, teoría, videos, documentación, ejemplos, ejercicios y
            evaluaciones desde el CMS visual del panel.
          </p>
          <Boton variant="secondary" onClick={() => navigate('/admin/contenido')}>
            Ir a contenido
          </Boton>
        </Tarjeta>

        <Tarjeta className="space-y-4">
          <p className="eyebrow">Usuarios</p>
          <h2 className="font-display text-2xl font-semibold text-foam">
            Roles, estados y progreso
          </h2>
          <p className="text-mute">
            Revisa cuentas, cambia roles, deshabilita o reactiva accesos y consulta el avance,
            el XP y la liga de cada persona.
          </p>
          <Boton variant="secondary" onClick={() => navigate('/admin/usuarios')}>
            Ir a usuarios
          </Boton>
        </Tarjeta>

        <Tarjeta className="space-y-4">
          <p className="eyebrow">Métricas</p>
          <h2 className="font-display text-2xl font-semibold text-foam">
            Señales rápidas de uso
          </h2>
          <p className="text-mute">
            Consulta tracción por curso y eventos recientes solo cuando entras a la vista de
            métricas, para mantener controlado el consumo de lecturas.
          </p>
          <Boton variant="secondary" onClick={() => navigate('/admin/metricas')}>
            Ir a métricas
          </Boton>
        </Tarjeta>
      </div>
    </div>
  )
}
