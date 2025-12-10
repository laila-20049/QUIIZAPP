import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Users,
  FileText,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Filter,
  Search,
  Download,
  MoreVertical,
  Plus,
  Edit,
  Trash2,
  Eye,
  Shield,
  Settings,
  Bell,
  UserCheck,
  BookOpen,
  Award,
  Calendar,
  ChevronRight,
  RefreshCw,
  Activity
} from 'lucide-react';
import { useDatabase } from '../../hooks/useDatabase';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorBoundary from '../../components/common/ErrorBoundary';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { getAnalytics, getQuizzes, loading, error } = useDatabase();
  
  const [analytics, setAnalytics] = useState(null);
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('week');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [notificationCount, setNotificationCount] = useState(3);

  // Charger les données
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [analyticsData, quizzesData] = await Promise.all([
          getAnalytics(timeRange),
          getQuizzes({ 
            sortBy: 'newest', 
            limit: 5,
            isPublished: true 
          })
        ]);
        
        setAnalytics(analyticsData);
        setRecentQuizzes(quizzesData);
        
        // Données utilisateurs simulées
        setRecentUsers([
          {
            id: 1,
            name: 'Ahmed Alaoui',
            email: 'admin@quiz.ma',
            role: 'Admin',
            status: 'active',
            joinDate: '2024-01-15',
            quizzesCompleted: 12,
            avatar: null
          },
          {
            id: 2,
            name: 'Fatima Zahra',
            email: 'fatima@um5.ac.ma',
            role: 'Student',
            status: 'active',
            joinDate: '2024-01-10',
            quizzesCompleted: 8,
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
          },
          {
            id: 3,
            name: 'Dr. Mohammed Berrada',
            email: 'm.berrada@uh2.ac.ma',
            role: 'Professor',
            status: 'active',
            joinDate: '2024-01-05',
            quizzesCompleted: 5,
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
          },
          {
            id: 4,
            name: 'Karim Alami',
            email: 'karim@uca.ac.ma',
            role: 'Student',
            status: 'inactive',
            joinDate: '2024-01-12',
            quizzesCompleted: 3,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
          }
        ]);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    };

    loadDashboardData();
  }, [getAnalytics, getQuizzes, timeRange]);

  // Statistiques principales
  const stats = [
    {
      title: 'Utilisateurs Total',
      value: analytics?.totalUsers || 0,
      change: '+12%',
      icon: Users,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Quizzes Actifs',
      value: analytics?.totalQuizzes || 0,
      change: '+5%',
      icon: FileText,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Tentatives Récentes',
      value: analytics?.recentAttempts || 0,
      change: '+18%',
      icon: TrendingUp,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Score Moyen',
      value: analytics?.avgScore ? `${Math.round(analytics.avgScore)}%` : '0%',
      change: '+3%',
      icon: BarChart3,
      color: 'bg-amber-500',
      textColor: 'text-amber-600',
      bgColor: 'bg-amber-50'
    }
  ];

  // Actions rapides
  const quickActions = [
    {
      title: 'Créer un Quiz',
      description: 'Créez un nouveau quiz avec éditeur avancé',
      icon: Plus,
      color: 'bg-indigo-500',
      path: '/admin/quiz/create'
    },
    {
      title: 'Gérer les Utilisateurs',
      description: 'Voir et gérer tous les utilisateurs',
      icon: Users,
      color: 'bg-blue-500',
      path: '/admin/users'
    },
    {
      title: 'Analytiques Avancées',
      description: 'Rapports détaillés et statistiques',
      icon: BarChart3,
      color: 'bg-green-500',
      path: '/admin/analytics'
    },
    {
      title: 'Paramètres Système',
      description: 'Configurer les paramètres de la plateforme',
      icon: Settings,
      color: 'bg-gray-500',
      path: '/admin/settings'
    }
  ];

  // Activités récentes
  const recentActivities = [
    {
      id: 1,
      user: 'Fatima Zahra',
      action: 'a terminé un quiz',
      target: 'Introduction à Python',
      time: 'Il y a 5 minutes',
      type: 'quiz_completed',
      icon: CheckCircle,
      color: 'text-green-500'
    },
    {
      id: 2,
      user: 'Dr. Mohammed Berrada',
      action: 'a créé un quiz',
      target: 'Machine Learning Avancé',
      time: 'Il y a 1 heure',
      type: 'quiz_created',
      icon: Plus,
      color: 'text-blue-500'
    },
    {
      id: 3,
      user: 'Ahmed Alaoui',
      action: 'a approuvé un quiz',
      target: 'Algèbre Linéaire',
      time: 'Il y a 2 heures',
      type: 'quiz_approved',
      icon: Shield,
      color: 'text-purple-500'
    },
    {
      id: 4,
      user: 'Nouvel utilisateur',
      action: 's\'est inscrit',
      target: '',
      time: 'Il y a 3 heures',
      type: 'user_registered',
      icon: UserCheck,
      color: 'text-amber-500'
    }
  ];

  const handleDeleteQuiz = (quizId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce quiz ?')) {
      console.log('Deleting quiz:', quizId);
      // Implémenter la logique de suppression
    }
  };

  const handleExportData = () => {
    // Implémenter l'export des données
    console.log('Exporting data...');
  };

  const handleRefreshData = async () => {
    try {
      const [analyticsData, quizzesData] = await Promise.all([
        getAnalytics(timeRange),
        getQuizzes({ sortBy: 'newest', limit: 5 })
      ]);
      setAnalytics(analyticsData);
      setRecentQuizzes(quizzesData);
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };

  if (loading && !analytics) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" label="Chargement du tableau de bord..." />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Tableau de Bord Administrateur</h1>
                <p className="text-gray-600 text-sm mt-1">
                  Gérez votre plateforme QuizMaster
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                    <Bell className="h-6 w-6" />
                    {notificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {notificationCount}
                      </span>
                    )}
                  </button>
                </div>
                
                <button
                  onClick={handleRefreshData}
                  className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={loading}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Actualiser
                </button>
                
                <button
                  onClick={handleExportData}
                  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Exporter
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 border-b">
              {['overview', 'quizzes', 'users', 'analytics', 'settings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                    activeTab === tab
                      ? 'bg-white border-t border-l border-r text-indigo-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {tab === 'overview' && 'Vue d\'ensemble'}
                  {tab === 'quizzes' && 'Quizzes'}
                  {tab === 'users' && 'Utilisateurs'}
                  {tab === 'analytics' && 'Analytiques'}
                  {tab === 'settings' && 'Paramètres'}
                </button>
              ))}
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filtres */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-64"
                  />
                </div>
                
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="day">Aujourd'hui</option>
                  <option value="week">Cette semaine</option>
                  <option value="month">Ce mois</option>
                  <option value="year">Cette année</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">
                  {analytics?.totalUsers || 0} utilisateurs actifs
                </span>
                <div className="h-6 w-px bg-gray-300"></div>
                <span className="text-sm text-gray-600">
                  {analytics?.totalAttempts || 0} tentatives totales
                </span>
              </div>
            </div>
          </div>

          {/* Statistiques principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`h-6 w-6 ${stat.textColor}`} />
                    </div>
                    <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                </div>
              );
            })}
          </div>

          {/* Actions rapides et Activités récentes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Actions rapides */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Actions Rapides</h2>
                  <Activity className="h-5 w-5 text-gray-400" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <Link
                        key={index}
                        to={action.path}
                        className="group flex items-start p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-all"
                      >
                        <div className={`p-3 rounded-lg ${action.color} mr-4 group-hover:scale-110 transition-transform`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 group-hover:text-indigo-600">
                            {action.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 ml-auto group-hover:text-indigo-600" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Activités récentes */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border p-6 h-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Activités Récentes</h2>
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                  {recentActivities.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div key={activity.id} className="flex items-start">
                        <div className={`p-2 rounded-full ${activity.color.replace('text', 'bg')} bg-opacity-10 mr-3`}>
                          <Icon className={`h-4 w-4 ${activity.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">
                            <span className="font-medium">{activity.user}</span>{' '}
                            {activity.action}{' '}
                            {activity.target && (
                              <span className="font-medium">{activity.target}</span>
                            )}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Quizzes récents et Utilisateurs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quizzes récents */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="px-6 py-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Quizzes Récents</h2>
                <Link 
                  to="/admin/quizzes"
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Voir tous →
                </Link>
              </div>
              <div className="divide-y">
                {recentQuizzes.map((quiz) => (
                  <div key={quiz.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{quiz.title}</h3>
                        <div className="flex items-center mt-1 space-x-2">
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                            {quiz.difficulty}
                          </span>
                          <span className="text-xs text-gray-500">
                            {quiz.questionsCount} questions
                          </span>
                          <span className="text-xs text-gray-500">
                            {quiz.attempts} tentatives
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => navigate(`/quiz/${quiz.id}`)}
                          className="p-2 text-gray-400 hover:text-gray-600"
                          title="Voir"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => navigate(`/admin/quiz/edit/${quiz.id}`)}
                          className="p-2 text-gray-400 hover:text-blue-600"
                          title="Modifier"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteQuiz(quiz.id)}
                          className="p-2 text-gray-400 hover:text-red-600"
                          title="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Utilisateurs récents */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="px-6 py-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Utilisateurs Récents</h2>
                <Link 
                  to="/admin/users"
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Voir tous →
                </Link>
              </div>
              <div className="divide-y">
                {recentUsers.map((user) => (
                  <div key={user.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="h-10 w-10 rounded-full mr-3"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                            <span className="text-gray-600 font-medium">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div>
                          <h3 className="font-medium text-gray-900">{user.name}</h3>
                          <div className="flex items-center mt-1 space-x-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              user.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {user.status === 'active' ? 'Actif' : 'Inactif'}
                            </span>
                            <span className="text-xs text-gray-500">{user.role}</span>
                            <span className="text-xs text-gray-500">
                              {user.quizzesCompleted} quizzes
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => navigate(`/admin/users/${user.id}`)}
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                      >
                        Voir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Statistiques avancées */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sujets populaires */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Sujets Populaires</h2>
                <TrendingUp className="h-5 w-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {analytics?.popularSubjects?.slice(0, 5).map((subject, index) => (
                  <div key={subject.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-3 text-2xl">{subject.icon}</div>
                      <div>
                        <h3 className="font-medium text-gray-900">{subject.name}</h3>
                        <p className="text-sm text-gray-600">{subject.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">{subject.quizCount} quizzes</div>
                      <div className="text-xs text-gray-500">{subject.popularity}% popularité</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance générale */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Performance Générale</h2>
                <BarChart3 className="h-5 w-5 text-gray-400" />
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Taux de réussite</span>
                    <span className="font-medium">68%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full" 
                      style={{ width: '68%' }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Engagement utilisateur</span>
                    <span className="font-medium">82%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full" 
                      style={{ width: '82%' }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Quiz complétés</span>
                    <span className="font-medium">1,250</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-500 rounded-full" 
                      style={{ width: '75%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-600">
                © {new Date().getFullYear()} QuizMaster. Tous droits réservés.
              </div>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <Link to="/admin/help" className="text-sm text-gray-600 hover:text-gray-900">
                  Aide
                </Link>
                <Link to="/admin/docs" className="text-sm text-gray-600 hover:text-gray-900">
                  Documentation
                </Link>
                <Link to="/admin/support" className="text-sm text-gray-600 hover:text-gray-900">
                  Support
                </Link>
                <span className="text-sm px-3 py-1 bg-green-100 text-green-800 rounded-full">
                  Système actif
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
};

export default AdminDashboard;