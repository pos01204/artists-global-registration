'use client';

import { motion } from 'framer-motion';
import { LogIn, Menu, User, Plane, Check, ExternalLink } from 'lucide-react';

export default function RegistrationSteps() {
  const steps = [
    { icon: <LogIn className="w-5 h-5" />, title: '작가웹', subtitle: '로그인' },
    { icon: <Menu className="w-5 h-5" />, title: '전체', subtitle: '메뉴' },
    { icon: <User className="w-5 h-5" />, title: '내 정보', subtitle: '' },
    { icon: <Plane className="w-5 h-5" />, title: '글로벌', subtitle: '작가 관리' },
  ];

  const requirements = [
    '아이디어스 작가 등록',
    '본인 인증',
    '정산계좌 등록',
  ];

  return (
    <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-2xl p-6 border border-idus-black-10">
      {/* 헤더 */}
      <div className="text-center mb-6">
        <motion.h3 
          className="text-lg font-bold text-idus-black mb-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ✈️ 글로벌 작가 등록 경로
        </motion.h3>
        <motion.p 
          className="text-sm text-idus-black-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          작가웹에서 4단계로 간단하게!
        </motion.p>
      </div>

      {/* 스텝 플로우 */}
      <div className="relative mb-6">
        {/* 연결선 (데스크탑) */}
        <div className="hidden sm:block absolute top-1/2 left-[10%] right-[10%] h-1 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 -translate-y-1/2 rounded-full z-0" />
        
        {/* 스텝 카드들 */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 relative z-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="flex items-center gap-2 sm:flex-col sm:gap-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.15 }}
            >
              {/* 스텝 넘버 + 아이콘 */}
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.1 }}
              >
                {/* 스텝 넘버 */}
                <div className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center shadow-lg z-10">
                  {index + 1}
                </div>
                
                {/* 아이콘 서클 */}
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-lg
                  ${index === steps.length - 1 
                    ? 'bg-gradient-to-br from-idus-orange to-amber-500 text-white' 
                    : 'bg-white border-2 border-blue-200 text-blue-500'
                  }`}
                >
                  {step.icon}
                </div>
              </motion.div>

              {/* 텍스트 */}
              <div className="sm:mt-3 text-left sm:text-center min-w-[80px]">
                <div className="font-bold text-idus-black text-sm">{step.title}</div>
                {step.subtitle && (
                  <div className="text-xs text-idus-black-50">{step.subtitle}</div>
                )}
              </div>

              {/* 화살표 (모바일) */}
              {index < steps.length - 1 && (
                <motion.div 
                  className="sm:hidden text-blue-300 ml-auto"
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <svg className="w-5 h-5 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* 신청 조건 */}
      <motion.div 
        className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="text-sm font-bold text-idus-black mb-3 flex items-center gap-2">
          <span className="text-base">📋</span>
          신청 조건
        </div>
        <div className="flex flex-wrap gap-2">
          {requirements.map((req, index) => (
            <motion.div
              key={req}
              className="flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 border border-slate-200 shadow-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <Check className="w-4 h-4 text-green-500" strokeWidth={3} />
              <span className="text-xs text-idus-black-70">{req}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA 버튼 */}
      <motion.a
        href="https://artist.idus.com/setting/global-artist/manage"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-gradient-to-r from-idus-orange to-amber-500 
                   text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-idus-orange/30
                   hover:shadow-xl hover:shadow-idus-orange/40 transition-all duration-300"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Plane className="w-5 h-5" />
        <span>글로벌 작가 관리 페이지 바로가기</span>
        <ExternalLink className="w-4 h-4" />
      </motion.a>
    </div>
  );
}
