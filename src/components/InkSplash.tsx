import { useEffect, useState } from 'react'
import { useLite } from './effects'

type Splash = { id: number; x: number; y: number; rotate: number; scale: number }

// One irregular blot with a few flecks, drawn once and rotated per click.
const BLOT =
  'M50 20C58 8 74 14 72 28 86 24 94 40 82 48 96 56 88 74 72 70 74 86 56 92 50 80 42 94 22 88 28 72 10 76 6 58 20 52 6 42 14 24 30 30 28 14 44 10 50 20ZM88 16a5 5 0 1 1-.1 0ZM10 88a4 4 0 1 1-.1 0ZM92 86a3 3 0 1 1-.1 0Z'

/** A small ink splat where the visitor clicks. Skipped when effects are light and inside text fields. */
export function InkSplash() {
  const [splashes, setSplashes] = useState<Splash[]>([])
  // Off for reduced motion, phones and low-power devices, and it follows a setting changed mid-visit.
  const lite = useLite()

  useEffect(() => {
    if (lite) return
    let next = 0
    const onDown = (event: PointerEvent) => {
      if (event.button !== 0) return
      const target = event.target as HTMLElement | null
      if (target?.closest('input, textarea, select, [contenteditable="true"], dialog')) return
      const splash = { id: next++, x: event.clientX, y: event.clientY, rotate: Math.random() * 360, scale: 0.8 + Math.random() * 0.5 }
      setSplashes((list) => [...list.slice(-5), splash])
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [lite])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[45] overflow-hidden">
      {splashes.map((s) => (
        <svg
          key={s.id}
          viewBox="0 0 100 100"
          className="ink-splash absolute size-12"
          style={{ left: s.x - 24, top: s.y - 24, ['--r' as string]: `${s.rotate}deg`, ['--s' as string]: s.scale }}
          onAnimationEnd={() => setSplashes((list) => list.filter((item) => item.id !== s.id))}
        >
          <path d={BLOT} />
        </svg>
      ))}
    </div>
  )
}
