import { Boton } from '../../../componentes/Boton.jsx'
import { Modal } from '../../../componentes/Modal.jsx'

export function DialogoAcceso({ courseTitle, open, onClose, onLogin, onRegister }) {
  return (
    <Modal open={open} onClose={onClose} size="md">
      <div className="space-y-6 px-6 py-6 lg:px-8">
        <div className="space-y-3">
          <p className="eyebrow">Acceso requerido</p>
          <h2 className="font-display text-3xl font-semibold text-foam">
            Para empezar {courseTitle ?? 'este curso'} necesitas una cuenta
          </h2>
          <p className="text-mute">
            Ya viste las unidades y el recorrido. Ahora puedes elegir si quieres iniciar sesión o crear tu perfil para guardar progreso, desbloqueos y recomendaciones.
          </p>
        </div>

        <div className="grid gap-3">
          <Boton onClick={onLogin}>Iniciar sesión</Boton>
          <Boton variant="secondary" onClick={onRegister}>
            Crear cuenta
          </Boton>
          <Boton variant="ghost" onClick={onClose}>
            Aún no
          </Boton>
        </div>
      </div>
    </Modal>
  )
}

