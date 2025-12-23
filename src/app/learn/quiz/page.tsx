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
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex items-center justify-center px-4">
        <Card variant="elevated" className="max-w-md w-full text-center animate-scale-in">
          <div className="text-6xl mb-6">
            {percentage >= 60 ? '🎉' : '💪'}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            퀴즈 완료!
          </h1>
          <p className="text-gray-600 mb-6">
            {totalQuestions}문제 중 <span className="font-bold text-orange-500">{score}문제</span> 정답
          </p>
          
          <div className="bg-orange-50 rounded-xl p-6 mb-6">
            <div className="text-4xl font-bold text-orange-500 mb-2">
              {percentage}%
            </div>
            <p className="text-sm text-gray-600">
              {percentage >= 80 
                ? '훌륭해요! 글로벌 작가가 될 준비가 됐어요!' 
                : percentage >= 60
                  ? '잘하셨어요! 글로벌 판매를 시작해보세요!'
                  : '학습 내용을 다시 확인해보시면 좋아요!'}
            </p>
          </div>

          {/* 문제별 결과 요약 */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <h4 className="font-semibold text-gray-900 mb-3 text-sm">문제별 결과</h4>
            <div className="space-y-2">
              {QUIZ_QUESTIONS.map((q, index) => (
                <div key={q.id} className="flex items-center gap-2 text-sm">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                    answers[index] === q.correctAnswer 
                      ? 'bg-green-500 text-white' 
                      : 'bg-red-500 text-white'
                  }`}>
                    {answers[index] === q.correctAnswer ? '✓' : '✗'}
                  </span>
                  <span className="text-gray-600 truncate">Q{index + 1}. {q.question.slice(0, 25)}...</span>
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
            완료 페이지로 이동 →
          </Button>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <Link href="/learn" className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors">
              <span>←</span>
              <span className="text-sm">학습 목록</span>
            </Link>
            <span className="text-sm text-gray-400">
              {currentQuestionIndex + 1} / {totalQuestions}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-full bg-orange-500 rounded-full transition-all duration-300"
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
            <span className="text-sm font-medium text-orange-500">
              Q{currentQuestionIndex + 1}
            </span>
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              const isWrong = showResult && isSelected && !isCorrect;
              
              let optionStyle = 'border-gray-200 hover:border-orange-300 hover:bg-orange-50';
              let checkStyle = 'border-gray-300 bg-white';
              
              if (showResult) {
                if (isCorrect) {
                  optionStyle = 'border-green-500 bg-green-50';
                  checkStyle = 'border-green-500 bg-green-500 text-white';
                } else if (isWrong) {
                  optionStyle = 'border-red-500 bg-red-50';
                  checkStyle = 'border-red-500 bg-red-500 text-white';
                }
              } else if (isSelected) {
                optionStyle = 'border-orange-500 bg-orange-50';
                checkStyle = 'border-orange-500 bg-orange-500 text-white';
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
                      {showResult && isCorrect && '✓'}
                      {showResult && isWrong && '✗'}
                      {!showResult && isSelected && '✓'}
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
                : 'bg-amber-50 border border-amber-200'
              }
            `}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">
                  {selectedAnswer === currentQuestion.correctAnswer ? '🎉' : '💡'}
                </span>
                <div>
                  <h4 className={`font-semibold mb-1 ${
                    selectedAnswer === currentQuestion.correctAnswer ? 'text-green-700' : 'text-amber-700'
                  }`}>
                    {selectedAnswer === currentQuestion.correctAnswer ? '정답이에요!' : '아쉬워요!'}
                  </h4>
                  <p className="text-sm text-gray-600">
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
