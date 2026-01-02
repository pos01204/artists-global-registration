'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { QUIZ_QUESTIONS } from '@/types/onboarding';
import { getOnboardingData, markQuizCompleted, markLearningCompleted } from '@/lib/storage';
import { submitOnboardingData } from '@/lib/api';
import { IconArrowLeft, IconArrowRight, IconCheck, IconX } from '@/components/ui/icons';
import BrandIcon from '@/components/ui/BrandIcon';
import { useToast } from '@/components/ui/ToastProvider';

export default function QuizPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(QUIZ_QUESTIONS.length).fill(null));

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;

  useEffect(() => {
    const data = getOnboardingData();
    if (!data) {
      router.push('/');
      return;
    }
    
    // 이전 단계가 완료되지 않았으면 학습 페이지로 리다이렉트
    if (!data.learningProgress.step1Completed || 
        !data.learningProgress.step2Completed || 
        !data.learningProgress.step3Completed) {
      router.push('/learn');
    }
  }, [router]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
    
    // 답변 저장
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
  };

  const handleNext = async () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(answers[currentQuestionIndex + 1]);
      setShowResult(false);
    } else {
      // 퀴즈 완료 - 정답 수 계산
      const correctCount = answers.reduce((count: number, answer, index) => {
        if (answer === QUIZ_QUESTIONS[index].correctAnswer) {
          return count + 1;
        }
        return count;
      }, 0);
      
      // 로컬 스토리지에 저장
      markQuizCompleted(correctCount);
      markLearningCompleted();
      
      // 구글 시트에 결과 전송
      const data = getOnboardingData();
      if (data) {
        const r = await submitOnboardingData(data);
        if (!r.success) {
          toast({
            type: 'warning',
            title: '퀴즈 결과 저장이 원활하지 않아요',
            description: '학습은 완료 처리되었어요. 네트워크/설정 확인이 필요할 수 있어요.',
          });
          // eslint-disable-next-line no-console
          console.warn('[submit] quiz failed:', r);
        }
      }
      
      // 바로 완료 페이지로 이동
      router.push('/complete');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-idus-gray">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-idus-black-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <Link href="/learn" className="flex items-center gap-2 text-idus-black-70 hover:text-idus-orange transition-colors">
              <IconArrowLeft className="w-4 h-4" />
              <span className="text-sm">학습 목록</span>
            </Link>
            <span className="text-sm font-medium text-idus-black-50">
              {currentQuestionIndex + 1} / {totalQuestions}
            </span>
          </div>
          {/* 프로그레스 바 */}
          <div className="w-full bg-idus-black-10 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-idus-orange rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Question */}
        <Card variant="elevated" className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BrandIcon name="camera" size={26} alt="" />
            <span className="text-sm font-medium text-idus-orange px-2 py-1 bg-idus-orange-light/30 rounded-full">
              Q{currentQuestionIndex + 1}
            </span>
          </div>
          
          <h2 className="text-xl font-bold text-idus-black mb-6 text-balance">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              const isWrong = showResult && isSelected && !isCorrect;
              
              let optionStyle = 'border-idus-black-10 hover:border-idus-orange hover:bg-idus-orange-light/20';
              let checkStyle = 'border-idus-black-20 bg-white';
              
              if (showResult) {
                if (isCorrect) {
                  optionStyle = 'border-green-500 bg-green-50';
                  checkStyle = 'border-green-500 bg-green-500 text-white';
                } else if (isWrong) {
                  optionStyle = 'border-red-500 bg-red-50';
                  checkStyle = 'border-red-500 bg-red-500 text-white';
                }
              } else if (isSelected) {
                optionStyle = 'border-idus-orange bg-idus-orange-light/20';
                checkStyle = 'border-idus-orange bg-idus-orange text-white';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`
                    w-full p-4 rounded-xl border-2 text-left transition-all duration-200
                    ${optionStyle}
                    ${showResult ? 'cursor-default' : 'cursor-pointer'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold
                      transition-all duration-200
                      ${checkStyle}
                    `}>
                      {showResult && isCorrect && <IconCheck className="w-4 h-4" />}
                      {showResult && isWrong && <IconX className="w-4 h-4" />}
                      {!showResult && isSelected && <IconCheck className="w-4 h-4" />}
                    </div>
                    <span className={`flex-1 ${showResult && isCorrect ? 'font-semibold text-green-700' : ''}`}>
                      {option}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Result Explanation */}
          {showResult && (
            <div className={`
              mt-6 p-4 rounded-xl
              ${selectedAnswer === currentQuestion.correctAnswer 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-idus-orange-light/20 border border-idus-orange-light/50'
              }
            `}>
              <div className="flex items-start gap-3">
                <span className="text-xl">
                  {selectedAnswer === currentQuestion.correctAnswer ? '✅' : '💡'}
                </span>
                <div className="flex-1">
                  <h4 className={`font-semibold mb-1 ${
                    selectedAnswer === currentQuestion.correctAnswer ? 'text-green-700' : 'text-idus-orange-dark'
                  }`}>
                    {selectedAnswer === currentQuestion.correctAnswer ? '정답이에요!' : '아쉬워요!'}
                  </h4>
                  <p className="text-sm text-idus-black-70 text-balance">
                    {currentQuestion.explanation}
                  </p>
                  
                  {/* 오답 시 관련 학습 링크 */}
                  {selectedAnswer !== currentQuestion.correctAnswer && currentQuestion.relatedContentId && (
                    <Link 
                      href={`/learn/content/${currentQuestion.relatedContentId}?from=quiz`}
                      className="inline-flex items-center gap-2 text-sm text-idus-orange hover:text-idus-orange-dark font-medium transition-colors mt-2"
                    >
                      <IconArrowRight className="w-4 h-4" />
                      관련 내용 다시보기
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Navigation */}
        <div className="flex justify-center">
          {!showResult ? (
            <Button
              variant="primary"
              size="lg"
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="w-full sm:max-w-sm"
            >
              정답 확인
            </Button>
          ) : (
            <Button
              variant="primary"
              size="lg"
              onClick={handleNext}
              className="w-full sm:max-w-sm"
            >
              {currentQuestionIndex < totalQuestions - 1 ? (
                <>
                  다음 문제
                  <IconArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  학습 완료하기
                  <IconArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}
