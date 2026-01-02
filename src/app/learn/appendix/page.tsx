'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import BrandIcon from '@/components/ui/BrandIcon';
import { IconArrowLeft, IconChevronRight } from '@/components/ui/icons';
import { getAllContents } from '@/data/contents';
import { getOnboardingData, isLearningCompleted } from '@/lib/storage';
import { LEARNING_STEPS } from '@/types/onboarding';
import { FileText, Package, Gift, MessageCircle, AlertTriangle, Sparkles, Receipt, Calculator, Truck, ExternalLink } from 'lucide-react';

type StepFilter = 0 | 1 | 2 | 3;

// 핵심 퀵 링크 데이터 (우선순위순)
const QUICK_LINKS = [
  {
    id: 'translation-prompt',
    title: '번역 프롬프트',
    description: 'idus 공식 일본어/영어 프롬프트',
    icon: <Sparkles className="w-5 h-5" />,
    color: 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200',
    iconBg: 'bg-idus-orange',
    contentId: 'translation-guide',
  },
  {
    id: 'order-separation',
    title: '주문 단위 분리 입고',
    description: '같은 고객도 주문별 별도 포장!',
    icon: <Package className="w-5 h-5" />,
    color: 'bg-gradient-to-br from-red-50 to-rose-50 border-red-200',
    iconBg: 'bg-red-500',
    contentId: 'order-processing',
  },
  {
    id: 'gift-option',
    title: '사은품 옵션 설정',
    description: '0원 옵션 등록 필수!',
    icon: <Gift className="w-5 h-5" />,
    color: 'bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200',
    iconBg: 'bg-purple-500',
    contentId: 'order-processing',
  },
  {
    id: 'sellable-items',
    title: '판매 가능/불가 품목',
    description: '대부분 OK, 일부 제한',
    icon: <AlertTriangle className="w-5 h-5" />,
    color: 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200',
    iconBg: 'bg-amber-500',
    contentId: 'sellable-items',
  },
  {
    id: 'logistics',
    title: '배송 흐름 & 물류센터',
    description: '국내 물류센터 주소 확인',
    icon: <Truck className="w-5 h-5" />,
    color: 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200',
    iconBg: 'bg-emerald-500',
    contentId: 'logistics',
  },
  {
    id: 'auto-translation',
    title: '고객 문의 자동 번역',
    description: '한국어 답변 → 자동 번역!',
    icon: <MessageCircle className="w-5 h-5" />,
    color: 'bg-gradient-to-br from-blue-50 to-sky-50 border-blue-200',
    iconBg: 'bg-blue-500',
    contentId: 'customer-service',
  },
];

// 부가 정보 링크 (이관된 콘텐츠)
const SECONDARY_LINKS = [
  {
    id: 'settlement',
    title: '정산 & 수수료 상세',
    description: '월 2회 원화 정산, 등급별 수수료',
    icon: <Calculator className="w-4 h-4" />,
    contentId: 'settlement',
  },
  {
    id: 'msds',
    title: 'MSDS 제출 안내',
    description: '캔들/배터리 제품 필수',
    icon: <FileText className="w-4 h-4" />,
    contentId: 'sellable-items',
  },
  {
    id: 'document-guide',
    title: '소포수령증 신청',
    description: '매월 초 신청, 부가세 신고용',
    icon: <Receipt className="w-4 h-4" />,
    contentId: 'document-guide',
  },
];

export default function AppendixPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [stepFilter, setStepFilter] = useState<StepFilter>(0);

  useEffect(() => {
    const data = getOnboardingData();
    if (!data) {
      router.push('/');
    }
  }, [router]);

  const completed = isLearningCompleted();

  const stepNameById = useMemo(() => {
    const map = new Map<number, string>();
    LEARNING_STEPS.forEach(s => map.set(s.id, s.title));
    return map;
  }, []);

  const contents = useMemo(() => {
    const all = getAllContents();
    const q = query.trim().toLowerCase();
    return all
      .filter(c => (stepFilter === 0 ? true : c.stepId === stepFilter))
      .filter(c => {
        if (!q) return true;
        return (
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          (c.content.summary ?? []).some(s => String(s).toLowerCase().includes(q))
        );
      })
      .sort((a, b) => (a.stepId - b.stepId) || (a.order - b.order));
  }, [query, stepFilter]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-idus-gray">
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
        <Image src="/brand/brand assets/pattern02.png" alt="" fill className="object-cover opacity-[0.05]" />
      </div>

      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-idus-black-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
          <Link href="/complete" className="inline-flex items-center gap-2 text-idus-black-70 hover:text-idus-orange">
            <IconArrowLeft className="w-4 h-4" />
            <span className="text-sm">완료 페이지</span>
          </Link>
          <div className="text-sm font-medium text-idus-black">부록 · 주제별 다시보기</div>
          <div className="w-[76px]" aria-hidden="true" />
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 pb-10">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-idus-orange-light/30 flex items-center justify-center">
              <BrandIcon name="best" size={26} alt="" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-idus-black">필요한 정보만 다시 찾아보세요</h1>
              <p className="text-sm text-idus-black-50">
                학습을 완료하신 작가님을 위한 부록 페이지입니다. 키워드 검색 후 원하는 주제로 바로 이동할 수 있어요.
              </p>
            </div>
          </div>
        </div>

        {!completed ? (
          <Card variant="outlined" className="p-6">
            <div className="text-idus-black font-semibold mb-2">아직 학습이 완료되지 않았어요</div>
            <div className="text-sm text-idus-black-70 mb-4">
              부록(다시보기)은 학습 완료 후 이용할 수 있습니다.
            </div>
            <Link href="/learn">
              <Button variant="primary">학습 목록으로</Button>
            </Link>
          </Card>
        ) : (
          <>
            {/* 핵심 퀵 링크 섹션 */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-idus-black mb-3 flex items-center gap-2">
                <span className="text-xl">⚡</span>
                자주 찾는 핵심 정보
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {QUICK_LINKS.map((link) => (
                  <Link 
                    key={link.id} 
                    href={`/learn/content/${link.contentId}?from=appendix`}
                    className={`
                      ${link.color} border rounded-xl p-4 
                      hover:shadow-md transition-all hover:-translate-y-0.5
                    `}
                  >
                    <div className={`w-10 h-10 rounded-xl ${link.iconBg} flex items-center justify-center mb-3 text-white shadow-sm`}>
                      {link.icon}
                    </div>
                    <div className="font-semibold text-idus-black text-sm mb-1">{link.title}</div>
                    <div className="text-xs text-idus-black-50 line-clamp-2">{link.description}</div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 부가 정보 섹션 */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-idus-black-50 mb-3 flex items-center gap-2">
                📄 부가 정보
              </h2>
              <div className="flex flex-wrap gap-2">
                {SECONDARY_LINKS.map((link) => (
                  <Link 
                    key={link.id} 
                    href={`/learn/content/${link.contentId}?from=appendix`}
                    className="inline-flex items-center gap-2 bg-slate-50 hover:bg-slate-100 
                               border border-slate-200 rounded-full px-4 py-2 transition-colors"
                  >
                    <span className="text-slate-500">{link.icon}</span>
                    <span className="text-sm text-idus-black-70">{link.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* 구분선 */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-idus-black-10" />
              <span className="text-xs text-idus-black-50">전체 학습 콘텐츠</span>
              <div className="flex-1 h-px bg-idus-black-10" />
            </div>

            <Card variant="outlined" className="p-4 mb-4">
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <div className="flex-1">
                  <div className="text-sm font-semibold text-idus-black mb-2">검색</div>
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="예) 물류센터, 수수료, 소포수령증, MSDS…"
                    className="w-full rounded-xl border border-idus-black-10 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-idus-orange/30"
                  />
                </div>
                <div className="sm:w-64">
                  <div className="text-sm font-semibold text-idus-black mb-2">STEP 필터</div>
                  <select
                    value={stepFilter}
                    onChange={(e) => setStepFilter(Number(e.target.value) as StepFilter)}
                    className="w-full rounded-xl border border-idus-black-10 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-idus-orange/30"
                  >
                    <option value={0}>전체</option>
                    <option value={1}>STEP 1</option>
                    <option value={2}>STEP 2</option>
                    <option value={3}>STEP 3</option>
                  </select>
                </div>
              </div>
              <div className="text-xs text-idus-black-50 mt-3">
                총 {contents.length}개 주제
              </div>
            </Card>

            <div className="grid gap-3">
              {contents.map((c) => (
                <Card key={c.id} variant="outlined" hoverable>
                  <Link href={`/learn/content/${c.id}?from=appendix`} className="block">
                    <div className="flex items-start gap-4 p-4">
                      <div className="w-12 h-12 rounded-2xl bg-idus-orange-light/25 border border-idus-black-10 flex items-center justify-center flex-shrink-0">
                        <BrandIcon name={c.stepId === 1 ? 'best' : c.stepId === 2 ? 'stationery' : 'shipping'} size={26} alt="" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-idus-black-50">
                            STEP {c.stepId} · {stepNameById.get(c.stepId) ?? ''}
                          </span>
                        </div>
                        <div className="font-bold text-idus-black mb-1 truncate">{c.title}</div>
                        <div className="text-sm text-idus-black-70 line-clamp-2">{c.description}</div>
                        {c.content.summary && c.content.summary.length > 0 ? (
                          <div className="mt-2 text-xs text-idus-black-50 line-clamp-1">
                            핵심: {c.content.summary[0]}
                          </div>
                        ) : null}
                      </div>
                      <IconChevronRight className="w-5 h-5 text-idus-orange flex-shrink-0 mt-1" />
                    </div>
                  </Link>
                </Card>
              ))}
            </div>

            <Card variant="outlined" className="mt-6 p-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1">
                  <div className="font-semibold text-idus-black">자주 묻는 질문도 함께 확인해요</div>
                  <div className="text-sm text-idus-black-50">배송/정산/문의 대응 등 빠르게 찾을 수 있어요</div>
                </div>
                <Link href="/faq" className="sm:w-auto">
                  <Button variant="secondary" className="w-full sm:w-auto">FAQ 보기</Button>
                </Link>
              </div>
            </Card>
          </>
        )}
      </div>
    </main>
  );
}


