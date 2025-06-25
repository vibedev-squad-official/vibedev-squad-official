'use client';

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
      {/* Landing page will be built in Phase 01 */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white/80">
          <h1 className="text-4xl font-bold mb-4">Vibe DevSquad</h1>
          <p className="text-lg mb-6">Landing page coming soon - Phase 01</p>
          
          {/* Test analytics button */}
          <button 
            onClick={handleTestClick}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
          >
            Test Analytics Tracking
          </button>
          
          <div className="mt-4 text-sm text-white/60">
            ✅ Vercel Analytics & Speed Insights integrated
          </div>
        </div>
      </div>
    </div>
  );
}
