import { portfolio } from '../data/content'
import { useTheme } from '../theme/ThemeContext'
import { usePanel } from '../context/PanelContext'

export function HUD() {
  const { theme, toggleTheme } = useTheme()
  const { openAbout } = usePanel()
  return (
    <header className="site-header page-width">
      <a href="#main" className="brand" aria-label="Saba Fatima, home"><span className="handwritten brand-name">Saba Fatima<span className="brand-dot">.</span></span><span className="brand-tag">AI · COMPUTER VISION · FLUTTER</span></a>
      <nav className="main-nav" aria-label="Main navigation">
        <a href="#work" className="nav-work">Work</a>
        <button type="button" onClick={openAbout}>About</button>
        <a href={portfolio.contact.linkedin} target="_blank" rel="noreferrer" className="nav-linkedin">LinkedIn ↗</a>
        <a href={`${import.meta.env.BASE_URL}resume.html`} target="_blank" rel="noreferrer">Resume ↗</a>
        <a href={`mailto:${portfolio.contact.email}`} className="nav-email">Say hello <span aria-hidden="true">↗</span></a>
        <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
          {theme === 'dark' ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></svg> : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M20 15.3A8.5 8.5 0 0 1 8.7 4 8.5 8.5 0 1 0 20 15.3Z" /></svg>}
        </button>
      </nav>
    </header>
  )
}
