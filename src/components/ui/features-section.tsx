'use client';

import { cn } from '@/lib/utils';
import { motion, Transition } from 'framer-motion';
import { Bot, Building, Code, Globe, Sparkles, Users, Zap } from 'lucide-react';
import React from 'react';

// GlowEffect Component
export type GlowEffectProps = {
  className?: string;
  style?: React.CSSProperties;
  colors?: string[];
  mode?:
    | 'rotate'
    | 'pulse'
    | 'breathe'
    | 'colorShift'
    | 'flowHorizontal'
    | 'static';
  blur?:
    | number
    | 'softest'
    | 'soft'
    | 'medium'
    | 'strong'
    | 'stronger'
    | 'strongest'
    | 'none';
  transition?: Transition;
  scale?: number;
  duration?: number;
};

function GlowEffect({
  className,
  style,
  colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F'],
  mode = 'rotate',
  blur = 'medium',
  transition,
  scale = 1,
  duration = 5,
}: GlowEffectProps) {
  const BASE_TRANSITION = {
    repeat: Infinity,
    duration: duration,
    ease: 'linear' as const,
  };

  const animations = {
    rotate: {
      background: [
        `conic-gradient(from 0deg at 50% 50%, ${colors.join(', ')})`,
        `conic-gradient(from 360deg at 50% 50%, ${colors.join(', ')})`,
      ],
      transition: {
        ...(transition ?? BASE_TRANSITION),
      },
    },
    pulse: {
      background: colors.map(
        (color) =>
          `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 100%)`
      ),
      scale: [1 * scale, 1.1 * scale, 1 * scale],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        ...(transition ?? {
          ...BASE_TRANSITION,
          repeatType: 'mirror',
        }),
      },
    },
    breathe: {
      background: [
        ...colors.map(
          (color) =>
            `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 100%)`
        ),
      ],
      scale: [1 * scale, 1.05 * scale, 1 * scale],
      transition: {
        ...(transition ?? {
          ...BASE_TRANSITION,
          repeatType: 'mirror',
        }),
      },
    },
    colorShift: {
      background: colors.map((color, index) => {
        const nextColor = colors[(index + 1) % colors.length];
        return `conic-gradient(from 0deg at 50% 50%, ${color} 0%, ${nextColor} 50%, ${color} 100%)`;
      }),
      transition: {
        ...(transition ?? {
          ...BASE_TRANSITION,
          repeatType: 'mirror',
        }),
      },
    },
    flowHorizontal: {
      background: colors.map((color) => {
        const nextColor = colors[(colors.indexOf(color) + 1) % colors.length];
        return `linear-gradient(to right, ${color}, ${nextColor})`;
      }),
      transition: {
        ...(transition ?? {
          ...BASE_TRANSITION,
          repeatType: 'mirror',
        }),
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
      style={
        {
          ...style,
          '--scale': scale,
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        } as React.CSSProperties
      }
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

// DottedBackground Component
interface DottedBackgroundProps {
  dotColor?: string;
  backgroundColor?: string;
  dotSize?: number;
  dotSpacing?: number;
  enableVignette?: boolean;
  vignetteColor?: string;
  enableInnerGlow?: boolean;
  innerGlowColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

const DottedBackground: React.FC<DottedBackgroundProps> = ({
  dotColor = '#0ea5e9',
  backgroundColor = 'transparent',
  dotSize = 1,
  dotSpacing = 20,
  enableVignette = true,
  vignetteColor = 'rgb(0,0,0)',
  enableInnerGlow = true,
  innerGlowColor = 'rgb(0,0,0)',
  className = '',
  style = {},
}) => {
  const ids = React.useMemo(() => {
    const baseId = `dotted-bg-${Math.random().toString(36).substr(2, 9)}`;
    return {
      pattern: `${baseId}-pattern`,
      vignette: `${baseId}-vignette`,
      innerGlow: `${baseId}-inner-glow`,
    };
  }, []);

  return (
    <div className={`w-full h-full ${className}`} style={style}>
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={ids.pattern}
            x="0"
            y="0"
            width={dotSpacing}
            height={dotSpacing}
            patternUnits="userSpaceOnUse"
          >
            <circle cx={dotSpacing / 2} cy={dotSpacing / 2} r={dotSize} fill={dotColor} />
          </pattern>

          {enableVignette && (
            <radialGradient
              id={ids.vignette}
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%"
            >
              <stop offset="40%" stopColor={vignetteColor} stopOpacity="0" />
              <stop offset="100%" stopColor={vignetteColor} stopOpacity="0.8" />
            </radialGradient>
          )}

          {enableInnerGlow && (
            <radialGradient
              id={ids.innerGlow}
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%"
            >
              <stop offset="50%" stopColor={innerGlowColor} stopOpacity="0.3" />
              <stop offset="100%" stopColor={innerGlowColor} stopOpacity="0" />
            </radialGradient>
          )}
        </defs>

        <rect x="0" y="0" width="100%" height="100%" fill={backgroundColor} stroke="none" />
        <rect x="0" y="0" width="100%" height="100%" fill={`url(#${ids.pattern})`} stroke="none" />

        {enableVignette && (
          <rect x="0" y="0" width="100%" height="100%" fill={`url(#${ids.vignette})`} stroke="none" />
        )}

        {enableInnerGlow && (
          <circle cx="50%" cy="50%" r="25%" fill={`url(#${ids.innerGlow})`} stroke="none" />
        )}
      </svg>
    </div>
  );
};

// Feature Card Component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, className }) => {
  return (
    <motion.div
      className={cn(
        "relative group p-6 rounded-2xl border border-border/20 bg-background/10 backdrop-blur-md",
        "hover:border-primary/30 transition-all duration-500",
        "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-primary/5 before:to-secondary/5 before:opacity-0 before:transition-opacity before:duration-500",
        "hover:before:opacity-100",
        className
      )}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="relative z-10">
        <div className="mb-4 inline-flex p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <GlowEffect
          colors={['#3b82f6', '#8b5cf6', '#ec4899']}
          mode="pulse"
          blur="strong"
          scale={0.8}
        />
      </div>
    </motion.div>
  );
};

// Main Features Section Component
const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Bot className="w-6 h-6" />,
      title: "AI Orchestration",
      description: "Intelligent agents that work together seamlessly, coordinating complex workflows with precision and adaptability."
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Smart Development",
      description: "Accelerate your development cycle with AI-powered code generation, testing, and deployment automation."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Performance",
      description: "Experience blazing-fast execution with optimized algorithms and distributed processing capabilities."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Collaboration",
      description: "Enable seamless collaboration between human teams and AI agents for maximum productivity and innovation."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Scale",
      description: "Deploy and scale your AI solutions worldwide with our robust infrastructure and edge computing network."
    },
    {
      icon: <Building className="w-6 h-6" />,
      title: "Enterprise Ready",
      description: "Built for enterprise with advanced security, compliance, and governance features for mission-critical applications."
    }
  ];

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Subtle overlay for glassmorphism effect - no solid background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/10 via-background/5 to-background/10 backdrop-blur-sm">
        <DottedBackground
          dotColor="#3b82f6"
          dotSize={1}
          dotSpacing={30}
          enableVignette={false}
          vignetteColor="rgb(0,0,0)"
          enableInnerGlow={false}
          innerGlowColor="rgb(0,0,0)"
        />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-secondary/5 blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative inline-block mb-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              🚀 The Future of Development is Here
            </h1>
            
            {/* Neon glow effect */}
            <div className="absolute inset-0 text-5xl md:text-7xl font-bold text-primary/20 blur-sm">
              🚀 The Future of Development is Here
            </div>
            
            {/* Enhanced glow */}
            <div className="absolute inset-0 -z-10">
              <GlowEffect
                colors={['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b']}
                mode="colorShift"
                blur="stronger"
                scale={1.2}
              />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-4xl font-semibold text-foreground mb-6 tracking-tight"
          >
            Experience AI Orchestration at Every Scale
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          >
            From solo entrepreneurs to enterprise teams - AI agents that collaborate, innovate, and deliver.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-center mt-16"
        >
          <motion.button
            className="relative px-8 py-4 text-lg font-semibold text-white rounded-2xl bg-gradient-to-r from-primary to-secondary overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Get Started Today
              <Sparkles className="w-5 h-5" />
            </span>
            
            {/* Button glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <GlowEffect
                colors={['#3b82f6', '#8b5cf6']}
                mode="pulse"
                blur="medium"
              />
            </div>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection; 