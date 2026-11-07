import { useRef, useState, type KeyboardEvent, type TouchEvent } from 'react'
import { training, type Track, type TrackId } from '../content/training'
import { ChapterHeader, Reveal, Sfx } from './Comic'
import { PouchIcon } from './PouchIcon'

function Chips({ label, items, used }: { label: string; items: string[]; used: boolean }) {
  if (!items.length) return null
  return (
    <div className="grid gap-2">
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-fog">
        {/* Solid stamp = used in projects, dashed = learning. Shape and words, never colour alone. */}
        <span aria-hidden="true" className={`inline-block size-3 -rotate-6 ${used ? 'border-2 border-black bg-signal' : 'border-2 border-dashed border-fog'}`} />
        {label}
      </p>
      <ul aria-label={label} className="m-0 flex list-none flex-wrap gap-2 p-0">
        {items.map((item) => (
          <li
            key={item}
            className={`px-2.5 py-1 text-[0.9375rem] font-medium ${used ? 'border-2 border-black bg-signal text-night' : 'border border-dashed border-fog text-paper'}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function TrackPanel({ track }: { track: Track }) {
  return (
    <article aria-labelledby={`track-${track.id}`} className="story-panel sfx-host pouch panel-frame relative flex h-full flex-col bg-gunmetal">
      <div className="pouch-flap flex items-center justify-between gap-3 bg-slate px-4 pb-6 pt-3">
        <h3 id={`track-${track.id}`} className="comic-heading text-3xl leading-none text-paper">{track.title}</h3>
        <PouchIcon name={track.id} />
      </div>
      <Sfx className="right-2 top-1 text-xl">{track.sfx}</Sfx>
      <div className="grid flex-1 content-start gap-4 p-4">
        <p className="text-base leading-relaxed text-fog">{track.line}</p>
        <Chips label={training.usedLabel} items={track.used} used />
        <Chips label={training.learningLabel} items={track.learning} used={false} />
      </div>
    </article>
  )
}

/** Three tracks. Phones see one at a time (tabs, or swipe left and right); wider screens see all three. */
export function TrainingArc() {
  const { tracks } = training
  const [active, setActive] = useState<TrackId>(tracks[0].id)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const activeIndex = tracks.findIndex((track) => track.id === active)

  const go = (index: number, focus = false) => {
    const next = (index + tracks.length) % tracks.length
    setActive(tracks[next].id)
    if (focus) tabs.current[next]?.focus()
  }

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    go(activeIndex + (event.key === 'ArrowRight' ? 1 : -1), true)
  }

  // A clear sideways swipe changes track; vertical scrolling is left alone.
  const onTouchStart = (event: TouchEvent) => {
    touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }
  }
  const onTouchEnd = (event: TouchEvent) => {
    const start = touchStart.current
    touchStart.current = null
    if (!start) return
    const dx = event.changedTouches[0].clientX - start.x
    const dy = event.changedTouches[0].clientY - start.y
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(activeIndex + (dx < 0 ? 1 : -1))
  }

  return (
    <section id="training" aria-labelledby="training-title" className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)] gap-6 px-2 py-10 sm:px-4 md:py-20">
      <ChapterHeader id="training-title" chapter={training.chapter} title={training.title} narration={training.narration} />

      <div role="tablist" aria-label="Skill tracks" className="grid grid-cols-3 gap-2 md:hidden">
        {tracks.map((track, index) => {
          const selected = track.id === active
          return (
            <button
              key={track.id}
              ref={(element) => { tabs.current[index] = element }}
              type="button"
              role="tab"
              id={`track-tab-${track.id}`}
              aria-selected={selected}
              aria-controls={`track-panel-${track.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(track.id)}
              onKeyDown={onKeyDown}
              className={`comic-heading min-h-12 border-2 px-1 text-xl leading-none ${selected ? 'border-black bg-signal text-night shadow-[3px_3px_0_#000]' : 'border-slate bg-gunmetal text-paper'}`}
            >
              {track.title}
            </button>
          )
        })}
      </div>

      <div className="grid gap-5 md:grid-cols-3 md:gap-6" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {tracks.map((track) => (
          <div
            key={track.id}
            id={`track-panel-${track.id}`}
            role="tabpanel"
            aria-labelledby={`track-tab-${track.id}`}
            className={track.id === active ? '' : 'hidden md:block'}
          >
            <Reveal>
              <TrackPanel track={track} />
            </Reveal>
          </div>
        ))}
      </div>

      {/* Position dots for the phone view. */}
      <p aria-hidden="true" className="-mt-2 flex justify-center gap-2 md:hidden">
        {tracks.map((track) => (
          <span key={track.id} className={`block h-2 rounded-full transition-all ${track.id === active ? 'w-6 bg-signal' : 'w-2 bg-slate'}`} />
        ))}
      </p>
    </section>
  )
}
