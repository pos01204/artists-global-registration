'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { QUIZ_QUESTIONS } from '@/types/onboarding';
import { getOnboardingData, markQuizCompleted, markLearningCompleted } from '@/lib/storage';
import { submitOnboardingData } from '@/lib/api';
import { IconArrowLeft, IconArrowRight, IconCheck, IconX } from '@/components/ui/icons';
import BrandIcon from '@/components/ui/BrandIcon';
import { useToast } from '@/components/ui/ToastProvider';
import ConfettiEffect from '@/components/ui/ConfettiEffect';

export default function QuizPage() {
  const router = useRouter();
  const { toast } = useToast();
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
        {/* Confetti 효과 */}
        <ConfettiEffect isActive={percentage >= 60} duration={3000} pieceCount={40} />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
        >
          <Card variant="elevated" className="max-w-md w-full text-center">
            {/* 축하 아이콘 */}
            <motion.div 
              className="mb-6 flex justify-center"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
            >
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${
                percentage >= 60 
                  ? 'bg-gradient-to-br from-idus-orange to-idus-orange-dark shadow-lg shadow-idus-orange/30' 
                  : 'bg-gradient-to-br from-idus-orange-light to-idus-orange'
              }`}>
                <BrandIcon 
                  name={percentage >= 60 ? 'cheer' : 'best'} 
                  size={44} 
                  alt="" 
                  className="drop-shadow-lg"
                />
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-2xl font-bold text-idus-black mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              퀴즈 완료!
            </motion.h1>
            <motion.p 
              className="text-idus-black-70 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {totalQuestions}문제 중 <span className="font-bold text-idus-orange">{score}문제</span> 정답
            </motion.p>
            
            {/* 점수 표시 - 강화된 스타일 */}
            <motion.div 
              className="bg-gradient-to-br from-idus-orange-light/30 to-idus-orange-light/10 rounded-2xl p-6 mb-6 border border-idus-orange/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div 
                className="text-5xl font-bold text-idus-orange mb-2"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
              >
                {percentage}%
              </motion.div>
              <p className="text-sm text-idus-black-70 text-balance">
                {percentage >= 80 
                  ? '훌륭해요! 글로벌 작가가 될 준비가 됐어요!' 
                  : percentage >= 60
                    ? '잘하셨어요! 글로벌 판매를 시작해보세요!'
                    : '학습 내용을 다시 확인해보시면 좋아요!'}
              </p>
            </motion.div>

            {/* 문제별 결과 요약 */}
            <motion.div 
              className="bg-idus-gray rounded-xl p-4 mb-6 text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <h4 className="font-semibold text-idus-black mb-3 text-sm">문제별 결과</h4>
              <div className="space-y-2">
                {QUIZ_QUESTIONS.map((q, index) => (
                  <motion.div 
                    key={q.id} 
                    className="flex items-center gap-2 text-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <motion.span 
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        answers[index] === q.correctAnswer 
                          ? 'bg-green-500 text-white' 
                          : 'bg-red-500 text-white'
                      }`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.9 + index * 0.1, type: 'spring', stiffness: 400 }}
                    >
                      {answers[index] === q.correctAnswer ? <IconCheck className="w-3.5 h-3.5" /> : <IconX className="w-3.5 h-3.5" />}
                    </motion.span>
                    <span className="text-idus-black-70 truncate">Q{index + 1}. {q.question.slice(0, 25)}...</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => router.push('/complete')}
              >
                완료 페이지로 이동
                <IconArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </Card>
        </motion.div>
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
            <motion.div 
              className="flex items-center gap-2"
              key={currentQuestionIndex}
              initial={{ scale: 1.2, color: '#FF6F00' }}
              animate={{ scale: 1, color: '#9E9E9E' }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-sm font-medium">
                {currentQuestionIndex + 1} / {totalQuestions}
              </span>
            </motion.div>
          </div>
          {/* 개선된 프로그레스 바 */}
          <div className="w-full bg-idus-black-10 rounded-full h-2.5 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-idus-orange to-amber-500 rounded-full relative"
              initial={false}
              animate={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {/* 쉬머 효과 */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              />
            </motion.div>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card variant="elevated" className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <motion.div
                  initial={{ rotate: -20, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <BrandIcon name="camera" size={26} alt="" />
                </motion.div>
                <motion.span 
                  className="text-sm font-medium text-idus-orange px-2 py-1 bg-idus-orange-light/30 rounded-full"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  Q{currentQuestionIndex + 1}
                </motion.span>
              </div>
              
              <motion.h2 
                className="text-xl font-bold text-idus-black mb-6 text-balance"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {currentQuestion.question}
              </motion.h2>

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
                    optionStyle = 'border-idus-orange bg-idus-orange-light/20 shadow-md shadow-idus-orange/10';
                    checkStyle = 'border-idus-orange bg-idus-orange text-white';
                  }

                  return (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showResult}
                      className={`
                        w-full p-4 rounded-xl border-2 text-left transition-all duration-200
                        ${optionStyle}
                        ${showResult ? 'cursor-default' : 'cursor-pointer'}
                      `}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + index * 0.08 }}
                      whileHover={!showResult ? { scale: 1.01, y: -2 } : {}}
                      whileTap={!showResult ? { scale: 0.99 } : {}}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className={`
                            w-7 h-7 rounded-full border-2 flex items-center justify-center text-sm font-bold
                            transition-all duration-200
                            ${checkStyle}
                          `}
                          animate={isSelected && !showResult ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 0.2 }}
                        >
                          {showResult && isCorrect && <IconCheck className="w-4 h-4" />}
                          {showResult && isWrong && <IconX className="w-4 h-4" />}
                          {!showResult && isSelected && <IconCheck className="w-4 h-4" />}
                        </motion.div>
                        <span className={`flex-1 ${showResult && isCorrect ? 'font-semibold text-green-700' : ''}`}>
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
                      mt-6 p-4 rounded-xl
                      ${selectedAnswer === currentQuestion.correctAnswer 
                        ? 'bg-green-50 border border-green-200' 
                        : 'bg-idus-orange-light/20 border border-idus-orange-light/50'
                      }
                    `}
                    initial={{ opacity: 0, y: 20, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -20, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start gap-3">
                      <motion.span 
                        className="text-2xl"
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
                      >
                        {selectedAnswer === currentQuestion.correctAnswer ? '🎉' : '💡'}
                      </motion.span>
                      <div className="flex-1">
                        <h4 className={`font-semibold mb-1 ${
                          selectedAnswer === currentQuestion.correctAnswer ? 'text-green-700' : 'text-idus-orange-dark'
                        }`}>
                          {selectedAnswer === currentQuestion.correctAnswer ? '정답이에요!' : '아쉬워요!'}
                        </h4>
                        <p className="text-sm text-idus-black-70 text-balance mb-3">
                          {currentQuestion.explanation}
                        </p>
                        
                        {/* 오답 시 관련 학습 링크 */}
                        {selectedAnswer !== currentQuestion.correctAnswer && currentQuestion.relatedContentId && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            <Link 
                              href={`/learn/content/${currentQuestion.relatedContentId}?from=quiz`}
                              className="inline-flex items-center gap-2 text-sm text-idus-orange hover:text-idus-orange-dark font-medium transition-colors group bg-white px-3 py-2 rounded-lg"
                            >
                              <IconArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                              관련 내용 다시보기
                            </Link>
                          </motion.div>
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full sm:max-w-sm"
              >
                <motion.div
                  whileHover={selectedAnswer !== null ? { scale: 1.02 } : {}}
                  whileTap={selectedAnswer !== null ? { scale: 0.98 } : {}}
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
              </motion.div>
            ) : (
              <motion.div
                key="next"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full sm:max-w-sm"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
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
                        결과 보기
                        <IconArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
