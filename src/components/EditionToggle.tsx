import { useState } from 'react'

export type Edition = 'night' | 'day'
const KEY = 'edition'

function current(): Edition {
  return document.documentElement.dataset.edition === 'day' ? 'day' : 'night'
}

/** Switches between the night edition and the daylight (newsprint) edition, and remembers the choice. */
export function EditionToggle() {
  const [edition, setEdition] = useState<Edition>(current)

  const toggle = () => {
    const next: Edition = edition === 'day' ? 'night' : 'day'
    if (next === 'day') document.documentElement.dataset.edition = 'day'
    else delete document.documentElement.dataset.edition
    setEdition(next)
    try {
      localStorage.setItem(KEY, next)
    } catch {
      // Storage blocked: the switch still works for this visit.
    }
  }

  const day = edition === 'day'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={day}
      aria-label="Daylight edition"
      title={day ? 'Switch to the night edition' : 'Switch to the daylight edition'}
      className="grid size-10 shrink-0 place-items-center rounded-sm border border-slate text-fog hover:border-signal hover:text-signal"
    >
      {day ? (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2.3M12 19.2v2.3M2.5 12h2.3M19.2 12h2.3M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
        </svg>
      )}
    </button>
  )
}
