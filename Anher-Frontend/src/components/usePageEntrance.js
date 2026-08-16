import { useLayoutEffect } from 'react'
import gsap from 'gsap'

export const usePageEntrance = (scopeRef, dependencies = []) => {
  useLayoutEffect(() => {
    const scope = scopeRef.current
    if (!scope) return undefined

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const elements = scope.querySelectorAll('[data-page-reveal]')

    if (reducedMotion) {
      gsap.set(elements, { clearProps: 'all' })
      return undefined
    }

    const context = gsap.context(() => {
      gsap.from(elements, {
        y: 24,
        opacity: 0,
        duration: .7,
        stagger: .075,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      })
    }, scope)

    return () => context.revert()
    // Callers pass only stable values that should replay the entrance.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}
