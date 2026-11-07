import { stats } from './stats'

// Case Files data.
//
// To add a case: copy any entry in `cases`, change its fields, and save.
// It appears automatically under the category you set ('ai' or 'dev').
// `evidence` is optional. Leave it out and the card has no "View evidence" button.
// Pick evidence blocks from the Evidence type below: charts, tables, facts, lists, images, code.

export type SeriesColor = 's1' | 's2' | 's3'

export type Tip = { title: string; rows: [string, string][] }

export type Evidence =
  | {
      type: 'bars'
      title: string
      legend: { label: string; color: SeriesColor }[]
      max: number
      chanceAt?: number
      axis: { start: string; middle: string; end: string }
      rows: { label: string; value: number; display: string; color: SeriesColor; tip: Tip }[]
      note?: string
    }
  | {
      type: 'lines'
      title: string
      ariaLabel: string
      x: { labels: string[]; positions: number[]; ticks: number[]; tipTitles: string[] }
      y: { max: number; ticks: number[]; unit: string }
      digits: number
      series: { name: string; color: SeriesColor; values: number[]; tips?: string[] }[]
      note?: string
    }
  | { type: 'table'; title: string; headers: string[]; rows: string[][] }
  | { type: 'facts'; title?: string; facts: { label: string; value: string }[] }
  | { type: 'list'; title: string; items: { term: string; detail: string }[] }
  | { type: 'image'; src: string; alt: string; width: number; height: number; caption: string }
  | { type: 'code'; title: string; code: string }
  | { type: 'verse'; label: string; lines: string[] }
  | { type: 'text'; title: string; paragraphs: string[] }

export type CaseCategory = 'ai' | 'dev'

export type CaseFile = {
  id: string
  category: CaseCategory
  title: string
  domain: string
  problem: string
  /** Heading above `problem`. Defaults to "The problem"; set it when the text is a description instead. */
  problemLabel?: string
  result?: string
  limit?: string
  status?: string
  stack: string[]
  links: { label: string; href: string }[]
  evidence?: Evidence[]
}

export const caseFilesCopy = {
  chapter: 'Chapter 3',
  title: 'Case Files',
  narration: "Every case on record, with the evidence attached and the limits stated. Pick the files you came for.",
  categories: [
    { id: 'ai', label: 'AI & ML', description: 'Models, research and datasets' },
    { id: 'dev', label: 'Development', description: 'Web, Android and backend projects' },
  ] satisfies { id: CaseCategory; label: string; description: string }[],
}

const github = 'https://github.com/JayD108'
const hf = 'https://huggingface.co/JayF14'

// Dataset numbers come from stats.ts, which a weekly job keeps current.
const statsMonth = new Date(`${stats.updated}T00:00:00Z`).toLocaleString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })
const statsLine = `${stats.dataset.downloads.toLocaleString('en-US')} downloads and ${stats.dataset.likes} likes as of ${statsMonth}`

export const cases: CaseFile[] = [
  {
    id: 'apala-v2',
    category: 'ai',
    title: 'APALA v2',
    domain: 'Medical signals',
    problem:
      'Can a network trained on other patients warn of a seizure 5–35 minutes ahead in a patient it has never seen? Accuracy of 90–99% is often reported on CHB-MIT, so I built a benchmark strict enough to find out.',
    result:
      'On CHB-MIT, the answer is no: 13.2% sensitivity against 9.3% for a matched random alarm (p = 0.185), with 0 of 23 subjects above chance. Frozen and run once on the independent Siena hospital dataset, the model predicted 0 of 39 seizures.',
    limit:
      "Preprint v1.5, not peer reviewed. This is a retrospective research benchmark, not a medical device. It doesn't show that forecasting is impossible: long-term, per-patient forecasting has positive results.",
    status: 'Paper available on request',
    stack: ['Python', 'PyTorch', 'SE-ResNet-18', 'MODWT wavelets', '73 test functions', 'SHA-256 model freeze'],
    links: [],
    evidence: [
      {
        type: 'bars',
        title: 'How evaluation shortcuts turn 0 of 39 seizures into 39 of 39',
        legend: [
          { label: 'Honest evaluation', color: 's2' },
          { label: 'With shortcuts added', color: 's1' },
        ],
        max: 39,
        axis: { start: '0', middle: 'seizures predicted', end: '39' },
        rows: [
          { label: 'No shortcuts: the real result', value: 0, display: '0', color: 's2', tip: { title: 'The real result: frozen model, run once', rows: [['Mean sensitivity', '0.000'], ['False alarms/h', '0.000'], ['Matched chance', '0.000']] } },
          { label: 'One threshold tuned on Siena', value: 3, display: '3', color: 's1', tip: { title: 'One threshold tuned on Siena', rows: [['Mean sensitivity', '0.108'], ['False alarms/h', '0.114'], ['Matched chance', '0.076']] } },
          { label: 'Per-patient thresholds chosen on test seizures', value: 5.7, display: '5.7', color: 's1', tip: { title: "A threshold per patient, chosen on that patient's seizures", rows: [['Mean sensitivity', '0.122'], ['False alarms/h', '0.019'], ['Matched chance', '0.012']] } },
          { label: 'Those thresholds plus lenient scoring', value: 26.7, display: '26.7', color: 's1', tip: { title: 'Adds lenient scoring: no horizon, 60 min window', rows: [['Mean sensitivity', '0.666'], ['False alarms/h', '0.185'], ['Matched chance', '0.254']] } },
          { label: 'Classifier on a random half of the windows, same thresholds', value: 32, display: '32', color: 's1', tip: { title: 'Classifier trained on a random half of Siena windows', rows: [['Mean sensitivity', '0.815'], ['False alarms/h', '0.033'], ['Matched chance', '0.018']] } },
          { label: 'That classifier plus lenient scoring', value: 39, display: '39', color: 's1', tip: { title: 'The same classifier with lenient scoring', rows: [['Mean sensitivity', '1.000'], ['False alarms/h', '0.058'], ['Matched chance', '0.097']] } },
          { label: 'Honest: trained on the other patients', value: 12, display: '12', color: 's2', tip: { title: 'Trained on the other Siena patients', rows: [['Mean sensitivity', '0.248'], ['False alarms/h', '0.805'], ['Matched chance', '0.472']] } },
        ],
        note: "Post-hoc demonstration on the Siena data, and none of these numbers is a performance claim. The honest model's 12 of 39 is below the 47% a random alarm gets at its alarm rate.",
      },
      {
        type: 'table',
        title: 'Model results on CHB-MIT',
        headers: ['Model', 'Sensitivity', 'Matched chance', 'False alarms/h', 'Window AUC'],
        rows: [
          ['Line-length baseline', '0.787', '0.721', '1.43', '0.540'],
          ['Features + SVM', '0.657', '0.577', '1.14', '0.518'],
          ['Features + XGBoost', '0.633', '0.585', '1.18', '0.541'],
          ['EEGNet', '0.687', '0.653', '1.27', '0.515'],
          ['Welch + ResNet-18', '0.566', '0.547', '1.08', '0.496'],
          ['NeuroKAN (v1)', '0.590', '0.577', '1.13', '0.526'],
          ['APALA v2 final (3 seeds)', '0.132', '0.093', '0.18', '0.519'],
        ],
      },
      {
        type: 'text',
        title: 'Why the protocol is strict',
        paragraphs: [
          'Selection rules were committed before the results, with nested leave-one-subject-out validation across 23 subjects, causal filters, and scoring against a random alarm with the same false-alarm rate. The search ran 624 fold trainings on one laptop GPU.',
          'My own earlier systems reported 99.1% accuracy and AUC 0.64, and both fell to chance under these rules.',
          'Two findings apply beyond this dataset. With a refractory period, the textbook Poisson chance level understates chance by 13–23 percentage points at 1–1.5 alarms per hour. And Youden-optimal thresholds keep the alarm on 58–85% of the time, so sensitivity turns into coverage.',
        ],
      },
    ],
  },
  {
    id: 'apala-v1',
    category: 'ai',
    title: 'APALA v1',
    domain: 'Medical signals',
    problem:
      'Forecast seizures from scalp EEG by spotting the pre-ictal state, up to 30 minutes before onset. Formerly NeuroPulse, this is the system that came first.',
    result:
      'It scores 0.998 ROC-AUC on a patient it was trained on and 0.56 across patients it has never seen, barely above chance. That gap is why I built v2.',
    limit: 'Research prototype. Not a medical device and not for clinical decisions.',
    stack: ['Python', 'XGBoost', 'LightGBM', 'Random Forest', 'Numba'],
    links: [
      { label: 'Code', href: `${github}/Neuro_Pulse-Apala-` },
      { label: 'Model', href: `${hf}/Neuro_Pulse` },
    ],
    evidence: [
      {
        type: 'bars',
        title: 'ROC-AUC under four evaluation methods',
        legend: [
          { label: 'Patients the model knows', color: 's1' },
          { label: 'Patients it has never seen', color: 's2' },
        ],
        max: 1,
        chanceAt: 0.5,
        axis: { start: '0', middle: '0.5 chance', end: '1.0' },
        rows: [
          { label: 'One known patient', value: 0.998, display: '0.998', color: 's1', tip: { title: 'Trained and tested on the same patient (chb01)', rows: [['Sensitivity', '94.3%'], ['Specificity', '99.5%']] } },
          { label: 'Ensemble evaluation', value: 0.993, display: '0.993', color: 's1', tip: { title: 'Ensemble evaluation, 3,585 windows', rows: [['Sensitivity', '92.3%'], ['Specificity', '97.6%']] } },
          { label: 'Unseen patients (chb11–24)', value: 0.595, display: '0.595', color: 's2', tip: { title: 'Train chb01–10, test chb11–24', rows: [['Sensitivity', '5.7%'], ['Specificity', '98.1%']] } },
          { label: 'Leave one patient out (mean of 24)', value: 0.56, display: '0.560', color: 's2', tip: { title: 'Each patient scored by a model trained on the other 23', rows: [['Sensitivity', '27.9%'], ['Specificity', '77.7%']] } },
        ],
      },
      {
        type: 'table',
        title: 'Full results',
        headers: ['Evaluation', 'ROC-AUC', 'Sensitivity', 'Specificity'],
        rows: [
          ['One known patient', '0.998', '94.3%', '99.5%'],
          ['Ensemble evaluation', '0.993', '92.3%', '97.6%'],
          ['Unseen patients', '0.595', '5.7%', '98.1%'],
          ['Leave one patient out', '0.56', '27.9%', '77.7%'],
        ],
      },
      {
        type: 'facts',
        title: 'Pipeline',
        facts: [
          { label: 'Input', value: '686 CHB-MIT recordings, 198 annotated seizures' },
          { label: 'Features', value: '590 per window' },
          { label: 'Speed-up', value: 'Sample Entropy 158× faster with Numba' },
        ],
      },
    ],
  },
  {
    id: 'mona',
    category: 'ai',
    title: 'MONA',
    domain: 'Language models',
    problem:
      'LLMs are hard to learn because you can rarely look inside one. I trained a 110M-parameter language model from scratch on one laptop GPU, then built a terminal app that teaches how LLMs work using its real weights.',
    result:
      'You can watch a sentence become tokens, inspect attention layer by layer, debug why it repeats itself, and train a tiny model of your own. Pressing F8 on any screen shows the code behind it.',
    limit: "MONA writes fluent text but often states wrong facts and can't do arithmetic. It's built for learning, and the model card says so.",
    stack: ['Python', 'PyTorch', 'Byte-level BPE tokenizer', 'Llama-style architecture'],
    links: [
      { label: 'Code', href: `${github}/Mona` },
      { label: 'Model', href: `${hf}/MONA` },
    ],
    evidence: [
      {
        type: 'facts',
        title: 'Specs',
        facts: [
          { label: 'Languages', value: 'English, हिंदी, Hinglish, अवधी' },
          { label: 'Parameters', value: '110.1M' },
          { label: 'Architecture', value: '12 layers, width 768' },
          { label: 'Training data', value: '2.5 billion tokens' },
          { label: 'Context', value: '1,024 tokens' },
          { label: 'Tokenizer', value: '32,768 tokens' },
          { label: 'Pretraining', value: '~19 h, RTX 5080 Laptop GPU' },
          { label: 'Chat tuning', value: '~100K conversations' },
          { label: 'License', value: 'MIT' },
        ],
      },
      {
        type: 'table',
        title: 'Held-out text, bits per byte (lower is better)',
        headers: ['English', 'Hindi', 'Hinglish'],
        rows: [['1.027', '0.455', '1.058']],
      },
      {
        type: 'code',
        title: 'Try it',
        code: 'pip install git+https://github.com/JayD108/Mona.git\nmona',
      },
    ],
  },
  {
    id: 'varuna',
    category: 'ai',
    title: 'VARUNA',
    domain: 'Extreme weather',
    problem:
      'Forecast cloudbursts, thunderstorms and flash floods over the Himalayas, 2–6 hours ahead, by fusing atmospheric, satellite and terrain data in a 17.6M-parameter Hybrid TransUNet.',
    result:
      'Recall on the holdout is above 80% for all three hazards. Replacing coarse 25 km labels with 1 km labels raised cloudburst signal density 461×.',
    limit:
      'False alarms are common: precision is 18% for cloudbursts and 8% for flash floods. The holdout is 11 windows from one month, so it needs multi-year data before any operational claim.',
    stack: ['PyTorch', '3D + 2D CNNs', 'Self-attention', 'NetCDF', 'HDF5', 'GeoTIFF'],
    links: [{ label: 'Model and demo script', href: `${hf}/varuna-HybridTransU-net` }],
    evidence: [
      {
        type: 'lines',
        title: 'F1 score by model version, seven training runs',
        ariaLabel: 'Line chart of F1 score across four model versions. Thunderstorm rises from about 40 to 86 percent, cloudburst from 0.08 to 30 percent, flash flood from 0 to 14.94 percent.',
        x: {
          labels: ['v1.0', 'v2.0', 'v2.1', 'v3.0'],
          positions: [0, 1 / 3, 2 / 3, 1],
          ticks: [0, 1, 2, 3],
          tipTitles: ['v1.0 (runs 1–3)', 'v2.0 (runs 4–5)', 'v2.1 (run 6)', 'v3.0 (final)'],
        },
        y: { max: 100, ticks: [0, 25, 50, 75, 100], unit: '%' },
        digits: 1,
        series: [
          { name: 'Thunderstorm', color: 's2', values: [40, 72, 75.82, 85.97], tips: ['~40%', '~72%', '75.82%', '85.97%'] },
          { name: 'Cloudburst', color: 's1', values: [0.08, 0.08, 10.6, 30], tips: ['0.08%', '0.08%', '10.60%', '30.00%'] },
          { name: 'Flash flood', color: 's3', values: [0, 0, 1.52, 14.94], tips: ['0.00%', '0.00%', '1.52%', '14.94%'] },
        ],
      },
      {
        type: 'table',
        title: 'F1 by version',
        headers: ['Version', 'Cloudburst', 'Thunderstorm', 'Flash flood'],
        rows: [
          ['v1.0 (runs 1–3)', '0.08%', '~40%', '0.00%'],
          ['v2.0 (runs 4–5)', '0.08%', '~72%', '0.00%'],
          ['v2.1 (run 6)', '10.60%', '75.82%', '1.52%'],
          ['v3.0 (final)', '30.00%', '85.97%', '14.94%'],
        ],
      },
      {
        type: 'table',
        title: 'Holdout metrics for v3.0 (Aug 23–25, 2019)',
        headers: ['Hazard', 'Precision', 'Recall', 'F1', 'IoU'],
        rows: [
          ['Cloudburst', '18.29%', '83.36%', '30.00%', '17.65%'],
          ['Thunderstorm', '80.56%', '92.17%', '85.97%', '75.40%'],
          ['Flash flood', '8.24%', '80.58%', '14.94%', '8.08%'],
        ],
      },
      {
        type: 'facts',
        title: 'Data',
        facts: [
          { label: 'Volume', value: '190 GB, synchronized' },
          { label: 'Sources', value: 'IMDAA, INSAT-3D, CartoDEM' },
          { label: 'Region', value: 'Uttarakhand and Himachal Pradesh' },
          { label: 'Period', value: 'August 2019' },
        ],
      },
    ],
  },
  {
    id: 'manas',
    category: 'ai',
    title: 'MANAS',
    domain: 'Language models',
    problem:
      'Can a small transformer learn the patterns of classical Awadhi verse from raw characters? I wrote one from scratch in PyTorch with no pretrained weights and trained it on the poetry of Goswami Tulsidas.',
    result:
      '10.9M parameters, a 101-character Devanagari vocabulary and about 2.83 million characters of text. Validation loss stops improving around step 5,000, where the model starts memorizing the corpus.',
    limit:
      'This is an experimental checkpoint. The output looks like Devanagari verse without being coherent poetry, and the OCR-derived corpus still has errors. A cleaned, page-verified corpus is planned for v2.',
    stack: ['PyTorch', 'GPT-style decoder', 'MIT license'],
    links: [{ label: 'Model', href: `${hf}/MANAS` }],
    evidence: [
      {
        type: 'lines',
        title: 'Training and validation loss',
        ariaLabel: 'Line chart of loss over 15,000 steps. Training loss falls from 4.85 to 1.03. Validation loss reaches 2.05 at step 5,000, then rises to 2.11.',
        x: {
          labels: ['0', '500', '2,000', '5,000', '10,000', '15,000'],
          positions: [0, 500 / 15000, 2000 / 15000, 5000 / 15000, 10000 / 15000, 1],
          ticks: [0, 3, 4, 5],
          tipTitles: ['Step 0', 'Step 500', 'Step 2,000', 'Step 5,000', 'Step 10,000', 'Step 15,000'],
        },
        y: { max: 5, ticks: [0, 1, 2, 3, 4, 5], unit: '' },
        digits: 2,
        series: [
          { name: 'Validation', color: 's2', values: [4.85, 2.61, 2.15, 2.05, 2.07, 2.11] },
          { name: 'Train', color: 's1', values: [4.85, 2.29, 1.62, 1.35, 1.16, 1.03] },
        ],
      },
      {
        type: 'table',
        title: 'Loss by step',
        headers: ['Step', 'Train', 'Validation'],
        rows: [
          ['0', '4.85', '4.85'],
          ['500', '2.29', '2.61'],
          ['2,000', '1.62', '2.15'],
          ['5,000', '1.35', '2.05'],
          ['10,000', '1.16', '2.07'],
          ['15,000', '1.03', '2.11'],
        ],
      },
      {
        type: 'verse',
        label: 'Model output, prompt “श्री”',
        lines: ['निदान दीन बचन गहि सोभा बढ़ावा।', 'बालि और बिपुल बोलावड़े गावा ॥'],
      },
    ],
  },
  {
    id: 'chb-mit-dataset',
    category: 'ai',
    title: 'CHB-MIT Preprocessed EEG',
    domain: 'Public dataset',
    problem:
      'Raw EEG takes heavy signal processing before you can train on it. This feature-engineered dataset for seizure forecasting is ready to use without any.',
    result: `347,075 labelled windows, with ${statsLine}.`,
    stack: ['Hugging Face dataset', 'ODC-By 1.0'],
    links: [{ label: 'Dataset', href: 'https://huggingface.co/datasets/JayF14/chb-mit-preprocessed-eeg' }],
    evidence: [
      {
        type: 'facts',
        facts: [
          { label: 'Windows', value: '347,075 labelled' },
          { label: 'Features', value: '590 per window' },
          { label: 'Size', value: 'About 3.9 GB' },
          { label: 'Downloads', value: `${stats.dataset.downloads.toLocaleString('en-US')}, as of ${statsMonth}` },
        ],
      },
    ],
  },
  {
    id: 'gods-eye',
    category: 'ai',
    title: "God's Eye & StudyMind",
    domain: 'Local AI',
    problem: 'Web data and course documents are unstructured and hard to explore. This local AI system turns them into interactive knowledge graphs.',
    stack: ['FastAPI', 'Neo4j', 'Ollama'],
    links: [{ label: 'Code', href: `${github}/God-S-EYE-v2.0` }],
  },
  {
    id: 'gatekeeper',
    category: 'dev',
    title: 'GateKeeper',
    domain: 'Android app',
    problem:
      'My parents kept getting locked out at the gate: one would arrive home while the other had forgotten to unlock it. A normal notification is easy to miss, and an early one is easy to forget.',
    result:
      "I designed a two-phone alert system that needs no manual tracking. It sends a quiet notice when the commuter leaves work, then sounds a looping full-screen alarm about 3 minutes from home, until the person at home taps to confirm.",
    limit:
      'Android only, and installed directly instead of through Google Play, because of Play’s restrictions on SMS permissions.',
    stack: ['Kotlin', 'Android', 'Firebase', 'Geofencing', 'SMS', 'ZXing'],
    links: [{ label: 'Code', href: `${github}/GateKeeper` }],
    evidence: [
      {
        type: 'list',
        title: 'How it works',
        items: [
          { term: 'Geofence triggers', detail: 'Detects leaving work and coming within 500 m of home, with no taps needed' },
          { term: 'False alarm filter', detail: 'A time window stops short walks during the day from setting it off' },
          { term: 'Hard-to-miss alarm', detail: 'Loops until acknowledged, and the back button cannot dismiss it' },
          { term: 'Confirmation', detail: 'Tells the commuter when the person at home has responded' },
          { term: 'SMS fallback', detail: 'Sends the alert by text message when there is no internet' },
          { term: 'Honk Gate widget', detail: 'One home-screen tap to sound the alarm manually' },
          { term: 'QR pairing', detail: 'Pairs the two phones with one scan, with no logins or passwords' },
          { term: 'Battery note', detail: 'Includes the commuter’s battery level in the departure notice' },
        ],
      },
    ],
  },
  {
    id: 'apala-dashboard',
    category: 'dev',
    title: 'APALA dashboard',
    domain: 'Full stack',
    problem: "A seizure risk score is only useful if someone can watch it. This real-time interface streams each patient's score to the screen, replaying recorded EEG.",
    result:
      'A FastAPI backend with 6 API endpoints streams scores over one WebSocket per patient to a Next.js frontend, with a patient monitor, a 10-20 electrode map, and pages for the dataset and methods.',
    limit: 'Research prototype. Not a medical device and not for clinical decisions.',
    stack: ['FastAPI', 'Next.js', 'WebSockets', 'XGBoost'],
    links: [{ label: 'Code', href: `${github}/Neuro_Pulse-Apala-` }],
    evidence: [
      {
        type: 'image',
        src: 'case-files/apala-dashboard.webp',
        alt: 'The APALA patient monitor showing a seizure risk score for each patient.',
        width: 1400,
        height: 808,
        caption: 'The patient monitor, replaying recorded CHB-MIT EEG window by window.',
      },
    ],
  },
  {
    id: 'triangle',
    category: 'dev',
    title: 'TRIANGLE',
    domain: 'Web app',
    problemLabel: 'The brief',
    problem:
      'A browser-based open-source intelligence platform that maps strategic chokepoints and geopolitical developments, with a council of 11 AI agents answering queries, including one that checks the others’ work.',
    stack: ['TypeScript', 'Node.js'],
    links: [{ label: 'Code', href: `${github}/TRIANGLE-OSINT` }],
  },
  {
    id: 'java-projects',
    category: 'dev',
    title: 'Java projects',
    domain: 'Desktop and backend practice',
    problemLabel: 'The brief',
    problem: 'Practice in core Java: an inventory management system, a multi-threaded CSV file processor and a Swing calculator.',
    stack: ['Java', 'Swing'],
    links: [{ label: 'Code', href: `${github}/My_JAVA_FS-project` }],
  },
]
