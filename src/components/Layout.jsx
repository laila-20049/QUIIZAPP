import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Home,
  BookOpen,
  Trophy,
  User,
  LogOut,
  Menu,
  X,
  Bell,
  Settings,
  BarChart3,
  PlusCircle,
  Users,
  Search,
  Moon,
  Sun,
  ChevronDown,
  HelpCircle,
  Bookmark,
  TrendingUp,
  Zap,
  Shield,
  GraduationCap
} from 'lucide-react';

const Layout = ({ children, showAdminSidebar = false }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const navigation = [
    { name: 'Accueil', href: '/', icon: Home, badge: null },
    { name: 'Quiz', href: '/quizzes', icon: BookOpen, badge: '12' },
    { name: 'Classement', href: '/leaderboard', icon: Trophy, badge: null },
  ];

  const userNavigation = [
    { name: 'Mon Profil', href: '/profile', icon: User },
    { name: 'Mes Quiz', href: '/my-quizzes', icon: BookOpen },
    { name: 'Enregistrés', href: '/saved', icon: Bookmark },
    { name: 'Mes Résultats', href: '/results', icon: BarChart3 },
    ...(user?.role === 'admin' ? [
      { name: 'Administration', href: '/admin', icon: Settings },
      { name: 'Créer un Quiz', href: '/admin/quiz/create', icon: PlusCircle },
    ] : []),
    { name: 'Aide & Support', href: '/help', icon: HelpCircle },
  ];

  const adminNavigation = [
    { name: 'Tableau de Bord', href: '/admin', icon: Home },
    { name: 'Gestion des Quiz', href: '/admin/quizzes', icon: BookOpen },
    { name: 'Créer un Quiz', href: '/admin/quiz/create', icon: PlusCircle },
    { name: 'Utilisateurs', href: '/admin/users', icon: Users },
    { name: 'Statistiques', href: '/admin/stats', icon: BarChart3 },
    { name: 'Rapports', href: '/admin/reports', icon: TrendingUp },
    { name: 'Paramètres', href: '/admin/settings', icon: Settings },
  ];

  const notifications = [
    { id: 1, title: 'Nouveau quiz disponible', description: 'Testez vos connaissances en physique', time: '2 min', unread: true },
    { id: 2, title: 'Votre score a été battu', description: 'Marie a pris votre place au classement', time: '1h', unread: true },
    { id: 3, title: 'Quiz terminé avec succès', description: 'Vous avez terminé "Mathématiques Avancées"', time: '2h', unread: false },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
    setUserMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  const NavItem = ({ item, isMobile = false }) => (
    <Link
      to={item.href}
      onClick={() => isMobile && setMobileMenuOpen(false)}
      className={`group flex items-center ${
        isMobile ? 'px-3 py-3 text-base' : 'px-3 py-2.5 text-sm'
      } font-medium rounded-lg transition-all duration-200 ${
        isActive(item.href)
          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
      }`}
    >
      <item.icon className={`${isMobile ? 'mr-4 h-6 w-6' : 'mr-3 h-5 w-5'} ${
        isActive(item.href) ? 'text-white' : 'text-gray-500 group-hover:text-gray-700 dark:text-gray-400'
      }`} />
      <span className="flex-1">{item.name}</span>
      {item.badge && (
        <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full">
          {item.badge}
        </span>
      )}
    </Link>
  );

  const MobileMenu = () => (
    <>
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 transition-opacity duration-200">
          <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative flex flex-col w-full max-w-xs bg-white dark:bg-gray-900 shadow-2xl transition-transform duration-300 ease-out">
            <div className="flex items-center justify-between p-6 border-b dark:border-gray-800">
              <Link to="/" className="flex items-center group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-lg opacity-70 group-hover:opacity-100 transition-opacity" />
                  <GraduationCap className="relative h-8 w-8 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  QuizMaster
                </span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto">
              <nav className="space-y-1">
                {navigation.map((item) => (
                  <NavItem key={item.name} item={item} isMobile />
                ))}
              </nav>
              
              {isAuthenticated && (
                <>
                  <div className="mt-8 mb-4 px-3">
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Mon Espace
                    </div>
                  </div>
                  <nav className="space-y-1">
                    {userNavigation.map((item) => (
                      <NavItem key={item.name} item={item} isMobile />
                    ))}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-3 py-3 text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors group"
                    >
                      <LogOut className="mr-4 h-6 w-6 group-hover:scale-110 transition-transform" />
                      Déconnexion
                    </button>
                  </nav>
                </>
              )}
              
              {!isAuthenticated && (
                <div className="mt-8 space-y-3">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-center font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-center font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg hover:shadow-lg transition-all"
                  >
                    S'inscrire Gratuitement
                  </Link>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t dark:border-gray-800">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                {darkMode ? (
                  <>
                    <Sun className="h-5 w-5 mr-2" />
                    Mode Clair
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5 mr-2" />
                    Mode Sombre
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  const Sidebar = () => {
    const navItems = showAdminSidebar ? adminNavigation : navigation;
    
    return (
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-r border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b dark:border-gray-800">
            <Link to={showAdminSidebar ? "/admin" : "/"} className="flex items-center group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-lg opacity-70 group-hover:opacity-100 transition-opacity" />
                {showAdminSidebar ? (
                  <Shield className="relative h-8 w-8 text-white" />
                ) : (
                  <GraduationCap className="relative h-8 w-8 text-white" />
                )}
              </div>
              <div className="ml-3">
                <div className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {showAdminSidebar ? 'Admin Panel' : 'QuizMaster'}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {showAdminSidebar ? 'Administration' : 'Apprentissage Interactif'}
                </div>
              </div>
            </Link>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <NavItem key={item.name} item={item} />
              ))}
            </nav>
            
            {isAuthenticated && !showAdminSidebar && (
              <>
                <div className="mt-8 mb-4 px-3">
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Mon Espace
                  </div>
                </div>
                <nav className="space-y-2">
                  {userNavigation.map((item) => (
                    <NavItem key={item.name} item={item} />
                  ))}
                </nav>
              </>
            )}
          </div>
          
          {showAdminSidebar ? (
            <div className="p-4 border-t dark:border-gray-800">
              <Link
                to="/"
                className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors group"
              >
                <Home className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                Retour au Site
              </Link>
            </div>
          ) : (
            <div className="p-4 border-t dark:border-gray-800">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors group"
                >
                  <LogOut className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Déconnexion
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block px-4 py-3 text-center font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg hover:shadow-lg transition-all"
                >
                  Commencer Maintenant
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <MobileMenu />
      <Sidebar />
      
      {/* Main Content */}
      <div className={showAdminSidebar ? "lg:pl-64" : "lg:pl-64"}>
        {/* Top Navigation */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Menu className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                </button>
                
                {!showAdminSidebar && (
                  <div className="ml-4 flex-1 max-w-xl">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Rechercher un quiz, une matière..."
                        className="w-full pl-10 pr-10 py-2.5 bg-gray-100 dark:bg-gray-800 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? (
                    <Sun className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  )}
                </button>
                
                {isAuthenticated ? (
                  <>
                    <div className="relative">
                      <button
                        onClick={() => setNotificationMenuOpen(!notificationMenuOpen)}
                        className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label="Notifications"
                      >
                        <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        {notifications.filter(n => n.unread).length > 0 && (
                          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                        )}
                      </button>
                      
                      {notificationMenuOpen && (
                        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border dark:border-gray-800 z-50 transition-all duration-200 ease-out opacity-100 scale-100">
                            <div className="p-4 border-b dark:border-gray-800">
                              <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                                <span className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full">
                                  {notifications.filter(n => n.unread).length} non lues
                                </span>
                              </div>
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                              {notifications.map((notification) => (
                                <div
                                  key={notification.id}
                                  className={`p-4 border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer ${
                                    notification.unread ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''
                                  }`}
                                >
                                  <div className="flex items-start">
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-medium text-gray-900 dark:text-white">
                                          {notification.title}
                                        </h4>
                                        <span className="text-xs text-gray-500">{notification.time}</span>
                                      </div>
                                      <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {notification.description}
                                      </p>
                                    </div>
                                    {notification.unread && (
                                      <div className="ml-2 h-2 w-2 bg-blue-500 rounded-full" />
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="p-4 border-t dark:border-gray-800">
                              <button className="w-full text-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
                                Voir toutes les notifications
                              </button>
                            </div>
                          </div>
                        )}
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                      >
                        <div className="relative">
                          <div className="h-9 w-9 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                            {user?.firstName?.[0]}{user?.lastName?.[0]}
                          </div>
                          {user?.role === 'admin' && (
                            <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-yellow-500 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center">
                              <Shield className="h-2 w-2 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user?.firstName} {user?.lastName}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {user?.role === 'admin' ? 'Administrateur' : 'Étudiant'}
                          </div>
                        </div>
                        <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${
                          userMenuOpen ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      {userMenuOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border dark:border-gray-800 z-50 transition-all duration-200 ease-out opacity-100 scale-100">
                            <div className="p-4 border-b dark:border-gray-800">
                              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                {user?.firstName} {user?.lastName}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {user?.email}
                              </div>
                            </div>
                            <div className="py-2">
                              {userNavigation.map((item) => (
                                <Link
                                  key={item.name}
                                  to={item.href}
                                  onClick={() => setUserMenuOpen(false)}
                                  className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
                                >
                                  <item.icon className="mr-3 h-4 w-4" />
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                            <div className="border-t dark:border-gray-800 py-2">
                              <button
                                onClick={handleLogout}
                                className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                              >
                                <LogOut className="mr-3 h-4 w-4" />
                                Déconnexion
                              </button>
                            </div>
                          </div>
                        )}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Link
                      to="/login"
                      className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      Connexion
                    </Link>
                    <Link
                      to="/register"
                      className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all"
                    >
                      S'inscrire
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1">
          <div className="py-8 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;