'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import { LEARNING_STEPS } from '@/types/onboarding';
import { getOnboardingData, calculateProgress, isLearningCompleted } from '@/lib/storage';
import { IconChevronRight, IconLock, IconArrowRight, IconCheck } from '@/components/ui/icons';
import BrandIcon, { BrandIconName } from '@/components/ui/BrandIcon';

export default function LearnPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [artistName, setArtistName] = useState('');
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false, false]);
  const [completedAll, setCompletedAll] = useState(false);

  useEffect(() => {
    const data = getOnboardingData();
    if (!data) {
      router.push('/');
      return;
    }
    
    setArtistName(data.artistName);
    setProgress(calculateProgress());
    setCompletedSteps([
      data.learningProgress.step1Completed,
      data.learningProgress.step2Completed,
      data.learningProgress.step3Completed,
    ]);
    setCompletedAll(isLearningCompleted());
  }, [router]);

  const getStepStatus = (index: number) => {
    if (completedSteps[index]) return 'completed';
    
    // 이전 단계가 완료되었거나 첫 번째 단계인 경우 활성화
    if (index === 0 || completedSteps[index - 1]) return 'active';
    
    return 'locked';
  };

  const getStepBrandIconName = (stepId: number): BrandIconName => {
    if (stepId === 1) return 'best';
    if (stepId === 2) return 'stationery';
    return 'shipping';
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-idus-gray">
      {/* Subtle pattern */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
        <Image
          src="/brand/brand assets/pattern02.png"
          alt=""
          fill
          className="object-cover opacity-[0.05]"
        />
      </div>
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
          <div className="text-sm text-idus-black-70">
            <span className="font-medium text-idus-black">{artistName}</span> 작가님
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Welcome & Progress */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-idus-orange-light/50 to-idus-orange-light/20 flex items-center justify-center border border-idus-orange/10">
              <BrandIcon name="best" size={24} alt="" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-idus-black">
              글로벌 작가 학습
            </h1>
          </div>
          <p className="text-idus-black-70 mb-6">
            3단계 학습을 완료하고 글로벌 작가가 되어보세요!
          </p>
          <ProgressBar progress={progress} />
        </div>

        {completedAll ? (
          <Card variant="elevated" className="mb-6 border border-idus-orange/30">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-idus-orange text-white flex items-center justify-center">
                  <BrandIcon name="cheer" size={28} alt="" />
                </div>
                <div>
                  <div className="font-bold text-idus-black">학습을 완료하셨어요</div>
                  <div className="text-sm text-idus-black-50">필요하면 주제별 부록에서 원하는 정보를 다시 찾아볼 수 있어요.</div>
                </div>
              </div>
              <div className="sm:ml-auto flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <Link href="/learn/appendix" className="w-full sm:w-auto">
                  <Button variant="secondary" className="w-full">부록(다시보기)</Button>
                </Link>
                <Link href="/complete" className="w-full sm:w-auto">
                  <Button variant="primary" className="w-full">
                    완료 페이지
                    <IconArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ) : null}

        {/* Learning Steps */}
        <div className="space-y-4 mb-8">
          {LEARNING_STEPS.map((step, index) => {
            const status = getStepStatus(index);
            
            return (
              <Card
                key={step.id}
                variant={status === 'active' ? 'elevated' : 'outlined'}
                hoverable={status !== 'locked'}
                className={`
                  animate-slide-up transition-all duration-300 group
                  ${status === 'locked' ? 'opacity-50' : 'card-interactive'}
                  ${status === 'completed' ? 'border-green-500 bg-gradient-to-r from-green-50/50 to-white' : ''}
                  ${status === 'active' ? 'border-idus-orange glow-orange' : ''}
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link 
                  href={status !== 'locked' ? `/learn/step/${step.id}` : '#'}
                  className={status === 'locked' ? 'cursor-not-allowed' : 'focus-ring rounded-xl block'}
                  onClick={(e) => status === 'locked' && e.preventDefault()}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Step Icon */}
                    <div className={`
                      w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl transition-transform duration-300
                      ${status === 'completed' ? 'bg-gradient-to-br from-green-500 to-green-600 text-white' : ''}
                      ${status === 'active' ? 'bg-gradient-to-br from-idus-orange to-idus-orange-dark text-white group-hover:scale-105' : ''}
                      ${status === 'locked' ? 'bg-idus-black-10 text-idus-black-50' : ''}
                    `}>
                      {status === 'completed' ? (
                        <IconCheck className="w-7 h-7 text-white check-bounce" />
                      ) : (
                        <BrandIcon
                          name={getStepBrandIconName(step.id)}
                          size={status === 'locked' ? 26 : 30}
                          alt=""
                        />
                      )}
                    </div>

                    {/* Step Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-idus-black-50">
                          STEP {step.id}
                        </span>
                        {status === 'active' && (
                          <span className="text-xs bg-idus-orange text-white px-2 py-0.5 rounded-full badge-shine">
                            진행 중
                          </span>
                        )}
                        {status === 'locked' && (
                          <span className="text-xs bg-idus-black-20 text-idus-black-50 px-2 py-0.5 rounded-full">
                            <span className="inline-flex items-center gap-1">
                              <IconLock className="w-3.5 h-3.5" />
                              잠김
                            </span>
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-idus-black mb-1">{step.title}</h3>
                      <p className="text-sm text-idus-black-50 line-clamp-2">{step.description}</p>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center justify-end">
                      {status !== 'locked' && (
                        <IconChevronRight className="w-5 h-5 text-idus-orange link-arrow" />
                      )}
                    </div>
                  </div>
                </Link>
              </Card>
            );
          })}
        </div>

        {/* Quiz Section */}
        <Card 
          variant="outlined" 
          hoverable={completedSteps.every(Boolean)}
          className={`mb-8 animate-slide-up animation-delay-400 ${
            completedSteps.every(Boolean) ? 'card-interactive' : 'opacity-50'
          }`}
        >
          {completedSteps.every(Boolean) ? (
            <Link href="/learn/quiz" className="block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-idus-orange-light flex items-center justify-center text-2xl sm:text-3xl">
                  <BrandIcon name="camera" size={28} alt="" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-idus-black-50">FINAL</span>
                    <span className="text-xs bg-idus-orange text-white px-2 py-0.5 rounded-full badge-shine">
                      도전 가능
                    </span>
                  </div>
                  <h3 className="font-bold text-idus-black mb-1">간단 퀴즈</h3>
                  <p className="text-sm text-idus-black-50">배운 내용을 간단히 확인해요!</p>
                </div>
                <IconChevronRight className="w-5 h-5 text-idus-orange link-arrow" />
              </div>
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-idus-black-10 flex items-center justify-center text-2xl sm:text-3xl">
                <BrandIcon name="camera" size={28} alt="" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-idus-black-50">FINAL</span>
                  <span className="text-xs bg-idus-black-20 text-idus-black-50 px-2 py-0.5 rounded-full">
                    <span className="inline-flex items-center gap-1">
                      <IconLock className="w-3.5 h-3.5" />
                      잠김
                    </span>
                  </span>
                </div>
                <h3 className="font-bold text-idus-black mb-1">간단 퀴즈</h3>
                <p className="text-sm text-idus-black-50">배운 내용을 간단히 확인해요!</p>
              </div>
            </div>
          )}
        </Card>

        {/* Reward Reminder */}
        <Card
          variant="elevated"
          className="relative text-white animate-slide-up animation-delay-500 overflow-hidden bg-gradient-to-r from-idus-orange to-idus-orange-dark"
        >
          {/* 쉬머 효과 */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer-slow" />
          
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-15 pointer-events-none" aria-hidden="true">
            <Image
              src="/brand/brand assets/선물.png"
              alt=""
              width={110}
              height={110}
            />
          </div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <BrandIcon name="gift" size={32} alt="" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold mb-1">학습 완료 보상</h3>
              <p className="text-white/80 text-sm">
                모든 학습을 완료하고 글로벌 등록 시 KR 광고포인트 10,000P!
              </p>
            </div>
          </div>
        </Card>

        {/* FAQ - 강조 스타일 */}
        <Card 
          variant="outlined" 
          hoverable 
          className="mt-6 bg-gradient-to-r from-blue-50 to-white border-blue-200 card-interactive"
        >
          <Link href="/faq" className="block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 border border-blue-200 flex items-center justify-center">
                <BrandIcon name="like" size={26} alt="" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-idus-black">자주 묻는 질문</div>
                <div className="text-sm text-idus-black-50">
                  배송/정산/문의 대응 등 궁금한 점을 바로 확인해요
                </div>
              </div>
              <IconChevronRight className="w-5 h-5 text-blue-500" />
            </div>
          </Link>
        </Card>
      </div>
    </main>
  );
}

