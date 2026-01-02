'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import Accordion from '@/components/ui/Accordion';
import BrandIcon from '@/components/ui/BrandIcon';
import { useToast } from '@/components/ui/ToastProvider';
import EmptyState from '@/components/ui/EmptyState';
import { ArrowLeft, Search, Package, CreditCard, Globe, MessageCircle, HelpCircle } from 'lucide-react';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  // 노션 FAQ 9개 토글(완전판) 기준
  {
    id: 'faq-1',
    category: 'FAQ',
    question: '글로벌 작품과 국내 판매용 작품을 따로 운영할 수 없나요?',
    answer:
      '동일한 작품으로 국내와 글로벌 판매가 동시에 가능합니다.\n\n- 별도로 작품을 등록하실 필요가 없습니다.\n- 기존 작품에 "글로벌 판매" 설정만 ON 하시면 됩니다.\n- 재고는 통합 관리됩니다.',
  },
  {
    id: 'faq-2',
    category: 'FAQ',
    question: '제가 판매하는 작품을 글로벌로 판매 가능할까요?',
    answer:
      '대부분의 핸드메이드 작품은 글로벌 판매가 가능합니다.\n\n판매 가능:\n- 악세서리, 주얼리\n- 가방, 지갑, 파우치\n- 인테리어 소품\n- 문구류\n- 의류, 패션 소품\n\n판매 불가:\n- 음식물, 화장품, 의약품\n- 액체류, 배터리 제품\n- 동식물 제품(일부)\n\n자세한 내용은 "판매 가능/불가능 품목"을 확인해주세요.',
  },
  {
    id: 'faq-3',
    category: 'FAQ',
    question: '글로벌 판매를 원하는 국가만 진행할 수 있나요?',
    answer:
      '현재는 전체 45개국 대상으로 일괄 판매됩니다.\n\n- 특정 국가 제외 기능은 추후 업데이트 예정입니다.\n- 품목에 따라 일부 국가로 발송이 제한될 수 있습니다.',
  },
  {
    id: 'faq-4',
    category: 'FAQ',
    question: '해외 배송비는 어떻게 되나요?',
    answer:
      '작가님께서 부담하시는 해외 배송비는 0원입니다!\n\n- 국내 물류센터까지만 보내주시면 됩니다.\n- 국내 물류센터까지의 택배비만 부담하시면 됩니다.\n- 해외 배송비는 idus에서 처리합니다.',
  },
  {
    id: 'faq-5',
    category: 'FAQ',
    question: '정산은 어떻게 되나요?',
    answer:
      '월 2회(1일, 16일) 원화로 정산됩니다.\n\n- 정산일: 매월 1일, 16일\n- 정산 통화: 원화(KRW)\n- 환율 적용: 정산일 기준',
  },
  {
    id: 'faq-6',
    category: 'FAQ',
    question: '반품/교환은 어떻게 처리되나요?',
    answer:
      '고객 귀책 사유(단순 변심)\n- 고객이 반품 배송비 부담\n- 반품 수령 후 환불 처리\n\n작가 귀책 사유(불량, 오배송)\n- idus가 처리 도와드림\n- 작가님께 별도 안내\n\n반품 불가 조건\n- 주문제작 상품\n- 사용 흔적이 있는 상품\n- 교환/반품 기간 경과(수령 후 7일)',
  },
  {
    id: 'faq-7',
    category: 'FAQ',
    question: '글로벌 주문이 들어오면 어떻게 알 수 있나요?',
    answer:
      '알림 수신 방법\n- 작가 앱 푸시 알림\n- 이메일 알림\n- SMS 알림(설정 시)\n\n주문 확인 경로\n작가 앱 → 주문 관리 → 글로벌 주문',
  },
  {
    id: 'faq-8',
    category: 'FAQ',
    question: '해외 고객과 어떻게 소통하나요?',
    answer:
      '소통 경로\n- 작가 앱 내 메시지 기능\n\n언어 장벽 해결\n- 번역 도구 활용(파파고, 구글 번역)\n- 자주 쓰는 답변 템플릿 준비\n- 이미지/사진으로 소통\n\n팁: 영어/일본어 답변 템플릿을 미리 준비해두면 빠르게 대응할 수 있어요!',
  },
  {
    id: 'faq-9',
    category: 'FAQ',
    question: '글로벌 판매 시 세금은 어떻게 되나요?',
    answer:
      '부가가치세(VAT)\n- 해외 판매는 영세율 적용(0%)\n- 수출로 간주되어 부가세 면제\n\n소득세\n- 국내 판매와 동일하게 소득 신고가 필요해요\n- 정산 내역으로 증빙할 수 있어요\n\n주의: 세부 사항은 세무사와 상담해보면 좋아요.',
  },
];

// 카테고리별 아이콘 매핑
const categoryIcons: Record<string, React.ReactNode> = {
  '전체': <HelpCircle className="w-4 h-4" />,
  'FAQ': <HelpCircle className="w-4 h-4" />,
  '배송': <Package className="w-4 h-4" />,
  '정산': <CreditCard className="w-4 h-4" />,
  '판매': <Globe className="w-4 h-4" />,
  'CS': <MessageCircle className="w-4 h-4" />,
};

// 추천 검색어
const SUGGESTED_KEYWORDS = ['배송', '정산', '반품', '번역', '세금'];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>('전체');
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const { toast } = useToast();

  const categories = ['전체', ...Array.from(new Set(FAQ_DATA.map(item => item.category)))];
  
  const filteredFAQs = useMemo(() => {
    const base = activeCategory === '전체'
      ? FAQ_DATA
      : FAQ_DATA.filter(item => item.category === activeCategory);

    const q = query.trim().toLowerCase();
    if (!q) return base;
    return base.filter(item =>
      item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)
    );
  }, [activeCategory, query]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const accordionItems = useMemo(() => {
    return filteredFAQs.map(item => ({
      id: item.id,
      header: (
        <div className="flex items-start gap-2 sm:gap-3">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-idus-orange-light/30 flex items-center justify-center flex-shrink-0">
            <BrandIcon name="like" size={16} alt="" className="sm:w-[18px] sm:h-[18px]" />
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-idus-black text-sm sm:text-base">{item.question}</div>
            <div className="text-[10px] sm:text-xs text-idus-black-50 mt-0.5">FAQ</div>
          </div>
        </div>
      ),
      content: item.answer,
    }));
  }, [filteredFAQs]);

  const handleSuggestionClick = (keyword: string) => {
    setQuery(keyword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-idus-gray">
      {/* 헤더 */}
      <motion.header 
        className="bg-white/90 backdrop-blur-sm border-b border-idus-black-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-3xl mx-auto px-4 py-4 sm:py-6">
          <Link href="/learn" className="text-idus-black-70 hover:text-idus-orange mb-3 sm:mb-4 inline-flex items-center gap-1.5 sm:gap-2 group text-sm">
            <motion.span
              className="inline-flex items-center gap-1.5 sm:gap-2"
              whileHover={{ x: -4 }}
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:-translate-x-1" />
              학습으로 돌아가기
            </motion.span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.div 
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-idus-orange-light/50 to-idus-orange-light/20 flex items-center justify-center flex-shrink-0"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            >
              <BrandIcon name="like" size={20} alt="" className="sm:w-6 sm:h-6" />
            </motion.div>
            <div className="min-w-0">
              <motion.h1 
                className="text-lg sm:text-2xl font-bold text-idus-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                자주 묻는 질문
              </motion.h1>
              <motion.p 
                className="text-idus-black-50 text-xs sm:text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                글로벌 판매에 대해 궁금한 점을 여기서 바로 확인해요
              </motion.p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* 카테고리 필터 */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-2.5 sm:py-3">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            <motion.div 
              className="relative flex-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-idus-black-50 absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="질문/키워드로 검색"
                className="w-full pl-8 sm:pl-9 pr-2.5 sm:pr-3 py-2 rounded-lg sm:rounded-xl border border-idus-black-10 bg-idus-gray 
                           focus:outline-none focus:ring-2 focus:ring-idus-orange/40 focus:border-idus-orange
                           transition-all text-sm"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                variant="outline"
                size="sm"
                className="text-xs sm:text-sm px-2.5 sm:px-3"
                onClick={() => {
                  setQuery('');
                  toast({ type: 'info', title: '검색 초기화', description: '전체 질문을 다시 보여드릴게요.' });
                }}
              >
                초기화
              </Button>
            </motion.div>
          </div>

          {/* 카테고리 필터 - 아이콘 추가 */}
          <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1 sm:gap-1.5 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-idus-orange to-idus-orange-dark text-white shadow-md shadow-idus-orange/20'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="[&>svg]:w-3.5 [&>svg]:h-3.5 sm:[&>svg]:w-4 sm:[&>svg]:h-4">{categoryIcons[category] || <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}</span>
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ 리스트 */}
      <main className="max-w-3xl mx-auto px-4 py-6 sm:py-8">
        <AnimatePresence mode="wait">
          {accordionItems.length > 0 ? (
            <motion.div
              key="faq-list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Accordion items={accordionItems} openIds={openItems} onToggle={toggleItem} />
              
              {/* 연관 질문 섹션 */}
              <motion.div 
                className="mt-6 sm:mt-8 p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl border border-idus-black-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-xs sm:text-sm font-semibold text-idus-black-70 mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
                  💡 자주 검색하는 키워드
                </h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {SUGGESTED_KEYWORDS.map((keyword, index) => (
                    <motion.button
                      key={keyword}
                      onClick={() => handleSuggestionClick(keyword)}
                      className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-idus-gray hover:bg-idus-orange-light/30 
                                 rounded-full text-xs sm:text-sm text-idus-black-70 hover:text-idus-orange
                                 transition-colors border border-idus-black-10"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {keyword}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <EmptyState
                type="search"
                title="검색 결과가 없어요"
                description="다른 키워드로 다시 검색해보세요."
                suggestions={SUGGESTED_KEYWORDS}
                onSuggestionClick={handleSuggestionClick}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

