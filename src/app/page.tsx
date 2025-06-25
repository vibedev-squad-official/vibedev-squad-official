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



  return (
    <div className="min-h-screen">
      {/* Unified background for entire page */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

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
          <p className="text-lg">Header adapts blur and opacity on scroll</p>
        </div>
      </section>
      
      <section id="comparison" className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white/80">
          <h2 className="text-3xl font-bold mb-4">Comparison Section</h2>
          <p className="text-lg">Test responsive navigation on different screen sizes</p>
        </div>
      </section>
      
      <section id="testimonials" className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white/80">
          <h2 className="text-3xl font-bold mb-4">Testimonials Section</h2>
          <p className="text-lg">Mobile menu transforms for smaller screens</p>
        </div>
      </section>
    </div>
  );
}
