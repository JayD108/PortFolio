import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* Cookie-free page view counts. Does nothing until Web Analytics is turned on in the Vercel dashboard. */}
    <Analytics />
  </StrictMode>,
)
