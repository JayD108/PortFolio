import { serviceRecord } from '../content/site'
import { statusLabels, training, type PouchIcon, type SkillStatus } from '../content/training'
import { ChapterHeader, Reveal, Sfx, Todo } from './Comic'
import { CourseworkFile } from './CourseworkFile'
import { PouchIcon as PouchIconArt } from './PouchIcon'

// Keeps every grid row full: AI / ML gets the extra width on desktop, Fintech on tablets.
const spans: Partial<Record<PouchIcon, string>> = {
  ai: 'lg:col-span-2',
  fintech: 'md:col-span-2 lg:col-span-1',
}

/** Status is shown in words and in the stamp's shape, so it never relies on colour alone. */
function StatusStamp({ status }: { status: SkillStatus }) {
  const style =
    status === 'battle-tested'
      ? 'border-2 border-black bg-signal text-night'
      : 'border-2 border-dashed border-fog text-paper'

  return (
    <span className={`inline-block w-fit -rotate-2 px-2 py-0.5 text-xs font-bold uppercase tracking-wide ${style}`}>
      {statusLabels[status]}
    </span>
  )
}

function ServiceRecord() {
  return (
    <article aria-labelledby="record-title" className="story-panel panel-frame flex h-full flex-col gap-3 bg-cream p-4 text-night md:-rotate-[0.4deg]">
      <p className="text-xs font-bold uppercase tracking-widest">Personnel file</p>
      <h3 id="record-title" className="comic-heading text-3xl leading-none">Service Record</h3>
      <dl className="grid gap-x-6 gap-y-2.5 md:grid-cols-2">
        {serviceRecord.map((row) => (
          <div key={row.label} className="grid content-start gap-0.5 border-b border-ink/25 pb-2 last:border-b-0 last:pb-0 md:[&:nth-last-child(2)]:border-b-0 md:[&:nth-last-child(2)]:pb-0">
            <dt className="text-xs font-semibold uppercase tracking-wide">{row.label}</dt>
            <dd className="m-0 font-medium">{row.value ?? <Todo light>{row.todo}</Todo>}</dd>
          </div>
        ))}
      </dl>
    </article>
  )
}

export function TrainingArc() {
  return (
    <section id="training" aria-labelledby="training-title" className="mx-auto grid max-w-7xl gap-6 px-3 py-12 sm:px-4 md:py-16">
      <ChapterHeader id="training-title" chapter={training.chapter} title={training.title} narration={training.narration}>
        <ul aria-label="What the labels mean" className="flex flex-wrap gap-x-6 gap-y-2 pt-1">
          {training.legend.map((entry) => (
            <li key={entry.status} className="flex flex-wrap items-center gap-2 text-sm text-fog">
              <StatusStamp status={entry.status} />
              {entry.meaning}
            </li>
          ))}
        </ul>
      </ChapterHeader>

      <div className="grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
        <Reveal className="md:col-span-2">
          <ServiceRecord />
        </Reveal>

        {training.pouches.map((pouch, index) => (
          <Reveal key={pouch.id} className={spans[pouch.id] ?? ''}>
            <article
              aria-labelledby={`pouch-${pouch.id}`}
              className={`story-panel sfx-host pouch panel-frame relative flex h-full flex-col bg-gunmetal ${index % 2 ? 'md:rotate-[0.4deg]' : 'md:-rotate-[0.3deg]'}`}
            >
              <div className="pouch-flap flex items-center justify-between gap-3 bg-slate px-4 pb-6 pt-3">
                <h3 id={`pouch-${pouch.id}`} className="comic-heading text-3xl leading-none text-paper lg:text-2xl xl:text-3xl">{pouch.title}</h3>
                <PouchIconArt name={pouch.id} />
              </div>
              <Sfx className="right-2 top-1 text-xl">{pouch.sfx}</Sfx>
              <div className="grid flex-1 content-start gap-3 p-4">
                <StatusStamp status={pouch.status} />
                <ul aria-label={`${pouch.title} skills`} className="flex flex-wrap gap-1.5">
                  {pouch.items.map((item) => (
                    <li key={item} className="border border-slate bg-ink px-2 py-0.5 text-sm font-medium text-paper">{item}</li>
                  ))}
                </ul>
                <p className="text-sm leading-relaxed text-fog">{pouch.note}</p>
                {pouch.todo && <p><Todo>{pouch.todo}</Todo></p>}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <CourseworkFile />
      </Reveal>
    </section>
  )
}
