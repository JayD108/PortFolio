# The Dark Coder

Mrittunjay Dubey's portfolio as a noir comic, built with Vite, React and Tailwind. It lives beside the old site and doesn't replace it yet.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173/What-to-do-/
npm run build    # outputs to dist/
```

## Edit the content

All copy is in `src/content/`. Search the project for `TODO:` to find what still needs filling in.

## Base path

`vite.config.ts` builds for GitHub Pages at `/What-to-do-/`. If the repo is renamed or the site moves to a root address, build with `VITE_BASE` set to the new path, such as `VITE_BASE=/`.

To replace the old site later, publish the contents of `dist/`. Nothing does this automatically.
