import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';
import {
  BookOpen,
  Trophy,
  Bookmark,
  BarChart3,
  CheckCircle,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Clock,
  Star,
  GraduationCap,
  TrendingUp,
  Target,
  Award,
  Users,
  Calendar,
  Bell,
  Settings,
  Edit3,
  Zap,
  Brain,
  Target as TargetIcon,
  Rocket,
  ChevronRight,
  Filter,
  Search,
  Heart,
  Eye,
  Download,
  Share2,
  Home,
  Menu,
  X,
  BellRing,
  ChartBar,
  FileText,
  Medal,
  Crown,
  Timer,
  Percent,
  Hash,
  TrendingDown,
  CheckCircle2,
  CalendarDays
} from 'lucide-react';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { quizzes = [], filteredQuizzes = [] } = useQuiz();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Données de démonstration
  const userStats = {
    completed: 24,
    bookmarked: 18,
    inProgress: 6,
    avgScore: 85,
    streak: 7,
    rank: 'Top 15%',
    totalTime: '45h 30m',
    quizzesCreated: 3,
    accuracy: 78,
    points: 2450
  };

  const recentQuizzes = [
    {
      id: 1,
      title: 'Algorithmes Avancés',
      subject: 'Informatique',
      difficulty: 'hard',
      score: 92,
      time: '28:45',
      date: '2024-01-15',
      completed: true
    },
    {
      id: 2,
      title: 'Physique Quantique',
      subject: 'Physique',
      difficulty: 'medium',
      score: 78,
      time: '35:20',
      date: '2024-01-12',
      completed: true
    },
    {
      id: 3,
      title: 'Mathématiques Avancées',
      subject: 'Maths',
      difficulty: 'hard',
      score: null,
      time: '15:30',
      date: '2024-01-10',
      completed: false
    }
  ];

  const trendingQuizzes = filteredQuizzes.slice(0, 4).map(quiz => ({
    ...quiz,
    rating: 4.2 + Math.random() * 0.8,
    attempts: Math.floor(Math.random() * 500) + 100,
    isNew: Math.random() > 0.7
  }));

  const achievements = [
    { id: 1, title: 'Quiz Master', description: 'Terminer 20 quiz', icon: Trophy, progress: 100, unlocked: true },
    { id: 2, title: 'Streak Keeper', description: '7 jours consécutifs', icon: Flame, progress: 100, unlocked: true },
    { id: 3, title: 'High Scorer', description: 'Score > 90%', icon: Target, progress: 75, unlocked: false },
    { id: 4, title: 'Speed Demon', description: 'Terminer en moins de 10min', icon: Zap, progress: 30, unlocked: false }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'Facile';
      case 'medium': return 'Moyen';
      case 'hard': return 'Difficile';
      default: return difficulty;
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  // Composants réutilisables
  const StatCard = ({ icon: Icon, value, label, change, color = 'blue' }) => (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br from-${color}-100 to-${color}-200 text-${color}-600`}>
          <Icon className="h-6 w-6" />
        </div>
        {change && (
          <span className={`text-sm font-medium px-2 py-1 rounded-full ${
            change > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {change > 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-600 mt-1">{label}</div>
    </div>
  );

  const QuickActionCard = ({ title, description, icon: Icon, action, onClick, color }) => (
    <button
      onClick={onClick}
      className="group w-full text-left bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col gap-4"
    >
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${color} text-white shadow-lg`}>
          <Icon className="h-6 w-6" />
        </div>
        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      {action && (
        <div className="text-sm font-medium text-blue-600 group-hover:text-blue-700 flex items-center gap-1">
          {action}
        </div>
      )}
    </button>
  );

  const QuizCard = ({ quiz, type = 'trending' }) => (
    <div className="bg-white rounded-xl border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
      {quiz.isNew && (
        <div className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold rounded-full">
          Nouveau
        </div>
      )}
      
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className={`px-2 py-1 rounded-md text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                {getDifficultyText(quiz.difficulty)}
              </div>
              {quiz.subject && (
                <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                  {quiz.subject}
                </span>
              )}
            </div>
            <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {quiz.title}
            </h4>
          </div>
          <div className="flex items-center gap-1 text-amber-600">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">{quiz.rating?.toFixed(1) || '4.5'}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{quiz.attempts?.toLocaleString() || '342'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{quiz.duration || '30'} min</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4 text-gray-400 group-hover:text-red-500 transition-colors" />
            <span>{quiz.likes || '42'}</span>
          </div>
        </div>
        
        <button
          onClick={() => navigate(`/quiz/${quiz.id}`)}
          className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          {quiz.isPaid ? 'Accéder (Premium)' : 'Commencer le Quiz'}
        </button>
      </div>
    </div>
  );

  const RecentQuizItem = ({ quiz }) => (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all duration-200 group">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${
          quiz.completed ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
        }`}>
          {quiz.completed ? <CheckCircle2 className="h-6 w-6" /> : <Clock className="h-6 w-6" />}
        </div>
        <div>
          <div className="font-semibold text-gray-900 group-hover:text-blue-600">
            {quiz.title}
          </div>
          <div className="text-sm text-gray-600 flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1">
              <GraduationCap className="h-3 w-3" />
              {quiz.subject}
            </span>
            <span className="flex items-center gap-1">
              <Timer className="h-3 w-3" />
              {quiz.time}
            </span>
            <span>{formatDate(quiz.date)}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {quiz.completed ? (
          <div className="text-right">
            <div className="text-xl font-bold text-green-600">{quiz.score}%</div>
            <div className="text-xs text-gray-600">Score</div>
          </div>
        ) : (
          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
            Continuer
          </button>
        )}
        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
      </div>
    </div>
  );

  const AchievementCard = ({ achievement }) => {
    const Icon = achievement.icon;
    return (
      <div className={`p-4 rounded-xl border-2 ${achievement.unlocked ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 bg-white'}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 rounded-lg ${achievement.unlocked ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-900">{achievement.title}</div>
            <div className="text-xs text-gray-600">{achievement.description}</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>Progression</span>
            <span>{achievement.progress}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${achievement.unlocked ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 'bg-gradient-to-r from-blue-500 to-blue-600'}`}
              style={{ width: `${achievement.progress}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navigation Mobile */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="absolute top-0 right-0 h-full w-64 bg-white shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-900">Menu</h2>
                <button onClick={() => setShowMobileMenu(false)}>
                  <X className="h-6 w-6 text-gray-600" />
                </button>
              </div>
              {/* Menu items */}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Link 
                  to="/"
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  <Home className="h-5 w-5" />
                  <span>Accueil</span>
                </Link>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <span className="font-semibold text-blue-600">Tableau de bord</span>
              </div>
              
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                    Bienvenue, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{user?.name || 'Apprenant'}</span> 👋
                  </h1>
                  <p className="text-gray-600 text-lg">
                    Voici votre espace personnel de progression et d'apprentissage.
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <button className="p-3 bg-white border border-gray-300 rounded-xl hover:shadow-lg transition-all duration-200">
                    <Bell className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="p-3 bg-white border border-gray-300 rounded-xl hover:shadow-lg transition-all duration-200">
                    <Settings className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="lg:hidden p-3 bg-white border border-gray-300 rounded-xl hover:shadow-lg transition-all duration-200">
                    <Menu className="h-5 w-5 text-gray-600" onClick={() => setShowMobileMenu(true)} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* User Status Bar */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white p-6 shadow-xl mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-2xl font-bold">
                    {user?.name?.charAt(0) || 'A'}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-500 to-green-600 rounded-full border-2 border-white flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-white" />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="h-5 w-5 text-blue-300" />
                    <span className="font-semibold">Compte {user?.role === 'premium' ? 'Premium' : 'Standard'}</span>
                  </div>
                  <h2 className="text-2xl font-bold">{user?.name || 'Utilisateur'} {user?.role === 'premium' && '👑'}</h2>
                  <p className="text-blue-100 mt-1">
                    Membre depuis {new Date(user?.createdAt || Date.now()).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{userStats.streak}</div>
                  <div className="text-blue-200 text-sm">Jours de suite</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{userStats.points}</div>
                  <div className="text-blue-200 text-sm">Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{userStats.rank}</div>
                  <div className="text-blue-200 text-sm">Classement</div>
                </div>
                <div className="text-center">
                  <button className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200">
                    Voir profil
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={CheckCircle2}
            value={userStats.completed}
            label="Quiz terminés"
            change={12}
            color="green"
          />
          <StatCard
            icon={Bookmark}
            value={userStats.bookmarked}
            label="Favoris"
            change={8}
            color="purple"
          />
          <StatCard
            icon={BarChart3}
            value={`${userStats.avgScore}%`}
            label="Score moyen"
            change={5}
            color="blue"
          />
          <StatCard
            icon={Timer}
            value={userStats.totalTime}
            label="Temps passé"
            change={18}
            color="amber"
          />
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Accès rapide</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <QuickActionCard
              title="Explorer les quiz"
              description="Découvrez des quiz par matière, niveau et université"
              icon={BookOpen}
              action="Parcourir la bibliothèque"
              color="from-blue-500 to-blue-600"
              onClick={() => navigate('/quizzes')}
            />
            <QuickActionCard
              title="Mes résultats"
              description="Analysez vos performances et progression"
              icon={Trophy}
              action="Voir l'historique"
              color="from-amber-500 to-amber-600"
              onClick={() => navigate('/results')}
            />
            <QuickActionCard
              title="Quiz en cours"
              description="Reprenez là où vous vous êtes arrêté"
              icon={Clock}
              action="Continuer l'apprentissage"
              color="from-green-500 to-green-600"
              onClick={() => navigate('/mes-quiz')}
            />
            <QuickActionCard
              title="Favoris"
              description="Retrouvez vos quiz sauvegardés"
              icon={Bookmark}
              action="Accéder aux favoris"
              color="from-purple-500 to-purple-600"
              onClick={() => navigate('/saved')}
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Activité récente</h3>
                  <p className="text-gray-600">Vos derniers quiz et résultats</p>
                </div>
                <button 
                  onClick={() => navigate('/results')}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  Voir tout
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                {recentQuizzes.map((quiz, index) => (
                  <RecentQuizItem key={index} quiz={quiz} />
                ))}
              </div>
              
              {recentQuizzes.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Aucune activité récente</h4>
                  <p className="text-gray-600 mb-6">Commencez un quiz pour voir votre activité ici.</p>
                  <button
                    onClick={() => navigate('/quizzes')}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Découvrir les quiz
                  </button>
                </div>
              )}
            </div>

            {/* Trending Quizzes */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Quiz tendance</h3>
                  <p className="text-gray-600">Les quiz les plus populaires en ce moment</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <Filter className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trendingQuizzes.map((quiz, index) => (
                  <QuizCard key={quiz.id || index} quiz={quiz} />
                ))}
              </div>
              
              {trendingQuizzes.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Aucun quiz disponible</h4>
                  <p className="text-gray-600">Revenez plus tard pour découvrir de nouveaux quiz.</p>
                </div>
              )}
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => navigate('/quizzes')}
                  className="w-full py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                >
                  Voir tous les quiz disponibles
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Achievements & Stats */}
          <div className="space-y-8">
            {/* Achievements */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Succès</h3>
                  <p className="text-gray-600">Débloquez vos trophées</p>
                </div>
                <div className="flex items-center gap-2 text-amber-600">
                  <Trophy className="h-5 w-5" />
                  <span className="font-bold">{achievements.filter(a => a.unlocked).length}/{achievements.length}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {achievements.map(achievement => (
                  <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
              </div>
              
              <button
                onClick={() => navigate('/achievements')}
                className="mt-6 w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                Voir tous les succès
              </button>
            </div>

            {/* Learning Goals */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-6">
                <Target className="h-6 w-6" />
                <h3 className="text-xl font-bold">Objectifs de la semaine</h3>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Quiz terminés</span>
                    <span>3/5</span>
                  </div>
                  <div className="h-2 bg-blue-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-400 to-cyan-400 rounded-full" style={{ width: '60%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Score moyen</span>
                    <span>78% / 85%</span>
                  </div>
                  <div className="h-2 bg-blue-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Temps d'apprentissage</span>
                    <span>4h / 6h</span>
                  </div>
                  <div className="h-2 bg-blue-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" style={{ width: '67%' }} />
                  </div>
                </div>
              </div>
              
              <button className="w-full py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors duration-200">
                Définir des objectifs
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Statistiques rapides</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="text-gray-700">Précision</div>
                  <div className="text-2xl font-bold text-green-600">{userStats.accuracy}%</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="text-gray-700">Quiz créés</div>
                  <div className="text-2xl font-bold text-blue-600">{userStats.quizzesCreated}</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="text-gray-700">Points cumulés</div>
                  <div className="text-2xl font-bold text-purple-600">{userStats.points}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant Flame pour la streak
const Flame = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

export default UserDashboard; 