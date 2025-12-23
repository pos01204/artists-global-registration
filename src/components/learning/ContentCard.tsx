'use client';

import React from 'react';
import Link from 'next/link';
import { ContentItem } from '@/data/contents';
import { IconArrowRight, IconCheck, IconLock } from '@/components/ui/icons';

interface ContentCardProps {
  content: ContentItem;
  isCompleted: boolean;
  isLocked?: boolean;
}

export default function ContentCard({ content, isCompleted, isLocked = false }: ContentCardProps) {
  const typeLabels = {
    infographic: '핵심 요약',
    video: '영상',
    guide: '가이드',
    checklist: '체크리스트',
  };

  const CardContent = () => (
    <div
      className={`p-4 sm:p-5 rounded-xl border transition-all ${
        isLocked
          ? 'bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed'
          : isCompleted
          ? 'bg-green-50 border-green-200 hover:border-green-300'
          : 'bg-white border-gray-200 hover:border-idus-orange hover:shadow-md cursor-pointer'
      }`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* 아이콘 */}
        <div
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${
            isCompleted ? 'bg-green-100' : 'bg-idus-orange-light/30'
          }`}
        >
          {isCompleted ? <IconCheck className="w-6 h-6 text-green-700" /> : (
            <span className="text-2xl" aria-hidden="true">
              {content.type === 'video' ? '🎬' : content.type === 'guide' ? '📖' : '📌'}
            </span>
          )}
        </div>

        {/* 내용 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                isCompleted
                  ? 'bg-green-100 text-green-700'
                  : 'bg-idus-orange-light/30 text-idus-orange'
              }`}
            >
              {typeLabels[content.type]}
            </span>
            <span className="text-xs text-gray-400">
              {content.duration}분
            </span>
          </div>
          <h4 className="font-bold text-idus-black mb-1">{content.title}</h4>
          <p className="text-sm text-gray-500 line-clamp-2">{content.description}</p>
        </div>

        {/* 화살표 */}
        {!isLocked && (
          <div className={`mt-1 ${isCompleted ? 'text-green-600' : 'text-idus-black-20'}`}>
            {isCompleted ? <IconCheck className="w-5 h-5" /> : <IconArrowRight className="w-5 h-5" />}
          </div>
        )}
        {isLocked && (
          <div className="mt-1 text-idus-black-20">
            <IconLock className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );

  if (isLocked) {
    return <CardContent />;
  }

  return (
    <Link href={`/learn/content/${content.id}`}>
      <CardContent />
    </Link>
  );
}

