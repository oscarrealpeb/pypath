import { useNavigate } from 'react-router-dom'
import { Boton } from '../../../componentes/Boton.jsx'
import { Tarjeta } from '../../../componentes/Tarjeta.jsx'
import { BarraProgreso } from '../../../componentes/BarraProgreso.jsx'
import { obtenerCatalogoCursos } from '../../contenido/servicios/repositorioContenido.js'
import { obtenerRutaEvaluacionDesdePaso } from '../../evaluaciones/selectores/selectoresEvaluaciones.js'
import {
  puedeOmitirFundamentosConDiagnostico,
  obtenerResumenCurso,
  obtenerInicioRecomendado,
} from '../../progreso/selectores/selectoresProgreso.js'
import { obtenerProgresoCurso } from '../selectores/selectoresCursos.js'

export function TarjetaCurso({ course, progress, assessmentResult }) {
  const navigate = useNavigate()
  const catalogoCursos = obtenerCatalogoCursos()
  const summary = obtenerResumenCurso(course.id, {
    ...progress,
    assessmentResult,
  })
  const recommendedStart = obtenerInicioRecomendado(course.id, assessmentResult)
  const courseMeta = catalogoCursos.find((item) => item.id === course.id)
  const canSkipFundamentals = puedeOmitirFundamentosConDiagnostico(assessmentResult)
  const prerequisitesReady =
    !(course.requiredCourseIds?.length ?? 0) ||
    course.requiredCourseIds.every((requiredCourseId) => {
      if (requiredCourseId === 'python-fundamentals' && canSkipFundamentals) {
        return true
      }

      const progressSnapshot = obtenerProgresoCurso(
        requiredCourseId,
        progress,
      )
      return progressSnapshot.cursoEstaCompletado
    })
  const statusLabel = summary.cursoEstaCompletado
    ? 'Completado'
    : !prerequisitesReady
      ? 'Bloqueado por prerrequisitos'
      : summary.nextStep?.type === 'unit-assessment'
        ? 'Evaluación de unidad pendiente'
        : summary.nextStep?.type === 'course-assessment'
          ? 'Evaluación final pendiente'
          : 'Disponible'

  return (
    <Tarjeta className="space-y-5" accent={summary.completedCount > 0}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow">{course.library}</span>
            <span className="status-chip">{course.difficulty}</span>
            <span className="status-chip">{course.units.length} unidades</span>
            {courseMeta && (
              <span className="status-chip">Intensidad {courseMeta.intensity.toLowerCase()}</span>
            )}
          </div>
          <div>
            <h3 className="font-display text-3xl font-semibold text-foam">{course.title}</h3>
            <p className="mt-3 max-w-3xl text-mute">{course.summary}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-border/80 bg-white/5 px-4 py-3 text-sm text-mute">
          <p className="uppercase tracking-[0.22em]">Estado</p>
          <p className="mt-2 font-semibold text-foam">{statusLabel}</p>
        </div>
      </div>

      <BarraProgreso
        value={summary.completedCount}
        total={summary.totalCount}
        label="Progreso del curso"
      />

      {courseMeta && (
        <div className="grid gap-3 lg:grid-cols-3">
          <div className="rounded-2xl border border-border/80 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-mute">Ideal para</p>
            <p className="mt-2 text-sm text-foam">{courseMeta.audience.join(' / ')}</p>
          </div>
          <div className="rounded-2xl border border-border/80 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-mute">Prerrequisitos</p>
            <p className="mt-2 text-sm text-foam">
              {courseMeta.prerequisites.length > 0
                ? courseMeta.prerequisites.join(' / ')
                : 'Ninguno'}
            </p>
          </div>
          <div className="rounded-2xl border border-border/80 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-mute">Después de este curso</p>
            <p className="mt-2 text-sm text-foam">
              {courseMeta.nextAfter.length > 0
                ? courseMeta.nextAfter.join(' / ')
                : 'Más proyectos prácticos'}
            </p>
          </div>
        </div>
      )}

      {recommendedStart && (
        <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4 text-sm text-mute">
          Recomendación del diagnóstico: empieza por{' '}
          <span className="font-semibold text-foam">{recommendedStart.unitTitle}</span> y entra
          primero en <span className="font-semibold text-foam">{recommendedStart.lessonTitle}</span>.
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Boton onClick={() => navigate(`/course/${course.id}`)}>Ver curso completo</Boton>
        {summary.nextStep && (
          <Boton
            variant="secondary"
            onClick={() => navigate(obtenerRutaEvaluacionDesdePaso(summary.nextStep))}
          >
            {summary.nextStep.label}
          </Boton>
        )}
      </div>
    </Tarjeta>
  )
}
