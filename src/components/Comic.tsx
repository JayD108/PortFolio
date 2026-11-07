import { useEffect, useRef, useState, type ReactNode } from 'react'
import { isLite } from './effects'

/** Yellow narration box. */
export function Caption({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`caption-box w-fit font-bold ${className}`}>{children}</p>
}

type ChapterHeaderProps = {
  id: string
  chapter: string
  title: string
  narration?: string
  children?: ReactNode
}

/** The heading block every chapter opens with. `id` labels the chapter's section. */
export function ChapterHeader({ id, chapter, title, narration, children }: ChapterHeaderProps) {
  return (
    <header className="grid gap-3">
      <p className="text-xs font-bold uppercase tracking-widest text-fog">{chapter}</p>
      <h2 id={id} className="comic-heading text-5xl leading-none text-signal md:text-6xl">{title}</h2>
      {narration && <Caption className="max-w-2xl rotate-[0.3deg] px-3 py-2 text-base sm:text-lg">{narration}</Caption>}
      {children}
    </header>
  )
}

/** Sound effect shown on hover or focus of the nearest .sfx-host. Decorative only. */
export function Sfx({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span aria-hidden="true" className={`sfx comic-heading ${className}`}>{children}</span>
}

/** Marks content that still needs writing, so it can't be mistaken for finished copy. */
export function Todo({ children, light = false }: { children: ReactNode; light?: boolean }) {
  const colors = light ? 'border-ink text-night' : 'border-signal text-signal'
  return (
    <span className={`inline-block border border-dashed px-1.5 text-sm font-semibold ${colors}`}>
      TODO: {children}
    </span>
  )
}

type RevealProps = {
  children: ReactNode
  className?: string
}

/**
 * Fades its content in the first time it scrolls into view.
 * Content stays visible if the browser can't observe scrolling, or effects are light (phones, reduced motion, low power).
 */
export function Reveal({ children, className = '' }: RevealProps) {
  const element = useRef<HTMLDivElement>(null)
  const [pending, setPending] = useState(
    () => 'IntersectionObserver' in window && !isLite(),
  )

  useEffect(() => {
    if (!pending || !element.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setPending(false)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(element.current)
    return () => observer.disconnect()
  }, [pending])

  return (
    <div ref={element} className={`reveal ${pending ? 'reveal-pending' : ''} ${className}`}>
      {children}
    </div>
  )
}
