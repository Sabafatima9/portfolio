import { HUD } from './components/HUD'
import { InfoPanel } from './components/InfoPanel'
import { ProjectBrowser } from './components/ProjectBrowser'
import { ProjectArtwork } from './components/ProjectArtwork'
import { featuredProjects, portfolio } from './data/content'
import { PanelProvider, usePanel } from './context/PanelContext'
import { useReveal } from './hooks/useReveal'

function Showcase() {
  const { openProject } = usePanel()
  const spotlight = featuredProjects[0]
  const others = featuredProjects.slice(1, 4)
  return (
    <section className="showcase" aria-label="Featured work preview" data-reveal>
      <div className="showcase-caption"><span><span className="status-dot" /> SELECTED WORK</span><span className="showcase-edition">THE SKETCHBOOK</span></div>
      <button type="button" className="showcase-hero" onClick={() => openProject(spotlight)} aria-label={`View ${spotlight.title}`}>
        <ProjectArtwork project={spotlight} className="showcase-hero-art" />
        <span className="showcase-hero-copy">
          <span className="showcase-hero-tag">FEATURED · {spotlight.category.toUpperCase()}</span>
          <span className="showcase-hero-title">{spotlight.title}</span>
          <span className="showcase-hero-pitch">{spotlight.pitch}</span>
          <span className="showcase-hero-open">Explore project <span aria-hidden="true">↗</span></span>
        </span>
      </button>
      <div className="showcase-strip">
        {others.map((project) => (
          <button key={project.id} type="button" className="showcase-chip" onClick={() => openProject(project)} aria-label={`View ${project.title}`}>
            <span className="showcase-chip-title">{project.title}</span>
            <span className="showcase-chip-category">{project.category} <span aria-hidden="true">↗</span></span>
          </button>
        ))}
      </div>
      <div className="showcase-controls">
        <div><span className="handwritten showcase-note">Every project, a new idea.</span><p>A few things I’ve built and loved.</p></div>
        <a className="button button-primary" href="#work">See all work <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  )
}

function Portfolio() {
  const { openAbout } = usePanel()
  useReveal()
  return (
    <>
      <div id="portfolio-content">
        <a className="skip-link" href="#work">Skip to selected work</a>
        <HUD />
        <main id="main">
          <section className="intro page-width" aria-labelledby="intro-heading">
            <div className="intro-copy" data-reveal>
              <p className="eyebrow">HELLO, I’M SABA FATIMA</p>
              <h1 id="intro-heading">A curious mind.<br />A <span className="handwritten heading-script">builder</span> at heart.</h1>
              <p className="intro-description">I turn ideas into apps that connect, and tools that see and learn. Flutter, AI, and computer vision are my favourite places to play.</p>
              <div className="intro-actions"><a className="button button-primary" href="#work">Explore my work <span aria-hidden="true">↓</span></a><button type="button" className="text-link" onClick={openAbout}>A little about me <span aria-hidden="true">↗</span></button></div>
              <div className="intro-footnote"><span>Made with curiosity.<br /><span className="muted">From Rawalpindi, Pakistan.</span></span></div>
            </div>
            <Showcase />
          </section>
          <div className="interests-strip" aria-label="Areas of work">
            <div className="marquee" aria-hidden="true">
              <div className="marquee-track">
                {[0, 1].map((copy) => (
                  <p key={copy}>Thoughtful apps <i>✦</i> Computer vision <i>✦</i> Applied AI <i>✦</i> Flutter <i>✦</i> Little experiments <i>✦</i> Tools that see &amp; learn <i>✦</i>&nbsp;</p>
                ))}
              </div>
            </div>
            <span className="sr-only">Thoughtful apps, computer vision, applied AI, Flutter, little experiments, tools that see and learn.</span>
          </div>
          <ProjectBrowser />
          <section className="contact-section page-width" id="contact" aria-labelledby="contact-heading" data-reveal>
            <div><p className="eyebrow">THE NEXT CHAPTER</p><h2 id="contact-heading">Good things start<br />with a <span className="handwritten">hello.</span></h2><p>Have an idea, an opportunity, or a question?<br />I’d love to hear from you.</p></div>
            <div className="contact-actions"><a href={`mailto:${portfolio.contact.email}`} className="contact-email">Let’s talk <span aria-hidden="true">↗</span></a><a className="email-address" href={`mailto:${portfolio.contact.email}`}>{portfolio.contact.email}</a><div className="contact-socials"><a href={portfolio.contact.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={portfolio.contact.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={`${import.meta.env.BASE_URL}resume.html`} target="_blank" rel="noreferrer">Resume ↗</a></div></div>
          </section>
        </main>
        <footer className="site-footer page-width"><a href="#main" className="handwritten footer-signature">Saba Fatima</a><span>A little corner of the internet, made my own.</span><a href="#main">Back to top ↑</a></footer>
      </div>
      <InfoPanel />
    </>
  )
}
export default function App() { return <PanelProvider><Portfolio /></PanelProvider> }
