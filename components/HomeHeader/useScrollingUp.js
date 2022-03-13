import { useEffect, useState } from 'react'
import { off, on } from './utils'
/**
 * useScrollingUp
 * @returns {boolean}
 */
const useScrollingUp = () => {

  const [scrollingUp, setScrollingUp] = useState(false)
  const handleScroll = () => {
    const currScroll = window.pageYOffset
    const isScrolled = currScroll == 0
    setScrollingUp(isScrolled)
  }
  useEffect(() => {
    on(window, 'scroll', handleScroll, { passive: true })
    return () => {
      off(window, 'scroll', handleScroll, { passive: true })
    }
  }, [])
  return scrollingUp
}

export default useScrollingUp
