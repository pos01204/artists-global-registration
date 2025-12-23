'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { QUIZ_QUESTIONS, QuizQuestion } from '@/types/onboarding';
import { getOnboardingData, markQuizCompleted, markLearningCompleted } from '@/lib/storage';

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
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
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setCorrectCount(prev => prev + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // 퀴즈 완료
      const finalScore = selectedAnswer === currentQuestion.correctAnswer 
        ? correctCount + 1 
        : correctCount;
      markQuizCompleted(finalScore);
      markLearningCompleted();
      setIsFinished(true);
    }
  };

  if (isFinished) {
    const finalScore = correctCount;
    const percentage = Math.round((finalScore / totalQuestions) * 100);
    
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-idus-gray flex items-center justify-center px-4">
        <Card variant="elevated" className="max-w-md w-full text-center animate-scale-in">
          <div className="text-6xl mb-6">
            {percentage >= 70 ? '🎉' : '💪'}
          </div>
          <h1 className="text-2xl font-bold text-idus-black mb-2">
            퀴즈 완료!
          </h1>
          <p className="text-idus-black-70 mb-6">
            {totalQuestions}문제 중 {finalScore}문제 정답
          </p>
          
          <div className="bg-idus-gray rounded-xl p-6 mb-6">
            <div className="text-4xl font-bold text-idus-orange mb-2">
              {percentage}%
            </div>
            <p className="text-sm text-idus-black-50">
              {percentage >= 70 
                ? '훌륭해요! 글로벌 작가가 될 준비가 됐어요!' 
                : '다시 한번 학습하시면 더 좋아요!'}
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => router.push('/complete')}
          >
            완료 페이지로 이동 →
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
              <span>←</span>
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
            <span className="text-2xl">🎯</span>
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
              let optionStyle = 'border-idus-black-20 hover:border-idus-orange';
              
              if (showResult) {
                if (index === currentQuestion.correctAnswer) {
                  optionStyle = 'border-green-500 bg-green-50';
                } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
                  optionStyle = 'border-red-500 bg-red-50';
                }
              } else if (selectedAnswer === index) {
                optionStyle = 'border-idus-orange bg-idus-orange-light/30';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`
                    w-full p-4 rounded-xl border-2 text-left transition-all duration-300
                    ${optionStyle}
                    ${showResult ? 'cursor-default' : 'cursor-pointer'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium
                      ${selectedAnswer === index || (showResult && index === currentQuestion.correctAnswer)
                        ? 'border-current bg-current text-white'
                        : 'border-idus-black-20'
                      }
                    `}>
                      {showResult && index === currentQuestion.correctAnswer && '✓'}
                      {showResult && index === selectedAnswer && index !== currentQuestion.correctAnswer && '✗'}
                    </div>
                    <span className="flex-1">{option}</span>
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
                : 'bg-idus-orange-light/30 border border-idus-orange'
              }
            `}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">
                  {selectedAnswer === currentQuestion.correctAnswer ? '🎉' : '💡'}
                </span>
                <div>
                  <h4 className="font-semibold text-idus-black mb-1">
                    {selectedAnswer === currentQuestion.correctAnswer ? '정답!' : '아쉬워요!'}
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
        <div className="flex justify-end">
          {!showResult ? (
            <Button
              variant="primary"
              size="lg"
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
            >
              정답 확인
            </Button>
          ) : (
            <Button
              variant="primary"
              size="lg"
              onClick={handleNext}
            >
              {currentQuestionIndex < totalQuestions - 1 ? '다음 문제 →' : '결과 보기 🎉'}
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}

