'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { getOnboardingData } from '@/lib/storage';
import { OnboardingData } from '@/types/onboarding';
import { submitOnboardingData } from '@/lib/api';
import { AVAILABLE_CATEGORIES, RESTRICTED_CATEGORIES } from '@/types/onboarding';
import { IconArrowRight, IconCheck } from '@/components/ui/icons';
import BrandIcon from '@/components/ui/BrandIcon';
import { useToast } from '@/components/ui/ToastProvider';
import ProcessSteps from '@/components/ui/ProcessSteps';
import { BookOpen, Plane } from 'lucide-react';

// 카테고리 ID → 이름 매핑 (string 키 타입으로 명시)
const categoryNameById: Map<string, string> = new Map(
  [...AVAILABLE_CATEGORIES, ...RESTRICTED_CATEGORIES].map(c => [c.id, c.name])
);

export default function QualificationPage() {
  const router = useRouter();
  const [data, setData] = useState<OnboardingData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const onboardingData = getOnboardingData();
    if (!onboardingData) {
      router.push('/');
      return;
    }
    setData(onboardingData);

    // 데이터 제출
    submitOnboardingData(onboardingData).then((r) => {
      if (!r.success) {
        toast({
          type: 'warning',
          title: '진행 정보 저장이 원활하지 않아요',
          description: '학습은 계속 진행할 수 있어요. 네트워크/설정 확인이 필요할 수 있어요.',
        });
        // eslint-disable-next-line no-console
        console.warn('[submit] qualification failed:', r);
      }
    });

    // 자격 상태에 따라 리다이렉트
    if (onboardingData.qualificationStatus === 'no_business') {
      router.push('/qualification/no-business');
    } else if (onboardingData.qualificationStatus === 'restricted_category') {
      router.push('/qualification/2026-waitlist');
    }
  }, [router, toast]);

  const handleStartLearning = () => {
    router.push('/learn');
  };

  if (!data || data.qualificationStatus !== 'qualified') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-idus-orange border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/brand/Rebranding Design Resources/Rebranding Design Resources/01. BI/logo_without_BG.png"
              alt="idus"
              width={80}
              height={32}
              className="h-8 w-auto"
            />
            <span className="text-sm font-medium text-idus-orange">Global</span>
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* 환영 메시지 - 강화된 스타일 */}
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 아이콘 */}
          <motion.div 
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-50 to-green-100 rounded-full mb-5"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 400 }}
            >
              <IconCheck className="w-10 h-10 text-green-600" />
            </motion.div>
          </motion.div>
          
          <motion.h1 
            className="text-2xl font-bold text-idus-black mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            자격 요건을 확인했어요!
          </motion.h1>
          <motion.p 
            className="text-idus-black-70 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="font-semibold text-idus-orange">{data.artistName}</span> 작가님,<br />
            글로벌 판매 자격 요건을 충족하셨어요
          </motion.p>
          
          {/* 배지 */}
          <motion.div 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium border border-green-200"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
            <span>자격 요건 충족</span>
          </motion.div>
        </motion.div>

        {/* 확인 결과 - 순차 애니메이션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card variant="outlined" className="mb-6">
            <h3 className="font-semibold text-idus-black mb-4 flex items-center gap-2">
              자격 요건 확인 결과
            </h3>
            <div className="space-y-2">
              <motion.div 
                className="flex items-center justify-between p-3 bg-gradient-to-r from-idus-orange-light/30 to-white rounded-lg border border-idus-orange/20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <motion.span 
                    className="w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white shadow-sm"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: 'spring', stiffness: 400 }}
                  >
                    <IconCheck className="w-4 h-4" />
                  </motion.span>
                  <span className="text-idus-black-70">사업자등록번호</span>
                </div>
                <span className="text-green-600 text-sm font-medium">보유</span>
              </motion.div>
              <motion.div 
                className="flex items-center justify-between p-3 bg-gradient-to-r from-idus-orange-light/30 to-white rounded-lg border border-idus-orange/20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center gap-3">
                  <motion.span 
                    className="w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white shadow-sm"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, type: 'spring', stiffness: 400 }}
                  >
                    <IconCheck className="w-4 h-4" />
                  </motion.span>
                  <span className="text-idus-black-70">판매 카테고리</span>
                </div>
                <span className="text-green-600 text-sm font-medium">판매 가능</span>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* 선택한 카테고리 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card variant="outlined" className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BrandIcon name="jewelry" size={20} alt="" />
              선택하신 카테고리
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.categories.map((category, index) => (
                <motion.span
                  key={category}
                  className="px-4 py-2 bg-idus-orange text-white rounded-full text-sm font-semibold shadow-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, type: 'spring', stiffness: 300 }}
                >
                  {categoryNameById.get(category) ?? category}
                </motion.span>
              ))}
            </div>
            
            {/* 2026 확장 카테고리 관심 표시 */}
            {(data.interestedIn2026.food || data.interestedIn2026.digital) && (
              <motion.div 
                className="mt-4 p-3 bg-blue-50 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-sm text-blue-700">
                  💡 {data.interestedIn2026.food && '식품'}
                  {data.interestedIn2026.food && data.interestedIn2026.digital && ', '}
                  {data.interestedIn2026.digital && '디지털 작품'} 
                  카테고리는 2026년 확장 예정이에요. 오픈 시 가장 먼저 연락드릴게요!
                </p>
              </motion.div>
            )}
          </Card>
        </motion.div>

        {/* 다음 단계 안내 - ProcessSteps 인포그래픽 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card variant="outlined" className="mb-6">
            <h3 className="font-semibold text-idus-black mb-6 flex items-center gap-2">
              글로벌 판매까지 남은 단계
            </h3>
            
            <ProcessSteps
              steps={[
                {
                  icon: <IconCheck className="w-5 h-5" />,
                  title: '자격 확인',
                  subtitle: '완료',
                  status: 'completed',
                },
                {
                  icon: <BookOpen className="w-5 h-5" />,
                  title: '학습',
                  subtitle: '진행 예정',
                  status: 'current',
                },
                {
                  icon: <Plane className="w-5 h-5" />,
                  title: '작가 등록',
                  subtitle: '대기',
                  status: 'pending',
                },
              ]}
            />
            
            {/* 안내 문구 */}
            <motion.div 
              className="mt-6 p-3 bg-amber-50 rounded-lg border border-amber-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-sm text-amber-700 text-center">
                💡 실제 판매를 시작하려면 <span className="font-semibold">학습 완료</span> 후 <span className="font-semibold">글로벌 작가 등록</span>이 필요해요
              </p>
            </motion.div>
          </Card>
        </motion.div>

        {/* 학습 시작 CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card
            variant="elevated"
            className="mb-8 bg-idus-orange text-white overflow-hidden relative"
            style={{ backgroundColor: 'var(--idus-orange)' }}
          >
            <motion.div 
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none" 
              aria-hidden="true"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Image
                src="/brand/brand assets/선물.png"
                alt=""
                width={140}
                height={140}
              />
            </motion.div>
            <div className="text-center relative z-10">
              {/* 메인 아이콘 */}
              <motion.div 
                className="flex justify-center mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                  <BrandIcon name="stationery" size={32} alt="" />
                </div>
              </motion.div>
              
              {/* 타이틀 */}
              <h3 className="text-xl font-bold mb-2">
                이제 학습을 시작해볼까요?
              </h3>
              <p className="text-sm opacity-80 mb-6">
                짧은 학습으로 글로벌 판매를 준비해보세요
              </p>
              
              {/* 학습 정보 요약 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {[
                  { value: '3', label: '단계 학습' },
                  { value: '30분', label: '평균 소요' },
                  { value: '10,000P', label: '완료 보상' },
                ].map((item, index) => (
                  <motion.div 
                    key={item.label}
                    className="bg-white/15 rounded-xl p-3 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.25)' }}
                  >
                    <div className="text-xl font-bold">{item.value}</div>
                    <div className="text-xs opacity-70">{item.label}</div>
                  </motion.div>
                ))}
              </div>
              
              {/* 보상 안내 */}
              <p className="text-sm opacity-90 mb-5">
                학습 완료 후 글로벌 등록 시 <span className="font-bold">광고포인트 10,000P</span> 지급
              </p>
              
              {/* CTA 버튼 */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full bg-white text-idus-orange hover:bg-white/90 font-bold shadow-md"
                  onClick={handleStartLearning}
                >
                  학습 시작하기
                  <IconArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
              
              {/* 하단 안내 */}
              <p className="text-center text-xs opacity-60 mt-4">
                언제든지 중단하고 이어서 학습할 수 있어요
              </p>
            </div>
          </Card>
        </motion.div>

        {/* 학습 과정 미리보기 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card variant="outlined">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              학습 과정 미리보기
            </h3>
            
            <div className="space-y-2">
              {[
                { icon: 'best', title: 'STEP 1. 글로벌 서비스 이해하기', highlight: false },
                { icon: 'stationery', title: 'STEP 2. 작품 등록 마스터하기', highlight: false },
                { icon: 'shipping', title: 'STEP 3. 주문 처리 & 운영하기', highlight: false },
                { icon: 'camera', title: 'FINAL. 간단 퀴즈', highlight: true },
              ].map((step, index) => (
                <motion.div 
                  key={step.title}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    step.highlight 
                      ? 'bg-idus-orange-light/20 border border-idus-black-10' 
                      : 'bg-gray-50'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ x: 4, backgroundColor: step.highlight ? 'rgb(255 237 213 / 0.4)' : 'rgb(249 250 251)' }}
                >
                  <span className="w-8 h-8 bg-idus-orange-light/40 rounded-lg flex items-center justify-center">
                    <BrandIcon name={step.icon as 'best' | 'stationery' | 'shipping' | 'camera'} size={18} alt="" />
                  </span>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">{step.title}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
        
        {/* 하단 안내 */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400 mb-2">궁금한 점이 있으면 FAQ에서 먼저 확인해요</p>
          <a href="/faq" className="text-idus-orange hover:underline text-sm">
            자주 묻는 질문 보러가기
          </a>
        </div>
      </div>
    </main>
  );
}

