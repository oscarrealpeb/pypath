import { useEffect, useReducer } from 'react'
import { autenticarUsuario } from '../../autenticacion/servicios/servicioAutenticacion.js'
import {
  crearCursoEnContenido,
  crearLeccionEnContenido,
  crearUnidadEnContenido,
  eliminarLeccionEnContenido,
  eliminarUnidadEnContenido,
  alternarPublicacionCursoEnContenido,
  actualizarCursoEnContenido,
  actualizarEvaluacionFinalEnContenido,
  actualizarLeccionEnContenido,
  actualizarEvaluacionUnidadEnContenido,
  actualizarUnidadEnContenido,
} from '../../administracion/servicios/servicioAdminContenido.js'
import { actualizarSnapshotContenido } from '../../contenido/servicios/repositorioContenido.js'
import {
  crearEstadoDiagnosticoInicial,
  crearProgresoInicial,
  crearEstadoUsuarioInicial,
  cargarEstadoApp,
  guardarEstadoApp,
} from '../servicios/servicioEstadoApp.js'
import { crearIntentoDiagnostico } from '../../diagnostico/servicios/servicioDiagnostico.js'
import { ContextoAccionesApp, ContextoEstadoApp } from './ContextosEstadoApp.js'

function createActivityEntry(type, payload = {}) {
  return {
    id: `evt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    timestamp: new Date().toISOString(),
    ...payload,
  }
}

function appendActivity(state, entry) {
  return {
    ...state,
    activity: [...state.activity, entry].slice(-200),
  }
}

function aplicarTemaPreferido(themePreference) {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.setAttribute('data-theme', themePreference ?? 'system')
}

function withUpdatedCurrentUserState(state, updater) {
  if (!state.user) {
    return state
  }

  const currentUserState = state.userStates[state.user.id] ?? crearEstadoUsuarioInicial()
  const nextUserState = updater(currentUserState)

  return {
    ...state,
    onboarding: nextUserState.onboarding,
    progress: nextUserState.progress,
    userStates: {
      ...state.userStates,
      [state.user.id]: nextUserState,
    },
  }
}

function withUpdatedCurrentUser(state, updater) {
  if (!state.user) {
    return state
  }

  const nextUser = updater(state.user)

  return {
    ...state,
    user: nextUser,
    users: state.users.map((user) => (user.id === nextUser.id ? nextUser : user)),
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_SESSION': {
      const sessionUserState =
        action.payload.userStates[action.payload.user.id] ?? crearEstadoUsuarioInicial()
      const nextState = {
        ...state,
        user: action.payload.user,
        users: action.payload.users,
        userStates: action.payload.userStates,
        onboarding: sessionUserState.onboarding,
        progress: sessionUserState.progress,
      }

      return action.payload.activityEntry
        ? appendActivity(nextState, action.payload.activityEntry)
        : nextState
    }

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        onboarding: crearEstadoDiagnosticoInicial(),
        progress: crearProgresoInicial(),
      }

    case 'UPDATE_USER_PROFILE': {
      const nextState = withUpdatedCurrentUser(state, (currentUser) => ({
        ...currentUser,
        ...action.payload,
      }))

      return appendActivity(nextState, createActivityEntry('profile_updated', { userId: state.user?.id }))
    }

    case 'COMPLETE_ONBOARDING': {
      const nextState = withUpdatedCurrentUserState(state, (currentUserState) => ({
        ...currentUserState,
        onboarding: {
          completed: true,
          path: action.payload?.path ?? 'later',
          assessmentAttempt: null,
          assessmentResult: null,
        },
      }))

      return appendActivity(
        nextState,
        createActivityEntry('onboarding_completed', { userId: state.user?.id }),
      )
    }

    case 'SAVE_ASSESSMENT': {
      if (state.onboarding.assessmentResult) {
        return state
      }

      const nextState = withUpdatedCurrentUserState(state, (currentUserState) => ({
        ...currentUserState,
        onboarding: {
          completed: true,
          path: 'assessment',
          assessmentAttempt: null,
          assessmentResult: action.payload,
        },
      }))

      return appendActivity(
        nextState,
        createActivityEntry('assessment_saved', {
          userId: state.user?.id,
          recommendedCourseId: action.payload?.recommendedCourseId ?? null,
        }),
      )
    }

    case 'START_ASSESSMENT_ATTEMPT': {
      if (state.onboarding.assessmentResult || state.onboarding.assessmentAttempt) {
        return state
      }

      const nextState = withUpdatedCurrentUserState(state, (currentUserState) => ({
        ...currentUserState,
        onboarding: {
          ...currentUserState.onboarding,
          completed: true,
          path: 'assessment-pending',
          assessmentAttempt: action.payload,
        },
      }))

      return appendActivity(
        nextState,
        createActivityEntry('assessment_started', { userId: state.user?.id }),
      )
    }

    case 'SAVE_ASSESSMENT_ANSWER':
      return withUpdatedCurrentUserState(state, (currentUserState) => {
        if (!currentUserState.onboarding.assessmentAttempt) {
          return currentUserState
        }

        return {
          ...currentUserState,
          onboarding: {
            ...currentUserState.onboarding,
            assessmentAttempt: {
              ...currentUserState.onboarding.assessmentAttempt,
              currentIndex: action.payload.currentIndex,
              answers: {
                ...(currentUserState.onboarding.assessmentAttempt.answers ?? {}),
                [action.payload.questionId]: action.payload.optionId,
              },
            },
          },
        }
      })

    case 'SET_ASSESSMENT_CURRENT_INDEX':
      return withUpdatedCurrentUserState(state, (currentUserState) => {
        if (!currentUserState.onboarding.assessmentAttempt) {
          return currentUserState
        }

        return {
          ...currentUserState,
          onboarding: {
            ...currentUserState.onboarding,
            assessmentAttempt: {
              ...currentUserState.onboarding.assessmentAttempt,
              currentIndex: action.payload,
            },
          },
        }
      })

    case 'COMPLETE_LESSON': {
      const nextState = withUpdatedCurrentUserState(state, (currentUserState) => ({
        ...currentUserState,
        progress: {
          ...currentUserState.progress,
          completedLessons: currentUserState.progress.completedLessons.includes(action.payload)
            ? currentUserState.progress.completedLessons
            : [...currentUserState.progress.completedLessons, action.payload],
        },
      }))

      return appendActivity(
        nextState,
        createActivityEntry('lesson_completed', {
          userId: state.user?.id,
          lessonId: action.payload,
        }),
      )
    }

    case 'COMPLETE_UNIT_ASSESSMENT': {
      const nextState = withUpdatedCurrentUserState(state, (currentUserState) => ({
        ...currentUserState,
        progress: {
          ...currentUserState.progress,
          completedUnitAssessments: currentUserState.progress.completedUnitAssessments.includes(
            action.payload,
          )
            ? currentUserState.progress.completedUnitAssessments
            : [...currentUserState.progress.completedUnitAssessments, action.payload],
        },
      }))

      return appendActivity(
        nextState,
        createActivityEntry('unit_assessment_completed', {
          userId: state.user?.id,
          assessmentId: action.payload,
        }),
      )
    }

    case 'COMPLETE_COURSE_ASSESSMENT': {
      const nextState = withUpdatedCurrentUserState(state, (currentUserState) => ({
        ...currentUserState,
        progress: {
          ...currentUserState.progress,
          completedCourseAssessments: currentUserState.progress.completedCourseAssessments.includes(
            action.payload,
          )
            ? currentUserState.progress.completedCourseAssessments
            : [...currentUserState.progress.completedCourseAssessments, action.payload],
        },
      }))

      return appendActivity(
        nextState,
        createActivityEntry('course_assessment_completed', {
          userId: state.user?.id,
          assessmentId: action.payload,
        }),
      )
    }

    case 'SET_CONTENT': {
      const nextState = {
        ...state,
        content: action.payload,
      }

      return action.meta?.activityType
        ? appendActivity(
            nextState,
            createActivityEntry(action.meta.activityType, {
              userId: state.user?.id,
              ...action.meta.payload,
            }),
          )
        : nextState
    }

    case 'SET_USERS_AND_STATES': {
      const currentUser =
        action.payload.currentUserId != null
          ? action.payload.users.find((user) => user.id === action.payload.currentUserId) ?? state.user
          : state.user
      const currentUserState =
        currentUser && action.payload.userStates[currentUser.id]
          ? action.payload.userStates[currentUser.id]
          : null
      const nextState = {
        ...state,
        user: currentUser,
        users: action.payload.users,
        userStates: action.payload.userStates,
        onboarding: currentUserState?.onboarding ?? state.onboarding,
        progress: currentUserState?.progress ?? state.progress,
      }

      return action.meta?.activityType
        ? appendActivity(
            nextState,
            createActivityEntry(action.meta.activityType, {
              userId: state.user?.id,
              ...action.meta.payload,
            }),
          )
        : nextState
    }

    case 'SET_THEME_PREFERENCE':
      return {
        ...state,
        themePreference: action.payload,
      }

    default:
      return state
  }
}

export function ProveedorEstadoApp({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, cargarEstadoApp)

  actualizarSnapshotContenido(state.content)

  useEffect(() => {
    aplicarTemaPreferido(state.themePreference)
  }, [state.themePreference])

  useEffect(() => {
    guardarEstadoApp(state)
  }, [state])

  const actions = {
    async authenticate(formData, mode) {
      const authUser = await autenticarUsuario(formData, mode)
      const now = new Date().toISOString()
      const existingUser = state.users.find((user) => user.email === authUser.email)

      if (mode === 'register' && existingUser) {
        throw new Error('Ya existe una cuenta con ese correo. Inicia sesión o usa otro email.')
      }

      if (existingUser?.status === 'disabled') {
        throw new Error('Esta cuenta está deshabilitada. Reactívala desde administración.')
      }

      const nextUsers = [...state.users]
      const nextUserStates = {
        ...state.userStates,
      }

      let sessionUser

      if (existingUser) {
        sessionUser = {
          ...existingUser,
          ...authUser,
          id: existingUser.id,
          systemRole: existingUser.systemRole ?? authUser.systemRole ?? 'student',
          status: existingUser.status ?? 'active',
          createdAt: existingUser.createdAt ?? now,
          lastLoginAt: now,
        }

        const existingIndex = nextUsers.findIndex((user) => user.id === existingUser.id)
        nextUsers[existingIndex] = sessionUser
        nextUserStates[existingUser.id] ??= crearEstadoUsuarioInicial()
      } else {
        sessionUser = {
          ...authUser,
          systemRole: authUser.systemRole ?? 'student',
          status: 'active',
          createdAt: now,
          lastLoginAt: now,
        }
        nextUsers.push(sessionUser)
        nextUserStates[sessionUser.id] = crearEstadoUsuarioInicial()
      }

      dispatch({
        type: 'SET_SESSION',
        payload: {
          user: sessionUser,
          users: nextUsers,
          userStates: nextUserStates,
          activityEntry: createActivityEntry(existingUser ? 'login' : 'register', {
            userId: sessionUser.id,
            provider: sessionUser.provider,
            systemRole: sessionUser.systemRole,
          }),
        },
      })

      return sessionUser
    },
    logout() {
      dispatch({ type: 'LOGOUT' })
    },
    updateUserProfile(profileData) {
      dispatch({ type: 'UPDATE_USER_PROFILE', payload: profileData })
    },
    completeOnboarding(path = 'later') {
      dispatch({ type: 'COMPLETE_ONBOARDING', payload: { path } })
    },
    startAssessmentAttempt() {
      const intento = crearIntentoDiagnostico()
      dispatch({ type: 'START_ASSESSMENT_ATTEMPT', payload: intento })
      return intento
    },
    saveAssessmentAnswer(questionId, optionId, currentIndex) {
      dispatch({
        type: 'SAVE_ASSESSMENT_ANSWER',
        payload: { questionId, optionId, currentIndex },
      })
    },
    setAssessmentCurrentIndex(currentIndex) {
      dispatch({
        type: 'SET_ASSESSMENT_CURRENT_INDEX',
        payload: currentIndex,
      })
    },
    saveAssessment(result) {
      dispatch({ type: 'SAVE_ASSESSMENT', payload: result })
    },
    completeLesson(lessonId) {
      dispatch({ type: 'COMPLETE_LESSON', payload: lessonId })
    },
    completeUnitAssessment(assessmentId) {
      dispatch({ type: 'COMPLETE_UNIT_ASSESSMENT', payload: assessmentId })
    },
    completeCourseAssessment(assessmentId) {
      dispatch({ type: 'COMPLETE_COURSE_ASSESSMENT', payload: assessmentId })
    },
    createCourse(courseName) {
      const { content, courseId } = crearCursoEnContenido(state.content, courseName)
      dispatch({
        type: 'SET_CONTENT',
        payload: content,
        meta: {
          activityType: 'course_created',
          payload: { courseId },
        },
      })
      return courseId
    },
    updateCourse(courseId, draft) {
      dispatch({
        type: 'SET_CONTENT',
        payload: actualizarCursoEnContenido(state.content, courseId, draft),
        meta: {
          activityType: 'course_updated',
          payload: { courseId },
        },
      })
    },
    replaceContent(nextContent, meta = {}) {
      dispatch({
        type: 'SET_CONTENT',
        payload: nextContent,
        meta,
      })
    },
    toggleCoursePublication(courseId) {
      dispatch({
        type: 'SET_CONTENT',
        payload: alternarPublicacionCursoEnContenido(state.content, courseId),
        meta: {
          activityType: 'course_publication_toggled',
          payload: { courseId },
        },
      })
    },
    createUnit(courseId, unitName) {
      const { content, unitId } = crearUnidadEnContenido(state.content, courseId, unitName)
      dispatch({
        type: 'SET_CONTENT',
        payload: content,
        meta: {
          activityType: 'unit_created',
          payload: { courseId, unitId },
        },
      })
      return unitId
    },
    updateUnit(courseId, unitId, patch) {
      dispatch({
        type: 'SET_CONTENT',
        payload: actualizarUnidadEnContenido(state.content, courseId, unitId, patch),
        meta: {
          activityType: 'unit_updated',
          payload: { courseId, unitId },
        },
      })
    },
    deleteUnit(courseId, unitId) {
      dispatch({
        type: 'SET_CONTENT',
        payload: eliminarUnidadEnContenido(state.content, courseId, unitId),
        meta: {
          activityType: 'unit_deleted',
          payload: { courseId, unitId },
        },
      })
    },
    updateUnitAssessment(courseId, unitId, draft) {
      dispatch({
        type: 'SET_CONTENT',
        payload: actualizarEvaluacionUnidadEnContenido(state.content, courseId, unitId, draft),
        meta: {
          activityType: 'unit_assessment_updated',
          payload: { courseId, unitId },
        },
      })
    },
    updateFinalAssessment(courseId, draft) {
      dispatch({
        type: 'SET_CONTENT',
        payload: actualizarEvaluacionFinalEnContenido(state.content, courseId, draft),
        meta: {
          activityType: 'final_assessment_updated',
          payload: { courseId },
        },
      })
    },
    createLesson(courseId, unitId, lessonName) {
      const { content, lessonId } = crearLeccionEnContenido(state.content, courseId, unitId, lessonName)
      dispatch({
        type: 'SET_CONTENT',
        payload: content,
        meta: {
          activityType: 'lesson_created',
          payload: { courseId, unitId, lessonId },
        },
      })
      return lessonId
    },
    updateLesson(courseId, unitId, lessonId, draft) {
      dispatch({
        type: 'SET_CONTENT',
        payload: actualizarLeccionEnContenido(state.content, courseId, unitId, lessonId, draft),
        meta: {
          activityType: 'lesson_updated',
          payload: { courseId, unitId, lessonId },
        },
      })
    },
    deleteLesson(courseId, unitId, lessonId) {
      dispatch({
        type: 'SET_CONTENT',
        payload: eliminarLeccionEnContenido(state.content, courseId, unitId, lessonId),
        meta: {
          activityType: 'lesson_deleted',
          payload: { courseId, unitId, lessonId },
        },
      })
    },
    setSystemRole(userId, systemRole) {
      const nextUsers = state.users.map((user) =>
        user.id === userId ? { ...user, systemRole } : user,
      )

      dispatch({
        type: 'SET_USERS_AND_STATES',
        payload: {
          users: nextUsers,
          userStates: state.userStates,
          currentUserId: state.user?.id ?? null,
        },
        meta: {
          activityType: 'user_role_updated',
          payload: { targetUserId: userId, systemRole },
        },
      })
    },
    toggleUserStatus(userId) {
      if (state.user?.id === userId) {
        throw new Error('No puedes deshabilitar tu propia cuenta desde esta sesión.')
      }

      const nextUsers = state.users.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === 'disabled' ? 'active' : 'disabled' }
          : user,
      )

      dispatch({
        type: 'SET_USERS_AND_STATES',
        payload: {
          users: nextUsers,
          userStates: state.userStates,
          currentUserId: state.user?.id ?? null,
        },
        meta: {
          activityType: 'user_status_toggled',
          payload: { targetUserId: userId },
        },
      })
    },
    requestPasswordReset(userId) {
      const nextUserStates = {
        ...state.userStates,
        [userId]: {
          ...(state.userStates[userId] ?? crearEstadoUsuarioInicial()),
          mustResetPassword: true,
        },
      }

      dispatch({
        type: 'SET_USERS_AND_STATES',
        payload: {
          users: state.users,
          userStates: nextUserStates,
          currentUserId: state.user?.id ?? null,
        },
        meta: {
          activityType: 'password_reset_requested',
          payload: { targetUserId: userId },
        },
      })
    },
    setThemePreference(themePreference) {
      dispatch({ type: 'SET_THEME_PREFERENCE', payload: themePreference })
    },
  }

  return (
    <ContextoEstadoApp.Provider value={state}>
      <ContextoAccionesApp.Provider value={actions}>{children}</ContextoAccionesApp.Provider>
    </ContextoEstadoApp.Provider>
  )
}
