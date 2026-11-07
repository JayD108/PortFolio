import { useSyncExternalStore } from 'react'
import { cases } from '../content/cases'

// Tracks which evidence panels a visitor has opened, for the detective badge.
// Opened panels are remembered for the visit; the badge itself is kept between visits.
const OPENED_KEY = 'evidence-opened'
const BADGE_KEY = 'detective-badge'

export const evidenceIds = cases.filter((item) => item.evidence?.length).map((item) => item.id)

type State = { opened: string[]; badge: boolean; justEarned: boolean }

function read(): State {
  let opened: string[] = []
  let badge = false
  try {
    opened = JSON.parse(sessionStorage.getItem(OPENED_KEY) ?? '[]')
    badge = localStorage.getItem(BADGE_KEY) === '1'
  } catch {
    // Storage blocked: start fresh for this visit.
  }
  return { opened: opened.filter((id) => evidenceIds.includes(id)), badge, justEarned: false }
}

let state: State | null = null
const listeners = new Set<() => void>()
const get = () => (state ??= read())
const emit = () => listeners.forEach((listener) => listener())

export function markEvidenceOpened(id: string) {
  const current = get()
  if (!evidenceIds.includes(id) || current.opened.includes(id)) return
  const opened = [...current.opened, id]
  const earnedNow = !current.badge && opened.length === evidenceIds.length
  state = { opened, badge: current.badge || earnedNow, justEarned: earnedNow }
  try {
    sessionStorage.setItem(OPENED_KEY, JSON.stringify(opened))
    if (earnedNow) localStorage.setItem(BADGE_KEY, '1')
  } catch {
    // Storage blocked: progress lasts for this page load.
  }
  emit()
}

export function dismissBadgeNotice() {
  state = { ...get(), justEarned: false }
  emit()
}

export function useEvidence(): State {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    get,
    get,
  )
}
