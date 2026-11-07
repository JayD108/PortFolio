import { useId, useState } from 'react'
import { coursework } from '../content/coursework'

/** A closed manila folder. The subject list only renders after a visitor opens it. */
export function CourseworkFile() {
  const [open, setOpen] = useState(false)
  const contentId = useId()
  const total = coursework.semesters.reduce((sum, semester) => sum + semester.subjects.length, 0)

  return (
    <section aria-label={coursework.title} className="grid">
      {/* Folder tab */}
      <div className="folder-tab ml-4 w-fit border-[3px] border-b-0 border-black bg-[#d9c48f] px-4 pb-1 pt-1.5 text-xs font-bold uppercase tracking-widest text-night">
        Academic record
      </div>

      <div className="folder relative border-[3px] border-black bg-[#e6d3a3] text-night shadow-[5px_5px_0_#000]">
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div className="grid gap-0.5">
            <h3 className="comic-heading text-3xl leading-none">{coursework.title}</h3>
            <p className="text-sm font-medium">
              {coursework.summary} · SRM Institute of Science and Technology
            </p>
          </div>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={contentId}
            onClick={() => setOpen(!open)}
            className="sfx-host relative inline-flex min-h-11 items-center gap-2 rounded-sm border-2 border-black bg-night px-4 text-sm font-bold text-cream shadow-[3px_3px_0_#000] hover:bg-signal hover:text-night"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
              {open ? <path d="M3 7h6l2 2h10v10H3Z" /> : <path d="M3 5h6l2 2h10v12H3Z" />}
            </svg>
            {open ? coursework.closeLabel : coursework.openLabel}
          </button>
        </div>

        {!open && (
          <p aria-hidden="true" className="folder-stamp pointer-events-none absolute right-40 top-3 hidden -rotate-6 border-[3px] border-blood px-2 py-0.5 text-sm font-black uppercase tracking-widest text-blood opacity-80 md:block">
            {total} subjects inside
          </p>
        )}

        <div id={contentId} hidden={!open} className="border-t-[3px] border-dashed border-black/50 px-4 pb-5 pt-4 sm:px-6">
          {open && (
            <ol className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 xl:grid-cols-4">
              {coursework.semesters.map((semester) => (
                <li key={semester.number} className="grid content-start gap-2 border-2 border-black bg-cream p-3">
                  <div className="flex items-baseline justify-between gap-2 border-b-2 border-black pb-1.5">
                    <h4 className="comic-heading m-0 text-2xl leading-none">Semester {semester.number}</h4>
                    <span className="text-xs font-semibold">{semester.session}</span>
                  </div>
                  <ul className="m-0 grid list-none gap-1 p-0 text-sm leading-snug">
                    {semester.subjects.map((subject) => (
                      <li key={subject} className="flex gap-2">
                        <span aria-hidden="true" className="mt-[0.45em] size-1.5 shrink-0 bg-night" />
                        <span>{subject}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="m-0 border-t border-black/30 pt-1.5 text-xs font-bold uppercase tracking-wide">SGPA {semester.sgpa}</p>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  )
}
