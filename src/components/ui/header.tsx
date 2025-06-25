"use client"

import { cn } from "@/lib/utils"
import { motion, useScroll, useTransform } from "framer-motion"
import { Briefcase, Home, Mail, Menu, Users, X } from "lucide-react"
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

  const toggleMenu = () => setIsOpen(!isOpen)

  const navItems = [
    { name: "Features", href: "#features", icon: Briefcase },
    { name: "Pricing", href: "#pricing", icon: Users },
    { name: "Comparison", href: "#comparison", icon: Home },
    { name: "Testimonials", href: "#testimonials", icon: Mail },
  ]

  return (
    <>
      <motion.header
        className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", className)}
        style={{
          opacity: headerOpacity,
          backdropFilter: `blur(${headerBlur}px)`,
          WebkitBackdropFilter: `blur(${headerBlur}px)`,
        }}
      >
        <div
          className={`relative transition-all duration-300 ${
            scrolled
              ? "bg-slate-900/20 border-b border-slate-800/20"
              : "bg-slate-900/10"
          }`}
          style={{
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          {/* Glassmorphism overlay with vibe colors */}
          <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 via-transparent to-violet-500/5 pointer-events-none" />
          
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
                    <span className="text-white font-bold text-lg">V</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-violet-500 rounded-lg blur-md opacity-50 -z-10" />
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
              <nav className="hidden lg:flex items-center space-x-1">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 rounded-lg group"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="relative z-10 flex items-center space-x-2">
                      <item.icon size={16} />
                      <span>{item.name}</span>
                    </span>
                    <div className="absolute inset-0 bg-sky-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-violet-500/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10" />
                  </motion.a>
                ))}
              </nav>

              {/* CTA Buttons */}
              <motion.div
                className="hidden lg:flex items-center space-x-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <button className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200">
                  Sign In
                </button>
                <button className="relative px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 rounded-full transition-all duration-200 overflow-hidden group shadow-lg shadow-sky-500/25">
                  <span className="relative z-10">Start Free Trial</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <div className="absolute inset-0 bg-sky-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10" />
                </button>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                className="lg:hidden p-2 text-gray-300 hover:text-sky-500 transition-colors duration-200 rounded-lg"
                onClick={toggleMenu}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle mobile menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`lg:hidden absolute top-full left-0 right-0 transition-all duration-300 ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          style={{
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          <div className="bg-slate-900/20 border-b border-slate-800/20 mx-4 mt-2 rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-sky-500/5 to-violet-500/5 pointer-events-none" />
            <nav className="relative p-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-sky-500/10 rounded-lg transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </motion.a>
              ))}
              <motion.div
                className="pt-4 border-t border-slate-800/20 space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 10 }}
                transition={{ duration: 0.2, delay: 0.2 }}
              >
                <button className="w-full px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-slate-800/20 rounded-lg transition-colors duration-200">
                  Sign In
                </button>
                <button className="w-full px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 rounded-lg transition-colors duration-200 shadow-lg shadow-sky-500/25">
                  Start Free Trial
                </button>
              </motion.div>
            </nav>
          </div>
        </motion.div>
      </motion.header>
    </>
  )
}

export default VibeDevSquadHeader 