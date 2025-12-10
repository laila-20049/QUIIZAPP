import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  CalendarDays, 
  Clock, 
  Award, 
  TrendingUp,
  BarChart3,
  Download,
  Eye,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  Timer,
  BookOpen,
  GraduationCap,
  University,
  TrendingDown,
  FileText,
  MoreVertical,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Target,
  Trophy,
  Sparkles,
  Zap,
  LineChart,
  PieChart,
  BarChart,
  Brain,
  Medal,
  Crown,
  Users,
  Percent,
  Clock4,
  Hash,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Share2,
  Heart,
  Star,
  Settings,
  Grid,
  List,
  Menu
} from 'lucide-react';

// Données de démonstration
const mockResults = [
  {
    id: 1,
    quizTitle: "Algorithmes Avancés - S4",
    category: "Informatique",
    faculty: "Faculté des Sciences et Techniques",
    university: "Université Hassan II",
    date: "2024-01-15",
    time: "14:30",
    score: 92,
    correct: 23,
    total: 25,
    timeSpent: 1800,
    difficulty: "advanced",
    rank: "Top 5%",
    status: "completed",
    icon: "💻",
    color: "from-blue-500 to-blue-600",
    badges: ["Meilleur score", "Rapide"],
    questions: [
      { topic: "Complexité", correct: 5, total: 5 },
      { topic: "Structures", correct: 4, total: 5 },
      { topic: "Algorithmes", correct: 5, total: 5 },
      { topic: "Optimisation", correct: 4, total: 5 },
      { topic: "Graphes", correct: 5, total: 5 }
    ]
  },
  {
    id: 2,
    quizTitle: "Physique Quantique - S3",
    category: "Physique",
    faculty: "Faculté des Sciences",
    university: "Université Mohammed V",
    date: "2024-01-10",
    time: "10:15",
    score: 78,
    correct: 19,
    total: 25,
    timeSpent: 2100,
    difficulty: "intermediate",
    rank: "Top 25%",
    status: "completed",
    icon: "⚛️",
    color: "from-purple-500 to-purple-600",
    badges: ["Progression"],
    questions: [
      { topic: "Mécanique", correct: 3, total: 5 },
      { topic: "Ondes", correct: 4, total: 5 },
      { topic: "Relativité", correct: 4, total: 5 },
      { topic: "Quantique", correct: 4, total: 5 },
      { topic: "Thermodynamique", correct: 4, total: 5 }
    ]
  },
  {
    id: 3,
    quizTitle: "Droit Constitutionnel",
    category: "Droit",
    faculty: "Faculté de Droit",
    university: "Université Cadi Ayyad",
    date: "2024-01-05",
    time: "16:45",
    score: 85,
    correct: 21,
    total: 25,
    timeSpent: 1500,
    difficulty: "beginner",
    rank: "Top 15%",
    status: "completed",
    icon: "⚖️",
    color: "from-red-500 to-red-600",
    badges: ["Consistant"],
    questions: [
      { topic: "Constitution", correct: 4, total: 5 },
      { topic: "Institutions", correct: 4, total: 5 },
      { topic: "Droits", correct: 5, total: 5 },
      { topic: "Histoire", correct: 4, total: 5 },
      { topic: "Politique", correct: 4, total: 5 }
    ]
  },
  {
    id: 4,
    quizTitle: "Mathématiques Avancées - S2",
    category: "Mathématiques",
    faculty: "École Supérieure de Technologie",
    university: "Université Ibn Zohr",
    date: "2023-12-28",
    time: "09:00",
    score: 96,
    correct: 24,
    total: 25,
    timeSpent: 1600,
    difficulty: "advanced",
    rank: "Top 1%",
    status: "completed",
    icon: "🧮",
    color: "from-green-500 to-green-600",
    badges: ["Parfait", "Rapide"],
    questions: [
      { topic: "Algèbre", correct: 5, total: 5 },
      { topic: "Analyse", correct: 5, total: 5 },
      { topic: "Géométrie", correct: 5, total: 5 },
      { topic: "Probabilités", correct: 5, total: 5 },
      { topic: "Statistiques", correct: 4, total: 5 }
    ]
  },
  {
    id: 5,
    quizTitle: "Économie Internationale",
    category: "Économie",
    faculty: "Faculté des Sciences Économiques",
    university: "Université Hassan II",
    date: "2023-12-20",
    time: "13:20",
    score: 72,
    correct: 18,
    total: 25,
    timeSpent: 1900,
    difficulty: "intermediate",
    rank: "Top 35%",
    status: "completed",
    icon: "📈",
    color: "from-yellow-500 to-yellow-600",
    badges: ["À améliorer"],
    questions: [
      { topic: "Macroéconomie", correct: 3, total: 5 },
      { topic: "Microéconomie", correct: 4, total: 5 },
      { topic: "Commerce", correct: 4, total: 5 },
      { topic: "Finance", correct: 4, total: 5 },
      { topic: "Développement", correct: 3, total: 5 }
    ]
  },
  {
    id: 6,
    quizTitle: "Programmation Web - S5",
    category: "Informatique",
    faculty: "École Nationale des Sciences Appliquées",
    university: "Université Mohammed V",
    date: "2023-12-15",
    time: "11:30",
    score: 88,
    correct: 22,
    total: 25,
    timeSpent: 1700,
    difficulty: "intermediate",
    rank: "Top 10%",
    status: "completed",
    icon: "🌐",
    color: "from-indigo-500 to-indigo-600",
    badges: ["Excellent"],
    questions: [
      { topic: "HTML/CSS", correct: 5, total: 5 },
      { topic: "JavaScript", correct: 4, total: 5 },
      { topic: "React", correct: 4, total: 5 },
      { topic: "Backend", correct: 5, total: 5 },
      { topic: "Base de données", correct: 4, total: 5 }
    ]
  },
  {
    id: 7,
    quizTitle: "Biologie Cellulaire - S2",
    category: "Sciences de la Vie",
    faculty: "Faculté des Sciences",
    university: "Université Cadi Ayyad",
    date: "2023-12-10",
    time: "15:45",
    score: 65,
    correct: 16,
    total: 25,
    timeSpent: 2200,
    difficulty: "advanced",
    rank: "Top 45%",
    status: "completed",
    icon: "🧬",
    color: "from-emerald-500 to-emerald-600",
    badges: ["Réviser"],
    questions: [
      { topic: "Cellules", correct: 3, total: 5 },
      { topic: "ADN", correct: 3, total: 5 },
      { topic: "Métabolisme", correct: 3, total: 5 },
      { topic: "Génétique", correct: 4, total: 5 },
      { topic: "Évolution", correct: 3, total: 5 }
    ]
  },
  {
    id: 8,
    quizTitle: "Philosophie Moderne",
    category: "Philosophie",
    faculty: "Faculté des Lettres",
    university: "Université Ibn Zohr",
    date: "2023-12-05",
    time: "14:00",
    score: 81,
    correct: 20,
    total: 25,
    timeSpent: 1400,
    difficulty: "beginner",
    rank: "Top 20%",
    status: "completed",
    icon: "🤔",
    color: "from-pink-500 to-pink-600",
    badges: ["Bon"],
    questions: [
      { topic: "Épistémologie", correct: 4, total: 5 },
      { topic: "Éthique", correct: 4, total: 5 },
      { topic: "Logique", correct: 4, total: 5 },
      { topic: "Esthétique", correct: 4, total: 5 },
      { topic: "Philosophie", correct: 4, total: 5 }
    ]
  }
];

const ResultsHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState('grid');
  const [timeRange, setTimeRange] = useState('all');
  const [expandedResult, setExpandedResult] = useState(null);
  const [showStats, setShowStats] = useState(true);

  const categories = [
    { id: 'all', name: 'Toutes les matières', icon: '📚', count: 8, color: 'from-gray-500 to-gray-600' },
    { id: 'informatique', name: 'Informatique', icon: '💻', count: 2, color: 'from-blue-500 to-blue-600' },
    { id: 'physique', name: 'Physique', icon: '⚛️', count: 1, color: 'from-purple-500 to-purple-600' },
    { id: 'droit', name: 'Droit', icon: '⚖️', count: 1, color: 'from-red-500 to-red-600' },
    { id: 'mathematiques', name: 'Mathématiques', icon: '🧮', count: 1, color: 'from-green-500 to-green-600' },
    { id: 'economie', name: 'Économie', icon: '📈', count: 1, color: 'from-yellow-500 to-yellow-600' },
    { id: 'sciences-vie', name: 'Sciences de la Vie', icon: '🧬', count: 1, color: 'from-emerald-500 to-emerald-600' },
    { id: 'philosophie', name: 'Philosophie', icon: '🤔', count: 1, color: 'from-pink-500 to-pink-600' }
  ];

  const getScoreColor = (score) => {
    if (score >= 85) return 'from-green-500 to-emerald-600';
    if (score >= 70) return 'from-yellow-500 to-yellow-600';
    if (score >= 60) return 'from-orange-500 to-orange-600';
    return 'from-red-500 to-red-600';
  };

  const getScoreTextColor = (score) => {
    if (score >= 85) return 'text-green-700';
    if (score >= 70) return 'text-yellow-700';
    if (score >= 60) return 'text-orange-700';
    return 'text-red-700';
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'advanced': return 'bg-gradient-to-r from-red-500 to-red-600';
      case 'intermediate': return 'bg-gradient-to-r from-yellow-500 to-yellow-600';
      case 'beginner': return 'bg-gradient-to-r from-green-500 to-green-600';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case 'advanced': return 'Difficile';
      case 'intermediate': return 'Moyen';
      case 'beginner': return 'Facile';
      default: return difficulty;
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getPerformanceTrend = (result) => {
    const score = result.score;
    if (score >= 85) return { 
      text: 'Excellent', 
      icon: Trophy, 
      color: 'from-green-500 to-emerald-600',
      emoji: '🏆'
    };
    if (score >= 75) return { 
      text: 'Très bon', 
      icon: TrendingUp, 
      color: 'from-blue-500 to-blue-600',
      emoji: '📈'
    };
    if (score >= 60) return { 
      text: 'Bon', 
      icon: CheckCircle, 
      color: 'from-yellow-500 to-yellow-600',
      emoji: '👍'
    };
    return { 
      text: 'À améliorer', 
      icon: TrendingDown, 
      color: 'from-red-500 to-red-600',
      emoji: '💪'
    };
  };

  // Calcul des statistiques
  const stats = {
    totalAttempts: mockResults.length,
    averageScore: Math.round(mockResults.reduce((sum, r) => sum + r.score, 0) / mockResults.length),
    bestScore: Math.max(...mockResults.map(r => r.score)),
    totalTime: mockResults.reduce((sum, r) => sum + r.timeSpent, 0),
    avgTimePerQuiz: Math.round(mockResults.reduce((sum, r) => sum + r.timeSpent, 0) / mockResults.length / 60),
    perfectScores: mockResults.filter(r => r.score >= 90).length,
    improvementRate: '+12%' // Simulation
  };

  // Données pour le graphique
  const chartData = mockResults
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((r, i) => ({
      x: i + 1,
      y: r.score,
      label: r.quizTitle.split('-')[0].trim(),
      date: formatDate(r.date)
    }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Link 
                  to="/profile"
                  className="group flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                  <span className="font-medium">Retour au profil</span>
                </Link>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Historique de vos <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">performances</span>
              </h1>
              <p className="text-gray-600 text-lg">
                Analysez vos résultats, suivez votre progression et identifiez vos points forts
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 shadow'
                }`}
              >
                {viewMode === 'grid' ? <Grid className="h-5 w-5" /> : <List className="h-5 w-5" />}
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                <Download className="h-5 w-5" />
                Exporter
              </button>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-6 mb-8 border border-gray-200">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Rechercher un quiz par titre, matière ou université..."
                    className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-300 rounded-xl focus:ring-0 focus:border-blue-500 focus:outline-none transition-all group-hover:border-blue-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {/* Categories */}
                <div className="relative group">
                  <button className="px-4 py-3 bg-white border-2 border-gray-300 rounded-xl hover:border-blue-400 transition-colors flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Catégories</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="p-2">
                      {categories.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors ${
                            selectedCategory === cat.id ? 'bg-blue-50 text-blue-600' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{cat.icon}</span>
                            <span className="font-medium">{cat.name}</span>
                          </div>
                          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {cat.count}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sort */}
                <div className="relative group">
                  <button className="px-4 py-3 bg-white border-2 border-gray-300 rounded-xl hover:border-blue-400 transition-colors flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    <span>Trier par</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="p-2">
                      {[
                        { value: 'date', label: 'Plus récent', icon: CalendarDays },
                        { value: 'score', label: 'Meilleur score', icon: Trophy },
                        { value: 'time', label: 'Temps écoulé', icon: Clock },
                        { value: 'difficulty', label: 'Difficulté', icon: Target }
                      ].map(option => {
                        const Icon = option.icon;
                        return (
                          <button
                            key={option.value}
                            onClick={() => setSortBy(option.value)}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors ${
                              sortBy === option.value ? 'bg-blue-50 text-blue-600' : ''
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            <span>{option.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Time Range */}
                <div className="relative group">
                  <button className="px-4 py-3 bg-white border-2 border-gray-300 rounded-xl hover:border-blue-400 transition-colors flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    <span>Période</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="p-2">
                      {[
                        { value: 'all', label: 'Toute période' },
                        { value: 'week', label: 'Cette semaine' },
                        { value: 'month', label: 'Ce mois' },
                        { value: 'year', label: 'Cette année' }
                      ].map(option => (
                        <button
                          key={option.value}
                          onClick={() => setTimeRange(option.value)}
                          className={`w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors ${
                            timeRange === option.value ? 'bg-blue-50 text-blue-600' : ''
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-6 border border-blue-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold text-gray-900">{stats.totalAttempts}</div>
                  <div className="text-sm text-gray-600">Tentatives totales</div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="text-sm text-blue-600 font-medium">
                +2 ce mois-ci
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-xl p-6 border border-green-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold text-gray-900">{stats.averageScore}%</div>
                  <div className="text-sm text-gray-600">Score moyen</div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="text-sm text-green-600 font-medium">
                {stats.improvementRate} vs mois dernier
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-white to-yellow-50 rounded-2xl shadow-xl p-6 border border-yellow-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold text-gray-900">{stats.bestScore}%</div>
                  <div className="text-sm text-gray-600">Meilleur score</div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center">
                  <Award className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div className="text-sm text-yellow-600 font-medium">
                {stats.perfectScores} quiz à 90%+
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-xl p-6 border border-purple-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold text-gray-900">
                    {Math.floor(stats.totalTime / 3600)}h
                  </div>
                  <div className="text-sm text-gray-600">Temps total passé</div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                  <Clock4 className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="text-sm text-purple-600 font-medium">
                ~{stats.avgTimePerQuiz} min par quiz
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-white to-pink-50 rounded-2xl shadow-xl p-6 border border-pink-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold text-gray-900">3/8</div>
                  <div className="text-sm text-gray-600">Top 10%</div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-pink-100 to-pink-200 rounded-xl flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-pink-600" />
                </div>
              </div>
              <div className="text-sm text-pink-600 font-medium">
                1ère place en Maths
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-xl p-6 border border-indigo-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold text-gray-900">78%</div>
                  <div className="text-sm text-gray-600">Taux de réussite</div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-xl flex items-center justify-center">
                  <Percent className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
              <div className="text-sm text-indigo-600 font-medium">
                Meilleur que 65% des étudiants
              </div>
            </div>
          </div>

          {/* Results Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {mockResults.map((result) => {
                const performance = getPerformanceTrend(result);
                const Icon = performance.icon;
                
                return (
                  <div 
                    key={result.id}
                    className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                  >
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-start gap-4">
                          <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-lg bg-gradient-to-r ${result.color}`}>
                            {result.icon}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{result.quizTitle}</h3>
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                              <span className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-lg text-sm font-medium">
                                {result.category}
                              </span>
                              <div className="flex items-center gap-1 text-gray-500 text-sm">
                                <University className="h-3 w-3" />
                                {result.university.split(' ')[0]}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Score */}
                        <div className="text-right">
                          <div className={`text-4xl font-black bg-gradient-to-r ${getScoreColor(result.score)} bg-clip-text text-transparent`}>
                            {result.score}%
                          </div>
                          <div className="text-sm text-gray-500">{result.correct}/{result.total} correctes</div>
                        </div>
                      </div>

                      {/* Performance & Badges */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <div className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${performance.color} text-white flex items-center gap-2`}>
                            <span>{performance.emoji}</span>
                            <span>{performance.text}</span>
                          </div>
                          {result.badges.map((badge, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs">
                              {badge}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getDifficultyColor(result.difficulty)}`}>
                            {getDifficultyText(result.difficulty)}
                          </span>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                          <div className="flex items-center justify-center gap-2 mb-1">
                            <Clock className="h-4 w-4 text-gray-600" />
                            <div className="font-bold text-gray-900">{formatTime(result.timeSpent)}</div>
                          </div>
                          <div className="text-xs text-gray-500">Temps</div>
                        </div>
                        
                        <div className="text-center p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                          <div className="flex items-center justify-center gap-2 mb-1">
                            <CalendarDays className="h-4 w-4 text-gray-600" />
                            <div className="font-bold text-gray-900">{formatDate(result.date)}</div>
                          </div>
                          <div className="text-xs text-gray-500">Date</div>
                        </div>
                        
                        <div className="text-center p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                          <div className="flex items-center justify-center gap-2 mb-1">
                            <Users className="h-4 w-4 text-gray-600" />
                            <div className="font-bold text-gray-900">{result.rank}</div>
                          </div>
                          <div className="text-xs text-gray-500">Classement</div>
                        </div>
                      </div>

                      {/* Question Topics */}
                      <div className="mb-6">
                        <div className="text-sm font-semibold text-gray-900 mb-3">Répartition par thème</div>
                        <div className="space-y-2">
                          {result.questions.map((topic, idx) => (
                            <div key={idx} className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-600">{topic.topic}</span>
                                <span className="font-medium">{topic.correct}/{topic.total}</span>
                              </div>
                              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                                  style={{ width: `${(topic.correct / topic.total) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Link
                          to={`/result/${result.id}`}
                          className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 text-center"
                        >
                          Voir l'analyse détaillée
                        </Link>
                        <button className="px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-semibold rounded-xl hover:shadow-lg transition-all duration-300">
                          <RefreshCw className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl overflow-hidden mb-8">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <div className="col-span-4 font-bold text-gray-700">Quiz</div>
                <div className="col-span-2 font-bold text-gray-700">Score</div>
                <div className="col-span-2 font-bold text-gray-700">Temps</div>
                <div className="col-span-2 font-bold text-gray-700">Difficulté</div>
                <div className="col-span-2 font-bold text-gray-700">Actions</div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-gray-100">
                {mockResults.map((result) => {
                  const performance = getPerformanceTrend(result);
                  
                  return (
                    <div key={result.id} className="hover:bg-gray-50/50 transition-colors">
                      <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                        {/* Quiz Info */}
                        <div className="col-span-4">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl bg-gradient-to-r ${result.color}`}>
                              {result.icon}
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">{result.quizTitle}</div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-gray-500">{result.category}</span>
                                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <GraduationCap className="h-3 w-3" />
                                  {result.faculty}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Score */}
                        <div className="col-span-2">
                          <div className={`text-2xl font-black bg-gradient-to-r ${getScoreColor(result.score)} bg-clip-text text-transparent`}>
                            {result.score}%
                          </div>
                          <div className="text-sm text-gray-500">
                            {result.correct}/{result.total} • {performance.emoji} {performance.text}
                          </div>
                        </div>

                        {/* Temps */}
                        <div className="col-span-2">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="font-bold">{formatTime(result.timeSpent)}</span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {result.time} • {formatDate(result.date)}
                          </div>
                        </div>

                        {/* Difficulté */}
                        <div className="col-span-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getDifficultyColor(result.difficulty)}`}>
                            {getDifficultyText(result.difficulty)}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="col-span-2">
                          <div className="flex items-center gap-2">
                            <Link
                              to={`/result/${result.id}`}
                              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                            >
                              Voir
                            </Link>
                            <button className="p-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg hover:shadow-lg transition-all duration-300">
                              <MoreVertical className="h-4 w-4 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Progress Chart */}
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-8 border border-gray-200 mb-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <LineChart className="h-6 w-6 text-blue-600" />
                  Progression de vos scores
                </h3>
                <p className="text-gray-600 mt-2">Évolution de vos performances au fil du temps</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-lg font-medium">
                  1 mois
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium">
                  6 mois
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-lg font-medium">
                  1 an
                </button>
              </div>
            </div>

            <div className="h-64 flex items-end gap-4 px-4">
              {chartData.map((point, index) => {
                const height = Math.max(20, (point.y / 100) * 200);
                const isHigh = point.y >= 85;
                const isMedium = point.y >= 70;
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center group">
                    <div 
                      className={`w-full rounded-t-lg transition-all duration-300 hover:opacity-90 cursor-pointer group-hover:shadow-lg ${
                        isHigh ? 'bg-gradient-to-t from-green-500 to-green-600' :
                        isMedium ? 'bg-gradient-to-t from-yellow-500 to-yellow-600' :
                        'bg-gradient-to-t from-red-500 to-red-600'
                      }`}
                      style={{ height: `${height}px` }}
                      title={`${point.label}: ${point.y}%`}
                    >
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                        <div className="font-bold">{point.label}</div>
                        <div className="text-xs">{point.y}% • {point.date}</div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">{index + 1}</div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex justify-center">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-green-600 rounded"></div>
                  <span className="text-sm font-medium">≥ 85% (Excellent)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded"></div>
                  <span className="text-sm font-medium">70-84% (Bon)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-600 rounded"></div>
                  <span className="text-sm font-medium">&lt; 70% (À améliorer)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Insights Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Best Performance */}
            <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-xl p-6 border border-green-200">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Crown className="h-5 w-5 text-yellow-600" />
                Vos meilleures performances
              </h4>
              <div className="space-y-4">
                {mockResults
                  .filter(r => r.score >= 85)
                  .slice(0, 3)
                  .map((result, idx) => (
                    <div key={result.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl bg-gradient-to-r ${result.color}`}>
                          {result.icon}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{result.quizTitle}</div>
                          <div className="text-sm text-gray-500">{result.date}</div>
                        </div>
                      </div>
                      <div className={`text-2xl font-black bg-gradient-to-r ${getScoreColor(result.score)} bg-clip-text text-transparent`}>
                        {result.score}%
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Areas to Improve */}
            <div className="bg-gradient-to-br from-white to-red-50 rounded-2xl shadow-xl p-6 border border-red-200">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Target className="h-5 w-5 text-red-600" />
                Domaines à améliorer
              </h4>
              <div className="space-y-4">
                {mockResults
                  .filter(r => r.score < 70)
                  .slice(0, 3)
                  .map((result, idx) => (
                    <div key={result.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl bg-gradient-to-r ${result.color}`}>
                          {result.icon}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{result.quizTitle}</div>
                          <div className="text-sm text-gray-500">Score: {result.score}%</div>
                        </div>
                      </div>
                      <Link
                        to={`/quiz/${result.id}`}
                        className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                      >
                        Refaire
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsHistory;