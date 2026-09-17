import { useCallback, useEffect, useRef, useState } from 'react'
import { featuredProjects } from '../data/content'
import { usePanel } from '../context/PanelContext'
import { ProjectArtwork } from './ProjectArtwork'

const COUNT = featuredProjects.length

/** Shortest signed offset of `index` from `current` on a ring of `COUNT`. */
function ringOffset(index: number, current: number): number {
  let offset = index - current
  if (offset > COUNT / 2) offset -= COUNT
  if (offset < -COUNT / 2) offset += COUNT
  return offset
}

/**
 * A draggable 3D coverflow of the featured projects. The center card is the
 * active one and opens the project dialog; side cards fan back with depth.
 * Supports arrows, dots, keyboard, and pointer drag/swipe.
 */
export function WorkCarousel() {
  const { openProject } = usePanel()
  const [current, setCurrent] = useState(0)
  const [drag, setDrag] = useState(0) // -1..1 while dragging
  const dragState = useRef<{ startX: number; active: boolean; moved: boolean }>({ startX: 0, active: false, moved: false })
  const trackRef = useRef<HTMLDivElement>(null)

  // Auto-advance runs only until the user first interacts, then stops for good.
  const interacted = useRef(false)
  const go = useCallback((next: number) => {
    interacted.current = true
    setCurrent(((next % COUNT) + COUNT) % COUNT)
  }, [])
  const prev = useCallback(() => go(current - 1), [current, go])
  const next = useCallback(() => go(current + 1), [current, go])

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); prev() }
    else if (event.key === 'ArrowRight') { event.preventDefault(); next() }
  }

  // Pointer drag / swipe
  const onPointerDown = (event: React.PointerEvent) => {
    dragState.current = { startX: event.clientX, active: true, moved: false }
    ;(event.target as HTMLElement).setPointerCapture?.(event.pointerId)
  }
  const onPointerMove = (event: React.PointerEvent) => {
    if (!dragState.current.active) return
    const delta = event.clientX - dragState.current.startX
    const width = trackRef.current?.offsetWidth || 1
    const amount = Math.max(-1, Math.min(1, delta / (width * 0.35)))
    if (Math.abs(delta) > 6) dragState.current.moved = true
    setDrag(amount)
  }
  const endDrag = (event: React.PointerEvent) => {
    if (!dragState.current.active) return
    dragState.current.active = false
    const delta = event.clientX - dragState.current.startX
    const width = trackRef.current?.offsetWidth || 1
    if (Math.abs(delta) > width * 0.12) {
      if (delta < 0) next(); else prev()
    }
    setDrag(0)
  }

  // Auto-advance, paused on hover/focus and when a dialog is open.
  const [paused, setPaused] = useState(false)
  const { panel } = usePanel()
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || paused || panel) return
    const id = window.setInterval(() => {
      if (!interacted.current) setCurrent((c) => (c + 1) % COUNT)
    }, 4200)
    return () => window.clearInterval(id)
  }, [paused, panel])

  return (
    <div
      className="coverflow"
      role="group"
      aria-roledescription="carousel"
      aria-label="Selected work"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        className="coverflow-track"
        style={{ '--drag': drag } as React.CSSProperties}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
        tabIndex={0}
        aria-label="Project carousel. Use left and right arrow keys to navigate."
      >
        {featuredProjects.map((project, index) => {
          const raw = ringOffset(index, current) - drag
          const offset = Math.max(-2.5, Math.min(2.5, raw))
          const abs = Math.abs(offset)
          const isActive = Math.round(raw) === 0 && Math.abs(drag) < 0.5
          const style = {
            '--offset': offset,
            '--abs': abs,
            zIndex: String(100 - Math.round(abs * 10)),
          } as React.CSSProperties
          return (
            <div
              key={project.id}
              className={`coverflow-card ${isActive ? 'is-active' : ''}`}
              style={style}
              aria-hidden={!isActive}
            >
              <button
                type="button"
                className="coverflow-card-button"
                tabIndex={isActive ? 0 : -1}
                onClick={() => {
                  if (dragState.current.moved) return
                  if (isActive) openProject(project)
                  else go(current + Math.round(raw))
                }}
                aria-label={isActive ? `View ${project.title}` : `Go to ${project.title}`}
              >
                <div className="coverflow-art-wrap">
                  <ProjectArtwork project={project} className="coverflow-art" />
                  <span className="coverflow-index">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="coverflow-copy">
                  <p className="coverflow-category">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p className="coverflow-pitch">{project.pitch}</p>
                  <span className="coverflow-open">Explore project <span aria-hidden="true">↗</span></span>
                </div>
              </button>
            </div>
          )
        })}
      </div>

      <div className="coverflow-controls">
        <button type="button" className="coverflow-arrow" onClick={prev} aria-label="Previous project">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5m7-7-7 7 7 7" /></svg>
        </button>
        <div className="coverflow-dots" role="tablist" aria-label="Choose project">
          {featuredProjects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              role="tab"
              aria-selected={index === current}
              aria-label={`${index + 1}. ${project.title}`}
              className={index === current ? 'is-current' : ''}
              onClick={() => go(index)}
            />
          ))}
        </div>
        <button type="button" className="coverflow-arrow" onClick={next} aria-label="Next project">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  )
}
