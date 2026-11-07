// Subjects from my B.Tech record at SRM Institute of Science and Technology.
// Shown in a closed file in the Training Arc that only opens when a visitor clicks it.
// To add a semester, copy one block below and change its fields.

export type Semester = {
  number: number
  session: string
  sgpa: string
  subjects: string[]
}

export const coursework = {
  title: 'Coursework file',
  summary: '31 subjects across 4 semesters',
  openLabel: 'Open file',
  closeLabel: 'Close file',
  semesters: [
    {
      number: 1,
      session: 'Dec 2024',
      sgpa: '9.68',
      subjects: [
        'Programming for Problem Solving',
        'Calculus and Linear Algebra',
        'Semiconductor Physics and Computational Methods',
        'Introduction to Computational Biology',
        'Communicative English',
        'Philosophy of Engineering',
        'Basic Civil and Mechanical Workshop',
        'Professional Skills and Practices',
        'NSO',
      ],
    },
    {
      number: 2,
      session: 'May 2025',
      sgpa: '9.91',
      subjects: [
        'Object Oriented Design and Programming',
        'Advanced Calculus and Complex Analysis',
        'Electrical and Electronics Engineering',
        'Chemistry',
        'Engineering Graphics and Design',
        'German',
        'Environmental Science',
        'Constitution of India',
      ],
    },
    {
      number: 3,
      session: 'Nov 2025',
      sgpa: '9.83',
      subjects: [
        'Data Structures and Algorithms',
        'Operating Systems',
        'Computer Organization and Architecture',
        'Advanced Programming Practice',
        'Transforms and Boundary Value Problems',
        'Design Thinking and Methodology',
        'Professional Ethics',
      ],
    },
    {
      number: 4,
      session: 'May 2026',
      sgpa: '10.00',
      subjects: [
        'Design and Analysis of Algorithms',
        'Database Management Systems',
        'Artificial Intelligence',
        'Digital Image Processing',
        'Probability and Queueing Theory',
        'Social Engineering',
        'Universal Human Values II: Understanding Harmony and Ethical Human Conduct',
      ],
    },
  ] satisfies Semester[],
}
