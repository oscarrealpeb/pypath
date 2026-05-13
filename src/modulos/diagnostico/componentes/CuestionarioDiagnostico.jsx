import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Boton } from '../../../componentes/Boton.jsx'
import { Tarjeta } from '../../../componentes/Tarjeta.jsx'
import { BarraProgreso } from '../../../componentes/BarraProgreso.jsx'
import {
  CANTIDAD_PREGUNTAS_DIAGNOSTICO,
  DURACION_DIAGNOSTICO_MINUTOS,
} from '../../../datos/preguntasDiagnostico.js'
import { evaluarDiagnostico } from '../servicios/servicioDiagnostico.js'

const etiquetasTipo = {
  'multiple-choice': 'Selección múltiple',
  'code-reading': 'Lectura de código',
  'bug-detection': 'Detectar error',
}

function formatearTiempo(segundosRestantes) {
  const minutos = Math.floor(segundosRestantes / 60)
  const segundos = segundosRestantes % 60

  return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`
}

export function CuestionarioDiagnostico({
  intento,
  preguntas,
  onBack,
  onComplete,
  onChangeIndex,
  onSelectAnswer,
}) {
  const [segundosRestantes, setSegundosRestantes] = useState(() =>
    Math.max(
      0,
      Math.floor((new Date(intento.expiresAt).getTime() - Date.now()) / 1000),
    ),
  )
  const envioRef = useRef(false)
  const respuestas = useMemo(() => intento.answers ?? {}, [intento.answers])
  const indiceActual = Math.min(
    Math.max(intento.currentIndex ?? 0, 0),
    Math.max(preguntas.length - 1, 0),
  )
  const pregunta = preguntas[indiceActual]
  const porcentajeRespondido = useMemo(
    () =>
      Math.round(
        (preguntas.filter((item) => respuestas[item.id]).length / preguntas.length) * 100,
      ),
    [preguntas, respuestas],
  )

  const finalizarDiagnostico = useCallback(
    ({ timedOut = false } = {}) => {
      if (envioRef.current) {
        return
      }

      envioRef.current = true
      onComplete(
        evaluarDiagnostico(respuestas, preguntas, {
          timedOut,
        }),
      )
    },
    [onComplete, preguntas, respuestas],
  )

  useEffect(() => {
    const temporizador = window.setInterval(() => {
      const siguienteValor = Math.max(
        0,
        Math.floor((new Date(intento.expiresAt).getTime() - Date.now()) / 1000),
      )

      setSegundosRestantes(siguienteValor)
    }, 1000)

    return () => window.clearInterval(temporizador)
  }, [intento.expiresAt])

  useEffect(() => {
    if (segundosRestantes === 0) {
      finalizarDiagnostico({ timedOut: true })
    }
  }, [finalizarDiagnostico, segundosRestantes])

  function manejarSiguiente() {
    if (indiceActual === preguntas.length - 1) {
      finalizarDiagnostico()
      return
    }

    onChangeIndex(indiceActual + 1)
  }

  function manejarAnterior() {
    onChangeIndex(Math.max(indiceActual - 1, 0))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <p className="eyebrow">Evaluación diagnóstica</p>
          <h2 className="font-display text-3xl font-semibold text-foam">
            Diagnóstico de fundamentos de Python
          </h2>
          <p className="max-w-3xl text-mute">
            Aquí solo verás lógica base de Python: variables, condicionales, ciclos,
            funciones y colecciones. Son {CANTIDAD_PREGUNTAS_DIAGNOSTICO} preguntas y este intento no se repite.
          </p>
          <div className="flex flex-wrap gap-2 text-sm text-mute">
            <span className="status-chip">{preguntas.length} preguntas</span>
            <span className="status-chip">Un solo intento</span>
            <span className="status-chip">{DURACION_DIAGNOSTICO_MINUTOS} minutos</span>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 lg:items-end">
          <div
            className={`rounded-2xl border px-4 py-3 text-sm ${
              segundosRestantes <= 60
                ? 'border-danger/40 bg-danger/10 text-red-100'
                : 'border-border/80 bg-white/5 text-foam'
            }`}
          >
            <p className="text-xs uppercase tracking-[0.24em] text-mute">Tiempo restante</p>
            <p className="mt-2 font-display text-2xl font-semibold">
              {formatearTiempo(segundosRestantes)}
            </p>
          </div>
          <Boton variant="ghost" onClick={onBack}>
            Volver al panel
          </Boton>
        </div>
      </div>

      <Tarjeta className="space-y-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <BarraProgreso
            value={indiceActual + 1}
            total={preguntas.length}
            label="Avance de la evaluación"
          />
          <div className="rounded-2xl border border-border/80 bg-white/5 px-4 py-3 text-sm text-mute">
            Has respondido {porcentajeRespondido}% del diagnóstico.
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="status-chip">Pregunta {indiceActual + 1}</span>
            <span className="status-chip">{etiquetasTipo[pregunta.type]}</span>
            <span className="status-chip">Fundamentos de Python</span>
          </div>

          <h3 className="font-display text-2xl font-semibold text-foam">
            {pregunta.prompt}
          </h3>

          {pregunta.snippet && (
            <pre className="overflow-x-auto rounded-2xl border border-border/80 bg-obsidian/80 p-4 text-sm text-primary-soft">
              <code>{pregunta.snippet}</code>
            </pre>
          )}
        </div>

        <div className="grid gap-3">
          {pregunta.options.map((option) => {
            const seleccionada = respuestas[pregunta.id] === option.id

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onSelectAnswer(pregunta.id, option.id, indiceActual)}
                className={`rounded-2xl border px-4 py-4 text-left transition ${
                  seleccionada
                    ? 'border-primary/40 bg-primary/10 text-foam shadow-glow'
                    : 'border-border/80 bg-panel-2/70 text-mute hover:border-primary/20 hover:text-foam'
                }`}
              >
                {option.label}
              </button>
            )
          })}
        </div>

        <div className="rounded-2xl border border-border/80 bg-white/5 p-4 text-sm text-mute">
          Si sales ahora, el tiempo sigue corriendo. Mientras el intento siga activo,
          podrás volver a esta misma prueba desde tu panel.
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Boton variant="ghost" onClick={manejarAnterior} disabled={indiceActual === 0}>
            Anterior
          </Boton>
          <Boton onClick={manejarSiguiente} disabled={!respuestas[pregunta.id]}>
            {indiceActual === preguntas.length - 1 ? 'Ver resultado' : 'Siguiente'}
          </Boton>
        </div>
      </Tarjeta>
    </div>
  )
}
