import { useEffect } from 'react'

const SELECTOR = '[data-reveal]'
const REVEALED = 'is-revealed'

/**
 * Adds `.is-revealed` to any `[data-reveal]` element when it enters the
 * viewport. One shared IntersectionObserver for the whole page. Elements
 * already in view on load are revealed immediately (no animation), so a
 * mid-page load or a full-page capture never shows blank space. Honors
 * `prefers-reduced-motion` by revealing everything immediately.
 */
export function useReveal() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR))
    if (nodes.length === 0) return

    if (reduce || !('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add(REVEALED))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add(REVEALED)
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    )

    for (const node of nodes) {
      const rect = node.getBoundingClientRect()
      // Already on screen (or above it): reveal now, no hidden flash.
      if (rect.top < window.innerHeight * 0.92) {
        node.classList.add(REVEALED)
      } else {
        observer.observe(node)
      }
    }

    // Safety net: never leave content hidden if the observer misses it.
    const safety = window.setTimeout(() => {
      nodes.forEach((node) => node.classList.add(REVEALED))
    }, 2500)

    return () => {
      observer.disconnect()
      window.clearTimeout(safety)
    }
  }, [])
}
