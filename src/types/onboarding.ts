// 온보딩 데이터 타입 정의

export interface ArtistInfo {
  artistName: string;
  phoneNumber: string;
  hasBusinessNumber: boolean;
  categories: string[];
  interestedIn2026: {
    food: boolean;
    digital: boolean;
  };
}

export interface LearningProgress {
  step1Completed: boolean;
  step2Completed: boolean;
  step3Completed: boolean;
  quizCompleted: boolean;
  quizScore: number;
  completedAt?: Date;
  totalTimeMinutes?: number;
}

export interface OnboardingData extends ArtistInfo {
  qualificationStatus: 'qualified' | 'no_business' | 'restricted_category';
  learningProgress: LearningProgress;
  registrationClicked: boolean;
  registrationCompleted?: boolean;
  createdAt: Date;
  updatedAt: Date;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

// 카테고리 정의
export const AVAILABLE_CATEGORIES = [
  { id: 'accessory', name: '악세서리/주얼리', icon: 'jewelry', available: true },
  { id: 'bag', name: '가방/지갑/파우치', icon: 'bag', available: true },
  { id: 'fashion', name: '패션소품', icon: 'like', available: true },
  { id: 'interior', name: '인테리어/소품', icon: 'best', available: true },
  { id: 'stationery', name: '문구/팬시', icon: 'stationery', available: true },
  { id: 'candle', name: '캔들/디퓨저', icon: 'cheer', available: true },
  { id: 'ceramic', name: '도자기/그릇', icon: 'best', available: true },
  { id: 'clothing', name: '의류/패브릭', icon: 'like', available: true },
  { id: 'plant', name: '플랜트', icon: 'plant', available: true },
  { id: 'art', name: '미술/공예', icon: 'best', available: true },
] as const;

export const RESTRICTED_CATEGORIES = [
  { id: 'food', name: '식품', icon: 'food', available: false, note: '2026년 확장 예정' },
  { id: 'digital', name: '디지털 작품 (캐리커쳐 등)', icon: 'digital', available: false, note: '2026년 확장 예정' },
  { id: 'cosmetics', name: '화장품', icon: 'cheer', available: false, note: '판매 불가' },
] as const;

// 학습 콘텐츠 타입
export interface LearningContent {
  id: string;
  stepId: number;
  title: string;
  description: string;
  type: 'infographic' | 'video' | 'guide' | 'quiz';
  duration: number; // minutes
  videoUrl?: string;
  imageUrl?: string;
}

// 학습 단계 정의 (총 30분 = 11 + 10 + 9 + 2분 퀴즈)
export const LEARNING_STEPS = [
  {
    id: 1,
    title: '글로벌 서비스 이해하기',
    description: 'idus 글로벌 서비스와 물류/정산을 알아봅니다',
    duration: 11,
    icon: '🌏',
  },
  {
    id: 2,
    title: '작품 등록 마스터하기',
    description: '작품 등록과 번역 방법을 배웁니다',
    duration: 10,
    icon: '📝',
  },
  {
    id: 3,
    title: '주문 처리 & 운영하기',
    description: '주문 처리와 고객 문의 대응법을 익힙니다',
    duration: 9,
    icon: '📦',
  },
] as const;

// 퀴즈 문제 타입
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// 퀴즈 문제 (5문제)
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: '글로벌 판매 시 해외 배송비는 어떻게 되나요?',
    options: [
      '작가님이 부담합니다',
      '0원! idus가 부담합니다',
      '고객이 부담합니다',
      '국가별로 다릅니다',
    ],
    correctAnswer: 1,
    explanation: '해외 배송비는 0원입니다! 작가님은 국내 물류센터까지만 보내시면 돼요.',
  },
  {
    id: 'q2',
    question: 'idus 글로벌로 판매할 수 있는 국가는 몇 개국인가요?',
    options: ['25개국', '35개국', '45개국', '55개국'],
    correctAnswer: 2,
    explanation: 'idus 글로벌은 전 세계 45개국에 판매할 수 있습니다!',
  },
  {
    id: 'q3',
    question: '글로벌 정산은 어떻게 진행되나요?',
    options: [
      '매주 금요일',
      '월 1회 (1일)',
      '월 2회 (1일, 16일)',
      '주문 즉시',
    ],
    correctAnswer: 2,
    explanation: '글로벌 정산은 월 2회, 매월 1일과 16일에 원화로 정산됩니다.',
  },
  {
    id: 'q4',
    question: '글로벌 판매 시 작가님이 직접 하셔야 하는 것은?',
    options: [
      '해외 배송 및 통관',
      '외국어 고객 응대',
      '국내 물류센터로 발송',
      '환율 계산 및 정산',
    ],
    correctAnswer: 2,
    explanation: '작가님은 국내 물류센터로 발송만 해주시면 됩니다. 해외 배송, 통관, 고객 응대(1차)는 idus가 진행해드려요!',
  },
  {
    id: 'q5',
    question: '다음 중 글로벌 판매가 불가능한 품목은?',
    options: [
      '악세서리/주얼리',
      '캔들 (MSDS 제출 시)',
      '향수/디퓨저',
      '의류/패브릭',
    ],
    correctAnswer: 2,
    explanation: '향수와 디퓨저는 항공 운송 규정상 글로벌 판매가 불가능합니다. 캔들은 MSDS 사전 제출 후 판매 가능해요!',
  },
];

