// 카테고리 정의

export interface Category {
  id: string;
  name: string;
  emoji: string;
  isAvailable: boolean;
  is2026Expansion?: boolean;
  description?: string;
}

// 글로벌 판매 가능 카테고리
export const AVAILABLE_CATEGORIES: Category[] = [
  { id: 'accessory', name: '악세서리/주얼리', emoji: '💍', isAvailable: true },
  { id: 'bag', name: '가방/지갑/파우치', emoji: '👜', isAvailable: true },
  { id: 'fashion', name: '패션소품', emoji: '🧣', isAvailable: true },
  { id: 'interior', name: '인테리어/소품', emoji: '🏠', isAvailable: true },
  { id: 'stationery', name: '문구/팬시', emoji: '✏️', isAvailable: true },
  { id: 'candle', name: '캔들/디퓨저', emoji: '🕯️', isAvailable: true },
  { id: 'ceramic', name: '도자기/그릇', emoji: '🍶', isAvailable: true },
  { id: 'clothing', name: '의류/패브릭', emoji: '👕', isAvailable: true },
  { id: 'art', name: '회화/일러스트', emoji: '🎨', isAvailable: true },
  { id: 'craft', name: '공예품', emoji: '🧵', isAvailable: true },
];

// 2026년 확장 예정 카테고리
export const EXPANSION_2026_CATEGORIES: Category[] = [
  { 
    id: 'food', 
    name: '식품', 
    emoji: '🍽️', 
    isAvailable: false, 
    is2026Expansion: true,
    description: '2026년 글로벌 확장 예정'
  },
  { 
    id: 'digital', 
    name: '디지털 작품', 
    emoji: '🎨', 
    isAvailable: false, 
    is2026Expansion: true,
    description: '캐리커쳐 등 이미지 파일 전송 가능 카테고리, 2026년 확장 예정'
  },
];

// 글로벌 판매 불가 카테고리
export const PROHIBITED_CATEGORIES: Category[] = [
  { id: 'cosmetic', name: '화장품/뷰티', emoji: '💄', isAvailable: false },
  { id: 'medicine', name: '의약품/건강기능식품', emoji: '💊', isAvailable: false },
  { id: 'plant', name: '동식물/씨앗', emoji: '🌱', isAvailable: false },
];

// 전체 카테고리 가져오기
export function getAllCategories(): Category[] {
  return [...AVAILABLE_CATEGORIES, ...EXPANSION_2026_CATEGORIES, ...PROHIBITED_CATEGORIES];
}

// 선택 가능한 카테고리 (폼에서 사용)
export function getSelectableCategories(): Category[] {
  return [...AVAILABLE_CATEGORIES, ...EXPANSION_2026_CATEGORIES];
}

// 자격 확인 로직
export function checkCategoryQualification(selectedCategories: string[]): {
  isQualified: boolean;
  has2026Only: boolean;
  hasAvailable: boolean;
} {
  const availableIds = AVAILABLE_CATEGORIES.map(c => c.id);
  const expansion2026Ids = EXPANSION_2026_CATEGORIES.map(c => c.id);
  
  const hasAvailable = selectedCategories.some(id => availableIds.includes(id));
  const has2026Only = selectedCategories.every(id => expansion2026Ids.includes(id)) && selectedCategories.length > 0;
  
  return {
    isQualified: hasAvailable,
    has2026Only,
    hasAvailable,
  };
}

