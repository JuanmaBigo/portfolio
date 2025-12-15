'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Code2, 
  Database, 
  Cloud, 
  GitBranch, 
  Terminal,
  Boxes,
  Cpu,
  Server,
  FileCode,
  Container,
  Network,
  Workflow,
  Binary,
  Braces,
  PackageSearch,
  Globe
} from 'lucide-react'

const skills = [
  // Core Languages
  { name: 'Golang', icon: Binary, category: 'Languages', color: '#00ADD8' },
  { name: 'Python', icon: FileCode, category: 'Languages', color: '#3776AB' },
  { name: 'JavaScript', icon: Code2, category: 'Languages', color: '#F7DF1E' },
  { name: 'SQL', icon: Database, category: 'Languages', color: '#4479A1' },
  
  // Backend Architecture
  { name: 'Microservices', icon: Boxes, category: 'Architecture', color: '#6366F1' },
  { name: 'Distributed Systems', icon: Network, category: 'Architecture', color: '#8B5CF6' },
  { name: 'Event-Driven', icon: Workflow, category: 'Architecture', color: '#10B981' },
  { name: 'Clean Architecture', icon: Boxes, category: 'Architecture', color: '#EC4899' },
  
  // APIs & Communication
  { name: 'REST APIs', icon: Globe, category: 'APIs', color: '#06B6D4' },
  { name: 'gRPC', icon: Network, category: 'APIs', color: '#22C55E' },
  
  // AI & LLM
  { name: 'AI/LLM Engineering', icon: Cpu, category: 'AI', color: '#8B5CF6' },
  { name: 'Prompt Engineering', icon: Terminal, category: 'AI', color: '#A855F7' },
  
  // Infrastructure & Monitoring
  { name: 'Docker', icon: Container, category: 'DevOps', color: '#2496ED' },
  { name: 'AWS', icon: Cloud, category: 'DevOps', color: '#FF9900' },
  { name: 'Datadog', icon: Cpu, category: 'DevOps', color: '#632CA6' },
  { name: 'NewRelic', icon: Cpu, category: 'DevOps', color: '#008C99' },
  
  // Tools
  { name: 'Git', icon: GitBranch, category: 'Tools', color: '#F05032' },
  { name: 'CI/CD', icon: Workflow, category: 'Tools', color: '#2088FF' },
]

function SkillCard({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const [isActive, setIsActive] = useState(false)

  const handleMouseEnter = () => {
    setIsActive(true)
    // El color persiste por 3 segundos después de salir del hover
    setTimeout(() => {
      setIsActive(false)
    }, 3000)
  }

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.03,
        ease: [0.16, 1, 0.3, 1] 
      }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -4 }}
      onMouseEnter={handleMouseEnter}
    >
      <div 
        className="relative h-32 rounded-xl border flex flex-col items-center justify-center gap-3 px-3 transition-all duration-500"
        style={{
          backgroundColor: isActive ? skill.color : '#F9FAFB',
          borderColor: isActive ? skill.color : '#E5E7EB',
        }}
      >
        <skill.icon 
          className="transition-all duration-500 flex-shrink-0" 
          style={{
            color: isActive ? '#FFFFFF' : '#000000',
            transform: isActive ? 'scale(1.1)' : 'scale(1)'
          }}
          size={32} 
          strokeWidth={1.5}
        />
        <span 
          className="text-xs sm:text-sm font-medium transition-colors duration-500 text-center leading-tight"
          style={{
            color: isActive ? '#FFFFFF' : '#000000'
          }}
        >
          {skill.name}
        </span>
        
        {/* Category tag on hover */}
        <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span 
            className="px-2 py-0.5 text-white text-[10px] rounded-full font-light"
            style={{
              backgroundColor: isActive ? '#000000' : '#000000'
            }}
          >
            {skill.category}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export function Skills() {
  return (
    <section 
      id="skills" 
      data-nav-theme="skills"
      data-smart-snap="true"
      className="h-screen flex items-center justify-center bg-white"
    >
      <div className="container mx-auto px-6 lg:px-20 max-w-7xl w-full pt-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-6 text-center"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-black mb-4 tracking-tight">
            Tech Stack
          </h2>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-light">
            Technologies I use to build scalable and performant systems.
          </p>
        </motion.div>
        
        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto mb-6">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>

        {/* Optional: Highlight section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-block px-6 py-3 border border-gray-200 rounded-full">
            <p className="text-sm text-gray-600 font-light">
              <span className="font-medium text-black">Specialized in:</span> Golang microservices, event-driven architecture & AI/LLM engineering
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


