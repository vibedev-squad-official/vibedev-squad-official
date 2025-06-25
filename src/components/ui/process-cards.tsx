'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import React from 'react';

// GlowEffect Component
export type GlowEffectProps = {
  className?: string;
  style?: React.CSSProperties;
  colors?: string[];
  mode?: 'rotate' | 'pulse' | 'breathe' | 'colorShift' | 'flowHorizontal' | 'static';
  blur?: number | 'softest' | 'soft' | 'medium' | 'strong' | 'stronger' | 'strongest' | 'none';
  scale?: number;
  duration?: number;
};

function GlowEffect({
  className,
  style,
  colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F'],
  mode = 'rotate',
  blur = 'medium',
  scale = 1,
  duration = 5,
}: GlowEffectProps) {
  const BASE_TRANSITION = {
    repeat: Infinity,
    duration: duration,
    ease: 'linear',
  };

  const animations = {
    rotate: {
      background: [
        `conic-gradient(from 0deg at 50% 50%, ${colors.join(', ')})`,
        `conic-gradient(from 360deg at 50% 50%, ${colors.join(', ')})`,
      ],
      transition: BASE_TRANSITION,
    },
    pulse: {
      background: colors.map(
        (color) =>
          `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 100%)`
      ),
      scale: [1 * scale, 1.1 * scale, 1 * scale],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        ...BASE_TRANSITION,
        repeatType: 'mirror' as const,
      },
    },
    static: {
      background: `linear-gradient(to right, ${colors.join(', ')})`,
    },
  };

  const getBlurClass = (blur: GlowEffectProps['blur']) => {
    if (typeof blur === 'number') {
      return `blur-[${blur}px]`;
    }

    const presets = {
      softest: 'blur-sm',
      soft: 'blur',
      medium: 'blur-md',
      strong: 'blur-lg',
      stronger: 'blur-xl',
      strongest: 'blur-xl',
      none: 'blur-none',
    };

    return presets[blur as keyof typeof presets];
  };

  return (
    <motion.div
      style={{
        ...style,
        '--scale': scale,
        willChange: 'transform',
        backfaceVisibility: 'hidden',
      } as React.CSSProperties}
      animate={animations[mode]}
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full',
        'scale-[var(--scale)] transform-gpu',
        getBlurClass(blur),
        className
      )}
    />
  );
}

// Process Step Card Component
interface ProcessStepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  gradientColors: string[];
  glowColors: string[];
  index: number;
}

function ProcessStepCard({
  stepNumber,
  title,
  description,
  gradientColors,
  glowColors,
  index,
}: ProcessStepCardProps) {
  return (
    <motion.div 
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      {/* Glow Effect */}
      <GlowEffect
        colors={glowColors}
        mode="pulse"
        blur="strong"
        duration={3}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      
      {/* Card */}
      <div className="relative bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 h-full">
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-2xl" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
          {/* Numbered Circle */}
          <div className="relative">
            <motion.div 
              className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              {stepNumber}
            </motion.div>
            {/* Circle glow */}
            <div 
              className="absolute inset-0 w-16 h-16 rounded-full blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
              }}
            />
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-semibold text-white">
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-slate-300 leading-relaxed">
            {description}
          </p>
        </div>
        
        {/* Border glow effect */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'xor',
            padding: '1px',
          }}
        />
      </div>
    </motion.div>
  );
}

// Main Component
export default function ProcessCards() {
  // Exact copy integration from phase document
  const steps = [
    {
      stepNumber: 1,
      title: "Describe Your Project",
      description: "Tell our Planning Agent what you want to build. It analyzes your requirements and creates a development plan.",
      gradientColors: ['#3B82F6', '#1D4ED8'], // Blue gradient
      glowColors: ['#3B82F6', '#60A5FA', '#93C5FD'],
    },
    {
      stepNumber: 2,
      title: "AI Agents Get to Work",
      description: "Specialized agents are spawned for frontend, backend, testing, and deployment. They collaborate in real-time.",
      gradientColors: ['#8B5CF6', '#7C3AED'], // Purple gradient
      glowColors: ['#8B5CF6', '#A78BFA', '#C4B5FD'],
    },
    {
      stepNumber: 3,
      title: "Deploy & Scale",
      description: "Your project is built, tested, and deployed automatically. Scale with unlimited agent capacity.",
      gradientColors: ['#06B6D4', '#0891B2'], // Teal gradient
      glowColors: ['#06B6D4', '#67E8F9', '#A5F3FC'],
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      {/* Responsive grid: 3 columns desktop, 2 tablet, 1 mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <ProcessStepCard
            key={index}
            stepNumber={step.stepNumber}
            title={step.title}
            description={step.description}
            gradientColors={step.gradientColors}
            glowColors={step.glowColors}
            index={index}
          />
        ))}
      </div>
    </div>
  );
} 