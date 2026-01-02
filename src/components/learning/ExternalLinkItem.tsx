'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from '@/data/contents';
import { IconChevronRight } from '@/components/ui/icons';
import SectionIcon from '@/components/learning/SectionIcon';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';

type ExternalLinkItemProps = {
  link: ExternalLink;
  variant?: 'card' | 'row';
};

export default function ExternalLinkItem({ link, variant = 'row' }: ExternalLinkItemProps) {
  const isCard = variant === 'card';
  
  return (
    <motion.a 
      href={link.url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`
        flex items-center gap-3 group transition-all
        ${isCard 
          ? 'p-4 bg-gradient-to-br from-white to-gray-50/50 rounded-xl hover:shadow-lg border-2 border-gray-100 hover:border-idus-orange/30' 
          : 'p-3 bg-white rounded-xl hover:bg-idus-orange-light/20 border border-idus-black-10 hover:border-idus-orange/30'
        }
      `}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className={`flex-shrink-0 ${isCard ? 'w-12 h-12' : 'w-10 h-10'} rounded-xl bg-gradient-to-br from-idus-orange-light/50 to-idus-orange-light/20 flex items-center justify-center`}>
        <SectionIcon icon={link.icon || 'info'} size={isCard ? 'md' : 'sm'} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-idus-black group-hover:text-idus-orange transition-colors whitespace-normal break-words leading-snug flex items-center gap-1.5">
          {link.title}
          <ExternalLinkIcon className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-idus-orange" />
        </div>
        {link.description && (
          <div className="text-xs text-idus-black-50 whitespace-normal break-words leading-snug mt-1">{link.description}</div>
        )}
      </div>
      <motion.div
        className="flex-shrink-0"
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
      >
        <IconChevronRight className="w-5 h-5 text-idus-black-20 group-hover:text-idus-orange transition-colors" />
      </motion.div>
    </motion.a>
  );
}


