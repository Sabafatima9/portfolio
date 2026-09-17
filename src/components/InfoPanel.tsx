import { useEffect, useRef } from 'react'
import { portfolio } from '../data/content'
import { usePanel } from '../context/PanelContext'
import { ProjectArtwork } from './ProjectArtwork'
import './InfoPanel.css'

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export function InfoPanel() {
  const { panel, closePanel } = usePanel()
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!panel) return

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const background = document.querySelector<HTMLElement>('#portfolio-content')
    const previousOverflow = document.body.style.overflow
    background?.setAttribute('inert', '')
    document.body.style.overflow = 'hidden'

    const focusCloseButton = () => dialogRef.current?.querySelector<HTMLButtonElement>('[data-panel-close]')?.focus()
    const frame = window.requestAnimationFrame(focusCloseButton)
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closePanel()
        return
      }
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (focusable.length === 0) {
        event.preventDefault()
        dialogRef.current.focus()
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!dialogRef.current.contains(document.activeElement)) {
        event.preventDefault()
        ;(event.shiftKey ? last : first).focus()
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      window.cancelAnimationFrame(frame)
      document.removeEventListener('keydown', onKeyDown)
      background?.removeAttribute('inert')
      document.body.style.overflow = previousOverflow
      previousFocusRef.current?.focus()
      previousFocusRef.current = null
    }
  }, [panel, closePanel])

  if (!panel) return null

  const titleId = panel.kind === 'project'
    ? `info-panel-title-${panel.project.id}`
    : `info-panel-title-${panel.kind}`

  return (
    <div className="info-panel-backdrop" onClick={closePanel} role="presentation">
      <div
        ref={dialogRef}
        className="info-panel ink-plaque"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="info-panel-header">
          <span className="info-panel-kicker">{panel.kind === 'project' ? 'Project notes' : 'Sketchbook'}</span>
          <button
            type="button"
            className="info-panel-close"
            onClick={closePanel}
            aria-label="Close dialog"
            data-panel-close
          >
            ×
          </button>
        </header>

        <div className="info-panel-body">
          {panel.kind === 'project' && (
            <article>
              <ProjectArtwork project={panel.project} className="info-panel-artwork" />
              <h2 id={titleId}>{panel.project.title}</h2>
              <p className="info-panel-meta">
                {panel.project.category} · {panel.project.language || 'Open-source project'}
                {panel.project.stars > 0 ? ` · ★ ${panel.project.stars}` : ''}
              </p>
              <p className="info-panel-pitch">{panel.project.pitch}</p>
              <p>{panel.project.description}</p>

              {panel.project.features.length > 0 && (
                <section aria-labelledby={`${titleId}-features`}>
                  <h3 id={`${titleId}-features`}>What it explores</h3>
                  <ul className="info-panel-list">
                    {panel.project.features.map((feature) => <li key={feature}>{feature}</li>)}
                  </ul>
                </section>
              )}

              {panel.project.tech.length > 0 && (
                <section aria-labelledby={`${titleId}-stack`}>
                  <h3 id={`${titleId}-stack`}>Stack</h3>
                  <ul className="info-panel-tags" aria-label="Technology stack">
                    {panel.project.tech.map((tech) => <li key={tech}>{tech}</li>)}
                  </ul>
                </section>
              )}

              <div className="info-panel-actions">
                <a className="info-panel-cta" href={panel.project.url} target="_blank" rel="noreferrer">
                  View source on GitHub <span aria-hidden="true">↗</span>
                </a>
                {panel.project.demoUrl && (
                  <a className="info-panel-cta info-panel-cta-secondary" href={panel.project.demoUrl} target="_blank" rel="noreferrer">
                    Live demo <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </article>
          )}

          {panel.kind === 'about' && (
            <article>
              <h2 id={titleId}>About Saba</h2>
              <p className="info-panel-meta">{portfolio.about.headline}</p>
              <p>{portfolio.about.summary}</p>
              <section aria-labelledby={`${titleId}-focus`}>
                <h3 id={`${titleId}-focus`}>Current toolkit</h3>
                <ul className="info-panel-list">
                  {portfolio.about.what_i_do.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
              <section aria-labelledby={`${titleId}-skills`}>
                <h3 id={`${titleId}-skills`}>Selected skills</h3>
                <ul className="info-panel-tags" aria-label="Selected skills">
                  {portfolio.skills.all.slice(0, 12).map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
              </section>
            </article>
          )}

          {panel.kind === 'contact' && (
            <article>
              <h2 id={titleId}>Let’s talk</h2>
              <p>{portfolio.contact.location}</p>
              <div className="info-panel-contact-list">
                <a className="info-panel-contact-link" href={`mailto:${portfolio.contact.email}`}>
                  <span>Email</span>{portfolio.contact.email}
                </a>
                <a className="info-panel-contact-link" href={`tel:${portfolio.contact.phone.replace(/\s/g, '')}`}>
                  <span>Phone</span>{portfolio.contact.phone}
                </a>
              </div>
              <div className="info-panel-links">
                <a href={portfolio.contact.github} target="_blank" rel="noreferrer">GitHub ↗</a>
                <a href={portfolio.contact.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
              </div>
            </article>
          )}
        </div>
      </div>
    </div>
  )
}
