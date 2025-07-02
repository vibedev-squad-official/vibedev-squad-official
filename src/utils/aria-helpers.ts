// ARIA Helper Utilities for Enhanced Accessibility

// Generate unique IDs for ARIA relationships
let idCounter = 0;
export const generateAriaId = (prefix: string = 'aria'): string => {
  if (typeof window === 'undefined') return `${prefix}-ssr`;
  return `${prefix}-${++idCounter}`;
};

// ARIA Live Region Announcer
export class AriaAnnouncer {
  private static instance: AriaAnnouncer;
  private liveRegion: HTMLElement | null = null;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.createLiveRegion();
    }
  }

  static getInstance(): AriaAnnouncer {
    if (!AriaAnnouncer.instance) {
      AriaAnnouncer.instance = new AriaAnnouncer();
    }
    return AriaAnnouncer.instance;
  }

  private createLiveRegion(): void {
    this.liveRegion = document.createElement('div');
    this.liveRegion.setAttribute('role', 'status');
    this.liveRegion.setAttribute('aria-live', 'polite');
    this.liveRegion.setAttribute('aria-atomic', 'true');
    this.liveRegion.className = 'sr-only';
    document.body.appendChild(this.liveRegion);
  }

  announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    if (!this.liveRegion) return;
    
    this.liveRegion.setAttribute('aria-live', priority);
    this.liveRegion.textContent = message;
    
    // Clear after announcement
    setTimeout(() => {
      if (this.liveRegion) {
        this.liveRegion.textContent = '';
      }
    }, 1000);
  }

  destroy(): void {
    if (this.liveRegion && this.liveRegion.parentNode) {
      this.liveRegion.parentNode.removeChild(this.liveRegion);
      this.liveRegion = null;
    }
  }
}

// ARIA Labels for common patterns
export const ariaLabels = {
  navigation: {
    main: 'Main navigation',
    breadcrumb: 'Breadcrumb navigation',
    pagination: 'Pagination navigation',
    social: 'Social media links'
  },
  
  buttons: {
    close: 'Close dialog',
    menu: 'Open menu',
    search: 'Search',
    submit: 'Submit form',
    previous: 'Go to previous item',
    next: 'Go to next item',
    play: 'Play video',
    pause: 'Pause video',
    mute: 'Mute audio',
    unmute: 'Unmute audio'
  },
  
  form: {
    required: 'Required field',
    error: 'Error:',
    success: 'Success:',
    loading: 'Loading, please wait',
    emailHint: 'Enter your email address',
    passwordHint: 'Enter your password',
    submitHint: 'Submit the form'
  },
  
  states: {
    loading: 'Content is loading',
    loaded: 'Content loaded',
    error: 'An error occurred',
    empty: 'No results found',
    selected: 'Currently selected',
    expanded: 'Expanded',
    collapsed: 'Collapsed'
  }
};

// Focus Management
export class FocusManager {
  private previousFocus: HTMLElement | null = null;
  
  saveFocus(): void {
    this.previousFocus = document.activeElement as HTMLElement;
  }
  
  restoreFocus(): void {
    if (this.previousFocus && this.previousFocus.focus) {
      this.previousFocus.focus();
    }
  }
  
  trapFocus(container: HTMLElement): () => void {
    const focusableElements = container.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      const isTabPressed = e.key === 'Tab';
      
      if (!isTabPressed) return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus();
          e.preventDefault();
        }
      }
    };
    
    container.addEventListener('keydown', handleKeyDown);
    
    // Set initial focus
    if (firstFocusable) {
      firstFocusable.focus();
    }
    
    // Return cleanup function
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }
}

// ARIA Attributes Helper
export const setAriaAttributes = (
  element: HTMLElement,
  attributes: Record<string, string | boolean | number>
): void => {
  Object.entries(attributes).forEach(([key, value]) => {
    if (key.startsWith('aria-') || key === 'role') {
      element.setAttribute(key, String(value));
    }
  });
};

// Screen Reader Only Text Component Props
export interface SROnlyProps {
  children: React.ReactNode;
  focusable?: boolean;
}

// Keyboard Navigation Keys
export const KEYS = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
  TAB: 'Tab'
};

// Role-based ARIA properties
export const getRoleProps = (role: string): Record<string, any> => {
  switch (role) {
    case 'tablist':
      return {
        role: 'tablist',
        'aria-orientation': 'horizontal'
      };
    case 'tab':
      return {
        role: 'tab',
        'aria-selected': false,
        tabIndex: -1
      };
    case 'tabpanel':
      return {
        role: 'tabpanel',
        tabIndex: 0
      };
    case 'navigation':
      return {
        role: 'navigation'
      };
    case 'main':
      return {
        role: 'main'
      };
    case 'banner':
      return {
        role: 'banner'
      };
    case 'contentinfo':
      return {
        role: 'contentinfo'
      };
    default:
      return {};
  }
};

// Visibility helpers
export const visuallyHidden: React.CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0
};

// Announce page changes for SPAs
export const announcePageChange = (pageTitle: string): void => {
  const announcer = AriaAnnouncer.getInstance();
  announcer.announce(`Navigated to ${pageTitle}`, 'polite');
  
  // Update document title
  if (typeof document !== 'undefined') {
    document.title = `${pageTitle} - Vibe DevSquad`;
  }
};

// Describe complex interactions
export const getInteractionHint = (component: string): string => {
  const hints: Record<string, string> = {
    tabs: 'Use arrow keys to navigate between tabs, Enter or Space to select',
    carousel: 'Use arrow keys to navigate between slides',
    accordion: 'Use arrow keys to navigate, Enter or Space to expand/collapse',
    modal: 'Press Escape to close',
    menu: 'Use arrow keys to navigate menu items',
    slider: 'Use arrow keys to adjust value',
    combobox: 'Type to search, use arrow keys to navigate suggestions'
  };
  
  return hints[component] || '';
};