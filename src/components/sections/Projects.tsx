'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const projects = [
  {
    id: 1,
    title: 'Empire',
    description: 'Luxury car customization and reservation platform inspired by Lamborghini. Features ChatGPT API integration for personalized vehicle recommendations based on company inventory and user preferences.',
    tags: ['React', 'JavaScript', 'ChatGPT API', 'Redux'],
    liveUrl: 'https://empire-project.netlify.app/',
    githubUrl: 'https://github.com/JuanmaBigo/Empire-Front',
    image: '/assets/projects/empire.png'
  },
  {
    id: 2,
    title: 'Minga',
    description: 'Manga and comics reading platform with comprehensive features for manga registration and author management. Built for manga enthusiasts to discover and enjoy their favorite series.',
    tags: ['React', 'JavaScript', 'CSS', 'REST API'],
    liveUrl: 'https://minga-red.netlify.app/',
    githubUrl: 'https://github.com/JuanmaBigo/Minga-Front',
    image: '/assets/projects/minga.png'
  },
  {
    id: 3,
    title: 'Patitas PetShop',
    description: 'E-commerce platform for pet care products including pharmacy items, toys, and accessories. Designed to provide pet owners with everything they need for their pets\' wellbeing.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'E-commerce'],
    liveUrl: 'https://juanmabigo.github.io/PetShop/',
    githubUrl: 'https://github.com/JuanmaBigo/PetShop',
    image: '/assets/projects/petshop.png'
  }
]

export function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1) // 1 for next, -1 for prev

  const nextProject = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const goToProject = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  // Auto-play: change project every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextProject()
    }, 5000) // 5 seconds

    return () => clearInterval(interval)
  }, [currentIndex])

  const currentProject = projects[currentIndex]

  return (
    <section 
      id="projects" 
      data-nav-theme="projects"
      data-smart-snap="true"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center relative overflow-hidden pt-5"
    >
      <div className="container mx-auto px-6 lg:px-20 max-w-7xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 text-center pt-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Selected Work
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative min-h-[500px] md:min-h-[400px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction * 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -300 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.16, 1, 0.3, 1],
                opacity: { duration: 0.4 }
              }}
              className="absolute inset-0 grid md:grid-cols-2 gap-8 md:gap-12 items-center"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src={currentProject.image}
                  alt={currentProject.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* Content */}
              <div className="space-y-6">
                <div>
                  <span className="text-sm font-medium text-gray-500 tracking-wider uppercase">
                    Project {String(currentIndex + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4 tracking-tight">
                    {currentProject.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-400 leading-relaxed font-light">
                    {currentProject.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {currentProject.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 border border-white/20 rounded-full text-sm text-gray-300 font-light"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-4">
                  <motion.a
                    href={currentProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-all text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={16} />
                    <span>View Project</span>
                  </motion.a>
                  <motion.a
                    href={currentProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 border border-white/30 text-white rounded-full font-medium hover:border-white hover:bg-white/10 transition-all text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={16} />
                    <span>Code</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-6 mt-8">
          {/* Previous Arrow */}
          <motion.button
            onClick={prevProject}
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous project"
          >
            <ChevronLeft size={20} />
          </motion.button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToProject(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white w-8' : 'bg-white/30'
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Arrow */}
          <motion.button
            onClick={nextProject}
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next project"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>

        {/* View More Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-6"
        >
          <a
            href="#"
            className="text-sm text-gray-400 hover:text-white transition-colors underline"
          >
            View All Projects
          </a>
        </motion.div>
      </div>
    </section>
  )
}


