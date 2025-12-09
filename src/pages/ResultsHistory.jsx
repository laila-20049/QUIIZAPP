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
  FileText
} from 'lucide-react';

// Données de démonstration
const mockResults = [
  {
    id: 1,
    quizTitle: "Algorithmes Avancés S4",
    category: "Informatique",
    faculty: "FST",
    university: "Université Hassan II",
    date: "2024-01-15",
    time: "14:30",
    score: 92,
    correct: 23,
    total: 25,
    timeSpent: 1800,
    difficulty: "Difficile",
    rank: "Top 5%",
    status: "completed"
  },
  {
    id: 2,
    quizTitle: "Physique Quantique S3",
    category: "Physique",
    faculty: "FS",
    university: "Université Mohammed V",
    date: "2024-01-10",
    time: "10:15",
    score: 78,
    correct: 19,
    total: 25,
    timeSpent: 2100,
    difficulty: "Moyen",
    rank: "Top 25%",
    status: "completed"
  },
  {
    id: 3,
    quizTitle: "Droit Constitutionnel",
    category: "Droit",
    faculty: "FD",
    university: "Université Cadi Ayyad",
    date: "2024-01-05",
    time: "16:45",
    score: 85,
    correct: 21,
    total: 25,
    timeSpent: 1500,
    difficulty: "Facile",
    rank: "Top 15%",
    status: "completed"
  },
  {
    id: 4,
    quizTitle: "Mathématiques S2",
    category: "Mathématiques",
    faculty: "EST",
    university: "Université Ibn Zohr",
    date: "2023-12-28",
    time: "09:00",
    score: 96,
    correct: 24,
    total: 25,
    timeSpent: 1600,
    difficulty: "Difficile",
    rank: "Top 1%",
    status: "completed"
  },
  {
    id: 5,
    quizTitle: "Économie Internationale",
    category: "Économie",
    faculty: "FSE",
    university: "Université Hassan II",
    date: "2023-12-20",
    time: "13:20",
    score: 72,
    correct: 18,
    total: 25,
    timeSpent: 1900,
    difficulty: "Moyen",
    rank: "Top 35%",
    status: "completed"
  },
  {
    id: 6,
    quizTitle: "Programmation Web S5",
    category: "Informatique",
    faculty: "ENSA",
    university: "Université Mohammed V",
    date: "2023-12-15",
    time: "11:30",
    score: 88,
    correct: 22,
    total: 25,
    timeSpent: 1700,
    difficulty: "Moyen",
    rank: "Top 10%",
    status: "completed"
  },
  {
    id: 7,
    quizTitle: "Biologie Cellulaire S2",
    category: "Sciences de la Vie",
    faculty: "FS",
    university: "Université Cadi Ayyad",
    date: "2023-12-10",
    time: "15:45",
    score: 65,
    correct: 16,
    total: 25,
    timeSpent: 2200,
    difficulty: "Difficile",
    rank: "Top 45%",
    status: "completed"
  },
  {
    id: 8,
    quizTitle: "Philosophie Moderne",
    category: "Philosophie",
    faculty: "FLSH",
    university: "Université Ibn Zohr",
    date: "2023-12-05",
    time: "14:00",
    score: 81,
    correct: 20,
    total: 25,
    timeSpent: 1400,
    difficulty: "Facile",
    rank: "Top 20%",
    status: "completed"
  }
];

const ResultsHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'
  const [timeRange, setTimeRange] = useState('all'); // 'week', 'month', 'year', 'all'

  const categories = [
    { id: 'all', name: 'Toutes les matières', icon: '📚', count: 8 },
    { id: 'informatique', name: 'Informatique', icon: '💻', count: 2 },
    { id: 'physique', name: 'Physique', icon: '⚛️', count: 1 },
    { id: 'droit', name: 'Droit', icon: '⚖️', count: 1 },
    { id: 'mathematiques', name: 'Mathématiques', icon: '🧮', count: 1 },
    { id: 'economie', name: 'Économie', icon: '📈', count: 1 },
    { id: 'sciences-vie', name: 'Sciences de la Vie', icon: '🧬', count: 1 },
    { id: 'philosophie', name: 'Philosophie', icon: '🤔', count: 1 }
  ];

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 85) return 'bg-green-50';
    if (score >= 70) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'difficile': return 'text-red-600 bg-red-50';
      case 'moyen': return 'text-yellow-600 bg-yellow-50';
      case 'facile': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
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
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getPerformanceTrend = (result) => {
    const score = result.score;
    if (score >= 85) return { text: 'Excellent', icon: '📈', color: 'text-green-600' };
    if (score >= 75) return { text: 'Bon', icon: '↗️', color: 'text-blue-600' };
    if (score >= 60) return { text: 'Moyen', icon: '➡️', color: 'text-yellow-600' };
    return { text: 'À améliorer', icon: '📉', color: 'text-red-600' };
  };

  // Calcul des statistiques
  const stats = {
    totalAttempts: mockResults.length,
    averageScore: Math.round(mockResults.reduce((sum, r) => sum + r.score, 0) / mockResults.length),
    bestScore: Math.max(...mockResults.map(r => r.score)),
    totalTime: mockResults.reduce((sum, r) => sum + r.timeSpent, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Link 
                to="/profile"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ChevronLeft className="h-5 w-5 mr-1" />
                Retour au profil
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">Historique des Résultats</h1>
              <p className="text-gray-600 mt-2">Suivez votre progression et analysez vos performances</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                {viewMode === 'grid' ? '📋' : '⬜'}
              </button>
              <button className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-2">
                <Download className="h-4 w-4" />
                Exporter
              </button>
            </div>
          </div>

          {/* Barre de recherche et filtres */}
          <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher par titre, matière ou université..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <select 
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name} ({cat.count})
                    </option>
                  ))}
                </select>
                
                <select 
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date">Plus récent</option>
                  <option value="score">Meilleur score</option>
                  <option value="time">Temps écoulé</option>
                  <option value="difficulty">Difficulté</option>
                </select>
                
                <select 
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                >
                  <option value="all">Toute période</option>
                  <option value="week">Cette semaine</option>
                  <option value="month">Ce mois</option>
                  <option value="year">Cette année</option>
                </select>
              </div>
            </div>
          </div>

          {/* Cartes de statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Tentatives totales</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalAttempts}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Score moyen</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.averageScore}%</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Meilleur score</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.bestScore}%</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Award className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Temps total passé</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.floor(stats.totalTime / 3600)}h {Math.floor((stats.totalTime % 3600) / 60)}m
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des résultats */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* En-tête du tableau */}
          <div className="border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50">
              <div className="col-span-4 font-medium text-gray-700">Quiz</div>
              <div className="col-span-2 font-medium text-gray-700">Score</div>
              <div className="col-span-2 font-medium text-gray-700">Temps</div>
              <div className="col-span-2 font-medium text-gray-700">Difficulté</div>
              <div className="col-span-2 font-medium text-gray-700">Date</div>
            </div>
          </div>

          {/* Corps du tableau */}
          <div className="divide-y divide-gray-100">
            {mockResults.map((result) => {
              const performance = getPerformanceTrend(result);
              
              return (
                <div key={result.id} className="hover:bg-gray-50 transition-colors">
                  <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                    {/* Quiz Info */}
                    <div className="col-span-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${getScoreBgColor(result.score)}`}>
                          <BookOpen className={`h-5 w-5 ${getScoreColor(result.score)}`} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{result.quizTitle}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                              {result.category}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <University className="h-3 w-3" />
                              {result.university}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="col-span-2">
                      <div className="flex items-center gap-2">
                        <div className={`text-xl font-bold ${getScoreColor(result.score)}`}>
                          {result.score}%
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${performance.color} bg-opacity-10`}>
                          {performance.icon} {performance.text}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {result.correct}/{result.total} correctes
                      </div>
                    </div>

                    {/* Temps */}
                    <div className="col-span-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{formatTime(result.timeSpent)}</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {result.time}
                      </div>
                    </div>

                    {/* Difficulté */}
                    <div className="col-span-2">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${getDifficultyColor(result.difficulty)}`}>
                        {result.difficulty}
                      </span>
                    </div>

                    {/* Date & Actions */}
                    <div className="col-span-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <CalendarDays className="h-4 w-4" />
                            <span className="text-sm">{formatDate(result.date)}</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {result.rank}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link
                            to="/result"
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Voir les détails"
                          >
                            <Eye className="h-4 w-4 text-gray-600" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Affichage de 1 à {mockResults.length} sur {mockResults.length} résultats
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  Précédent
                </button>
                <button className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  Suivant
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Graphique de progression (simplifié) */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-indigo-600" />
            Progression des scores
          </h3>
          <div className="h-64 flex items-end gap-2">
            {mockResults.reverse().map((result, index) => (
              <div key={result.id} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-indigo-500 to-indigo-600 rounded-t-lg transition-all hover:opacity-80"
                  style={{ height: `${result.score}%` }}
                  title={`${result.score}% - ${result.quizTitle}`}
                ></div>
                <div className="text-xs text-gray-500 mt-2">{index + 1}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>≥ 85% (Excellent)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span>70-84% (Bon)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>&lt; 70% (À améliorer)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsHistory;