import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Add desktop class when running inside Electron
if (typeof window !== 'undefined' && (window as any).desktop?.isDesktop) {
	document.addEventListener('DOMContentLoaded', () => {
		document.body.classList.add('desktop')
	})
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
