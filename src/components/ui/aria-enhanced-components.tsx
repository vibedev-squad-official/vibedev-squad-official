"use client";

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { 
  generateAriaId, 
  AriaAnnouncer, 
  FocusManager,
  setAriaAttributes,
  visuallyHidden,
  getInteractionHint
} from '@/utils/aria-helpers';

// Screen Reader Only Component
export const SROnly: React.FC<{ children: React.ReactNode; focusable?: boolean }> = ({ 
  children, 
  focusable = false 
}) => {
  const style = focusable ? { ...visuallyHidden, ...{ position: 'static' as const } } : visuallyHidden;
  
  return (
    <span 
      className={cn(!focusable && "sr-only")} 
      style={focusable ? style : undefined}
    >
      {children}
    </span>
  );
};

// Accessible Loading Spinner
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

export const AccessibleLoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  label = 'Loading',
  className 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  useEffect(() => {
    const announcer = AriaAnnouncer.getInstance();
    announcer.announce(label, 'polite');
    
    return () => {
      announcer.announce('Loading complete', 'polite');
    };
  }, [label]);

  return (
    <div 
      role="status" 
      aria-live="polite" 
      aria-label={label}
      className={cn("flex items-center justify-center", className)}
    >
      <div className={cn(
        "animate-spin rounded-full border-2 border-current border-t-transparent",
        sizeClasses[size]
      )} />
      <SROnly>{label}</SROnly>
    </div>
  );
};

// Accessible Progress Bar
interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  className?: string;
}

export const AccessibleProgressBar: React.FC<ProgressBarProps> = ({ 
  value, 
  max = 100, 
  label,
  className 
}) => {
  const percentage = Math.round((value / max) * 100);
  const progressId = useRef(generateAriaId('progress')).current;

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label htmlFor={progressId} className="block text-sm font-medium mb-2">
          {label}
        </label>
      )}
      <div 
        id={progressId}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || `Progress: ${percentage}%`}
        className="relative w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
      >
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
        <SROnly>{`${percentage}% complete`}</SROnly>
      </div>
    </div>
  );
};

// Accessible Alert Component
interface AlertProps {
  type: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  onClose?: () => void;
  className?: string;
}

export const AccessibleAlert: React.FC<AlertProps> = ({ 
  type, 
  title, 
  message, 
  onClose,
  className 
}) => {
  const alertRef = useRef<HTMLDivElement>(null);
  const alertId = useRef(generateAriaId('alert')).current;
  const titleId = useRef(generateAriaId('alert-title')).current;

  const typeConfig = {
    info: { 
      role: 'status', 
      ariaLive: 'polite' as const,
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      textColor: 'text-blue-800 dark:text-blue-200'
    },
    success: { 
      role: 'status', 
      ariaLive: 'polite' as const,
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      textColor: 'text-green-800 dark:text-green-200'
    },
    warning: { 
      role: 'alert', 
      ariaLive: 'polite' as const,
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      textColor: 'text-yellow-800 dark:text-yellow-200'
    },
    error: { 
      role: 'alert', 
      ariaLive: 'assertive' as const,
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800',
      textColor: 'text-red-800 dark:text-red-200'
    }
  };

  const config = typeConfig[type];

  useEffect(() => {
    const announcer = AriaAnnouncer.getInstance();
    const fullMessage = title ? `${title}: ${message}` : message;
    announcer.announce(fullMessage, config.ariaLive);
  }, [title, message, config.ariaLive]);

  return (
    <div
      ref={alertRef}
      id={alertId}
      role={config.role}
      aria-live={config.ariaLive}
      aria-labelledby={title ? titleId : undefined}
      className={cn(
        "relative p-4 rounded-lg border",
        config.bgColor,
        config.borderColor,
        config.textColor,
        className
      )}
    >
      {title && (
        <h3 id={titleId} className="font-semibold mb-1">
          {title}
        </h3>
      )}
      <p className="text-sm">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded hover:bg-black/10 dark:hover:bg-white/10"
          aria-label="Close alert"
        >
          <span aria-hidden="true">×</span>
        </button>
      )}
    </div>
  );
};

// Accessible Skip Links
export const SkipLinks: React.FC = () => {
  return (
    <div className="skip-links">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <a href="#main-navigation" className="skip-link">
        Skip to navigation
      </a>
      <a href="#footer" className="skip-link">
        Skip to footer
      </a>
    </div>
  );
};

// Accessible Modal Wrapper
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const AccessibleModal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  className 
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleId = useRef(generateAriaId('modal-title')).current;
  const focusManager = useRef(new FocusManager()).current;

  useEffect(() => {
    if (isOpen) {
      focusManager.saveFocus();
      const cleanup = modalRef.current ? focusManager.trapFocus(modalRef.current) : undefined;
      
      return () => {
        cleanup?.();
        focusManager.restoreFocus();
      };
    }
  }, [isOpen, focusManager]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-lg mx-auto",
          "bg-white dark:bg-gray-900 rounded-lg shadow-xl z-50 p-6",
          className
        )}
      >
        <h2 id={titleId} className="text-2xl font-bold mb-4">
          {title}
        </h2>
        {children}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          aria-label="Close dialog"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </>
  );
};

// Accessible Tabs Component
interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

export const AccessibleTabs: React.FC<TabsProps> = ({ 
  tabs, 
  defaultTab,
  className 
}) => {
  const [activeTab, setActiveTab] = React.useState(defaultTab || tabs[0]?.id);
  const tabListRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    let newIndex = currentIndex;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        break;
      case 'ArrowRight':
        e.preventDefault();
        newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = tabs.length - 1;
        break;
    }

    if (newIndex !== currentIndex) {
      setActiveTab(tabs[newIndex].id);
      const newTab = tabListRef.current?.querySelector(`[data-tab-id="${tabs[newIndex].id}"]`) as HTMLElement;
      newTab?.focus();
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div 
        ref={tabListRef}
        role="tablist"
        aria-label="Tab navigation"
        className="flex border-b border-gray-200 dark:border-gray-700"
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            data-tab-id={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2 font-medium transition-colors touch-target",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500",
              activeTab === tab.id
                ? "border-b-2 border-cyan-500 text-cyan-600 dark:text-cyan-400"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="mt-4">
        <SROnly>{getInteractionHint('tabs')}</SROnly>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={`tabpanel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            hidden={activeTab !== tab.id}
            tabIndex={0}
            className="focus-visible:outline-none"
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};