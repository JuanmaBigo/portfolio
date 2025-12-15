'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export function LenisScroll() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    // Snap to sections when scroll stops
    let scrollTimeout: NodeJS.Timeout
    let isSnapping = false
    
    const handleWheel = () => {
      if (isSnapping) return
      
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        const sections = document.querySelectorAll('section[data-smart-snap="true"]')
        const windowHeight = window.innerHeight
        let closestSection: HTMLElement | null = null
        let closestDistance = Infinity
        
        sections.forEach((section) => {
          const rect = section.getBoundingClientRect()
          const distance = Math.abs(rect.top)
          
          // Find the closest section to the top of viewport
          if (distance < windowHeight * 0.3 && distance < closestDistance) {
            closestDistance = distance
            closestSection = section as HTMLElement
          }
        })
        
        // Snap to closest section if found and within threshold
        if (closestSection && closestDistance > 10) {
          isSnapping = true
          lenis.scrollTo(closestSection, {
            duration: 0.8,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          })
          
          setTimeout(() => {
            isSnapping = false
          }, 1000)
        }
      }, 200)
    }

    // Listen to wheel events
    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('touchend', handleWheel, { passive: true })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchend', handleWheel)
      clearTimeout(scrollTimeout)
    }
  }, [])

  return null
}

