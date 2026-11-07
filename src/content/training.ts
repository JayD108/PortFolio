// Skills: one layout, three tracks. On a phone only one track shows at a time, as tabs.
// `used` = proven in projects I've built. `learning` = what I'm learning now. Either list may be empty.

export type TrackId = 'fintech' | 'backend' | 'ai'

export type Track = {
  id: TrackId
  title: string
  /** One short line under the title. */
  line: string
  used: string[]
  learning: string[]
  sfx: string
}

export const training = {
  chapter: 'Chapter 2',
  title: 'Skills',
  narration: 'Three tracks. What I have used in real projects, and what is still in training.',
  usedLabel: 'Used in projects',
  learningLabel: 'Learning now',
  tracks: [
    {
      id: 'fintech',
      title: 'Fintech',
      line: 'Honors specialisation. I completed AI in Fintech this semester.',
      used: [],
      learning: ['Fintech Honors', 'AI in Fintech', 'FP&A + AI', 'UPI-style payments (Mini-UPI)'],
      sfx: 'KA-CHING!',
    },
    {
      id: 'backend',
      title: 'Backend',
      line: 'APIs and real-time services, with the CS fundamentals underneath.',
      used: ['FastAPI', 'WebSockets', 'Firebase'],
      learning: ['Java', 'Spring Boot', 'REST APIs', 'JWT', 'DSA in C++', 'OOP', 'Computer Networks', 'Operating Systems', 'DBMS'],
      sfx: 'COMPILE!',
    },
    {
      id: 'ai',
      title: 'AI & ML',
      line: 'Used in MONA, VARUNA, MANAS and APALA.',
      used: ['Python', 'PyTorch', 'Transformers', 'U-Nets', 'XGBoost', 'LightGBM'],
      learning: [],
      sfx: 'TRAIN!',
    },
  ] satisfies Track[],
}
