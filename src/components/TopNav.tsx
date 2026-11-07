import { useEffect, useState } from 'react'
import { chapters, links, person, type ChapterId } from '../content/site'
import { EditionToggle } from './EditionToggle'
import { useEvidence } from './evidenceStore'
import { DetectiveBadgeIcon } from './Extras'
import { Emblem } from './Emblem'

/** Which section is in the middle of the screen, for highlighting the menu. */
function useActiveSection() {
  const [active, setActive] = useState<ChapterId | null>(null)
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting)
        if (hit) setActive(hit.target.id as ChapterId)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    chapters.forEach((chapter) => {
      const section = document.getElementById(chapter.id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])
  return active
}

function NavIcon({ id }: { id: ChapterId }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {id === 'intro' && (
        <>
          <circle cx="12" cy="8" r="3.6" />
          <path d="M4.5 20.5c1.2-4 4-6 7.5-6s6.3 2 7.5 6" />
        </>
      )}
      {id === 'training' && <path d="M13 2.5 5 13.5h6l-1 8 8-11h-6Z" />}
      {id === 'cases' && <path d="M3 6h6l2 2h10v11H3Z" />}
      {id === 'side-quests' && (
        <>
          <path d="M7 3.5h10v5a5 5 0 0 1-10 0Z" />
          <path d="M7 5.5H3.5c0 3 1.5 4.5 3.8 4.8M17 5.5h3.5c0 3-1.5 4.5-3.8 4.8M12 13.5v3.5M8 20.5h8M9.5 17h5v3.5h-5Z" />
        </>
      )}
      {id === 'signal' && (
        <>
          <path d="M3.5 6.5h17v11h-17Z" />
          <path d="m4 7 8 6 8-6" />
        </>
      )}
    </svg>
  )
}

const resumeHref = `${import.meta.env.BASE_URL}${links.resume}`

/** Resume and email, always one tap away. */
function QuickActions() {
  const base = 'inline-flex h-11 items-center gap-1.5 px-3 text-[0.9375rem] font-bold'
  return (
    <div className="flex shrink-0 overflow-hidden rounded-sm border-2 border-black shadow-[2px_2px_0_#000]">
      <a href={resumeHref} className={`${base} bg-signal text-night hover:bg-cream`}>
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M6 2.5h8l4.5 4.5v14.5H6Z" />
          <path d="M14 2.5V7h4.5M9 12h6M9 15.5h6" />
        </svg>
        Resume
        <span className="sr-only">(PDF)</span>
      </a>
      <a href={`mailto:${links.email}`} className={`${base} border-l-2 border-black bg-cream text-night hover:bg-signal`}>
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
          <path d="M3.5 6.5h17v11h-17Z" />
          <path d="m4 7 8 6 8-6" />
        </svg>
        Email
      </a>
    </div>
  )
}

export function TopNav() {
  const { badge } = useEvidence()
  const active = useActiveSection()

  return (
    <>
      <header className="sticky top-0 z-30 border-b-2 border-black bg-ink">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-2 sm:px-4">
          <a href="#cover" className="flex min-h-11 min-w-0 items-center gap-2 text-paper" aria-label={`${person.name}, back to the top`}>
            <Emblem className="h-7 w-auto shrink-0" />
            <span className="comic-heading hidden whitespace-nowrap text-xl sm:inline">{person.name}</span>
          </a>

          <nav aria-label="Sections" className="hidden items-center gap-1 lg:flex">
            {chapters.map((chapter) => (
              <a
                key={chapter.id}
                href={`#${chapter.id}`}
                aria-current={active === chapter.id ? 'true' : undefined}
                className="inline-flex min-h-11 items-center px-3 text-[0.9375rem] font-medium text-fog underline-offset-4 hover:text-signal hover:underline aria-[current]:text-signal"
              >
                {chapter.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            {badge && (
              <span title="Detective badge: every evidence file examined" className="hidden size-11 place-items-center sm:grid">
                <DetectiveBadgeIcon className="size-7" />
                <span className="sr-only">Detective badge earned</span>
              </span>
            )}
            <QuickActions />
            <EditionToggle />
          </div>
        </div>
      </header>

      {/* Phone and tablet menu: a bottom bar within thumb reach. */}
      <nav aria-label="Sections" className="bottom-nav fixed inset-x-0 bottom-0 z-30 border-t-2 border-black bg-ink lg:hidden">
        <ul className="mx-auto grid max-w-xl grid-cols-5">
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <a
                href={`#${chapter.id}`}
                aria-current={active === chapter.id ? 'true' : undefined}
                className="grid min-h-14 place-items-center content-center gap-0.5 px-1 text-xs font-semibold text-fog aria-[current]:text-signal"
              >
                <NavIcon id={chapter.id} />
                {chapter.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
