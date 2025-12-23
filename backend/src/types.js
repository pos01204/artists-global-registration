import { z } from 'zod';

export const OnboardingSnapshotSchema = z.object({
  artistName: z.string().min(1),
  phoneNumber: z.string().min(1),
  hasBusinessNumber: z.boolean(),
  categories: z.array(z.string()).default([]),
  interestedIn2026: z.object({
    food: z.boolean(),
    digital: z.boolean(),
  }),
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
  registrationClicked: z.boolean().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export const EventSchema = z.object({
  eventType: z.string().min(1),
  payload: z.unknown(),
});


