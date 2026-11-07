import { useRef } from 'react'
import { chapters, issue, person } from '../content/site'
import { Emblem } from './Emblem'

type TopNavProps = {
  recruiterMode: boolean
  onToggle: (next: boolean) => void
}

export function TopNav({ recruiterMode, onToggle }: TopNavProps) {
  const menu = useRef<HTMLDetailsElement>(null)
  const linkClass = 'text-sm font-medium text-fog hover:text-signal underline-offset-4 hover:underline'

  return (
    <header className="sticky top-0 z-30 border-b-2 border-black bg-ink/95">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-3 sm:px-4">
        <a href="#cover" className="flex min-w-0 items-center gap-2 text-paper" aria-label={`${person.name}, back to the cover`}>
          <Emblem simple className="h-6 w-auto shrink-0" />
          <span className="comic-heading hidden whitespace-nowrap text-xl min-[440px]:inline">{issue.title.join(' ')}</span>
        </a>

        {!recruiterMode && (
          <nav aria-label="Chapters" className="hidden items-center gap-5 lg:flex">
            {chapters.map((chapter) => (
              <a key={chapter.id} href={`#${chapter.id}`} className={linkClass}>{chapter.label}</a>
            ))}
          </nav>
        )}

        <div className="flex shrink-0 items-center gap-2">
          {!recruiterMode && (
            <details ref={menu} className="relative lg:hidden">
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
          )}

          <button
            type="button"
            role="switch"
            aria-checked={recruiterMode}
            onClick={() => onToggle(!recruiterMode)}
            className="flex items-center gap-2 rounded-sm border border-signal px-2.5 py-1.5 text-sm font-semibold text-signal hover:bg-signal hover:text-ink"
          >
            <span className="hidden sm:inline">Recruiter Mode</span>
            <span className="sm:hidden">Recruiter</span>
            <span aria-hidden="true" className="font-normal">{recruiterMode ? 'On' : 'Off'}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
