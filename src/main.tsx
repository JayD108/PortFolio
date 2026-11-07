import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.tsx'
import { initEffects } from './components/effects'

// Decides how much animation this device gets, before the first paint.
initEffects()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* Cookie-free page view counts. Only on Vercel, and only once Web Analytics is turned on in its dashboard. */}
    {import.meta.env.VITE_ON_VERCEL && <Analytics />}
  </StrictMode>,
)
