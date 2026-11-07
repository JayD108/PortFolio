// All site copy lives in src/content.

export const person = {
  name: 'Mrittunjay Dubey',
  role: 'B.Tech CSE student (Fintech Honors)',
  tagline: 'Securing the systems the city runs on',
  topSkills: ['Java backend', 'C++ DSA', 'OOP, CN, OS, DBMS', 'AI / ML'],
  // Shown on the cover and the resume. Update it whenever what you're looking for changes.
  openTo: 'ML, AI and backend internships',
  availability: 'Remote or part-time, starting now',
}

export const links = {
  // The PDF lives in public/. Replace that file to update your resume.
  resume: 'Mrittunjay_Dubey_Resume.pdf',
  // Public contact address, shown in Contact and the sticky phone bar. Change it here only.
  email: 'mrittunjaydubey3@gmail.com',
}

// The essentials on the cover and the About card. Leave a value as '' to hide it until it's ready.
export const academics = {
  degree: 'B.Tech CSE',
  honors: 'Fintech Honors',
  college: 'SRM IST',
  collegeFull: 'SRM Institute of Science and Technology',
  classOf: '2028',
  // TODO: add your SGPA (for example the latest semester's). It stays hidden while empty.
  sgpa: '',
  cgpa: '9.85',
}

// The one-line "Currently" note. Keep it short: what you're building or learning right now.
export const currently = 'Building Mini-UPI, a UPI-style payments backend in Java and Spring Boot, and practising DSA in C++.'

export type SocialId = 'github' | 'linkedin' | 'huggingface' | 'reddit' | 'steam'

// Shown as logos in the Send the Signal chapter. `label` is read out by screen readers.
export const socials: { id: SocialId; label: string; handle: string; href: string }[] = [
  { id: 'github', label: 'GitHub', handle: 'JayD108', href: 'https://github.com/JayD108' },
  { id: 'linkedin', label: 'LinkedIn', handle: 'mrittunjay-dubey', href: 'https://www.linkedin.com/in/mrittunjay-dubey-598b0931a' },
  { id: 'huggingface', label: 'Hugging Face', handle: 'JayF14', href: 'https://huggingface.co/JayF14' },
  { id: 'reddit', label: 'Reddit', handle: 'over-under_fitted', href: 'https://www.reddit.com/user/over-under_fitted' },
  { id: 'steam', label: 'Steam', handle: 'Jay_18', href: 'https://steamcommunity.com/id/kamalkartehoyaar/' },
]

export const issue = {
  number: '#1',
  date: 'Nov 2026',
  city: 'Null City',
  openLabel: 'Open the comic',
}


// The menu: at most five items, so it fits a phone's bottom bar. `id` is the section it jumps to.
export const chapters = [
  { id: 'intro', label: 'About' },
  { id: 'training', label: 'Skills' },
  { id: 'cases', label: 'Projects' },
  { id: 'side-quests', label: 'Awards' },
  { id: 'signal', label: 'Contact' },
] as const

export type ChapterId = (typeof chapters)[number]['id']

export type RecordRow = { label: string; value: string | null; todo?: string }

export const serviceRecord: RecordRow[] = [
  { label: 'Degree', value: 'B.Tech CSE (Fintech Honors)' },
  { label: 'College', value: 'SRM Institute of Science and Technology' },
  { label: 'Graduation', value: '2028' },
  { label: 'CGPA', value: '9.85' },
  { label: 'Class 12 (CBSE)', value: '92.2%' },
  { label: 'Class 10 (CBSE)', value: '97.2%' },
]
