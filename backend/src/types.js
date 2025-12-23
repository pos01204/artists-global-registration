import { z } from 'zod';

export const OnboardingSnapshotSchema = z.object({
  artistName: z.string().min(1),
  phoneNumber: z.string().min(1),
  hasBusinessNumber: z.boolean(),
  categories: z.array(z.string()).default([]),
  // 호환: interestedIn2026(현재 프론트) 또는 interested2026Food/Digital(레거시)
  interestedIn2026: z
    .object({
      food: z.boolean(),
      digital: z.boolean(),
    })
    .optional(),
  interested2026Food: z.boolean().optional(),
  interested2026Digital: z.boolean().optional(),
  qualificationStatus: z.string(),
  learningProgress: z
    .object({
      step1Completed: z.boolean(),
      step2Completed: z.boolean(),
      step3Completed: z.boolean(),
      quizCompleted: z.boolean(),
      quizScore: z.number(),
      completedAt: z.any().optional(),
      totalTimeMinutes: z.number().optional(),
    })
    .optional(),
  // 호환: 레거시 플랫 필드
  step1Completed: z.any().optional(),
  step2Completed: z.any().optional(),
  step3Completed: z.any().optional(),
  quizCompleted: z.any().optional(),
  quizScore: z.any().optional(),
  registrationClicked: z.boolean().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export const EventSchema = z.object({
  eventType: z.string().min(1),
  payload: z.unknown(),
});


