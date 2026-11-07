import { intro } from '../content/intro'
import { ChapterHeader, Reveal } from './Comic'

export function Introduction() {
  return (
    <section id="intro" aria-labelledby="intro-title" className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-6 px-3 py-12 sm:px-4 md:py-16">
      <ChapterHeader id="intro-title" chapter={intro.chapter} title={intro.title} />
      <Reveal>
        <article className="panel-frame grid max-w-3xl gap-4 bg-gunmetal p-5 sm:p-6">
          {intro.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-relaxed text-paper">{paragraph}</p>
          ))}
        </article>
      </Reveal>
    </section>
  )
}
