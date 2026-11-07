// Fetches live numbers from Hugging Face and rewrites src/content/stats.ts when they change.
// Run with: npm run stats
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const file = fileURLToPath(new URL('../src/content/stats.ts', import.meta.url))

async function hub(kind, repo) {
  const res = await fetch(`https://huggingface.co/api/${kind}/${repo}?expand[]=downloadsAllTime&expand[]=likes`)
  if (!res.ok) throw new Error(`${repo}: Hugging Face answered ${res.status}`)
  const data = await res.json()
  if (typeof data.downloadsAllTime !== 'number') throw new Error(`${repo}: no download count in the response`)
  return { downloads: data.downloadsAllTime, likes: data.likes ?? 0 }
}

const dataset = await hub('datasets', 'JayF14/chb-mit-preprocessed-eeg')
const current = readFileSync(file, 'utf8')
const old = current.match(/dataset: \{ downloads: (\d+), likes: (\d+) \}/)

if (old && Number(old[1]) === dataset.downloads && Number(old[2]) === dataset.likes) {
  console.log(`No change: dataset has ${dataset.downloads} downloads and ${dataset.likes} likes.`)
} else {
  const today = new Date().toISOString().slice(0, 10)
  writeFileSync(
    file,
    current
      .replace(/updated: '[\d-]+'/, `updated: '${today}'`)
      .replace(/dataset: \{ downloads: \d+, likes: \d+ \}/, `dataset: { downloads: ${dataset.downloads}, likes: ${dataset.likes} }`),
  )
  console.log(`Updated: dataset now has ${dataset.downloads} downloads and ${dataset.likes} likes.`)
}
