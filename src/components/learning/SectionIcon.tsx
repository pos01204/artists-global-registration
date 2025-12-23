'use client';

import React from 'react';
import BrandIcon from '@/components/ui/BrandIcon';
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';

type SectionIconProps = {
  icon?: string;
  size?: 'sm' | 'md' | 'lg';
};

function sizePx(size: SectionIconProps['size']) {
  if (size === 'sm') return 18;
  if (size === 'lg') return 28;
  return 22;
}

export default function SectionIcon({ icon, size = 'md' }: SectionIconProps) {
  if (!icon) return null;

  const px = sizePx(size);

  // Semantic tokens (권장)
  if (icon === 'ok') {
    return (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-green-50 border border-green-200">
        <CheckCircle2 className="w-5 h-5 text-green-600" />
      </span>
    );
  }
  if (icon === 'no') {
    return (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-red-50 border border-red-200">
        <XCircle className="w-5 h-5 text-red-600" />
      </span>
    );
  }
  if (icon === 'warn') {
    return (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-amber-50 border border-amber-200">
        <AlertTriangle className="w-5 h-5 text-amber-600" />
      </span>
    );
  }
  if (icon === 'info') {
    return (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-idus-orange-light/30 border border-idus-black-10">
        <Info className="w-5 h-5 text-idus-orange" />
      </span>
    );
  }

  // Brand tokens (brand:<name>)
  if (icon.startsWith('brand:')) {
    const name = icon.replace('brand:', '') as any;
    return (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-idus-orange-light/20 border border-idus-black-10">
        <BrandIcon name={name} size={px} alt="" />
      </span>
    );
  }

  // Fallback: emoji/text
  return <span className="text-2xl leading-none">{icon}</span>;
}


