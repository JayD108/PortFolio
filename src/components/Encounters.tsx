import { useCallback, useEffect, useRef, useState } from 'react'
import { consoleNote, endOfIssue, jet } from '../content/fun'
import { chapters, links } from '../content/site'
import { CaptainJay } from './CaptainJay'
import { copyText } from './copyText'

/** Remembers for this visit that something was shown. Works without storage too. */
const shown = new Set<string>()
function alreadyShown(key: string) {
  if (shown.has(key)) return true
  try {
    return sessionStorage.getItem(`encounter:${key}`) === '1'
  } catch {
    return false
  }
}
function markShown(key: string) {
  shown.add(key)
  try {
    sessionStorage.setItem(`encounter:${key}`, '1')
  } catch {
    // Storage blocked: the in-memory set still stops repeats on this page load.
  }
}

let consoleNoteLogged = false

function JetArt() {
  return (
    <svg viewBox="0 0 200 80" aria-hidden="true" className="jet-art h-auto w-36 shrink-0 sm:w-48">
      <path className="jet-flame" d="M174 41 200 46 174 51Z" fill="#f5c518" stroke="#c1121f" strokeWidth="2" />
      <path d="M80 50 130 74H146L118 50Z" fill="#9aa3ad" stroke="#000" strokeWidth="3" strokeLinejoin="round" />
      <path d="M138 38 166 9H178L172 40Z" fill="#c1121f" stroke="#000" strokeWidth="3" strokeLinejoin="round" />
      <path d="M8 46C30 33 110 31 168 37L176 39V53L168 55C110 61 30 59 8 50Z" fill="#e6e8eb" stroke="#000" strokeWidth="3" strokeLinejoin="round" />
      <path d="M40 37C49 20 79 20 89 36Z" fill="#7cc4ec" stroke="#000" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="64" cy="31" r="7" fill="#f5c518" stroke="#000" strokeWidth="2" />
      <path d="M58 30h11v4H58Z" fill="#0b0d10" />
      <path d="M96 44h56v6H96Z" fill="#c1121f" />
      <path d="M8 48 0 48" stroke="#000" strokeWidth="3" />
    </svg>
  )
}

export function Encounters() {
  const [jetState, setJetState] = useState<'hidden' | 'in' | 'out'>('hidden')
  const [endVisible, setEndVisible] = useState(false)
  const [copyLabel, setCopyLabel] = useState(endOfIssue.copy)
  const jetTimer = useRef<number>(0)

  // Without motion there is no exit animation to wait for, so the jet just disappears.
  const leave = useCallback(() => {
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches
    setJetState((state) => (state === 'in' ? (still ? 'hidden' : 'out') : state))
  }, [])

  const flyAway = useCallback(() => {
    window.clearTimeout(jetTimer.current)
    leave()
  }, [leave])

  // Hidden note for anyone who opens the developer console.
  useEffect(() => {
    if (consoleNoteLogged) return
    consoleNoteLogged = true
    console.log(
      `%c${consoleNote[0]}%c\n${consoleNote[1]} ${links.email}`,
      'font: 700 16px sans-serif; color: #f5c518; background: #0b0d10; padding: 4px 8px;',
      'font: 13px sans-serif;',
    )
  }, [])

  // The jet: once per visit, shortly after the reader first reaches Projects.
  useEffect(() => {
    const cases = document.getElementById('cases')
    // Phones skip the jet: on a small screen it covers too much of the page.
    if (!cases || alreadyShown('jet') || !('IntersectionObserver' in window) || matchMedia('(max-width: 767px)').matches) return
    let start = 0
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return
      observer.disconnect()
      start = window.setTimeout(() => {
        markShown('jet')
        setJetState('in')
        jetTimer.current = window.setTimeout(leave, jet.autoHideSeconds * 1000)
      }, 1200)
      // Fires when the section's top reaches the upper part of the screen, however tall the section is.
    }, { rootMargin: '0px 0px -45% 0px' })
    observer.observe(cases)
    return () => {
      observer.disconnect()
      window.clearTimeout(start)
      window.clearTimeout(jetTimer.current)
    }
  }, [leave])

  // End of issue: only for readers who saw every chapter and stayed a while.
  useEffect(() => {
    const footer = document.querySelector('main footer')
    if (!footer || alreadyShown('end') || !('IntersectionObserver' in window)) return
    const loadedAt = performance.now()
    const seen = new Set<string>()
    const sections = chapters.map((chapter) => document.getElementById(chapter.id)).filter((el): el is HTMLElement => !!el)

    // A chapter counts as seen once any part of it passes through the middle band of the screen.
    // A ratio threshold would fail for chapters taller than the screen, as on phones.
    let footerVisible = false
    let pendingCheck = 0

    // The footer can come into view just before the last chapter counts as seen, so both observers re-check.
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) seen.add(entry.target.id)
      })
      tryShow()
    }, { rootMargin: '-35% 0px -35% 0px' })
    sections.forEach((section) => sectionObserver.observe(section))

    function tryShow() {
      if (!footerVisible || seen.size < sections.length || alreadyShown('end')) return
      const remaining = endOfIssue.minReadSeconds * 1000 - (performance.now() - loadedAt)
      // A fast reader who reaches the end early sees the note once the minimum time passes,
      // as long as they are still at the end.
      if (remaining > 0) {
        window.clearTimeout(pendingCheck)
        pendingCheck = window.setTimeout(tryShow, remaining + 50)
        return
      }
      markShown('end')
      setEndVisible(true)
      footerObserver.disconnect()
      sectionObserver.disconnect()
    }

    const footerObserver = new IntersectionObserver((entries) => {
      footerVisible = entries.some((entry) => entry.isIntersecting)
      tryShow()
    })
    footerObserver.observe(footer)
    return () => {
      window.clearTimeout(pendingCheck)
      sectionObserver.disconnect()
      footerObserver.disconnect()
    }
  }, [])

  // Escape closes whichever note is open.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      flyAway()
      setEndVisible(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [flyAway])

  const goToSignal = () => {
    flyAway()
    setEndVisible(false)
    document.getElementById('signal')?.scrollIntoView()
    history.replaceState(null, '', '#signal')
  }

  const copyEmail = async () => {
    setCopyLabel((await copyText(links.email)) ? 'Copied!' : links.email)
    window.setTimeout(() => setCopyLabel(endOfIssue.copy), 2200)
  }

  const button = 'inline-flex min-h-10 items-center rounded-sm border-2 border-black px-3 text-sm font-bold'

  return (
    <>
      {jetState !== 'hidden' && (
        <div className="pointer-events-none fixed inset-x-0 top-16 z-[35] overflow-hidden" style={{ paddingInline: 'calc(var(--edge) + 8px)' }}>
          <div
            role="status"
            aria-label="Message from the pilot"
            className={`jet-flight pointer-events-auto ml-auto flex w-fit max-w-full flex-col items-end gap-1 ${jetState === 'out' ? 'jet-out' : 'jet-in'}`}
            onAnimationEnd={(event) => {
              if (event.animationName === 'jet-out') setJetState('hidden')
            }}
          >
            <JetArt />
            <div className="jet-bubble relative grid max-w-[min(22rem,calc(100vw-2*var(--edge)-1rem))] gap-2 border-[3px] border-black bg-cream p-3 text-night shadow-[4px_4px_0_#000]">
              <div className="flex items-center gap-2.5">
                <CaptainJay className="h-auto w-12 shrink-0" />
                <p className="comic-heading text-xl leading-none">{jet.captain}</p>
              </div>
              <p className="text-sm leading-snug">{jet.message}</p>
              <div className="flex flex-wrap gap-2 pt-1">
                <button type="button" onClick={goToSignal} className={`${button} bg-signal hover:bg-night hover:text-signal`}>{jet.cta}</button>
                <button type="button" onClick={flyAway} className={`${button} bg-cream hover:bg-night hover:text-cream`}>{jet.dismiss}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {endVisible && (
        <div className="pointer-events-none fixed inset-x-0 bottom-20 z-[35] flex justify-center lg:bottom-4" style={{ paddingInline: 'calc(var(--edge) + 8px)' }}>
          <div role="status" aria-label="Thanks for reading" className="end-note pointer-events-auto relative grid w-full max-w-md gap-2 border-[3px] border-black bg-cream p-4 text-night shadow-[6px_6px_0_#000]">
            <button
              type="button"
              aria-label="Close"
              onClick={() => setEndVisible(false)}
              className="absolute right-2 top-2 grid size-9 place-items-center rounded-sm text-xl font-bold leading-none hover:bg-night hover:text-cream"
            >
              ×
            </button>
            <p className="caption-box w-fit -rotate-1 px-2 py-0.5 text-sm font-bold uppercase">{endOfIssue.title}</p>
            <p className="pr-6 text-sm leading-relaxed">{endOfIssue.message}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              <button type="button" onClick={goToSignal} className={`${button} bg-signal hover:bg-night hover:text-signal`}>{endOfIssue.cta}</button>
              <button type="button" onClick={copyEmail} className={`${button} bg-cream hover:bg-night hover:text-cream`}>{copyLabel}</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
