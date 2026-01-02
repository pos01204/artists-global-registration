'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Building, Landmark, ArrowRight, Calendar, Banknote, FileCheck, Sparkles } from 'lucide-react';

export default function SettlementFlow() {
  const steps = [
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: '해외 고객',
      subtitle: '결제',
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      icon: <Building className="w-6 h-6" />,
      title: 'idus',
      subtitle: '정산 처리',
      color: 'bg-idus-orange',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
    },
    {
      icon: <Landmark className="w-6 h-6" />,
      title: '작가님',
      subtitle: '통장 입금',
      color: 'bg-emerald-500',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
    },
  ];

  const benefits = [
    { icon: <Calendar className="w-5 h-5" />, text: '월 2회 정산', subtext: '(1일, 16일)', color: 'text-blue-600' },
    { icon: <Banknote className="w-5 h-5" />, text: '원화(KRW) 입금', subtext: '외화계좌 불필요', color: 'text-emerald-600' },
    { icon: <FileCheck className="w-5 h-5" />, text: '부가세 0%', subtext: '영세율 + 환급 가능', color: 'text-purple-600' },
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
          💵 정산, 이렇게 진행돼요!
        </motion.h3>
        <motion.p 
          className="text-xs sm:text-sm text-idus-black-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          환율, 외화계좌 걱정 없이 간편하게!
        </motion.p>
      </div>

      {/* 플로우 차트 */}
      <div className="flex items-center justify-center gap-1 sm:gap-4 mb-4 sm:mb-6 px-1 sm:px-2">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            className="flex items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.2 }}
          >
            {/* 스텝 카드 */}
            <motion.div 
              className={`${step.bgColor} ${step.borderColor} border-2 rounded-xl p-2 sm:p-4 text-center min-w-[70px] sm:min-w-[100px]`}
              whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
            >
              <motion.div 
                className={`w-9 h-9 sm:w-14 sm:h-14 rounded-full ${step.color} flex items-center justify-center mx-auto mb-1.5 sm:mb-2 text-white shadow-lg`}
                whileHover={{ scale: 1.1 }}
              >
                {React.cloneElement(step.icon as React.ReactElement, {
                  className: 'w-4 h-4 sm:w-6 sm:h-6'
                })}
              </motion.div>
              <div className="font-bold text-idus-black text-xs sm:text-base">{step.title}</div>
              <div className="text-[10px] sm:text-xs text-idus-black-50">{step.subtitle}</div>
            </motion.div>

            {/* 화살표 */}
            {index < steps.length - 1 && (
              <motion.div
                className="mx-0.5 sm:mx-2 text-idus-black-30"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.2 }}
              >
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6" />
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* 혜택 카드 */}
      <motion.div 
        className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-3 sm:p-4 border border-slate-200 mb-3 sm:mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.text}
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-slate-200 shadow-sm
                              flex items-center justify-center mx-auto mb-1.5 sm:mb-2 ${benefit.color}`}>
                {React.cloneElement(benefit.icon as React.ReactElement, {
                  className: 'w-4 h-4 sm:w-5 sm:h-5'
                })}
              </div>
              <div className="text-[10px] sm:text-sm font-bold text-idus-black">{benefit.text}</div>
              <div className="text-[9px] sm:text-xs text-idus-black-50">{benefit.subtext}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 하단 강조 메시지 */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-emerald-50 to-green-50 px-3 sm:px-5 py-2 sm:py-3 rounded-full border border-emerald-200">
          <motion.div
            animate={{ rotate: [0, 20, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
          </motion.div>
          <span className="text-idus-black-70 text-xs sm:text-sm">
            <strong className="text-emerald-600">국내 통장으로 원화 정산!</strong>
          </span>
        </div>
      </motion.div>
    </div>
  );
}
