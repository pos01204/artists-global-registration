'use client';

import React from 'react';
import Link from 'next/link';
import { ContentItem } from '@/data/contents';

interface ContentCardProps {
  content: ContentItem;
  isCompleted: boolean;
  isLocked?: boolean;
}

export default function ContentCard({ content, isCompleted, isLocked = false }: ContentCardProps) {
  const typeIcons = {
    infographic: '📊',
    video: '🎬',
    guide: '📖',
    checklist: '✅',
  };

  const typeLabels = {
    infographic: '인포그래픽',
    video: '영상',
    guide: '가이드',
    checklist: '체크리스트',
  };

  const CardContent = () => (
    <div
      className={`p-5 rounded-xl border transition-all ${
        isLocked
          ? 'bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed'
          : isCompleted
          ? 'bg-green-50 border-green-200 hover:border-green-300'
          : 'bg-white border-gray-200 hover:border-idusOrange hover:shadow-md cursor-pointer'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* 아이콘 */}
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
            isCompleted ? 'bg-green-100' : 'bg-idusOrange-10'
          }`}
        >
          {isCompleted ? '✓' : typeIcons[content.type]}
        </div>

        {/* 내용 */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                isCompleted
                  ? 'bg-green-100 text-green-700'
                  : 'bg-idusOrange-10 text-idusOrange'
              }`}
            >
              {typeLabels[content.type]}
            </span>
            <span className="text-xs text-gray-400">
              {content.duration}분
            </span>
          </div>
          <h4 className="font-bold text-idusBlack mb-1">{content.title}</h4>
          <p className="text-sm text-gray-500">{content.description}</p>
        </div>

        {/* 화살표 */}
        {!isLocked && (
          <div className={`text-xl ${isCompleted ? 'text-green-500' : 'text-gray-300'}`}>
            {isCompleted ? '✓' : '→'}
          </div>
        )}
        {isLocked && (
          <div className="text-xl text-gray-300">🔒</div>
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

