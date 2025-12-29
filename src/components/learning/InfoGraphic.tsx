'use client';

import React, { useState } from 'react';
import { ContentSection } from '@/data/contents';
import ResponsiveTable from '@/components/learning/ResponsiveTable';
import SectionIcon from '@/components/learning/SectionIcon';
import { Lightbulb, Check, ChevronDown } from 'lucide-react';
import SectionMeta from '@/components/learning/SectionMeta';

interface InfoGraphicProps {
  sections: ContentSection[];
  summary?: string[];
}

export default function InfoGraphic({ sections, summary }: InfoGraphicProps) {
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

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

      {/* 요약 - 아코디언으로 기본 접힘 */}
      {summary && summary.length > 0 && (
        <div className="bg-idus-orange-light/10 rounded-xl border border-idus-orange/10 overflow-hidden">
          <button
            type="button"
            onClick={() => setIsSummaryOpen(!isSummaryOpen)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-idus-orange-light/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-idus-orange-light/30 flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-idus-orange" />
              </div>
              <span className="font-semibold text-idus-black">핵심 포인트</span>
              <span className="text-xs text-idus-black-50">({summary.length}개)</span>
            </div>
            <ChevronDown 
              className={`w-5 h-5 text-idus-black-50 transition-transform duration-200 ${
                isSummaryOpen ? 'rotate-180' : ''
              }`} 
            />
          </button>
          
          {isSummaryOpen && (
            <div className="px-4 pb-4">
              <ul className="space-y-2 pt-2 border-t border-idus-orange/10">
                {summary.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-idus-black-70 pt-2">
                    <Check className="w-4 h-4 text-idus-orange mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

