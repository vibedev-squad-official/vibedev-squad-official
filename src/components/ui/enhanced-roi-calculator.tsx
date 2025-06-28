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

interface EnhancedROICalculatorProps {
  className?: string;
  onLeadCapture?: (email: string, results: CalculationResults) => void;
  showSocialProof?: boolean;
}

interface LeadCaptureProps {
  isOpen: boolean;
  onClose: () => void;
  calculationResults: CalculationResults;
  onSubmit: (email: string, name: string, company: string) => void;
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
  onSubmit 
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
    await new Promise(resolve => setTimeout(resolve, 1500));
    onSubmit(formData.email, formData.name, formData.company);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-black/90 backdrop-blur-xl border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
            {isSubmitted ? 'Success!' : getPersonalizedCTA(calculationResults.savings)}
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  <AnimatedNumber value={calculationResults.savings} format="currency" />
                </div>
                <p className="text-gray-400 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">Annual savings potential</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                <div className="flex items-center gap-2 text-sm text-gray-300 mb-2 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                  <Sparkles className="h-4 w-4 text-cyan-400" />
                  <span>Join 2,500+ companies already saving with Vibe DevSquad</span>
                </div>
                <div className="text-xs text-gray-400 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                  $50M+ saved across all customers • 99.9% uptime guarantee
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gray-200 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={cn(
                        "pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-cyan-500",
                        errors.name && "border-red-500"
                      )}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-200 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={cn(
                        "pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-cyan-500",
                        errors.email && "border-red-500"
                      )}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="company" className="text-gray-200 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">Company (Optional)</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="company"
                      type="text"
                      placeholder="Your company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-cyan-500"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  size="lg"
                >
                  {isSubmitting ? (
                    <motion.div
                      className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Get My Savings Report
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-4"
            >
              <motion.div
                className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <CheckCircle className="w-8 h-8 text-green-400" />
              </motion.div>
              <h3 className="text-xl font-bold text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">Thank you, {formData.name}!</h3>
              <p className="text-gray-300 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                We'll send your personalized savings report to {formData.email} within 24 hours.
              </p>
              <Button onClick={onClose} variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Close
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

const presetSizes = [
  { size: 5, label: '5 people', description: 'Small team' },
  { size: 10, label: '10 people', description: 'Growing startup' },
  { size: 25, label: '25 people', description: 'Scale-up' },
  { size: 50, label: '50+ people', description: 'Enterprise' }
];

export function EnhancedROICalculator({ 
  className = '',
  onLeadCapture,
  showSocialProof = true 
}: EnhancedROICalculatorProps) {
  const [calculatorState, setCalculatorState] = useState<CalculatorState>({
    teamSize: 25,
    avgSalary: 85000,
    benefits: 35
  });

  const [results, setResults] = useState<CalculationResults>({
    traditionalCost: 0,
    vibeDevSquadCost: 0,
    savings: 0,
    roi: 0,
    monthlyRun: 0,
    perEmployee: 0
  });

  const [isLeadCaptureOpen, setIsLeadCaptureOpen] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  // Dynamic pricing based on team size (from the original calculator)
  const getVibeDevSquadCost = (teamSize: number) => {
    if (teamSize <= 5) return 99 * 12; // Solo: $1,188
    if (teamSize <= 50) return 299 * 12; // Growing Team: $3,588
    if (teamSize <= 100) return 999 * 12; // Business: $11,988
    return 12000; // Enterprise: $12,000
  };

  const debouncedCalculate = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (values: CalculatorState) => {
        clearTimeout(timeoutId);
        setIsCalculating(true);
        timeoutId = setTimeout(() => {
          calculateROI(values);
          setIsCalculating(false);
        }, 300);
      };
    })(),
    []
  );

  const calculateROI = (state: CalculatorState) => {
    const { teamSize, avgSalary, benefits } = state;
    
    const traditionalCost = teamSize * avgSalary * (1 + benefits / 100);
    const vibeDevSquadCost = getVibeDevSquadCost(teamSize);
    const savings = traditionalCost - vibeDevSquadCost;
    const roi = savings > 0 ? (savings / traditionalCost) * 100 : 0;
    const monthlyRun = traditionalCost / 12;
    const perEmployee = savings / teamSize;

    setResults({
      traditionalCost,
      vibeDevSquadCost,
      savings,
      roi,
      monthlyRun,
      perEmployee
    });
  };

  React.useEffect(() => {
    debouncedCalculate(calculatorState);
  }, [calculatorState, debouncedCalculate]);

  const handlePresetClick = (size: number) => {
    setCalculatorState(prev => ({ ...prev, teamSize: size }));
  };

  const handleSliderChange = (field: keyof CalculatorState, value: number[]) => {
    setCalculatorState(prev => ({ ...prev, [field]: value[0] }));
  };

  const handleLeadCapture = (email: string, name: string, company: string) => {
    if (onLeadCapture) {
      onLeadCapture(email, results);
    }
  };

  return (
    <div className={cn("w-full max-w-6xl mx-auto", className)}>
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
            ROI Calculator
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-300 max-w-2xl mx-auto [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]"
        >
          Calculate your potential savings with Vibe DevSquad
        </motion.p>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Controls */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <div className="relative p-8 rounded-2xl backdrop-blur-xl border border-white/10 bg-white/5">
            {/* Neon glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-75" />
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                  Input Parameters
                </span>
              </h3>

              {/* Preset Team Size Buttons */}
              <div className="mb-8">
                <label className="text-lg font-semibold text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)] block mb-4">
                  Quick Select Team Size
                </label>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {presetSizes.map((preset) => (
                    <motion.button
                      key={preset.size}
                      onClick={() => handlePresetClick(preset.size)}
                      className={cn(
                        "p-3 rounded-lg border text-left transition-all touch-target",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2",
                        calculatorState.teamSize === preset.size
                          ? "border-cyan-400 bg-cyan-500/20 text-cyan-300"
                          : "border-white/20 bg-white/5 hover:border-cyan-400/50 hover:bg-cyan-500/10 text-gray-300"
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">{preset.label}</div>
                      <div className="text-sm text-gray-400 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">{preset.description}</div>
                    </motion.button>
                  ))}
                </div>

                {/* Team Size Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-base font-medium text-white/80 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">Custom Size</label>
                    <div className="px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-400/30">
                      <span className="text-blue-300 font-bold [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">{calculatorState.teamSize} people</span>
                    </div>
                  </div>
                  <div className="relative">
                    <Slider
                      value={[calculatorState.teamSize]}
                      onValueChange={(value) => handleSliderChange('teamSize', value)}
                      min={1}
                      max={100}
                      step={1}
                      className="w-full"
                      aria-label="Team size"
                    />
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg blur-sm -z-10" />
                  </div>
                </div>
              </div>

              {/* Average Salary Slider */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-lg font-semibold text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">Average Salary</label>
                  <div className="px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-400/30">
                    <span className="text-purple-300 font-bold [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                      <AnimatedNumber value={calculatorState.avgSalary} format="currency" />
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <Slider
                    value={[calculatorState.avgSalary]}
                    onValueChange={(value) => handleSliderChange('avgSalary', value)}
                    min={60000}
                    max={200000}
                    step={5000}
                    className="w-full"
                    aria-label="Average salary"
                  />
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur-sm -z-10" />
                </div>
              </div>

              {/* Benefits Percentage Slider */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-lg font-semibold text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">Benefits & Overhead</label>
                  <div className="px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400/30">
                    <span className="text-cyan-300 font-bold [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">{calculatorState.benefits}%</span>
                  </div>
                </div>
                <div className="relative">
                  <Slider
                    value={[calculatorState.benefits]}
                    onValueChange={(value) => handleSliderChange('benefits', value)}
                    min={20}
                    max={50}
                    step={5}
                    className="w-full"
                    aria-label="Benefits and overhead percentage"
                  />
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-lg blur-sm -z-10" />
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          {showSocialProof && (
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg backdrop-blur-sm border border-white/10 bg-white/5 text-center">
                <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">2,500+</div>
                <div className="text-sm text-gray-400 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">Teams Using</div>
              </div>
              <div className="p-4 rounded-lg backdrop-blur-sm border border-white/10 bg-white/5 text-center">
                <TrendingUp className="h-6 w-6 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">$50M+</div>
                <div className="text-sm text-gray-400 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">Total Saved</div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Results Display */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Live region for accessibility */}
          <div 
            aria-live="polite" 
            aria-atomic="true"
            className="sr-only"
          >
            Savings updated to <AnimatedNumber value={results.savings} format="currency" />
          </div>

          {/* Traditional Team Cost */}
          <div className="relative p-6 rounded-2xl backdrop-blur-xl border border-red-400/30 bg-red-500/5">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-2xl blur opacity-75" />
            <div className="relative z-10">
              <div className="flex justify-between items-center">
                <span className="text-red-300 text-lg font-semibold [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">Traditional Team Cost</span>
                <span className="text-2xl font-bold text-red-400 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                  <AnimatedNumber value={results.traditionalCost} format="currency" />
                </span>
              </div>
              <p className="text-red-300/80 text-sm mt-2 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">Annual cost with benefits & overhead</p>
            </div>
          </div>

          {/* Vibe DevSquad Cost */}
          <div className="relative p-6 rounded-2xl backdrop-blur-xl border border-green-400/30 bg-green-500/5">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-2xl blur opacity-75" />
            <div className="relative z-10">
              <div className="flex justify-between items-center">
                <span className="text-green-300 text-lg font-semibold [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">Vibe DevSquad Cost</span>
                <span className="text-2xl font-bold text-green-400 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                  <AnimatedNumber value={results.vibeDevSquadCost} format="currency" />
                </span>
              </div>
              <p className="text-green-300/80 text-sm mt-2 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">Annual subscription cost</p>
            </div>
          </div>

          {/* Your Annual Savings */}
          <div className="relative p-6 rounded-2xl backdrop-blur-xl border border-white/20 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-2xl blur opacity-75" />
            <div className="relative z-10">
              <div className="flex justify-between items-center">
                <span className="text-white text-lg font-semibold [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">Your Annual Savings</span>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  <AnimatedNumber value={results.savings} format="currency" />
                </span>
              </div>
              <div className="flex items-center mt-2">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mr-2">
                  <AnimatedNumber value={results.roi} format="percent" />
                </span>
                <span className="text-white/80 text-sm [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">savings rate</span>
              </div>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg backdrop-blur-xl border border-white/10 bg-white/5 text-center">
              <div className="text-xl font-bold text-blue-300 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                <AnimatedNumber value={results.savings / 12} format="currency" />
              </div>
              <div className="text-white/60 text-sm [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">Monthly Savings</div>
            </div>
            <div className="p-4 rounded-lg backdrop-blur-xl border border-white/10 bg-white/5 text-center">
              <div className="text-xl font-bold text-purple-300 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                <AnimatedNumber value={results.perEmployee} format="currency" />
              </div>
              <div className="text-white/60 text-sm [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">Per Employee</div>
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            onClick={() => setIsLeadCaptureOpen(true)}
            className="w-full relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 group touch-target focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300" />
            <span className="relative flex items-center justify-center gap-2">
              <Send className="h-5 w-5" />
              Save My Results & Get Report
            </span>
          </motion.button>

          <p className="text-white/60 text-sm text-center [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
            Join 2,500+ teams who switched this month
          </p>
        </motion.div>
      </div>

      {/* CTA Integration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12 text-center"
      >
        <p className="text-white/60 text-sm [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
          * Results are estimates based on industry averages and may vary depending on specific implementation.
        </p>
      </motion.div>

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={isLeadCaptureOpen}
        onClose={() => setIsLeadCaptureOpen(false)}
        calculationResults={results}
        onSubmit={handleLeadCapture}
      />
    </div>
  );
}