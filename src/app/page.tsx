'use client';

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

  const handleTestClick = () => {
    analytics.ctaClick('test-button', 'homepage');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header Component */}
      <VibeDevSquadHeader />
      
      {/* Hero Section with AI Agent Flow */}
      <VibeDevSquadHero />
      
      {/* Additional content sections for scroll testing */}
      <section id="features" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="text-center text-white/80">
          <h2 className="text-3xl font-bold mb-4">Features Section</h2>
          <p className="text-lg">Scroll to test header glassmorphism effects</p>
        </div>
      </section>
      
      <section id="pricing" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-slate-900">
        <div className="text-center text-white/80">
          <h2 className="text-3xl font-bold mb-4">Pricing Section</h2>
          <p className="text-lg">Header adapts blur and opacity on scroll</p>
        </div>
      </section>
      
      <section id="comparison" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-violet-900">
        <div className="text-center text-white/80">
          <h2 className="text-3xl font-bold mb-4">Comparison Section</h2>
          <p className="text-lg">Test responsive navigation on different screen sizes</p>
        </div>
      </section>
      
      <section id="testimonials" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-900 to-slate-900">
        <div className="text-center text-white/80">
          <h2 className="text-3xl font-bold mb-4">Testimonials Section</h2>
          <p className="text-lg">Mobile menu transforms for smaller screens</p>
        </div>
      </section>
    </div>
  );
}
