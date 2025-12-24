// API 호출 유틸리티

import { OnboardingData } from '@/types/onboarding';

const API_BASE = '/api';

type SubmitResult = {
  success: boolean;
  message?: string;
  target?: 'railway' | 'google_script' | 'dev_console';
  error?: string;
  railwayError?: string | null;
  googleError?: string | null;
  status?: number;
};

async function safeReadJson(res: Response): Promise<any | null> {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export async function submitOnboardingData(data: OnboardingData): Promise<SubmitResult> {
  try {
    const response = await fetch(`${API_BASE}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const json = await safeReadJson(response);
    if (response.ok) return (json ?? { success: true }) as SubmitResult;

    const result: SubmitResult = {
      success: false,
      status: response.status,
      message: json?.message,
      error: json?.error ?? '데이터 저장에 실패했어요.',
      railwayError: json?.railwayError ?? null,
      googleError: json?.googleError ?? null,
    };

    // eslint-disable-next-line no-console
    console.warn('[submit] failed:', result);
    return result;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Submit error:', error);
    return {
      success: false,
      error: '데이터 전송에 실패했습니다. (네트워크/서버 오류)',
      message: error instanceof Error ? error.message : String(error),
    };
  }
}

// UTM 파라미터 추출
export function getUTMParams(): { utmSource?: string; utmMedium?: string; utmCampaign?: string } {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  
  return {
    utmSource: params.get('utm_source') || undefined,
    utmMedium: params.get('utm_medium') || undefined,
    utmCampaign: params.get('utm_campaign') || undefined,
  };
}

