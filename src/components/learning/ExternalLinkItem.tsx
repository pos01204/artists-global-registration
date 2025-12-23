'use client';

import React from 'react';
import { ExternalLink } from '@/data/contents';
import { IconChevronRight } from '@/components/ui/icons';
import SectionIcon from '@/components/learning/SectionIcon';

type ExternalLinkItemProps = {
  link: ExternalLink;
  variant?: 'card' | 'row';
};

export default function ExternalLinkItem({ link, variant = 'row' }: ExternalLinkItemProps) {
  const container =
    variant === 'card'
      ? 'flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-md transition-all border border-idus-black-10 group'
      : 'flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-idus-orange-light/20 transition-colors group border border-idus-black-10';

  return (
    <a href={link.url} target="_blank" rel="noopener noreferrer" className={container}>
      <div className="flex-shrink-0">
        <SectionIcon icon={link.icon || 'info'} size="md" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-idus-black group-hover:text-idus-orange transition-colors whitespace-normal break-words leading-snug">
          {link.title}
        </div>
        {link.description ? (
          <div className="text-xs text-idus-black-50 whitespace-normal break-words leading-snug mt-0.5">{link.description}</div>
        ) : null}
      </div>
      <IconChevronRight className="w-5 h-5 text-idus-black-20 group-hover:text-idus-orange transition-colors flex-shrink-0" />
    </a>
  );
}


