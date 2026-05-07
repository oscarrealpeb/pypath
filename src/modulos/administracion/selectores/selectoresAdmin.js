import { obtenerCatalogoCursos } from '../../contenido/servicios/repositorioContenido.js'
import { obtenerProgresoCurso } from '../../cursos/selectores/selectoresCursos.js'

function isRecent(dateValue, days = 7) {
  if (!dateValue) {
    return false
  }

  const date = new Date(dateValue)
  const threshold = Date.now() - days * 24 * 60 * 60 * 1000
  return Number.isFinite(date.getTime()) && date.getTime() >= threshold
}

export function obtenerResumenUsuario(user, userState) {
  const progress = userState?.progress ?? {
    completedLessons: [],
    completedUnitAssessments: [],
    completedCourseAssessments: [],
  }
  const catalog = obtenerCatalogoCursos()
  const touchedCourses = catalog
    .map((course) => ({
      course,
      progress: obtenerProgresoCurso(
        course.id,
        progress.completedLessons,
        progress.completedUnitAssessments,
        progress.completedCourseAssessments,
      ),
    }))
    .filter(({ progress: courseProgress }) => courseProgress.completedCount > 0)

  return {
    user,
    progress,
    touchedCourses,
    completedLessons: progress.completedLessons.length,
    completedAssessments:
      progress.completedUnitAssessments.length + progress.completedCourseAssessments.length,
  }
}

export function obtenerMetricasAdmin(users = [], userStates = {}, activity = []) {
  const activeUsers = users.filter((user) => user.status !== 'disabled')
  const disabledUsers = users.filter((user) => user.status === 'disabled')
  const adminUsers = users.filter((user) => user.systemRole === 'admin')
  const recentUsers = users.filter((user) => isRecent(user.lastLoginAt))
  const catalog = obtenerCatalogoCursos()

  const coursePopularity = catalog
    .map((course) => {
      const engagedUsers = users.filter((user) => {
        const progress = userStates[user.id]?.progress
        if (!progress) {
          return false
        }

        const courseProgress = obtenerProgresoCurso(
          course.id,
          progress.completedLessons,
          progress.completedUnitAssessments,
          progress.completedCourseAssessments,
        )

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
    learnerUsers: users.length - adminUsers.length,
    usersWithRecentActivity: recentUsers.length,
    coursePopularity,
    recentEvents: activity.slice(-8).reverse(),
  }
}
