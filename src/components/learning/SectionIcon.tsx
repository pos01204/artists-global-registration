'use client';

import React from 'react';
import BrandIcon from '@/components/ui/BrandIcon';
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';

type SectionIconProps = {
  icon?: string;
  size?: 'sm' | 'md' | 'lg';
};

function dims(size: SectionIconProps['size']) {
  if (size === 'sm') return { box: 24, icon: 14, emoji: 14 };
  if (size === 'lg') return { box: 36, icon: 22, emoji: 22 };
  return { box: 28, icon: 16, emoji: 16 };
}

export default function SectionIcon({ icon, size = 'md' }: SectionIconProps) {
  if (!icon) return null;

  const { box, icon: iconPx, emoji } = dims(size);

  // Semantic tokens (권장)
  if (icon === 'ok') {
    return (
      <span
        className="inline-flex items-center justify-center rounded-xl bg-green-50 border border-green-200"
        style={{ width: box, height: box }}
      >
        <CheckCircle2 className="text-green-600" style={{ width: iconPx, height: iconPx }} />
      </span>
    );
  }
  if (icon === 'no') {
    return (
      <span
        className="inline-flex items-center justify-center rounded-xl bg-red-50 border border-red-200"
        style={{ width: box, height: box }}
      >
        <XCircle className="text-red-600" style={{ width: iconPx, height: iconPx }} />
      </span>
    );
  }
  if (icon === 'warn') {
    return (
      <span
        className="inline-flex items-center justify-center rounded-xl bg-amber-50 border border-amber-200"
        style={{ width: box, height: box }}
      >
        <AlertTriangle className="text-amber-600" style={{ width: iconPx, height: iconPx }} />
      </span>
    );
  }
  if (icon === 'info') {
    return (
      <span
        className="inline-flex items-center justify-center rounded-xl bg-idus-orange-light/30 border border-idus-black-10"
        style={{ width: box, height: box }}
      >
        <Info className="text-idus-orange" style={{ width: iconPx, height: iconPx }} />
      </span>
    );
  }

  // Brand tokens (brand:<name>)
  if (icon.startsWith('brand:')) {
    const name = icon.replace('brand:', '') as any;
    return (
      <span
        className="inline-flex items-center justify-center rounded-xl bg-idus-orange-light/20 border border-idus-black-10"
        style={{ width: box, height: box }}
      >
        <BrandIcon name={name} size={iconPx} alt="" />
      </span>
    );
  }

  // Fallback: emoji/text
  return (
    <span
      className="inline-flex items-center justify-center rounded-xl bg-idus-gray border border-idus-black-10"
      style={{ width: box, height: box, fontSize: emoji }}
      aria-hidden="true"
    >
      {icon}
    </span>
  );
}


