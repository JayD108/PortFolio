import { useEffect, useRef, useState } from 'react'
import { notes } from '../content/notes'

const PREFIX = '#note-'

/** Opens a case note full screen when the address ends in #note-<caseId>, so each note has its own link. */
export function NoteReader() {
  const dialog = useRef<HTMLDialogElement>(null)
  const [caseId, setCaseId] = useState<string | null>(null)
  const note = notes.find((n) => n.caseId === caseId)

  useEffect(() => {
    const sync = () => setCaseId(location.hash.startsWith(PREFIX) ? location.hash.slice(PREFIX.length) : null)
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  useEffect(() => {
    const el = dialog.current
    if (!el) return
    if (note && !el.open) {
      el.showModal()
      el.scrollTop = 0
    }
    if (!note && el.open) el.close()
  }, [note])

  // Closing returns to the case file the note belongs to.
  const close = () => {
    const id = caseId
    history.replaceState(null, '', location.pathname + location.search)
    setCaseId(null)
    if (id) requestAnimationFrame(() => document.getElementById(`case-${id}`)?.scrollIntoView())
  }

  return (
    <dialog
      ref={dialog}
      aria-labelledby="note-title"
      onClose={() => caseId && close()}
      className="note-reader m-0 h-full max-h-none w-full max-w-none overflow-y-auto bg-transparent p-0 backdrop:bg-black/80"
    >
      {note && (
        <article className="mx-auto my-6 max-w-3xl border-[3px] border-black bg-[#f4efe2] text-[#15181c] shadow-[8px_8px_0_#000] sm:my-10">
          <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b-[3px] border-black bg-[#f5c518] px-4 py-2.5 sm:px-8">
            <p className="text-xs font-bold uppercase tracking-widest">Case notes · {note.readMinutes} min read</p>
            <button
              type="button"
              onClick={close}
              className="inline-flex min-h-10 items-center rounded-sm border-2 border-black bg-[#f4efe2] px-3 text-sm font-bold hover:bg-black hover:text-[#f5c518]"
            >
              Close
            </button>
          </header>

          <div className="grid gap-6 px-5 py-7 sm:px-10 sm:py-10">
            <div className="grid gap-3">
              <h2 id="note-title" className="comic-heading m-0 text-4xl leading-none sm:text-5xl">{note.title}</h2>
              <p className="m-0 text-lg leading-relaxed text-[#3d4148]">{note.dek}</p>
            </div>

            {note.sections.map((section) => (
              <section key={section.heading} className="grid gap-3">
                <h3 className="m-0 border-b-2 border-black pb-1 text-xl font-bold">{section.heading}</h3>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="m-0 max-w-[68ch] text-[1.0625rem] leading-relaxed">{paragraph}</p>
                ))}
                {section.list && (
                  <ul className="m-0 grid max-w-[68ch] gap-1.5 pl-5 text-[1.0625rem] leading-relaxed">
                    {section.list.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                )}
              </section>
            ))}

            <p className="m-0 border-t-2 border-dashed border-black/40 pt-4 text-sm text-[#3d4148]">{note.footer}</p>
          </div>
        </article>
      )}
    </dialog>
  )
}
