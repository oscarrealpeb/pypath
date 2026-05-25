import { obtenerCatalogoCursos } from '../../contenido/servicios/repositorioContenido.js'
import { obtenerProgresoCurso } from '../../cursos/selectores/selectoresCursos.js'
import { obtenerEstadisticasGamificadas } from '../../progreso/selectores/selectoresProgreso.js'

function esReciente(dateValue, days = 7) {
  if (!dateValue) {
    return false
  }

  const date = new Date(dateValue)
  const threshold = Date.now() - days * 24 * 60 * 60 * 1000
  return Number.isFinite(date.getTime()) && date.getTime() >= threshold
}

function normalizarEstadoCuenta(status) {
  return status === 'disabled' ? 'Deshabilitada' : 'Activa'
}

function normalizarRolSistema(systemRole) {
  return systemRole === 'admin' ? 'Administrador' : 'Estudiante'
}

function normalizarProveedor(provider) {
  return provider === 'google' ? 'Google' : 'Correo'
}

function construirIndiceCursos(catalog = []) {
  return Object.fromEntries(catalog.map((course) => [course.id, course.title]))
}

function resolverTituloCurso(courseId, courseTitles) {
  return courseTitles[courseId] ?? courseId ?? 'Curso sin identificar'
}

function obtenerTiempoEvento(event) {
  const timestamp = new Date(event?.timestamp ?? 0).getTime()
  return Number.isFinite(timestamp) ? timestamp : 0
}

function crearProgresoVacio() {
  return {
    completedLessons: [],
    completedExercises: [],
    completedUnitAssessments: [],
    completedCourseAssessments: [],
    revealedSolutionExercises: [],
  }
}

function formatearEvento(event, courseTitles) {
  const eventLabels = {
    register: 'Cuenta creada',
    login: 'Inicio de sesión',
    google_login: 'Acceso con Google',
    profile_updated: 'Perfil actualizado',
    onboarding_completed: 'Onboarding completado',
    assessment_started: 'Diagnóstico iniciado',
    assessment_saved: 'Diagnóstico guardado',
    lesson_completed: 'Lección completada',
    unit_assessment_completed: 'Evaluación de unidad completada',
    course_assessment_completed: 'Evaluación final completada',
    password_updated: 'Contraseña actualizada',
    password_reset_requested: 'Recuperación de contraseña solicitada',
    course_created: 'Curso creado',
    course_updated: 'Curso actualizado',
    course_deleted: 'Curso eliminado',
    course_publication_toggled: 'Publicación del curso actualizada',
    course_materialized: 'Curso importado al CMS',
    unit_created: 'Unidad creada',
    unit_updated: 'Unidad actualizada',
    unit_deleted: 'Unidad eliminada',
    unit_bundle_updated: 'Contenido de la unidad actualizado',
    unit_assessment_updated: 'Evaluación de unidad actualizada',
    final_assessment_updated: 'Evaluación final actualizada',
    lesson_created: 'Lección creada',
    lesson_updated: 'Lección actualizada',
    lesson_deleted: 'Lección eliminada',
    user_role_updated: 'Rol de usuario actualizado',
    user_status_toggled: 'Estado de cuenta actualizado',
  }

  const details = []

  if (event.actor?.name) {
    details.push(`Usuario: ${event.actor.name}`)
  } else if (event.actor?.email) {
    details.push(`Usuario: ${event.actor.email}`)
  }

  if (event.courseId) {
    details.push(`Curso: ${resolverTituloCurso(event.courseId, courseTitles)}`)
  }

  if (event.unitId) {
    details.push(`Unidad: ${event.unitId}`)
  }

  if (event.lessonId) {
    details.push(`Lección: ${event.lessonId}`)
  }

  if (event.assessmentId) {
    details.push(`Evaluación: ${event.assessmentId}`)
  }

  if (event.recommendedCourseId) {
    details.push(`Sugerencia: ${resolverTituloCurso(event.recommendedCourseId, courseTitles)}`)
  }

  if (event.status) {
    details.push(`Estado: ${normalizarEstadoCuenta(event.status)}`)
  }

  if (event.systemRole) {
    details.push(`Rol: ${normalizarRolSistema(event.systemRole)}`)
  }

  if (event.provider) {
    details.push(`Acceso: ${normalizarProveedor(event.provider)}`)
  }

  return {
    ...event,
    label: eventLabels[event.type] ?? 'Actividad registrada',
    details,
  }
}

export function obtenerResumenUsuario(user, userState) {
  const progress = userState?.progress ?? crearProgresoVacio()
  const catalog = obtenerCatalogoCursos()
  const courseTitles = construirIndiceCursos(catalog)
  const touchedCourses = catalog
    .map((course) => ({
      course,
      progress: obtenerProgresoCurso(course.id, progress),
    }))
    .filter(({ progress: courseProgress }) => courseProgress.completedCount > 0)

  const gamification = obtenerEstadisticasGamificadas(progress)

  return {
    user,
    progress,
    touchedCourses,
    goalCourseTitle: user.goalCourseId
      ? resolverTituloCurso(user.goalCourseId, courseTitles)
      : 'Sin curso objetivo',
    completedLessons: progress.completedLessons.length,
    completedAssessments:
      progress.completedUnitAssessments.length + progress.completedCourseAssessments.length,
    xp: gamification.xp,
    earnedXp: gamification.earnedXp,
    penaltyXp: gamification.penaltyXp,
    rankTitle: gamification.rankTitle,
  }
}

export function obtenerMetricasAdmin(users = [], userStates = {}, activity = []) {
  const activeUsers = users.filter((user) => user.status !== 'disabled')
  const disabledUsers = users.filter((user) => user.status === 'disabled')
  const adminUsers = users.filter((user) => user.systemRole === 'admin')
  const studentUsers = users.length - adminUsers.length
  const recentSignIns = users.filter((user) => esReciente(user.lastLoginAt))
  const emailUsers = users.filter((user) => user.provider === 'email')
  const googleUsers = users.filter((user) => user.provider === 'google')
  const verifiedEmailUsers = emailUsers.filter((user) => user.emailVerified)
  const catalog = obtenerCatalogoCursos()
  const courseTitles = construirIndiceCursos(catalog)

  const coursePopularity = catalog
    .map((course) => {
      const engagedUsers = users.filter((user) => {
        const progress = userStates[user.id]?.progress
        if (!progress) {
          return false
        }

        const courseProgress = obtenerProgresoCurso(course.id, progress)
        return courseProgress.completedCount > 0
      }).length

      return {
        courseId: course.id,
        title: course.title,
        engagedUsers,
      }
    })
    .sort((left, right) => right.engagedUsers - left.engagedUsers)

  return {
    totalUsers: users.length,
    activeUsers: activeUsers.length,
    disabledUsers: disabledUsers.length,
    adminUsers: adminUsers.length,
    learnerUsers: studentUsers,
    studentUsers,
    emailUsers: emailUsers.length,
    googleUsers: googleUsers.length,
    verifiedEmailUsers: verifiedEmailUsers.length,
    usersWithRecentActivity: recentSignIns.length,
    usersWithRecentSignIn: recentSignIns.length,
    coursePopularity,
    recentEvents: [...activity]
      .sort((left, right) => obtenerTiempoEvento(right) - obtenerTiempoEvento(left))
      .slice(0, 8)
      .map((event) => formatearEvento(event, courseTitles)),
  }
}
