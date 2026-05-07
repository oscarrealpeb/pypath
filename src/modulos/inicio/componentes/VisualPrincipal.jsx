function StepBadge({ value, tone = 'primary' }) {
  const toneClasses =
    tone === 'teal'
      ? 'border-teal/30 bg-teal/10 text-teal'
      : tone === 'foam'
        ? 'border-white/10 bg-white/5 text-foam'
        : 'border-primary/30 bg-primary/10 text-primary'

  return (
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-2xl border font-mono text-sm font-semibold shadow-glow ${toneClasses}`}
    >
      {value}
    </div>
  )
}

function FlowStep({ step, title, description, tone }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-white/5 p-4 text-left">
      <div className="flex items-start gap-4">
        <StepBadge value={step} tone={tone} />
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg font-semibold leading-tight text-foam">{title}</p>
          <p className="mt-2 text-sm leading-6 text-mute">{description}</p>
        </div>
      </div>
    </div>
  )
}

function SupportCard({ title, description }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-white/5 p-4 text-left">
      <p className="text-xs uppercase tracking-[0.22em] text-mute">{title}</p>
      <p className="mt-3 text-sm leading-7 text-foam">{description}</p>
    </div>
  )
}

export function VisualPrincipal() {
  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] border border-border/80 bg-panel/70 p-5 shadow-card backdrop-blur lg:p-6">
      <div className="absolute -left-12 top-6 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -right-10 bottom-0 h-32 w-32 rounded-full bg-teal/10 blur-3xl" />

      <div className="relative grid gap-4 xl:grid-cols-[1.12fr_.88fr]">
        <div className="rounded-[1.5rem] border border-border/80 bg-obsidian/80 p-5">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              <span className="h-2.5 w-2.5 rounded-full bg-teal" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
            </div>
            <span className="status-chip">Así funciona</span>
          </div>

          <div className="space-y-2 text-left">
            <h3 className="font-display text-2xl font-semibold text-foam">
              Un recorrido claro desde el primer minuto
            </h3>
            <p className="max-w-2xl text-sm leading-7 text-mute">
              PyPath te ayuda a arrancar sin perderte: primero eliges tu punto de
              entrada, luego sigues un orden recomendado y al final practicas con retos que
              van desbloqueando lo que sigue.
            </p>
          </div>

          <div className="mt-5 grid gap-3">
            <FlowStep
              step="01"
              title="Elige cómo empezar"
              description="Puedes entrar directo al panel o tomar un diagnóstico corto para recibir una recomendación inicial."
            />
            <FlowStep
              step="02"
              title="Sigue un orden recomendado"
              description="Empiezas por Fundamentos y luego avanzas a cursos como PySide6, Pygame o los que se vayan sumando al catálogo."
              tone="foam"
            />
            <FlowStep
              step="03"
              title="Practica y desbloquea"
              description="Cada lección mezcla explicación, ejemplo y reto para que avances viendo con claridad qué ya completaste."
              tone="teal"
            />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/70 bg-white/5 p-4 text-left">
              <p className="text-xs uppercase tracking-[0.22em] text-mute">Rutas</p>
              <p className="mt-2 font-display text-xl font-semibold text-foam">5</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-white/5 p-4 text-left">
              <p className="text-xs uppercase tracking-[0.22em] text-mute">Activas</p>
              <p className="mt-2 font-display text-xl font-semibold text-foam">3</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-white/5 p-4 text-left">
              <p className="text-xs uppercase tracking-[0.22em] text-mute">Enfoque</p>
              <p className="mt-2 font-display text-xl font-semibold text-foam">Práctico</p>
            </div>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-border/80 bg-obsidian/70 p-5">
          <div className="space-y-2 text-left">
            <p className="text-xs uppercase tracking-[0.22em] text-mute">
              Qué encuentras en cada curso
            </p>
            <h3 className="font-display text-2xl font-semibold text-foam">
              Menos teoría suelta, más contexto y práctica
            </h3>
          </div>

          <div className="mt-5 grid gap-4">
            <SupportCard
              title="Explicación guiada"
              description="Cada unidad te dice qué vas a aprender, por qué importa y con qué idea conviene entrar al reto."
            />
            <SupportCard
              title="Ejemplo antes del reto"
              description="No llegas en frío al editor: primero ves un ejemplo corto, documentación de apoyo y la estructura que vas a usar."
            />
            <SupportCard
              title="Feedback y progreso"
              description="Validas, recibes feedback inmediato y desbloqueas el siguiente paso sin perder de vista tu avance."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

