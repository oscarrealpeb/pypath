import { useNavigate } from 'react-router-dom'
import { Boton } from '../../../componentes/Boton.jsx'
import { Tarjeta } from '../../../componentes/Tarjeta.jsx'
import { BarraProgreso } from '../../../componentes/BarraProgreso.jsx'
import {
  obtenerEtiquetaVisibleLeccion,
  obtenerTituloVisibleLeccion,
} from '../selectores/selectoresCursos.js'
import { obtenerRegistroEvaluacionUnidad } from '../../evaluaciones/selectores/selectoresEvaluaciones.js'
import {
  leccionEstaCompletada,
  leccionEstaDesbloqueada,
  evaluacionUnidadEstaCompletada,
  evaluacionUnidadEstaDesbloqueada,
  unidadEstaDesbloqueada,
} from '../../progreso/selectores/selectoresProgreso.js'

export function TarjetaUnidad({
  courseId,
  unit,
  unitIndex,
  progress,
  assessmentResult,
  recommendedUnitId,
}) {
  const navigate = useNavigate()
  const { completedLessons, completedUnitAssessments, completedCourseAssessments } = progress
  const completedCount = unit.lessons.filter((lesson) => completedLessons.includes(lesson.id)).length
  const assessmentRecord = obtenerRegistroEvaluacionUnidad(courseId, unit.id)
  const unitUnlocked = unidadEstaDesbloqueada(
    completedLessons,
    completedUnitAssessments,
    completedCourseAssessments,
    courseId,
    unit.id,
    assessmentResult,
  )
  const assessmentCompleted = assessmentRecord
    ? evaluacionUnidadEstaCompletada(completedUnitAssessments, assessmentRecord.assessment.id)
    : false
  const assessmentUnlocked = assessmentRecord
    ? evaluacionUnidadEstaDesbloqueada(
        completedLessons,
      completedUnitAssessments,
      completedCourseAssessments,
      courseId,
      unit.id,
      assessmentResult,
    )
    : false

  return (
    <Tarjeta className="space-y-5" accent={unit.id === recommendedUnitId}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow">{unit.id === recommendedUnitId ? 'Sugerida' : 'Unidad'}</span>
            <span className="status-chip">{unit.lessons.length} misiones</span>
            {assessmentRecord && <span className="status-chip">1 evaluación</span>}
          </div>
          <div>
            <h3 className="font-display text-2xl font-semibold text-foam">{unit.title}</h3>
            <p className="mt-3 text-mute">{unit.summary}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-border/80 bg-white/5 px-4 py-3 text-sm text-mute">
          <p className="uppercase tracking-[0.22em]">Estado</p>
          <p className="mt-2 font-semibold text-foam">
            {assessmentCompleted
              ? 'Unidad cerrada'
              : !unitUnlocked
                ? 'Bloqueada'
                : assessmentUnlocked
                  ? 'Lista para evaluación'
                  : 'En progreso'}
          </p>
        </div>
      </div>

      <BarraProgreso value={completedCount} total={unit.lessons.length} label="Progreso de la unidad" />

      <div className="grid gap-3">
        {unit.lessons.map((lesson, lessonIndex) => {
          const completed = leccionEstaCompletada(completedLessons, lesson.id)
          const unlocked = leccionEstaDesbloqueada(
            completedLessons,
            completedUnitAssessments,
            completedCourseAssessments,
            lesson.id,
            assessmentResult,
          )
          const missionLabel = obtenerEtiquetaVisibleLeccion(unitIndex, lessonIndex)
          const visibleTitle = obtenerTituloVisibleLeccion(lesson, lessonIndex)

          return (
            <div
              key={lesson.id}
              className={`rounded-2xl border px-4 py-4 transition ${
                completed
                  ? 'border-primary/25 bg-primary/10'
                  : unlocked
                    ? 'border-border/80 bg-panel-2/70'
                    : 'border-border/50 bg-panel-2/40 opacity-70'
              }`}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="eyebrow">{missionLabel}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-foam">{visibleTitle}</span>
                    <span className="status-chip">{lesson.duration}</span>
                    <span className="status-chip">{lesson.xp} XP</span>
                  </div>
                  <p className="mt-2 text-sm text-mute">{lesson.objective}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-semibold uppercase tracking-[0.22em] ${
                      completed
                        ? 'text-primary'
                        : unlocked
                          ? 'text-teal'
                          : 'text-mute'
                    }`}
                  >
                    {completed ? 'Completada' : unlocked ? 'Desbloqueada' : 'Bloqueada'}
                  </span>
                  <Boton
                    size="sm"
                    variant={completed ? 'secondary' : 'primary'}
                    disabled={!unlocked}
                    onClick={() => navigate(`/lesson/${lesson.id}`)}
                  >
                    {completed ? 'Repasar' : 'Abrir'}
                  </Boton>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {assessmentRecord && (
        <div
          className={`rounded-2xl border p-4 ${
            assessmentCompleted
              ? 'border-primary/25 bg-primary/10'
              : assessmentUnlocked
                ? 'border-border/80 bg-white/5'
                : 'border-border/50 bg-panel-2/40 opacity-80'
          }`}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="eyebrow">Evaluación de unidad</span>
                <span className="status-chip">
                  {assessmentRecord.assessment.questions.length} preguntas
                </span>
              </div>
              <h4 className="mt-4 font-display text-xl font-semibold text-foam">
                {assessmentRecord.assessment.title}
              </h4>
              <p className="mt-2 text-sm text-mute">{assessmentRecord.assessment.summary}</p>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`text-xs font-semibold uppercase tracking-[0.22em] ${
                  assessmentCompleted
                    ? 'text-primary'
                    : assessmentUnlocked
                      ? 'text-teal'
                      : 'text-mute'
                }`}
              >
                {assessmentCompleted
                  ? 'Aprobada'
                  : assessmentUnlocked
                    ? 'Disponible'
                    : 'Se abre al cerrar las misiones'}
              </span>
              <Boton
                size="sm"
                variant={assessmentCompleted ? 'secondary' : 'primary'}
                disabled={!assessmentUnlocked && !assessmentCompleted}
                onClick={() => navigate(assessmentRecord.path)}
              >
                {assessmentCompleted ? 'Revisar' : 'Presentar'}
              </Boton>
            </div>
          </div>
        </div>
      )}
    </Tarjeta>
  )
}
