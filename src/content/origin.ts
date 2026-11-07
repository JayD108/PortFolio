// Origin Story copy. The comic and Recruiter Mode both read from this file.
// A panel's `todo` shows as a marked placeholder on the page until you replace it.
// To fill one in: add your sentence to `text` and delete the `todo` line.

export type OriginArt = 'kid' | 'gamer' | 'engineer'

export type OriginPanel = {
  id: OriginArt
  caption: string
  text: string
  todo?: string
  sfx: string
}

export const origin = {
  chapter: 'Chapter 1',
  title: 'Origin Story',
  narration: 'Null City never sleeps. Neither do its bugs. This is how one coder ended up on the night shift.',
  panels: [
    {
      id: 'kid',
      caption: 'The kid',
      text: 'It started with a kid obsessed with technology.',
      // TODO: replace with a real detail, then delete this line.
      todo: 'your first computer, gadget or thing you took apart',
      sfx: 'BOOT!',
    },
    {
      id: 'gamer',
      caption: 'The gamer',
      text: 'Then came the games, on PC and console.',
      // TODO: replace with a real detail, then delete this line.
      todo: 'the game that hooked you, and what it taught you',
      sfx: 'KRAK!',
    },
    {
      id: 'engineer',
      caption: 'The engineer',
      text: "Now I'm a B.Tech CSE student with Fintech Honors, learning Java backend, C++ DSA and CS fundamentals, and building real AI projects. I'm always excited to learn new skills.",
      sfx: 'DEPLOY!',
    },
  ] satisfies OriginPanel[],
  mind: {
    caption: "The detective's mind",
    quote: "I'm fascinated by the human brain and psychology, from Sapiens to Robert Sapolsky's Behave.",
  },
}
