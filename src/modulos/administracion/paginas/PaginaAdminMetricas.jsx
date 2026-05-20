import { Tarjeta } from '../../../componentes/Tarjeta.jsx'
import { useEstadoApp } from '../../progreso/contexto/useEstadoApp.js'
import { obtenerMetricasAdmin } from '../selectores/selectoresAdmin.js'

export function PaginaAdminMetricas() {
  const { users, userStates, activity } = useEstadoApp()
  const metrics = obtenerMetricasAdmin(users, userStates, activity)

  return (
    <div className="space-y-8">
      <Tarjeta accent className="space-y-6">
        <div className="space-y-4">
          <p className="eyebrow">Administración / Métricas</p>
          <h1 className="font-display text-4xl font-semibold text-foam">
            Señales básicas de uso y gestión
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-mute">
            Vista rápida del estado de la plataforma: usuarios activos, cuentas
            deshabilitadas, roles administrativos, cursos con más tracción y movimientos
            sincronizados.
          </p>
        </div>
      </Tarjeta>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <Tarjeta className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-mute">Usuarios</p>
          <p className="font-display text-3xl font-semibold text-foam">{metrics.totalUsers}</p>
        </Tarjeta>
        <Tarjeta className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-mute">Activos</p>
          <p className="font-display text-3xl font-semibold text-foam">{metrics.activeUsers}</p>
        </Tarjeta>
        <Tarjeta className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-mute">Deshabilitados</p>
          <p className="font-display text-3xl font-semibold text-foam">
            {metrics.disabledUsers}
          </p>
        </Tarjeta>
        <Tarjeta className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-mute">Admins</p>
          <p className="font-display text-3xl font-semibold text-foam">{metrics.adminUsers}</p>
        </Tarjeta>
        <Tarjeta className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-mute">Actividad 7 días</p>
          <p className="font-display text-3xl font-semibold text-foam">
            {metrics.usersWithRecentActivity}
          </p>
        </Tarjeta>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_.95fr]">
        <Tarjeta className="space-y-5">
          <div>
            <p className="eyebrow">Popularidad</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-foam">
              Cursos con más tracción
            </h2>
          </div>

          <div className="space-y-3">
            {metrics.coursePopularity.map((course) => (
              <div
                key={course.courseId}
                className="rounded-2xl border border-border/80 bg-white/5 px-4 py-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-foam">{course.title}</p>
                    <p className="mt-1 text-sm text-mute">
                      Usuarios con al menos un hito completado en este curso
                    </p>
                  </div>
                  <p className="font-display text-2xl font-semibold text-primary">
                    {course.engagedUsers}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Tarjeta>

        <Tarjeta className="space-y-5">
          <div>
            <p className="eyebrow">Actividad sincronizada</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-foam">
              Últimos eventos registrados
            </h2>
          </div>

          <div className="space-y-3">
            {metrics.recentEvents.length > 0 ? (
              metrics.recentEvents.map((event) => (
                <div
                  key={event.id}
                  className="rounded-2xl border border-border/80 bg-white/5 px-4 py-4"
                >
                  <p className="text-sm font-semibold text-foam">{event.label}</p>
                  <p className="mt-2 text-sm text-mute">
                    {new Date(event.timestamp).toLocaleString('es-CO')}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-mute">
                    {event.details.join(' / ') || 'Sin detalles adicionales.'}
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-border/80 bg-white/5 px-4 py-4 text-sm text-mute">
                Aún no hay actividad sincronizada. Inicia sesión, completa una misión o
                gestiona usuarios y contenido desde una sesión autenticada para poblar esta vista.
              </div>
            )}
          </div>
        </Tarjeta>
      </div>
    </div>
  )
}
