import { useRef } from 'react'
import { chapters, person } from '../content/site'
import { EditionToggle } from './EditionToggle'
import { Emblem } from './Emblem'

export function TopNav() {
  const menu = useRef<HTMLDetailsElement>(null)
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
