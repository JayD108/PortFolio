// Training Arc copy.
// To change a skill's label, set status to 'battle-tested' or 'in-training'.

export type SkillStatus = 'battle-tested' | 'in-training'
export type PouchIcon = 'backend' | 'dsa' | 'core' | 'ai' | 'fintech'

export type Pouch = {
  id: PouchIcon
  title: string
  status: SkillStatus
  items: string[]
  note: string
  todo?: string
  sfx: string
}

export const statusLabels: Record<SkillStatus, string> = {
  'battle-tested': 'Battle-tested',
  'in-training': 'In training',
}

export const training = {
  chapter: 'Chapter 2',
  title: 'The Training Arc',
  narration: 'Every case needs the right gear. Some of mine has been proven in the field. The rest is still in training, and it says so.',
  legend: [
    { status: 'battle-tested', meaning: "Used in projects I've built" },
    { status: 'in-training', meaning: "What I'm learning now" },
  ] satisfies { status: SkillStatus; meaning: string }[],
  pouches: [
    {
      id: 'backend',
      title: 'Backend',
      status: 'in-training',
      items: ['Java', 'Backend development'],
      note: 'Practice so far includes an inventory system and a multi-threaded CSV processor.',
      sfx: 'COMPILE!',
    },
    {
      id: 'dsa',
      title: 'Problem Solving',
      status: 'in-training',
      items: ['C++', 'Data structures', 'Algorithms'],
      note: 'Practising data structures and algorithms in C++.',
      sfx: 'SEGFAULT!',
    },
    {
      id: 'core',
      title: 'Core CS',
      status: 'in-training',
      items: ['OOP', 'Computer Networks', 'Operating Systems', 'DBMS'],
      note: 'The fundamentals behind secure systems.',
      sfx: 'PING!',
    },
    {
      id: 'ai',
      title: 'AI / ML',
      status: 'battle-tested',
      items: ['Python', 'PyTorch', 'Transformers', 'U-Nets', 'XGBoost', 'LightGBM'],
      note: 'Used in MONA, VARUNA, MANAS and APALA.',
      sfx: 'TRAIN!',
    },
    {
      id: 'fintech',
      title: 'Fintech',
      status: 'in-training',
      items: ['Fintech Honors', 'AI in Fintech'],
      note: 'I completed AI in Fintech this semester, one of six subjects in my Honors course.',
      sfx: 'KA-CHING!',
    },
  ] as Pouch[],
}
