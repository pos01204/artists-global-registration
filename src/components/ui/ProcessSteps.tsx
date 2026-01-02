'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export interface ProcessStep {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  status: 'completed' | 'current' | 'pending';
}

interface ProcessStepsProps {
  steps: ProcessStep[];
  className?: string;
}

export default function ProcessSteps({ steps, className = '' }: ProcessStepsProps) {
  const getStatusStyles = (status: ProcessStep['status']) => {
    switch (status) {
      case 'completed':
        return {
          circle: 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30',
          text: 'text-green-600',
          subtext: 'text-green-500',
          line: 'bg-green-500',
        };
      case 'current':
        return {
          circle: 'bg-gradient-to-br from-idus-orange to-amber-500 text-white shadow-lg shadow-idus-orange/30 ring-4 ring-idus-orange/20',
          text: 'text-idus-orange',
          subtext: 'text-idus-orange',
          line: 'bg-gray-200',
        };
      case 'pending':
        return {
          circle: 'bg-gray-100 text-gray-400 border-2 border-gray-200',
          text: 'text-gray-400',
          subtext: 'text-gray-300',
          line: 'bg-gray-200',
        };
    }
  };

  return (
    <div className={`${className}`}>
      <div className="flex items-center">
        {steps.map((step, index) => {
          const styles = getStatusStyles(step.status);
          const isLast = index === steps.length - 1;

          return (
            <div key={index} className={`flex items-center ${isLast ? '' : 'flex-1'}`}>
              {/* Step */}
              <motion.div 
                className="flex flex-col items-center w-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                {/* Circle */}
                <motion.div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${styles.circle}`}
                  animate={step.status === 'current' ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {step.status === 'completed' ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.15 + 0.2, type: 'spring', stiffness: 300 }}
                    >
                      <Check className="w-6 h-6" strokeWidth={3} />
                    </motion.div>
                  ) : (
                    step.icon
                  )}
                </motion.div>
                
                {/* Text */}
                <div className={`text-xs font-medium ${styles.text} text-center whitespace-nowrap`}>
                  {step.title}
                </div>
                {step.subtitle && (
                  <div className={`text-xs ${styles.subtext}`}>
                    {step.subtitle}
                  </div>
                )}
              </motion.div>

              {/* Connector Line */}
              {!isLast && (
                <div className="flex-1 h-1 mx-1 -mt-6 relative overflow-hidden rounded-full bg-gray-200 min-w-[40px]">
                  <motion.div
                    className={`absolute inset-y-0 left-0 ${styles.line}`}
                    initial={{ width: 0 }}
                    animate={{ width: step.status === 'completed' ? '100%' : '0%' }}
                    transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
