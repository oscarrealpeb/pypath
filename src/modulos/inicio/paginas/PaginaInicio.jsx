import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Boton } from '../../../componentes/Boton.jsx'
import { Tarjeta } from '../../../componentes/Tarjeta.jsx'
import { IconoCurso } from '../../../componentes/IconoCurso.jsx'
import { SelectorIntereses } from '../../../componentes/SelectorIntereses.jsx'
import { SelectorTema } from '../../../componentes/SelectorTema.jsx'
import { BarraProgreso } from '../../../componentes/BarraProgreso.jsx'
import {
  opcionesExperiencia,
  opcionesInteres,
  opcionesRol,
} from '../../../datos/opcionesPerfilUsuario.js'
import { obtenerCatalogoCursos } from '../../contenido/servicios/repositorioContenido.js'
import { useAccionesApp, useEstadoApp } from '../../progreso/contexto/useEstadoApp.js'
import { obtenerCursoPorId } from '../../cursos/selectores/selectoresCursos.js'
import { DialogoAcceso } from '../componentes/DialogoAcceso.jsx'
import { DialogoVistaCurso } from '../componentes/DialogoVistaCurso.jsx'
import { VisualPrincipal } from '../componentes/VisualPrincipal.jsx'
import {
  construirPlanRecomendacion,
  recomendarCursosPorPerfil,
} from '../servicios/servicioRecomendacionCursos.js'

function InteractiveCourseCard({ course, onOpen }) {
  return (
    <button
      type="button"
      aria-label={`Ver detalles de ${course.title}`}
      className="w-full text-left transition duration-300 hover:-translate-y-2 focus:outline-none focus-visible:-translate-y-2"
      onClick={() => onOpen(course.id)}
    >
      <Tarjeta className="flex h-full flex-col justify-between gap-5 border-border/80 transition duration-300 hover:border-primary/35 hover:shadow-glow focus-within:border-primary/35">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="eyebrow">{course.library}</span>
              <span className="status-chip">{course.statusLabel}</span>
              <span className="status-chip">Intensidad {course.intensity.toLowerCase()}</span>
            </div>
            <IconoCurso courseId={course.id} size="md" />
          </div>

          <div>
            <h3 className="font-display text-2xl font-semibold text-foam">{course.title}</h3>
            <p className="mt-3 text-sm leading-7 text-mute">{course.description}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/70 bg-panel-2/70 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-mute">Ideal para</p>
              <p className="mt-2 text-sm text-foam">{course.audience.join(' / ')}</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-panel-2/70 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-mute">Duración estimada</p>
              <p className="mt-2 text-sm text-foam">{course.duration}</p>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-mute">Prerrequisitos</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {course.prerequisites.length > 0 ? (
                course.prerequisites.map((item) => (
                  <span key={item} className="status-chip">
                    {item}
                  </span>
                ))
              ) : (
                <span className="status-chip">Ninguno</span>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm text-primary">
          Haz clic para ver el curso y sus unidades
        </div>
      </Tarjeta>
    </button>
  )
}

function InteractiveRecommendationCard({ result, index, onOpen }) {
  return (
    <button
      type="button"
      aria-label={`Ver recomendación ${result.title}`}
      className="w-full text-left transition duration-300 hover:-translate-y-2 focus:outline-none focus-visible:-translate-y-2"
      onClick={() => onOpen(result.id)}
    >
      <Tarjeta className="space-y-5 border-border/80 transition duration-300 hover:border-primary/35 hover:shadow-glow">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow">Top {index + 1}</span>
            <span className="status-chip">{result.statusLabel}</span>
            <span className="status-chip">{result.library}</span>
            <span className="status-chip">{result.fitLabel}</span>
          </div>
          <IconoCurso courseId={result.id} size="sm" />
        </div>

        <div>
          <h3 className="font-display text-2xl font-semibold text-foam">{result.title}</h3>
          <p className="mt-3 text-sm leading-7 text-mute">{result.reason}</p>
          <p className="mt-3 text-sm text-mute">{result.pitch}</p>
        </div>

        <BarraProgreso
          value={result.fitPercentage}
          total={100}
          label="Ajuste con tu perfil"
          tone="teal"
        />

        {result.matchTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {result.matchTags.slice(0, 3).map((tag) => (
              <span key={tag} className="status-chip">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm text-primary">
          Haz clic para revisar este curso
        </div>
      </Tarjeta>
    </button>
  )
}

function getStepCardTitle(course) {
  switch (course.id) {
    case 'python-fundamentals':
      return 'Fundamentos'
    case 'pyside6':
      return 'PySide6'
    case 'pygame':
      return 'Pygame'
    case 'python-ciberseguridad':
      return 'Ciberseguridad'
    case 'pandas-finanzas':
      return 'Pandas'
    default:
      return course.title
  }
}

export function PaginaInicio() {
  const navigate = useNavigate()
  const { user } = useEstadoApp()
  const { updateUserProfile } = useAccionesApp()
  const catalogoCursos = obtenerCatalogoCursos()
  const [formState, setFormState] = useState({
    role: 'programadores',
    interests: ['bases', 'interfaces'],
    experience: 'principiante',
  })
  const [selectedCourseId, setSelectedCourseId] = useState(null)
  const [authCourseId, setAuthCourseId] = useState(null)

  const recommendations = useMemo(
    () => recomendarCursosPorPerfil(formState).slice(0, 3),
    [formState],
  )
  const recommendationPlan = useMemo(() => construirPlanRecomendacion(formState), [formState])
  const selectedCourseMeta = selectedCourseId
    ? catalogoCursos.find((course) => course.id === selectedCourseId) ?? null
    : null
  const selectedCourseData = selectedCourseId ? obtenerCursoPorId(selectedCourseId) : null
  const authCourseMeta = authCourseId
    ? catalogoCursos.find((course) => course.id === authCourseId) ?? null
    : null

  function handleChange(event) {
    const { name, value } = event.target
    setFormState((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function toggleInterest(interest) {
    setFormState((current) => {
      const alreadySelected = current.interests.includes(interest)

      if (alreadySelected) {
        if (current.interests.length === 1) {
          return current
        }

        return {
          ...current,
          interests: current.interests.filter((item) => item !== interest),
        }
      }

      if (current.interests.length >= 4) {
        return current
      }

      return {
        ...current,
        interests: [...current.interests, interest],
      }
    })
  }

  function openCoursePreview(courseId) {
    setSelectedCourseId(courseId)
  }

  function closeCoursePreview() {
    setSelectedCourseId(null)
  }

  function closeAuthChoice() {
    setAuthCourseId(null)
  }

  function handleStartSelectedCourse() {
    if (!selectedCourseMeta) {
      return
    }

    if (user) {
      navigate(`/course/${selectedCourseMeta.id}`)
      setSelectedCourseId(null)
      return
    }

    setAuthCourseId(selectedCourseMeta.id)
    setSelectedCourseId(null)
  }

  async function handleApplyRecommendation() {
    const recommendationPayload = {
      role: formState.role,
      interests: formState.interests,
      experience: formState.experience,
      goalCourseId: recommendationPlan.targetCourse.id,
    }

    if (user) {
      await updateUserProfile(recommendationPayload)
      navigate('/dashboard')
      return
    }

    navigate('/register', {
      state: {
        recommendedProfile: recommendationPayload,
        recommendedPlan: {
          startCourseTitle: recommendationPlan.startCourse.title,
          targetCourseTitle: recommendationPlan.targetCourse.title,
          summary: recommendationPlan.summary,
        },
      },
    })
  }

  function handleOpenSuggestedPath() {
    openCoursePreview(recommendationPlan.startCourse.id)
  }

  function handleLoginFromDialog() {
    if (!authCourseMeta) {
      return
    }

    navigate('/login', {
      state: {
        from: `/course/${authCourseMeta.id}`,
      },
    })
  }

  function handleRegisterFromDialog() {
    if (!authCourseMeta) {
      return
    }

    navigate('/register', {
      state: {
        goalCourseId: authCourseMeta.id,
        previewCourseTitle: authCourseMeta.title,
      },
    })
  }

  function scrollToRecommender() {
    document.getElementById('recomendador')?.scrollIntoView({ behavior: 'smooth' })
  }

  const primaryCta = user ? '/dashboard' : '/register'

  return (
    <>
      <div className="page-shell">
        <header className="sticky top-0 z-50 border-b border-border/70 bg-obsidian/80 backdrop-blur">
          <div className="content-width flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-lg font-bold text-primary shadow-glow">
                P
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-foam">PyPath</p>
                <p className="text-sm text-mute">
                  Aprendizaje progresivo de Python con bibliotecas especializadas
                </p>
              </div>
            </Link>

            <nav className="flex flex-wrap items-center gap-2 text-sm text-mute">
              <a
                href="#catalogo"
                className="rounded-full px-4 py-2 transition hover:bg-white/5 hover:text-foam"
              >
                Cursos
              </a>
              <a
                href="#recomendador"
                className="rounded-full px-4 py-2 transition hover:bg-white/5 hover:text-foam"
              >
                Recomendador
              </a>
              {user ? (
                <>
                  <Boton size="sm" onClick={() => navigate(primaryCta)}>
                    Ir a mi panel
                  </Boton>
                  <SelectorTema />
                </>
              ) : (
                <>
                  <Boton variant="ghost" size="sm" onClick={() => navigate('/login')}>
                    Entrar
                  </Boton>
                  <Boton size="sm" onClick={() => navigate('/register')}>
                    Crear cuenta
                  </Boton>
                  <SelectorTema />
                </>
              )}
            </nav>
          </div>
        </header>

        <main className="content-width space-y-10 py-10">
          <section className="flex min-h-[60vh] items-center justify-center">
            <Tarjeta accent className="relative w-full overflow-hidden px-8 py-12 text-center lg:px-14 lg:py-16">
              <div className="absolute inset-x-0 top-0 mx-auto h-48 w-2/3 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8">
                <p className="eyebrow">Inicio</p>
                <div className="space-y-5">
                  <h1 className="mx-auto max-w-4xl font-display text-5xl font-semibold leading-tight text-balance text-foam sm:text-6xl">
                    Aprende Python paso a paso para crear apps, automatizar tareas y llevar tus ideas a proyectos reales.
                  </h1>
                  <p className="mx-auto max-w-3xl text-lg leading-8 text-mute">
                    PyPath combina cursos con progresión desbloqueable, evaluación diagnóstica opcional y un catálogo pensado para estudiantes, programadores, perfiles de negocio y personas que aprenden desde cero.
                  </p>
                </div>

                <VisualPrincipal />

                <div className="w-full space-y-4">
                  <div className="space-y-2 text-center">
                    <p className="text-xs uppercase tracking-[0.22em] text-mute">
                      Cursos destacados
                    </p>
                    <p className="mx-auto max-w-3xl text-sm leading-7 text-mute">
                      Estos son algunos de los cursos que puedes explorar dentro de PyPath.
                      Cada uno sirve para un tipo distinto de proyecto o interés.
                    </p>
                  </div>

                  <div className="grid w-full gap-4 md:grid-cols-2 2xl:grid-cols-4">
                    <div className="rounded-2xl border border-border/80 bg-panel-2/80 p-5 sm:p-6">
                      <div className="flex h-full flex-col gap-4 text-left">
                        <IconoCurso courseId="python-fundamentals" size="sm" />
                        <div className="min-w-0 space-y-3">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-mute">
                            Empieza aquí
                          </p>
                          <p className="font-display text-xl font-semibold leading-tight text-foam">
                            Fundamentos
                          </p>
                          <p className="text-sm leading-6 text-mute">
                            Tu base antes de saltar a cualquier otro curso.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-border/80 bg-panel-2/80 p-5 sm:p-6">
                      <div className="flex h-full flex-col gap-4 text-left">
                        <IconoCurso courseId="pyside6" size="sm" />
                        <div className="min-w-0 space-y-3">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-mute">
                            Para crear herramientas
                          </p>
                          <p className="font-display text-xl font-semibold leading-tight text-foam">
                            PySide6
                          </p>
                          <p className="text-sm leading-6 text-mute">
                            Ideal si quieres interfaces y apps de escritorio.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-border/80 bg-panel-2/80 p-5 sm:p-6">
                      <div className="flex h-full flex-col gap-4 text-left">
                        <IconoCurso courseId="pygame" size="sm" />
                        <div className="min-w-0 space-y-3">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-mute">
                            Para aprender jugando
                          </p>
                          <p className="font-display text-xl font-semibold leading-tight text-foam">
                            Pygame
                          </p>
                          <p className="text-sm leading-6 text-mute">
                            Practica lógica con juegos sencillos y visuales.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-border/80 bg-panel-2/80 p-5 sm:p-6">
                      <div className="flex h-full flex-col gap-4 text-left">
                        <IconoCurso courseId="python-ciberseguridad" size="sm" />
                        <div className="min-w-0 space-y-3">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-mute">
                            Para seguridad y automatización
                          </p>
                          <p className="font-display text-xl font-semibold leading-tight text-foam">
                            Ciberseguridad
                          </p>
                          <p className="text-sm leading-6 text-mute">
                            Automatiza tareas técnicas cuando ya tengas la base.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Boton size="lg" onClick={() => navigate(primaryCta)}>
                    {user ? 'Seguir aprendiendo' : 'Crear cuenta y empezar'}
                  </Boton>
                  <Boton variant="secondary" size="lg" onClick={scrollToRecommender}>
                    Ver mi recomendación
                  </Boton>
                </div>
              </div>
            </Tarjeta>
          </section>

          <section id="catalogo" className="space-y-5">
            <div className="space-y-3">
              <p className="eyebrow">Catálogo</p>
              <h2 className="font-display text-3xl font-semibold text-foam">
                Cursos llamativos, útiles y con prerrequisitos visibles
              </h2>
              <p className="max-w-3xl text-mute">
                Ahora las cards funcionan como puertas de exploración: flotan al pasar el mouse y, al hacer clic, te muestran el curso con sus unidades antes de pedir acceso.
              </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              {catalogoCursos.map((course) => (
                <InteractiveCourseCard key={course.id} course={course} onOpen={openCoursePreview} />
              ))}
            </div>
          </section>

          <section id="recomendador" className="grid items-start gap-6 lg:grid-cols-[.95fr_1.05fr]">
            <Tarjeta className="space-y-6 self-start p-8">
              <div>
                <p className="eyebrow">Recomendador</p>
                <h2 className="mt-4 font-display text-3xl font-semibold text-foam">
                  Elige tu rol, nivel e intereses
                </h2>
                <p className="mt-3 text-mute">
                  Ahora no solo ordena cursos: también te deja abrir el curso sugerido, revisar sus unidades y decidir después si quieres crear cuenta o iniciar sesión.
                </p>
              </div>

              <div className="grid gap-4">
                <label className="space-y-2">
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

                <label className="space-y-2">
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
                  <span className="text-sm font-medium text-foam">Intereses</span>
                  <SelectorIntereses
                    options={opcionesInteres}
                    selectedValues={formState.interests}
                    onToggle={toggleInterest}
                  />
                  <p className="text-xs text-mute">
                    Debes mantener al menos un interés activo para que la recomendación no se vuelva plana.
                  </p>
                </div>
              </div>
            </Tarjeta>

            <div className="space-y-5 self-start">
              <Tarjeta accent className="space-y-5 p-8">
                <div>
                  <p className="eyebrow">Plan sugerido</p>
                  <h2 className="mt-4 font-display text-3xl font-semibold text-foam">
                    {recommendationPlan.headline}
                  </h2>
                  <p className="mt-3 text-mute">{recommendationPlan.summary}</p>
                </div>

                <div className="grid items-start gap-4 xl:grid-cols-2">
                  {recommendationPlan.steps.map((course, index) => (
                    <div
                      key={course.id}
                      className="rounded-2xl border border-border/80 bg-white/5 p-4 sm:p-5"
                    >
                      <div className="flex items-center gap-3">
                        <IconoCurso courseId={course.id} size="sm" />
                        <p className="text-xs uppercase tracking-[0.22em] text-mute">
                          Paso {index + 1}
                        </p>
                      </div>
                      <div className="mt-4 min-w-0 text-left">
                        <p className="font-display text-lg font-semibold leading-tight text-balance text-foam">
                          {getStepCardTitle(course)}
                        </p>
                      </div>
                      <p className="mt-3 text-sm text-mute">
                        {index === 0
                          ? 'Punto de entrada recomendado.'
                          : index === 1
                            ? 'Curso principal sugerido según tu perfil.'
                            : 'Siguiente curso sugerido cuando completes lo anterior.'}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4 text-sm text-mute">
                  Próximo hito sugerido:{' '}
                  <span className="font-semibold text-foam">{recommendationPlan.nextMilestone}</span>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Boton onClick={handleApplyRecommendation}>
                    {user ? 'Aplicar al perfil y continuar' : recommendationPlan.actionLabel}
                  </Boton>
                  <Boton variant="secondary" onClick={handleOpenSuggestedPath}>
                    Ver curso sugerido
                  </Boton>
                </div>
              </Tarjeta>

              <Tarjeta className="space-y-5 p-8">
                <div>
                  <p className="eyebrow">Resultado sugerido</p>
                  <h2 className="mt-4 font-display text-3xl font-semibold text-foam">
                    Ranking de cursos para ti
                  </h2>
                  <p className="mt-3 text-mute">
                    Estas cards también abren el preview del curso al hacer clic.
                  </p>
                </div>

                <div className="space-y-4">
                  {recommendations.map((course, index) => (
                    <InteractiveRecommendationCard
                      key={course.id}
                      result={course}
                      index={index}
                      onOpen={openCoursePreview}
                    />
                  ))}
                </div>
              </Tarjeta>
            </div>
          </section>
        </main>
      </div>

      <DialogoVistaCurso
        courseMeta={selectedCourseMeta}
        courseData={selectedCourseData}
        isLoggedIn={Boolean(user)}
        onClose={closeCoursePreview}
        onStart={handleStartSelectedCourse}
      />

      <DialogoAcceso
        courseTitle={authCourseMeta?.title}
        open={Boolean(authCourseMeta)}
        onClose={closeAuthChoice}
        onLogin={handleLoginFromDialog}
        onRegister={handleRegisterFromDialog}
      />
    </>
  )
}
