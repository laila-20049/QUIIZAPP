import React, { useState, useEffect, useRef } from 'react';
import { 
  Calculator, 
  Clock, 
  Award, 
  Check, 
  X, 
  BarChart3,
  Target,
  Brain,
  Sparkles,
  Timer,
  Calculator as CalcIcon,
  Divide,
  SquareRoot,
  Pi,
  Infinity,
  Percent,
  Plus,
  Minus,
  X as Multiply,
  Divide as DivideIcon,
  Equal
} from 'lucide-react';

const MathQuestionCard = ({ 
  question, 
  formula, 
  options, 
  correctAnswer, 
  onAnswer,
  difficulty = 'medium',
  topic = 'Algèbre',
  timeLimit = 180, // seconds
  points = 10,
  explanation = '',
  showHint = false
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [showHintLocal, setShowHint] = useState(false);
  const [shakeIncorrect, setShakeIncorrect] = useState(false);
  const timerRef = useRef(null);

  // Difficulty color mapping
  const difficultyColors = {
    easy: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    hard: 'bg-red-100 text-red-800 border-red-200'
  };

  // Topic icons
  const topicIcons = {
    'Algèbre': <Plus className="h-4 w-4" />,
    'Géométrie': <SquareRoot className="h-4 w-4" />,
    'Trigonométrie': <Pi className="h-4 w-4" />,
    'Calcul': <CalcIcon className="h-4 w-4" />,
    'Statistiques': <BarChart3 className="h-4 w-4" />,
    'Probabilités': <Percent className="h-4 w-4" />
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
        resetCard();
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
      resetCard();
    }, 2000);
  };

  const resetCard = () => {
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setTimeLeft(timeLimit);
    setShowHint(false);
    setShakeIncorrect(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getMathSymbol = (option) => {
    // Check if option contains special math symbols
    if (option.includes('√')) return <SquareRoot className="h-4 w-4 inline" />;
    if (option.includes('π')) return <Pi className="h-4 w-4 inline" />;
    if (option.includes('∞')) return <Infinity className="h-4 w-4 inline" />;
    if (option.includes('≈')) return <Divide className="h-4 w-4 inline" />;
    return null;
  };

  const getProgressColor = () => {
    const percentage = (timeLeft / timeLimit) * 100;
    if (percentage > 50) return 'bg-green-500';
    if (percentage > 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 rounded-2xl shadow-xl p-6 max-w-2xl mx-auto border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-2xl">
      
      {/* Floating difficulty badge */}
      <div className={`absolute -top-3 left-6 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border ${difficultyColors[difficulty]}`}>
        {difficulty}
      </div>

      {/* En-tête amélioré */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-lg opacity-30" />
            <Calculator className="relative h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Défi Mathématique
            </h2>
            <div className="flex items-center gap-2 mt-1">
              {topicIcons[topic] || <Brain className="h-3 w-3 text-gray-500" />}
              <span className="text-sm text-gray-600 dark:text-gray-400">{topic}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          {/* Timer with progress bar */}
          <div className="relative">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Timer className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <div className={`absolute inset-0 ${getProgressColor()} rounded-full animate-ping opacity-20`} />
              </div>
              <span className={`text-lg font-mono font-bold ${
                timeLeft < 30 ? 'text-red-600 animate-pulse' : 'text-gray-700 dark:text-gray-300'
              }`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            {/* Progress bar */}
            <div className="mt-1 h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getProgressColor()} transition-all duration-1000 ease-linear`}
                style={{ width: `${(timeLeft / timeLimit) * 100}%` }}
              />
            </div>
          </div>

          {/* Points display */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Award className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-500 animate-pulse" />
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-800 dark:text-gray-200">{points}</div>
              <div className="text-xs text-gray-500">points</div>
            </div>
          </div>
        </div>
      </div>

      {/* Question et formule avec animation */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Target className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Question
          </h3>
        </div>
        
        <p className="text-xl font-medium text-gray-900 dark:text-gray-100 leading-relaxed">
          {question}
        </p>
        
        {formula && (
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
            <div className="relative bg-white/50 dark:bg-gray-800/50 p-5 rounded-xl border-2 border-blue-100 dark:border-blue-900/30 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <CalcIcon className="h-4 w-4" />
                  Expression mathématique
                </span>
                <button
                  onClick={() => setShowHint(!showHintLocal)}
                  className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors"
                >
                  {showHintLocal ? 'Cacher l\'aide' : 'Besoin d\'aide ?'}
                </button>
              </div>
              <div className="text-center text-2xl font-mono text-gray-800 dark:text-gray-200 bg-white/50 dark:bg-gray-900/50 p-4 rounded-lg">
                {formula}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hint section */}
      {showHintLocal && explanation && (
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800 animate-slide-down">
          <div className="flex items-start gap-3">
            <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-blue-800 dark:text-blue-300 mb-1">Indice :</p>
              <p className="text-sm text-blue-700/80 dark:text-blue-400/80">{explanation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Options numériques améliorées */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="h-5 w-5 text-green-500" />
          <span className="font-medium text-gray-700 dark:text-gray-300">Sélectionnez la réponse correcte :</span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {options.map((option, index) => {
            const isCorrect = option === correctAnswer;
            const isSelected = option === selectedAnswer;
            const isWrongSelected = isSelected && !isCorrect;
            const showCorrect = isSubmitted && isCorrect;
            
            return (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={isSubmitted}
                className={`
                  relative p-5 rounded-xl text-center font-mono text-xl font-bold 
                  transition-all duration-300 transform hover:scale-105 active:scale-95
                  ${isSubmitted ? 'cursor-default' : 'cursor-pointer hover:shadow-lg'}
                  ${!isSubmitted
                    ? 'bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                    : showCorrect
                      ? 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border-2 border-green-500 dark:border-green-600 text-green-700 dark:text-green-400'
                      : isWrongSelected
                        ? `${shakeIncorrect ? 'animate-shake' : ''} bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 border-2 border-red-500 dark:border-red-600 text-red-700 dark:text-red-400`
                        : 'bg-gray-100 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400'
                  }
                `}
              >
                {/* Option label */}
                <div className="flex items-center justify-center gap-2">
                  {getMathSymbol(option)}
                  <span>{option}</span>
                </div>
                
                {/* Status indicators */}
                {isSubmitted && (
                  <div className="absolute -top-2 -right-2">
                    {showCorrect ? (
                      <div className="h-6 w-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    ) : isWrongSelected ? (
                      <div className="h-6 w-6 bg-red-500 rounded-full flex items-center justify-center">
                        <X className="h-3 w-3 text-white" />
                      </div>
                    ) : null}
                  </div>
                )}
                
                {/* Option number */}
                <div className="absolute -top-2 -left-2 h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-xs font-medium">
                  {String.fromCharCode(65 + index)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback détaillé avec animation */}
      {isSubmitted && (
        <div className={`
          relative overflow-hidden rounded-xl border p-4 
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
                <Check className="h-32 w-32 text-green-500" />
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <X className="h-32 w-32 text-red-500" />
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
              <h4 className={`text-lg font-bold mb-1 ${
                selectedAnswer === correctAnswer 
                  ? 'text-green-800 dark:text-green-300' 
                  : 'text-red-800 dark:text-red-300'
              }`}>
                {selectedAnswer === correctAnswer 
                  ? '🎉 Parfait !' 
                  : '🤔 À revoir...'}
              </h4>
              
              <p className={`mb-2 ${
                selectedAnswer === correctAnswer 
                  ? 'text-green-700/90 dark:text-green-400/90' 
                  : 'text-red-700/90 dark:text-red-400/90'
              }`}>
                {selectedAnswer === correctAnswer 
                  ? 'Votre raisonnement mathématique est impeccable !'
                  : `La réponse correcte est ${correctAnswer}.`
                }
              </p>
              
              {selectedAnswer !== correctAnswer && explanation && (
                <div className="mt-3 p-3 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Explication :</span> {explanation}
                  </p>
                </div>
              )}
              
              <div className="mt-4 flex items-center gap-4">
                <div className="px-3 py-1.5 bg-white/80 dark:bg-gray-900/80 rounded-lg">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Votre réponse :</span>
                  <span className={`ml-2 font-mono font-bold ${
                    selectedAnswer === correctAnswer ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {selectedAnswer}
                  </span>
                </div>
                
                {selectedAnswer !== correctAnswer && (
                  <div className="px-3 py-1.5 bg-white/80 dark:bg-gray-900/80 rounded-lg">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Bonne réponse :</span>
                    <span className="ml-2 font-mono font-bold text-green-600">{correctAnswer}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Score calculation preview */}
      {!isSubmitted && (
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Score potentiel :</span>
            <span className="font-medium text-gray-800 dark:text-gray-300">
              {points} points pour une réponse correcte
            </span>
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
            transform: translateY(-20px);
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

export default MathQuestionCard;