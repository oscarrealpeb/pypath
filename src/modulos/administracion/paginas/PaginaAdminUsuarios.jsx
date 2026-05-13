import { useMemo, useState } from 'react'
import { Boton } from '../../../componentes/Boton.jsx'
import { Tarjeta } from '../../../componentes/Tarjeta.jsx'
import { esCorreoAdminPrivilegiado } from '../../autenticacion/servicios/clienteFirebase.js'
import { normalizarNickname } from '../../autenticacion/servicios/servicioValidacionAutenticacion.js'
import { useAccionesApp, useEstadoApp } from '../../progreso/contexto/useEstadoApp.js'
import { obtenerMetricasAdmin, obtenerResumenUsuario } from '../selectores/selectoresAdmin.js'

export function PaginaAdminUsuarios() {
  const { users, userStates, activity, user: currentUser } = useEstadoApp()
  const { requestPasswordReset, setSystemRole, toggleUserStatus } = useAccionesApp()
  const [query, setQuery] = useState('')
  const [feedback, setFeedback] = useState('')
  const metrics = obtenerMetricasAdmin(users, userStates, activity)

  const visibleUsers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return users.filter((user) => {
      if (!normalizedQuery) {
        return true
      }

      return (
        user.name.toLowerCase().includes(normalizedQuery) ||
        user.email.toLowerCase().includes(normalizedQuery) ||
        (user.nicknameNormalized ?? normalizarNickname(user.nickname)).includes(normalizedQuery)
      )
    })
  }, [query, users])

  async function handleToggleRole(user) {
    try {
      await setSystemRole(user.id, user.systemRole === 'admin' ? 'student' : 'admin')
      setFeedback('Rol de usuario actualizado.')
    } catch (error) {
      setFeedback(error.message)
    }
  }

  async function handleToggleStatus(userId) {
    try {
      await toggleUserStatus(userId)
      setFeedback('Estado de usuario actualizado.')
    } catch (error) {
      setFeedback(error.message)
    }
  }

  async function handlePasswordReset(userId) {
    try {
      await requestPasswordReset(userId)
      setFeedback('Correo de recuperación enviado a esa cuenta.')
    } catch (error) {
      setFeedback(error.message)
    }
  }

  function getResetRestriction(user, canEdit) {
    if (!canEdit) {
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

  return (
    <div className="space-y-8">
      <Tarjeta accent className="space-y-6">
        <div className="space-y-4">
          <p className="eyebrow">Administración / Usuarios</p>
          <h1 className="font-display text-4xl font-semibold text-foam">
            Cuentas, roles y progreso de la plataforma
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-mute">
            Este panel cubre la base de la HU-17: listado de usuarios, cambio de rol,
            deshabilitación a nivel de aplicación, envío de correo de recuperación y vista rápida del progreso individual.
          </p>
        </div>
      </Tarjeta>

      <div className="grid gap-4 md:grid-cols-4">
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
          <p className="font-display text-3xl font-semibold text-foam">{metrics.disabledUsers}</p>
        </Tarjeta>
        <Tarjeta className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-mute">Admins</p>
          <p className="font-display text-3xl font-semibold text-foam">{metrics.adminUsers}</p>
        </Tarjeta>
      </div>

      <Tarjeta className="space-y-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow">Buscar</p>
            <h2 className="mt-4 font-display text-2xl font-semibold text-foam">
              Filtra por nombre, correo o nickname
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
          const canEdit = currentUser?.id !== user.id
          const resetRestriction = getResetRestriction(user, canEdit)
          const canResetPassword = !resetRestriction

          return (
            <Tarjeta key={user.id} className="space-y-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="eyebrow">{user.systemRole === 'admin' ? 'Admin' : 'Estudiante'}</span>
                    <span className="status-chip">
                      {user.status === 'disabled' ? 'Deshabilitado' : 'Activo'}
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
                    <p className="mt-2 text-sm text-mute">Nickname: @{user.nickname ?? 'sin-nickname'}</p>
                    <p className="mt-2 text-sm text-mute">
                      Último acceso:{' '}
                      {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString('es-CO') : 'Sin registro'}
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-border/80 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-mute">Lecciones</p>
                    <p className="mt-2 text-lg font-semibold text-foam">{snapshot.completedLessons}</p>
                  </div>
                  <div className="rounded-2xl border border-border/80 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-mute">Evaluaciones</p>
                    <p className="mt-2 text-lg font-semibold text-foam">
                      {snapshot.completedAssessments}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border/80 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-mute">Rutas con avance</p>
                    <p className="mt-2 text-lg font-semibold text-foam">{snapshot.touchedCourses.length}</p>
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
              ) : null}

              {resetRestriction ? (
                <div className="rounded-2xl border border-border/80 bg-white/5 p-4 text-sm text-mute">
                  {resetRestriction}
                </div>
              ) : null}

              <div className="flex flex-col gap-3 lg:flex-row">
                <Boton
                  variant="secondary"
                  disabled={!canEdit}
                  onClick={() => handleToggleRole(user)}
                >
                  {user.systemRole === 'admin' ? 'Quitar admin' : 'Dar rol admin'}
                </Boton>
                <Boton
                  variant="secondary"
                  disabled={!canResetPassword}
                  onClick={() => handlePasswordReset(user.id)}
                >
                  {canResetPassword ? 'Enviar correo de recuperación' : 'Reset no disponible'}
                </Boton>
                <Boton
                  variant="ghost"
                  disabled={!canEdit}
                  onClick={() => handleToggleStatus(user.id)}
                >
                  {user.status === 'disabled' ? 'Reactivar cuenta' : 'Deshabilitar cuenta'}
                </Boton>
              </div>
            </Tarjeta>
          )
        })}
      </div>
    </div>
  )
}
