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

export default function LearnPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [artistName, setArtistName] = useState('');
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false, false]);

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

    // 학습 완료 시 완료 페이지로 이동
    if (isLearningCompleted()) {
      router.push('/complete');
    }
  }, [router]);

  const getStepStatus = (index: number) => {
    if (completedSteps[index]) return 'completed';
    
    // 이전 단계가 완료되었거나 첫 번째 단계인 경우 활성화
    if (index === 0 || completedSteps[index - 1]) return 'active';
    
    return 'locked';
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
          <h1 className="text-2xl md:text-3xl font-bold text-idus-black mb-2">
            📚 글로벌 작가 학습
          </h1>
          <p className="text-idus-black-70 mb-6">
            3단계 학습을 완료하고 글로벌 작가가 되어보세요!
          </p>
          <ProgressBar progress={progress} />
        </div>

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
                  animate-slide-up transition-all duration-300
                  ${status === 'locked' ? 'opacity-50' : ''}
                  ${status === 'completed' ? 'border-green-500 bg-green-50/50' : ''}
                  ${status === 'active' ? 'border-idus-orange' : ''}
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link 
                  href={status !== 'locked' ? `/learn/step/${step.id}` : '#'}
                  className={status === 'locked' ? 'cursor-not-allowed' : ''}
                  onClick={(e) => status === 'locked' && e.preventDefault()}
                >
                  <div className="flex items-center gap-4">
                    {/* Step Icon */}
                    <div className={`
                      w-16 h-16 rounded-2xl flex items-center justify-center text-3xl
                      ${status === 'completed' ? 'bg-green-500 text-white' : ''}
                      ${status === 'active' ? 'bg-idus-orange text-white' : ''}
                      ${status === 'locked' ? 'bg-idus-black-10 text-idus-black-50' : ''}
                    `}>
                      {status === 'completed' ? '✓' : step.icon}
                    </div>

                    {/* Step Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-idus-black-50">
                          STEP {step.id}
                        </span>
                        {status === 'completed' && (
                          <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                            완료
                          </span>
                        )}
                        {status === 'active' && (
                          <span className="text-xs bg-idus-orange text-white px-2 py-0.5 rounded-full">
                            진행 중
                          </span>
                        )}
                        {status === 'locked' && (
                          <span className="text-xs bg-idus-black-20 text-idus-black-50 px-2 py-0.5 rounded-full">
                            🔒 잠김
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-idus-black mb-1">{step.title}</h3>
                      <p className="text-sm text-idus-black-50">{step.description}</p>
                    </div>

                    {/* Duration & Arrow */}
                    <div className="text-right">
                      <div className="text-sm text-idus-black-50 mb-1">
                        약 {step.duration}분
                      </div>
                      {status !== 'locked' && (
                        <span className="text-idus-orange text-xl">→</span>
                      )}
                    </div>
                  </div>
                </Link>
              </Card>
            );
          })}
        </div>

        {/* Quiz Section */}
        <Card variant="outlined" className="mb-8 animate-slide-up animation-delay-400">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-idus-orange-light flex items-center justify-center text-3xl">
              🎯
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-idus-black-50">FINAL</span>
                {completedSteps.every(Boolean) ? (
                  <span className="text-xs bg-idus-orange text-white px-2 py-0.5 rounded-full">
                    도전 가능
                  </span>
                ) : (
                  <span className="text-xs bg-idus-black-20 text-idus-black-50 px-2 py-0.5 rounded-full">
                    🔒 잠김
                  </span>
                )}
              </div>
              <h3 className="font-bold text-idus-black mb-1">간단 퀴즈</h3>
              <p className="text-sm text-idus-black-50">배운 내용을 확인해보세요!</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-idus-black-50 mb-1">약 2분</div>
              {completedSteps.every(Boolean) && (
                <Link href="/learn/quiz">
                  <span className="text-idus-orange text-xl">→</span>
                </Link>
              )}
            </div>
          </div>
        </Card>

        {/* Reward Reminder */}
        <Card
          variant="elevated"
          className="relative bg-idus-orange text-white animate-slide-up animation-delay-500 overflow-hidden"
          style={{ backgroundColor: 'var(--idus-orange)' }}
        >
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-15 pointer-events-none" aria-hidden="true">
            <Image
              src="/brand/brand assets/선물.png"
              alt=""
              width={110}
              height={110}
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="text-4xl">🎁</div>
            <div className="flex-1">
              <h3 className="font-bold mb-1">학습 완료 보상</h3>
              <p className="text-white/80 text-sm">
                모든 학습을 완료하고 글로벌 등록 시 KR 광고포인트 10,000P!
              </p>
            </div>
          </div>
        </Card>

        {/* FAQ */}
        <Card variant="outlined" hoverable className="mt-6">
          <Link href="/faq" className="block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-idus-orange-light/40 flex items-center justify-center text-2xl">
                ❓
              </div>
              <div className="flex-1">
                <div className="font-semibold text-idus-black">자주 묻는 질문</div>
                <div className="text-sm text-idus-black-50">
                  배송/정산/문의 대응 등 궁금한 점을 바로 확인해보세요
                </div>
              </div>
              <div className="text-idus-orange text-xl">→</div>
            </div>
          </Link>
        </Card>
      </div>
    </main>
  );
}

