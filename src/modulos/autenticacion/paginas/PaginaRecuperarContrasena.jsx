import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Boton } from '../../../componentes/Boton.jsx'
import { Tarjeta } from '../../../componentes/Tarjeta.jsx'
import { esCorreoAdminPrivilegiado } from '../servicios/clienteFirebase.js'
import { esCorreoValido } from '../servicios/servicioValidacionAutenticacion.js'
import { useAccionesApp, useEstadoApp } from '../../progreso/contexto/useEstadoApp.js'

export function PaginaRecuperarContrasena() {
  const { firebaseEnabled } = useEstadoApp()
  const { sendPasswordResetEmail } = useAccionesApp()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSuccessMessage('')

    if (!esCorreoValido(email)) {
      setError('Escribe un correo válido para enviarte el enlace de recuperación.')
      return
    }

    if (esCorreoAdminPrivilegiado(email)) {
      setError(
        'La cuenta admin fija no usa recuperación por correo. Esa contraseña se cambia desde una sesión ya iniciada o con ayuda técnica del proyecto.',
      )
      return
    }

    setIsLoading(true)

    try {
      await sendPasswordResetEmail(email)
      setSuccessMessage(
        'Si el correo existe, te enviamos un enlace para recuperar tu contraseña.',
      )
    } catch (resetError) {
      setError(resetError.message || 'No pudimos enviar el correo de recuperación.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="page-shell flex min-h-screen items-center py-10">
      <div className="content-width w-full">
        <Tarjeta className="mx-auto max-w-xl space-y-6 p-8 lg:p-10">
          <div className="space-y-3 text-center">
            <p className="eyebrow">Recuperación</p>
            <h1 className="font-display text-3xl font-semibold text-foam">
              Recupera tu contraseña
            </h1>
            <p className="text-sm text-mute">
              Escribe tu correo y te enviaremos un enlace seguro para crear una nueva contraseña.
            </p>
          </div>

          <div className="rounded-2xl border border-border/80 bg-white/5 p-4 text-sm text-mute">
            Si manejas una cuenta admin fija sin buzón real, este flujo no aplica para esa cuenta.
          </div>

          {!firebaseEnabled ? (
            <div className="rounded-2xl border border-warning/30 bg-warning/10 px-4 py-3 text-sm text-foam">
              Este entorno todavía no tiene el acceso real configurado. Actívalo antes de usar
              este flujo.
            </div>
          ) : null}

          <form className="space-y-4" noValidate onSubmit={handleSubmit}>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-foam">Correo</span>
              <input
                className="field-input"
                type="email"
                value={email}
                placeholder="tu.correo@ejemplo.com"
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>

            {error ? (
              <div className="rounded-2xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-red-100">
                {error}
              </div>
            ) : null}

            {successMessage ? (
              <div className="rounded-2xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-foam">
                {successMessage}
              </div>
            ) : null}

            <Boton type="submit" fullWidth size="lg" disabled={isLoading || !firebaseEnabled}>
              {isLoading ? 'Enviando enlace...' : 'Enviar correo de recuperación'}
            </Boton>
          </form>

          <p className="text-sm text-mute">
            <Link to="/login" className="font-semibold text-primary transition hover:text-primary-soft">
              Volver al inicio de sesión
            </Link>
          </p>
        </Tarjeta>
      </div>
    </div>
  )
}
