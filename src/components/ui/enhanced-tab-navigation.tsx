"use client";

import React, { useState, useEffect, useRef, useCallback, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Home, End, MapPin, DollarSign, Users, Clock, Zap, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

// TypeScript interfaces
interface LocationFilter {
  id: string;
  name: string;
  avgSalary: number;
  description: string;
  costMultiplier: number;
}

interface TabType {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

interface EnhancedTabNavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  className?: string;
  showLocationFilter?: boolean;
  selectedLocation?: string;
  onLocationChange?: (location: string) => void;
}

interface TabContentData {
  [key: string]: {
    title: string;
    description: string;
    metrics: Array<{
      label: string;
      value: string;
      change?: string;
      icon: React.ReactNode;
    }>;
    features: string[];
  };
}

// Location data
const locations: LocationFilter[] = [
  { 
    id: 'sf', 
    name: 'San Francisco', 
    avgSalary: 180000, 
    description: 'High cost, top talent',
    costMultiplier: 1.5
  },
  { 
    id: 'nyc', 
    name: 'New York', 
    avgSalary: 160000, 
    description: 'Financial hub',
    costMultiplier: 1.3
  },
  { 
    id: 'austin', 
    name: 'Austin', 
    avgSalary: 140000, 
    description: 'Tech-friendly',
    costMultiplier: 1.1
  },
  { 
    id: 'remote', 
    name: 'Remote', 
    avgSalary: 120000, 
    description: 'Global talent',
    costMultiplier: 1.0
  }
];

// Tab definitions
const tabs: TabType[] = [
  {
    id: 'ai-tools',
    label: 'AI Tools Comparison',
    description: 'Compare features vs other tools',
    icon: <Zap className="h-4 w-4" />
  },
  {
    id: 'dev-costs',
    label: 'Dev Team Costs',
    description: 'Traditional team vs AI costs',
    icon: <DollarSign className="h-4 w-4" />
  },
  {
    id: 'roi-calculator',
    label: 'ROI Calculator',
    description: 'Calculate your savings',
    icon: <TrendingUp className="h-4 w-4" />
  }
];

// Tab content data
const tabContentData: TabContentData = {
  'ai-tools': {
    title: 'AI Tools Comparison',
    description: 'Compare Vibe DevSquad against other AI development tools',
    metrics: [
      { label: 'Code Quality', value: '95%', change: '+12%', icon: <Zap className="h-4 w-4" /> },
      { label: 'Speed Improvement', value: '10x faster', change: '+25%', icon: <TrendingUp className="h-4 w-4" /> },
      { label: 'Cost Reduction', value: '99%', change: '+5%', icon: <DollarSign className="h-4 w-4" /> },
      { label: 'Team Satisfaction', value: '4.9/5', change: '+8%', icon: <Users className="h-4 w-4" /> }
    ],
    features: [
      'Multi-LLM AI orchestration',
      'Real-time collaboration',
      'Automated testing and deployment',
      'Enterprise security and compliance'
    ]
  },
  'dev-costs': {
    title: 'Development Team Costs',
    description: 'Comprehensive breakdown of development costs by location and role',
    metrics: [
      { label: 'Senior Developer', value: '$150k/year', change: '+12%', icon: <DollarSign className="h-4 w-4" /> },
      { label: 'Team Lead', value: '$180k/year', change: '+8%', icon: <Users className="h-4 w-4" /> },
      { label: 'DevOps Engineer', value: '$160k/year', change: '+15%', icon: <Zap className="h-4 w-4" /> },
      { label: 'UI/UX Designer', value: '$120k/year', change: '+5%', icon: <TrendingUp className="h-4 w-4" /> }
    ],
    features: [
      'Location-based salary adjustments',
      'Benefits and equity packages',
      'Remote work considerations',
      'Contractor vs full-time costs'
    ]
  },
  'roi-calculator': {
    title: 'ROI Calculator',
    description: 'Calculate your potential savings with Vibe DevSquad',
    metrics: [
      { label: 'Monthly Savings', value: '$25k+', icon: <DollarSign className="h-4 w-4" /> },
      { label: 'Yearly Savings', value: '$300k+', icon: <TrendingUp className="h-4 w-4" /> },
      { label: 'Time to ROI', value: '< 1 month', icon: <Clock className="h-4 w-4" /> },
      { label: 'Efficiency Gain', value: '10x faster', icon: <Zap className="h-4 w-4" /> }
    ],
    features: [
      'Interactive cost calculator',
      'Team size optimization',
      'Project timeline planning',
      'Custom pricing scenarios'
    ]
  }
};

// Animation variants
const tabContentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

// Skeleton loader component
const SkeletonLoader: React.FC = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-4 bg-muted/20 rounded w-3/4"></div>
    <div className="h-4 bg-muted/20 rounded w-1/2"></div>
    <div className="h-32 bg-muted/20 rounded"></div>
  </div>
);

// Location filter component
const LocationFilter: React.FC<{
  selectedLocation: string;
  onLocationChange: (location: string) => void;
}> = ({ selectedLocation, onLocationChange }) => {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-foreground/80 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">Select Location</h4>
      <div className="grid grid-cols-2 gap-3">
        {locations.map((location) => (
          <motion.button
            key={location.id}
            onClick={() => onLocationChange(location.id)}
            className={cn(
              "p-3 rounded-lg border text-left transition-all duration-200 touch-target",
              "hover:border-primary/50 hover:bg-accent/50",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2",
              selectedLocation === location.id
                ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                : "border-border bg-card"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            variants={itemVariants}
          >
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="h-3 w-3 text-primary" aria-hidden="true" />
              <span className="font-medium text-sm [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">{location.name}</span>
            </div>
            <div className="text-xs text-muted-foreground mb-1 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
              ${location.avgSalary.toLocaleString()}/year avg
            </div>
            <div className="text-xs text-muted-foreground [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
              {location.description}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// Main enhanced tab navigation component
const EnhancedTabNavigation: React.FC<EnhancedTabNavigationProps> = ({
  activeTab = 'ai-tools',
  onTabChange = () => {},
  className,
  showLocationFilter = false,
  selectedLocation = 'remote',
  onLocationChange = () => {}
}) => {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [announceText, setAnnounceText] = useState('');
  
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update current tab when prop changes
  useEffect(() => {
    setCurrentTab(activeTab);
  }, [activeTab]);

  // Handle tab change with loading state
  const handleTabChange = useCallback((tabId: string, announce = true) => {
    if (tabId === currentTab) return;
    
    setIsLoading(true);
    setCurrentTab(tabId);
    onTabChange(tabId);
    
    // Simulate loading delay for smooth transition
    setTimeout(() => {
      setIsLoading(false);
    }, 300);

    if (announce) {
      const tab = tabs.find(t => t.id === tabId);
      setAnnounceText(`Switched to ${tab?.label} tab`);
    }
  }, [currentTab, onTabChange]);

  // Keyboard navigation handler
  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = tabs.findIndex(tab => tab.id === currentTab);
    
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        setFocusedIndex(prevIndex);
        tabRefs.current[prevIndex]?.focus();
        break;
        
      case 'ArrowRight':
        event.preventDefault();
        const nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        setFocusedIndex(nextIndex);
        tabRefs.current[nextIndex]?.focus();
        break;
        
      case 'Home':
        event.preventDefault();
        setFocusedIndex(0);
        tabRefs.current[0]?.focus();
        break;
        
      case 'End':
        event.preventDefault();
        const lastIndex = tabs.length - 1;
        setFocusedIndex(lastIndex);
        tabRefs.current[lastIndex]?.focus();
        break;
        
      case 'Enter':
      case ' ':
        event.preventDefault();
        handleTabChange(tabs[focusedIndex].id);
        break;
        
      case 'Escape':
        event.preventDefault();
        containerRef.current?.blur();
        break;
    }
  }, [currentTab, focusedIndex, handleTabChange]);

  // Get current location data for dev-costs tab
  const currentLocation = locations.find(loc => loc.id === selectedLocation) || locations[3];
  const adjustedMetrics = currentTab === 'dev-costs' ? 
    tabContentData[currentTab].metrics.map(metric => ({
      ...metric,
      value: metric.label.includes('$') ? 
        `$${Math.round(parseInt(metric.value.replace(/[$k,/year]/g, '')) * currentLocation.costMultiplier)}k/year` :
        metric.value
    })) : tabContentData[currentTab].metrics;

  return (
    <div 
      ref={containerRef}
      className={cn("w-full max-w-4xl mx-auto space-y-6", className)}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      role="application"
      aria-label="Compare development options"
    >
      {/* Screen reader announcements */}
      <div 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      >
        {announceText}
      </div>

      {/* Tab navigation */}
      <div 
        role="tablist" 
        aria-label="Development comparison tabs"
        className="flex flex-wrap gap-2 p-2 backdrop-blur-xl border border-white/10 rounded-2xl"
      >
        {tabs.map((tab, index) => (
          <motion.button
            key={tab.id}
            ref={(el) => { tabRefs.current[index] = el; }}
            role="tab"
            aria-selected={currentTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            aria-describedby={`tab-desc-${tab.id}`}
            tabIndex={currentTab === tab.id ? 0 : -1}
            className={cn(
              "relative flex-1 px-6 py-4 rounded-xl transition-all duration-300",
              "text-left overflow-hidden group touch-target",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2",
              currentTab === tab.id
                ? "text-white"
                : "text-gray-400 hover:text-gray-200"
            )}
            onClick={() => handleTabChange(tab.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Active tab background */}
            {currentTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-xl border border-white/20"
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30
                }}
              />
            )}

            {/* Hover effect for inactive tabs */}
            {currentTab !== tab.id && (
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}

            {/* Tab content */}
            <div className="relative z-10 flex items-center gap-3">
              {tab.icon}
              <div>
                <div className={cn(
                  "font-semibold text-sm sm:text-base mb-1 transition-colors duration-300 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]",
                  currentTab === tab.id 
                    ? "bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                    : "text-gray-300"
                )}>
                  {tab.label}
                </div>
                <div className={cn(
                  "text-xs transition-colors duration-300 hidden sm:block [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]",
                  currentTab === tab.id ? "text-gray-300" : "text-gray-500"
                )}>
                  {tab.description}
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Keyboard shortcuts hint */}
      <div className="text-xs text-muted-foreground flex items-center gap-4 px-2 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
        <span>Use arrow keys to navigate</span>
        <span className="hidden sm:inline">• Press Enter to select</span>
        <span className="hidden sm:inline">• Home/End to jump</span>
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTab}
          role="tabpanel"
          id={`tabpanel-${currentTab}`}
          aria-labelledby={`tab-${currentTab}`}
          className="space-y-6"
          variants={tabContentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <>
              {/* Location filter for dev-costs tab */}
              {currentTab === 'dev-costs' && showLocationFilter && (
                <motion.div variants={itemVariants}>
                  <LocationFilter
                    selectedLocation={selectedLocation}
                    onLocationChange={onLocationChange}
                  />
                </motion.div>
              )}

              {/* Metrics grid */}
              <motion.div 
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {adjustedMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    variants={itemVariants}
                    className="p-4 rounded-lg border bg-card/50 backdrop-blur-sm hover:bg-accent/50 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {metric.icon}
                      <span className="text-sm font-medium text-muted-foreground [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                        {metric.label}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                      {metric.value}
                    </div>
                    {metric.change && (
                      <div className={cn(
                        "text-xs font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]",
                        metric.change.startsWith('+') ? "text-green-600" : "text-red-600"
                      )}>
                        {metric.change} from last quarter
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>

              {/* Features list */}
              <motion.div variants={itemVariants} className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tabContentData[currentTab].features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      variants={itemVariants}
                      className="flex items-center gap-2 p-3 rounded-lg bg-accent/30 backdrop-blur-sm"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary" aria-hidden="true"></div>
                      <span className="text-sm text-foreground [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Location-specific insights for dev-costs */}
              {currentTab === 'dev-costs' && (
                <motion.div variants={itemVariants} className="p-4 rounded-lg bg-primary/5 border border-primary/20 backdrop-blur-sm">
                  <h4 className="font-semibold text-foreground mb-2 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                    {currentLocation.name} Insights
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                    Based on current market data for {currentLocation.name} ({currentLocation.description.toLowerCase()})
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">Cost Multiplier:</span>
                      <div className="text-lg font-bold text-primary [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                        {currentLocation.costMultiplier}x
                      </div>
                    </div>
                    <div>
                      <span className="font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">Average Salary:</span>
                      <div className="text-lg font-bold text-primary [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                        ${currentLocation.avgSalary.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">Market Trend:</span>
                      <div className="text-lg font-bold text-green-600 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                        Growing
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export { EnhancedTabNavigation, type EnhancedTabNavigationProps };
export default EnhancedTabNavigation;