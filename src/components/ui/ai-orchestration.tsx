"use client"

import { motion, useAnimation } from 'framer-motion'
import { BarChart3, Brain, Database, Globe, Shield } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

interface Agent {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  description: string
  angle: number
}

interface GradientTracingProps {
  width: number
  height: number
  baseColor?: string
  gradientColors?: [string, string, string]
  animationDuration?: number
  strokeWidth?: number
  path?: string
}

const GradientTracing: React.FC<GradientTracingProps> = ({
  width,
  height,
  baseColor = "rgba(14, 165, 233, 0.2)",
  gradientColors = ["#0ea5e9", "#06b6d4", "#8b5cf6"],
  animationDuration = 3,
  strokeWidth = 2,
  path = `M0,${height / 2} L${width},${height / 2}`,
}) => {
  const gradientId = `pulse-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className="absolute" style={{ width, height }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        className="absolute inset-0"
      >
        <path
          d={path}
          stroke={baseColor}
          strokeWidth={strokeWidth}
        />
        <path
          d={path}
          stroke={`url(#${gradientId})`}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
        <defs>
          <motion.linearGradient
            animate={{
              x1: [0, width * 2],
              x2: [0, width],
            }}
            transition={{
              duration: animationDuration,
              repeat: Infinity,
              ease: "linear",
            }}
            id={gradientId}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={gradientColors[0]} stopOpacity="0" />
            <stop stopColor={gradientColors[1]} />
            <stop offset="1" stopColor={gradientColors[2]} stopOpacity="0" />
          </motion.linearGradient>
        </defs>
      </svg>
    </div>
  )
}

const AIAgentOrchestration: React.FC = () => {
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const centerControls = useAnimation()

  // Agents as specified in copy integration requirements
  const agents: Agent[] = [
    {
      id: 'data-processing',
      name: 'Data Processing',
      icon: Database,
      color: '#0ea5e9',
      description: 'Real-time data ingestion and processing',
      angle: 0
    },
    {
      id: 'security-layer',
      name: 'Security Layer',
      icon: Shield,
      color: '#8b5cf6',
      description: 'Advanced threat detection and protection',
      angle: 72
    },
    {
      id: 'api-gateway',
      name: 'API Gateway',
      icon: Globe,
      color: '#06b6d4',
      description: 'Intelligent request routing and management',
      angle: 144
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: BarChart3,
      color: '#0ea5e9',
      description: 'Predictive insights and reporting',
      angle: 216
    },
    {
      id: 'ai-core',
      name: 'AI Core',
      icon: Brain,
      color: '#8b5cf6',
      description: 'Machine learning orchestration hub',
      angle: 288
    }
  ]

  const radius = 150
  const centerX = 200
  const centerY = 200

  useEffect(() => {
    centerControls.start({
      scale: [1, 1.05, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  }, [centerControls])

  const getAgentPosition = (angle: number) => {
    const radian = (angle * Math.PI) / 180
    return {
      x: centerX + radius * Math.cos(radian),
      y: centerY + radius * Math.sin(radian)
    }
  }

  const getConnectionPath = (agent: Agent) => {
    const pos = getAgentPosition(agent.angle)
    return `M${centerX},${centerY} L${pos.x},${pos.y}`
  }

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      {/* Main orchestration container */}
      <div 
        ref={containerRef}
        className="relative w-[400px] h-[400px] flex items-center justify-center"
      >
        {/* Connection lines with neon trails */}
        <svg 
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 400 400"
        >
          {agents.map((agent) => (
            <g key={`connection-${agent.id}`}>
              <GradientTracing
                width={400}
                height={400}
                path={getConnectionPath(agent)}
                gradientColors={[agent.color, agent.color, 'transparent']}
                animationDuration={2 + Math.random() * 2}
              />
            </g>
          ))}
          
          {/* Central pulse ring */}
          <motion.circle
            cx={centerX}
            cy={centerY}
            r="50"
            fill="none"
            stroke="url(#centralGradient)"
            strokeWidth="2"
            initial={{ r: 50, opacity: 0.8 }}
            animate={{ r: [50, 70, 50], opacity: [0.8, 0.3, 0.8] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <defs>
            <radialGradient id="centralGradient">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </radialGradient>
          </defs>
        </svg>

        {/* Central Developer Hub */}
        <motion.div
          className="absolute z-20 w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl backdrop-blur-sm border border-white/20"
          style={{
            left: centerX - 40,
            top: centerY - 40,
          }}
          animate={centerControls}
          whileHover={{ scale: 1.1 }}
        >
          <div className="w-14 h-14 rounded-full bg-background/90 flex items-center justify-center">
            <Brain className="w-7 h-7 text-blue-500" />
          </div>
          
          {/* Pulse effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-blue-500/50"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        </motion.div>

        {/* AI Agents */}
        {agents.map((agent) => {
          const position = getAgentPosition(agent.angle)
          const IconComponent = agent.icon
          
          return (
            <motion.div
              key={agent.id}
              className="absolute z-10 group cursor-pointer"
              style={{
                left: position.x - 30,
                top: position.y - 30,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                y: [0, -8, 0]
              }}
              transition={{
                scale: { delay: agent.angle / 72 * 0.1 },
                opacity: { delay: agent.angle / 72 * 0.1 },
                y: {
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2
                }
              }}
              whileHover={{ scale: 1.2, z: 30 }}
              onHoverStart={() => setHoveredAgent(agent.id)}
              onHoverEnd={() => setHoveredAgent(null)}
            >
              {/* Agent container with glassmorphism */}
              <div className="relative w-16 h-16 rounded-xl bg-background/80 backdrop-blur-md border border-white/20 shadow-xl flex items-center justify-center overflow-hidden">
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle, ${agent.color}20 0%, transparent 70%)`
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Icon */}
                <div 
                  className="w-6 h-6 z-10 relative flex items-center justify-center"
                  style={{ color: agent.color }}
                >
                  <IconComponent className="w-full h-full" />
                </div>
                
                {/* Pulse effect for specific agents */}
                {(agent.id === 'security-layer' || agent.id === 'analytics') && (
                  <motion.div
                    className="absolute inset-0 rounded-xl border-2"
                    style={{ borderColor: agent.color }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  />
                )}
              </div>

              {/* Agent label */}
              <motion.div
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-background/90 backdrop-blur-sm rounded-lg border border-white/20 shadow-lg opacity-0 group-hover:opacity-100 whitespace-nowrap z-20"
                initial={{ y: 10, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-xs font-medium text-foreground">{agent.name}</div>
              </motion.div>

              {/* Neon trail effect */}
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                style={{
                  boxShadow: `0 0 15px ${agent.color}40, 0 0 30px ${agent.color}20`
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          )
        })}

        {/* Central label */}
        <motion.div
          className="absolute z-30 px-3 py-1 bg-background/90 backdrop-blur-sm rounded-lg border border-white/20 shadow-lg"
          style={{
            left: centerX - 45,
            top: centerY + 50,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="text-xs font-medium text-foreground text-center">Developer Hub</div>
        </motion.div>
      </div>
    </div>
  )
}

export default AIAgentOrchestration 