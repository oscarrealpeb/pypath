import { useCallback, useEffect, useReducer, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import {
  actualizarCursoEnContenido,
  actualizarEvaluacionFinalEnContenido,
  actualizarEvaluacionUnidadEnContenido,
  actualizarLeccionEnContenido,
  actualizarUnidadEnContenido,
  alternarPublicacionCursoEnContenido,
  crearCursoEnContenido,
  crearLeccionEnContenido,
  crearUnidadEnContenido,
  eliminarCursoEnContenido,
  eliminarLeccionEnContenido,
  eliminarUnidadEnContenido,
} from '../../administracion/servicios/servicioAdminContenido.js'
import {
  registrarEventoPlataforma,
  suscribirActividadPlataforma,
} from '../../administracion/servicios/servicioActividadPlataforma.js'
import {
  actualizarContrasenaUsuarioActual,
  actualizarNombreVisibleUsuarioActual,
  cerrarSesionFirebase,
  consumirSemillaRedireccionGoogle,
  eliminarUsuarioActualAuth,
  enviarCorreoRecuperacion,
  esUsuarioAdministrador,
  iniciarSesionConCorreoONickname,
  iniciarSesionConGoogle,
  reautenticarUsuarioActualParaBorrado,
  refrescarUsuarioActualFirebase,
  registrarCuentaConCorreo,
  reenviarVerificacionCorreoActual,
  requiereVerificacionCorreo,
  suscribirSesionFirebase,
} from '../../autenticacion/servicios/servicioFirebaseAutenticacion.js'
import {
  asegurarPerfilUsuario,
  buscarPerfilPorNickname,
  buscarPerfilPorNombreVisible,
  construirUsuarioAplicacion,
  eliminarPerfilUsuarioYReferencias,
  guardarEstadoAprendizajeUsuario,
  guardarPerfilUsuario,
  obtenerPerfilUsuario,
  suscribirPerfilesUsuarios,
} from '../../autenticacion/servicios/servicioPerfilesFirebase.js'
import {
  crearNombreCompleto,
  obtenerMensajeContrasenaMinima,
  validarNickname,
} from '../../autenticacion/servicios/servicioValidacionAutenticacion.js'
import {
  guardarContenidoCms,
  normalizarContenidoPersistido,
  serializarContenidoPersistible,
  suscribirContenidoCms,
} from '../../contenido/servicios/servicioContenidoFirebase.js'
import { actualizarSnapshotContenido } from '../../contenido/servicios/repositorioContenido.js'
import { crearIntentoDiagnostico } from '../../diagnostico/servicios/servicioDiagnostico.js'
import {
  obtenerEjerciciosLeccion,
  obtenerRegistroLeccion,
} from '../../cursos/selectores/selectoresCursos.js'
import {
  construirEstadoUsuarioDesdePerfil,
  crearEstadoDiagnosticoInicial,
  crearEstadoUsuarioInicial,
  crearProgresoInicial,
} from '../servicios/estadoUsuarioBase.js'
import {
  cargarEstadoApp,
  crearEstadoSincronizacionCms,
  guardarEstadoApp,
} from '../servicios/servicioEstadoApp.js'
import { ContextoAccionesApp, ContextoEstadoApp } from './ContextosEstadoApp.js'

function normalizarListaIds(items = []) {
  return Array.from(
    new Set(
      (Array.isArray(items) ? items : [])
        .filter((item) => typeof item === 'string')
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  )
}

function actualizarProgresoEjercicio(currentProgress, { lessonId, exerciseId, lessonExerciseIds, mode }) {
  const completedExercises = normalizarListaIds(currentProgress.completedExercises)
  const revealedSolutionExercises = normalizarListaIds(currentProgress.revealedSolutionExercises)
  const completedLessons = normalizarListaIds(currentProgress.completedLessons)
  const normalizedLessonExerciseIds = normalizarListaIds(lessonExerciseIds)
  const lessonExerciseSnapshots = {
    ...(currentProgress.lessonExerciseSnapshots ?? {}),
  }
  const unitLessonSnapshots = {
    ...(currentProgress.unitLessonSnapshots ?? {}),
  }
  const courseUnitSnapshots = {
    ...(currentProgress.courseUnitSnapshots ?? {}),
  }
  const lessonRecord = obtenerRegistroLeccion(lessonId)
  const courseId = lessonRecord?.course.id ?? null
  const unitId = lessonRecord?.unit.id ?? null
  const currentLessonIds = normalizarListaIds(
    lessonRecord?.unit?.lessons.map((lesson) => lesson.id) ?? [],
  )
  const currentUnitIds = normalizarListaIds(
    lessonRecord?.course?.units.map((unit) => unit.id) ?? [],
  )

  if (courseId && !Array.isArray(courseUnitSnapshots[courseId])) {
    courseUnitSnapshots[courseId] = currentUnitIds
  }

  if (unitId && !Array.isArray(unitLessonSnapshots[unitId])) {
    unitLessonSnapshots[unitId] = currentLessonIds
  }

  if (mode === 'complete') {
    if (
      completedExercises.includes(exerciseId) ||
      revealedSolutionExercises.includes(exerciseId)
    ) {
      return currentProgress
    }

    completedExercises.push(exerciseId)
  }

  if (mode === 'reveal') {
    if (
      revealedSolutionExercises.includes(exerciseId) ||
      completedExercises.includes(exerciseId)
    ) {
      return currentProgress
    }

    revealedSolutionExercises.push(exerciseId)
  }

  const resolvedExerciseIds = new Set([...completedExercises, ...revealedSolutionExercises])
  const lessonResolved =
    normalizedLessonExerciseIds.length > 0 &&
    normalizedLessonExerciseIds.every((id) => resolvedExerciseIds.has(id))

  if (lessonResolved && !completedLessons.includes(lessonId)) {
    completedLessons.push(lessonId)
  }

  if (lessonResolved && normalizedLessonExerciseIds.length > 0) {
    lessonExerciseSnapshots[lessonId] = normalizedLessonExerciseIds
  }

  return {
    ...currentProgress,
    completedLessons,
    completedExercises,
    revealedSolutionExercises,
    lessonExerciseSnapshots,
    unitLessonSnapshots,
    courseUnitSnapshots,
  }
}

function createActivityEntry(type, payload = {}) {
  return {
    id: `evt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    timestamp: new Date().toISOString(),
    ...payload,
  }
}

function getActivityTimestamp(entry) {
  const timestamp = new Date(entry?.timestamp ?? 0).getTime()
  return Number.isFinite(timestamp) ? timestamp : 0
}

function mergeActivityEntries(...entryGroups) {
  const activityById = new Map()

  entryGroups.flat().forEach((entry) => {
    if (!entry?.id) {
      return
    }

    activityById.set(entry.id, {
      ...(activityById.get(entry.id) ?? {}),
      ...entry,
    })
  })

  return Array.from(activityById.values())
    .sort((left, right) => getActivityTimestamp(right) - getActivityTimestamp(left))
    .slice(0, 200)
}

function appendActivity(state, entry) {
  return {
    ...state,
    activity: mergeActivityEntries(state.activity, [entry]),
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

function upsertUser(users = [], nextUser) {
  const userIndex = users.findIndex((user) => user.id === nextUser.id)

  if (userIndex < 0) {
    return [...users, nextUser]
  }

  return users.map((user) => (user.id === nextUser.id ? nextUser : user))
}

function fusionarUsuarioSesion(currentUser, syncedUser) {
  if (!syncedUser) {
    return currentUser
  }

  if (!currentUser || currentUser.id !== syncedUser.id) {
    return syncedUser
  }

  return {
    ...syncedUser,
    email: syncedUser.email || currentUser.email,
    provider: syncedUser.provider || currentUser.provider,
    photoURL: syncedUser.photoURL || currentUser.photoURL,
    status: syncedUser.status ?? currentUser.status,
    emailVerified: currentUser.emailVerified ?? syncedUser.emailVerified,
    systemRole: esUsuarioAdministrador(currentUser)
      ? 'admin'
      : syncedUser.systemRole ?? currentUser.systemRole,
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_AUTH_STATUS':
      return {
        ...state,
        authReady: action.payload.authReady,
        firebaseEnabled: action.payload.firebaseEnabled,
      }

    case 'SET_CMS_SYNC':
      return {
        ...state,
        cmsSync: {
          ...state.cmsSync,
          ...action.payload,
        },
      }

    case 'SYNC_SESSION': {
      const sessionUserState =
        action.payload.userStates[action.payload.user.id] ?? crearEstadoUsuarioInicial()
      const nextState = {
        ...state,
        authReady: true,
        firebaseEnabled: action.payload.firebaseEnabled ?? state.firebaseEnabled,
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

    case 'CLEAR_SESSION':
      return {
        ...state,
        authReady: true,
        firebaseEnabled: action.payload?.firebaseEnabled ?? state.firebaseEnabled,
        user: null,
        users: [],
        userStates: {},
        onboarding: crearEstadoDiagnosticoInicial(),
        progress: crearProgresoInicial(),
        activity: [],
        cmsSync: crearEstadoSincronizacionCms(),
      }

    case 'APPEND_ACTIVITY':
      return appendActivity(state, action.payload)

    case 'SYNC_ACTIVITY_FEED':
      return {
        ...state,
        activity: mergeActivityEntries(state.activity, action.payload),
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

    case 'COMPLETE_EXERCISE': {
      const nextState = withUpdatedCurrentUserState(state, (currentUserState) => ({
        ...currentUserState,
        progress: actualizarProgresoEjercicio(currentUserState.progress, {
          lessonId: action.payload.lessonId,
          exerciseId: action.payload.exerciseId,
          lessonExerciseIds: action.payload.lessonExerciseIds,
          mode: 'complete',
        }),
      }))

      return appendActivity(
        nextState,
        createActivityEntry('exercise_completed', {
          userId: state.user?.id,
          lessonId: action.payload.lessonId,
          exerciseId: action.payload.exerciseId,
        }),
      )
    }

    case 'REVEAL_EXERCISE_SOLUTION': {
      const nextState = withUpdatedCurrentUserState(state, (currentUserState) => ({
        ...currentUserState,
        progress: actualizarProgresoEjercicio(currentUserState.progress, {
          lessonId: action.payload.lessonId,
          exerciseId: action.payload.exerciseId,
          lessonExerciseIds: action.payload.lessonExerciseIds,
          mode: 'reveal',
        }),
      }))

      return appendActivity(
        nextState,
        createActivityEntry('exercise_solution_revealed', {
          userId: state.user?.id,
          lessonId: action.payload.lessonId,
          exerciseId: action.payload.exerciseId,
          penaltyXp: action.payload.penaltyXp ?? 0,
        }),
      )
    }

    case 'ENSURE_PROGRESS_SNAPSHOTS':
      return withUpdatedCurrentUserState(state, (currentUserState) => ({
        ...currentUserState,
        progress: {
          ...currentUserState.progress,
          lessonExerciseSnapshots: {
            ...(currentUserState.progress.lessonExerciseSnapshots ?? {}),
            ...(action.payload.lessonExerciseSnapshots ?? {}),
          },
          unitLessonSnapshots: {
            ...(currentUserState.progress.unitLessonSnapshots ?? {}),
            ...(action.payload.unitLessonSnapshots ?? {}),
          },
          courseUnitSnapshots: {
            ...(currentUserState.progress.courseUnitSnapshots ?? {}),
            ...(action.payload.courseUnitSnapshots ?? {}),
          },
        },
      }))

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
      const syncedCurrentUser =
        action.payload.currentUserId != null
          ? action.payload.users.find((user) => user.id === action.payload.currentUserId) ?? state.user
          : state.user
      const currentUser = fusionarUsuarioSesion(state.user, syncedCurrentUser)
      const nextUsers =
        currentUser && action.payload.currentUserId != null
          ? action.payload.users.map((user) => (user.id === currentUser.id ? currentUser : user))
          : action.payload.users
      const currentUserState =
        currentUser && action.payload.userStates[currentUser.id]
          ? action.payload.userStates[currentUser.id]
          : null
      const nextState = {
        ...state,
        user: currentUser,
        users: nextUsers,
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
  const location = useLocation()
  const [state, dispatch] = useReducer(reducer, undefined, cargarEstadoApp)
  const stateRef = useRef(state)
  const persistedLearningStateRef = useRef('')
  const persistStateTimerRef = useRef(null)
  const contentRemoteReadyRef = useRef(!state.firebaseEnabled)
  const persistedRemoteContentRef = useRef(
    JSON.stringify(serializarContenidoPersistible(state.content)),
  )
  const hydratingRemoteContentRef = useRef('')
  const pendingRemoteContentRef = useRef('')
  const inFlightRemoteContentRef = useRef('')
  const persistedActivityIdsRef = useRef(new Set())
  const syncingActivityIdsRef = useRef(new Set())
  const currentPath = location.pathname ?? '/'
  const isAdminRoute = currentPath === '/admin' || currentPath.startsWith('/admin/')
  const shouldSyncAdminUsers =
    isAdminRoute &&
    (currentPath.startsWith('/admin/resumen') ||
      currentPath.startsWith('/admin/usuarios') ||
      currentPath.startsWith('/admin/metricas'))
  const shouldSyncAdminActivity = currentPath.startsWith('/admin/metricas')

  const sincronizarSesionResuelta = useCallback(async (firebaseUser, profile, activityType = null) => {
    const sessionUser = construirUsuarioAplicacion(firebaseUser, profile)
    const sessionUserState = construirEstadoUsuarioDesdePerfil(profile)
    const currentUsers =
      esUsuarioAdministrador(stateRef.current.user) && stateRef.current.users.length > 0
        ? stateRef.current.users
        : []
    const currentUserStates =
      esUsuarioAdministrador(stateRef.current.user) ? stateRef.current.userStates : {}
    const nextUsers = upsertUser(currentUsers, sessionUser)
    const nextUserStates = {
      ...currentUserStates,
      [sessionUser.id]: sessionUserState,
    }

    dispatch({
      type: 'SYNC_SESSION',
      payload: {
        user: sessionUser,
        users: nextUsers.length > 0 ? nextUsers : [sessionUser],
        userStates: nextUserStates,
        firebaseEnabled: stateRef.current.firebaseEnabled,
        activityEntry: activityType
          ? createActivityEntry(activityType, {
              userId: sessionUser.id,
              provider: sessionUser.provider,
              systemRole: sessionUser.systemRole,
            })
          : null,
      },
    })

    return sessionUser
  }, [])

  const hidratarSesionFirebase = useCallback(async (firebaseUser, { activityType = null, profileSeed = null } = {}) => {
    if (!firebaseUser) {
      dispatch({
        type: 'CLEAR_SESSION',
        payload: { firebaseEnabled: stateRef.current.firebaseEnabled },
      })
      return null
    }

    const redirectSeed = profileSeed ?? consumirSemillaRedireccionGoogle()
    const existingProfile = await obtenerPerfilUsuario(firebaseUser.uid)
    const profile =
      existingProfile ??
      await asegurarPerfilUsuario(firebaseUser, redirectSeed ?? {})

    if (!profile) {
      dispatch({
        type: 'CLEAR_SESSION',
        payload: { firebaseEnabled: stateRef.current.firebaseEnabled },
      })
      return null
    }

    if (profile.status === 'disabled') {
      await cerrarSesionFirebase()
      dispatch({
        type: 'CLEAR_SESSION',
        payload: { firebaseEnabled: stateRef.current.firebaseEnabled },
      })
      return null
    }

    return sincronizarSesionResuelta(
      firebaseUser,
      {
        ...profile,
        emailVerified: firebaseUser.emailVerified,
      },
      activityType,
    )
  }, [sincronizarSesionResuelta])

  useEffect(() => {
    stateRef.current = state
  }, [state])

  useEffect(() => {
    actualizarSnapshotContenido(state.content)
  }, [state.content])

  useEffect(() => {
    if (!state.authReady || !state.user) {
      return
    }

    const missingLessonExerciseSnapshots = {}
    const missingUnitLessonSnapshots = {}
    const missingCourseUnitSnapshots = {}

    normalizarListaIds(state.progress.completedLessons).forEach((lessonId) => {
      const record = obtenerRegistroLeccion(lessonId)

      if (!record) {
        return
      }

      const existingExerciseSnapshot = state.progress.lessonExerciseSnapshots?.[lessonId]
      const existingUnitSnapshot = state.progress.unitLessonSnapshots?.[record.unit.id]
      const existingCourseSnapshot = state.progress.courseUnitSnapshots?.[record.course.id]
      const exerciseIds = obtenerEjerciciosLeccion(record.lesson).map((exercise) => exercise.id)
      const lessonIds = normalizarListaIds(record.unit.lessons.map((lesson) => lesson.id))
      const unitIds = normalizarListaIds(record.course.units.map((unit) => unit.id))

      if (
        (!Array.isArray(existingExerciseSnapshot) || existingExerciseSnapshot.length === 0) &&
        exerciseIds.length > 0
      ) {
        missingLessonExerciseSnapshots[lessonId] = exerciseIds
      }

      if (
        (!Array.isArray(existingUnitSnapshot) || existingUnitSnapshot.length === 0) &&
        lessonIds.length > 0
      ) {
        missingUnitLessonSnapshots[record.unit.id] = lessonIds
      }

      if (
        (!Array.isArray(existingCourseSnapshot) || existingCourseSnapshot.length === 0) &&
        unitIds.length > 0
      ) {
        missingCourseUnitSnapshots[record.course.id] = unitIds
      }
    })

    if (
      Object.keys(missingLessonExerciseSnapshots).length > 0 ||
      Object.keys(missingUnitLessonSnapshots).length > 0 ||
      Object.keys(missingCourseUnitSnapshots).length > 0
    ) {
      dispatch({
        type: 'ENSURE_PROGRESS_SNAPSHOTS',
        payload: {
          lessonExerciseSnapshots: missingLessonExerciseSnapshots,
          unitLessonSnapshots: missingUnitLessonSnapshots,
          courseUnitSnapshots: missingCourseUnitSnapshots,
        },
      })
    }
  }, [
    state.authReady,
    state.content,
    state.progress.completedLessons,
    state.progress.courseUnitSnapshots,
    state.progress.lessonExerciseSnapshots,
    state.progress.unitLessonSnapshots,
    state.user,
  ])

  useEffect(() => {
    if (state.user) {
      return
    }

    persistedActivityIdsRef.current = new Set()
    syncingActivityIdsRef.current = new Set()
  }, [state.user])

  useEffect(() => {
    aplicarTemaPreferido(state.themePreference)
  }, [state.themePreference])

  useEffect(() => {
    if (persistStateTimerRef.current) {
      clearTimeout(persistStateTimerRef.current)
    }

    persistStateTimerRef.current = setTimeout(() => {
      guardarEstadoApp({
        themePreference: state.themePreference,
        content: state.content,
      })
      persistStateTimerRef.current = null
    }, 180)

    return () => {
      if (persistStateTimerRef.current) {
        clearTimeout(persistStateTimerRef.current)
        persistStateTimerRef.current = null
      }
    }
  }, [state.themePreference, state.content])

  useEffect(() => {
    if (!state.firebaseEnabled) {
      dispatch({
        type: 'SET_AUTH_STATUS',
        payload: { authReady: true, firebaseEnabled: false },
      })
      return undefined
    }

    const unsubscribe = suscribirSesionFirebase(
      async (firebaseUser) => {
        try {
          await hidratarSesionFirebase(firebaseUser)
        } catch (error) {
          console.error('No pudimos restaurar la sesión con Firebase.', error)
          dispatch({
            type: 'CLEAR_SESSION',
            payload: { firebaseEnabled: true },
          })
        }
      },
      (error) => {
        console.error('La suscripcion de Firebase Auth fallo.', error)
        dispatch({
          type: 'SET_AUTH_STATUS',
          payload: { authReady: true, firebaseEnabled: true },
        })
      },
    )

    return unsubscribe
  }, [hidratarSesionFirebase, state.firebaseEnabled])

  useEffect(() => {
    if (!state.firebaseEnabled) {
      contentRemoteReadyRef.current = true
      hydratingRemoteContentRef.current = ''
      pendingRemoteContentRef.current = ''
      inFlightRemoteContentRef.current = ''
      persistedRemoteContentRef.current = JSON.stringify(
        serializarContenidoPersistible(stateRef.current.content),
      )
      return undefined
    }

    contentRemoteReadyRef.current = false
    dispatch({
      type: 'SET_CMS_SYNC',
      payload: {
        status: 'loading',
        message: 'Cargando contenido del CMS desde Firestore...',
        isReady: false,
      },
    })

    const unsubscribe = suscribirContenidoCms(
      (remoteContent) => {
        const wasRemoteReady = contentRemoteReadyRef.current
        const normalizedContent = normalizarContenidoPersistido(remoteContent)
        const serializedRemoteContent = JSON.stringify(
          serializarContenidoPersistible(normalizedContent),
        )
        const serializedCurrentContent = JSON.stringify(
          serializarContenidoPersistible(stateRef.current.content),
        )
        const pendingSerializedContent = pendingRemoteContentRef.current
        const remoteMatchesPending =
          pendingSerializedContent && serializedRemoteContent === pendingSerializedContent

        contentRemoteReadyRef.current = true
        persistedRemoteContentRef.current = serializedRemoteContent

        if (remoteMatchesPending) {
          pendingRemoteContentRef.current = ''
          dispatch({
            type: 'SET_CMS_SYNC',
            payload: {
              status: 'saved',
              message: 'Cambios del CMS sincronizados con Firestore.',
              lastSavedAt: new Date().toISOString(),
              isReady: true,
            },
          })
        }

        if (!wasRemoteReady && !remoteMatchesPending) {
          dispatch({
            type: 'SET_CMS_SYNC',
            payload: {
              status: 'idle',
              message: '',
              isReady: true,
            },
          })
        }

        if (
          pendingSerializedContent &&
          serializedCurrentContent === pendingSerializedContent &&
          serializedRemoteContent !== pendingSerializedContent
        ) {
          return
        }

        if (serializedRemoteContent !== serializedCurrentContent) {
          hydratingRemoteContentRef.current = serializedRemoteContent
          dispatch({
            type: 'SET_CONTENT',
            payload: normalizedContent,
          })
        }
      },
      (error) => {
        console.error('No pudimos sincronizar el contenido del CMS desde Firestore.', error)
        contentRemoteReadyRef.current = true
        dispatch({
          type: 'SET_CMS_SYNC',
          payload: {
            status: 'error',
            message: 'No pudimos leer el contenido remoto del CMS.',
            isReady: true,
          },
        })
      },
    )

    return unsubscribe
  }, [state.firebaseEnabled])

  useEffect(() => {
    if (
      !state.firebaseEnabled ||
      !state.authReady ||
      !esUsuarioAdministrador(state.user) ||
      !shouldSyncAdminUsers
    ) {
      return undefined
    }

    const unsubscribe = suscribirPerfilesUsuarios(
      (entries) => {
        const nextUsers = entries.map((entry) => entry.user)
        const nextUserStates = entries.reduce((accumulator, entry) => {
          accumulator[entry.user.id] = entry.state
          return accumulator
        }, {})

        dispatch({
          type: 'SET_USERS_AND_STATES',
          payload: {
            users: nextUsers,
            userStates: nextUserStates,
            currentUserId: state.user?.id ?? null,
          },
        })
      },
      (error) => {
        console.error('No pudimos sincronizar la lista de usuarios desde Firestore.', error)
      },
    )

    return unsubscribe
  }, [shouldSyncAdminUsers, state.authReady, state.firebaseEnabled, state.user])

  useEffect(() => {
    if (
      !state.firebaseEnabled ||
      !state.authReady ||
      !esUsuarioAdministrador(state.user) ||
      !shouldSyncAdminActivity
    ) {
      return undefined
    }

    const unsubscribe = suscribirActividadPlataforma(
      (entries) => {
        persistedActivityIdsRef.current = new Set([
          ...persistedActivityIdsRef.current,
          ...entries.map((entry) => entry.id),
        ])

        dispatch({
          type: 'SYNC_ACTIVITY_FEED',
          payload: entries,
        })
      },
      (error) => {
        console.error('No pudimos sincronizar la actividad de plataforma desde Firestore.', error)
      },
    )

    return unsubscribe
  }, [shouldSyncAdminActivity, state.authReady, state.firebaseEnabled, state.user])

  useEffect(() => {
    if (!state.firebaseEnabled || !state.authReady || !state.user) {
      persistedLearningStateRef.current = ''
      return
    }

    const serializedLearningState = JSON.stringify({
      userId: state.user.id,
      onboarding: state.onboarding,
      progress: state.progress,
    })

    if (serializedLearningState === persistedLearningStateRef.current) {
      return
    }

    persistedLearningStateRef.current = serializedLearningState

    guardarEstadoAprendizajeUsuario(state.user.id, {
      onboarding: state.onboarding,
      progress: state.progress,
    }).catch((error) => {
      console.error('No pudimos guardar el progreso del usuario en Firestore.', error)
    })
  }, [state.authReady, state.firebaseEnabled, state.onboarding, state.progress, state.user])

  useEffect(() => {
    if (!hydratingRemoteContentRef.current) {
      return
    }

    const serializedContent = JSON.stringify(serializarContenidoPersistible(state.content))

    if (serializedContent === hydratingRemoteContentRef.current) {
      hydratingRemoteContentRef.current = ''
    }
  }, [state.content])

  useEffect(() => {
    if (
      !state.firebaseEnabled ||
      !state.authReady ||
      !esUsuarioAdministrador(state.user) ||
      !contentRemoteReadyRef.current
    ) {
      return
    }

    const serializedContent = JSON.stringify(serializarContenidoPersistible(state.content))

    if (hydratingRemoteContentRef.current) {
      return
    }

    if (
      serializedContent === persistedRemoteContentRef.current &&
      pendingRemoteContentRef.current === ''
    ) {
      return
    }

    if (
      pendingRemoteContentRef.current === serializedContent ||
      inFlightRemoteContentRef.current === serializedContent
    ) {
      return
    }

    pendingRemoteContentRef.current = serializedContent
    inFlightRemoteContentRef.current = serializedContent
    dispatch({
      type: 'SET_CMS_SYNC',
      payload: {
        status: 'saving',
        message: 'Guardando cambios del CMS en Firestore...',
        isReady: true,
      },
    })

    guardarContenidoCms(state.content, state.user)
      .then(() => {
        if (pendingRemoteContentRef.current === serializedContent) {
          dispatch({
            type: 'SET_CMS_SYNC',
            payload: {
              status: 'saved',
              message: 'Cambios del CMS guardados. Firestore ya recibió la actualización.',
              lastSavedAt: new Date().toISOString(),
              isReady: true,
            },
          })
        }
      })
      .catch((error) => {
        console.error('No pudimos guardar el contenido del CMS en Firestore.', error)

        if (pendingRemoteContentRef.current === serializedContent) {
          pendingRemoteContentRef.current = ''
          dispatch({
            type: 'SET_CMS_SYNC',
            payload: {
              status: 'error',
              message: 'No pudimos sincronizar el CMS con Firestore. Intenta guardar de nuevo.',
              isReady: true,
            },
          })
        }
      })
      .finally(() => {
        if (inFlightRemoteContentRef.current === serializedContent) {
          inFlightRemoteContentRef.current = ''
        }
      })
  }, [state.authReady, state.content, state.firebaseEnabled, state.user])

  useEffect(() => {
    if (!state.firebaseEnabled || !state.authReady || !state.user) {
      return undefined
    }

    const pendingEntries = state.activity.filter(
      (entry) =>
        entry?.id &&
        entry.userId === state.user.id &&
        !persistedActivityIdsRef.current.has(entry.id) &&
        !syncingActivityIdsRef.current.has(entry.id),
    )

    if (pendingEntries.length === 0) {
      return undefined
    }

    let isCancelled = false

    pendingEntries.forEach((entry) => {
      syncingActivityIdsRef.current.add(entry.id)

      registrarEventoPlataforma(entry, state.user)
        .then(() => {
          syncingActivityIdsRef.current.delete(entry.id)

          if (!isCancelled) {
            persistedActivityIdsRef.current.add(entry.id)
          }
        })
        .catch((error) => {
          syncingActivityIdsRef.current.delete(entry.id)
          console.error('No pudimos registrar la actividad de plataforma en Firestore.', error)
        })
    })

    return () => {
      isCancelled = true
    }
  }, [state.activity, state.authReady, state.firebaseEnabled, state.user])

  const actions = {
    async authenticate(formData, mode) {
      if (!state.firebaseEnabled) {
        throw new Error(
          'El acceso real no está configurado todavía en este entorno. Agrega las variables necesarias para activarlo.',
        )
      }

      const profileSeed = {
        name: formData.name?.trim() ?? '',
        nickname: formData.nickname?.trim() ?? '',
        role: formData.role,
        interests: formData.interests,
        experience: formData.experience,
        goalCourseId: formData.goalCourseId ?? null,
      }

      let session

      if (formData.provider === 'google') {
        session = await iniciarSesionConGoogle(profileSeed)
      } else if (mode === 'register') {
        session = await registrarCuentaConCorreo(formData, profileSeed)
      } else {
        session = await iniciarSesionConCorreoONickname(formData)
      }

      if (session?.redirectStarted) {
        return {
          redirectStarted: true,
          requiresEmailVerification: false,
        }
      }

      const sessionUser = await sincronizarSesionResuelta(
        session.firebaseUser,
        session.profile,
        session.activityType,
      )

      return {
        ...sessionUser,
        requiresEmailVerification: requiereVerificacionCorreo(sessionUser),
      }
    },

    async refreshAuthenticatedSession() {
      const firebaseUser = await refrescarUsuarioActualFirebase()

      if (!firebaseUser) {
        dispatch({
          type: 'CLEAR_SESSION',
          payload: { firebaseEnabled: stateRef.current.firebaseEnabled },
        })
        return null
      }

      const profile = await obtenerPerfilUsuario(firebaseUser.uid)
      const sessionUser = await hidratarSesionFirebase(firebaseUser, { profileSeed: profile })
      return sessionUser
    },

    async sendCurrentUserVerificationEmail() {
      await reenviarVerificacionCorreoActual()
    },

    async sendPasswordResetEmail(email) {
      await enviarCorreoRecuperacion(email)
    },

    async logout() {
      await cerrarSesionFirebase()
    },

    async deleteCurrentUserAccount({ currentPassword = '' } = {}) {
      if (!stateRef.current.user) {
        throw new Error('No hay una sesión activa para borrar la cuenta.')
      }

      const currentUserProfile = {
        ...stateRef.current.user,
        email: stateRef.current.user.email,
        name: stateRef.current.user.name,
        nameNormalized: stateRef.current.user.nameNormalized,
        nickname: stateRef.current.user.nickname ?? '',
        nicknameNormalized: stateRef.current.user.nicknameNormalized ?? '',
      }

      await reautenticarUsuarioActualParaBorrado({ currentPassword })
      await eliminarPerfilUsuarioYReferencias(stateRef.current.user.id, currentUserProfile)
      await eliminarUsuarioActualAuth()

      dispatch({
        type: 'CLEAR_SESSION',
        payload: { firebaseEnabled: stateRef.current.firebaseEnabled },
      })
    },

    async updateUserProfile(profileData) {
      if (!stateRef.current.user) {
        throw new Error('No hay una sesión activa para actualizar el perfil.')
      }

      const nextName = crearNombreCompleto(profileData.name) || stateRef.current.user.name
      const nextNickname =
        profileData.nickname != null
          ? profileData.nickname.trim()
          : (stateRef.current.user.nickname ?? '').trim()

      if (profileData.name != null && nextName) {
        const nameOwner = await buscarPerfilPorNombreVisible(nextName, { allowLegacy: true })

        if (nameOwner && nameOwner.id !== stateRef.current.user.id) {
          throw new Error('Ese nombre de usuario ya está en uso. Elige otro distinto.')
        }
      }

      if (profileData.nickname != null && nextNickname) {
        const nicknameMessage = validarNickname(nextNickname)

        if (nicknameMessage) {
          throw new Error(nicknameMessage)
        }

        const nicknameOwner = await buscarPerfilPorNickname(nextNickname)

        if (nicknameOwner && nicknameOwner.id !== stateRef.current.user.id) {
          throw new Error('Ese nickname ya está en uso. Elige otro distinto.')
        }
      }

      const nextProfilePatch = {
        name: nextName,
        nameAutoAssigned:
          profileData.nameAutoAssigned ??
          (profileData.name != null ? false : stateRef.current.user.nameAutoAssigned ?? false),
        nickname: nextNickname,
        role: profileData.role ?? stateRef.current.user.role ?? 'programadores',
        experience: profileData.experience ?? stateRef.current.user.experience ?? 'principiante',
        interests: profileData.interests ?? stateRef.current.user.interests ?? ['bases'],
        goalCourseId: profileData.goalCourseId ?? stateRef.current.user.goalCourseId ?? null,
      }

      if (nextProfilePatch.name !== stateRef.current.user.name) {
        await actualizarNombreVisibleUsuarioActual(nextProfilePatch.name)
      }
      const nextProfile = await guardarPerfilUsuario(stateRef.current.user.id, nextProfilePatch)
      const nextUser = construirUsuarioAplicacion(stateRef.current.user, nextProfile)
      const nextUsers = upsertUser(stateRef.current.users, nextUser)
      const nextUserStates = {
        ...stateRef.current.userStates,
        [nextUser.id]: stateRef.current.userStates[nextUser.id] ?? crearEstadoUsuarioInicial(),
      }

      dispatch({
        type: 'SYNC_SESSION',
        payload: {
          user: nextUser,
          users: nextUsers,
          userStates: nextUserStates,
          firebaseEnabled: stateRef.current.firebaseEnabled,
          activityEntry: createActivityEntry('profile_updated', {
            userId: nextUser.id,
          }),
        },
      })

      return nextUser
    },

    async updateCurrentUserPassword({ currentPassword, nextPassword }) {
      if (!stateRef.current.user) {
        throw new Error('No hay una sesión activa para cambiar la contraseña.')
      }

      if (stateRef.current.user.provider !== 'email') {
        throw new Error('Este cambio de contraseña solo aplica para cuentas con correo.')
      }

      const passwordMessage = obtenerMensajeContrasenaMinima(nextPassword)

      if (passwordMessage) {
        throw new Error(passwordMessage)
      }

      await actualizarContrasenaUsuarioActual({
        currentPassword,
        nextPassword,
      })

      dispatch({
        type: 'APPEND_ACTIVITY',
        payload: createActivityEntry('password_updated', {
          userId: stateRef.current.user.id,
          targetUserId: stateRef.current.user.id,
        }),
      })
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

    completeExercise(lessonId, exerciseId, lessonExerciseIds = []) {
      dispatch({
        type: 'COMPLETE_EXERCISE',
        payload: { lessonId, exerciseId, lessonExerciseIds },
      })
    },

    revealExerciseSolution(lessonId, exerciseId, lessonExerciseIds = [], penaltyXp = 0) {
      dispatch({
        type: 'REVEAL_EXERCISE_SOLUTION',
        payload: { lessonId, exerciseId, lessonExerciseIds, penaltyXp },
      })
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

    deleteCourse(courseId) {
      dispatch({
        type: 'SET_CONTENT',
        payload: eliminarCursoEnContenido(state.content, courseId),
        meta: {
          activityType: 'course_deleted',
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

    async setSystemRole(userId, systemRole) {
      const nextUsers = stateRef.current.users.map((user) =>
        user.id === userId ? { ...user, systemRole } : user,
      )

      await guardarPerfilUsuario(userId, { systemRole })

      dispatch({
        type: 'SET_USERS_AND_STATES',
        payload: {
          users: nextUsers,
          userStates: stateRef.current.userStates,
          currentUserId: stateRef.current.user?.id ?? null,
        },
        meta: {
          activityType: 'user_role_updated',
          payload: { targetUserId: userId, systemRole },
        },
      })
    },

    async toggleUserStatus(userId) {
      if (stateRef.current.user?.id === userId) {
        throw new Error('No puedes deshabilitar tu propia cuenta desde esta sesión.')
      }

      const targetUser = stateRef.current.users.find((user) => user.id === userId)

      if (!targetUser) {
        throw new Error('No encontramos esa cuenta para actualizar su estado.')
      }

      const nextStatus = targetUser.status === 'disabled' ? 'active' : 'disabled'
      const nextUsers = stateRef.current.users.map((user) =>
        user.id === userId ? { ...user, status: nextStatus } : user,
      )

      await guardarPerfilUsuario(userId, { status: nextStatus })

      dispatch({
        type: 'SET_USERS_AND_STATES',
        payload: {
          users: nextUsers,
          userStates: stateRef.current.userStates,
          currentUserId: stateRef.current.user?.id ?? null,
        },
        meta: {
          activityType: 'user_status_toggled',
          payload: { targetUserId: userId, status: nextStatus },
        },
      })
    },

    async requestPasswordReset(userId) {
      const targetUser = stateRef.current.users.find((user) => user.id === userId)

      if (!targetUser) {
        throw new Error('No encontramos esa cuenta para enviar el correo de recuperación.')
      }

      if (targetUser.provider !== 'email') {
        throw new Error('El correo de recuperación solo aplica a cuentas registradas con correo.')
      }

      await enviarCorreoRecuperacion(targetUser.email)

      dispatch({
        type: 'APPEND_ACTIVITY',
        payload: createActivityEntry('password_reset_requested', {
          userId: stateRef.current.user?.id,
          targetUserId: userId,
        }),
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


