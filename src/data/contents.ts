// 학습 콘텐츠 데이터 - 간소화 버전 (링크 업데이트)

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
  /**
   * primary: 기본(핵심) 노출 대상
   * secondary: 덜 중요한 보충 정보(아코디언/추가 정보로 내려감)
   */
  importance?: 'primary' | 'secondary';
  icon?: string;
  image?: string;
  meta?: Array<{
    label: string;
    value: string;
    copy?: boolean;
  }>;
  table?: {
    columns: string[];
    rows: string[][];
  };
  /**
   * 인포그래픽 컴포넌트 ID
   * 지정하면 해당 인포그래픽 컴포넌트가 렌더링됨
   */
  infographicId?: 
    | 'translation-choice'
    | 'auto-translation'
    | 'order-separation'
    | 'gift-option'
    | 'shipping-flow'
    | 'product-categories'
    | 'translation-prompt'
    | 'logistics-info'
    // 신규 인포그래픽 (2026.01)
    | 'global-benefits'
    | 'idus-support'
    | 'settlement-flow'
    | 'registration-steps'
    | 'product-setup-steps'
    | 'customer-comparison';
}

export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

/**
 * 콘텐츠 구조 간소화 (페이지당 3개 섹션 이하)
 * - STEP 1: 4개 콘텐츠 (글로벌 소개, 물류, 정산, 작가 등록)
 * - STEP 2: 3개 콘텐츠  
 * - STEP 3: 3개 콘텐츠
 */

// STEP 1: 글로벌 서비스 이해하기 (4개)
export const STEP1_CONTENTS: ContentItem[] = [
  {
    id: 'global-intro',
    stepId: 1,
    order: 1,
    title: 'idus 글로벌 판매란?',
    description: '해외 배송 없이 해외 판매! idus가 모든 것을 지원해드려요',
    type: 'guide',
    duration: 3,
    content: {
      sections: [
        {
          title: '글로벌 시장, 왜 도전해야 할까요?',
          content:
            '• 글로벌 시장은 한국의 32배 규모\n• 해외 고객 평균 주문액은 국내의 2배\n• K-핸드메이드 인기 상승 중',
          highlight: true,
          icon: '🌍',
          infographicId: 'global-benefits',
        },
        {
          title: 'idus가 해드리는 것 vs 작가님이 하실 것',
          content:
            '복잡한 해외 판매는 idus가, 작가님은 작품에만 집중하세요!',
          highlight: true,
          icon: '🧡',
          infographicId: 'idus-support',
        },
      ],
      summary: [
        '복잡한 해외 판매, idus가 다 해드려요',
        '작가님은 딱 2가지만 하시면 됩니다',
      ],
      externalLinks: [
        {
          title: '글로벌 시작해야 하는 이유 (영상)',
          url: 'https://youtu.be/97NVKTTCTZU',
          icon: '▶️',
          description: '2분 만에 알아보기',
        },
        {
          title: '글로벌 작가님 후기 (ccnmade 작가님)',
          url: 'https://youtu.be/H8iRAmqdTzY',
          icon: '▶️',
          description: '실제 작가님의 경험담',
        },
      ],
    },
  },
  {
    id: 'logistics',
    stepId: 1,
    order: 2,
    title: '물류 안내',
    description: '배송 흐름과 물류센터 주소를 확인해요',
    type: 'video',
    duration: 3,
    content: {
      videoUrl: 'https://www.youtube.com/embed/35n47GhEsgs',
      sections: [
        {
          title: '배송 흐름',
          content:
            '작가님 발송 → idus 물류센터 → 검수/포장/통관 → 해외 배송\n\n작가님은 국내 물류센터까지만 보내주시면 됩니다!',
          highlight: true,
          icon: '📦',
          infographicId: 'shipping-flow',
        },
        {
          title: '배송 가능 국가 & 물류센터',
          content: '아래 인포그래픽에서 확인하세요',
          icon: '🌏',
          infographicId: 'logistics-info',
        },
      ],
      summary: [
        '국내 물류센터로 발송하면 끝',
        '45개국 배송 가능',
      ],
    },
  },
  {
    id: 'settlement',
    stepId: 1,
    order: 3,
    title: '정산 안내',
    description: '수수료와 정산 방식을 알아봐요',
    type: 'guide',
    duration: 3,
    content: {
      sections: [
        {
          title: '정산 기본 정보',
          content:
            '환율, 통화, 외화계좌... 신경 쓰실 필요 없습니다!\nidus 글로벌 정산은 작가님 국내 통장으로 원화 정산됩니다.',
          highlight: true,
          icon: '💵',
          infographicId: 'settlement-flow',
        },
        {
          title: '수수료 안내',
          content: '수수료는 등급에 따라 아래와 같이 적용됩니다.',
          importance: 'secondary',
          icon: '📊',
          table: {
            columns: ['수수료 항목', '일반', '프리미엄', '새싹', '국가 공인'],
            rows: [
              ['idus 수수료(동일)', '15%', '15%', '5%', '0%'],
              ['해외 PG(%)', '5%', '5%', '5%', '0%'],
              ['총 수수료', '20%', '20%', '10%', '0%'],
            ],
          },
        },
        {
          title: '부가세 영세율(0%) 적용',
          content:
            '해외 매출은 0%의 부가세율이 적용되어 납부 세액이 \'0\'입니다.\n\nidus 수수료에 대한 부가세를 환급 받을 수 있습니다.\n→ 영세율 적용/부가세 환급으로 해외 매출의 수익성이 더 좋습니다!',
          highlight: true,
          icon: '✅',
        },
      ],
      summary: [
        '월 2회 원화 정산 (외화계좌 불필요)',
        '해외 매출 부가세 0% + 환급 가능',
      ],
    },
  },
  {
    id: 'artist-registration',
    stepId: 1,
    order: 4,
    title: '글로벌 작가 등록하기',
    description: '작가웹에서 간단하게 신청 완료!',
    type: 'guide',
    duration: 2,
    content: {
      sections: [
        {
          title: '등록 경로 & 신청 조건',
          content:
            '작가웹에서 간단하게 글로벌 작가 등록을 완료하세요!',
          highlight: true,
          icon: '✈️',
          infographicId: 'registration-steps',
        },
        {
          title: 'TIP: 해외 고객 화면 확인하기',
          content:
            '구매자 앱에서 언어 설정을 영어/일본어로 변경하면\n해외 고객이 보는 화면을 미리 확인할 수 있어요!',
          importance: 'secondary',
          icon: '💡',
        },
      ],
      summary: [
        '작가웹 > 내 정보 > 글로벌 작가 관리',
        '본인 인증/정산계좌 필요',
      ],
      externalLinks: [
        {
          title: '구매자 앱 다운로드 / 언어 설정 가이드',
          url: 'https://artist-mate.idus.com/12a788bc-bb8d-420b-8ef7-4d6d049313c0',
          icon: '📲',
          description: '해외 고객 화면 확인하기',
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
            '기존 작품을 글로벌로 간단하게 전환하세요!',
          highlight: true,
          icon: '🚀',
          infographicId: 'product-setup-steps',
        },
      ],
      summary: [
        '글로벌 판매 ON → 영문(일본어) 정보 입력',
        '가격은 자동 환산, 배송비 무료',
      ],
    },
  },
  {
    id: 'sellable-items',
    stepId: 2,
    order: 2,
    title: '판매 가능/불가능 품목',
    description: '글로벌 판매 전에 꼭 확인해요!',
    type: 'guide',
    duration: 4,
    content: {
      sections: [
        {
          title: '어떤 작품을 팔 수 있나요?',
          content:
            '대부분의 핸드메이드 작품은 바로 판매 가능해요!\n일부 품목만 서류가 필요하거나 제한이 있습니다.',
          highlight: true,
          icon: '🏷️',
          infographicId: 'product-categories',
        },
        {
          title: 'MSDS 제출 필요 품목',
          content:
            '• 리튬이온 배터리 포함 전자기기\n• 염료/향료 첨가 캔들',
          importance: 'secondary',
          icon: 'warn',
          meta: [
            { label: '제출처', value: 'global_help@backpac.kr', copy: true },
            { label: '메일 제목', value: '[아이디어스글로벌] 작가명_MSDS 자료제출', copy: true },
          ],
        },
      ],
      summary: [
        '핸드메이드 작품 대부분 OK!',
        '식품/향수/배터리 등 일부 제한',
      ],
      externalLinks: [
        {
          title: '판매 가능/불가능 품목 상세 안내',
          url: 'https://artist-mate.idus.com/b5131e26-6b56-4f1a-81c0-83c9cd66ea9e',
          icon: 'info',
          description: '카테고리별 상세 확인',
        },
      ],
    },
  },
  {
    id: 'translation-guide',
    stepId: 2,
    order: 3,
    title: '쉽게 하는 번역 가이드',
    description: 'idus 공식 번역 프롬프트로 1분 만에 번역 완료!',
    type: 'guide',
    duration: 2,
    content: {
      sections: [
        {
          title: '번역, 이렇게 하면 쉬워요!',
          content: '작품 등록 번역과 고객 대화 번역은 방법이 달라요.\n상황에 맞는 번역 방법을 확인하세요.',
          highlight: true,
          icon: '🌐',
          infographicId: 'translation-choice',
        },
        {
          title: 'idus 공식 번역 프롬프트',
          content: '작품 등록 시 ChatGPT에 붙여넣어 사용하세요!\n일본어/영어 프롬프트를 복사해서 사용하면 자연스러운 번역이 완성됩니다.',
          highlight: true,
          icon: '✨',
          infographicId: 'translation-prompt',
        },
        {
          title: '번역 팁',
          content:
            '• 짧고 명확하게 써요\n• 사이즈는 cm, 무게는 g 단위로 써요\n• 번역한 뒤 한 번만 확인하면 좋아요',
          importance: 'secondary',
          icon: '💡',
        },
      ],
      summary: [
        'idus 공식 프롬프트 + ChatGPT = 1분 번역',
        '고객 대화는 앱 자동 번역으로 OK',
      ],
    },
  },
];

// STEP 3: 주문 관리 & 운영하기 (4개)
export const STEP3_CONTENTS: ContentItem[] = [
  {
    id: 'order-processing',
    stepId: 3,
    order: 1,
    title: '주문 확인 & 발송',
    description: '글로벌 주문이 들어오면 이렇게 진행돼요',
    type: 'guide',
    duration: 3,
    content: {
      sections: [
        {
          title: '주문 확인하기',
          content:
            '작가 앱 → 주문 관리 → 글로벌 주문에서 확인\n\n💡 TIP: 푸시 알림을 켜두시면 주문 알림을 바로 받을 수 있어요!',
          highlight: true,
          icon: '📱',
        },
        {
          title: '⚠️ 주문 단위 분리 입고 필수!',
          content:
            '같은 고객이라도 주문번호가 다르면 별도 포장이 필수입니다.\n합포장 시 통관이 불가하여 출고가 지연될 수 있어요.',
          highlight: true,
          icon: '📦',
          infographicId: 'order-separation',
        },
        {
          title: '🎁 사은품도 옵션 등록이 필수!',
          content:
            '옵션으로 등록되지 않은 사은품은 입고 내역으로 확인이 불가해요.\n0원 옵션으로 등록해야 검수 및 출고가 가능합니다.',
          highlight: true,
          icon: '🎁',
          infographicId: 'gift-option',
        },
        {
          title: '이후 과정은 idus가 진행해요',
          content:
            '물류센터 도착 → 검수/포장 → 해외 발송 → 배송 현황 자동 안내\n\n작가님은 국내 물류센터까지만 보내주시면 됩니다 😊',
          icon: '🌏',
        },
      ],
      summary: [
        '주문 단위로 분리 포장 필수!',
        '사은품은 0원 옵션으로 등록',
        '해외 배송은 idus가 진행해드려요',
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
    duration: 2,
    content: {
      sections: [
        {
          title: '자동 번역으로 쉽게 소통해요',
          content:
            'idus 앱 내 채팅은 자동 번역을 지원해요.\n한국어로 답변하시면 고객에게 번역되어 전달됩니다.',
          highlight: true,
          icon: '🔄',
          infographicId: 'auto-translation',
        },
        {
          title: '자주 묻는 질문 답변 예시',
          content:
            '• 배송 기간: "약 7-14일 소요돼요"\n• 교환/환불: "도착 후 7일 이내 가능해요"\n• 사이즈: 정확한 치수를 안내해요',
          icon: '💬',
        },
      ],
      summary: [
        '한국어로 답변 → 자동 번역!',
        '친절하고 명확하게',
      ],
    },
  },
  {
    id: 'sales-tips',
    stepId: 3,
    order: 3,
    title: '글로벌 판매 TIP',
    description: '해외 고객 특성과 판매 노하우를 알아봐요',
    type: 'guide',
    duration: 2,
    content: {
      sections: [
        {
          title: '해외 고객 특성 한눈에 보기',
          content:
            '고객별 맞춤 대응으로 만족도 UP!',
          highlight: true,
          icon: '🌏',
          infographicId: 'customer-comparison',
        },
      ],
      summary: [
        '일본: 상세 설명 + 포장 퀄리티',
        '영어권: 간결한 설명 + 정확한 사이즈',
      ],
    },
  },
  {
    id: 'document-guide',
    stepId: 3,
    order: 4,
    title: '소포수령증 안내',
    description: '해외 판매 증빙 서류 발급 방법',
    type: 'guide',
    duration: 2,
    content: {
      sections: [
        {
          title: '소포수령증이란?',
          content:
            '해외 판매/입출고 증빙 자료로,\n부가세 신고 및 매출 증빙에 활용할 수 있어요.',
          icon: '📄',
        },
        {
          title: '신청 방법',
          content:
            '매월 초 대상 작가님께 별도 안내 메일이 발송됩니다.\n메일에 포함된 링크를 통해 신청해주세요.\n\n• 신청 기간: 매월 1일~7일\n• 대상: 전월 말일까지 선적 완료된 주문건',
          highlight: true,
          icon: '📧',
        },
        {
          title: '안내',
          content:
            '신청 대상 여부/신청 링크는 매월 초 발송되는 안내 메일에서 확인하실 수 있어요.',
          importance: 'secondary',
          icon: 'info',
        },
      ],
      summary: [
        '매월 초 안내 메일로 신청 (1일~7일)',
        '부가세 신고/매출 증빙용',
      ],
      externalLinks: [
        {
          title: '소포수령증 신청 가이드 (상세)',
          url: 'https://artist-mate.idus.com/3f7bd50b-6cb7-423d-9058-ba8b4be46909',
          icon: '📄',
          description: '신청 절차 및 양식 확인',
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
