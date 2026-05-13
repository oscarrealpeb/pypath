import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Boton } from '../../../componentes/Boton.jsx'
import { MensajeValidacionCampo } from '../../../componentes/MensajeValidacionCampo.jsx'
import { Tarjeta } from '../../../componentes/Tarjeta.jsx'
import { SelectorIntereses } from '../../../componentes/SelectorIntereses.jsx'
import { obtenerCatalogoCursos } from '../../contenido/servicios/repositorioContenido.js'
import {
  opcionesExperiencia,
  opcionesInteres,
  opcionesRol,
  sanearSeleccionIntereses,
} from '../../../datos/opcionesPerfilUsuario.js'
import {
  verificarDisponibilidadNombreVisible,
  verificarDisponibilidadNickname,
} from '../../autenticacion/servicios/servicioPerfilesFirebase.js'
import {
  crearNombreCompleto,
  normalizarNickname,
  obtenerMensajeContrasenaMinima,
  validarNombreVisible,
  validarNickname,
} from '../../autenticacion/servicios/servicioValidacionAutenticacion.js'
import { useAccionesApp, useEstadoApp } from '../../progreso/contexto/useEstadoApp.js'
import { obtenerInicioRecomendado } from '../../progreso/selectores/selectoresProgreso.js'
import {
  obtenerResumenesCursos,
  obtenerCursoFocoActual,
  obtenerProgresoGeneral,
  obtenerPerfilLegible,
} from '../servicios/servicioResumenPerfil.js'

export function PaginaPerfil() {
  const navigate = useNavigate()
  const { user, progress, onboarding } = useEstadoApp()
  const { updateUserProfile, updateCurrentUserPassword } = useAccionesApp()
  const catalogoCursos = obtenerCatalogoCursos()
  const [formState, setFormState] = useState({
    name: user?.name ?? '',
    nickname: user?.nickname ?? '',
    role: user?.role ?? 'programadores',
    experience: user?.experience ?? 'principiante',
    interests: sanearSeleccionIntereses(user?.interests ?? ['bases']),
    goalCourseId: user?.goalCourseId ?? '',
  })
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    nextPassword: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccessMessage, setPasswordSuccessMessage] = useState('')
  const [nameAvailabilityFeedback, setNameAvailabilityFeedback] = useState({
    status: 'idle',
    message: '',
  })
  const [nicknameAvailabilityFeedback, setNicknameAvailabilityFeedback] = useState({
    status: 'idle',
    message: '',
  })

  const profileLabels = obtenerPerfilLegible(user)
  const overallProgress = obtenerProgresoGeneral(progress)
  const courseSnapshots = useMemo(
    () => obtenerResumenesCursos(progress, onboarding.assessmentResult),
    [onboarding.assessmentResult, progress],
  )
  const currentFocus = obtenerCursoFocoActual(progress, onboarding.assessmentResult)
  const recommendedStart = obtenerInicioRecomendado(null, onboarding.assessmentResult)
  const activeLibraries = courseSnapshots.filter(
    ({ course }) => course.id !== 'python-fundamentals',
  )
  const goalCourse = catalogoCursos.find((course) => course.id === user?.goalCourseId)
  const routeTargetTitle = goalCourse?.title ?? recommendedStart?.courseTitle ?? 'Fundamentos de Python'
  const nameFeedback = useMemo(() => {
    const trimmedName = crearNombreCompleto(formState.name)

    if (!trimmedName) {
      return {
        status: 'invalid',
        message: 'Agrega un nombre para guardar el perfil.',
      }
    }

    const nameMessage = validarNombreVisible(trimmedName)

    if (nameMessage) {
      return {
        status: 'invalid',
        message: nameMessage,
      }
    }

    if (
      crearNombreCompleto(trimmedName) === crearNombreCompleto(user?.name ?? '')
    ) {
      return {
        status: 'owned',
        message: 'Ese nombre visible ya te pertenece.',
      }
    }

    return nameAvailabilityFeedback
  }, [formState.name, nameAvailabilityFeedback, user?.name])
  const nicknameFeedback = useMemo(() => {
    const trimmedNickname = formState.nickname.trim()

    if (!trimmedNickname) {
      return {
        status: 'invalid',
        message: 'Elige un nickname para tu cuenta.',
      }
    }

    const nicknameMessage = validarNickname(trimmedNickname)

    if (nicknameMessage) {
      return {
        status: 'invalid',
        message: nicknameMessage,
      }
    }

    if (
      normalizarNickname(trimmedNickname) === normalizarNickname(user?.nickname ?? '') &&
      trimmedNickname === (user?.nickname ?? '').trim()
    ) {
      return {
        status: 'owned',
        message: 'Ese nickname ya te pertenece.',
      }
    }

    return nicknameAvailabilityFeedback
  }, [formState.nickname, nicknameAvailabilityFeedback, user?.nickname])

  useEffect(() => {
    const trimmedName = crearNombreCompleto(formState.name)
    const nameMessage = validarNombreVisible(trimmedName)

    if (!trimmedName || nameMessage || trimmedName === crearNombreCompleto(user?.name ?? '')) {
      return undefined
    }

    let isCancelled = false

    const timeoutId = window.setTimeout(async () => {
      setNameAvailabilityFeedback({
        status: 'checking',
        message: 'Validando disponibilidad del nombre visible...',
      })

      const nextFeedback = await verificarDisponibilidadNombreVisible(trimmedName, user?.id ?? '')

      if (!isCancelled) {
        setNameAvailabilityFeedback(nextFeedback)
      }
    }, 350)

    return () => {
      isCancelled = true
      window.clearTimeout(timeoutId)
    }
  }, [formState.name, user?.id, user?.name])

  useEffect(() => {
    const trimmedNickname = formState.nickname.trim()

    const nicknameMessage = validarNickname(trimmedNickname)

    if (!trimmedNickname || nicknameMessage) {
      return undefined
    }

    if (
      normalizarNickname(trimmedNickname) === normalizarNickname(user?.nickname ?? '') &&
      trimmedNickname === (user?.nickname ?? '').trim()
    ) {
      return undefined
    }

    let isCancelled = false

    const timeoutId = window.setTimeout(async () => {
      setNicknameAvailabilityFeedback({
        status: 'checking',
        message: 'Validando disponibilidad del nickname...',
      })

      const nextFeedback = await verificarDisponibilidadNickname(trimmedNickname, user?.id ?? '')

      if (!isCancelled) {
        setNicknameAvailabilityFeedback(nextFeedback)
      }
    }, 350)

    return () => {
      isCancelled = true
      window.clearTimeout(timeoutId)
    }
  }, [formState.nickname, user?.id, user?.nickname])

  function handleChange(event) {
    const { name, value } = event.target
    setError('')
    setSuccessMessage('')
    setFormState((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function handlePasswordChange(event) {
    const { name, value } = event.target
    setPasswordError('')
    setPasswordSuccessMessage('')
    setPasswordForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function toggleInterest(interest) {
    setError('')
    setSuccessMessage('')

    setFormState((current) => {
      const alreadySelected = current.interests.includes(interest)

      if (alreadySelected) {
        if (current.interests.length === 1) {
          setError('Debes mantener al menos un interés activo en el perfil.')
          return current
        }

        return {
          ...current,
          interests: current.interests.filter((item) => item !== interest),
        }
      }

      if (current.interests.length >= 4) {
        setError('Puedes elegir máximo 4 intereses en este perfil.')
        return current
      }

      return {
        ...current,
        interests: [...current.interests, interest],
      }
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const nameMessage = validarNombreVisible(formState.name)

    if (nameMessage) {
      setError(nameMessage)
      return
    }

    const nextNameFeedback = await verificarDisponibilidadNombreVisible(formState.name, user?.id ?? '')
    setNameAvailabilityFeedback(nextNameFeedback)

    if (nextNameFeedback.status === 'invalid' || nextNameFeedback.status === 'taken') {
      setError(nextNameFeedback.message)
      return
    }

    const nicknameMessage = validarNickname(formState.nickname)

    if (nicknameMessage) {
      setError(nicknameMessage)
      return
    }

    const nextNicknameFeedback = await verificarDisponibilidadNickname(
      formState.nickname,
      user?.id ?? '',
    )
    setNicknameAvailabilityFeedback(nextNicknameFeedback)

    if (nextNicknameFeedback.status === 'invalid' || nextNicknameFeedback.status === 'taken') {
      setError(nextNicknameFeedback.message)
      return
    }

    if (formState.interests.length === 0 || formState.interests.length > 4) {
      setError('Elige entre 1 y 4 intereses.')
      return
    }

    try {
      await updateUserProfile({
        name: crearNombreCompleto(formState.name),
        nickname: formState.nickname.trim(),
        nicknameNormalized: normalizarNickname(formState.nickname),
        role: formState.role,
        experience: formState.experience,
        interests: formState.interests,
        goalCourseId: formState.goalCourseId || null,
      })
      setSuccessMessage(
        'Perfil actualizado. Las nuevas recomendaciones ya quedaron aplicadas.',
      )
    } catch (updateError) {
      setError(updateError.message || 'No pudimos actualizar el perfil.')
    }
  }

  async function handlePasswordSubmit(event) {
    event.preventDefault()
    setPasswordError('')
    setPasswordSuccessMessage('')

    if (!passwordForm.currentPassword.trim()) {
      setPasswordError('Escribe tu contraseña actual o temporal.')
      return
    }

    const passwordMessage = obtenerMensajeContrasenaMinima(passwordForm.nextPassword)

    if (passwordMessage) {
      setPasswordError(passwordMessage)
      return
    }

    if (passwordForm.nextPassword !== passwordForm.confirmPassword) {
      setPasswordError('La confirmación no coincide con la nueva contraseña.')
      return
    }

    try {
      await updateCurrentUserPassword({
        currentPassword: passwordForm.currentPassword,
        nextPassword: passwordForm.nextPassword,
      })
      setPasswordForm({
        currentPassword: '',
        nextPassword: '',
        confirmPassword: '',
      })
      setPasswordSuccessMessage('Contraseña actualizada.')
    } catch (updateError) {
      setPasswordError(updateError.message || 'No pudimos actualizar la contraseña.')
    }
  }

  return (
    <div className="space-y-8">
      <Tarjeta accent className="space-y-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-primary/30 bg-primary/10 font-display text-3xl font-semibold text-primary shadow-glow">
              {user?.name?.charAt(0)?.toUpperCase() ?? 'P'}
            </div>
            <div className="space-y-2">
              <p className="eyebrow">Perfil de aprendizaje</p>
              <h1 className="font-display text-4xl font-semibold text-foam">
                {user?.name ?? 'Jasson'} - Ing. Sistemas en PyPath
              </h1>
              <p className="text-mute">
                {profileLabels.roleLabel} / Nivel {profileLabels.experienceLabel}
              </p>
              {user?.nickname ? (
                <p className="text-sm text-mute">Nickname: @{user.nickname}</p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Boton variant="ghost" onClick={() => navigate('/dashboard')}>
              Volver al panel
            </Boton>
            <Boton onClick={() => navigate('/onboarding')}>
              Ver diagnóstico
            </Boton>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-border/80 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-mute">Correo</p>
            <p className="mt-3 text-sm font-semibold text-foam">{user?.email}</p>
            <p className="mt-2 text-xs leading-6 text-mute">
              {user?.provider === 'google'
                ? 'Acceso con Google'
                : user?.emailVerified
                  ? 'Correo verificado'
                  : 'Correo pendiente por verificar'}
            </p>
          </div>
          <div className="rounded-2xl border border-border/80 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-mute">Curso sugerido</p>
            <p className="mt-3 text-sm font-semibold text-foam">
              {routeTargetTitle}
            </p>
            <p className="mt-2 text-xs leading-6 text-mute">
              Esta sugerencia sale de tu perfil actual y del diagnóstico si ya lo hiciste.
            </p>
          </div>
          <div className="rounded-2xl border border-border/80 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-mute">Progreso global</p>
            <p className="mt-3 font-display text-2xl font-semibold text-foam">
              {overallProgress.percentage}%
            </p>
            <p className="mt-2 text-xs leading-6 text-mute">
              Cuenta todo lo que has completado en la plataforma.
            </p>
          </div>
          <div className="rounded-2xl border border-border/80 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-mute">Lecciones completadas</p>
            <p className="mt-3 font-display text-2xl font-semibold text-foam">
              {overallProgress.completedLessons}/{overallProgress.totalLessons}
            </p>
            <p className="mt-2 text-xs leading-6 text-mute">
              Este total suma todos los cursos. Abajo puedes verlo por curso.
            </p>
          </div>
        </div>
      </Tarjeta>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_.95fr]">
        <Tarjeta className="space-y-6">
          <div>
            <p className="eyebrow">Editar perfil</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-foam">
              Ajusta nombre, nickname, rol e intereses
            </h2>
            <p className="mt-3 text-mute">
              Este formulario guarda tus cambios y mantiene la misma experiencia del resto de la plataforma.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-foam">Nombre</span>
              <input
                className="field-input"
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
              />
              <MensajeValidacionCampo feedback={nameFeedback} />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-foam">Nickname</span>
              <input
                className="field-input"
                type="text"
                name="nickname"
                value={formState.nickname}
                onChange={handleChange}
              />
              <MensajeValidacionCampo feedback={nicknameFeedback} />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-foam">Rol principal</span>
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
              <span className="text-sm font-medium text-foam">Nivel actual</span>
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

            <label className="block space-y-2">
              <span className="text-sm font-medium text-foam">Ruta objetivo</span>
              <select
                className="field-input"
                name="goalCourseId"
                value={formState.goalCourseId}
                onChange={handleChange}
              >
                <option value="">Seguir recomendación automática</option>
                {catalogoCursos.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </label>

            <div className="space-y-2">
              <span className="text-sm font-medium text-foam">Intereses</span>
              <SelectorIntereses
                options={opcionesInteres}
                selectedValues={formState.interests}
                onToggle={toggleInterest}
              />
            </div>

            {error ? (
              <div className="rounded-2xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-red-100">
                {error}
              </div>
            ) : null}

            {successMessage ? (
              <div className="rounded-2xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-foam">
                {successMessage}
              </div>
            ) : null}

            <Boton type="submit">Guardar cambios</Boton>
          </form>
        </Tarjeta>

        <Tarjeta className="space-y-5">
          <div>
            <p className="eyebrow">Lectura actual</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-foam">
              Recomendacion y curso activo
            </h2>
          </div>

          <div className="rounded-2xl border border-border/80 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-mute">Intereses activos</p>
            <p className="mt-3 text-sm text-foam">
              {profileLabels.interestLabels.length > 0
                ? profileLabels.interestLabels.join(' / ')
                : 'Sin intereses registrados'}
            </p>
          </div>

          <div className="rounded-2xl border border-border/80 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-mute">Curso en foco</p>
            <p className="mt-3 font-display text-2xl font-semibold text-foam">
              {currentFocus?.course.title ?? 'Aún no hay un curso activo'}
            </p>
            <p className="mt-2 text-sm text-mute">
              {currentFocus?.summary.nextStep
                ? 'Ya tienes un siguiente paso activo dentro de este curso.'
                : 'Completa Fundamentos de Python para abrir el catálogo principal de bibliotecas.'}
            </p>
          </div>

          {recommendedStart ? (
            <div className="rounded-2xl border border-primary/20 bg-primary/10 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-mute">Diagnostico guardado</p>
              <p className="mt-3 font-semibold text-foam">{recommendedStart.courseTitle}</p>
              <p className="mt-2 text-sm text-mute">
                Unidad sugerida: {recommendedStart.unitTitle} / Punto de inicio: {recommendedStart.lessonTitle}
              </p>
            </div>
          ) : null}

          <div className="rounded-2xl border border-border/80 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-mute">Bibliotecas activas</p>
            <p className="mt-3 text-sm text-mute">
              {activeLibraries.length > 0
                ? activeLibraries
                    .map(
                      ({ course, progress: libraryProgress }) =>
                        `${course.title} (${libraryProgress.completedCount}/${libraryProgress.totalCount})`,
                    )
                    .join(' / ')
                : 'Aún no hay bibliotecas activas en el catálogo.'}
            </p>
          </div>
        </Tarjeta>
      </div>

      {user?.provider === 'email' ? (
        <Tarjeta className="space-y-6">
          <div>
            <p className="eyebrow">Acceso local</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-foam">
              Cambiar contraseña
            </h2>
            <p className="mt-3 text-mute">
              Este cambio requiere tu contraseña actual para proteger la cuenta.
            </p>
          </div>

          <form className="grid gap-4 lg:grid-cols-3" onSubmit={handlePasswordSubmit}>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-foam">Contraseña actual o temporal</span>
              <input
                className="field-input"
                type="password"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-foam">Nueva contraseña</span>
              <input
                className="field-input"
                type="password"
                name="nextPassword"
                value={passwordForm.nextPassword}
                onChange={handlePasswordChange}
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-foam">Confirmar nueva contraseña</span>
              <input
                className="field-input"
                type="password"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
              />
            </label>

            {passwordError ? (
              <div className="rounded-2xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-red-100 lg:col-span-3">
                {passwordError}
              </div>
            ) : null}

            {passwordSuccessMessage ? (
              <div className="rounded-2xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-foam lg:col-span-3">
                {passwordSuccessMessage}
              </div>
            ) : null}

            <div className="lg:col-span-3">
              <Boton type="submit">Actualizar contraseña</Boton>
            </div>
          </form>
        </Tarjeta>
      ) : null}

      <section className="space-y-4">
        <div>
          <p className="eyebrow">Progreso por curso</p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-foam">
            Estado de cursos y bibliotecas
          </h2>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {courseSnapshots.map(({ course, meta, progress: courseProgress, summary }) => (
            <Tarjeta key={course.id} className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="eyebrow">{course.library}</span>
                {meta ? <span className="status-chip">{meta.statusLabel}</span> : null}
              </div>

              <div>
                <h3 className="font-display text-2xl font-semibold text-foam">{course.title}</h3>
                <p className="mt-3 text-sm text-mute">{course.summary}</p>
              </div>

              <div className="grid gap-3">
                <div className="rounded-2xl border border-border/80 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-mute">Avance</p>
                  <p className="mt-2 text-sm font-semibold text-foam">
                    {courseProgress.completedCount}/{courseProgress.totalCount}
                  </p>
                </div>
                <div className="rounded-2xl border border-border/80 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-mute">Siguiente paso</p>
                  <p className="mt-2 text-sm text-mute">
                    {summary.nextStep
                      ? 'Ya tienes un siguiente paso disponible en este curso.'
                      : courseProgress.cursoEstaCompletado
                        ? 'Curso finalizado.'
                        : 'Bloqueada por prerrequisitos o aún sin avance inicial.'}
                  </p>
                </div>
              </div>

              <Boton variant="secondary" onClick={() => navigate(`/course/${course.id}`)}>
                Ver curso
              </Boton>
            </Tarjeta>
          ))}
        </div>
      </section>
    </div>
  )
}
