import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

// Vercel and the future mrittunjaydubey.in both serve the site from the root.
// For a sub-path host such as GitHub Pages, build with VITE_BASE=/PortFolio/ (or the repo name).
const base = process.env.VITE_BASE ?? '/'

// Link previews need the site's full address. On Vercel it comes from the production domain;
// set SITE_URL to override, for example once mrittunjaydubey.in is live.
const siteUrl = (
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://mrittunjaydubey.in')
).replace(/\/$/, '')

function siteUrlInHtml(): Plugin {
  return {
    name: 'site-url-in-html',
    transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', siteUrl + base.replace(/\/$/, '')),
  }
}

export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), siteUrlInHtml()],
  // Vercel Analytics only exists on Vercel, so other hosts skip it instead of logging a 404.
  define: { 'import.meta.env.VITE_ON_VERCEL': JSON.stringify(Boolean(process.env.VERCEL)) },
})
