"use client"

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { motion, useAnimation, useInView } from 'framer-motion'
import { CheckCircle, Code, Cog, Database, GitBranch, Shield } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

interface Agent {
  id: string
  name: string
  role: string
  icon: React.ReactNode
  color: string
  position: { x: number; y: number }
}

interface ParticleProps {
  x: number
  y: number
  delay: number
}

const Particle: React.FC<ParticleProps> = ({ x, y, delay }) => {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
      style={{ left: x, top: y }}
      animate={{
        y: [0, -20, 0],
        opacity: [0, 1, 0],
        scale: [0, 1, 0]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
    />
  )
}

const AgentFlow: React.FC = () => {
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true })
  const controls = useAnimation()

  const agents: Agent[] = [
    {
      id: 'planning',
      name: 'Planning AI',
      role: 'Project Architect',
      icon: <GitBranch className="w-6 h-6" />,
      color: '#FF6B6B',
      position: { x: 50, y: 10 }
    },
    {
      id: 'frontend',
      name: 'Frontend AI',
      role: 'UI/UX Developer',
      icon: <Code className="w-6 h-6" />,
      color: '#00D4FF',
      position: { x: 15, y: 30 }
    },
    {
      id: 'backend',
      name: 'Backend AI',
      role: 'API Developer',
      icon: <Database className="w-6 h-6" />,
      color: '#4ECDC4',
      position: { x: 75, y: 30 }
    },
    {
      id: 'qa',
      name: 'QA AI',
      role: 'Quality Assurance',
      icon: <CheckCircle className="w-6 h-6" />,
      color: '#96CEB4',
      position: { x: 30, y: 55 }
    },
    {
      id: 'security',
      name: 'Security AI',
      role: 'Security Expert',
      icon: <Shield className="w-6 h-6" />,
      color: '#FFEAA7',
      position: { x: 60, y: 55 }
    },
    {
      id: 'devops',
      name: 'DevOps AI',
      role: 'Deployment Specialist',
      icon: <Cog className="w-6 h-6" />,
      color: '#FF6B6B',
      position: { x: 45, y: 80 }
    }
  ]

  // Use deterministic particle positions to avoid hydration mismatch
  const particles = [
    { x: 23.5, y: 89.2, delay: 0.5 },
    { x: 156.8, y: 45.7, delay: 1.2 },
    { x: 298.1, y: 167.3, delay: 2.1 },
    { x: 89.4, y: 234.6, delay: 0.8 },
    { x: 345.2, y: 78.9, delay: 1.7 },
    { x: 67.3, y: 198.4, delay: 2.3 },
    { x: 234.7, y: 123.1, delay: 0.3 },
    { x: 178.9, y: 267.8, delay: 1.9 },
    { x: 312.6, y: 34.5, delay: 0.7 },
    { x: 45.8, y: 156.2, delay: 2.5 },
    { x: 267.4, y: 89.7, delay: 1.1 },
    { x: 123.7, y: 245.3, delay: 0.9 },
    { x: 356.1, y: 134.8, delay: 1.6 },
    { x: 78.3, y: 67.4, delay: 2.2 },
    { x: 198.6, y: 289.1, delay: 0.4 },
    { x: 289.2, y: 178.6, delay: 1.4 },
    { x: 134.5, y: 23.9, delay: 2.7 },
    { x: 56.7, y: 234.2, delay: 0.6 },
    { x: 245.9, y: 145.7, delay: 1.8 },
    { x: 167.3, y: 56.8, delay: 2.9 }
  ]

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const agentVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10
      }
    }
  }

  return (
    <div ref={containerRef} className="relative w-full h-96 mx-auto max-w-md">
      {/* Background particles */}
      {particles.map((particle, index) => (
        <Particle key={index} {...particle} />
      ))}
      
      {/* Flow lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#4ECDC4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#96CEB4" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        
        {/* Connecting lines */}
        <motion.path
          d="M 50 15 Q 35 22 20 35 Q 50 42 80 35 Q 65 48 35 60 Q 50 67 65 60 Q 50 72 50 85"
          stroke="url(#flowGradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {/* Animated flow particles */}
        <motion.circle
          r="1"
          fill="#00D4FF"
          initial={{ opacity: 0 }}
          animate={isInView ? {
            opacity: [0, 1, 0],
            offsetDistance: ["0%", "100%"]
          } : {}}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            offsetPath: "path('M 50 15 Q 35 22 20 35 Q 50 42 80 35 Q 65 48 35 60 Q 50 67 65 60 Q 50 72 50 85')"
          }}
        />
      </svg>

      {/* Agent nodes */}
      <motion.div
        className="relative w-full h-full"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {agents.map((agent) => (
          <motion.div
            key={agent.id}
            className="absolute group"
            style={{
              left: `${agent.position.x}%`,
              top: `${agent.position.y}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: 10
            }}
            variants={agentVariants}
            onMouseEnter={() => setHoveredAgent(agent.id)}
            onMouseLeave={() => setHoveredAgent(null)}
          >
            {/* Large invisible hover area */}
            <div 
              className="absolute inset-0 cursor-pointer"
              style={{
                width: '80px',
                height: '80px',
                transform: 'translate(-50%, -50%)',
                left: '50%',
                top: '50%'
              }}
            />
            
            {/* Tooltip */}
            {hoveredAgent === agent.id && (
              <motion.div
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 backdrop-blur-sm rounded text-white text-xs whitespace-nowrap z-50 pointer-events-none"
                initial={{ opacity: 0, y: 5, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.9 }}
                transition={{ duration: 0.15 }}
              >
                {agent.name}
                <div 
                  className="absolute top-full left-1/2 transform -translate-x-1/2 border-2 border-transparent border-t-black/80"
                />
              </motion.div>
            )}

            {/* Agent content */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {/* Glow effect */}
              <div
                className="absolute inset-0 rounded-full blur-md opacity-60 animate-pulse"
                style={{
                  backgroundColor: agent.color,
                  width: '60px',
                  height: '60px',
                  transform: 'translate(-50%, -50%)',
                  left: '50%',
                  top: '50%'
                }}
              />
              
              {/* Agent node */}
              <div
                className="relative w-12 h-12 rounded-full border-2 flex items-center justify-center text-white backdrop-blur-sm"
                style={{
                  borderColor: agent.color,
                  backgroundColor: `${agent.color}20`
                }}
              >
                {agent.icon}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

const VibeDevSquadHero: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Content container with enhanced z-index */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-12">
          {/* Origin Story Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <Badge 
              variant="outline" 
              className="px-6 py-3 text-sm font-medium bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 transition-all duration-300 shadow-lg"
            >
              <span className="relative z-10">Born from 10,000+ hours of developer frustration</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-sm animate-pulse" />
            </Badge>
          </motion.div>

          {/* Headlines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="block bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent animate-pulse">
                From One Developer
              </span>
              <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                to Unlimited Teams
              </span>
            </h1>
            
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white/90 max-w-4xl mx-auto leading-relaxed">
              <span className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                AI‑Orchestrated Excellence for Every Scale
              </span>
            </h2>
          </motion.div>

          {/* Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-3xl mx-auto space-y-4"
          >
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              Replace entire development teams with AI agents that never sleep, never quit, and scale infinitely. 
              From solo entrepreneurs to enterprise giants.
            </p>
            <p className="text-base md:text-lg text-white/60">
              <span className="text-cyan-400 font-semibold">90% cost reduction</span> • 
              <span className="text-purple-400 font-semibold"> 10x faster delivery</span> • 
              <span className="text-pink-400 font-semibold"> Zero hiring headaches</span>
            </p>
          </motion.div>

          {/* AI Agent Flow Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="w-full max-w-4xl mx-auto"
          >
            <AgentFlow />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Start Your Journey
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="px-8 py-4 text-lg font-semibold bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300"
            >
              Watch Demo
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VibeDevSquadHero 