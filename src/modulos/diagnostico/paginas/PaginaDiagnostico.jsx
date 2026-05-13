import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Boton } from '../../../componentes/Boton.jsx'
import { Modal } from '../../../componentes/Modal.jsx'
import { Tarjeta } from '../../../componentes/Tarjeta.jsx'
import {
  CANTIDAD_PREGUNTAS_DIAGNOSTICO,
  DURACION_DIAGNOSTICO_MINUTOS,
  obtenerPreguntasDiagnosticoPorIds,
} from '../../../datos/preguntasDiagnostico.js'
import { obtenerCatalogoCursos } from '../../contenido/servicios/repositorioContenido.js'
import { recomendarCursosPorPerfil } from '../../inicio/servicios/servicioRecomendacionCursos.js'
import { obtenerPerfilLegible } from '../../perfil/servicios/servicioResumenPerfil.js'
import { useAccionesApp, useEstadoApp } from '../../progreso/contexto/useEstadoApp.js'
import {
  puedeOmitirFundamentosConDiagnostico,
  obtenerInicioRecomendado,
} from '../../progreso/selectores/selectoresProgreso.js'
import { CuestionarioDiagnostico } from '../componentes/CuestionarioDiagnostico.jsx'

export function PaginaDiagnostico() {
  const navigate = useNavigate()
  const location = useLocation()
  const { onboarding, user } = useEstadoApp()
  const {
    completeOnboarding,
    saveAssessment,
    saveAssessmentAnswer,
    startAssessmentAttempt,
    setAssessmentCurrentIndex,
  } = useAccionesApp()
  const catalogoCursos = obtenerCatalogoCursos()
  const autoStartRequested = Boolean(location.state?.startAssessment)
  const [mostrarAdvertenciaInicio, setMostrarAdvertenciaInicio] = useState(
    () => autoStartRequested && !onboarding.assessmentResult && !onboarding.assessmentAttempt,
  )
  const intentoActivo = onboarding.assessmentAttempt
  const assessmentResult = onboarding.assessmentResult
  const preguntasActivas = useMemo(
    () => obtenerPreguntasDiagnosticoPorIds(intentoActivo?.questionIds ?? []),
    [intentoActivo?.questionIds],
  )
  const recommendedStart = obtenerInicioRecomendado(null, assessmentResult)
  const canSkipFundamentals = puedeOmitirFundamentosConDiagnostico(assessmentResult)
  const profileRecommendations = useMemo(
    () =>
      recomendarCursosPorPerfil({
        role: user?.role,
        interests: user?.interests ?? [],
        experience: user?.experience ?? 'principiante',
      }).slice(0, 3),
    [user],
  )
  const { roleLabel, interestLabels } = obtenerPerfilLegible(user)
  const goalCourse = catalogoCursos.find((course) => course.id === user?.goalCourseId)
  const cursoSugeridoPorPerfil = goalCourse ?? profileRecommendations[0] ?? null

  function handleContinueWithoutAssessment() {
    completeOnboarding('later')
    navigate('/dashboard')
  }

  function handleStartAssessment() {
    if (assessmentResult || intentoActivo) {
      return
    }

    setMostrarAdvertenciaInicio(true)
  }

  function handleAssessmentComplete(result) {
    if (assessmentResult) {
      return
    }

    saveAssessment(result)
  }

  if (intentoActivo && preguntasActivas.length > 0 && !assessmentResult) {
    return (
      <CuestionarioDiagnostico
        intento={intentoActivo}
        preguntas={preguntasActivas}
        onBack={() => navigate('/dashboard')}
        onChangeIndex={setAssessmentCurrentIndex}
        onComplete={handleAssessmentComplete}
        onSelectAnswer={saveAssessmentAnswer}
      />
    )
  }

  return (
    <>
      <div className="space-y-8">
        <div className="space-y-4">
          <p className="eyebrow">Diagnóstico y recomendación</p>
          <h1 className="max-w-4xl font-display text-4xl font-semibold text-foam sm:text-5xl">
            Hola, {user?.name}. Ya tenemos una primera lectura de tu perfil.
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-mute">
            Tu rol e intereses ya permiten sugerir un orden inicial de cursos, pero esta
            evaluación opcional puede afinar mejor si necesitas cerrar Fundamentos primero o
            si ya puedes entrar directo a un curso activo.
          </p>
        </div>

        <Tarjeta accent className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow">Tu perfil inicial</span>
            <span className="status-chip">{roleLabel}</span>
            <span className="status-chip">Nivel {user?.experience ?? 'principiante'}</span>
          </div>

          <div>
            <p className="text-sm text-mute">
              Intereses elegidos:{' '}
              {interestLabels.length > 0 ? interestLabels.join(' / ') : 'sin intereses aún'}.
            </p>
          </div>

          {goalCourse && (
            <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4 text-sm text-mute">
              Curso objetivo guardado en tu perfil:{' '}
              <span className="font-semibold text-foam">{goalCourse.title}</span>.
            </div>
          )}

          <div className="grid gap-4 lg:grid-cols-3">
            {profileRecommendations.map((course, index) => (
              <div key={course.id} className="rounded-2xl border border-border/80 bg-white/5 p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="eyebrow">Top {index + 1}</span>
                  <span className="status-chip">{course.library}</span>
                </div>
                <h2 className="mt-4 font-display text-2xl font-semibold text-foam">
                  {course.title}
                </h2>
                <p className="mt-3 text-sm text-mute">{course.reason}</p>
                <p className="mt-3 text-sm text-mute">
                  Prerrequisitos:{' '}
                  {course.prerequisites.length > 0 ? course.prerequisites.join(' / ') : 'Ninguno'}.
                </p>
              </div>
            ))}
          </div>
        </Tarjeta>

        {assessmentResult && (
          <Tarjeta accent className="space-y-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
                <p className="eyebrow">Resultado del diagnóstico</p>
                <h2 className="font-display text-3xl font-semibold text-foam">
                  Nivel sugerido: {assessmentResult.level}
                </h2>
                <p className="max-w-3xl text-mute">{assessmentResult.summary}</p>
              </div>
              <Boton onClick={() => navigate('/dashboard')}>Ir al panel</Boton>
            </div>

            <div className="grid gap-4 rounded-2xl border border-border/80 bg-white/5 p-4 sm:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-mute">Aciertos</p>
                <p className="mt-2 text-base font-semibold text-foam">
                  {assessmentResult.score} / {assessmentResult.total}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-mute">Porcentaje</p>
                <p className="mt-2 text-base font-semibold text-foam">
                  {assessmentResult.percentage}%
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-mute">Tiempo</p>
                <p className="mt-2 text-base font-semibold text-foam">
                  {assessmentResult.timedOut ? 'Se agotó el tiempo' : 'Entregado a tiempo'}
                </p>
              </div>
            </div>

            {recommendedStart && (
              <div className="grid gap-4 rounded-2xl border border-primary/20 bg-primary/10 p-5 lg:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-mute">Curso</p>
                  <p className="mt-2 text-base font-semibold text-foam">
                    {recommendedStart.courseTitle}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-mute">Unidad sugerida</p>
                  <p className="mt-2 text-base font-semibold text-foam">
                    {recommendedStart.unitTitle}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-mute">Punto de inicio</p>
                  <p className="mt-2 text-base font-semibold text-foam">
                    {recommendedStart.lessonTitle}
                  </p>
                </div>
              </div>
            )}

            {canSkipFundamentals && !recommendedStart && cursoSugeridoPorPerfil && (
              <div className="grid gap-4 rounded-2xl border border-primary/20 bg-primary/10 p-5 lg:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-mute">Puedes empezar por</p>
                  <p className="mt-2 text-base font-semibold text-foam">
                    {cursoSugeridoPorPerfil.title}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-mute">Según tu perfil</p>
                  <p className="mt-2 text-base text-mute">
                    Tu resultado fue suficiente para no depender de Fundamentos como requisito.
                  </p>
                </div>
              </div>
            )}

            <div
              className={`rounded-2xl border p-4 text-sm ${
                canSkipFundamentals
                  ? 'border-primary/25 bg-primary/10 text-mute'
                  : 'border-border/80 bg-white/5 text-mute'
              }`}
            >
              {canSkipFundamentals
                ? 'Te fue bastante bien. Ya puedes entrar directo a otros cursos y dejar Fundamentos como refuerzo opcional.'
                : 'Con este resultado, primero debes completar Fundamentos de Python antes de abrir cualquier otro curso.'}
            </div>
          </Tarjeta>
        )}

        {!assessmentResult ? (
          <div className="grid gap-6 lg:grid-cols-2">
            <Tarjeta className="flex h-full flex-col justify-between gap-6">
              <div className="space-y-4">
                <p className="eyebrow">Opción 1</p>
                <h2 className="font-display text-3xl font-semibold text-foam">
                  Seguir con la recomendación actual
                </h2>
                <p className="text-mute">
                  Puedes dejar el diagnóstico para después y seguir con la recomendación que ya
                  sale de tu perfil inicial.
                </p>
                <div className="rounded-2xl border border-border/80 bg-white/5 p-4 text-sm text-mute">
                  Punto de partida sugerido ahora:{' '}
                  {profileRecommendations[0]?.title ?? 'Fundamentos de Python'}.
                </div>
              </div>

              <Boton size="lg" onClick={handleContinueWithoutAssessment}>
                Lo haré luego
              </Boton>
            </Tarjeta>

            <Tarjeta className="flex h-full flex-col justify-between gap-6">
              <div className="space-y-4">
                <p className="eyebrow">Opción 2</p>
                <h2 className="font-display text-3xl font-semibold text-foam">
                  Hacer evaluación diagnóstica
                </h2>
                <p className="text-mute">
                  Responde una prueba breve enfocada solo en fundamentos de Python: variables,
                  condicionales, ciclos, funciones y colecciones.
                </p>
                <div className="rounded-2xl border border-border/80 bg-white/5 p-4 text-sm text-mute">
                  Duración estimada: {DURACION_DIAGNOSTICO_MINUTOS} minutos. Tendrás un solo intento y
                  se seleccionarán {CANTIDAD_PREGUNTAS_DIAGNOSTICO} preguntas aleatorias desde el banco del sistema.
                </div>
              </div>

              <Boton variant="secondary" size="lg" onClick={handleStartAssessment}>
                Tomar diagnóstico ahora
              </Boton>
            </Tarjeta>
          </div>
        ) : (
          <Tarjeta className="space-y-4">
            <p className="eyebrow">Diagnóstico completado</p>
            <h2 className="font-display text-3xl font-semibold text-foam">
              Ya usaste tu evaluación inicial
            </h2>
            <p className="max-w-3xl text-mute">
              Este diagnóstico solo puede realizarse una vez. Desde aquí puedes revisar el
              resultado guardado y seguir con el curso que te corresponda.
            </p>
          </Tarjeta>
        )}
      </div>

      <Modal
        open={mostrarAdvertenciaInicio && !assessmentResult && !intentoActivo}
        onClose={() => setMostrarAdvertenciaInicio(false)}
        size="md"
      >
        <div className="space-y-5 p-7 sm:p-8">
          <div className="space-y-3">
            <p className="eyebrow">Antes de empezar</p>
            <h2 className="font-display text-3xl font-semibold text-foam">
              Esta evaluación tiene tiempo y un solo intento
            </h2>
            <p className="text-mute">
              Responderás {CANTIDAD_PREGUNTAS_DIAGNOSTICO} preguntas aleatorias de fundamentos de Python. Tendrás{' '}
              {DURACION_DIAGNOSTICO_MINUTOS} minutos y, una vez la abras, esa será tu única
              oportunidad de presentar el diagnóstico.
            </p>
          </div>

          <div className="rounded-2xl border border-border/80 bg-white/5 p-4 text-sm text-mute">
            Si cierras la vista, el intento seguirá activo hasta que entregues o se agote el
            tiempo.
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Boton
              size="lg"
              onClick={() => {
                setMostrarAdvertenciaInicio(false)
                startAssessmentAttempt()
              }}
            >
              Entendido, empezar ahora
            </Boton>
            <Boton
              variant="secondary"
              size="lg"
              onClick={() => setMostrarAdvertenciaInicio(false)}
            >
              Cancelar
            </Boton>
          </div>
        </div>
      </Modal>
    </>
  )
}
