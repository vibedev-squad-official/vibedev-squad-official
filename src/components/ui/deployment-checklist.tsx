'use client';

import { cn } from '@/lib/utils';
import { motion, useInView } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useRef } from 'react';

interface ChecklistItem {
  id: string;
  text: string;
}

const checklistItems: ChecklistItem[] = [
  {
    id: 'learn',
    text: 'AI agents learn your codebase and preferences',
  },
  {
    id: 'integrate',
    text: 'Integrate with your existing tools (VS Code, GitHub, etc.)',
  },
  {
    id: 'workflows',
    text: 'Set up automated workflows and quality gates',
  },
  {
    id: 'permissions',
    text: 'Configure team roles and permissions',
  },
];

interface DeploymentChecklistProps {
  className?: string;
}

export function DeploymentChecklist({ className }: DeploymentChecklistProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative w-full px-4 py-16",
        className
      )}
    >
      <div className="max-w-4xl mx-auto">
        {/* Step 2 Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Step 2: Deploy Your AI Squad
          </h3>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Your AI agents will automatically set up and configure themselves to work with your existing development environment.
          </p>
        </motion.div>

        {/* Checklist Container */}
        <motion.div
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Neon glow border effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-500/20 blur-xl -z-10 opacity-50" />

          {/* Checklist Items */}
          <div className="space-y-6">
            {checklistItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="flex items-center gap-4 p-4 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Green Checkmark with Neon Glow */}
                <motion.div
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <CheckCircle className="w-5 h-5 text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                </motion.div>

                {/* Checklist Item Text */}
                <motion.p
                  className="text-white text-lg flex-1"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  {item.text}
                </motion.p>

                {/* Decorative pulse */}
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-400 opacity-0"
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    delay: index * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    boxShadow: '0 0 10px rgba(34, 197, 94, 0.8)',
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Bottom decorative line */}
          <motion.div
            className="flex justify-center items-center gap-4 mt-8 pt-8 border-t border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
            <div className="w-16 h-px bg-gradient-to-r from-green-400 to-emerald-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
            <div className="w-16 h-px bg-gradient-to-r from-emerald-400 to-green-400" />
            <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 