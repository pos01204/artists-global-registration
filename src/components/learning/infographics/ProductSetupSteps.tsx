'use client';

import { motion } from 'framer-motion';
import { FileEdit, ToggleRight, Languages, Save, PartyPopper, DollarSign, Package, Clock } from 'lucide-react';

export default function ProductSetupSteps() {
  const steps = [
    { 
      icon: <FileEdit className="w-5 h-5" />, 
      title: '작품 등록/수정',
      subtitle: '페이지 접속',
      color: 'text-slate-600',
      bgColor: 'bg-slate-50',
    },
    { 
      icon: <ToggleRight className="w-5 h-5" />, 
      title: '"글로벌 판매"',
      subtitle: '옵션 ON 🔘',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    { 
      icon: <Languages className="w-5 h-5" />, 
      title: '영문(일본어)',
      subtitle: '작품명/설명 입력',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    { 
      icon: <Save className="w-5 h-5" />, 
      title: '저장',
      subtitle: '판매 시작!',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      highlight: true,
    },
  ];

  const infos = [
    { icon: <DollarSign className="w-4 h-4" />, label: '가격', value: '원화 기준 자동 환산', color: 'text-emerald-600' },
    { icon: <Package className="w-4 h-4" />, label: '배송비', value: '무료 (idus 부담)', color: 'text-blue-600' },
    { icon: <Clock className="w-4 h-4" />, label: '배송 소요일', value: '7-14일 권장', color: 'text-purple-600' },
  ];

  return (
    <div className="bg-gradient-to-br from-white to-purple-50/30 rounded-2xl p-6 border border-idus-black-10">
      {/* 헤더 */}
      <div className="text-center mb-6">
        <motion.h3 
          className="text-lg font-bold text-idus-black mb-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🚀 글로벌 작품 등록 4단계
        </motion.h3>
        <motion.p 
          className="text-sm text-idus-black-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          기존 작품을 글로벌로 간단하게!
        </motion.p>
      </div>

      {/* 스텝 리스트 */}
      <div className="space-y-3 mb-6">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all
              ${step.highlight 
                ? 'bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-300' 
                : `${step.bgColor} border-transparent`
              }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ x: 5 }}
          >
            {/* 스텝 번호 */}
            <div className={`w-10 h-10 rounded-xl font-bold text-lg flex items-center justify-center flex-shrink-0
              ${step.highlight 
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' 
                : 'bg-white border-2 border-slate-200 text-idus-black-50'
              }`}
            >
              {index + 1}
            </div>

            {/* 아이콘 */}
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${step.color}
              ${step.highlight ? 'bg-white' : 'bg-white border border-slate-200'}`}
            >
              {step.icon}
            </div>

            {/* 텍스트 */}
            <div className="flex-1 min-w-0">
              <div className={`font-bold ${step.highlight ? 'text-emerald-700' : 'text-idus-black'}`}>
                {step.title}
              </div>
              <div className={`text-sm ${step.highlight ? 'text-emerald-600' : 'text-idus-black-50'}`}>
                {step.subtitle}
              </div>
            </div>

            {/* 완료 이펙트 */}
            {step.highlight && (
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                <PartyPopper className="w-6 h-6 text-emerald-500" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* 자동 설정 정보 */}
      <motion.div 
        className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="grid grid-cols-3 gap-3">
          {infos.map((info, index) => (
            <motion.div
              key={info.label}
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              <div className={`w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm
                              flex items-center justify-center mx-auto mb-2 ${info.color}`}>
                {info.icon}
              </div>
              <div className="text-xs font-bold text-idus-black">{info.label}</div>
              <div className="text-[10px] text-idus-black-50 leading-tight">{info.value}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
