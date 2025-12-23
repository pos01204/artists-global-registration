'use client';

import React, { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Info } from 'lucide-react';

type TooltipProps = {
  content: React.ReactNode;
  label?: string;
  className?: string;
};

export default function Tooltip({ content, label = '도움말', className = '' }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <span className={`relative inline-flex ${className}`}>
      <button
        type="button"
        aria-label={label}
        aria-describedby={open ? id : undefined}
        onClick={() => setOpen(v => !v)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-idus-gray border border-idus-black-10 text-idus-black-50 hover:text-idus-orange hover:border-idus-orange/40 transition-colors"
      >
        <Info className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={id}
            role="tooltip"
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.14 }}
            className="absolute z-[120] left-0 top-full mt-2 w-[min(320px,80vw)] rounded-xl border border-idus-black-10 bg-white shadow-lg p-3 text-sm text-idus-black-70"
          >
            {content}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </span>
  );
}


