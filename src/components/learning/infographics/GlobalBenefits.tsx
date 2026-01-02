'use client';

import { motion } from 'framer-motion';
import { Globe, Coins, Rocket, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

interface StatCard {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext: string;
  color: string;
  bgColor: string;
}

// 숫자 카운트업 애니메이션 훅
function useCountUp(end: number, duration: number = 1500, delay: number = 0) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
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
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [end, duration, delay]);
  
  return count;
}

function AnimatedNumber({ value, suffix = '', delay = 0 }: { value: number; suffix?: string; delay?: number }) {
  const count = useCountUp(value, 1500, delay);
  return <span>{count}{suffix}</span>;
}

export default function GlobalBenefits() {
  const stats: StatCard[] = [
    {
      icon: <Globe className="w-7 h-7" />,
      label: '시장 규모',
      value: '32',
      subtext: '국내 대비 해외 시장',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: <Coins className="w-7 h-7" />,
      label: '주문 금액',
      value: '2',
      subtext: '해외 고객 평균 주문액',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      icon: <Rocket className="w-7 h-7" />,
      label: '판매 국가',
      value: '45',
      subtext: '배송 가능 국가',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 border border-idus-black-10">
      {/* 헤더 */}
      <div className="text-center mb-6">
        <motion.h3 
          className="text-lg font-bold text-idus-black mb-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🌍 글로벌 시장, 왜 도전해야 할까요?
        </motion.h3>
        <motion.p 
          className="text-sm text-idus-black-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          숫자로 보는 글로벌 시장의 가능성
        </motion.p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className={`${stat.bgColor} rounded-xl p-3 sm:p-4 text-center border border-white shadow-sm`}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.15, type: 'spring', stiffness: 200 }}
          >
            {/* 아이콘 */}
            <motion.div 
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${stat.bgColor} border-2 border-white shadow-md
                          flex items-center justify-center mx-auto mb-2 sm:mb-3 ${stat.color}`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {stat.icon}
            </motion.div>
            
            {/* 숫자 - 단위와 함께 한 줄로 표시 */}
            <div className={`text-xl sm:text-3xl font-black ${stat.color} whitespace-nowrap`}>
              <AnimatedNumber 
                value={parseInt(stat.value)} 
                suffix={stat.label === '판매 국가' ? '개국' : '배'} 
                delay={300 + index * 150}
              />
            </div>
            
            {/* 레이블 */}
            <div className="text-[10px] sm:text-xs text-idus-black-50 leading-tight mt-1">
              {stat.subtext}
            </div>
          </motion.div>
        ))}
      </div>

      {/* K-핸드메이드 배너 */}
      <motion.div 
        className="bg-gradient-to-r from-idus-orange-light/50 to-amber-100 rounded-xl p-3 sm:p-4 border border-idus-orange/20"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <motion.div
            className="flex-shrink-0"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-idus-orange" />
          </motion.div>
          <span className="text-sm sm:text-base whitespace-nowrap">
            <span className="font-bold text-idus-orange">K-핸드메이드</span>
            <span className="text-idus-black-70"> 해외 인기 급상승 중!</span>
          </span>
        </div>
      </motion.div>
    </div>
  );
}
