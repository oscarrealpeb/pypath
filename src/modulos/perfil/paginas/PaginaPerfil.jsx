import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Boton } from '../../../componentes/Boton.jsx'
import { Tarjeta } from '../../../componentes/Tarjeta.jsx'
import { SelectorIntereses } from '../../../componentes/SelectorIntereses.jsx'
import { obtenerCatalogoCursos } from '../../contenido/servicios/repositorioContenido.js'
import {
  opcionesExperiencia,
  opcionesInteres,
  opcionesRol,
  sanearSeleccionIntereses,
} from '../../../datos/opcionesPerfilUsuario.js'
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
  const { updateUserProfile } = useAccionesApp()
  const catalogoCursos = obtenerCatalogoCursos()
  const [formState, setFormState] = useState({
    name: user?.name ?? '',
    role: user?.role ?? 'programadores',
    experience: user?.experience ?? 'principiante',
    interests: sanearSeleccionIntereses(user?.interests ?? ['bases']),
  })
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

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

  function handleChange(event) {
    const { name, value } = event.target
    setError('')
    setSuccessMessage('')
    setFormState((current) => ({
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

  function handleSubmit(event) {
    event.preventDefault()

    if (!formState.name.trim()) {
      setError('Agrega un nombre para guardar el perfil.')
      return
    }

    if (formState.interests.length === 0 || formState.interests.length > 4) {
      setError('Elige entre 1 y 4 intereses.')
      return
    }

    updateUserProfile({
      name: formState.name.trim(),
      role: formState.role,
      experience: formState.experience,
      interests: formState.interests,
    })
    setSuccessMessage('Perfil actualizado en estado local. Las nuevas recomendaciones ya quedan aplicadas.')
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
                {user?.name ?? 'Operador'} en PyPath
              </h1>
              <p className="text-mute">
                {profileLabels.roleLabel} / Nivel {profileLabels.experienceLabel}
              </p>
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
              Ajusta rol, nivel e intereses
            </h2>
            <p className="mt-3 text-mute">
              Este formulario deja lista la app para conectarse después a Firebase real sin cambiar el flujo de UI.
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

            <div className="space-y-2">
              <span className="text-sm font-medium text-foam">Intereses</span>
              <SelectorIntereses
                options={opcionesInteres}
                selectedValues={formState.interests}
                onToggle={toggleInterest}
              />
            </div>

            {error && (
              <div className="rounded-2xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-red-100">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="rounded-2xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-foam">
                {successMessage}
              </div>
            )}

            <Boton type="submit">Guardar cambios</Boton>
          </form>
        </Tarjeta>

        <Tarjeta className="space-y-5">
          <div>
            <p className="eyebrow">Lectura actual</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-foam">
              Recomendación y curso activo
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

          {recommendedStart && (
            <div className="rounded-2xl border border-primary/20 bg-primary/10 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-mute">Diagnóstico guardado</p>
              <p className="mt-3 font-semibold text-foam">{recommendedStart.courseTitle}</p>
              <p className="mt-2 text-sm text-mute">
                Unidad sugerida: {recommendedStart.unitTitle} / Punto de inicio: {recommendedStart.lessonTitle}
              </p>
            </div>
          )}

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
                {meta && <span className="status-chip">{meta.statusLabel}</span>}
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
