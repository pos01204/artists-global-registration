'use client';

import { motion } from 'framer-motion';
import { FileText, MessageCircle, Check, Sparkles, Bot } from 'lucide-react';

export default function TranslationChoice() {
  return (
    <div className="bg-gradient-to-br from-white to-idus-gray/30 rounded-2xl p-4 sm:p-6 border border-idus-black-10">
      {/* 헤더 */}
      <div className="text-center mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-bold text-idus-black mb-1">🌐 번역, 언제 뭘 써야 하나요?</h3>
        <p className="text-xs sm:text-sm text-idus-black-50">상황에 맞는 번역 방법을 확인하세요</p>
      </div>

      {/* 2컬럼 비교 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {/* 작품 등록 - 프롬프트 */}
        <motion.div
          className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 sm:p-5 border border-orange-200"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-idus-orange flex items-center justify-center flex-shrink-0">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-idus-black text-sm sm:text-base">📝 작품 등록할 때</div>
            </div>
          </div>

          <div className="bg-white/70 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 flex-wrap">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-idus-orange" />
              <span className="font-semibold text-idus-orange text-xs sm:text-sm">idus 프롬프트</span>
              <span className="text-idus-black-50 text-xs sm:text-sm">+</span>
              <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" />
              <span className="font-semibold text-emerald-600 text-xs sm:text-sm">ChatGPT</span>
            </div>
            
            <div className="space-y-1.5 sm:space-y-2">
              {['작품명', '작품 설명', '옵션명'].map((item, index) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-600" />
                  </div>
                  <span className="text-idus-black">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <span className="inline-block bg-idus-orange/10 text-idus-orange text-[10px] sm:text-xs font-medium px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full">
              프롬프트 복사해서 사용
            </span>
          </div>
        </motion.div>

        {/* 고객 대화 - 자동 번역 */}
        <motion.div
          className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl p-4 sm:p-5 border border-blue-200"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-idus-black text-sm sm:text-base">💬 고객과 대화할 때</div>
            </div>
          </div>

          <div className="bg-white/70 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
              <span className="font-semibold text-blue-600 text-xs sm:text-sm">앱에서</span>
              <span className="bg-blue-100 text-blue-700 text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full">
                자동 번역!
              </span>
            </div>
            
            <div className="space-y-1.5 sm:space-y-2">
              {['고객 문의', '답변', '리뷰 답글'].map((item, index) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-600" />
                  </div>
                  <span className="text-idus-black">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <span className="inline-block bg-blue-100 text-blue-700 text-[10px] sm:text-xs font-medium px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full">
              한국어로 답변만 하세요!
            </span>
          </div>
        </motion.div>
      </div>

      {/* 하단 요약 */}
      <motion.div 
        className="mt-4 sm:mt-5 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-idus-gray px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">
          <span className="text-idus-black-50">💡</span>
          <span className="text-idus-black-70">
            <strong className="text-idus-black">작품 등록</strong>은 프롬프트로, 
            <strong className="text-idus-black"> 고객 대화</strong>는 자동 번역으로!
          </span>
        </div>
      </motion.div>
    </div>
  );
}
