'use client';

import { motion } from 'framer-motion';
import { Check, X, AlertTriangle, FileText, Sparkles, Package, Palette, Shirt, Home, Baby, Flower2, Box, Scale, Droplets, Zap, Music, Utensils } from 'lucide-react';

interface Category {
  name: string;
  icon: React.ReactNode;
  status: 'ok' | 'warning' | 'no';
  note?: string;
}

export default function ProductCategories() {
  const okCategories: Category[] = [
    { name: '악세서리', icon: <Sparkles className="w-4 h-4" />, status: 'ok' },
    { name: '패션잡화', icon: <Shirt className="w-4 h-4" />, status: 'ok' },
    { name: '홈리빙', icon: <Home className="w-4 h-4" />, status: 'ok' },
    { name: '아트/공예', icon: <Palette className="w-4 h-4" />, status: 'ok' },
    { name: '반려동물', icon: <Package className="w-4 h-4" />, status: 'ok' },
    { name: '키즈', icon: <Baby className="w-4 h-4" />, status: 'ok' },
    { name: '플라워', icon: <Flower2 className="w-4 h-4" />, status: 'ok' },
  ];

  const warningCategories: Category[] = [
    { name: '화장품/뷰티', icon: <Package className="w-4 h-4" />, status: 'warning', note: 'MSDS 필요' },
  ];

  const noCategories: Category[] = [
    { name: '향수/디퓨저', icon: <Droplets className="w-4 h-4" />, status: 'no', note: '액체류 제한' },
    { name: '식품', icon: <Utensils className="w-4 h-4" />, status: 'no', note: '통관 제한' },
    { name: '디지털 작품', icon: <Music className="w-4 h-4" />, status: 'no', note: '실물 배송 불가' },
    { name: '배터리 포함', icon: <Zap className="w-4 h-4" />, status: 'no', note: '항공 운송 불가' },
    { name: '대형 작품', icon: <Box className="w-4 h-4" />, status: 'no', note: '우체국 4호 초과' },
    { name: '30kg 초과', icon: <Scale className="w-4 h-4" />, status: 'no', note: '중량 제한' },
  ];

  return (
    <div className="bg-gradient-to-br from-white to-idus-gray/30 rounded-2xl p-6 border border-idus-black-10">
      {/* 헤더 */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-idus-black mb-1">🏷️ 어떤 작품을 팔 수 있나요?</h3>
        <p className="text-sm text-idus-black-50">대부분의 핸드메이드 작품은 판매 가능해요!</p>
      </div>

      {/* 판매 가능 */}
      <motion.div 
        className="mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-green-700">판매 가능</span>
          <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">대부분 OK!</span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {okCategories.map((cat, index) => (
            <motion.div
              key={cat.name}
              className="bg-green-50 border border-green-200 rounded-lg p-3 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.03 }}
            >
              <div className="text-green-600 flex justify-center mb-1">{cat.icon}</div>
              <div className="text-xs font-medium text-green-700">{cat.name}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 조건부 가능 */}
      <motion.div 
        className="mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-amber-700">조건부 가능</span>
          <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">서류 필요</span>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {warningCategories.map((cat, index) => (
            <motion.div
              key={cat.name}
              className="bg-amber-50 border border-amber-200 rounded-lg p-3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <div className="flex items-center gap-2">
                <div className="text-amber-600">{cat.icon}</div>
                <div>
                  <div className="text-sm font-medium text-amber-700">{cat.name}</div>
                  <div className="text-xs text-amber-500 flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    {cat.note}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 판매 불가 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
            <X className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-red-700">판매 불가</span>
          <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-full">해외 배송 제한</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {noCategories.map((cat, index) => (
            <motion.div
              key={cat.name}
              className="bg-red-50 border border-red-200 rounded-lg p-2.5 flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.05 }}
            >
              <div className="text-red-500 flex-shrink-0">{cat.icon}</div>
              <div className="min-w-0">
                <div className="text-xs font-medium text-red-700 truncate">{cat.name}</div>
                <div className="text-[10px] text-red-500 truncate">{cat.note}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 2026년 확장 예정 안내 */}
      <motion.div 
        className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-2 text-xs text-blue-700">
          <span>📢</span>
          <span><strong>식품/디지털 카테고리</strong>는 2026년 내 판매 가능 카테고리로 확장 예정이에요!</span>
        </div>
      </motion.div>

      {/* 요약 메시지 */}
      <motion.div 
        className="mt-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 bg-idus-gray px-4 py-2 rounded-full text-sm">
          <span className="text-idus-black-50">💡</span>
          <span className="text-idus-black-70">
            <strong className="text-idus-black">핸드메이드 작품 대부분</strong>은 바로 판매 가능!
          </span>
        </div>
      </motion.div>
    </div>
  );
}
