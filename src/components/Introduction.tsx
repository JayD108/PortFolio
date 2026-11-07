import { intro } from '../content/intro'
import { CaptainJay } from './CaptainJay'
import { ChapterHeader, Reveal } from './Comic'

export function Introduction() {
  return (
    <section id="intro" aria-labelledby="intro-title" className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-6 px-3 py-12 sm:px-4 md:py-16">
      <ChapterHeader id="intro-title" chapter={intro.chapter} title={intro.title} />
      <Reveal>
        <article className="panel-frame bg-gunmetal">
          <div className="halftone-shift relative flex items-center gap-4 border-b-[5px] border-black bg-slate/60 px-5 py-6 sm:gap-8 sm:px-8 md:py-8">
            <p className="comic-heading relative min-w-0 max-w-5xl flex-1 text-3xl leading-tight text-signal sm:text-4xl md:text-5xl">{intro.lead}</p>
            <figure className="relative m-0 hidden shrink-0 sm:grid">
              <CaptainJay className="h-auto w-32 drop-shadow-[4px_4px_0_#000] md:w-40" title="Captain Jay, my comic pilot persona" />
              <figcaption className="caption-box -mt-2 w-fit justify-self-center -rotate-2 px-2 py-0.5 text-xs uppercase">Captain Jay</figcaption>
            </figure>
          </div>

          <div className="grid gap-px bg-black md:grid-cols-3">
            {intro.columns.map((column, index) => (
              <div key={column.heading} className="grid content-start gap-2 bg-gunmetal px-5 py-6 sm:px-8">
                <p className="text-xs font-bold uppercase tracking-widest text-fog">0{index + 1}</p>
                <h3 className="comic-heading text-3xl leading-none text-paper">{column.heading}</h3>
                <p className="text-base leading-relaxed text-paper md:text-[1.0625rem]">{column.text}</p>
              </div>
            ))}
          </div>

          <dl className="m-0 grid grid-cols-2 gap-px border-t-[5px] border-black bg-black sm:grid-cols-4">
            {intro.facts.map((fact) => (
              <div key={fact.label} className="bg-ink px-5 py-4 sm:px-8">
                <dt className="text-xs font-bold uppercase tracking-widest text-fog">{fact.label}</dt>
                <dd className="comic-heading m-0 text-3xl leading-none text-signal">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </article>
      </Reveal>
    </section>
  )
}
