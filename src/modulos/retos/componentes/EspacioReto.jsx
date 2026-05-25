import { lazy, Suspense, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Boton } from '../../../componentes/Boton.jsx'
import { Modal } from '../../../componentes/Modal.jsx'
import { Tarjeta } from '../../../componentes/Tarjeta.jsx'
import { obtenerEjerciciosLeccion } from '../../cursos/selectores/selectoresCursos.js'
import { obtenerRutaEvaluacionDesdePaso } from '../../evaluaciones/selectores/selectoresEvaluaciones.js'
import {
  ejercicioEstaCompletado,
  ejercicioTieneSolucionRevelada,
  obtenerEstadoEjerciciosLeccion,
} from '../../progreso/selectores/selectoresProgreso.js'
import { useAccionesApp, useEstadoApp } from '../../progreso/contexto/useEstadoApp.js'
import { ejecutarSimulacionReto } from '../servicios/servicioEjecucionPython.js'
import { ejecutarRetoPython } from '../servicios/servicioRuntimePython.js'
import { validarReto } from '../servicios/servicioValidacionReto.js'

const LazyCodeEditor = lazy(() =>
  import('../../../componentes/EditorCodigo.jsx').then((module) => ({
    default: module.EditorCodigo,
  })),
)

function getConsoleTone(status) {
  if (status === 'success') {
    return 'border-primary/30 bg-primary/10'
  }

  if (status === 'warning') {
    return 'border-warning/30 bg-warning/10'
  }

  if (status === 'error') {
    return 'border-rose-400/30 bg-rose-500/10'
  }

  if (status === 'loading') {
    return 'border-primary/20 bg-primary/5'
  }

  return 'border-border/80 bg-white/5'
}

function getRuntimeMeta(challenge) {
  const usesRealPython = challenge.runtimeMode === 'python'

  if (usesRealPython) {
    return {
      usesRealPython,
      eyebrow: 'Python real en navegador',
      description:
        'Esta mision si se ejecuta de verdad. Veras la salida real de tu codigo antes de validar.',
      outputLabel: 'Salida real',
      idleCopy: 'Pulsa Ejecutar para correr tu solucion y ver la consola real de Python.',
      loadingTitle: 'Preparando Python',
      loadingOutput: 'Cargando el runtime y ejecutando tu solucion...',
      loadingDetails:
        'La primera ejecucion puede tardar unos segundos porque el navegador descarga Python.',
    }
  }

  return {
    usesRealPython,
    eyebrow: 'Revision guiada',
    description:
      'Esta mision depende de una biblioteca visual. Aqui revisamos la estructura clave del codigo y te mostramos el comportamiento esperado.',
    outputLabel: 'Vista previa guiada',
    idleCopy: 'Pulsa Ejecutar para ver una vista previa del comportamiento esperado.',
    loadingTitle: 'Revisando estructura',
    loadingOutput: 'Analizando tu solucion...',
    loadingDetails: 'Comprobamos si ya estan las piezas importantes de la mision.',
  }
}

function buildLoadingState(runtimeMeta) {
  return {
    status: 'loading',
    title: runtimeMeta.loadingTitle,
    output: runtimeMeta.loadingOutput,
    details: runtimeMeta.loadingDetails,
  }
}

function contarLineas(texto = '') {
  return texto.split('\n').length
}

function obtenerAlturaEditor(challenge, solutionCode) {
  if (challenge.editorHeight) {
    return {
      codeMirrorHeight: challenge.editorHeight,
      fallbackClass:
        challenge.editorHeight === '250px'
          ? 'h-[250px]'
          : challenge.editorHeight === '310px'
            ? 'h-[310px]'
            : challenge.editorHeight === '370px'
              ? 'h-[370px]'
              : 'h-[430px]',
    }
  }

  const lineasBase = Math.max(
    contarLineas(challenge.starterCode),
    contarLineas(solutionCode),
  )

  if (lineasBase <= 6) {
    return { codeMirrorHeight: '250px', fallbackClass: 'h-[250px]' }
  }

  if (lineasBase <= 10) {
    return { codeMirrorHeight: '310px', fallbackClass: 'h-[310px]' }
  }

  if (lineasBase <= 16) {
    return { codeMirrorHeight: '370px', fallbackClass: 'h-[370px]' }
  }

  return { codeMirrorHeight: '430px', fallbackClass: 'h-[430px]' }
}

function encontrarPrimerEjercicioPendiente(challenges, progress, lesson) {
  const pendingIndex = challenges.findIndex((challenge) => {
    const completed = ejercicioEstaCompletado(progress, lesson, challenge.id)
    const revealed = ejercicioTieneSolucionRevelada(progress, challenge.id)
    return !completed && !revealed
  })

  return pendingIndex >= 0 ? pendingIndex : 0
}

function construirMensajeEjercicioCompletado({
  xp,
  isOptional,
  allRequiredResolvedAfterAction,
}) {
  if (isOptional) {
    return `Ejercicio opcional completado. Sumaste ${xp} XP extra a tu perfil.`
  }

  if (allRequiredResolvedAfterAction) {
    return `Ejercicio completado. La leccion quedo superada y sumaste ${xp} XP.`
  }

  return `Ejercicio completado. Sumaste ${xp} XP y ya puedes seguir con el siguiente paso.`
}

function construirMensajeEjercicioRevelado({
  penaltyXp,
  isOptional,
  allRequiredResolvedAfterAction,
}) {
  if (isOptional) {
    return `Mostramos la solucion y este ejercicio opcional quedo resuelto. Se descontaron ${penaltyXp} XP de tu perfil.`
  }

  if (allRequiredResolvedAfterAction) {
    return `Mostramos la solucion y este ejercicio quedo resuelto. Se descontaron ${penaltyXp} XP de tu perfil y la leccion ya cuenta como superada.`
  }

  return `Mostramos la solucion y este ejercicio ya cuenta como resuelto. Se descontaron ${penaltyXp} XP de tu perfil.`
}

function estaLeccionResueltaTrasAccion(exerciseState, exerciseId) {
  return exerciseState.requiredExerciseIds.every(
    (id) =>
      id === exerciseId ||
      exerciseState.completedExercisesSet.has(id) ||
      exerciseState.revealedExercisesSet.has(id),
  )
}

function construirFeedbackInicial({
  challenge,
  currentExerciseCompleted,
  currentExerciseOptional,
  currentExerciseRevealed,
  exerciseState,
}) {
  if (currentExerciseRevealed) {
    return {
      status: 'resolved',
      message: construirMensajeEjercicioRevelado({
        penaltyXp: challenge.solutionPenaltyXp ?? 0,
        isOptional: currentExerciseOptional,
        allRequiredResolvedAfterAction: exerciseState.allRequiredResolved,
      }),
      missingKeywords: [],
    }
  }

  if (currentExerciseCompleted) {
    return {
      status: 'success',
      message: construirMensajeEjercicioCompletado({
        xp: challenge.xp ?? 0,
        isOptional: currentExerciseOptional,
        allRequiredResolvedAfterAction: exerciseState.allRequiredResolved,
      }),
      missingKeywords: [],
    }
  }

  return null
}

function ExerciseWorkspace({
  challenge,
  challengeIndex,
  challengesCount,
  completionStep,
  courseId,
  currentExerciseCompleted,
  currentExerciseOptional,
  currentExerciseRevealed,
  exerciseState,
  isLastChallenge,
  lesson,
  navigate,
  onAdvanceExercise,
  onCompleteExercise,
  onRevealExerciseSolution,
}) {
  const runtimeMeta = getRuntimeMeta(challenge)
  const solutionCode = challenge.solutionCode ?? lesson.resources.exampleCode ?? challenge.starterCode
  const solutionNote =
    challenge.solutionNote ??
    'Comparala con tu intento para entender que pieza faltaba o que detalle debia cambiar.'
  const editorHeight = obtenerAlturaEditor(challenge, solutionCode)
  const currentExerciseResolved = currentExerciseCompleted || currentExerciseRevealed
  const [code, setCode] = useState(challenge.starterCode ?? '')
  const [feedback, setFeedback] = useState(() =>
    construirFeedbackInicial({
      challenge,
      currentExerciseCompleted,
      currentExerciseOptional,
      currentExerciseRevealed,
      exerciseState,
    }),
  )
  const [executionResult, setExecutionResult] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const [showSolution, setShowSolution] = useState(currentExerciseRevealed)
  const [showRevealDialog, setShowRevealDialog] = useState(false)

  async function executeCurrentCode() {
    if (runtimeMeta.usesRealPython) {
      return ejecutarRetoPython(code)
    }

    return ejecutarSimulacionReto(code, { ...lesson, challenge })
  }

  async function handleRun() {
    setIsRunning(true)
    setExecutionResult(buildLoadingState(runtimeMeta))

    try {
      const result = await executeCurrentCode()
      setExecutionResult(result)
      return result
    } finally {
      setIsRunning(false)
    }
  }

  async function handleValidate() {
    if (currentExerciseResolved) {
      return
    }

    setIsRunning(true)
    setExecutionResult(buildLoadingState(runtimeMeta))

    try {
      const latestExecution = await executeCurrentCode()
      setExecutionResult(latestExecution)

      const result = validarReto(code, { ...lesson, challenge }, latestExecution)
      setFeedback(result)

      if (result.status === 'success') {
        const allRequiredResolvedAfterAction = estaLeccionResueltaTrasAccion(exerciseState, challenge.id)

        onCompleteExercise(challenge.id)
        setShowSolution(false)
        setFeedback({
          ...result,
          message: construirMensajeEjercicioCompletado({
            xp: challenge.xp ?? 0,
            isOptional: currentExerciseOptional,
            allRequiredResolvedAfterAction,
          }),
        })
      }
    } finally {
      setIsRunning(false)
    }
  }

  function handleConfirmRevealSolution() {
    const allRequiredResolvedAfterAction = estaLeccionResueltaTrasAccion(exerciseState, challenge.id)

    onRevealExerciseSolution(challenge.id)
    setShowRevealDialog(false)
    setShowSolution(true)
    setFeedback({
      status: 'resolved',
      message: construirMensajeEjercicioRevelado({
        penaltyXp: challenge.solutionPenaltyXp ?? 0,
        isOptional: currentExerciseOptional,
        allRequiredResolvedAfterAction,
      }),
      missingKeywords: [],
    })
  }

  const isResolved =
    currentExerciseResolved || feedback?.status === 'success' || feedback?.status === 'resolved'

  return (
    <div className="space-y-5">
      <Modal open={showRevealDialog} onClose={() => setShowRevealDialog(false)} size="md">
        <div className="space-y-5 p-7 sm:p-8">
          <div className="space-y-3">
            <p className="eyebrow">Confirmar penalizacion</p>
            <h2 className="font-display text-3xl font-semibold text-foam">
              Revelar la solucion de este ejercicio?
            </h2>
            <p className="text-mute">
              Si continuas, este ejercicio quedara resuelto automaticamente y se descontaran{' '}
              <span className="font-semibold text-foam">{challenge.solutionPenaltyXp ?? 0} XP</span>{' '}
              de tu perfil.
            </p>
          </div>

          <div className="rounded-2xl border border-warning/30 bg-warning/10 p-4 text-sm text-mute">
            Esta penalizacion solo se aplica una vez por ejercicio. Si aceptas, podras seguir con
            la leccion, pero ese XP ya no se recupera automaticamente.
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Boton variant="ghost" onClick={() => setShowRevealDialog(false)}>
              Seguir intentandolo
            </Boton>
            <Boton variant="secondary" onClick={handleConfirmRevealSolution}>
              Revelar y perder XP
            </Boton>
          </div>
        </div>
      </Modal>

      <Tarjeta className="space-y-5">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow">
              Reto practico {challengesCount > 1 ? `(${challengeIndex + 1}/${challengesCount})` : ''}
            </span>
            <span className="status-chip">{challenge.exerciseType}</span>
            <span className="status-chip">{runtimeMeta.eyebrow}</span>
            <span className="status-chip">{challenge.xp} XP</span>
            {currentExerciseOptional ? <span className="status-chip">XP opcional</span> : null}
          </div>
          <h2 className="font-display text-3xl font-semibold text-foam">{challenge.title}</h2>
          <p className="max-w-3xl text-mute">{challenge.prompt}</p>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-2xl border border-border/80 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-mute">Que debe hacer tu solucion</p>
            <p className="mt-3 text-sm leading-7 text-mute">{challenge.successCriteria}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {(challenge.expectedKeywords ?? []).map((keyword) => (
                <span key={keyword} className="status-chip">
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border/80 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-mute">Que se espera ver</p>
            <div className="mt-3 rounded-2xl border border-border/70 bg-obsidian/80 p-4 font-mono text-sm text-foam">
              <pre className="whitespace-pre-wrap">{challenge.expectedResult}</pre>
            </div>
            <p className="mt-3 text-sm leading-7 text-mute">{runtimeMeta.description}</p>
          </div>
        </div>
      </Tarjeta>

      <Tarjeta className="space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow">Editor del reto</span>
          <span className="status-chip">{runtimeMeta.outputLabel}</span>
        </div>

        <Suspense
          fallback={
            <div className="overflow-hidden rounded-2xl border border-border bg-panel-2/70">
              <div
                className={`flex items-center justify-center text-sm text-mute ${editorHeight.fallbackClass}`}
              >
                Cargando editor...
              </div>
            </div>
          }
        >
          <LazyCodeEditor
            value={code}
            onChange={(nextCode) => {
              setCode(nextCode)
              if (!currentExerciseRevealed) {
                setShowSolution(false)
              }
            }}
            height={editorHeight.codeMirrorHeight}
          />
        </Suspense>

        <div className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-white/5 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <p className="text-sm text-mute">
              Ejecuta cuando quieras revisar la salida actual y valida cuando creas que ya cumple
              el objetivo de este ejercicio.
            </p>
          </div>

          <div className="flex gap-3">
            <Boton variant="secondary" onClick={handleRun} disabled={isRunning}>
              {isRunning ? 'Ejecutando...' : 'Ejecutar'}
            </Boton>
            <Boton onClick={handleValidate} disabled={isRunning || currentExerciseResolved}>
              {isRunning ? 'Validando...' : currentExerciseResolved ? 'Resuelto' : 'Validar'}
            </Boton>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <div className="rounded-2xl border border-border/80 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-mute">Resultado esperado</p>
            <div className="mt-3 rounded-2xl border border-border/70 bg-obsidian/80 p-4 font-mono text-sm text-foam">
              <pre className="whitespace-pre-wrap">{challenge.expectedResult}</pre>
            </div>
          </div>

          <div className={`rounded-2xl border p-4 ${getConsoleTone(executionResult?.status)}`}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs uppercase tracking-[0.22em] text-mute">
                {runtimeMeta.outputLabel}
              </span>
              {executionResult ? <span className="status-chip">{executionResult.title}</span> : null}
            </div>

            <div className="mt-3 rounded-2xl border border-border/70 bg-obsidian/80 p-4 font-mono text-sm text-foam">
              <pre className="whitespace-pre-wrap">
                {executionResult?.output ?? 'Sin ejecucion aun.'}
              </pre>
            </div>

            <p className="mt-3 text-sm text-mute">{executionResult?.details ?? runtimeMeta.idleCopy}</p>
          </div>
        </div>
      </Tarjeta>

      <Tarjeta
        className={`space-y-4 ${
          isResolved ? 'border-primary/30 bg-primary/10' : 'border-border/80'
        }`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="eyebrow">{isResolved ? 'Ejercicio resuelto' : 'Feedback'}</span>
          {feedback ? (
            <span className={`status-chip ${isResolved ? 'text-primary' : 'text-warning'}`}>
              {isResolved ? 'Listo para continuar' : 'Aun falta'}
            </span>
          ) : null}
        </div>

        <p className="text-mute">
          {feedback?.message ?? 'Ejecuta la validacion para revisar si tu solucion cumple este ejercicio.'}
        </p>

        {(feedback && !currentExerciseResolved && solutionCode) || currentExerciseRevealed ? (
          <div className="space-y-4 rounded-2xl border border-border/70 bg-white/5 p-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              {currentExerciseRevealed ? (
                <Boton
                  type="button"
                  variant={showSolution ? 'secondary' : 'primary'}
                  onClick={() => setShowSolution((current) => !current)}
                >
                  {showSolution ? 'Ocultar solucion' : 'Ver solucion completa'}
                </Boton>
              ) : (
                <>
                  <Boton
                    type="button"
                    variant={showSolution ? 'secondary' : 'primary'}
                    onClick={() => setShowRevealDialog(true)}
                  >
                    Revelar solucion y perder {challenge.solutionPenaltyXp ?? 0} XP
                  </Boton>
                  <Boton type="button" variant="ghost" onClick={() => setShowSolution(false)}>
                    Seguir intentandolo
                  </Boton>
                </>
              )}
            </div>

            {showSolution ? (
              <div className="space-y-3">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.22em] text-mute">Explicacion breve</p>
                  <p className="text-sm text-mute">{solutionNote}</p>
                </div>
                <div className="overflow-hidden rounded-2xl border border-border/80 bg-obsidian/90 p-4">
                  <pre className="whitespace-pre-wrap font-mono text-sm text-foam">
                    {solutionCode}
                  </pre>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        {feedback?.missingKeywords?.length > 0 && !isResolved ? (
          <div className="rounded-2xl border border-warning/30 bg-warning/10 p-4 text-sm text-yellow-100">
            El validador todavia espera estas pistas: {feedback.missingKeywords.join(', ')}.
          </div>
        ) : null}

        {isResolved ? (
          <div className="flex flex-col gap-3 sm:flex-row">
            {!isLastChallenge ? (
              <Boton onClick={onAdvanceExercise}>Siguiente ejercicio</Boton>
            ) : (
              <>
                {completionStep ? (
                  <Boton onClick={() => navigate(obtenerRutaEvaluacionDesdePaso(completionStep))}>
                    {completionStep.label}
                  </Boton>
                ) : (
                  <Boton onClick={() => navigate(`/course/${courseId}`)}>Volver al curso</Boton>
                )}
                <Boton variant="secondary" onClick={() => navigate(`/course/${courseId}`)}>
                  Ver mapa del curso
                </Boton>
              </>
            )}
          </div>
        ) : null}
      </Tarjeta>
    </div>
  )
}

export function EspacioReto({ lesson, completionStep, courseId }) {
  const navigate = useNavigate()
  const { progress } = useEstadoApp()
  const { completeExercise, revealExerciseSolution } = useAccionesApp()
  const challenges = obtenerEjerciciosLeccion(lesson)
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(() =>
    encontrarPrimerEjercicioPendiente(challenges, progress, lesson),
  )
  const currentChallenge = challenges[currentChallengeIndex] ?? challenges[0]
  const exerciseState = obtenerEstadoEjerciciosLeccion(progress, lesson)

  if (!currentChallenge) {
    return (
      <Tarjeta className="space-y-4">
        <p className="eyebrow">Sin reto configurado</p>
        <p className="text-mute">
          Esta leccion todavia no tiene ejercicios listos para resolver.
        </p>
      </Tarjeta>
    )
  }

  const currentExerciseCompleted = ejercicioEstaCompletado(progress, lesson, currentChallenge.id)
  const currentExerciseRevealed = ejercicioTieneSolucionRevelada(progress, currentChallenge.id)
  const currentExerciseOptional = exerciseState.optionalExerciseIds.includes(currentChallenge.id)
  const isLastChallenge = currentChallengeIndex === challenges.length - 1

  return (
    <ExerciseWorkspace
      key={currentChallenge.id}
      challenge={currentChallenge}
      challengeIndex={currentChallengeIndex}
      challengesCount={challenges.length}
      completionStep={completionStep}
      courseId={courseId}
      currentExerciseCompleted={currentExerciseCompleted}
      currentExerciseOptional={currentExerciseOptional}
      currentExerciseRevealed={currentExerciseRevealed}
      exerciseState={exerciseState}
      isLastChallenge={isLastChallenge}
      lesson={lesson}
      navigate={navigate}
      onAdvanceExercise={() =>
        setCurrentChallengeIndex((current) => Math.min(challenges.length - 1, current + 1))
      }
      onCompleteExercise={(exerciseId) =>
        completeExercise(lesson.id, exerciseId, exerciseState.requiredExerciseIds)
      }
      onRevealExerciseSolution={(exerciseId) =>
        revealExerciseSolution(
          lesson.id,
          exerciseId,
          exerciseState.requiredExerciseIds,
          currentChallenge.solutionPenaltyXp ?? 0,
        )
      }
    />
  )
}
