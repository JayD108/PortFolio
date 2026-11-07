import { useState } from 'react'
import { academics, currently, issue, links, person } from '../content/site'
import { stats } from '../content/stats'
import { CityScene } from './CityScene'
import { Caption } from './Comic'
import { describe, useLiveWeather } from './liveWeather'

const datasetHref = 'https://huggingface.co/datasets/JayF14/chb-mit-preprocessed-eeg'

const [firstName, ...rest] = person.name.split(' ')
const lastName = rest.join(' ')

/** Cover: name, study background, the dataset highlight, the resume and email. Nothing else on the first screen. */
export function Cover() {
  const weather = useLiveWeather()
  // Between 11 PM and 4 AM in the visitor's own time, the cover greets fellow night owls.
  const [lateNight] = useState(() => {
    const hour = new Date().getHours()
    return hour >= 23 || hour < 4
  })

  return (
    <section id="cover" aria-labelledby="cover-name" className="mx-auto max-w-7xl p-1 sm:p-3">
      <div className="night-scene panel-frame relative isolate overflow-hidden bg-ink">
        <CityScene />

        <div className="relative grid gap-6 px-4 pb-24 pt-4 sm:px-7 md:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] md:items-end md:gap-10 md:pb-40 md:pt-6">
          <div className="grid min-w-0 content-start gap-4">
            <p className="w-fit border-2 border-black bg-cream px-2 py-1 text-xs font-bold uppercase text-night">
              Issue {issue.number} · {issue.date}
            </p>
            <h1 id="cover-name" className="comic-heading masthead text-[clamp(3.25rem,16vw,6rem)] uppercase md:text-[clamp(4.5rem,9vw,9rem)]">
              <span className="block">{firstName}</span>
              <span className="block">{lastName}</span>
            </h1>
            <Caption className="hidden -rotate-1 px-3 py-1.5 text-lg sm:block">{person.tagline}</Caption>
            {lateNight && (
              <p className="hidden w-fit rotate-1 border-2 border-black bg-cream px-3 py-1 text-sm font-semibold text-night shadow-[3px_3px_0_#000] sm:block">
                Working late too, detective? Same here.
              </p>
            )}
          </div>

          {/* About me: the essentials a recruiter looks for first. */}
          <div aria-label="About me" role="group" className="grid gap-4 border-[3px] border-black bg-gunmetal/95 p-4 shadow-[5px_5px_0_#000] sm:p-5">
            <div className="grid gap-1">
              <p className="text-lg font-bold leading-snug text-paper">
                {academics.degree} · {academics.honors}
              </p>
              <p className="text-base text-fog">
                {academics.college} · Class of {academics.classOf}
              </p>
            </div>

            {/* The highlight: real people downloading my public dataset. Grades live in the About section. */}
            <a
              href={datasetHref}
              className="group grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 border-2 border-black bg-signal px-3 py-2 text-night shadow-[3px_3px_0_#000] hover:bg-cream"
            >
              <span className="comic-heading row-span-2 text-5xl leading-none">{stats.dataset.downloads.toLocaleString('en-US')}</span>
              <span className="text-sm font-bold uppercase tracking-wide">downloads on Hugging Face</span>
              <span className="text-sm font-medium leading-snug group-hover:underline">
                My preprocessed EEG dataset<span aria-hidden="true"> ↗</span>
              </span>
            </a>
            {academics.sgpa && <p className="text-base font-semibold text-paper">SGPA {academics.sgpa}</p>}

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`${import.meta.env.BASE_URL}${links.resume}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border-2 border-black bg-signal px-4 text-base font-bold text-night shadow-[3px_3px_0_#000] hover:bg-cream"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M6 2.5h8l4.5 4.5v14.5H6Z" />
                  <path d="M14 2.5V7h4.5M9 12h6M9 15.5h6M9 19h4" />
                </svg>
                Resume
                <span className="sr-only">(PDF, 1 page)</span>
              </a>
              <a
                href={`mailto:${links.email}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border-2 border-paper bg-ink px-3 text-base font-bold text-paper hover:border-signal hover:text-signal"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
                  <path d="M3.5 6.5h17v11h-17Z" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
                Email
              </a>
            </div>

            <p className="flex items-baseline gap-2 text-base font-semibold leading-snug text-[#c9f5d8]">
              <span aria-hidden="true" className="open-dot relative top-[-1px] size-2.5 shrink-0 rounded-full bg-[#3fbf6f]" />
              <span>Open to {person.openTo}</span>
            </p>
            <p className="border-t border-slate pt-3 text-base leading-snug text-paper">
              <span className="font-bold text-signal">Currently: </span>
              {currently}
            </p>
          </div>
        </div>

        {weather && (
          <a
            href="#case-varuna"
            className="absolute bottom-4 left-4 z-10 hidden max-w-[16rem] items-center gap-2 border border-slate bg-ink/85 px-2.5 py-1.5 text-xs leading-snug text-fog hover:border-signal hover:text-paper md:flex"
          >
            <span aria-hidden="true" className="text-base leading-none">{weather.mmPerHour > 0 ? '☂' : '☁'}</span>
            <span>Live over Dehradun: {describe(weather)}. The rain here follows it, a nod to VARUNA.</span>
          </a>
        )}
      </div>
    </section>
  )
}
