import {
  opcionesExperiencia,
  opcionesInteres,
  opcionesRol,
  sanearSeleccionIntereses,
} from '../../../datos/opcionesPerfilUsuario.js'
import { obtenerCatalogoCursos, obtenerCursos } from '../../contenido/servicios/repositorioContenido.js'
import { obtenerProgresoCurso } from '../../cursos/selectores/selectoresCursos.js'
import { obtenerResumenCurso } from '../../progreso/selectores/selectoresProgreso.js'

export function obtenerPerfilLegible(user) {
  const roleLabel =
    opcionesRol.find((option) => option.value === user?.role)?.label ?? 'Sin rol definido'
  const experienceLabel =
    opcionesExperiencia.find((option) => option.value === user?.experience)?.label ??
    'Principiante'
  const interestLabels = sanearSeleccionIntereses(user?.interests ?? []).map(
    (value) => opcionesInteres.find((option) => option.value === value)?.label ?? value,
  )

  return { roleLabel, experienceLabel, interestLabels }
}

export function obtenerProgresoGeneral(progress) {
  const totals = obtenerCursos().reduce(
    (accumulator, course) => {
      const courseProgress = obtenerProgresoCurso(
        course.id,
        progress,
      )

      return {
        totalLessons: accumulator.totalLessons + courseProgress.totalLessons,
        completedLessons: accumulator.completedLessons + courseProgress.completedLessonsCount,
        totalMilestones: accumulator.totalMilestones + courseProgress.totalCount,
        completedMilestones: accumulator.completedMilestones + courseProgress.completedCount,
      }
    },
    {
      totalLessons: 0,
      completedLessons: 0,
      totalMilestones: 0,
      completedMilestones: 0,
    },
  )

  return {
    ...totals,
    percentage: totals.totalMilestones
      ? Math.round((totals.completedMilestones / totals.totalMilestones) * 100)
      : 0,
  }
}

export function obtenerResumenesCursos(progress, assessmentResult = null) {
  return obtenerCursos().map((course) => ({
    course,
    meta: obtenerCatalogoCursos().find((item) => item.id === course.id) ?? null,
    progress: obtenerProgresoCurso(
      course.id,
      progress,
    ),
    summary: obtenerResumenCurso(course.id, {
      ...progress,
      assessmentResult,
    }),
  }))
}

export function obtenerCursoFocoActual(progress, assessmentResult = null) {
  const snapshots = obtenerResumenesCursos(progress, assessmentResult)

  if (assessmentResult?.canSkipFundamentals) {
    return (
      snapshots.find(
        ({ course, summary }) =>
          course.id !== 'python-fundamentals' &&
          summary.nextStep &&
          !summary.cursoEstaCompletado,
      ) ??
      snapshots.find(({ summary }) => summary.nextStep && !summary.cursoEstaCompletado)
    )
  }

  return snapshots.find(({ summary }) => summary.nextStep && !summary.cursoEstaCompletado)
}
