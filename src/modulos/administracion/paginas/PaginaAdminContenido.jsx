import { startTransition, useMemo, useState } from 'react'
import { Boton } from '../../../componentes/Boton.jsx'
import { Tarjeta } from '../../../componentes/Tarjeta.jsx'
import {
  construirBorradorEvaluacion,
  construirBorradorCurso,
  construirBorradorLeccion,
  actualizarEvaluacionUnidadEnContenido,
  actualizarUnidadEnContenido,
} from '../servicios/servicioAdminContenido.js'
import { useAccionesApp, useEstadoApp } from '../../progreso/contexto/useEstadoApp.js'

function getStatusOptions() {
  return [
    { value: 'draft', label: 'Borrador' },
    { value: 'live', label: 'Disponible ahora' },
    { value: 'soon', label: 'En cola' },
  ]
}

function findCourse(content, courseId) {
  return content.cursos.find((course) => course.id === courseId) ?? null
}

function findCourseMeta(content, courseId) {
  return content.catalogoCursos.find((course) => course.id === courseId) ?? null
}

function findUnit(content, courseId, unitId) {
  return findCourse(content, courseId)?.units.find((unit) => unit.id === unitId) ?? null
}

function findLesson(content, courseId, unitId, lessonId) {
  return (
    findUnit(content, courseId, unitId)?.lessons.find((lesson) => lesson.id === lessonId) ?? null
  )
}

function CourseEditor({
  course,
  meta,
  onSave,
  onTogglePublication,
}) {
  const [draft, setDraft] = useState(() => construirBorradorCurso(course, meta))

  return (
    <Tarjeta className="space-y-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="eyebrow">Curso seleccionado</p>
          <h2 className="mt-4 font-display text-2xl font-semibold text-foam">{course.title}</h2>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Boton variant="secondary" onClick={() => onSave(draft)}>
            Guardar curso
          </Boton>
          <Boton onClick={onTogglePublication}>
            {meta.status === 'live' ? 'Pasar a borrador' : 'Publicar curso'}
          </Boton>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-foam">Título</span>
          <input
            className="field-input"
            value={draft.title}
            onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-foam">Biblioteca</span>
          <input
            className="field-input"
            value={draft.library}
            onChange={(event) => setDraft((current) => ({ ...current, library: event.target.value }))}
          />
        </label>
        <label className="block space-y-2 lg:col-span-2">
          <span className="text-sm font-medium text-foam">Resumen del curso</span>
          <textarea
            className="field-input min-h-28"
            value={draft.summary}
            onChange={(event) => setDraft((current) => ({ ...current, summary: event.target.value }))}
          />
        </label>
        <label className="block space-y-2 lg:col-span-2">
          <span className="text-sm font-medium text-foam">Descripción de la tarjeta</span>
          <textarea
            className="field-input min-h-24"
            value={draft.description}
            onChange={(event) =>
              setDraft((current) => ({ ...current, description: event.target.value }))
            }
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-foam">Dificultad visible</span>
          <input
            className="field-input"
            value={draft.difficulty}
            onChange={(event) =>
              setDraft((current) => ({ ...current, difficulty: event.target.value }))
            }
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-foam">Duración</span>
          <input
            className="field-input"
            value={draft.duration}
            onChange={(event) => setDraft((current) => ({ ...current, duration: event.target.value }))}
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-foam">Intensidad</span>
          <input
            className="field-input"
            value={draft.intensity}
            onChange={(event) =>
              setDraft((current) => ({ ...current, intensity: event.target.value }))
            }
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-foam">Estado</span>
          <select
            className="field-input"
            value={draft.status}
            onChange={(event) => setDraft((current) => ({ ...current, status: event.target.value }))}
          >
            {getStatusOptions().map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-foam">Etiqueta de estado</span>
          <input
            className="field-input"
            value={draft.statusLabel}
            onChange={(event) =>
              setDraft((current) => ({ ...current, statusLabel: event.target.value }))
            }
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-foam">Orden recomendado</span>
          <input
            className="field-input"
            value={draft.recommendedOrder}
            onChange={(event) =>
              setDraft((current) => ({ ...current, recommendedOrder: event.target.value }))
            }
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-foam">Prerrequisitos (IDs)</span>
          <input
            className="field-input"
            value={draft.requiredCourseIdsText}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                requiredCourseIdsText: event.target.value,
              }))
            }
          />
        </label>
        <label className="block space-y-2 lg:col-span-2">
          <span className="text-sm font-medium text-foam">Ideal para (una línea por público)</span>
          <textarea
            className="field-input min-h-24"
            value={draft.audienceText}
            onChange={(event) =>
              setDraft((current) => ({ ...current, audienceText: event.target.value }))
            }
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-foam">Prerrequisitos visibles</span>
          <textarea
            className="field-input min-h-24"
            value={draft.prerequisitesText}
            onChange={(event) =>
              setDraft((current) => ({ ...current, prerequisitesText: event.target.value }))
            }
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-foam">Después de este curso</span>
          <textarea
            className="field-input min-h-24"
            value={draft.nextAfterText}
            onChange={(event) =>
              setDraft((current) => ({ ...current, nextAfterText: event.target.value }))
            }
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-foam">Tags de rol</span>
          <input
            className="field-input"
            value={draft.personaTagsText}
            onChange={(event) =>
              setDraft((current) => ({ ...current, personaTagsText: event.target.value }))
            }
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-foam">Tags de interés</span>
          <input
            className="field-input"
            value={draft.interestTagsText}
            onChange={(event) =>
              setDraft((current) => ({ ...current, interestTagsText: event.target.value }))
            }
          />
        </label>
        <label className="block space-y-2 lg:col-span-2">
          <span className="text-sm font-medium text-foam">Pitch del catálogo</span>
          <textarea
            className="field-input min-h-24"
            value={draft.pitch}
            onChange={(event) => setDraft((current) => ({ ...current, pitch: event.target.value }))}
          />
        </label>
      </div>
    </Tarjeta>
  )
}

function UnitEditor({
  content,
  courseId,
  unit,
  assessment,
  onReplaceContent,
  onDelete,
}) {
  const [unitDraft, setUnitDraft] = useState({
    title: unit.title,
    summary: unit.summary,
  })
  const [assessmentDraft, setAssessmentDraft] = useState(() => construirBorradorEvaluacion(assessment))

  function handleSave() {
    const contentAfterUnit = actualizarUnidadEnContenido(content, courseId, unit.id, unitDraft)
    const contentAfterAssessment = actualizarEvaluacionUnidadEnContenido(
      contentAfterUnit,
      courseId,
      unit.id,
      assessmentDraft,
    )

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
          <Boton variant="secondary" onClick={handleSave}>
            Guardar unidad
          </Boton>
          <Boton variant="ghost" onClick={onDelete}>
            Eliminar unidad
          </Boton>
        </div>
      </div>

      <div className="grid gap-4">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-foam">Título de la unidad</span>
          <input
            className="field-input"
            value={unitDraft.title}
            onChange={(event) =>
              setUnitDraft((current) => ({ ...current, title: event.target.value }))
            }
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-foam">Resumen de la unidad</span>
          <textarea
            className="field-input min-h-24"
            value={unitDraft.summary}
            onChange={(event) =>
              setUnitDraft((current) => ({ ...current, summary: event.target.value }))
            }
          />
        </label>
      </div>

      <div className="rounded-3xl border border-border/80 bg-white/5 p-5">
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
          <label className="block space-y-2">
            <span className="text-sm font-medium text-foam">Título</span>
            <input
              className="field-input"
              value={assessmentDraft.title}
              onChange={(event) =>
                setAssessmentDraft((current) => ({ ...current, title: event.target.value }))
              }
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-foam">Resumen</span>
            <textarea
              className="field-input min-h-24"
              value={assessmentDraft.summary}
              onChange={(event) =>
                setAssessmentDraft((current) => ({ ...current, summary: event.target.value }))
              }
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-foam">Puntaje mínimo</span>
              <input
                className="field-input"
                value={assessmentDraft.passingScore}
                onChange={(event) =>
                  setAssessmentDraft((current) => ({
                    ...current,
                    passingScore: event.target.value,
                  }))
                }
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-foam">Mensaje de éxito</span>
              <input
                className="field-input"
                value={assessmentDraft.successMessage}
                onChange={(event) =>
                  setAssessmentDraft((current) => ({
                    ...current,
                    successMessage: event.target.value,
                  }))
                }
              />
            </label>
          </div>
        </div>
      </div>
    </Tarjeta>
  )
}

function LessonEditor({ courseId, unitId, lesson, onSave, onDelete, onStatus }) {
  const [draft, setDraft] = useState(() => construirBorradorLeccion(lesson))

  function setDraftField(field, value) {
    setDraft((current) => ({ ...current, [field]: value }))
  }

  async function handleImageUpload(event) {
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
          <Boton variant="secondary" onClick={() => onSave(courseId, unitId, lesson.id, draft)}>
            Guardar lección
          </Boton>
          <Boton variant="ghost" onClick={onDelete}>
            Eliminar lección
          </Boton>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-foam">Título</span>
          <input className="field-input" value={draft.title} onChange={(event) => setDraftField('title', event.target.value)} />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-foam">Duración</span>
          <input className="field-input" value={draft.duration} onChange={(event) => setDraftField('duration', event.target.value)} />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-foam">XP</span>
          <input className="field-input" value={draft.xp} onChange={(event) => setDraftField('xp', event.target.value)} />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-foam">Modo de ejecución</span>
          <select className="field-input" value={draft.runtimeMode} onChange={(event) => setDraftField('runtimeMode', event.target.value)}>
            <option value="guided">Guiado</option>
            <option value="python">Python real</option>
          </select>
        </label>
        <label className="block space-y-2 lg:col-span-2">
          <span className="text-sm font-medium text-foam">Objetivo</span>
          <textarea className="field-input min-h-24" value={draft.objective} onChange={(event) => setDraftField('objective', event.target.value)} />
        </label>
      </div>

      <div className="rounded-3xl border border-border/80 bg-white/5 p-5">
        <div className="space-y-4">
          <div>
            <p className="eyebrow">Video y apoyo</p>
            <h3 className="mt-3 font-display text-xl font-semibold text-foam">Recursos</h3>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-foam">Título del video</span>
              <input className="field-input" value={draft.videoTitle} onChange={(event) => setDraftField('videoTitle', event.target.value)} />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-foam">URL embed de YouTube</span>
              <input className="field-input" value={draft.videoUrl} onChange={(event) => setDraftField('videoUrl', event.target.value)} />
            </label>
            <label className="block space-y-2 lg:col-span-2">
              <span className="text-sm font-medium text-foam">Documentación (Etiqueta | URL por línea)</span>
              <textarea className="field-input min-h-28" value={draft.documentationLinksText} onChange={(event) => setDraftField('documentationLinksText', event.target.value)} />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-foam">Título del ejemplo</span>
              <input className="field-input" value={draft.exampleTitle} onChange={(event) => setDraftField('exampleTitle', event.target.value)} />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-foam">Imagen de apoyo (URL)</span>
              <input className="field-input" value={draft.imageUrl} onChange={(event) => setDraftField('imageUrl', event.target.value)} />
            </label>
            <label className="block space-y-2 lg:col-span-2">
              <span className="text-sm font-medium text-foam">Subir imagen de apoyo</span>
              <input
                className="field-input file:mr-4 file:rounded-full file:border-0 file:bg-primary/15 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
            <label className="block space-y-2 lg:col-span-2">
              <span className="text-sm font-medium text-foam">Código de ejemplo</span>
              <textarea className="field-input min-h-40 font-mono text-sm" value={draft.exampleCode} onChange={(event) => setDraftField('exampleCode', event.target.value)} />
            </label>
            <label className="block space-y-2 lg:col-span-2">
              <span className="text-sm font-medium text-foam">Nota de apoyo</span>
              <textarea className="field-input min-h-24" value={draft.supportNote} onChange={(event) => setDraftField('supportNote', event.target.value)} />
            </label>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-border/80 bg-white/5 p-5">
        <div className="space-y-4">
          <div>
            <p className="eyebrow">Instrucciones</p>
            <h3 className="mt-3 font-display text-xl font-semibold text-foam">Contexto</h3>
          </div>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-foam">Overview</span>
            <textarea className="field-input min-h-24" value={draft.instructionsOverview} onChange={(event) => setDraftField('instructionsOverview', event.target.value)} />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-foam">Pasos (uno por línea)</span>
            <textarea className="field-input min-h-28" value={draft.instructionsStepsText} onChange={(event) => setDraftField('instructionsStepsText', event.target.value)} />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-foam">Pista</span>
            <textarea className="field-input min-h-20" value={draft.instructionsHint} onChange={(event) => setDraftField('instructionsHint', event.target.value)} />
          </label>
        </div>
      </div>

      <div className="rounded-3xl border border-border/80 bg-white/5 p-5">
        <div className="space-y-4">
          <div>
            <p className="eyebrow">Reto</p>
            <h3 className="mt-3 font-display text-xl font-semibold text-foam">Challenge</h3>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-foam">Tipo de ejercicio</span>
              <input className="field-input" value={draft.exerciseType} onChange={(event) => setDraftField('exerciseType', event.target.value)} />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-foam">Título del reto</span>
              <input className="field-input" value={draft.challengeTitle} onChange={(event) => setDraftField('challengeTitle', event.target.value)} />
            </label>
            <label className="block space-y-2 lg:col-span-2">
              <span className="text-sm font-medium text-foam">Prompt</span>
              <textarea className="field-input min-h-24" value={draft.prompt} onChange={(event) => setDraftField('prompt', event.target.value)} />
            </label>
            <label className="block space-y-2 lg:col-span-2">
              <span className="text-sm font-medium text-foam">Starter code</span>
              <textarea className="field-input min-h-40 font-mono text-sm" value={draft.starterCode} onChange={(event) => setDraftField('starterCode', event.target.value)} />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-foam">Keywords (coma)</span>
              <input className="field-input" value={draft.expectedKeywordsText} onChange={(event) => setDraftField('expectedKeywordsText', event.target.value)} />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-foam">Resultado esperado</span>
              <input className="field-input" value={draft.expectedResult} onChange={(event) => setDraftField('expectedResult', event.target.value)} />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-foam">Salida guiada</span>
              <input className="field-input" value={draft.salidaGuiada} onChange={(event) => setDraftField('salidaGuiada', event.target.value)} />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-foam">Criterio de éxito</span>
              <textarea className="field-input min-h-24" value={draft.successCriteria} onChange={(event) => setDraftField('successCriteria', event.target.value)} />
            </label>
            <label className="block space-y-2 lg:col-span-2">
              <span className="text-sm font-medium text-foam">Nota de ejecución</span>
              <textarea className="field-input min-h-24" value={draft.executionNote} onChange={(event) => setDraftField('executionNote', event.target.value)} />
            </label>
            <label className="block space-y-2 lg:col-span-2">
              <span className="text-sm font-medium text-foam">Mensaje de éxito</span>
              <textarea className="field-input min-h-24" value={draft.successMessage} onChange={(event) => setDraftField('successMessage', event.target.value)} />
            </label>
          </div>
        </div>
      </div>
    </Tarjeta>
  )
}

function FinalAssessmentEditor({ assessment, onSave }) {
  const [draft, setDraft] = useState(() => construirBorradorEvaluacion(assessment))

  return (
    <Tarjeta className="space-y-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="eyebrow">Evaluación final</p>
          <h2 className="mt-4 font-display text-2xl font-semibold text-foam">Cierre del curso</h2>
        </div>
        <Boton variant="secondary" onClick={() => onSave(draft)}>
          Guardar evaluación final
        </Boton>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <label className="block space-y-2 lg:col-span-2">
          <span className="text-sm font-medium text-foam">Título</span>
          <input className="field-input" value={draft.title} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} />
        </label>
        <label className="block space-y-2 lg:col-span-2">
          <span className="text-sm font-medium text-foam">Resumen</span>
          <textarea className="field-input min-h-24" value={draft.summary} onChange={(event) => setDraft((current) => ({ ...current, summary: event.target.value }))} />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-foam">Puntaje mínimo</span>
          <input className="field-input" value={draft.passingScore} onChange={(event) => setDraft((current) => ({ ...current, passingScore: event.target.value }))} />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-foam">Preguntas base</span>
          <input className="field-input" disabled value={assessment.questions.length} />
        </label>
        <label className="block space-y-2 lg:col-span-2">
          <span className="text-sm font-medium text-foam">Mensaje de éxito</span>
          <textarea className="field-input min-h-24" value={draft.successMessage} onChange={(event) => setDraft((current) => ({ ...current, successMessage: event.target.value }))} />
        </label>
      </div>
    </Tarjeta>
  )
}

export function PaginaAdminContenido() {
  const { content } = useEstadoApp()
  const {
    createCourse,
    createLesson,
    createUnit,
    deleteLesson,
    deleteUnit,
    replaceContent,
    toggleCoursePublication,
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

  const orderedCatalog = useMemo(
    () =>
      [...content.catalogoCursos].sort(
        (left, right) => (left.recommendedOrder ?? 0) - (right.recommendedOrder ?? 0),
      ),
    [content.catalogoCursos],
  )
  const effectiveCourseId =
    selectedCourseId && findCourse(content, selectedCourseId)
      ? selectedCourseId
      : orderedCatalog[0]?.id ?? null
  const selectedCourse = findCourse(content, effectiveCourseId)
  const selectedMeta = findCourseMeta(content, effectiveCourseId)
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

  function handleCreateCourse() {
    if (!newCourseName.trim()) {
      return
    }

    const courseId = createCourse(newCourseName.trim())
    setSelectedCourseId(courseId)
    setSelectedUnitId(null)
    setSelectedLessonId(null)
    setNewCourseName('')
    setStatusMessage('Curso creado. Ya puedes editarlo y publicarlo.')
  }

  function handleCreateUnit() {
    if (!effectiveCourseId || !newUnitName.trim()) {
      return
    }

    const unitId = createUnit(effectiveCourseId, newUnitName.trim())
    setSelectedUnitId(unitId)
    setSelectedLessonId(null)
    setNewUnitName('')
    setStatusMessage('Unidad creada dentro del curso.')
  }

  function handleCreateLesson() {
    if (!effectiveCourseId || !effectiveUnitId || !newLessonName.trim()) {
      return
    }

    const lessonId = createLesson(effectiveCourseId, effectiveUnitId, newLessonName.trim())
    setSelectedLessonId(lessonId)
    setNewLessonName('')
    setStatusMessage('Lección creada y lista para edición.')
  }

  if (!selectedCourse || !selectedMeta) {
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
          <p className="max-w-3xl text-lg leading-8 text-mute">
            Aquí queda resuelta la HU-16: puedes crear y publicar contenido, editar videos,
            documentación, ejemplos, retos e imágenes de apoyo sin tocar los archivos fuente.
          </p>
        </div>

      </Tarjeta>

      {statusMessage && (
        <div className="rounded-2xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-foam">
          {statusMessage}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <Tarjeta className="space-y-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="eyebrow">Catálogo</p>
              <h2 className="mt-4 font-display text-2xl font-semibold text-foam">Cursos editables</h2>
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
            <Boton onClick={handleCreateCourse}>Crear curso</Boton>
          </div>

          <div className="grid gap-3">
            {orderedCatalog.map((course) => (
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
                }}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="eyebrow">{course.library}</span>
                  <span className="status-chip">{course.statusLabel}</span>
                </div>
                <p className="mt-3 font-semibold text-foam">{course.title}</p>
                <p className="mt-2 text-sm text-mute">{course.description}</p>
              </button>
            ))}
          </div>
        </Tarjeta>

        <CourseEditor
          key={effectiveCourseId}
          course={selectedCourse}
          meta={selectedMeta}
          onSave={(draft) => {
            updateCourse(effectiveCourseId, draft)
            setStatusMessage('Curso actualizado en el CMS local.')
          }}
          onTogglePublication={() => {
            toggleCoursePublication(effectiveCourseId)
            setStatusMessage(
              selectedMeta.status === 'live'
                ? 'Curso movido a borrador.'
                : 'Curso publicado en el catálogo.',
            )
          }}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <Tarjeta className="space-y-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="eyebrow">Unidades</p>
              <h2 className="mt-4 font-display text-2xl font-semibold text-foam">Mapa del curso</h2>
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
            <Boton onClick={handleCreateUnit}>Crear unidad</Boton>
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

        {selectedUnit && selectedUnitAssessment ? (
          <UnitEditor
            key={effectiveUnitId}
            content={content}
            courseId={effectiveCourseId}
            unit={selectedUnit}
            assessment={selectedUnitAssessment}
            onReplaceContent={(nextContent, meta) => {
              replaceContent(nextContent, meta)
              setStatusMessage('Unidad y evaluación de unidad actualizadas.')
            }}
            onDelete={() => {
              deleteUnit(effectiveCourseId, effectiveUnitId)
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
              <h2 className="mt-4 font-display text-2xl font-semibold text-foam">Editor de misión</h2>
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
            <Boton onClick={handleCreateLesson}>Crear lección</Boton>
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
            onSave={(courseId, unitId, lessonId, draft) => {
              updateLesson(courseId, unitId, lessonId, draft)
              setStatusMessage('Lección guardada con su contenido y reto.')
            }}
            onDelete={() => {
              deleteLesson(effectiveCourseId, effectiveUnitId, effectiveLessonId)
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
          onSave={(draft) => {
            updateFinalAssessment(effectiveCourseId, draft)
            setStatusMessage('Evaluación final actualizada.')
          }}
        />
      )}
    </div>
  )
}
