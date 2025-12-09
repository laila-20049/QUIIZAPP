import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useQuiz } from '../context/QuizContext';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  CheckCircle2,
  XCircle,
  Clock,
  Target,
  Trophy,
  BarChart3,
  Zap,
  AlertCircle,
  Bookmark,
  Eye,
  EyeOff,
  HelpCircle,
  Timer,
  ChevronRight,
  ChevronLeft,
  Home,
  RotateCcw,
  Maximize2,
  Minimize2,
  Settings,
  Volume2,
  VolumeX,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from './Loader';

const QuizRunner = ({ quizId, onQuizComplete }) => {
  const {
    status,
    currentQuiz,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    progress,
    timeSpent,
    userAnswers,
    correctAnswers,
    score,
    loadQuiz,
    startQuiz,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    pauseQuiz,
    resumeQuiz,
    submitQuiz,
    isQuestionAnswered,
    getUserAnswer,
    getFormattedTime,
    resetQuiz
  } = useQuiz();

  const [showExplanation, setShowExplanation] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [showTimerWarning, setShowTimerWarning] = useState(false);
  const [questionTime, setQuestionTime] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [shakeIncorrect, setShakeIncorrect] = useState(false);
  const questionTimerRef = useRef(null);
  const timerWarningRef = useRef(null);

  // Sound effects
  const playSound = useCallback((sound) => {
    if (!isSoundEnabled) return;
    // In a real app, you would play actual sounds
    console.log(`Playing sound: ${sound}`);
  }, [isSoundEnabled]);

  // Load quiz on mount
  useEffect(() => {
    loadQuiz(quizId);
  }, [quizId, loadQuiz]);

  // Timer for each question
  useEffect(() => {
    if (status === 'in_progress' && currentQuestion) {
      questionTimerRef.current = setInterval(() => {
        setQuestionTime(prev => prev + 1);
      }, 1000);
    } else {
      setQuestionTime(0);
    }

    return () => {
      if (questionTimerRef.current) {
        clearInterval(questionTimerRef.current);
      }
    };
  }, [status, currentQuestion]);

  // Timer warnings
  useEffect(() => {
    if (timeSpent > 0 && currentQuiz?.duration) {
      const timeLeft = currentQuiz.duration * 60 - timeSpent;
      if (timeLeft <= 60 && timeLeft > 0) {
        setShowTimerWarning(true);
        playSound('warning');
        timerWarningRef.current = setTimeout(() => setShowTimerWarning(false), 3000);
      }
    }

    return () => {
      if (timerWarningRef.current) {
        clearTimeout(timerWarningRef.current);
      }
    };
  }, [timeSpent, currentQuiz, playSound]);

  const handleAnswer = useCallback((selectedAnswer) => {
    if (!currentQuestion || isQuestionAnswered(currentQuestion.id)) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const answerTime = questionTime;
    
    if (!isCorrect) {
      setShakeIncorrect(true);
      setTimeout(() => setShakeIncorrect(false), 600);
      playSound('wrong');
    } else {
      playSound('correct');
    }

    answerQuestion({
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect,
      timeSpent: answerTime
    });

    setQuestionTime(0);
  }, [currentQuestion, isQuestionAnswered, questionTime, answerQuestion, playSound]);

  const handleStart = useCallback(() => {
    startQuiz({
      questions: currentQuiz.questions,
      duration: currentQuiz.duration,
      quizId: currentQuiz.id
    });
    playSound('start');
  }, [currentQuiz, startQuiz, playSound]);

  const handleNextQuestion = useCallback(() => {
    nextQuestion();
    setShowExplanation(false);
    setIsRevealed(false);
    playSound('next');
  }, [nextQuestion, playSound]);

  const handlePreviousQuestion = useCallback(() => {
    previousQuestion();
    setShowExplanation(false);
    setIsRevealed(false);
    playSound('previous');
  }, [previousQuestion, playSound]);

  const handleSubmitQuiz = useCallback(() => {
    submitQuiz();
    playSound('complete');
    if (onQuizComplete) {
      onQuizComplete(score);
    }
  }, [submitQuiz, playSound, score, onQuizComplete]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const toggleRevealAnswers = () => {
    setIsRevealed(!isRevealed);
    playSound('toggle');
  };

  const formatQuestionTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-3 w-3 ${
          index < Math.floor(rating) ? 'text-yellow-500 fill-current' :
          index < rating ? 'text-yellow-500 fill-current opacity-50' :
          'text-gray-300'
        }`}
      />
    ));
  };

  // Loading state
  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <Loader size="large" color="blue" type="gradient-spinner" text="Chargement du quiz..." />
        <div className="mt-8 max-w-md text-center">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Préparation de votre expérience
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Nous optimisons les questions et préparons votre interface pour une expérience fluide
          </p>
        </div>
      </div>
    );
  }

  // Ready/Idle state
  if (status === 'idle' || status === 'ready') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20 dark:border-gray-700/50"
        >
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 mb-6">
              <Trophy className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
              {currentQuiz?.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
              {currentQuiz?.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Questions</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {currentQuiz?.questions?.length || 0}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-800/20 rounded-xl">
              <div className="flex items-center gap-3">
                <Timer className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Durée</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {currentQuiz?.duration || 0} min
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-800/20 rounded-xl">
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-green-600 dark:text-green-400" />
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Difficulté</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-gray-100 capitalize">
                    {currentQuiz?.difficulty || 'medium'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Conseil :</span> Prenez votre temps pour lire chaque question attentivement
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                  className="p-2 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                >
                  {isSoundEnabled ? 
                    <Volume2 className="h-5 w-5 text-blue-600" /> : 
                    <VolumeX className="h-5 w-5 text-gray-500" />
                  }
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                >
                  <Maximize2 className="h-5 w-5 text-blue-600" />
                </button>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            className="w-full py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Play className="h-6 w-6" />
            Commencer le Quiz
            <Sparkles className="h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Quiz in progress
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.history.back()}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Home className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </button>
                <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate max-w-xs">
                  {currentQuiz?.title}
                </h1>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-bold ${getDifficultyColor(currentQuiz?.difficulty)} text-white`}>
                {currentQuiz?.difficulty?.toUpperCase()}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Timer */}
              <div className="relative">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    {showTimerWarning && (
                      <div className="absolute inset-0 bg-red-500 rounded-full animate-ping" />
                    )}
                  </div>
                  <div className={`text-lg font-mono font-bold ${
                    showTimerWarning ? 'text-red-600 animate-pulse' : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {getFormattedTime()}
                  </div>
                </div>
                {showTimerWarning && (
                  <div className="absolute -bottom-6 left-0 right-0 text-center">
                    <span className="text-xs text-red-600 font-medium">Attention ! Temps limité</span>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {isSoundEnabled ? 
                    <Volume2 className="h-5 w-5 text-blue-600" /> : 
                    <VolumeX className="h-5 w-5 text-gray-500" />
                  }
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {isFullscreen ? 
                    <Minimize2 className="h-5 w-5 text-blue-600" /> : 
                    <Maximize2 className="h-5 w-5 text-blue-600" />
                  }
                </button>
                <button
                  onClick={toggleRevealAnswers}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {isRevealed ? 
                    <EyeOff className="h-5 w-5 text-purple-600" /> : 
                    <Eye className="h-5 w-5 text-gray-600" />
                  }
                </button>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
              <span>Question {currentQuestionIndex + 1} sur {totalQuestions}</span>
              <span>{Math.round(progress)}% complété</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion?.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 mb-6"
          >
            {/* Question header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Question #{currentQuestionIndex + 1}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>Temps sur cette question: {formatQuestionTime(questionTime)}</span>
                </div>
              </div>
              
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Bookmark className={`h-5 w-5 ${isBookmarked ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
              </button>
            </div>

            {/* Question */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-relaxed">
                {currentQuestion?.question}
              </h2>
              {currentQuestion?.image && (
                <div className="mb-6 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <img 
                    src={currentQuestion.image} 
                    alt="Question illustration"
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
            </div>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentQuestion?.options.map((option, index) => {
                const userAnswer = getUserAnswer(currentQuestion.id);
                const isSelected = userAnswer?.selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const isAnswered = isQuestionAnswered(currentQuestion.id);
                const shouldShowCorrect = isAnswered || isRevealed;
                
                return (
                  <motion.button
                    key={index}
                    whileHover={!isAnswered ? { scale: 1.02 } : {}}
                    whileTap={!isAnswered ? { scale: 0.98 } : {}}
                    onClick={() => handleAnswer(index)}
                    disabled={isAnswered}
                    className={`
                      w-full text-left p-4 rounded-xl border-2 transition-all duration-200
                      ${isAnswered ? 'cursor-default' : 'cursor-pointer'}
                      ${!isAnswered
                        ? 'hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                        : isSelected
                          ? isCorrect
                            ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
                            : `${shakeIncorrect ? 'animate-shake' : ''} border-red-500 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20`
                          : ''
                      }
                      ${shouldShowCorrect && isCorrect ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20' : ''}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`
                          flex items-center justify-center h-8 w-8 rounded-lg border font-bold transition-all
                          ${!isAnswered
                            ? 'border-gray-300 text-gray-600 dark:text-gray-400'
                            : isSelected
                              ? isCorrect
                                ? 'border-green-500 bg-green-500 text-white'
                                : 'border-red-500 bg-red-500 text-white'
                              : ''
                          }
                          ${shouldShowCorrect && isCorrect ? 'border-green-500 bg-green-500 text-white' : ''}
                        `}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className={`text-lg ${
                          isSelected
                            ? isCorrect
                              ? 'text-green-700 dark:text-green-400'
                              : 'text-red-700 dark:text-red-400'
                            : 'text-gray-800 dark:text-gray-200'
                        }`}>
                          {option}
                        </span>
                      </div>
                      
                      {(isSelected || (shouldShowCorrect && isCorrect)) && (
                        <div className="flex-shrink-0">
                          {isCorrect || (shouldShowCorrect && isCorrect) ? (
                            <div className="h-6 w-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                              <CheckCircle2 className="h-4 w-4 text-white" />
                            </div>
                          ) : (
                            <div className="h-6 w-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                              <XCircle className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation */}
            {currentQuestion?.explanation && (
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="w-full py-3 text-center text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <HelpCircle className="h-5 w-5" />
                {showExplanation ? 'Masquer l\'explication' : 'Voir l\'explication'}
                <ChevronRight className={`h-4 w-4 transition-transform ${showExplanation ? 'rotate-90' : ''}`} />
              </button>
            )}

            <AnimatePresence>
              {showExplanation && currentQuestion?.explanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-800 dark:text-blue-300 mb-2">Explication :</p>
                      <p className="text-blue-700/80 dark:text-blue-400/80">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
            Précédent
          </motion.button>

          <div className="flex items-center gap-3">
            {status === 'in_progress' ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={pauseQuiz}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg"
              >
                <Pause className="h-5 w-5" />
                Pause
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resumeQuiz}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
              >
                <Play className="h-5 w-5" />
                Reprendre
              </motion.button>
            )}

            <button
              onClick={resetQuiz}
              className="p-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300 hover:shadow-md transition-all"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>

          {currentQuestionIndex === totalQuestions - 1 ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmitQuiz}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl"
            >
              <Trophy className="h-5 w-5" />
              Terminer le Quiz
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextQuestion}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
            >
              Suivant
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          )}
        </div>

        {/* Stats summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="text-sm text-blue-700 dark:text-blue-400 mb-1">Score actuel</div>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-300">{score}</div>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
            <div className="text-sm text-green-700 dark:text-green-400 mb-1">Bonnes réponses</div>
            <div className="text-2xl font-bold text-green-900 dark:text-green-300">{correctAnswers}/{currentQuestionIndex + 1}</div>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
            <div className="text-sm text-purple-700 dark:text-purple-400 mb-1">Taux de réussite</div>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-300">
              {Math.round((correctAnswers / (currentQuestionIndex + 1)) * 100) || 0}%
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
            <div className="text-sm text-yellow-700 dark:text-yellow-400 mb-1">Temps moyen</div>
            <div className="text-2xl font-bold text-yellow-900 dark:text-yellow-300">
              {Math.round(timeSpent / (currentQuestionIndex + 1)) || 0}s
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .animate-shake {
          animation: shake 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default QuizRunner;