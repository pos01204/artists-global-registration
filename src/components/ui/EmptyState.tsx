'use client';

import { motion } from 'framer-motion';
import { Search, FileQuestion } from 'lucide-react';

interface EmptyStateProps {
  type?: 'search' | 'content';
  title: string;
  description?: string;
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
}

export default function EmptyState({
  type = 'search',
  title,
  description,
  suggestions,
  onSuggestionClick,
}: EmptyStateProps) {
  const Icon = type === 'search' ? Search : FileQuestion;

  return (
    <motion.div 
      className="bg-white border border-idus-black-10 rounded-2xl p-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* 아이콘 */}
      <motion.div 
        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-idus-gray mb-4"
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: type === 'search' ? [0, 10, -10, 0] : 0,
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          repeatDelay: 1,
        }}
      >
        <Icon className="w-8 h-8 text-idus-black-30" />
      </motion.div>

      {/* 타이틀 */}
      <h3 className="text-lg font-semibold text-idus-black mb-2">{title}</h3>
      
      {/* 설명 */}
      {description && (
        <p className="text-sm text-idus-black-50 mb-4">{description}</p>
      )}

      {/* 제안 키워드 */}
      {suggestions && suggestions.length > 0 && (
        <div className="mt-4">
          <p className="text-xs text-idus-black-50 mb-3">이런 키워드는 어떨까요?</p>
          <div className="flex flex-wrap justify-center gap-2">
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={suggestion}
                className="px-4 py-2 bg-idus-gray hover:bg-idus-orange-light/30 
                           rounded-full text-sm text-idus-black-70 hover:text-idus-orange
                           transition-colors border border-idus-black-10"
                onClick={() => onSuggestionClick?.(suggestion)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {suggestion}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
