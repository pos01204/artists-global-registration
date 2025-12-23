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
    setViewedContents(prev => {
      const newSet = new Set(Array.from(prev));
      newSet.add(contentId);
      return newSet;
    });
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
        <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  const stepProgress = Math.round(((currentContentIndex + 1) / contents.length) * 100);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <Link href="/learn" className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors">
              <span>←</span>
              <span className="text-sm">학습 목록</span>
            </Link>
            <span className="text-sm text-gray-400">
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
            <span className="text-sm font-medium text-orange-500">STEP {step.id}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{step.title}</h1>
        </div>

        {/* Content Card */}
        <Card variant="elevated" className="mb-8 animate-slide-up">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-gray-400">약 {currentContent.duration}분</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">{currentContent.title}</h2>
            <p className="text-gray-600">{currentContent.description}</p>
          </div>

          {/* Content Body */}
          <div className="space-y-6">
            {/* Video Content - 실제 영상 임베딩 */}
            {currentContent.type === 'video' && currentContent.content.videoUrl && (
              <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src={currentContent.content.videoUrl.includes('embed') 
                    ? currentContent.content.videoUrl 
                    : currentContent.content.videoUrl.replace('youtu.be/', 'www.youtube.com/embed/').replace('watch?v=', 'embed/') + '?rel=0'}
                  title={currentContent.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            )}

            {/* Sections Content */}
            {currentContent.content.sections?.map((section, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl ${
                  section.highlight 
                    ? 'bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-500' 
                    : 'bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  {section.icon && (
                    <span className="text-2xl flex-shrink-0">
                      {section.icon}
                    </span>
                  )}
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-2 ${section.highlight ? 'text-orange-600' : 'text-gray-900'}`}>
                      {section.title}
                    </h3>
                    <p className="text-gray-600 text-sm whitespace-pre-line leading-relaxed">
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
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-2 border-gray-300 checked:bg-orange-500 checked:border-orange-500 accent-orange-500"
                    />
                    <span className="text-gray-800">{item.text}</span>
                  </label>
                ))}
              </div>
            )}

            {/* Summary */}
            {currentContent.content.summary && (
              <div className="bg-amber-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  💡 핵심 포인트
                </h4>
                <ul className="space-y-2">
                  {currentContent.content.summary.map((point, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* External Links */}
            {currentContent.content.externalLinks && currentContent.content.externalLinks.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  🔗 관련 링크
                </h4>
                <div className="space-y-2">
                  {currentContent.content.externalLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-orange-50 transition-colors group border border-gray-100"
                    >
                      <span className="text-xl">{link.icon || '🔗'}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors truncate">
                          {link.title}
                        </div>
                        {link.description && (
                          <div className="text-xs text-gray-400 truncate">{link.description}</div>
                        )}
                      </div>
                      <span className="text-gray-300 group-hover:text-orange-500 transition-colors">→</span>
                    </a>
                  ))}
                </div>
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
