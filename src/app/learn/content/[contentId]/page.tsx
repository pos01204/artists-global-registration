'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getContentById, getAllContents, ContentItem } from '@/data/contents';
import { getProgress, markContentComplete } from '@/lib/storage';
import Button from '@/components/ui/Button';
import InfoGraphic from '@/components/learning/InfoGraphic';
import VideoEmbed from '@/components/learning/VideoEmbed';

export default function ContentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const contentId = params.contentId as string;
  
  const [content, setContent] = useState<ContentItem | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>({});

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
            <Link href={`/learn/step/${content.stepId}`} className="text-gray-500 hover:text-idusOrange">
              ← STEP {content.stepId}로 돌아가기
            </Link>
            <span className="text-sm text-gray-400">
              {content.duration}분 소요
            </span>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* 타이틀 */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">
              {content.type === 'video' && '🎬'}
              {content.type === 'infographic' && '📊'}
              {content.type === 'guide' && '📖'}
              {content.type === 'checklist' && '✅'}
            </span>
            <span className="text-sm px-2 py-1 bg-idusOrange-10 text-idusOrange rounded-full">
              STEP {content.stepId}
            </span>
            {isCompleted && (
              <span className="text-sm px-2 py-1 bg-green-100 text-green-700 rounded-full">
                완료 ✓
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-idusBlack mb-2">{content.title}</h1>
          <p className="text-gray-600">{content.description}</p>
        </div>

        {/* 콘텐츠 본문 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
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
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <h4 className="font-bold text-idusBlack mb-3 flex items-center gap-2">
                    <span>📋</span>
                    영상 요약
                  </h4>
                  <ul className="space-y-2">
                    {content.content.summary.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <span className="text-idusOrange font-bold">✓</span>
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
                <div className="bg-idusOrange-10 rounded-xl p-5">
                  <h4 className="font-bold text-idusBlack mb-4 flex items-center gap-2">
                    <span>✅</span>
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
                          className="w-5 h-5 rounded border-gray-300 text-idusOrange focus:ring-idusOrange"
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
          <div className="bg-gradient-to-r from-idusOrange-10 to-orange-50 rounded-2xl p-6 mb-8 border border-idusOrange/20">
            <h3 className="font-bold text-idusBlack mb-4 flex items-center gap-2">
              <span>🔗</span>
              관련 링크
            </h3>
            <div className="grid gap-3">
              {content.content.externalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-md transition-all border border-gray-100 group"
                >
                  <span className="text-2xl">{link.icon || '🔗'}</span>
                  <div className="flex-1">
                    <div className="font-medium text-idusBlack group-hover:text-idusOrange transition-colors">
                      {link.title}
                    </div>
                    {link.description && (
                      <div className="text-sm text-gray-500">{link.description}</div>
                    )}
                  </div>
                  <span className="text-gray-400 group-hover:text-idusOrange transition-colors">
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* 완료 버튼 */}
        {!isCompleted && (
          <div className="text-center mb-8">
            <Button variant="primary" size="lg" onClick={handleComplete}>
              학습 완료! ✓
            </Button>
          </div>
        )}

        {/* 네비게이션 */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          {prevContent ? (
            <Link href={`/learn/content/${prevContent.id}`}>
              <Button variant="outline" size="sm">
                ← 이전: {prevContent.title}
              </Button>
            </Link>
          ) : (
            <div />
          )}
          
          {nextContent ? (
            <Link href={`/learn/content/${nextContent.id}`}>
              <Button variant="primary" size="sm">
                다음: {nextContent.title} →
              </Button>
            </Link>
          ) : (
            <Link href="/learn/quiz">
              <Button variant="primary" size="sm">
                퀴즈 풀기 →
              </Button>
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}

