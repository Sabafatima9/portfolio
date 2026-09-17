# Saba Fatima — A Developer's Sketchbook

A responsive React portfolio with six curated featured projects, a browsable notebook of additional work, and accessible project details. Fully 2D — no WebGL, no 3D engine, fast on every device.

## Explore

- The first screen introduces Saba and exposes Work, About, Email, LinkedIn, and Resume.
- A featured-work showcase highlights the strongest project and three runners-up.
- **Explore my work** jumps to the accessible project cards.
- Phones use normal vertical scrolling throughout.
- Filter selected work by category. **More projects** opens the rest of the notebook.
- Project dialogs support Escape, keyboard focus trapping/restoration, and one vertical scroll region.
- The light/dark theme persists. Reduced-motion preferences are respected.
- **Resume** opens a printable HTML resume with a Print / Save PDF button.

## Development

Requires Node.js 22.12+.

```bash
npm ci
npm run dev
npm run build
npm run lint
```

Development URL: http://localhost:5173/saba-fatima-portfolio/

Production base path is `/saba-fatima-portfolio/`. The build is in `dist/`.

## Browser verification

```bash
npx playwright install chromium --only-shell
npm test
```

Tests cover desktop layout, project order, filtering, keyboard dialogs, theme switching, 320/375/768px layouts, scrolling and overflow, reduced motion, resizing, and the resume. Screenshots are written to the ignored `test-results/` directory.

A preinstalled compatible Chromium executable can be selected with `PLAYWRIGHT_CHROMIUM_EXECUTABLE`. The test server starts automatically, or reuses an existing local server on port 5173.

## Content

`src/data/portfolio.json` is the original source snapshot. Curated titles, pitches, features, ordering, and categories live in `src/data/content.ts`. The same featured collection drives the showcase and project cards. The remaining substantive repositories are available in the notebook.

Project visuals are original SVG illustrations, not product screenshots. Demo buttons appear only when a genuine demo URL is configured. `public/resume.html` is derived from the source snapshot and should be updated alongside it.
