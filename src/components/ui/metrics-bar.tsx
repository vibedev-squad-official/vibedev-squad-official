"use client"

import { motion, useInView, useSpring, useTransform } from "framer-motion"
import { Target, TrendingUp, Users, Zap } from "lucide-react"
import React, { useEffect, useRef } from "react"

interface MetricData {
  id: string
  label: string
  value: number
  suffix: string
  icon: React.ReactNode
  color: string
  glowColor: string
}

interface MetricsBarProps {
  title?: string
  subtitle?: string
  metrics?: MetricData[]
}

function AnimatedCounter({ 
  value, 
  suffix, 
  isInView 
}: { 
  value: number
  suffix: string
  isInView: boolean 
}) {
  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 15,
  })

  const displayValue = useTransform(springValue, (latest) => Math.floor(latest))

  useEffect(() => {
    if (isInView) {
      springValue.set(value)
    } else {
      springValue.set(0)
    }
  }, [isInView, value, springValue])

  return (
    <div className="flex items-baseline">
      <motion.span className="text-3xl md:text-4xl font-bold">
        {displayValue}
      </motion.span>
      <span className="text-2xl md:text-3xl font-bold ml-1">{suffix}</span>
    </div>
  )
}

function MetricCard({ 
  metric, 
  index, 
  isInView 
}: { 
  metric: MetricData
  index: number
  isInView: boolean 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1 
      } : { 
        opacity: 0, 
        y: 30, 
        scale: 0.9 
      }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="group relative"
    >
      {/* Glassmorphism card */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 p-6 h-full">
        {/* Neon glow effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"
          style={{
            background: `radial-gradient(circle at center, ${metric.glowColor}20, transparent 70%)`,
          }}
        />
        
        {/* Inner glow */}
        <div 
          className="absolute inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${metric.glowColor}10, transparent 50%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon with glow */}
          <motion.div
            className="flex items-center justify-center w-12 h-12 rounded-xl mb-4 relative"
            style={{ backgroundColor: `${metric.color}20` }}
            whileHover={{ 
              rotate: [0, -5, 5, 0],
              transition: { duration: 0.5 }
            }}
          >
            <div 
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"
              style={{ backgroundColor: metric.glowColor }}
            />
            <div 
              className="relative z-10"
              style={{ color: metric.color }}
            >
              {metric.icon}
            </div>
          </motion.div>

          {/* Animated counter */}
          <div 
            className="mb-2"
            style={{ color: metric.color }}
          >
            <AnimatedCounter 
              value={metric.value} 
              suffix={metric.suffix}
              isInView={isInView}
            />
          </div>

          {/* Label */}
          <p className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors duration-300">
            {metric.label}
          </p>

          {/* Progress indicator */}
          <div className="mt-4 h-1 bg-slate-700/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: metric.color }}
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ 
                duration: 1.5, 
                delay: index * 0.1 + 0.5,
                ease: "easeOut"
              }}
            />
          </div>
        </div>

        {/* Floating particles */}
        <motion.div
          className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-60"
          style={{ backgroundColor: metric.color }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5,
          }}
        />
        <motion.div
          className="absolute bottom-6 left-4 w-1 h-1 rounded-full opacity-40"
          style={{ backgroundColor: metric.color }}
          animate={{
            y: [0, 8, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.3 + 1,
          }}
        />
      </div>
    </motion.div>
  )
}

export default function MetricsBar() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { 
    once: false, 
    amount: 0.3 
  })

  // Exact copy integration from phase document
  const metrics: MetricData[] = [
    {
      id: "development",
      label: "Faster Development Cycles",
      value: 300,
      suffix: "%",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "#0ea5e9",
      glowColor: "#0ea5e9"
    },
    {
      id: "bugs",
      label: "Fewer Bugs in Production",
      value: 85,
      suffix: "%",
      icon: <Target className="w-6 h-6" />,
      color: "#8b5cf6",
      glowColor: "#8b5cf6"
    },
    {
      id: "time",
      label: "Time Saved on Repetitive Tasks",
      value: 90,
      suffix: "%",
      icon: <Zap className="w-6 h-6" />,
      color: "#06b6d4",
      glowColor: "#06b6d4"
    },
    {
      id: "satisfaction",
      label: "Satisfaction from Development Teams",
      value: 100,
      suffix: "%",
      icon: <Users className="w-6 h-6" />,
      color: "#10b981",
      glowColor: "#10b981"
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className="w-full py-16 px-4 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.1),transparent_50%)]" />
      
      {/* Floating background elements */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-500/5 blur-3xl"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-purple-500/5 blur-3xl"
        animate={{
          y: [0, 20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(14,165,233,0.3)]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Real Impact, Measurable Results
          </motion.h2>
          
          {/* Animated underline */}
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full shadow-[0_0_20px_rgba(14,165,233,0.5)]"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : { width: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          />
        </motion.div>

        {/* Metrics Grid - responsive: single row desktop, 2x2 grid mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard
              key={metric.id}
              metric={metric}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 