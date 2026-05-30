import { startTransition, useEffect, useMemo, useState } from 'react'
import { Boton } from '../../../componentes/Boton.jsx'
import { Tarjeta } from '../../../componentes/Tarjeta.jsx'
import {
  actualizarEvaluacionUnidadEnContenido,
  actualizarUnidadEnContenido,
  construirBorradorCurso,
  construirBorradorEvaluacion,
  construirBorradorLeccionFlexible as construirBorradorLeccion,
  materializarCursoCmsEnContenido,
  permiteRuntimePython,
} from '../servicios/servicioAdminContenido.js'
import { useAccionesApp, useEstadoApp } from '../../progreso/contexto/useEstadoApp.js'

function findCourse(content, courseId) {
  return content.cursos.find((course) => course.id === courseId) ?? null
}

function findCourseMeta(content, courseId) {
  return content.catalogoCursos.find((course) => course.id === courseId) ?? null
}

function findDraftCourse(content, courseId) {
  return content.cursosBorrador?.[courseId] ?? null
}

function findUnit(content, courseId, unitId) {
  return findCourse(content, courseId)?.units.find((unit) => unit.id === unitId) ?? null
}

function findLesson(content, courseId, unitId, lessonId) {
  return (
    findUnit(content, courseId, unitId)?.lessons.find((lesson) => lesson.id === lessonId) ?? null
  )
}

function HelpTip({ title, children, align = 'left' }) {
  const bubblePosition =
    align === 'right'
      ? 'right-0 origin-top-right'
      : 'left-0 origin-top-left'

  return (
    <span className="group relative inline-flex items-center">
      <span
        tabIndex={0}
        className="inline-flex h-5 w-5 cursor-help items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-[11px] font-bold uppercase text-primary outline-none transition group-hover:border-primary/50 group-hover:bg-primary/15 group-focus-within:border-primary/50 group-focus-within:bg-primary/15"
        aria-label={title}
      >
        i
      </span>
      <span
        className={`pointer-events-none absolute top-[calc(100%+0.65rem)] z-20 hidden w-72 rounded-2xl border border-border/80 bg-panel px-4 py-3 text-xs leading-6 text-mute shadow-2xl group-hover:block group-focus-within:block ${bubblePosition}`}
        role="tooltip"
      >
        <strong className="block text-sm font-semibold text-foam">{title}</strong>
        <span className="mt-2 block">{children}</span>
      </span>
    </span>
  )
}

function FieldLabel({ label, help, align = 'left' }) {
  return (
    <span className="flex items-center gap-2 text-sm font-medium text-foam">
      <span>{label}</span>
      {help ? (
        <HelpTip title={help.title} align={align}>
          {help.body}
        </HelpTip>
      ) : null}
    </span>
  )
}

function InputField({ label, value, onChange, className = '', help, helpAlign, ...props }) {
  return (
    <label className={`block space-y-2 ${className}`}>
      <FieldLabel label={label} help={help} align={helpAlign} />
      <input className="field-input" value={value} onChange={onChange} {...props} />
    </label>
  )
}

function TextareaField({
  label,
  value,
  onChange,
  className = '',
  textareaClassName = '',
  hint,
  help,
  helpAlign,
  ...props
}) {
  return (
    <label className={`block space-y-2 ${className}`}>
      <FieldLabel label={label} help={help} align={helpAlign} />
      <textarea
        className={`field-input ${textareaClassName}`.trim()}
        value={value}
        onChange={onChange}
        {...props}
      />
      {hint ? <p className="text-xs leading-6 text-mute">{hint}</p> : null}
    </label>
  )
}

function formatearHoraSincronizacion(timestamp) {
  if (!timestamp) {
    return ''
  }

  return new Intl.DateTimeFormat('es-CO', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(timestamp))
}

function GuiaRapidaCms() {
  return (
    <Tarjeta className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="eyebrow">Guía rápida</p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-foam">
            Cómo usar este CMS sin romper la plantilla
          </h2>
        </div>
        <span className="status-chip">Pasa el mouse sobre la i</span>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-border/80 bg-white/5 p-4">
          <p className="text-sm font-semibold text-foam">1. Crea o materializa</p>
          <p className="mt-2 text-sm leading-6 text-mute">
            Crea un curso nuevo desde cero o trae uno ya definido por código para volverlo editable.
          </p>
        </div>
        <div className="rounded-2xl border border-border/80 bg-white/5 p-4">
          <p className="text-sm font-semibold text-foam">2. Completa lo visible</p>
          <p className="mt-2 text-sm leading-6 text-mute">
            Título, resumen, descripción, estado y pitch son lo mínimo para que el curso se vea bien.
          </p>
        </div>
        <div className="rounded-2xl border border-border/80 bg-white/5 p-4">
          <p className="text-sm font-semibold text-foam">3. Arma unidades y lecciones</p>
          <p className="mt-2 text-sm leading-6 text-mute">
            Agrega unidades, luego lecciones, y usa la zona de apoyo para video, imagen, docs y bloques.
          </p>
        </div>
        <div className="rounded-2xl border border-border/80 bg-white/5 p-4">
          <p className="text-sm font-semibold text-foam">4. Publica y verifica</p>
          <p className="mt-2 text-sm leading-6 text-mute">
            Guarda, publica y luego abre la lección para comprobar el orden visual y el reto.
          </p>
        </div>
      </div>
    </Tarjeta>
  )
}

function CourseEditor({
  course,
  meta,
  isEditable,
  isSyncing,
  isTransitioningToDraft,
  pendingAction,
  onSaveDraft,
  onPublishCourse,
  onMoveToDraft,
  onDeleteCourse,
}) {
  const [draft, setDraft] = useState(() => construirBorradorCurso(course, meta))
  const publicationLabel = meta.statusLabel?.trim() || 'Sin estado'

  return (
    <Tarjeta className="space-y-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="eyebrow">Curso seleccionado</p>
          <h2 className="mt-4 font-display text-2xl font-semibold text-foam">{course.title}</h2>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          {isEditable ? (
            <>
              <Boton
                variant="secondary"
                disabled={isSyncing}
                onClick={() => onSaveDraft(draft)}
              >
                {isSyncing && pendingAction === 'save' ? 'Guardando...' : 'Guardar borrador'}
              </Boton>
              <Boton disabled={isSyncing} onClick={() => onPublishCourse(draft)}>
                {isSyncing && pendingAction === 'publish' ? 'Publicando...' : 'Publicar curso'}
              </Boton>
            </>
          ) : (
            <Boton disabled={isSyncing} onClick={onMoveToDraft}>
              {isSyncing && pendingAction === 'unpublish' ? 'Moviendo...' : 'Pasar a borrador'}
            </Boton>
          )}
          <Boton variant="ghost" disabled={!isEditable || isSyncing} onClick={onDeleteCourse}>
            Eliminar curso
          </Boton>
        </div>
      </div>

      <div className="rounded-2xl border border-border/80 bg-white/5 p-4 text-sm text-mute">
        <p className="font-semibold text-foam">Qué hace cada acción</p>
        <p className="mt-2 leading-6">
          Guardar borrador conserva los cambios sin abrir el curso al alumnado. Publicar curso
          guarda este formulario y lo deja visible para estudiantes. Si el curso ya está publicado
          o en cola, primero debes pasarlo a borrador para volver a editarlo.
        </p>
      </div>

      <div className="rounded-2xl border border-border/80 bg-white/5 p-4">
        <p className="text-xs uppercase tracking-[0.22em] text-mute">Estado actual</p>
        <p className="mt-3 text-sm font-semibold text-foam">{publicationLabel}</p>
        <p className="mt-2 text-sm leading-6 text-mute">
          {isTransitioningToDraft
            ? 'Estamos moviendo este curso a borrador. En cuanto Firestore confirme el cambio, el editor se habilita solo.'
            : isEditable
            ? 'Este curso está en borrador. Puedes editarlo, guardar cambios y publicarlo cuando esté listo.'
            : 'Este curso no está en borrador. Para editarlo de nuevo, pásalo primero a borrador.'}
        </p>
      </div>

      <fieldset disabled={!isEditable || isSyncing} className="grid gap-4 lg:grid-cols-2">
        <InputField
          label="Título"
          value={draft.title}
          onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
        />
        <InputField
          label="Biblioteca"
          value={draft.library}
          help={{
            title: 'Biblioteca',
            body:
              'Nombre corto de la tecnología o área del curso. Ejemplos: Python, Web, Datos o Ciberseguridad.',
          }}
          onChange={(event) =>
            setDraft((current) => ({ ...current, library: event.target.value }))
          }
        />
        <TextareaField
          className="lg:col-span-2"
          label="Resumen del curso"
          textareaClassName="min-h-28"
          value={draft.summary}
          onChange={(event) =>
            setDraft((current) => ({ ...current, summary: event.target.value }))
          }
        />
        <TextareaField
          className="lg:col-span-2"
          label="Descripción de la tarjeta"
          textareaClassName="min-h-24"
          value={draft.description}
          onChange={(event) =>
            setDraft((current) => ({ ...current, description: event.target.value }))
          }
        />
        <InputField
          label="Dificultad visible"
          value={draft.difficulty}
          help={{
            title: 'Dificultad visible',
            body:
              'Texto corto que ve la persona usuaria en el curso. Puede ser Principiante, Intermedio o una etiqueta propia del equipo.',
          }}
          onChange={(event) =>
            setDraft((current) => ({ ...current, difficulty: event.target.value }))
          }
        />
        <InputField
          label="Duración"
          value={draft.duration}
          onChange={(event) =>
            setDraft((current) => ({ ...current, duration: event.target.value }))
          }
        />
        <InputField
          label="Intensidad"
          value={draft.intensity}
          onChange={(event) =>
            setDraft((current) => ({ ...current, intensity: event.target.value }))
          }
        />
        <InputField
          label="Orden recomendado"
          value={draft.recommendedOrder}
          help={{
            title: 'Orden recomendado',
            body:
              'Número que ayuda a ordenar el curso en catálogo y panel. Un número menor normalmente aparece antes.',
          }}
          onChange={(event) =>
            setDraft((current) => ({ ...current, recommendedOrder: event.target.value }))
          }
        />
        <InputField
          label="Prerrequisitos técnicos (IDs)"
          value={draft.requiredCourseIdsText}
          help={{
            title: 'Prerrequisitos técnicos',
            body:
              'Usa IDs internos de otros cursos separados por coma. Sirve para relacionar dependencias entre cursos.',
          }}
          onChange={(event) =>
            setDraft((current) => ({
              ...current,
              requiredCourseIdsText: event.target.value,
            }))
          }
        />
        <TextareaField
          className="lg:col-span-2"
          label="Ideal para (una línea por público)"
          textareaClassName="min-h-24"
          value={draft.audienceText}
          help={{
            title: 'Ideal para',
            body:
              'Escribe un perfil por línea. Ejemplos: Analistas de datos, Estudiantes que inician, Desarrolladores junior.',
          }}
          onChange={(event) =>
            setDraft((current) => ({ ...current, audienceText: event.target.value }))
          }
        />
        <TextareaField
          label="Prerrequisitos visibles"
          textareaClassName="min-h-24"
          value={draft.prerequisitesText}
          onChange={(event) =>
            setDraft((current) => ({ ...current, prerequisitesText: event.target.value }))
          }
        />
        <TextareaField
          label="Recomendado antes de"
          textareaClassName="min-h-24"
          value={draft.recommendedBeforeText}
          onChange={(event) =>
            setDraft((current) => ({ ...current, recommendedBeforeText: event.target.value }))
          }
        />
        <TextareaField
          label="Después de este curso"
          textareaClassName="min-h-24"
          value={draft.nextAfterText}
          onChange={(event) =>
            setDraft((current) => ({ ...current, nextAfterText: event.target.value }))
          }
        />
        <InputField
          label="Tags de rol"
          value={draft.personaTagsText}
          help={{
            title: 'Tags de rol',
            body:
              'Palabras clave separadas por coma para perfilar a quién va dirigido. Ejemplos: programadores, analistas, estudiantes.',
          }}
          onChange={(event) =>
            setDraft((current) => ({ ...current, personaTagsText: event.target.value }))
          }
        />
        <InputField
          label="Tags de interés"
          value={draft.interestTagsText}
          onChange={(event) =>
            setDraft((current) => ({ ...current, interestTagsText: event.target.value }))
          }
        />
        <InputField
          label="Tags de experiencia"
          value={draft.experienceTagsText}
          onChange={(event) =>
            setDraft((current) => ({ ...current, experienceTagsText: event.target.value }))
          }
        />
        <TextareaField
          className="lg:col-span-2"
          label="Pitch del catálogo"
          textareaClassName="min-h-24"
          value={draft.pitch}
          help={{
            title: 'Pitch del catálogo',
            body:
              'Resumen breve con tono comercial o motivacional. Piensa en una frase que convenza a alguien de abrir el curso.',
          }}
          onChange={(event) => setDraft((current) => ({ ...current, pitch: event.target.value }))}
        />
      </fieldset>
    </Tarjeta>
  )
}

function UnitEditor({
  content,
  courseId,
  unit,
  assessment,
  isEditable,
  isSyncing,
  onReplaceContent,
  onDelete,
}) {
  const [unitDraft, setUnitDraft] = useState({
    title: unit.title,
    summary: unit.summary,
  })
  const [assessmentDraft, setAssessmentDraft] = useState(() =>
    assessment ? construirBorradorEvaluacion(assessment) : null,
  )

  function handleSave() {
    const contentAfterUnit = actualizarUnidadEnContenido(content, courseId, unit.id, unitDraft)
    const contentAfterAssessment =
      assessment && assessmentDraft
        ? actualizarEvaluacionUnidadEnContenido(
            contentAfterUnit,
            courseId,
            unit.id,
            assessmentDraft,
          )
        : contentAfterUnit

    onReplaceContent(contentAfterAssessment, {
      activityType: 'unit_bundle_updated',
      payload: { courseId, unitId: unit.id },
    })
  }

  return (
    <Tarjeta className="space-y-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="eyebrow">Unidad seleccionada</p>
          <h2 className="mt-4 font-display text-2xl font-semibold text-foam">{unit.title}</h2>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Boton variant="secondary" disabled={!isEditable || isSyncing} onClick={handleSave}>
            Guardar unidad
          </Boton>
          <Boton variant="ghost" disabled={!isEditable || isSyncing} onClick={onDelete}>
            Eliminar unidad
          </Boton>
        </div>
      </div>

      <fieldset disabled={!isEditable || isSyncing} className="grid gap-4">
        <InputField
          label="Título de la unidad"
          value={unitDraft.title}
          onChange={(event) =>
            setUnitDraft((current) => ({ ...current, title: event.target.value }))
          }
        />
        <TextareaField
          label="Resumen de la unidad"
          textareaClassName="min-h-24"
          value={unitDraft.summary}
          onChange={(event) =>
            setUnitDraft((current) => ({ ...current, summary: event.target.value }))
          }
        />
      </fieldset>

      {assessment && assessmentDraft ? (
        <fieldset
          disabled={!isEditable || isSyncing}
          className="rounded-3xl border border-border/80 bg-white/5 p-5"
        >
          <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="eyebrow">Evaluación de unidad</p>
              <h3 className="mt-3 font-display text-xl font-semibold text-foam">
                Checkpoint de desbloqueo
              </h3>
            </div>
            <span className="status-chip">{assessment.questions.length} preguntas base</span>
          </div>

          <InputField
            label="Título"
            value={assessmentDraft.title}
            onChange={(event) =>
              setAssessmentDraft((current) => ({ ...current, title: event.target.value }))
            }
          />
          <TextareaField
            label="Resumen"
            textareaClassName="min-h-24"
            value={assessmentDraft.summary}
            onChange={(event) =>
              setAssessmentDraft((current) => ({ ...current, summary: event.target.value }))
            }
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField
              label="Puntaje mínimo"
              value={assessmentDraft.passingScore}
              onChange={(event) =>
                setAssessmentDraft((current) => ({
                  ...current,
                  passingScore: event.target.value,
                }))
              }
            />
            <InputField
              label="Mensaje de éxito"
              value={assessmentDraft.successMessage}
              onChange={(event) =>
                setAssessmentDraft((current) => ({
                  ...current,
                  successMessage: event.target.value,
                }))
              }
            />
          </div>
          <TextareaField
            label="Preguntas (JSON)"
            textareaClassName="min-h-56 font-mono text-sm"
            value={assessmentDraft.questionsJson}
            help={{
              title: 'Preguntas en JSON',
              body:
                'Aquí editas el checkpoint completo. Si no necesitas cambiar la estructura, deja la base y ajusta solo textos, opciones y respuestas correctas.',
            }}
            onChange={(event) =>
              setAssessmentDraft((current) => ({
                ...current,
                questionsJson: event.target.value,
              }))
            }
            hint="Usa un arreglo con `id`, `prompt`, `options`, `correctOptionId` y `explanation`. Si el JSON es inválido, se conserva la versión anterior."
          />
          </div>
        </fieldset>
      ) : (
        <div className="rounded-3xl border border-warning/30 bg-warning/10 p-5 text-sm text-foam">
          <p className="font-semibold text-foam">Esta unidad no tiene checkpoint configurado.</p>
          <p className="mt-2 leading-6 text-mute">
            Puedes editar el título y el resumen de la unidad sin problema. El bloque de
            evaluación no aparece porque este contenido no trae una evaluación de unidad asociada.
          </p>
        </div>
      )}
    </Tarjeta>
  )
}

function LessonEditor({
  courseId,
  unitId,
  lesson,
  isEditable,
  isSyncing,
  onSave,
  onDelete,
  onStatus,
}) {
  const [draft, setDraft] = useState(() => construirBorradorLeccion(lesson))
  const supportsPythonRuntime = permiteRuntimePython(courseId)
  const visibleRuntimeMode = supportsPythonRuntime ? draft.runtimeMode : 'guided'
  const usesMultipleChallenges = draft.usesMultipleChallenges
  const challengeDrafts = useMemo(() => draft.challengeDrafts ?? [], [draft.challengeDrafts])
  const lessonXpTotal = useMemo(
    () =>
      challengeDrafts.reduce((total, challenge) => {
        const xp = Number(challenge.xp)
        return total + (Number.isFinite(xp) && xp >= 0 ? xp : 0)
      }, 0),
    [challengeDrafts],
  )

  function serializarChallengeDrafts(challenges) {
    return JSON.stringify(
      challenges.map((challenge) => ({
        id: challenge.id,
        title: challenge.title,
        exerciseType: challenge.exerciseType,
        runtimeMode: supportsPythonRuntime ? challenge.runtimeMode : 'guided',
        prompt: challenge.prompt,
        starterCode: challenge.starterCode,
        editorHeight: challenge.editorHeight,
        expectedKeywords: (challenge.expectedKeywordsText ?? '')
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
        successCriteria: challenge.successCriteria,
        expectedResult: challenge.expectedResult,
        solutionCode: challenge.solutionCode,
        solutionNote: challenge.solutionNote,
        salidaGuiada: challenge.salidaGuiada,
        executionNote: challenge.executionNote,
        successMessage: challenge.successMessage,
        xp: Number(challenge.xp) || 0,
        solutionPenaltyXp: Number(challenge.solutionPenaltyXp) || 0,
      })),
      null,
      2,
    )
  }

  function construirChallengeDraftUi(challenge, index, mode = 'guided') {
    const xp = Number(challenge.xp ?? 0) || 0
    const solutionPenaltyXp =
      challenge.lockPenaltyToXp === true
        ? xp
        : Number(challenge.solutionPenaltyXp ?? challenge.xp ?? 0) || 0

    return {
      id: challenge.id || `${lesson.id}::exercise::json::${index + 1}`,
      title: challenge.title ?? `Ejercicio ${index + 1}`,
      exerciseType: challenge.exerciseType ?? 'Completar código',
      runtimeMode: supportsPythonRuntime ? challenge.runtimeMode ?? mode : 'guided',
      prompt: challenge.prompt ?? '',
      starterCode: challenge.starterCode ?? '',
      editorHeight: challenge.editorHeight ?? '310px',
      expectedKeywordsText: Array.isArray(challenge.expectedKeywords)
        ? challenge.expectedKeywords.join(', ')
        : (challenge.expectedKeywordsText ?? ''),
      successCriteria: challenge.successCriteria ?? '',
      expectedResult: challenge.expectedResult ?? '',
      solutionCode: challenge.solutionCode ?? '',
      solutionNote: challenge.solutionNote ?? '',
      salidaGuiada: challenge.salidaGuiada ?? '',
      executionNote: challenge.executionNote ?? '',
      successMessage: challenge.successMessage ?? '',
      xp: String(xp),
      solutionPenaltyXp: String(solutionPenaltyXp),
      lockPenaltyToXp:
        challenge.lockPenaltyToXp === true || solutionPenaltyXp === xp,
    }
  }

  function sincronizarChallengeDrafts(current, nextChallenges, overrides = {}) {
    const firstChallenge = nextChallenges[0] ?? current.challengeDrafts?.[0] ?? {}

    return {
      ...current,
      challengeDrafts: nextChallenges,
      challengesJson: serializarChallengeDrafts(nextChallenges),
      runtimeMode: supportsPythonRuntime ? firstChallenge.runtimeMode ?? current.runtimeMode : 'guided',
      exerciseType: firstChallenge.exerciseType ?? current.exerciseType,
      challengeTitle: firstChallenge.title ?? current.challengeTitle,
      prompt: firstChallenge.prompt ?? current.prompt,
      starterCode: firstChallenge.starterCode ?? current.starterCode,
      editorHeight: firstChallenge.editorHeight ?? current.editorHeight,
      expectedKeywordsText: firstChallenge.expectedKeywordsText ?? current.expectedKeywordsText,
      successCriteria: firstChallenge.successCriteria ?? current.successCriteria,
      expectedResult: firstChallenge.expectedResult ?? current.expectedResult,
      solutionCode: firstChallenge.solutionCode ?? current.solutionCode,
      solutionNote: firstChallenge.solutionNote ?? current.solutionNote,
      salidaGuiada: firstChallenge.salidaGuiada ?? current.salidaGuiada,
      executionNote: firstChallenge.executionNote ?? current.executionNote,
      successMessage: firstChallenge.successMessage ?? current.successMessage,
      ...overrides,
    }
  }

  function setDraftField(field, value) {
    setDraft((current) => {
      const nextDraft = { ...current, [field]: value }
      const firstChallenge = current.challengeDrafts?.[0]

      if (!firstChallenge) {
        return nextDraft
      }

      const challengeFieldMap = {
        runtimeMode: 'runtimeMode',
        exerciseType: 'exerciseType',
        challengeTitle: 'title',
        prompt: 'prompt',
        starterCode: 'starterCode',
        editorHeight: 'editorHeight',
        expectedKeywordsText: 'expectedKeywordsText',
        successCriteria: 'successCriteria',
        expectedResult: 'expectedResult',
        solutionCode: 'solutionCode',
        solutionNote: 'solutionNote',
        salidaGuiada: 'salidaGuiada',
        executionNote: 'executionNote',
        successMessage: 'successMessage',
      }
      const challengeField = challengeFieldMap[field]

      if (!challengeField) {
        if (field !== 'challengesJson') {
          return nextDraft
        }

        try {
          const parsedChallenges = JSON.parse(value)

          if (!Array.isArray(parsedChallenges)) {
            return nextDraft
          }

          return {
            ...nextDraft,
            usesMultipleChallenges: parsedChallenges.length > 1 || current.usesMultipleChallenges,
            challengeDrafts: parsedChallenges.map((challenge, index) =>
              construirChallengeDraftUi(
                challenge,
                index,
                current.runtimeMode ?? 'guided',
              ),
            ),
          }
        } catch {
          return nextDraft
        }
      }

      return {
        ...nextDraft,
        challengeDrafts: current.challengeDrafts.map((challenge, index) =>
          index === 0 ? { ...challenge, [challengeField]: value } : challenge,
        ),
        challengesJson: serializarChallengeDrafts(
          current.challengeDrafts.map((challenge, index) =>
            index === 0 ? { ...challenge, [challengeField]: value } : challenge,
          ),
        ),
      }
    })
  }

  function updateChallengeDraft(index, patch) {
    setDraft((current) => {
      const nextChallenges = current.challengeDrafts.map((challenge, challengeIndex) => {
        if (challengeIndex !== index) {
          return challenge
        }

        const nextChallenge = { ...challenge, ...patch }

        if (patch.lockPenaltyToXp === true || (challenge.lockPenaltyToXp && 'xp' in patch)) {
          nextChallenge.solutionPenaltyXp = String(Number(nextChallenge.xp) || 0)
        }

        if (patch.lockPenaltyToXp === false && !nextChallenge.solutionPenaltyXp) {
          nextChallenge.solutionPenaltyXp = challenge.solutionPenaltyXp
        }

        return nextChallenge
      })

      return sincronizarChallengeDrafts(current, nextChallenges)
    })
  }

  function addChallengeDraft() {
    setDraft((current) => {
      const nextIndex = current.challengeDrafts.length
      const firstChallenge = current.challengeDrafts[0] ?? {}
      const nextChallenge = {
        id: `${lesson.id}::exercise::draft::${Date.now()}-${nextIndex + 1}`,
        title: `Ejercicio ${nextIndex + 1}`,
        exerciseType: firstChallenge.exerciseType ?? 'Completar código',
        runtimeMode: supportsPythonRuntime
          ? firstChallenge.runtimeMode ?? current.runtimeMode ?? 'guided'
          : 'guided',
        prompt: '',
        starterCode: '',
        editorHeight: '310px',
        expectedKeywordsText: '',
        successCriteria: '',
        expectedResult: '',
        solutionCode: '',
        solutionNote: '',
        salidaGuiada: '',
        executionNote: '',
        successMessage: '',
        xp: '0',
        solutionPenaltyXp: '0',
        lockPenaltyToXp: true,
      }
      const nextChallenges = [...current.challengeDrafts, nextChallenge]

      return sincronizarChallengeDrafts(current, nextChallenges, {
        usesMultipleChallenges: true,
      })
    })
  }

  function removeChallengeDraft(index) {
    setDraft((current) => {
      const nextChallenges = current.challengeDrafts.filter(
        (_, challengeIndex) => challengeIndex !== index,
      )

      return sincronizarChallengeDrafts(current, nextChallenges, {
        usesMultipleChallenges: nextChallenges.length > 1,
      })
    })
  }

  function moveChallengeDraft(index, direction) {
    setDraft((current) => {
      const targetIndex = index + direction

      if (targetIndex < 0 || targetIndex >= current.challengeDrafts.length) {
        return current
      }

      const nextChallenges = [...current.challengeDrafts]
      ;[nextChallenges[index], nextChallenges[targetIndex]] = [
        nextChallenges[targetIndex],
        nextChallenges[index],
      ]

      return sincronizarChallengeDrafts(current, nextChallenges)
    })
  }

  function handleImageUpload(event) {
    if (!isEditable || isSyncing) {
      return
    }

    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      startTransition(() => {
        setDraftField('imageUrl', typeof reader.result === 'string' ? reader.result : '')
        onStatus('Imagen cargada en memoria. Guarda la lección para publicarla.')
      })
    }
    reader.readAsDataURL(file)
  }

  return (
    <Tarjeta className="space-y-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="eyebrow">Lección seleccionada</p>
          <h2 className="mt-4 font-display text-2xl font-semibold text-foam">{lesson.title}</h2>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Boton
            variant="secondary"
            disabled={!isEditable || isSyncing}
            onClick={() => onSave(courseId, unitId, lesson.id, draft)}
          >
            Guardar lección
          </Boton>
          <Boton variant="ghost" disabled={!isEditable || isSyncing} onClick={onDelete}>
            Eliminar lección
          </Boton>
        </div>
      </div>

      <fieldset disabled={!isEditable || isSyncing} className="grid gap-4 lg:grid-cols-2">
        <InputField
          label="Título"
          value={draft.title}
          onChange={(event) => setDraftField('title', event.target.value)}
        />
        <InputField
          label="Duración"
          value={draft.duration}
          onChange={(event) => setDraftField('duration', event.target.value)}
        />
        <InputField
          label="XP total de la lección"
          value={String(lessonXpTotal)}
          help={{
            title: 'XP total de la lección',
            body:
              'Este valor no se edita aquí. Sale de sumar el XP de todos los ejercicios configurados en la sección de reto.',
          }}
          disabled
        />
        <label className="block space-y-2">
          <FieldLabel
            label="Modo de ejecución"
            help={{
              title: 'Modo de ejecución',
              body:
                'Guiado usa validación textual y es el modo compatible por defecto. Python real solo aparece cuando el curso soporta ejecución real en navegador.',
            }}
          />
          <select
            className="field-input"
            value={visibleRuntimeMode}
            onChange={(event) => setDraftField('runtimeMode', event.target.value)}
          >
            <option value="guided">Guiado</option>
            {supportsPythonRuntime ? <option value="python">Python real</option> : null}
          </select>
          <p className="text-xs leading-6 text-mute">
            {supportsPythonRuntime
              ? 'Este curso sí puede ejecutar Python real en el navegador.'
              : 'Este curso se mantiene en modo guiado para seguir compatible con la plantilla actual.'}
          </p>
        </label>
        <TextareaField
          className="lg:col-span-2"
          label="Objetivo"
          textareaClassName="min-h-24"
          value={draft.objective}
          onChange={(event) => setDraftField('objective', event.target.value)}
        />
      </fieldset>

      <fieldset
        disabled={!isEditable || isSyncing}
        className="rounded-3xl border border-border/80 bg-white/5 p-5"
      >
        <div className="space-y-4">
          <div>
            <p className="eyebrow">Video y apoyo</p>
            <h3 className="mt-3 font-display text-xl font-semibold text-foam">Recursos</h3>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <InputField
              label="Título del video"
              value={draft.videoTitle}
              onChange={(event) => setDraftField('videoTitle', event.target.value)}
            />
            <InputField
              label="URL embed de YouTube"
              value={draft.videoUrl}
              help={{
                title: 'URL embed de YouTube',
                body:
                  'Usa la versión embebida, por ejemplo https://www.youtube.com/embed/ID. Si lo dejas vacío, la lección puede vivir sin video.',
              }}
              onChange={(event) => setDraftField('videoUrl', event.target.value)}
            />
            <TextareaField
              className="lg:col-span-2"
              label="Documentación (Etiqueta | URL por línea)"
              textareaClassName="min-h-28"
              value={draft.documentationLinksText}
              help={{
                title: 'Documentación por línea',
                body:
                  'Cada línea debe seguir este formato: Etiqueta | URL. Ejemplo: Docs oficiales | https://docs.python.org/3/.',
              }}
              onChange={(event) => setDraftField('documentationLinksText', event.target.value)}
            />
            <InputField
              label="Título del ejemplo"
              value={draft.exampleTitle}
              onChange={(event) => setDraftField('exampleTitle', event.target.value)}
            />
            <InputField
              label="Imagen de apoyo (URL)"
              value={draft.imageUrl}
              onChange={(event) => setDraftField('imageUrl', event.target.value)}
            />
            <label className="block space-y-2 lg:col-span-2">
              <span className="text-sm font-medium text-foam">Subir imagen de apoyo</span>
              <input
                className="field-input file:mr-4 file:rounded-full file:border-0 file:bg-primary/15 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
            <TextareaField
              className="lg:col-span-2"
              label="Código de ejemplo"
              textareaClassName="min-h-40 font-mono text-sm"
              value={draft.exampleCode}
              onChange={(event) => setDraftField('exampleCode', event.target.value)}
            />
            <TextareaField
              className="lg:col-span-2"
              label="Nota de apoyo"
              textareaClassName="min-h-24"
              value={draft.supportNote}
              onChange={(event) => setDraftField('supportNote', event.target.value)}
            />
            <TextareaField
              className="lg:col-span-2"
              label="Bloques de apoyo (JSON)"
              textareaClassName="min-h-64 font-mono text-sm"
              value={draft.supportBlocksJson}
              help={{
                title: 'Bloques de apoyo',
                body:
                  'Sirven para construir texto, imagen con texto o galerías siguiendo la misma plantilla del repo. Si no los necesitas, puedes dejar un arreglo vacío.',
              }}
              onChange={(event) => setDraftField('supportBlocksJson', event.target.value)}
              hint="Aquí puedes definir bloques `texto`, `imagenTexto` y `galeria` siguiendo la misma estructura de la plantilla del curso."
            />
          </div>
        </div>
      </fieldset>

      <fieldset
        disabled={!isEditable || isSyncing}
        className="rounded-3xl border border-border/80 bg-white/5 p-5"
      >
        <div className="space-y-4">
          <div>
            <p className="eyebrow">Instrucciones</p>
            <h3 className="mt-3 font-display text-xl font-semibold text-foam">Contexto</h3>
          </div>
          <TextareaField
            label="Overview"
            textareaClassName="min-h-24"
            value={draft.instructionsOverview}
            onChange={(event) => setDraftField('instructionsOverview', event.target.value)}
          />
          <TextareaField
            label="Pasos (uno por línea)"
            textareaClassName="min-h-28"
            value={draft.instructionsStepsText}
            help={{
              title: 'Pasos',
              body:
                'Escribe un paso por línea. La interfaz los transforma en una lista ordenada dentro de la lección.',
            }}
            onChange={(event) => setDraftField('instructionsStepsText', event.target.value)}
          />
          <TextareaField
            label="Pista"
            textareaClassName="min-h-20"
            value={draft.instructionsHint}
            onChange={(event) => setDraftField('instructionsHint', event.target.value)}
          />
          <TextareaField
            label="Orden de apoyo (JSON opcional)"
            textareaClassName="min-h-40 font-mono text-sm"
            value={draft.supportLayoutJson}
            help={{
              title: 'Orden de apoyo',
              body:
                'Úsalo cuando quieras controlar si primero va un bloque, luego el video, luego la documentación o el ejemplo. Si lo dejas vacío, la lección usa el orden clásico.',
            }}
            onChange={(event) => setDraftField('supportLayoutJson', event.target.value)}
            hint="Si lo dejas vacío, la lección usa el orden legado. Puedes usar `video`, `note`, `documentation`, `example`, `blocks` o un objeto `block` con `blockId` o `blockIndex`."
          />
        </div>
      </fieldset>

      <fieldset
        disabled={!isEditable || isSyncing}
        className="rounded-3xl border border-border/80 bg-white/5 p-5"
      >
        <div className="space-y-4">
          <div>
            <p className="eyebrow">Reto</p>
            <h3 className="mt-3 font-display text-xl font-semibold text-foam">Challenge</h3>
          </div>

          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <label className="block space-y-2">
              <FieldLabel
                label="Modo de ejercicios"
                help={{
                  title: 'Modo de ejercicios',
                  body:
                    'Puedes dejar la lección con un ejercicio o convertirla en una secuencia con varios pasos. Para avanzar, la persona debe resolver todos los ejercicios requeridos.',
                }}
              />
              <select
                className="field-input"
                value={usesMultipleChallenges ? 'multiple' : 'single'}
                onChange={(event) =>
                  setDraft((current) => {
                    const wantsMultiple = event.target.value === 'multiple'
                    const nextChallenges = wantsMultiple
                      ? current.challengeDrafts
                      : current.challengeDrafts.slice(0, 1)

                    return sincronizarChallengeDrafts(current, nextChallenges, {
                      usesMultipleChallenges: wantsMultiple,
                    })
                  })
                }
              >
                <option value="single">Ejercicio único</option>
                <option value="multiple">Varios ejercicios</option>
              </select>
            </label>

            <div className="rounded-2xl border border-border/80 bg-white/5 p-4 text-sm text-mute">
              <p className="font-semibold text-foam">Resumen del reto</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="status-chip">{challengeDrafts.length} ejercicios</span>
                <span className="status-chip">{lessonXpTotal} XP totales</span>
              </div>
              <p className="mt-3 leading-6">
                Cada ejercicio puede tener su propio XP y su propia penalización por revelar la
                solución. El total de la lección sale de sumar esos valores.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {challengeDrafts.map((challenge, index) => (
              <div
                key={challenge.id || `${lesson.id}-challenge-${index}`}
                className="rounded-2xl border border-border/80 bg-panel-2/50 p-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-mute">
                      Ejercicio {index + 1}
                    </p>
                    <p className="mt-2 text-sm text-mute">
                      Este bloque controla el XP, la penalización y el contenido del ejercicio.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Boton
                      variant="ghost"
                      disabled={index === 0}
                      onClick={() => moveChallengeDraft(index, -1)}
                    >
                      Subir
                    </Boton>
                    <Boton
                      variant="ghost"
                      disabled={index === challengeDrafts.length - 1}
                      onClick={() => moveChallengeDraft(index, 1)}
                    >
                      Bajar
                    </Boton>
                    <Boton
                      variant="ghost"
                      disabled={challengeDrafts.length === 1}
                      onClick={() => removeChallengeDraft(index)}
                    >
                      Eliminar
                    </Boton>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <InputField
                    label="Título del ejercicio"
                    value={challenge.title}
                    onChange={(event) =>
                      updateChallengeDraft(index, { title: event.target.value })
                    }
                  />
                  <InputField
                    label="Tipo de ejercicio"
                    value={challenge.exerciseType}
                    onChange={(event) =>
                      updateChallengeDraft(index, { exerciseType: event.target.value })
                    }
                  />
                  <label className="block space-y-2">
                    <FieldLabel label="Modo de ejecución" />
                    <select
                      className="field-input"
                      value={supportsPythonRuntime ? challenge.runtimeMode : 'guided'}
                      onChange={(event) =>
                        updateChallengeDraft(index, { runtimeMode: event.target.value })
                      }
                    >
                      <option value="guided">Guiado</option>
                      {supportsPythonRuntime ? <option value="python">Python real</option> : null}
                    </select>
                  </label>
                  <InputField
                    label="Altura del editor"
                    value={challenge.editorHeight}
                    onChange={(event) =>
                      updateChallengeDraft(index, { editorHeight: event.target.value })
                    }
                  />
                  <InputField
                    label="XP del ejercicio"
                    value={challenge.xp}
                    help={{
                      title: 'XP del ejercicio',
                      body:
                        'Define cuánta experiencia gana la persona si resuelve este ejercicio. El total de la lección se recalcula automáticamente.',
                    }}
                    onChange={(event) =>
                      updateChallengeDraft(index, { xp: event.target.value })
                    }
                  />
                  <div className="space-y-3">
                    <InputField
                      label="Penalización por revelar solución"
                      value={challenge.solutionPenaltyXp}
                      help={{
                        title: 'Penalización por revelar solución',
                        body:
                          'Por defecto puede ser igual al XP del ejercicio. Si desactivas la sincronización, puedes escribir una penalización distinta.',
                      }}
                      disabled={challenge.lockPenaltyToXp}
                      onChange={(event) =>
                        updateChallengeDraft(index, {
                          solutionPenaltyXp: event.target.value,
                        })
                      }
                    />
                    <label className="flex items-center gap-3 rounded-2xl border border-border/70 bg-white/5 px-4 py-3 text-sm text-mute">
                      <input
                        type="checkbox"
                        checked={challenge.lockPenaltyToXp}
                        onChange={(event) =>
                          updateChallengeDraft(index, {
                            lockPenaltyToXp: event.target.checked,
                          })
                        }
                      />
                      <span>Usar el mismo XP del ejercicio como penalización</span>
                    </label>
                  </div>
                  <TextareaField
                    className="lg:col-span-2"
                    label="Prompt"
                    textareaClassName="min-h-24"
                    value={challenge.prompt}
                    onChange={(event) =>
                      updateChallengeDraft(index, { prompt: event.target.value })
                    }
                  />
                  <TextareaField
                    className="lg:col-span-2"
                    label="Starter code"
                    textareaClassName="min-h-40 font-mono text-sm"
                    value={challenge.starterCode}
                    onChange={(event) =>
                      updateChallengeDraft(index, { starterCode: event.target.value })
                    }
                  />
                  <InputField
                    label="Keywords (coma)"
                    value={challenge.expectedKeywordsText}
                    onChange={(event) =>
                      updateChallengeDraft(index, {
                        expectedKeywordsText: event.target.value,
                      })
                    }
                  />
                  <InputField
                    label="Resultado esperado"
                    value={challenge.expectedResult}
                    onChange={(event) =>
                      updateChallengeDraft(index, { expectedResult: event.target.value })
                    }
                  />
                  <InputField
                    label="Salida guiada"
                    value={challenge.salidaGuiada}
                    onChange={(event) =>
                      updateChallengeDraft(index, { salidaGuiada: event.target.value })
                    }
                  />
                  <TextareaField
                    className="lg:col-span-2"
                    label="Criterio de exito"
                    textareaClassName="min-h-24"
                    value={challenge.successCriteria}
                    onChange={(event) =>
                      updateChallengeDraft(index, { successCriteria: event.target.value })
                    }
                  />
                  <TextareaField
                    className="lg:col-span-2"
                    label="Solucion completa"
                    textareaClassName="min-h-40 font-mono text-sm"
                    value={challenge.solutionCode}
                    onChange={(event) =>
                      updateChallengeDraft(index, { solutionCode: event.target.value })
                    }
                  />
                  <TextareaField
                    className="lg:col-span-2"
                    label="Explicación de la solución"
                    textareaClassName="min-h-24"
                    value={challenge.solutionNote}
                    onChange={(event) =>
                      updateChallengeDraft(index, { solutionNote: event.target.value })
                    }
                  />
                  <TextareaField
                    className="lg:col-span-2"
                    label="Nota de ejecución"
                    textareaClassName="min-h-24"
                    value={challenge.executionNote}
                    onChange={(event) =>
                      updateChallengeDraft(index, { executionNote: event.target.value })
                    }
                  />
                  <TextareaField
                    className="lg:col-span-2"
                    label="Mensaje de exito"
                    textareaClassName="min-h-24"
                    value={challenge.successMessage}
                    onChange={(event) =>
                      updateChallengeDraft(index, { successMessage: event.target.value })
                    }
                  />
                </div>
              </div>
            ))}

            {usesMultipleChallenges ? (
              <Boton variant="secondary" onClick={addChallengeDraft}>
                Agregar ejercicio
              </Boton>
            ) : null}
          </div>

          {usesMultipleChallenges ? (
            <div className="space-y-4">
              <div className="rounded-2xl border border-primary/25 bg-primary/10 p-4 text-sm text-mute">
                Esta lección usa múltiples ejercicios dentro de la misma misión. Para mantener
                compatibilidad con el curso original, aquí se edita el bloque completo como JSON.
              </div>
              <TextareaField
                label="Ejercicios múltiples (JSON)"
                textareaClassName="min-h-72 font-mono text-sm"
                value={draft.challengesJson}
                help={{
                  title: 'Ejercicios múltiples',
                  body:
                    'Cada elemento del arreglo representa un paso o reto. Mantén la misma estructura que vino por código para no romper el curso original.',
                }}
                onChange={(event) => setDraftField('challengesJson', event.target.value)}
                hint="Si el JSON es inválido, el CMS conserva la versión anterior para proteger la lección."
              />
            </div>
          ) : (
            <div className="hidden">
            <InputField
              label="Tipo de ejercicio"
              value={draft.exerciseType}
              onChange={(event) => setDraftField('exerciseType', event.target.value)}
            />
            <InputField
              label="Título del reto"
              value={draft.challengeTitle}
              onChange={(event) => setDraftField('challengeTitle', event.target.value)}
            />
            <TextareaField
              className="lg:col-span-2"
              label="Prompt"
              textareaClassName="min-h-24"
              value={draft.prompt}
              onChange={(event) => setDraftField('prompt', event.target.value)}
            />
            <TextareaField
              className="lg:col-span-2"
              label="Starter code"
              textareaClassName="min-h-40 font-mono text-sm"
              value={draft.starterCode}
              help={{
                title: 'Starter code',
                body:
                  'Código inicial que verá la persona antes de resolver el reto. Conviene dejarlo incompleto pero orientado al objetivo.',
              }}
              onChange={(event) => setDraftField('starterCode', event.target.value)}
            />
            <InputField
              label="Altura del editor"
              value={draft.editorHeight}
              onChange={(event) => setDraftField('editorHeight', event.target.value)}
            />
            <InputField
              label="Keywords (coma)"
              value={draft.expectedKeywordsText}
              help={{
                title: 'Keywords',
                body:
                  'Palabras o fragmentos separados por coma que ayudan a validar una solución guiada cuando no se usa Python real.',
              }}
              onChange={(event) => setDraftField('expectedKeywordsText', event.target.value)}
            />
            <InputField
              label="Resultado esperado"
              value={draft.expectedResult}
              help={{
                title: 'Resultado esperado',
                body:
                  'Salida, texto o resultado que el sistema mostrará como referencia para validar el reto.',
              }}
              onChange={(event) => setDraftField('expectedResult', event.target.value)}
            />
            <InputField
              label="Salida guiada"
              value={draft.salidaGuiada}
              help={{
                title: 'Salida guiada',
                body:
                  'Respuesta o salida simplificada para retos guiados. Suele ser útil cuando no hay ejecución real.',
              }}
              onChange={(event) => setDraftField('salidaGuiada', event.target.value)}
            />
            <TextareaField
              className="lg:col-span-2"
              label="Criterio de éxito"
              textareaClassName="min-h-24"
              value={draft.successCriteria}
              onChange={(event) => setDraftField('successCriteria', event.target.value)}
            />
            <TextareaField
              className="lg:col-span-2"
              label="Solución completa"
              textareaClassName="min-h-40 font-mono text-sm"
              value={draft.solutionCode}
              onChange={(event) => setDraftField('solutionCode', event.target.value)}
            />
            <TextareaField
              className="lg:col-span-2"
              label="Explicación de la solución"
              textareaClassName="min-h-24"
              value={draft.solutionNote}
              onChange={(event) => setDraftField('solutionNote', event.target.value)}
            />
            <TextareaField
              className="lg:col-span-2"
              label="Nota de ejecución"
              textareaClassName="min-h-24"
              value={draft.executionNote}
              help={{
                title: 'Nota de ejecución',
                body:
                  'Aclaraciones técnicas para la persona usuaria, por ejemplo límites del editor o cómo interpretar la salida.',
              }}
              onChange={(event) => setDraftField('executionNote', event.target.value)}
            />
            <TextareaField
              className="lg:col-span-2"
              label="Mensaje de éxito"
              textareaClassName="min-h-24"
              value={draft.successMessage}
              onChange={(event) => setDraftField('successMessage', event.target.value)}
            />
            </div>
          )}
        </div>
      </fieldset>
    </Tarjeta>
  )
}

function FinalAssessmentEditor({ assessment, isEditable, isSyncing, onSave }) {
  const [draft, setDraft] = useState(() => construirBorradorEvaluacion(assessment))

  return (
    <Tarjeta className="space-y-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="eyebrow">Evaluación final</p>
          <h2 className="mt-4 font-display text-2xl font-semibold text-foam">Cierre del curso</h2>
        </div>
        <Boton variant="secondary" disabled={!isEditable || isSyncing} onClick={() => onSave(draft)}>
          Guardar evaluación final
        </Boton>
      </div>

      <fieldset disabled={!isEditable || isSyncing} className="grid gap-4 lg:grid-cols-2">
        <InputField
          className="lg:col-span-2"
          label="Título"
          value={draft.title}
          onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
        />
        <TextareaField
          className="lg:col-span-2"
          label="Resumen"
          textareaClassName="min-h-24"
          value={draft.summary}
          onChange={(event) =>
            setDraft((current) => ({ ...current, summary: event.target.value }))
          }
        />
        <InputField
          label="Puntaje mínimo"
          value={draft.passingScore}
          onChange={(event) =>
            setDraft((current) => ({ ...current, passingScore: event.target.value }))
          }
        />
        <InputField label="Preguntas base" value={assessment.questions.length} disabled />
        <TextareaField
          className="lg:col-span-2"
          label="Mensaje de éxito"
          textareaClassName="min-h-24"
          value={draft.successMessage}
          onChange={(event) =>
            setDraft((current) => ({ ...current, successMessage: event.target.value }))
          }
        />
        <TextareaField
          className="lg:col-span-2"
          label="Preguntas (JSON)"
          textareaClassName="min-h-56 font-mono text-sm"
          value={draft.questionsJson}
          help={{
            title: 'Evaluación final en JSON',
            body:
              'Este campo controla las preguntas finales del curso. Si no necesitas cambiar la estructura, edita solo el texto, las opciones y la respuesta correcta.',
          }}
          onChange={(event) =>
            setDraft((current) => ({ ...current, questionsJson: event.target.value }))
          }
          hint="Usa el mismo esquema de preguntas que vive en `src/datos/cursos/*/evaluaciones.js`."
        />
      </fieldset>
    </Tarjeta>
  )
}

function CoursePendingState({
  courseId,
  meta,
  draftSource,
  onImportCodeDraft,
  onCreateEditableCourse,
}) {
  return (
    <Tarjeta className="space-y-5">
      <div className="space-y-3">
        <p className="eyebrow">Curso sin materializar</p>
        <h2 className="font-display text-2xl font-semibold text-foam">
          {meta?.title ?? courseId}
        </h2>
        <p className="text-mute">
          Este curso ya convive con el catálogo, pero todavía no existe como estructura editable
          dentro del CMS local. Puedes traer su borrador por código o crear una base compatible con
          la plantilla actual del proyecto.
        </p>
      </div>

      <div className="rounded-2xl border border-border/80 bg-white/5 p-4 text-sm text-mute">
        <p>
          Catálogo: {meta?.statusLabel ?? 'Sin estado'} / Biblioteca: {meta?.library ?? 'Python'}
        </p>
        <p className="mt-2">
          Fuente por código: {draftSource?.course ? 'borrador disponible' : 'solo metadata de catálogo'}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        {draftSource?.course ? (
          <Boton variant="secondary" onClick={onImportCodeDraft}>
            Importar borrador por código
          </Boton>
        ) : null}
        <Boton onClick={onCreateEditableCourse}>Crear estructura editable</Boton>
      </div>
    </Tarjeta>
  )
}

export function PaginaAdminContenido() {
  const { content, cmsSync } = useEstadoApp()
  const {
    createCourse,
    createLesson,
    createUnit,
    deleteCourse,
    deleteLesson,
    deleteUnit,
    replaceContent,
    updateCourse,
    updateFinalAssessment,
    updateLesson,
  } = useAccionesApp()

  const [selectedCourseId, setSelectedCourseId] = useState(content.catalogoCursos[0]?.id ?? null)
  const [selectedUnitId, setSelectedUnitId] = useState(null)
  const [selectedLessonId, setSelectedLessonId] = useState(null)
  const [newCourseName, setNewCourseName] = useState('')
  const [newUnitName, setNewUnitName] = useState('')
  const [newLessonName, setNewLessonName] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [pendingCourseAction, setPendingCourseAction] = useState('')

  const orderedCatalog = useMemo(
    () =>
      [...content.catalogoCursos].sort(
        (left, right) => (left.recommendedOrder ?? 0) - (right.recommendedOrder ?? 0),
      ),
    [content.catalogoCursos],
  )

  const effectiveCourseId =
    selectedCourseId && findCourseMeta(content, selectedCourseId)
      ? selectedCourseId
      : orderedCatalog[0]?.id ?? null
  const selectedCourse = findCourse(content, effectiveCourseId)
  const selectedMeta = findCourseMeta(content, effectiveCourseId)
  const selectedDraftSource = findDraftCourse(content, effectiveCourseId)

  const effectiveUnitId =
    selectedUnitId && findUnit(content, effectiveCourseId, selectedUnitId)
      ? selectedUnitId
      : selectedCourse?.units[0]?.id ?? null
  const selectedUnit = findUnit(content, effectiveCourseId, effectiveUnitId)

  const effectiveLessonId =
    selectedLessonId && findLesson(content, effectiveCourseId, effectiveUnitId, selectedLessonId)
      ? selectedLessonId
      : selectedUnit?.lessons[0]?.id ?? null
  const selectedLesson = findLesson(content, effectiveCourseId, effectiveUnitId, effectiveLessonId)

  const selectedUnitAssessment =
    content.evaluacionesCursos[effectiveCourseId]?.unitAssessments?.[effectiveUnitId] ?? null
  const selectedFinalAssessment = content.evaluacionesCursos[effectiveCourseId]?.finalAssessment ?? null
  const isHydratingCms = cmsSync.isReady === false
  const isSyncingCms = cmsSync.status === 'saving' || isHydratingCms
  const isTransitioningToDraft = pendingCourseAction === 'unpublish'
  const isCourseEditable = selectedMeta?.status === 'draft' && !isTransitioningToDraft
  const cmsSyncMessage =
    cmsSync.status === 'saved' && cmsSync.lastSavedAt
      ? `${cmsSync.message} Última confirmación: ${formatearHoraSincronizacion(cmsSync.lastSavedAt)}.`
      : cmsSync.message
  const cmsSyncToneClass =
    cmsSync.status === 'error'
      ? 'border-danger/30 bg-danger/10 text-red-100'
      : cmsSync.status === 'saving'
        ? 'border-warning/30 bg-warning/10 text-foam'
        : 'border-primary/25 bg-primary/10 text-foam'

  useEffect(() => {
    if (!pendingCourseAction) {
      return undefined
    }

    const syncResolved = cmsSync.status === 'saved' || cmsSync.status === 'error'
    const courseReadyForDraft =
      pendingCourseAction !== 'unpublish' || selectedMeta?.status === 'draft'

    if (!syncResolved || !courseReadyForDraft) {
      return undefined
    }

    const timerId = window.setTimeout(() => {
      if (cmsSync.status === 'saved' && pendingCourseAction === 'unpublish') {
        setStatusMessage('Curso listo para editarse en borrador.')
      }

      setPendingCourseAction('')
    }, 0)

    return () => window.clearTimeout(timerId)
  }, [cmsSync.status, pendingCourseAction, selectedMeta?.status])

  function handleCreateCourse() {
    if (!newCourseName.trim()) {
      return
    }

    const courseId = createCourse(newCourseName.trim())
    setSelectedCourseId(courseId)
    setSelectedUnitId(null)
    setSelectedLessonId(null)
    setNewCourseName('')
    setPendingCourseAction('')
    setStatusMessage('Curso creado. Ya puedes editarlo y publicarlo.')
  }

  function handleMaterializeCourse(sourcePreference = 'catalog') {
    if (!effectiveCourseId) {
      return
    }

    const { content: nextContent, mode } = materializarCursoCmsEnContenido(
      content,
      effectiveCourseId,
      sourcePreference,
    )

    replaceContent(nextContent, {
      activityType: 'course_materialized',
      payload: { courseId: effectiveCourseId, source: mode },
    })
    setSelectedUnitId(null)
    setSelectedLessonId(null)
    setPendingCourseAction('')

    if (mode === 'code') {
      setStatusMessage('Curso importado desde su borrador en código y listo para editarse en el CMS.')
      return
    }

    if (mode === 'catalog') {
      setStatusMessage('Curso inicializado desde el catálogo con una estructura compatible con la plantilla.')
      return
    }

    setStatusMessage('El curso ya estaba materializado en el CMS local.')
  }

  function handleCreateUnit() {
    if (!effectiveCourseId || !isCourseEditable || !newUnitName.trim()) {
      return
    }

    const unitId = createUnit(effectiveCourseId, newUnitName.trim())
    setSelectedUnitId(unitId)
    setSelectedLessonId(null)
    setNewUnitName('')
    setStatusMessage('Unidad creada dentro del curso.')
  }

  function handleCreateLesson() {
    if (!effectiveCourseId || !effectiveUnitId || !isCourseEditable || !newLessonName.trim()) {
      return
    }

    const lessonId = createLesson(effectiveCourseId, effectiveUnitId, newLessonName.trim())
    setSelectedLessonId(lessonId)
    setNewLessonName('')
    setStatusMessage('Lección creada y lista para edición.')
  }

  function handleDeleteCourse() {
    if (!effectiveCourseId || !selectedCourse) {
      return
    }

    const shouldDelete =
      typeof window === 'undefined' ||
      window.confirm(
        `Se eliminará el curso "${selectedCourse.title}" del CMS local. Esta acción quita también sus unidades y evaluaciones. ¿Continuar?`,
      )

    if (!shouldDelete) {
      return
    }

    deleteCourse(effectiveCourseId)
    setSelectedCourseId(null)
    setSelectedUnitId(null)
    setSelectedLessonId(null)
    setPendingCourseAction('')
    setStatusMessage('Curso eliminado del CMS local.')
  }

  function handleSaveCourseDraft(draft) {
    updateCourse(effectiveCourseId, {
      ...draft,
      status: 'draft',
      statusLabel: 'Borrador',
    })
    setPendingCourseAction('save')
    setStatusMessage('Borrador actualizado. Esperando confirmación de Firestore...')
  }

  function handlePublishCourse(draft) {
    updateCourse(effectiveCourseId, {
      ...draft,
      status: 'live',
      statusLabel: 'Disponible ahora',
    })
    setPendingCourseAction('publish')
    setStatusMessage('Publicando curso. Quedará visible cuando Firestore confirme el cambio.')
  }

  function handleMoveCourseToDraft() {
    if (!selectedCourse || !selectedMeta) {
      return
    }

    updateCourse(effectiveCourseId, {
      ...construirBorradorCurso(selectedCourse, selectedMeta),
      status: 'draft',
      statusLabel: 'Borrador',
    })
    setPendingCourseAction('unpublish')
    setStatusMessage('Curso enviado a borrador. Al confirmarse la sincronización dejará de estar público.')
  }

  if (!selectedMeta && orderedCatalog.length === 0) {
    return (
      <div className="space-y-8">
        <Tarjeta accent className="space-y-6">
          <div className="space-y-4">
            <p className="eyebrow">Administración / Contenido</p>
            <h1 className="font-display text-4xl font-semibold text-foam">
              CMS de cursos y bibliotecas
            </h1>
          </div>
        </Tarjeta>

        {statusMessage && (
          <div className="rounded-2xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-foam">
            {statusMessage}
          </div>
        )}

        <Tarjeta className="space-y-4">
          <p className="text-mute">Aún no hay cursos cargados. Crea uno para empezar.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              className="field-input flex-1"
              value={newCourseName}
              placeholder="Nombre del curso"
              onChange={(event) => setNewCourseName(event.target.value)}
            />
            <Boton onClick={handleCreateCourse}>Crear curso</Boton>
          </div>
        </Tarjeta>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <Tarjeta accent className="space-y-6">
        <div className="space-y-4">
          <p className="eyebrow">Administración / Contenido</p>
          <h1 className="font-display text-4xl font-semibold text-foam">
            CMS de cursos, unidades y lecciones
          </h1>
        </div>
      </Tarjeta>

      {statusMessage && (
        <div className="rounded-2xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-foam">
          {statusMessage}
        </div>
      )}

      {cmsSyncMessage ? (
        <div className={`rounded-2xl border px-4 py-3 text-sm ${cmsSyncToneClass}`}>
          {cmsSyncMessage}
        </div>
      ) : null}

      <GuiaRapidaCms />

      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <Tarjeta className="space-y-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="eyebrow">Catálogo</p>
              <h2 className="mt-4 font-display text-2xl font-semibold text-foam">
                Cursos editables
              </h2>
            </div>
            <span className="status-chip">{orderedCatalog.length} cursos</span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              className="field-input flex-1"
              value={newCourseName}
              placeholder="Nuevo curso: Flask, NumPy, etc."
              onChange={(event) => setNewCourseName(event.target.value)}
            />
            <Boton disabled={isSyncingCms} onClick={handleCreateCourse}>
              Crear curso
            </Boton>
          </div>

          <div className="grid gap-3">
            {orderedCatalog.map((course) => {
              const editableCourse = findCourse(content, course.id)
              const draftCourse = findDraftCourse(content, course.id)

              return (
                <button
                  key={course.id}
                  type="button"
                  className={`rounded-2xl border px-4 py-4 text-left transition ${
                    course.id === effectiveCourseId
                      ? 'border-primary/35 bg-primary/10'
                      : 'border-border/80 bg-white/5 hover:border-primary/25'
                  }`}
                  onClick={() => {
                    setSelectedCourseId(course.id)
                    setSelectedUnitId(null)
                    setSelectedLessonId(null)
                    setPendingCourseAction('')
                  }}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="eyebrow">{course.library}</span>
                    <span className="status-chip">{course.statusLabel}</span>
                    <span className="status-chip">
                      {editableCourse
                        ? 'Editable'
                        : draftCourse?.course
                          ? 'Borrador por código'
                          : 'Solo catálogo'}
                    </span>
                  </div>
                  <p className="mt-3 font-semibold text-foam">{course.title}</p>
                  <p className="mt-2 text-sm text-mute">{course.description}</p>
                </button>
              )
            })}
          </div>
        </Tarjeta>

        {selectedCourse && selectedMeta ? (
          <CourseEditor
            key={`${effectiveCourseId}-${selectedMeta?.status ?? 'sin-estado'}`}
            course={selectedCourse}
            meta={selectedMeta}
            isEditable={isCourseEditable}
            isSyncing={isSyncingCms}
            isTransitioningToDraft={isTransitioningToDraft}
            pendingAction={pendingCourseAction}
            onSaveDraft={handleSaveCourseDraft}
            onPublishCourse={handlePublishCourse}
            onMoveToDraft={handleMoveCourseToDraft}
            onDeleteCourse={handleDeleteCourse}
          />
        ) : (
          <CoursePendingState
            courseId={effectiveCourseId}
            meta={selectedMeta}
            draftSource={selectedDraftSource}
            onImportCodeDraft={() => handleMaterializeCourse('code')}
            onCreateEditableCourse={() => handleMaterializeCourse('catalog')}
          />
        )}
      </div>

      {selectedCourse ? (
        <>
      {isTransitioningToDraft ? (
        <div className="rounded-2xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-foam">
          Preparando el borrador del curso. Espera la confirmación de Firestore antes de editar unidades, lecciones o evaluaciones.
        </div>
      ) : !isCourseEditable ? (
        <div className="rounded-2xl border border-warning/30 bg-warning/10 px-4 py-3 text-sm text-foam">
          Este curso está fuera de borrador. Para editar unidades, lecciones o evaluaciones, primero pásalo a borrador.
        </div>
      ) : null}
      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <Tarjeta className="space-y-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="eyebrow">Unidades</p>
              <h2 className="mt-4 font-display text-2xl font-semibold text-foam">
                Mapa del curso
              </h2>
            </div>
            <span className="status-chip">{selectedCourse.units.length} unidades</span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              className="field-input flex-1"
              value={newUnitName}
              placeholder="Nombre de la nueva unidad"
              onChange={(event) => setNewUnitName(event.target.value)}
            />
            <Boton disabled={!isCourseEditable || isSyncingCms} onClick={handleCreateUnit}>
              Crear unidad
            </Boton>
          </div>

          <div className="grid gap-3">
            {selectedCourse.units.map((unit) => (
              <button
                key={unit.id}
                type="button"
                className={`rounded-2xl border px-4 py-4 text-left transition ${
                  unit.id === effectiveUnitId
                    ? 'border-primary/35 bg-primary/10'
                    : 'border-border/80 bg-white/5 hover:border-primary/25'
                }`}
                onClick={() => {
                  setSelectedUnitId(unit.id)
                  setSelectedLessonId(null)
                }}
              >
                <p className="font-semibold text-foam">{unit.title}</p>
                <p className="mt-2 text-sm text-mute">{unit.summary}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-mute">
                  {unit.lessons.length} lecciones
                </p>
              </button>
            ))}
          </div>
        </Tarjeta>

        {selectedUnit ? (
          <UnitEditor
            key={`${effectiveCourseId}-${effectiveUnitId ?? 'sin-unidad'}`}
            content={content}
            courseId={effectiveCourseId}
            unit={selectedUnit}
            assessment={selectedUnitAssessment}
            isEditable={isCourseEditable}
            isSyncing={isSyncingCms}
            onReplaceContent={(nextContent, meta) => {
              replaceContent(nextContent, meta)
              setStatusMessage('Unidad actualizada. Esperando confirmación de Firestore...')
            }}
            onDelete={() => {
              deleteUnit(effectiveCourseId, effectiveUnitId)
              setSelectedUnitId(null)
              setSelectedLessonId(null)
              setStatusMessage('Unidad eliminada del curso.')
            }}
          />
        ) : (
          <Tarjeta className="space-y-4">
            <p className="text-mute">Selecciona una unidad para editarla.</p>
          </Tarjeta>
        )}
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <Tarjeta className="space-y-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="eyebrow">Lecciones</p>
              <h2 className="mt-4 font-display text-2xl font-semibold text-foam">
                Editor de misión
              </h2>
            </div>
            <span className="status-chip">{selectedUnit?.lessons.length ?? 0} lecciones</span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              className="field-input flex-1"
              value={newLessonName}
              placeholder="Nombre de la nueva lección"
              onChange={(event) => setNewLessonName(event.target.value)}
            />
            <Boton disabled={!isCourseEditable || isSyncingCms} onClick={handleCreateLesson}>
              Crear lección
            </Boton>
          </div>

          <div className="grid gap-3">
            {(selectedUnit?.lessons ?? []).map((lesson) => (
              <button
                key={lesson.id}
                type="button"
                className={`rounded-2xl border px-4 py-4 text-left transition ${
                  lesson.id === effectiveLessonId
                    ? 'border-primary/35 bg-primary/10'
                    : 'border-border/80 bg-white/5 hover:border-primary/25'
                }`}
                onClick={() => setSelectedLessonId(lesson.id)}
              >
                <p className="font-semibold text-foam">{lesson.title}</p>
                <p className="mt-2 text-sm text-mute">{lesson.objective}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-mute">
                  {lesson.duration} / {lesson.xp} XP
                </p>
              </button>
            ))}
          </div>
        </Tarjeta>

        {selectedLesson ? (
          <LessonEditor
            key={effectiveLessonId}
            courseId={effectiveCourseId}
            unitId={effectiveUnitId}
            lesson={selectedLesson}
            isEditable={isCourseEditable}
            isSyncing={isSyncingCms}
            onSave={(courseId, unitId, lessonId, draft) => {
              updateLesson(courseId, unitId, lessonId, draft)
              setStatusMessage('Lección guardada. Esperando confirmación de Firestore...')
            }}
            onDelete={() => {
              deleteLesson(effectiveCourseId, effectiveUnitId, effectiveLessonId)
              setSelectedLessonId(null)
              setStatusMessage('Lección eliminada de la unidad.')
            }}
            onStatus={setStatusMessage}
          />
        ) : (
          <Tarjeta className="space-y-4">
            <p className="text-mute">Selecciona una lección para editarla.</p>
          </Tarjeta>
        )}
      </div>

      {selectedFinalAssessment && (
        <FinalAssessmentEditor
          key={`${effectiveCourseId}-final`}
          assessment={selectedFinalAssessment}
          isEditable={isCourseEditable}
          isSyncing={isSyncingCms}
          onSave={(draft) => {
            updateFinalAssessment(effectiveCourseId, draft)
            setStatusMessage('Evaluación final actualizada. Esperando confirmación de Firestore...')
          }}
        />
      )}
        </>
      ) : (
        <Tarjeta className="space-y-4">
          <p className="eyebrow">Siguiente paso</p>
          <p className="text-mute">
            Materializa primero este curso en el CMS y después se habilitan unidades,
            lecciones y evaluaciones finales en el mismo formato que usa `src/datos/cursos`.
          </p>
        </Tarjeta>
      )}
    </div>
  )
}
