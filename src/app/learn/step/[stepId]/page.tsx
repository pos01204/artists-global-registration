'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import { LEARNING_STEPS } from '@/types/onboarding';
import { getContentsByStep, ContentItem } from '@/data/contents';
import { getOnboardingData, markStepCompleted, calculateProgress } from '@/lib/storage';
import { submitOnboardingData } from '@/lib/api';
import ResponsiveTable from '@/components/learning/ResponsiveTable';
import { IconArrowLeft, IconArrowRight, IconChevronRight } from '@/components/ui/icons';
import BrandIcon, { BrandIconName } from '@/components/ui/BrandIcon';
import SectionIcon from '@/components/learning/SectionIcon';
import { Lightbulb, Link as LinkIcon } from 'lucide-react';
import ExternalLinkItem from '@/components/learning/ExternalLinkItem';
import SectionMeta from '@/components/learning/SectionMeta';
import Accordion from '@/components/ui/Accordion';

export default function StepPage() {
  const router = useRouter();
  const params = useParams();
  const stepId = Number(params.stepId);
  
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [viewedContents, setViewedContents] = useState<Set<string>>(new Set());
  const [progress, setProgress] = useState(0);
  const [openExtra, setOpenExtra] = useState<string[]>([]);
  
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

  useEffect(() => {
    // 콘텐츠가 바뀔 때 접힌 영역 상태를 초기화해서 “내용이 많아 보이는” 피로감을 줄임
    setOpenExtra([]);
  }, [stepId, currentContentIndex]);

  const handleContentView = (contentId: string) => {
    setViewedContents(prev => {
      const newSet = new Set(Array.from(prev));
      newSet.add(contentId);
      return newSet;
    });
  };

  const handleNext = async () => {
    handleContentView(currentContent.id);
    
    if (currentContentIndex < contents.length - 1) {
      setCurrentContentIndex(prev => prev + 1);
    } else {
      // 모든 콘텐츠 완료
      markStepCompleted(stepId);
      
      // 구글 시트에 진행 상황 전송
      const data = getOnboardingData();
      if (data) {
        await submitOnboardingData(data);
      }
      
      router.push('/learn');
    }
  };

  const handlePrev = () => {
    if (currentContentIndex > 0) {
      setCurrentContentIndex(prev => prev - 1);
    }
  };

  const getStepBrandIconName = (id: number): BrandIconName => {
    if (id === 1) return 'best';
    if (id === 2) return 'stationery';
    return 'shipping';
  };

  const stepProgress = Math.round(((currentContentIndex + 1) / Math.max(contents.length, 1)) * 100);

  const { primarySections, extraSections } = useMemo(() => {
    const sections = currentContent?.content.sections ?? [];
    const MAX_PRIMARY = 3;

    const isSecondaryByTitle = (title?: string) => {
      if (!title) return false;
      const t = title.trim();
      return /^(TIP:|TIP\b|안내\b|참고\b|추가\b)/.test(t);
    };

    const secondaryIdx: number[] = [];
    const primaryCandidateIdx: number[] = [];

    sections.forEach((s, i) => {
      if (s.importance === 'secondary' || isSecondaryByTitle(s.title)) secondaryIdx.push(i);
      else primaryCandidateIdx.push(i);
    });

    // 핵심 카드 구성: highlight 우선, 그 다음 나머지(최대 3개)
    const picked = new Set<number>();
    for (const i of primaryCandidateIdx) {
      if (picked.size >= MAX_PRIMARY) break;
      if (sections[i]?.highlight) picked.add(i);
    }
    for (const i of primaryCandidateIdx) {
      if (picked.size >= MAX_PRIMARY) break;
      if (!picked.has(i)) picked.add(i);
    }

    const primarySections = sections.filter((_, i) => picked.has(i));
    // secondary는 무조건 extra로 강제 + primary에 포함되지 않은 섹션도 extra로 보관
    const finalExtraSections = sections.filter((_, i) => (!picked.has(i)) || secondaryIdx.includes(i));

    return { primarySections, extraSections: finalExtraSections };
  }, [currentContent]);

  const externalLinks = useMemo(() => {
    const links = currentContent?.content.externalLinks ?? [];
    const seen = new Set<string>();
    return links.filter(link => {
      const key = `${link.url}|${link.title ?? ''}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [currentContent]);

  const isLoading = !step || contents.length === 0 || !currentContent;
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-idus-orange border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-idus-gray">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-idus-black-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <Link href="/learn" className="flex items-center gap-2 text-idus-black-70 hover:text-idus-orange transition-colors">
              <IconArrowLeft className="w-4 h-4" />
              <span className="text-sm">학습 목록</span>
            </Link>
            <span className="text-sm text-idus-black-50">
              {currentContentIndex + 1} / {contents.length}
            </span>
          </div>
          <ProgressBar progress={stepProgress} showLabel={false} size="sm" />
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 pb-28 sm:pb-8">
        {/* Step Title */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-idus-orange-light/30 flex items-center justify-center">
              <BrandIcon name={getStepBrandIconName(step.id)} size={26} alt="" />
            </div>
            <span className="text-sm font-medium text-idus-orange">STEP {step.id}</span>
          </div>
          <h1 className="text-2xl font-bold text-idus-black">{step.title}</h1>
        </div>

        {/* Content Card */}
        <Card variant="elevated" className="mb-8 animate-slide-up">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-idus-black-50">약 {currentContent.duration}분</span>
            </div>
            <h2 className="text-xl font-bold text-idus-black mb-2">{currentContent.title}</h2>
            <p className="text-idus-black-70">{currentContent.description}</p>
          </div>

          {/* Content Body */}
          <div className="space-y-6">
            {/* Video Content - 실제 영상 임베딩 */}
            {currentContent.type === 'video' && currentContent.content.videoUrl && (
              <div className="aspect-video bg-idus-black-10 rounded-xl overflow-hidden shadow-lg">
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

            {/* Sections Content (핵심 먼저, 나머지 접기) */}
            {primarySections.map((section, index) => (
              <div
                key={`primary-${index}`}
                className={`p-4 rounded-xl ${
                  section.highlight 
                    ? 'bg-idus-orange-light/20 border-l-4 border-idus-orange' 
                    : 'bg-idus-gray'
                }`}
              >
                <div className="flex items-start gap-3">
                  {section.icon && (
                    <div className="flex-shrink-0">
                      <SectionIcon icon={section.icon} size="md" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-2 ${section.highlight ? 'text-idus-orange' : 'text-idus-black'}`}>
                      {section.title}
                    </h3>
                    {section.table ? (
                      <ResponsiveTable columns={section.table.columns} rows={section.table.rows} className="mt-2" />
                    ) : (
                      <p className="text-idus-black-70 text-sm whitespace-pre-line leading-relaxed">
                        {section.content}
                      </p>
                    )}
                    {section.meta && section.meta.length > 0 ? (
                      <SectionMeta items={section.meta} />
                    ) : null}
                  </div>
                </div>
              </div>
            ))}

            {extraSections.length > 0 ? (
              <div className="bg-idus-gray rounded-xl p-2 border border-idus-black-10">
                <Accordion
                  items={[
                    {
                      id: 'extra',
                      header: (
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-xl bg-white border border-idus-black-10 flex items-center justify-center">
                            <BrandIcon name="like" size={18} alt="" />
                          </div>
                          <div className="font-semibold text-idus-black">추가 정보</div>
                          <div className="text-xs text-idus-black-50">({extraSections.length}개)</div>
                        </div>
                      ),
                      content: (
                        <div className="space-y-3">
                          {extraSections.map((section, idx) => (
                            <div key={idx} className="p-4 rounded-xl bg-white border border-idus-black-10">
                              <div className="flex items-start gap-3">
                                {section.icon ? (
                                  <div className="flex-shrink-0">
                                    <SectionIcon icon={section.icon} size="md" />
                                  </div>
                                ) : null}
                                <div className="flex-1">
                                  <div className="font-semibold text-idus-black mb-2">{section.title}</div>
                                  {section.table ? (
                                    <ResponsiveTable columns={section.table.columns} rows={section.table.rows} className="mt-2" />
                                  ) : (
                                    <div className="text-sm text-idus-black-70 whitespace-pre-line leading-relaxed">
                                      {section.content}
                                    </div>
                                  )}
                                  {section.meta && section.meta.length > 0 ? (
                                    <SectionMeta items={section.meta} />
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ),
                    },
                  ]}
                  openIds={openExtra}
                  onToggle={(id) =>
                    setOpenExtra(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]))
                  }
                />
              </div>
            ) : null}

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
                      className="w-5 h-5 rounded border-2 border-idus-black-20 checked:bg-idus-orange checked:border-idus-orange accent-[var(--idus-orange)]"
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
                  <Lightbulb className="w-5 h-5 text-idus-orange" />
                  핵심 포인트
                </h4>
                <ul className="space-y-2">
                  {currentContent.content.summary.map((point, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-idus-black-70">
                      <span className="w-1.5 h-1.5 bg-idus-orange rounded-full flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* External Links */}
            {externalLinks.length > 0 && (
              <div className="bg-idus-gray rounded-xl p-4">
                <h4 className="font-semibold text-idus-black mb-3 flex items-center gap-2">
                  <LinkIcon className="w-5 h-5 text-idus-orange" />
                  관련 링크
                </h4>
                <div className="space-y-2">
                  {externalLinks.map((link, index) => (
                    <ExternalLinkItem key={index} link={link} variant="row" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Navigation */}
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur border-t border-idus-black-10">
          <div className="max-w-4xl mx-auto px-4 py-3 pb-[calc(env(safe-area-inset-bottom)+12px)]">
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                onClick={handlePrev}
                disabled={currentContentIndex === 0}
                className="w-[44%]"
              >
                <IconArrowLeft className="w-4 h-4" />
                이전
              </Button>
              <Button
                variant="primary"
                onClick={handleNext}
                className="flex-1"
              >
                {currentContentIndex < contents.length - 1 ? (
                  <>
                    다음
                    <IconArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  '완료'
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center justify-between gap-4">
          <Button variant="secondary" onClick={handlePrev} disabled={currentContentIndex === 0}>
            <IconArrowLeft className="w-4 h-4" />
            이전
          </Button>
          <Button variant="primary" onClick={handleNext} className="flex-1 max-w-xs">
            {currentContentIndex < contents.length - 1 ? (
              <>
                다음
                <IconArrowRight className="w-4 h-4" />
              </>
            ) : (
              '완료'
            )}
          </Button>
        </div>
      </div>
    </main>
  );
}
