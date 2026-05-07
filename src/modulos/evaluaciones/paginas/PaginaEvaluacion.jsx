import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Boton } from '../../../componentes/Boton.jsx'
import { Tarjeta } from '../../../componentes/Tarjeta.jsx'
import {
  obtenerRutaEvaluacionDesdePaso,
  obtenerRegistroEvaluacionFinal,
  obtenerRegistroEvaluacionUnidad,
} from '../selectores/selectoresEvaluaciones.js'
import { puntuarEvaluacion } from '../servicios/servicioPuntajeEvaluacion.js'
import { useAccionesApp, useEstadoApp } from '../../progreso/contexto/useEstadoApp.js'
import {
  obtenerSiguientePasoCurso,
  evaluacionCursoEstaCompletada,
  evaluacionFinalEstaDesbloqueada,
  evaluacionUnidadEstaCompletada,
  evaluacionUnidadEstaDesbloqueada,
} from '../../progreso/selectores/selectoresProgreso.js'

function buildProgressAfterAssessment(progress, record) {
  if (record.type === 'unit') {
    return {
      ...progress,
      completedUnitAssessments: progress.completedUnitAssessments.includes(record.assessment.id)
        ? progress.completedUnitAssessments
        : [...progress.completedUnitAssessments, record.assessment.id],
    }
  }

  return {
    ...progress,
    completedCourseAssessments: progress.completedCourseAssessments.includes(record.assessment.id)
      ? progress.completedCourseAssessments
      : [...progress.completedCourseAssessments, record.assessment.id],
  }
}

export function PaginaEvaluacion({ mode = 'unit' }) {
  const navigate = useNavigate()
  const { id: courseId, unitId } = useParams()
  const { progress, onboarding } = useEstadoApp()
  const { completeUnitAssessment, completeCourseAssessment } = useAccionesApp()
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

  const record =
    mode === 'unit' ? obtenerRegistroEvaluacionUnidad(courseId, unitId) : obtenerRegistroEvaluacionFinal(courseId)

  const isCompleted = record
    ? record.type === 'unit'
      ? evaluacionUnidadEstaCompletada(progress.completedUnitAssessments, record.assessment.id)
      : evaluacionCursoEstaCompletada(progress.completedCourseAssessments, record.assessment.id)
    : false

  const isUnlocked = record
    ? record.type === 'unit'
      ? evaluacionUnidadEstaDesbloqueada(
          progress.completedLessons,
          progress.completedUnitAssessments,
          progress.completedCourseAssessments,
          courseId,
          unitId,
          onboarding.assessmentResult,
        )
      : evaluacionFinalEstaDesbloqueada(
          progress.completedLessons,
          progress.completedUnitAssessments,
          progress.completedCourseAssessments,
          courseId,
        )
    : false

  const nextStep = useMemo(() => {
    if (!record) {
      return null
    }

    return obtenerSiguientePasoCurso(courseId, {
      ...buildProgressAfterAssessment(progress, record),
      assessmentResult: onboarding.assessmentResult,
    })
  }, [courseId, onboarding.assessmentResult, progress, record])

  if (!record) {
    return (
      <Tarjeta className="text-center">
        <p className="eyebrow">Evaluación no encontrada</p>
        <h1 className="mt-5 font-display text-3xl font-semibold text-foam">
          No pudimos encontrar esta evaluación
        </h1>
      </Tarjeta>
    )
  }

  if (!isUnlocked && !isCompleted) {
    return (
      <Tarjeta className="space-y-5 text-center">
        <p className="eyebrow">Evaluación bloqueada</p>
        <h1 className="font-display text-3xl font-semibold text-foam">
          Aún no puedes presentar esta evaluación
        </h1>
        <p className="text-mute">
          Primero debes completar todas las misiones previas y, si aplica, aprobar la evaluación de la unidad anterior.
        </p>
        <Boton onClick={() => navigate(`/course/${courseId}`)}>Volver al curso</Boton>
      </Tarjeta>
    )
  }

  function handleOptionChange(questionId, optionId) {
    setAnswers((current) => ({
      ...current,
      [questionId]: optionId,
    }))
  }

  function handleSubmit() {
    const score = puntuarEvaluacion(record.assessment, answers)
    setResult(score)

    if (!score.passed) {
      return
    }

    if (record.type === 'unit') {
      completeUnitAssessment(record.assessment.id)
      return
    }

    completeCourseAssessment(record.assessment.id)
  }

  const allAnswered = record.assessment.questions.every((question) => answers[question.id])

  return (
    <div className="space-y-8">
      <Tarjeta accent className="space-y-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="eyebrow">
                {record.type === 'unit' ? 'Evaluación de unidad' : 'Evaluación final'}
              </span>
              <span className="status-chip">
                {record.assessment.questions.length} preguntas
              </span>
              <span className="status-chip">
                Necesitas {record.assessment.passingScore} correctas
              </span>
            </div>
            <h1 className="font-display text-4xl font-semibold text-foam">
              {record.assessment.title}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-mute">{record.assessment.summary}</p>
          </div>

          <Boton variant="ghost" onClick={() => navigate(`/course/${courseId}`)}>
            Volver al curso
          </Boton>
        </div>

        {isCompleted && (
          <div className="rounded-2xl border border-primary/25 bg-primary/10 p-4 text-sm text-mute">
            Esta evaluación ya fue aprobada. Puedes revisarla o continuar con el siguiente paso del curso.
          </div>
        )}
      </Tarjeta>

      <div className="grid gap-5">
        {record.assessment.questions.map((question, index) => {
          const selectedOption = answers[question.id]
          const showFeedback = Boolean(result)

          return (
            <Tarjeta key={question.id} className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-mute">
                  Pregunta {index + 1}
                </p>
                <h2 className="mt-3 text-xl font-semibold text-foam">{question.prompt}</h2>
              </div>

              <div className="grid gap-3">
                {question.options.map((option) => {
                  const isSelected = selectedOption === option.id
                  const isCorrect = option.id === question.correctOptionId
                  const showCorrect = showFeedback && isCorrect
                  const showWrong = showFeedback && isSelected && !isCorrect

                  return (
                    <label
                      key={option.id}
                      className={`cursor-pointer rounded-2xl border px-4 py-4 transition ${
                        showCorrect
                          ? 'border-primary/30 bg-primary/10'
                          : showWrong
                            ? 'border-rose-400/30 bg-rose-500/10'
                            : isSelected
                              ? 'border-primary/30 bg-white/5'
                              : 'border-border/80 bg-panel-2/70 hover:border-primary/25'
                      }`}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={option.id}
                        checked={isSelected}
                        disabled={Boolean(result)}
                        onChange={() => handleOptionChange(question.id, option.id)}
                        className="sr-only"
                      />
                      <span className="text-sm text-foam">{option.label}</span>
                    </label>
                  )
                })}
              </div>

              {result && (
                <div className="rounded-2xl border border-border/70 bg-white/5 p-4 text-sm text-mute">
                  {question.explanation}
                </div>
              )}
            </Tarjeta>
          )
        })}
      </div>

      <Tarjeta className="space-y-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow">Resultado</p>
            <p className="mt-3 text-mute">
              {result
                ? `Obtuviste ${result.correctCount} de ${result.totalQuestions} respuestas correctas.`
                : 'Responde todas las preguntas y luego envía la evaluación.'}
            </p>
          </div>

          {!result && (
            <Boton disabled={!allAnswered} onClick={handleSubmit}>
              Enviar evaluación
            </Boton>
          )}
        </div>

        {result && (
          <div className="space-y-4">
            <div
              className={`rounded-2xl border p-4 text-sm ${
                result.passed
                  ? 'border-primary/25 bg-primary/10 text-mute'
                  : 'border-warning/30 bg-warning/10 text-yellow-100'
              }`}
            >
              {result.passed
                ? record.assessment.successMessage
                : `No alcanzaste el mínimo de ${result.passingScore} respuestas correctas. Puedes volver a intentarlo.`}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {result.passed ? (
                nextStep ? (
                  <Boton onClick={() => navigate(obtenerRutaEvaluacionDesdePaso(nextStep))}>
                    {nextStep.label}
                  </Boton>
                ) : (
                  <Boton onClick={() => navigate(`/course/${courseId}`)}>Volver al curso</Boton>
                )
              ) : (
                <Boton
                  variant="secondary"
                  onClick={() => {
                    setAnswers({})
                    setResult(null)
                  }}
                >
                  Reintentar evaluación
                </Boton>
              )}

              <Boton variant="ghost" onClick={() => navigate(`/course/${courseId}`)}>
                Ver mapa del curso
              </Boton>
            </div>
          </div>
        )}
      </Tarjeta>
    </div>
  )
}

