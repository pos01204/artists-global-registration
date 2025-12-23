'use client';

import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { IconArrowRight } from '@/components/ui/icons';
import BrandIcon from '@/components/ui/BrandIcon';

export default function NoBusinessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-idus-gray">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-idus-black-10">
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

      <div className="max-w-2xl mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-idus-orange-light/30 flex items-center justify-center">
              <BrandIcon name="stationery" size={44} alt="" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-idus-black mb-4">
            사업자등록이 필요해요
          </h1>
          <p className="text-idus-black-70 leading-relaxed">
            글로벌 작가 등록을 위해서는<br />
            <span className="font-semibold text-idus-black">사업자등록번호</span>가 필요합니다.
          </p>
        </div>

        <Card variant="elevated" className="mb-8 animate-slide-up">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-idus-orange-light rounded-full flex items-center justify-center flex-shrink-0">
                <BrandIcon name="cheer" size={24} alt="" />
              </div>
              <div>
                <h3 className="font-semibold text-idus-black mb-2">왜 사업자등록이 필요한가요?</h3>
                <p className="text-sm text-idus-black-70 leading-relaxed">
                  해외 판매 시 세금계산서 발행 및 정산을 위해 사업자등록이 필수입니다.
                  개인사업자로도 간편하게 등록하실 수 있어요!
                </p>
              </div>
            </div>

            <div className="border-t border-idus-black-10 pt-6">
              <h3 className="font-semibold text-idus-black mb-4">📌 사업자등록 방법</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-6 h-6 bg-idus-orange text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <span>홈택스(hometax.go.kr) 접속</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-6 h-6 bg-idus-orange text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <span>신청/제출 - 사업자등록 신청</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-6 h-6 bg-idus-orange text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <span>간이과세자/일반과세자 선택 후 신청</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-6 h-6 bg-idus-orange text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                  <span>약 3~7일 후 사업자등록증 발급</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card variant="outlined" className="mb-8 bg-idus-orange-light/20 border-idus-orange animate-slide-up animation-delay-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-idus-black-10 flex items-center justify-center shadow-sm">
              <BrandIcon name="like" size={28} alt="" />
            </div>
            <div>
              <h3 className="font-semibold text-idus-black mb-1">
                사업자등록 완료 후 다시 방문해주세요!
              </h3>
              <p className="text-sm text-idus-black-70">
                작가님의 정보가 저장되었습니다. 준비가 되시면 언제든 돌아와주세요.
              </p>
            </div>
          </div>
        </Card>

        <div className="space-y-4 animate-slide-up animation-delay-300">
          <a
            href="https://www.hometax.go.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button variant="primary" size="lg" className="w-full">
              홈택스 바로가기
              <IconArrowRight className="w-4 h-4" />
            </Button>
          </a>
          
          <Link href="/">
            <Button variant="secondary" size="lg" className="w-full">
              처음으로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

