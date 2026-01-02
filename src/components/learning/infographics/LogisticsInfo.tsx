'use client';

import { motion } from 'framer-motion';
import { Globe, MapPin, Phone, Truck, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function LogisticsInfo() {
  const [copied, setCopied] = useState<string | null>(null);

  const countries = {
    asia: ['일본', '싱가포르', '홍콩', '대만', '말레이시아', '태국', '필리핀', '베트남', '인도네시아'],
    northAmerica: ['미국', '캐나다'],
    europe: ['영국', '독일', '프랑스', '이탈리아', '스페인', '네덜란드', '벨기에', '스위스', '오스트리아'],
    oceania: ['호주', '뉴질랜드'],
  };

  const warehouseInfo = {
    address: '인천시 중구 자유무역로 67, 롯데글로벌로지스 C3 3층 특송수출 백패커',
    receiver: '백패커 GC',
    phone: '032-745-9470',
  };

  const handleCopy = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* 배송 가능 국가 */}
      <motion.div 
        className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl p-5 border border-blue-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-sky-500 flex items-center justify-center shadow-sm">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-idus-black">배송 가능 국가</h3>
            <p className="text-sm text-blue-600 font-medium">전 세계 45개국</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* 아시아 */}
          <motion.div 
            className="bg-white/70 rounded-xl p-3 sm:p-4 border border-blue-100"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-xs font-semibold text-blue-600 mb-2 flex items-center gap-1">
              🌏 아시아
            </div>
            <div className="flex flex-wrap gap-1.5">
              {countries.asia.map((country, i) => (
                <motion.span 
                  key={country}
                  className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.03 }}
                >
                  {country}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* 북미/유럽/오세아니아 */}
          <motion.div 
            className="bg-white/70 rounded-xl p-3 sm:p-4 border border-blue-100"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-xs font-semibold text-emerald-600 mb-2">🌎 북미 · 유럽 · 오세아니아</div>
            <div className="flex flex-wrap gap-1.5">
              {[...countries.northAmerica, ...countries.europe.slice(0, 4), ...countries.oceania].map((country, i) => (
                <motion.span 
                  key={country}
                  className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.03 }}
                >
                  {country}
                </motion.span>
              ))}
              <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs">+23개국</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* 물류센터 주소 */}
      <motion.div 
        className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-sm">
            <Truck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-idus-black">국내 물류센터 주소</h3>
            <p className="text-sm text-amber-600 font-medium">작품 발송 시 이 주소로!</p>
          </div>
        </div>

        <div className="space-y-3">
          {/* 주소 */}
          <motion.div 
            className="bg-white rounded-xl p-4 border border-amber-200 cursor-pointer hover:border-amber-400 transition-colors"
            onClick={() => handleCopy(warehouseInfo.address, 'address')}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="text-xs text-amber-600 font-medium mb-1">배송지 주소</div>
                <div className="text-sm text-idus-black font-medium break-keep">
                  {warehouseInfo.address}
                </div>
              </div>
              <button className="flex-shrink-0 p-2 hover:bg-amber-100 rounded-lg transition-colors">
                {copied === 'address' ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-amber-500" />
                )}
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* 수령인 */}
            <motion.div 
              className="bg-white rounded-xl p-3 sm:p-4 border border-amber-200 cursor-pointer hover:border-amber-400 active:bg-amber-50 transition-colors"
              onClick={() => handleCopy(warehouseInfo.receiver, 'receiver')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-amber-600 font-medium mb-1">수령인</div>
                  <div className="text-sm text-idus-black font-bold">{warehouseInfo.receiver}</div>
                </div>
                {copied === 'receiver' ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-amber-400" />
                )}
              </div>
            </motion.div>

            {/* 연락처 */}
            <motion.div 
              className="bg-white rounded-xl p-3 sm:p-4 border border-amber-200 cursor-pointer hover:border-amber-400 active:bg-amber-50 transition-colors"
              onClick={() => handleCopy(warehouseInfo.phone, 'phone')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-amber-600 font-medium mb-1">연락처</div>
                  <div className="text-sm text-idus-black font-bold flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />
                    {warehouseInfo.phone}
                  </div>
                </div>
                {copied === 'phone' ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-amber-400" />
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* 복사 안내 */}
        <motion.div 
          className="mt-4 text-center text-xs text-amber-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          💡 카드를 클릭하면 복사됩니다
        </motion.div>
      </motion.div>
    </div>
  );
}
