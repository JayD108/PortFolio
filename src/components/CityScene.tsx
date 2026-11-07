import { useEffect, useRef } from 'react'
import { rainStyle, useLiveWeather } from './liveWeather'

type Layer = { buildings: string; windows: string }

/** Builds a repeatable skyline from a fixed seed, so it stays the same on every load. */
function makeLayer(seed: number, minHeight: number, maxHeight: number, windowChance: number): Layer {
  let state = seed
  const random = () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 4294967296
  }

  const width = 1600
  const height = 260
  let buildings = ''
  let windows = ''
  let x = 0

  while (x < width) {
    const w = 34 + Math.round(random() * 66)
    const h = minHeight + Math.round(random() * (maxHeight - minHeight))
    const top = height - h
    const roof = random()

    if (roof < 0.16) {
      buildings += `M${x} ${height}V${top}H${x + w * 0.35}L${x + w * 0.5} ${top - 26}L${x + w * 0.65} ${top}H${x + w}V${height}Z`
    } else if (roof < 0.34) {
      buildings += `M${x} ${height}V${top}H${x + w * 0.25}V${top - 14}H${x + w * 0.75}V${top}H${x + w}V${height}Z`
    } else {
      buildings += `M${x} ${height}V${top}H${x + w}V${height}Z`
    }

    for (let wy = top + 10; wy < height - 8; wy += 13) {
      for (let wx = x + 7; wx < x + w - 8; wx += 11) {
        if (random() < windowChance) windows += `M${wx} ${wy}h4v6h-4Z`
      }
    }
    x += w
  }

  return { buildings, windows }
}

const farLayer = makeLayer(2077, 90, 200, 0.03)
const nearLayer = makeLayer(4242, 40, 130, 0.07)

/** Decorative night city: fog, halftone, rain and two skyline layers with light parallax. */
export function CityScene({ parallax = true }: { parallax?: boolean }) {
  const far = useRef<HTMLDivElement>(null)
  const near = useRef<HTMLDivElement>(null)
  const rain = rainStyle(useLiveWeather())

  useEffect(() => {
    if (!parallax || matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const update = () => {
      frame = 0
      const y = Math.min(window.scrollY, 900)
      if (far.current) far.current.style.transform = `translateY(${y * 0.05}px)`
      if (near.current) near.current.style.transform = `translateY(${y * 0.1}px)`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [parallax])

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_42%,#39424f_0%,#1a1f26_42%,#0b0d10_78%)]" />
      <div className="halftone absolute inset-0" />
      {/* Rain follows live rainfall over Dehradun, the region VARUNA forecasts. */}
      <div className="rain absolute inset-0 transition-opacity duration-1000" style={{ opacity: rain.opacity, animationDuration: `${rain.seconds}s` }} />

      <div ref={far} className="parallax absolute inset-x-0 bottom-0 h-44 md:h-64">
        <svg viewBox="0 0 1600 260" preserveAspectRatio="xMidYMax slice" className="h-full w-full">
          <path d={farLayer.buildings} fill="#232932" />
          <path d={farLayer.windows} fill="#8c8350" />
        </svg>
      </div>

      <div ref={near} className="parallax absolute inset-x-0 bottom-0 h-28 md:h-40">
        <svg viewBox="0 0 1600 260" preserveAspectRatio="xMidYMax slice" className="h-full w-full">
          <path d={nearLayer.buildings} fill="#050608" />
          <path d={nearLayer.windows} fill="#f5c518" />
        </svg>
      </div>
    </div>
  )
}
