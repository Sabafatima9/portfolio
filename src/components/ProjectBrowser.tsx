import { useState } from 'react'
import { featuredProjects, moreProjects } from '../data/content'
import { usePanel } from '../context/PanelContext'
import { WorkCarousel } from './WorkCarousel'

const categories = ['All work', 'AI & ML', 'Computer Vision', 'Flutter & Web', 'Experiments']

export function ProjectBrowser() {
  const [category, setCategory] = useState('All work')
  const [expanded, setExpanded] = useState(false)
  const { openProject } = usePanel()
  const others = moreProjects.filter((project) => category === 'All work' || project.category === category)
  const availableCategories = categories.filter((item) => item === 'All work' || [...featuredProjects, ...moreProjects].some((project) => project.category === item))

  return (
    <section className="work-section" id="work" aria-labelledby="work-heading" tabIndex={-1}>
      <div className="page-width section-heading" data-reveal><div><p className="eyebrow">A FEW THINGS I’VE PUT MY HEART INTO</p><h2 id="work-heading">Selected <span className="handwritten">work.</span></h2></div><p>From a spark of an idea<br />to something you can use.</p></div>
      <div data-reveal><WorkCarousel /></div>
      <div className="page-width work-toolbar"><div className="project-filters" role="group" aria-label="Filter projects by category">{availableCategories.map((item) => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div><span className="work-count" aria-live="polite">{others.length} more in the notebook</span></div>
      <div className="page-width more-projects" data-reveal><div className="more-projects-heading"><div><span className="handwritten">There’s more in the notebook.</span><p>Smaller builds, coursework, and experiments along the way.</p></div><button type="button" className="button button-secondary" aria-expanded={expanded} aria-controls="more-projects-list" onClick={() => setExpanded((value) => !value)}>{expanded ? 'Close notebook' : 'More projects'} <span className="more-count">{others.length}</span><span aria-hidden="true">{expanded ? '−' : '+'}</span></button></div>
        <div id="more-projects-list" hidden={!expanded}>{others.length ? <div className="notebook-list">{others.map((project) => <button key={project.id} type="button" className="notebook-item" onClick={() => openProject(project)}><span><strong>{project.title}</strong><span>{project.pitch}</span></span><span className="notebook-category">{project.category}</span><span aria-hidden="true">↗</span></button>)}</div> : <p className="empty-projects">The featured projects above are the full collection in this category.</p>}</div>
      </div>
    </section>
  )
}
