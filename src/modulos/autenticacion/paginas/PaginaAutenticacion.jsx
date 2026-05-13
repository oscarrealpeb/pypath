import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Boton } from '../../../componentes/Boton.jsx'
import { MensajeValidacionCampo } from '../../../componentes/MensajeValidacionCampo.jsx'
import { Tarjeta } from '../../../componentes/Tarjeta.jsx'
import { obtenerCatalogoCursos } from '../../contenido/servicios/repositorioContenido.js'
import { esCorreoAdminPrivilegiado } from '../servicios/clienteFirebase.js'
import { verificarDisponibilidadCorreo } from '../servicios/servicioFirebaseAutenticacion.js'
import { verificarDisponibilidadNombreVisible } from '../servicios/servicioPerfilesFirebase.js'
import { useAccionesApp, useEstadoApp } from '../../progreso/contexto/useEstadoApp.js'
import {
  crearNombreCompleto,
  esCorreoValido,
  evaluarFortalezaContrasena,
  obtenerMensajeContrasenaMinima,
  validarNombreVisible,
} from '../servicios/servicioValidacionAutenticacion.js'

function PasswordStrengthMeter({ password }) {
  const strength = evaluarFortalezaContrasena(password)

  if (!password) {
    return null
  }

  const activeSegments = Math.max(1, Math.min(4, strength.score - 1))

  return (
    <div className="space-y-3 rounded-2xl border border-border/80 bg-white/5 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.22em] text-mute">Seguridad</p>
        <span className="text-sm font-semibold text-foam">{strength.label}</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <span
            key={index}
            className={`h-2 rounded-full ${
              index < activeSegments ? strength.toneClass : 'bg-white/10'
            }`}
          />
        ))}
      </div>
      <div className="grid gap-2 text-xs text-mute sm:grid-cols-2">
        <span className={strength.checks.minLength ? 'text-primary' : ''}>Mínimo 8 caracteres</span>
        <span className={strength.checks.uppercase ? 'text-primary' : ''}>Una mayúscula</span>
        <span className={strength.checks.lowercase ? 'text-primary' : ''}>Una minúscula</span>
        <span className={strength.checks.number ? 'text-primary' : ''}>Un número</span>
      </div>
    </div>
  )
}

export function PaginaAutenticacion({ mode, portal = 'student', requireAdminAccess = false }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { firebaseEnabled, onboarding } = useEstadoApp()
  const { authenticate, logout } = useAccionesApp()
  const recommendedProfile = location.state?.recommendedProfile ?? null
  const recommendedPlan = location.state?.recommendedPlan ?? null
  const selectedGoalCourseId = recommendedProfile?.goalCourseId ?? location.state?.goalCourseId ?? null
  const previewCourseTitle = location.state?.previewCourseTitle
  const goalCourseTitle = obtenerCatalogoCursos().find(
    (course) => course.id === selectedGoalCourseId,
  )?.title
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    identifier: '',
    password: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [nameAvailabilityFeedback, setNameAvailabilityFeedback] = useState({
    status: 'idle',
    message: '',
  })
  const [emailAvailabilityFeedback, setEmailAvailabilityFeedback] = useState({
    status: 'idle',
    message: '',
  })

  const isAdminPortal = portal === 'admin'
  const isRegister = mode === 'register' && !isAdminPortal
  const requestedPath = location.state?.from
  const shouldReturnToRequestedPath =
    !isRegister && !isAdminPortal && onboarding.completed && typeof requestedPath === 'string'
  const nameFeedback = useMemo(() => {
    if (!isRegister) {
      return { status: 'idle', message: '' }
    }

    const trimmedName = crearNombreCompleto(formState.name)

    if (!trimmedName) {
      return { status: 'idle', message: '' }
    }

    const nameMessage = validarNombreVisible(trimmedName)

    if (nameMessage) {
      return {
        status: 'invalid',
        message: nameMessage,
      }
    }

    return nameAvailabilityFeedback
  }, [formState.name, isRegister, nameAvailabilityFeedback])
  const emailFeedback = useMemo(() => {
    if (!isRegister) {
      return { status: 'idle', message: '' }
    }

    const trimmedEmail = formState.email.trim()

    if (!trimmedEmail) {
      return { status: 'idle', message: '' }
    }

    if (!esCorreoValido(trimmedEmail)) {
      return {
        status: 'invalid',
        message: 'Escribe un correo con formato válido.',
      }
    }

    return emailAvailabilityFeedback
  }, [emailAvailabilityFeedback, formState.email, isRegister])

  function handleChange(event) {
    const { name, value } = event.target
    setError('')

    if (name === 'email') {
      const trimmedEmail = value.trim()

      if (!trimmedEmail) {
        setEmailAvailabilityFeedback({ status: 'idle', message: '' })
      } else if (esCorreoValido(trimmedEmail)) {
        setEmailAvailabilityFeedback({
          status: 'checking',
          message: 'Validando disponibilidad del correo...',
        })
      } else {
        setEmailAvailabilityFeedback({ status: 'idle', message: '' })
      }
    }

    if (name === 'name') {
      const trimmedName = crearNombreCompleto(value)

      if (!trimmedName) {
        setNameAvailabilityFeedback({ status: 'idle', message: '' })
      } else if (!validarNombreVisible(trimmedName)) {
        setNameAvailabilityFeedback({
          status: 'checking',
          message: 'Validando disponibilidad del nombre visible...',
        })
      } else {
        setNameAvailabilityFeedback({ status: 'idle', message: '' })
      }
    }

    setFormState((current) => ({
      ...current,
      [name]: value,
    }))
  }

  useEffect(() => {
    if (!isRegister) {
      return undefined
    }

    const trimmedName = crearNombreCompleto(formState.name)
    const nameMessage = validarNombreVisible(trimmedName)

    if (!trimmedName || nameMessage) {
      return undefined
    }

    let isCancelled = false

    const timeoutId = window.setTimeout(async () => {
      const nextFeedback = await verificarDisponibilidadNombreVisible(trimmedName)

      if (!isCancelled) {
        setNameAvailabilityFeedback(nextFeedback)
      }
    }, 350)

    return () => {
      isCancelled = true
      window.clearTimeout(timeoutId)
    }
  }, [formState.name, isRegister])

  useEffect(() => {
    if (!isRegister) {
      return undefined
    }

    const trimmedEmail = formState.email.trim()

    if (!trimmedEmail || !esCorreoValido(trimmedEmail)) {
      return undefined
    }

    let isCancelled = false

    const timeoutId = window.setTimeout(async () => {
      const nextFeedback = await verificarDisponibilidadCorreo(trimmedEmail)

      if (!isCancelled) {
        setEmailAvailabilityFeedback(nextFeedback)
      }
    }, 350)

    return () => {
      isCancelled = true
      window.clearTimeout(timeoutId)
    }
  }, [formState.email, isRegister])

  function validateRegisterFields() {
    const nameMessage = validarNombreVisible(formState.name)

    if (nameMessage) {
      setError(nameMessage)
      return false
    }

    if (!esCorreoValido(formState.email)) {
      setError('Ingresa un correo válido para crear la cuenta.')
      return false
    }

    const passwordMessage = obtenerMensajeContrasenaMinima(formState.password)

    if (passwordMessage) {
      setError(passwordMessage)
      return false
    }

    if (formState.password !== formState.confirmPassword) {
      setError('La confirmación no coincide con la contraseña.')
      return false
    }

    return true
  }

  function validateLoginFields() {
    if (!formState.identifier.trim() || !formState.password.trim()) {
      setError('Escribe tu correo y tu contraseña.')
      return false
    }

    if (!esCorreoValido(formState.identifier)) {
      setError('Por seguridad, el acceso con contraseña ahora se hace solo con correo.')
      return false
    }

    return true
  }

  async function runAuth(payload, nextRoute = '/dashboard') {
    setIsLoading(true)

    try {
      const authenticatedUser = await authenticate(payload, mode)
      const resolvedAuthEmail =
        authenticatedUser.email ?? payload.email ?? payload.identifier ?? ''

      if (!requireAdminAccess && esCorreoAdminPrivilegiado(resolvedAuthEmail)) {
        await logout()
        setError('Esta cuenta usa el acceso interno del panel.')
        return
      }

      if (requireAdminAccess && !esCorreoAdminPrivilegiado(resolvedAuthEmail)) {
        await logout()
        setError('Este acceso está reservado para administración.')
        return
      }

      if (requireAdminAccess && esCorreoAdminPrivilegiado(resolvedAuthEmail)) {
        navigate('/admin', { replace: true })
        return
      }

      if (authenticatedUser.requiresEmailVerification) {
        navigate('/verify-email', { replace: true })
        return
      }

      const resolvedRoute = esCorreoAdminPrivilegiado(resolvedAuthEmail) ? '/admin' : nextRoute
      navigate(resolvedRoute, { replace: true })
    } catch (authError) {
      setError(authError.message || 'No pudimos completar la autenticación.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (!isRegister) {
      if (!validateLoginFields()) {
        return
      }

      await runAuth(
        {
          identifier: formState.identifier,
          password: formState.password,
        },
        shouldReturnToRequestedPath ? requestedPath : '/dashboard',
      )
      return
    }

    if (!validateRegisterFields()) {
      return
    }

    const nextNameFeedback = await verificarDisponibilidadNombreVisible(formState.name)
    setNameAvailabilityFeedback(nextNameFeedback)

    if (nextNameFeedback.status === 'invalid' || nextNameFeedback.status === 'taken') {
      setError(nextNameFeedback.message)
      return
    }

    const nextEmailFeedback = await verificarDisponibilidadCorreo(formState.email)
    setEmailAvailabilityFeedback(nextEmailFeedback)

    if (nextEmailFeedback.status === 'invalid' || nextEmailFeedback.status === 'taken') {
      setError(nextEmailFeedback.message)
      return
    }

    await runAuth(
      {
        name: formState.name,
        email: formState.email,
        password: formState.password,
        role: recommendedProfile?.role,
        interests: recommendedProfile?.interests,
        experience: recommendedProfile?.experience,
        goalCourseId: selectedGoalCourseId,
      },
      '/onboarding',
    )
  }

  async function handleGoogleAccess() {
    setError('')

    if (isAdminPortal || requireAdminAccess) {
      setError('El panel administrativo solo permite acceso con admin@pypath.com y contraseña.')
      return
    }

    await runAuth(
      {
        provider: 'google',
        name: formState.name,
        role: recommendedProfile?.role,
        interests: recommendedProfile?.interests,
        experience: recommendedProfile?.experience,
        goalCourseId: selectedGoalCourseId,
      },
      isRegister ? '/onboarding' : shouldReturnToRequestedPath ? requestedPath : '/dashboard',
    )
  }

  return (
    <div className="page-shell flex min-h-screen items-center py-10">
      <div className="content-width w-full">
        <Tarjeta className="mx-auto max-w-xl space-y-6 p-8 lg:p-10">
          <div className="space-y-5">
            <div className="pb-2 text-left">
              <Link
                to="/"
                className="inline-flex w-fit items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition hover:border-primary/35 hover:bg-primary/15 hover:text-primary-soft"
              >
                {isAdminPortal ? 'Volver al sitio público' : 'Volver al inicio'}
              </Link>
            </div>

            <div className="space-y-3 text-center">
              <p className="eyebrow">
                {isAdminPortal ? 'Acceso interno' : isRegister ? 'Crear cuenta' : 'Iniciar sesión'}
              </p>
              <h1 className="font-display text-3xl font-semibold text-foam">
                {isAdminPortal
                  ? 'Entrar al panel administrativo'
                  : isRegister
                    ? 'Crear cuenta'
                    : 'Entrar a PyPath'}
              </h1>
              <p className="text-sm text-mute">
                {isAdminPortal
                  ? 'Usa el correo autorizado del proyecto para entrar al panel interno.'
                  : isRegister
                    ? 'Pedimos solo lo mínimo para crear tu acceso. El perfil de aprendizaje lo completas después.'
                    : 'Puedes entrar con correo o Google.'}
              </p>
            </div>
          </div>

          {!firebaseEnabled ? (
            <div className="rounded-2xl border border-warning/30 bg-warning/10 px-4 py-3 text-sm text-foam">
              Este entorno todavía no tiene el acceso real configurado. Primero activa la
              conexión del proyecto antes de probar estas opciones.
            </div>
          ) : null}

          {requestedPath && !isRegister && !isAdminPortal ? (
            <div className="rounded-2xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-foam">
              Necesitas iniciar sesión para entrar a ese curso.
            </div>
          ) : null}

          {recommendedProfile && !isAdminPortal ? (
            <div className="rounded-2xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-foam">
              Llegaste desde el recomendador. Guardaremos esa preferencia inicial para orientarte hacia{' '}
              <span className="font-semibold">{goalCourseTitle ?? 'tu curso sugerido'}</span>.
              {recommendedPlan?.summary ? ` ${recommendedPlan.summary}` : ''}
            </div>
          ) : null}

          {!recommendedProfile && selectedGoalCourseId && !isAdminPortal ? (
            <div className="rounded-2xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-foam">
              {previewCourseTitle ? `El curso ${previewCourseTitle} ` : 'Este curso '}
              quedará como objetivo inicial de tu perfil.
            </div>
          ) : null}

          <form className="space-y-4" noValidate onSubmit={handleSubmit}>
            {isRegister ? (
              <>
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-foam">Nombre visible</span>
                  <input
                    className="field-input"
                    type="text"
                    name="name"
                    placeholder="Tu nombre o alias"
                    value={formState.name}
                    onChange={handleChange}
                  />
                  <MensajeValidacionCampo feedback={nameFeedback} />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-medium text-foam">Correo</span>
                  <input
                    className="field-input"
                    type="email"
                    name="email"
                    placeholder="operador@pypath.dev"
                    value={formState.email}
                    onChange={handleChange}
                  />
                  <MensajeValidacionCampo feedback={emailFeedback} />
                </label>
              </>
            ) : (
              <label className="block space-y-2">
                <span className="text-sm font-medium text-foam">Correo</span>
                <input
                  className="field-input"
                  type="email"
                  name="identifier"
                  placeholder="correo@pypath.dev"
                  value={formState.identifier}
                  onChange={handleChange}
                />
              </label>
            )}

            <label className="block space-y-2">
              <span className="text-sm font-medium text-foam">Contraseña</span>
              <input
                className="field-input"
                type="password"
                name="password"
                placeholder={isRegister ? 'Crea una contraseña segura' : 'Tu contraseña'}
                value={formState.password}
                onChange={handleChange}
              />
            </label>

            {isRegister ? <PasswordStrengthMeter password={formState.password} /> : null}

            {isRegister ? (
              <label className="block space-y-2">
                <span className="text-sm font-medium text-foam">Confirmar contraseña</span>
                <input
                  className="field-input"
                  type="password"
                  name="confirmPassword"
                  placeholder="Escribe de nuevo tu contraseña"
                  value={formState.confirmPassword}
                  onChange={handleChange}
                />
              </label>
            ) : null}

            {error ? (
              <div className="rounded-2xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-red-100">
                {error}
              </div>
            ) : null}

            {!isRegister && !isAdminPortal ? (
              <p className="text-right text-sm text-mute">
                <Link
                  to="/forgot-password"
                  className="font-semibold text-primary transition hover:text-primary-soft"
                >
                  Olvidé mi contraseña
                </Link>
              </p>
            ) : null}

            <div className="space-y-3">
              <Boton type="submit" fullWidth size="lg" disabled={isLoading || !firebaseEnabled}>
                {isLoading
                  ? 'Conectando...'
                  : isAdminPortal
                    ? 'Entrar al panel interno'
                    : isRegister
                      ? 'Crear cuenta'
                      : 'Entrar al panel'}
              </Boton>

              {!isAdminPortal ? (
                <Boton
                  type="button"
                  variant="secondary"
                  fullWidth
                  size="lg"
                  disabled={isLoading || !firebaseEnabled}
                  onClick={handleGoogleAccess}
                >
                  Continuar con Google
                </Boton>
              ) : null}
            </div>
          </form>

          {!isAdminPortal ? (
            <div className="rounded-2xl border border-border/80 bg-white/5 px-4 py-4 text-sm text-mute">
              Si creas la cuenta con correo, tendrás que confirmar el email antes de entrar.
            </div>
          ) : null}

          {!isAdminPortal ? (
            <p className="text-sm text-mute">
              {isRegister ? '¿Ya tienes cuenta?' : '¿Primera vez por aquí?'}{' '}
              <Link
                to={isRegister ? '/login' : '/register'}
                state={location.state}
                className="font-semibold text-primary transition hover:text-primary-soft"
              >
                {isRegister ? 'Inicia sesión' : 'Crear cuenta'}
              </Link>
            </p>
          ) : null}
        </Tarjeta>
      </div>
    </div>
  )
}

