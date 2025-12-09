import React, { useState, useEffect, useRef } from 'react';
import { 
  Check, 
  X, 
  Clock, 
  Award, 
  BookOpen, 
  Target,
  Brain,
  Sparkles,
  Timer,
  BarChart3,
  TrendingUp,
  Zap,
  ChevronRight,
  AlertCircle,
  Lightbulb,
  Trophy,
  Crown,
  Star
} from 'lucide-react';

const QuestionCard = ({ 
  question, 
  options, 
  correctAnswer, 
  onAnswer,
  showResult = false,
  questionNumber = 1,
  totalQuestions = 10,
  timeLimit = 120, // seconds
  points = 5,
  difficulty = 'medium',
  category = 'Général',
  explanation = '',
  showHint = false,
  streak = 0
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [showHintLocal, setShowHint] = useState(false);
  const [shakeIncorrect, setShakeIncorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const timerRef = useRef(null);

  // Difficulty configurations
  const difficultyConfig = {
    easy: { color: 'bg-green-500', label: 'Facile', points: points },
    medium: { color: 'bg-yellow-500', label: 'Moyen', points: points * 1.5 },
    hard: { color: 'bg-red-500', label: 'Difficile', points: points * 2 }
  };

  // Streak badges
  const streakBadges = {
    3: { icon: <Zap className="h-3 w-3" />, color: 'bg-yellow-500' },
    5: { icon: <Sparkles className="h-3 w-3" />, color: 'bg-purple-500' },
    10: { icon: <Crown className="h-3 w-3" />, color: 'bg-gradient-to-r from-yellow-500 to-orange-500' }
  };

  // Start timer
  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timeLeft, isSubmitted]);

  const handleTimeout = () => {
    if (!isSubmitted) {
      setIsSubmitted(true);
      setTimeout(() => {
        onAnswer(false); // Timeout = wrong answer
        resetQuestion();
      }, 2000);
    }
  };

  const handleAnswer = (answer) => {
    if (isSubmitted) return;
    
    setSelectedAnswer(answer);
    setIsSubmitted(true);
    
    if (answer !== correctAnswer) {
      setShakeIncorrect(true);
      setTimeout(() => setShakeIncorrect(false), 600);
    }
    
    setTimeout(() => {
      onAnswer(answer === correctAnswer);
      resetQuestion();
    }, 2000);
  };

  const resetQuestion = () => {
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setTimeLeft(timeLimit);
    setShowHint(false);
    setShakeIncorrect(false);
    setShowExplanation(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return ((questionNumber - 1) / totalQuestions) * 100;
  };

  const getCurrentPoints = () => {
    const basePoints = difficultyConfig[difficulty].points;
    return selectedAnswer === correctAnswer ? basePoints : 0;
  };

  const getStreakBadge = () => {
    for (const streakLevel of Object.keys(streakBadges).sort((a, b) => b - a)) {
      if (streak >= parseInt(streakLevel)) {
        return streakBadges[streakLevel];
      }
    }
    return null;
  };

  const streakBadge = getStreakBadge();

  return (
    <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 rounded-2xl shadow-xl p-6 max-w-2xl mx-auto border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-2xl">
      
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 rounded-t-2xl overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
          style={{ width: `${getProgressPercentage()}%` }}
        />
      </div>

      {/* Question header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-lg opacity-30" />
            <BookOpen className="relative h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Question {questionNumber} sur {totalQuestions}
              </span>
              <div className={`px-2 py-1 rounded-full text-xs font-bold ${difficultyConfig[difficulty].color} text-white`}>
                {difficultyConfig[difficulty].label}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{category}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          {/* Timer */}
          <div className="relative">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Timer className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <div className={`absolute inset-0 ${
                  timeLeft < 30 ? 'bg-red-500' : 'bg-blue-500'
                } rounded-full animate-ping opacity-20`} />
              </div>
              <span className={`text-lg font-mono font-bold ${
                timeLeft < 30 ? 'text-red-600 animate-pulse' : 'text-gray-700 dark:text-gray-300'
              }`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {/* Points */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Award className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-500 animate-pulse" />
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
                {getCurrentPoints()}
              </div>
              <div className="text-xs text-gray-500">points</div>
            </div>
          </div>

          {/* Streak */}
          {streak > 0 && (
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  streakBadge ? streakBadge.color : 'bg-gradient-to-r from-green-500 to-emerald-500'
                }`}>
                  {streakBadge ? streakBadge.icon : <TrendingUp className="h-4 w-4 text-white" />}
                </div>
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center text-xs font-bold">
                  {streak}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="h-5 w-5 text-purple-500" />
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Sélectionnez la meilleure réponse :
          </h3>
        </div>
        
        <div className="relative">
          <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
          <p className="text-xl font-medium text-gray-900 dark:text-gray-100 leading-relaxed pl-4">
            {question}
          </p>
        </div>
      </div>

      {/* Hint toggle */}
      {showHint && explanation && (
        <div className="mb-6">
          <button
            onClick={() => setShowHintLocal(!showHintLocal)}
            className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors"
          >
            <Lightbulb className="h-4 w-4" />
            {showHintLocal ? 'Cacher l\'indice' : 'Voir un indice'}
            <ChevronRight className={`h-4 w-4 transition-transform ${showHintLocal ? 'rotate-90' : ''}`} />
          </button>
          
          {showHintLocal && (
            <div className="mt-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800 animate-slide-down">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                <div>
                  <p className="font-medium text-purple-800 dark:text-purple-300 mb-1">Indice :</p>
                  <p className="text-sm text-purple-700/80 dark:text-purple-400/80">{explanation}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Options */}
      <div className="space-y-3 mb-8">
        {options.map((option, index) => {
          const isCorrect = option === correctAnswer;
          const isSelected = option === selectedAnswer;
          const isWrongSelected = isSelected && !isCorrect;
          const showCorrect = isSubmitted && isCorrect;
          const letter = String.fromCharCode(65 + index);
          
          return (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={isSubmitted}
              className={`
                w-full text-left p-5 rounded-xl transition-all duration-300 transform
                ${isSubmitted ? 'cursor-default' : 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]'}
                ${!isSubmitted
                  ? 'bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg'
                  : showCorrect
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-500 dark:border-green-600'
                    : isWrongSelected
                      ? `${shakeIncorrect ? 'animate-shake' : ''} bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-2 border-red-500 dark:border-red-600`
                      : 'bg-gray-50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Option letter */}
                  <div className={`
                    flex items-center justify-center h-10 w-10 rounded-full border-2 font-bold transition-all duration-300
                    ${!isSubmitted
                      ? 'border-gray-300 text-gray-600 dark:text-gray-400'
                      : showCorrect
                        ? 'border-green-500 bg-green-500 text-white'
                        : isWrongSelected
                          ? 'border-red-500 bg-red-500 text-white'
                          : 'border-gray-300 text-gray-400'
                    }
                  `}>
                    {letter}
                  </div>
                  
                  {/* Option text */}
                  <span className={`text-lg font-medium ${
                    !isSubmitted
                      ? 'text-gray-800 dark:text-gray-200'
                      : showCorrect
                        ? 'text-green-700 dark:text-green-400'
                        : isWrongSelected
                          ? 'text-red-700 dark:text-red-400'
                          : 'text-gray-500 dark:text-gray-500'
                  }`}>
                    {option}
                  </span>
                </div>
                
                {/* Status icon */}
                {isSubmitted && (
                  <div className="flex-shrink-0">
                    {showCorrect ? (
                      <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    ) : isWrongSelected ? (
                      <div className="h-8 w-8 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                        <X className="h-4 w-4 text-white" />
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {isSubmitted && (
        <div className={`
          relative overflow-hidden rounded-xl border p-5 mb-4
          ${selectedAnswer === correctAnswer 
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800' 
            : 'bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-200 dark:border-red-800'
          }
          animate-slide-up
        `}>
          {/* Animated background */}
          <div className="absolute inset-0 opacity-10">
            {selectedAnswer === correctAnswer ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Trophy className="h-32 w-32 text-green-500" />
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <AlertCircle className="h-32 w-32 text-red-500" />
              </div>
            )}
          </div>
          
          <div className="relative flex items-start gap-4">
            <div className="flex-shrink-0">
              {selectedAnswer === correctAnswer ? (
                <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                  <Check className="h-6 w-6 text-white" />
                </div>
              ) : (
                <div className="h-12 w-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                  <X className="h-6 w-6 text-white" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h4 className={`text-xl font-bold mb-2 ${
                selectedAnswer === correctAnswer 
                  ? 'text-green-800 dark:text-green-300' 
                  : 'text-red-800 dark:text-red-300'
              }`}>
                {selectedAnswer === correctAnswer 
                  ? '🎉 Excellente réponse !' 
                  : '💡 Presque !'
                }
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div className="p-3 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Votre réponse
                  </p>
                  <p className={`font-bold text-lg ${
                    selectedAnswer === correctAnswer ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {selectedAnswer}
                  </p>
                </div>
                
                {selectedAnswer !== correctAnswer && (
                  <div className="p-3 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Bonne réponse
                    </p>
                    <p className="font-bold text-lg text-green-600">{correctAnswer}</p>
                  </div>
                )}
              </div>
              
              {selectedAnswer === correctAnswer && (
                <div className="mt-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <p className="font-medium text-yellow-800 dark:text-yellow-300">
                      +{getCurrentPoints()} points • Série de {streak + 1} bonnes réponses !
                    </p>
                  </div>
                </div>
              )}
              
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                {showExplanation ? 'Cacher l\'explication' : 'Voir l\'explication détaillée'}
                <ChevronRight className={`h-4 w-4 transition-transform ${showExplanation ? 'rotate-90' : ''}`} />
              </button>
            </div>
          </div>
          
          {/* Detailed explanation */}
          {showExplanation && explanation && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 animate-slide-down">
              <div className="flex items-start gap-3">
                <Brain className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-300 mb-2">
                    Explication :
                  </p>
                  <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
                    {explanation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Next question indicator */}
      {isSubmitted && (
        <div className="flex items-center justify-center">
          <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full animate-pulse flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span>Question suivante dans 1s...</span>
          </div>
        </div>
      )}

      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default QuestionCard;