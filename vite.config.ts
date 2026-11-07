import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages serves this repo at https://jayd108.github.io/PortFolio/
// so assets need that prefix. If the repo is renamed, or the site moves to a
// root address such as JayD108.github.io, build with VITE_BASE=/ (or the new path).
const base = process.env.VITE_BASE ?? '/PortFolio/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
})
