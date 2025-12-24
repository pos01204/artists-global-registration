'use client';

import Image from 'next/image';
import ArtistInfoForm from '@/components/forms/ArtistInfoForm';
import BrandIcon from '@/components/ui/BrandIcon';

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
            href="/faq"
            className="text-sm text-idus-black-70 hover:text-idus-orange transition-colors"
          >
            자주 묻는 질문
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <Image
            src="/brand/brand assets/pattern01.png"
            alt=""
            fill
            className="object-cover opacity-[0.06]"
            priority={false}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 md:py-20">
          {/* Hero Content */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-idus-orange-light/50 text-idus-orange-dark px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BrandIcon name="best" size={18} alt="" />
              전 세계 45개국 판매
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-idus-black mb-6 leading-tight">
              글로벌 작가가 되어보세요!
            </h1>
            
            <p className="text-lg md:text-xl text-idus-black-70 max-w-2xl mx-auto leading-relaxed">
              전 세계 고객에게 작품을 선보일 준비가 되셨나요?<br />
              <span className="text-idus-orange font-semibold">해외 배송비 0원</span>으로 쉽게 시작해요!
            </p>
          </div>

          {/* Stats - 강화된 카드 */}
          <div className="grid grid-cols-3 gap-4 mb-12 animate-slide-up">
            <div className="bg-white rounded-2xl p-4 md:p-6 text-center shadow-sm border border-idus-black-10 card-interactive stagger-in stagger-delay-1">
              <div className="text-2xl md:text-4xl font-bold text-idus-orange mb-1 count-up">45</div>
              <div className="text-xs md:text-sm text-idus-black-50">판매 국가</div>
            </div>
            <div className="bg-white rounded-2xl p-4 md:p-6 text-center shadow-sm border border-idus-black-10 card-interactive stagger-in stagger-delay-2">
              <div className="text-2xl md:text-4xl font-bold text-idus-orange mb-1 count-up">32x</div>
              <div className="text-xs md:text-sm text-idus-black-50">글로벌 시장 규모</div>
            </div>
            <div className="bg-white rounded-2xl p-4 md:p-6 text-center shadow-sm border border-idus-black-10 card-interactive stagger-in stagger-delay-3">
              <div className="text-2xl md:text-4xl font-bold text-idus-orange mb-1 count-up">2x</div>
              <div className="text-xs md:text-sm text-idus-black-50">해외 평균 주문액</div>
            </div>
          </div>

          {/* Reward Banner - 강화된 스타일 */}
          <div className="relative bg-gradient-to-r from-idus-orange to-idus-orange-dark rounded-2xl p-6 mb-12 text-white animate-slide-up animation-delay-200 overflow-hidden glow-orange">
            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-15 pointer-events-none celebrate-shake" aria-hidden="true">
              <Image
                src="/brand/brand assets/선물.png"
                alt=""
                width={120}
                height={120}
              />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                  <BrandIcon name="gift" size={36} alt="" />
                </div>
                <div>
                  <div className="font-bold text-lg">온보딩 완료 보상!</div>
                  <div className="text-white/80">학습 완료 후 글로벌 등록 시</div>
                </div>
              </div>
              <div className="bg-white/20 rounded-xl px-6 py-3 backdrop-blur-sm border border-white/10">
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
            궁금한 점은 FAQ에서 먼저 확인해요
          </p>
          <p className="text-xs text-white/40">
            © 2024 Backpackr Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

