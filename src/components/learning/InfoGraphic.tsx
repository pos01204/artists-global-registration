'use client';

import React from 'react';
import { ContentSection } from '@/data/contents';
import ResponsiveTable from '@/components/learning/ResponsiveTable';

interface InfoGraphicProps {
  sections: ContentSection[];
  summary?: string[];
}

export default function InfoGraphic({ sections, summary }: InfoGraphicProps) {
  return (
    <div className="space-y-6">
      {/* 섹션 카드들 */}
      <div className="grid gap-4">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`p-5 rounded-xl border transition-all ${
              section.highlight
                ? 'bg-idus-orange-light/20 border-idus-orange shadow-md'
                : 'bg-white border-gray-200 hover:border-idus-orange-light'
            }`}
          >
            <div className="flex items-start gap-4">
              {section.icon && (
                <span className="text-3xl flex-shrink-0">{section.icon}</span>
              )}
              <div className="flex-1">
                <h4 className={`font-bold mb-2 ${
                  section.highlight ? 'text-idus-orange-dark' : 'text-idus-black'
                }`}>
                  {section.title}
                </h4>
                {section.table ? (
                  <ResponsiveTable
                    columns={section.table.columns}
                    rows={section.table.rows}
                    className="mt-2"
                  />
                ) : (
                  <p className="text-idus-black-70 whitespace-pre-line leading-relaxed">
                    {section.content}
                  </p>
                )}
              </div>
            </div>
            {section.image && (
              <div className="mt-4 rounded-lg overflow-hidden">
                <img 
                  src={section.image} 
                  alt={section.title}
                  className="w-full h-auto"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 요약 */}
      {summary && summary.length > 0 && (
        <div className="bg-idus-gray rounded-xl p-5 border border-idus-black-10">
          <h4 className="font-bold text-idus-black mb-3 flex items-center gap-2">
            <span>📋</span>
            핵심 포인트
          </h4>
          <ul className="space-y-2">
            {summary.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-idus-black-70">
                <span className="text-idus-orange font-bold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

