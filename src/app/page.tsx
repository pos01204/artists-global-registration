'use client';

import Image from 'next/image';
import ArtistInfoForm from '@/components/forms/ArtistInfoForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-idus-gray">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-idus-black-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/Rebranding Design Resources/Rebranding Design Resources/01. BI/logo_without_BG.png"
              alt="idus"
              width={80}
              height={32}
              className="h-8 w-auto"
            />
            <span className="text-sm font-medium text-idus-orange">Global</span>
          </div>
          <a
            href="https://idus.channel.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-idus-black-70 hover:text-idus-orange transition-colors"
          >
            문의하기
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-idus-orange rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-idus-orange rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
          {/* Hero Content */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-idus-orange-light/50 text-idus-orange-dark px-4 py-2 rounded-full text-sm font-medium mb-6">
              🌏 전 세계 45개국 판매
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-idus-black mb-6 leading-tight">
              글로벌 작가가 되어보세요!
            </h1>
            
            <p className="text-lg md:text-xl text-idus-black-70 max-w-2xl mx-auto leading-relaxed">
              전 세계 고객에게 작품을 선보일 준비가 되셨나요?<br />
              <span className="text-idus-orange font-semibold">해외 배송비 0원</span>으로 쉽게 시작하세요!
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-12 animate-slide-up">
            <div className="bg-white rounded-2xl p-4 md:p-6 text-center shadow-sm border border-idus-black-10">
              <div className="text-2xl md:text-4xl font-bold text-idus-orange mb-1">45</div>
              <div className="text-xs md:text-sm text-idus-black-50">판매 국가</div>
            </div>
            <div className="bg-white rounded-2xl p-4 md:p-6 text-center shadow-sm border border-idus-black-10">
              <div className="text-2xl md:text-4xl font-bold text-idus-orange mb-1">32x</div>
              <div className="text-xs md:text-sm text-idus-black-50">글로벌 시장 규모</div>
            </div>
            <div className="bg-white rounded-2xl p-4 md:p-6 text-center shadow-sm border border-idus-black-10">
              <div className="text-2xl md:text-4xl font-bold text-idus-orange mb-1">2x</div>
              <div className="text-xs md:text-sm text-idus-black-50">해외 평균 주문액</div>
            </div>
          </div>

          {/* Reward Banner */}
          <div className="bg-gradient-to-r from-idus-orange to-idus-orange-dark rounded-2xl p-6 mb-12 text-white animate-slide-up animation-delay-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="text-4xl">🎁</div>
                <div>
                  <div className="font-bold text-lg">온보딩 완료 보상!</div>
                  <div className="text-white/80">학습 완료 후 글로벌 등록 시</div>
                </div>
              </div>
              <div className="bg-white/20 rounded-xl px-6 py-3">
                <span className="text-2xl font-bold">KR 광고포인트 10,000P</span>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="animate-slide-up animation-delay-300">
            <ArtistInfoForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-idus-black text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Image
              src="/brand/Rebranding Design Resources/Rebranding Design Resources/01. BI/idus_Logo_RGB_1_W.png"
              alt="idus"
              width={60}
              height={24}
              className="h-6 w-auto"
            />
            <span className="text-idus-orange text-sm">Global</span>
          </div>
          <p className="text-sm text-white/60 mb-2">
            💬 문의: idus.channel.io | 상담시간: 평일 오전 10시 ~ 오후 6시
          </p>
          <p className="text-xs text-white/40">
            © 2024 Backpackr Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

