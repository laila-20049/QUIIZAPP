import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';
import { 
  Play, 
  Pause, 
  CheckCircle, 
  XCircle, 
  Clock,
  Timer,
  Trophy,
  Star,
  BookOpen,
  BarChart3,
  Target,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  Award,
  AlertCircle,
  Volume2,
  VolumeX,
  RotateCcw,
  Flag,
  Share2,
  Bookmark,
  Zap,
  Users,
  Brain,
  Lightbulb,
  Sparkles,
  FastForward,
  Rewind,
  SkipForward,
  SkipBack,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes en secondes
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Données de démonstration
  const quizData = {
    id: '1',
    title: 'Algèbre Linéaire - S3',
    description: 'Quiz avancé sur les espaces vectoriels et transformations linéaires',
    category: 'Mathématiques',
    difficulty: 'Difficile',
    duration: 30,
    questionsCount: 15,
    participants: 1250,
    avgScore: 68,
    successRate: 72,
    questions: [
      {
        id: 1,
        question: "Quelle est la dimension d'un espace vectoriel engendré par 3 vecteurs linéairement indépendants ?",
        options: [
          "1",
          "2", 
          "3",
          "Dépend du corps de base"
        ],
        correctAnswer: 2,
        explanation: "La dimension d'un espace vectoriel est égale au nombre maximum de vecteurs linéairement indépendants qui peuvent l'engendrer.",
        difficulty: 'Moyenne',
        points: 10
      },
      {
        id: 2,
        question: "Quelle propriété caractérise une matrice orthogonale ?",
        options: [
          "Son déterminant est toujours 1",
          "Ses colonnes forment une base orthonormée",
          "Elle est toujours symétrique",
          "Son inverse n'existe pas"
        ],
        correctAnswer: 1,
        explanation: "Une matrice est orthogonale si et seulement si ses colonnes forment une base orthonormée de R^n.",
        difficulty: 'Difficile',
        points: 15
      },
      {
        id: 3,
        question: "Dans R^3, combien de plans vectoriels différents peuvent contenir une droite donnée ?",
        options: [
          "1",
          "2",
          "Une infinité",
          "3"
        ],
        correctAnswer: 2,
        explanation: "Dans R^3, une infinité de plans vectoriels peuvent contenir une droite donnée.",
        difficulty: 'Moyenne',
        points: 10
      }
    ]
  };

  const userAnswers = {};

  // Timer effect
  useEffect(() => {
    if (quizStarted && !isPaused && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizStarted, isPaused, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimeUp = () => {
    navigate(`/quiz/${id}/results`);
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswer = (optionIndex) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(optionIndex);
    
    // Simulation de réponse
    userAnswers[quizData.questions[currentQuestionIndex].id] = {
      selectedAnswer: optionIndex,
      isCorrect: optionIndex === quizData.questions[currentQuestionIndex].correctAnswer
    };
    
    // Afficher l'explication après un délai
    setTimeout(() => {
      setShowExplanation(true);
    }, 1000);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
      setBookmarked(false);
    } else {
      navigate(`/quiz/${id}/results`);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedOption(null);
      setShowExplanation(false);
    }
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizData.questions.length) * 100;

  const getOptionStyle = (optionIndex) => {
    if (selectedOption === null) {
      return "bg-white border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50";
    }
    
    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    const isSelected = selectedOption === optionIndex;
    
    if (isCorrect) {
      return "bg-green-50 border-2 border-green-500 text-green-700";
    }
    
    if (isSelected && !isCorrect) {
      return "bg-red-50 border-2 border-red-500 text-red-700";
    }
    
    return "bg-gray-50 border-2 border-gray-200 text-gray-600";
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate('/quizzes')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 group"
            >
              <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              Retour aux quiz
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 rounded-lg bg-white shadow-sm hover:shadow-md border border-gray-200"
                title={soundEnabled ? "Désactiver le son" : "Activer le son"}
              >
                {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
              </button>
              <button className="p-2 rounded-lg bg-white shadow-sm hover:shadow-md border border-gray-200">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Quiz Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-8">
            {/* Banner */}
            <div className="relative h-40 bg-gradient-to-r from-blue-600 to-purple-600">
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <Brain className="h-32 w-32" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full">
                    {quizData.category}
                  </span>
                  <span className={`px-3 py-1 text-white text-sm rounded-full ${
                    quizData.difficulty === 'Facile' ? 'bg-green-500' :
                    quizData.difficulty === 'Moyenne' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}>
                    {quizData.difficulty}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">{quizData.title}</h1>
                <p className="text-blue-100">{quizData.description}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{quizData.questionsCount}</div>
                  <div className="text-sm text-gray-600">Questions</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600 mb-1">{quizData.duration} min</div>
                  <div className="text-sm text-gray-600">Durée</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600 mb-1">{quizData.participants}</div>
                  <div className="text-sm text-gray-600">Participants</div>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-xl">
                  <div className="text-2xl font-bold text-amber-600 mb-1">{quizData.avgScore}%</div>
                  <div className="text-sm text-gray-600">Score moyen</div>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-blue-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-blue-600" />
                  Instructions importantes
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Temps limité : {quizData.duration} minutes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Navigation libre entre les questions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Réponses finales non modifiables</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Score basé sur les bonnes réponses</span>
                  </li>
                </ul>
              </div>

              {/* Start Button */}
              <div className="text-center">
                <button
                  onClick={handleStartQuiz}
                  className="group relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 flex items-center gap-3 mx-auto"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity"></div>
                  <Play className="h-6 w-6 relative z-10" />
                  <span className="relative z-10">Commencer le Quiz</span>
                  <Sparkles className="h-5 w-5 relative z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <p className="text-gray-500 text-sm mt-4">
                  {user?.firstName ? `Bon courage, ${user.firstName} !` : 'Prêt à tester vos connaissances ?'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz en cours
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Top Bar */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Quiz Info */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(`/quiz/${id}`)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 group"
              >
                <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:inline">Quiz</span>
              </button>
              
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-gray-900 truncate">{quizData.title}</h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>Question {currentQuestionIndex + 1}/{quizData.questions.length}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Trophy className="h-3 w-3" />
                    {currentQuestion.points} pts
                  </span>
                </div>
              </div>
            </div>

            {/* Timer & Controls */}
            <div className="flex items-center gap-4">
              {/* Timer */}
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold ${
                timeLeft < 300 ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-blue-100 text-blue-700'
              }`}>
                <Timer className="h-5 w-5" />
                <span className="text-lg">{formatTime(timeLeft)}</span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePause}
                  className={`p-2 rounded-lg ${
                    isPaused ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title={isPaused ? "Reprendre" : "Pause"}
                >
                  {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
                </button>
                
                <button
                  onClick={toggleBookmark}
                  className={`p-2 rounded-lg ${
                    bookmarked ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Bookmark className={`h-5 w-5 ${bookmarked ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progression</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 mb-8">
          {/* Question Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white font-bold text-lg">
                {currentQuestionIndex + 1}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Question</div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    currentQuestion.difficulty === 'Facile' ? 'bg-green-100 text-green-700' :
                    currentQuestion.difficulty === 'Moyenne' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {currentQuestion.difficulty}
                  </span>
                  <span className="text-sm text-gray-500">{currentQuestion.points} points</span>
                </div>
              </div>
            </div>

            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Flag className="h-5 w-5" />
            </button>
          </div>

          {/* Question Text */}
          <h3 className="text-xl font-semibold text-gray-900 mb-8 leading-relaxed">
            {currentQuestion.question}
          </h3>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, index) => {
              const isCorrect = index === currentQuestion.correctAnswer;
              const isSelected = selectedOption === index;
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedOption !== null}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${getOptionStyle(index)} ${
                    selectedOption === null ? 'hover:scale-[1.02] hover:shadow-md cursor-pointer' : 'cursor-default'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-lg border-2 ${
                        selectedOption === null 
                          ? 'border-gray-300 text-gray-600' 
                          : isCorrect
                            ? 'border-green-500 bg-green-500 text-white'
                            : isSelected && !isCorrect
                              ? 'border-red-500 bg-red-500 text-white'
                              : 'border-gray-300 text-gray-400'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-lg font-medium">{option}</span>
                    </div>
                    
                    {selectedOption !== null && (
                      <>
                        {isCorrect && <CheckCircle2 className="h-6 w-6 text-green-500" />}
                        {isSelected && !isCorrect && <XCircle className="h-6 w-6 text-red-500" />}
                      </>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-start gap-3">
                <HelpCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-blue-900 mb-2">Explication</div>
                  <div className="text-blue-800 leading-relaxed">{currentQuestion.explanation}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <Rewind className="h-5 w-5" />
              Précédent
            </button>
            
            <button
              onClick={() => setCurrentQuestionIndex(0)}
              className="px-4 py-3 rounded-xl border-2 border-gray-300 hover:bg-gray-50 transition-colors"
              title="Recommencer"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(`/quiz/${id}/results`)}
              className="px-5 py-3 rounded-xl border-2 border-red-300 text-red-600 hover:bg-red-50 transition-colors"
            >
              Abandonner
            </button>
            
            <button
              onClick={handleNextQuestion}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              {currentQuestionIndex === quizData.questions.length - 1 ? (
                <>
                  Terminer
                  <Trophy className="h-5 w-5" />
                </>
              ) : (
                <>
                  Suivant
                  <FastForward className="h-5 w-5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="mt-12">
          <h4 className="font-semibold text-gray-900 mb-4 text-center">Navigation rapide</h4>
          <div className="flex flex-wrap justify-center gap-2">
            {quizData.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium transition-all ${
                  index === currentQuestionIndex
                    ? 'bg-blue-500 text-white ring-2 ring-blue-200 scale-110'
                    : index < currentQuestionIndex
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                title={`Question ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-6 w-6 text-amber-600 flex-shrink-0" />
            <div>
              <div className="font-semibold text-amber-900 mb-2">Astuce</div>
              <div className="text-amber-800">
                Prenez votre temps pour lire attentivement chaque question. Revenez sur les questions difficiles si nécessaire.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;