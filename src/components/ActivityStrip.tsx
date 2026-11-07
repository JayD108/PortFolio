import { socials } from '../content/site'
import { stats } from '../content/stats'

const href = (id: 'github' | 'huggingface') => socials.find((social) => social.id === id)?.href ?? '#'
const updated = new Date(`${stats.updated}T00:00:00Z`).toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })

// The dataset's downloads are the cover's highlight, so this strip shows the rest of the activity.
const items = [
  { value: stats.github.commits90d, label: 'public commits in the last 90 days', source: 'GitHub', href: href('github') },
  { value: stats.github.publicRepos, label: 'public repositories', source: 'GitHub', href: href('github') },
  { value: stats.huggingFace.repos, label: 'models and datasets published', source: 'Hugging Face', href: href('huggingface') },
  { value: stats.huggingFace.likes, label: 'likes on my work', source: 'Hugging Face', href: href('huggingface') },
].filter((item) => item.value > 0)

/** Live activity under the cover. The numbers refresh every week (scripts/update-stats.mjs). */
export function ActivityStrip() {
  if (!items.length) return null
  return (
    <section aria-labelledby="activity-title" className="mx-auto grid max-w-5xl gap-2 px-2 pt-8 sm:px-4">
      <p id="activity-title" className="flex flex-wrap items-center gap-x-2 text-xs font-bold uppercase tracking-widest text-fog">
        <span aria-hidden="true" className="open-dot size-2 rounded-full bg-[#3fbf6f]" />
        Live activity
        <span className="font-semibold normal-case tracking-normal">· updated weekly, last on {updated}</span>
      </p>
      <ul className="m-0 grid list-none grid-cols-2 gap-px border-2 border-black bg-black p-0 md:grid-cols-4">
        {items.map((item) => (
          <li key={item.label} className="bg-gunmetal">
            <a href={item.href} className="grid h-full content-start gap-1 px-3 py-3 hover:bg-slate sm:px-4">
              <span className="comic-heading text-4xl leading-none text-signal">{item.value.toLocaleString('en-US')}</span>
              <span className="text-sm leading-snug text-paper">{item.label}</span>
              <span className="text-xs font-semibold text-fog">{item.source}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
