# Saba's sketchbook portfolio implementation plan

**Goal:** Apply the user's supplied critique while retaining the handmade gallery and making Saba's work immediately discoverable on desktop and mobile.

**Architecture:** Keep React, Three.js, the theme provider, and the panel and entrance state. Use one curated project model for six 3D doors and accessible DOM project cards. The desktop gallery is a contained stage within a conventional scrolling portfolio; phones use an atmospheric, non-interactive scene preview and normal vertical cards.

**Tech stack:** Existing React 19, React Three Fiber, Drei, TypeScript, Vite. No new runtime dependencies.

**Design specification:** User-supplied critique and screenshots in this session. Dark sketchbook palette, warm paper labels, restrained mint accents, quiet architecture, useful first camera, six featured projects, visible hiring links, accessible project details, and conventional mobile scrolling. Implementation is already authorized by the user, including GPT-5.6 Luna delegation.

## Constraints

- Preserve real source information in `portfolio.json`; never fabricate demos, metrics, employment, or screenshots.
- Keep all substantive projects reachable in More projects. Feature HireLens, Smart Community Safety, Air Gesture Mouse, Satellite Drought, plus two substantive projects selected from the source data.
- All links must use real provided URLs. Resume is a printable HTML summary derived from that data.
- Door labels render in front of frames. Hide exterior geometry after entry. No ceiling intersects the outside camera.
- Normal document scrolling, 44px touch controls, visible keyboard focus, Escape/dismiss/focus management, one vertical modal scroll region, no horizontal overflow.
- Respect reduced motion, viewport changes, and a failed WebGL renderer; project cards remain available.

## Task 1: Project model and detail panels (Luna)

Files: `src/data/content.ts`, `src/components/ProjectArtwork.tsx`, `src/components/InfoPanel.tsx`, `src/components/InfoPanel.css`, `public/resume.html`.

- Extend `GalleryProject` with `category: string`, `pitch: string`, `features: string[]`, `featured: boolean`, `demoUrl?: string`, and `art: string`.
- Export `featuredProjects` and `moreProjects`; retain `galleryProjects`, `portfolio`, `TAGLINE`, and `NAME`.
- Export `ProjectArtwork({ project, className? })`, using illustrative SVG diagrams, clearly not screenshots.
- Build accessible project/about/contact dialog content with a labeled title, focus trap and restoration, Escape, project art, summary, features, stack, and valid links.
- Add a printable resume derived from existing education, skills, experience, and projects.

## Task 2: 3D reconstruction (Luna)

Files: `src/components/Scene.tsx`, `Room.tsx`, `ProjectDoor.tsx`, `EntranceCamera.tsx`, `Exterior.tsx`, `GateDoors.tsx`.

- Maintain `Scene()`'s public interface and provider contracts. Scene fills its parent, never the viewport.
- Build a six-door gallery composition with real dimensional frames, prominent canvas labels, lighting, restrained flooring, and an off-axis character or decorative plants.
- Use `featuredProjects` only. Label faces must sit in front of frames and accept clicks reliably.
- Stage only exterior before entry, only room afterward. Provide a sensible responsive entrance shot and immediate view of featured doors after entry.
- Disable pan/zoom, bound orbit, disable phone gestures, honor reduced motion, and pause controls while panels are open.

## Task 3: Responsive portfolio shell (main agent)

Files: `src/App.tsx`, `src/components/HUD.tsx`, `src/components/ProjectBrowser.tsx`, `src/index.css`, `src/context/GateContext.tsx`, `index.html`, `README.md`.

- Compose header, introduction, gallery stage, featured work, more projects, and contact footer.
- Surface About, Email, LinkedIn, Resume, and explicit theme action; remove mystery star/menu.
- Use accessible DOM cards on every device, category filters, and expandable secondary work.
- Place Enter inside the gallery card; reserve safe space and enable document scrolling.
- Add WebGL fallback and a route from the gallery to selected work.

## Verification

- Install locked dependencies, run `npm run build` and `npm run lint`.
- Inspect desktop exterior, entry/gallery, project details, and list navigation in a browser.
- Inspect phone 375px and 320px layouts, scrolling, all main links, project dialog overflow and close, and breakpoint resizing.
- Check theme changes, keyboard navigation, filtering, More projects, reduced motion, and printable resume.
- Review the integrated diff and record limitations before handoff.
