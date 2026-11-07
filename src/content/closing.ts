// Copy for the last chapters.
// A panel marked `classified` or with a `todo` is hidden from visitors until you finish it.

export type ArtName = 'secure' | 'health' | 'fintech' | 'gaming' | 'brain' | 'android'

export type ClosingPanel = {
  id: ArtName
  title: string
  text: string
  stamp?: string
  todo?: string
  sfx: string
  classified?: boolean
  /** Optional longer story. When set, the panel opens it in a full view. */
  details?: {
    lead: string
    sections: { heading: string; text: string }[]
    links: { label: string; href: string }[]
  }
}

export type Achievement = {
  id: string
  event: string
  organiser: string
  date: string
  /** The result stamp, e.g. 'Top 500 teams' or 'Participant'. */
  result: string
  /** Highlighted with the yellow frame. Use it for the strongest result. */
  highlight?: boolean
  team?: string
  /** One line on what the event asked for or what I did. Leave '' to hide. */
  line: string
  /** A certificate picture in public/, opened full size. */
  certificate?: { image: string; size: [number, number] }
  /** When there is no certificate: the official message that proves the result, quoted. */
  quote?: { text: string; source: string }
  links: { label: string; href: string }[]
}

// Hackathons and competitions, newest first. They are not certifications, so they live here.
export const achievements: Achievement[] = [
  {
    id: 'amazon-ml-2026',
    event: 'Amazon ML Challenge 2026',
    organiser: 'Amazon, on Unstop',
    date: 'Sep 2026',
    result: 'Top 500 teams',
    highlight: true,
    team: 'TheMorphs',
    line: 'Business entity resolution: matching noisy business records from three sources with no shared IDs, across the US, India and an unseen country, scored on a precision-heavy F0.5.',
    quote: {
      text: "You've made it into the Top 500 teams at the 48-hour mark of the challenge, and as a result, you've unlocked $100 in additional credits!",
      source: 'Unstop, on behalf of Team Amazon, 27 Sep 2026',
    },
    links: [{ label: 'My Unstop profile', href: 'https://unstop.com/u/mrittdub2901' }],
  },
  {
    id: 'adobe-hackathon-2026',
    event: 'Adobe University Hackathon',
    organiser: 'Adobe, on Unstop',
    date: 'Aug 2026',
    result: 'Participant',
    line: '',
    certificate: { image: 'certificates/adobe-hackathon.jpg', size: [1600, 1131] },
    links: [],
  },
]

export const sideQuests = {
  chapter: 'Chapter 5',
  title: 'Achievements & Side Quests',
  narration: 'Competitions I took on, and what I do when I clock out.',
  achievementsTitle: 'Achievements',
  sideQuestsTitle: 'Side Quests',
  panels: [
    {
      id: 'brain',
      title: 'Brain and psychology',
      text: "Reading about how people think, including Sapiens and Robert Sapolsky's Behave. It's also why I work on APALA.",
      sfx: 'HMM…',
      details: {
        lead: 'How people think is the interest. The brain itself is the work.',
        sections: [
          {
            heading: 'Where it started',
            text: "I read about why people behave the way they do: Yuval Noah Harari's Sapiens for the big picture, and Robert Sapolsky's Behave for the biology underneath, from neurons and hormones to evolution.",
          },
          {
            heading: 'Where it meets my work: APALA',
            text: "A seizure is the brain's electrical activity going wrong. APALA is my attempt to see it coming in EEG recordings. Version 1 looked excellent on patients it had trained on and fell to chance on new ones. Version 2 was a strict benchmark built to test that honestly, and on CHB-MIT no model I tested beat a matched random alarm.",
          },
          {
            heading: 'What I want to find out',
            text: "My main goal is a model that can forecast seizures in a patient it has never seen, by learning patterns that human brains share, even if it isn't very accurate at first. That means understanding the brain, not just the data: its rhythms, and how a seizure builds up. So I'm studying the neuroscience alongside the machine learning.",
          },
        ],
        links: [
          { label: 'APALA v2 case', href: '#case-apala-v2' },
          { label: 'APALA v1 case', href: '#case-apala-v1' },
          { label: 'My EEG dataset', href: 'https://huggingface.co/datasets/JayF14/chb-mit-preprocessed-eeg' },
        ],
      },
    },
    {
      id: 'android',
      title: 'Android apps',
      text: "I'm building GateKeeper, a two-phone gate alert app, for my parents. Apps for my friends are coming next.",
      stamp: 'Next issue',
      sfx: 'BUILD!',
    },
  ] as ClosingPanel[],
}

// My Steam record, from the public profile (steamcommunity.com/id/kamalkartehoyaar).
// These numbers don't update by themselves: refresh them and `asOf` now and then.
export const steam = {
  title: 'Steam record',
  asOf: 'Nov 2026',
  linkLabel: 'View my Steam profile',
  stats: [
    { label: 'Steam level', value: '10' },
    { label: 'Games', value: '37' },
    { label: 'Badges', value: '10' },
    { label: 'On Steam since', value: '2025' },
  ],
  favorite: { name: 'Black Myth: Wukong', detail: '143 hours · 69 of 81 achievements' },
  recent: [
    { name: 'The Last of Us Part II Remastered', hours: '43 h' },
    { name: 'World War Z', hours: '32 h' },
    { name: 'Shadow of the Tomb Raider', hours: '11.4 h' },
  ],
}

export const signal = {
  chapter: 'Chapter 6',
  title: 'Contact',
  narration: "Got a role, a project or a question? Send me a message and I'll answer.",
  emailLabel: 'Email',
  quickLabel: 'Quick ways to reach me',
  linkedinLabel: 'Message on LinkedIn',
  form: {
    title: 'Or write here',
    note: 'No mail app needed. It lands in my inbox.',
    // Messages are delivered by FormSubmit (formsubmit.co) to links.email. The very first message
    // sends an activation email to that inbox; click its link once and every later message arrives.
    endpoint: 'https://formsubmit.co/ajax/',
    subject: 'New message from your portfolio',
    send: 'Send message',
    sending: 'Sending…',
    sent: "Thanks! Your message is on its way. I'll reply by email.",
    failed: "That didn't go through. Please email me directly instead:",
  },
}

export const footer = {
  continued: 'To be continued in Issue #2…',
  credit: 'Mrittunjay Dubey · 2026',
}
