// API 호출 유틸리티

import { OnboardingData } from '@/types/onboarding';

const API_BASE = '/api';

export async function submitOnboardingData(data: OnboardingData): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch(`${API_BASE}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Submit error:', error);
    return { success: false, message: '데이터 전송에 실패했습니다.' };
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

