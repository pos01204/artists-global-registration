'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
          <motion.div
            key={index}
            className={`p-5 rounded-2xl border-2 transition-all ${
              section.highlight
                ? 'bg-gradient-to-br from-idus-orange-light/30 to-idus-orange-light/10 border-idus-orange/50 shadow-lg shadow-idus-orange/10'
                : 'bg-gradient-to-br from-white to-gray-50/50 border-gray-200 hover:border-idus-orange-light hover:shadow-md'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <div className="flex items-start gap-4">
              {section.icon && (
                <motion.div 
                  className="flex-shrink-0"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.1, type: 'spring', stiffness: 300 }}
                >
                  <SectionIcon icon={section.icon} />
                </motion.div>
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
              <motion.div 
                className="mt-4 rounded-xl overflow-hidden border border-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <img 
                  src={section.image} 
                  alt={section.title}
                  className="w-full h-auto"
                />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* 요약 - 아코디언으로 기본 접힘 */}
      {summary && summary.length > 0 && (
        <motion.div 
          className="bg-gradient-to-br from-idus-orange-light/20 to-amber-50/50 rounded-2xl border border-idus-orange/20 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <button
            type="button"
            onClick={() => setIsSummaryOpen(!isSummaryOpen)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-idus-orange-light/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-idus-orange to-amber-500 flex items-center justify-center shadow-sm">
                <Lightbulb className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-idus-black">핵심 포인트</span>
              <span className="text-xs text-idus-black-50 bg-white/60 px-2 py-0.5 rounded-full">
                {summary.length}개
              </span>
            </div>
            <motion.div
              animate={{ rotate: isSummaryOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5 text-idus-black-50" />
            </motion.div>
          </button>
          
          <AnimatePresence>
            {isSummaryOpen && (
              <motion.div 
                className="px-4 pb-4"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ul className="space-y-2 pt-2 border-t border-idus-orange/10">
                  {summary.map((item, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start gap-2 text-sm text-idus-black-70 pt-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <span className="w-5 h-5 rounded-full bg-idus-orange flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

