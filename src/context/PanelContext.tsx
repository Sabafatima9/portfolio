import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { GalleryProject } from '../data/content'

export type PanelContent =
  | { kind: 'project'; project: GalleryProject }
  | { kind: 'about' }
  | { kind: 'contact' }
  | null

type PanelContextValue = {
  panel: PanelContent
  openProject: (project: GalleryProject) => void
  openAbout: () => void
  openContact: () => void
  closePanel: () => void
}

const PanelContext = createContext<PanelContextValue | null>(null)

export function PanelProvider({ children }: { children: ReactNode }) {
  const [panel, setPanel] = useState<PanelContent>(null)

  const openProject = useCallback((project: GalleryProject) => {
    setPanel({ kind: 'project', project })
  }, [])
  const openAbout = useCallback(() => setPanel({ kind: 'about' }), [])
  const openContact = useCallback(() => setPanel({ kind: 'contact' }), [])
  const closePanel = useCallback(() => setPanel(null), [])

  const value = useMemo(
    () => ({ panel, openProject, openAbout, openContact, closePanel }),
    [panel, openProject, openAbout, openContact, closePanel],
  )

  return <PanelContext.Provider value={value}>{children}</PanelContext.Provider>
}

export function usePanel() {
  const ctx = useContext(PanelContext)
  if (!ctx) throw new Error('usePanel must be used within PanelProvider')
  return ctx
}

