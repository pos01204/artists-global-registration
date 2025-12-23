'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { getOnboardingData, markRegistrationClicked, isLearningCompleted } from '@/lib/storage';
import { submitOnboardingData } from '@/lib/api';
import { IconArrowRight, IconCheck } from '@/components/ui/icons';
import BrandIcon from '@/components/ui/BrandIcon';
import Modal from '@/components/ui/Modal';
import { useToast } from '@/components/ui/ToastProvider';

export default function CompletePage() {
  const router = useRouter();
  const [artistName, setArtistName] = useState('');
  const [quizScore, setQuizScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(true);
  const [openConfirm, setOpenConfirm] = useState(false);
  const { toast } = useToast();

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

  const handleRegistrationClick = () => setOpenConfirm(true);
  const proceedRegistration = () => {
    markRegistrationClicked();
    toast({ type: 'success', title: '등록 페이지로 이동합니다', description: '새 탭에서 글로벌 작가 등록을 진행해주세요.' });
    window.open('https://artist.idus.com/setting/global-artist/manage', '_blank');
    setOpenConfirm(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-idus-orange-light/20 to-white relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
        <Image
          src="/brand/brand assets/pattern02.png"
          alt=""
          fill
          className="object-cover opacity-[0.05]"
        />
      </div>
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

      <div className="max-w-2xl mx-auto px-4 py-10 sm:py-12">
        {/* Celebration */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-idus-orange-light/40 border border-idus-black-10 mb-5">
            <BrandIcon name="cheer" size={32} alt="" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-idus-black mb-3 text-balance">
            {artistName} 작가님, 여기까지 잘 왔어요
          </h1>
          <p className="text-idus-black-70 text-balance">
            이제 글로벌 작가 등록만 하면 준비가 끝나요.
          </p>
        </div>

        {/* Stats */}
        <Card variant="elevated" className="mb-8 animate-slide-up">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-2xl bg-idus-orange-light/35 border border-idus-black-10 flex items-center justify-center">
                <BrandIcon name="best" size={20} alt="" />
              </div>
              <h3 className="font-semibold text-idus-black">학습 결과</h3>
            </div>
            <div className="text-xs text-idus-black-50">완료</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="text-center p-4 bg-idus-gray rounded-xl">
              <div className="text-2xl font-bold text-idus-orange mb-1">3/3</div>
              <div className="text-xs text-idus-black-50">학습 완료</div>
            </div>
            <div className="text-center p-4 bg-idus-gray rounded-xl">
              <div className="text-2xl font-bold text-idus-orange mb-1">{quizScore}/5</div>
              <div className="text-xs text-idus-black-50">퀴즈 정답</div>
            </div>
            <div className="text-center p-4 bg-idus-gray rounded-xl">
              <div className="flex items-center justify-center mb-1">
                <IconCheck className="w-7 h-7 text-green-600" />
              </div>
              <div className="text-xs text-idus-black-50">완료</div>
            </div>
          </div>
        </Card>

        {/* Reward */}
        <Card
          variant="elevated"
          className="relative mb-8 bg-idus-orange text-white animate-slide-up animation-delay-200 overflow-hidden"
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
            <div className="flex justify-center mb-4">
              <BrandIcon name="gift" size={44} alt="" />
            </div>
            <h3 className="text-xl font-bold mb-2">보상 안내</h3>
            <p className="text-white/80 mb-4 text-balance">
              글로벌 작가 등록을 완료하면 7일 이내 포인트가 지급돼요
            </p>
            <div className="bg-white/20 rounded-xl p-4 inline-block">
              <span className="text-3xl font-bold">KR 광고포인트 10,000P</span>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <Card variant="outlined" className="mb-8 border-idus-orange animate-slide-up animation-delay-300">
          <div className="text-center">
            <h3 className="text-xl font-bold text-idus-black mb-2 text-balance">
              이제 진짜 글로벌 작가가 될 차례예요!
            </h3>
            <p className="text-idus-black-70 mb-6 text-balance">
              아래 버튼을 눌러 1분 만에 등록을 완료해요
            </p>
            <Button
              variant="primary"
              size="lg"
              className="w-full max-w-sm mx-auto"
              onClick={handleRegistrationClick}
            >
              글로벌 작가 등록하러 가기
              <IconArrowRight className="w-4 h-4" />
            </Button>
            <p className="text-xs text-idus-black-50 mt-3">
              (1분이면 끝!)
            </p>
          </div>
        </Card>

        {/* Next Steps */}
        <Card variant="outlined" className="animate-slide-up animation-delay-400">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-2xl bg-idus-gray border border-idus-black-10 flex items-center justify-center">
              <BrandIcon name="stationery" size={18} alt="" />
            </div>
            <h3 className="font-semibold text-idus-black">다음 단계</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-idus-orange text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-medium text-idus-black">글로벌 작가 등록</h4>
                <p className="text-sm text-idus-black-50">위 버튼을 눌러 등록을 완료해요</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-idus-black-20 text-idus-black-70 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-medium text-idus-black">작품 글로벌 판매 ON</h4>
                <p className="text-sm text-idus-black-50">판매할 작품의 글로벌 판매를 켜줘요</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-idus-black-20 text-idus-black-70 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-medium text-idus-black">해외 주문 받기</h4>
                <p className="text-sm text-idus-black-50">전 세계 고객에게 작품을 판매해봐요</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Appendix */}
        <Card variant="outlined" className="mt-6 animate-slide-up animation-delay-500">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-idus-orange-light/40 flex items-center justify-center">
              <BrandIcon name="like" size={26} alt="" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-idus-black">부록 · 주제별 다시보기</div>
              <div className="text-sm text-idus-black-50">
                학습이 끝난 후에도 필요한 정보를 빠르게 다시 찾아볼 수 있어요.
              </div>
            </div>
            <Link href="/learn/appendix">
              <IconArrowRight className="w-5 h-5 text-idus-orange" />
            </Link>
          </div>
        </Card>

        <Card variant="outlined" className="mt-4">
          <Link href="/faq" className="block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-idus-gray flex items-center justify-center text-2xl">
                ❓
              </div>
              <div className="flex-1">
                <div className="font-semibold text-idus-black">자주 묻는 질문</div>
                <div className="text-sm text-idus-black-50">배송/정산/운영 관련 궁금한 점을 빠르게 확인해요</div>
              </div>
              <IconArrowRight className="w-5 h-5 text-idus-orange" />
            </div>
          </Link>
        </Card>
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

      <Modal
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        title="글로벌 작가 등록 안내"
      >
        <div className="space-y-4">
          <div className="text-sm text-idus-black-70 leading-relaxed text-balance">
            등록은 <span className="font-semibold text-idus-black">작가웹 로그인</span> 후 진행됩니다.
            새 탭이 열리면 아래 경로에서 등록을 완료해주세요.
          </div>
          <div className="bg-idus-gray rounded-xl p-4 border border-idus-black-10 text-sm text-idus-black break-words">
            작가웹 로그인 → 전체메뉴 → 내 정보 → 글로벌 작가 관리
          </div>
          <div className="flex flex-col-reverse sm:flex-row gap-3">
            <Button variant="secondary" className="w-full" onClick={() => setOpenConfirm(false)}>
              취소
            </Button>
            <Button variant="primary" className="w-full" onClick={proceedRegistration}>
              등록하러 가기
              <IconArrowRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="text-xs text-idus-black-50">
            팁: 등록 완료 후에도 이 페이지는 닫지 않으셔도 됩니다.
          </div>
        </div>
      </Modal>
    </main>
  );
}

