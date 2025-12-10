import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';
import { 
  User,
  Edit,
  Settings,
  LogOut,
  Trophy,
  BookOpen,
  Clock,
  TrendingUp,
  Star,
  Award,
  Target,
  BarChart3,
  Calendar,
  Shield,
  Bell,
  Mail,
  MapPin,
  GraduationCap,
  Bookmark,
  Users,
  Crown,
  Zap,
  ChevronRight,
  CheckCircle2,
  XCircle,
  PieChart,
  RefreshCw,
  Download,
  TrendingDown,
  Activity,
  Target as TargetIcon,
  ChevronLeft,
  ShieldCheck,
  Eye,
  EyeOff,
  Heart,
  Coffee,
  Brain,
  Calculator,
  Code,
  FlaskRound,
  Scale,
  Languages
} from 'lucide-react';

const Profile = () => {
  const { user, logout, updateProfile, isLoading: authLoading } = useAuth();
  const { userAttempts, statistics, getUserProgress } = useQuiz();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [badges, setBadges] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  // Formate la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Données de démonstration
  const demoProgress = {
    totalScore: 5420,
    quizzesCompleted: 28,
    averageScore: 78,
    totalTimeSpent: 2540,
    currentStreak: 7,
    bestScore: 96,
    rank: 15,
    totalRank: 12470,
    level: "Advanced",
    xp: 4250,
    nextLevelXP: 5000,
    subjects: [
      { name: "Mathématiques", score: 85, quizzes: 8, icon: Calculator },
      { name: "Physique", score: 78, quizzes: 6, icon: TargetIcon },
      { name: "Informatique", score: 92, quizzes: 10, icon: Code },
      { name: "Biologie", score: 74, quizzes: 4, icon: FlaskRound },
      { name: "Droit", score: 68, quizzes: 3, icon: Scale },
      { name: "Langues", score: 82, quizzes: 5, icon: Languages }
    ],
    weeklyProgress: [
      { day: 'Lun', score: 78 },
      { day: 'Mar', score: 82 },
      { day: 'Mer', score: 85 },
      { day: 'Jeu', score: 92 },
      { day: 'Ven', score: 76 },
      { day: 'Sam', score: 88 },
      { day: 'Dim', score: 91 }
    ]
  };

  const demoBadges = [
    { id: 1, name: "Débutant", icon: Trophy, color: "from-yellow-500 to-amber-500", earned: true, date: "2024-01-15", description: "Premier quiz complété" },
    { id: 2, name: "Quiz Master", icon: Crown, color: "from-purple-500 to-purple-600", earned: true, date: "2024-01-20", description: "10 quiz complétés" },
    { id: 3, name: "Streak King", icon: Zap, color: "from-orange-500 to-red-500", earned: true, date: "2024-02-01", description: "7 jours consécutifs" },
    { id: 4, name: "Perfection", icon: Star, color: "from-blue-500 to-cyan-500", earned: false, description: "Score 100% sur un quiz" },
    { id: 5, name: "Vitesse", icon: TrendingUp, color: "from-green-500 to-emerald-500", earned: false, description: "Quiz terminé en 5min" },
    { id: 6, name: "Expert", icon: Award, color: "from-red-500 to-pink-500", earned: false, description: "3 quiz dans une matière" }
  ];

  const demoActivity = [
    { id: 1, type: "quiz_completed", title: "Algèbre Linéaire", score: 92, date: "2024-02-15T14:30:00Z" },
    { id: 2, type: "badge_earned", title: "Quiz Master", badge: "Master", date: "2024-02-14T10:15:00Z" },
    { id: 3, type: "quiz_completed", title: "Programmation Python", score: 85, date: "2024-02-13T16:45:00Z" },
    { id: 4, type: "rank_up", title: "Niveau Advanced", newLevel: "Advanced", date: "2024-02-12T09:20:00Z" },
    { id: 5, type: "streak_milestone", title: "7 jours consécutifs", days: 7, date: "2024-02-11T18:30:00Z" },
    { id: 6, type: "quiz_completed", title: "Mécanique Quantique", score: 79, date: "2024-02-10T11:45:00Z" }
  ];

  useEffect(() => {
    const loadProfileData = async () => {
      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setProgress(demoProgress);
      setBadges(demoBadges.filter(b => b.earned));
      setRecentActivity(demoActivity);
      setEditForm({
        firstName: user?.firstName || 'Ahmed',
        lastName: user?.lastName || 'Alami',
        email: user?.email || 'ahmed.alami@um5.ac.ma',
        university: user?.university || 'Université Mohammed V Rabat',
        faculty: user?.faculty || 'Faculté des Sciences',
        level: user?.level || 'S4',
        phone: '+212 6 12 34 56 78',
        bio: "Étudiant passionné par les sciences et technologies. J'aime relever des défis et améliorer mes compétences."
      });
      
      setLoading(false);
    };

    loadProfileData();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSaveProfile = async () => {
    try {
      await updateProfile(editForm);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      university: user?.university || '',
      faculty: user?.faculty || '',
      level: user?.level || '',
      bio: "Étudiant passionné par l'apprentissage et les quiz académiques."
    });
  };

  const tabs = [
    { id: 'overview', name: 'Vue d\'ensemble', icon: User },
    { id: 'stats', name: 'Statistiques', icon: BarChart3 },
    { id: 'activity', name: 'Activité', icon: Activity },
    { id: 'badges', name: 'Badges', icon: Trophy },
    { id: 'settings', name: 'Paramètres', icon: Settings }
  ];

  const StatCard = ({ icon: Icon, value, label, change, color = 'bg-gradient-to-r from-blue-500 to-blue-600' }) => (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${color} shadow-md`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        {change && (
          <span className={`text-xs px-2 py-1 rounded-full ${change > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {change > 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );

  const SubjectCard = ({ subject }) => {
    const Icon = subject.icon;
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Icon className="h-5 w-5 text-blue-600" />
            </div>
            <span className="font-medium text-gray-900">{subject.name}</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">{subject.score}%</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Progression</span>
            <span>{subject.quizzes} quiz</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${subject.score}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  const BadgeCard = ({ badge }) => {
    const Icon = badge.icon;
    return (
      <div className={`relative ${badge.earned ? '' : 'opacity-50'}`}>
        <div className={`w-full aspect-square rounded-2xl bg-gradient-to-br ${badge.color} flex items-center justify-center shadow-lg`}>
          <Icon className="h-10 w-10 text-white" />
        </div>
        <div className="mt-4 space-y-1">
          <div className="text-sm font-semibold text-gray-900 text-center">{badge.name}</div>
          <div className="text-xs text-gray-500 text-center">{badge.description}</div>
          {badge.earned && (
            <div className="flex items-center justify-center gap-1 text-xs text-green-600 mt-2">
              <CheckCircle2 className="h-3 w-3" />
              Obtenu le {formatDate(badge.date)}
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            {/* Header skeleton */}
            <div className="h-10 bg-gray-200 rounded w-1/4"></div>
            
            {/* Profile card skeleton */}
            <div className="bg-white rounded-2xl p-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
            
            {/* Stats skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 group"
            >
              <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              Retour
            </button>
            <h1 className="text-4xl font-bold text-gray-900">
              Mon <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Profil</span>
            </h1>
            <p className="text-gray-600 mt-2">Suivez votre progression et gérez votre compte</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Link 
              to="/quizzes" 
              className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              Nouveau Quiz
            </Link>
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Déconnexion
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-500">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              <div className="relative px-6 pb-6">
                <div className="absolute -top-16 left-6">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full border-4 border-white bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                      {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                    </div>
                    {user?.isPro && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white p-2 rounded-full shadow-lg">
                        <Crown className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-20 text-center">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">@{user?.email?.split('@')[0]}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm">
                      <GraduationCap className="h-4 w-4 text-blue-500" />
                      <span className="text-gray-700">{user?.university || "Non spécifiée"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">{user?.faculty || "Non spécifiée"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Target className="h-4 w-4 text-purple-500" />
                      <span className="text-gray-700">Niveau {user?.level || "Non spécifié"}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full py-2.5 border-2 border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Modifier le profil
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 shadow-sm'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.name}</span>
                      {activeTab === tab.id && (
                        <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                En bref
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">Quiz ce mois</span>
                  <span className="text-sm font-semibold text-blue-900">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">Streak actuel</span>
                  <span className="text-sm font-semibold text-blue-900">{progress?.currentStreak} jours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">Prochain objectif</span>
                  <span className="text-sm font-semibold text-blue-900">Top 10</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Editing Form */}
                {isEditing ? (
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Modifier le profil</h3>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                        <input
                          type="text"
                          value={editForm.firstName}
                          onChange={(e) => setEditForm({...editForm, firstName: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                        <input
                          type="text"
                          value={editForm.lastName}
                          onChange={(e) => setEditForm({...editForm, lastName: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                        <input
                          type="tel"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Niveau</label>
                        <select
                          value={editForm.level}
                          onChange={(e) => setEditForm({...editForm, level: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                        >
                          {['S1', 'S2', 'S3', 'S4', 'S5', 'S6'].map(level => (
                            <option key={level} value={level}>Semestre {level}</option>
                          ))}
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                        <textarea
                          value={editForm.bio}
                          onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                          rows="3"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={handleCancelEdit}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
                      >
                        Annuler
                      </button>
                      <button
                        onClick={handleSaveProfile}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all"
                      >
                        Sauvegarder
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Stats Grid */
                  <>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                      <StatCard 
                        icon={Trophy}
                        value={progress?.totalScore.toLocaleString()}
                        label="Score total"
                        change={12}
                        color="bg-gradient-to-r from-yellow-500 to-amber-500"
                      />
                      <StatCard 
                        icon={BookOpen}
                        value={progress?.quizzesCompleted}
                        label="Quiz complétés"
                        change={8}
                        color="bg-gradient-to-r from-blue-500 to-blue-600"
                      />
                      <StatCard 
                        icon={Star}
                        value={`${progress?.averageScore}%`}
                        label="Score moyen"
                        change={5}
                        color="bg-gradient-to-r from-green-500 to-emerald-500"
                      />
                      <StatCard 
                        icon={Target}
                        value={`#${progress?.rank}`}
                        label="Classement"
                        change={3}
                        color="bg-gradient-to-r from-purple-500 to-purple-600"
                      />
                    </div>

                    {/* Subjects Performance */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Performance par matière</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {progress?.subjects?.map((subject, index) => (
                          <SubjectCard key={index} subject={subject} />
                        ))}
                      </div>
                    </div>

                    {/* Weekly Progress */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-gray-900">Progression hebdomadaire</h3>
                        <span className="text-sm text-gray-500">Cette semaine</span>
                      </div>
                      <div className="h-48 flex items-end justify-between gap-4">
                        {progress?.weeklyProgress?.map((day, index) => (
                          <div key={index} className="flex flex-col items-center flex-1">
                            <div 
                              className="w-full bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-lg transition-all duration-500 hover:from-blue-600 hover:to-blue-700"
                              style={{ height: `${day.score}%` }}
                              title={`${day.score}%`}
                            ></div>
                            <span className="text-sm text-gray-600 mt-2">{day.day}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="space-y-8">
                {/* Detailed Stats */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8">Statistiques détaillées</h3>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="space-y-4 p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Clock className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900">{Math.floor(progress?.totalTimeSpent / 60)}h</div>
                          <div className="text-sm text-gray-600">Temps d'étude</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4 p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <TrendingUp className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900">{progress?.bestScore}%</div>
                          <div className="text-sm text-gray-600">Meilleur score</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4 p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Zap className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900">{progress?.currentStreak}</div>
                          <div className="text-sm text-gray-600">Jours consécutifs</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4 p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                          <Brain className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900">{progress?.xp}/{progress?.nextLevelXP}</div>
                          <div className="text-sm text-gray-600">XP vers le niveau</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Performance</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Taux de réussite</span>
                          <span className="font-semibold text-gray-900">84%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Temps moyen / quiz</span>
                          <span className="font-semibold text-gray-900">12 min</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Questions réussies</span>
                          <span className="font-semibold text-gray-900">856</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Classement</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Position globale</span>
                          <span className="font-semibold text-gray-900">#{progress?.rank}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Top dans ta faculté</span>
                          <span className="font-semibold text-gray-900">#3</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Évolution 30j</span>
                          <span className="font-semibold text-green-600">+8 places</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="space-y-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8">Activité récente</h3>
                  
                  <div className="space-y-6">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                          activity.type === 'quiz_completed' ? 'bg-green-100 text-green-600' :
                          activity.type === 'badge_earned' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {activity.type === 'quiz_completed' && <Trophy className="h-6 w-6" />}
                          {activity.type === 'badge_earned' && <Award className="h-6 w-6" />}
                          {activity.type === 'rank_up' && <TrendingUp className="h-6 w-6" />}
                          {activity.type === 'streak_milestone' && <Zap className="h-6 w-6" />}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
                            <div className="font-semibold text-gray-900">{activity.title}</div>
                            {activity.score && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                Score: {activity.score}%
                              </span>
                            )}
                            {activity.newLevel && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                                {activity.newLevel}
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600 mt-2">
                            {formatDate(activity.date)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'badges' && (
              <div className="space-y-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Badges et réalisations</h3>
                      <p className="text-gray-600 mt-2">
                        {badges.length} sur {demoBadges.length} badges débloqués
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                          style={{ width: `${(badges.length / demoBadges.length) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {Math.round((badges.length / demoBadges.length) * 100)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {demoBadges.map(badge => (
                      <BadgeCard key={badge.id} badge={badge} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8">Paramètres du compte</h3>
                  
                  <div className="space-y-8">
                    {/* Notifications */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Bell className="h-5 w-5" />
                        Notifications
                      </h4>
                      <div className="space-y-3 bg-gray-50 p-6 rounded-xl">
                        {[
                          { label: 'Quiz recommandés', description: 'Recevoir des suggestions de quiz' },
                          { label: 'Progression', description: 'Mises à jour de votre progression' },
                          { label: 'Badges', description: 'Nouveaux badges débloqués' },
                          { label: 'Classement', description: 'Évolution de votre classement' }
                        ].map((item, index) => (
                          <label key={index} className="flex items-center justify-between p-3 hover:bg-white rounded-lg cursor-pointer">
                            <div>
                              <div className="font-medium text-gray-900">{item.label}</div>
                              <div className="text-sm text-gray-600">{item.description}</div>
                            </div>
                            <input type="checkbox" defaultChecked className="h-5 w-5 text-blue-600 rounded" />
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Security */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5" />
                        Sécurité
                      </h4>
                      <div className="space-y-4">
                        <div className="p-4 border border-gray-200 rounded-xl">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe actuel</label>
                          <div className="relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                              defaultValue="••••••••"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                        <button className="w-full py-3 border-2 border-blue-500 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-medium">
                          Changer le mot de passe
                        </button>
                      </div>
                    </div>

                    {/* Data Management */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Gestion des données</h4>
                      <div className="space-y-3">
                        <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                          <div className="flex items-center gap-3">
                            <Download className="h-5 w-5 text-blue-500" />
                            <div>
                              <div className="font-medium text-gray-900">Exporter mes données</div>
                              <div className="text-sm text-gray-600">Télécharger l'historique complet</div>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </button>
                        
                        <button className="w-full flex items-center justify-between p-4 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-colors">
                          <div className="flex items-center gap-3">
                            <XCircle className="h-5 w-5" />
                            <div>
                              <div className="font-medium">Supprimer mon compte</div>
                              <div className="text-sm">Cette action est irréversible</div>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;