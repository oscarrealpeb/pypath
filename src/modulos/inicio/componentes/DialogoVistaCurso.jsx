import { Boton } from '../../../componentes/Boton.jsx'
import { IconoCurso } from '../../../componentes/IconoCurso.jsx'
import { Modal } from '../../../componentes/Modal.jsx'

function getLessonCount(course) {
  return course.units.reduce((count, unit) => count + unit.lessons.length, 0)
}

function getLessonExerciseType(lesson) {
  if (Array.isArray(lesson.challenges) && lesson.challenges.length > 0) {
    return lesson.challenges.length === 1
      ? lesson.challenges[0]?.exerciseType || 'Ejercicio guiado'
      : 'Múltiples ejercicios'
  }

  return lesson.challenge?.exerciseType || 'Ejercicio guiado'
}

export function DialogoVistaCurso({
  courseMeta,
  courseData,
  isLoggedIn,
  onClose,
  onStart,
}) {
  if (!courseMeta) {
    return null
  }

  const isLive = courseMeta.status === 'live' && courseData
  const lessonCount = courseData ? getLessonCount(courseData) : 0

  return (
    <Modal open={Boolean(courseMeta)} onClose={onClose} size="xl">
      <div className="flex max-h-[88vh] flex-col">
        <div className="flex items-start justify-between gap-4 border-b border-border/80 px-6 py-5 lg:px-8">
          <div className="flex items-start gap-4">
            <IconoCurso courseId={courseMeta.id} size="lg" />
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="eyebrow">{courseMeta.library}</span>
                <span className="status-chip">{courseMeta.statusLabel}</span>
                <span className="status-chip">Intensidad {courseMeta.intensity.toLowerCase()}</span>
              </div>
              <div>
                <h2 className="font-display text-3xl font-semibold text-foam">
                  {courseMeta.title}
                </h2>
                <p className="mt-3 max-w-3xl text-mute">{courseMeta.description}</p>
              </div>
            </div>
          </div>

          <Boton variant="ghost" onClick={onClose}>
            Cerrar
          </Boton>
        </div>

        <div className="space-y-6 overflow-y-auto px-6 py-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-border/80 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-mute">Duración</p>
              <p className="mt-3 font-display text-xl font-semibold text-foam">
                {courseMeta.duration}
              </p>
            </div>
            <div className="rounded-2xl border border-border/80 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-mute">Unidades</p>
              <p className="mt-3 font-display text-xl font-semibold text-foam">
                {courseData?.units.length ?? 'Por definir'}
              </p>
            </div>
            <div className="rounded-2xl border border-border/80 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-mute">Lecciones</p>
              <p className="mt-3 font-display text-xl font-semibold text-foam">
                {courseData ? lessonCount : 'Por definir'}
              </p>
            </div>
            <div className="rounded-2xl border border-border/80 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-mute">Ideal para</p>
              <p className="mt-3 text-sm text-foam">{courseMeta.audience.join(' / ')}</p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-border/80 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-mute">Prerrequisitos</p>
              <p className="mt-3 text-sm text-mute">
                {courseMeta.prerequisites.length > 0
                  ? courseMeta.prerequisites.join(' / ')
                  : 'Ninguno'}
              </p>
            </div>
            <div className="rounded-2xl border border-border/80 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-mute">Después de este curso</p>
              <p className="mt-3 text-sm text-mute">
                {courseMeta.nextAfter.length > 0
                  ? courseMeta.nextAfter.join(' / ')
                  : 'Seguir profundizando con proyectos prácticos'}
              </p>
            </div>
          </div>

          {courseData ? (
            <div className="space-y-4">
              <div>
                <p className="eyebrow">Curso y unidades</p>
                <h3 className="mt-4 font-display text-2xl font-semibold text-foam">
                  Así está organizada la experiencia
                </h3>
              </div>

              <div className="grid gap-4">
                {courseData.units.map((unit, index) => (
                  <div
                    key={unit.id}
                    className="rounded-3xl border border-border/80 bg-panel-2/70 p-5"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="eyebrow">Unidad {index + 1}</span>
                          <span className="status-chip">{unit.lessons.length} lecciones</span>
                        </div>
                        <h4 className="mt-4 font-display text-2xl font-semibold text-foam">
                          {unit.title}
                        </h4>
                        <p className="mt-3 text-sm text-mute">{unit.summary}</p>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3">
                      {unit.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="rounded-2xl border border-border/70 bg-white/5 px-4 py-4"
                        >
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-semibold text-foam">{lesson.title}</span>
                            <span className="status-chip">{lesson.duration}</span>
                            <span className="status-chip">{getLessonExerciseType(lesson)}</span>
                          </div>
                          <p className="mt-2 text-sm text-mute">{lesson.objective}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-border/80 bg-panel-2/70 p-6">
              <p className="eyebrow">Curso en preparación</p>
              <h3 className="mt-4 font-display text-2xl font-semibold text-foam">
                Esta biblioteca aún no tiene unidades publicadas
              </h3>
              <p className="mt-3 max-w-3xl text-mute">
                Ya puedes revisar el enfoque, sus prerrequisitos y el tipo de perfil al que apunta, pero las unidades aparecerán aquí cuando publiquemos el curso.
              </p>
            </div>
          )}

          {!isLoggedIn && (
            <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4 text-sm text-mute">
              Puedes explorar la estructura libremente. Solo te pediremos iniciar sesión o crear cuenta cuando decidas empezar el curso.
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 border-t border-border/80 px-6 py-5 sm:flex-row sm:justify-end lg:px-8">
          <Boton variant="ghost" onClick={onClose}>
            Seguir explorando
          </Boton>
          <Boton onClick={onStart} disabled={!isLive}>
            {isLive
              ? isLoggedIn
                ? 'Empezar este curso'
                : 'Empezar'
              : 'Curso en preparación'}
          </Boton>
        </div>
      </div>
    </Modal>
  )
}

