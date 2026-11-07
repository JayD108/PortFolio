import { useRef } from 'react'
import { chapters, links, person } from '../content/site'
import { EditionToggle } from './EditionToggle'
import { useEvidence } from './evidenceStore'
import { DetectiveBadgeIcon } from './Extras'
import { Emblem } from './Emblem'

export function TopNav() {
  const menu = useRef<HTMLDetailsElement>(null)
  const { badge } = useEvidence()
  const linkClass = 'text-sm font-medium text-fog hover:text-signal underline-offset-4 hover:underline'

  return (
    <header className="sticky top-0 z-30 border-b-2 border-black bg-ink/95">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-3 sm:px-4">
        <a href="#cover" className="flex min-w-0 items-center gap-2 text-paper" aria-label={`${person.name}, back to the top`}>
          <Emblem className="h-7 w-auto shrink-0" />
          <span className="comic-heading hidden whitespace-nowrap text-xl min-[400px]:inline">{person.name}</span>
        </a>

        <nav aria-label="Chapters" className="hidden items-center gap-5 lg:flex">
          {chapters.map((chapter) => (
            <a key={chapter.id} href={`#${chapter.id}`} className={linkClass}>{chapter.label}</a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
        {badge && (
          <span title="Detective badge: every evidence file examined" className="grid size-10 place-items-center">
            <DetectiveBadgeIcon className="size-7" />
            <span className="sr-only">Detective badge earned</span>
          </span>
        )}
        {/* Always visible, so the resume is one tap away on every screen, however short. */}
        <a
          href={`${import.meta.env.BASE_URL}${links.resume}`}
          aria-label="Resume (PDF)"
          className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-sm border-2 border-black bg-signal px-2.5 text-sm font-bold text-night shadow-[2px_2px_0_#000] hover:bg-cream"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M6 2.5h8l4.5 4.5v14.5H6Z" />
            <path d="M14 2.5V7h4.5M9 12h6M9 15.5h6" />
          </svg>
          <span className="hidden min-[360px]:inline">Resume</span>
        </a>
        <EditionToggle />
        <details ref={menu} className="relative shrink-0 lg:hidden">
          <summary className="cursor-pointer list-none rounded-sm border border-slate px-2.5 py-1.5 text-sm font-medium text-fog">
            Chapters
          </summary>
          <nav aria-label="Chapters" className="panel-frame absolute right-0 mt-2 grid w-44 gap-2 bg-gunmetal p-3">
            {chapters.map((chapter) => (
              <a
                key={chapter.id}
                href={`#${chapter.id}`}
                className={linkClass}
                onClick={() => menu.current?.removeAttribute('open')}
              >
                {chapter.label}
              </a>
            ))}
          </nav>
        </details>
        </div>
      </div>
    </header>
  )
}
