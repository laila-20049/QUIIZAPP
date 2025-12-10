import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Crown, 
  Star, 
  TrendingUp, 
  Award, 
  Users, 
  Filter, 
  Search,
  Calendar,
  Clock,
  Zap,
  Shield,
  Medal,
  ChevronUp,
  ChevronDown,
  Target,
  Flame,
  Sparkles,
  GraduationCap,
  TrendingUp as TrendingUpIcon,
  BarChart3,
  Eye,
  Heart,
  Clock as ClockIcon,
  BookOpen,
  CheckCircle,
  ArrowRight,
  X,
  RefreshCw,
  Download,
  Share2,
  Bell,
  TrendingDown,
  Percent,
  Calculator,
  Atom,
  Code,
  Pill,
  Scale,
  Languages
} from 'lucide-react';

const Leaderboard = () => {
  const [timeRange, setTimeRange] = useState('weekly');
  const [category, setCategory] = useState('overall');
  const [searchQuery, setSearchQuery] = useState('');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserRank, setCurrentUserRank] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('score'); // 'score', 'progress', 'quizzes'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc', 'desc'

  // Données de démonstration enrichies
  const demoData = {
    weekly: Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      rank: i + 1,
      name: [
        "Ahmed Alami", "Fatima Zahra", "Youssef Benani", "Amina Toumi", "Mehdi Kassi",
        "Sara El Fassi", "Karim Bennis", "Nadia Haddou", "Omar Idrissi", "Lina Mansouri",
        "Hassan Chafik", "Zineb Ait", "Rachid El", "Salma Bouchra", "Anas Mourad",
        "Imane Belaid", "Yassin Tazi", "Nora Chaoui", "Bilal Amrani", "Hanae Rami"
      ][i % 20],
      university: [
        "Université Hassan II", "Université Mohammed V", "Université Cadi Ayyad",
        "Université Ibn Tofail", "Université Sidi Mohamed Ben Abdellah",
        "Université Abdelmalek Essaâdi", "Université Chouaib Doukkali", "Université Al Akhawayn"
      ][i % 8],
      faculty: [
        "Faculté des Sciences", "ENSA", "FST", "Faculté de Médecine", 
        "Faculté de Droit", "Faculté des Lettres", "ENSA Marrakech", "FMP"
      ][i % 8],
      score: 10000 - (i * 150) + Math.floor(Math.random() * 200),
      progress: [-10, -5, 0, 2, 5, 8, 12, 15][Math.floor(Math.random() * 8)],
      avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
      badges: [
        ["top_rank", "quick_learner"],
        ["streak_master", "math_expert"],
        ["biology_pro", "rising_star"],
        ["physics_wizard", "quiz_champion"],
        ["speed_demon", "accuracy_king"]
      ][i % 5],
      quizzesCompleted: 15 + Math.floor(Math.random() * 35),
      averageScore: 70 + Math.floor(Math.random() * 25),
      totalTime: 45 + Math.floor(Math.random() * 200),
      streak: Math.floor(Math.random() * 30),
      lastActive: ["2h", "1j", "3j", "5j", "1s"][Math.floor(Math.random() * 5)],
      isCurrentUser: i === 15 // 16ème position pour l'utilisateur courant
    })),
    monthly: Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      rank: i + 1,
      name: [
        "Fatima Zahra", "Ahmed Alami", "Youssef Benani", "Amina Toumi", "Mehdi Kassi"
      ][i % 5] + (i > 4 ? ` ${Math.floor(i/5) + 1}` : ""),
      university: [
        "Université Mohammed V", "Université Hassan II", "Université Cadi Ayyad"
      ][i % 3],
      faculty: [
        "ENSA", "Faculté des Sciences", "FST", "Faculté de Médecine"
      ][i % 4],
      score: 50000 - (i * 800) + Math.floor(Math.random() * 1000),
      progress: [-5, 0, 3, 7, 10][Math.floor(Math.random() * 5)],
      avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 30}`,
      badges: [
        ["monthly_champion", "consistency_pro"],
        ["top_contributor", "review_master"],
        ["subject_expert", "helpful_professor"]
      ][i % 3],
      quizzesCompleted: 80 + Math.floor(Math.random() * 100),
      averageScore: 75 + Math.floor(Math.random() * 20),
      totalTime: 200 + Math.floor(Math.random() * 500),
      streak: Math.floor(Math.random() * 100),
      lastActive: ["1j", "2j", "3j", "1s", "2s"][Math.floor(Math.random() * 5)],
      isCurrentUser: i === 15
    })),
    all: Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      rank: i + 1,
      name: [
        "Ahmed Alami", "Fatima Zahra", "Youssef Benani", "Amina Toumi", "Mehdi Kassi"
      ][i % 5] + (i > 4 ? ` ${Math.floor(i/5) + 1}` : ""),
      university: [
        "Université Hassan II", "Université Mohammed V", "Université Cadi Ayyad"
      ][i % 3],
      faculty: [
        "Faculté des Sciences", "ENSA", "FST"
      ][i % 3],
      score: 200000 - (i * 3500) + Math.floor(Math.random() * 5000),
      progress: [-3, 0, 2, 5, 8][Math.floor(Math.random() * 5)],
      avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 50}`,
      badges: [
        ["legendary", "all_time_great"],
        ["pioneer", "foundation_member"],
        ["mentor", "community_leader"]
      ][i % 3],
      quizzesCompleted: 200 + Math.floor(Math.random() * 300),
      averageScore: 80 + Math.floor(Math.random() * 15),
      totalTime: 1000 + Math.floor(Math.random() * 2000),
      streak: Math.floor(Math.random() * 365),
      lastActive: ["1s", "2s", "3j", "1s", "2s"][Math.floor(Math.random() * 5)],
      isCurrentUser: i === 15
    }))
  };

  const categories = [
    { id: 'overall', name: 'Classement Général', icon: Trophy, color: 'from-yellow-500 to-amber-600' },
    { id: 'math', name: 'Mathématiques', icon: Calculator, color: 'from-purple-500 to-purple-700' },
    { id: 'physics', name: 'Physique', icon: Atom, color: 'from-orange-500 to-red-600' },
    { id: 'computer_science', name: 'Informatique', icon: Code, color: 'from-blue-500 to-cyan-600' },
    { id: 'biology', name: 'Biologie', icon: Pill, color: 'from-green-500 to-emerald-600' },
    { id: 'droit', name: 'Droit', icon: Scale, color: 'from-amber-500 to-amber-700' },
    { id: 'langues', name: 'Langues', icon: Languages, color: 'from-indigo-500 to-violet-600' }
  ];

  useEffect(() => {
    const loadLeaderboard = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let data = demoData[timeRange] || demoData.weekly;
      
      // Filtrer par recherche
      if (searchQuery) {
        data = data.filter(user => 
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.university.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      // Trier les données
      data = [...data].sort((a, b) => {
        let valueA, valueB;
        
        switch (sortBy) {
          case 'score':
            valueA = a.score;
            valueB = b.score;
            break;
          case 'progress':
            valueA = a.progress;
            valueB = b.progress;
            break;
          case 'quizzes':
            valueA = a.quizzesCompleted;
            valueB = b.quizzesCompleted;
            break;
          case 'average':
            valueA = a.averageScore;
            valueB = b.averageScore;
            break;
          default:
            valueA = a.rank;
            valueB = b.rank;
        }
        
        return sortOrder === 'desc' ? valueB - valueA : valueA - valueB;
      });
      
      // Réassigner les rangs après tri
      data = data.map((user, index) => ({
        ...user,
        rank: index + 1
      }));
      
      setLeaderboardData(data.slice(0, 20)); // Afficher seulement les 20 premiers
      
      const currentUser = data.find(user => user.isCurrentUser);
      setCurrentUserRank(currentUser);
      
      setLoading(false);
    };

    loadLeaderboard();
  }, [timeRange, category, searchQuery, sortBy, sortOrder]);

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return 'from-yellow-400 to-amber-600 shadow-yellow-500/50';
      case 2: return 'from-gray-300 to-gray-500 shadow-gray-400/50';
      case 3: return 'from-amber-700 to-amber-900 shadow-amber-700/50';
      case 4: case 5: return 'from-blue-500 to-blue-700 shadow-blue-500/50';
      case 6: case 7: case 8: case 9: case 10: return 'from-green-500 to-green-700 shadow-green-500/50';
      default: return 'from-gray-400 to-gray-600 shadow-gray-400/30';
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5" />;
      case 2: return <Medal className="h-5 w-5" />;
      case 3: return <Award className="h-5 w-5" />;
      case 4: case 5: return <Trophy className="h-4 w-4" />;
      case 6: case 7: case 8: case 9: case 10: return <Star className="h-4 w-4 fill-current" />;
      default: return <span className="text-xs font-bold">{rank}</span>;
    }
  };

  const ProgressIndicator = ({ progress }) => {
    const isPositive = progress > 0;
    const isNeutral = progress === 0;
    
    return (
      <div className={`flex items-center gap-1 text-sm font-semibold ${
        isPositive ? 'text-green-600' : 
        isNeutral ? 'text-gray-500' : 'text-red-600'
      }`}>
        {isPositive ? <ChevronUp className="h-4 w-4" /> : 
         isNeutral ? <Minus className="h-4 w-4" /> : 
         <ChevronDown className="h-4 w-4" />}
        <span>{Math.abs(progress)}</span>
      </div>
    );
  };

  const Minus = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
    </svg>
  );

  const BadgePill = ({ badge }) => {
    const badgeConfig = {
      top_rank: { color: 'bg-gradient-to-r from-yellow-400 to-yellow-600', icon: Crown, label: 'Top Rank' },
      quick_learner: { color: 'bg-gradient-to-r from-green-400 to-green-600', icon: Zap, label: 'Quick Learner' },
      streak_master: { color: 'bg-gradient-to-r from-orange-400 to-orange-600', icon: Flame, label: 'Streak Master' },
      math_expert: { color: 'bg-gradient-to-r from-blue-400 to-blue-600', icon: Calculator, label: 'Math Expert' },
      biology_pro: { color: 'bg-gradient-to-r from-emerald-400 to-emerald-600', icon: Pill, label: 'Biology Pro' },
      physics_wizard: { color: 'bg-gradient-to-r from-purple-400 to-purple-600', icon: Atom, label: 'Physics Wizard' },
      rising_star: { color: 'bg-gradient-to-r from-pink-400 to-pink-600', icon: Sparkles, label: 'Rising Star' },
      monthly_champion: { color: 'bg-gradient-to-r from-rose-400 to-rose-600', icon: Trophy, label: 'Monthly Champ' },
      quiz_champion: { color: 'bg-gradient-to-r from-indigo-400 to-indigo-600', icon: Award, label: 'Quiz Champ' },
      speed_demon: { color: 'bg-gradient-to-r from-cyan-400 to-cyan-600', icon: Zap, label: 'Speed Demon' },
      accuracy_king: { color: 'bg-gradient-to-r from-lime-400 to-lime-600', icon: Target, label: 'Accuracy King' }
    };

    const config = badgeConfig[badge] || badgeConfig.rising_star;
    const IconComponent = config.icon;

    return (
      <div className="group relative">
        <span className={`px-2 py-1 rounded-full text-white text-xs font-medium flex items-center gap-1 ${config.color} shadow-sm`}>
          <IconComponent className="h-3 w-3" />
          <span className="hidden sm:inline">{config.label}</span>
          <span className="sm:hidden">{config.label.split(' ')[0]}</span>
        </span>
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {config.label}
        </div>
      </div>
    );
  };

  const StatCard = ({ icon: Icon, value, label, color, change }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className={`p-2 rounded-lg ${color} bg-opacity-10`}>
              <Icon className="h-5 w-5" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{value}</span>
          </div>
          <div className="text-sm text-gray-600">{label}</div>
        </div>
        {change && (
          <div className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change > 0 ? '+' : ''}{change}%
          </div>
        )}
      </div>
    </div>
  );

  const UserStats = () => {
    if (!currentUserRank) return null;
    
    return (
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-8 border border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className={`relative w-16 h-16 rounded-full bg-gradient-to-r ${getRankColor(currentUserRank.rank)} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
              {currentUserRank.rank <= 10 ? getRankIcon(currentUserRank.rank) : currentUserRank.rank}
              {currentUserRank.rank <= 3 && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-gray-900">{currentUserRank.name}</h3>
                <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full font-bold">
                  Vous
                </span>
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                {currentUserRank.university} • {currentUserRank.faculty}
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {currentUserRank.score.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Score total</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
            <div className="text-lg font-bold text-gray-900">{currentUserRank.quizzesCompleted}</div>
            <div className="text-xs text-gray-600">Quiz complétés</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
            <div className="text-lg font-bold text-gray-900">{currentUserRank.averageScore}%</div>
            <div className="text-xs text-gray-600">Score moyen</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
            <div className="text-lg font-bold text-gray-900">{currentUserRank.streak}</div>
            <div className="text-xs text-gray-600">Streak actuel</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
            <ProgressIndicator progress={currentUserRank.progress} />
            <div className="text-xs text-gray-600 mt-1">Progression</div>
          </div>
        </div>
        
        {currentUserRank.rank > 1 && (
          <div className="mt-6 pt-6 border-t border-blue-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Prochain objectif: Atteindre le top 10
              </div>
              <div className="flex items-center gap-2">
                <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                    style={{ width: `${Math.min(100, ((20 - currentUserRank.rank) / 19) * 100)}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {20 - currentUserRank.rank} places restantes
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          {/* En-tête skeleton */}
          <div className="flex justify-center mb-8">
            <div className="h-12 bg-gray-200 rounded w-64"></div>
          </div>
          
          {/* Stats skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
          
          {/* Filtres skeleton */}
          <div className="h-20 bg-gray-200 rounded-xl mb-8"></div>
          
          {/* Tableau skeleton */}
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* En-tête avec titre et actions */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-2xl shadow-lg">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
                Classement des Meilleurs
              </h1>
              <p className="text-gray-600 mt-1">
                Découvrez les meilleurs étudiants et compétitionnez pour atteindre le sommet
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Partager
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exporter
          </button>
        </div>
      </div>

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={Users}
          value="1,247"
          label="Participants actifs"
          color="text-blue-500"
          change={5.2}
        />
        <StatCard 
          icon={Trophy}
          value="42"
          label="Quiz complétés"
          color="text-yellow-500"
          change={12.4}
        />
        <StatCard 
          icon={Star}
          value="84%"
          label="Score moyen"
          color="text-green-500"
          change={2.1}
        />
        <StatCard 
          icon={Clock}
          value="156h"
          label="Temps d'étude total"
          color="text-purple-500"
          change={8.7}
        />
      </div>

      {/* Stats utilisateur courant */}
      <UserStats />

      {/* Filtres et contrôles */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
          {/* Période */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="h-4 w-4 inline mr-2" />
              Période
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'weekly', name: 'Cette semaine', icon: TrendingUpIcon },
                { id: 'monthly', name: 'Ce mois', icon: Calendar },
                { id: 'all', name: 'Tous le temps', icon: Trophy }
              ].map((range) => {
                const Icon = range.icon;
                return (
                  <button
                    key={range.id}
                    onClick={() => setTimeRange(range.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                      timeRange === range.id
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {range.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Catégorie */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Filter className="h-4 w-4 inline mr-2" />
              Catégorie
            </label>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                      category === cat.id
                        ? `bg-gradient-to-r ${cat.color} text-white shadow-md`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recherche */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un étudiant ou une université..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Options de tri */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          Affichage de 1 à {Math.min(20, leaderboardData.length)} sur {demoData[timeRange].length} participants
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">Trier par:</div>
          <div className="flex gap-2">
            {[
              { id: 'score', label: 'Score' },
              { id: 'progress', label: 'Progression' },
              { id: 'quizzes', label: 'Quiz' },
              { id: 'average', label: 'Moyenne' }
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => handleSort(option.id)}
                className={`px-3 py-1 rounded-lg text-sm ${
                  sortBy === option.id
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {option.label}
                {sortBy === option.id && (
                  <span className="ml-1">
                    {sortOrder === 'desc' ? '↓' : '↑'}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Classement */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        {/* En-tête du tableau */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 text-sm font-semibold text-gray-700">
          <div className="col-span-1 text-center">Rang</div>
          <div className="col-span-4">Étudiant</div>
          <div className="col-span-2 hidden md:block">Université</div>
          <div className="col-span-2 text-center">Score</div>
          <div className="col-span-2 text-center">Progression</div>
          <div className="col-span-1 text-center">Actions</div>
        </div>

        {/* Liste des participants */}
        <div className="divide-y divide-gray-100">
          {leaderboardData.map((user) => (
            <div
              key={user.id}
              className={`grid grid-cols-12 gap-4 px-6 py-4 items-center transition-all hover:bg-gray-50 group ${
                user.isCurrentUser ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-l-blue-500' : ''
              } ${user.rank <= 3 ? 'bg-gradient-to-r from-gray-50 to-white' : ''}`}
            >
              {/* Rang */}
              <div className="col-span-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full text-white font-bold shadow-lg ${
                  getRankColor(user.rank)
                }`}>
                  {getRankIcon(user.rank)}
                </div>
              </div>

              {/* Étudiant */}
              <div className="col-span-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                    />
                    {user.rank <= 3 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                        <Sparkles className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold ${
                        user.isCurrentUser ? 'text-blue-600' : 'text-gray-900'
                      }`}>
                        {user.name}
                      </span>
                      {user.isCurrentUser && (
                        <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full font-bold">
                          Vous
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        <span>{user.quizzesCompleted} quiz</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span>{user.averageScore}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Université (caché sur mobile) */}
              <div className="col-span-2 hidden md:block">
                <div className="text-sm">
                  <div className="font-medium text-gray-900 truncate">{user.university}</div>
                  <div className="text-gray-500 truncate">{user.faculty}</div>
                </div>
              </div>

              {/* Score */}
              <div className="col-span-2">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">
                    {user.score.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                    <ClockIcon className="h-3 w-3" />
                    {user.totalTime}h
                  </div>
                </div>
              </div>

              {/* Progression */}
              <div className="col-span-2">
                <div className="text-center">
                  <ProgressIndicator progress={user.progress} />
                  <div className="text-xs text-gray-500 mt-1">
                    {user.lastActive}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="col-span-1">
                <div className="flex justify-center">
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-purple-500 hover:bg-purple-50 rounded-lg">
                      <Bell className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mb-12">
        <div className="text-sm text-gray-600">
          {leaderboardData.length} participants affichés
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            Précédent
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Suivant
          </button>
        </div>
      </div>

      {/* Section de motivation et badges */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Badges Disponibles</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { name: 'Top 10', icon: Trophy, color: 'from-yellow-400 to-amber-500', description: 'Atteignez le top 10' },
            { name: 'Streak 30', icon: Flame, color: 'from-orange-400 to-red-500', description: '30 jours consécutifs' },
            { name: 'Quiz Master', icon: BookOpen, color: 'from-blue-400 to-cyan-500', description: '50 quiz complétés' },
            { name: 'Accuracy', icon: Target, color: 'from-green-400 to-emerald-500', description: '95% de score moyen' },
            { name: 'Speed', icon: Zap, color: 'from-purple-400 to-violet-500', description: 'Quiz rapides' },
            { name: 'Helper', icon: Heart, color: 'from-pink-400 to-rose-500', description: 'Aidez 10 personnes' }
          ].map((badge, index) => (
            <div key={index} className="bg-white rounded-xl p-4 text-center border border-gray-200 hover:shadow-md transition-shadow">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${badge.color} mb-3`}>
                <badge.icon className="h-6 w-6 text-white" />
              </div>
              <div className="font-semibold text-gray-900 mb-1">{badge.name}</div>
              <div className="text-xs text-gray-600">{badge.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Final */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl p-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Rejoignez la compétition !</h3>
          <p className="text-blue-100 mb-6">
            Défiez-vous et montez dans le classement. Chaque quiz compte pour votre progression.
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-all flex items-center gap-2 mx-auto">
            <Zap className="h-5 w-5" />
            Commencer un Quiz Maintenant
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;