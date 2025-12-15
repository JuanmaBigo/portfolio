'use client'

import { motion } from 'framer-motion'
import { Download, Linkedin, Github, Instagram } from 'lucide-react'
import { useEffect, useState } from 'react'

const roles = [
  'Software Developer', 
  'Backend Engineer',
  'Problem Solver'
]

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section 
      id="hero" 
      data-nav-theme="hero"
      className="h-screen flex items-center justify-center bg-white relative pt-16"
      style={{ scrollSnapAlign: 'none' }}
    >
      <div className="container mx-auto px-6 lg:px-20 max-w-7xl">
        
        {/* Main Content - Centered */}
        <div className="text-center max-w-5xl mx-auto">
          
          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4"
          >
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold text-black tracking-tight leading-none mb-6">
              bigo
            </h1>
            
            {/* Rotating role with fade transition */}
            <div className="relative h-14 md:h-16 overflow-hidden">
              {roles.map((role, index) => (
                <motion.div
                  key={role}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: currentRole === index ? 1 : 0,
                    y: currentRole === index ? 0 : 20
                  }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-400">
                    {role}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Description */}
          <motion.p 
            className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Building high-performance scalable systems and AI-powered solutions at Mercado Libre. Specialized in Golang microservices and distributed architectures.
          </motion.p>
          
          {/* CTA */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="#projects"
              className="px-7 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all text-base"
            >
              View My Work
            </a>
            <a
              href="/assets/JuanMateoBigoritto_SoftwareEngineer_CV.pdf"
              download
              className="px-7 py-3 border border-black text-black rounded-full font-medium hover:bg-black hover:text-white transition-all text-base inline-flex items-center gap-2 group"
            >
              <Download size={16} className="group-hover:animate-bounce" />
              Download CV
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center gap-5 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="https://www.linkedin.com/in/juan-mateo-bigoritto-0048651ba/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-black hover:text-black hover:scale-110 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://github.com/JuanmaBigo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-black hover:text-black hover:scale-110 transition-all duration-300"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.instagram.com/juanmabigo/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-black hover:text-black hover:scale-110 transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
          </motion.div>

          {/* Stats - Clean & Minimal */}
          <motion.div
            className="grid grid-cols-3 gap-6 md:gap-12 max-w-2xl mx-auto pt-8 border-t border-gray-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <StatCard number="2+" label="Years Experience" />
            <StatCard number="10+" label="Projects" />
            <StatCard number="15+" label="Technologies" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Stat Card Component - Minimal
function StatCard({ number, label }: { number: string; label: string }) {
  const [count, setCount] = useState(0)
  const targetNumber = parseInt(number.replace(/\D/g, ''))
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (hasAnimated) return
    
    const duration = 2000
    const steps = 60
    const increment = targetNumber / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= targetNumber) {
        setCount(targetNumber)
        setHasAnimated(true)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [targetNumber, hasAnimated])

  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-semibold text-black mb-1 tracking-tight">
        {count}{number.includes('+') ? '+' : ''}
      </div>
      <div className="text-xs md:text-sm text-gray-500 font-light">{label}</div>
    </div>
  )
}


