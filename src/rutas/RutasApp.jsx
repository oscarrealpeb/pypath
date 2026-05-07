import { Route, Routes } from 'react-router-dom'
import { LayoutAdministracion } from '../componentes/LayoutAdministracion.jsx'
import { LayoutPlataforma } from '../componentes/LayoutPlataforma.jsx'
import { PaginaAdminContenido } from '../modulos/administracion/paginas/PaginaAdminContenido.jsx'
import { PaginaAdminInicio } from '../modulos/administracion/paginas/PaginaAdminInicio.jsx'
import { PaginaAdminMetricas } from '../modulos/administracion/paginas/PaginaAdminMetricas.jsx'
import { PaginaAdminUsuarios } from '../modulos/administracion/paginas/PaginaAdminUsuarios.jsx'
import { PaginaEvaluacion } from '../modulos/evaluaciones/paginas/PaginaEvaluacion.jsx'
import { PaginaAutenticacion } from '../modulos/autenticacion/paginas/PaginaAutenticacion.jsx'
import { PaginaCurso } from '../modulos/cursos/paginas/PaginaCurso.jsx'
import { PaginaPanel } from '../modulos/cursos/paginas/PaginaPanel.jsx'
import { PaginaInicio } from '../modulos/inicio/paginas/PaginaInicio.jsx'
import { PaginaLeccion } from '../modulos/lecciones/paginas/PaginaLeccion.jsx'
import { PaginaDiagnostico } from '../modulos/diagnostico/paginas/PaginaDiagnostico.jsx'
import { PaginaPerfil } from '../modulos/perfil/paginas/PaginaPerfil.jsx'
import { RutaAdministrador } from './RutaAdministrador.jsx'
import { RutaProtegida } from './RutaProtegida.jsx'
import { RutaSoloPublica } from './RutaSoloPublica.jsx'
import { RutaEstudiante } from './RutaEstudiante.jsx'

function PaginaNoEncontrada() {
  return (
    <div className="page-shell flex min-h-screen items-center justify-center px-4">
      <div className="panel max-w-xl p-8 text-center">
        <p className="eyebrow">Página no encontrada</p>
        <h1 className="mt-5 font-display text-4xl font-semibold text-foam">404</h1>
        <p className="mt-3 text-mute">
          Esa página no existe. Vuelve al panel y retoma tu siguiente misión.
        </p>
      </div>
    </div>
  )
}

export function RutasApp() {
  return (
    <Routes>
      <Route path="/" element={<PaginaInicio />} />

      <Route element={<RutaSoloPublica />}>
        <Route path="/login" element={<PaginaAutenticacion mode="login" />} />
        <Route path="/register" element={<PaginaAutenticacion mode="register" />} />
        <Route
          path="/control"
          element={<PaginaAutenticacion mode="login" portal="admin" requireAdminAccess />}
        />
      </Route>

      <Route element={<RutaAdministrador />}>
        <Route element={<LayoutAdministracion />}>
          <Route path="/admin" element={<PaginaAdminInicio />} />
          <Route path="/admin/contenido" element={<PaginaAdminContenido />} />
          <Route path="/admin/usuarios" element={<PaginaAdminUsuarios />} />
          <Route path="/admin/metricas" element={<PaginaAdminMetricas />} />
        </Route>
      </Route>

      <Route element={<RutaProtegida />}>
        <Route element={<RutaEstudiante />}>
          <Route element={<LayoutPlataforma />}>
            <Route path="/onboarding" element={<PaginaDiagnostico />} />
            <Route path="/dashboard" element={<PaginaPanel />} />
            <Route path="/profile" element={<PaginaPerfil />} />
            <Route path="/course/:id" element={<PaginaCurso />} />
            <Route
              path="/course/:id/unit/:unitId/evaluation"
              element={<PaginaEvaluacion mode="unit" />}
            />
            <Route
              path="/course/:id/final-evaluation"
              element={<PaginaEvaluacion mode="course" />}
            />
            <Route path="/lesson/:id" element={<PaginaLeccion />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<PaginaNoEncontrada />} />
    </Routes>
  )
}
