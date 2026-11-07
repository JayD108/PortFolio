import { origin } from '../content/origin'
import { Caption, Reveal, Sfx, SpeechBubble, Todo } from './Comic'
import { OriginArt } from './OriginArt'

const tilts = ['md:-rotate-[0.6deg]', 'md:rotate-[0.5deg]', 'md:-rotate-[0.3deg]']

export function OriginStory() {
  return (
    <section id="origin" aria-labelledby="origin-title" className="mx-auto grid max-w-7xl gap-6 px-3 py-12 sm:px-4 md:py-16">
      <header className="grid gap-3">
        <p className="text-xs font-bold uppercase tracking-widest text-fog">{origin.chapter}</p>
        <h2 id="origin-title" className="comic-heading text-5xl leading-none text-signal md:text-6xl">{origin.title}</h2>
        <Caption className="max-w-2xl -rotate-[0.4deg] px-3 py-2 text-base sm:text-lg">{origin.narration}</Caption>
      </header>

      <div className="grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {origin.panels.map((panel, index) => {
          // The third panel spans the full row on tablets, so its art sits beside the text there.
          const wide = index === 2
          return (
            <Reveal key={panel.id} className={wide ? 'md:col-span-2 lg:col-span-1' : ''}>
              <article className={`story-panel sfx-host panel-frame relative flex h-full flex-col bg-gunmetal ${tilts[index]} ${wide ? 'md:flex-row lg:flex-col' : ''}`}>
                <div className={`halftone-shift relative h-44 shrink-0 overflow-hidden bg-slate/60 md:h-48 ${wide ? 'md:w-1/2 lg:w-full' : ''}`}>
                  <OriginArt name={panel.id} />
                </div>
                <Caption className="absolute left-2 top-2 px-2 py-0.5 text-sm">{panel.caption}</Caption>
                <Sfx className="right-2 top-2 text-2xl">{panel.sfx}</Sfx>
                <div className={`grid flex-1 content-start gap-3 border-t-[5px] border-black p-4 ${wide ? 'md:border-l-[5px] md:border-t-0 lg:border-l-0 lg:border-t-[5px]' : ''}`}>
                  <p className="text-base leading-relaxed text-paper">{panel.text}</p>
                  {panel.todo && <p><Todo>{panel.todo}</Todo></p>}
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>

      <Reveal>
        <div className="grid items-center gap-4 pt-2 md:grid-cols-[auto_minmax(0,1fr)] md:gap-8">
          <Caption className="rotate-[0.6deg] px-3 py-1.5 text-base sm:text-lg">{origin.mind.caption}</Caption>
          <SpeechBubble className="max-w-2xl">{origin.mind.quote}</SpeechBubble>
        </div>
      </Reveal>
    </section>
  )
}
