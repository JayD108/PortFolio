import { intro } from '../content/intro'
import { ChapterHeader, Reveal } from './Comic'

export function Introduction() {
  return (
    <section id="intro" aria-labelledby="intro-title" className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-6 px-3 py-12 sm:px-4 md:py-16">
      <ChapterHeader id="intro-title" chapter={intro.chapter} title={intro.title} />
      <Reveal>
        <article className="panel-frame bg-gunmetal">
          <div className="halftone-shift relative border-b-[5px] border-black bg-slate/60 px-5 py-6 sm:px-8 md:py-8">
            <p className="comic-heading relative max-w-5xl text-3xl leading-tight text-signal sm:text-4xl md:text-5xl">{intro.lead}</p>
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
