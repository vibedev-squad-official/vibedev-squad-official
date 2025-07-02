"use client";

import dynamic from 'next/dynamic';
import { CalculatorSkeleton } from '@/components/ui/lazy-wrapper';

// Lazy load the ROI Calculator with a custom loading component
export const LazyROICalculator = dynamic(
  () => import('@/components/ui/enhanced-roi-calculator').then(mod => mod.EnhancedROICalculator),
  {
    loading: () => <CalculatorSkeleton className="max-w-6xl mx-auto" />,
    ssr: false // Disable SSR for client-side only features
  }
);

// Mobile version
export const LazyMobileROICalculator = dynamic(
  () => import('@/components/ui/mobile-roi-calculator').then(mod => mod.MobileROICalculator),
  {
    loading: () => <CalculatorSkeleton className="max-w-lg mx-auto" />,
    ssr: false
  }
);