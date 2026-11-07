// Copy for the playful extras: the jet flyby, the end-of-issue thank-you and the developer console note.

export const jet = {
  // Shown once per visit, when the reader first reaches Projects (not on phones).
  captain: 'Captain Jay here, flying over Null City.',
  message: "I'm running low on coffee. Got a role, a project or a question? Get in touch and I'll come in to land.",
  cta: 'Get in touch',
  dismiss: 'Not now',
  // The jet flies off by itself after this many seconds.
  autoHideSeconds: 15,
}

export const endOfIssue = {
  // Shown once per visit, only to readers who scrolled through every chapter.
  title: 'The end… for now',
  message:
    "You read the whole issue. Thank you! If you have an opportunity, some feedback or spotted a bug, get in touch. I'd love to hear what you think.",
  cta: 'Get in touch',
  copy: 'Copy email',
  // Readers must spend at least this long on the page, so a quick skim doesn't count.
  minReadSeconds: 30,
}

export const consoleNote = [
  'Reading the source, detective?',
  "Good instinct. If you like how this was built, let's talk:",
]
