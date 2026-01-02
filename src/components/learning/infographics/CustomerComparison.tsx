'use client';

import { motion } from 'framer-motion';
import { FileText, Gift, MessageCircle, Camera, Ruler, Star, Lightbulb } from 'lucide-react';

interface CustomerTrait {
  icon: React.ReactNode;
  text: string;
}

interface CustomerCard {
  flag: string;
  country: string;
  bgGradient: string;
  borderColor: string;
  accentColor: string;
  traits: CustomerTrait[];
  greeting: string;
}

export default function CustomerComparison() {
  const customers: CustomerCard[] = [
    {
      flag: '🇯🇵',
      country: '일본 고객',
      bgGradient: 'from-red-50 to-pink-50',
      borderColor: 'border-red-200',
      accentColor: 'text-red-500',
      traits: [
        { icon: <FileText className="w-4 h-4" />, text: '상세한 설명 선호' },
        { icon: <Gift className="w-4 h-4" />, text: '포장 퀄리티 중시' },
        { icon: <MessageCircle className="w-4 h-4" />, text: '정중한 소통 선호' },
      ],
      greeting: 'ありがとうございます!',
    },
    {
      flag: '🇺🇸',
      country: '영어권 고객',
      bgGradient: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-200',
      accentColor: 'text-blue-500',
      traits: [
        { icon: <FileText className="w-4 h-4" />, text: '간결한 설명 선호' },
        { icon: <Ruler className="w-4 h-4" />, text: '사이즈 정보 중시' },
        { icon: <Camera className="w-4 h-4" />, text: '리뷰/사진 중시' },
      ],
      greeting: 'Thanks for your purchase!',
    },
  ];

  const commonTips = [
    '고퀄리티 사진',
    'cm 단위 사이즈',
    '소재/관리 안내',
  ];

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-4 sm:p-6 border border-idus-black-10">
      {/* 헤더 */}
      <div className="text-center mb-4 sm:mb-6">
        <motion.h3 
          className="text-base sm:text-lg font-bold text-idus-black mb-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🌏 해외 고객 특성 한눈에 보기
        </motion.h3>
        <motion.p 
          className="text-xs sm:text-sm text-idus-black-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          고객별 맞춤 대응으로 만족도 UP!
        </motion.p>
      </div>

      {/* 비교 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-5">
        {customers.map((customer, cardIndex) => (
          <motion.div
            key={customer.country}
            className={`bg-gradient-to-br ${customer.bgGradient} rounded-xl p-4 sm:p-5 border-2 ${customer.borderColor} relative overflow-hidden`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + cardIndex * 0.15 }}
          >
            {/* 배경 플래그 */}
            <div className="absolute right-2 top-2 text-4xl sm:text-6xl opacity-10">
              {customer.flag}
            </div>

            {/* 헤더 */}
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <motion.div 
                className="text-3xl sm:text-4xl"
                animate={{ 
                  y: [0, -5, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: cardIndex * 0.3,
                }}
              >
                {customer.flag}
              </motion.div>
              <div className={`font-bold ${customer.accentColor} text-base sm:text-lg`}>
                {customer.country}
              </div>
            </div>

            {/* 특성 리스트 */}
            <div className="space-y-2 sm:space-y-2.5 mb-3 sm:mb-4">
              {customer.traits.map((trait, index) => (
                <motion.div
                  key={trait.text}
                  className="flex items-center gap-2 sm:gap-2.5 bg-white/70 rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + cardIndex * 0.1 + index * 0.1 }}
                >
                  <div className={`${customer.accentColor} flex-shrink-0`}>
                    {trait.icon}
                  </div>
                  <span className="text-xs sm:text-sm text-idus-black-70">{trait.text}</span>
                </motion.div>
              ))}
            </div>

            {/* 인사말 예시 */}
            <motion.div 
              className="bg-white/50 rounded-lg p-2.5 sm:p-3 border border-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 + cardIndex * 0.1 }}
            >
              <div className="flex items-start gap-1.5 sm:gap-2">
                <div className={`${customer.accentColor} flex-shrink-0`}>
                  <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="text-[10px] sm:text-xs text-idus-black-50 italic min-w-0 truncate">
                  &quot;{customer.greeting}&quot;
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* 공통 TIP */}
      <motion.div 
        className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-3 sm:p-4 border border-amber-200"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
          </motion.div>
          <span className="font-bold text-amber-700 text-xs sm:text-sm">공통 TIP</span>
        </div>
        
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {commonTips.map((tip, index) => (
            <motion.div
              key={tip}
              className="flex items-center gap-1 sm:gap-1.5 bg-white rounded-full px-2 sm:px-3 py-1 sm:py-1.5 border border-amber-200 shadow-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + index * 0.1 }}
            >
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-500 flex-shrink-0" fill="currentColor" />
              <span className="text-[10px] sm:text-xs text-idus-black-70">{tip}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
