import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Boton } from '../../../componentes/Boton.jsx'
import { Modal } from '../../../componentes/Modal.jsx'
import { Tarjeta } from '../../../componentes/Tarjeta.jsx'
import {
  obtenerCatalogoCursos,
  obtenerCursoCatalogoPorId,
  obtenerCursos,
  obtenerCursosPublicados,
} from '../../contenido/servicios/repositorioContenido.js'
import { obtenerRutaEvaluacionDesdePaso } from '../../evaluaciones/selectores/selectoresEvaluaciones.js'
import { construirPlanRecomendacion } from '../../inicio/servicios/servicioRecomendacionCursos.js'
import { obtenerPerfilLegible } from '../../perfil/servicios/servicioResumenPerfil.js'
import { useAccionesApp, useEstadoApp } from '../../progreso/contexto/useEstadoApp.js'
import {
  puedeOmitirFundamentosConDiagnostico,
  obtenerResumenCurso,
  obtenerEstadisticasGamificadas,
  obtenerInicioRecomendado,
} from '../../progreso/selectores/selectoresProgreso.js'
import { TarjetaCurso } from '../componentes/TarjetaCurso.jsx'

export function PaginaPanel() {
  const navigate = useNavigate()
  const { completeOnboarding } = useAccionesApp()
  const { user, onboarding, progress } = useEstadoApp()
  const [promptDismissed, setPromptDismissed] = useState(false)
  const { roleLabel } = obtenerPerfilLegible(user)
  const cursos = obtenerCursos()
  const cursosPublicados = obtenerCursosPublicados()
  const catalogoCursos = obtenerCatalogoCursos()
  const progressWithAssessment = {
    ...progress,
    assessmentResult: onboarding.assessmentResult,
  }
  const canSkipFundamentals = puedeOmitirFundamentosConDiagnostico(onboarding.assessmentResult)

  const fundamentalsCourse =
    cursosPublicados.find((course) => course.id === 'python-fundamentals') ??
    cursos.find((course) => course.id === 'python-fundamentals')
  const liveLibraryCourses = cursosPublicados.filter((course) => course.id !== 'python-fundamentals')
  const upcomingCourses = catalogoCursos.filter((catalogCourse) => catalogCourse.status !== 'live')
  const fundamentalsSummary = obtenerResumenCurso('python-fundamentals', progressWithAssessment)
  const fundamentalsCompleted = fundamentalsSummary.cursoEstaCompletado
  const preferredCourseId =
    onboarding.assessmentResult?.recommendedCourseId ?? user?.goalCourseId ?? 'python-fundamentals'
  const focusCourse =
    (canSkipFundamentals
      ? cursosPublicados.find((courseItem) => {
          const courseSummary = obtenerResumenCurso(courseItem.id, progressWithAssessment)
          return (
            courseItem.id === preferredCourseId &&
            !courseSummary.cursoEstaCompletado &&
            courseSummary.nextStep
          )
        }) ??
        cursosPublicados.find((courseItem) => {
          const courseSummary = obtenerResumenCurso(courseItem.id, progressWithAssessment)
          return (
            courseItem.id !== 'python-fundamentals' &&
            !courseSummary.cursoEstaCompletado &&
            courseSummary.nextStep
          )
        })
      : null) ??
    cursosPublicados.find((courseItem) => {
      const courseSummary = obtenerResumenCurso(courseItem.id, progressWithAssessment)
      return !courseSummary.cursoEstaCompletado && courseSummary.nextStep
    }) ??
    fundamentalsCourse
  const focusSummary = obtenerResumenCurso(focusCourse.id, progressWithAssessment)
  const stats = obtenerEstadisticasGamificadas(progress.completedLessons)
  const recommendedStart = obtenerInicioRecomendado(null, onboarding.assessmentResult)
  const goalCourse = user?.goalCourseId ? obtenerCursoCatalogoPorId(user.goalCourseId) : null
  const goalCourseIsPublished = goalCourse?.status === 'live'
  const librariesUnlocked = fundamentalsCompleted || canSkipFundamentals
  const showDiagnosticPrompt = !onboarding.completed && !promptDismissed
  const profileRecommendationPlan = construirPlanRecomendacion({
    role: user?.role,
    interests: user?.interests ?? [],
    experience: user?.experience ?? 'principiante',
  })

  function handleDecideLater() {
    setPromptDismissed(true)
    completeOnboarding('later')
  }

  return (
    <div className="space-y-8">
      <Modal open={showDiagnosticPrompt} onClose={() => {}} size="md">
        <div className="space-y-6 p-7 sm:p-8">
          <div className="space-y-3">
            <p className="eyebrow">Diagnóstico opcional</p>
            <h2 className="font-display text-3xl font-semibold text-foam">
              ¿Quieres hacer una evaluación rápida ahora?
            </h2>
            <p className="text-mute">
              Te toma solo unos minutos. Si te va muy bien, PyPath puede dejarte entrar
              directo a los cursos activos. Si todavía falta base, te recomendará empezar
              por Fundamentos antes de abrir los cursos sugeridos para tu perfil.
            </p>
            <p className="text-sm text-mute">
              Esta evaluación inicial solo puede realizarse una vez y tiene tiempo límite.
            </p>
          </div>

            <div className="rounded-2xl border border-primary/25 bg-primary/10 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="eyebrow">Recorrido sugerido por tu perfil</span>
              <span className="status-chip">{profileRecommendationPlan.targetCourse.library}</span>
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

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/80 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-mute">Hacerla ahora</p>
              <p className="mt-3 text-sm leading-7 text-mute">
                Recibes nivel estimado, curso sugerido y una señal clara sobre si puedes
                saltar Fundamentos o no.
              </p>
            </div>
            <div className="rounded-2xl border border-border/80 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-mute">Hacerla luego</p>
              <p className="mt-3 text-sm leading-7 text-mute">
                Entras al panel normal y podrás volver al diagnóstico más tarde desde tu
                progreso o desde el perfil.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Boton
              size="lg"
              onClick={() =>
                navigate('/onboarding', {
                  state: { startAssessment: true },
                })
              }
            >
              Tomar diagnóstico ahora
            </Boton>
            <Boton variant="secondary" size="lg" onClick={handleDecideLater}>
              Lo hago luego
            </Boton>
          </div>
        </div>
      </Modal>

      <Tarjeta accent className="space-y-8 overflow-hidden">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <p className="eyebrow">Panel principal</p>
            <h1 className="max-w-4xl font-display text-4xl font-semibold text-foam sm:text-5xl">
              Bienvenido, {user?.name}. Tu siguiente avance en PyPath ya está listo.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-mute">
              {canSkipFundamentals
                ? `Tu diagnóstico quedó alto y tu perfil apunta a ${roleLabel.toLowerCase()}. Ya puedes entrar directo a los cursos activos que mejor encajen contigo.`
                : `Tu perfil actual apunta a ${roleLabel.toLowerCase()} y el recorrido mantiene una progresión clara: primero Fundamentos de Python, luego cursos para crear herramientas y aplicaciones.`}
            </p>
          </div>

          {focusSummary.nextStep && (
            <Boton
              size="lg"
              onClick={() => navigate(obtenerRutaEvaluacionDesdePaso(focusSummary.nextStep))}
            >
              {focusSummary.nextStep.label}
            </Boton>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-border/80 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-mute">Rango actual</p>
            <p className="mt-3 font-display text-2xl font-semibold text-foam">{stats.rankTitle}</p>
          </div>
          <div className="rounded-2xl border border-border/80 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-mute">XP acumulada</p>
            <p className="mt-3 font-display text-2xl font-semibold text-foam">{stats.xp}</p>
          </div>
          <div className="rounded-2xl border border-border/80 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-mute">Misiones completas</p>
            <p className="mt-3 font-display text-2xl font-semibold text-foam">
              {stats.lessonsCleared}
            </p>
          </div>
          <div className="rounded-2xl border border-border/80 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-mute">Cursos activos</p>
            <p className="mt-3 font-display text-2xl font-semibold text-foam">
              {librariesUnlocked ? liveLibraryCourses.length : 0}
            </p>
          </div>
        </div>
      </Tarjeta>

      {goalCourse && (
        <Tarjeta className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow">Curso objetivo</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-foam">
              Tu perfil apunta a {goalCourse.title}
            </h2>
            <p className="mt-3 max-w-3xl text-mute">
              {canSkipFundamentals
                ? 'Esta preferencia viene del recomendador y ya está guardada en tu perfil. Como tu diagnóstico fue muy alto, puedes entrar directo a este curso.'
                : 'Esta preferencia viene del recomendador y ya está guardada en tu perfil. El recorrido sigue respetando Fundamentos como base cuando hace falta.'}
            </p>
            {!goalCourseIsPublished && (
              <p className="mt-3 text-sm text-mute">
                Este curso sigue en preparación y se habilitará aquí cuando quede publicado.
              </p>
            )}
          </div>

          <Boton
            variant="secondary"
            disabled={!goalCourseIsPublished}
            onClick={() => navigate(`/course/${goalCourse.id}`)}
          >
            {goalCourseIsPublished ? 'Ver curso objetivo' : 'Curso en preparación'}
          </Boton>
        </Tarjeta>
      )}

      {onboarding.assessmentResult ? (
        <Tarjeta className="space-y-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="eyebrow">Diagnóstico guardado</p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-foam">
                Nivel sugerido: {onboarding.assessmentResult.level}
              </h2>
              <p className="mt-3 max-w-3xl text-mute">{onboarding.assessmentResult.summary}</p>
            </div>

            <Boton variant="secondary" onClick={() => navigate('/onboarding')}>
              Ver diagnóstico y recomendación
            </Boton>
          </div>

          {recommendedStart && (
            <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4 text-sm text-mute">
              {canSkipFundamentals ? (
                <>
                  Tu mejor punto de entrada actual es{' '}
                  <span className="font-semibold text-foam">{recommendedStart.courseTitle}</span>,
                  en la unidad{' '}
                  <span className="font-semibold text-foam">{recommendedStart.unitTitle}</span>.
                </>
              ) : (
                <>
                  Tu perfil apunta a{' '}
                  <span className="font-semibold text-foam">{recommendedStart.courseTitle}</span>,
                  pero primero necesitas cerrar Fundamentos para desbloquear ese curso con una
                  base más firme.
                </>
              )}
            </div>
          )}
        </Tarjeta>
      ) : (
        <Tarjeta className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow">Evaluación opcional</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-foam">
              Aún no has hecho el diagnóstico inicial
            </h2>
            <p className="mt-3 max-w-3xl text-mute">
              Puedes hacerlo cuando quieras para recibir un nivel estimado y saber si te
              conviene empezar por Fundamentos o si ya puedes entrar directo a un curso activo.
            </p>
          </div>

          <Boton variant="secondary" onClick={() => navigate('/onboarding')}>
            Hacer diagnóstico
          </Boton>
        </Tarjeta>
      )}

      <section className="space-y-4">
        <div>
          <p className="eyebrow">{canSkipFundamentals ? 'Base recomendada' : 'Módulo base recomendado'}</p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-foam">
            Empieza por Fundamentos de Python
          </h2>
          <p className="max-w-3xl text-mute">
            {canSkipFundamentals
              ? 'Aunque tu diagnóstico ya te deja entrar a otros cursos, este curso sigue siendo un muy buen refuerzo si quieres ordenar mejor la base.'
              : 'Este curso asegura la base común que luego reutilizas en interfaces, juegos, automatización y otras bibliotecas.'}
          </p>
        </div>

        {fundamentalsCourse && (
          <TarjetaCurso
            course={fundamentalsCourse}
            progress={progressWithAssessment}
            assessmentResult={onboarding.assessmentResult}
          />
        )}
      </section>

      <section className="space-y-4">
        <div>
          <p className="eyebrow">Catálogo de cursos</p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-foam">
            Cursos aplicados para crear herramientas y aplicaciones
          </h2>
          <p className="max-w-3xl text-mute">
            {canSkipFundamentals
              ? 'Tu diagnóstico ya te habilita este bloque. Puedes entrar directo al curso que mejor encaje con tu perfil y dejar Fundamentos como refuerzo opcional.'
              : 'Estos cursos se habilitan una vez completes Fundamentos de Python. Así mantenemos una progresión más sana y menos frustrante.'}
          </p>
        </div>

        {librariesUnlocked ? (
          liveLibraryCourses.map((libraryCourse) => (
            <TarjetaCurso
              key={libraryCourse.id}
              course={libraryCourse}
              progress={progressWithAssessment}
              assessmentResult={onboarding.assessmentResult}
            />
          ))
        ) : (
          <Tarjeta className="space-y-4">
            <p className="eyebrow">Aún bloqueado</p>
            <h3 className="font-display text-2xl font-semibold text-foam">
              Completa Fundamentos para abrir los cursos recomendados
            </h3>
            <p className="max-w-3xl text-mute">
              En cuanto cierres Fundamentos, el panel te mostrará PySide6 y Pygame como
              primeras opciones activas según tu perfil.
            </p>
            {fundamentalsSummary.nextStep && (
              <Boton
                onClick={() => navigate(obtenerRutaEvaluacionDesdePaso(fundamentalsSummary.nextStep))}
              >
                {fundamentalsSummary.nextStep.label}
              </Boton>
            )}
          </Tarjeta>
        )}
      </section>

      <section className="space-y-4">
        <div>
          <p className="eyebrow">En roadmap</p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-foam">
            Bibliotecas futuras por perfil y especialidad
          </h2>
          <p className="max-w-3xl text-mute">
            Estos cursos aún no tienen misiones implementadas, pero ya expresan con
            claridad el público ideal y sus prerrequisitos.
          </p>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          {upcomingCourses.map((courseItem) => (
            <Tarjeta key={courseItem.id} className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="eyebrow">{courseItem.library}</span>
                <span className="status-chip">{courseItem.statusLabel}</span>
                <span className="status-chip">
                  Intensidad {courseItem.intensity.toLowerCase()}
                </span>
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold text-foam">
                  {courseItem.title}
                </h3>
                <p className="mt-3 text-mute">{courseItem.description}</p>
              </div>
              <div className="rounded-2xl border border-border/80 bg-white/5 p-4 text-sm text-mute">
                <span className="font-semibold text-foam">Prerrequisitos:</span>{' '}
                {courseItem.prerequisites.join(' / ')}
              </div>
              <div className="rounded-2xl border border-border/80 bg-white/5 p-4 text-sm text-mute">
                <span className="font-semibold text-foam">Ideal para:</span>{' '}
                {courseItem.audience.join(' / ')}
              </div>
            </Tarjeta>
          ))}
        </div>
      </section>
    </div>
  )
}
