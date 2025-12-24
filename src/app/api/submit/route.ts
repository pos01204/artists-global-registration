import { NextRequest, NextResponse } from 'next/server';

// 구글 시트 연동을 위한 API 엔드포인트

interface SubmitData {
  artistName: string;
  phoneNumber: string;
  hasBusinessNumber: boolean;
  categories: string[];
  interestedIn2026: {
    food: boolean;
    digital: boolean;
  };
  qualificationStatus: string;
  learningProgress?: {
    step1Completed: boolean;
    step2Completed: boolean;
    step3Completed: boolean;
    quizCompleted: boolean;
    quizScore: number;
    completedAt?: string;
    totalTimeMinutes?: number;
  };
  registrationClicked?: boolean;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  createdAt?: string;
  updatedAt?: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: SubmitData = await request.json();
    
    // 데이터 검증
    if (!data.artistName || !data.phoneNumber) {
      return NextResponse.json(
        { error: '필수 정보가 누락되었습니다.' },
        { status: 400 }
      );
    }

    /**
     * 우선순위
     * 1) Railway 백엔드로 이관 (권장): RAILWAY_BACKEND_URL/v1/events
     * 2) (레거시) Apps Script: GOOGLE_SCRIPT_URL
     * 3) 개발 환경: console.log
     */
    const RAILWAY_BACKEND_URL = process.env.RAILWAY_BACKEND_URL;
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
    const ALLOW_GOOGLE_SCRIPT_FALLBACK = process.env.ALLOW_GOOGLE_SCRIPT_FALLBACK === 'true';

    const normalizeBaseUrl = (raw?: string) => {
      if (!raw) return null;
      const trimmed = raw.trim().replace(/\/$/, '');
      if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
      // Vercel env에 도메인만 넣는 실수를 방지
      return `https://${trimmed}`;
    };

    const nowIso = new Date().toISOString();
    const railwayBase = normalizeBaseUrl(RAILWAY_BACKEND_URL);
    let railwayError: string | null = null;
    let googleError: string | null = null;

    // 1) Railway 우선 시도 (실패 시 폴백)
    if (railwayBase) {
      try {
        const response = await fetch(`${railwayBase}/v1/events`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventType: 'onboarding_snapshot',
            payload: { ...data, timestamp: nowIso },
          }),
        });

        if (response.ok) {
          return NextResponse.json({
            success: true,
            message: '데이터가 성공적으로 저장되었습니다.',
            target: 'railway',
          });
        }

        const text = await response.text();
        railwayError = text?.slice(0, 500) ?? 'unknown error';
        console.error('Railway backend error:', text);
      } catch (err) {
        railwayError = err instanceof Error ? err.message : String(err);
        console.error('Railway backend network error:', err);
      }
    }

    // 2) 폴백: Google Apps Script
    if (GOOGLE_SCRIPT_URL && ALLOW_GOOGLE_SCRIPT_FALLBACK) {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: nowIso,
          ...data,
          categories: data.categories.join(', '),
          interested2026Food: data.interestedIn2026.food,
          interested2026Digital: data.interestedIn2026.digital,
        }),
      });

      if (response.ok) {
        return NextResponse.json({
          success: true,
          message: '데이터가 성공적으로 저장되었습니다.',
          target: 'google_script',
        });
      }

      const text = await response.text();
      googleError = text?.slice(0, 500) ?? 'unknown error';
      console.error('Google Script error:', text);
      return NextResponse.json(
        {
          success: false,
          error: '데이터 저장에 실패했습니다. (Railway/Google Script 모두 실패)',
          railwayError,
          googleError,
        },
        { status: 502 }
      );
    }

    if (GOOGLE_SCRIPT_URL && !ALLOW_GOOGLE_SCRIPT_FALLBACK) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Railway로 저장하지 못했습니다. (Google Script 폴백은 비활성화되어 있어요) Railway 환경/주소를 확인해주세요.',
          railwayError,
        },
        { status: 502 }
      );
    }

    // 3) 개발 환경에서는 콘솔에 로깅
    if (!railwayBase) {
      // 개발 환경에서는 콘솔에 로깅
      console.log('📊 Onboarding Data Submitted:', {
        timestamp: nowIso,
        artistName: data.artistName,
        phoneNumber: data.phoneNumber,
        hasBusinessNumber: data.hasBusinessNumber,
        categories: data.categories,
        qualificationStatus: data.qualificationStatus,
        learningProgress: data.learningProgress,
        registrationClicked: data.registrationClicked,
      });
    }
    return NextResponse.json(
      { success: false, error: '저장 대상이 설정되지 않았습니다. (RAILWAY_BACKEND_URL/GOOGLE_SCRIPT_URL 없음)' },
      { status: 500 }
    );
    
  } catch (error) {
    console.error('Submit API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// GET 요청 처리 (헬스체크용)
export async function GET(request: NextRequest) {
  const RAILWAY_BACKEND_URL = process.env.RAILWAY_BACKEND_URL;
  const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
  const ALLOW_GOOGLE_SCRIPT_FALLBACK = process.env.ALLOW_GOOGLE_SCRIPT_FALLBACK === 'true';

  const normalizeBaseUrl = (raw?: string) => {
    if (!raw) return null;
    const trimmed = raw.trim().replace(/\/$/, '');
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
    return `https://${trimmed}`;
  };

  const railwayBase = normalizeBaseUrl(RAILWAY_BACKEND_URL);
  const url = new URL(request.url);
  const check = url.searchParams.get('check') === '1';

  let railwayHealth: any = null;
  let railwayHealthError: string | null = null;

  if (check && railwayBase) {
    try {
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 2500);
      const res = await fetch(`${railwayBase}/health`, { signal: controller.signal });
      clearTimeout(t);
      railwayHealth = await res.json().catch(() => null);
      if (!res.ok) {
        railwayHealthError = `health status ${res.status}`;
      }
    } catch (e) {
      railwayHealthError = e instanceof Error ? e.message : String(e);
    }
  }

  return NextResponse.json({
    status: 'ok',
    message: 'Global Artist Onboarding API',
    config: {
      hasRailwayBackendUrl: Boolean(RAILWAY_BACKEND_URL),
      railwayBase,
      hasGoogleScriptUrl: Boolean(GOOGLE_SCRIPT_URL),
      allowGoogleScriptFallback: ALLOW_GOOGLE_SCRIPT_FALLBACK,
    },
    railwayHealth,
    railwayHealthError,
  });
}
