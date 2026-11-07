import { issue, links, person } from '../content/site'
import { CityScene } from './CityScene'
import { Caption, Sfx } from './Comic'
import { Emblem } from './Emblem'

const secondary =
  'inline-flex min-h-11 items-center rounded-sm border-2 border-paper bg-ink px-4 text-sm font-semibold text-paper hover:border-signal hover:text-signal'
const placeholder =
  'inline-flex min-h-11 items-center rounded-sm border-2 border-dashed border-signal bg-ink px-4 text-sm font-semibold text-signal'

/** Issue #1 cover. Name, role, skills, resume and links all sit on the first screen. */
export function Cover() {
  return (
    <section id="cover" aria-labelledby="cover-name" className="mx-auto max-w-7xl p-2 sm:p-3">
      <div className="panel-frame relative isolate overflow-hidden bg-ink">
        <CityScene />

        <div className="relative px-4 pb-6 pt-3 sm:px-7 md:pb-36">
          <div className="flex items-start justify-between gap-3">
            <p className="border-2 border-black bg-paper px-2 py-1 text-[0.6875rem] font-bold uppercase text-ink sm:px-2.5 sm:text-xs sm:tracking-wide">
              Issue {issue.number} · {issue.date} · {issue.city}
            </p>
            <p className="price-burst grid size-24 shrink-0 rotate-6 place-items-center bg-blood text-center text-white sm:size-32 lg:absolute lg:right-7 lg:top-3">
              <span className="px-5 sm:px-6">
                <span className="comic-heading block text-2xl leading-none sm:text-4xl">{issue.priceAmount}</span>
                <span className="block text-[0.625rem] font-semibold leading-tight sm:text-xs">{issue.priceNote}</span>
              </span>
            </p>
          </div>

          <p
            className="comic-heading masthead mt-1 text-[clamp(4.5rem,23vw,7rem)] uppercase md:text-[clamp(5rem,min(12vw,23vh),11rem)]"
          >
            <span className="block whitespace-nowrap md:inline">{issue.title[0]} </span>
            <span className="block whitespace-nowrap md:inline">{issue.title[1]}</span>
          </p>

          <div className="mt-5 grid items-center gap-6 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <div className="grid min-w-0 gap-3">
              <h1 id="cover-name" className="comic-heading text-[2.5rem] leading-none text-paper sm:text-6xl">
                {person.name}
              </h1>
              <p className="text-base font-medium text-fog sm:text-lg">{person.role}</p>

              <Caption className="-rotate-1 px-3 py-1.5 text-base sm:text-lg">{person.tagline}</Caption>

              <ul aria-label="Top skills" className="flex flex-wrap gap-2 pt-1">
                {person.topSkills.map((skill) => (
                  <li key={skill} className="border border-slate bg-gunmetal px-2.5 py-1 text-sm font-medium text-paper">
                    {skill}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 pt-2">
                <a
                  href="#intro"
                  className="sfx-host relative inline-flex min-h-11 items-center rounded-sm border-2 border-black bg-signal px-4 text-sm font-bold text-ink shadow-[3px_3px_0_#000] hover:bg-paper"
                >
                  {issue.openLabel}
                  <Sfx className="-right-4 -top-5 text-lg">BOOT!</Sfx>
                </a>

                {links.resume ? (
                  <a href={`${import.meta.env.BASE_URL}${links.resume}`} className={secondary}>Resume</a>
                ) : (
                  <span className={placeholder}>TODO: Resume</span>
                )}

                <a href={links.github} className={secondary}>GitHub</a>

                {links.linkedIn ? (
                  <a href={links.linkedIn} className={secondary}>LinkedIn</a>
                ) : (
                  <span className={placeholder}>TODO: LinkedIn</span>
                )}

                <a href={links.huggingFace} className={secondary}>Hugging Face</a>
              </div>
            </div>

            <div className="flex justify-center pb-16 pt-2 md:pb-0">
              <Emblem className="w-52 drop-shadow-[0_0_34px_rgb(245_197_24/0.5)] sm:w-72 md:w-full md:max-w-sm" title="Circuit Eye emblem with the initials MD" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
