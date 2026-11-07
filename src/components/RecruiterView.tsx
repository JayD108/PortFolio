import { origin } from '../content/origin'
import { links, person, serviceRecord } from '../content/site'
import { statusLabels, training } from '../content/training'
import { Todo } from './Comic'

const linkClass = 'font-medium text-signal underline underline-offset-4 hover:text-paper'
const todoClass = 'border border-dashed border-signal px-1.5 text-sm font-semibold text-signal'

/** Plain, single-column resume view built from the same content files as the comic. */
export function RecruiterView() {
  return (
    <main className="mx-auto grid max-w-2xl gap-8 px-4 py-8">
      <header className="grid gap-2">
        <h1 className="text-3xl font-bold">{person.name}</h1>
        <p className="text-lg text-fog">{person.role}</p>
        <p className="text-fog">{person.tagline}</p>
        <p className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
          {links.resume ? (
            <a className={linkClass} href={`${import.meta.env.BASE_URL}${links.resume}`}>Resume</a>
          ) : (
            <span className={todoClass}>TODO: Resume</span>
          )}
          <a className={linkClass} href={links.github}>GitHub</a>
          {links.linkedIn ? (
            <a className={linkClass} href={links.linkedIn}>LinkedIn</a>
          ) : (
            <span className={todoClass}>TODO: LinkedIn</span>
          )}
          <a className={linkClass} href={links.huggingFace}>Hugging Face</a>
        </p>
      </header>

      <section aria-labelledby="record-h" className="grid gap-3">
        <h2 id="record-h" className="text-xl font-bold">Service Record</h2>
        <dl className="grid gap-2">
          {serviceRecord.map((row) => (
            <div key={row.label} className="grid gap-x-4 sm:grid-cols-[10rem_minmax(0,1fr)]">
              <dt className="text-fog">{row.label}</dt>
              <dd className="m-0">
                {row.value ?? <span className={todoClass}>TODO: {row.todo}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="background-h" className="grid gap-3">
        <h2 id="background-h" className="text-xl font-bold">Background</h2>
        {origin.panels.map((panel) => (
          <p key={panel.id}>
            {panel.text} {panel.todo && <Todo>{panel.todo}</Todo>}
          </p>
        ))}
        <p>{origin.mind.quote}</p>
      </section>

      <section aria-labelledby="skills-h" className="grid gap-4">
        <h2 id="skills-h" className="text-xl font-bold">Skills</h2>
        {training.pouches.map((pouch) => (
          <div key={pouch.id} className="grid gap-1">
            <h3 className="font-semibold">
              {pouch.title} <span className="font-normal text-fog">({statusLabels[pouch.status]})</span>
            </h3>
            <p>{pouch.items.join(', ')}</p>
            <p className="text-fog">{pouch.note}</p>
            {pouch.todo && <p><Todo>{pouch.todo}</Todo></p>}
          </div>
        ))}
      </section>
    </main>
  )
}
