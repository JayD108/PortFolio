// Resume content. `npm run resume` turns this into public/Mrittunjay_Dubey_Resume.pdf,
// taking your name, contacts, education and live numbers from site.ts and stats.ts.
// The build stops if the resume no longer fits on one page.
// This file has no imports, so the resume script can read it directly.

export type ResumeProject = {
  title: string
  subtitle: string
  href?: string
  stack: string
  bullets: string[]
}

export const resume = {
  summary:
    'B.Tech CSE student (Fintech Honors, 9.85 CGPA) who builds AI systems from raw data to working interfaces, and reports their limits. Focused on secure systems, AI for healthcare and secure AI in fintech.',
  projects: [
    {
      title: 'APALA v2',
      subtitle: 'seizure forecasting benchmark',
      stack: 'Python, PyTorch',
      bullets: [
        'Built a leakage-controlled benchmark using nested leave-one-subject-out validation across 23 subjects and 624 fold trainings.',
        'Found no tested model beat a matched random alarm on CHB-MIT (13.2% vs 9.3% sensitivity, p = 0.185). Preprint, not peer reviewed.',
        'Showed how evaluation shortcuts turn 0 of 39 predicted seizures into 39 of 39 on an external dataset.',
      ],
    },
    {
      title: 'MONA',
      subtitle: 'language model built from scratch',
      href: 'https://github.com/JayD108/Mona',
      stack: 'Python, PyTorch',
      bullets: [
        'Trained a 110M-parameter transformer on 2.5B tokens of English, Hindi, Hinglish and Awadhi using one laptop GPU.',
        "Built an installable terminal app that teaches how LLMs work using the model's real weights.",
      ],
    },
    {
      title: 'VARUNA',
      subtitle: 'extreme weather forecasting',
      href: 'https://huggingface.co/JayF14/varuna-HybridTransU-net',
      stack: 'PyTorch, NetCDF, HDF5',
      bullets: [
        'Built a 17.6M-parameter Hybrid TransUNet that forecasts cloudbursts, thunderstorms and flash floods 2–6 hours ahead.',
        'Fused 190 GB of reanalysis, satellite and terrain data, reaching over 80% recall per hazard on an 11-window holdout, with 8–81% precision.',
      ],
    },
    {
      title: 'CHB-MIT Preprocessed EEG',
      subtitle: 'public dataset',
      href: 'https://huggingface.co/datasets/JayF14/chb-mit-preprocessed-eeg',
      stack: 'Python, Numba',
      // {downloads} and {month} are filled in from stats.ts.
      bullets: ['Published 347,075 labelled EEG windows with 590 features each, downloaded {downloads} times as of {month}.'],
    },
    {
      title: 'GateKeeper',
      subtitle: 'two-phone alert app for my parents (in progress)',
      href: 'https://github.com/JayD108/GateKeeper',
      stack: 'Kotlin, Android, Firebase',
      bullets: ['Building geofence-triggered alerts with a looping full-screen alarm and QR pairing; push delivery and SMS confirmation in progress.'],
    },
  ] satisfies ResumeProject[],
  achievements: [
    'Amazon ML Challenge 2026, team TheMorphs: top 500 teams at the 48-hour mark (business entity resolution).',
  ],
  certifications: [
    {
      title: 'FP&A + AI: Budgeting, Forecasting, Business Partnering',
      href: 'https://ude.my/UC-900ba64a-b44c-4170-be4c-82c7853eeb67',
      issuer: 'Udemy, Oct 2026 (22.5 hours)',
    },
    {
      title: 'Machine Learning Specialization',
      href: 'https://coursera.org/verify/specialization/GFN449VV297R',
      issuer: 'Stanford Online and DeepLearning.AI, Jan 2026',
    },
  ],
  skills: [
    { label: 'AI and ML', value: 'Python, PyTorch, transformers, U-Nets, XGBoost, LightGBM' },
    { label: 'Software', value: 'FastAPI, Next.js, WebSockets, Firebase, Android (Kotlin), pytest' },
    { label: 'Currently learning', value: 'Java backend, DSA in C++, OOP, Computer Networks, Operating Systems, DBMS' },
  ],
}
