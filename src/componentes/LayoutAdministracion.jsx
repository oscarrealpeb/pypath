import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Boton } from './Boton.jsx'
import { SelectorTema } from './SelectorTema.jsx'
import { esCorreoAdminPrivilegiado } from '../modulos/autenticacion/servicios/clienteFirebase.js'
import { useAccionesApp, useEstadoApp } from '../modulos/progreso/contexto/useEstadoApp.js'
import { combinarClases } from '../utilidades/combinarClases.js'

function obtenerClasesEnlace(isActive) {
  return combinarClases(
    'rounded-full px-3 py-2 text-sm font-medium transition',
    isActive ? 'bg-primary/15 text-primary ring-1 ring-primary/20' : 'text-mute hover:text-foam',
  )
}

function rutaActiva(pathname, to, { end = false } = {}) {
  if (end) {
    return pathname === to
  }

  return pathname === to || pathname.startsWith(`${to}/`)
}

export function LayoutAdministracion() {
  const { user } = useEstadoApp()
  const { logout } = useAccionesApp()
  const navigate = useNavigate()
  const location = useLocation()
  const accountDisplayName = esCorreoAdminPrivilegiado(user?.email ?? '')
    ? 'Administrador PyPath'
    : (user?.name ?? 'Administrador')
  const enlacesAdmin = [
    { to: '/admin/contenido', label: 'Contenido' },
    { to: '/admin/resumen', label: 'Resumen' },
    { to: '/admin/usuarios', label: 'Usuarios' },
    { to: '/admin/metricas', label: 'Métricas' },
    { to: '/', label: 'Sitio público', end: true },
  ]

  function navegarAdmin(to) {
    if (location.pathname === to) {
      return
    }

    navigate(to, { flushSync: true })
  }

  return (
    <div className="page-shell">
      <header className="sticky top-0 z-20 border-b border-border/70 bg-obsidian/80 backdrop-blur">
        <div className="content-width flex flex-col gap-4 py-4 xl:flex-row xl:items-center xl:gap-4">
          <div className="flex items-center gap-4 xl:min-w-0 xl:w-[18rem] xl:flex-none 2xl:w-[21rem]">
            <NavLink to="/admin/contenido" className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-lg font-bold text-primary shadow-glow">
                P
              </div>
              <div className="min-w-0">
                <p className="font-display text-lg font-semibold text-foam">PyPath Control</p>
                <p className="hidden max-w-[24rem] text-sm leading-6 text-mute 2xl:block 2xl:max-w-[20rem]">
                  Panel interno para contenido, usuarios y métricas de la plataforma
                </p>
              </div>
            </NavLink>
          </div>

          <nav className="flex items-center justify-start gap-1.5 overflow-x-auto whitespace-nowrap px-1 pb-1 xl:min-w-0 xl:flex-1 xl:px-0 xl:pb-0 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
            {enlacesAdmin.map((enlace) => {
              const isActive = rutaActiva(location.pathname, enlace.to, { end: enlace.end })

              return (
                <button
                  key={enlace.to}
                  type="button"
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => navegarAdmin(enlace.to)}
                  className={obtenerClasesEnlace(isActive)}
                >
                  {enlace.label}
                </button>
              )
            })}
          </nav>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center xl:shrink-0">
            <div className="rounded-2xl border border-border/80 bg-white/5 px-3 py-2">
              <p className="text-xs uppercase tracking-[0.25em] text-mute">Cuenta</p>
              <p className="text-sm font-semibold text-foam">{accountDisplayName}</p>
              <p className="text-xs text-mute">Administrador</p>
            </div>
            <Boton variant="ghost" size="sm" onClick={logout}>
              Salir
            </Boton>
            <SelectorTema />
          </div>
        </div>
      </header>

      <main className="content-width py-10">
        <Outlet />
      </main>
    </div>
  )
}
