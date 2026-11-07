import { useSyncExternalStore } from 'react'

// Live weather over Dehradun, Uttarakhand: the region VARUNA forecasts.
// Open-Meteo is free, needs no key and allows browser requests.
const URL =
  'https://api.open-meteo.com/v1/forecast?latitude=30.32&longitude=78.03&current=precipitation,weather_code&timezone=Asia%2FKolkata'
const CACHE_KEY = 'live-weather'
const CACHE_MINUTES = 30

export type Weather = { mmPerHour: number; code: number }

let weather: Weather | null = null
let started = false
const listeners = new Set<() => void>()

function set(next: Weather) {
  weather = next
  listeners.forEach((listener) => listener())
}

function load() {
  if (started) return
  started = true
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) ?? 'null')
    if (cached && Date.now() - cached.at < CACHE_MINUTES * 60_000) {
      set(cached.weather)
      return
    }
  } catch {
    // No cache available: fetch below.
  }
  fetch(URL)
    .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
    .then((data) => {
      // Open-Meteo reports precipitation over its 15-minute interval.
      const intervalHours = (data.current?.interval ?? 900) / 3600
      const next = { mmPerHour: Number(data.current?.precipitation ?? 0) / intervalHours, code: Number(data.current?.weather_code ?? 0) }
      set(next)
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), weather: next }))
      } catch {
        // Storage blocked: fetch again next visit.
      }
    })
    .catch(() => {
      // Offline or blocked: the scene keeps its default rain.
    })
}

/** Current weather, or null while loading or if the request failed. */
export function useLiveWeather(): Weather | null {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener)
      load()
      return () => listeners.delete(listener)
    },
    () => weather,
    () => null,
  )
}

/** How the scene's rain should look. Null weather keeps the default drizzle. */
export function rainStyle(w: Weather | null): { opacity: number; seconds: number } {
  if (!w) return { opacity: 1, seconds: 1.4 }
  if (w.mmPerHour <= 0) return { opacity: 0, seconds: 1.4 }
  if (w.mmPerHour < 1) return { opacity: 0.55, seconds: 1.7 }
  if (w.mmPerHour < 4) return { opacity: 1, seconds: 1.2 }
  return { opacity: 1, seconds: 0.7 }
}

/** A short, plain description from the WMO weather code. */
export function describe(w: Weather): string {
  const c = w.code
  if (c >= 95) return 'Thunderstorms'
  if (w.mmPerHour > 0 || (c >= 51 && c <= 67) || (c >= 80 && c <= 82)) return `Rain, ${w.mmPerHour.toFixed(1)} mm an hour`
  if (c >= 71 && c <= 77) return 'Snow'
  if (c === 45 || c === 48) return 'Fog'
  if (c >= 1 && c <= 3) return 'Dry, with some cloud'
  return 'Clear skies'
}
