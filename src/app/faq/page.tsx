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
      '소통 경로\n- 작가 앱 내 메시지 기능\n\n언어 장벽 해결\n- 번역 도구 활용(파파고, 구글 번역)\n- 자주 쓰는 답변 템플릿 준비\n- 이미지/사진으로 소통\n\n팁: 영어/일본어 답변 템플릿을 미리 준비해 두시면 빠르게 대응할 수 있습니다!',
  },
  {
    id: 'faq-9',
    category: 'FAQ',
    question: '글로벌 판매 시 세금은 어떻게 되나요?',
    answer:
      '부가가치세(VAT)\n- 해외 판매는 영세율 적용(0%)\n- 수출로 간주되어 부가세 면제\n\n소득세\n- 국내 판매와 동일하게 소득 신고 필요\n- 정산 내역으로 증빙 가능\n\n주의: 세부 사항은 세무사와 상담하시기 바랍니다.',
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

