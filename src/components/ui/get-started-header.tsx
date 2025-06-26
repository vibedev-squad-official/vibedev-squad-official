'use client';

import { cn } from '@/lib/utils';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface GetStartedHeaderProps {
  className?: string;
}

export function GetStartedHeader({ className }: GetStartedHeaderProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative w-full flex flex-col items-center justify-center px-4 py-16 md:py-24",
        className
      )}
    >
      {/* Glassmorphism container */}
      <motion.div
        className="relative z-10 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        {/* Neon glow border effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-xl -z-10" />
        
        {/* Main heading with gradient text */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{
              textShadow: '0 0 30px rgba(139, 92, 246, 0.5)',
            }}
          >
            Get Started in Three Simple Steps
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Transform your development workflow with AI orchestration designed for maximum efficiency and results.
          </motion.p>

          {/* Decorative elements */}
          <motion.div
            className="flex justify-center items-center gap-4 mt-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00ffff]" />
            <div className="w-16 h-px bg-gradient-to-r from-cyan-400 to-purple-400" />
            <div className="w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_15px_#8b5cf6]" />
            <div className="w-16 h-px bg-gradient-to-r from-purple-400 to-pink-400" />
            <div className="w-2 h-2 rounded-full bg-pink-400 shadow-[0_0_10px_#ff1493]" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
} 