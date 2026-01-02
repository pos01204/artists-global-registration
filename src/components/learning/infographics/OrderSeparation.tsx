'use client';

import { motion } from 'framer-motion';
import { Package, AlertTriangle, Check, X, ArrowRight, User, ShoppingCart } from 'lucide-react';

export default function OrderSeparation() {
  return (
    <div className="bg-gradient-to-br from-white to-red-50/30 rounded-2xl p-4 sm:p-6 border border-idus-black-10">
      {/* 헤더 - 경고 스타일 */}
      <div className="flex items-center gap-3 mb-4 sm:mb-6 bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/20 flex-shrink-0">
          <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div className="min-w-0">
          <div className="font-bold text-red-700 text-base sm:text-lg">⚠️ 주문 단위 분리 입고 필수!</div>
          <div className="text-xs sm:text-sm text-red-600">
            같은 고객이라도 <strong>주문별로 따로 포장</strong>해야 해요
          </div>
        </div>
      </div>

      {/* 시나리오 설명 */}
      <div className="bg-idus-gray rounded-xl p-3 sm:p-4 mb-4 sm:mb-5">
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <User className="w-4 h-4 sm:w-5 sm:h-5 text-idus-black-50 flex-shrink-0" />
          <span className="font-medium text-idus-black text-sm sm:text-base">예시: 같은 고객 &quot;사토 유미&quot; 님이</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-idus-black-10">
            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 text-idus-orange flex-shrink-0" />
            <span className="text-xs sm:text-sm font-medium">주문 #1: 귀걸이</span>
          </div>
          <span className="text-idus-black-30">+</span>
          <div className="flex items-center gap-2 bg-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-idus-black-10">
            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 text-idus-orange flex-shrink-0" />
            <span className="text-xs sm:text-sm font-medium">주문 #2: 목걸이</span>
          </div>
          <span className="text-xs sm:text-sm text-idus-black-50">(별도 주문)</span>
        </div>
      </div>

      {/* 비교: 잘못된 방법 vs 올바른 방법 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-5">
        {/* 잘못된 방법 */}
        <motion.div 
          className="bg-red-50 rounded-xl p-4 sm:p-5 border-2 border-red-200 relative overflow-hidden"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* X 표시 */}
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-red-500 flex items-center justify-center">
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={3} />
          </div>

          <div className="text-red-700 font-bold mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>❌ 잘못된 방법</span>
          </div>

          {/* 하나의 박스에 모두 담기 */}
          <div className="relative">
            <motion.div 
              className="bg-white rounded-lg p-3 sm:p-4 border-2 border-red-300 border-dashed"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <Package className="w-8 h-8 sm:w-10 sm:h-10 text-red-400 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-xs sm:text-sm text-red-600 font-medium">하나의 박스에</div>
                  <div className="text-[10px] sm:text-xs text-red-500">귀걸이 + 목걸이 함께</div>
                </div>
              </div>
            </motion.div>

            {/* 결과 */}
            <div className="mt-2 sm:mt-3 flex items-center gap-2 justify-center">
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
              <span className="text-xs sm:text-sm text-red-600 font-medium">
                통관 불가 / 출고 지연
              </span>
            </div>
          </div>
        </motion.div>

        {/* 올바른 방법 */}
        <motion.div 
          className="bg-green-50 rounded-xl p-4 sm:p-5 border-2 border-green-200 relative overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* 체크 표시 */}
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-500 flex items-center justify-center">
            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={3} />
          </div>

          <div className="text-green-700 font-bold mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
            <Check className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>✅ 올바른 방법</span>
          </div>

          {/* 두 개의 박스 */}
          <div className="relative">
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <motion.div 
                className="bg-white rounded-lg p-2 sm:p-3 border-2 border-green-300 flex-1 text-center"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Package className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 mx-auto mb-1" />
                <div className="text-[10px] sm:text-xs text-green-600 font-medium">박스 #1</div>
                <div className="text-[10px] sm:text-xs text-green-500">귀걸이</div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-lg p-2 sm:p-3 border-2 border-green-300 flex-1 text-center"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Package className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 mx-auto mb-1" />
                <div className="text-[10px] sm:text-xs text-green-600 font-medium">박스 #2</div>
                <div className="text-[10px] sm:text-xs text-green-500">목걸이</div>
              </motion.div>
            </div>

            {/* 결과 */}
            <div className="mt-2 sm:mt-3 flex items-center gap-2 justify-center">
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
              <span className="text-xs sm:text-sm text-green-600 font-medium">
                정상 통관 / 빠른 출고
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 핵심 메시지 */}
      <motion.div 
        className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-3 sm:p-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-start gap-2 sm:gap-3">
          <span className="text-xl sm:text-2xl flex-shrink-0">💡</span>
          <div className="min-w-0">
            <div className="font-bold text-amber-800 mb-1 text-sm sm:text-base">왜 분리해야 하나요?</div>
            <ul className="text-xs sm:text-sm text-amber-700 space-y-0.5 sm:space-y-1">
              <li>• 글로벌 판매는 <strong>&quot;주문 단위&quot;</strong>로 통관 및 검수가 진행돼요</li>
              <li>• 같은 고객이라도 주문번호가 다르면 <strong>별도 포장</strong>이 필수!</li>
              <li>• 합포장 시 통관이 불가하여 <strong>출고가 지연</strong>될 수 있어요</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
