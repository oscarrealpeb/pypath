import { useNavigate, useParams } from 'react-router-dom'
import { Boton } from '../../../componentes/Boton.jsx'
import { Tarjeta } from '../../../componentes/Tarjeta.jsx'
import { BarraProgreso } from '../../../componentes/BarraProgreso.jsx'
import { combinarClases } from '../../../utilidades/combinarClases.js'
import { obtenerRutaEvaluacionDesdePaso } from '../../evaluaciones/selectores/selectoresEvaluaciones.js'
import { EspacioReto } from '../../retos/componentes/EspacioReto.jsx'
import { obtenerRegistroLeccion } from '../../cursos/selectores/selectoresCursos.js'
import { useEstadoApp } from '../../progreso/contexto/useEstadoApp.js'
import {
  obtenerSiguientePasoCurso,
  leccionEstaCompletada,
  leccionEstaDesbloqueada,
} from '../../progreso/selectores/selectoresProgreso.js'

const DISPOSICIONES_BLOQUE_APOYO = new Set(['arriba', 'izquierda', 'derecha'])
const CLASES_COLUMNAS_GALERIA = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4',
}

function obtenerImagenesGaleria(block) {
  return Array.isArray(block.imagenes)
    ? block.imagenes.filter((image) => image?.imageUrl)
    : []
}

function obtenerBloquesApoyo(resources, lessonTitle) {
  const blocks = Array.isArray(resources.bloquesApoyo)
    ? resources.bloquesApoyo.filter(
        (block) =>
          block &&
          (block.imageUrl ||
            block.contenido ||
            block.titulo ||
            block.puntos?.length ||
            obtenerImagenesGaleria(block).length > 0),
      )
    : []

  if (blocks.length > 0) {
    return blocks
  }

  if (resources.imageUrl) {
    return [
      {
        id: `${lessonTitle}-captura-principal`,
        tipo: 'imagen',
        disposicion: 'arriba',
        titulo: 'Apoyo visual',
        imageUrl: resources.imageUrl,
        imageAlt: `Apoyo visual de ${lessonTitle}`,
      },
    ]
  }

  return []
}

function BloqueApoyo({ block, lessonTitle }) {
  const hasImage = Boolean(block.imageUrl)
  const hasText = Boolean(block.titulo || block.contenido || block.puntos?.length)
  const hasCaption = Boolean(block.leyenda)
  const galleryImages = obtenerImagenesGaleria(block)
  const isGallery = block.tipo === 'galeria' && galleryImages.length > 0
  const disposition = DISPOSICIONES_BLOQUE_APOYO.has(block.disposicion)
    ? block.disposicion
    : 'arriba'
  const imageAlt = block.imageAlt || `Apoyo visual de ${lessonTitle}`

  if (!hasImage && !hasText && !hasCaption && !isGallery) {
    return null
  }

  if (isGallery) {
    const columnas = Math.min(Math.max(Number(block.columnas) || 2, 1), 4)
    const galleryClasses = CLASES_COLUMNAS_GALERIA[columnas] ?? CLASES_COLUMNAS_GALERIA[2]

    return (
      <div className="space-y-4 rounded-2xl border border-border/80 bg-panel-2/70 p-4 md:p-5">
        {(block.etiqueta || block.titulo || block.contenido) && (
          <div className="space-y-3">
            {block.etiqueta && <p className="eyebrow">{block.etiqueta}</p>}
            {block.titulo && (
              <h3 className="font-display text-xl font-semibold text-foam">{block.titulo}</h3>
            )}
            {block.contenido && (
              <p className="whitespace-pre-line text-sm leading-7 text-mute">{block.contenido}</p>
            )}
          </div>
        )}

        <div className={combinarClases('grid gap-4', galleryClasses)}>
          {galleryImages.map((image, index) => (
            <div
              key={image.id || `${block.id || lessonTitle}-imagen-${index + 1}`}
              className="space-y-3"
            >
              <div className="overflow-hidden rounded-2xl border border-border/80 bg-black/30">
                <img
                  src={image.imageUrl}
                  alt={image.imageAlt || `Captura ${index + 1} de ${lessonTitle}`}
                  className="h-auto w-full object-cover"
                />
              </div>
              {(image.titulo || image.leyenda) && (
                <div className="space-y-1">
                  {image.titulo && <p className="text-sm font-medium text-foam">{image.titulo}</p>}
                  {image.leyenda && <p className="text-sm leading-6 text-mute">{image.leyenda}</p>}
                </div>
              )}
            </div>
          ))}
        </div>

        {Array.isArray(block.puntos) && block.puntos.length > 0 && (
          <ul className="space-y-2">
            {block.puntos.map((point) => (
              <li
                key={point}
                className="rounded-2xl border border-border/60 bg-black/10 px-4 py-3 text-sm text-mute"
              >
                {point}
              </li>
            ))}
          </ul>
        )}

        {block.leyenda && (
          <p className="text-xs uppercase tracking-[0.2em] text-mute">{block.leyenda}</p>
        )}
      </div>
    )
  }

  const imagePanel = hasImage ? (
    <div className="overflow-hidden rounded-2xl border border-border/80 bg-black/30">
      <img src={block.imageUrl} alt={imageAlt} className="h-auto w-full object-cover" />
    </div>
  ) : null

  const textPanel = hasText || hasCaption ? (
    <div className="space-y-3">
      {block.etiqueta && <p className="eyebrow">{block.etiqueta}</p>}
      {block.titulo && (
        <h3 className="font-display text-xl font-semibold text-foam">{block.titulo}</h3>
      )}
      {block.contenido && <p className="whitespace-pre-line text-sm leading-7 text-mute">{block.contenido}</p>}
      {Array.isArray(block.puntos) && block.puntos.length > 0 && (
        <ul className="space-y-2">
          {block.puntos.map((point) => (
            <li key={point} className="rounded-2xl border border-border/60 bg-black/10 px-4 py-3 text-sm text-mute">
              {point}
            </li>
          ))}
        </ul>
      )}
      {block.leyenda && <p className="text-xs uppercase tracking-[0.2em] text-mute">{block.leyenda}</p>}
    </div>
  ) : null

  if (!hasImage) {
    return <div className="rounded-2xl border border-border/80 bg-panel-2/70 p-5">{textPanel}</div>
  }

  if (!hasText && hasImage) {
    return (
      <div className="space-y-3 rounded-2xl border border-border/80 bg-panel-2/70 p-4">
        {imagePanel}
        {block.leyenda && <p className="text-sm text-mute">{block.leyenda}</p>}
      </div>
    )
  }

  if (disposition === 'izquierda' || disposition === 'derecha') {
    return (
      <div className="rounded-2xl border border-border/80 bg-panel-2/70 p-4 md:p-5">
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className={combinarClases(disposition === 'derecha' && 'lg:order-2')}>{imagePanel}</div>
          <div>{textPanel}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 rounded-2xl border border-border/80 bg-panel-2/70 p-4 md:p-5">
      {imagePanel}
      {textPanel}
    </div>
  )
}

export function PaginaLeccion() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { progress, onboarding } = useEstadoApp()
  const record = obtenerRegistroLeccion(id)

  if (!record) {
    return (
      <Tarjeta className="text-center">
        <p className="eyebrow">Lección no encontrada</p>
        <h1 className="mt-5 font-display text-3xl font-semibold text-foam">
          No pudimos encontrar esa misión
        </h1>
      </Tarjeta>
    )
  }

  const completed = leccionEstaCompletada(progress.completedLessons, record.lesson.id)
  const unlocked = leccionEstaDesbloqueada(
    progress.completedLessons,
    progress.completedUnitAssessments,
    progress.completedCourseAssessments,
    record.lesson.id,
    onboarding.assessmentResult,
  )

  if (!unlocked && !completed) {
    return (
      <Tarjeta className="space-y-5 text-center">
        <p className="eyebrow">Misión bloqueada</p>
        <h1 className="font-display text-3xl font-semibold text-foam">
          Completa el paso anterior para entrar aquí
        </h1>
        <p className="text-mute">
          El sistema ahora desbloquea cada unidad con su propia evaluación, así que debes avanzar en orden.
        </p>
        <Boton onClick={() => navigate(`/course/${record.course.id}`)}>Volver al curso</Boton>
      </Tarjeta>
    )
  }

  const completionProgress = {
    ...progress,
    assessmentResult: onboarding.assessmentResult,
    completedLessons: progress.completedLessons.includes(record.lesson.id)
      ? progress.completedLessons
      : [...progress.completedLessons, record.lesson.id],
  }
  const nextStepAfterCompletion = obtenerSiguientePasoCurso(record.course.id, completionProgress)

  const resources = record.lesson.resources
  const documentationLinks = resources.documentationLinks ?? []
  const supportBlocks = obtenerBloquesApoyo(resources, record.lesson.title)
  const hasVideo = Boolean(resources.videoUrl)
  const hasExample = Boolean(resources.exampleCode?.trim())
  const hasSupportResources =
    hasVideo ||
    Boolean(resources.supportNote?.trim()) ||
    documentationLinks.length > 0 ||
    supportBlocks.length > 0

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="eyebrow">
            {record.course.title} / {record.unit.title}
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-foam">
            {record.lesson.title}
          </h1>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-mute">{record.lesson.objective}</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Boton variant="ghost" onClick={() => navigate(`/course/${record.course.id}`)}>
            Volver al curso
          </Boton>
          {completed && nextStepAfterCompletion && (
            <Boton onClick={() => navigate(obtenerRutaEvaluacionDesdePaso(nextStepAfterCompletion))}>
              {nextStepAfterCompletion.label}
            </Boton>
          )}
        </div>
      </div>

      <Tarjeta className="space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="status-chip">
            Misión {record.lessonIndex + 1} de {record.totalLessons}
          </span>
          <span className="status-chip">{record.lesson.duration}</span>
          <span className="status-chip">{record.lesson.xp} XP</span>
          <span className="status-chip">{record.lesson.challenge.exerciseType}</span>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-mute">Brief</p>
          <p className="mt-3 text-mute">{record.lesson.instructions.overview}</p>
        </div>

        <BarraProgreso
          value={record.lessonIndex + (completed ? 1 : 0)}
          total={record.totalLessons}
          label="Progreso dentro del curso"
        />
      </Tarjeta>

      {hasSupportResources && (
        <Tarjeta className="space-y-5">
          <div>
            <p className="eyebrow">Recursos de apoyo</p>
            <h2 className="mt-4 font-display text-2xl font-semibold text-foam">
              Aprende antes de resolver
            </h2>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {hasVideo && <span className="status-chip">Video de apoyo</span>}
              {supportBlocks.length > 0 && (
                <span className="status-chip">
                  {supportBlocks.length} bloque{supportBlocks.length === 1 ? '' : 's'} visual
                </span>
              )}
              {documentationLinks.length > 0 && <span className="status-chip">Documentación útil</span>}
            </div>
          </div>

          {hasVideo && (
            <>
              <div>
                <p className="text-base font-medium text-foam">
                  {resources.videoTitle || 'Video de apoyo'}
                </p>
                <p className="mt-2 text-sm leading-7 text-mute">
                  Usa el video solo cuando aporte contexto real. Si la lección funciona mejor con capturas y texto, también está bien.
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-border/80 bg-black">
                <div className="aspect-video">
                  <iframe
                    className="h-full w-full"
                    src={resources.videoUrl}
                    title={resources.videoTitle || `Video de ${record.lesson.title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </>
          )}

          {resources.supportNote?.trim() && (
            <div className="rounded-2xl border border-border/80 bg-white/5 p-4 text-sm text-mute">
              {resources.supportNote}
            </div>
          )}

          {supportBlocks.length > 0 && (
            <div className="space-y-4">
              {supportBlocks.map((block) => (
                <BloqueApoyo
                  key={block.id || `${record.lesson.id}-${block.titulo || block.imageUrl || 'bloque'}`}
                  block={block}
                  lessonTitle={record.lesson.title}
                />
              ))}
            </div>
          )}

          {documentationLinks.length > 0 && (
            <div className="space-y-3">
              {documentationLinks.map((resource) => (
                <a
                  key={resource.url}
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-border/80 bg-panel-2/70 px-4 py-4 text-sm transition hover:border-primary/30 hover:bg-panel/80"
                >
                  <span className="text-foam">{resource.label}</span>
                  <span className="text-primary">Abrir</span>
                </a>
              ))}
            </div>
          )}
        </Tarjeta>
      )}

      {hasExample && (
        <Tarjeta className="space-y-4">
          <div>
            <p className="eyebrow">{resources.exampleTitle || 'Ejemplo guiado'}</p>
            <h2 className="mt-4 font-display text-2xl font-semibold text-foam">Referencia rápida</h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border/80 bg-obsidian/90 p-4">
            <pre className="whitespace-pre-wrap font-mono text-sm text-foam">
              {resources.exampleCode}
            </pre>
          </div>
        </Tarjeta>
      )}

      <Tarjeta className="space-y-4">
        <h2 className="font-display text-2xl font-semibold text-foam">Instrucciones</h2>
        <div className="space-y-3">
          {(record.lesson.instructions.steps ?? []).map((step, index) => (
            <div
              key={step}
              className="flex items-start gap-3 rounded-2xl border border-border/70 bg-panel-2/70 p-4"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-sm font-semibold text-primary">
                {index + 1}
              </span>
              <p className="text-sm leading-7 text-mute">{step}</p>
            </div>
          ))}
        </div>
      </Tarjeta>

      {record.lesson.instructions.hint?.trim() && (
        <Tarjeta className="space-y-4">
          <h2 className="font-display text-2xl font-semibold text-foam">Pista útil</h2>
          <p className="text-mute">{record.lesson.instructions.hint}</p>
        </Tarjeta>
      )}

      <EspacioReto
        key={record.lesson.id}
        lesson={record.lesson}
        completionStep={nextStepAfterCompletion}
        courseId={record.course.id}
        isCompleted={completed}
      />
    </div>
  )
}
