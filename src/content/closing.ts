// Copy for the last chapters. The comic and Recruiter Mode both read from this file.

export type ArtName = 'secure' | 'health' | 'fintech' | 'gaming' | 'brain' | 'android'

export type ClosingPanel = {
  id: ArtName
  title: string
  text: string
  stamp?: string
  todo?: string
  sfx: string
  classified?: boolean
}

export const mission = {
  chapter: 'Chapter 4',
  title: 'The Mission',
  narration: 'Every night shift needs a reason. Mine comes down to three pillars.',
  panels: [
    {
      id: 'secure',
      title: 'Secure Systems',
      text: 'Build systems that keep working when someone tries to break them.',
      sfx: 'LOCKED!',
    },
    {
      id: 'health',
      title: 'AI for Healthcare',
      // TODO: add details here when you're ready, then remove `classified` and `stamp`.
      text: 'More coming soon.',
      stamp: 'Classified',
      classified: true,
      sfx: 'BEEP!',
    },
    {
      id: 'fintech',
      title: 'Secure AI Fintech',
      text: 'Bring AI into financial systems without weakening their security.',
      sfx: 'SECURED!',
    },
  ] as ClosingPanel[],
}

export const sideQuests = {
  chapter: 'Chapter 5',
  title: 'Side Quests',
  narration: 'Even a night-shift coder clocks out sometimes.',
  panels: [
    {
      id: 'gaming',
      title: 'Gaming',
      text: 'On PC and console.',
      sfx: 'GG!',
    },
    {
      id: 'brain',
      title: 'Brain and psychology',
      text: "Reading about how people think, including Sapiens and Robert Sapolsky's Behave.",
      sfx: 'HMM…',
    },
    {
      id: 'android',
      title: 'Android apps',
      text: 'I built GateKeeper, a messaging and notification app, for my parents. Apps for my friends are coming next.',
      stamp: 'Next issue',
      sfx: 'BUILD!',
    },
  ] as ClosingPanel[],
}

export const signal = {
  chapter: 'Chapter 6',
  title: 'Send the Signal',
  narration: "Got a case, a role or a question? Light up the sky and I'll answer.",
}

export const footer = {
  continued: 'To be continued in Issue #2…',
  credit: 'Mrittunjay Dubey · 2026',
}
