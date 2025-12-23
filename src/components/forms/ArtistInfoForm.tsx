'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { AVAILABLE_CATEGORIES, RESTRICTED_CATEGORIES, ArtistInfo } from '@/types/onboarding';
import { initOnboardingData } from '@/lib/storage';
import BrandIcon, { BrandIconName } from '@/components/ui/BrandIcon';
import { IconArrowRight } from '@/components/ui/icons';
import { useToast } from '@/components/ui/ToastProvider';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { artistInfoSchema, ArtistInfoFormValues } from '@/components/forms/artistInfoSchema';
import { AlertTriangle } from 'lucide-react';
import Tooltip from '@/components/ui/Tooltip';

export default function ArtistInfoForm() {
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    setFocus,
  } = useForm<ArtistInfoFormValues>({
    resolver: zodResolver(artistInfoSchema),
    defaultValues: {
      artistName: '',
      phoneNumber: '',
      // 선택 전에는 undefined로 두어 required_error가 동작하게 함
      hasBusinessNumber: undefined as unknown as boolean,
      categories: [],
      interestedIn2026: { food: false, digital: false },
    },
    mode: 'onBlur',
  });

  const categories = watch('categories') ?? [];
  const interested = watch('interestedIn2026');
  const hasBusinessNumber = watch('hasBusinessNumber');

  const businessNumberDecided = typeof hasBusinessNumber === 'boolean';

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 3) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  };

  const toggleCategory = (categoryId: string) => {
    const next = categories.includes(categoryId)
      ? categories.filter(c => c !== categoryId)
      : [...categories, categoryId];
    setValue('categories', next, { shouldValidate: true });
  };

  const toggle2026 = (type: 'food' | 'digital') => {
    setValue(`interestedIn2026.${type}`, !interested?.[type], { shouldValidate: true });
  };

  const onValid = async (values: ArtistInfoFormValues) => {
    try {
      const payload: ArtistInfo = {
        artistName: values.artistName.trim(),
        phoneNumber: values.phoneNumber.replace(/-/g, ''),
        hasBusinessNumber: Boolean(values.hasBusinessNumber),
        categories: values.categories ?? [],
        interestedIn2026: values.interestedIn2026,
      };

      const data = initOnboardingData(payload);

      toast({
        type: 'success',
        title: '정보 저장 완료',
        description: '이제 글로벌 판매 가능 여부를 확인할게요.',
      });

      if (data.qualificationStatus === 'no_business') router.push('/qualification/no-business');
      else if (data.qualificationStatus === 'restricted_category') router.push('/qualification/2026-waitlist');
      else router.push('/qualification');
    } catch (error) {
      console.error('Error saving data:', error);
      toast({ type: 'error', title: '저장에 실패했어요', description: '잠시 후 다시 시도해주세요.' });
    }
  };

  const onInvalid = (invalid: any) => {
    // 에러가 발생한 첫 필드로 포커스 이동
    if (invalid?.artistName) setFocus('artistName');
    else if (invalid?.phoneNumber) setFocus('phoneNumber');

    toast({
      type: 'warning',
      title: '입력값을 확인해주세요',
      description: '필수 항목을 채워야 다음 단계로 진행할 수 있어요.',
    });
  };

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)} className="space-y-8">
      {/* 작가 정보 입력 */}
      <Card variant="outlined" className="space-y-6">
        <h2 className="text-xl font-bold text-idus-black flex items-center gap-2">
          <BrandIcon name="stationery" size={22} alt="" />
          작가님 정보를 입력해주세요
        </h2>
        
        <Input
          label="작가명 (브랜드명)"
          placeholder="예: 핸드메이드 공방, 김작가"
          {...register('artistName')}
          error={errors.artistName?.message}
          required
        />

        <Input
          label="연락처 (휴대폰 번호)"
          placeholder="010-0000-0000"
          inputMode="tel"
          autoComplete="tel"
          {...register('phoneNumber', {
            onChange: (e) => {
              const v = formatPhone(e.target.value);
              setValue('phoneNumber', v, { shouldValidate: false, shouldDirty: true });
            },
          })}
          error={errors.phoneNumber?.message}
          required
        />
      </Card>

      {/* 사업자 등록 여부 */}
      <Card variant="outlined" className="space-y-4">
        <h2 className="text-xl font-bold text-idus-black flex items-center gap-2">
          <BrandIcon name="best" size={22} alt="" />
          사업자등록번호를 보유하고 계신가요?
          <span className="text-idus-orange text-sm">*</span>
          <Tooltip
            content={
              <div className="space-y-1">
                <div className="font-semibold text-idus-black">왜 필요한가요?</div>
                <div>해외 판매 정산/세금 처리 및 증빙을 위해 사업자등록이 필요합니다.</div>
              </div>
            }
          />
        </h2>
        <p className="text-sm text-idus-black-50">
          글로벌 작가 등록을 위해서는 사업자등록이 필요합니다
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => {
              setValue('hasBusinessNumber', true, { shouldValidate: true });
            }}
            className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
              businessNumberDecided && hasBusinessNumber === true
                ? 'border-idus-orange bg-idus-orange-light/30'
                : 'border-idus-black-20 hover:border-idus-orange'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                businessNumberDecided && hasBusinessNumber === true
                  ? 'border-idus-orange bg-idus-orange'
                  : 'border-idus-black-20'
              }`}>
                {businessNumberDecided && hasBusinessNumber === true && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <span className="font-medium">네, 보유하고 있습니다</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setValue('hasBusinessNumber', false, { shouldValidate: true });
            }}
            className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
              businessNumberDecided && hasBusinessNumber === false
                ? 'border-idus-orange bg-idus-orange-light/30'
                : 'border-idus-black-20 hover:border-idus-orange'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                businessNumberDecided && hasBusinessNumber === false
                  ? 'border-idus-orange bg-idus-orange'
                  : 'border-idus-black-20'
              }`}>
                {businessNumberDecided && hasBusinessNumber === false && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <span className="font-medium">아니오, 아직 없습니다</span>
            </div>
          </button>
        </div>
        {errors.hasBusinessNumber?.message && (
          <p className="text-sm text-red-500">{errors.hasBusinessNumber.message}</p>
        )}
      </Card>

      {/* 카테고리 선택 */}
      <Card variant="outlined" className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-idus-black flex items-center gap-2">
            <BrandIcon name="jewelry" size={24} alt="" />
            주로 판매하시는 카테고리를 선택해주세요
            <span className="text-idus-orange text-sm">*</span>
          </h2>
          <p className="text-sm text-idus-black-50 mt-1">
            복수 선택 가능합니다
          </p>
        </div>

        {/* 판매 가능 카테고리 */}
        <div>
          <h3 className="text-sm font-semibold text-idus-black-70 mb-3">판매 가능 카테고리</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {AVAILABLE_CATEGORIES.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => toggleCategory(category.id)}
                className={`p-3 rounded-xl border-2 transition-all duration-300 text-center ${
                  categories.includes(category.id)
                    ? 'border-idus-orange bg-idus-orange-light/30'
                    : 'border-idus-black-10 hover:border-idus-orange'
                }`}
              >
                <span className="block mb-1">
                  <BrandIcon name={category.icon as BrandIconName} size={28} alt="" className="mx-auto" />
                </span>
                <span className="text-xs font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2026 확장 예정 카테고리 */}
        <div>
          <h3 className="text-sm font-semibold text-idus-black-70 mb-3 flex items-center gap-2">
            <BrandIcon name="best" size={20} alt="" />
            2026년 확장 예정 카테고리
            <span className="text-xs text-idus-black-50 font-normal">(관심 있으시면 선택해주세요)</span>
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {RESTRICTED_CATEGORIES.filter(c => c.note === '2026년 확장 예정').map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => toggle2026(category.id as 'food' | 'digital')}
                className={`p-4 rounded-xl border-2 border-dashed transition-all duration-300 text-left ${
                  Boolean(interested?.[category.id as 'food' | 'digital'])
                    ? 'border-idus-orange bg-idus-orange-light/20'
                    : 'border-idus-black-20 hover:border-idus-orange'
                }`}
              >
                <div className="flex items-center gap-3">
                  <BrandIcon name={category.icon as BrandIconName} size={28} alt="" />
                  <div>
                    <span className="font-medium block">{category.name}</span>
                    <span className="text-xs text-idus-orange">{category.note}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {errors.categories?.message && (
          <div className="text-sm text-red-600 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 mt-0.5" />
            <span>{errors.categories.message}</span>
          </div>
        )}
      </Card>

      {/* 제출 버튼 */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        isLoading={isSubmitting}
      >
        시작하기
        <IconArrowRight className="w-4 h-4" />
      </Button>
    </form>
  );
}

