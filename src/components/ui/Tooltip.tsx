'use client';

import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const tipRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState<{ left: number; top: number }>({ left: 0, top: 0 });

  const hasWindow = typeof window !== 'undefined';
  const portalEl = useMemo(() => (hasWindow ? document.body : null), [hasWindow]);

  useEffect(() => {
    if (!open) return;
    const el = btnRef.current;
    if (!el) return;

    const update = () => {
      const r = el.getBoundingClientRect();
      const margin = 12;
      const width = Math.min(320, Math.floor(window.innerWidth * 0.84));
      const left = Math.min(Math.max(r.left, margin), window.innerWidth - width - margin);
      const top = Math.min(r.bottom + 10, window.innerHeight - margin);
      setPos({ left, top });
    };

    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      const btn = btnRef.current;
      const tip = tipRef.current;
      const target = e.target as Node | null;
      if (!target) return;
      if (btn?.contains(target)) return;
      if (tip?.contains(target)) return;
      setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  return (
    <span className={`relative inline-flex ${className}`}>
      <button
        ref={btnRef}
        type="button"
        aria-label={label}
        aria-describedby={open ? id : undefined}
        onClick={() => setOpen(v => !v)}
        onPointerDown={(e) => {
          // 외부 클릭 감지 로직과 충돌 방지
          e.stopPropagation();
        }}
        onTouchStart={(e) => {
          // 모바일에서 터치 기반으로 확실히 토글
          e.stopPropagation();
          setOpen(v => !v);
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        // 모바일에서는 blur로 닫히면 바로 사라지는 경우가 있어, 외부 클릭으로 닫도록 변경
        className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-idus-gray border border-idus-black-10 text-idus-black-50 hover:text-idus-orange hover:border-idus-orange/40 transition-colors"
      >
        <Info className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {open && portalEl
          ? createPortal(
              <motion.div
                ref={tipRef}
                id={id}
                role="tooltip"
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                transition={{ duration: 0.14 }}
                className="fixed z-[200] rounded-xl border border-idus-black-10 bg-white shadow-lg p-3 text-sm text-idus-black-70"
                style={{ left: pos.left, top: pos.top, width: Math.min(320, Math.floor(window.innerWidth * 0.84)) }}
              >
                {content}
              </motion.div>,
              portalEl
            )
          : null}
      </AnimatePresence>
    </span>
  );
}


