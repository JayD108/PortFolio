import { footer, mission, sideQuests, signal, type ArtName, type ClosingPanel } from '../content/closing'
import { links, person, socials } from '../content/site'
import { CityScene } from './CityScene'
import { ChapterHeader, Reveal, Sfx, Todo } from './Comic'
import { Emblem } from './Emblem'
import { MailIcon, SocialIcon } from './SocialIcon'

/** Small original icons for the Mission and Side Quests panels. Decorative only. */
function ClosingIcon({ name }: { name: ArtName }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="relative size-16" fill="none" stroke="#f5c518" strokeWidth="4" strokeLinecap="square">
      {name === 'secure' && (
        <>
          <path d="M14 28h36v28H14Z" />
          <path d="M22 28V18c0-14 20-14 20 0v10M32 38v8" />
        </>
      )}
      {name === 'health' && <path d="M4 34h14l6-16 10 30 8-20 4 6h14" />}
      {name === 'fintech' && (
        <>
          <path d="M32 6 54 14v16c0 13-9 22-22 28C19 52 10 43 10 30V14Z" />
          <path d="M24 22h16M24 30h16M30 22c7 0 8 8 0 8h-6l14 14" />
        </>
      )}
      {name === 'gaming' && (
        <>
          <path d="M18 20h28c8 0 12 14 12 24 0 6-7 8-11 3l-6-7H23l-6 7c-4 5-11 3-11-3 0-10 4-24 12-24Z" />
          <path d="M20 26v8M16 30h8M42 27h.1M46 33h.1" />
        </>
      )}
      {name === 'brain' && (
        <>
          <path d="M31 10c-8-5-16 1-15 8-8 2-10 12-4 17-2 8 6 14 13 11 2 4 4 6 6 6Z" />
          <path d="M33 10c8-5 16 1 15 8 8 2 10 12 4 17 2 8-6 14-13 11-2 4-4 6-6 6Z" />
          <path d="M22 26h9M42 34H33" />
        </>
      )}
      {name === 'android' && (
        <>
          <path d="M18 4h28v56H18Z" />
          <path d="M28 52h8M26 18h12M26 28h12" />
        </>
      )}
    </svg>
  )
}

function IconPanel({ panel, index }: { panel: ClosingPanel; index: number }) {
  return (
    <Reveal>
      <article
        aria-labelledby={`panel-${panel.id}`}
        className={`story-panel sfx-host panel-frame relative flex h-full flex-col bg-gunmetal ${index % 2 ? 'md:rotate-[0.4deg]' : 'md:-rotate-[0.4deg]'}`}
      >
        <div className="halftone-shift relative grid h-28 place-items-center overflow-hidden border-b-[5px] border-black bg-slate/60">
          <ClosingIcon name={panel.id} />
        </div>
        <Sfx className="right-2 top-2 text-xl">{panel.sfx}</Sfx>
        <div className="grid flex-1 content-start gap-2 p-4">
          <h3 id={`panel-${panel.id}`} className="comic-heading text-3xl leading-none text-paper">{panel.title}</h3>
          {panel.stamp && (
            <p className={`w-fit -rotate-2 border-2 px-2 py-0.5 text-xs font-bold uppercase tracking-wide ${panel.classified ? 'border-black bg-blood text-white' : 'border-black bg-signal text-ink'}`}>
              {panel.stamp}
            </p>
          )}
          {panel.classified && (
            <div aria-hidden="true" className="grid gap-1.5 py-1">
              <span className="block h-3 w-full bg-black" />
              <span className="block h-3 w-4/5 bg-black" />
            </div>
          )}
          <p className="leading-relaxed text-fog">{panel.text}</p>
          {panel.todo && <p><Todo>{panel.todo}</Todo></p>}
        </div>
      </article>
    </Reveal>
  )
}

export function Mission() {
  return (
    <section id="mission" aria-labelledby="mission-title" className="mx-auto grid max-w-7xl gap-6 px-3 py-12 sm:px-4 md:py-16">
      <ChapterHeader id="mission-title" chapter={mission.chapter} title={mission.title} narration={mission.narration} />
      <div className="grid gap-5 md:grid-cols-3 md:gap-6">
        {mission.panels.map((panel, index) => <IconPanel key={panel.id} panel={panel} index={index} />)}
      </div>
    </section>
  )
}

export function SideQuests() {
  return (
    <section id="side-quests" aria-labelledby="quests-title" className="mx-auto grid max-w-7xl gap-6 px-3 py-12 sm:px-4 md:py-16">
      <ChapterHeader id="quests-title" chapter={sideQuests.chapter} title={sideQuests.title} narration={sideQuests.narration} />
      <div className="grid gap-5 md:grid-cols-3 md:gap-6">
        {sideQuests.panels.map((panel, index) => <IconPanel key={panel.id} panel={panel} index={index} />)}
      </div>
    </section>
  )
}

export function Signal() {
  return (
    <section id="signal" aria-labelledby="signal-title" className="mx-auto grid max-w-7xl gap-6 px-3 py-12 sm:px-4 md:py-16">
      <ChapterHeader id="signal-title" chapter={signal.chapter} title={signal.title} narration={signal.narration} />
      <div className="panel-frame relative isolate overflow-hidden bg-ink">
        <CityScene parallax={false} />

        {/* The beam runs from the rooftops up to the emblem. Its position changes with the layout. */}
        <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 hidden h-full w-full md:block">
          <polygon points="74,90 66,36 82,36" fill="url(#beam-wide)" />
          <defs>
            <linearGradient id="beam-wide" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0" stopColor="#f5c518" stopOpacity="0.42" />
              <stop offset="1" stopColor="#f5c518" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative grid items-center gap-6 px-4 pb-28 pt-6 sm:px-7 md:grid-cols-2 md:pb-40 md:pt-10">
          <div className="order-2 grid gap-4 md:order-1">
            <a
              href={`mailto:${links.email}`}
              className="flex min-h-12 min-w-0 items-center gap-3 rounded-sm border-2 border-paper bg-ink px-4 py-2.5 font-semibold text-paper hover:border-signal hover:text-signal"
            >
              <MailIcon className="size-6 shrink-0" />
              <span className="min-w-0 break-all text-sm sm:text-base">{links.email}</span>
            </a>
            <ul aria-label={`${person.name} online`} className="grid grid-cols-3 gap-2.5 min-[420px]:grid-cols-5">
              {socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    aria-label={`${social.label}: ${social.handle}`}
                    title={`${social.label}: ${social.handle}`}
                    className="grid aspect-square place-items-center rounded-sm border-2 border-paper bg-ink text-paper shadow-[3px_3px_0_#000] hover:-translate-y-0.5 hover:border-signal hover:bg-signal hover:text-ink"
                  >
                    <SocialIcon id={social.id} className="size-7 sm:size-8" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 flex justify-center md:order-2">
            <Emblem className="w-56 drop-shadow-[0_0_38px_rgb(245_197_24/0.55)] sm:w-72 md:w-full md:max-w-sm" title="MD monogram" />
          </div>
        </div>
      </div>
    </section>
  )
}

export function ComicFooter() {
  return (
    <footer className="mx-auto grid max-w-7xl gap-3 border-t-2 border-slate px-3 pb-12 pt-8 sm:px-4">
      <p className="comic-heading text-4xl leading-none text-signal md:text-5xl">{footer.continued}</p>
      <p className="flex items-center gap-2 text-sm text-fog">
        <Emblem className="h-5 w-auto" />
        {footer.credit}
      </p>
    </footer>
  )
}
