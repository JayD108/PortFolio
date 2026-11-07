import { useEffect, useRef, useState, type ReactNode } from 'react'

/** Yellow narration box. */
export function Caption({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`caption-box w-fit font-bold ${className}`}>{children}</p>
}

/** Sound effect shown on hover or focus of the nearest .sfx-host. Decorative only. */
export function Sfx({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span aria-hidden="true" className={`sfx comic-heading ${className}`}>{children}</span>
}

export function SpeechBubble({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <blockquote className={`speech-bubble ${className}`}>{children}</blockquote>
}

/** Marks content that still needs writing, so it can't be mistaken for finished copy. */
export function Todo({ children, light = false }: { children: ReactNode; light?: boolean }) {
  const colors = light ? 'border-ink text-ink' : 'border-signal text-signal'
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
 * Content stays visible if the browser can't observe scrolling or the visitor prefers reduced motion.
 */
export function Reveal({ children, className = '' }: RevealProps) {
  const element = useRef<HTMLDivElement>(null)
  const [pending, setPending] = useState(
    () => 'IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches,
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
