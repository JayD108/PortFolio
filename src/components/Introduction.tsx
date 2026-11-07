import { useRef } from 'react'
import { intro } from '../content/intro'
import { academics, person, serviceRecord } from '../content/site'
import { CaptainJay } from './CaptainJay'
import { ChapterHeader, Reveal } from './Comic'
import { CourseworkFile } from './CourseworkFile'

/** The full personnel file: everything that doesn't fit on the card. */
function IntroSheet({ onClose }: { onClose: () => void }) {
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
        <p className="text-xs font-bold uppercase tracking-widest">Personnel file · Esc to close</p>
      </header>

      <div className="grid gap-8 px-4 py-6 sm:px-8 sm:py-8">
        <div className="flex items-center gap-4">
          <div className="grid min-w-0 flex-1 gap-2">
            <h2 id="intro-sheet-title" className="comic-heading m-0 text-4xl leading-none text-signal sm:text-5xl">{person.name}</h2>
            <p className="m-0 text-lg leading-snug">{intro.lead}</p>
          </div>
          <CaptainJay className="hidden h-auto w-28 shrink-0 drop-shadow-[4px_4px_0_#000] sm:block" title="Captain Jay, my comic pilot persona" />
        </div>


        <section aria-labelledby="record-title" className="grid gap-3 border-[3px] border-black bg-cream p-4 text-night">
          <h3 id="record-title" className="comic-heading m-0 text-3xl leading-none">Service record</h3>
          <dl className="m-0 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {serviceRecord
              .filter((row) => row.value)
              .map((row) => (
                <div key={row.label} className="grid gap-0.5 border-b border-ink/25 pb-2">
                  <dt className="text-xs font-semibold uppercase tracking-wide">{row.label}</dt>
                  <dd className="m-0 text-base font-medium">{row.value}</dd>
                </div>
              ))}
            {academics.sgpa && (
              <div className="grid gap-0.5 border-b border-ink/25 pb-2">
                <dt className="text-xs font-semibold uppercase tracking-wide">SGPA</dt>
                <dd className="m-0 text-base font-medium">{academics.sgpa}</dd>
              </div>
            )}
            <div className="grid gap-0.5 border-b border-ink/25 pb-2">
              <dt className="text-xs font-semibold uppercase tracking-wide">Based in</dt>
              <dd className="m-0 text-base font-medium">{intro.facts.find((fact) => fact.label === 'Based in')?.value}</dd>
            </div>
          </dl>
        </section>

        <CourseworkFile />
      </div>
    </article>
  )
}

/** About: the essentials and a short bio on one wide card. The button opens the full file. */
export function Introduction() {
  const dialog = useRef<HTMLDialogElement>(null)
  const open = () => {
    dialog.current?.showModal()
    dialog.current?.scrollTo(0, 0)
  }
  const close = () => dialog.current?.close()

  return (
    <section id="intro" aria-labelledby="intro-title" className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)] gap-6 px-2 py-10 sm:px-4 md:py-20">
      <ChapterHeader id="intro-title" chapter={intro.chapter} title="About" />
      <Reveal>
        <article className="story-panel panel-frame grid gap-5 bg-gunmetal p-5 sm:p-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-10">
          <div className="grid content-start gap-4">
            <CaptainJay className="hidden h-auto w-28 drop-shadow-[4px_4px_0_#000] md:block" />
            <h3 className="comic-heading m-0 text-4xl leading-none text-paper">{person.name}</h3>
            <div className="grid gap-0.5">
              <p className="m-0 text-lg font-semibold leading-snug text-paper">
                {academics.degree} · {academics.honors}
              </p>
              <p className="m-0 text-base text-fog">
                {academics.college} · Class of {academics.classOf}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {academics.sgpa && (
                <span className="border-2 border-black bg-signal px-2.5 py-0.5 text-base font-bold text-night">SGPA {academics.sgpa}</span>
              )}
              {academics.cgpa && (
                <span className={`border-2 px-2.5 py-0.5 text-base font-bold ${academics.sgpa ? 'border-slate text-paper' : 'border-black bg-signal text-night'}`}>
                  CGPA {academics.cgpa}
                </span>
              )}
            </div>
          </div>

          {/* A short read about me, then the full file for anyone who wants more. */}
          <div className="grid content-start gap-4 md:border-l-2 md:border-slate md:pl-10">
            {intro.bio.map((paragraph) => (
              <p key={paragraph} className="m-0 max-w-[62ch] text-base leading-relaxed text-paper md:text-[1.0625rem]">{paragraph}</p>
            ))}
            <button
              type="button"
              onClick={open}
              aria-haspopup="dialog"
              className="inline-flex min-h-11 w-fit items-center gap-1 rounded-sm border-2 border-signal bg-ink px-3 text-base font-bold text-signal hover:bg-signal hover:text-night"
            >
              Full file: record and coursework
              <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </article>
      </Reveal>

      <dialog
        ref={dialog}
        aria-labelledby="intro-sheet-title"
        onClick={(event) => {
          // A click on the dimmed backdrop (outside the sheet) closes it on desktop.
          if (event.target === dialog.current) close()
        }}
        className="sheet m-0 h-full max-h-none w-full max-w-none overflow-y-auto bg-transparent p-0 backdrop:bg-black/80"
      >
        <IntroSheet onClose={close} />
      </dialog>
    </section>
  )
}
