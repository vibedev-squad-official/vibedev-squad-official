// Analytics Integration for A/B Testing - Phase 1.1
// Centralized analytics tracking with A/B test support

export interface AnalyticsEvent {
  eventName: string;
  properties?: Record<string, any>;
  userId?: string;
  sessionId?: string;
  timestamp?: Date;
}

export interface ABTestAnalyticsEvent extends AnalyticsEvent {
  testId: string;
  variantId: string;
  testName?: string;
  variantName?: string;
}

class AnalyticsManager {
  private static instance: AnalyticsManager;
  private sessionId: string;
  private userId: string | null = null;
  private isInitialized = false;

  private constructor() {
    this.sessionId = this.generateSessionId();
    this.initialize();
  }

  static getInstance(): AnalyticsManager {
    if (!AnalyticsManager.instance) {
      AnalyticsManager.instance = new AnalyticsManager();
    }
    return AnalyticsManager.instance;
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private initialize(): void {
    if (typeof window === 'undefined') return;

    // Initialize Google Analytics 4
    this.initializeGA4();
    
    // Initialize PostHog (if available)
    this.initializePostHog();
    
    // Initialize custom analytics endpoint
    this.initializeCustomAnalytics();

    this.isInitialized = true;
  }

  private initializeGA4(): void {
    // Check if GA4 is already loaded
    if ('gtag' in window) {
      // Configure GA4 for A/B testing
      (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        custom_map: {
          'custom_parameter_1': 'ab_test_id',
          'custom_parameter_2': 'ab_test_variant',
          'custom_parameter_3': 'ab_test_name'
        }
      });
    }
  }

  private initializePostHog(): void {
    // PostHog integration for A/B testing
    if ('posthog' in window) {
      (window as any).posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
        loaded: (posthog: any) => {
          // Set up A/B test feature flags
          posthog.onFeatureFlags(() => {
            console.log('PostHog feature flags loaded');
          });
        }
      });
    }
  }

  private initializeCustomAnalytics(): void {
    // Custom analytics setup
    if (typeof window !== 'undefined') {
      // Set up user identification
      this.userId = localStorage.getItem('vibe_user_id') || this.sessionId;
      
      // Track page load
      this.track('page_load', {
        url: window.location.href,
        referrer: document.referrer,
        user_agent: navigator.userAgent
      });
    }
  }

  // General event tracking
  track(eventName: string, properties?: Record<string, any>): void {
    if (!this.isInitialized) {
      console.warn('Analytics not initialized yet');
      return;
    }

    const event: AnalyticsEvent = {
      eventName,
      properties: {
        ...properties,
        session_id: this.sessionId,
        timestamp: new Date().toISOString(),
        url: typeof window !== 'undefined' ? window.location.href : undefined
      },
      userId: this.userId || undefined,
      sessionId: this.sessionId,
      timestamp: new Date()
    };

    // Send to Google Analytics
    this.sendToGA4(event);
    
    // Send to PostHog
    this.sendToPostHog(event);
    
    // Send to custom endpoint
    this.sendToCustomEndpoint(event);

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', event);
    }
  }

  // A/B Test specific tracking
  trackABTest(abTestEvent: ABTestAnalyticsEvent): void {
    const enhancedProperties = {
      ...abTestEvent.properties,
      ab_test_id: abTestEvent.testId,
      ab_test_variant: abTestEvent.variantId,
      ab_test_name: abTestEvent.testName,
      ab_test_variant_name: abTestEvent.variantName
    };

    this.track(abTestEvent.eventName, enhancedProperties);
  }

  // Conversion tracking
  trackConversion(eventName: string, value?: number, currency = 'USD', properties?: Record<string, any>): void {
    const conversionEvent = {
      ...properties,
      conversion_value: value,
      conversion_currency: currency,
      is_conversion: true
    };

    this.track(eventName, conversionEvent);

    // Special handling for conversion events in GA4
    if ('gtag' in window && value) {
      (window as any).gtag('event', 'purchase', {
        transaction_id: `conv_${Date.now()}`,
        value: value,
        currency: currency,
        items: [{
          item_id: eventName,
          item_name: eventName,
          quantity: 1,
          price: value
        }]
      });
    }
  }

  // User identification
  identify(userId: string, traits?: Record<string, any>): void {
    this.userId = userId;
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('vibe_user_id', userId);
    }

    // Send to analytics platforms
    if ('gtag' in window) {
      (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        user_id: userId
      });
    }

    if ('posthog' in window) {
      (window as any).posthog.identify(userId, traits);
    }

    this.track('user_identified', { user_id: userId, ...traits });
  }

  private sendToGA4(event: AnalyticsEvent): void {
    if (typeof window === 'undefined' || !('gtag' in window)) return;

    (window as any).gtag('event', event.eventName, {
      event_category: 'engagement',
      event_label: event.eventName,
      custom_parameter_1: event.properties?.ab_test_id,
      custom_parameter_2: event.properties?.ab_test_variant,
      custom_parameter_3: event.properties?.ab_test_name,
      ...event.properties
    });
  }

  private sendToPostHog(event: AnalyticsEvent): void {
    if (typeof window === 'undefined' || !('posthog' in window)) return;

    (window as any).posthog.capture(event.eventName, {
      ...event.properties,
      $session_id: this.sessionId,
      $user_id: this.userId
    });
  }

  private sendToCustomEndpoint(event: AnalyticsEvent): void {
    if (typeof window === 'undefined') return;

    // Send to custom analytics API
    fetch('/api/analytics/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...event,
        client_timestamp: Date.now(),
        user_id: this.userId,
        session_id: this.sessionId
      })
    }).catch(error => {
      console.warn('Failed to send event to custom analytics:', error);
    });
  }

  // Page tracking for SPAs
  trackPageView(path?: string, title?: string): void {
    const url = path || (typeof window !== 'undefined' ? window.location.pathname : '/');
    const pageTitle = title || (typeof document !== 'undefined' ? document.title : 'Unknown Page');

    this.track('page_view', {
      page_url: url,
      page_title: pageTitle,
      page_referrer: typeof document !== 'undefined' ? document.referrer : undefined
    });

    // GA4 page view
    if ('gtag' in window) {
      (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        page_path: url,
        page_title: pageTitle
      });
    }
  }

  // Error tracking
  trackError(error: Error, context?: Record<string, any>): void {
    this.track('error', {
      error_message: error.message,
      error_stack: error.stack,
      error_name: error.name,
      ...context
    });
  }

  // Performance tracking
  trackPerformance(metric: string, value: number, unit = 'ms'): void {
    this.track('performance_metric', {
      metric_name: metric,
      metric_value: value,
      metric_unit: unit
    });

    // Send to GA4 as custom metric
    if ('gtag' in window) {
      (window as any).gtag('event', 'timing_complete', {
        name: metric,
        value: value
      });
    }
  }

  // A/B Test result tracking
  trackABTestResult(testId: string, variantId: string, outcome: 'win' | 'lose' | 'neutral', confidence?: number): void {
    this.track('ab_test_result', {
      test_id: testId,
      variant_id: variantId,
      outcome,
      confidence,
      timestamp: new Date().toISOString()
    });
  }

  // Funnel tracking
  trackFunnelStep(funnelName: string, stepName: string, stepIndex: number, properties?: Record<string, any>): void {
    this.track('funnel_step', {
      funnel_name: funnelName,
      step_name: stepName,
      step_index: stepIndex,
      ...properties
    });
  }

  // Get session information
  getSessionInfo() {
    return {
      sessionId: this.sessionId,
      userId: this.userId,
      isInitialized: this.isInitialized
    };
  }
}

// Convenience functions
export const analytics = AnalyticsManager.getInstance();

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  analytics.track(eventName, properties);
};

export const trackABTestEvent = (abTestEvent: ABTestAnalyticsEvent) => {
  analytics.trackABTest(abTestEvent);
};

export const trackConversion = (eventName: string, value?: number, currency = 'USD', properties?: Record<string, any>) => {
  analytics.trackConversion(eventName, value, currency, properties);
};

export const identifyUser = (userId: string, traits?: Record<string, any>) => {
  analytics.identify(userId, traits);
};

export const trackPageView = (path?: string, title?: string) => {
  analytics.trackPageView(path, title);
};

export const trackError = (error: Error, context?: Record<string, any>) => {
  analytics.trackError(error, context);
};

export const trackPerformance = (metric: string, value: number, unit = 'ms') => {
  analytics.trackPerformance(metric, value, unit);
};

export default AnalyticsManager;