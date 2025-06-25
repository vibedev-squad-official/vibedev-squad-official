'use client';

import AIBackground from '@/components/ui/ai-background';
import FeaturesSection from '@/components/ui/features-section';
import VibeDevSquadHeader from '@/components/ui/header';
import VibeDevSquadHero from '@/components/ui/hero-section';
import MetricsBar from '@/components/ui/metrics-bar';
import OriginStorySection from '@/components/ui/origin-story-section';
import { PricingCards } from '@/components/ui/pricing-cards';
import { PricingSectionHeader } from '@/components/ui/pricing-header';
import ProcessCards from '@/components/ui/process-cards';
import ProcessHeader from '@/components/ui/process-header';
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
    <main className="min-h-screen relative">
      {/* Unified AI Background */}
      <AIBackground />
      
      {/* Header */}
      <VibeDevSquadHeader />
      
      {/* Hero Section */}
      <VibeDevSquadHero />
      
      {/* Origin Story Section */}
      <OriginStorySection />
      
      {/* Target Audience Cards Section */}
      <section className="relative z-10 py-20 px-4">
        <TargetAudienceCards />
      </section>
      
      {/* Features Section (Problem/Solution + Feature Grid) */}
      <section className="relative z-10 py-20 px-4">
        <FeaturesSection />
      </section>
      
      {/* Real Impact Metrics Bar */}
      <section className="relative z-10 py-20 px-4">
        <MetricsBar />
      </section>
      
      {/* How Vibe Coding Works Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <ProcessHeader />
          <ProcessCards />
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <PricingSectionHeader />
          <PricingCards />
        </div>
      </section>
      
      {/* Social Proof Metrics Section */}
      <section className="relative z-10 py-20 px-4">
        <SocialProofMetrics />
      </section>
    </main>
  );
}
