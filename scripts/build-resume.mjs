// Builds public/Mrittunjay_Dubey_Resume.pdf from src/content/resume.ts, site.ts and stats.ts.
// Run with: npm run resume
// Needs Chrome, Edge or Chromium. Set BROWSER_PATH if yours is somewhere unusual.
// Stops with an error if the resume no longer fits on one A4 page.
import { spawn } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const { person, links, socials, serviceRecord } = await import(pathToFileURL(join(root, 'src/content/site.ts')).href)
const { stats } = await import(pathToFileURL(join(root, 'src/content/stats.ts')).href)
const { resume } = await import(pathToFileURL(join(root, 'src/content/resume.ts')).href)
const output = join(root, 'public', links.resume)

// A4 with 14 mm top/bottom and 16 mm side margins, measured in CSS pixels (96 per inch).
const MM = 96 / 25.4
const contentWidth = Math.floor((210 - 32) * MM)
const contentHeight = Math.floor((297 - 28) * MM)

const esc = (text) => String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const link = (href, text) => (href ? `<a href="${esc(href)}">${esc(text)}</a>` : esc(text))
const month = new Date(`${stats.updated}T00:00:00Z`).toLocaleString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })
const fill = (text) => text.replace('{downloads}', stats.dataset.downloads.toLocaleString('en-US')).replace('{month}', month)
const record = Object.fromEntries(serviceRecord.map((row) => [row.label, row.value]))
const social = (id) => socials.find((s) => s.id === id)

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${esc(person.name)} Resume</title>
<style>
  @page { size: A4; margin: 14mm 16mm; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body { font: 10.5pt/1.38 "Segoe UI", Calibri, Arial, "Liberation Sans", sans-serif; color: #15181c; }
  a { color: #15181c; text-decoration: underline; text-underline-offset: 1.5px; }
  h1 { margin: 0 0 2pt; font-size: 21pt; line-height: 1.15; font-weight: 700; }
  .contact { margin: 0 0 3pt; }
  .open { margin: 0 0 7pt; font-weight: 600; }
  h2 { margin: 11pt 0 5pt; padding-bottom: 2pt; font-size: 11pt; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; border-bottom: 1px solid #15181c; }
  p { margin: 0 0 2pt; }
  .item { margin: 0 0 7pt; break-inside: avoid; }
  .item:last-child { margin-bottom: 0; }
  ul { margin: 2pt 0 0; padding-left: 14pt; }
  li { margin: 0 0 1.5pt; }
</style></head><body>
  <h1>${esc(person.name)}</h1>
  <p class="contact">${esc(links.email)} · ${link(social('linkedin').href, 'LinkedIn')} · ${link(social('github').href, 'GitHub')} · ${link(social('huggingface').href, 'Hugging Face')}</p>
  <p class="open">Open to ${esc(person.openTo)} · ${esc(person.availability)}</p>
  <p>${esc(resume.summary)}</p>

  <h2>Education</h2>
  <p><strong>${esc(record.College)}</strong> | ${esc(record.Degree.replace(' (Fintech Honors)', ', Fintech Honors'))} | Class of ${esc(record.Graduation)} | CGPA ${esc(record.CGPA)}</p>
  <p><strong>CBSE</strong> | Class 12: ${esc(record['Class 12 (CBSE)'])} | Class 10: ${esc(record['Class 10 (CBSE)'])}</p>

  <h2>Projects</h2>
  ${resume.projects.map((p) => `<div class="item">
    <p><strong>${link(p.href, p.title)}: ${esc(p.subtitle)}</strong> | ${esc(p.stack)}</p>
    <ul>${p.bullets.map((b) => `<li>${esc(fill(b))}</li>`).join('')}</ul>
  </div>`).join('\n  ')}

  <h2>Certifications</h2>
  ${resume.certifications.map((c) => `<div class="item">
    <p><strong>${link(c.href, c.title)}</strong> | ${esc(c.issuer)}</p>
    <ul><li>${esc(c.detail)}</li></ul>
  </div>`).join('\n  ')}

  <h2>Skills</h2>
  <ul>${resume.skills.map((s) => `<li><strong>${esc(s.label)}:</strong> ${esc(s.value)}</li>`).join('')}</ul>
</body></html>`

function findBrowser() {
  const candidates = [
    process.env.BROWSER_PATH,
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter(Boolean)
  const found = candidates.find((path) => existsSync(path))
  if (!found) throw new Error('No Chrome, Edge or Chromium found. Set BROWSER_PATH to your browser.')
  return found
}

const work = mkdtempSync(join(tmpdir(), 'resume-'))
const page = join(work, 'resume.html')
writeFileSync(page, html)

const browser = spawn(findBrowser(), ['--headless=new', '--disable-gpu', '--no-sandbox', '--remote-debugging-port=0', `--user-data-dir=${join(work, 'profile')}`, 'about:blank'], { stdio: 'ignore' })
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

try {
  let port
  for (let i = 0; i < 80 && !port; i++) {
    await wait(150)
    try { port = readFileSync(join(work, 'profile', 'DevToolsActivePort'), 'utf8').split('\n')[0] } catch { /* not ready yet */ }
  }
  if (!port) throw new Error('The browser did not start.')

  let target
  for (let i = 0; i < 40 && !target; i++) {
    await wait(150)
    try { target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === 'page') } catch { /* not ready yet */ }
  }
  const socket = new WebSocket(target.webSocketDebuggerUrl)
  await new Promise((resolve) => socket.addEventListener('open', resolve))
  let id = 0
  const pending = new Map()
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data)
    if (pending.has(message.id)) { pending.get(message.id)(message); pending.delete(message.id) }
  })
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const n = ++id
    pending.set(n, (m) => (m.error ? reject(new Error(m.error.message)) : resolve(m.result)))
    socket.send(JSON.stringify({ id: n, method, params }))
  })

  await send('Page.enable')
  await send('Emulation.setDeviceMetricsOverride', { width: contentWidth, height: contentHeight, deviceScaleFactor: 1, mobile: false })
  await send('Emulation.setEmulatedMedia', { media: 'print' })
  await send('Page.navigate', { url: pathToFileURL(page).href })
  await wait(1200)
  // Measure where the content ends, not the window, which is always at least one page tall.
  const { result } = await send('Runtime.evaluate', {
    expression: 'document.fonts.ready.then(() => Math.ceil(document.body.lastElementChild.getBoundingClientRect().bottom + scrollY))',
    awaitPromise: true,
    returnByValue: true,
  })
  const height = result.value

  if (height > contentHeight) {
    socket.close()
    throw new Error(`The resume is ${height - contentHeight}px too long for one page (about ${Math.ceil((height - contentHeight) / 18)} lines). Shorten src/content/resume.ts and run again.`)
  }

  const pdf = await send('Page.printToPDF', { preferCSSPageSize: true, printBackground: true })
  writeFileSync(output, Buffer.from(pdf.data, 'base64'))
  socket.close()
  console.log(`Resume written to public/${links.resume}: one page, ${contentHeight - height}px of space left.`)
} finally {
  browser.kill()
  await wait(300)
  rmSync(work, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 })
}
