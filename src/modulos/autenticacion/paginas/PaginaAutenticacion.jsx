import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { Boton } from '../../../componentes/Boton.jsx'
import { Tarjeta } from '../../../componentes/Tarjeta.jsx'
import { SelectorIntereses } from '../../../componentes/SelectorIntereses.jsx'
import {
  opcionesExperiencia,
  opcionesInteres,
  opcionesRol,
  sanearSeleccionIntereses,
} from '../../../datos/opcionesPerfilUsuario.js'
import { obtenerCatalogoCursos } from '../../contenido/servicios/repositorioContenido.js'
import { construirPlanRecomendacion } from '../../inicio/servicios/servicioRecomendacionCursos.js'
import { useAccionesApp, useEstadoApp } from '../../progreso/contexto/useEstadoApp.js'

export function PaginaAutenticacion({ mode, portal = 'student', requireAdminAccess = false }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { onboarding, users } = useEstadoApp()
  const { authenticate, logout } = useAccionesApp()
  const recommendedProfile = location.state?.recommendedProfile
  const recommendedPlan = location.state?.recommendedPlan
  const selectedGoalCourseId = recommendedProfile?.goalCourseId ?? location.state?.goalCourseId ?? null
  const previewCourseTitle = location.state?.previewCourseTitle
  const goalCourseTitle = obtenerCatalogoCursos().find(
    (course) => course.id === selectedGoalCourseId,
  )?.title
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    role: recommendedProfile?.role ?? 'programadores',
    interests: sanearSeleccionIntereses(recommendedProfile?.interests ?? ['bases']),
    experience: recommendedProfile?.experience ?? 'principiante',
    goalCourseId: selectedGoalCourseId,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [registerStep, setRegisterStep] = useState(1)
  const profileRecommendationPlan = useMemo(() => {
    if (!(mode === 'register' && portal !== 'admin')) {
      return null
    }

    return construirPlanRecomendacion({
      role: formState.role,
      interests: formState.interests,
      experience: formState.experience,
    })
  }, [formState.experience, formState.interests, formState.role, mode, portal])

  const isAdminPortal = portal === 'admin'
  const isRegister = mode === 'register' && !isAdminPortal
  const requestedPath = location.state?.from
  const shouldReturnToRequestedPath =
    !isRegister && !isAdminPortal && onboarding.completed && typeof requestedPath === 'string'

  function handleChange(event) {
    const { name, value } = event.target
    setFormState((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function toggleInterest(interest) {
    setError('')
    setFormState((current) => {
      const alreadySelected = current.interests.includes(interest)

      if (alreadySelected) {
        return {
          ...current,
          interests: current.interests.filter((item) => item !== interest),
        }
      }

      if (current.interests.length >= 4) {
        setError('Puedes elegir máximo 4 intereses en este primer perfil.')
        return current
      }

      return {
        ...current,
        interests: [...current.interests, interest],
      }
    })
  }

  function validateAccountFields() {
    if (isRegister && !formState.name.trim()) {
      setError('Ingresa tu nombre para crear el perfil.')
      return false
    }

    if (!formState.email.trim() || !formState.password.trim()) {
      setError('Completa correo y contraseña para continuar.')
      return false
    }

    return true
  }

  function emailYaExiste() {
    const normalizedEmail = formState.email.trim().toLowerCase()

    if (!normalizedEmail) {
      return false
    }

    return users.some((user) => user.email?.trim().toLowerCase() === normalizedEmail)
  }

  function validateProfileFields() {
    if (!formState.role) {
      setError('Elige un rol principal para recomendarte mejor.')
      return false
    }

    if (formState.interests.length === 0 || formState.interests.length > 4) {
      setError('Elige entre 1 y 4 intereses para tu primer recorrido.')
      return false
    }

    return true
  }

  async function runAuth(payload, nextRoute = '/dashboard') {
    setIsLoading(true)

    try {
      const authenticatedUser = await authenticate(payload, mode)

      if (!requireAdminAccess && authenticatedUser.systemRole === 'admin') {
        logout()
        setError('Esta cuenta usa el acceso interno del panel.')
        return
      }

      if (requireAdminAccess && authenticatedUser.systemRole !== 'admin') {
        logout()
        setError('Este acceso está reservado para administración.')
        return
      }

      const resolvedRoute = authenticatedUser.systemRole === 'admin' ? '/admin' : nextRoute
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
      if (!validateAccountFields()) {
        return
      }

      await runAuth(formState, shouldReturnToRequestedPath ? requestedPath : '/dashboard')
      return
    }

    if (registerStep === 1) {
      if (!validateAccountFields()) {
        return
      }

      if (emailYaExiste()) {
        setError('Ya existe una cuenta con ese correo. Inicia sesión o usa otro email.')
        return
      }

      setRegisterStep(2)
      return
    }

    if (!validateProfileFields()) {
      return
    }

    await runAuth({
      ...formState,
      goalCourseId: formState.goalCourseId ?? profileRecommendationPlan?.targetCourse?.id ?? null,
    })
  }

  async function handleGoogleAuth() {
    setError('')

    if (isRegister && registerStep === 1) {
      if (!formState.name.trim()) {
        setError('Pon tu nombre antes de continuar con Google.')
        return
      }

      if (emailYaExiste()) {
        setError('Ya existe una cuenta con ese correo. Inicia sesión o usa otro email.')
        return
      }

      setRegisterStep(2)
      return
    }

    if (isRegister && !validateProfileFields()) {
      return
    }

    await runAuth(
      {
        ...formState,
        goalCourseId: formState.goalCourseId ?? profileRecommendationPlan?.targetCourse?.id ?? null,
        provider: 'google',
      },
      shouldReturnToRequestedPath ? requestedPath : '/dashboard',
    )
  }

  return (
    <div className="page-shell flex min-h-screen items-center py-10">
      <div className="content-width w-full">
        <Tarjeta
          className={`mx-auto p-8 lg:p-10 ${
            isRegister && registerStep === 2 ? 'max-w-3xl' : 'max-w-xl'
          }`}
        >
          <div className="space-y-6">
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
                {isAdminPortal
                  ? 'Acceso interno'
                  : isRegister
                    ? `Crear cuenta / Paso ${registerStep} de 2`
                    : 'Iniciar sesión'}
                </p>
                <h1 className="font-display text-3xl font-semibold text-foam">
                  {isAdminPortal
                    ? 'Entrar al panel administrativo'
                    : isRegister
                      ? registerStep === 1
                        ? 'Crea tu cuenta'
                        : 'Cuéntanos de ti'
                      : 'Entrar a PyPath'}
                </h1>
                {isAdminPortal ? (
                  <p className="text-sm text-mute">
                    Accede con una cuenta con permisos de administración.
                  </p>
                ) : isRegister && registerStep === 2 ? (
                  <p className="text-sm text-mute">
                    Elige tu rol e intereses para recomendarte un mejor punto de partida.
                  </p>
                ) : null}
              </div>
            </div>

            {requestedPath && !isRegister && !isAdminPortal && (
              <div className="rounded-2xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-foam">
                Necesitas iniciar sesión para entrar a ese curso.
              </div>
            )}

            {recommendedProfile && !isAdminPortal && (
              <div className="rounded-2xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-foam">
                Llegaste desde el recomendador. Precargamos tu perfil para apuntar a{' '}
                <span className="font-semibold">{goalCourseTitle ?? 'tu curso sugerido'}</span>.
                {recommendedPlan?.summary ? ` ${recommendedPlan.summary}` : ''}
              </div>
            )}

            {!recommendedProfile && selectedGoalCourseId && !isAdminPortal && (
              <div className="rounded-2xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-foam">
                {previewCourseTitle ? `El curso ${previewCourseTitle} ` : 'Este curso '}
                quedará marcada en tu perfil cuando termines de crear la cuenta.
              </div>
            )}

            <form
              className={`mx-auto space-y-4 ${
                isRegister && registerStep === 2 ? 'max-w-2xl' : 'max-w-lg'
              }`}
              onSubmit={handleSubmit}
            >
              {!isRegister || registerStep === 1 ? (
                <>
                  {isRegister && (
                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-foam">Nombre</span>
                      <input
                        className="field-input"
                        type="text"
                        name="name"
                        placeholder="Tu alias de operador"
                        value={formState.name}
                        onChange={handleChange}
                      />
                    </label>
                  )}

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
                  </label>

                  <label className="block space-y-2">
                    <span className="text-sm font-medium text-foam">Contraseña</span>
                    <input
                      className="field-input"
                      type="password"
                      name="password"
                      placeholder="Elige la contraseña que prefieras para esta versión local"
                      value={formState.password}
                      onChange={handleChange}
                    />
                  </label>
                </>
              ) : (
                <>
                  <label className="block space-y-2">
                    <span className="text-sm font-medium text-foam">Tu rol principal</span>
                    <select
                      className="field-input"
                      name="role"
                      value={formState.role}
                      onChange={handleChange}
                    >
                      {opcionesRol.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block space-y-2">
                    <span className="text-sm font-medium text-foam">Nivel actual en Python</span>
                    <select
                      className="field-input"
                      name="experience"
                      value={formState.experience}
                      onChange={handleChange}
                    >
                      {opcionesExperiencia.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="space-y-2">
                    <span className="text-sm font-medium text-foam">
                      Intereses iniciales
                    </span>
                    <SelectorIntereses
                      options={opcionesInteres}
                      selectedValues={formState.interests}
                      onToggle={toggleInterest}
                    />
                  </div>

                  {profileRecommendationPlan && (
                      <div className="rounded-2xl border border-primary/25 bg-primary/10 p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="eyebrow">Recorrido sugerido para ti</span>
                        <span className="status-chip">
                          {profileRecommendationPlan.targetCourse.library}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-2xl font-semibold text-foam">
                        {profileRecommendationPlan.headline}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-mute">
                        {profileRecommendationPlan.summary}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {profileRecommendationPlan.steps.map((course, index) => (
                          <span key={course.id} className="status-chip">
                            Paso {index + 1}: {course.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {error && (
                <div className="rounded-2xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-red-100">
                  {error}
                </div>
              )}

              <div className="space-y-3">
                <Boton type="submit" fullWidth size="lg" disabled={isLoading}>
                  {isLoading
                    ? 'Conectando...'
                    : isAdminPortal
                      ? 'Entrar al panel interno'
                      : !isRegister
                    ? 'Entrar al panel'
                      : registerStep === 1
                        ? 'Continuar al perfil inicial'
                        : 'Crear cuenta y ver recomendación'}
                </Boton>

                {!isAdminPortal && (
                  <Boton
                    type="button"
                    variant="secondary"
                    fullWidth
                    size="lg"
                    disabled={isLoading}
                    onClick={handleGoogleAuth}
                  >
                    {isRegister
                      ? registerStep === 1
                        ? 'Seguir con Google'
                        : 'Crear cuenta con Google'
                      : 'Entrar con Google'}
                  </Boton>
                )}

                {isRegister && registerStep === 2 && (
                  <Boton
                    type="button"
                    variant="ghost"
                    fullWidth
                    onClick={() => {
                      setError('')
                      setRegisterStep(1)
                    }}
                  >
                    Volver al paso anterior
                  </Boton>
                )}
              </div>
            </form>

            <div className="rounded-2xl border border-border/80 bg-white/5 px-4 py-4 text-sm text-mute">
              {isAdminPortal
                ? 'Este acceso es interno y está pensado solo para revisar el panel administrativo.'
                : 'El acceso funciona en esta versión local y guarda progreso, recomendaciones y desbloqueos en tu navegador.'}
            </div>

            {!isAdminPortal && (
              <p className="text-sm text-mute">
                {isRegister ? '¿Ya tienes perfil?' : '¿Primera vez por aquí?'}{' '}
                <Link
                  to={isRegister ? '/login' : '/register'}
                  state={location.state}
                  className="font-semibold text-primary transition hover:text-primary-soft"
                >
                  {isRegister ? 'Inicia sesión' : 'Crear cuenta'}
                </Link>
              </p>
            )}
          </div>
        </Tarjeta>
      </div>
    </div>
  )
}
