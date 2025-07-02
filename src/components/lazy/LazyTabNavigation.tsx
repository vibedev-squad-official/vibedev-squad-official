"use client";

import dynamic from 'next/dynamic';
import { TabSkeleton } from '@/components/ui/lazy-wrapper';

// Lazy load the Tab Navigation with a custom loading component
export const LazyTabNavigation = dynamic(
  () => import('@/components/ui/enhanced-tab-navigation').then(mod => mod.EnhancedTabNavigation),
  {
    loading: () => <TabSkeleton className="max-w-4xl mx-auto" />,
    ssr: true // Keep SSR for SEO
  }
);

// Mobile version
export const LazyMobileTabNavigation = dynamic(
  () => import('@/components/ui/mobile-tab-navigation').then(mod => mod.MobileTabNavigation),
  {
    loading: () => <TabSkeleton className="max-w-lg mx-auto" />,
    ssr: true
  }
);