'use client';

import { motion } from 'framer-motion';
import { Package, Truck, Warehouse, Plane, Check, ArrowRight } from 'lucide-react';

interface Step {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: string;
  bgColor: string;
}

export default function ShippingFlow() {
  const steps: Step[] = [
    {
      icon: <Package className="w-6 h-6" />,
      title: '작가님 포장/국내 발송',
      subtitle: '국내 택배로 발송',
      color: 'text-idus-orange',
      bgColor: 'bg-idus-orange-light',
    },
    {
      icon: <Warehouse className="w-6 h-6" />,
      title: 'idus 물류센터',
      subtitle: '검수 및 통관 준비',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: <Plane className="w-6 h-6" />,
      title: '해외 배송',
      subtitle: 'idus가 처리',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      icon: <Check className="w-6 h-6" />,
      title: '고객 수령',
      subtitle: '해외 고객에게 도착',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-white to-idus-gray/30 rounded-2xl p-4 sm:p-6 border border-idus-black-10">
      {/* 헤더 */}
      <div className="text-center mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-bold text-idus-black mb-1">📦 배송, 어떻게 되나요?</h3>
        <p className="text-xs sm:text-sm text-idus-black-50">국내 택배 발송만 하면 끝!</p>
      </div>

      {/* 플로우 차트 */}
      <div className="relative">
        {/* 데스크톱: 가로 레이아웃 */}
        <div className="hidden md:flex items-stretch justify-between gap-2">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center flex-1">
              {/* 스텝 카드 */}
              <motion.div 
                className={`
                  ${step.bgColor} rounded-xl p-4 text-center flex-1
                  border border-idus-black-10 shadow-sm
                `}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                <div className={`
                  w-12 h-12 rounded-full ${step.bgColor} border-2 border-white shadow-md
                  flex items-center justify-center mx-auto mb-2 ${step.color}
                `}>
                  {step.icon}
                </div>
                <div className={`font-bold text-sm ${step.color}`}>{step.title}</div>
                <div className="text-xs text-idus-black-50 mt-0.5">{step.subtitle}</div>
              </motion.div>

              {/* 화살표 - 카드 중앙에 위치 */}
              {index < steps.length - 1 && (
                <motion.div
                  className="flex items-center justify-center px-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.15 + 0.1 }}
                >
                  <ArrowRight className="w-5 h-5 text-idus-black-30" />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* 모바일: 세로 레이아웃 */}
        <div className="md:hidden space-y-2">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`
                ${step.bgColor} rounded-xl p-3 flex items-center gap-3
                border border-idus-black-10
              `}>
                {/* 아이콘 */}
                <div className={`
                  w-10 h-10 rounded-full ${step.bgColor} border-2 border-white shadow-md
                  flex items-center justify-center ${step.color} flex-shrink-0
                `}>
                  {step.icon}
                </div>
                
                {/* 텍스트 */}
                <div className="flex-1 min-w-0">
                  <div className={`font-bold text-sm ${step.color}`}>{step.title}</div>
                  <div className="text-[10px] text-idus-black-50">{step.subtitle}</div>
                </div>

                {/* 단계 번호 */}
                <div className={`
                  w-6 h-6 rounded-full bg-white border border-idus-black-10
                  flex items-center justify-center text-[10px] font-bold ${step.color} flex-shrink-0
                `}>
                  {index + 1}
                </div>
              </div>

              {/* 연결선 */}
              {index < steps.length - 1 && (
                <div className="flex justify-center py-0.5">
                  <div className="w-0.5 h-3 bg-idus-black-10 rounded-full" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* 핵심 메시지 박스 - 작가님이 할 일 강조 */}
      <motion.div 
        className="mt-4 sm:mt-6 bg-gradient-to-r from-idus-orange-light/50 to-amber-50 border-2 border-idus-orange/30 rounded-xl p-3 sm:p-4 relative overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {/* 배경 장식 */}
        <div className="absolute -right-4 -top-4 w-20 h-20 bg-idus-orange/5 rounded-full" />
        
        <div className="relative flex items-start gap-3 sm:gap-4">
          {/* 숫자 강조 */}
          <div className="flex flex-col items-center flex-shrink-0">
            <motion.div 
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-idus-orange to-amber-500 flex items-center justify-center shadow-lg shadow-idus-orange/30"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-white font-black text-xl sm:text-2xl">1</span>
            </motion.div>
            <span className="text-[10px] sm:text-xs text-idus-orange font-bold mt-1">가지만!</span>
          </div>
          
          {/* 텍스트 */}
          <div className="min-w-0 flex-1 pt-1">
            <div className="font-bold text-idus-orange text-sm sm:text-base mb-1">✨ 작가님이 할 일</div>
            <div className="text-xs sm:text-sm text-idus-black-70">
              <strong className="text-idus-black">국내 택배로 idus 물류센터에 보내기만 하세요!</strong>
            </div>
            <div className="flex items-center gap-1.5 mt-2 bg-white/70 rounded-lg px-2 py-1.5 border border-idus-orange/10">
              <Truck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
              <span className="text-[10px] sm:text-xs text-emerald-600">해외 배송, 통관, CS는 idus가 모두 처리해요</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
