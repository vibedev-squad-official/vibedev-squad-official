"use client";

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  minHeight?: string;
}

const DefaultFallback = ({ minHeight = "200px" }: { minHeight?: string }) => (
  <div 
    className={cn(
      "flex items-center justify-center w-full",
      "bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
    )}
    style={{ minHeight }}
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
    >
      <Loader2 className="h-8 w-8 text-cyan-500" />
    </motion.div>
  </div>
);

export function LazyWrapper({ 
  children, 
  fallback, 
  className,
  minHeight = "200px" 
}: LazyWrapperProps) {
  return (
    <Suspense fallback={fallback || <DefaultFallback minHeight={minHeight} />}>
      <div className={className}>
        {children}
      </div>
    </Suspense>
  );
}

// Skeleton loaders for specific components
export const CardSkeleton = ({ className }: { className?: string }) => (
  <div className={cn(
    "animate-pulse rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 p-6",
    className
  )}>
    <div className="h-4 bg-white/10 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-white/10 rounded w-1/2 mb-4"></div>
    <div className="space-y-3">
      <div className="h-3 bg-white/10 rounded"></div>
      <div className="h-3 bg-white/10 rounded"></div>
      <div className="h-3 bg-white/10 rounded w-5/6"></div>
    </div>
  </div>
);

export const TabSkeleton = ({ className }: { className?: string }) => (
  <div className={cn("space-y-4", className)}>
    <div className="flex gap-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="h-12 w-32 bg-white/10 rounded-lg"></div>
        </div>
      ))}
    </div>
    <div className="animate-pulse space-y-4">
      <div className="h-32 bg-white/10 rounded-lg"></div>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-24 bg-white/10 rounded-lg"></div>
        <div className="h-24 bg-white/10 rounded-lg"></div>
      </div>
    </div>
  </div>
);

export const CalculatorSkeleton = ({ className }: { className?: string }) => (
  <div className={cn("space-y-6", className)}>
    <div className="animate-pulse">
      <div className="h-8 bg-white/10 rounded w-1/3 mx-auto mb-4"></div>
      <div className="h-4 bg-white/10 rounded w-1/2 mx-auto"></div>
    </div>
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-4 animate-pulse">
        <div className="h-40 bg-white/10 rounded-lg"></div>
        <div className="h-32 bg-white/10 rounded-lg"></div>
      </div>
      <div className="space-y-4 animate-pulse">
        <div className="h-32 bg-white/10 rounded-lg"></div>
        <div className="h-40 bg-white/10 rounded-lg"></div>
      </div>
    </div>
  </div>
);