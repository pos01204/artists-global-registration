// 학습 콘텐츠 데이터 - 간소화 버전

export interface ContentItem {
  id: string;
  stepId: number;
  order: number;
  title: string;
  description: string;
  type: 'infographic' | 'video' | 'guide' | 'checklist';
  duration: number; // minutes
  content: ContentDetail;
}

export interface ContentDetail {
  sections?: ContentSection[];
  videoUrl?: string;
  videoThumbnail?: string;
  items?: ChecklistItem[];
  summary?: string[];
  externalLinks?: ExternalLink[];
}

export interface ExternalLink {
  title: string;
  url: string;
  icon?: string;
  description?: string;
}

export interface ContentSection {
  title: string;
  content: string;
  highlight?: boolean;
  icon?: string;
  image?: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

/**
 * 콘텐츠 구조 간소화 (페이지당 3개 섹션 이하)
 * - STEP 1: 3개 콘텐츠
 * - STEP 2: 3개 콘텐츠  
 * - STEP 3: 3개 콘텐츠
 */

// STEP 1: 글로벌 서비스 이해하기 (3개)
export const STEP1_CONTENTS: ContentItem[] = [
  {
    id: 'global-intro',
    stepId: 1,
    order: 1,
    title: 'idus 글로벌 판매란?',
    description: '해외 배송 없이 해외 판매! idus가 모든 것을 지원해드려요',
    type: 'infographic',
    duration: 3,
    content: {
      sections: [
        {
          title: '글로벌 시장, 왜 도전해야 할까요?',
          content:
            '• 글로벌 시장은 한국의 32배 규모\n• 해외 고객 평균 주문액은 국내의 2배\n• K-핸드메이드 인기 상승 중',
          highlight: true,
          icon: '🌍',
        },
        {
          title: 'idus가 해드리는 것',
          content:
            '• 해외 배송 처리 (작가님 부담 0원)\n• 통관/검수/포장 대행\n• 45개국 판매 지원\n• 번역 도구 안내',
          icon: '✅',
        },
        {
          title: '작가님이 하실 것',
          content:
            '• 기존 작품에 "글로벌 판매" ON\n• 영문 정보 입력 (번역 도구 활용)\n• 국내 물류센터로 발송',
          icon: '📝',
        },
      ],
      summary: [
        '해외 배송은 idus가 처리',
        '45개국 판매, 번역 지원',
        '기존 작품으로 바로 시작 가능',
      ],
    },
  },
  {
    id: 'logistics-settlement',
    stepId: 1,
    order: 2,
    title: '물류 & 정산 안내',
    description: '배송 가능 국가와 정산 방식을 알아봐요',
    type: 'guide',
    duration: 4,
    content: {
      sections: [
        {
          title: '배송 흐름',
          content:
            '작가님 발송 → idus 물류센터 → 검수/포장/통관 → 해외 배송\n\n작가님은 국내 물류센터까지만 보내주시면 됩니다!',
          highlight: true,
          icon: '📦',
        },
        {
          title: '배송 가능 국가 (45개국)',
          content:
            '미국, 일본, 영국, 독일, 프랑스, 호주, 싱가포르, 홍콩, 대만 등\n아시아/북미/유럽/오세아니아 주요 국가',
          icon: '🌏',
        },
        {
          title: '정산 안내',
          content:
            '• 정산 주기: 월 2회 (1일, 16일)\n• 정산 통화: 원화 (KRW)\n• 수수료: 글로벌 판매 수수료 적용',
          icon: '💵',
        },
      ],
      summary: [
        '국내 물류센터로 발송하면 끝',
        '45개국 배송 가능',
        '월 2회 원화 정산',
      ],
      externalLinks: [
        {
          title: 'idus 공식 유튜브',
          url: 'https://www.youtube.com/@idus_official',
          icon: '▶️',
          description: '글로벌 안내 영상 보기',
        },
      ],
    },
  },
  {
    id: 'artist-registration',
    stepId: 1,
    order: 3,
    title: '글로벌 작가 등록하기',
    description: '작가 앱에서 1분 만에 신청 완료!',
    type: 'guide',
    duration: 2,
    content: {
      sections: [
        {
          title: '신청 방법',
          content:
            '1) 아이디어스 작가 앱 접속\n2) 설정 → 글로벌 판매 신청\n3) 약관 동의 후 완료!',
          highlight: true,
          icon: '✈️',
        },
        {
          title: '신청 조건',
          content:
            '• 아이디어스 작가 등록 완료\n• 본인 인증 완료\n• 정산 계좌 등록',
          icon: '📋',
        },
        {
          title: 'TIP: 해외 고객 화면 확인하기',
          content:
            '구매자 앱에서 언어 설정을 영어/일본어로 변경하면\n해외 고객이 보는 화면을 미리 확인할 수 있어요!',
          icon: '💡',
        },
      ],
      summary: [
        '작가 앱에서 1분이면 신청 완료',
        '본인 인증/정산계좌 필요',
      ],
      externalLinks: [
        {
          title: '글로벌 작가 등록하기',
          url: 'https://www.idus.com/w/artist/global',
          icon: '✈️',
          description: '지금 바로 신청',
        },
        {
          title: '문의하기',
          url: 'https://idus.channel.io',
          icon: '💬',
          description: '채널톡 문의',
        },
      ],
    },
  },
];

// STEP 2: 작품 등록 마스터하기 (3개)
export const STEP2_CONTENTS: ContentItem[] = [
  {
    id: 'product-registration',
    stepId: 2,
    order: 1,
    title: '글로벌 작품 등록 방법',
    description: '기존 작품을 글로벌로 전환하는 간단한 방법',
    type: 'guide',
    duration: 4,
    content: {
      sections: [
        {
          title: '글로벌 판매 설정',
          content:
            '1) 작품 등록/수정 페이지 접속\n2) "글로벌 판매" 옵션 ON\n3) 영문 작품명/설명 입력\n4) 저장 후 판매 시작!',
          highlight: true,
          icon: '🚀',
        },
        {
          title: '가격 & 배송 설정',
          content:
            '• 해외 판매가: 원화 기준 자동 환산\n• 배송 소요일 설정 (7-14일 권장)\n• 해외 배송비: 무료 (idus 부담)',
          icon: '💰',
        },
        {
          title: '판매 가능 품목 확인',
          content:
            '✅ 가능: 악세서리, 가방, 인테리어, 캔들, 도자기, 의류\n❌ 불가: 화장품, 식품, 의약품, 동식물',
          icon: '📋',
        },
      ],
      summary: [
        '글로벌 판매 ON → 영문 정보 입력',
        '가격은 자동 환산',
        '식품/화장품은 판매 불가',
      ],
    },
  },
  {
    id: 'translation-guide',
    stepId: 2,
    order: 2,
    title: '쉽게 하는 번역 가이드',
    description: '번역 도구를 활용해 쉽게 영문 정보를 입력해요',
    type: 'guide',
    duration: 4,
    content: {
      sections: [
        {
          title: '필수 번역 항목',
          content:
            '• 작품명\n• 작품 설명 (소재/크기/사용법)\n• 옵션명 (색상/사이즈 등)',
          highlight: true,
          icon: '📝',
        },
        {
          title: '추천 번역 도구',
          content:
            '• 파파고: 한국어 특화, 자연스러운 번역\n• DeepL: 고품질 AI 번역\n• ChatGPT: 문맥 이해, 톤 조절 가능',
          icon: '🔧',
        },
        {
          title: '번역 팁',
          content:
            '• 짧고 명확한 문장 사용\n• 사이즈는 cm, 무게는 g 단위로\n• 번역 후 검토 필수!',
          icon: '💡',
        },
      ],
      summary: [
        '작품명/설명/옵션명은 필수',
        '파파고, DeepL 활용 추천',
        '번역 후 검토는 필수',
      ],
      externalLinks: [
        {
          title: '파파고 번역',
          url: 'https://papago.naver.com',
          icon: '🌐',
        },
        {
          title: 'DeepL 번역',
          url: 'https://www.deepl.com/translator',
          icon: '🌐',
        },
        {
          title: 'ChatGPT',
          url: 'https://chat.openai.com',
          icon: '🤖',
        },
      ],
    },
  },
  {
    id: 'promotion-guide',
    stepId: 2,
    order: 3,
    title: '글로벌 홍보 링크 만들기',
    description: 'SNS에 공유할 수 있는 글로벌 링크를 생성해요',
    type: 'guide',
    duration: 2,
    content: {
      sections: [
        {
          title: '글로벌 링크 생성 방법',
          content:
            '기존 URL 뒤에 언어 파라미터 추가:\n• 영어: ?lang=en\n• 일본어: ?lang=ja',
          highlight: true,
          icon: '🔗',
        },
        {
          title: '링크 예시',
          content:
            '작가홈: idus.com/w/artist/[ID]?lang=en\n작품: idus.com/w/product/[ID]?lang=en',
          icon: '📎',
        },
        {
          title: '활용 방법',
          content:
            '• Instagram Bio에 링크 추가\n• 해외 해시태그와 함께 공유\n• QR 코드로 만들어 패키지에 부착',
          icon: '📣',
        },
      ],
      summary: [
        'URL에 ?lang=en 추가로 영문 링크 생성',
        'SNS, QR 코드로 홍보 활용',
      ],
    },
  },
];

// STEP 3: 주문 처리 & 운영하기 (3개)
export const STEP3_CONTENTS: ContentItem[] = [
  {
    id: 'order-processing',
    stepId: 3,
    order: 1,
    title: '주문 확인 & 발송',
    description: '글로벌 주문이 들어오면 이렇게 처리해요',
    type: 'checklist',
    duration: 4,
    content: {
      sections: [
        {
          title: '주문 확인',
          content:
            '작가 앱 → 주문 관리 → 글로벌 주문에서 확인\n(푸시 알림 ON 권장)',
          icon: '📱',
        },
        {
          title: '포장 & 발송',
          content:
            '• 완충재 충분히 사용\n• 방수 포장 권장\n• 국내 물류센터로 발송\n• 앱에서 운송장 번호 입력',
          highlight: true,
          icon: '📦',
        },
        {
          title: '이후 과정 (idus 처리)',
          content:
            '물류센터 검수 → 해외 발송 → 배송 현황 자동 안내',
          icon: '🌏',
        },
      ],
      items: [
        { id: 'check-1', text: '주문 정보 확인 (옵션/수량/국가)', checked: false },
        { id: 'check-2', text: '완충재로 꼼꼼히 포장', checked: false },
        { id: 'check-3', text: '물류센터로 발송', checked: false },
        { id: 'check-4', text: '운송장 번호 입력 완료', checked: false },
      ],
      summary: [
        '주문 확인 → 포장 → 물류센터 발송',
        '해외 배송은 idus가 처리',
      ],
    },
  },
  {
    id: 'customer-service',
    stepId: 3,
    order: 2,
    title: '고객 문의 대응',
    description: '해외 고객 문의, 한국어로 답변해도 괜찮아요',
    type: 'guide',
    duration: 3,
    content: {
      sections: [
        {
          title: '자동 번역 지원',
          content:
            'idus 앱 내 채팅은 자동 번역을 지원해요.\n한국어로 답변하시면 고객에게 번역되어 전달됩니다.',
          highlight: true,
          icon: '🔄',
        },
        {
          title: '자주 묻는 질문 답변 예시',
          content:
            '• 배송 기간: "약 7-14일 소요됩니다"\n• 교환/환불: "도착 후 7일 이내 가능"\n• 사이즈: 정확한 치수 안내',
          icon: '💬',
        },
        {
          title: '응대 팁',
          content:
            '• 감사 인사로 시작하기\n• 명확하고 간결하게 답변\n• 이모지 적절히 활용 😊',
          icon: '💡',
        },
      ],
      summary: [
        '자동 번역으로 한국어 답변 OK',
        '친절하고 명확하게',
      ],
    },
  },
  {
    id: 'additional-info',
    stepId: 3,
    order: 3,
    title: '추가 안내사항',
    description: '소포수령증 신청 및 기타 안내',
    type: 'guide',
    duration: 2,
    content: {
      sections: [
        {
          title: '소포수령증 신청',
          content:
            '해외 발송 증빙이 필요할 때:\n채널톡 문의 → 주문번호/발송일/작가정보 전달',
          icon: '📄',
        },
        {
          title: '일본 고객 특성 TIP',
          content:
            '• 상세한 제품 설명 선호\n• 포장에 관심이 높음\n• 정중한 커뮤니케이션 중시',
          icon: '🇯🇵',
        },
        {
          title: '도움이 필요하시면',
          content:
            '글로벌 판매 관련 문의는\n채널톡으로 편하게 연락주세요!',
          highlight: true,
          icon: '💬',
        },
      ],
      summary: [
        '소포수령증은 채널톡에서 신청',
        '일본 고객은 상세 설명/포장 중시',
      ],
      externalLinks: [
        {
          title: '채널톡 문의하기',
          url: 'https://idus.channel.io',
          icon: '💬',
          description: '소포수령증 신청 및 기타 문의',
        },
      ],
    },
  },
];

// 전체 콘텐츠 가져오기
export function getContentsByStep(stepId: number): ContentItem[] {
  switch (stepId) {
    case 1:
      return STEP1_CONTENTS;
    case 2:
      return STEP2_CONTENTS;
    case 3:
      return STEP3_CONTENTS;
    default:
      return [];
  }
}

export function getContentById(contentId: string): ContentItem | undefined {
  const allContents = [...STEP1_CONTENTS, ...STEP2_CONTENTS, ...STEP3_CONTENTS];
  return allContents.find(c => c.id === contentId);
}

export function getAllContents(): ContentItem[] {
  return [...STEP1_CONTENTS, ...STEP2_CONTENTS, ...STEP3_CONTENTS];
}
