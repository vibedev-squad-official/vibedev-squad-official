"use client"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Menu, Sparkles, X, Zap } from "lucide-react"
import React, { useEffect, useState } from "react"

interface HeaderProps {
  className?: string
}

const VibeDevSquadHeader: React.FC<HeaderProps> = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
    { name: "Features", href: "#features" },
    { name: "How it Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "Testimonials", href: "#testimonials" },
  ]

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500",
          scrolled 
            ? "bg-black/40 backdrop-blur-2xl border-b border-purple-500/30 shadow-2xl shadow-purple-500/10" 
            : "bg-transparent backdrop-blur-sm border-b border-purple-500/10",
          className
        )}
        role="banner"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo Section */}
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="relative group">
                {/* Logo Background with Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-800 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                
                {/* Logo Container */}
                <div className="relative w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-900 rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="hidden sm:block">
                <div className="text-2xl font-bold bg-gradient-to-r from-white via-purple-100 to-purple-200 bg-clip-text text-transparent">
                  Vibe DevSquad
                </div>
                <div className="text-xs text-purple-300/80 font-medium tracking-wide">
                  AI Development Revolution
                </div>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav 
              className="hidden lg:flex items-center space-x-8"
              role="navigation"
              aria-label="Primary navigation"
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="relative group px-4 py-2 text-white/80 hover:text-white transition-all duration-300 font-medium"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <span className="relative z-10">{item.name}</span>
                  
                  {/* Hover Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Bottom Border Animation */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-violet-400 group-hover:w-full transition-all duration-300" />
                </motion.button>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <motion.button
                onClick={() => handleNavClick('#pricing')}
                className="px-6 py-2.5 text-white/80 hover:text-white font-medium transition-all duration-300 hover:scale-105"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Sign In
              </motion.button>
              
              <motion.button
                onClick={() => {
                  const element = document.querySelector('#final-cta-heading');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group relative px-6 py-2.5 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {/* Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-violet-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                
                <span className="relative z-10 flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className="relative w-10 h-10 rounded-lg bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 flex items-center justify-center text-white hover:bg-purple-500/20 transition-all duration-300"
                aria-label={isOpen ? "Close mobile menu" : "Open mobile menu"}
                aria-expanded={isOpen}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-black/90 backdrop-blur-2xl border-l border-purple-500/20 z-50 lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-6 border-b border-purple-500/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-900 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-bold text-white">Vibe DevSquad</span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-white hover:bg-purple-500/20 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 px-6 py-8">
                  <nav className="space-y-4">
                    {navItems.map((item, index) => (
                      <motion.button
                        key={item.name}
                        onClick={() => handleNavClick(item.href)}
                        className="w-full text-left p-4 rounded-xl text-white/80 hover:text-white hover:bg-purple-500/10 transition-all duration-300 font-medium"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <span className="flex items-center justify-between">
                          {item.name}
                          <ArrowRight className="w-4 h-4 opacity-50" />
                        </span>
                      </motion.button>
                    ))}
                  </nav>
                </div>

                {/* Mobile CTA Buttons */}
                <div className="p-6 border-t border-purple-500/20 space-y-4">
                  <button 
                    onClick={() => handleNavClick('#pricing')}
                    className="w-full p-4 text-white/80 hover:text-white hover:bg-purple-500/10 rounded-xl transition-all duration-300 font-medium"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => {
                      const element = document.querySelector('#final-cta-heading');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                      setIsOpen(false);
                    }}
                    className="w-full p-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Get Started Free
                      <Zap className="w-4 h-4" />
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default VibeDevSquadHeader 