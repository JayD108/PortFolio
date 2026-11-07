// Case notes: long-form write-ups that open from a case file, with their own shareable link (#note-<caseId>).
// Every number here comes from the project's paper, model card or README.

export type NoteSection = { heading: string; paragraphs: string[]; list?: string[] }

export type CaseNote = {
  caseId: string
  title: string
  dek: string
  readMinutes: number
  sections: NoteSection[]
  footer: string
}

export const notes: CaseNote[] = [
  {
    caseId: 'apala-v2',
    title: 'How evaluation shortcuts turn 0 of 39 into 39 of 39',
    dek: 'What I learned by testing my own seizure forecasting models under rules strict enough to fail them.',
    readMinutes: 5,
    sections: [
      {
        heading: 'The question',
        paragraphs: [
          'Seizure prediction on the CHB-MIT scalp EEG dataset is often reported at 90–99% accuracy. My own earlier systems looked just as good: one reached 99.1% accuracy, and another reached an AUC of 0.64.',
          'Both had a catch. The first split windows from a single patient at random, so training and test data came from the same person. The second chose its checkpoint and threshold on the test patient. I wanted to know whether a network trained on other patients could warn of a seizure 5–35 minutes ahead in a patient it had never seen, using scalp EEG alone.',
        ],
      },
      {
        heading: 'Rules first',
        paragraphs: ['I fixed the rules before running anything, and committed them to version control before the results they govern existed.'],
        list: [
          'Nested leave-one-subject-out validation: 23 test subjects, each with 20 training and 2 validation subjects. Every model choice was made on validation subjects only.',
          'Causal, forward-only filters, so no future signal leaks into a decision.',
          'Alarms scored as a clinician would see them: a 5-minute horizon, a 30-minute warning window and a 30-minute refractory period.',
          'Every result compared against a simulated random alarm with the same false-alarm rate.',
          'The final model frozen with SHA-256 hashes, then run once on an independent hospital dataset (Siena).',
        ],
      },
      {
        heading: 'The search',
        paragraphs: [
          'I searched one component at a time: 5 signal representations, 3 backbones, 5 classification heads, 24 alarm logics, 5 losses and 5 domain-generalisation settings. A newcomer replaced the current choice only if it beat it on validation data.',
          'That came to 624 fold trainings, about six days on one RTX 5080 laptop GPU.',
        ],
      },
      {
        heading: 'The answer was no',
        paragraphs: [
          'The best configuration reached 13.2% sensitivity at 0.18 false alarms per hour. A random alarm at the same rate reached 9.3% (p = 0.185), and 0 of 23 subjects were individually above chance. Across all 50 model-versus-chance tests in the study, the smallest corrected p-value was 0.55.',
          'On the Siena dataset the frozen model raised no alarms in 121.9 hours and predicted 0 of 39 seizures.',
        ],
      },
      {
        heading: 'How shortcuts manufacture performance',
        paragraphs: [
          'After the main result, I used Siena\'s own seizures to add common shortcuts one at a time. This was a post-hoc demonstration, not a validation.',
          'One threshold tuned on Siena predicted 3 of 39 seizures. Per-patient thresholds chosen on those patients\' seizures raised it to 5.7. Lenient scoring took it to 26.7. A classifier trained on a random half of Siena\'s windows reached 32, and adding lenient scoring reached 39 of 39.',
          'The honest version, trained on the other patients, predicted 12 of 39. That is below the 47% a random alarm gets at its alarm rate. On the same features, a random window split scores an AUC of 0.835, while a split by patient scores 0.457.',
        ],
      },
      {
        heading: 'Two lessons beyond this dataset',
        paragraphs: [],
        list: [
          'The textbook Poisson chance level understates chance when alarms have a refractory period, by 13–23 percentage points at 1–1.5 alarms per hour. A simulated random alarm with the same rules is the fair baseline.',
          'Youden-optimal thresholds kept the alarm on 58–85% of the time, so "sensitivity" became coverage. Report time in warning and matched chance next to every sensitivity.',
        ],
      },
      {
        heading: 'What it does not show',
        paragraphs: [
          'This does not show that seizure forecasting is impossible. Long-term, per-patient forecasting that follows daily and multi-day cycles has positive results. On CHB-MIT, the limit looks like data per patient, not architecture.',
        ],
      },
    ],
    footer: 'Preprint v1.5, not peer reviewed. A research benchmark, not a medical device. Paper available on request.',
  },
  {
    caseId: 'mona',
    title: 'Training a 110M-parameter language model on one laptop',
    dek: 'Why I built a small multilingual model from scratch, and the app that lets anyone look inside it.',
    readMinutes: 4,
    sections: [
      {
        heading: 'Why build it',
        paragraphs: [
          'Most people learn about language models from diagrams. I wanted something you could open up: a real model whose weights you can inspect while it works, in English and in the languages I grew up with.',
          'MONA is a 110M-parameter model trained from scratch on English, Hindi, Hinglish and Awadhi. A terminal app sits on top of it and teaches how language models work, using its real weights.',
        ],
      },
      {
        heading: 'The model',
        paragraphs: ['MONA is a Llama-style, decoder-only transformer.'],
        list: [
          '12 layers, width 768, 12 attention heads',
          'SwiGLU feed-forward, RMSNorm, rotary position embeddings and tied embeddings',
          '110.1M parameters, 85.0M of them outside the embeddings',
          'A 1,024-token context',
        ],
      },
      {
        heading: 'The tokenizer matters more than you think',
        paragraphs: [
          'I trained a byte-level BPE tokenizer with 32,768 tokens on a balanced sample of English, Hindi, Hinglish and Awadhi, which brings Hindi down to 1.33 tokens per word.',
          'Tokenizers trained mostly on English split Hindi into many more pieces, which makes the same sentence slower and more expensive. The app lets you watch your own sentence get cut into tokens and see this for yourself.',
        ],
      },
      {
        heading: 'Training on a laptop',
        paragraphs: [
          'Pretraining used 2.5 billion tokens and took about 19 hours on an RTX 5080 laptop GPU, with AdamW, bf16 and a warmup-stable-decay learning-rate schedule peaking at 6e-4. Chat tuning then used about 100,000 conversations, with the loss masked to the model\'s own replies.',
          'The English data is FineWeb-Edu, the Hindi and romanized Hindi come from AI4Bharat Sangraha, and the Awadhi is Tulsidas\'s public-domain verse. An early Tulsidas corpus also contained a modern commentary that is likely still under copyright. When I noticed, at 0.8 of 2.5 billion tokens, I removed it, and nothing from it is distributed.',
          'On held-out text it scores 1.027 bits per byte in English, 0.455 in Hindi and 1.058 in Hinglish. Awadhi is much harder for it, with a held-out loss of 5.445 nats per token.',
        ],
      },
      {
        heading: 'The app',
        paragraphs: ['In the first ten minutes you can:'],
        list: [
          'play "guess the next word" against MONA',
          'watch a sentence become tokens',
          'look inside attention, layer by layer',
          'debug why it repeats itself or states wrong facts',
          'train a tiny model of your own in about two minutes',
          'press F8 on any screen to read the code behind it',
        ],
      },
      {
        heading: 'What it gets wrong',
        paragraphs: [
          'MONA writes fluent text but often states things that are wrong, and it cannot do arithmetic. Asked "Who are you?", it once introduced itself as the director of the National Geographic Society. It is built for learning how models work, not for answers, and the model card says so.',
        ],
      },
    ],
    footer: 'MIT licensed. Install with pip from github.com/JayD108/Mona; weights on Hugging Face as JayF14/MONA.',
  },
  {
    caseId: 'varuna',
    title: 'Forecasting cloudbursts over the Himalayas',
    dek: 'Seven training runs, a 1:460 class imbalance, and why I chose recall over precision.',
    readMinutes: 4,
    sections: [
      {
        heading: 'The problem',
        paragraphs: [
          'Cloudbursts and flash floods in Uttarakhand and Himachal Pradesh can arrive with little warning. VARUNA tries to forecast three hazards at once, cloudbursts, severe thunderstorms and flash floods, 2–6 hours ahead.',
        ],
      },
      {
        heading: 'Three kinds of data',
        paragraphs: ['The model fuses three synchronized inputs, about 190 GB in total for August 2019:'],
        list: [
          'IMDAA atmospheric reanalysis: 30 parameters across pressure levels, as 6 hourly frames (7,440 NetCDF4 files)',
          'INSAT-3D satellite: water vapour, cloud-top temperature, rainfall rate and a computed cloud-top temperature drop rate that tracks fast-growing storms (over 1,300 HDF5 files)',
          'CartoDEM terrain: 30 m elevation and slope, added late in the decoder to steer where floods can flow',
        ],
      },
      {
        heading: 'The architecture',
        paragraphs: [
          'VARUNA is a 17.6M-parameter Hybrid TransUNet. 3D convolutions compress time, a 2D U-Net extracts spatial features, and a self-attention bottleneck at 64 × 64 resolution links distant parts of the region.',
          'The data became 55 windows of 6 hours each, split by date: 44 for training and 11, from August 23–25, held out completely.',
        ],
      },
      {
        heading: 'Seven runs to get there',
        paragraphs: [],
        list: [
          'v1.0 (runs 1–3): timestamps between reanalysis and satellite data did not line up. Cloudburst F1 was 0.08%.',
          'v2.0 (runs 4–5): strict 30-minute time bins and a Dice-Focal loss for the 1:460 imbalance. Thunderstorms improved to about 72%; cloudbursts did not.',
          'v2.1 (run 6): nearest-neighbour label resizing and loss weights of 4× for cloudbursts and 6× for floods. Cloudburst F1 reached 10.6%.',
          'v3.0 (final): 1 km rainfall labels instead of 25 km ones, which raised the cloudburst signal 461×, the temperature drop-rate channel, and flood labels limited to slopes over 10°. Cloudburst F1 reached 30%.',
        ],
      },
      {
        heading: 'Why recall over precision',
        paragraphs: [
          'On the holdout, recall is above 80% for all three hazards, while precision is 18% for cloudbursts and 8% for flash floods. For an early-warning system that trade is deliberate: a false alarm is survivable, and a missed cloudburst may not be.',
        ],
      },
      {
        heading: 'What it would take',
        paragraphs: [
          'Eleven windows from one month are far too few for any operational claim. The next steps are multi-year data from 2015–2023 to learn seasonal patterns and cut false alarms, more satellite channels, and a stronger temporal backbone for 24–48 hour context.',
        ],
      },
    ],
    footer: 'Model weights and a demo script that runs on one real holdout window are on Hugging Face as JayF14/varuna-HybridTransU-net.',
  },
]
