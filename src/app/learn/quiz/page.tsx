'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { QUIZ_QUESTIONS, QuizQuestion } from '@/types/onboarding';
import { getOnboardingData, markQuizCompleted, markLearningCompleted } from '@/lib/storage';
import { submitOnboardingData } from '@/lib/api';
import { IconArrowLeft, IconArrowRight, IconCheck, IconX } from '@/components/ui/icons';
import BrandIcon from '@/components/ui/BrandIcon';

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(QUIZ_QUESTIONS.length).fill(null));
  const [isFinished, setIsFinished] = useState(false);

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
        await submitOnboardingData(data);
      }
      
      setIsFinished(true);
    }
  };

  // 정답 수 계산 (결과 화면용)
  const calculateScore = (): number => {
    return answers.reduce((count: number, answer, index) => {
      if (answer === QUIZ_QUESTIONS[index].correctAnswer) {
        return count + 1;
      }
      return count;
    }, 0);
  };

  if (isFinished) {
    const score = calculateScore();
    const percentage = Math.round((score / totalQuestions) * 100);
    
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-idus-gray flex items-center justify-center px-4">
        <Card variant="elevated" className="max-w-md w-full text-center animate-scale-in">
          <div className="text-6xl mb-6">
            {percentage >= 60 ? '🎉' : '💪'}
          </div>
          <h1 className="text-2xl font-bold text-idus-black mb-2">
            퀴즈 완료!
          </h1>
          <p className="text-idus-black-70 mb-6">
            {totalQuestions}문제 중 <span className="font-bold text-idus-orange">{score}문제</span> 정답
          </p>
          
          <div className="bg-idus-orange-light/20 rounded-xl p-6 mb-6">
            <div className="text-4xl font-bold text-idus-orange mb-2">
              {percentage}%
            </div>
            <p className="text-sm text-idus-black-70">
              {percentage >= 80 
                ? '훌륭해요! 글로벌 작가가 될 준비가 됐어요!' 
                : percentage >= 60
                  ? '잘하셨어요! 글로벌 판매를 시작해보세요!'
                  : '학습 내용을 다시 확인해보시면 좋아요!'}
            </p>
          </div>

          {/* 문제별 결과 요약 */}
          <div className="bg-idus-gray rounded-xl p-4 mb-6 text-left">
            <h4 className="font-semibold text-idus-black mb-3 text-sm">문제별 결과</h4>
            <div className="space-y-2">
              {QUIZ_QUESTIONS.map((q, index) => (
                <div key={q.id} className="flex items-center gap-2 text-sm">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    answers[index] === q.correctAnswer 
                      ? 'bg-green-500 text-white' 
                      : 'bg-red-500 text-white'
                  }`}>
                    {answers[index] === q.correctAnswer ? <IconCheck className="w-3.5 h-3.5" /> : <IconX className="w-3.5 h-3.5" />}
                  </span>
                  <span className="text-idus-black-70 truncate">Q{index + 1}. {q.question.slice(0, 25)}...</span>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => router.push('/complete')}
          >
            완료 페이지로 이동
            <IconArrowRight className="w-4 h-4" />
          </Button>
        </Card>
      </main>
    );
  }

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
            <span className="text-sm text-idus-black-50">
              {currentQuestionIndex + 1} / {totalQuestions}
            </span>
          </div>
          <div className="w-full bg-idus-black-10 rounded-full h-2">
            <div
              className="h-full bg-idus-orange rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Question */}
        <Card variant="elevated" className="mb-8 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <BrandIcon name="camera" size={26} alt="" />
            <span className="text-sm font-medium text-idus-orange">
              Q{currentQuestionIndex + 1}
            </span>
          </div>
          
          <h2 className="text-xl font-bold text-idus-black mb-6">
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
              mt-6 p-4 rounded-xl animate-slide-up
              ${selectedAnswer === currentQuestion.correctAnswer 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-idus-orange-light/20 border border-idus-orange-light/50'
              }
            `}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">
                  {selectedAnswer === currentQuestion.correctAnswer ? '🎉' : '💡'}
                </span>
                <div>
                  <h4 className={`font-semibold mb-1 ${
                    selectedAnswer === currentQuestion.correctAnswer ? 'text-green-700' : 'text-idus-orange-dark'
                  }`}>
                    {selectedAnswer === currentQuestion.correctAnswer ? '정답이에요!' : '아쉬워요!'}
                  </h4>
                  <p className="text-sm text-idus-black-70">
                    {currentQuestion.explanation}
                  </p>
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
                  결과 보기
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
