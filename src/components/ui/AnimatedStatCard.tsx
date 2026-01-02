'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface AnimatedStatCardProps {
  value: number;
  suffix: string;
  label: string;
  icon?: React.ReactNode;
  delay?: number;
  color?: string;
}

// 카운트업 애니메이션 훅
function useCountUp(end: number, duration: number = 1500, shouldStart: boolean = false) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!shouldStart) return;
    
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // easeOutExpo 이징
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, shouldStart]);
  
  return count;
}

export default function AnimatedStatCard({
  value,
  suffix,
  label,
  icon,
  delay = 0,
  color = 'text-idus-orange',
}: AnimatedStatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [shouldAnimate, setShouldAnimate] = useState(false);
  
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShouldAnimate(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay]);
  
  const count = useCountUp(value, 1500, shouldAnimate);

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-2xl p-4 md:p-6 text-center shadow-sm border border-idus-black-10 
                 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: delay / 1000, duration: 0.5 }}
    >
      {icon && (
        <motion.div 
          className="flex justify-center mb-2"
          animate={shouldAnimate ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {icon}
        </motion.div>
      )}
      <motion.div 
        className={`text-2xl md:text-4xl font-bold ${color} mb-1`}
        animate={shouldAnimate ? { scale: [0.8, 1.1, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        {count}{suffix}
      </motion.div>
      <div className="text-xs md:text-sm text-idus-black-50">{label}</div>
    </motion.div>
  );
}
