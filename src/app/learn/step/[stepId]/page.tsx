'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import { LEARNING_STEPS } from '@/types/onboarding';
import { getContentsByStep, ContentItem } from '@/data/contents';
import { getOnboardingData, markStepCompleted, calculateProgress } from '@/lib/storage';

export default function StepPage() {
  const router = useRouter();
  const params = useParams();
  const stepId = Number(params.stepId);
  
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [viewedContents, setViewedContents] = useState<Set<string>>(new Set());
  const [progress, setProgress] = useState(0);
  
  const step = LEARNING_STEPS.find(s => s.id === stepId);
  const currentContent = contents[currentContentIndex];

  useEffect(() => {
    const data = getOnboardingData();
    if (!data) {
      router.push('/');
      return;
    }
    
    setContents(getContentsByStep(stepId));
    setProgress(calculateProgress());
  }, [stepId, router]);

  const handleContentView = (contentId: string) => {
    setViewedContents(prev => new Set([...prev, contentId]));
  };

  const handleNext = () => {
    handleContentView(currentContent.id);
    
    if (currentContentIndex < contents.length - 1) {
      setCurrentContentIndex(prev => prev + 1);
    } else {
      // 모든 콘텐츠 완료
      markStepCompleted(stepId);
      router.push('/learn');
    }
  };

  const handlePrev = () => {
    if (currentContentIndex > 0) {
      setCurrentContentIndex(prev => prev - 1);
    }
  };

  if (!step || contents.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-idus-orange border-t-transparent rounded-full" />
      </div>
    );
  }

  const stepProgress = Math.round(((currentContentIndex + 1) / contents.length) * 100);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-idus-gray">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-idus-black-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <Link href="/learn" className="flex items-center gap-2 text-idus-black-70 hover:text-idus-orange transition-colors">
              <span>←</span>
              <span className="text-sm">학습 목록</span>
            </Link>
            <span className="text-sm text-idus-black-50">
              {currentContentIndex + 1} / {contents.length}
            </span>
          </div>
          <ProgressBar progress={stepProgress} showLabel={false} size="sm" />
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Step Title */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{step.icon}</span>
            <span className="text-sm font-medium text-idus-orange">STEP {step.id}</span>
          </div>
          <h1 className="text-2xl font-bold text-idus-black">{step.title}</h1>
        </div>

        {/* Content Card */}
        <Card variant="elevated" className="mb-8 animate-slide-up">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs bg-idus-orange-light text-idus-orange-dark px-2 py-1 rounded-full">
                {currentContent.type === 'video' ? '📹 영상' : 
                 currentContent.type === 'guide' ? '📖 가이드' :
                 currentContent.type === 'checklist' ? '✅ 체크리스트' : '📊 인포그래픽'}
              </span>
              <span className="text-xs text-idus-black-50">약 {currentContent.duration}분</span>
            </div>
            <h2 className="text-xl font-bold text-idus-black mb-2">{currentContent.title}</h2>
            <p className="text-idus-black-70">{currentContent.description}</p>
          </div>

          {/* Content Body */}
          <div className="space-y-6">
            {/* Video Content */}
            {currentContent.type === 'video' && currentContent.content.videoUrl && (
              <div className="aspect-video bg-idus-black-10 rounded-xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-idus-black-10 to-idus-black-20">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-idus-orange rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-3xl ml-1">▶</span>
                    </div>
                    <p className="text-idus-black-70">영상을 시청해주세요</p>
                    <a
                      href="https://www.youtube.com/@idus_official"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-idus-orange hover:underline text-sm mt-2 inline-block"
                    >
                      YouTube에서 보기 →
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Sections Content */}
            {currentContent.content.sections?.map((section, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl ${
                  section.highlight 
                    ? 'bg-idus-orange-light/30 border-2 border-idus-orange' 
                    : 'bg-idus-gray'
                }`}
              >
                <div className="flex items-start gap-3">
                  {section.icon && (
                    <span className="text-2xl flex-shrink-0">{section.icon}</span>
                  )}
                  <div>
                    <h3 className="font-semibold text-idus-black mb-2">{section.title}</h3>
                    <p className="text-idus-black-70 text-sm whitespace-pre-line leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Checklist Content */}
            {currentContent.content.items && (
              <div className="space-y-3">
                {currentContent.content.items.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-3 p-3 bg-idus-gray rounded-xl cursor-pointer hover:bg-idus-black-10 transition-colors"
                  >
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-2 border-idus-black-20 checked:bg-idus-orange checked:border-idus-orange"
                    />
                    <span className="text-idus-black">{item.text}</span>
                  </label>
                ))}
              </div>
            )}

            {/* Summary */}
            {currentContent.content.summary && (
              <div className="bg-idus-orange-light/20 rounded-xl p-4">
                <h4 className="font-semibold text-idus-black mb-3 flex items-center gap-2">
                  💡 핵심 포인트
                </h4>
                <ul className="space-y-2">
                  {currentContent.content.summary.map((point, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-idus-black-70">
                      <span className="w-1.5 h-1.5 bg-idus-orange rounded-full" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="secondary"
            onClick={handlePrev}
            disabled={currentContentIndex === 0}
          >
            ← 이전
          </Button>
          
          <Button
            variant="primary"
            onClick={handleNext}
            className="flex-1 max-w-xs"
          >
            {currentContentIndex < contents.length - 1 ? '다음 →' : '완료! 🎉'}
          </Button>
        </div>
      </div>
    </main>
  );
}

