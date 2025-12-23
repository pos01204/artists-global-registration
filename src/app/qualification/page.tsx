'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { getOnboardingData } from '@/lib/storage';
import { OnboardingData } from '@/types/onboarding';
import { submitOnboardingData } from '@/lib/api';
import { AVAILABLE_CATEGORIES, RESTRICTED_CATEGORIES } from '@/types/onboarding';
import { IconArrowRight, IconCheck } from '@/components/ui/icons';
import BrandIcon from '@/components/ui/BrandIcon';

// 카테고리 ID → 이름 매핑 (string 키 타입으로 명시)
const categoryNameById: Map<string, string> = new Map(
  [...AVAILABLE_CATEGORIES, ...RESTRICTED_CATEGORIES].map(c => [c.id, c.name])
);

export default function QualificationPage() {
  const router = useRouter();
  const [data, setData] = useState<OnboardingData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const onboardingData = getOnboardingData();
    if (!onboardingData) {
      router.push('/');
      return;
    }
    setData(onboardingData);

    // 데이터 제출
    submitOnboardingData(onboardingData).catch(console.error);

    // 자격 상태에 따라 리다이렉트
    if (onboardingData.qualificationStatus === 'no_business') {
      router.push('/qualification/no-business');
    } else if (onboardingData.qualificationStatus === 'restricted_category') {
      router.push('/qualification/2026-waitlist');
    }
  }, [router]);

  const handleStartLearning = () => {
    router.push('/learn');
  };

  if (!data || data.qualificationStatus !== 'qualified') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-idus-orange border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/brand/Rebranding Design Resources/Rebranding Design Resources/01. BI/logo_without_BG.png"
              alt="idus"
              width={80}
              height={32}
              className="h-8 w-auto"
            />
            <span className="text-sm font-medium text-idus-orange">Global</span>
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* 환영 메시지 */}
        <div className="text-center mb-10">
          {/* 아이콘 */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-50 rounded-full mb-5">
            <IconCheck className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            준비가 완료되었어요!
          </h1>
          <p className="text-gray-600 mb-4">
            <span className="font-semibold text-idus-orange">{data.artistName}</span> 작가님,<br />
            글로벌 판매를 시작할 준비가 되었습니다
          </p>
          
          {/* 배지 */}
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-green-500 rounded-full" aria-hidden="true" />
            <span>글로벌 판매 가능</span>
          </div>
        </div>

        {/* 확인 결과 */}
        <Card variant="outlined" className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            확인 결과
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">
                  <IconCheck className="w-4 h-4" />
                </span>
                <span className="text-gray-700">사업자등록번호</span>
              </div>
              <span className="text-green-600 text-sm font-medium">보유</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">
                  <IconCheck className="w-4 h-4" />
                </span>
                <span className="text-gray-700">판매 카테고리</span>
              </div>
              <span className="text-green-600 text-sm font-medium">판매 가능</span>
            </div>
          </div>
        </Card>

        {/* 선택한 카테고리 */}
        <Card variant="outlined" className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BrandIcon name="jewelry" size={20} alt="" />
            선택하신 카테고리
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.categories.map((category) => (
              <span
                key={category}
                className="px-4 py-2 bg-idus-orange text-white rounded-full text-sm font-semibold shadow-sm"
              >
                {categoryNameById.get(category) ?? category}
              </span>
            ))}
          </div>
          
          {/* 2026 확장 카테고리 관심 표시 */}
          {(data.interestedIn2026.food || data.interestedIn2026.digital) && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                💡 {data.interestedIn2026.food && '식품'}
                {data.interestedIn2026.food && data.interestedIn2026.digital && ', '}
                {data.interestedIn2026.digital && '디지털 작품'} 
                카테고리는 2026년 확장 예정이에요. 오픈 시 가장 먼저 연락드릴게요!
              </p>
            </div>
          )}
        </Card>

        {/* 다음 단계 안내 */}
        <Card
          variant="elevated"
          className="mb-8 bg-idus-orange text-white overflow-hidden"
          style={{ backgroundColor: 'var(--idus-orange)' }}
        >
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-15 pointer-events-none" aria-hidden="true">
            <Image
              src="/brand/brand assets/선물.png"
              alt=""
              width={140}
              height={140}
            />
          </div>
          <div className="text-center">
            {/* 메인 아이콘 */}
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                <BrandIcon name="stationery" size={32} alt="" />
              </div>
            </div>
            
            {/* 타이틀 */}
            <h3 className="text-xl font-bold mb-2">
              이제 학습을 시작해볼까요?
            </h3>
            <p className="text-sm opacity-80 mb-6">
              짧은 학습으로 글로벌 판매를 준비해보세요
            </p>
            
            {/* 학습 정보 요약 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="bg-white/15 rounded-xl p-3 text-center">
                <div className="text-xl font-bold">3</div>
                <div className="text-xs opacity-70">단계 학습</div>
              </div>
              <div className="bg-white/15 rounded-xl p-3 text-center">
                <div className="text-xl font-bold">30분</div>
                <div className="text-xs opacity-70">평균 소요</div>
              </div>
              <div className="bg-white/15 rounded-xl p-3 text-center">
                <div className="text-xl font-bold">10,000P</div>
                <div className="text-xs opacity-70">완료 보상</div>
              </div>
            </div>
            
            {/* 보상 안내 */}
            <p className="text-sm opacity-90 mb-5">
              학습 완료 후 글로벌 등록 시 <span className="font-bold">광고포인트 10,000P</span> 지급
            </p>
            
            {/* CTA 버튼 */}
            <Button
              variant="secondary"
              size="lg"
              className="w-full bg-white text-idus-orange hover:bg-white/90 font-bold shadow-md"
              onClick={handleStartLearning}
            >
              학습 시작하기
              <IconArrowRight className="w-4 h-4" />
            </Button>
            
            {/* 하단 안내 */}
            <p className="text-center text-xs opacity-60 mt-4">
              언제든지 중단하고 이어서 학습할 수 있어요
            </p>
          </div>
        </Card>

        {/* 학습 과정 미리보기 */}
        <Card variant="outlined">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            학습 과정 미리보기
          </h3>
          
          <div className="space-y-2">
            {/* STEP 1 */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="w-8 h-8 bg-idus-orange-light/40 rounded-lg flex items-center justify-center">
                <BrandIcon name="best" size={18} alt="" />
              </span>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 text-sm">STEP 1. 글로벌 서비스 이해하기</h4>
              </div>
              <span className="text-xs text-gray-400">약 11분</span>
            </div>
            
            {/* STEP 2 */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="w-8 h-8 bg-idus-orange-light/40 rounded-lg flex items-center justify-center">
                <BrandIcon name="stationery" size={18} alt="" />
              </span>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 text-sm">STEP 2. 작품 등록 마스터하기</h4>
              </div>
              <span className="text-xs text-gray-400">약 10분</span>
            </div>
            
            {/* STEP 3 */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="w-8 h-8 bg-idus-orange-light/40 rounded-lg flex items-center justify-center">
                <BrandIcon name="shipping" size={18} alt="" />
              </span>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 text-sm">STEP 3. 주문 처리 & 운영하기</h4>
              </div>
              <span className="text-xs text-gray-400">약 9분</span>
            </div>
            
            {/* 퀴즈 */}
            <div className="flex items-center gap-3 p-3 bg-idus-orange-light/20 rounded-lg border border-idus-black-10">
              <span className="w-8 h-8 bg-idus-orange-light/40 rounded-lg flex items-center justify-center">
                <BrandIcon name="camera" size={18} alt="" />
              </span>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 text-sm">FINAL. 간단 퀴즈</h4>
              </div>
              <span className="text-xs text-gray-400">약 2분</span>
            </div>
          </div>
        </Card>
        
        {/* 하단 문의 안내 */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400 mb-1">도움이 필요하신가요?</p>
          <a 
            href="https://idus.channel.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-idus-orange hover:underline text-sm"
          >
            채널톡으로 문의하기
          </a>
        </div>
      </div>
    </main>
  );
}

