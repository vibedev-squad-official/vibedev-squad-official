// Web Vitals monitoring and reporting

export interface Metric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  entries: PerformanceEntry[];
}

// Core Web Vitals thresholds
const thresholds = {
  LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint
  FID: { good: 100, poor: 300 },   // First Input Delay
  CLS: { good: 0.1, poor: 0.25 },  // Cumulative Layout Shift
  FCP: { good: 1800, poor: 3000 }, // First Contentful Paint
  TTFB: { good: 800, poor: 1800 }  // Time to First Byte
};

// Get rating based on value and thresholds
function getRating(metric: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = thresholds[metric as keyof typeof thresholds];
  if (!threshold) return 'good';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

// Report metric to analytics or console
export function reportWebVitals(metric: Metric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta
    });
  }

  // Send to analytics in production
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.rating,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true
    });
  }
}

// Initialize web vitals tracking
export async function initWebVitals() {
  if (typeof window === 'undefined') return;

  try {
    const { onCLS, onFID, onLCP, onFCP, onTTFB } = await import('web-vitals');

    onCLS((metric) => {
      reportWebVitals({
        ...metric,
        rating: getRating('CLS', metric.value)
      });
    });

    onFID((metric) => {
      reportWebVitals({
        ...metric,
        rating: getRating('FID', metric.value)
      });
    });

    onLCP((metric) => {
      reportWebVitals({
        ...metric,
        rating: getRating('LCP', metric.value)
      });
    });

    onFCP((metric) => {
      reportWebVitals({
        ...metric,
        rating: getRating('FCP', metric.value)
      });
    });

    onTTFB((metric) => {
      reportWebVitals({
        ...metric,
        rating: getRating('TTFB', metric.value)
      });
    });
  } catch (error) {
    console.error('Failed to load web-vitals:', error);
  }
}

// Custom performance marks
export function markPerformance(markName: string) {
  if (typeof window !== 'undefined' && window.performance) {
    performance.mark(markName);
  }
}

// Measure between marks
export function measurePerformance(measureName: string, startMark: string, endMark: string) {
  if (typeof window !== 'undefined' && window.performance) {
    try {
      performance.measure(measureName, startMark, endMark);
      const measure = performance.getEntriesByName(measureName)[0];
      
      if (measure) {
        console.log(`[Performance] ${measureName}: ${measure.duration.toFixed(2)}ms`);
      }
    } catch (error) {
      console.error('Performance measurement failed:', error);
    }
  }
}

// Resource timing analysis
export function analyzeResourceTiming() {
  if (typeof window === 'undefined' || !window.performance) return;

  const resources = performance.getEntriesByType('resource');
  const analysis = {
    totalResources: resources.length,
    totalSize: 0,
    slowResources: [] as any[],
    byType: {} as Record<string, number>
  };

  resources.forEach((resource: any) => {
    const duration = resource.responseEnd - resource.startTime;
    
    // Track slow resources (> 500ms)
    if (duration > 500) {
      analysis.slowResources.push({
        name: resource.name,
        duration: duration.toFixed(2),
        type: resource.initiatorType
      });
    }

    // Group by type
    if (!analysis.byType[resource.initiatorType]) {
      analysis.byType[resource.initiatorType] = 0;
    }
    analysis.byType[resource.initiatorType]++;
  });

  return analysis;
}

// Check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Check connection speed
export function getConnectionSpeed(): 'slow' | 'medium' | 'fast' | 'unknown' {
  if (typeof window === 'undefined' || !('connection' in navigator)) {
    return 'unknown';
  }

  const connection = (navigator as any).connection;
  const effectiveType = connection.effectiveType;

  switch (effectiveType) {
    case 'slow-2g':
    case '2g':
      return 'slow';
    case '3g':
      return 'medium';
    case '4g':
      return 'fast';
    default:
      return 'unknown';
  }
}

// Adaptive loading based on connection
export function shouldLoadHeavyResources(): boolean {
  const speed = getConnectionSpeed();
  const reducedMotion = prefersReducedMotion();
  
  // Don't load heavy resources on slow connections or reduced motion
  return speed !== 'slow' && !reducedMotion;
}