'use client';

import ActivityFeed from '@/components/ui/activity-feed';
import AIBackground from '@/components/ui/ai-background';
import { ComparisonSection } from '@/components/ui/comparison-section';
import { DeploymentChecklist } from '@/components/ui/deployment-checklist';
import FeaturesSection from '@/components/ui/features-section';
import FinalCTAButtons from '@/components/ui/final-cta-buttons';
import FinalCTAHeader from '@/components/ui/final-cta-header';
import { GetStartedHeader } from '@/components/ui/get-started-header';
import VibeDevSquadHeader from '@/components/ui/header';
import VibeDevSquadHero from '@/components/ui/hero-section';
import OriginStorySection from '@/components/ui/origin-story-section';
import { PricingCards } from '@/components/ui/pricing-cards';
import { PricingSectionHeader } from '@/components/ui/pricing-header';
import ProcessCards from '@/components/ui/process-cards';
import ProcessHeader from '@/components/ui/process-header';
import { ScaleOptionCards } from '@/components/ui/scale-option-cards';
import { Footer } from '@/components/ui/simple-footer';
import SocialProofMetrics from '@/components/ui/social-proof-metrics';
import TargetAudienceCards from '@/components/ui/target-audience-cards';
import TestimonialCards from '@/components/ui/testimonial-cards';
import TestimonialsHeader from '@/components/ui/testimonials-header';
import TrustIndicators from '@/components/ui/trust-indicators';
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
      {/* Skip Navigation Links */}
      <a href="#main-content" className="skip-nav">
        Skip to main content
      </a>
      <a href="#navigation" className="skip-nav">
        Skip to navigation
      </a>
      
      {/* ARIA Live Region for Dynamic Content */}
      <div 
        aria-live="polite" 
        aria-atomic="false" 
        className="sr-only"
        id="live-region"
      >
        {/* This will be populated by interactive elements */}
      </div>
      
      {/* Unified AI Background */}
      <AIBackground />
      
      {/* Header */}
      <div id="navigation">
        <VibeDevSquadHeader />
      </div>
      
      {/* Main Content */}
      <div id="main-content">
        {/* Hero Section */}
        <section aria-labelledby="hero-heading">
          <VibeDevSquadHero />
        </section>
        
        {/* Origin Story Section */}
        <section aria-labelledby="origin-story-heading">
          <OriginStorySection />
        </section>
        
        {/* Target Audience Cards Section */}
        <section className="relative z-10 py-20 px-4" aria-labelledby="target-audience-heading">
          <h2 id="target-audience-heading" className="sr-only">
            Target Audience Solutions
          </h2>
          <TargetAudienceCards />
        </section>
        
        {/* Features Section (Problem/Solution + Feature Grid) */}
        <section className="relative z-10 py-20 px-4" aria-labelledby="features-heading">
          <h2 id="features-heading" className="sr-only">
            Features and Solutions
          </h2>
          <FeaturesSection />
        </section>
        
        {/* Get Started Section */}
        <section className="relative z-10" aria-labelledby="get-started-heading">
          <h2 id="get-started-heading" className="sr-only">
            Get Started Guide
          </h2>
          <GetStartedHeader />
          <ScaleOptionCards />
          <DeploymentChecklist />
        </section>
        
        {/* How Vibe Coding Works Section */}
        <section className="relative z-10 py-20 px-4" aria-labelledby="how-it-works-heading">
          <div className="max-w-7xl mx-auto">
            <h2 id="how-it-works-heading" className="sr-only">
              How Vibe Coding Works
            </h2>
            <ProcessHeader />
            <ProcessCards />
          </div>
        </section>
        
        {/* Pricing Section */}
        <section className="relative z-10 py-20 px-4" aria-labelledby="pricing-heading">
          <div className="max-w-7xl mx-auto">
            <h2 id="pricing-heading" className="sr-only">
              Pricing Plans
            </h2>
            <PricingSectionHeader />
            <PricingCards />
          </div>
        </section>
        
        {/* Interactive Comparison Section */}
        <section aria-labelledby="comparison-heading">
          <h2 id="comparison-heading" className="sr-only">
            Tool and Cost Comparison
          </h2>
          <ComparisonSection />
        </section>
        
        {/* Testimonials Section */}
        <section className="relative z-10 py-20 px-4" aria-labelledby="testimonials-heading">
          <div className="max-w-7xl mx-auto">
            <h2 id="testimonials-heading" className="sr-only">
              Customer Testimonials
            </h2>
            <TestimonialsHeader />
            <TestimonialCards />
          </div>
        </section>
        
        {/* Social Proof Metrics Section */}
        <section className="relative z-10 py-20 px-4" aria-labelledby="metrics-heading">
          <h2 id="metrics-heading" className="sr-only">
            Performance Metrics and Social Proof
          </h2>
          <SocialProofMetrics />
        </section>
        
        {/* Final CTA Section */}
        <section className="relative z-10 py-20 px-4" aria-labelledby="final-cta-heading">
          <div className="max-w-7xl mx-auto">
            <h2 id="final-cta-heading" className="sr-only">
              Get Started Today
            </h2>
            <FinalCTAHeader />
            <ActivityFeed />
            <FinalCTAButtons />
            <TrustIndicators />
          </div>
        </section>

        {/* Footer */}
        <section className="relative z-10 px-4" aria-labelledby="footer-heading">
          <h2 id="footer-heading" className="sr-only">
            Footer Information
          </h2>
          <Footer />
        </section>
      </div>

    </main>
  );
}
