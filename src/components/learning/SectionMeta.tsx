'use client';

import React from 'react';
import { Copy } from 'lucide-react';
import { useToast } from '@/components/ui/ToastProvider';

type MetaItem = {
  label: string;
  value: string;
  copy?: boolean;
};

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const el = document.createElement('textarea');
      el.value = text;
      el.style.position = 'fixed';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.focus();
      el.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(el);
      return ok;
    } catch {
      return false;
    }
  }
}

export default function SectionMeta({ items }: { items: MetaItem[] }) {
  const { toast } = useToast();

  return (
    <div className="mt-3 space-y-2">
      {items.map((m, idx) => (
        <div
          key={idx}
          className="rounded-xl bg-white border border-idus-black-10 px-3 py-2"
        >
          <div className="flex items-start gap-3">
            <div className="text-xs text-idus-black-50 w-16 sm:w-20 pt-0.5 flex-shrink-0">{m.label}</div>
            {/* 이메일/제목 같은 긴 문자열은 keep-all의 영향을 받지 않도록 break-all로 예외 처리 */}
            <div className="flex-1 text-sm text-idus-black break-all leading-relaxed">
              {m.value}
            </div>
          {m.copy ? (
            <button
              type="button"
              onClick={async () => {
                const ok = await copyText(m.value);
                toast(ok
                  ? { type: 'success', title: '복사 완료', description: `${m.label}을(를) 클립보드에 복사했어요.` }
                  : { type: 'error', title: '복사 실패', description: '브라우저 권한을 확인해주세요.' }
                );
              }}
              className="mt-0.5 inline-flex items-center justify-center w-8 h-8 rounded-xl bg-idus-gray border border-idus-black-10 text-idus-black-50 hover:text-idus-orange hover:border-idus-orange/40 transition-colors flex-shrink-0"
              aria-label={`${m.label} 복사`}
            >
              <Copy className="w-4 h-4" />
            </button>
          ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}


