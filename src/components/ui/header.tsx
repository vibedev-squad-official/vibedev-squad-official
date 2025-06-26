"use client"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion"
import { Briefcase, Home, Mail, Users } from "lucide-react"
import React, { useEffect, useState } from "react"

interface HeaderProps {
  className?: string
}

const VibeDevSquadHeader: React.FC<HeaderProps> = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 100], [0.95, 0.85])
  const headerBlur = useTransform(scrollY, [0, 100], [8, 16])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  const navItems = [
    { name: "Features", href: "#features", icon: Briefcase },
    { name: "Pricing", href: "#pricing", icon: Users },
    { name: "Comparison", href: "#comparison", icon: Home },
    { name: "Testimonials", href: "#testimonials", icon: Mail },
  ]

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full",
        "backdrop-blur-md bg-background/80 border-b border-white/10",
        "transition-all duration-300",
        className
      )}
      role="banner"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo with gradient effects */}
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-violet-500 rounded-lg flex items-center justify-center shadow-lg shadow-sky-500/25">
                <span className="text-white font-bold text-lg" aria-hidden="true">V</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-violet-500 rounded-lg blur-md opacity-50 -z-10" aria-hidden="true" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Vibe DevSquad
              </h1>
              <p className="text-xs text-gray-400">
                AI Development Agency Replacement
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav 
            className="hidden lg:flex items-center space-x-8"
            role="navigation"
            aria-label="Primary navigation"
          >
            <motion.a
              href="#features"
              className="text-gray-300 hover:text-white transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium focus-visible"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Features
            </motion.a>
            <motion.a
              href="#how-it-works"
              className="text-gray-300 hover:text-white transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium focus-visible"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              How it Works
            </motion.a>
            <motion.a
              href="#pricing"
              className="text-gray-300 hover:text-white transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium focus-visible"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Pricing
            </motion.a>
            <motion.a
              href="#testimonials"
              className="text-gray-300 hover:text-white transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium focus-visible"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Testimonials
            </motion.a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <motion.button
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 focus-visible"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              aria-label="Sign in to your account"
            >
              Sign In
            </motion.button>
            <motion.button
              className="px-6 py-2 bg-gradient-to-r from-sky-500 to-violet-500 text-white text-sm font-medium rounded-lg hover:from-sky-600 hover:to-violet-600 transition-all duration-200 shadow-lg shadow-sky-500/25 focus-visible"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              aria-label="Start free trial"
            >
              Get Started Free
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white p-2 rounded-md focus-visible"
              aria-label={isOpen ? "Close mobile menu" : "Open mobile menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">
                {isOpen ? "Close main menu" : "Open main menu"}
              </span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              className="lg:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              role="navigation"
              aria-label="Mobile navigation"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-md border-t border-white/10">
                <a
                  href="#features"
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors duration-200 focus-visible"
                  onClick={() => setIsOpen(false)}
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors duration-200 focus-visible"
                  onClick={() => setIsOpen(false)}
                >
                  How it Works
                </a>
                <a
                  href="#pricing"
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors duration-200 focus-visible"
                  onClick={() => setIsOpen(false)}
                >
                  Pricing
                </a>
                <a
                  href="#testimonials"
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors duration-200 focus-visible"
                  onClick={() => setIsOpen(false)}
                >
                  Testimonials
                </a>
                <div className="pt-4 pb-2 border-t border-white/10">
                  <button 
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors duration-200 focus-visible"
                    aria-label="Sign in to your account"
                  >
                    Sign In
                  </button>
                  <button 
                    className="block w-full mt-2 px-3 py-2 bg-gradient-to-r from-sky-500 to-violet-500 text-white text-base font-medium rounded-md hover:from-sky-600 hover:to-violet-600 transition-all duration-200 shadow-lg shadow-sky-500/25 focus-visible"
                    aria-label="Start free trial"
                  >
                    Get Started Free
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default VibeDevSquadHeader 