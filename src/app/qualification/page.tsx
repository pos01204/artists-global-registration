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
        <div className="animate-spin w-8 h-8 border-4 border-idusOrange border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
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
            <span className="text-sm font-medium text-idusOrange">Global</span>
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* 축하 메시지 */}
        <div className="text-center mb-10">
          <div className="text-7xl mb-6 animate-bounce">✅</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            자격 확인 완료!
          </h1>
          <p className="text-lg text-gray-600">
            <span className="font-semibold text-idusOrange">{data.artistName}</span> 작가님,<br />
            글로벌 작가가 될 자격이 확인되었습니다!
          </p>
        </div>

        {/* 자격 요약 */}
        <Card variant="elevated" className="mb-8">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            📋 자격 확인 결과
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-gray-700">사업자등록번호</span>
              <span className="text-green-600 font-semibold">✓ 보유</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-gray-700">판매 카테고리</span>
              <span className="text-green-600 font-semibold">✓ 판매 가능</span>
            </div>
          </div>
        </Card>

        {/* 선택한 카테고리 */}
        <Card variant="outlined" className="mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">🏷️ 선택하신 카테고리</h3>
          <div className="flex flex-wrap gap-2">
            {data.categories.map((category) => (
              <span
                key={category}
                className="px-3 py-1 bg-idusOrange-10 text-idusOrange rounded-full text-sm"
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
                카테고리는 2026년 확장 예정입니다. 오픈 시 가장 먼저 연락드릴게요!
              </p>
            </div>
          )}
        </Card>

        {/* 다음 단계 안내 */}
        <Card variant="elevated" className="mb-8 bg-gradient-to-r from-idusOrange to-orange-600 text-white">
          <div className="text-center">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-2">이제 학습을 시작해볼까요?</h3>
            <p className="text-white/80 mb-6">
              약 50분이면 글로벌 작가가 될 준비가 완료됩니다!<br />
              학습 완료 시 <span className="font-bold">KR 광고포인트 10,000P</span>를 받으세요!
            </p>
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-idusOrange hover:bg-gray-100"
              onClick={handleStartLearning}
            >
              🚀 학습 시작하기
            </Button>
          </div>
        </Card>

        {/* 학습 과정 미리보기 */}
        <Card variant="outlined">
          <h3 className="font-semibold text-gray-900 mb-4">📖 학습 과정 미리보기</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-2xl">🌏</span>
              <div>
                <h4 className="font-medium text-gray-900">STEP 1: 글로벌 서비스 이해하기</h4>
                <p className="text-sm text-gray-500">약 15분</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-2xl">📝</span>
              <div>
                <h4 className="font-medium text-gray-900">STEP 2: 작품 등록 마스터하기</h4>
                <p className="text-sm text-gray-500">약 20분</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-2xl">📦</span>
              <div>
                <h4 className="font-medium text-gray-900">STEP 3: 주문 처리 & 운영하기</h4>
                <p className="text-sm text-gray-500">약 15분</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-idusOrange-10 rounded-lg">
              <span className="text-2xl">🎯</span>
              <div>
                <h4 className="font-medium text-gray-900">간단 퀴즈</h4>
                <p className="text-sm text-gray-500">약 2분</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}

