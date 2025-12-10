import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRightCircle, 
  Home, 
  BarChart3,
  Target,
  Clock,
  CalendarDays,
  Award,
  TrendingUp,
  RefreshCw,
  ChevronLeft,
  Share2,
  Download,
  Brain,
  Timer,
  Check,
  X,
  Trophy,
  Zap,
  Sparkles,
  Star,
  Medal,
  Crown,
  Users,
  Target as TargetIcon,
  Rocket,
  Lightbulb,
  BookOpen,
  Coffee,
  Eye,
  BarChart2,
  PieChart,
  LineChart,
  AlertCircle,
  FastForward,
  Pause,
  Play,
  Repeat,
  ExternalLink,
  MoreVertical,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Filter,
  Search,
  Flag,
  Bookmark,
  Heart,
  MessageSquare,
  ThumbsUp,
  TrendingDown,
  Percent,
  Hash,
  Maximize2,
  Minimize2,
  Settings,
  Moon,
  Sun
} from 'lucide-react';

const Result = () => {
  const navigate = useNavigate();
  const {
    results,
    currentAttempt,
    currentQuiz,
    currentQuestions,
    resetQuiz
  } = useQuiz();

  const [activeTab, setActiveTab] = useState('overview');
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [timeDistribution, setTimeDistribution] = useState([]);
  const [difficultyAnalysis, setDifficultyAnalysis] = useState({});
  const [showShareModal, setShowShareModal] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');
  
  const attempt = results || currentAttempt;

  useEffect(() => {
    if (!attempt || (!attempt.answers || attempt.answers.length === 0)) {
      navigate('/quizzes');
    } else {
      // Analyser la distribution du temps
      const times = attempt.answers.map(a => a.timeSpent || 0);
      const avg = times.reduce((a, b) => a + b, 0) / times.length;
      setTimeDistribution([
        { label: 'Rapide (< 30s)', count: times.filter(t => t < 30).length },
        { label: 'Normal (30-60s)', count: times.filter(t => t >= 30 && t <= 60).length },
        { label: 'Lent (> 60s)', count: times.filter(t => t > 60).length }
      ]);

      // Analyser par difficulté
      const difficultyStats = {};
      currentQuestions?.forEach((q, idx) => {
        const diff = q.difficulty || 'medium';
        if (!difficultyStats[diff]) {
          difficultyStats[diff] = { total: 0, correct: 0 };
        }
        difficultyStats[diff].total++;
        if (attempt.answers[idx]?.isCorrect) {
          difficultyStats[diff].correct++;
        }
      });
      setDifficultyAnalysis(difficultyStats);
    }
  }, [attempt, currentQuestions]);

  if (!attempt || (!attempt.answers || attempt.answers.length === 0)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl p-10 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl mb-6">
            <Brain className="h-14 w-14 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Aucun résultat disponible</h2>
          <p className="text-gray-600 mb-8">Il n'y a pas de tentative enregistrée pour ce quiz.</p>
          <Link 
            to="/quizzes" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <Home className="h-5 w-5" />
            Voir les quiz disponibles
          </Link>
        </div>
      </div>
    );
  }

  const total = attempt.totalQuestions || attempt.answers.length;
  const correct = attempt.correctAnswers ?? attempt.answers.filter(a => a.isCorrect).length;
  const score = attempt.score ?? Math.round((correct / total) * 100);
  const percentage = Math.round((correct / total) * 100);

  const formatTime = (secs) => {
    if (!secs && secs !== 0) return '00:00';
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const formatDateTime = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPerformanceColor = (percentage) => {
    if (percentage >= 80) return 'from-green-500 to-emerald-600';
    if (percentage >= 60) return 'from-yellow-500 to-yellow-600';
    if (percentage >= 40) return 'from-orange-500 to-orange-600';
    return 'from-red-500 to-red-600';
  };

  const getPerformanceTextColor = (percentage) => {
    if (percentage >= 80) return 'text-green-700';
    if (percentage >= 60) return 'text-yellow-700';
    if (percentage >= 40) return 'text-orange-700';
    return 'text-red-700';
  };

  const getPerformanceEmoji = (percentage) => {
    if (percentage >= 80) return '🏆';
    if (percentage >= 60) return '🎯';
    if (percentage >= 40) return '👍';
    return '💪';
  };

  const getPerformanceMessage = (percentage) => {
    if (percentage >= 80) return 'Performance exceptionnelle !';
    if (percentage >= 60) return 'Très bon travail !';
    if (percentage >= 40) return 'Continuez comme ça !';
    return 'À améliorer !';
  };

  const getRecommendations = (percentage) => {
    if (percentage >= 80) {
      return [
        { icon: Rocket, text: 'Essayez des quiz plus difficiles pour vous challenger', color: 'text-purple-600' },
        { icon: Trophy, text: 'Participez aux compétitions de la plateforme', color: 'text-yellow-600' },
        { icon: Users, text: 'Aidez d\'autres étudiants en partageant vos techniques', color: 'text-blue-600' }
      ];
    } else if (percentage >= 60) {
      return [
        { icon: Target, text: 'Concentrez-vous sur les questions que vous avez ratées', color: 'text-red-600' },
        { icon: BookOpen, text: 'Revoyez les concepts fondamentaux du sujet', color: 'text-green-600' },
        { icon: Clock, text: 'Améliorez votre gestion du temps', color: 'text-blue-600' }
      ];
    } else if (percentage >= 40) {
      return [
        { icon: Lightbulb, text: 'Étudiez attentivement les explications des réponses', color: 'text-yellow-600' },
        { icon: Repeat, text: 'Refaites ce quiz après révision', color: 'text-purple-600' },
        { icon: Coffee, text: 'Pratiquez régulièrement pour progresser', color: 'text-orange-600' }
      ];
    } else {
      return [
        { icon: BookOpen, text: 'Commencez par les bases du sujet', color: 'text-blue-600' },
        { icon: Eye, text: 'Relisez attentivement chaque question', color: 'text-green-600' },
        { icon: TrendingUp, text: 'Fixez-vous des objectifs progressifs', color: 'text-purple-600' }
      ];
    }
  };

  const calculateStreak = () => {
    let maxStreak = 0;
    let currentStreak = 0;
    
    attempt.answers.forEach(answer => {
      if (answer.isCorrect) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    });
    
    return maxStreak;
  };

  const handleRetake = () => {
    resetQuiz();
    if (currentQuiz?.id) navigate(`/quiz/${currentQuiz.id}/play`);
    else navigate('/quizzes');
  };

  const handleShare = () => {
    setShowShareModal(true);
    if (navigator.share) {
      navigator.share({
        title: `Résultat du quiz: ${currentQuiz?.title || 'Quiz'}`,
        text: `J'ai obtenu ${score}% au quiz "${currentQuiz?.title || 'Quiz'}" ! 🎯`,
        url: window.location.href,
      });
    }
  };

  const averageTimePerQuestion = attempt.timeSpent ? 
    Math.round(attempt.timeSpent / total) : 0;

  const tabs = [
    { id: 'overview', name: 'Vue d\'ensemble', icon: BarChart3 },
    { id: 'details', name: 'Détails', icon: Target },
    { id: 'analysis', name: 'Analyse', icon: TrendingUp },
    { id: 'compare', name: 'Comparer', icon: LineChart }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl mb-4">
                  <Share2 className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Partager vos résultats</h3>
                <p className="text-gray-600">
                  Partagez votre performance avec la communauté !
                </p>
              </div>
              
              <div className="space-y-4 mb-8">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Lien copié !');
                  }}
                  className="w-full p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl text-gray-700 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-200 rounded-lg">
                        <Copy className="h-5 w-5" />
                      </div>
                      <span className="font-medium">Copier le lien</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </button>
                
                <button
                  onClick={() => setExportFormat('pdf')}
                  className="w-full p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl text-gray-700 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-200 rounded-lg">
                        <Download className="h-5 w-5 text-red-600" />
                      </div>
                      <span className="font-medium">Télécharger en PDF</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </button>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => setShowShareModal(false)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl font-bold hover:shadow-lg transition-all duration-300"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header avec score */}
        <div className="relative mb-12">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-10 rounded-3xl blur-3xl -z-10"></div>
          
          <div className="bg-gradient-to-br from-white via-white to-blue-50 rounded-3xl shadow-2xl border border-gray-200 p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="flex-1">
                <button
                  onClick={() => navigate('/quizzes')}
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-6 group"
                >
                  <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                  <span className="font-medium">Retour aux quiz</span>
                </button>
                
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl shadow-lg">
                    <TargetIcon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                      {currentQuiz?.title || 'Résultat du Quiz'}
                    </h1>
                    <div className="flex flex-wrap items-center gap-3">
                      {currentQuiz?.category && (
                        <span className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl text-sm font-medium">
                          {currentQuiz.category}
                        </span>
                      )}
                      <span className="text-gray-500 text-sm">
                        {formatDateTime(attempt.completedAt || new Date())}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 text-lg">
                  {currentQuiz?.description || 'Analyse détaillée de votre performance'}
                </p>
              </div>

              {/* Score Card */}
              <div className="lg:w-96">
                <div className="relative bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl border border-gray-200 p-6">
                  <div className="absolute -top-4 -right-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-2xl">
                      <Trophy className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  
                  <div className="text-center mb-6">
                    <div className="text-6xl lg:text-7xl font-black bg-gradient-to-r bg-clip-text text-transparent mb-2"
                         style={{ backgroundImage: `linear-gradient(to right, ${getPerformanceColor(percentage)})` }}>
                      {score}%
                    </div>
                    <div className={`text-lg font-bold ${getPerformanceTextColor(percentage)} flex items-center justify-center gap-2`}>
                      <span className="text-2xl">{getPerformanceEmoji(percentage)}</span>
                      {getPerformanceMessage(percentage)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                      <div className="text-2xl font-bold text-green-700">{correct}</div>
                      <div className="text-sm text-green-600">Correctes</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                      <div className="text-2xl font-bold text-blue-700">{total}</div>
                      <div className="text-sm text-blue-600">Total</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-xl border border-gray-200 overflow-hidden mb-8">
          <div className="flex flex-wrap">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-[200px] py-5 px-6 text-center font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center justify-center gap-3">
                    <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                    <span className="font-semibold">{tab.name}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-500">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Key Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-xl p-6 border border-green-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-r from-green-100 to-green-200 rounded-xl">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="text-3xl font-bold text-green-700">{percentage}%</div>
                  </div>
                  <div className="text-sm font-semibold text-gray-900 mb-2">Taux de réussite</div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-6 border border-blue-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-3xl font-bold text-blue-700">{formatTime(attempt.timeSpent || 0)}</div>
                  </div>
                  <div className="text-sm font-semibold text-gray-900 mb-2">Temps total</div>
                  <div className="text-sm text-gray-600">
                    Moyenne: {formatTime(averageTimePerQuestion)} par question
                  </div>
                </div>

                <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-xl p-6 border border-purple-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl">
                      <Zap className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="text-3xl font-bold text-purple-700">{calculateStreak()}</div>
                  </div>
                  <div className="text-sm font-semibold text-gray-900 mb-2">Suite record</div>
                  <div className="text-sm text-gray-600">
                    Réponses correctes consécutives
                  </div>
                </div>

                <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-xl p-6 border border-orange-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl">
                      <Star className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="text-3xl font-bold text-orange-700">
                      {Math.round(percentage / 20)}
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-gray-900 mb-2">Note sur 5</div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${
                        i < Math.round(percentage / 20) ? 'text-yellow-500 fill-current' : 'text-gray-300'
                      }`} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Performance Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Answer Distribution */}
                <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                      <PieChart className="h-6 w-6 text-blue-600" />
                      Répartition des réponses
                    </h3>
                    <button
                      onClick={() => setShowDetails(!showDetails)}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {showDetails ? 'Voir moins' : 'Voir plus'}
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-center">
                      <div className="relative w-48 h-48">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-4xl font-bold text-gray-900">{percentage}%</div>
                        </div>
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="96"
                            cy="96"
                            r="88"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="none"
                            className="text-gray-200"
                          />
                          <circle
                            cx="96"
                            cy="96"
                            r="88"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="none"
                            className="text-green-500"
                            strokeLinecap="round"
                            strokeDasharray={`${percentage * 5.5} 550`}
                          />
                        </svg>
                      </div>
                    </div>
                    
                    {showDetails && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="font-medium text-gray-900">Correctes</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold text-green-700">{correct}</span>
                            <span className="text-sm text-gray-600">questions</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="font-medium text-gray-900">Incorrectes</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold text-red-700">{total - correct}</span>
                            <span className="text-sm text-gray-600">questions</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Time Analysis */}
                <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Timer className="h-6 w-6 text-blue-600" />
                    Analyse du temps
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="space-y-4">
                      {timeDistribution.map((item, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium text-gray-700">{item.label}</span>
                            <span className="text-gray-600">{item.count} questions</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                idx === 0 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                                idx === 1 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                                'bg-gradient-to-r from-red-500 to-red-600'
                              }`}
                              style={{ width: `${(item.count / total) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700">Temps moyen par question</div>
                        <div className="text-lg font-bold text-blue-700">{formatTime(averageTimePerQuestion)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => setActiveTab('details')}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3"
                >
                  <Target className="h-5 w-5" />
                  Voir les détails
                </button>
                <button
                  onClick={handleRetake}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3"
                >
                  <RefreshCw className="h-5 w-5" />
                  Refaire le quiz
                </button>
                <button
                  onClick={handleShare}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3"
                >
                  <Share2 className="h-5 w-5" />
                  Partager
                </button>
              </div>
            </div>
          )}

          {/* Details Tab */}
          {activeTab === 'details' && (
            <div className="space-y-8">
              {/* Questions Navigation */}
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Target className="h-6 w-6 text-blue-600" />
                  Navigation des questions
                </h3>
                <div className="flex flex-wrap gap-2">
                  {attempt.answers.map((answer, idx) => {
                    const isCorrect = answer.isCorrect;
                    const question = currentQuestions?.find(q => q.id === answer.questionId) || {};
                    
                    return (
                      <button
                        key={answer.questionId || idx}
                        onClick={() => setSelectedQuestion(idx)}
                        className={`group relative w-14 h-14 rounded-xl flex items-center justify-center font-bold transition-all duration-300 ${
                          selectedQuestion === idx
                            ? 'ring-3 ring-blue-500 ring-offset-2 scale-110 shadow-lg'
                            : 'hover:scale-105 hover:shadow-md'
                        } ${
                          isCorrect
                            ? 'bg-gradient-to-br from-green-100 to-green-200 text-green-700 hover:from-green-200 hover:to-green-300'
                            : 'bg-gradient-to-br from-red-100 to-red-200 text-red-700 hover:from-red-200 hover:to-red-300'
                        }`}
                        title={question.question?.substring(0, 50) || `Question ${idx + 1}`}
                      >
                        {idx + 1}
                        <div className="absolute -top-1 -right-1">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center shadow ${
                            isCorrect ? 'bg-green-500' : 'bg-red-500'
                          }`}>
                            {isCorrect ? (
                              <Check className="h-3 w-3 text-white" />
                            ) : (
                              <X className="h-3 w-3 text-white" />
                            )}
                          </div>
                        </div>
                        
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                          Question {idx + 1}: {isCorrect ? 'Correct' : 'Incorrect'}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Question Detail */}
              {currentQuestions && currentQuestions[selectedQuestion] && (
                <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                  <div className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl shadow-lg ${
                          attempt.answers[selectedQuestion]?.isCorrect 
                            ? 'bg-gradient-to-r from-green-100 to-green-200' 
                            : 'bg-gradient-to-r from-red-100 to-red-200'
                        }`}>
                          {attempt.answers[selectedQuestion]?.isCorrect ? (
                            <CheckCircle2 className="h-8 w-8 text-green-600" />
                          ) : (
                            <XCircle className="h-8 w-8 text-red-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">
                            Question {selectedQuestion + 1}
                          </h3>
                          <div className={`text-lg font-semibold ${
                            attempt.answers[selectedQuestion]?.isCorrect ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {attempt.answers[selectedQuestion]?.isCorrect ? 'Correcte' : 'Incorrecte'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4">
                        <div className="px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <Timer className="h-4 w-4" />
                            <span className="font-medium">{attempt.answers[selectedQuestion]?.timeSpent || 0}s</span>
                          </div>
                        </div>
                        {currentQuestions[selectedQuestion].difficulty && (
                          <div className="px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                            <div className="text-sm font-medium text-blue-700 uppercase">
                              {currentQuestions[selectedQuestion].difficulty}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-10">
                      <h4 className="text-xl font-bold text-gray-900 mb-6">
                        {currentQuestions[selectedQuestion].question}
                      </h4>
                      
                      <div className="space-y-4">
                        {currentQuestions[selectedQuestion].options?.map((option, idx) => {
                          const isCorrect = idx === currentQuestions[selectedQuestion].correctAnswer;
                          const isUserAnswer = idx === attempt.answers[selectedQuestion]?.selectedAnswer;
                          
                          return (
                            <div
                              key={idx}
                              className={`p-5 rounded-xl border-2 transition-all duration-300 ${
                                isCorrect
                                  ? 'border-green-500 bg-gradient-to-br from-green-50 to-green-100 shadow-md'
                                  : isUserAnswer && !isCorrect
                                  ? 'border-red-500 bg-gradient-to-br from-red-50 to-red-100 shadow-md'
                                  : 'border-gray-200 hover:border-gray-300 bg-white'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg shadow-sm ${
                                    isCorrect
                                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                                      : isUserAnswer && !isCorrect
                                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                                      : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700'
                                  }`}>
                                    {String.fromCharCode(65 + idx)}
                                  </div>
                                  <span className="text-gray-800 font-medium">{option}</span>
                                </div>
                                
                                <div className="flex gap-2">
                                  {isCorrect && (
                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full flex items-center gap-1">
                                      <Check className="h-3 w-3" />
                                      Bonne réponse
                                    </span>
                                  )}
                                  {isUserAnswer && !isCorrect && (
                                    <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-bold rounded-full flex items-center gap-1">
                                      <X className="h-3 w-3" />
                                      Votre réponse
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {currentQuestions[selectedQuestion].explanation && (
                      <div className="mb-6">
                        <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                          <Lightbulb className="h-6 w-6 text-yellow-600" />
                          Explication détaillée
                        </h4>
                        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl p-6 border border-yellow-200">
                          <p className="text-gray-700 text-lg leading-relaxed">
                            {currentQuestions[selectedQuestion].explanation}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <button
                  onClick={() => setActiveTab('overview')}
                  className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  <ChevronLeft className="h-5 w-5" />
                  Retour à la vue d'ensemble
                </button>
                
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleRetake}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                  >
                    <RefreshCw className="h-5 w-5" />
                    Refaire ce quiz
                  </button>
                  <Link
                    to="/quizzes"
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                  >
                    <Home className="h-5 w-5" />
                    Tous les quiz
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Analysis Tab */}
          {activeTab === 'analysis' && (
            <div className="space-y-8">
              {/* Performance Analysis */}
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                  Analyse de performance détaillée
                </h3>
                
                <div className={`p-8 rounded-2xl border bg-gradient-to-r mb-8 ${
                  percentage >= 80 ? 'from-green-50 to-emerald-100 border-green-200' :
                  percentage >= 60 ? 'from-yellow-50 to-yellow-100 border-yellow-200' :
                  percentage >= 40 ? 'from-orange-50 to-orange-100 border-orange-200' :
                  'from-red-50 to-red-100 border-red-200'
                }`}>
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="text-6xl">{getPerformanceEmoji(percentage)}</div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-gray-900 mb-4">
                        {getPerformanceMessage(percentage)}
                      </h4>
                      <div className="space-y-3">
                        {getRecommendations(percentage).map((rec, idx) => {
                          const Icon = rec.icon;
                          return (
                            <div key={idx} className="flex items-start gap-4">
                              <div className={`p-2 rounded-lg bg-gradient-to-br from-${rec.color.split('-')[1]}-100 to-${rec.color.split('-')[1]}-200`}>
                                <Icon className={`h-5 w-5 ${rec.color}`} />
                              </div>
                              <span className="text-gray-700 text-lg">{rec.text}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Strengths & Weaknesses */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      Vos points forts
                    </h4>
                    <div className="space-y-3">
                      {attempt.answers
                        .filter(a => a.isCorrect)
                        .slice(0, 5)
                        .map((answer, idx) => {
                          const question = currentQuestions?.find(q => q.id === answer.questionId);
                          return (
                            <div key={idx} className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
                              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                                <Check className="h-4 w-4 text-white" />
                              </div>
                              <span className="text-sm text-gray-700 font-medium">
                                {question?.question?.substring(0, 50) || `Question ${idx + 1}`}...
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-red-600" />
                      Points à améliorer
                    </h4>
                    <div className="space-y-3">
                      {attempt.answers
                        .filter(a => !a.isCorrect)
                        .slice(0, 5)
                        .map((answer, idx) => {
                          const question = currentQuestions?.find(q => q.id === answer.questionId);
                          return (
                            <div key={idx} className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl">
                              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                                <X className="h-4 w-4 text-white" />
                              </div>
                              <span className="text-sm text-gray-700 font-medium">
                                {question?.question?.substring(0, 50) || `Question ${idx + 1}`}...
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>

                {/* Difficulty Analysis */}
                <div className="space-y-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Performance par difficulté</h4>
                  <div className="space-y-4">
                    {Object.entries(difficultyAnalysis).map(([diff, stats]) => {
                      const diffPercentage = Math.round((stats.correct / stats.total) * 100);
                      return (
                        <div key={diff} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium text-gray-700 capitalize">{diff}</span>
                            <span className="text-gray-600">{stats.correct}/{stats.total} ({diffPercentage}%)</span>
                          </div>
                          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full bg-gradient-to-r ${
                                diff === 'easy' ? 'from-green-500 to-green-600' :
                                diff === 'medium' ? 'from-yellow-500 to-yellow-600' :
                                diff === 'hard' ? 'from-orange-500 to-orange-600' :
                                'from-red-500 to-red-600'
                              }`}
                              style={{ width: `${diffPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={handleRetake}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3"
                >
                  <ArrowRightCircle className="h-6 w-6" />
                  Refaire le quiz maintenant
                </button>
                <button
                  onClick={() => setShowShareModal(true)}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3"
                >
                  <Share2 className="h-6 w-6" />
                  Partager mes résultats
                </button>
                <Link
                  to="/quizzes"
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3"
                >
                  <Home className="h-6 w-6" />
                  Découvrir d'autres quiz
                </Link>
              </div>
            </div>
          )}

          {/* Compare Tab */}
          {activeTab === 'compare' && (
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-8 text-center border border-gray-200">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl mb-6">
                  <LineChart className="h-10 w-10 text-gray-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Fonctionnalité en développement
                </h3>
                <p className="text-gray-600 mb-8">
                  Bientôt, vous pourrez comparer vos résultats avec ceux de la communauté et suivre votre progression dans le temps.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    Revenir aux résultats
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-gray-600 text-sm">
              © 2024 Moroccan University Quiz. Résultats générés le {formatDateTime(new Date())}
            </div>
            <div className="flex items-center gap-4">
              <button className="text-sm text-gray-600 hover:text-gray-900">
                <Download className="h-4 w-4 inline mr-1" />
                Exporter
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-900">
                <Share2 className="h-4 w-4 inline mr-1" />
                Partager
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;