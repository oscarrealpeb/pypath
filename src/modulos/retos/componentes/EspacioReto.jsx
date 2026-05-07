import { lazy, Suspense, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Boton } from '../../../componentes/Boton.jsx'
import { Tarjeta } from '../../../componentes/Tarjeta.jsx'
import { obtenerRutaEvaluacionDesdePaso } from '../../evaluaciones/selectores/selectoresEvaluaciones.js'
import { useAccionesApp } from '../../progreso/contexto/useEstadoApp.js'
import { validarReto } from '../servicios/servicioValidacionReto.js'
import { ejecutarSimulacionReto } from '../servicios/servicioEjecucionPython.js'
import { ejecutarRetoPython } from '../servicios/servicioRuntimePython.js'

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

function getRuntimeMeta(lesson) {
  const usesRealPython = lesson.challenge.runtimeMode === 'python'

  if (usesRealPython) {
    return {
      usesRealPython,
      eyebrow: 'Python real en navegador',
      description:
        'Esta misión sí se ejecuta de verdad. Verás la salida real de tu código antes de validar.',
      outputLabel: 'Salida real',
      idleCopy: 'Pulsa Ejecutar para correr tu solución y ver la consola real de Python.',
      loadingTitle: 'Preparando Python',
      loadingOutput: 'Cargando el runtime y ejecutando tu solución...',
      loadingDetails:
        'La primera ejecución puede tardar unos segundos porque el navegador descarga Python.',
    }
  }

  return {
    usesRealPython,
    eyebrow: 'Revisión guiada',
    description:
      'Esta misión depende de una biblioteca visual. Aquí revisamos la estructura clave del código y te mostramos el comportamiento esperado.',
    outputLabel: 'Vista previa guiada',
    idleCopy: 'Pulsa Ejecutar para ver una vista previa del comportamiento esperado.',
    loadingTitle: 'Revisando estructura',
    loadingOutput: 'Analizando tu solución...',
    loadingDetails: 'Comprobamos si ya están las piezas importantes de la misión.',
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

function obtenerAlturaEditor(lesson, solutionCode) {
  if (lesson.challenge.editorHeight) {
    return {
      codeMirrorHeight: lesson.challenge.editorHeight,
      fallbackClass:
        lesson.challenge.editorHeight === '250px'
          ? 'h-[250px]'
          : lesson.challenge.editorHeight === '310px'
            ? 'h-[310px]'
            : lesson.challenge.editorHeight === '370px'
              ? 'h-[370px]'
              : 'h-[430px]',
    }
  }

  const lineasBase = Math.max(
    contarLineas(lesson.challenge.starterCode),
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

export function EspacioReto({ lesson, completionStep, courseId, isCompleted }) {
  const navigate = useNavigate()
  const { completeLesson } = useAccionesApp()
  const runtimeMeta = getRuntimeMeta(lesson)
  const solutionCode =
    lesson.challenge.solutionCode ?? lesson.resources.exampleCode ?? lesson.challenge.starterCode
  const solutionNote =
    lesson.challenge.solutionNote ??
    'Compárala con tu intento para entender qué pieza faltaba o qué detalle debía cambiar.'
  const editorHeight = obtenerAlturaEditor(lesson, solutionCode)
  const [code, setCode] = useState(lesson.challenge.starterCode)
  const [feedback, setFeedback] = useState(
    isCompleted
      ? {
          status: 'success',
          message: 'Esta misión ya está completada. Puedes repasar el código o seguir avanzando.',
          missingKeywords: [],
        }
      : null,
  )
  const [executionResult, setExecutionResult] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const [showSolution, setShowSolution] = useState(false)

  function handleCodeChange(nextCode) {
    setCode(nextCode)
    setShowSolution(false)
  }

  async function executeCurrentCode() {
    if (runtimeMeta.usesRealPython) {
      return ejecutarRetoPython(code)
    }

    return ejecutarSimulacionReto(code, lesson)
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
    setIsRunning(true)
    setExecutionResult(buildLoadingState(runtimeMeta))

    try {
      const latestExecution = await executeCurrentCode()
      setExecutionResult(latestExecution)

      const result = validarReto(code, lesson, latestExecution)
      setFeedback(result)

      if (result.status === 'success') {
        setShowSolution(false)
        completeLesson(lesson.id)
      }
    } finally {
      setIsRunning(false)
    }
  }

  const isSuccess = feedback?.status === 'success'

  return (
    <div className="space-y-5">
      <Tarjeta className="space-y-5">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow">Reto práctico</span>
            <span className="status-chip">{lesson.challenge.exerciseType}</span>
            <span className="status-chip">{runtimeMeta.eyebrow}</span>
          </div>
          <h2 className="font-display text-3xl font-semibold text-foam">
            {lesson.challenge.title}
          </h2>
          <p className="max-w-3xl text-mute">{lesson.challenge.prompt}</p>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-2xl border border-border/80 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-mute">Qué debe hacer tu solución</p>
            <p className="mt-3 text-sm leading-7 text-mute">{lesson.challenge.successCriteria}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {lesson.challenge.expectedKeywords.map((keyword) => (
                <span key={keyword} className="status-chip">
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border/80 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-mute">Qué se espera ver</p>
            <div className="mt-3 rounded-2xl border border-border/70 bg-obsidian/80 p-4 font-mono text-sm text-foam">
              <pre className="whitespace-pre-wrap">{lesson.challenge.expectedResult}</pre>
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
              <div className={`flex items-center justify-center text-sm text-mute ${editorHeight.fallbackClass}`}>
                Cargando editor...
              </div>
            </div>
          }
        >
          <LazyCodeEditor
            value={code}
            onChange={handleCodeChange}
            height={editorHeight.codeMirrorHeight}
          />
        </Suspense>

        <div className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-white/5 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <p className="text-sm text-mute">
              Ejecuta cuando quieras revisar la salida actual y valida cuando creas que ya cumple
              el objetivo de la misión.
            </p>
          </div>

          <div className="flex gap-3">
            <Boton variant="secondary" onClick={handleRun} disabled={isRunning}>
              {isRunning ? 'Ejecutando...' : 'Ejecutar'}
            </Boton>
            <Boton onClick={handleValidate} disabled={isRunning}>
              {isRunning ? 'Validando...' : 'Validar'}
            </Boton>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <div className="rounded-2xl border border-border/80 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-mute">Resultado esperado</p>
            <div className="mt-3 rounded-2xl border border-border/70 bg-obsidian/80 p-4 font-mono text-sm text-foam">
              <pre className="whitespace-pre-wrap">{lesson.challenge.expectedResult}</pre>
            </div>
          </div>

          <div className={`rounded-2xl border p-4 ${getConsoleTone(executionResult?.status)}`}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs uppercase tracking-[0.22em] text-mute">
                {runtimeMeta.outputLabel}
              </span>
              {executionResult && <span className="status-chip">{executionResult.title}</span>}
            </div>

            <div className="mt-3 rounded-2xl border border-border/70 bg-obsidian/80 p-4 font-mono text-sm text-foam">
              <pre className="whitespace-pre-wrap">
                {executionResult?.output ?? 'Sin ejecución aún.'}
              </pre>
            </div>

            <p className="mt-3 text-sm text-mute">
              {executionResult?.details ?? runtimeMeta.idleCopy}
            </p>
          </div>
        </div>
      </Tarjeta>

      <Tarjeta
        className={`space-y-4 ${
          isSuccess ? 'border-primary/30 bg-primary/10' : 'border-border/80'
        }`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="eyebrow">{isSuccess ? 'Correcto' : 'Feedback'}</span>
          {feedback && (
            <span className={`status-chip ${isSuccess ? 'text-primary' : 'text-warning'}`}>
              {isSuccess ? 'Misión superada' : 'Aún falta'}
            </span>
          )}
        </div>

        <p className="text-mute">
          {feedback?.message ?? 'Ejecuta la validación para revisar si tu solución cumple la misión.'}
        </p>

        {feedback && !isSuccess && solutionCode && (
          <div className="space-y-4 rounded-2xl border border-border/70 bg-white/5 p-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Boton
                type="button"
                variant={showSolution ? 'secondary' : 'primary'}
                onClick={() => setShowSolution((current) => !current)}
              >
                {showSolution ? 'Ocultar solución' : 'Ver solución completa'}
              </Boton>
              <Boton type="button" variant="ghost" onClick={() => setShowSolution(false)}>
                Seguir intentándolo
              </Boton>
            </div>

            {showSolution && (
              <div className="space-y-3">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.22em] text-mute">Explicación breve</p>
                  <p className="text-sm text-mute">{solutionNote}</p>
                </div>
                <div className="overflow-hidden rounded-2xl border border-border/80 bg-obsidian/90 p-4">
                  <pre className="whitespace-pre-wrap font-mono text-sm text-foam">
                    {solutionCode}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}

        {feedback?.missingKeywords?.length > 0 && (
          <div className="rounded-2xl border border-warning/30 bg-warning/10 p-4 text-sm text-yellow-100">
            El validador todavía espera estas pistas: {feedback.missingKeywords.join(', ')}.
          </div>
        )}

        {isSuccess && (
          <div className="flex flex-col gap-3 sm:flex-row">
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
          </div>
        )}
      </Tarjeta>
    </div>
  )
}
