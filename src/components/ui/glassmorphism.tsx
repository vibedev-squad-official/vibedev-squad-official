"use client";

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import React from 'react';

// Glassmorphism utility classes and component
interface GlassmorphismProps {
  children: React.ReactNode;
  className?: string;
  blurLevel?: 'minimal' | 'standard' | 'enhanced';
  opacity?: 'light' | 'medium' | 'heavy';
  variant?: 'card' | 'overlay' | 'sidebar' | 'modal';
  animated?: boolean;
}

const blurLevels = {
  minimal: 'backdrop-blur-sm',
  standard: 'backdrop-blur-md',
  enhanced: 'backdrop-blur-xl'
};

const opacityLevels = {
  light: 'bg-white/[0.05]',
  medium: 'bg-white/[0.10]',
  heavy: 'bg-white/[0.15]'
};

const variants = {
  card: 'rounded-2xl border border-white/[0.15] shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]',
  overlay: 'rounded-xl border border-white/[0.10] shadow-[0_4px_16px_0_rgba(255,255,255,0.08)]',
  sidebar: 'rounded-none border-r border-white/[0.15] shadow-[4px_0_16px_0_rgba(255,255,255,0.05)]',
  modal: 'rounded-3xl border border-white/[0.20] shadow-[0_16px_64px_0_rgba(255,255,255,0.15)]'
};

function Glassmorphism({
  children,
  className = '',
  blurLevel = 'standard',
  opacity = 'medium',
  variant = 'card',
  animated = false
}: GlassmorphismProps) {
  const baseClasses = cn(
    'relative overflow-hidden',
    blurLevels[blurLevel],
    opacityLevels[opacity],
    variants[variant],
    className
  );

  const Component = animated ? motion.div : 'div';
  const animationProps = animated ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  } : {};

  return (
    <Component className={baseClasses} {...animationProps}>
      {/* Gradient overlay for enhanced glass effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.03] pointer-events-none" />
      
      {/* Inner glow effect */}
      <div className="absolute inset-0 rounded-inherit bg-gradient-to-br from-white/[0.15] via-transparent to-transparent opacity-50 pointer-events-none" />
      
      {/* Content container */}
      <div className="relative z-10">
        {children}
      </div>
    </Component>
  );
}

// Utility classes for different blur levels
const GlassBlur = {
  minimal: 'backdrop-blur-sm bg-white/[0.05] border border-white/[0.10]',
  standard: 'backdrop-blur-md bg-white/[0.08] border border-white/[0.15]',
  enhanced: 'backdrop-blur-xl bg-white/[0.12] border border-white/[0.20]'
};

// Utility classes for different opacity levels
const GlassOpacity = {
  light: 'bg-white/[0.03] border-white/[0.08]',
  medium: 'bg-white/[0.08] border-white/[0.15]',
  heavy: 'bg-white/[0.15] border-white/[0.25]'
};

// Pre-built glass components
function GlassCard({ children, className = '', ...props }: GlassmorphismProps) {
  return (
    <Glassmorphism
      variant="card"
      className={cn('p-6', className)}
      {...props}
    >
      {children}
    </Glassmorphism>
  );
}

function GlassOverlay({ children, className = '', ...props }: GlassmorphismProps) {
  return (
    <Glassmorphism
      variant="overlay"
      className={cn('p-4', className)}
      {...props}
    >
      {children}
    </Glassmorphism>
  );
}

function GlassModal({ children, className = '', ...props }: GlassmorphismProps) {
  return (
    <Glassmorphism
      variant="modal"
      className={cn('p-8 max-w-md mx-auto', className)}
      {...props}
    >
      {children}
    </Glassmorphism>
  );
}

function GlassSidebar({ children, className = '', ...props }: GlassmorphismProps) {
  return (
    <Glassmorphism
      variant="sidebar"
      className={cn('p-6 min-h-screen w-64', className)}
      {...props}
    >
      {children}
    </Glassmorphism>
  );
}

export { GlassBlur, GlassCard, GlassModal, Glassmorphism, GlassOpacity, GlassOverlay, GlassSidebar };
export default Glassmorphism; 