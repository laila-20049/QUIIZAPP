import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import QuizCard from '../components/QuizCard';
import { 
  Search,
  Filter,
  X,
  SlidersHorizontal,
  Grid,
  List,
  Star,
  TrendingUp,
  Zap,
  Clock,
  Users,
  GraduationCap,
  MapPin,
  ChevronDown,
  RefreshCw,
  Download,
  Eye,
  EyeOff,
  BookOpen,
  Shield,
  Trophy,
  BarChart3,
  Sparkles,
  Target,
  Award,
  Layers,
  Hash,
  Flame,
  TrendingDown,
  Grid3x3,
  Menu,
  AlertCircle,
  Brain,
  Atom,
  Code,
  Scale,
  FlaskRound,
  Globe,
  Calculator,
  SearchX
} from 'lucide-react';

const QuizList = () => {
  const navigate = useNavigate();
  const { 
    filteredQuizzes, 
    setFilters, 
    setSearchQuery,
    quizzes,
    statistics 
  } = useQuiz();

  const [selectedFilters, setSelectedFilters] = useState({
    university: null,
    faculty: null,
    subject: null,
    level: null,
    difficulty: null,
    isPaid: null,
    sortBy: 'popularity'
  });

  const [searchInput, setSearchInput] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(true);
  const [activeSort, setActiveSort] = useState('popularity');
  const [loading, setLoading] = useState(false);
  const [expandedFilter, setExpandedFilter] = useState(null);

  // Handlers pour les actions des cartes de quiz
  const handleStartQuiz = (quizId) => {
    const quiz = filteredQuizzes.find(q => q.id === quizId);
    
    if (quiz && quiz.isPaid) {
      navigate('/payment', { state: { quiz } });
    } else {
      navigate(`/quiz/${quizId}`);
    }
  };

  const handleBookmark = (quizId, isBookmarked) => {
    console.log(`Quiz ${quizId} ${isBookmarked ? 'ajouté aux' : 'retiré des'} favoris`);
  };

  const handleLike = (quizId, isLiked) => {
    console.log(`Quiz ${quizId} ${isLiked ? 'aimé' : 'pas aimé'}`);
  };

  const handleShare = (quizId) => {
    if (navigator.share) {
      navigator.share({
        title: 'Moroccan University Quiz',
        text: 'Découvrez ce quiz !',
        url: `${window.location.origin}/quiz/${quizId}`
      }).catch(err => console.log('Erreur:', err));
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/quiz/${quizId}`);
      alert('Lien copié !');
    }
  };

  // Données pour les filtres
  const universities = [
    { id: 1, name: "Université Hassan II", count: 42, logo: "🦁" },
    { id: 2, name: "Université Mohammed V", count: 38, logo: "🎓" },
    { id: 3, name: "Université Cadi Ayyad", count: 35, logo: "🏛️" },
    { id: 4, name: "Université Ibn Tofail", count: 28, logo: "📚" },
    { id: 5, name: "Université Abdelmalek Essaâdi", count: 22, logo: "🌊" }
  ];

  const faculties = [
    { id: 1, name: "Faculté des Sciences (FS)", count: 56 },
    { id: 2, name: "Faculté des Sciences et Techniques (FST)", count: 48 },
    { id: 3, name: "École Nationale des Sciences Appliquées (ENSA)", count: 42 },
    { id: 4, name: "Faculté de Droit (FD)", count: 35 },
    { id: 5, name: "Faculté des Sciences Économiques (FSE)", count: 31 }
  ];

  const subjects = [
    { id: 1, name: "Mathématiques", icon: Calculator, count: 42, color: "from-blue-500 to-blue-600" },
    { id: 2, name: "Physique", icon: Atom, count: 38, color: "from-purple-500 to-purple-600" },
    { id: 3, name: "Informatique", icon: Code, count: 56, color: "from-green-500 to-green-600" },
    { id: 4, name: "Économie", icon: TrendingUp, count: 28, color: "from-yellow-500 to-yellow-600" },
    { id: 5, name: "Droit", icon: Scale, count: 35, color: "from-red-500 to-red-600" },
    { id: 6, name: "Sciences de la Vie", icon: FlaskRound, count: 24, color: "from-emerald-500 to-emerald-600" },
    { id: 7, name: "Philosophie", icon: Brain, count: 18, color: "from-indigo-500 to-indigo-600" },
    { id: 8, name: "Culture Générale", icon: Globe, count: 45, color: "from-orange-500 to-orange-600" }
  ];

  const levels = [
    { value: 'S1', label: 'Semestre 1' },
    { value: 'S2', label: 'Semestre 2' },
    { value: 'S3', label: 'Semestre 3' },
    { value: 'S4', label: 'Semestre 4' },
    { value: 'S5', label: 'Semestre 5' },
    { value: 'S6', label: 'Semestre 6' }
  ];

  const difficulties = [
    { value: 'beginner', label: 'Débutant', color: 'from-green-500 to-green-600' },
    { value: 'intermediate', label: 'Intermédiaire', color: 'from-blue-500 to-blue-600' },
    { value: 'advanced', label: 'Avancé', color: 'from-purple-500 to-purple-600' },
    { value: 'expert', label: 'Expert', color: 'from-red-500 to-red-600' }
  ];

  const sortOptions = [
    { id: 'popularity', name: 'Popularité', icon: TrendingUp, desc: 'Les plus populaires' },
    { id: 'newest', name: 'Plus récents', icon: Sparkles, desc: 'Nouveautés' },
    { id: 'rating', name: 'Meilleure note', icon: Star, desc: 'Mieux notés' },
    { id: 'participants', name: 'Plus de participants', icon: Users, desc: 'Plus populaires' },
    { id: 'difficulty', name: 'Difficulté croissante', icon: TrendingDown, desc: 'Du plus facile' }
  ];

  const recommendedQuizzes = quizzes.filter(quiz => quiz.isFeatured).slice(0, 3);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [selectedFilters, searchInput]);

  const handleSearch = (value) => {
    setSearchInput(value);
    setSearchQuery(value);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { 
      ...selectedFilters, 
      [key]: selectedFilters[key] === value ? null : value 
    };
    setSelectedFilters(newFilters);
    setFilters(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      university: null,
      faculty: null,
      subject: null,
      level: null,
      difficulty: null,
      isPaid: null,
      sortBy: 'popularity'
    };
    setSelectedFilters(clearedFilters);
    setFilters(clearedFilters);
    setSearchInput('');
    setSearchQuery('');
  };

  const getActiveFilterCount = () => {
    return Object.values(selectedFilters).filter(
      value => value !== null && value !== 'popularity'
    ).length;
  };

  const renderFilterPill = (label, value, key, icon = null) => {
    const Icon = icon;
    return (
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
        {Icon && <Icon className="h-3 w-3" />}
        <span>{label}: {value}</span>
        <button
          onClick={() => handleFilterChange(key, value)}
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            {/* Header Skeleton */}
            <div className="flex justify-between items-center">
              <div className="space-y-3">
                <div className="h-8 bg-gray-200 rounded-lg w-64"></div>
                <div className="h-4 bg-gray-200 rounded-lg w-48"></div>
              </div>
              <div className="flex gap-4">
                <div className="h-10 w-32 bg-gray-200 rounded-lg"></div>
                <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
              </div>
            </div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow p-6">
                  <div className="h-12 bg-gray-200 rounded-xl mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded-lg w-3/4"></div>
                </div>
              ))}
            </div>

            {/* Filter Skeleton */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <div className="h-12 bg-gray-200 rounded-xl mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded-lg w-32"></div>
                    <div className="space-y-2">
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="h-10 bg-gray-200 rounded-lg"></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quiz Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded-lg w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded-lg w-1/2"></div>
                    <div className="space-y-2">
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="h-3 bg-gray-200 rounded-lg"></div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header avec Hero Section */}
        <div className="relative mb-12">
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-3xl shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 to-transparent"></div>
            <div className="relative p-8 md:p-12">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-white mb-6">
                    <Sparkles className="h-4 w-4" />
                    Plateforme éducative officielle
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                    Découvrez, Apprenez, <span className="text-yellow-300">Excellez</span>
                  </h1>
                  <p className="text-blue-100 text-lg md:text-xl mb-8 max-w-2xl">
                    {quizzes.length}+ quiz universitaires pour préparer vos examens et tester vos connaissances
                  </p>
                  
                  {/* Quick Actions */}
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => {
                        const element = document.getElementById('recommended-section');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className="bg-gradient-to-r from-white to-blue-100 text-blue-600 px-6 py-3 rounded-xl font-bold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                    >
                      <Target className="h-5 w-5" />
                      Recommandé pour vous
                    </button>
                    <button 
                      onClick={() => navigate('/leaderboard')}
                      className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition-all duration-300 flex items-center gap-2 hover:shadow-xl transform hover:-translate-y-1"
                    >
                      <Trophy className="h-5 w-5" />
                      Voir le classement
                    </button>
                  </div>
                </div>
                
                {/* Stats Card */}
                <div className="lg:w-96">
                  <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-white to-blue-100 rounded-2xl mb-4">
                        <BookOpen className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="text-5xl font-bold text-white mb-2">{quizzes.length}</div>
                      <div className="text-blue-100 text-lg">Quiz disponibles</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">12.5K</div>
                        <div className="text-blue-100 text-sm">Étudiants</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">4.7</div>
                        <div className="text-blue-100 text-sm">Note moyenne</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{quizzes.length}</div>
                <div className="text-sm text-gray-600">Quiz disponibles</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">12,450</div>
                <div className="text-sm text-gray-600">Étudiants actifs</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center">
                <Star className="h-6 w-6 text-yellow-600 fill-current" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">4.7</div>
                <div className="text-sm text-gray-600">Note moyenne</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">78%</div>
                <div className="text-sm text-gray-600">Taux de réussite</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search et Controls */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un quiz par titre, matière, université..."
                  value={searchInput}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-white border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
                />
                {searchInput && (
                  <button
                    onClick={() => handleSearch('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                {showFilters ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showFilters ? 'Masquer filtres' : 'Afficher filtres'}
              </button>
              
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                  }`}
                  title="Vue grille"
                >
                  <Grid3x3 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                  }`}
                  title="Vue liste"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {getActiveFilterCount() > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-bold text-gray-900">
                Filtres actifs ({getActiveFilterCount()})
              </div>
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <RefreshCw className="h-4 w-4" />
                Tout effacer
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {selectedFilters.university && universities.find(u => u.id === selectedFilters.university) && 
                renderFilterPill('Université', universities.find(u => u.id === selectedFilters.university).name, 'university')}
              
              {selectedFilters.faculty && faculties.find(f => f.id === selectedFilters.faculty) && 
                renderFilterPill('Faculté', faculties.find(f => f.id === selectedFilters.faculty).name, 'faculty')}
              
              {selectedFilters.subject && subjects.find(s => s.id === selectedFilters.subject) && 
                renderFilterPill('Matière', subjects.find(s => s.id === selectedFilters.subject).name, 'subject')}
              
              {selectedFilters.level && 
                renderFilterPill('Niveau', selectedFilters.level, 'level')}
              
              {selectedFilters.difficulty && difficulties.find(d => d.value === selectedFilters.difficulty) && 
                renderFilterPill('Difficulté', difficulties.find(d => d.value === selectedFilters.difficulty).label, 'difficulty')}
              
              {selectedFilters.isPaid !== null && 
                renderFilterPill('Type', selectedFilters.isPaid ? 'Payant' : 'Gratuit', 'isPaid')}
            </div>
          </div>
        )}

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                <SlidersHorizontal className="h-6 w-6 text-blue-600" />
                Filtres & Triage
              </h3>
              <button
                onClick={clearAllFilters}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Réinitialiser
              </button>
            </div>

            {/* Sort Options */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Trier par</h4>
              <div className="flex flex-wrap gap-3">
                {sortOptions.map(option => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setActiveSort(option.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        activeSort === option.id
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="font-medium">{option.name}</span>
                      {activeSort === option.id && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Universities */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Universités
                </h4>
                <div className="space-y-3">
                  {universities.map(uni => (
                    <button
                      key={uni.id}
                      onClick={() => handleFilterChange('university', uni.id)}
                      className={`w-full flex items-center justify-between p-3 text-left rounded-xl transition-all duration-200 ${
                        selectedFilters.university === uni.id
                          ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-2 border-blue-200'
                          : 'hover:bg-gray-50 text-gray-700 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{uni.logo}</span>
                        <span className="font-medium truncate">{uni.name}</span>
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                        {uni.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Subjects */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-4">Matières</h4>
                <div className="grid grid-cols-2 gap-3">
                  {subjects.map(subject => {
                    const Icon = subject.icon;
                    return (
                      <button
                        key={subject.id}
                        onClick={() => handleFilterChange('subject', subject.id)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200 ${
                          selectedFilters.subject === subject.id
                            ? `bg-gradient-to-r ${subject.color} text-white shadow-lg`
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        <div className={`p-3 rounded-lg ${
                          selectedFilters.subject === subject.id 
                            ? 'bg-white/20' 
                            : 'bg-white'
                        }`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium truncate">{subject.name}</div>
                          <div className="text-xs opacity-75">{subject.count} quiz</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Other Filters */}
              <div>
                <div className="space-y-6">
                  {/* Difficulty */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">Difficulté</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {difficulties.map(diff => (
                        <button
                          key={diff.value}
                          onClick={() => handleFilterChange('difficulty', diff.value)}
                          className={`p-3 rounded-xl text-center font-medium transition-all duration-200 ${
                            selectedFilters.difficulty === diff.value
                              ? `bg-gradient-to-r ${diff.color} text-white shadow-lg`
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          {diff.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Level */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">Niveau</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {levels.map(level => (
                        <button
                          key={level.value}
                          onClick={() => handleFilterChange('level', level.value)}
                          className={`p-3 rounded-xl text-center transition-all duration-200 ${
                            selectedFilters.level === level.value
                              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          <div className="text-sm font-medium">{level.value}</div>
                          <div className="text-xs opacity-75">{level.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Type */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">Type</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleFilterChange('isPaid', false)}
                        className={`p-4 rounded-xl transition-all duration-200 ${
                          selectedFilters.isPaid === false
                            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <BookOpen className="h-6 w-6" />
                          <div>
                            <div className="font-medium">Gratuit</div>
                            <div className="text-sm opacity-75">Accès libre</div>
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => handleFilterChange('isPaid', true)}
                        className={`p-4 rounded-xl transition-all duration-200 ${
                          selectedFilters.isPaid === true
                            ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Shield className="h-6 w-6" />
                          <div>
                            <div className="font-medium">Premium</div>
                            <div className="text-sm opacity-75">99 MAD</div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredQuizzes.length} quiz trouvé{filteredQuizzes.length !== 1 ? 's' : ''}
            </h2>
            {searchInput && (
              <p className="text-gray-600 mt-2">
                Résultats pour: <span className="font-semibold text-blue-600">"{searchInput}"</span>
              </p>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Export */}
            <button className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <Download className="h-4 w-4" />
              Exporter
            </button>
          </div>
        </div>

        {/* Recommended Section */}
        {recommendedQuizzes.length > 0 && !searchInput && getActiveFilterCount() === 0 && (
          <div id="recommended-section" className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Flame className="h-6 w-6 text-orange-500" />
                Recommandé pour vous
              </h3>
              <span className="text-sm text-gray-500 px-4 py-2 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 rounded-full font-medium">
                Basé sur votre profil
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {recommendedQuizzes.map(quiz => (
                <div key={quiz.id} className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-2xl overflow-hidden">
                  <div className="p-8 text-white">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                        TOP CHOICE
                      </div>
                      {quiz.isPro && (
                        <div className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full text-sm font-medium">
                          PREMIUM
                        </div>
                      )}
                    </div>
                    <h4 className="text-2xl font-bold mb-4">{quiz.title}</h4>
                    <p className="text-blue-200 mb-6">{quiz.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{quiz.participants}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 fill-current" />
                          <span>{quiz.rating}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleStartQuiz(quiz.id)}
                        className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                      >
                        Commencer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quiz Grid/List */}
        {filteredQuizzes.length === 0 ? (
          <div className="text-center py-20 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl mb-6">
              <SearchX className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Aucun quiz trouvé
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Essayez de modifier vos critères de recherche ou d'effacer les filtres
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={clearAllFilters}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <RefreshCw className="h-5 w-5 inline mr-2" />
                Effacer tous les filtres
              </button>
              <button className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300">
                Voir tous les quiz
              </button>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map(quiz => (
              <QuizCard 
                key={quiz.id} 
                quiz={quiz}
                onStartQuiz={handleStartQuiz}
                onBookmark={handleBookmark}
                onLike={handleLike}
                onShare={handleShare}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredQuizzes.map(quiz => (
              <div key={quiz.id} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-32 flex-shrink-0">
                    <div className="w-full h-48 lg:h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex flex-col items-center justify-center text-white p-4">
                      <BookOpen className="h-12 w-12 mb-3" />
                      <div className="text-center">
                        <div className="text-2xl font-bold">{quiz.questionsCount}</div>
                        <div className="text-sm opacity-90">questions</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {quiz.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4" />
                            <span className="font-medium">{quiz.university}</span>
                          </div>
                          <div className="w-px h-4 bg-gray-300"></div>
                          <div className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg">
                            {quiz.subject}
                          </div>
                          <div className="w-px h-4 bg-gray-300"></div>
                          <div className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-lg font-medium">
                            Niveau {quiz.level}
                          </div>
                        </div>
                      </div>
                      {quiz.isPro && (
                        <div className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg font-bold shadow-lg">
                          PREMIUM
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-6 line-clamp-2">{quiz.description}</p>
                    
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-blue-500" />
                          <span className="font-medium">{quiz.duration} min</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-green-500" />
                          <span className="font-medium">{quiz.participants.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{quiz.rating} ({quiz.ratingCount})</span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => handleStartQuiz(quiz.id)}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                      >
                        Voir le quiz
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {filteredQuizzes.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between">
              <div className="text-gray-600">
                Affichage de <span className="font-bold">1-{Math.min(12, filteredQuizzes.length)}</span> sur <span className="font-bold">{filteredQuizzes.length}</span> quiz
              </div>
              <div className="flex items-center gap-2">
                <button className="p-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                  <ChevronDown className="h-5 w-5 rotate-90" />
                </button>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, '...', 5].map((page, index) => (
                    <button
                      key={index}
                      className={`w-12 h-12 flex items-center justify-center rounded-xl font-medium transition-all duration-200 ${
                        page === 1
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button className="p-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:shadow-lg transition-all duration-200">
                  <ChevronDown className="h-5 w-5 -rotate-90" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Featured Categories */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Explorez par catégorie
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {subjects.map(subject => {
              const Icon = subject.icon;
              return (
                <button
                  key={subject.id}
                  onClick={() => handleFilterChange('subject', subject.id)}
                  className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-gradient-to-r ${subject.color} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-lg font-bold text-gray-900 mb-2">{subject.name}</div>
                  <div className="text-sm text-gray-600">{subject.count} quiz</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizList;