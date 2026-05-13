import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Boton } from '../../../componentes/Boton.jsx'
import { Tarjeta } from '../../../componentes/Tarjeta.jsx'
import { obtenerCatalogoCursos } from '../../contenido/servicios/repositorioContenido.js'
import {
  obtenerRutaEvaluacionDesdePaso,
  obtenerRegistroEvaluacionFinal,
} from '../../evaluaciones/selectores/selectoresEvaluaciones.js'
import { useEstadoApp } from '../../progreso/contexto/useEstadoApp.js'
import {
  obtenerResumenCurso,
  obtenerInicioRecomendado,
  evaluacionCursoEstaCompletada,
  evaluacionFinalEstaDesbloqueada,
} from '../../progreso/selectores/selectoresProgreso.js'
import { TarjetaUnidad } from '../componentes/TarjetaUnidad.jsx'
import { obtenerCursoPorId, obtenerProgresoCurso } from '../selectores/selectoresCursos.js'

export function PaginaCurso() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { progress, onboarding } = useEstadoApp()
  const progressWithAssessment = {
    ...progress,
    assessmentResult: onboarding.assessmentResult,
  }
  const catalogoCursos = obtenerCatalogoCursos()
  const course = obtenerCursoPorId(id)
  const courseMeta = catalogoCursos.find((item) => item.id === id)

  if (!course) {
    return (
      <Tarjeta className="text-center">
        <p className="eyebrow">Curso no encontrado</p>
        <h1 className="mt-5 font-display text-3xl font-semibold text-foam">
          El curso solicitado no existe
        </h1>
      </Tarjeta>
    )
  }

  const courseProgress = obtenerProgresoCurso(
    course.id,
    progress.completedLessons,
    progress.completedUnitAssessments,
    progress.completedCourseAssessments,
  )
  const courseSummary = obtenerResumenCurso(course.id, progressWithAssessment)
  const nextStep = courseSummary.nextStep
  const recommendedStart = obtenerInicioRecomendado(course.id, onboarding.assessmentResult)
  const finalAssessmentRecord = obtenerRegistroEvaluacionFinal(course.id)
  const finalAssessmentCompleted = finalAssessmentRecord
    ? evaluacionCursoEstaCompletada(
        progress.completedCourseAssessments,
        finalAssessmentRecord.assessment.id,
      )
    : false
  const finalAssessmentUnlocked = finalAssessmentRecord
    ? evaluacionFinalEstaDesbloqueada(
        progress.completedLessons,
        progress.completedUnitAssessments,
        progress.completedCourseAssessments,
        course.id,
      )
    : false
  const isBlockedByPrerequisites =
    (course.requiredCourseIds?.length ?? 0) > 0 &&
    courseProgress.completedCount === 0 &&
    !courseSummary.prerequisitesResolved

  const unitsCarouselRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [currentUnitIndex, setCurrentUnitIndex] = useState(0)

  useEffect(() => {
    const container = unitsCarouselRef.current
    if (!container) {
      return undefined
    }

    const updateScrollState = () => {
      setCanScrollLeft(container.scrollLeft > 8)
      setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth - 8)
    }

    updateScrollState()
    container.addEventListener('scroll', updateScrollState)
    window.addEventListener('resize', updateScrollState)

    return () => {
      container.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [course.units.length])

  function scrollUnits(direction) {
    const container = unitsCarouselRef.current
    if (!container) {
      return
    }

    const nextIndex = Math.max(0, Math.min(course.units.length - 1, currentUnitIndex + direction))
    setCurrentUnitIndex(nextIndex)

    const cards = container.querySelectorAll(':scope > div')
    if (cards[nextIndex]) {
      cards[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    }
  }

  return (
    <div className="space-y-8">
      <Tarjeta accent className="space-y-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="eyebrow">{course.library}</span>
              {courseMeta && <span className="status-chip">{courseMeta.statusLabel}</span>}
              {courseMeta && (
                <span className="status-chip">Intensidad {courseMeta.intensity.toLowerCase()}</span>
              )}
            </div>
            <h1 className="font-display text-4xl font-semibold text-foam">{course.title}</h1>
            <p className="max-w-3xl text-lg leading-8 text-mute">{course.summary}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Boton variant="ghost" onClick={() => navigate('/dashboard')}>
              Volver al panel
            </Boton>
            {nextStep && (
              <Boton onClick={() => navigate(obtenerRutaEvaluacionDesdePaso(nextStep))}>
                {nextStep.label}
              </Boton>
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border/80 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-mute">Progreso total</p>
            <p className="mt-3 font-display text-2xl font-semibold text-foam">
              {courseProgress.completedCount}/{courseProgress.totalCount}
            </p>
          </div>
          <div className="rounded-2xl border border-border/80 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-mute">Misiones superadas</p>
            <p className="mt-3 font-display text-2xl font-semibold text-foam">
              {courseProgress.completedLessonsCount}/{courseProgress.totalLessons}
            </p>
          </div>
          <div className="rounded-2xl border border-border/80 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-mute">Estado</p>
            <p className="mt-3 font-display text-2xl font-semibold text-foam">
              {courseProgress.cursoEstaCompletado
                ? 'Finalizado'
                : nextStep?.type === 'unit-assessment'
                  ? 'Evaluación de unidad pendiente'
                  : nextStep?.type === 'course-assessment'
                    ? 'Evaluación final pendiente'
                    : 'Activo'}
            </p>
          </div>
        </div>

        {courseMeta && (
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-border/80 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-mute">Ideal para</p>
              <p className="mt-3 text-sm text-foam">{courseMeta.audience.join(' / ')}</p>
            </div>
            <div className="rounded-2xl border border-border/80 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-mute">Prerrequisitos</p>
              <p className="mt-3 text-sm text-foam">
                {courseMeta.prerequisites.length > 0
                  ? courseMeta.prerequisites.join(' / ')
                  : 'Ninguno'}
              </p>
            </div>
            <div className="rounded-2xl border border-border/80 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-mute">Después de este curso</p>
              <p className="mt-3 text-sm text-foam">
                {courseMeta.nextAfter.length > 0
                  ? courseMeta.nextAfter.join(' / ')
                  : 'Más proyectos prácticos'}
              </p>
            </div>
          </div>
        )}

        {recommendedStart && (
          <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4 text-sm text-mute">
            {courseSummary.prerequisitesResolved ? (
              <>
                Tu diagnóstico sugiere arrancar por{' '}
                <span className="font-semibold text-foam">{recommendedStart.unitTitle}</span>.
              </>
            ) : (
              <>
                Tu perfil apunta a este curso, pero antes necesitas cerrar Fundamentos para
                entrar aquí con la base necesaria.
              </>
            )}
          </div>
        )}

        {isBlockedByPrerequisites && (
        <div className="rounded-2xl border border-warning/30 bg-warning/10 p-4 text-sm text-yellow-100">
            Este curso sigue bloqueado porque antes debes completar los prerrequisitos,
            en especial Fundamentos de Python.
          </div>
        )}
      </Tarjeta>

      <section className="space-y-4">
        <div>
          <p className="eyebrow">Unidades</p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-foam">
            Curso / Unidades / Lecciones
          </h2>
        </div>

        <div className="space-y-4 rounded-3xl border border-border/80 bg-white/5 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-mute">Desplaza las unidades horizontalmente usando las flechas.</p>
            </div>
            <div className="flex items-center gap-2">
              <Boton
                variant="secondary"
                size="sm"
                disabled={currentUnitIndex === 0}
                onClick={() => scrollUnits(-1)}
                className="px-2"
              >
                ←
              </Boton>
              <Boton
                variant="secondary"
                size="sm"
                disabled={currentUnitIndex >= course.units.length - 1}
                onClick={() => scrollUnits(1)}
                className="px-2"
              >
                →
              </Boton>
            </div>
          </div>

          <div
            ref={unitsCarouselRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 pr-2"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {course.units.map((unit) => (
              <div key={unit.id} className="min-w-full flex-shrink-0 snap-start">
                <TarjetaUnidad
                  courseId={course.id}
                  unit={unit}
                  progress={progress}
                  assessmentResult={onboarding.assessmentResult}
                  recommendedUnitId={onboarding.assessmentResult?.recommendedUnitId}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {finalAssessmentRecord && (
        <section className="space-y-4">
          <div>
            <p className="eyebrow">Cierre del curso</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-foam">
              Evaluación final del curso
            </h2>
          </div>

          <Tarjeta className="space-y-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="eyebrow">Checkpoint final</span>
                  <span className="status-chip">
                    {finalAssessmentRecord.assessment.questions.length} preguntas
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-foam">
                    {finalAssessmentRecord.assessment.title}
                  </h3>
                  <p className="mt-3 max-w-3xl text-mute">
                    {finalAssessmentRecord.assessment.summary}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-border/80 bg-white/5 px-4 py-3 text-sm text-mute">
                <p className="uppercase tracking-[0.22em]">Estado</p>
                <p className="mt-2 font-semibold text-foam">
                  {finalAssessmentCompleted
                    ? 'Aprobada'
                    : finalAssessmentUnlocked
                      ? 'Disponible'
                      : 'Bloqueada hasta cerrar las unidades'}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Boton
                disabled={!finalAssessmentUnlocked && !finalAssessmentCompleted}
                onClick={() => navigate(finalAssessmentRecord.path)}
              >
                {finalAssessmentCompleted
                  ? 'Revisar evaluación final'
                  : 'Presentar evaluación final'}
              </Boton>
            </div>
          </Tarjeta>
        </section>
      )}
    </div>
  )
}
