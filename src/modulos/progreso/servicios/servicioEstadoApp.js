import { leerAlmacenamiento, guardarAlmacenamiento } from '../../../utilidades/almacenamiento.js'
import {
  actualizarSnapshotContenido,
  crearContenidoInicial,
} from '../../contenido/servicios/repositorioContenido.js'
import { estaFirebaseConfigurado } from '../../autenticacion/servicios/clienteFirebase.js'
import {
  crearEstadoDiagnosticoInicial,
  crearEstadoUsuarioInicial,
  crearProgresoInicial,
} from './estadoUsuarioBase.js'

const STORAGE_KEY = 'pypath-app-state'

export { crearEstadoDiagnosticoInicial, crearEstadoUsuarioInicial, crearProgresoInicial }

export function crearEstadoInicial() {
  return {
    themePreference: 'system',
    firebaseEnabled: estaFirebaseConfigurado(),
    authReady: false,
    user: null,
    users: [],
    userStates: {},
    onboarding: crearEstadoDiagnosticoInicial(),
    progress: crearProgresoInicial(),
    content: crearContenidoInicial(),
    activity: [],
  }
}

function normalizeState(state) {
  const initialState = crearEstadoInicial()
  const normalizedState = {
    ...initialState,
    themePreference: state?.themePreference ?? initialState.themePreference,
    firebaseEnabled: estaFirebaseConfigurado(),
    authReady: false,
    user: null,
    users: [],
    userStates: {},
    onboarding: crearEstadoDiagnosticoInicial(),
    progress: crearProgresoInicial(),
    content: {
      ...initialState.content,
      ...(state?.content ?? {}),
      cursos: state?.content?.cursos ?? initialState.content.cursos,
      catalogoCursos: state?.content?.catalogoCursos ?? initialState.content.catalogoCursos,
      evaluacionesCursos:
        state?.content?.evaluacionesCursos ?? initialState.content.evaluacionesCursos,
      cursosBorrador: initialState.content.cursosBorrador,
    },
    activity: Array.isArray(state?.activity) ? state.activity : [],
  }

  actualizarSnapshotContenido(normalizedState.content)
  return normalizedState
}

export function cargarEstadoApp() {
  const cachedState = leerAlmacenamiento(STORAGE_KEY, null)

  if (cachedState) {
    return normalizeState(cachedState)
  }

  return normalizeState(crearEstadoInicial())
}

export function guardarEstadoApp(state) {
  actualizarSnapshotContenido(state.content)
  guardarAlmacenamiento(STORAGE_KEY, {
    themePreference: state.themePreference,
    content: state.content,
    activity: state.activity,
  })
}
