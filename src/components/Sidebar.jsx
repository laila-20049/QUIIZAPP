import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  BookOpen,
  GraduationCap,
  ClipboardList,
  BarChart3,
  Trophy,
  CreditCard,
  Settings,
  HelpCircle,
  User,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'Accueil', icon: Home, path: '/', color: 'from-blue-500 to-blue-600' },
    { name: 'Matières', icon: BookOpen, path: '/matieres', color: 'from-purple-500 to-purple-600' },
    { name: 'Niveaux', icon: GraduationCap, path: '/niveaux', color: 'from-pink-500 to-pink-600' },
    { name: 'Mes Quiz', icon: ClipboardList, path: '/mes-quiz', color: 'from-green-500 to-green-600' },
    { name: 'Résultats', icon: BarChart3, path: '/resultats', color: 'from-orange-500 to-orange-600' },
    { name: 'Classement', icon: Trophy, path: '/classement', color: 'from-yellow-500 to-yellow-600' },
    { name: 'Abonnement', icon: CreditCard, path: '/subscription', color: 'from-indigo-500 to-indigo-600' },
  ];

  const bottomItems = [
    { name: 'Paramètres', icon: Settings, path: '/settings', color: 'from-gray-500 to-gray-600' },
    { name: 'Aide', icon: HelpCircle, path: '/help', color: 'from-cyan-500 to-cyan-600' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleNavClick = () => {
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  const NavItem = ({ item, collapsed, onNavigate }) => (
    <NavLink
      to={item.path}
      onClick={onNavigate}
      className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
        isActive(item.path)
          ? `bg-gradient-to-r ${item.color} text-white shadow-lg scale-105`
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      {/* Icône */}
      <div className={`flex items-center justify-center transition-transform duration-300 ${
        isActive(item.path) ? 'scale-110' : 'group-hover:scale-110'
      }`}>
        <item.icon size={22} strokeWidth={isActive(item.path) ? 2.5 : 2} />
      </div>

      {/* Texte */}
      {!collapsed && (
        <span className="font-medium text-sm whitespace-nowrap">
          {item.name}
        </span>
      )}

      {/* Tooltip sur mobile/collapsed */}
      {collapsed && (
        <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          {item.name}
        </div>
      )}
    </NavLink>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-40 md:hidden bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2 rounded-lg hover:shadow-lg transition-all"
      >
        {isMobileOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Principal */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-40 lg:z-30 ${
          isCollapsed ? 'w-20' : 'w-[260px]'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {/* Header avec Logo/Brand */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                Q
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                QUIIZ
              </span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors hidden lg:block"
            title={isCollapsed ? 'Expand' : 'Collapse'}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Profil Utilisateur */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className={`flex items-center gap-3 ${isCollapsed ? 'flex-col' : ''}`}>
            {/* Avatar */}
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-md flex-shrink-0">
              <User size={24} />
            </div>

            {/* Infos */}
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                  Ahmed El Bounou
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  FS – S2
                </p>
              </div>
            )}
          </div>

          {/* Bouton Profil */}
          {!isCollapsed && (
            <button className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 text-blue-600 dark:text-blue-400 rounded-lg font-medium text-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2">
              <User size={16} />
              Mon profil
            </button>
          )}
        </div>

        {/* Menu Principal */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-2">
          {menuItems.map((item) => (
            <NavItem key={item.path} item={item} collapsed={isCollapsed} onNavigate={handleNavClick} />
          ))}
        </nav>

        {/* Divider */}
        <div className="mx-3 my-2 border-t border-gray-200 dark:border-gray-700" />

        {/* Menu Bas */}
        <nav className="px-3 py-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
          {bottomItems.map((item) => (
            <NavItem key={item.path} item={item} collapsed={isCollapsed} onNavigate={handleNavClick} />
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
          <button
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 font-medium ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <LogOut size={20} />
            {!isCollapsed && <span className="text-sm">Déconnexion</span>}
          </button>
        </div>

        {/* Footer Info */}
        {!isCollapsed && (
          <div className="px-4 py-3 text-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
            <p className="mb-1">QUIIZAPP v2.0</p>
            <p className="text-gray-400">© 2024</p>
          </div>
        )}
      </aside>

      {/* Spacer pour contenu principal (desktop) */}
      <div className={`hidden md:block transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-[260px]'}`} />
    </>
  );
};

export default Sidebar;
