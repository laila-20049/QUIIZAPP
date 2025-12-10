import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  CheckCircle2, 
  XCircle, 
  Clock,
  Timer,
  Trophy,
  Star,
  BookOpen,
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
  BarChart3,
  Settings,
  Maximize2,
  Minimize2,
  X,
  Check,
  FastForward,
  RefreshCw,
  Brain,
  Sparkles,
  Layers,
  TrendingUp,
  Target as TargetIcon,
  ChevronUp,
  ChevronDown,
  AlertTriangle,
  Crown,
  Medal,
  Eye,
  EyeOff,
  MessageSquare,
  ExternalLink,
  MousePointerClick,
  Percent,
  Hash,
  Clock4,
  Grid3x3,
  Menu,
  BookMarked,
  Filter,
  MoreVertical
} from 'lucide-react';

const QuizPlay = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    currentQuiz, 
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    userAnswers,
    timeSpent,
    status,
    loading,
    error,
    loadQuiz,
    startQuiz,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    pauseQuiz,
    resumeQuiz,
    submitQuiz,
    resetQuiz,
    isQuestionAnswered,
    getUserAnswer,
    getFormattedTime
  } = useQuiz();
  const { user } = useAuth();

  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [quizDuration] = useState(currentQuiz?.duration || 30);
  const [timeLeft, setTimeLeft] = useState(quizDuration * 60);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showQuickStats, setShowQuickStats] = useState(true);
  const [autoProceed, setAutoProceed] = useState(true);
  const [showQuestionNavigation, setShowQuestionNavigation] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showTimerAlert, setShowTimerAlert] = useState(false);

  const timerRef = useRef(null);
  const containerRef = useRef(null);
  const timerAlertRef = useRef(null);

  // Charger le quiz
  useEffect(() => {
    if (id) {
      loadQuiz(id);
    }
  }, [id, loadQuiz]);

  // Gérer le timer avec alertes
  useEffect(() => {
    if (status === 'in_progress' && !isPaused && quizStarted) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 300 && prev > 0) { // 5 minutes restantes
            setShowTimerAlert(true);
          }
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleTimeUp();
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
  }, [status, isPaused, quizStarted]);

  // Gérer les alertes de timer
  useEffect(() => {
    if (showTimerAlert) {
      timerAlertRef.current = setTimeout(() => {
        setShowTimerAlert(false);
      }, 5000);
    }
    return () => {
      if (timerAlertRef.current) {
        clearTimeout(timerAlertRef.current);
      }
    };
  }, [showTimerAlert]);

  // Gérer le plein écran
  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimeUp = () => {
    submitQuiz();
    navigate(`/quiz/${id}/results`);
  };

  const handleStartQuiz = () => {
    startQuiz(currentQuiz);
    setQuizStarted(true);
    setTimeLeft(quizDuration * 60);
    
    // Auto fullscreen option
    if (fullscreen && containerRef.current.requestFullscreen) {
      containerRef.current.requestFullscreen();
    }
  };

  const handleAnswer = (optionIndex) => {
    if (isQuestionAnswered(currentQuestion?.id) || !currentQuestion) return;
    
    setSelectedOption(optionIndex);
    
    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    
    answerQuestion({
      questionId: currentQuestion.id,
      selectedAnswer: optionIndex,
      isCorrect,
      timeSpent: Math.floor((quizDuration * 60 - timeLeft) / totalQuestions)
    });

    // Son de feedback
    if (soundEnabled) {
      const audio = new Audio(
        isCorrect 
          ? 'https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3'
          : 'https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3'
      );
      audio.volume = 0.3;
      audio.play();
    }

    // Afficher l'explication après un délai
    setTimeout(() => {
      setShowExplanation(true);
      if (autoProceed && currentQuestionIndex < totalQuestions - 1) {
        setTimeout(() => {
          handleNext();
        }, 2000);
      }
    }, 1000);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    nextQuestion();
  };

  const handlePrevious = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    previousQuestion();
  };

  const handleSkip = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    nextQuestion();
  };

  const togglePause = () => {
    if (isPaused) {
      resumeQuiz();
      setIsPaused(false);
    } else {
      pauseQuiz();
      setIsPaused(true);
    }
  };

  const toggleFullscreen = () => {
    if (!fullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const toggleBookmark = (questionId) => {
    setBookmarkedQuestions(prev => 
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const toggleFlag = (questionId) => {
    setFlaggedQuestions(prev => 
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleSubmit = () => {
    submitQuiz();
    navigate(`/quiz/${id}/results`);
  };

  const handleReset = () => {
    resetQuiz();
    setQuizStarted(false);
    setTimeLeft(quizDuration * 60);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  const calculateProgress = () => {
    return totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0;
  };

  const calculateScore = () => {
    const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
    return totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  };

  const getQuestionStatus = (questionIndex) => {
    if (questionIndex < currentQuestionIndex) {
      const answer = userAnswers[questionIndex];
      return answer?.isCorrect ? 'correct' : 'incorrect';
    }
    if (questionIndex === currentQuestionIndex) return 'current';
    return 'pending';
  };

  const getOptionStyle = (optionIndex) => {
    if (!currentQuestion || !isQuestionAnswered(currentQuestion.id)) {
      return "bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg hover:scale-[1.02]";
    }
    
    const userAnswer = getUserAnswer(currentQuestion.id);
    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    const isSelected = userAnswer?.selectedAnswer === optionIndex;
    
    if (isCorrect) {
      return "bg-gradient-to-br from-green-100 to-green-50 border-2 border-green-500 text-green-800 shadow-md";
    }
    
    if (isSelected && !isCorrect) {
      return "bg-gradient-to-br from-red-100 to-red-50 border-2 border-red-500 text-red-800 shadow-md";
    }
    
    return "bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-gray-200 text-gray-500";
  };

  const navigateToQuestion = (questionIndex) => {
    if (questionIndex >= 0 && questionIndex < totalQuestions) {
      setSelectedOption(null);
      setShowExplanation(false);
      // À implémenter: fonction pour aller à une question spécifique
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
            <Brain className="h-10 w-10 text-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="text-gray-600 text-lg font-medium">Chargement du quiz...</div>
          <div className="text-gray-400 text-sm mt-2">Préparation de votre expérience d'apprentissage</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-3xl shadow-2xl p-8 max-w-md">
          <AlertCircle className="h-20 w-20 text-red-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Erreur de chargement</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/quizzes" className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              Retour aux quiz
            </Link>
            <button 
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Écran d'introduction
  if (!quizStarted && status !== 'in_progress') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50" ref={containerRef}>
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 opacity-10 rounded-full -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 opacity-10 rounded-full translate-x-48 translate-y-48"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-300 opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-12">
          {/* En-tête */}
          <div className="flex items-center justify-between mb-12">
            <Link 
              to={`/quiz/${id}`}
              className="group flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-x-1"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
              <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                Retour aux détails
              </span>
            </Link>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-3 rounded-xl shadow-lg transition-all duration-300 ${
                  soundEnabled 
                    ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-600' 
                    : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600'
                } hover:shadow-xl hover:-translate-y-1`}
              >
                {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
              </button>
              
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-3 rounded-xl shadow-lg transition-all duration-300 ${
                  showSettings 
                    ? 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-600' 
                    : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600'
                } hover:shadow-xl hover:-translate-y-1`}
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-gradient-to-br from-white via-white to-blue-50 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 mb-8">
            {/* Hero Banner */}
            <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 p-8 md:p-12">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 to-transparent"></div>
              <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full text-white mb-6">
                    <Crown className="h-5 w-5" />
                    <span className="font-medium">Quiz Premium</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                    Prêt à relever le <span className="text-yellow-300">défi</span> ?
                  </h1>
                  <p className="text-blue-100 text-lg md:text-xl mb-6 max-w-2xl">
                    Testez vos connaissances et progressez vers l'excellence
                  </p>
                </div>
                
                {/* Stats Card */}
                <div className="lg:w-96">
                  <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-white to-blue-100 rounded-2xl mb-4">
                        <Brain className="h-10 w-10 text-blue-600" />
                      </div>
                      <div className="text-5xl font-bold text-white mb-2">{totalQuestions}</div>
                      <div className="text-blue-100 text-lg">Questions intelligentes</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{quizDuration}</div>
                        <div className="text-blue-100 text-sm">Minutes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">100</div>
                        <div className="text-blue-100 text-sm">Points</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg">
                      <Hash className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{totalQuestions}</div>
                      <div className="text-sm text-gray-600">Questions</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-r from-green-100 to-green-200 rounded-lg">
                      <Clock4 className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{quizDuration}</div>
                      <div className="text-sm text-gray-600">Minutes</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg">
                      <TargetIcon className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {currentQuiz?.difficulty === 'beginner' ? '★' : 
                         currentQuiz?.difficulty === 'intermediate' ? '★★' : 
                         currentQuiz?.difficulty === 'advanced' ? '★★★' : '★★★★'}
                      </div>
                      <div className="text-sm text-gray-600">Difficulté</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-lg">
                      <Trophy className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">100</div>
                      <div className="text-sm text-gray-600">Points max</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Règles et conseils */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-3">
                    <AlertCircle className="h-5 w-5" />
                    Règles importantes
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-blue-800">
                      <div className="w-6 h-6 bg-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-blue-600" />
                      </div>
                      <span>Limite de temps: {quizDuration} minutes</span>
                    </li>
                    <li className="flex items-start gap-3 text-blue-800">
                      <div className="w-6 h-6 bg-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-blue-600" />
                      </div>
                      <span>Navigation libre entre les questions</span>
                    </li>
                    <li className="flex items-start gap-3 text-blue-800">
                      <div className="w-6 h-6 bg-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-blue-600" />
                      </div>
                      <span>Réponses définitives après soumission</span>
                    </li>
                    <li className="flex items-start gap-3 text-blue-800">
                      <div className="w-6 h-6 bg-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-blue-600" />
                      </div>
                      <span>Marquage et signalement disponibles</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
                  <h3 className="font-bold text-green-900 mb-4 flex items-center gap-3">
                    <Sparkles className="h-5 w-5" />
                    Conseils de réussite
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-green-800">
                      <div className="w-6 h-6 bg-green-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Target className="h-3 w-3 text-green-600" />
                      </div>
                      <span>Gérez votre temps efficacement</span>
                    </li>
                    <li className="flex items-start gap-3 text-green-800">
                      <div className="w-6 h-6 bg-green-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Brain className="h-3 w-3 text-green-600" />
                      </div>
                      <span>Relisez chaque question attentivement</span>
                    </li>
                    <li className="flex items-start gap-3 text-green-800">
                      <div className="w-6 h-6 bg-green-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen className="h-3 w-3 text-green-600" />
                      </div>
                      <span>Utilisez les marque-pages pour révision</span>
                    </li>
                    <li className="flex items-start gap-3 text-green-800">
                      <div className="w-6 h-6 bg-green-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="h-3 w-3 text-green-600" />
                      </div>
                      <span>Analysez les explications pour progresser</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Paramètres */}
              {showSettings && (
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 mb-8 border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4">Paramètres personnalisés</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 cursor-pointer transition-colors">
                      <div className="flex items-center gap-3">
                        <Volume2 className="h-5 w-5 text-gray-600" />
                        <div>
                          <div className="font-medium text-gray-900">Sons de feedback</div>
                          <div className="text-sm text-gray-600">Activer les sons de validation</div>
                        </div>
                      </div>
                      <div className={`w-12 h-6 rounded-full transition-colors ${
                        soundEnabled ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gray-300'
                      } relative`}>
                        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          soundEnabled ? 'transform translate-x-6' : ''
                        }`}></div>
                      </div>
                    </label>
                    
                    <label className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 cursor-pointer transition-colors">
                      <div className="flex items-center gap-3">
                        <FastForward className="h-5 w-5 text-gray-600" />
                        <div>
                          <div className="font-medium text-gray-900">Avance automatique</div>
                          <div className="text-sm text-gray-600">Passer à la question suivante automatiquement</div>
                        </div>
                      </div>
                      <div className={`w-12 h-6 rounded-full transition-colors ${
                        autoProceed ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gray-300'
                      } relative`}>
                        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          autoProceed ? 'transform translate-x-6' : ''
                        }`}></div>
                      </div>
                    </label>
                    
                    <label className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 cursor-pointer transition-colors">
                      <div className="flex items-center gap-3">
                        <Maximize2 className="h-5 w-5 text-gray-600" />
                        <div>
                          <div className="font-medium text-gray-900">Plein écran</div>
                          <div className="text-sm text-gray-600">Mode plein écran pour plus de concentration</div>
                        </div>
                      </div>
                      <div className={`w-12 h-6 rounded-full transition-colors ${
                        fullscreen ? 'bg-gradient-to-r from-purple-500 to-purple-600' : 'bg-gray-300'
                      } relative`}>
                        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          fullscreen ? 'transform translate-x-6' : ''
                        }`}></div>
                      </div>
                    </label>
                    
                    <label className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 cursor-pointer transition-colors">
                      <div className="flex items-center gap-3">
                        <Eye className="h-5 w-5 text-gray-600" />
                        <div>
                          <div className="font-medium text-gray-900">Explications automatiques</div>
                          <div className="text-sm text-gray-600">Afficher les explications après réponse</div>
                        </div>
                      </div>
                      <div className={`w-12 h-6 rounded-full transition-colors ${
                        showExplanation ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gray-300'
                      } relative`}>
                        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          showExplanation ? 'transform translate-x-6' : ''
                        }`}></div>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* Boutons d'action */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button
                  onClick={handleStartQuiz}
                  className="group bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 flex items-center gap-4"
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                      <Play className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="absolute inset-0 bg-white rounded-xl opacity-20 group-hover:scale-150 transition-transform duration-300"></div>
                  </div>
                  <div className="text-left">
                    <div className="text-2xl">Commencer le quiz</div>
                    <div className="text-green-100 text-sm font-normal">Lancez-vous dans l'aventure !</div>
                  </div>
                  <Zap className="h-6 w-6 ml-4 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-300" />
                </button>
                
                <button
                  onClick={() => navigate(`/quiz/${id}`)}
                  className="group bg-gradient-to-r from-white to-gray-50 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-2xl font-bold hover:border-blue-400 hover:text-blue-600 transition-all duration-300 flex items-center gap-3"
                >
                  <ChevronLeft className="h-5 w-5" />
                  Retour aux détails
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-gray-500 text-sm">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Medal className="h-4 w-4" />
              <span>Assurez-vous d'être dans un environnement calme pour une meilleure concentration</span>
            </div>
            <p>Bonne chance ! Vous allez réussir 💪</p>
          </div>
        </div>
      </div>
    );
  }

  // Quiz en cours
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50" ref={containerRef}>
      {/* Timer Alert */}
      {showTimerAlert && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in-up">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
            <AlertTriangle className="h-6 w-6" />
            <div>
              <div className="font-bold">Temps limité !</div>
              <div className="text-sm">Il reste {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')} minutes</div>
            </div>
          </div>
        </div>
      )}

      {/* Barre supérieure */}
      <div className="sticky top-0 z-40">
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Informations du quiz */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowConfirmModal(true)}
                  className="group flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl text-white hover:bg-white/20 transition-all duration-300"
                >
                  <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="font-medium">Quitter</span>
                </button>
                
                <div className="hidden md:block">
                  <h2 className="font-bold text-white text-lg truncate max-w-md">
                    {currentQuiz?.title}
                  </h2>
                  <div className="flex items-center gap-2 text-blue-200 text-sm">
                    <BookOpen className="h-3 w-3" />
                    <span>Question {currentQuestionIndex + 1} sur {totalQuestions}</span>
                  </div>
                </div>
              </div>

              {/* Timer et score */}
              <div className="flex items-center gap-6">
                <div className="hidden lg:flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Trophy className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white text-sm">Score actuel</div>
                    <div className="text-2xl font-bold text-white">{calculateScore()}%</div>
                  </div>
                </div>
                
                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg ${
                  timeLeft < 300 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 animate-pulse' 
                    : 'bg-gradient-to-r from-blue-500 to-blue-600'
                }`}>
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Timer className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">Temps restant</div>
                    <div className="font-mono font-bold text-white text-xl">{formatTime(timeLeft)}</div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePause}
                  className="p-3 rounded-xl bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300"
                  title={isPaused ? 'Reprendre' : 'Pause'}
                >
                  {isPaused ? (
                    <div className="flex items-center gap-2">
                      <Play className="h-5 w-5" />
                    </div>
                  ) : (
                    <Pause className="h-5 w-5" />
                  )}
                </button>
                
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    soundEnabled 
                      ? 'bg-white/10 text-white hover:bg-white/20' 
                      : 'bg-white/5 text-white/50'
                  }`}
                  title={soundEnabled ? 'Couper le son' : 'Activer le son'}
                >
                  {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                </button>
                
                <button
                  onClick={toggleFullscreen}
                  className="p-3 rounded-xl bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300"
                  title={fullscreen ? 'Quitter le plein écran' : 'Plein écran'}
                >
                  {fullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
                </button>

                <button
                  onClick={() => setShowSidebar(!showSidebar)}
                  className="p-3 rounded-xl bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Barre de progression */}
            <div className="mt-4">
              <div className="flex justify-between text-white/80 text-sm mb-2">
                <span>Progression</span>
                <span>{Math.round(calculateProgress())}% • {currentQuestionIndex + 1}/{totalQuestions}</span>
              </div>
              <div className="w-full bg-white/20 backdrop-blur-sm rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-green-400 via-blue-400 to-blue-500 h-3 rounded-full transition-all duration-500 shadow-lg"
                  style={{ width: `${calculateProgress()}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Question principale */}
          <div className="flex-1">
            {/* Question Card */}
            <div className="bg-gradient-to-br from-white via-white to-blue-50 rounded-3xl shadow-2xl border border-gray-200 overflow-hidden mb-6">
              {/* Question Header */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-2xl font-bold text-white">{currentQuestionIndex + 1}</span>
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                        <Target className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-medium text-gray-600">Question</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          currentQuestion?.difficulty === 'beginner' ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-700' :
                          currentQuestion?.difficulty === 'intermediate' ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700' :
                          currentQuestion?.difficulty === 'advanced' ? 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700' :
                          'bg-gradient-to-r from-red-100 to-red-200 text-red-700'
                        }`}>
                          {currentQuestion?.difficulty?.toUpperCase() || 'MOYEN'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-500 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>Recommandé: 2 min</span>
                        </div>
                        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                        <div className="flex items-center gap-2">
                          <Percent className="h-4 w-4" />
                          <span>Points: {currentQuestion?.points || 1}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Question Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => currentQuestion && toggleBookmark(currentQuestion.id)}
                      className={`group p-3 rounded-xl transition-all duration-300 ${
                        currentQuestion && bookmarkedQuestions.includes(currentQuestion.id)
                          ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-600 shadow-lg'
                          : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 hover:text-yellow-500 hover:shadow-lg'
                      }`}
                      title="Marquer la question"
                    >
                      <Bookmark className={`h-5 w-5 ${
                        currentQuestion && bookmarkedQuestions.includes(currentQuestion.id) ? 'fill-current' : ''
                      }`} />
                    </button>
                    
                    <button
                      onClick={() => currentQuestion && toggleFlag(currentQuestion.id)}
                      className={`group p-3 rounded-xl transition-all duration-300 ${
                        currentQuestion && flaggedQuestions.includes(currentQuestion.id)
                          ? 'bg-gradient-to-r from-red-100 to-red-200 text-red-600 shadow-lg'
                          : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 hover:text-red-500 hover:shadow-lg'
                      }`}
                      title="Signaler la question"
                    >
                      <Flag className="h-5 w-5" />
                    </button>
                    
                    <button
                      onClick={handleSkip}
                      className="p-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 hover:text-blue-500 hover:shadow-lg transition-all duration-300"
                      title="Passer la question"
                    >
                      <FastForward className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Question Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 leading-relaxed">
                  {currentQuestion?.question}
                </h3>

                {/* Options */}
                <div className="space-y-4 mb-8">
                  {currentQuestion?.options?.map((option, index) => {
                    const isAnswered = currentQuestion && isQuestionAnswered(currentQuestion.id);
                    const userAnswer = currentQuestion && getUserAnswer(currentQuestion.id);
                    const isCorrect = index === currentQuestion.correctAnswer;
                    const isSelected = userAnswer?.selectedAnswer === index;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        disabled={isAnswered}
                        className={`w-full text-left p-5 rounded-xl transition-all duration-300 ${
                          getOptionStyle(index)
                        } ${!isAnswered ? 'hover:scale-[1.02] cursor-pointer active:scale-[0.98]' : 'cursor-default'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 flex items-center justify-center rounded-xl border-2 shadow-sm ${
                              !isAnswered 
                                ? 'bg-gradient-to-br from-white to-gray-50 border-gray-300 text-gray-700' 
                                : isCorrect
                                  ? 'bg-gradient-to-r from-green-500 to-green-600 border-green-600 text-white'
                                  : isSelected && !isCorrect
                                    ? 'bg-gradient-to-r from-red-500 to-red-600 border-red-600 text-white'
                                    : 'bg-gradient-to-br from-white to-gray-50 border-gray-300 text-gray-400'
                            }`}>
                              <span className="text-lg font-bold">{String.fromCharCode(65 + index)}</span>
                            </div>
                            <span className="text-lg font-medium">{option}</span>
                          </div>
                          
                          {isAnswered && (
                            <div className="flex items-center gap-2">
                              {isCorrect && (
                                <div className="p-2 bg-gradient-to-r from-green-100 to-green-200 rounded-lg">
                                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                                </div>
                              )}
                              {isSelected && !isCorrect && (
                                <div className="p-2 bg-gradient-to-r from-red-100 to-red-200 rounded-lg">
                                  <XCircle className="h-5 w-5 text-red-600" />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {showExplanation && currentQuestion?.explanation && (
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-6 mb-6 animate-fadeIn">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                        <HelpCircle className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-blue-900 text-lg mb-2 flex items-center gap-2">
                          Explication détaillée
                          <Sparkles className="h-4 w-4 text-blue-500" />
                        </div>
                        <div className="text-blue-800 leading-relaxed">
                          {currentQuestion.explanation}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className="group flex items-center gap-3 px-6 py-3 rounded-xl border-2 border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-400 hover:bg-blue-50 transition-all duration-300"
                >
                  <SkipBack className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
                  <span className="font-medium text-gray-700 group-hover:text-blue-600">Précédent</span>
                </button>

                <button
                  onClick={handleReset}
                  className="flex items-center gap-3 px-6 py-3 rounded-xl border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                >
                  <RefreshCw className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-700">Recommencer</span>
                </button>
              </div>

              <div className="flex items-center gap-6">
                {/* Navigation rapide */}
                {showQuestionNavigation && (
                  <div className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-gray-100 to-gray-50 p-2 rounded-xl">
                    {Array.from({ length: Math.min(5, totalQuestions) }).map((_, index) => {
                      const questionIndex = Math.max(0, Math.min(totalQuestions - 5, currentQuestionIndex - 2)) + index;
                      const status = getQuestionStatus(questionIndex);
                      
                      return (
                        <button
                          key={questionIndex}
                          onClick={() => navigateToQuestion(questionIndex)}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                            status === 'current' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white scale-110 shadow-lg' :
                            status === 'correct' ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-700 hover:scale-105' :
                            status === 'incorrect' ? 'bg-gradient-to-r from-red-100 to-red-200 text-red-700 hover:scale-105' :
                            'bg-white text-gray-700 hover:bg-gray-100 hover:scale-105'
                          }`}
                        >
                          {questionIndex + 1}
                        </button>
                      );
                    })}
                    {totalQuestions > 5 && (
                      <span className="text-gray-400 px-2">...</span>
                    )}
                  </div>
                )}

                {currentQuestionIndex === totalQuestions - 1 ? (
                  <button
                    onClick={() => setShowConfirmModal(true)}
                    className="group bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3"
                  >
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Check className="h-5 w-5" />
                    </div>
                    <span>Terminer le quiz</span>
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="group bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3"
                  >
                    <span>Suivant</span>
                    <div className="p-2 bg-white/20 rounded-lg">
                      <SkipForward className="h-5 w-5" />
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          {showSidebar && (
            <div className="lg:w-80 space-y-6">
              {/* Stats Card */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Statistiques en direct
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold text-green-700">{userAnswers.length}</div>
                      <div className="text-sm text-green-600">Répondues</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold text-blue-700">{totalQuestions - userAnswers.length}</div>
                      <div className="text-sm text-blue-600">Restantes</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
                    <div className="text-2xl font-bold text-purple-700 mb-2">{calculateScore()}%</div>
                    <div className="text-sm text-purple-600 mb-3">Score actuel</div>
                    <div className="w-full bg-white/50 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                        style={{ width: `${calculateScore()}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Correctes</span>
                      <span className="font-bold text-green-600">
                        {userAnswers.filter(a => a.isCorrect).length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Incorrectes</span>
                      <span className="font-bold text-red-600">
                        {userAnswers.filter(a => !a.isCorrect).length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Temps moyen</span>
                      <span className="font-bold text-blue-600">
                        {userAnswers.length > 0 ? Math.floor(timeSpent / userAnswers.length) : 0}s
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Question Grid */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Grid3x3 className="h-5 w-5 text-blue-600" />
                    Navigation rapide
                  </h3>
                  <button
                    onClick={() => setShowQuestionNavigation(!showQuestionNavigation)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    {showQuestionNavigation ? 'Masquer' : 'Afficher'}
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: totalQuestions }).map((_, index) => {
                    const status = getQuestionStatus(index);
                    return (
                      <button
                        key={index}
                        onClick={() => navigateToQuestion(index)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                          status === 'current' ? 'ring-2 ring-blue-500 ring-offset-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white scale-110' :
                          status === 'correct' ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:scale-105' :
                          status === 'incorrect' ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:scale-105' :
                          'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105'
                        }`}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bookmarks */}
              {bookmarkedQuestions.length > 0 && (
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-200 p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <BookMarked className="h-5 w-5 text-yellow-600" />
                    Questions marquées ({bookmarkedQuestions.length})
                  </h3>
                  <div className="space-y-2">
                    {bookmarkedQuestions.map((questionId, index) => (
                      <button
                        key={questionId}
                        onClick={() => navigateToQuestion(questionId)}
                        className="w-full flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 transition-all duration-300"
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <span className="text-sm text-yellow-800">Question #{questionId}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal de confirmation */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl mb-4">
                  <AlertCircle className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {currentQuestionIndex === totalQuestions - 1 ? 'Terminer le quiz ?' : 'Quitter le quiz ?'}
                </h3>
                <p className="text-gray-600">
                  {currentQuestionIndex === totalQuestions - 1 
                    ? 'Vous êtes sur le point de soumettre vos réponses et de voir vos résultats.'
                    : 'Votre progression sera sauvegardée. Vous pourrez reprendre plus tard.'}
                </p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                  <span className="text-gray-700 font-medium">Questions répondues</span>
                  <span className="text-2xl font-bold text-blue-600">{userAnswers.length}/{totalQuestions}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                  <span className="text-gray-700 font-medium">Temps écoulé</span>
                  <span className="text-2xl font-bold text-green-600">{getFormattedTime()}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                  <span className="text-gray-700 font-medium">Score estimé</span>
                  <span className="text-2xl font-bold text-purple-600">{calculateScore()}%</span>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl font-bold hover:shadow-lg transition-all duration-300"
                >
                  Continuer
                </button>
                <button
                  onClick={currentQuestionIndex === totalQuestions - 1 ? handleSubmit : () => {
                    setShowConfirmModal(false);
                    navigate(`/quiz/${id}`);
                  }}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  {currentQuestionIndex === totalQuestions - 1 ? 'Voir résultats' : 'Quitter'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPlay;