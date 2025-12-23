'use client';

import React from 'react';
import { ContentSection } from '@/data/contents';
import ResponsiveTable from '@/components/learning/ResponsiveTable';
import SectionIcon from '@/components/learning/SectionIcon';
import { ClipboardList, Check } from 'lucide-react';
import SectionMeta from '@/components/learning/SectionMeta';

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
                <div className="flex-shrink-0">
                  <SectionIcon icon={section.icon} />
                </div>
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
                {section.meta && section.meta.length > 0 ? (
                  <SectionMeta items={section.meta} />
                ) : null}
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
            <ClipboardList className="w-5 h-5 text-idus-orange" />
            핵심 포인트
          </h4>
          <ul className="space-y-2">
            {summary.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-idus-black-70">
                <Check className="w-4 h-4 text-idus-orange mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

