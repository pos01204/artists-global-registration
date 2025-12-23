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
        {/* 축하 메시지 - 개선된 버전 */}
        <div className="text-center mb-10">
          {/* 축하 애니메이션 배경 */}
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-30" />
            <div className="relative w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-5xl">✅</span>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            자격 확인 완료!
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            <span className="font-semibold text-idusOrange">{data.artistName}</span> 작가님,<br />
            글로벌 작가가 될 자격이 확인되었습니다!
          </p>
          
          {/* 축하 배지 */}
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
            <span>🌟</span>
            <span>글로벌 판매 가능 작가</span>
          </div>
        </div>

        {/* 자격 요약 - 개선된 버전 */}
        <Card variant="elevated" className="mb-6 border-l-4 border-l-green-500">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">📋</span>
            자격 확인 결과
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">✓</span>
                <div>
                  <span className="font-medium text-gray-900">사업자등록번호</span>
                  <p className="text-xs text-gray-500">글로벌 판매 필수 조건</p>
                </div>
              </div>
              <span className="text-green-600 font-bold bg-green-100 px-3 py-1 rounded-full text-sm">보유 완료</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">✓</span>
                <div>
                  <span className="font-medium text-gray-900">판매 카테고리</span>
                  <p className="text-xs text-gray-500">해외 판매 가능 품목</p>
                </div>
              </div>
              <span className="text-green-600 font-bold bg-green-100 px-3 py-1 rounded-full text-sm">판매 가능</span>
            </div>
          </div>
        </Card>

        {/* 선택한 카테고리 - 개선된 버전 */}
        <Card variant="outlined" className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">🏷️</span>
            선택하신 카테고리
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.categories.map((category) => (
              <span
                key={category}
                className="px-4 py-2 bg-gradient-to-r from-idusOrange-10 to-orange-100 text-idusOrange rounded-xl text-sm font-medium border border-idusOrange/20 flex items-center gap-1"
              >
                <span className="w-2 h-2 bg-idusOrange rounded-full" />
                {categoryNameById.get(category) ?? category}
              </span>
            ))}
          </div>
          
          {/* 2026 확장 카테고리 관심 표시 */}
          {(data.interestedIn2026.food || data.interestedIn2026.digital) && (
            <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <p className="font-medium text-blue-800 mb-1">2026년 확장 예정 카테고리</p>
                  <p className="text-sm text-blue-600">
                    {data.interestedIn2026.food && '식품'}
                    {data.interestedIn2026.food && data.interestedIn2026.digital && ', '}
                    {data.interestedIn2026.digital && '디지털 작품'} 
                    카테고리는 2026년 확장 예정입니다.<br />
                    <span className="font-medium">오픈 시 가장 먼저 연락드릴게요!</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* 다음 단계 안내 - 개선된 버전 */}
        <Card variant="elevated" className="mb-8 bg-gradient-to-br from-idusOrange via-orange-500 to-orange-600 text-white overflow-hidden relative">
          {/* 배경 장식 */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            {/* 상단 배지 */}
            <div className="flex justify-center mb-4">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium">
                🎉 자격 확인 완료
              </span>
            </div>
            
            {/* 메인 아이콘 */}
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <span className="text-5xl">📚</span>
              </div>
            </div>
            
            {/* 타이틀 */}
            <h3 className="text-2xl font-bold mb-3 text-center">
              이제 학습을 시작해볼까요?
            </h3>
            
            {/* 학습 정보 요약 */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
                <div className="text-2xl font-bold">3</div>
                <div className="text-xs text-white/80">단계 학습</div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
                <div className="text-2xl font-bold">50분</div>
                <div className="text-xs text-white/80">예상 소요</div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
                <div className="text-2xl font-bold">10,000P</div>
                <div className="text-xs text-white/80">완료 보상</div>
              </div>
            </div>
            
            {/* 보상 안내 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-5">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎁</span>
                <div>
                  <p className="font-semibold">학습 완료 보상</p>
                  <p className="text-sm text-white/80">
                    모든 학습 완료 후 글로벌 등록 시 <span className="font-bold text-yellow-200">KR 광고포인트 10,000P</span> 지급!
                  </p>
                </div>
              </div>
            </div>
            
            {/* CTA 버튼 */}
            <Button
              variant="secondary"
              size="lg"
              className="w-full bg-white text-idusOrange hover:bg-gray-100 font-bold shadow-lg"
              onClick={handleStartLearning}
            >
              🚀 학습 시작하기
            </Button>
            
            {/* 하단 안내 */}
            <p className="text-center text-xs text-white/60 mt-3">
              언제든지 중단하고 이어서 학습할 수 있어요
            </p>
          </div>
        </Card>

        {/* 학습 과정 미리보기 - 개선된 버전 */}
        <Card variant="outlined" className="overflow-hidden">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">📖</span>
            학습 과정 미리보기
          </h3>
          
          {/* 학습 로드맵 */}
          <div className="relative">
            {/* 연결선 */}
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-300 via-purple-300 to-orange-300" />
            
            <div className="space-y-4">
              {/* STEP 1 */}
              <div className="relative flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-transparent rounded-xl border border-blue-100 hover:shadow-md transition-shadow">
                <div className="relative z-10 w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-md">
                  <span className="text-xl">🌏</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">STEP 1</span>
                    <span className="text-xs text-gray-400">약 15분</span>
                  </div>
                  <h4 className="font-medium text-gray-900">글로벌 서비스 이해하기</h4>
                </div>
                <span className="text-blue-400">→</span>
              </div>
              
              {/* STEP 2 */}
              <div className="relative flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-transparent rounded-xl border border-purple-100 hover:shadow-md transition-shadow">
                <div className="relative z-10 w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-md">
                  <span className="text-xl">📝</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-0.5 rounded">STEP 2</span>
                    <span className="text-xs text-gray-400">약 20분</span>
                  </div>
                  <h4 className="font-medium text-gray-900">작품 등록 마스터하기</h4>
                </div>
                <span className="text-purple-400">→</span>
              </div>
              
              {/* STEP 3 */}
              <div className="relative flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-transparent rounded-xl border border-green-100 hover:shadow-md transition-shadow">
                <div className="relative z-10 w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-white shadow-md">
                  <span className="text-xl">📦</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded">STEP 3</span>
                    <span className="text-xs text-gray-400">약 15분</span>
                  </div>
                  <h4 className="font-medium text-gray-900">주문 처리 & 운영하기</h4>
                </div>
                <span className="text-green-400">→</span>
              </div>
              
              {/* 퀴즈 */}
              <div className="relative flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200 hover:shadow-md transition-shadow">
                <div className="relative z-10 w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-xl flex items-center justify-center text-white shadow-md">
                  <span className="text-xl">🎯</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded">FINAL</span>
                    <span className="text-xs text-gray-400">약 2분</span>
                  </div>
                  <h4 className="font-medium text-gray-900">간단 퀴즈</h4>
                </div>
                <span className="text-orange-400">🏆</span>
              </div>
            </div>
          </div>
        </Card>
        
        {/* 하단 문의 안내 */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-2">도움이 필요하신가요?</p>
          <a 
            href="https://idus.channel.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-idusOrange hover:underline text-sm font-medium"
          >
            💬 채널톡으로 문의하기
          </a>
        </div>
      </div>
    </main>
  );
}

