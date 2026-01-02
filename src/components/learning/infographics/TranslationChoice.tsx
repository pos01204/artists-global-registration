'use client';

import { motion } from 'framer-motion';
import { FileText, MessageCircle, Check, Sparkles, Bot } from 'lucide-react';

export default function TranslationChoice() {
  return (
    <div className="bg-gradient-to-br from-white to-idus-gray/30 rounded-2xl p-6 border border-idus-black-10">
      {/* 헤더 */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-idus-black mb-1">🌐 번역, 언제 뭘 써야 하나요?</h3>
        <p className="text-sm text-idus-black-50">상황에 맞는 번역 방법을 확인하세요</p>
      </div>

      {/* 2컬럼 비교 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* 작품 등록 - 프롬프트 */}
        <motion.div
          className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-5 border border-orange-200"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-idus-orange flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-idus-black">📝 작품 등록할 때</div>
            </div>
          </div>

          <div className="bg-white/70 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-idus-orange" />
              <span className="font-semibold text-idus-orange text-sm">idus 프롬프트</span>
              <span className="text-idus-black-50 text-sm">+</span>
              <Bot className="w-4 h-4 text-emerald-500" />
              <span className="font-semibold text-emerald-600 text-sm">ChatGPT</span>
            </div>
            
            <div className="space-y-2">
              {['작품명', '작품 설명', '옵션명'].map((item, index) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-2 text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-idus-black">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <span className="inline-block bg-idus-orange/10 text-idus-orange text-xs font-medium px-3 py-1.5 rounded-full">
              프롬프트 복사해서 사용
            </span>
          </div>
        </motion.div>

        {/* 고객 대화 - 자동 번역 */}
        <motion.div
          className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl p-5 border border-blue-200"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-idus-black">💬 고객과 대화할 때</div>
            </div>
          </div>

          <div className="bg-white/70 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-semibold text-blue-600 text-sm">앱에서</span>
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">
                자동 번역!
              </span>
            </div>
            
            <div className="space-y-2">
              {['고객 문의', '답변', '리뷰 답글'].map((item, index) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-2 text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-idus-black">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full">
              한국어로 답변만 하세요!
            </span>
          </div>
        </motion.div>
      </div>

      {/* 하단 요약 */}
      <motion.div 
        className="mt-5 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="inline-flex items-center gap-2 bg-idus-gray px-4 py-2 rounded-full text-sm">
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
