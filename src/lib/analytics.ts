import { track } from '@vercel/analytics';

// Type declarations for gtag
declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'set',
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

// Analytics utility functions for Vibe DevSquad landing page
export const analytics = {
  // Page view tracking
  pageView: (page: string) => {
    track('page_view', { page });
  },

  // Hero section interactions
  heroAction: (action: string, section: string) => {
    track('hero_action', { action, section });
  },

  // CTA button clicks
  ctaClick: (button: string, location: string) => {
    track('cta_click', { button, location });
  },

  // Pricing interactions
  pricingAction: (action: string, tier?: string) => {
    track('pricing_action', { action, ...(tier && { tier }) });
  },

  // Comparison tool interactions
  comparisonAction: (action: string, tab?: string) => {
    track('comparison_action', { action, ...(tab && { tab }) });
  },

  // ROI calculator interactions
  roiCalculator: (action: string, inputs?: Record<string, number>) => {
    track('roi_calculator', { action, ...inputs });
  },

  // Feature section interactions
  featureInteraction: (feature: string, action: string) => {
    track('feature_interaction', { feature, action });
  },

  // Navigation tracking
  navigationClick: (item: string, type: string) => {
    track('navigation_click', { item, type });
  },

  // Form interactions
  formAction: (form: string, action: string) => {
    track('form_action', { form, action });
  },

  // Video/media interactions
  mediaAction: (media: string, action: string) => {
    track('media_action', { media, action });
  },

  // Scroll depth tracking
  scrollDepth: (depth: number, section: string) => {
    track('scroll_depth', { depth, section });
  },

  // Error tracking
  error: (error: string, context: string) => {
    track('error', { error, context });
  },

  // Conversion funnel tracking
  conversionStep: (step: string, funnel: string) => {
    track('conversion_step', { step, funnel });
  },

  // Custom event tracking
  customEvent: (event: string, metadata?: Record<string, any>) => {
    track('custom_event', { event, ...metadata });
  }
};

// Performance tracking utilities
export const performance = {
  // Track page load performance
  pageLoad: (loadTime: number, page: string) => {
    track('page_performance', { loadTime, page });
  },

  // Track component render performance
  componentRender: (component: string, renderTime: number) => {
    track('component_performance', { component, renderTime });
  },

  // Track animation performance
  animationPerformance: (animation: string, fps: number) => {
    track('animation_performance', { animation, fps });
  }
};

// Conversion tracking utilities
export const conversion = {
  // Track trial signups
  trialSignup: (tier: string, source: string) => {
    track('trial_signup', { tier, source });
  },

  // Track demo requests
  demoRequest: (tier: string, source: string) => {
    track('demo_request', { tier, source });
  },

  // Track newsletter signups
  newsletterSignup: (source: string) => {
    track('newsletter_signup', { source });
  },

  // Track contact form submissions
  contactSubmission: (type: string, source: string) => {
    track('contact_submission', { type, source });
  }
};

// A/B Testing Conversion Tracking
export const abTesting = {
  // Track A/B test conversion events
  trackConversion: (testId: string, variantId: string, conversionType: string, metadata?: Record<string, any>) => {
    try {
      // Track in Google Analytics if available
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'ab_test_conversion', {
          test_id: testId,
          variant_id: variantId,
          conversion_type: conversionType,
          ...metadata
        });
      }

      // Track in custom analytics
      const event = {
        type: 'ab_test_conversion',
        testId,
        variantId,
        conversionType,
        timestamp: new Date().toISOString(),
        metadata
      };

      // Send to analytics endpoint
      if (typeof window !== 'undefined') {
        fetch('/api/analytics/ab-test', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(event)
        }).catch(err => console.warn('Analytics tracking failed:', err));
      }

      console.log('A/B Test Conversion Tracked:', event);
    } catch (error) {
      console.warn('Failed to track A/B test conversion:', error);
    }
  },

  // Track A/B test assignment
  trackAssignment: (testId: string, variantId: string, metadata?: Record<string, any>) => {
    try {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'ab_test_assignment', {
          test_id: testId,
          variant_id: variantId,
          ...metadata
        });
      }

      const event = {
        type: 'ab_test_assignment',
        testId,
        variantId,
        timestamp: new Date().toISOString(),
        metadata
      };

      console.log('A/B Test Assignment Tracked:', event);
    } catch (error) {
      console.warn('Failed to track A/B test assignment:', error);
    }
  },

  // Track key conversion goals
  trackTrialStart: (source: string, testId?: string, variantId?: string) => {
    analytics.customEvent('trial_start', { source });
    if (testId && variantId) {
      abTesting.trackConversion(testId, variantId, 'trial_start', { source });
    }
  },

  trackDemoRequest: (source: string, testId?: string, variantId?: string) => {
    analytics.customEvent('demo_request', { source });
    if (testId && variantId) {
      abTesting.trackConversion(testId, variantId, 'demo_request', { source });
    }
  },

  trackEmailSignup: (source: string, testId?: string, variantId?: string) => {
    analytics.customEvent('email_signup', { source });
    if (testId && variantId) {
      abTesting.trackConversion(testId, variantId, 'email_signup', { source });
    }
  },

  trackROICalculatorUse: (savings: number, testId?: string, variantId?: string) => {
    analytics.customEvent('roi_calculator_use', { savings });
    if (testId && variantId) {
      abTesting.trackConversion(testId, variantId, 'roi_calculator_use', { savings });
    }
  }
}; 