'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getContentById, getAllContents, ContentItem } from '@/data/contents';
import { getProgress, markContentComplete } from '@/lib/storage';
import Button from '@/components/ui/Button';
import InfoGraphic from '@/components/learning/InfoGraphic';
import VideoEmbed from '@/components/learning/VideoEmbed';
import { IconArrowLeft, IconArrowRight, IconCheck, IconChevronRight } from '@/components/ui/icons';
import ExternalLinkItem from '@/components/learning/ExternalLinkItem';

export default function ContentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const contentId = params.contentId as string;
  
  const [content, setContent] = useState<ContentItem | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>({});

  const isAppendixMode = useMemo(() => searchParams.get('from') === 'appendix', [searchParams]);
  const isQuizMode = useMemo(() => searchParams.get('from') === 'quiz', [searchParams]);

  useEffect(() => {
    const contentData = getContentById(contentId);
    if (contentData) {
      setContent(contentData);
      
      // 체크리스트 초기화
      if (contentData.content.items) {
        const initialState: Record<string, boolean> = {};
        contentData.content.items.forEach(item => {
          initialState[item.id] = false;
        });
        setChecklistState(initialState);
      }
    }

    // 완료 상태 확인
    const progress = getProgress();
    if (progress.completedContents.includes(contentId)) {
      setIsCompleted(true);
    }
  }, [contentId]);

  const handleComplete = () => {
    if (isAppendixMode) return;
    markContentComplete(contentId);
    setIsCompleted(true);
  };

  const handleChecklistToggle = (itemId: string) => {
    setChecklistState(prev => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const getNextContent = (): ContentItem | null => {
    const allContents = getAllContents();
    const currentIndex = allContents.findIndex(c => c.id === contentId);
    if (currentIndex < allContents.length - 1) {
      return allContents[currentIndex + 1];
    }
    return null;
  };

  const getPrevContent = (): ContentItem | null => {
    const allContents = getAllContents();
    const currentIndex = allContents.findIndex(c => c.id === contentId);
    if (currentIndex > 0) {
      return allContents[currentIndex - 1];
    }
    return null;
  };

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">콘텐츠를 찾을 수 없습니다.</p>
          <Link href="/learn">
            <Button variant="primary">학습 목록으로</Button>
          </Link>
        </div>
      </div>
    );
  }

  const nextContent = getNextContent();
  const prevContent = getPrevContent();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href={
                isQuizMode 
                  ? '/learn/quiz' 
                  : isAppendixMode 
                    ? '/learn/appendix' 
                    : `/learn/step/${content.stepId}`
              }
              className="text-idus-black-70 hover:text-idus-orange inline-flex items-center gap-2"
            >
              <IconArrowLeft className="w-4 h-4" />
              <span className="text-sm">
                {isQuizMode 
                  ? '퀴즈로 돌아가기' 
                  : isAppendixMode 
                    ? '부록(다시보기)로 돌아가기' 
                    : `STEP ${content.stepId}로 돌아가기`}
              </span>
            </Link>
            <span className="text-sm text-gray-400">
              {content.duration}분 소요
            </span>
          </div>
        </div>
      </header>

      {/* 퀴즈 복습 모드 안내 배너 */}
      {isQuizMode && (
        <div className="bg-gradient-to-r from-idus-orange-light/30 to-idus-orange-light/10 border-b border-idus-orange/20">
          <div className="max-w-3xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-idus-orange-dark">
                <span>📖</span>
                <span className="font-medium">퀴즈 복습 모드</span>
                <span className="text-idus-black-50">- 내용을 확인 후 퀴즈로 돌아가세요</span>
              </div>
              <Link 
                href="/learn/quiz"
                className="flex-shrink-0 inline-flex items-center gap-1.5 bg-idus-orange text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-idus-orange-dark transition-colors"
              >
                퀴즈로 돌아가기
                <IconArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 메인 콘텐츠 */}
      <main className="max-w-3xl mx-auto px-4 py-6 sm:py-8">
        {/* 타이틀 */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">
              {content.type === 'video' && '🎬'}
              {content.type === 'infographic' && '📊'}
              {content.type === 'guide' && '📖'}
              {content.type === 'checklist' && <IconCheck className="w-6 h-6 text-green-600" />}
            </span>
            <span className="text-sm px-2 py-1 bg-idus-orange-light/30 text-idus-orange rounded-full">
              STEP {content.stepId}
            </span>
            {isCompleted && (
              <span className="text-sm px-2 py-1 bg-green-100 text-green-700 rounded-full">
                <span className="inline-flex items-center gap-1">
                  <IconCheck className="w-4 h-4" />
                  완료
                </span>
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-idus-black mb-2">{content.title}</h1>
          <p className="text-gray-600">{content.description}</p>
        </div>

        {/* 콘텐츠 본문 */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 mb-8">
          {/* 인포그래픽/가이드 타입 */}
          {(content.type === 'infographic' || content.type === 'guide') && content.content.sections && (
            <InfoGraphic 
              sections={content.content.sections} 
              summary={content.content.summary}
            />
          )}

          {/* 비디오 타입 */}
          {content.type === 'video' && content.content.videoUrl && (
            <div className="space-y-6">
              <VideoEmbed 
                videoUrl={content.content.videoUrl}
                title={content.title}
                thumbnail={content.content.videoThumbnail}
              />
              
              {/* 영상 요약 */}
              {content.content.summary && (
                <div className="bg-idus-gray rounded-xl p-5 border border-idus-black-10">
                  <h4 className="font-bold text-idus-black mb-3 flex items-center gap-2">
                    <span>📋</span>
                    영상 요약
                  </h4>
                  <ul className="space-y-2">
                    {content.content.summary.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-idus-black-70">
                        <span className="text-idus-orange mt-0.5">
                          <IconCheck className="w-4 h-4" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* 체크리스트 타입 */}
          {content.type === 'checklist' && (
            <div className="space-y-6">
              {content.content.sections && (
                <InfoGraphic sections={content.content.sections} />
              )}
              
              {content.content.items && (
                <div className="bg-idus-orange-light/20 rounded-xl p-5">
                  <h4 className="font-bold text-idus-black mb-4 flex items-center gap-2">
                    <IconCheck className="w-5 h-5 text-green-600" />
                    체크리스트
                  </h4>
                  <div className="space-y-3">
                    {content.content.items.map((item) => (
                      <label 
                        key={item.id}
                        className="flex items-center gap-3 p-3 bg-white rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={checklistState[item.id] || false}
                          onChange={() => handleChecklistToggle(item.id)}
                          className="w-5 h-5 rounded border-gray-300 text-idus-orange focus:ring-idus-orange"
                        />
                        <span className={checklistState[item.id] ? 'line-through text-gray-400' : 'text-gray-700'}>
                          {item.text}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 비디오 타입에서 섹션이 있는 경우 */}
          {content.type === 'video' && content.content.sections && (
            <div className="mt-6">
              <InfoGraphic 
                sections={content.content.sections} 
              />
            </div>
          )}
        </div>

        {/* 외부 링크 섹션 */}
        {content.content.externalLinks && content.content.externalLinks.length > 0 && (
          <div className="bg-idus-orange-light/20 rounded-2xl p-6 mb-8 border border-idus-black-10">
            <h3 className="font-bold text-idus-black mb-4 flex items-center gap-2">
              관련 링크
            </h3>
            <div className="grid gap-3">
              {content.content.externalLinks.map((link, index) => (
                <ExternalLinkItem key={index} link={link} variant="card" />
              ))}
            </div>
          </div>
        )}

        {/* 완료 버튼 (부록/퀴즈 복습 모드에서는 숨김) */}
        {!isAppendixMode && !isQuizMode && !isCompleted && (
          <div className="text-center mb-8">
            <Button variant="primary" size="lg" onClick={handleComplete}>
              <IconCheck className="w-5 h-5" />
              학습 완료
            </Button>
          </div>
        )}

        {/* 네비게이션 */}
        {isQuizMode ? (
          /* 퀴즈 복습 모드: 퀴즈로 돌아가기 CTA 강조 */
          <div className="pt-6 border-t border-gray-200">
            <div className="bg-gradient-to-r from-idus-orange-light/20 to-idus-orange-light/10 rounded-2xl p-5 border border-idus-orange/20">
              <div className="text-center">
                <p className="text-sm text-idus-black-70 mb-3">
                  내용을 확인하셨나요? 다시 퀴즈로 돌아가서 계속 진행해요!
                </p>
                <Link href="/learn/quiz">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    <IconArrowLeft className="w-4 h-4" />
                    퀴즈로 돌아가기
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* 일반 모드: 이전/다음 콘텐츠 네비게이션 */
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6 border-t border-gray-200">
            {prevContent ? (
              <Link href={`/learn/content/${prevContent.id}`}>
                <Button variant="outline" size="sm" className="w-full sm:w-auto justify-start">
                  <IconArrowLeft className="w-4 h-4" />
                  <span className="truncate">이전: {prevContent.title}</span>
                </Button>
              </Link>
            ) : (
              <div />
            )}
            
            {nextContent ? (
              <Link href={`/learn/content/${nextContent.id}`}>
                <Button variant="primary" size="sm" className="w-full sm:w-auto justify-between">
                  <span className="truncate">다음: {nextContent.title}</span>
                  <IconArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            ) : (
              <Link href="/learn/quiz">
                <Button variant="primary" size="sm" className="w-full sm:w-auto justify-between">
                  퀴즈 풀기
                  <IconArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

