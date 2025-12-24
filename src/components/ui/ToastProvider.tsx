'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Info, AlertTriangle, X, XCircle } from 'lucide-react';

type ToastType = 'success' | 'info' | 'warning' | 'error';

export type ToastInput = {
  type?: ToastType;
  title: string;
  description?: string;
  durationMs?: number;
};

type ToastItem = ToastInput & {
  id: string;
  createdAt: number;
  type: ToastType;
  durationMs: number;
};

type ToastContextValue = {
  toast: (input: ToastInput) => void;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

function iconByType(type: ToastType) {
  const cls = 'w-5 h-5';
  if (type === 'success') return <CheckCircle2 className={`${cls} text-green-600`} />;
  if (type === 'warning') return <AlertTriangle className={`${cls} text-amber-600`} />;
  if (type === 'error') return <XCircle className={`${cls} text-red-600`} />;
  return <Info className={`${cls} text-idus-orange`} />;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setItems(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = useCallback((input: ToastInput) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const item: ToastItem = {
      id,
      createdAt: Date.now(),
      type: input.type ?? 'info',
      title: input.title,
      description: input.description,
      durationMs: input.durationMs ?? 2600,
    };

    setItems(prev => [item, ...prev].slice(0, 4));

    window.setTimeout(() => dismiss(id), item.durationMs);
  }, [dismiss]);

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-3 left-0 right-0 z-[100] px-4 pointer-events-none">
        <div className="mx-auto max-w-md space-y-2">
          <AnimatePresence initial={false}>
            {items.map(t => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className="pointer-events-auto rounded-2xl border border-idus-black-10 bg-white shadow-lg"
              >
                <div className="flex items-start gap-3 p-4">
                  <div className="mt-0.5">{iconByType(t.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-idus-black truncate">{t.title}</div>
                    {t.description ? (
                      <div className="text-sm text-idus-black-70 mt-0.5 line-clamp-2">{t.description}</div>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    onClick={() => dismiss(t.id)}
                    className="text-idus-black-50 hover:text-idus-black transition-colors"
                    aria-label="알림 닫기"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}



