'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { AVAILABLE_CATEGORIES, RESTRICTED_CATEGORIES, ArtistInfo } from '@/types/onboarding';
import { initOnboardingData } from '@/lib/storage';
import Image from 'next/image';
import BrandIcon, { BrandIconName } from '@/components/ui/BrandIcon';
import { IconArrowRight } from '@/components/ui/icons';
import { useToast } from '@/components/ui/ToastProvider';

export default function ArtistInfoForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState<ArtistInfo>({
    artistName: '',
    phoneNumber: '',
    hasBusinessNumber: false,
    categories: [],
    interestedIn2026: {
      food: false,
      digital: false,
    },
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [businessNumberDecided, setBusinessNumberDecided] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.artistName.trim()) {
      newErrors.artistName = '작가명(브랜드명)을 입력해주세요';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = '연락처를 입력해주세요';
    } else if (!/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/.test(formData.phoneNumber.replace(/-/g, ''))) {
      newErrors.phoneNumber = '올바른 휴대폰 번호를 입력해주세요';
    }

    if (!businessNumberDecided) {
      newErrors.businessNumber = '사업자등록번호 보유 여부를 선택해주세요';
    }

    if (formData.categories.length === 0 && !formData.interestedIn2026.food && !formData.interestedIn2026.digital) {
      newErrors.categories = '최소 하나 이상의 카테고리를 선택해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCategoryToggle = (categoryId: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(c => c !== categoryId)
        : [...prev.categories, categoryId],
    }));
    setErrors(prev => ({ ...prev, categories: '' }));
  };

  const handle2026Toggle = (type: 'food' | 'digital') => {
    setFormData(prev => ({
      ...prev,
      interestedIn2026: {
        ...prev.interestedIn2026,
        [type]: !prev.interestedIn2026[type],
      },
    }));
    setErrors(prev => ({ ...prev, categories: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // 데이터 저장 및 자격 상태 결정
      const data = initOnboardingData(formData);

      toast({
        type: 'success',
        title: '정보 저장 완료',
        description: '이제 글로벌 판매 가능 여부를 확인할게요.',
      });
      
      // 자격 상태에 따라 라우팅
      if (data.qualificationStatus === 'no_business') {
        router.push('/qualification/no-business');
      } else if (data.qualificationStatus === 'restricted_category') {
        router.push('/qualification/2026-waitlist');
      } else {
        router.push('/qualification');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      toast({
        type: 'error',
        title: '저장에 실패했어요',
        description: '잠시 후 다시 시도해주세요.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 작가 정보 입력 */}
      <Card variant="outlined" className="space-y-6">
        <h2 className="text-xl font-bold text-idus-black flex items-center gap-2">
          ✍️ 작가님 정보를 입력해주세요
        </h2>
        
        <Input
          label="작가명 (브랜드명)"
          placeholder="예: 핸드메이드 공방, 김작가"
          value={formData.artistName}
          onChange={(e) => {
            setFormData(prev => ({ ...prev, artistName: e.target.value }));
            setErrors(prev => ({ ...prev, artistName: '' }));
          }}
          error={errors.artistName}
          required
        />

        <Input
          label="연락처 (휴대폰 번호)"
          placeholder="010-0000-0000"
          value={formData.phoneNumber}
          onChange={(e) => {
            setFormData(prev => ({ ...prev, phoneNumber: e.target.value }));
            setErrors(prev => ({ ...prev, phoneNumber: '' }));
          }}
          error={errors.phoneNumber}
          required
        />
      </Card>

      {/* 사업자 등록 여부 */}
      <Card variant="outlined" className="space-y-4">
        <h2 className="text-xl font-bold text-idus-black flex items-center gap-2">
          📋 사업자등록번호를 보유하고 계신가요?
          <span className="text-idus-orange text-sm">*</span>
        </h2>
        <p className="text-sm text-idus-black-50">
          글로벌 작가 등록을 위해서는 사업자등록이 필요합니다
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => {
              setFormData(prev => ({ ...prev, hasBusinessNumber: true }));
              setBusinessNumberDecided(true);
              setErrors(prev => ({ ...prev, businessNumber: '' }));
            }}
            className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
              businessNumberDecided && formData.hasBusinessNumber
                ? 'border-idus-orange bg-idus-orange-light/30'
                : 'border-idus-black-20 hover:border-idus-orange'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                businessNumberDecided && formData.hasBusinessNumber
                  ? 'border-idus-orange bg-idus-orange'
                  : 'border-idus-black-20'
              }`}>
                {businessNumberDecided && formData.hasBusinessNumber && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <span className="font-medium">네, 보유하고 있습니다</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setFormData(prev => ({ ...prev, hasBusinessNumber: false }));
              setBusinessNumberDecided(true);
              setErrors(prev => ({ ...prev, businessNumber: '' }));
            }}
            className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
              businessNumberDecided && !formData.hasBusinessNumber
                ? 'border-idus-orange bg-idus-orange-light/30'
                : 'border-idus-black-20 hover:border-idus-orange'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                businessNumberDecided && !formData.hasBusinessNumber
                  ? 'border-idus-orange bg-idus-orange'
                  : 'border-idus-black-20'
              }`}>
                {businessNumberDecided && !formData.hasBusinessNumber && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <span className="font-medium">아니오, 아직 없습니다</span>
            </div>
          </button>
        </div>
        {errors.businessNumber && (
          <p className="text-sm text-red-500">{errors.businessNumber}</p>
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
                onClick={() => handleCategoryToggle(category.id)}
                className={`p-3 rounded-xl border-2 transition-all duration-300 text-center ${
                  formData.categories.includes(category.id)
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
                onClick={() => handle2026Toggle(category.id as 'food' | 'digital')}
                className={`p-4 rounded-xl border-2 border-dashed transition-all duration-300 text-left ${
                  formData.interestedIn2026[category.id as 'food' | 'digital']
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

        {errors.categories && (
          <p className="text-sm text-red-500">{errors.categories}</p>
        )}
      </Card>

      {/* 제출 버튼 */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        isLoading={isLoading}
      >
        시작하기
        <IconArrowRight className="w-4 h-4" />
      </Button>
    </form>
  );
}

