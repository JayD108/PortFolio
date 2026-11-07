import { useSyncExternalStore } from 'react'

/*
  Light mode for effects ("lite"). Phones, data savers, low-power devices and reduced-motion
  readers get a still page: no rain loop, no parallax, no ink splats.
  The class sits on <html>, so CSS and components read the same switch.
*/

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)')
const smallTouch = matchMedia('(pointer: coarse) and (max-width: 767px)')

type NavigatorHints = Navigator & {
  connection?: { saveData?: boolean }
  deviceMemory?: number
  getBattery?: () => Promise<{ charging: boolean; level: number; addEventListener: (type: string, cb: () => void) => void }>
}

let lowBattery = false
const liteListeners = new Set<() => void>()

function computeLite() {
  const nav = navigator as NavigatorHints
  return (
    reducedMotion.matches ||
    smallTouch.matches ||
    lowBattery ||
    nav.connection?.saveData === true ||
    (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) ||
    (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 2)
  )
}

let lite = computeLite()

function applyLite() {
  lite = computeLite()
  document.documentElement.classList.toggle('lite', lite)
  liteListeners.forEach((listener) => listener())
}

/** Call once before the first render. Re-checks when the reader changes a setting mid-visit. */
export function initEffects() {
  applyLite()
  reducedMotion.addEventListener('change', applyLite)
  smallTouch.addEventListener('change', applyLite)
  const nav = navigator as NavigatorHints
  nav
    .getBattery?.()
    .then((battery) => {
      const check = () => {
        lowBattery = !battery.charging && battery.level <= 0.2
        applyLite()
      }
      check()
      battery.addEventListener('levelchange', check)
      battery.addEventListener('chargingchange', check)
    })
    .catch(() => {})
}

export const isLite = () => lite

export function useLite() {
  return useSyncExternalStore(
    (listener) => {
      liteListeners.add(listener)
      return () => liteListeners.delete(listener)
    },
    isLite,
    isLite,
  )
}

/** True on screens that can hover with a fine pointer. Touch screens get values shown directly instead. */
const canHoverQuery = matchMedia('(hover: hover) and (pointer: fine)')
export function useCanHover() {
  return useSyncExternalStore(
    (listener) => {
      canHoverQuery.addEventListener('change', listener)
      return () => canHoverQuery.removeEventListener('change', listener)
    },
    () => canHoverQuery.matches,
    () => true,
  )
}
