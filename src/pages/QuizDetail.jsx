import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';
import { 
  Play, 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  Trophy, 
  Award,
  BarChart3,
  ChevronLeft,
  Share2,
  Bookmark,
  Eye,
  Target,
  TrendingUp,
  HelpCircle,
  Calendar,
  GraduationCap,
  MapPin,
  Zap,
  Shield,
  CheckCircle2,
  AlertCircle,
  Loader,
  Download,
  Filter,
  MessageSquare,
  ChevronRight,
  MoreVertical,
  FileText,
  Video,
  FileDown,
  Sparkles
} from 'lucide-react';

const QuizDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    getQuizById, 
    getUserAttempts,
    getQuizStatistics,
    getQuizLeaderboard
  } = useQuiz();
  const { user, isAuthenticated } = useAuth();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userAttempts, setUserAttempts] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showStats, setShowStats] = useState(true);

  // Données de démonstration
  const demoQuiz = {
    id: parseInt(id),
    title: "Algèbre Linéaire Avancée - Matrices et Espaces Vectoriels",
    description: "Master advanced linear algebra concepts including matrix operations, vector spaces, eigenvalues, and eigenvectors with real-world applications.",
    detailedDescription: "Ce quiz couvre les concepts avancés de l'algèbre linéaire, incluant les opérations sur les matrices, les espaces vectoriels, les valeurs propres et les vecteurs propres. Idéal pour les étudiants en mathématiques, physique et ingénierie.",
    subject: "Mathématiques",
    category: "Algèbre",
    university: "Université Hassan II",
    faculty: "Faculté des Sciences",
    level: "S3",
    author: "Dr. Ahmed Alami",
    authorAvatar: "AA",
    questionsCount: 25,
    duration: 45,
    difficulty: "advanced",
    isPro: false,
    isFeatured: true,
    isNew: false,
    participants: 3250,
    avgScore: 72.5,
    successRate: 65,
    rating: 4.7,
    ratingCount: 847,
    createdAt: "2024-01-15T09:00:00Z",
    updatedAt: "2024-02-10T14:30:00Z",
    tags: ["Matrices", "Espaces Vectoriels", "Algèbre", "Maths Avancées", "Université"],
    learningObjectives: [
      "Maîtriser les opérations sur les matrices",
      "Comprendre les espaces vectoriels",
      "Calculer les valeurs propres et vecteurs propres",
      "Résoudre des systèmes d'équations linéaires",
      "Applications pratiques en ingénierie",
      "Préparation aux examens finaux"
    ],
    prerequisites: ["Algèbre Linéaire Basique", "Calcul Matriciel", "Théorie des ensembles"],
    topics: [
      "Opérations sur les matrices",
      "Déterminants et inverses",
      "Espaces vectoriels et sous-espaces",
      "Applications linéaires",
      "Valeurs propres et vecteurs propres",
      "Diagonalisation",
      "Théorème spectral",
      "Applications pratiques"
    ],
    resources: [
      { name: "Polycopié du cours complet", type: "pdf", url: "#", size: "4.2 MB" },
      { name: "Exercices supplémentaires avec corrigés", type: "pdf", url: "#", size: "2.8 MB" },
      { name: "Vidéos explicatives - Série complète", type: "video", url: "#", duration: "2h 15min" }
    ]
  };

  const demoAttempts = [
    { id: 1, score: 85, date: "2024-02-15T14:30:00Z", timeSpent: 32, correctAnswers: 21, rank: 45 },
    { id: 2, score: 92, date: "2024-02-10T11:15:00Z", timeSpent: 28, correctAnswers: 23, rank: 12 },
    { id: 3, score: 76, date: "2024-02-05T16:45:00Z", timeSpent: 40, correctAnswers: 19, rank: 78 }
  ];

  const demoLeaderboard = [
    { rank: 1, user: "Ahmed Alami", score: 98, timeSpent: 25, date: "2024-02-18", avatar: "AA" },
    { rank: 2, user: "Fatima Zahra", score: 96, timeSpent: 28, date: "2024-02-17", avatar: "FZ" },
    { rank: 3, user: "Youssef Benani", score: 94, timeSpent: 30, date: "2024-02-16", avatar: "YB" },
    { rank: 4, user: "Amina Toumi", score: 92, timeSpent: 27, date: "2024-02-15", avatar: "AT" },
    { rank: 5, user: "Mehdi Kassi", score: 90, timeSpent: 32, date: "2024-02-14", avatar: "MK" }
  ];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      // Simulation de chargement
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setQuiz(demoQuiz);
      setUserAttempts(demoAttempts);
      setStatistics({
        totalAttempts: 3250,
        avgScore: 72.5,
        completionRate: 89,
        timeSpentAvg: 35,
        difficultyDistribution: {
          facile: 15,
          moyen: 60,
          difficile: 25
        },
        scoreDistribution: [
          { range: "0-40%", count: 325 },
          { range: "41-60%", count: 650 },
          { range: "61-80%", count: 1462 },
          { range: "81-100%", count: 813 }
        ]
      });
      setLeaderboard(demoLeaderboard);
      
      setLoading(false);
    };

    loadData();
  }, [id]);

  const handleStartQuiz = () => {
    if (isAuthenticated) {
      navigate(`/quiz/${id}/play`);
    } else {
      navigate('/login', { state: { from: `/quiz/${id}/play` } });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-gradient-to-r from-green-500 to-emerald-600';
      case 'intermediate': return 'bg-gradient-to-r from-blue-500 to-blue-600';
      case 'advanced': return 'bg-gradient-to-r from-purple-500 to-purple-600';
      case 'expert': return 'bg-gradient-to-r from-red-500 to-red-600';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'Débutant';
      case 'intermediate': return 'Intermédiaire';
      case 'advanced': return 'Avancé';
      case 'expert': return 'Expert';
      default: return difficulty;
    }
  };

  const tabs = [
    { id: 'overview', name: 'Vue d\'ensemble', icon: Eye },
    { id: 'details', name: 'Détails', icon: BookOpen },
    { id: 'attempts', name: 'Mes tentatives', icon: Trophy },
    { id: 'leaderboard', name: 'Classement', icon: TrendingUp },
    { id: 'discussion', name: 'Discussion', icon: MessageSquare }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            {/* Breadcrumb Skeleton */}
            <div className="flex items-center space-x-4">
              <div className="h-4 w-32 bg-gray-200 rounded-full"></div>
              <ChevronRight className="h-4 w-4 text-gray-300" />
              <div className="h-4 w-48 bg-gray-200 rounded-full"></div>
            </div>
            
            {/* Header Skeleton */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded-lg w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded-lg w-1/2"></div>
              </div>
            </div>

            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow p-6">
                  <div className="h-10 bg-gray-200 rounded-lg mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded-lg w-1/2 mx-auto"></div>
                </div>
              ))}
            </div>

            {/* Content Skeleton */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="space-y-6">
                <div className="h-6 bg-gray-200 rounded-lg w-1/3"></div>
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded-lg"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-3xl shadow-xl max-w-md">
          <AlertCircle className="h-20 w-20 text-red-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Quiz non trouvé</h2>
          <p className="text-gray-600 mb-8">Le quiz que vous recherchez n'existe pas ou a été supprimé.</p>
          <Link 
            to="/quizzes" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <ChevronLeft className="h-5 w-5" />
            Retour aux quiz
          </Link>
        </div>
      </div>
    );
  }

  const bestScore = userAttempts.length > 0 ? Math.max(...userAttempts.map(a => a.score)) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <Link 
            to="/quizzes" 
            className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
          >
            Quiz
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <Link 
            to={`/quizzes?subject=${quiz.subject}`}
            className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
          >
            {quiz.subject}
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="font-semibold text-gray-900 truncate max-w-xs">
            {quiz.title}
          </span>
        </nav>

        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-3xl shadow-2xl overflow-hidden mb-8">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 opacity-10 rounded-full -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 opacity-10 rounded-full translate-x-48 translate-y-48"></div>
          
          <div className="relative p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="flex-1">
                {/* Badges */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className={`px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg ${getDifficultyColor(quiz.difficulty)}`}>
                    {getDifficultyText(quiz.difficulty)}
                  </span>
                  {quiz.isFeatured && (
                    <span className="px-4 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Populaire
                    </span>
                  )}
                  {quiz.isPro && (
                    <span className="px-4 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r from-yellow-500 to-amber-600 shadow-lg flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Premium
                    </span>
                  )}
                  <span className="px-4 py-2 rounded-full text-sm font-bold bg-white text-blue-600 shadow-lg">
                    {quiz.subject}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
                  {quiz.title}
                </h1>

                {/* Description */}
                <p className="text-blue-100 text-lg lg:text-xl mb-8 max-w-3xl leading-relaxed">
                  {quiz.description}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 text-blue-100">
                  <div className="flex items-center gap-3 bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                    <GraduationCap className="h-5 w-5" />
                    <span className="font-medium">{quiz.university}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                    <MapPin className="h-5 w-5" />
                    <span className="font-medium">{quiz.faculty}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                    <Target className="h-5 w-5" />
                    <span className="font-medium">Niveau {quiz.level}</span>
                  </div>
                </div>
              </div>

              {/* CTA Card */}
              <div className="lg:w-96">
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-white to-blue-100 rounded-2xl mb-4">
                      <Trophy className="h-8 w-8 text-blue-600" />
                    </div>
                    {userAttempts.length > 0 ? (
                      <>
                        <div className="text-white text-sm mb-2">Votre meilleur score</div>
                        <div className="text-5xl font-bold text-white mb-2">{bestScore}%</div>
                        <div className="text-blue-100 text-sm">
                          Classement: #{userAttempts[0]?.rank || 'N/A'}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-white text-xl font-bold mb-2">Nouveau défi !</div>
                        <div className="text-blue-100 text-sm">
                          Soyez le premier à tenter ce quiz
                        </div>
                      </>
                    )}
                  </div>

                  <button
                    onClick={handleStartQuiz}
                    className="w-full bg-gradient-to-r from-white to-blue-100 text-blue-600 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 mb-4"
                  >
                    <Play className="h-5 w-5" />
                    {userAttempts.length > 0 ? 'Refaire le quiz' : 'Commencer le quiz'}
                  </button>
                  
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={`p-3 rounded-xl transition-all duration-200 ${
                        isBookmarked 
                          ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                      title={isBookmarked ? "Retirer des favoris" : "Ajouter aux favoris"}
                    >
                      <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                    <button className="p-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all duration-200" title="Partager">
                      <Share2 className="h-5 w-5" />
                    </button>
                    <button className="p-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all duration-200" title="Télécharger">
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-200">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mb-3">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{quiz.questionsCount}</div>
              <div className="text-gray-600 text-sm">Questions</div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-200">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-green-200 rounded-xl flex items-center justify-center mb-3">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{quiz.duration}</div>
              <div className="text-gray-600 text-sm">Minutes</div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-200">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-3">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{quiz.participants.toLocaleString()}</div>
              <div className="text-gray-600 text-sm">Participants</div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-200">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center mb-3">
                <Star className="h-6 w-6 text-yellow-600 fill-current" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{quiz.rating}</div>
              <div className="text-gray-600 text-sm">Note ({quiz.ratingCount})</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          {/* Tab Navigation */}
          <div className="border-b border-gray-100">
            <nav className="flex overflow-x-auto px-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all duration-200 relative ${
                      isActive
                        ? 'text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                    {tab.name}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Detailed Description */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg">
                      <Eye className="h-6 w-6 text-blue-600" />
                    </div>
                    À propos de ce quiz
                  </h3>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-600 leading-relaxed">
                      {quiz.detailedDescription}
                    </p>
                  </div>
                </div>

                {/* Learning Objectives */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-green-100 to-green-200 rounded-lg">
                      <Target className="h-6 w-6 text-green-600" />
                    </div>
                    Objectifs d'apprentissage
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quiz.learningObjectives.map((objective, index) => (
                      <div key={index} className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-sm">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-gradient-to-r from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          </div>
                        </div>
                        <span className="text-gray-700">{objective}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Tags associés</h3>
                  <div className="flex flex-wrap gap-3">
                    {quiz.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:from-gray-200 hover:to-gray-300 transition-all duration-200 cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Statistics */}
                {statistics && showStats && (
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg">
                          <BarChart3 className="h-6 w-6 text-purple-600" />
                        </div>
                        Statistiques globales
                      </h3>
                      <button
                        onClick={() => setShowStats(!showStats)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Left Column */}
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white p-5 rounded-xl shadow-sm">
                            <div className="text-sm text-gray-600 mb-1">Tentatives totales</div>
                            <div className="text-3xl font-bold text-gray-900">{statistics.totalAttempts.toLocaleString()}</div>
                          </div>
                          <div className="bg-white p-5 rounded-xl shadow-sm">
                            <div className="text-sm text-gray-600 mb-1">Score moyen</div>
                            <div className="text-3xl font-bold text-gray-900">{statistics.avgScore}%</div>
                          </div>
                          <div className="bg-white p-5 rounded-xl shadow-sm">
                            <div className="text-sm text-gray-600 mb-1">Taux de complétion</div>
                            <div className="text-3xl font-bold text-gray-900">{statistics.completionRate}%</div>
                          </div>
                          <div className="bg-white p-5 rounded-xl shadow-sm">
                            <div className="text-sm text-gray-600 mb-1">Temps moyen</div>
                            <div className="text-3xl font-bold text-gray-900">{statistics.timeSpentAvg} min</div>
                          </div>
                        </div>

                        {/* Difficulty Distribution */}
                        <div className="bg-white p-5 rounded-xl shadow-sm">
                          <div className="text-sm font-semibold text-gray-900 mb-4">Distribution de difficulté</div>
                          <div className="space-y-3">
                            {Object.entries(statistics.difficultyDistribution).map(([level, percentage]) => (
                              <div key={level} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600 capitalize">{level}</span>
                                  <span className="font-semibold text-gray-900">{percentage}%</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full ${
                                      level === 'facile' ? 'bg-gradient-to-r from-green-400 to-green-500' :
                                      level === 'moyen' ? 'bg-gradient-to-r from-blue-400 to-blue-500' :
                                      'bg-gradient-to-r from-purple-400 to-purple-500'
                                    }`}
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Score Distribution */}
                      <div className="bg-white p-5 rounded-xl shadow-sm">
                        <div className="text-sm font-semibold text-gray-900 mb-4">Distribution des scores</div>
                        <div className="space-y-4">
                          {statistics.scoreDistribution.map((item, index) => (
                            <div key={index} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">{item.range}</span>
                                <span className="font-semibold text-gray-900">{item.count.toLocaleString()} étudiants</span>
                              </div>
                              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                                  style={{ width: `${(item.count / statistics.totalAttempts) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Details Tab */}
            {activeTab === 'details' && (
              <div className="space-y-8">
                {/* Prerequisites */}
                {quiz.prerequisites && quiz.prerequisites.length > 0 && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Prérequis</h3>
                    <div className="flex flex-wrap gap-3">
                      {quiz.prerequisites.map((prereq, index) => (
                        <span 
                          key={index}
                          className="px-4 py-3 bg-white text-blue-600 rounded-xl text-sm font-semibold shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                          {prereq}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Topics */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Sujets couverts</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quiz.topics.map((topic, index) => (
                      <div key={index} className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                            <span className="text-green-600 font-bold">{index + 1}</span>
                          </div>
                        </div>
                        <span className="text-gray-700 font-medium">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resources */}
                {quiz.resources && quiz.resources.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Ressources utiles</h3>
                    <div className="space-y-4">
                      {quiz.resources.map((resource, index) => (
                        <div key={index} className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl hover:shadow-lg transition-all duration-200">
                          <div className="flex items-center gap-4">
                            <div className={`p-4 rounded-xl ${
                              resource.type === 'pdf' 
                                ? 'bg-gradient-to-r from-red-100 to-red-200' 
                                : 'bg-gradient-to-r from-blue-100 to-blue-200'
                            }`}>
                              {resource.type === 'pdf' ? (
                                <FileText className="h-6 w-6 text-red-600" />
                              ) : (
                                <Video className="h-6 w-6 text-blue-600" />
                              )}
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">{resource.name}</div>
                              <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                                <span className="uppercase font-semibold">{resource.type}</span>
                                {resource.size && <span>• {resource.size}</span>}
                                {resource.duration && <span>• {resource.duration}</span>}
                              </div>
                            </div>
                          </div>
                          <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                            <FileDown className="h-4 w-4" />
                            Télécharger
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Author Info */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-6">À propos de l'auteur</h3>
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 bg-gradient-to-r from-white to-blue-100 rounded-2xl flex items-center justify-center text-2xl font-bold text-blue-600">
                        {quiz.authorAvatar}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-3xl font-bold mb-2">{quiz.author}</div>
                      <div className="text-blue-200 text-lg mb-4">Professeur à {quiz.university}</div>
                      <p className="text-blue-100 mb-6">
                        Expert en {quiz.subject} avec plus de 15 ans d'expérience dans l'enseignement supérieur.
                        Spécialiste des méthodes pédagogiques innovantes.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-sm font-medium">
                          💼 15 ans d'expérience
                        </span>
                        <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-sm font-medium">
                          🎓 3 diplômes universitaires
                        </span>
                        <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-sm font-medium">
                          ⭐ 4.8/5 évaluation
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Attempts Tab */}
            {activeTab === 'attempts' && (
              <div>
                {userAttempts.length > 0 ? (
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <h3 className="text-2xl font-bold text-gray-900">Historique des tentatives</h3>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm text-gray-600">Meilleur score</div>
                          <div className="text-3xl font-bold text-green-600">{bestScore}%</div>
                        </div>
                        <div className="h-12 w-px bg-gray-200"></div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">Score moyen</div>
                          <div className="text-3xl font-bold text-blue-600">
                            {(userAttempts.reduce((sum, a) => sum + a.score, 0) / userAttempts.length).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {userAttempts.map((attempt, index) => (
                        <div key={attempt.id} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="text-sm text-gray-500 mb-1">Tentative #{userAttempts.length - index}</div>
                              <div className="text-xl font-bold text-gray-900">{attempt.score}%</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-semibold text-gray-900">
                                #{attempt.rank || 'N/A'}
                              </div>
                              <div className="text-xs text-gray-500">Classement</div>
                            </div>
                          </div>
                          
                          <div className="space-y-3 mb-4">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Date</span>
                              <span className="font-medium text-gray-900">
                                {formatDate(attempt.date)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Questions correctes</span>
                              <span className="font-medium text-gray-900">
                                {attempt.correctAnswers}/{quiz.questionsCount}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Temps passé</span>
                              <span className="font-medium text-gray-900">
                                {attempt.timeSpent} min
                              </span>
                            </div>
                          </div>
                          
                          <div className="pt-4 border-t border-gray-100">
                            <div className="text-sm font-semibold text-gray-900 mb-2">Performance</div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
                                style={{ width: `${attempt.score}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl mb-6">
                      <Trophy className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Aucune tentative enregistrée
                    </h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                      Lancez-vous dans votre première tentative et découvrez vos capacités !
                    </p>
                    <button
                      onClick={handleStartQuiz}
                      className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                    >
                      <Play className="h-5 w-5" />
                      Commencer le quiz
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Leaderboard Tab */}
            {activeTab === 'leaderboard' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Classement global</h3>
                {leaderboard.length > 0 ? (
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gradient-to-r from-gray-100 to-gray-200 border-b border-gray-300 text-sm font-bold text-gray-700">
                      <div className="col-span-1 text-center">Rang</div>
                      <div className="col-span-5">Étudiant</div>
                      <div className="col-span-2 text-center">Score</div>
                      <div className="col-span-2 text-center">Temps</div>
                      <div className="col-span-2 text-center">Date</div>
                    </div>
                    
                    {/* Table Rows */}
                    <div className="divide-y divide-gray-100">
                      {leaderboard.map((entry) => (
                        <div 
                          key={entry.rank} 
                          className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50/50 transition-colors duration-200"
                        >
                          <div className="col-span-1 text-center">
                            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl font-bold ${
                              entry.rank === 1 
                                ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-lg' :
                              entry.rank === 2 
                                ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white' :
                              entry.rank === 3 
                                ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white' :
                                'bg-gray-100 text-gray-700'
                            }`}>
                              {entry.rank}
                            </div>
                          </div>
                          <div className="col-span-5">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl flex items-center justify-center font-bold text-blue-600">
                                {entry.avatar}
                              </div>
                              <span className="font-semibold text-gray-900">{entry.user}</span>
                            </div>
                          </div>
                          <div className="col-span-2 text-center">
                            <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-green-200 text-green-700 font-bold rounded-lg">
                              {entry.score}%
                            </span>
                          </div>
                          <div className="col-span-2 text-center text-gray-700 font-medium">
                            {entry.timeSpent} min
                          </div>
                          <div className="col-span-2 text-center text-gray-600 text-sm">
                            {entry.date}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Current User Position */}
                    {userAttempts.length > 0 && (
                      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-t border-blue-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-gray-600 mb-1">Votre position</div>
                            <div className="text-2xl font-bold text-gray-900">
                              #{userAttempts[0].rank} sur {quiz.participants.toLocaleString()}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-600 mb-1">Votre meilleur score</div>
                            <div className="text-2xl font-bold text-green-600">{bestScore}%</div>
                          </div>
                        </div>
                        <div className="mt-4 text-sm text-gray-600">
                          Continuez à vous améliorer pour monter dans le classement !
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl mb-6">
                      <TrendingUp className="h-12 w-12 text-gray-400" />
                    </div>
                    <div className="text-gray-600">Aucune donnée de classement disponible</div>
                  </div>
                )}
              </div>
            )}

            {/* Discussion Tab */}
            {activeTab === 'discussion' && (
              <div>
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl mb-6">
                    <MessageSquare className="h-12 w-12 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Forum de discussion
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Rejoignez la discussion, posez vos questions et partagez vos connaissances avec la communauté
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                      Accéder au forum
                    </button>
                    <button className="inline-flex items-center gap-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-200">
                      Voir les questions fréquentes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Final CTA */}
        <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-3xl shadow-2xl overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 opacity-10 rounded-full -translate-x-48 translate-y-48"></div>
          
          <div className="relative p-12 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-2xl mb-8 shadow-lg">
              <Trophy className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">
              Prêt à relever le défi ?
            </h3>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Testez vos connaissances et rejoignez les {quiz.participants.toLocaleString()} étudiants qui ont déjà relevé ce défi
            </p>
            <button
              onClick={handleStartQuiz}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-white to-blue-100 text-blue-600 px-10 py-5 rounded-xl font-bold text-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <Play className="h-6 w-6" />
              {userAttempts.length > 0 ? 'Améliorer mon score' : 'Commencer maintenant'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizDetail;