import type { TrackId as IconName } from '../content/training'

/** Small original gadget icons for the skill tracks. Decorative only. */
export function PouchIcon({ name }: { name: IconName }) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className="size-11 shrink-0 text-signal"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    >
      {name === 'backend' && (
        <>
          <path d="M7 8h34v13H7ZM7 27h34v13H7Z" />
          <path d="M14 14.5h.1M14 33.5h.1M24 14.5h10M24 33.5h10" />
        </>
      )}
      {name === 'ai' && (
        <>
          <path d="M11 12 24 24M11 36l13-12M24 24h13" />
          <circle cx="9" cy="10" r="5" />
          <circle cx="9" cy="38" r="5" />
          <circle cx="24" cy="24" r="5" fill="currentColor" />
          <circle cx="40" cy="24" r="5" />
        </>
      )}
      {name === 'fintech' && (
        <>
          <path d="M24 4 41 10v13c0 10-7 17-17 21C14 40 7 33 7 23V10Z" />
          <path d="M17 16h14M17 22h14M23 16c5 0 6 6 0 6h-5l11 11" />
        </>
      )}
    </svg>
  )
}
