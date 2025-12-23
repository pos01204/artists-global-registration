// 학습 콘텐츠 데이터

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

// STEP 1: 글로벌 서비스 이해하기
export const STEP1_CONTENTS: ContentItem[] = [
  {
    id: 'why-global',
    stepId: 1,
    order: 1,
    title: '왜 글로벌에 진출해야 하나요?',
    description: '글로벌 시장의 기회와 가능성을 알아봅니다',
    type: 'infographic',
    duration: 3,
    content: {
      sections: [
        {
          title: '글로벌 이커머스 시장 규모',
          content: '글로벌 이커머스 시장은 약 4,147조원으로 한국 시장의 32배에 달합니다. 2030년에는 약 1경원(한국의 50배)까지 성장할 것으로 예상됩니다.',
          highlight: true,
          icon: '🌍',
        },
        {
          title: '해외 고객의 높은 객단가',
          content: '해외 고객의 평균 주문액은 국내의 2배입니다!\n• 영어권: $116 (약 157,000원)\n• 일본: $75 (약 101,000원)',
          icon: '💰',
        },
        {
          title: 'K-핸드메이드의 인기',
          content: '한국 핸드메이드 제품은 해외에서 높은 인기를 얻고 있습니다. 특히 악세서리, 도자기, 캔들 등의 카테고리가 인기입니다.',
          icon: '⭐',
        },
      ],
      summary: [
        '글로벌 시장은 한국의 32배 규모',
        '해외 고객 평균 주문액 2배',
        'K-핸드메이드 높은 인기',
      ],
    },
  },
  {
    id: 'idus-global-intro',
    stepId: 1,
    order: 2,
    title: 'idus 글로벌 서비스 소개',
    description: 'idus 글로벌의 특징과 장점을 알아봅니다',
    type: 'infographic',
    duration: 5,
    content: {
      sections: [
        {
          title: '해외 배송비 0원!',
          content: '작가님은 국내 물류센터까지만 발송하시면 됩니다. 해외 배송은 idus가 모두 처리합니다.',
          highlight: true,
          icon: '📦',
        },
        {
          title: '45개국 판매',
          content: '미국, 일본, 영국, 독일, 프랑스 등 전 세계 45개국에 판매할 수 있습니다.',
          icon: '🌏',
        },
        {
          title: '원화 정산',
          content: '월 2회(1일, 16일) 원화로 정산됩니다. 환전 걱정 없이 편하게 받으세요!',
          icon: '💵',
        },
        {
          title: '영어 번역 지원',
          content: '작품 정보를 한국어로 입력하면 영어/일본어로 자동 번역됩니다.',
          icon: '🔤',
        },
      ],
      summary: [
        '해외 배송비 0원',
        '45개국 판매 가능',
        '월 2회 원화 정산',
        '자동 번역 지원',
      ],
    },
  },
  {
    id: 'logistics-video',
    stepId: 1,
    order: 3,
    title: '물류/정산 알아보기',
    description: '영상으로 쉽게 이해하는 물류와 정산',
    type: 'video',
    duration: 7,
    content: {
      videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
      videoThumbnail: '/brand/brand assets/배송박스.png',
      summary: [
        '국내 물류센터로 발송 → idus가 해외 배송',
        '배송 가능 국가: 45개국',
        '정산: 월 2회 (1일, 16일) 원화로',
      ],
    },
  },
];

// STEP 2: 작품 등록 마스터하기
export const STEP2_CONTENTS: ContentItem[] = [
  {
    id: 'product-registration',
    stepId: 2,
    order: 1,
    title: '글로벌 작품 등록 가이드',
    description: '글로벌 판매를 위한 작품 등록 방법',
    type: 'guide',
    duration: 8,
    content: {
      sections: [
        {
          title: 'STEP 1: 글로벌 판매 ON',
          content: '작품 등록/수정 페이지에서 "글로벌 판매" 옵션을 ON으로 설정합니다.',
          icon: '1️⃣',
        },
        {
          title: 'STEP 2: 영문 정보 입력',
          content: '작품명, 설명을 영어로 입력합니다. 파파고나 DeepL을 활용하면 쉽게 번역할 수 있어요!',
          icon: '2️⃣',
        },
        {
          title: 'STEP 3: 배송 설정',
          content: '해외 배송 가능 여부를 확인하고, 배송 소요일을 설정합니다.',
          icon: '3️⃣',
        },
        {
          title: 'STEP 4: 가격 확인',
          content: '해외 판매가는 원화 가격 기준으로 자동 환산됩니다.',
          icon: '4️⃣',
        },
      ],
      summary: [
        '글로벌 판매 ON 설정',
        '영문 정보 입력 (번역 도구 활용)',
        '배송 설정 확인',
      ],
    },
  },
  {
    id: 'translation-tips',
    stepId: 2,
    order: 2,
    title: '번역 쉽게 하기',
    description: '번역 도구 활용 팁',
    type: 'guide',
    duration: 5,
    content: {
      sections: [
        {
          title: '추천 번역 도구',
          content: '• 파파고 (papago.naver.com)\n• DeepL (deepl.com)\n• ChatGPT',
          icon: '🔧',
        },
        {
          title: '번역 팁',
          content: '• 간결하고 명확한 문장으로 작성\n• 전문 용어는 영문 그대로 사용\n• 사이즈, 소재 정보는 정확하게',
          icon: '💡',
        },
        {
          title: '자주 쓰는 표현',
          content: '• Handmade with care (정성을 담아 만들었습니다)\n• Ships from Korea (한국에서 배송됩니다)\n• Free international shipping (해외 배송비 무료)',
          icon: '📝',
        },
      ],
      summary: [
        '파파고, DeepL 활용',
        '간결하고 명확하게',
        '사이즈/소재 정확히',
      ],
    },
  },
  {
    id: 'prohibited-items',
    stepId: 2,
    order: 3,
    title: '판매 가능/불가 품목',
    description: '글로벌 판매 가능한 품목 확인',
    type: 'checklist',
    duration: 5,
    content: {
      sections: [
        {
          title: '✅ 판매 가능',
          content: '• 악세서리/주얼리\n• 가방/지갑/파우치\n• 패션소품\n• 인테리어/소품\n• 문구/팬시\n• 캔들/디퓨저\n• 도자기/그릇\n• 의류/패브릭',
          icon: '✅',
        },
        {
          title: '❌ 판매 불가',
          content: '• 화장품/뷰티\n• 식품\n• 의약품/건강기능식품\n• 동식물/씨앗\n• 배터리 포함 제품 (일부 국가)\n• 가죽 제품 (일부 국가)',
          icon: '❌',
        },
        {
          title: '⚠️ 국가별 주의',
          content: '일부 국가에서는 특정 소재(가죽, 모피 등)의 반입이 제한될 수 있습니다. 작품 소재를 정확히 기재해주세요.',
          icon: '⚠️',
        },
      ],
      summary: [
        '악세서리, 가방, 인테리어 등 가능',
        '화장품, 식품 불가',
        '국가별 제한 품목 확인 필요',
      ],
    },
  },
];

// STEP 3: 주문 처리 & 운영하기
export const STEP3_CONTENTS: ContentItem[] = [
  {
    id: 'customer-service',
    stepId: 3,
    order: 1,
    title: '고객 문의 대응',
    description: '해외 고객 문의에 답변하는 방법',
    type: 'guide',
    duration: 5,
    content: {
      sections: [
        {
          title: '자동 번역 활용',
          content: 'idus 앱 내 채팅은 자동 번역을 지원합니다. 한국어로 답변하시면 고객에게는 영어/일본어로 전달됩니다.',
          highlight: true,
          icon: '🔄',
        },
        {
          title: '자주 묻는 질문 답변 예시',
          content: '• 배송 기간: "약 7-14일 소요됩니다"\n• 교환/환불: "도착 후 7일 이내 가능합니다"\n• 사이즈 문의: 정확한 치수를 안내해주세요',
          icon: '💬',
        },
        {
          title: '친절한 응대 팁',
          content: '• 감사 인사로 시작하기\n• 이모지 적절히 활용 😊\n• 명확하고 간결하게 답변',
          icon: '💡',
        },
      ],
      summary: [
        '자동 번역 지원',
        '한국어로 답변 가능',
        '친절하고 명확하게',
      ],
    },
  },
  {
    id: 'order-processing',
    stepId: 3,
    order: 2,
    title: '주문 처리 & 발송',
    description: '주문부터 발송까지의 프로세스',
    type: 'guide',
    duration: 7,
    content: {
      sections: [
        {
          title: '주문 확인',
          content: '글로벌 주문이 들어오면 알림을 받게 됩니다. 작가 앱에서 주문 내역을 확인하세요.',
          icon: '1️⃣',
        },
        {
          title: '상품 준비',
          content: '주문받은 작품을 정성껏 포장합니다. 해외 배송이므로 완충재를 충분히 사용해주세요.',
          icon: '2️⃣',
        },
        {
          title: '국내 물류센터로 발송',
          content: '지정된 국내 물류센터로 택배 발송합니다. 운송장 번호를 입력하면 끝!',
          icon: '3️⃣',
        },
        {
          title: '해외 배송 (idus 처리)',
          content: '물류센터에서 해외 배송을 진행합니다. 배송 현황은 자동으로 고객에게 안내됩니다.',
          icon: '4️⃣',
        },
      ],
      summary: [
        '주문 확인 → 포장 → 물류센터 발송',
        '해외 배송은 idus가 처리',
        '배송 현황 자동 안내',
      ],
    },
  },
  {
    id: 'packaging-tips',
    stepId: 3,
    order: 3,
    title: '포장 & 발송 체크리스트',
    description: '해외 배송을 위한 포장 가이드',
    type: 'checklist',
    duration: 3,
    content: {
      items: [
        { id: 'pkg-1', text: '상품이 파손되지 않도록 완충재 충분히 사용', checked: false },
        { id: 'pkg-2', text: '방수 포장 (비닐 등으로 한 번 더 감싸기)', checked: false },
        { id: 'pkg-3', text: '박스 외부에 "FRAGILE" 표시 (깨지기 쉬운 상품)', checked: false },
        { id: 'pkg-4', text: '주문 정보가 담긴 명세서 동봉', checked: false },
        { id: 'pkg-5', text: '지정 물류센터 주소로 정확히 발송', checked: false },
        { id: 'pkg-6', text: '운송장 번호 입력 완료', checked: false },
      ],
      summary: [
        '완충재 충분히',
        '방수 포장',
        '운송장 번호 입력',
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

