'use client';

import { motion } from 'framer-motion';
import { Gift, AlertTriangle, Check, X, Settings, Package, Eye, EyeOff } from 'lucide-react';

export default function GiftOption() {
  return (
    <div className="bg-gradient-to-br from-white to-purple-50/30 rounded-2xl p-4 sm:p-6 border border-idus-black-10">
      {/* 헤더 - 경고 스타일 */}
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 bg-purple-50 border border-purple-200 rounded-xl p-3 sm:p-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/20 flex-shrink-0">
          <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div className="min-w-0">
          <div className="font-bold text-purple-700 text-base sm:text-lg">🎁 사은품도 옵션 등록이 필수!</div>
          <div className="text-xs sm:text-sm text-purple-600">
            옵션 미등록 사은품은 <strong>출고가 불가</strong>해요
          </div>
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

          <div className="text-red-700 font-bold mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>❌ 잘못된 방법</span>
          </div>

          {/* 시뮬레이션 */}
          <div className="space-y-2 sm:space-y-3">
            {/* 작품만 등록 */}
            <div className="bg-white rounded-lg p-2.5 sm:p-3 border border-red-200">
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-idus-black-50 flex-shrink-0" />
                <span className="text-idus-black font-medium truncate">귀걸이 세트</span>
                <span className="ml-auto text-idus-black-50 flex-shrink-0">25,000원</span>
              </div>
            </div>

            {/* 사은품 미등록 */}
            <div className="bg-red-100 rounded-lg p-2.5 sm:p-3 border border-red-300 border-dashed relative">
              <div className="absolute -top-2 -right-2">
                <EyeOff className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400 flex-shrink-0" />
                <span className="text-red-600 font-medium">사은품 (미등록)</span>
              </div>
              <div className="text-[10px] sm:text-xs text-red-500 mt-1">
                → 입고 내역으로 확인 불가!
              </div>
            </div>

            {/* 결과 */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-1.5 sm:pt-2">
              <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" />
              <span className="text-xs sm:text-sm text-red-600 font-medium">
                검수 불가 → 출고 불가
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

          <div className="text-green-700 font-bold mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
            <Check className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>✅ 올바른 방법</span>
          </div>

          {/* 시뮬레이션 */}
          <div className="space-y-2 sm:space-y-3">
            {/* 작품 등록 */}
            <div className="bg-white rounded-lg p-2.5 sm:p-3 border border-green-200">
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-idus-black-50 flex-shrink-0" />
                <span className="text-idus-black font-medium truncate">귀걸이 세트</span>
                <span className="ml-auto text-idus-black-50 flex-shrink-0">25,000원</span>
              </div>
            </div>

            {/* 사은품 옵션으로 등록 */}
            <div className="bg-green-100 rounded-lg p-2.5 sm:p-3 border border-green-300 relative">
              <div className="absolute -top-2 -right-2">
                <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                <span className="text-green-700 font-medium">사은품 (옵션 등록)</span>
                <span className="ml-auto text-green-600 font-bold flex-shrink-0">0원</span>
              </div>
              <div className="text-[10px] sm:text-xs text-green-600 mt-1">
                → 입고 내역으로 확인 가능!
              </div>
            </div>

            {/* 결과 */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-1.5 sm:pt-2">
              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />
              <span className="text-xs sm:text-sm text-green-600 font-medium">
                정상 검수 → 정상 출고
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 설정 방법 안내 */}
      <motion.div 
        className="bg-white rounded-xl p-3 sm:p-4 border border-idus-black-10 mb-4 sm:mb-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
          <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-idus-orange flex-shrink-0" />
          <span className="font-bold text-idus-black text-sm sm:text-base">사은품 옵션 설정 방법</span>
        </div>
        <ol className="text-xs sm:text-sm text-idus-black-70 space-y-1.5 sm:space-y-2 ml-4 sm:ml-5">
          <li className="list-decimal">작품 등록/수정 화면에서 <strong className="text-idus-black">&quot;옵션&quot;</strong> 항목 선택</li>
          <li className="list-decimal">옵션명: <strong className="text-idus-black">&quot;사은품 - ○○○&quot;</strong> 입력</li>
          <li className="list-decimal">가격: <strong className="text-idus-orange">0원</strong>으로 설정</li>
          <li className="list-decimal">재고 수량 입력 후 저장</li>
        </ol>
      </motion.div>

      {/* 핵심 메시지 */}
      <motion.div 
        className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-3 sm:p-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-start gap-2 sm:gap-3">
          <span className="text-xl sm:text-2xl flex-shrink-0">💡</span>
          <div className="min-w-0">
            <div className="font-bold text-amber-800 mb-1 text-sm sm:text-base">왜 옵션으로 등록해야 하나요?</div>
            <ul className="text-xs sm:text-sm text-amber-700 space-y-0.5 sm:space-y-1">
              <li>• 옵션 미등록 사은품은 <strong>입고 내역으로 확인이 불가</strong>해요</li>
              <li>• 검수 시 확인이 안 되면 <strong>출고가 진행되지 않아요</strong></li>
              <li>• <strong>0원 옵션</strong>으로 등록하면 고객 부담 없이 사은품 발송 가능!</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
