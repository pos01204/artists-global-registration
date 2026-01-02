'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ChevronDown, ExternalLink, Sparkles } from 'lucide-react';

interface PromptItem {
  id: string;
  title: string;
  flag: string;
  description: string;
  prompt: string;
}

const PROMPTS: PromptItem[] = [
  {
    id: 'japanese',
    title: '일본어 번역 프롬프트',
    flag: '🇯🇵',
    description: '일본 구매자를 위한 자연스러운 번역',
    prompt: `아래 조건에 따라 이 대화에서 제가 제공하는 모든 한국어를 일본어로 번역해 주세요.

1. 해외 쇼핑몰에서 핸드메이드 작품을 판매하는 일본어 상세페이지 글입니다.
2. 일본 구매자가 읽고 구매를 결정할 수 있도록 명확하고 매력적인 문장으로 번역해 주세요.
3. 일본어 문법에 맞게 자연스럽게 번역하되, 원문의 의도와 느낌을 유지해 주세요.
4. 제품의 특징과 장점이 잘 드러나도록 번역해 주세요.
5. 존댓말(です・ます 체)을 사용해 주세요.
6. 전문적이면서도 친근한 어조를 유지해 주세요.
7. 번역 결과만 출력해 주세요.

[여기에 한글 상세설명을 입력]`,
  },
  {
    id: 'english',
    title: '영어 번역 프롬프트',
    flag: '🇺🇸',
    description: '해외 구매자를 위한 매력적인 번역',
    prompt: `아래 조건에 따라 이 대화에서 제가 제공하는 모든 한국어를 영어로 번역해 주세요.

1. 해외 쇼핑몰에서 핸드메이드 작품을 판매하는 영어 상세페이지 글입니다.
2. 해외 구매자가 읽고 구매를 결정할 수 있도록 명확하고 매력적인 문장으로 번역해 주세요.
3. 영어 문법에 맞게 자연스럽게 번역하되, 원문의 의도와 느낌을 유지해 주세요.
4. 제품의 특징과 장점이 잘 드러나도록 번역해 주세요.
5. 친근하면서도 전문적인 어조를 유지해 주세요.
6. 번역 결과만 출력해 주세요.

[여기에 한글 상세설명을 입력]`,
  },
];

export default function TranslationPrompt() {
  const [expandedId, setExpandedId] = useState<string | null>('japanese');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (prompt: string, id: string) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-idus-orange-light/40 to-amber-50 
                      rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-idus-orange/20">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-idus-orange flex items-center justify-center shadow-lg shadow-idus-orange/20 flex-shrink-0">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="min-w-0">
            <div className="font-bold text-idus-black text-sm sm:text-lg">idus 공식 번역 프롬프트</div>
            <div className="text-xs sm:text-sm text-idus-black-50">
              작품 등록 시 ChatGPT에 붙여넣어 사용하세요!
            </div>
          </div>
        </div>
      </div>

      {/* 사용 방법 간단 안내 */}
      <div className="bg-idus-gray rounded-xl p-3 sm:p-4">
        <div className="text-xs sm:text-sm font-semibold text-idus-black mb-2 flex items-center gap-2">
          <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-idus-orange text-white text-[10px] sm:text-xs flex items-center justify-center flex-shrink-0">?</span>
          사용 방법
        </div>
        <ol className="text-xs sm:text-sm text-idus-black-70 space-y-1 sm:space-y-1.5 ml-6 sm:ml-7">
          <li className="list-decimal">아래 프롬프트를 <strong className="text-idus-black">복사</strong>합니다</li>
          <li className="list-decimal"><strong className="text-idus-black">ChatGPT</strong>에 붙여넣습니다</li>
          <li className="list-decimal">[여기에 한글 상세설명을 입력] 부분에 <strong className="text-idus-black">번역할 내용</strong>을 넣습니다</li>
          <li className="list-decimal">번역 결과를 <strong className="text-idus-black">작품 등록</strong>에 사용합니다</li>
        </ol>
      </div>

      {/* 프롬프트 목록 */}
      <div className="space-y-2 sm:space-y-3">
        {PROMPTS.map((item) => (
          <div 
            key={item.id}
            className="bg-white rounded-xl border border-idus-black-10 overflow-hidden shadow-sm"
          >
            {/* 헤더 (클릭 가능) */}
            <button
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              className="w-full flex items-center justify-between p-3 sm:p-4 hover:bg-idus-gray/50 transition-colors min-h-[56px] active:bg-idus-black-10"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-2xl sm:text-3xl">{item.flag}</span>
                <div className="text-left min-w-0">
                  <div className="font-semibold text-idus-black text-sm sm:text-base">{item.title}</div>
                  <div className="text-[10px] sm:text-xs text-idus-black-50">{item.description}</div>
                </div>
              </div>
              <motion.div
                animate={{ rotate: expandedId === item.id ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0"
              >
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-idus-black-30" />
              </motion.div>
            </button>

            {/* 프롬프트 내용 */}
            <AnimatePresence>
              {expandedId === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-3 pb-3 sm:px-4 sm:pb-4">
                    {/* 프롬프트 박스 */}
                    <div className="relative bg-gradient-to-br from-idus-gray to-slate-100 rounded-xl p-3 sm:p-4 border border-idus-black-10">
                      <pre className="text-[11px] sm:text-sm text-idus-black whitespace-pre-wrap font-mono leading-relaxed pr-14 sm:pr-16">
                        {item.prompt}
                      </pre>
                      
                      {/* 복사 버튼 */}
                      <motion.button
                        onClick={() => handleCopy(item.prompt, item.id)}
                        className={`
                          absolute top-2 right-2 sm:top-3 sm:right-3 flex items-center gap-1 sm:gap-1.5 
                          px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg border transition-all text-xs sm:text-sm font-medium shadow-sm
                          ${copiedId === item.id 
                            ? 'bg-green-50 border-green-300 text-green-600' 
                            : 'bg-white border-idus-black-10 hover:bg-idus-orange-light/50 hover:border-idus-orange text-idus-black-70'}
                        `}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {copiedId === item.id ? (
                          <>
                            <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">복사됨!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>복사</span>
                          </>
                        )}
                      </motion.button>
                    </div>

                    {/* 입력 위치 안내 */}
                    <div className="mt-2 sm:mt-3 flex items-start gap-2 text-[10px] sm:text-xs bg-amber-50 px-2.5 py-2 sm:px-3 rounded-lg border border-amber-200">
                      <span className="text-amber-500 flex-shrink-0">💡</span>
                      <span className="text-amber-700 leading-relaxed">[여기에 한글 상세설명을 입력] 부분에 번역할 내용을 넣어주세요</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* ChatGPT 바로가기 */}
      <motion.a
        href="https://chat.openai.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 p-3 sm:p-4 
                   bg-gradient-to-r from-emerald-500 to-teal-500 
                   rounded-xl text-white font-bold text-sm sm:text-base
                   shadow-lg shadow-emerald-500/20
                   hover:from-emerald-600 hover:to-teal-600 transition-all"
        whileHover={{ scale: 1.01, y: -2 }}
        whileTap={{ scale: 0.99 }}
      >
        <span className="text-base sm:text-lg">🚀</span>
        <span>ChatGPT 바로가기</span>
        <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </motion.a>

      {/* 공식 가이드 링크 */}
      <a
        href="https://artist-mate.idus.com/19a1f5a7-1344-80f3-be04-e2ddaad95bf6"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 p-2.5 sm:p-3 
                   bg-idus-gray rounded-xl text-idus-black-70
                   hover:bg-idus-black-10 transition-all text-xs sm:text-sm"
      >
        <span>📖</span>
        <span>idus 공식 번역 가이드 전체 보기</span>
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
}
