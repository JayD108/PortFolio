import { siGithub, siHuggingface, siReddit, siSteam } from 'simple-icons'
import type { SocialId } from '../content/site'

// Brand marks from Simple Icons (CC0). LinkedIn isn't in that set, so its mark is drawn here.
const paths: Record<Exclude<SocialId, 'linkedin'>, string> = {
  github: siGithub.path,
  huggingface: siHuggingface.path,
  reddit: siReddit.path,
  steam: siSteam.path,
}

export function SocialIcon({ id, className = '' }: { id: SocialId; className?: string }) {
  if (id === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
        <path
          fillRule="evenodd"
          d="M3 1h18a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2Zm2.5 7.5V19h3.2V8.5H5.5ZM7.1 3.6a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8Zm3.5 4.9V19h3.2v-5.4c0-1.6.6-2.6 1.9-2.6s1.7 1 1.7 2.5V19h3.2v-6.3c0-3-1.4-4.5-3.8-4.5-1.5 0-2.5.7-3 1.6V8.5h-3.2Z"
        />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d={paths[id]} />
    </svg>
  )
}

export function MailIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
      <path d="M2.5 5.5h19v13h-19Z" />
      <path d="m3 6 9 7 9-7" />
    </svg>
  )
}
