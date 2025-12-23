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

    // Google Sheets API 연동 (환경변수 설정 필요)
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
    
    if (GOOGLE_SCRIPT_URL) {
      // 학습 진행 상태 문자열로 변환
      const learningStatus = data.learningProgress ? 
        `STEP1: ${data.learningProgress.step1Completed ? '완료' : '미완료'}, ` +
        `STEP2: ${data.learningProgress.step2Completed ? '완료' : '미완료'}, ` +
        `STEP3: ${data.learningProgress.step3Completed ? '완료' : '미완료'}` : 
        '미시작';
      
      // 퀴즈 결과
      const quizResult = data.learningProgress?.quizCompleted ? 
        `완료 (${data.learningProgress.quizScore}/5점)` : 
        '미완료';

      // Google Apps Script 웹훅으로 데이터 전송
      const payload = {
        timestamp: new Date().toISOString(),
        artistName: data.artistName,
        phoneNumber: data.phoneNumber,
        hasBusinessNumber: data.hasBusinessNumber ? 'Y' : 'N',
        categories: data.categories.join(', '),
        interested2026Food: data.interestedIn2026.food ? 'Y' : 'N',
        interested2026Digital: data.interestedIn2026.digital ? 'Y' : 'N',
        qualificationStatus: data.qualificationStatus,
        // 학습 진행 상세
        step1Completed: data.learningProgress?.step1Completed ? 'Y' : 'N',
        step2Completed: data.learningProgress?.step2Completed ? 'Y' : 'N',
        step3Completed: data.learningProgress?.step3Completed ? 'Y' : 'N',
        learningStatus: learningStatus,
        // 퀴즈 결과
        quizCompleted: data.learningProgress?.quizCompleted ? 'Y' : 'N',
        quizScore: data.learningProgress?.quizScore ?? 0,
        quizResult: quizResult,
        // 완료 정보
        completedAt: data.learningProgress?.completedAt || '',
        totalTimeMinutes: data.learningProgress?.totalTimeMinutes || 0,
        // 등록 클릭 여부
        registrationClicked: data.registrationClicked ? 'Y' : 'N',
        // UTM 파라미터
        utmSource: data.utmSource || '',
        utmMedium: data.utmMedium || '',
        utmCampaign: data.utmCampaign || '',
      };

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error('Google Sheets API error:', await response.text());
        // 실패해도 사용자 경험에 영향 없도록 처리
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
