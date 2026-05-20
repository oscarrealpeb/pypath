import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Boton } from '../../../componentes/Boton.jsx'
import { Tarjeta } from '../../../componentes/Tarjeta.jsx'
import { firebaseAuth } from '../servicios/clienteFirebase.js'
import {
  esUsuarioAdministrador,
  requiereVerificacionCorreo,
} from '../servicios/servicioFirebaseAutenticacion.js'
import { useAccionesApp, useEstadoApp } from '../../progreso/contexto/useEstadoApp.js'

export function PaginaVerificarCorreo() {
  const navigate = useNavigate()
  const { user } = useEstadoApp()
  const {
    logout,
    refreshAuthenticatedSession,
    sendCurrentUserVerificationEmail,
  } = useAccionesApp()
  const [isSending, setIsSending] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const resolvedSessionEmail = user?.email ?? firebaseAuth?.currentUser?.email ?? ''

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (esUsuarioAdministrador(user)) {
    return <Navigate to="/admin/contenido" replace />
  }

  if (!requiereVerificacionCorreo(user)) {
    return <Navigate to="/dashboard" replace />
  }

  async function handleResend() {
    setIsSending(true)
    setError('')
    setSuccessMessage('')

    try {
      await sendCurrentUserVerificationEmail()
      setSuccessMessage('Te reenviamos el correo de verificación. Revisa tu bandeja y spam.')
    } catch (verificationError) {
      setError(verificationError.message || 'No pudimos reenviar el correo de verificación.')
    } finally {
      setIsSending(false)
    }
  }

  async function handleRefresh() {
    setIsRefreshing(true)
    setError('')
    setSuccessMessage('')

    try {
      const refreshedUser = await refreshAuthenticatedSession()

      if (refreshedUser && !requiereVerificacionCorreo(refreshedUser)) {
        navigate('/dashboard', { replace: true })
        return
      }

      setSuccessMessage(
        'Aún no vemos la verificación reflejada. Si ya confirmaste, espera unos segundos y vuelve a intentar.',
      )
    } catch (refreshError) {
      setError(refreshError.message || 'No pudimos refrescar el estado del correo.')
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <div className="page-shell flex min-h-screen items-center py-10">
      <div className="content-width w-full">
        <Tarjeta className="mx-auto max-w-2xl space-y-6 p-8 lg:p-10">
          <div className="space-y-3 text-center">
            <p className="eyebrow">Seguridad</p>
            <h1 className="font-display text-3xl font-semibold text-foam">
              Confirma tu correo antes de continuar
            </h1>
            <p className="text-sm text-mute">
              Tu cuenta ya fue creada, pero por seguridad necesitamos que abras el correo enviado a{' '}
              <span className="font-semibold text-foam">{resolvedSessionEmail}</span> y confirmes el enlace.
            </p>
          </div>

          <div className="rounded-2xl border border-border/80 bg-white/5 p-5 text-sm text-mute">
            Por seguridad, el acceso queda habilitado cuando el correo ya aparece como verificado.
          </div>

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

          <div className="flex flex-col gap-3 sm:flex-row">
            <Boton onClick={handleRefresh} disabled={isRefreshing}>
              {isRefreshing ? 'Revisando estado...' : 'Ya confirmé, revisar de nuevo'}
            </Boton>
            <Boton variant="secondary" onClick={handleResend} disabled={isSending}>
              {isSending ? 'Reenviando...' : 'Reenviar correo'}
            </Boton>
            <Boton variant="ghost" onClick={() => logout()}>
              Cerrar sesión
            </Boton>
          </div>
        </Tarjeta>
      </div>
    </div>
  )
}
