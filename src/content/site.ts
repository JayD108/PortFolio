// All site copy lives in src/content.

export const person = {
  name: 'Mrittunjay Dubey',
  role: 'B.Tech CSE student (Fintech Honors)',
  tagline: 'Securing the systems the city runs on',
  topSkills: ['Java backend', 'C++ DSA', 'OOP, CN, OS, DBMS', 'AI / ML'],
}

export const links = {
  // The PDF lives in public/. Replace that file to update your resume.
  resume: 'Mrittunjay_Dubey_Resume.pdf',
  email: 'mrittunjaydubey3@gmail.com',
}

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

// Teaser panels on the cover. `caseId` must match an id in cases.ts; clicking jumps to that case file.
export const coverTeasers = [
  { caseId: 'mona', title: 'MONA', number: '110M', label: 'parameter language model, built from scratch' },
  { caseId: 'varuna', title: 'VARUNA', number: '190 GB', label: 'of weather data fused to forecast cloudbursts' },
  { caseId: 'apala-v2', title: 'APALA v2', number: '624', label: 'fold trainings in a leakage-proof EEG benchmark' },
]

export const chapters = [
  { id: 'intro', label: 'Intro' },
  { id: 'training', label: 'Training Arc' },
  { id: 'cases', label: 'Case Files' },
  { id: 'mission', label: 'Mission' },
  { id: 'side-quests', label: 'Side Quests' },
  { id: 'signal', label: 'Signal' },
]

export type RecordRow = { label: string; value: string | null; todo?: string }

export const serviceRecord: RecordRow[] = [
  { label: 'Degree', value: 'B.Tech CSE (Fintech Honors)' },
  { label: 'College', value: 'SRM Institute of Science and Technology' },
  { label: 'Graduation', value: '2028' },
  { label: 'CGPA', value: '9.85' },
  { label: 'Class 12 (CBSE)', value: '92.2%' },
  { label: 'Class 10 (CBSE)', value: '97.2%' },
]
