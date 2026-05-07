import { leerAlmacenamiento, guardarAlmacenamiento } from '../../../utilidades/almacenamiento.js'
import {
  crearContenidoInicial,
  actualizarSnapshotContenido,
} from '../../contenido/servicios/repositorioContenido.js'

const STORAGE_KEY = 'pypath-app-state'

export function crearEstadoDiagnosticoInicial() {
  return {
    completed: false,
    path: null,
    assessmentAttempt: null,
    assessmentResult: null,
  }
}

export function crearProgresoInicial() {
  return {
    completedLessons: [],
    completedUnitAssessments: [],
    completedCourseAssessments: [],
  }
}

export function crearEstadoUsuarioInicial() {
  return {
    onboarding: crearEstadoDiagnosticoInicial(),
    progress: crearProgresoInicial(),
    mustResetPassword: false,
  }
}

function createAdminUser() {
  return {
    id: 'admin-demo',
    email: 'admin@pypath.dev',
    name: 'Administrador PyPath',
    provider: 'email',
    role: 'programadores',
    interests: ['bases', 'interfaces'],
    experience: 'avanzado',
    goalCourseId: 'pyside6',
    systemRole: 'admin',
    status: 'active',
    createdAt: '2026-05-01T08:00:00.000Z',
    lastLoginAt: null,
  }
}

export function crearEstadoInicial() {
  const adminUser = createAdminUser()

  return {
    themePreference: 'system',
    user: null,
    users: [adminUser],
    userStates: {
      [adminUser.id]: crearEstadoUsuarioInicial(),
    },
    onboarding: crearEstadoDiagnosticoInicial(),
    progress: crearProgresoInicial(),
    content: crearContenidoInicial(),
    activity: [],
  }
}

function normalizeState(state) {
  const initialState = crearEstadoInicial()
  const normalizedUsers =
    Array.isArray(state?.users) && state.users.length > 0
      ? state.users
      : state?.user
        ? [
            {
              ...state.user,
              systemRole: state.user.systemRole ?? 'student',
              status: state.user.status ?? 'active',
              createdAt: state.user.createdAt ?? new Date().toISOString(),
              lastLoginAt: state.user.lastLoginAt ?? null,
            },
          ]
        : initialState.users
  const normalizedUserStates = {
    ...initialState.userStates,
    ...(state?.userStates ?? {}),
  }

  if (state?.user && !normalizedUserStates[state.user.id]) {
    normalizedUserStates[state.user.id] = {
      onboarding: state.onboarding ?? crearEstadoDiagnosticoInicial(),
      progress: state.progress ?? crearProgresoInicial(),
      mustResetPassword: false,
    }
  }

  const activeUserState =
    (state?.user && normalizedUserStates[state.user.id]) ?? crearEstadoUsuarioInicial()
  const normalizedState = {
    ...initialState,
    ...state,
    themePreference: state?.themePreference ?? initialState.themePreference,
    users: normalizedUsers,
    userStates: normalizedUserStates,
    onboarding: {
      ...crearEstadoDiagnosticoInicial(),
      ...(activeUserState.onboarding ?? state?.onboarding ?? {}),
    },
    progress: {
      ...crearProgresoInicial(),
      ...(activeUserState.progress ?? state?.progress ?? {}),
      completedLessons:
        activeUserState.progress?.completedLessons ??
        state?.progress?.completedLessons ??
        [],
      completedUnitAssessments:
        activeUserState.progress?.completedUnitAssessments ??
        state?.progress?.completedUnitAssessments ??
        [],
      completedCourseAssessments:
        activeUserState.progress?.completedCourseAssessments ??
        state?.progress?.completedCourseAssessments ??
        [],
    },
    content: {
      ...initialState.content,
      ...(state?.content ?? {}),
      cursos: state?.content?.cursos ?? initialState.content.cursos,
      catalogoCursos: state?.content?.catalogoCursos ?? initialState.content.catalogoCursos,
      evaluacionesCursos:
        state?.content?.evaluacionesCursos ?? initialState.content.evaluacionesCursos,
    },
    activity: state?.activity ?? [],
  }

  actualizarSnapshotContenido(normalizedState.content)
  return normalizedState
}

export function cargarEstadoApp() {
  const currentState = leerAlmacenamiento(STORAGE_KEY, null)

  if (currentState) {
    return normalizeState(currentState)
  }

  return normalizeState(crearEstadoInicial())
}

export function guardarEstadoApp(state) {
  actualizarSnapshotContenido(state.content)
  guardarAlmacenamiento(STORAGE_KEY, state)
}
