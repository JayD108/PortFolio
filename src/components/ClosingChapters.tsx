import { useRef, useState } from 'react'
import { achievements, footer, sideQuests, signal, steam, type Achievement, type ArtName, type ClosingPanel } from '../content/closing'
import { links, person, socials } from '../content/site'
import { CityScene } from './CityScene'
import { ChapterHeader, Reveal, Sfx } from './Comic'
import { ContactForm } from './ContactForm'
import { copyText } from './copyText'
import { Emblem } from './Emblem'
import { MailIcon, SocialIcon } from './SocialIcon'

// Unfinished panels (classified, or with a TODO) stay hidden until they have real content.
const finished = (panels: ClosingPanel[]) => panels.filter((panel) => !panel.classified && !panel.todo)

/** Small original icons for the Side Quests panels. Decorative only. */
function ClosingIcon({ name }: { name: ArtName }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="relative size-12 text-signal md:size-16" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square">
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

/** The full story behind a panel, opened from its "Read more" button. */
function PanelStory({ panel, onClose }: { panel: ClosingPanel; onClose: () => void }) {
  const details = panel.details!
  return (
    <article className="sheet-panel mx-auto grid w-full max-w-3xl content-start bg-gunmetal text-paper sm:my-8 sm:border-[3px] sm:border-black sm:shadow-[8px_8px_0_#000]">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b-[3px] border-black bg-signal px-2 py-1.5 text-night sm:px-4">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-sm border-2 border-black bg-cream px-3 text-base font-bold hover:bg-night hover:text-cream"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 5 8 12l7 7" />
          </svg>
          Back
        </button>
        <p className="text-xs font-bold uppercase tracking-widest">Side quest · Esc to close</p>
      </header>
      <div className="grid gap-7 px-4 py-6 sm:px-8 sm:py-8">
        <div className="flex items-center gap-4">
          <div className="grid min-w-0 flex-1 gap-2">
            <h2 id={`story-${panel.id}`} className="comic-heading m-0 text-4xl leading-none text-signal sm:text-5xl">{panel.title}</h2>
            <p className="m-0 text-lg leading-snug">{details.lead}</p>
          </div>
          <ClosingIcon name={panel.id} />
        </div>
        {details.sections.map((section) => (
          <section key={section.heading} className="grid gap-2">
            <h3 className="comic-heading m-0 text-3xl leading-none">{section.heading}</h3>
            <p className="m-0 max-w-[65ch] text-base leading-relaxed text-fog">{section.text}</p>
          </section>
        ))}
        <div className="flex flex-wrap gap-2 border-t-2 border-dashed border-slate pt-5">
          {details.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              // In-page links close the story first, so the case file opens behind it.
              onClick={() => link.href.startsWith('#') && onClose()}
              className="inline-flex min-h-11 items-center rounded-sm border-2 border-paper bg-ink px-3 text-[0.9375rem] font-semibold text-paper hover:border-signal hover:text-signal"
            >
              {link.label}
              <span aria-hidden="true" className="pl-1">{link.href.startsWith('#') ? '→' : '↗'}</span>
            </a>
          ))}
        </div>
      </div>
    </article>
  )
}

function IconPanel({ panel, index }: { panel: ClosingPanel; index: number }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const close = () => dialog.current?.close()
  return (
    <Reveal>
      <article
        aria-labelledby={`panel-${panel.id}`}
        className={`story-panel sfx-host panel-frame relative flex h-full items-center gap-4 bg-gunmetal p-4 md:flex-col md:items-stretch md:gap-0 md:p-0 ${index % 2 ? 'md:rotate-[0.4deg]' : 'md:-rotate-[0.4deg]'}`}
      >
        <div className="halftone-shift relative grid shrink-0 place-items-center md:h-28 md:overflow-hidden md:border-b-[5px] md:border-black md:bg-slate/60">
          <ClosingIcon name={panel.id} />
        </div>
        <Sfx className="right-2 top-2 text-xl">{panel.sfx}</Sfx>
        <div className="grid flex-1 content-start gap-1.5 md:gap-2 md:p-4">
          <h4 id={`panel-${panel.id}`} className="comic-heading m-0 text-2xl leading-none text-paper md:text-3xl">{panel.title}</h4>
          {panel.stamp && (
            <p className="w-fit -rotate-2 border-2 border-black bg-signal px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-night">{panel.stamp}</p>
          )}
          <p className="text-base leading-relaxed text-fog">{panel.text}</p>
          {panel.details && (
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => dialog.current?.showModal()}
              className="mt-1 inline-flex min-h-11 w-fit items-center gap-1 rounded-sm border-2 border-black bg-signal px-3 text-[0.9375rem] font-bold text-night shadow-[3px_3px_0_#000] hover:bg-cream"
            >
              Read more
              <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 5 7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </article>
      {panel.details && (
        <dialog
          ref={dialog}
          aria-labelledby={`story-${panel.id}`}
          onClick={(event) => {
            if (event.target === dialog.current) close()
          }}
          className="sheet m-0 h-full max-h-none w-full max-w-none overflow-y-auto bg-transparent p-0 backdrop:bg-black/80"
        >
          <PanelStory panel={panel} onClose={close} />
        </dialog>
      )}
    </Reveal>
  )
}

/** My Steam record: a few headline numbers, the favourite game and what I've played lately. */
function SteamRecord() {
  const profile = socials.find((social) => social.id === 'steam')
  return (
    <Reveal>
      <article aria-labelledby="steam-title" className="panel-frame grid gap-5 bg-gunmetal p-4 sm:p-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-sm border-2 border-black bg-ink text-paper">
              <SocialIcon id="steam" className="size-7" />
            </span>
            <div className="grid">
              <h4 id="steam-title" className="comic-heading m-0 text-3xl leading-none text-paper">{steam.title}</h4>
              <p className="m-0 text-sm text-fog">
                {profile?.handle} · as of {steam.asOf}
              </p>
            </div>
          </div>
          {profile && (
            <a
              href={profile.href}
              className="inline-flex min-h-12 items-center rounded-sm border-2 border-black bg-signal px-3 text-[0.9375rem] font-bold text-night shadow-[3px_3px_0_#000] hover:bg-cream"
            >
              {steam.linkLabel}
              <span aria-hidden="true" className="pl-1">↗</span>
            </a>
          )}
        </header>

        <dl className="m-0 grid grid-cols-2 gap-px border-2 border-black bg-black sm:grid-cols-4">
          {steam.stats.map((stat) => (
            <div key={stat.label} className="grid gap-0.5 bg-ink px-3 py-3">
              <dt className="text-xs font-bold uppercase tracking-wide text-fog">{stat.label}</dt>
              <dd className="comic-heading m-0 text-4xl leading-none text-signal">{stat.value}</dd>
            </div>
          ))}
        </dl>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="grid content-start gap-1">
            <p className="m-0 text-xs font-bold uppercase tracking-widest text-fog">Favourite game</p>
            <p className="m-0 text-lg font-bold text-paper">{steam.favorite.name}</p>
            <p className="m-0 text-base text-fog">{steam.favorite.detail}</p>
          </div>
          <div className="grid content-start gap-1.5">
            <p className="m-0 text-xs font-bold uppercase tracking-widest text-fog">Recently played</p>
            <ul className="m-0 grid list-none gap-1 p-0">
              {steam.recent.map((game) => (
                <li key={game.name} className="flex justify-between gap-3 border-b border-slate pb-1 text-base text-paper">
                  <span className="min-w-0">{game.name}</span>
                  <span className="shrink-0 tabular-nums text-fog">{game.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

/** One competition: event, result stamp, a line about it, and its proof (a certificate or the official message). */
function AchievementCard({ item }: { item: Achievement }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const close = () => dialog.current?.close()
  return (
    <article
      aria-labelledby={`ach-${item.id}`}
      className={`panel-frame grid gap-3 p-4 sm:p-5 ${item.highlight ? 'bg-signal text-night' : 'bg-gunmetal text-paper'}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <div className="grid gap-0.5">
          <h4 id={`ach-${item.id}`} className="comic-heading m-0 text-3xl leading-none">{item.event}</h4>
          <p className={`m-0 text-base ${item.highlight ? 'text-night' : 'text-fog'}`}>
            {item.organiser} · {item.date}
            {item.team && <> · Team {item.team}</>}
          </p>
        </div>
        <span
          className={`-rotate-2 border-[3px] px-2.5 py-0.5 text-sm font-black uppercase tracking-wide ${item.highlight ? 'border-night bg-night text-signal' : 'border-dashed border-signal text-signal'}`}
        >
          {item.result}
        </span>
      </div>
      {item.line && <p className="m-0 max-w-[68ch] text-base leading-relaxed">{item.line}</p>}
      {item.quote && (
        <figure className="m-0 grid gap-1 border-l-4 border-night bg-cream/60 px-3 py-2 text-night">
          <blockquote className="m-0 text-base italic leading-snug">“{item.quote.text}”</blockquote>
          <figcaption className="text-sm font-semibold">{item.quote.source}</figcaption>
        </figure>
      )}
      {(item.certificate || item.links.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {item.certificate && (
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => dialog.current?.showModal()}
              className="inline-flex min-h-11 items-center rounded-sm border-2 border-black bg-signal px-3 text-[0.9375rem] font-bold text-night shadow-[3px_3px_0_#000] hover:bg-cream"
            >
              View certificate
            </button>
          )}
          {item.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`inline-flex min-h-11 items-center rounded-sm border-2 px-3 text-[0.9375rem] font-semibold ${item.highlight ? 'border-night bg-night text-cream hover:bg-cream hover:text-night' : 'border-paper bg-ink text-paper hover:border-signal hover:text-signal'}`}
            >
              {link.label}
              <span aria-hidden="true" className="pl-1">↗</span>
            </a>
          ))}
        </div>
      )}
      {item.certificate && (
        <dialog
          ref={dialog}
          aria-label={`${item.event} certificate`}
          onClick={(event) => {
            if (event.target === dialog.current) close()
          }}
          className="sheet m-0 h-full max-h-none w-full max-w-none overflow-y-auto bg-transparent p-0 backdrop:bg-black/85"
        >
          <div className="sheet-panel mx-auto grid w-full max-w-4xl content-start bg-gunmetal text-paper sm:my-8 sm:border-[3px] sm:border-black sm:shadow-[8px_8px_0_#000]">
            <header className="sticky top-0 z-10 flex items-center gap-3 border-b-[3px] border-black bg-signal px-2 py-1.5 text-night sm:px-4">
              <button
                type="button"
                onClick={close}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-sm border-2 border-black bg-cream px-3 text-base font-bold hover:bg-night hover:text-cream"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 5 8 12l7 7" />
                </svg>
                Close
              </button>
              <p className="min-w-0 truncate text-xs font-bold uppercase tracking-widest">{item.event}</p>
            </header>
            <div className="p-3 sm:p-6">
              <img
                src={`${import.meta.env.BASE_URL}${item.certificate.image}`}
                width={item.certificate.size[0]}
                height={item.certificate.size[1]}
                loading="lazy"
                alt={`${item.event} certificate of participation, awarded to ${person.name}.`}
                className="block h-auto w-full border-2 border-black bg-white"
              />
            </div>
          </div>
        </dialog>
      )}
    </article>
  )
}

export function SideQuests() {
  return (
    <section id="side-quests" aria-labelledby="quests-title" className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)] gap-6 px-2 py-10 sm:px-4 md:py-20">
      <ChapterHeader id="quests-title" chapter={sideQuests.chapter} title={sideQuests.title} narration={sideQuests.narration} />

      <h3 className="comic-heading m-0 border-b-2 border-slate pb-1 text-3xl leading-none text-paper">{sideQuests.achievementsTitle}</h3>
      <ol className="m-0 grid list-none gap-4 p-0">
        {achievements.map((item) => (
          <li key={item.id}>
            <Reveal>
              <AchievementCard item={item} />
            </Reveal>
          </li>
        ))}
      </ol>

      <h3 className="comic-heading m-0 mt-4 border-b-2 border-slate pb-1 text-3xl leading-none text-paper">{sideQuests.sideQuestsTitle}</h3>
      <SteamRecord />
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        {finished(sideQuests.panels).map((panel, index) => <IconPanel key={panel.id} panel={panel} index={index} />)}
      </div>
    </section>
  )
}

function CopyEmailButton() {
  const [copied, setCopied] = useState<boolean | null>(null)

  const copy = async () => {
    const ok = await copyText(links.email)
    if (!ok) {
      // The browser blocked copying, so select the address for the reader to copy themselves.
      const address = document.querySelector('#signal a[href^="mailto:"] span')
      const selection = window.getSelection()
      if (address && selection) {
        const range = document.createRange()
        range.selectNodeContents(address)
        selection.removeAllRanges()
        selection.addRange(range)
      }
    }
    setCopied(ok)
    window.setTimeout(() => setCopied(null), 2200)
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy email address ${links.email}`}
      className="relative min-h-12 shrink-0 rounded-sm border-2 border-paper bg-ink px-4 text-base font-semibold text-paper hover:border-signal hover:text-signal"
    >
      {copied === null ? 'Copy' : copied ? 'Copied' : 'Selected'}
      <span aria-hidden="true" className={`sfx comic-heading -right-3 -top-5 text-base ${copied ? 'sfx-show' : ''}`}>COPIED!</span>
      <span role="status" className="sr-only">{copied === null ? '' : copied ? 'Email copied' : 'Email address selected'}</span>
    </button>
  )
}

export function Signal() {
  return (
    <section id="signal" aria-labelledby="signal-title" className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)] gap-6 px-2 py-10 sm:px-4 md:py-20">
      <ChapterHeader id="signal-title" chapter={signal.chapter} title={signal.title} narration={signal.narration} />
      <div className="night-scene panel-frame relative isolate overflow-hidden bg-ink">
        <CityScene parallax={false} />

        <div className="relative grid items-start gap-6 px-4 pb-32 pt-6 sm:px-7 md:grid-cols-2 md:pb-40 md:pt-10">
          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <p className="text-xs font-bold uppercase tracking-widest text-fog">{signal.emailLabel}</p>
              <div className="flex min-w-0 items-stretch gap-2.5">
                <a
                  href={`mailto:${links.email}`}
                  className="flex min-h-12 min-w-0 flex-1 items-center gap-3 rounded-sm border-2 border-paper bg-ink px-4 py-2.5 font-semibold text-paper hover:border-signal hover:text-signal"
                >
                  <MailIcon className="size-6 shrink-0" />
                  <span className="min-w-0 break-all text-base">{links.email}</span>
                </a>
                <CopyEmailButton />
              </div>
            </div>
            <div className="grid gap-1.5">
              <p className="text-xs font-bold uppercase tracking-widest text-fog">{signal.quickLabel}</p>
              <a
                href={socials.find((social) => social.id === 'linkedin')?.href}
                className="flex min-h-12 items-center gap-3 rounded-sm border-2 border-black bg-signal px-4 font-bold text-night shadow-[3px_3px_0_#000] hover:bg-cream"
              >
                <SocialIcon id="linkedin" className="size-6 shrink-0" />
                {signal.linkedinLabel}
                <span aria-hidden="true" className="ml-auto">↗</span>
              </a>
            </div>
            <ul aria-label={`${person.name} online`} className="m-0 grid list-none grid-cols-5 gap-2 p-0">
              {socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    aria-label={`${social.label}: ${social.handle}`}
                    title={`${social.label}: ${social.handle}`}
                    className="grid aspect-square min-h-11 place-items-center rounded-sm border-2 border-paper bg-ink text-paper shadow-[3px_3px_0_#000] hover:-translate-y-0.5 hover:border-signal hover:bg-signal hover:text-night"
                  >
                    <SocialIcon id={social.id} className="size-6 sm:size-8" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

export function ComicFooter() {
  return (
    <footer className="mx-auto grid max-w-5xl gap-3 border-t-2 border-slate px-3 pb-12 pt-8 sm:px-4">
      <p className="comic-heading text-4xl leading-none text-signal md:text-5xl">{footer.continued}</p>
      <p className="flex items-center gap-2 text-sm text-fog">
        <Emblem className="h-5 w-auto" />
        {footer.credit}
      </p>
    </footer>
  )
}
