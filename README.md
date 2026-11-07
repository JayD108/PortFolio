# Mrittunjay Dubey: Portfolio

My portfolio, told as a noir comic. Built with Vite, React and Tailwind.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173/PortFolio/
npm run build    # outputs to dist/
```

## Edit the content

All copy is in `src/content/`:

- `site.ts`: name, links, resume, email and Service Record
- `intro.ts`: Introduction
- `training.ts`: skills and their "battle-tested" or "in training" labels
- `cases.ts`: Case Files. To add a case, copy an entry and change its fields.
- `closing.ts`: The Mission, Side Quests, Send the Signal and the footer

The resume PDF is `public/Mrittunjay_Dubey_Resume.pdf`.

## Base path

`vite.config.ts` builds for GitHub Pages at `/PortFolio/`. If the repo is renamed or the site moves to a root address, build with `VITE_BASE` set to the new path, such as `VITE_BASE=/`.
