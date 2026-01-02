'use client';

import { motion } from 'framer-motion';
import { Check, Sparkles, Heart, Package, Globe, Headphones, Truck, ToggleRight } from 'lucide-react';

export default function IdusSupport() {
  const idusItems = [
    { icon: <Truck className="w-4 h-4" />, text: '해외 배송 전 과정' },
    { icon: <Package className="w-4 h-4" />, text: '통관/검수/포장' },
    { icon: <Globe className="w-4 h-4" />, text: '45개국 판매 지원' },
    { icon: <Headphones className="w-4 h-4" />, text: '1차 고객 CS' },
  ];

  const artistItems = [
    { icon: <ToggleRight className="w-4 h-4" />, text: '"글로벌 판매" ON' },
    { icon: <Package className="w-4 h-4" />, text: '물류센터로 발송' },
  ];

  return (
    <div className="bg-gradient-to-br from-white to-idus-gray/30 rounded-2xl p-6 border border-idus-black-10">
      {/* 헤더 */}
      <div className="text-center mb-6">
        <motion.h3 
          className="text-lg font-bold text-idus-black mb-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🧡 idus가 해드리는 것 vs 작가님이 하실 것
        </motion.h3>
        <motion.p 
          className="text-sm text-idus-black-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          복잡한 건 idus가, 작가님은 작품에만 집중하세요!
        </motion.p>
      </div>

      {/* 비교 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        {/* idus가 해드리는 것 */}
        <motion.div
          className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-5 border-2 border-idus-orange/30 relative overflow-hidden"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* 배경 장식 */}
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-idus-orange/5 rounded-full" />
          
          <div className="relative">
            {/* 헤더 */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-idus-orange flex items-center justify-center shadow-lg shadow-idus-orange/20">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-idus-orange">idus가 해드려요</div>
                <div className="text-xs text-idus-black-50">작가님 부담 0원!</div>
              </div>
            </div>

            {/* 항목 리스트 */}
            <div className="space-y-2.5">
              {idusItems.map((item, index) => (
                <motion.div
                  key={item.text}
                  className="flex items-center gap-2.5 bg-white/70 rounded-lg px-3 py-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-green-600" strokeWidth={3} />
                  </div>
                  <span className="text-idus-black-70 text-sm flex items-center gap-2">
                    <span className="text-idus-orange">{item.icon}</span>
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>

          </div>
        </motion.div>

        {/* 작가님이 하실 것 */}
        <motion.div
          className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-5 border-2 border-emerald-200 relative overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* 배경 장식 */}
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/5 rounded-full" />
          
          <div className="relative">
            {/* 헤더 */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-emerald-600">작가님이 하세요</div>
                <div className="text-xs text-idus-black-50">딱 2가지만!</div>
              </div>
            </div>

            {/* 항목 리스트 */}
            <div className="space-y-2.5">
              {artistItems.map((item, index) => (
                <motion.div
                  key={item.text}
                  className="flex items-center gap-2.5 bg-white/70 rounded-lg px-3 py-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-600 font-bold text-xs">
                    {index + 1}
                  </div>
                  <span className="text-idus-black-70 text-sm flex items-center gap-2">
                    <span className="text-emerald-600">{item.icon}</span>
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* 비용 배지 - 중앙 정렬 */}
      <motion.div 
        className="flex justify-center mt-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.7, type: 'spring', stiffness: 300 }}
      >
        <div className="inline-flex items-center gap-1.5 bg-idus-orange text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-lg shadow-idus-orange/30">
          <span>💰</span>
          <span>idus가 해드리는 건 전부 0원!</span>
        </div>
      </motion.div>

      {/* 하단 메시지 */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-idus-orange-light/30 to-amber-100/50 px-5 py-3 rounded-full border border-idus-orange/10">
          <span className="text-lg">💡</span>
          <span className="text-idus-black-70 text-sm">
            <strong className="text-idus-black">복잡한 해외 판매</strong>, idus가 다 해드려요!
          </span>
        </div>
      </motion.div>
    </div>
  );
}
