import { useEffect, useRef } from 'react'

const activeLocks = new Set()

const resetScrollStyles = () => {
  document.documentElement.style.removeProperty('overflow')
  document.documentElement.style.removeProperty('overflow-y')
  document.body.style.removeProperty('overflow')
  document.body.style.removeProperty('overflow-y')
  document.body.style.removeProperty('touch-action')
}

const syncScrollLock = () => {
  resetScrollStyles()
  if (!activeLocks.size) return
  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
  document.body.style.touchAction = 'none'
}

export const clearPageScrollLocks = () => {
  activeLocks.clear()
  resetScrollStyles()
}

export const usePageScrollLock = (locked) => {
  const tokenRef = useRef(Symbol('page-scroll-lock'))

  useEffect(() => {
    const token = tokenRef.current
    if (!locked) {
      activeLocks.delete(token)
      syncScrollLock()
      return undefined
    }

    activeLocks.add(token)
    syncScrollLock()

    return () => {
      activeLocks.delete(token)
      syncScrollLock()
    }
  }, [locked])
}
