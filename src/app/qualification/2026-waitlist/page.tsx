'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { getOnboardingData } from '@/lib/storage';

export default function WaitlistPage() {
  const [artistData, setArtistData] = useState<{ food: boolean; digital: boolean } | null>(null);

  useEffect(() => {
    const data = getOnboardingData();
    if (data) {
      setArtistData(data.interestedIn2026);
    }
  }, []);

  const selectedCategories = [];
  if (artistData?.food) selectedCategories.push('🍽️ 식품');
  if (artistData?.digital) selectedCategories.push('🎨 디지털 작품');

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-idus-gray">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-idus-black-10">
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

      <div className="max-w-2xl mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-8 animate-fade-in">
          <div className="text-6xl mb-6">📅</div>
          <h1 className="text-2xl md:text-3xl font-bold text-idus-black mb-4">
            2026년 확장 예정 카테고리입니다
          </h1>
          <p className="text-idus-black-70 leading-relaxed">
            선택하신 카테고리는 현재 준비 중이에요!<br />
            오픈하면 <span className="font-semibold text-idus-orange">가장 먼저</span> 연락드릴게요 😊
          </p>
        </div>

        <Card variant="elevated" className="mb-8 animate-slide-up">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-idus-black mb-4">📋 선택하신 카테고리</h3>
              <div className="flex flex-wrap gap-3">
                {selectedCategories.map((category, index) => (
                  <span
                    key={index}
                    className="bg-idus-orange-light text-idus-orange-dark px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-idus-black-10 pt-6">
              <h3 className="font-semibold text-idus-black mb-3">🗓️ 예상 일정</h3>
              <div className="bg-idus-gray rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-idus-orange rounded-full animate-pulse" />
                  <span className="text-idus-black-70">
                    <span className="font-semibold text-idus-black">2026년</span> 글로벌 확장 예정
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-idus-black-10 pt-6">
              <h3 className="font-semibold text-idus-black mb-3">✅ 등록 완료!</h3>
              <p className="text-sm text-idus-black-70">
                작가님의 정보가 대기 리스트에 등록되었습니다.<br />
                해당 카테고리가 오픈되면 입력하신 연락처로 안내드릴게요!
              </p>
            </div>
          </div>
        </Card>

        <Card variant="outlined" className="mb-8 bg-idus-orange-light/20 border-idus-orange animate-slide-up animation-delay-200">
          <div className="flex items-start gap-4">
            <div className="text-3xl">💡</div>
            <div>
              <h3 className="font-semibold text-idus-black mb-2">
                다른 카테고리 작품도 판매하고 계신가요?
              </h3>
              <p className="text-sm text-idus-black-70 mb-4">
                악세서리, 가방, 인테리어 소품 등 다른 카테고리 작품이 있다면
                지금 바로 글로벌 판매를 시작하실 수 있어요!
              </p>
              <Link href="/">
                <Button variant="primary" size="sm">
                  다른 카테고리로 시작하기
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        <div className="space-y-4 animate-slide-up animation-delay-300">
          <Link href="/">
            <Button variant="secondary" size="lg" className="w-full">
              처음으로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

