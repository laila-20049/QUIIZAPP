import React, { useState, useEffect, useRef } from 'react';
import { 
  Check, 
  X, 
  Clock, 
  Award, 
  Image as ImageIcon,
  ZoomIn,
  Target,
  Sparkles,
  Brain,
  BarChart3,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  Download,
  Info,
  AlertCircle,
  Star,
  Trophy
} from 'lucide-react';

const QuestionCardWithImage = ({ 
  question, 
  image, 
  options, 
  correctAnswer, 
  onAnswer,
  questionNumber = 1,
  totalQuestions = 10,
  timeLimit = 90,
  points = 3,
  difficulty = 'easy',
  category = 'Visuel',
  imageType = 'illustration',
  imageAlt = 'Question illustration',
  explanation = '',
  showMetadata = false
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showImageInfo, setShowImageInfo] = useState(false);
  const [shakeIncorrect, setShakeIncorrect] = useState(false);
  const timerRef = useRef(null);
  const imageRef = useRef(null);

  // Image types with icons and colors
  const imageTypes = {
    illustration: { icon: <ImageIcon className="h-4 w-4" />, color: 'bg-blue-500' },
    photo: { icon: <ImageIcon className="h-4 w-4" />, color: 'bg-green-500' },
    diagram: { icon: <BarChart3 className="h-4 w-4" />, color: 'bg-purple-500' },
    chart: { icon: <BarChart3 className="h-4 w-4" />, color: 'bg-yellow-500' },
    map: { icon: <Target className="h-4 w-4" />, color: 'bg-red-500' }
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
        onAnswer(false);
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
    setIsZoomed(false);
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

  const handleZoom = () => {
    setIsZoomed(!isZoomed);
    if (!isZoomed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image;
    link.download = `question-image-${questionNumber}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getOptionStyle = (option) => {
    if (!isSubmitted) {
      return "bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:shadow-lg";
    }
    
    if (option === correctAnswer) {
      return "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-500 dark:border-green-600 text-green-700 dark:text-green-400";
    }
    
    if (option === selectedAnswer && option !== correctAnswer) {
      return "bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-2 border-red-500 dark:border-red-600 text-red-700 dark:text-red-400";
    }
    
    return "bg-gray-100 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-500";
  };

  const getProgressPercentage = () => {
    return ((questionNumber - 1) / totalQuestions) * 100;
  };

  return (
    <>
      {/* Zoomed Image Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={handleZoom}
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <img 
              src={image} 
              alt={imageAlt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={handleZoom}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
            >
              <Minimize2 className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}

      {/* Main Card */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 rounded-2xl shadow-xl overflow-hidden max-w-2xl mx-auto border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-2xl">
        
        {/* Progress bar */}
        <div className="h-1 bg-gray-200 dark:bg-gray-800">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>

        {/* Image Section */}
        <div className="relative group">
          {/* Loading skeleton */}
          {!isImageLoaded && (
            <div className="h-48 md:h-64 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 animate-pulse" />
          )}
          
          <img 
            ref={imageRef}
            src={image} 
            alt={imageAlt}
            className={`w-full h-48 md:h-64 object-cover transition-all duration-500 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsImageLoaded(true)}
          />
          
          {/* Image overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Image badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className={`flex items-center gap-2 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm backdrop-blur-sm`}>
              {imageTypes[imageType]?.icon || <ImageIcon className="h-4 w-4" />}
              <span className="capitalize">{imageType}</span>
            </div>
            <div className="bg-black/70 text-white px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
              Q{questionNumber}
            </div>
          </div>

          {/* Image controls */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <button
              onClick={() => setShowImageInfo(!showImageInfo)}
              className="bg-black/70 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
              title="Image info"
            >
              <Info className="h-4 w-4" />
            </button>
            <button
              onClick={handleZoom}
              className="bg-black/70 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
              title="Zoom image"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              onClick={handleDownload}
              className="bg-black/70 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
              title="Download image"
            >
              <Download className="h-4 w-4" />
            </button>
          </div>

          {/* Timer overlay */}
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-2 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
              <Clock className="h-4 w-4" />
              <span className={`font-mono font-bold ${timeLeft < 30 ? 'text-red-300 animate-pulse' : ''}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {/* Image info panel */}
          {showImageInfo && (
            <div className="absolute bottom-16 right-4 w-64 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg p-3 shadow-xl border border-gray-200 dark:border-gray-700 animate-slide-up">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Type</span>
                  <span className="text-sm text-gray-900 dark:text-gray-300 capitalize">{imageType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Catégorie</span>
                  <span className="text-sm text-gray-900 dark:text-gray-300">{category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Difficulté</span>
                  <span className="text-sm text-gray-900 dark:text-gray-300 capitalize">{difficulty}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-lg opacity-30" />
                <Target className="relative h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Question Visuelle
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {category} • Analysez l'image pour répondre
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
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
              
              {showMetadata && (
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <Brain className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Difficulté: {difficulty}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Question basée sur l'image :
              </h3>
            </div>
            <p className="text-xl font-medium text-gray-900 dark:text-gray-100 leading-relaxed">
              {question}
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
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
                    p-4 rounded-xl text-left transition-all duration-300 transform
                    ${isSubmitted ? 'cursor-default' : 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]'}
                    ${getOptionStyle(option)}
                    ${isWrongSelected && shakeIncorrect ? 'animate-shake' : ''}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Option letter */}
                      <div className={`
                        flex items-center justify-center h-9 w-9 rounded-full border-2 font-bold transition-all duration-300
                        ${!isSubmitted
                          ? 'border-gray-300 text-gray-600 dark:text-gray-400'
                          : showCorrect
                            ? 'border-green-500 bg-green-500 text-white'
                            : isWrongSelected
                              ? 'border-red-500 bg-red-500 text-white'
                              : 'border-gray-300 text-gray-400 dark:text-gray-500'
                        }
                      `}>
                        {letter}
                      </div>
                      
                      {/* Option text */}
                      <span className="text-lg font-medium">
                        {option}
                      </span>
                    </div>
                    
                    {/* Status icon */}
                    {isSubmitted && (
                      <div className="flex-shrink-0">
                        {showCorrect ? (
                          <div className="h-7 w-7 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        ) : isWrongSelected ? (
                          <div className="h-7 w-7 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
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
                      ? '🌟 Analyse parfaite !' 
                      : '🔍 Observation à améliorer'
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
                          +{points} points • Excellente analyse visuelle !
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {explanation && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                      <div className="flex items-start gap-3">
                        <Brain className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-300 mb-2">
                            Explication visuelle :
                          </p>
                          <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
                            {explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Next question indicator */}
          {isSubmitted && (
            <div className="flex items-center justify-center">
              <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full animate-pulse flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span>Analyse terminée. Suivant dans 1s...</span>
              </div>
            </div>
          )}
        </div>
      </div>

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
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.6s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default QuestionCardWithImage;