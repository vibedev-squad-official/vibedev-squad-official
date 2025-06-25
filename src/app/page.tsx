'use client';

import AIBackground from '@/components/ui/ai-background';
import VibeDevSquadHeader from '@/components/ui/header';
import VibeDevSquadHero from '@/components/ui/hero-section';
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
    <AIBackground>
      {/* Header Component */}
      <VibeDevSquadHeader />
      
      {/* Hero Section with AI Agent Flow */}
      <VibeDevSquadHero />
      
      {/* Additional content sections for scroll testing */}
      <section id="features" className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white/80">
          <h2 className="text-3xl font-bold mb-4">Features Section</h2>
          <p className="text-lg">Scroll to test header glassmorphism effects</p>
        </div>
      </section>
      
      <section id="pricing" className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white/80">
          <h2 className="text-3xl font-bold mb-4">Pricing Section</h2>
          <p className="text-lg">More content for scrolling</p>
        </div>
      </section>
      
      <section id="contact" className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white/80">
          <h2 className="text-3xl font-bold mb-4">Contact Section</h2>
          <p className="text-lg">Final section for testing</p>
        </div>
      </section>
    </AIBackground>
  );
}
