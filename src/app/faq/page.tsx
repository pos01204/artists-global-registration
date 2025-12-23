'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  // 글로벌 서비스 일반
  {
    id: 'faq-1',
    category: '글로벌 서비스',
    question: 'idus 글로벌은 어떤 서비스인가요?',
    answer: 'idus 글로벌은 한국 작가님들의 핸드메이드 작품을 전 세계 45개국 고객에게 판매할 수 있는 서비스입니다. 해외 배송, 결제, 고객 서비스를 idus가 모두 지원합니다.',
  },
  {
    id: 'faq-2',
    category: '글로벌 서비스',
    question: '어느 나라에 판매할 수 있나요?',
    answer: '미국, 일본, 영국, 독일, 프랑스, 캐나다, 호주 등 전 세계 45개국에 판매할 수 있습니다. 각 국가별 인기 카테고리와 특성이 다르니 참고해주세요.',
  },
  // 배송
  {
    id: 'faq-3',
    category: '배송',
    question: '해외 배송비는 얼마인가요?',
    answer: '해외 배송비는 0원입니다! 작가님은 국내 물류센터까지만 발송하시면 되고, 해외 배송은 idus가 모두 처리합니다.',
  },
  {
    id: 'faq-4',
    category: '배송',
    question: '해외 배송은 얼마나 걸리나요?',
    answer: '국가에 따라 다르지만, 일반적으로 7-14일 정도 소요됩니다. 미국/유럽은 약 10-14일, 일본은 약 5-7일 정도 걸립니다.',
  },
  {
    id: 'faq-5',
    category: '배송',
    question: '어떻게 발송하면 되나요?',
    answer: '주문이 들어오면 작품을 포장하여 지정된 국내 물류센터로 택배 발송하시면 됩니다. 운송장 번호를 입력하면 이후 해외 배송은 자동으로 처리됩니다.',
  },
  // 정산
  {
    id: 'faq-6',
    category: '정산',
    question: '정산은 어떻게 받나요?',
    answer: '월 2회(1일, 16일) 원화로 정산됩니다. 환전 걱정 없이 기존 국내 판매와 동일하게 받으실 수 있습니다.',
  },
  {
    id: 'faq-7',
    category: '정산',
    question: '해외 판매 수수료는 얼마인가요?',
    answer: '글로벌 판매 수수료는 국내 판매와 동일합니다. 별도의 해외 판매 수수료는 없습니다.',
  },
  // 작품 등록
  {
    id: 'faq-8',
    category: '작품 등록',
    question: '영어를 못해도 판매할 수 있나요?',
    answer: '네! 파파고, DeepL 등 번역 도구를 활용하면 쉽게 영문 정보를 입력할 수 있습니다. 고객 문의도 자동 번역을 지원하니 한국어로 답변하시면 됩니다.',
  },
  {
    id: 'faq-9',
    category: '작품 등록',
    question: '어떤 작품을 판매할 수 있나요?',
    answer: '악세서리, 가방, 인테리어 소품, 문구, 캔들, 도자기 등 대부분의 핸드메이드 작품을 판매할 수 있습니다. 단, 화장품, 식품, 의약품 등은 판매가 불가능합니다.',
  },
  {
    id: 'faq-10',
    category: '작품 등록',
    question: '기존 작품을 글로벌로 전환하려면?',
    answer: '작품 수정 페이지에서 "글로벌 판매" 옵션을 ON으로 설정하고, 영문 작품명과 설명을 입력하시면 됩니다.',
  },
  // 자격 조건
  {
    id: 'faq-11',
    category: '자격 조건',
    question: '글로벌 작가 등록 조건이 있나요?',
    answer: '사업자등록번호를 보유하고 계셔야 합니다. 또한 화장품, 식품 등 글로벌 판매 불가 카테고리만 판매하시는 경우 등록이 어렵습니다.',
  },
  {
    id: 'faq-12',
    category: '자격 조건',
    question: '식품/디지털 작품은 언제 판매할 수 있나요?',
    answer: '식품과 디지털 작품(캐리커쳐 등)은 2026년 글로벌 확장 예정입니다. 관심 있으신 분들은 대기 리스트에 등록해주시면 오픈 시 가장 먼저 연락드립니다.',
  },
  // 고객 응대
  {
    id: 'faq-13',
    category: '고객 응대',
    question: '해외 고객 문의는 어떻게 답변하나요?',
    answer: 'idus 앱 내 채팅은 자동 번역을 지원합니다. 한국어로 답변하시면 고객에게는 영어/일본어로 전달됩니다.',
  },
  {
    id: 'faq-14',
    category: '고객 응대',
    question: '교환/환불 요청이 오면 어떻게 하나요?',
    answer: '국내 판매와 동일하게 처리하시면 됩니다. 반품 배송비는 idus가 부담하며, 물류센터에서 처리합니다.',
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>('전체');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const categories = ['전체', ...Array.from(new Set(FAQ_DATA.map(item => item.category)))];
  
  const filteredFAQs = activeCategory === '전체' 
    ? FAQ_DATA 
    : FAQ_DATA.filter(item => item.category === activeCategory);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <Link href="/learn" className="text-gray-500 hover:text-idusOrange mb-4 inline-block">
            ← 학습으로 돌아가기
          </Link>
          <h1 className="text-2xl font-bold text-idusBlack">❓ 자주 묻는 질문</h1>
          <p className="text-gray-600 mt-2">글로벌 판매에 대해 궁금한 점을 확인해보세요</p>
        </div>
      </header>

      {/* 카테고리 필터 */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? 'bg-idusOrange text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ 리스트 */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="space-y-3">
          {filteredFAQs.map(item => (
            <div 
              key={item.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="text-idusOrange font-bold">Q</span>
                  <span className="font-medium text-idusBlack">{item.question}</span>
                </div>
                <span className={`text-xl transition-transform ${openItems.includes(item.id) ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              
              {openItems.includes(item.id) && (
                <div className="px-5 pb-4 border-t border-gray-100">
                  <div className="flex items-start gap-3 pt-4">
                    <span className="text-gray-400 font-bold">A</span>
                    <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 추가 문의 */}
        <div className="mt-12 bg-idusOrange-10 rounded-2xl p-6 text-center">
          <h3 className="text-lg font-bold text-idusBlack mb-2">
            찾으시는 답변이 없으신가요?
          </h3>
          <p className="text-gray-600 mb-4">
            채널톡으로 문의해주시면 친절하게 안내해드릴게요!
          </p>
          <a 
            href="https://idus.channel.io" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button variant="primary">
              💬 채널톡 문의하기
            </Button>
          </a>
          <p className="text-sm text-gray-500 mt-3">
            상담시간: 평일 오전 10시 ~ 오후 6시
          </p>
        </div>
      </main>
    </div>
  );
}

