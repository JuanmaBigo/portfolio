'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

// Definir temas para cada sección
const sectionThemes = {
  hero: {
    navBg: 'rgba(255, 255, 255, 0.3)',
    textColor: 'text-gray-900',
    buttonBg: 'bg-gray-900',
    buttonText: 'text-white',
    borderColor: 'border-gray-900/[0.06]',
    hoverColor: 'hover:text-gray-900/70'
  },
  about: {
    navBg: 'rgba(255, 255, 255, 0.3)',
    textColor: 'text-gray-900',
    buttonBg: 'bg-gray-900',
    buttonText: 'text-white',
    borderColor: 'border-gray-900/[0.06]',
    hoverColor: 'hover:text-gray-900/70'
  },
  projects: {
    navBg: 'rgba(255, 255, 255, 0.3)',
    textColor: 'text-white',
    buttonBg: 'bg-white',
    buttonText: 'text-black',
    borderColor: 'border-white/[0.08]',
    hoverColor: 'hover:text-white/80'
  },
  skills: {
    navBg: 'rgba(255, 255, 255, 0.3)',
    textColor: 'text-gray-900',
    buttonBg: 'bg-gray-900',
    buttonText: 'text-white',
    borderColor: 'border-gray-900/[0.06]',
    hoverColor: 'hover:text-gray-900/70'
  },
  contact: {
    navBg: 'rgba(255, 255, 255, 0.3)',
    textColor: 'text-white',
    buttonBg: 'bg-white',
    buttonText: 'text-black',
    borderColor: 'border-white/[0.08]',
    hoverColor: 'hover:text-white/80'
  }
}

const navLinks = [
  { href: '#hero', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' }
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentSection, setCurrentSection] = useState<keyof typeof sectionThemes>('hero')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Detectar dirección del scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY < 50) {
        // Si estamos arriba del todo, siempre expandido
        setIsScrolled(false)
      } else if (currentScrollY < lastScrollY) {
        // Scrolling UP - expandir
        setIsScrolled(false)
      } else if (currentScrollY > lastScrollY) {
        // Scrolling DOWN - contraer
        setIsScrolled(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Detectar sección visible (color adaptativo)
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[data-nav-theme]')
      const scrollPosition = window.scrollY + 40 // offset para cambiar cuando ya estamos dentro de la sección
      
      let currentActive: Element | null = null
      
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = (section as HTMLElement).offsetHeight
        
        // Si el scroll está dentro de esta sección
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentActive = section
        }
      })
      
      if (currentActive) {
        const theme = (currentActive as Element).getAttribute('data-nav-theme') as keyof typeof sectionThemes
        if (theme && sectionThemes[theme]) {
          setCurrentSection(theme)
        }
      }
    }
    
    // Ejecutar una vez al cargar
    handleScroll()
    
    // Ejecutar en cada scroll
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Cerrar mobile menu al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (mobileMenuOpen) setMobileMenuOpen(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mobileMenuOpen])

  // Usar tema adaptativo según la sección actual
  const theme = sectionThemes[currentSection]

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    
    if (element) {
      // Scroll a la sección directamente, el padding de la sección manejará el offset
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 px-4 lg:px-6 pt-4 lg:pt-6 flex justify-center">
        <motion.nav
          className={`
            h-[56px]
            transition-all duration-300 ease-out
            rounded-full
            overflow-hidden
            ${theme.textColor}
          `}
          style={{
            backgroundColor: theme.navBg,
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: `
              inset 0 1px 0 0 rgba(255, 255, 255, 0.2),
              inset 0 -1px 0 0 rgba(255, 255, 255, 0.1),
              0 8px 32px 0 rgba(255, 255, 255, 0.12),
              0 2px 8px 0 rgba(0, 0, 0, 0.08)
            `
          }}
          animate={{
            width: isScrolled ? '428px' : '100%',
            maxWidth: isScrolled ? '428px' : '1283px'
          }}
          transition={{ 
            duration: isScrolled ? 0.5 : 1,  // Más rápido al contraer
            ease: [0.16, 1, 0.3, 1] 
          }}
          initial={{ y: 0, opacity: 1 }}
        >
          <div className="px-3 py-3 h-full w-full">
          <div className="flex items-center justify-between h-full gap-8">
            {/* Logo - Estilo Until Labs */}
            <motion.a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* macOS-style window controls */}
              <div 
                className="flex items-center gap-1.5 px-3 py-2 rounded-full"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.18)'
                }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              
              {/* Logo text */}
              <span className={`text-lg font-semibold tracking-tight ${theme.textColor} transition-colors duration-300`}>
                bigo
              </span>
            </motion.a>

            {/* Desktop Navigation - Se oculta cuando scrolleas hacia abajo */}
            <AnimatePresence mode="popLayout">
              {!isScrolled && (
                <motion.div
                  className="hidden md:flex items-center flex-1 justify-center gap-1"
                  initial={{ opacity: 0, position: 'absolute' }}
                  animate={{ 
                    opacity: 1,
                    position: 'relative',
                    transition: { 
                      opacity: { duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.15 },
                      position: { delay: 0.15 }
                    }
                  }}
                  exit={{ 
                    opacity: 0,
                    transition: { 
                      duration: 0.1,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0
                    }
                  }}
                >
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`
                        px-4 py-2 rounded-lg text-sm font-medium
                        transition-all duration-300
                        ${theme.hoverColor}
                        ${theme.textColor}
                        hover:bg-white/5
                      `}
                    >
                      {link.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Spacer cuando está contraído */}
            {isScrolled && <div className="flex-1" />}

            {/* CTA Button - Estilo Until Labs */}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className={`
                hidden md:flex items-center justify-center
                px-6 py-2.5 rounded-full font-medium text-sm
                ${theme.buttonBg} ${theme.buttonText}
                shadow-lg
                whitespace-nowrap flex-shrink-0
                transition-colors duration-300
              `}
              style={{ minWidth: '120px' }}
            >
              Contact Me
            </a>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={`
              fixed inset-0 z-40 md:hidden
              backdrop-blur-xl
              ${theme.textColor}
            `}
            style={{
              backgroundColor: theme.navBg,
              paddingTop: '76px'
            }}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="container mx-auto px-6 py-8">
              <div className="flex flex-col space-y-6">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-3xl font-semibold hover:opacity-70 transition-opacity"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                
                <motion.a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, '#contact')}
                  className={`
                    mt-8 px-8 py-4 rounded-full text-center font-semibold text-lg
                    ${theme.buttonBg} ${theme.buttonText}
                    hover:opacity-90 transition-opacity
                  `}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  Let&apos;s Talk
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

