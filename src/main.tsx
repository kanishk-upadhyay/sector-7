import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

const basename =
  typeof window !== 'undefined' && window.location.pathname.startsWith('/sector-7')
    ? '/sector-7'
    : (import.meta.env.BASE_URL?.replace(/\/$/, '') || '')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

