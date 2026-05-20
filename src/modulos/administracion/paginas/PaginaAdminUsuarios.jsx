import { useMemo, useState } from 'react'
import { Boton } from '../../../componentes/Boton.jsx'
import { Tarjeta } from '../../../componentes/Tarjeta.jsx'
import { esCorreoAdminPrivilegiado } from '../../autenticacion/servicios/clienteFirebase.js'
import { useAccionesApp, useEstadoApp } from '../../progreso/contexto/useEstadoApp.js'
import { obtenerMetricasAdmin, obtenerResumenUsuario } from '../selectores/selectoresAdmin.js'

function obtenerMensajeError(error, fallback) {
  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}

export function PaginaAdminUsuarios() {
  const { users, userStates, activity, user: currentUser } = useEstadoApp()
  const { requestPasswordReset, setSystemRole, toggleUserStatus } = useAccionesApp()
  const [query, setQuery] = useState('')
  const [feedback, setFeedback] = useState('')
  const [pendingAction, setPendingAction] = useState('')
  const metrics = obtenerMetricasAdmin(users, userStates, activity)

  const visibleUsers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return users.filter((user) => {
      if (!normalizedQuery) {
        return true
      }

      return (
        user.name.toLowerCase().includes(normalizedQuery) ||
        user.email.toLowerCase().includes(normalizedQuery)
      )
    })
  }, [query, users])

  function isBusy(actionKey) {
    return pendingAction === actionKey
  }

  function getRoleRestriction(user) {
    if (esCorreoAdminPrivilegiado(user.email)) {
      return 'La cuenta admin fija conserva su rol base y no se edita desde este panel.'
    }

    if (currentUser?.id === user.id) {
      return 'No puedes cambiar tu propio rol desde esta sesión.'
    }

    return ''
  }

  function getStatusRestriction(user) {
    if (esCorreoAdminPrivilegiado(user.email)) {
      return 'La cuenta admin fija no se deshabilita desde este panel.'
    }

    if (currentUser?.id === user.id) {
      return 'No puedes deshabilitar tu propia cuenta desde esta sesión.'
    }

    return ''
  }

  function getResetRestriction(user) {
    if (currentUser?.id === user.id) {
      return 'No puedes reiniciar la contraseña de tu propia sesión desde este panel.'
    }

    if (user.provider !== 'email') {
      return 'Las cuentas con Google administran su acceso desde Google.'
    }

    if (esCorreoAdminPrivilegiado(user.email)) {
      return 'La cuenta admin fija no usa correo de recuperación.'
    }

    return ''
  }

  async function handleRoleToggle(user) {
    const restriction = getRoleRestriction(user)
    if (restriction) {
      setFeedback(restriction)
      return
    }

    const nextRole = user.systemRole === 'admin' ? 'student' : 'admin'
    const actionKey = `role:${user.id}`

    setPendingAction(actionKey)
    setFeedback('')

    try {
      await setSystemRole(user.id, nextRole)
      setFeedback(
        nextRole === 'admin'
          ? `Ahora ${user.name} tiene acceso administrativo.`
          : `Ahora ${user.name} vuelve a tener rol de estudiante.`,
      )
    } catch (error) {
      setFeedback(obtenerMensajeError(error, 'No pudimos actualizar el rol de esa cuenta.'))
    } finally {
      setPendingAction('')
    }
  }

  async function handleStatusToggle(user) {
    const restriction = getStatusRestriction(user)
    if (restriction) {
      setFeedback(restriction)
      return
    }

    const willDisable = user.status !== 'disabled'
    const actionKey = `status:${user.id}`

    setPendingAction(actionKey)
    setFeedback('')

    try {
      await toggleUserStatus(user.id)
      setFeedback(
        willDisable
          ? `La cuenta de ${user.name} quedó deshabilitada.`
          : `La cuenta de ${user.name} volvió a quedar activa.`,
      )
    } catch (error) {
      setFeedback(obtenerMensajeError(error, 'No pudimos actualizar el estado de esa cuenta.'))
    } finally {
      setPendingAction('')
    }
  }

  async function handlePasswordReset(user) {
    const restriction = getResetRestriction(user)
    if (restriction) {
      setFeedback(restriction)
      return
    }

    const actionKey = `reset:${user.id}`

    setPendingAction(actionKey)
    setFeedback('')

    try {
      await requestPasswordReset(user.id)
      setFeedback(`Correo de recuperación enviado a ${user.email}.`)
    } catch (error) {
      setFeedback(
        obtenerMensajeError(error, 'No pudimos enviar el correo de recuperación a esa cuenta.'),
      )
    } finally {
      setPendingAction('')
    }
  }

  return (
    <div className="space-y-8">
      <Tarjeta accent className="space-y-6">
        <div className="space-y-4">
          <p className="eyebrow">Administración / Usuarios</p>
          <h1 className="font-display text-4xl font-semibold text-foam">
            Cuentas, roles y progreso de la plataforma
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-mute">
            Consulta personas registradas, revisa su avance, cambia roles, habilita o
            deshabilita cuentas y, cuando aplique, envía correos de recuperación.
          </p>
        </div>
      </Tarjeta>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <Tarjeta className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-mute">Total</p>
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

      <Tarjeta className="space-y-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow">Buscar</p>
            <h2 className="mt-4 font-display text-2xl font-semibold text-foam">
              Filtra por nombre de usuario o correo
            </h2>
          </div>

          <input
            className="field-input w-full max-w-md"
            type="text"
            value={query}
            placeholder="ana@correo.com o ana.dev"
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        {feedback ? (
          <div className="rounded-2xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-foam">
            {feedback}
          </div>
        ) : null}
      </Tarjeta>

      <div className="grid gap-4">
        {visibleUsers.map((user) => {
          const snapshot = obtenerResumenUsuario(user, userStates[user.id])
          const roleRestriction = getRoleRestriction(user)
          const statusRestriction = getStatusRestriction(user)
          const resetRestriction = getResetRestriction(user)
          const isRoleBusy = isBusy(`role:${user.id}`)
          const isStatusBusy = isBusy(`status:${user.id}`)
          const isResetBusy = isBusy(`reset:${user.id}`)
          const roleButtonLabel =
            user.systemRole === 'admin' ? 'Quitar rol admin' : 'Dar rol admin'
          const statusButtonLabel =
            user.status === 'disabled' ? 'Reactivar cuenta' : 'Deshabilitar cuenta'

          return (
            <Tarjeta key={user.id} className="space-y-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="status-chip">
                      {user.systemRole === 'admin' ? 'Admin' : 'Estudiante'}
                    </span>
                    <span className="status-chip">
                      {user.status === 'disabled' ? 'Deshabilitada' : 'Activa'}
                    </span>
                    <span className="status-chip">
                      {user.provider === 'google' ? 'Google' : 'Correo'}
                    </span>
                    {user.provider === 'email' ? (
                      <span className="status-chip">
                        {user.emailVerified ? 'Correo verificado' : 'Correo pendiente'}
                      </span>
                    ) : null}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-foam">{user.name}</h3>
                    <p className="mt-2 text-sm text-mute">{user.email}</p>
                    <p className="mt-2 text-sm text-mute">
                      Último acceso:{' '}
                      {user.lastLoginAt
                        ? new Date(user.lastLoginAt).toLocaleString('es-CO')
                        : 'Sin registro'}
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-border/80 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-mute">Lecciones</p>
                    <p className="mt-2 text-lg font-semibold text-foam">
                      {snapshot.completedLessons}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border/80 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-mute">Evaluaciones</p>
                    <p className="mt-2 text-lg font-semibold text-foam">
                      {snapshot.completedAssessments}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border/80 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-mute">
                      Rutas con avance
                    </p>
                    <p className="mt-2 text-lg font-semibold text-foam">
                      {snapshot.touchedCourses.length}
                    </p>
                  </div>
                </div>
              </div>

              {snapshot.touchedCourses.length > 0 ? (
                <div className="rounded-2xl border border-border/80 bg-white/5 p-4 text-sm text-mute">
                  {snapshot.touchedCourses
                    .map(
                      ({ course, progress }) =>
                        `${course.title} (${progress.completedCount}/${progress.totalCount})`,
                    )
                    .join(' / ')}
                </div>
              ) : (
                <div className="rounded-2xl border border-border/80 bg-white/5 p-4 text-sm text-mute">
                  Esta cuenta todavía no registra avance en cursos o evaluaciones.
                </div>
              )}

              <div className="grid gap-3 lg:grid-cols-3">
                <div className="rounded-2xl border border-border/80 bg-white/5 p-4 text-sm text-mute">
                  {roleRestriction || 'Puedes alternar entre rol de estudiante y rol admin.'}
                </div>
                <div className="rounded-2xl border border-border/80 bg-white/5 p-4 text-sm text-mute">
                  {statusRestriction ||
                    'Puedes bloquear temporalmente el acceso y luego reactivarlo.'}
                </div>
                <div className="rounded-2xl border border-border/80 bg-white/5 p-4 text-sm text-mute">
                  {resetRestriction ||
                    'Envía un correo de recuperación para cuentas creadas con email.'}
                </div>
              </div>

              <div className="flex flex-col gap-3 lg:flex-row">
                <Boton
                  variant="secondary"
                  disabled={Boolean(roleRestriction) || Boolean(pendingAction)}
                  onClick={() => handleRoleToggle(user)}
                >
                  {isRoleBusy
                    ? 'Actualizando rol...'
                    : roleButtonLabel}
                </Boton>
                <Boton
                  variant="secondary"
                  className="border-amber-500/30 bg-amber-500/10 text-amber-100 hover:bg-amber-500/15"
                  disabled={Boolean(statusRestriction) || Boolean(pendingAction)}
                  onClick={() => handleStatusToggle(user)}
                >
                  {isStatusBusy
                    ? 'Actualizando estado...'
                    : statusButtonLabel}
                </Boton>
                <Boton
                  variant="secondary"
                  disabled={Boolean(resetRestriction) || Boolean(pendingAction)}
                  onClick={() => handlePasswordReset(user)}
                >
                  {isResetBusy ? 'Enviando correo...' : 'Enviar correo de recuperación'}
                </Boton>
              </div>
            </Tarjeta>
          )
        })}
      </div>
    </div>
  )
}
