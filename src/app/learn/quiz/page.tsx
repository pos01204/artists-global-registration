'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { QUIZ_QUESTIONS } from '@/types/onboarding';
import { getOnboardingData, markQuizCompleted, markLearningCompleted, isLearningCompleted } from '@/lib/storage';
import { submitOnboardingData } from '@/lib/api';
import { IconArrowLeft, IconArrowRight, IconCheck, IconX } from '@/components/ui/icons';
import BrandIcon from '@/components/ui/BrandIcon';
import { useToast } from '@/components/ui/ToastProvider';

const QUIZ_PROGRESS_KEY = 'idus_quiz_progress';

interface QuizProgress {
  currentIndex: number;
  answers: (number | null)[];
}

export default function QuizPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(QUIZ_QUESTIONS.length).fill(null));
  const [isInitialized, setIsInitialized] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;

  // 퀴즈 진행 상태 저장
  const saveQuizProgress = (index: number, ans: (number | null)[]) => {
    try {
      const progress: QuizProgress = { currentIndex: index, answers: ans };
      localStorage.setItem(QUIZ_PROGRESS_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('Failed to save quiz progress:', e);
    }
  };

  // 퀴즈 진행 상태 불러오기
  const loadQuizProgress = (): QuizProgress | null => {
    try {
      const saved = localStorage.getItem(QUIZ_PROGRESS_KEY);
      if (saved) {
        return JSON.parse(saved) as QuizProgress;
      }
    } catch (e) {
      console.warn('Failed to load quiz progress:', e);
    }
    return null;
  };

  // 퀴즈 완료 시 진행 상태 삭제
  const clearQuizProgress = () => {
    try {
      localStorage.removeItem(QUIZ_PROGRESS_KEY);
    } catch (e) {
      console.warn('Failed to clear quiz progress:', e);
    }
  };

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
      return;
    }

    // 이미 퀴즈를 완료했으면 완료 페이지로 리다이렉트
    if (isLearningCompleted() && data.learningProgress.quizCompleted) {
      router.push('/complete');
      return;
    }

    // 저장된 퀴즈 진행 상태 복원
    const savedProgress = loadQuizProgress();
    if (savedProgress) {
      setCurrentQuestionIndex(savedProgress.currentIndex);
      setAnswers(savedProgress.answers);
      setSelectedAnswer(savedProgress.answers[savedProgress.currentIndex]);
    }
    setIsInitialized(true);
  }, [router]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
    
    // 답변 저장
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setAnswers(newAnswers);
    
    // 진행 상태 저장
    saveQuizProgress(currentQuestionIndex, newAnswers);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
  };

  const handleNext = async () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(answers[nextIndex]);
      setShowResult(false);
      
      // 진행 상태 저장
      saveQuizProgress(nextIndex, answers);
    } else {
      // 퀴즈 완료 - 진행 상태 삭제
      clearQuizProgress();
      
      // 정답 수 계산
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

  const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;

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
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-idus-orange">
                {currentQuestionIndex + 1}
              </span>
              <span className="text-sm text-idus-black-30">/</span>
              <span className="text-sm text-idus-black-50">
                {totalQuestions}
              </span>
            </div>
          </div>
          {/* 프로그레스 바 */}
          <div className="w-full bg-idus-black-10 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-idus-orange rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Card variant="elevated" className="mb-6 sm:mb-8">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                <BrandIcon name="camera" size={22} alt="" className="sm:w-[26px] sm:h-[26px]" />
                <span className="text-xs sm:text-sm font-medium text-idus-orange px-1.5 sm:px-2 py-0.5 sm:py-1 bg-idus-orange-light/30 rounded-full">
                  Q{currentQuestionIndex + 1}
                </span>
              </div>
              
              <h2 className="text-lg sm:text-xl font-bold text-idus-black mb-4 sm:mb-6 text-balance">
                {currentQuestion.question}
              </h2>

              {/* Options */}
              <div className="space-y-2 sm:space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === currentQuestion.correctAnswer;
                  const isWrong = showResult && isSelected && !isCorrect;
                  
                  let optionStyle = 'border-idus-black-10 hover:border-idus-orange hover:bg-idus-orange-light/10';
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
                    <motion.button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showResult}
                      className={`
                        w-full p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 text-left transition-colors duration-200
                        min-h-[48px] sm:min-h-[56px] active:bg-opacity-80
                        ${optionStyle}
                        ${showResult ? 'cursor-default' : 'cursor-pointer'}
                      `}
                      whileHover={!showResult ? { scale: 1.01 } : {}}
                      whileTap={!showResult ? { scale: 0.99 } : {}}
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className={`
                          w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0
                          transition-all duration-200
                          ${checkStyle}
                        `}>
                          {showResult && isCorrect && <IconCheck className="w-3 h-3 sm:w-4 sm:h-4" />}
                          {showResult && isWrong && <IconX className="w-3 h-3 sm:w-4 sm:h-4" />}
                          {!showResult && isSelected && <IconCheck className="w-3 h-3 sm:w-4 sm:h-4" />}
                        </div>
                        <span className={`flex-1 text-sm sm:text-base ${showResult && isCorrect ? 'font-semibold text-green-700' : ''}`}>
                          {option}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Result Explanation */}
              <AnimatePresence>
                {showResult && (
                  <motion.div 
                    className={`
                      mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg sm:rounded-xl
                      ${selectedAnswer === currentQuestion.correctAnswer 
                        ? 'bg-green-50 border border-green-200' 
                        : 'bg-amber-50 border border-amber-200'
                      }
                    `}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-start gap-2 sm:gap-3">
                      <span className="text-base sm:text-xl flex-shrink-0">
                        {selectedAnswer === currentQuestion.correctAnswer ? '✅' : '💡'}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-semibold mb-0.5 sm:mb-1 text-sm sm:text-base ${
                          selectedAnswer === currentQuestion.correctAnswer ? 'text-green-700' : 'text-amber-700'
                        }`}>
                          {selectedAnswer === currentQuestion.correctAnswer ? '정답이에요!' : '아쉬워요!'}
                        </h4>
                        <p className="text-xs sm:text-sm text-idus-black-70 text-balance">
                          {currentQuestion.explanation}
                        </p>
                        
                        {/* 오답 시 관련 학습 링크 */}
                        {selectedAnswer !== currentQuestion.correctAnswer && currentQuestion.relatedStepId && currentQuestion.relatedContentId && (
                          <Link 
                            href={`/learn/step/${currentQuestion.relatedStepId}?from=quiz&content=${currentQuestion.relatedContentId}`}
                            className="inline-flex items-center gap-2 text-sm text-idus-orange hover:text-idus-orange-dark font-medium transition-colors mt-3"
                          >
                            <IconArrowRight className="w-4 h-4" />
                            관련 내용 다시보기
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-center">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key="submit"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full sm:max-w-sm"
              >
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className="w-full"
                >
                  정답 확인
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="next"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full sm:max-w-sm"
              >
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleNext}
                  className="w-full"
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
