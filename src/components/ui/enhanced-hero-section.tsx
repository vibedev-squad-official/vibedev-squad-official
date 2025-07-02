"use client"

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { motion, useAnimation, useInView } from 'framer-motion'
import { CheckCircle, Code, Cog, Database, GitBranch, Shield, ArrowRight, AlertCircle, DollarSign } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

// Keep the existing Agent interfaces and components
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
      position: { x: 25, y: 55 }
    },
    {
      id: 'security',
      name: 'Security AI',
      role: 'Security Expert',
      icon: <Shield className="w-6 h-6" />,
      color: '#FFEAA7',
      position: { x: 55, y: 55 }
    },
    {
      id: 'devops',
      name: 'DevOps AI',
      role: 'Deployment Specialist',
      icon: <Cog className="w-6 h-6" />,
      color: '#FF6B6B',
      position: { x: 40, y: 80 }
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
              className="absolute inset-0 cursor-pointer touch-target"
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
                className={cn(
                  "relative w-12 h-12 rounded-full border-2 flex items-center justify-center text-white backdrop-blur-sm",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
                )}
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

const EnhancedVibeDevSquadHero: React.FC = () => {
  return (
    <section 
      className="min-h-screen relative overflow-hidden flex items-center justify-center"
      aria-label="Hero section"
    >
      {/* Content container with enhanced z-index */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-12" role="main" id="main-content">
          {/* Urgency Badge with Live Count */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <Badge 
              variant="outline" 
              className="px-6 py-3 text-sm font-medium bg-red-500/10 backdrop-blur-md border-red-400/30 text-white hover:bg-red-500/20 transition-all duration-300 shadow-lg [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]"
              role="status"
              aria-live="polite"
            >
              <AlertCircle className="w-4 h-4 mr-2 text-red-400" aria-hidden="true" />
              <span className="relative z-10">Join 2,500+ teams who switched this month</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-sm animate-pulse" aria-hidden="true" />
            </Badge>
          </motion.div>

          {/* Conversion-Optimized Headlines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="block bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent animate-pulse [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                Stop Paying $30K/Month
              </span>
              <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                for What AI Can Do for $99
              </span>
            </h1>
            
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white/90 max-w-4xl mx-auto leading-relaxed">
              <span className="bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                Replace Your Expensive Dev Team with AI Agents Today
              </span>
            </h2>
          </motion.div>

          {/* Value Proposition with Specific Outcomes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-3xl mx-auto space-y-4"
          >
            <p className="text-lg md:text-xl text-white/80 leading-relaxed [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
              Get a full development team of AI agents that ship production-ready code 24/7. 
              No hiring, no management, no overhead – just results.
            </p>
            
            {/* Specific Savings Showcase */}
            <div className="flex flex-wrap justify-center gap-6 py-4">
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <DollarSign className="w-6 h-6 text-green-400" />
                <span className="text-green-400 font-bold text-xl [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">Save $360,000/year</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <CheckCircle className="w-6 h-6 text-cyan-400" />
                <span className="text-cyan-400 font-bold text-xl [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">Ship 10x Faster</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <Shield className="w-6 h-6 text-purple-400" />
                <span className="text-purple-400 font-bold text-xl [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">Zero Risk</span>
              </motion.div>
            </div>

            {/* Risk Reversal */}
            <p className="text-base md:text-lg text-white/60 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
              <span className="text-white font-semibold">No credit card required</span> • 
              <span className="text-white font-semibold"> Cancel anytime</span> • 
              <span className="text-white font-semibold"> 30-day money-back guarantee</span>
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

          {/* Conversion-Optimized CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            role="group"
            aria-label="Call to action buttons"
          >
            <Button 
              size="lg" 
              className={cn(
                "px-8 py-6 text-lg font-bold bg-gradient-to-r from-green-500 to-emerald-600",
                "hover:from-green-600 hover:to-emerald-700 text-white border-0",
                "shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105",
                "touch-target focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
              )}
              aria-label="Get My AI Development Team Free - Start your free trial"
            >
              <span className="flex items-center gap-2">
                Get My AI Development Team Free
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </span>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className={cn(
                "px-8 py-6 text-lg font-semibold bg-white/10 backdrop-blur-md",
                "border-white/20 text-white hover:bg-white/20 hover:border-white/30",
                "transition-all duration-300 touch-target",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
              )}
              aria-label="Replace My $30K Agency Today - Learn more about our services"
            >
              Replace My $30K Agency Today
            </Button>
          </motion.div>

          {/* Enhanced Real Impact Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="pt-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                Proven Results from Real Companies
              </h2>
              <p className="text-white/60 text-lg [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                Join 2,500+ companies already saving with Vibe DevSquad
              </p>
            </div>
            
            {/* Enhanced Metrics Grid with Specific Outcomes */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto" role="region" aria-label="Company performance metrics">
              {[
                { 
                  value: "$50M+", 
                  label: "Saved Across All Customers", 
                  color: "from-green-400 to-emerald-500",
                  subtext: "Average $300K per company"
                },
                { 
                  value: "99.9%", 
                  label: "Uptime Guarantee", 
                  color: "from-cyan-400 to-blue-500",
                  subtext: "24/7 AI development"
                },
                { 
                  value: "10x", 
                  label: "Faster Time to Market", 
                  color: "from-purple-400 to-pink-500",
                  subtext: "Ship in days, not months"
                },
                { 
                  value: "2,500+", 
                  label: "Teams Already Switched", 
                  color: "from-orange-400 to-red-500",
                  subtext: "Growing 40% monthly"
                }
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center group hover:bg-white/10 transition-all duration-300"
                >
                  <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent mb-2 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]`}>
                    {metric.value}
                  </div>
                  <div className="text-white/80 text-sm md:text-base font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                    {metric.label}
                  </div>
                  <div className="text-white/60 text-xs mt-2 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                    {metric.subtext}
                  </div>
                  <div className={`w-full h-1 bg-gradient-to-r ${metric.color} rounded-full mt-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />
                </motion.div>
              ))}
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
              className="mt-12 text-center"
            >
              <p className="text-white/60 text-sm [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                Trusted by startups to Fortune 500 • SOC 2 Compliant • 24/7 Support
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default EnhancedVibeDevSquadHero