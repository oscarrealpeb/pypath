import { Tarjeta } from './Tarjeta.jsx'

export function PantallaCargandoAutenticacion() {
  return (
    <div className="page-shell flex min-h-screen items-center justify-center px-4">
      <Tarjeta accent className="max-w-xl space-y-4 px-8 py-10 text-center">
        <p className="eyebrow">Autenticación</p>
        <h1 className="font-display text-3xl font-semibold text-foam">
          Restaurando tu sesión
        </h1>
        <p className="text-mute">
          Estamos validando tu acceso y cargando tu perfil.
        </p>
      </Tarjeta>
    </div>
  )
}
