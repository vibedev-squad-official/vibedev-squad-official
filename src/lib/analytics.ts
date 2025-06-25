import { track } from '@vercel/analytics';

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