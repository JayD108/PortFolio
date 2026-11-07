import { useCallback, useState } from 'react'

const KEY = 'dark-coder:recruiter-mode'

function readSaved(): boolean {
  try {
    return localStorage.getItem(KEY) === 'on'
  } catch {
    return false
  }
}

/** Remembers the visitor's choice. Falls back to comic mode if storage is blocked. */
export function useRecruiterMode() {
  const [enabled, setEnabled] = useState(readSaved)

  const set = useCallback((next: boolean) => {
    setEnabled(next)
    try {
      localStorage.setItem(KEY, next ? 'on' : 'off')
    } catch {
      // The toggle still works for this visit without storage.
    }
  }, [])

  return [enabled, set] as const
}
