// All site copy lives in src/content. Search for "TODO:" to find what still needs filling in.
// A link set to null renders as a clearly marked placeholder instead of a dead link.

export const person = {
  name: 'Mrittunjay Dubey',
  role: 'B.Tech CSE student (Fintech Honors)',
  tagline: 'Securing the systems the city runs on',
  topSkills: ['Java backend', 'C++ DSA', 'OOP, CN, OS, DBMS', 'AI / ML'],
}

export const links = {
  github: 'https://github.com/JayD108',
  huggingFace: 'https://huggingface.co/JayF14',
  // TODO: add your LinkedIn URL.
  linkedIn: null as string | null,
  // TODO: add your resume PDF to public/ and set this to its file name, e.g. 'resume.pdf'.
  resume: null as string | null,
  // TODO: add the email address you want public.
  email: null as string | null,
}

export const issue = {
  title: ['The Dark', 'Coder'],
  number: '#1',
  date: 'Nov 2026',
  city: 'Null City',
  priceAmount: '₹0',
  priceNote: 'Free for recruiters',
  openLabel: 'Open the comic',
}

export const chapters = [
  { id: 'intro', label: 'Intro' },
  { id: 'training', label: 'Training Arc' },
  { id: 'cases', label: 'Case Files' },
  { id: 'mission', label: 'Mission' },
  { id: 'side-quests', label: 'Side Quests' },
  { id: 'signal', label: 'Signal' },
]

export type RecordRow = { label: string; value: string | null; todo?: string }

// value: null shows a TODO marker on the page until the number is verified.
export const serviceRecord: RecordRow[] = [
  { label: 'Degree', value: 'B.Tech CSE (Fintech Honors)' },
  { label: 'College', value: 'SRM Institute of Science and Technology' },
  // TODO: verify, then set value. The old site says 2028.
  { label: 'Graduation', value: null, todo: 'verify year' },
  // TODO: verify, then set value. The old site says 9.85.
  { label: 'CGPA', value: null, todo: 'verify CGPA' },
  // TODO: verify, then set value. The old site says 92.2%, CBSE.
  { label: 'Class 12 (CBSE)', value: null, todo: 'verify mark' },
  // TODO: verify, then set value. The old site says 97.2%, CBSE.
  { label: 'Class 10 (CBSE)', value: null, todo: 'verify mark' },
]
