import { useEffect, useMemo, useState } from 'react'
import { Boton } from '../../../componentes/Boton.jsx'
import { MensajeValidacionCampo } from '../../../componentes/MensajeValidacionCampo.jsx'
import { Modal } from '../../../componentes/Modal.jsx'
import { useAccionesApp } from '../../progreso/contexto/useEstadoApp.js'
import { verificarDisponibilidadNombreVisible } from '../servicios/servicioPerfilesFirebase.js'
import {
  crearNombreCompleto,
  validarNombreVisible,
} from '../servicios/servicioValidacionAutenticacion.js'

function crearEstadoFeedbackBase() {
  return {
    status: 'idle',
    message: '',
  }
}

export function DialogoNombreUsuarioGoogle({ open, onClose, user }) {
  const { updateUserProfile } = useAccionesApp()
  const [name, setName] = useState(user?.name ?? '')
  const [error, setError] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [nameAvailabilityFeedback, setNameAvailabilityFeedback] = useState(crearEstadoFeedbackBase)
  const currentName = crearNombreCompleto(user?.name ?? '')

  const nameFeedback = useMemo(() => {
    const trimmedName = crearNombreCompleto(name)

    if (!trimmedName) {
      return {
        status: 'invalid',
        message: 'Agrega un nombre de usuario para continuar.',
      }
    }

    const nameMessage = validarNombreVisible(trimmedName)

    if (nameMessage) {
      return {
        status: 'invalid',
        message: nameMessage,
      }
    }

    if (trimmedName === currentName) {
      return {
        status: 'owned',
        message:
          'Ese nombre ya quedó reservado para tu cuenta. Puedes usarlo así o cambiarlo ahora.',
      }
    }

    return nameAvailabilityFeedback
  }, [currentName, name, nameAvailabilityFeedback])

  useEffect(() => {
    if (!open) {
      return undefined
    }

    const trimmedName = crearNombreCompleto(name)
    const nameMessage = validarNombreVisible(trimmedName)

    if (!trimmedName || nameMessage || trimmedName === currentName) {
      return undefined
    }

    let isCancelled = false

    const timeoutId = window.setTimeout(async () => {
      setNameAvailabilityFeedback({
        status: 'checking',
        message: 'Validando disponibilidad del nombre de usuario...',
      })

      const nextFeedback = await verificarDisponibilidadNombreVisible(trimmedName, user?.id ?? '')

      if (!isCancelled) {
        setNameAvailabilityFeedback(nextFeedback)
      }
    }, 350)

    return () => {
      isCancelled = true
      window.clearTimeout(timeoutId)
    }
  }, [currentName, name, open, user?.id])

  async function guardarNombreSeleccionado(nextName) {
    const trimmedName = crearNombreCompleto(nextName)
    const nameMessage = validarNombreVisible(trimmedName)

    if (nameMessage) {
      setError(nameMessage)
      return
    }

    const nextNameFeedback = await verificarDisponibilidadNombreVisible(trimmedName, user?.id ?? '')
    setNameAvailabilityFeedback(nextNameFeedback)

    if (nextNameFeedback.status === 'invalid' || nextNameFeedback.status === 'taken') {
      setError(nextNameFeedback.message)
      return
    }

    setIsSaving(true)
    setError('')

    try {
      await updateUserProfile({
        name: trimmedName,
        nameAutoAssigned: false,
      })
      onClose()
    } catch (updateError) {
      setError(updateError.message || 'No pudimos guardar tu nombre de usuario.')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    await guardarNombreSeleccionado(name)
  }

  return (
    <Modal open={open} onClose={onClose} size="md">
      <div className="space-y-6 px-6 py-6 lg:px-8">
        <div className="space-y-3">
          <p className="eyebrow">Primer acceso con Google</p>
          <h2 className="font-display text-3xl font-semibold text-foam">
            Elige tu nombre de usuario para entrar también sin Google
          </h2>
          <p className="text-mute">
            Ya te reservamos <span className="font-semibold text-foam">{currentName}</span> como
            opción inicial. Si quieres, puedes cambiarlo ahora por otro nombre único.
          </p>
          <p className="text-sm text-mute">
            Si cierras este diálogo por ahora, tu cuenta conservará ese nombre temporal y podrás
            ajustarlo luego desde tu perfil.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-foam">Nombre de usuario</span>
            <input
              className="field-input"
              type="text"
              name="name"
              placeholder="Sin espacios. Usa _ o - si lo necesitas"
              value={name}
              onChange={(event) => {
                setError('')
                setName(event.target.value)
              }}
            />
            <MensajeValidacionCampo feedback={nameFeedback} />
          </label>

          {error ? (
            <div className="rounded-2xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-red-100">
              {error}
            </div>
          ) : null}

          <div className="grid gap-3">
            <Boton type="submit" size="lg" fullWidth disabled={isSaving}>
              {isSaving
                ? 'Guardando...'
                : crearNombreCompleto(name) === currentName
                  ? 'Usar este nombre'
                  : 'Guardar nombre de usuario'}
            </Boton>
            <Boton type="button" variant="secondary" fullWidth disabled={isSaving} onClick={onClose}>
              Seguir así por ahora
            </Boton>
          </div>
        </form>
      </div>
    </Modal>
  )
}
