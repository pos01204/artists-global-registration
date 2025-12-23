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
  const initialProgress: LearningProgress = {
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
  } else if (
    artistInfo.categories.length === 0 ||
    (artistInfo.interestedIn2026.food && artistInfo.interestedIn2026.digital && artistInfo.categories.length === 0)
  ) {
    qualificationStatus = 'restricted_category';
  }
  
  const data: OnboardingData = {
    ...artistInfo,
    qualificationStatus,
    learningProgress: initialProgress,
    registrationClicked: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  saveOnboardingData(data);
  return data;
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

