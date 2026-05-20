import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import Aplicacion from './Aplicacion.jsx'
import { ProveedorEstadoApp } from './modulos/progreso/contexto/ProveedorEstadoApp.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter useTransitions={false}>
    <ProveedorEstadoApp>
      <Aplicacion />
    </ProveedorEstadoApp>
  </BrowserRouter>,
)

