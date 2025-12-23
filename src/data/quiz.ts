// 퀴즈 데이터

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctAnswer: string;
  explanation: string;
  relatedStep: number;
}

export interface QuizOption {
  id: string;
  text: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: '글로벌 판매 시 해외 배송비는 누가 부담하나요?',
    options: [
      { id: 'a', text: '작가님이 부담' },
      { id: 'b', text: '0원! idus가 처리' },
      { id: 'c', text: '고객이 부담' },
    ],
    correctAnswer: 'b',
    explanation: '해외 배송비는 0원입니다! 작가님은 국내 물류센터까지만 보내시면 돼요.',
    relatedStep: 1,
  },
  {
    id: 'q2',
    question: 'idus 글로벌은 몇 개국에 판매할 수 있나요?',
    options: [
      { id: 'a', text: '10개국' },
      { id: 'b', text: '25개국' },
      { id: 'c', text: '45개국' },
    ],
    correctAnswer: 'c',
    explanation: '미국, 일본, 영국 등 전 세계 45개국에 판매할 수 있습니다!',
    relatedStep: 1,
  },
  {
    id: 'q3',
    question: '글로벌 판매가 불가능한 품목은?',
    options: [
      { id: 'a', text: '악세서리/주얼리' },
      { id: 'b', text: '화장품/뷰티' },
      { id: 'c', text: '캔들/디퓨저' },
    ],
    correctAnswer: 'b',
    explanation: '화장품/뷰티 제품은 현재 글로벌 판매가 불가능해요. 식품, 의약품도 마찬가지입니다.',
    relatedStep: 2,
  },
  {
    id: 'q4',
    question: '글로벌 정산은 언제 이루어지나요?',
    options: [
      { id: 'a', text: '매주 금요일' },
      { id: 'b', text: '월 2회 (1일, 16일)' },
      { id: 'c', text: '매월 말일' },
    ],
    correctAnswer: 'b',
    explanation: '월 2회(1일, 16일) 원화로 정산됩니다. 환전 걱정 없이 편하게 받으세요!',
    relatedStep: 1,
  },
  {
    id: 'q5',
    question: '해외 고객 문의에 어떻게 답변하나요?',
    options: [
      { id: 'a', text: '영어로만 답변해야 해요' },
      { id: 'b', text: '한국어로 답변하면 자동 번역됩니다' },
      { id: 'c', text: '답변할 수 없어요' },
    ],
    correctAnswer: 'b',
    explanation: 'idus 앱 내 채팅은 자동 번역을 지원합니다. 한국어로 답변하시면 고객에게는 영어/일본어로 전달됩니다.',
    relatedStep: 3,
  },
];

export function getQuizQuestions(): QuizQuestion[] {
  return QUIZ_QUESTIONS;
}

export function getQuizQuestionById(id: string): QuizQuestion | undefined {
  return QUIZ_QUESTIONS.find(q => q.id === id);
}

export function getQuizQuestionsByStep(stepId: number): QuizQuestion[] {
  return QUIZ_QUESTIONS.filter(q => q.relatedStep === stepId);
}

