"use client"

import AIOrchestration from '@/components/ui/ai-orchestration'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import React from 'react'

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

          {/* AI Orchestration Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="w-full max-w-4xl mx-auto"
          >
            <AIOrchestration />
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