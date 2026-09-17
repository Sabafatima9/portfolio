import raw from './portfolio.json'

export type Project = {
  name: string
  description: string | null
  language: string | null
  stars: number
  html_url: string
  is_stub: boolean
  has_readme: boolean
  summary: string | null
  tech_stack: string[] | null
  notable_features: string[] | null
}

export type PortfolioData = {
  profile: {
    login: string
    name: string
    bio: string
    company: string
    location: string
    blog: string
    avatar_url: string
    html_url: string
  }
  contact: {
    email: string
    phone: string
    location: string
    linkedin: string
    github: string
    portfolio: string
  }
  about: {
    headline: string
    summary: string
    what_i_do: string[]
    github_bio: string
  }
  education: Array<{ institution: string; degree: string; years: string }>
  experience: Array<{
    title: string
    organization: string
    duration: string | null
    highlights: string[]
  }>
  skills: {
    from_portfolio: string[]
    from_github_bio_and_projects: string[]
    all: string[]
  }
  projects: Project[]
}

const data = raw as PortfolioData

const SKIP = new Set([
  'Sabafatima9',
  'testing_github',
])

function prettyTitle(name: string): string {
  return name
    .replace(/-Week\d+Tech4Edges-?/g, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export type GalleryProject = {
  id: string
  name: string
  title: string
  description: string
  url: string
  language: string | null
  stars: number
  tech: string[]
  color: string
  category: 'AI & ML' | 'Computer Vision' | 'Flutter & Web' | 'Experiments'
  pitch: string
  features: string[]
  featured: boolean
  demoUrl?: string
  /** Name of the inline SVG diagram used by ProjectArtwork. */
  art: string
}

const PALETTE = [
  '#4F46E5', '#0891B2', '#059669', '#D97706', '#DC2626',
  '#7C3AED', '#2563EB', '#DB2777', '#0D9488', '#CA8A04',
]

type CuratedProject = Pick<GalleryProject, 'title' | 'category' | 'pitch' | 'features' | 'art'> & {
  demoUrl?: string
}

const CURATED: Record<string, CuratedProject> = {
  HireLens: {
    title: 'HireLens',
    category: 'AI & ML',
    pitch: 'A Streamlit resume-scoring app that checks CVs against job requirements.',
    features: ['ATS-style resume scoring', 'Instant CV checks', 'Streamlit UI'],
    art: 'hirelens',
  },
  Smart_Community_Safety_App: {
    title: 'Smart Community Safety',
    category: 'Flutter & Web',
    pitch: 'A Flutter and Firebase app for incident reporting, safety maps, and one-tap SOS alerts.',
    features: ['Incident reporting', 'Safety maps', 'One-tap SOS', 'Offline-first'],
    art: 'safety',
  },
  'Air-Gesture-Mouse-Control': {
    title: 'Air Gesture Mouse',
    category: 'Computer Vision',
    pitch: 'An offline webcam tool that turns index-finger movement and a pinch into mouse control.',
    features: ['Air mouse cursor control', 'Pinch-to-click gesture', 'Offline webcam processing', 'Cross-platform (Windows/Linux/macOS)'],
    art: 'gesture',
  },
  'Satellite-Drought-Early-Warning-Detection': {
    title: 'Satellite Drought Watch',
    category: 'AI & ML',
    pitch: 'A Streamlit dashboard that combines satellite and weather signals for drought early warning.',
    features: ['District-level drought risk', 'NDVI + rainfall + temperature', 'ML drought severity prediction', 'Downloadable datasets'],
    art: 'drought',
  },
  'Unified-Holistic-Skeleton-Tracker': {
    title: 'Holistic Skeleton Tracker',
    category: 'Computer Vision',
    pitch: 'A real-time MediaPipe tracker combining body, hand, and face landmarks with posture analytics.',
    features: ['Body + hands + face in one view', 'Joint angle and posture metrics', 'Real-time webcam overlay'],
    art: 'holistic',
  },
  'Driver-Sleep-Drowsiness-Detection-System': {
    title: 'Driver Drowsiness Monitor',
    category: 'Computer Vision',
    pitch: 'A driver-monitoring system using eye, yawn, and head-nod signals with safety alarms.',
    features: ['PERCLOS fatigue scoring', 'Yawn and head-nod detection', 'Audio-visual safety alarms', 'Incident logging'],
    art: 'drowsiness',
  },
}

// The gallery's narrative order is intentional: lead with the hiring tool,
// then move through community, interaction, climate, and safety work.
const FEATURED_ORDER = [
  'HireLens',
  'Smart_Community_Safety_App',
  'Air-Gesture-Mouse-Control',
  'Satellite-Drought-Early-Warning-Detection',
  'Unified-Holistic-Skeleton-Tracker',
  'Driver-Sleep-Drowsiness-Detection-System',
] as const

function inferCategory(project: Project): GalleryProject['category'] {
  const name = project.name.toLowerCase()
  const tech = (project.tech_stack || []).join(' ').toLowerCase()
  const hasAppToken = /(^|[_-])app($|[_-])/.test(name)
  if (
    tech.includes('flutter') ||
    tech.includes('dart') ||
    tech.includes('html') ||
    tech.includes('react') ||
    hasAppToken
  ) return 'Flutter & Web'
  if (tech.includes('mediapipe') || tech.includes('opencv') || name.includes('face') || name.includes('skeleton')) {
    return 'Computer Vision'
  }
  if (tech.includes('streamlit') || tech.includes('scikit') || tech.includes('rag') || name.includes('analytics')) {
    return 'AI & ML'
  }
  return 'Experiments'
}

export const portfolio = data

export const galleryProjects: GalleryProject[] = data.projects
  .filter((p) => {
    if (SKIP.has(p.name)) return false
    if (p.is_stub && !(p.description || p.summary)) return false
    return true
  })
  .map((p, i) => {
    const curated = CURATED[p.name]
    const description = (p.summary || p.description || 'Open-source project on GitHub.').trim()
    return {
      id: p.name,
      name: p.name,
      title: curated?.title || prettyTitle(p.name),
      description,
      url: p.html_url,
      language: p.language,
      stars: p.stars,
      tech: p.tech_stack || (p.language ? [p.language] : []),
      color: PALETTE[i % PALETTE.length],
      category: curated?.category || inferCategory(p),
      pitch: curated?.pitch || description,
      features: curated?.features || p.notable_features || [],
      featured: Boolean(curated),
      ...(curated?.demoUrl ? { demoUrl: curated.demoUrl } : {}),
      art: curated?.art || 'grid',
    }
  })

const sourceProjectNames = new Set(data.projects.map((project) => project.name))
const missingFeaturedProjects = FEATURED_ORDER.filter((name) => !sourceProjectNames.has(name))
if (missingFeaturedProjects.length > 0) {
  throw new Error(`Featured project(s) missing from portfolio.json: ${missingFeaturedProjects.join(', ')}`)
}

export const featuredProjects = FEATURED_ORDER.map((name) => {
  const project = galleryProjects.find((candidate) => candidate.id === name)
  if (!project) throw new Error(`Featured project ${name} was filtered from galleryProjects`)
  return project
})
export const moreProjects = galleryProjects.filter((project) => !project.featured)

export const TAGLINE = '< AI · CV · Flutter />'
export const NAME = data.profile.name
