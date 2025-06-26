'use client';

import { cn } from '@/lib/utils';
import { motion, useInView } from 'framer-motion';
import { Building2, User, Users } from 'lucide-react';
import React, { useRef } from 'react';

interface ScaleOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  borderColor: string;
  glowColor: string;
}

const scaleOptions: ScaleOption[] = [
  {
    id: 'solo',
    title: 'Solo Entrepreneur',
    description: 'Start with core AI agents (Planning, Frontend, Backend, QA), Personal workspace and project management, Individual developer tools integration',
    icon: <User className="w-6 h-6" />,
    borderColor: 'border-cyan-500/50',
    glowColor: 'shadow-[0_0_30px_rgba(6,182,212,0.3)]',
  },
  {
    id: 'team',
    title: 'Growing Team',
    description: 'Add team collaboration features, Human + AI hybrid workflows, Shared knowledge base and context',
    icon: <Users className="w-6 h-6" />,
    borderColor: 'border-purple-500/50',
    glowColor: 'shadow-[0_0_30px_rgba(139,92,246,0.3)]',
  },
  {
    id: 'enterprise',
    title: 'Enterprise',
    description: 'Unlimited agent deployment, Advanced analytics and compliance, Custom integrations and support',
    icon: <Building2 className="w-6 h-6" />,
    borderColor: 'border-pink-500/50',
    glowColor: 'shadow-[0_0_30px_rgba(236,72,153,0.3)]',
  },
];

interface ScaleOptionCardsProps {
  className?: string;
}

export function ScaleOptionCards({ className }: ScaleOptionCardsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative w-full px-4 py-16",
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        {/* Step 1 Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Step 1: Choose Your Scale
          </h3>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Select the option that best fits your current needs and growth stage.
          </p>
        </motion.div>

        {/* Scale Option Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scaleOptions.map((option, index) => (
            <motion.div
              key={option.id}
              className="group relative"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {/* Card */}
              <div
                className={cn(
                  "relative h-full backdrop-blur-xl bg-white/5 border rounded-2xl p-8 transition-all duration-300",
                  "hover:scale-105 hover:bg-white/10 cursor-pointer",
                  option.borderColor,
                  "hover:" + option.glowColor
                )}
              >
                {/* Neon glow border effect on hover */}
                <div className={cn(
                  "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10",
                  option.borderColor.replace('border-', 'bg-').replace('/50', '/20')
                )} />

                {/* Icon */}
                <motion.div
                  className={cn(
                    "inline-flex items-center justify-center w-16 h-16 rounded-full mb-6",
                    "bg-gradient-to-r",
                    option.id === 'solo' && "from-cyan-500/20 to-cyan-600/20 border border-cyan-500/30",
                    option.id === 'team' && "from-purple-500/20 to-purple-600/20 border border-purple-500/30",
                    option.id === 'enterprise' && "from-pink-500/20 to-pink-600/20 border border-pink-500/30"
                  )}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className={cn(
                    "text-white",
                    option.id === 'solo' && "text-cyan-400",
                    option.id === 'team' && "text-purple-400",
                    option.id === 'enterprise' && "text-pink-400"
                  )}>
                    {option.icon}
                  </div>
                </motion.div>

                {/* Title */}
                <h4 className="text-xl font-semibold text-white mb-4 group-hover:text-white transition-colors">
                  {option.title}
                </h4>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed text-sm">
                  {option.description}
                </p>

                {/* Decorative elements */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    option.id === 'solo' && "bg-cyan-400 shadow-[0_0_10px_#00ffff]",
                    option.id === 'team' && "bg-purple-400 shadow-[0_0_10px_#8b5cf6]",
                    option.id === 'enterprise' && "bg-pink-400 shadow-[0_0_10px_#ec4899]"
                  )} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 