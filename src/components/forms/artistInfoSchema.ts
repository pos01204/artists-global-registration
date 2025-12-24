import { z } from 'zod';

const phoneRegex = /^01[0-9][0-9]{7,8}$/;

export const artistInfoSchema = z
  .object({
    artistName: z.string().trim().min(1, '작가명(브랜드명)을 입력해주세요'),
    phoneNumber: z
      .string()
      .trim()
      .min(1, '연락처를 입력해주세요')
      .transform(v => v.replace(/-/g, ''))
      .refine(v => phoneRegex.test(v), '올바른 휴대폰 번호를 입력해주세요'),
    hasBusinessNumber: z
      .boolean({ required_error: '사업자등록번호 보유 여부를 선택해주세요' }),
    categories: z.array(z.string()).default([]),
    interestedIn2026: z.object({
      food: z.boolean().default(false),
      digital: z.boolean().default(false),
    }),
  })
  .superRefine((v, ctx) => {
    const hasAnyCategory = v.categories.length > 0 || v.interestedIn2026.food || v.interestedIn2026.digital;
    if (!hasAnyCategory) {
      ctx.addIssue({
        code: 'custom',
        path: ['categories'],
        message: '최소 하나 이상의 카테고리를 선택해주세요',
      });
    }
  });

export type ArtistInfoFormValues = z.infer<typeof artistInfoSchema>;




