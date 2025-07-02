// A/B Testing Framework - Phase 1.1 Implementation
// Simple, effective A/B testing with statistical significance tracking

import React from 'react';

export interface ABTestVariant {
  id: string;
  name: string;
  weight: number; // 0-1, weights should sum to 1
  content?: React.ReactNode;
  metadata?: Record<string, any>;
}

export interface ABTestConfig {
  testId: string;
  name: string;
  description: string;
  variants: ABTestVariant[];
  startDate: Date;
  endDate?: Date;
  trafficAllocation: number; // 0-1, percentage of users to include
  conversionGoals: string[]; // Array of event names that count as conversions
  minimumSampleSize: number;
  significanceLevel: number; // Default 0.05 (95% confidence)
  enabled: boolean;
}

export interface ABTestResult {
  testId: string;
  variantId: string;
  userId: string;
  timestamp: Date;
  events: ABTestEvent[];
}

export interface ABTestEvent {
  eventName: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface ABTestStats {
  testId: string;
  variant: string;
  visitors: number;
  conversions: number;
  conversionRate: number;
  confidence: number;
  isSignificant: boolean;
  uplift?: number; // Only for non-control variants
}

// Local storage keys
const STORAGE_KEYS = {
  USER_ASSIGNMENTS: 'vibe_ab_assignments',
  TEST_RESULTS: 'vibe_ab_results',
  USER_ID: 'vibe_user_id'
} as const;

class ABTestingFramework {
  private static instance: ABTestingFramework;
  private tests: Map<string, ABTestConfig> = new Map();
  private userAssignments: Map<string, string> = new Map();
  private results: ABTestResult[] = [];
  private userId: string;

  private constructor() {
    this.userId = this.getOrCreateUserId();
    this.loadFromStorage();
  }

  static getInstance(): ABTestingFramework {
    if (!ABTestingFramework.instance) {
      ABTestingFramework.instance = new ABTestingFramework();
    }
    return ABTestingFramework.instance;
  }

  private getOrCreateUserId(): string {
    if (typeof window === 'undefined') return 'ssr-user';
    
    let userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem(STORAGE_KEYS.USER_ID, userId);
    }
    return userId;
  }

  private loadFromStorage(): void {
    if (typeof window === 'undefined') return;

    // Load user assignments
    const savedAssignments = localStorage.getItem(STORAGE_KEYS.USER_ASSIGNMENTS);
    if (savedAssignments) {
      try {
        const assignments = JSON.parse(savedAssignments);
        this.userAssignments = new Map(Object.entries(assignments));
      } catch (e) {
        console.warn('Failed to load A/B test assignments from storage');
      }
    }

    // Load test results
    const savedResults = localStorage.getItem(STORAGE_KEYS.TEST_RESULTS);
    if (savedResults) {
      try {
        this.results = JSON.parse(savedResults).map((result: any) => ({
          ...result,
          timestamp: new Date(result.timestamp),
          events: result.events.map((event: any) => ({
            ...event,
            timestamp: new Date(event.timestamp)
          }))
        }));
      } catch (e) {
        console.warn('Failed to load A/B test results from storage');
      }
    }
  }

  private saveToStorage(): void {
    if (typeof window === 'undefined') return;

    // Save user assignments
    const assignmentsObj = Object.fromEntries(this.userAssignments);
    localStorage.setItem(STORAGE_KEYS.USER_ASSIGNMENTS, JSON.stringify(assignmentsObj));

    // Save test results
    localStorage.setItem(STORAGE_KEYS.TEST_RESULTS, JSON.stringify(this.results));
  }

  // Register a new A/B test
  registerTest(config: ABTestConfig): void {
    // Validate config
    if (!config.testId || !config.variants || config.variants.length < 2) {
      throw new Error('Invalid A/B test configuration');
    }

    // Validate weights sum to 1
    const totalWeight = config.variants.reduce((sum, variant) => sum + variant.weight, 0);
    if (Math.abs(totalWeight - 1) > 0.001) {
      throw new Error('Variant weights must sum to 1');
    }

    this.tests.set(config.testId, config);
  }

  // Get variant for a user (assigns if not already assigned)
  getVariant(testId: string): ABTestVariant | null {
    const test = this.tests.get(testId);
    if (!test || !test.enabled) return null;

    // Check if test is active
    const now = new Date();
    if (now < test.startDate || (test.endDate && now > test.endDate)) {
      return null;
    }

    // Check if user is already assigned
    const existingAssignment = this.userAssignments.get(`${testId}_${this.userId}`);
    if (existingAssignment) {
      return test.variants.find(v => v.id === existingAssignment) || null;
    }

    // Check traffic allocation
    if (Math.random() > test.trafficAllocation) {
      return null; // User not in test
    }

    // Assign user to variant based on weights
    const random = Math.random();
    let cumulative = 0;
    
    for (const variant of test.variants) {
      cumulative += variant.weight;
      if (random <= cumulative) {
        this.userAssignments.set(`${testId}_${this.userId}`, variant.id);
        this.saveToStorage();
        return variant;
      }
    }

    // Fallback to first variant
    const fallbackVariant = test.variants[0];
    this.userAssignments.set(`${testId}_${this.userId}`, fallbackVariant.id);
    this.saveToStorage();
    return fallbackVariant;
  }

  // Track conversion event
  trackEvent(testId: string, eventName: string, metadata?: Record<string, any>): void {
    const test = this.tests.get(testId);
    if (!test || !test.enabled) return;

    const variantId = this.userAssignments.get(`${testId}_${this.userId}`);
    if (!variantId) return; // User not in test

    // Find existing result or create new one
    let result = this.results.find(r => 
      r.testId === testId && 
      r.variantId === variantId && 
      r.userId === this.userId
    );

    if (!result) {
      result = {
        testId,
        variantId,
        userId: this.userId,
        timestamp: new Date(),
        events: []
      };
      this.results.push(result);
    }

    // Add event
    result.events.push({
      eventName,
      timestamp: new Date(),
      metadata
    });

    this.saveToStorage();

    // Send to analytics if available
    this.sendToAnalytics(testId, variantId, eventName, metadata);

    // Track conversion if this event is a conversion goal
    if (test.conversionGoals.includes(eventName)) {
      this.trackConversion(testId, variantId, eventName, metadata);
    }
  }

  // Track conversion with analytics integration
  private trackConversion(testId: string, variantId: string, conversionType: string, metadata?: Record<string, any>): void {
    // Import analytics dynamically to avoid SSR issues
    if (typeof window !== 'undefined') {
      import('@/lib/analytics').then(({ abTesting }) => {
        abTesting.trackConversion(testId, variantId, conversionType, metadata);
      }).catch(err => console.warn('Failed to load analytics:', err));
    }
  }

  private sendToAnalytics(testId: string, variantId: string, eventName: string, metadata?: Record<string, any>): void {
    // Integration with Google Analytics, PostHog, or other analytics tools
    if (typeof window !== 'undefined') {
      // Google Analytics 4
      if ('gtag' in window) {
        (window as any).gtag('event', eventName, {
          ab_test_id: testId,
          ab_test_variant: variantId,
          custom_parameter_1: metadata ? JSON.stringify(metadata) : undefined
        });
      }

      // PostHog
      if ('posthog' in window) {
        (window as any).posthog.capture(eventName, {
          ab_test_id: testId,
          ab_test_variant: variantId,
          ...metadata
        });
      }

      // Custom analytics endpoint
      fetch('/api/analytics/ab-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testId,
          variantId,
          eventName,
          userId: this.userId,
          timestamp: new Date().toISOString(),
          metadata
        })
      }).catch(e => console.warn('Failed to send A/B test data to analytics:', e));
    }
  }

  // Calculate statistical significance using two-proportion z-test
  calculateStats(testId: string): ABTestStats[] {
    const test = this.tests.get(testId);
    if (!test) return [];

    const stats: ABTestStats[] = [];
    const variantResults = new Map<string, { visitors: number; conversions: number }>();

    // Count visitors and conversions per variant
    this.results
      .filter(r => r.testId === testId)
      .forEach(result => {
        const key = result.variantId;
        if (!variantResults.has(key)) {
          variantResults.set(key, { visitors: 0, conversions: 0 });
        }

        const variantStat = variantResults.get(key)!;
        variantStat.visitors++;

        // Check if user converted (any conversion goal event)
        const hasConversion = result.events.some(event => 
          test.conversionGoals.includes(event.eventName)
        );
        if (hasConversion) {
          variantStat.conversions++;
        }
      });

    // Calculate stats for each variant
    const controlVariant = test.variants[0]; // Assume first variant is control
    const controlStats = variantResults.get(controlVariant.id);

    test.variants.forEach(variant => {
      const variantData = variantResults.get(variant.id) || { visitors: 0, conversions: 0 };
      const conversionRate = variantData.visitors > 0 ? variantData.conversions / variantData.visitors : 0;

      let confidence = 0;
      let isSignificant = false;
      let uplift: number | undefined;

      if (variant.id !== controlVariant.id && controlStats && variantData.visitors >= test.minimumSampleSize) {
        // Calculate statistical significance using two-proportion z-test
        const p1 = controlStats.conversions / controlStats.visitors;
        const p2 = conversionRate;
        const n1 = controlStats.visitors;
        const n2 = variantData.visitors;

        if (n1 > 0 && n2 > 0) {
          const pooledP = (controlStats.conversions + variantData.conversions) / (n1 + n2);
          const se = Math.sqrt(pooledP * (1 - pooledP) * (1/n1 + 1/n2));
          const zScore = Math.abs(p2 - p1) / se;
          
          // Two-tailed test
          confidence = 2 * (1 - this.normalCDF(Math.abs(zScore)));
          isSignificant = confidence < test.significanceLevel;
          uplift = p1 > 0 ? ((p2 - p1) / p1) * 100 : 0;
        }
      }

      stats.push({
        testId,
        variant: variant.id,
        visitors: variantData.visitors,
        conversions: variantData.conversions,
        conversionRate: conversionRate * 100, // As percentage
        confidence,
        isSignificant,
        uplift
      });
    });

    return stats;
  }

  // Normal cumulative distribution function (approximation)
  private normalCDF(x: number): number {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp(-x * x / 2);
    const prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return x > 0 ? 1 - prob : prob;
  }

  // Get test configuration
  getTest(testId: string): ABTestConfig | null {
    return this.tests.get(testId) || null;
  }

  // Get all active tests
  getActiveTests(): ABTestConfig[] {
    const now = new Date();
    return Array.from(this.tests.values()).filter(test => 
      test.enabled && 
      now >= test.startDate && 
      (!test.endDate || now <= test.endDate)
    );
  }

  // Export data for analysis
  exportData(testId?: string): any {
    const filteredResults = testId 
      ? this.results.filter(r => r.testId === testId)
      : this.results;

    return {
      tests: testId ? [this.tests.get(testId)] : Array.from(this.tests.values()),
      results: filteredResults,
      stats: testId ? this.calculateStats(testId) : [],
      exportedAt: new Date().toISOString()
    };
  }

  // Clear all data (use with caution)
  clearData(): void {
    this.userAssignments.clear();
    this.results = [];
    this.tests.clear();
    this.saveToStorage();
  }
}

// React Hook for easy A/B testing
export function useABTest(testId: string) {
  const [variant, setVariant] = React.useState<ABTestVariant | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const framework = ABTestingFramework.getInstance();
    const assignedVariant = framework.getVariant(testId);
    setVariant(assignedVariant);
    setLoading(false);
  }, [testId]);

  const trackEvent = React.useCallback((eventName: string, metadata?: Record<string, any>) => {
    const framework = ABTestingFramework.getInstance();
    framework.trackEvent(testId, eventName, metadata);
  }, [testId]);

  return {
    variant,
    loading,
    trackEvent,
    isInTest: variant !== null
  };
}

// React Component for A/B test variants
interface ABTestProps {
  testId: string;
  children: (variant: ABTestVariant | null, trackEvent: (eventName: string, metadata?: any) => void) => React.ReactNode;
  fallback?: React.ReactNode;
}

export const ABTest: React.FC<ABTestProps> = ({ testId, children, fallback }) => {
  const { variant, loading, trackEvent } = useABTest(testId);

  if (loading) {
    return fallback || null;
  }

  return <>{children(variant, trackEvent)}</>;
};

export default ABTestingFramework;