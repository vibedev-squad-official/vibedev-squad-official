// Performance-optimized animation utilities for 60fps animations

// GPU-accelerated transform properties
export const gpuAccelerated = {
  transform: 'translate3d(0, 0, 0)',
  willChange: 'transform, opacity'
};

// Reduced motion variants
export const reducedMotionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

// Standard animation variants with GPU acceleration
export const fadeInVariants = {
  hidden: { 
    opacity: 0,
    ...gpuAccelerated
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

export const slideInVariants = {
  hidden: { 
    opacity: 0,
    x: -20,
    ...gpuAccelerated
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  }
};

export const scaleInVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.9,
    ...gpuAccelerated
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
};

// Stagger children animations
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerItemVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
    ...gpuAccelerated
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  }
};

// Check for reduced motion preference
export const shouldReduceMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get appropriate animation variants based on user preference
export const getAnimationVariants = (standardVariants: any, reducedVariants = reducedMotionVariants) => {
  return shouldReduceMotion() ? reducedVariants : standardVariants;
};

// Performance-optimized spring configuration
export const springConfig = {
  stiffness: 400,
  damping: 30,
  mass: 1
};

// Smooth spring for value animations
export const smoothSpring = {
  tension: 120,
  friction: 40
};

// Optimized scroll animations
export const scrollTriggerProps = {
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

// CSS-only animation classes for critical animations
export const cssAnimationClasses = {
  fadeIn: 'animate-fadeIn',
  slideIn: 'animate-slideIn',
  scaleIn: 'animate-scaleIn',
  pulse: 'animate-pulse',
  spin: 'animate-spin'
};

// Intersection Observer options for lazy loading
export const lazyLoadOptions = {
  root: null,
  rootMargin: '50px',
  threshold: 0.01
};

// Debounce function for animations
export const debounceAnimation = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// RAF-based smooth scroll
export const smoothScrollTo = (element: HTMLElement, to: number, duration: number) => {
  const start = element.scrollTop;
  const change = to - start;
  const startTime = performance.now();

  const animateScroll = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function
    const easeInOutQuad = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    
    element.scrollTop = start + change * easeInOutQuad(progress);
    
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

// Optimize animation frame rate
export const optimizeAnimationFrame = (callback: Function) => {
  let ticking = false;
  
  return (...args: any[]) => {
    if (!ticking) {
      requestAnimationFrame(() => {
        callback(...args);
        ticking = false;
      });
      ticking = true;
    }
  };
};

// Prefers reduced motion hook for React
export const usePrefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mediaQuery.matches;
};