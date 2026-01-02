'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { getOnboardingData, markRegistrationClicked, isLearningCompleted } from '@/lib/storage';
import { submitOnboardingData } from '@/lib/api';
import { IconArrowRight } from '@/components/ui/icons';
import BrandIcon from '@/components/ui/BrandIcon';
import Modal from '@/components/ui/Modal';
import { useToast } from '@/components/ui/ToastProvider';
import ConfettiEffect from '@/components/ui/ConfettiEffect';
import { ChevronDown } from 'lucide-react';

export default function CompletePage() {
  const router = useRouter();
  const [artistName, setArtistName] = useState('');
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
    
    // 학습 완료 데이터 제출
    submitOnboardingData(data).then((r) => {
      if (!r.success) {
        toast({
          type: 'warning',
          title: '진행 정보 저장이 원활하지 않아요',
          description: '학습은 완료되었어요. 네트워크/설정 확인이 필요할 수 있어요.',
        });
        // eslint-disable-next-line no-console
        console.warn('[submit] complete failed:', r);
      }
    });
    
    // 3초 후 confetti 숨기기
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, [router, toast]);

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
      {/* Confetti Effect - 개선된 버전 */}
      <ConfettiEffect isActive={showConfetti} duration={3500} pieceCount={60} />

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
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-idus-orange-light/40 border border-idus-black-10 mb-5"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <BrandIcon name="cheer" size={32} alt="" />
          </motion.div>
          <motion.h1 
            className="text-2xl sm:text-3xl font-bold text-idus-black mb-3 text-balance"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {artistName} 작가님, 여기까지 잘 오셨어요
          </motion.h1>
          <motion.p 
            className="text-idus-black-70 text-balance"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            이제 글로벌 작가 등록만 하시면 준비가 끝나요.
          </motion.p>
        </motion.div>

        {/* Reward - 글로우 효과 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card
            variant="custom"
            className="relative mb-8 bg-idus-orange text-white overflow-hidden"
          >
            {/* 글로우 효과 */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer-slow" />
            
            <motion.div 
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none" 
              aria-hidden="true"
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Image
                src="/brand/brand assets/선물.png"
                alt=""
                width={140}
                height={140}
              />
            </motion.div>
            <div className="text-center relative z-10">
              <motion.div 
                className="flex justify-center mb-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Image
                    src="/brand/brand assets/선물.png"
                    alt="선물"
                    width={44}
                    height={44}
                  />
                </div>
              </motion.div>
              <h3 className="text-xl font-bold mb-2">보상 안내</h3>
              <p className="text-white/80 mb-4 text-balance">
                글로벌 작가 등록을 완료하면 익월 1일에 포인트가 지급돼요
              </p>
              <motion.div 
                className="bg-white/20 rounded-xl p-4 inline-block backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-3xl font-bold">KR 광고포인트 10,000P</span>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* 시선 유도 화살표 */}
        <motion.div 
          className="flex justify-center mb-4"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="flex flex-col items-center text-idus-orange">
            <ChevronDown className="w-6 h-6" />
            <ChevronDown className="w-6 h-6 -mt-3 opacity-60" />
            <ChevronDown className="w-6 h-6 -mt-3 opacity-30" />
          </div>
        </motion.div>

        {/* CTA - 강화된 스타일 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card variant="outlined" className="mb-8 border-idus-orange border-2 shadow-lg shadow-idus-orange/20">
            <div className="text-center">
              <h3 className="text-xl font-bold text-idus-black mb-2 text-balance">
                이제 진짜 글로벌 작가가 되실 차례예요!
              </h3>
              <p className="text-idus-black-70 mb-6 text-balance">
                아래 버튼을 눌러 1분 만에 등록을 완료해요
              </p>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full max-w-sm mx-auto relative overflow-hidden"
                  onClick={handleRegistrationClick}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    글로벌 작가 등록하러 가기
                    <IconArrowRight className="w-4 h-4" />
                  </span>
                  {/* 쉬머 효과 */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                </Button>
              </motion.div>
              <p className="text-xs text-idus-black-50 mt-3">
                (1분이면 끝!)
              </p>
            </div>
          </Card>
        </motion.div>

        {/* (의도) 완료 페이지의 목적은 "글로벌 작가 등록" CTA에 집중 */}

        {/* Appendix */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card variant="outlined" className="mt-6 group hover:border-idus-orange/50 transition-colors">
            <Link href="/learn/appendix" className="block">
              <motion.div 
                className="flex items-center gap-4"
                whileHover={{ x: 4 }}
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-idus-orange-light/40 to-idus-orange-light/20 flex items-center justify-center">
                  <BrandIcon name="like" size={26} alt="" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-idus-black">부록 · 주제별 다시보기</div>
                  <div className="text-sm text-idus-black-50">
                    학습이 끝난 후에도 필요한 정보를 빠르게 다시 찾아볼 수 있어요.
                  </div>
                </div>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <IconArrowRight className="w-5 h-5 text-idus-orange" />
                </motion.div>
              </motion.div>
            </Link>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card variant="outlined" className="mt-4 group hover:border-idus-black-30 transition-colors">
            <Link href="/faq" className="block">
              <motion.div 
                className="flex items-center gap-4"
                whileHover={{ x: 4 }}
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-idus-gray to-idus-black-10 flex items-center justify-center">
                  <BrandIcon name="like" size={26} alt="" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-idus-black">자주 묻는 질문</div>
                  <div className="text-sm text-idus-black-50">배송/정산/운영 관련 궁금한 점을 빠르게 확인해요</div>
                </div>
                <IconArrowRight className="w-5 h-5 text-idus-orange group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </Link>
          </Card>
        </motion.div>
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

