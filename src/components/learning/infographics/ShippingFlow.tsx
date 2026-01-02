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
      title: '작가님 포장',
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
    <div className="bg-gradient-to-br from-white to-idus-gray/30 rounded-2xl p-6 border border-idus-black-10">
      {/* 헤더 */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-idus-black mb-1">📦 배송, 어떻게 되나요?</h3>
        <p className="text-sm text-idus-black-50">국내 택배 발송만 하면 끝!</p>
      </div>

      {/* 플로우 차트 */}
      <div className="relative">
        {/* 데스크톱: 가로 레이아웃 */}
        <div className="hidden md:flex items-center justify-between">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              {/* 스텝 카드 */}
              <div className={`
                ${step.bgColor} rounded-xl p-4 text-center min-w-[120px]
                border border-idus-black-10 shadow-sm
              `}>
                <div className={`
                  w-12 h-12 rounded-full ${step.bgColor} border-2 border-white shadow-md
                  flex items-center justify-center mx-auto mb-2 ${step.color}
                `}>
                  {step.icon}
                </div>
                <div className={`font-bold text-sm ${step.color}`}>{step.title}</div>
                <div className="text-xs text-idus-black-50 mt-0.5">{step.subtitle}</div>
              </div>

              {/* 화살표 */}
              {index < steps.length - 1 && (
                <motion.div
                  className="mx-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 + 0.1 }}
                >
                  <ArrowRight className="w-5 h-5 text-idus-black-30" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* 모바일: 세로 레이아웃 */}
        <div className="md:hidden space-y-3">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`
                ${step.bgColor} rounded-xl p-4 flex items-center gap-4
                border border-idus-black-10
              `}>
                {/* 아이콘 */}
                <div className={`
                  w-12 h-12 rounded-full ${step.bgColor} border-2 border-white shadow-md
                  flex items-center justify-center ${step.color} flex-shrink-0
                `}>
                  {step.icon}
                </div>
                
                {/* 텍스트 */}
                <div className="flex-1">
                  <div className={`font-bold ${step.color}`}>{step.title}</div>
                  <div className="text-xs text-idus-black-50">{step.subtitle}</div>
                </div>

                {/* 단계 번호 */}
                <div className={`
                  w-7 h-7 rounded-full bg-white border border-idus-black-10
                  flex items-center justify-center text-xs font-bold ${step.color}
                `}>
                  {index + 1}
                </div>
              </div>

              {/* 연결선 */}
              {index < steps.length - 1 && (
                <div className="flex justify-center py-1">
                  <div className="w-0.5 h-4 bg-idus-black-10 rounded-full" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* 핵심 메시지 박스 */}
      <motion.div 
        className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
            <Truck className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-green-700">✨ 작가님이 할 일</div>
            <div className="text-sm text-green-600">
              <strong>국내 택배로 idus 물류센터에 보내기만 하세요!</strong>
              <br />
              <span className="text-green-500 text-xs">해외 배송, 통관, CS는 idus가 모두 처리합니다</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
