import { coverTeasers, issue, links, person } from '../content/site'
import { CityScene } from './CityScene'
import { Caption, Sfx } from './Comic'

const [firstName, ...rest] = person.name.split(' ')
const lastName = rest.join(' ')

// Each teaser panel sits at its own slight angle and offset, like panels pasted onto the page.
const teaserTilt = ['md:-rotate-2', 'md:rotate-1 md:-translate-x-5', 'md:-rotate-1']

/** Issue #1 cover: name, role and skills, three project teasers, and the resume in the corner. */
export function Cover() {
  return (
    <section id="cover" aria-labelledby="cover-name" className="mx-auto max-w-7xl p-2 sm:p-3">
      <div className="panel-frame relative isolate overflow-hidden bg-ink">
        <CityScene />

        <div className="relative px-4 pb-28 pt-3 sm:px-7 md:pb-36">
          <p className="w-fit border-2 border-black bg-paper px-2 py-1 text-[0.6875rem] font-bold uppercase text-ink sm:px-2.5 sm:text-xs sm:tracking-wide">
            Issue {issue.number} · {issue.date} · {issue.city}
          </p>

          <h1
            id="cover-name"
            className="comic-heading masthead mt-2 text-[clamp(3rem,17vw,6.5rem)] uppercase md:text-[clamp(4rem,min(11.5vw,22vh),10.5rem)]"
          >
            <span className="block whitespace-nowrap md:inline">{firstName} </span>
            <span className="block whitespace-nowrap md:inline">{lastName}</span>
          </h1>

          <div className="mt-5 grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-12">
            <div className="grid min-w-0 gap-3">
              <p className="text-base font-medium text-fog sm:text-lg">{person.role}</p>
              <Caption className="-rotate-1 px-3 py-1.5 text-base sm:text-lg">{person.tagline}</Caption>
              <ul aria-label="Top skills" className="flex flex-wrap gap-2 pt-1">
                {person.topSkills.map((skill) => (
                  <li key={skill} className="border border-slate bg-gunmetal px-2.5 py-1 text-sm font-medium text-paper">
                    {skill}
                  </li>
                ))}
              </ul>
              <div className="pt-3">
                <a
                  href="#intro"
                  className="sfx-host relative inline-flex min-h-11 items-center rounded-sm border-2 border-black bg-signal px-5 text-base font-bold text-ink shadow-[4px_4px_0_#000] hover:bg-paper"
                >
                  {issue.openLabel}
                  <Sfx className="-right-4 -top-5 text-lg">BOOT!</Sfx>
                </a>
              </div>
            </div>

            <nav aria-label="Featured case files">
              <ul className="grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-1 md:gap-4">
                {coverTeasers.map((teaser, index) => (
                  <li key={teaser.caseId}>
                    <a
                      href={`#case-${teaser.caseId}`}
                      className={`teaser story-panel sfx-host panel-frame relative grid h-full gap-1 bg-gunmetal p-2.5 text-left sm:p-3 md:grid-cols-[auto_minmax(0,1fr)] md:items-center md:gap-x-4 md:p-4 ${teaserTilt[index]}`}
                    >
                      <span className="halftone pointer-events-none absolute inset-0" aria-hidden="true" />
                      <span className="caption-box relative w-fit whitespace-nowrap px-1.5 py-0.5 text-[0.625rem] font-bold uppercase sm:text-[0.6875rem] md:col-span-2 md:text-xs">
                        {teaser.title}
                      </span>
                      <span className="comic-heading relative whitespace-nowrap text-2xl leading-none text-signal sm:text-4xl md:text-5xl">{teaser.number}</span>
                      <span className="relative hidden text-sm leading-snug text-paper sm:block">{teaser.label}</span>
                      <Sfx className="-right-2 -top-4 text-base">CASE!</Sfx>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <a
          href={`${import.meta.env.BASE_URL}${links.resume}`}
          className="sfx-host absolute bottom-4 right-4 z-10 flex -rotate-3 items-center gap-2 border-[3px] border-black bg-paper px-4 py-2.5 text-ink shadow-[5px_5px_0_#000] hover:rotate-0 hover:bg-signal sm:bottom-6 sm:right-6"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M6 2.5h8l4.5 4.5v14.5H6Z" />
            <path d="M14 2.5V7h4.5M9 12h6M9 15.5h6M9 19h4" />
          </svg>
          <span className="grid leading-none">
            <span className="comic-heading text-2xl">Resume</span>
            <span className="text-[0.6875rem] font-bold uppercase tracking-wide">PDF · 1 page</span>
          </span>
          <Sfx className="-left-5 -top-5 text-base">GRAB!</Sfx>
        </a>
      </div>
    </section>
  )
}
