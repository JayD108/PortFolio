# Mrittunjay Dubey: Portfolio

My portfolio, told as a noir comic. Built with Vite, React and Tailwind.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173/
npm run build    # outputs to dist/
```

## Deploy on Vercel

Import this repo in Vercel. It detects Vite, so no settings are needed. Then:

- **Analytics:** turn on Web Analytics in the project's dashboard for cookie-free page views. It is only loaded on Vercel.
- **Custom domain:** add `mrittunjaydubey.in` under Domains and follow Vercel's DNS steps. Link previews use the production address automatically. Set `SITE_URL` to override it.
- **Another host:** the site builds for the root path. For a sub-path, build with `VITE_BASE`, for example `VITE_BASE=/PortFolio/`.

## The resume

The resume PDF is built from the same content as the site, and it must fit on one page.

```bash
npm run resume   # writes public/Mrittunjay_Dubey_Resume.pdf
```

Edit `src/content/resume.ts` for the resume text. Your name, contacts, education and the "Open to" line come from `src/content/site.ts`, and live numbers from `src/content/stats.ts`. If the resume grows past one page, the command stops and says how much to cut. It needs Chrome, Edge or Chromium; set `BROWSER_PATH` if yours is somewhere unusual.

## Live numbers

`npm run stats` refreshes the Hugging Face download and like counts in `src/content/stats.ts`. A GitHub Action (`.github/workflows/update-stats.yml`) runs it every Monday and commits any change, which redeploys the site. It does not rebuild the resume, because fonts on GitHub's servers differ; run `npm run resume` yourself for fresh numbers there.

## Edit the content

All copy is in `src/content/`:

- `site.ts`: name, links, socials, "Open to" line, cover teasers and Service Record
- `intro.ts`: Introduction
- `training.ts`: skills and their "battle-tested" or "in training" labels
- `coursework.ts`: subjects by semester, shown in the closed coursework file
- `cases.ts`: Case Files. To add a case, copy an entry and change its fields.
- `notes.ts`: long-form case notes, each opened at `#note-<case id>`
- `closing.ts`: The Mission, Side Quests, Send the Signal and the footer
- `fun.ts`: the jet flyby, the end-of-issue note and the developer console note
- `resume.ts`: the resume

## Extras

- **Daylight edition:** the sun button in the menu bar switches to a newsprint light theme, remembered per visitor.
- **Live rain:** the cover rain follows current rainfall over Dehradun, from Open-Meteo, as a nod to VARUNA.
- **Detective badge:** opening every evidence panel earns a badge in the menu bar.
- **Night vision:** type ↑ ↑ ↓ ↓ ← → ← → B A.
- **Late-night greeting:** between 11 PM and 4 AM, visitor's time.

All motion switches off for visitors who prefer reduced motion.

## Tech stack

Vite, React 19 and TypeScript, Tailwind CSS, Vercel Web Analytics (production only). Linting uses `oxlint` (`npm run lint`).

## Project structure

```
src/            React app (components, content/, styles)
src/content/    all site copy and data (see "Edit the content")
scripts/        update-stats.mjs, build-resume.mjs
public/         static assets, resume PDF, favicon, social preview image
```

## Author

Mrittunjay Dubey, GitHub [@JayD108](https://github.com/JayD108)

## License

No license file is included yet, so all rights are reserved by default.
