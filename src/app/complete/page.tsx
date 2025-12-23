'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { getOnboardingData, markRegistrationClicked, isLearningCompleted } from '@/lib/storage';
import { submitOnboardingData } from '@/lib/api';

export default function CompletePage() {
  const router = useRouter();
  const [artistName, setArtistName] = useState('');
  const [quizScore, setQuizScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const data = getOnboardingData();
    if (!data) {
      router.push('/');
      return;
    }
    
    if (!isLearningCompleted()) {
      router.push('/learn');
      return;
    }
    
    setArtistName(data.artistName);
    setQuizScore(data.learningProgress.quizScore);
    
    // 학습 완료 데이터 제출
    submitOnboardingData(data).catch(console.error);
    
    // 3초 후 confetti 숨기기
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  const handleRegistrationClick = () => {
    markRegistrationClicked();
    // 실제 글로벌 작가 등록 페이지로 이동
    window.open('https://backoffice.idus.com/global/register', '_blank');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-idus-orange-light/30 to-white relative overflow-hidden">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 confetti"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ['#FF6F00', '#FFE0B2', '#E65100', '#4CAF50', '#2196F3'][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 2}s`,
                borderRadius: Math.random() > 0.5 ? '50%' : '0',
              }}
            />
          ))}
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-idus-black-10">
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
        {/* Celebration */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="text-7xl mb-6 animate-bounce-soft">🎉</div>
          <h1 className="text-3xl md:text-4xl font-bold text-idus-black mb-4">
            축하드려요, {artistName} 작가님!
          </h1>
          <p className="text-lg text-idus-black-70">
            글로벌 작가 온보딩을 완료하셨습니다!
          </p>
        </div>

        {/* Stats */}
        <Card variant="elevated" className="mb-8 animate-slide-up">
          <h3 className="font-semibold text-idus-black mb-4 flex items-center gap-2">
            📊 학습 결과
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-idus-gray rounded-xl">
              <div className="text-2xl font-bold text-idus-orange mb-1">3/3</div>
              <div className="text-xs text-idus-black-50">학습 완료</div>
            </div>
            <div className="text-center p-4 bg-idus-gray rounded-xl">
              <div className="text-2xl font-bold text-idus-orange mb-1">{quizScore}/3</div>
              <div className="text-xs text-idus-black-50">퀴즈 정답</div>
            </div>
            <div className="text-center p-4 bg-idus-gray rounded-xl">
              <div className="text-2xl font-bold text-green-500 mb-1">✓</div>
              <div className="text-xs text-idus-black-50">완료</div>
            </div>
          </div>
        </Card>

        {/* Reward */}
        <Card 
          variant="elevated" 
          className="mb-8 bg-gradient-to-r from-idus-orange to-idus-orange-dark text-white animate-slide-up animation-delay-200"
        >
          <div className="text-center">
            <div className="text-5xl mb-4">🎁</div>
            <h3 className="text-xl font-bold mb-2">보상 안내</h3>
            <p className="text-white/80 mb-4">
              글로벌 작가 등록을 완료하시면<br />
              7일 이내 아래 포인트가 지급됩니다!
            </p>
            <div className="bg-white/20 rounded-xl p-4 inline-block">
              <span className="text-3xl font-bold">KR 광고포인트 10,000P</span>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <Card variant="outlined" className="mb-8 border-idus-orange animate-slide-up animation-delay-300">
          <div className="text-center">
            <h3 className="text-xl font-bold text-idus-black mb-2">
              이제 진짜 글로벌 작가가 될 차례예요!
            </h3>
            <p className="text-idus-black-70 mb-6">
              아래 버튼을 눌러 1분 만에 등록을 완료해보세요.
            </p>
            <Button
              variant="primary"
              size="lg"
              className="w-full max-w-sm mx-auto"
              onClick={handleRegistrationClick}
            >
              ✈️ 글로벌 작가 등록하러 가기
            </Button>
            <p className="text-xs text-idus-black-50 mt-3">
              (1분이면 끝!)
            </p>
          </div>
        </Card>

        {/* Next Steps */}
        <Card variant="outlined" className="animate-slide-up animation-delay-400">
          <h3 className="font-semibold text-idus-black mb-4 flex items-center gap-2">
            📋 다음 단계
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-idus-orange text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-medium text-idus-black">글로벌 작가 등록</h4>
                <p className="text-sm text-idus-black-50">위 버튼을 눌러 등록을 완료하세요</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-idus-black-20 text-idus-black-70 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-medium text-idus-black">작품 글로벌 판매 ON</h4>
                <p className="text-sm text-idus-black-50">판매할 작품의 글로벌 판매를 활성화하세요</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-idus-black-20 text-idus-black-70 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-medium text-idus-black">해외 주문 받기</h4>
                <p className="text-sm text-idus-black-50">전 세계 고객에게 작품을 판매해보세요!</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Help */}
        <div className="text-center mt-8 text-sm text-idus-black-50">
          <p>도움이 필요하시면 언제든 문의해주세요!</p>
          <a
            href="https://idus.channel.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-idus-orange hover:underline"
          >
            💬 채널톡 문의하기
          </a>
          <span className="mx-2">|</span>
          <span>평일 오전 10시 ~ 오후 6시</span>
        </div>
      </div>

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
          <p className="text-xs text-white/40">
            © 2024 Backpackr Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

