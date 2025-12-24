'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export type AccordionItem = {
  id: string;
  header: React.ReactNode;
  content: React.ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  openIds: string[];
  onToggle: (id: string) => void;
};

export default function Accordion({ items, openIds, onToggle }: AccordionProps) {
  return (
    <div className="space-y-3">
      {items.map(item => {
        const isOpen = openIds.includes(item.id);
        const contentId = `${item.id}-content`;
        const buttonId = `${item.id}-button`;

        return (
          <div key={item.id} className="bg-white rounded-2xl border border-idus-black-10 overflow-hidden">
            <button
              id={buttonId}
              type="button"
              onClick={() => onToggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={contentId}
              className="w-full px-5 py-4 text-left flex items-start justify-between gap-4 hover:bg-idus-gray transition-colors"
            >
              <div className="flex-1 min-w-0">{item.header}</div>
              <ChevronDown
                className={`w-5 h-5 text-idus-black-50 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={contentId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-t border-idus-black-10 overflow-hidden"
                >
                  <div className="px-5 py-4 text-idus-black-70 leading-relaxed whitespace-pre-line">
                    {item.content}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}



