import { useEffect, useState } from 'react'
import { dismissBadgeNotice, evidenceIds, useEvidence } from './evidenceStore'

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

export function DetectiveBadgeIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M12 1.5 14.6 7l6 .7-4.5 4.1 1.2 5.9L12 14.8l-5.3 2.9 1.2-5.9-4.5-4.1 6-.7Z" fill="#f5c518" stroke="#000" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10.8 9.2h2.4v4.6h-2.4Z" fill="#000" />
    </svg>
  )
}

/** Small notices for the detective badge and the night-vision code. Neither blocks the page. */
export function Extras() {
  const evidence = useEvidence()
  const [vision, setVision] = useState(false)
  const [visionNotice, setVisionNotice] = useState<string | null>(null)

  // ↑ ↑ ↓ ↓ ← → ← → B A switches night vision on or off.
  useEffect(() => {
    let position = 0
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.closest('input, textarea, select, [contenteditable="true"]')) return
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key
      position = key === KONAMI[position] ? position + 1 : key === KONAMI[0] ? 1 : 0
      if (position < KONAMI.length) return
      position = 0
      setVision((on) => {
        const next = !on
        document.documentElement.classList.toggle('night-vision', next)
        setVisionNotice(next ? 'Night vision on. Enter the code again to switch it off.' : 'Night vision off.')
        return next
      })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!visionNotice) return
    const timer = window.setTimeout(() => setVisionNotice(null), 3500)
    return () => window.clearTimeout(timer)
  }, [visionNotice])

  useEffect(() => {
    if (!evidence.justEarned) return
    const timer = window.setTimeout(dismissBadgeNotice, 9000)
    return () => window.clearTimeout(timer)
  }, [evidence.justEarned])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-16 z-[36] grid justify-items-center gap-2" style={{ paddingInline: 'calc(var(--edge) + 8px)' }}>
      {evidence.justEarned && (
        <div role="status" className="badge-notice pointer-events-auto flex max-w-md items-center gap-3 border-[3px] border-black bg-cream px-4 py-3 text-night shadow-[5px_5px_0_#000]">
          <DetectiveBadgeIcon className="size-10 shrink-0" />
          <div className="grid gap-0.5">
            <p className="comic-heading m-0 text-xl leading-none">Detective badge unlocked</p>
            <p className="m-0 text-sm leading-snug">You examined all {evidenceIds.length} evidence files. That's thorough work. The badge now sits in the menu bar.</p>
          </div>
          <button type="button" aria-label="Close" onClick={dismissBadgeNotice} className="grid size-8 shrink-0 place-items-center self-start rounded-sm text-lg font-bold hover:bg-night hover:text-cream">
            ×
          </button>
        </div>
      )}
      {visionNotice && (
        <p role="status" className="pointer-events-auto m-0 border-2 border-black bg-[#0c2a12] px-3 py-1.5 text-sm font-semibold text-[#8dff9e] shadow-[3px_3px_0_#000]">
          {visionNotice}
        </p>
      )}
      <span className="sr-only">{vision ? 'Night vision is on.' : ''}</span>
    </div>
  )
}
