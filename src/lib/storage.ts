// 로컬 스토리지 관리

import { OnboardingData, ArtistInfo, LearningProgress } from '@/types/onboarding';

const STORAGE_KEY = 'idus_global_onboarding';

export function getOnboardingData(): OnboardingData | null {
  if (typeof window === 'undefined') return null;
  
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;
  
  try {
    const parsed = JSON.parse(data);
    // Date 객체 복원
    if (parsed.createdAt) parsed.createdAt = new Date(parsed.createdAt);
    if (parsed.updatedAt) parsed.updatedAt = new Date(parsed.updatedAt);
    if (parsed.learningProgress?.completedAt) {
      parsed.learningProgress.completedAt = new Date(parsed.learningProgress.completedAt);
    }
    return parsed;
  } catch {
    return null;
  }
}

export function saveOnboardingData(data: Partial<OnboardingData>): void {
  if (typeof window === 'undefined') return;
  
  const existing = getOnboardingData();
  const updated = {
    ...existing,
    ...data,
    updatedAt: new Date(),
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function initOnboardingData(artistInfo: ArtistInfo): OnboardingData {
  // 기존 데이터 확인 (전화번호로 식별)
  const existing = getOnboardingData();
  const isSameUser = existing && normalizePhoneNumber(existing.phoneNumber) === normalizePhoneNumber(artistInfo.phoneNumber);
  
  // 기존 진행 상태 유지 또는 초기화
  const learningProgress: LearningProgress = isSameUser && existing.learningProgress
    ? existing.learningProgress
    : {
        step1Completed: false,
        step2Completed: false,
        step3Completed: false,
        quizCompleted: false,
        quizScore: 0,
      };
  
  // 자격 상태 결정
  let qualificationStatus: OnboardingData['qualificationStatus'] = 'qualified';
  
  if (!artistInfo.hasBusinessNumber) {
    qualificationStatus = 'no_business';
  } else if (artistInfo.categories.length === 0 && (artistInfo.interestedIn2026.food || artistInfo.interestedIn2026.digital)) {
    // 판매 가능 카테고리는 없고(=글로벌 판매 바로 시작 불가),
    // 2026 확장 예정 카테고리(식품/디지털)만 관심 선택한 경우
    qualificationStatus = 'restricted_category';
  }
  
  const data: OnboardingData = {
    ...artistInfo,
    qualificationStatus,
    learningProgress,
    registrationClicked: isSameUser ? (existing.registrationClicked ?? false) : false,
    createdAt: isSameUser && existing.createdAt ? existing.createdAt : new Date(),
    updatedAt: new Date(),
  };
  
  saveOnboardingData(data);
  return data;
}

// 전화번호 정규화 (비교용)
function normalizePhoneNumber(phone: string): string {
  if (!phone) return '';
  let digits = phone.replace(/[^\d]/g, '');
  // 선행 0이 없는 경우 보정 (예: 1012345678 -> 01012345678)
  if (digits.length === 10 && digits.startsWith('10')) {
    digits = `0${digits}`;
  }
  return digits;
}

export function updateLearningProgress(progress: Partial<LearningProgress>): void {
  const existing = getOnboardingData();
  if (!existing) return;
  
  saveOnboardingData({
    learningProgress: {
      ...existing.learningProgress,
      ...progress,
    },
  });
}

export function markStepCompleted(stepId: number): void {
  const stepKey = `step${stepId}Completed` as keyof LearningProgress;
  updateLearningProgress({ [stepKey]: true });
}

export function markQuizCompleted(score: number): void {
  updateLearningProgress({
    quizCompleted: true,
    quizScore: score,
  });
}

export function markLearningCompleted(): void {
  updateLearningProgress({
    completedAt: new Date(),
  });
}

export function markRegistrationClicked(): void {
  saveOnboardingData({ registrationClicked: true });
}

export function clearOnboardingData(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

// 진행률 계산
export function calculateProgress(): number {
  const data = getOnboardingData();
  if (!data) return 0;
  
  const { learningProgress } = data;
  let completed = 0;
  const total = 4; // 3 steps + quiz
  
  if (learningProgress.step1Completed) completed++;
  if (learningProgress.step2Completed) completed++;
  if (learningProgress.step3Completed) completed++;
  if (learningProgress.quizCompleted) completed++;
  
  return Math.round((completed / total) * 100);
}

// 학습 완료 여부 확인
export function isLearningCompleted(): boolean {
  const data = getOnboardingData();
  if (!data) return false;
  
  const { learningProgress } = data;
  return (
    learningProgress.step1Completed &&
    learningProgress.step2Completed &&
    learningProgress.step3Completed &&
    learningProgress.quizCompleted
  );
}

// 콘텐츠 진행 상태 관리
const PROGRESS_KEY = 'idus_content_progress';

export interface ContentProgress {
  completedContents: string[];
  completedSteps: number[];
  startedAt?: Date;
}

export function getProgress(): ContentProgress {
  if (typeof window === 'undefined') {
    return { completedContents: [], completedSteps: [] };
  }
  
  const data = localStorage.getItem(PROGRESS_KEY);
  if (!data) {
    return { completedContents: [], completedSteps: [] };
  }
  
  try {
    return JSON.parse(data);
  } catch {
    return { completedContents: [], completedSteps: [] };
  }
}

export function saveProgress(progress: ContentProgress): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

export function markContentComplete(contentId: string): void {
  const progress = getProgress();
  if (!progress.completedContents.includes(contentId)) {
    progress.completedContents.push(contentId);
    if (!progress.startedAt) {
      progress.startedAt = new Date();
    }
    saveProgress(progress);
  }
}

export function markStepComplete(stepId: number): void {
  const progress = getProgress();
  if (!progress.completedSteps.includes(stepId)) {
    progress.completedSteps.push(stepId);
    saveProgress(progress);
  }
  
  // 기존 온보딩 데이터에도 반영
  markStepCompleted(stepId);
}

export function isContentCompleted(contentId: string): boolean {
  const progress = getProgress();
  return progress.completedContents.includes(contentId);
}

export function isStepCompleted(stepId: number): boolean {
  const progress = getProgress();
  return progress.completedSteps.includes(stepId);
}

export function resetProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PROGRESS_KEY);
}

