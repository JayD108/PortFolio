// Fetches live numbers from Hugging Face and GitHub and rewrites src/content/stats.ts when they change.
// Run with: npm run stats   (the weekly GitHub Action runs it too)
// If one source can't be reached, its old numbers are kept, so a hiccup never blanks the site.
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const file = fileURLToPath(new URL('../src/content/stats.ts', import.meta.url))
const { stats: old } = await import(new URL('../src/content/stats.ts', import.meta.url).href)

const GITHUB_USER = 'JayD108'
const HF_USER = 'JayF14'
const DATASET = 'JayF14/chb-mit-preprocessed-eeg'

const githubHeaders = { Accept: 'application/vnd.github+json', ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}) }

async function json(url, headers = {}) {
  const res = await fetch(url, { headers })
  if (!res.ok) throw new Error(`${url} answered ${res.status}`)
  return res.json()
}

async function tryOr(label, fallback, work) {
  try {
    return await work()
  } catch (error) {
    console.warn(`Kept the old ${label}: ${error.message}`)
    return fallback
  }
}

const dataset = await tryOr('dataset numbers', old.dataset, async () => {
  const data = await json(`https://huggingface.co/api/datasets/${DATASET}?expand[]=downloadsAllTime&expand[]=likes`)
  if (typeof data.downloadsAllTime !== 'number') throw new Error('no download count')
  return { downloads: data.downloadsAllTime, likes: data.likes ?? 0 }
})

// Likes across every public model and dataset on the profile.
const huggingFace = await tryOr('Hugging Face likes', old.huggingFace, async () => {
  const models = await json(`https://huggingface.co/api/models?author=${HF_USER}&expand[]=likes&limit=100`)
  const datasets = await json(`https://huggingface.co/api/datasets?author=${HF_USER}&expand[]=likes&limit=100`)
  const all = [...models, ...datasets]
  return { likes: all.reduce((sum, repo) => sum + (repo.likes ?? 0), 0), repos: all.length }
})

const github = await tryOr('GitHub numbers', old.github, async () => {
  const since = new Date(Date.now() - 90 * 864e5).toISOString().slice(0, 10)
  const user = await json(`https://api.github.com/users/${GITHUB_USER}`, githubHeaders)
  const commits = await json(`https://api.github.com/search/commits?q=author:${GITHUB_USER}+committer-date:>${since}&per_page=1`, githubHeaders)
  return { publicRepos: user.public_repos, commits90d: commits.total_count }
})

const next = { dataset, huggingFace, github }
const same = JSON.stringify(next) === JSON.stringify({ dataset: old.dataset, huggingFace: old.huggingFace, github: old.github })
if (same) {
  console.log('No change.')
} else {
  const today = new Date().toISOString().slice(0, 10)
  writeFileSync(
    file,
    `// Live numbers, refreshed weekly by .github/workflows/update-stats.yml (scripts/update-stats.mjs).
// Edit by hand only if you need to; the script overwrites this file.

export const stats = {
  updated: '${today}',
  dataset: { downloads: ${dataset.downloads}, likes: ${dataset.likes} },
  huggingFace: { likes: ${huggingFace.likes}, repos: ${huggingFace.repos} },
  github: { publicRepos: ${github.publicRepos}, commits90d: ${github.commits90d} },
}
`,
  )
  console.log('Updated:', JSON.stringify(next))
}
