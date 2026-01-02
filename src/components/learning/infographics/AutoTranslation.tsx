'use client';

import { motion } from 'framer-motion';
import { Check, RefreshCw, MessageCircle } from 'lucide-react';

interface ChatMessage {
  flag: string;
  role: 'customer' | 'artist';
  original: string;
  translated?: string;
  time?: string;
}

export default function AutoTranslation() {
  const messages: ChatMessage[] = [
    {
      flag: '🇯🇵',
      role: 'customer',
      original: 'おはようございますm(_ _)m\n今、注文している商品はいつ頃、発送される予定ですか？',
      translated: '안녕하세요m(_ _)m\n지금 주문하고 있는 상품은 언제쯤 발송될 예정인가요?',
      time: '오전 6:21',
    },
    {
      flag: '🇰🇷',
      role: 'artist',
      original: '안녕하세요~빠르면이번주 늦어도 다음주 초 발송됩니다!\n조금만 더 기다려주세요',
      translated: 'こんにちは~早ければ今週遅くとも来週初めに発送されます！\n少々お待ちください',
      time: '오전 7:41',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl p-6 border border-idus-black-10">
      {/* 헤더 */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-200 mb-2">
          <MessageCircle className="w-4 h-4 text-blue-500" />
          <span className="font-bold text-blue-700">idus 앱 내 자동 번역</span>
        </div>
        <p className="text-sm text-idus-black-50">한국어로 답변하면 자동으로 번역돼요!</p>
      </div>

      {/* 채팅 시뮬레이션 */}
      <div className="max-w-md mx-auto space-y-4">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.3 }}
          >
            {/* 원문 메시지 */}
            <div className={`flex items-start gap-2 ${msg.role === 'artist' ? 'flex-row-reverse' : ''}`}>
              <span className="text-xl flex-shrink-0">{msg.flag}</span>
              <div className={`
                rounded-2xl p-3 max-w-[85%] shadow-sm
                ${msg.role === 'customer' 
                  ? 'bg-white border border-idus-black-10 rounded-tl-sm' 
                  : 'bg-idus-orange text-white rounded-tr-sm'}
              `}>
                <div className="text-sm whitespace-pre-line leading-relaxed">{msg.original}</div>
                {msg.time && (
                  <div className={`text-xs mt-1.5 ${msg.role === 'artist' ? 'text-white/70' : 'text-idus-black-50'}`}>
                    {msg.time}
                  </div>
                )}
              </div>
            </div>

            {/* 번역 표시 */}
            {msg.translated && (
              <motion.div 
                className="flex justify-center my-3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.3 + 0.15 }}
              >
                <div className="flex items-center gap-2 bg-gradient-to-r from-idus-orange-light/50 to-amber-100 px-4 py-1.5 rounded-full border border-idus-orange/20">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-idus-orange" />
                  </motion.div>
                  <span className="text-xs text-idus-orange font-medium">
                    {msg.role === 'customer' ? '한국어로 자동 번역됨' : '일본어로 자동 번역됨'}
                  </span>
                </div>
              </motion.div>
            )}

            {/* 번역된 메시지 (회색 박스) */}
            {msg.translated && (
              <motion.div 
                className={`flex items-start gap-2 ${msg.role === 'artist' ? 'flex-row-reverse' : ''}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.3 + 0.2 }}
              >
                <div className="w-6" /> {/* 플래그 자리 */}
                <div className={`
                  rounded-xl p-3 max-w-[85%] bg-idus-gray border border-idus-black-10
                  ${msg.role === 'customer' ? 'rounded-tl-sm' : 'rounded-tr-sm'}
                `}>
                  <div className="text-xs text-idus-black-50 mb-1">
                    {msg.role === 'customer' ? '🇰🇷 번역됨:' : '🇯🇵 고객에게 전달:'}
                  </div>
                  <div className="text-sm text-idus-black-70 whitespace-pre-line leading-relaxed">
                    {msg.translated}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* 지원 언어 배지 */}
      <motion.div 
        className="flex flex-wrap justify-center gap-2 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        {[
          { lang: '일본어', flag: '🇯🇵' },
          { lang: '영어', flag: '🇺🇸' },
        ].map((item) => (
          <div key={item.lang} className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-full
                                    border border-idus-black-10 text-sm shadow-sm">
            <span>{item.flag}</span>
            <Check className="w-4 h-4 text-green-500" />
            <span className="text-idus-black font-medium">{item.lang} OK!</span>
          </div>
        ))}
      </motion.div>

      {/* 핵심 메시지 */}
      <motion.div 
        className="mt-5 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="inline-block bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl px-5 py-3">
          <span className="text-green-700 font-medium">
            ✨ 작가님은 한국어로 답변만 하세요. 나머지는 idus가!
          </span>
        </div>
      </motion.div>
    </div>
  );
}
