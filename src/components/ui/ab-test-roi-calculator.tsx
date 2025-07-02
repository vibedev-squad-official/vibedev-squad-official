"use client";

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import { 
  Calculator,
  Users,
  DollarSign,
  TrendingUp,
  Mail,
  Building,
  User,
  Send,
  ArrowRight,
  CheckCircle,
  X,
  Sparkles,
  Shield,
  Clock,
  Globe,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { useABTest } from '@/utils/ab-testing';
import { trackEvent, trackConversion } from '@/utils/analytics';

interface CalculationResults {
  traditionalCost: number;
  vibeDevSquadCost: number;
  savings: number;
  roi: number;
  monthlyRun: number;
  perEmployee: number;
}

interface CalculatorState {
  teamSize: number;
  avgSalary: number;
  benefits: number;
}

interface ABTestROICalculatorProps {
  className?: string;
  onLeadCapture?: (email: string, results: CalculationResults) => void;
  showSocialProof?: boolean;
}

interface LeadCaptureProps {
  isOpen: boolean;
  onClose: () => void;
  calculationResults: CalculationResults;
  onSubmit: (email: string, name: string, company: string) => void;
  variant?: string;
}

interface AnimatedNumberProps {
  value: number;
  format?: 'currency' | 'percent' | 'number';
  prefix?: string;
  suffix?: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ 
  value, 
  format = 'currency', 
  prefix = '', 
  suffix = '' 
}) => {
  const { number } = useSpring({
    number: value,
    config: { tension: 120, friction: 40 }
  });

  const formatValue = (n: number, fmt: string) => {
    switch (fmt) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(n);
      case 'percent':
        return `${Math.round(n)}%`;
      case 'number':
        return Math.round(n).toLocaleString();
      default:
        return n.toString();
    }
  };

  return (
    <animated.span>
      {number.to(n => `${prefix}${formatValue(n, format)}${suffix}`)}
    </animated.span>
  );
};

const LeadCaptureModal: React.FC<LeadCaptureProps> = ({ 
  isOpen, 
  onClose, 
  calculationResults, 
  onSubmit,
  variant
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const getPersonalizedCTA = (savings: number) => {
    if (savings < 100000) {
      return `Start Saving $${Math.round(savings / 1000)}k This Year`;
    } else if (savings < 500000) {
      return `Unlock $${Math.round(savings / 1000)}k in Annual Savings`;
    } else {
      return `Transform Your Business with $${Math.round(savings / 1000)}k+ Savings`;
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData.email, formData.name, formData.company);
      
      // Track conversion with A/B test context
      trackConversion('email_capture', calculationResults.savings, 'USD', {
        roi_calculator_variant: variant,
        calculated_savings: calculationResults.savings,
        team_size: calculationResults.traditionalCost / 120000, // Rough estimate
        form_data: formData
      });
      
      setIsSubmitted(true);
      
      // Close modal after delay
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setFormData({ name: '', email: '', company: '' });
      }, 2000);
    } catch (error) {
      console.error('Error submitting lead:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center text-center space-y-4 py-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center"
            >
              <CheckCircle className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold">Thank You!</h3>
            <p className="text-muted-foreground">
              Your savings report has been sent to {formData.email}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            Save Your Personalized ROI Report
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Results Summary */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                <AnimatedNumber value={calculationResults.savings} format="currency" />
              </div>
              <div className="text-sm text-muted-foreground">Annual Savings Potential</div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={errors.name ? 'border-red-500' : ''}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Acme Inc."
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={errors.email ? 'border-red-500' : ''}
                placeholder="john@company.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    {getPersonalizedCTA(calculationResults.savings)}
                  </div>
                )}
              </Button>
            </div>
          </form>

          <div className="text-xs text-center text-muted-foreground">
            By submitting, you agree to receive your personalized ROI report and occasional updates about Vibe DevSquad.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const ABTestROICalculator: React.FC<ABTestROICalculatorProps> = ({ 
  className, 
  onLeadCapture,
  showSocialProof = true 
}) => {
  const roiTest = useABTest('roi-calculator-test');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  
  const [state, setState] = useState<CalculatorState>({
    teamSize: 5,
    avgSalary: 120000,
    benefits: 30
  });
  
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Track calculator start
  React.useEffect(() => {
    if (isInView && !hasInteracted) {
      roiTest.trackEvent('roi_calculator_view', {
        variant: roiTest.variant?.id,
        placement: roiTest.variant?.metadata?.placement || 'section'
      });
    }
  }, [isInView, hasInteracted, roiTest]);

  const calculateROI = useCallback((currentState: CalculatorState) => {
    const annualSalaryPerPerson = currentState.avgSalary;
    const benefitsMultiplier = 1 + (currentState.benefits / 100);
    const totalCostPerPerson = annualSalaryPerPerson * benefitsMultiplier;
    
    // Traditional development team cost
    const traditionalCost = totalCostPerPerson * currentState.teamSize;
    
    // Vibe DevSquad cost calculation
    const baseVibeDevSquadCost = 1188; // $99/month * 12
    const vibeDevSquadCost = baseVibeDevSquadCost * currentState.teamSize;
    
    // Calculate savings and ROI
    const savings = traditionalCost - vibeDevSquadCost;
    const roi = ((savings / vibeDevSquadCost) * 100);
    const monthlyRun = savings / 12;
    const perEmployee = savings / currentState.teamSize;
    
    return {
      traditionalCost,
      vibeDevSquadCost,
      savings,
      roi,
      monthlyRun,
      perEmployee
    };
  }, []);

  const updateCalculation = useCallback((newState: CalculatorState) => {
    setState(newState);
    const newResults = calculateROI(newState);
    setResults(newResults);
    
    if (!hasInteracted) {
      setHasInteracted(true);
      roiTest.trackEvent('roi_calculator_start', {
        variant: roiTest.variant?.id,
        initial_team_size: newState.teamSize,
        initial_salary: newState.avgSalary
      });
    }
    
    // Track calculation with debouncing
    const timeoutId = setTimeout(() => {
      roiTest.trackEvent('roi_calculator_update', {
        variant: roiTest.variant?.id,
        team_size: newState.teamSize,
        avg_salary: newState.avgSalary,
        benefits_percent: newState.benefits,
        calculated_savings: newResults.savings,
        calculated_roi: newResults.roi
      });
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [calculateROI, hasInteracted, roiTest]);

  const handlePresetClick = (teamSize: number) => {
    updateCalculation({ ...state, teamSize });
    
    roiTest.trackEvent('preset_button_click', {
      variant: roiTest.variant?.id,
      selected_team_size: teamSize
    });
  };

  const handleSaveResults = () => {
    if (results) {
      setShowLeadCapture(true);
      
      roiTest.trackEvent('save_results_click', {
        variant: roiTest.variant?.id,
        savings_amount: results.savings,
        team_size: state.teamSize
      });
    }
  };

  const handleLeadSubmit = async (email: string, name: string, company: string) => {
    if (results && onLeadCapture) {
      await onLeadCapture(email, results);
      
      roiTest.trackEvent('roi_save_results', {
        variant: roiTest.variant?.id,
        email,
        name,
        company,
        savings_amount: results.savings,
        team_size: state.teamSize
      });
    }
  };

  // Initialize calculation
  React.useEffect(() => {
    const initialResults = calculateROI(state);
    setResults(initialResults);
  }, [calculateROI, state]);

  // Determine placement style based on A/B test
  const isProminentPlacement = roiTest.variant?.metadata?.placement === 'hero';
  const calculatorStyle = roiTest.variant?.metadata?.style === 'prominent' ? 'prominent' : 'standard';

  const presetSizes = [
    { size: 5, label: '5 devs', popular: false },
    { size: 10, label: '10 devs', popular: true },
    { size: 25, label: '25 devs', popular: false },
    { size: 50, label: '50+ devs', popular: false }
  ];

  if (roiTest.loading) {
    return (
      <div className={cn("flex items-center justify-center p-8", className)}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className={cn(
          "w-full max-w-4xl mx-auto",
          isProminentPlacement ? "mb-16" : "my-12",
          className
        )}
      >
        <Card className={cn(
          "backdrop-blur-xl bg-white/10 border-white/20",
          calculatorStyle === 'prominent' && "ring-2 ring-cyan-500/50 shadow-2xl"
        )}>
          <CardHeader className="text-center">
            <CardTitle className={cn(
              "flex items-center justify-center gap-3",
              calculatorStyle === 'prominent' ? "text-3xl" : "text-2xl"
            )}>
              <Calculator className={cn(
                "text-cyan-400",
                calculatorStyle === 'prominent' ? "w-8 h-8" : "w-6 h-6"
              )} />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                ROI Calculator
              </span>
            </CardTitle>
            <p className="text-white/80 max-w-2xl mx-auto">
              Calculate your potential savings by switching to AI-powered development
            </p>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Team Size Presets */}
            <div className="space-y-4">
              <Label className="text-white font-medium flex items-center gap-2">
                <Users className="w-4 h-4" />
                Select Your Team Size
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {presetSizes.map((preset) => (
                  <Button
                    key={preset.size}
                    variant={state.teamSize === preset.size ? 'default' : 'outline'}
                    className={cn(
                      "relative transition-all duration-300",
                      state.teamSize === preset.size
                        ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                        : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                    )}
                    onClick={() => handlePresetClick(preset.size)}
                  >
                    {preset.popular && (
                      <div className="absolute -top-2 -right-2">
                        <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold">
                          Popular
                        </span>
                      </div>
                    )}
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Team Size Slider */}
            <div className="space-y-4">
              <Label className="text-white font-medium">
                Or set custom team size: {state.teamSize} developers
              </Label>
              <Slider
                value={[state.teamSize]}
                onValueChange={(value) => updateCalculation({ ...state, teamSize: value[0] })}
                max={100}
                min={1}
                step={1}
                className="w-full"
              />
            </div>

            {/* Average Salary */}
            <div className="space-y-4">
              <Label className="text-white font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Average Developer Salary: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(state.avgSalary)}
              </Label>
              <Slider
                value={[state.avgSalary]}
                onValueChange={(value) => updateCalculation({ ...state, avgSalary: value[0] })}
                max={250000}
                min={60000}
                step={5000}
                className="w-full"
              />
            </div>

            {/* Benefits Percentage */}
            <div className="space-y-4">
              <Label className="text-white font-medium flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Benefits & Overhead: {state.benefits}%
              </Label>
              <Slider
                value={[state.benefits]}
                onValueChange={(value) => updateCalculation({ ...state, benefits: value[0] })}
                max={60}
                min={15}
                step={5}
                className="w-full"
              />
            </div>

            {/* Results */}
            {results && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6"
              >
                <Card className="bg-gradient-to-br from-red-500/20 to-red-600/20 border-red-400/30">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-red-300 mb-2">
                      <AnimatedNumber value={results.traditionalCost} format="currency" />
                    </div>
                    <div className="text-sm text-white/70">Traditional Team Cost/Year</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-400/30">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-blue-300 mb-2">
                      <AnimatedNumber value={results.vibeDevSquadCost} format="currency" />
                    </div>
                    <div className="text-sm text-white/70">Vibe DevSquad Cost/Year</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-400/30">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-green-300 mb-2">
                      <AnimatedNumber value={results.savings} format="currency" />
                    </div>
                    <div className="text-sm text-white/70">Annual Savings</div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Key Metrics */}
            {results && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-cyan-400">
                    <AnimatedNumber value={results.roi} format="percent" />
                  </div>
                  <div className="text-xs text-white/60">ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-400">
                    <AnimatedNumber value={results.monthlyRun} format="currency" />
                  </div>
                  <div className="text-xs text-white/60">Monthly Savings</div>
                </div>
                <div className="text-center md:col-span-1 col-span-2">
                  <div className="text-lg font-bold text-pink-400">
                    <AnimatedNumber value={results.perEmployee} format="currency" />
                  </div>
                  <div className="text-xs text-white/60">Savings Per Developer</div>
                </div>
              </div>
            )}

            {/* CTA Button */}
            {results && (
              <div className="text-center pt-6">
                <Button
                  onClick={handleSaveResults}
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Save My ROI Report - {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(results.savings)} Savings
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Button>
                
                {showSocialProof && (
                  <p className="text-white/60 text-sm mt-3">
                    Join 2,500+ companies already saving with Vibe DevSquad
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={showLeadCapture}
        onClose={() => setShowLeadCapture(false)}
        calculationResults={results!}
        onSubmit={handleLeadSubmit}
        variant={roiTest.variant?.id}
      />

      {/* A/B Test Debug Info (development only) */}
      {process.env.NODE_ENV === 'development' && roiTest.variant && (
        <div className="fixed bottom-20 right-4 bg-black/80 text-white p-2 rounded text-xs font-mono">
          ROI Test: {roiTest.variant.name}
          <br />
          Placement: {roiTest.variant.metadata?.placement}
          <br />
          Style: {roiTest.variant.metadata?.style}
        </div>
      )}
    </>
  );
};

export default ABTestROICalculator;