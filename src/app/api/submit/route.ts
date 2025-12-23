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

    if (RAILWAY_BACKEND_URL) {
      const response = await fetch(`${RAILWAY_BACKEND_URL.replace(/\/$/, '')}/v1/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType: 'onboarding_snapshot',
          payload: {
            ...data,
            timestamp: new Date().toISOString(),
          },
        }),
      });

      if (!response.ok) {
        console.error('Railway backend error:', await response.text());
      }
    } else if (GOOGLE_SCRIPT_URL) {
      // 레거시: Google Apps Script 웹훅으로 데이터 전송
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          ...data,
          categories: data.categories.join(', '),
          interested2026Food: data.interestedIn2026.food,
          interested2026Digital: data.interestedIn2026.digital,
        }),
      });

      if (!response.ok) {
        console.error('Google Script error:', await response.text());
      }
    } else {
      // 개발 환경에서는 콘솔에 로깅
      console.log('📊 Onboarding Data Submitted:', {
        timestamp: new Date().toISOString(),
        artistName: data.artistName,
        phoneNumber: data.phoneNumber,
        hasBusinessNumber: data.hasBusinessNumber,
        categories: data.categories,
        qualificationStatus: data.qualificationStatus,
        learningProgress: data.learningProgress,
        registrationClicked: data.registrationClicked,
      });
    }

    return NextResponse.json({ 
      success: true,
      message: '데이터가 성공적으로 저장되었습니다.'
    });
    
  } catch (error) {
    console.error('Submit API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// GET 요청 처리 (헬스체크용)
export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    message: 'Global Artist Onboarding API'
  });
}
