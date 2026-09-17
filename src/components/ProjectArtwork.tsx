import type { ReactNode } from 'react'
import type { GalleryProject } from '../data/content'

type Props = {
  project: GalleryProject
  className?: string
}

const lineProps = {
  fill: 'none',
  stroke: 'var(--ink)',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  strokeWidth: 2,
}

function Base({ children }: { children: ReactNode }) {
  return (
    <>
      <rect width="640" height="360" rx="18" fill="var(--paper)" />
      <path d="M0 288h640" stroke="var(--border-soft)" strokeWidth="2" />
      <g opacity=".28" fill="var(--muted)">
        <circle cx="28" cy="28" r="3" />
        <circle cx="42" cy="28" r="3" />
        <circle cx="56" cy="28" r="3" />
      </g>
      {children}
    </>
  )
}

function HireLensArt() {
  return <Base>
    <rect x="88" y="72" width="286" height="174" rx="8" fill="var(--plaque)" stroke="var(--border-soft)" strokeWidth="3" />
    <rect x="112" y="96" width="94" height="11" rx="5" fill="var(--accent)" />
    <rect x="112" y="130" width="210" height="8" rx="4" fill="var(--muted)" opacity=".55" />
    <rect x="112" y="151" width="184" height="8" rx="4" fill="var(--muted)" opacity=".35" />
    <rect x="112" y="184" width="128" height="8" rx="4" fill="var(--muted)" opacity=".35" />
    <circle cx="460" cy="152" r="68" fill="var(--plaque)" stroke="var(--accent)" strokeWidth="9" strokeDasharray="310 120" transform="rotate(-35 460 152)" />
    <text x="460" y="160" textAnchor="middle" fill="var(--ink)" fontSize="30" fontWeight="700">ATS</text>
    <path d="M405 246h110" {...lineProps} stroke="var(--accent)" />
    <text x="460" y="270" textAnchor="middle" fill="var(--muted)" fontSize="16">resume check</text>
  </Base>
}

function SafetyArt() {
  return <Base>
    <path d="M72 96c62-36 127 18 190-12 65-31 109 28 172 5 44-16 86-9 133 25v174H72Z" fill="var(--plaque)" stroke="var(--border-soft)" strokeWidth="3" />
    <path d="M116 196c48-48 93 25 143-19 41-36 87 14 122-18 32-29 62-8 103-34" {...lineProps} stroke="var(--accent)" strokeWidth="5" />
    <circle cx="267" cy="176" r="12" fill="var(--accent)" />
    <path d="M267 189v25" {...lineProps} stroke="var(--accent)" />
    <path d="M472 124c0 24-34 46-34 46s-34-22-34-46a34 34 0 1 1 68 0Z" fill="var(--accent)" opacity=".85" />
    <circle cx="438" cy="123" r="10" fill="var(--paper)" />
    <circle cx="151" cy="240" r="27" fill="var(--paper)" stroke="var(--ink)" strokeWidth="3" />
    <path d="M151 225v30M136 240h30" {...lineProps} stroke="var(--accent)" strokeWidth="4" />
    <text x="151" y="278" textAnchor="middle" fill="var(--muted)" fontSize="14">SOS</text>
  </Base>
}

function GestureArt() {
  return <Base>
    <rect x="86" y="75" width="270" height="174" rx="12" fill="var(--plaque)" stroke="var(--border-soft)" strokeWidth="3" />
    <circle cx="218" cy="161" r="48" fill="none" stroke="var(--accent)" strokeWidth="3" strokeDasharray="8 10" />
    <circle cx="218" cy="161" r="9" fill="var(--accent)" />
    <path d="M218 114v-19M218 208v19M171 161h-19M265 161h19" {...lineProps} stroke="var(--accent)" />
    <path d="M438 205c-20-5-32-18-34-38l-6-55c-1-8 11-11 14-2l8 33V91c0-9 13-9 14 0l4 48V78c0-9 14-9 14 0l2 61V93c1-9 14-8 14 1l1 69c0 25-12 47-31 48Z" fill="var(--plaque)" stroke="var(--ink)" strokeWidth="3" />
    <circle cx="485" cy="98" r="10" fill="var(--accent)" />
    <path d="M484 98l34-26" {...lineProps} stroke="var(--accent)" />
    <text x="470" y="252" textAnchor="middle" fill="var(--muted)" fontSize="15">pinch → click</text>
  </Base>
}

function DroughtArt() {
  return <Base>
    <circle cx="492" cy="97" r="33" fill="var(--accent)" opacity=".8" />
    <g stroke="var(--accent)" strokeWidth="3" opacity=".65">
      <path d="M492 50v-18M492 144v18M445 97h-18M539 97h18M459 64l-13-13M525 130l13 13M525 64l13-13M459 130l-13 13" />
    </g>
    <path d="M76 244c78-42 142-40 211-7 54 26 101 17 158-19l47 66H76Z" fill="var(--plaque)" stroke="var(--border-soft)" strokeWidth="3" />
    <path d="M118 252c28-21 54-21 80 0m12-10c31-24 58-24 87 0m17-7c30-19 57-17 83 1" {...lineProps} stroke="var(--accent)" strokeWidth="4" />
    <path d="M207 97 287 75l27 37-80 22z" fill="var(--plaque)" stroke="var(--ink)" strokeWidth="3" />
    <path d="m287 75 25-21 28 37-26 21z" fill="var(--accent)" opacity=".8" />
    <path d="m245 115-8 44m48-60-8 41" {...lineProps} />
    <text x="270" y="194" textAnchor="middle" fill="var(--muted)" fontSize="15">NDVI + weather</text>
  </Base>
}

function HolisticArt() {
  return <Base>
    <g fill="var(--plaque)" stroke="var(--accent)" strokeWidth="3">
      <circle cx="319" cy="88" r="27" />
      <path d="M319 117v87M263 150l56 24 56-24M279 294l40-90 40 90" fill="none" />
      <path d="M263 150 220 116m155 34 43-34M279 294l-31 33m111-33 31 33" fill="none" />
    </g>
    <g fill="var(--accent)">
      <circle cx="319" cy="88" r="5" /><circle cx="263" cy="150" r="5" /><circle cx="375" cy="150" r="5" />
      <circle cx="319" cy="174" r="5" /><circle cx="279" cy="294" r="5" /><circle cx="359" cy="294" r="5" />
      <circle cx="220" cy="116" r="5" /><circle cx="418" cy="116" r="5" />
    </g>
    <path d="M96 105h84M96 126h55" {...lineProps} stroke="var(--muted)" />
    <text x="138" y="174" textAnchor="middle" fill="var(--muted)" fontSize="15">body · hands · face</text>
  </Base>
}

function DrowsinessArt() {
  return <Base>
    <path d="M102 225v-47c0-38 30-67 68-67h180c42 0 75 28 88 67l13 47Z" fill="var(--plaque)" stroke="var(--ink)" strokeWidth="3" />
    <path d="M130 173h76l-14-39h-30c-16 0-27 18-32 39Zm112 0h167c-7-23-22-39-47-39H242Z" fill="var(--paper)" stroke="var(--border-soft)" strokeWidth="3" />
    <circle cx="157" cy="230" r="24" fill="var(--paper)" stroke="var(--accent)" strokeWidth="5" />
    <circle cx="426" cy="230" r="24" fill="var(--paper)" stroke="var(--accent)" strokeWidth="5" />
    <path d="M495 102c-29 9-42 25-43 47 24 8 44 3 58-16" fill="none" stroke="var(--accent)" strokeWidth="6" />
    <path d="M468 88c18 10 24 23 20 39" {...lineProps} stroke="var(--accent)" />
    <text x="319" y="300" textAnchor="middle" fill="var(--muted)" fontSize="15">eyes · yawn · head nod</text>
  </Base>
}

function GridArt() {
  return <Base>
    <g stroke="var(--border-soft)" strokeWidth="2" opacity=".8">
      <path d="M88 92h464M88 142h464M88 192h464M88 242h464M138 72v190M188 72v190M238 72v190M288 72v190M338 72v190M388 72v190M438 72v190M488 72v190" />
    </g>
    <path d="m145 222 70-75 53 42 85-86 86 101" fill="none" stroke="var(--accent)" strokeWidth="5" />
    <circle cx="215" cy="147" r="7" fill="var(--accent)" /><circle cx="300" cy="189" r="7" fill="var(--accent)" /><circle cx="385" cy="103" r="7" fill="var(--accent)" />
  </Base>
}

export function ProjectArtwork({ project, className }: Props) {
  const art = project.art
  return (
    <svg
      className={className}
      viewBox="0 0 640 360"
      role="img"
      aria-label={`${project.title} illustration`}
      data-art="illustration"
      focusable="false"
    >
      {art === 'hirelens' && <HireLensArt />}
      {art === 'safety' && <SafetyArt />}
      {art === 'gesture' && <GestureArt />}
      {art === 'drought' && <DroughtArt />}
      {art === 'holistic' && <HolisticArt />}
      {art === 'drowsiness' && <DrowsinessArt />}
      {!['hirelens', 'safety', 'gesture', 'drought', 'holistic', 'drowsiness'].includes(art) && <GridArt />}
    </svg>
  )
}
