"use client";

import ABTestingFramework from '@/utils/ab-testing.tsx';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface ABTestContextType {
  framework: ABTestingFramework | null;
  isReady: boolean;
}

const ABTestContext = createContext<ABTestContextType>({
  framework: null,
  isReady: false
});

export const useABTestContext = () => {
  const context = useContext(ABTestContext);
  if (!context) {
    throw new Error('useABTestContext must be used within an ABTestProvider');
  }
  return context;
};

interface ABTestProviderProps {
  children: React.ReactNode;
}

export const ABTestProvider: React.FC<ABTestProviderProps> = ({ children }) => {
  const [framework, setFramework] = useState<ABTestingFramework | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Initialize A/B testing framework
    const abFramework = ABTestingFramework.getInstance();
    
    // Register hero headline test
    abFramework.registerTest({
      testId: 'hero-headline-test',
      name: 'Hero Headline Optimization',
      description: 'Test different hero headlines for conversion optimization',
      variants: [
        {
          id: 'control',
          name: 'Control: Original Headline',
          weight: 0.34,
          metadata: {
            headline: 'From One Developer to Unlimited Teams',
            subheadline: 'Scale your development with AI-powered automation'
          }
        },
        {
          id: 'variant-a',
          name: 'Variant A: Value Proposition',
          weight: 0.33,
          metadata: {
            headline: 'Stop Paying $30K/Month for What AI Can Do for $99',
            subheadline: 'Replace Your Expensive Dev Team with AI Agents Today'
          }
        },
        {
          id: 'variant-b',
          name: 'Variant B: Direct Problem Solution',
          weight: 0.33,
          metadata: {
            headline: 'Replace Your Expensive Dev Team with AI Agents',
            subheadline: 'Get unlimited development capacity for 99% less cost'
          }
        }
      ],
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      trafficAllocation: 1.0, // 100% of users
      conversionGoals: [
        'cta_click_primary',
        'cta_click_secondary', 
        'roi_calculator_use',
        'demo_request',
        'email_signup',
        'trial_start'
      ],
      minimumSampleSize: 100,
      significanceLevel: 0.05,
      enabled: true
    });

    // Register CTA button test
    abFramework.registerTest({
      testId: 'cta-button-test',
      name: 'CTA Button Copy Optimization',
      description: 'Test different CTA button copy for higher conversion',
      variants: [
        {
          id: 'control',
          name: 'Control: Generic CTA',
          weight: 0.25,
          metadata: {
            primaryCTA: 'Start Free Trial',
            secondaryCTA: 'Learn More'
          }
        },
        {
          id: 'variant-outcome',
          name: 'Variant: Outcome-Focused',
          weight: 0.25,
          metadata: {
            primaryCTA: 'Get My AI Development Team Free',
            secondaryCTA: 'Replace My $30K Agency Today'
          }
        },
        {
          id: 'variant-urgency',
          name: 'Variant: Urgency-Based',
          weight: 0.25,
          metadata: {
            primaryCTA: 'Start Saving 99% in 5 Minutes',
            secondaryCTA: 'Join 2,500+ Teams Today'
          }
        },
        {
          id: 'variant-specific',
          name: 'Variant: Specific Value',
          weight: 0.25,
          metadata: {
            primaryCTA: 'Save $360K This Year',
            secondaryCTA: 'See How Much You\'ll Save'
          }
        }
      ],
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      trafficAllocation: 1.0,
      conversionGoals: [
        'cta_click_primary',
        'cta_click_secondary',
        'trial_start',
        'demo_request'
      ],
      minimumSampleSize: 150,
      significanceLevel: 0.05,
      enabled: true
    });

    // Register ROI calculator test
    abFramework.registerTest({
      testId: 'roi-calculator-test',
      name: 'ROI Calculator Engagement',
      description: 'Test ROI calculator placement and interaction patterns',
      variants: [
        {
          id: 'control',
          name: 'Control: Standard Placement',
          weight: 0.5,
          metadata: {
            placement: 'section',
            style: 'standard'
          }
        },
        {
          id: 'variant-prominent',
          name: 'Variant: Prominent Placement',
          weight: 0.5,
          metadata: {
            placement: 'hero',
            style: 'prominent'
          }
        }
      ],
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      trafficAllocation: 1.0,
      conversionGoals: [
        'roi_calculator_start',
        'roi_calculator_complete',
        'roi_save_results',
        'email_capture'
      ],
      minimumSampleSize: 200,
      significanceLevel: 0.05,
      enabled: true
    });

    setFramework(abFramework);
    setIsReady(true);
  }, []);

  const value = {
    framework,
    isReady
  };

  return (
    <ABTestContext.Provider value={value}>
      {children}
    </ABTestContext.Provider>
  );
};

export default ABTestProvider;