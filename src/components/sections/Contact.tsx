'use client'

import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Instagram, Download } from 'lucide-react'

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/JuanmaBigo' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/juan-mateo-bigoritto-0048651ba/' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/juanmabigo/' },
]

export function Contact() {
  return (
    <section 
      id="contact" 
      data-nav-theme="contact"
      className="min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-32 pb-20"
      style={{ scrollSnapAlign: 'none' }}
    >
      <div className="container mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white">
            Let's Build Something Great
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Open to exciting opportunities, collaborations, and challenging projects. Let's connect and create something amazing together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <motion.a
              href="mailto:juanmateobigoritto@gmail.com"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={24} />
              Get in Touch
            </motion.a>
            
            <motion.a
              href="/assets/JuanMateoBigoritto_SoftwareEngineer_CV.pdf"
              download
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-black transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={24} />
              Download CV
            </motion.a>
          </div>
          
          <div className="flex justify-center gap-6 mt-12">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.label}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}


