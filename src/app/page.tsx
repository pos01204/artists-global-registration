'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ArtistInfoForm from '@/components/forms/ArtistInfoForm';
import BrandIcon from '@/components/ui/BrandIcon';
import AnimatedStatCard from '@/components/ui/AnimatedStatCard';
import { Globe, TrendingUp, ShoppingCart } from 'lucide-react';

export default function Home() {
  const [artistCount, setArtistCount] = useState(3851);

  // 소셜 프루프 동적 증가 효과
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setArtistCount(prev => prev + 1);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-idus-orange-light/50 text-idus-orange-dark px-4 py-2 rounded-full text-sm font-medium mb-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <BrandIcon name="best" size={18} alt="" />
              전 세계 45개국 판매
            </motion.div>
            
            <motion.h1 
              className="text-3xl md:text-5xl font-bold text-idus-black mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              글로벌 작가가 되어보세요!
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-idus-black-70 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              전 세계 고객에게 작품을 선보일 준비가 되셨나요?<br />
              <span className="text-idus-orange font-semibold">해외 배송비 0원</span>으로 쉽게 시작해요!
            </motion.p>
          </motion.div>

          {/* Stats - 카운트업 애니메이션 적용 */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <AnimatedStatCard
              value={45}
              suffix="개국"
              label="판매 국가"
              icon={<Globe className="w-6 h-6 text-idus-orange" />}
              delay={100}
            />
            <AnimatedStatCard
              value={32}
              suffix="배"
              label="글로벌 시장 규모"
              icon={<TrendingUp className="w-6 h-6 text-idus-orange" />}
              delay={200}
            />
            <AnimatedStatCard
              value={2}
              suffix="배"
              label="해외 평균 주문액"
              icon={<ShoppingCart className="w-6 h-6 text-idus-orange" />}
              delay={300}
            />
          </div>

          {/* Social Proof - 동적 카운트 */}
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-5 py-3 rounded-full text-sm font-medium border border-green-200 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span>
                이미 <motion.strong 
                  key={artistCount}
                  className="font-bold"
                  initial={{ scale: 1.2, color: '#22c55e' }}
                  animate={{ scale: 1, color: '#15803d' }}
                  transition={{ duration: 0.3 }}
                >
                  {artistCount.toLocaleString()}명
                </motion.strong>의 작가님이 글로벌 판매를 시작했어요
              </span>
            </div>
          </motion.div>

          {/* Reward Banner - 플로팅 효과 */}
          <motion.div 
            className="relative bg-gradient-to-r from-idus-orange to-idus-orange-dark rounded-2xl p-6 mb-12 text-white overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.01 }}
          >
            <motion.div 
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none" 
              aria-hidden="true"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Image
                src="/brand/brand assets/선물.png"
                alt=""
                width={120}
                height={120}
              />
            </motion.div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-4">
                <motion.div 
                  className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <BrandIcon name="gift" size={36} alt="" />
                </motion.div>
                <div>
                  <div className="font-bold text-lg">온보딩 완료 보상!</div>
                  <div className="text-white/80">학습 완료 후 글로벌 등록 시</div>
                </div>
              </div>
              <motion.div 
                className="bg-white/20 rounded-xl px-6 py-3 backdrop-blur-sm border border-white/10"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-2xl font-bold">KR 광고포인트 10,000P</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <ArtistInfoForm />
          </motion.div>
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

