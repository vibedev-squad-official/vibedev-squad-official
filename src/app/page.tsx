'use client';

import AIBackground from '@/components/ui/ai-background';
import VibeDevSquadHeader from '@/components/ui/header';
import VibeDevSquadHero from '@/components/ui/hero-section';
import SocialProofMetrics from '@/components/ui/social-proof-metrics';
import TargetAudienceCards from '@/components/ui/target-audience-cards';
import { analytics, performance } from '@/lib/analytics';
import { useEffect } from 'react';

// Force dynamic rendering to bypass Next.js caching during development
export const dynamic = 'force-dynamic';

export default function Home() {
  useEffect(() => {
    // Test analytics integration on page load
    analytics.pageView('landing-page');
    
    // Test performance monitoring
    const startTime = globalThis.performance.now();
    
    // Simulate component load time
    setTimeout(() => {
      const loadTime = globalThis.performance.now() - startTime;
      performance.pageLoad(loadTime, 'landing-page');
    }, 100);
  }, []);

  return (
    <>
      {/* Unified AI Background */}
      <AIBackground />
      
      {/* Header */}
      <VibeDevSquadHeader />
      
      {/* Hero Section */}
      <VibeDevSquadHero />
      
      {/* Target Audience Cards Section */}
      <TargetAudienceCards />
      
      {/* Social Proof Metrics Section */}
      <SocialProofMetrics />
    </>
  );
}
