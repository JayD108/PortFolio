// Certifications.
//
// To add one: copy the template below into the list and fill in the fields.
// Only `name` and `issuer` are required. `date` and `credentialUrl` are shown once you fill them in,
// so an unfinished entry never shows a broken link or a "TODO" to visitors.
//
//   { name: 'Certificate name', issuer: 'Who issued it', date: 'Mon YYYY', credentialUrl: 'https://…', image: 'certificates/file.jpg' },
//
// `image`: a picture of the certificate (with your name on it), saved in public/certificates/.
// When it's set, clicking the card opens the certificate full size. JPEG or WebP, about 1600 px wide.

export type Certification = {
  name: string
  issuer: string
  /** For example 'Aug 2026'. Leave '' to hide. */
  date: string
  /** The verify or credential page. Leave '' to hide the "View credential" link. */
  credentialUrl: string
  /** Path under public/, e.g. 'certificates/ml-specialization.jpg'. Leave '' and the card doesn't open. */
  image: string
  /** The image's width and height in pixels, so the page doesn't jump while it loads. */
  imageSize?: [number, number]
}

export const certificationsCopy = {
  chapter: 'Chapter 4',
  title: 'Certifications',
  linkLabel: 'View credential',
  openLabel: 'View certificate',
  closeLabel: 'Close',
}

// Newest first.
export const certifications: Certification[] = [
  {
    name: 'FP&A + AI: Budgeting, Forecasting, Business Partnering',
    issuer: 'Udemy · Md Sanaullah (ISB, CFO, US CMA) · 22.5 hours',
    date: 'Oct 2026',
    credentialUrl: 'https://ude.my/UC-900ba64a-b44c-4170-be4c-82c7853eeb67',
    image: 'certificates/fpa-ai-udemy.jpg',
    imageSize: [1600, 1190],
  },
  {
    name: 'Machine Learning Specialization',
    issuer: 'Stanford Online and DeepLearning.AI (Coursera)',
    date: 'Jan 2026',
    credentialUrl: 'https://coursera.org/verify/specialization/GFN449VV297R',
    image: 'certificates/machine-learning-specialization.jpg',
    imageSize: [1600, 1236],
  },
]
