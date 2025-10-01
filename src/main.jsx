import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Viagem from './pages/Viagem/index.jsx'
import ViagemFinalizar from './pages/Viagem/Components/ViagemFinalizar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Viagem />
  </StrictMode>,
)
