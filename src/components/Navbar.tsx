import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Trophy, 
  User, 
  LogOut,
  Menu,
  X,
  ChevronDown,
  Home,
  Search,
  Bell,
  Star,
  Settings,
  Bookmark
} from 'lucide-react';

type DropdownType = 'universities' | 'faculties' | 'subjects' | 'user' | null;

interface University {
  id: number;
  name: string;
}

interface Faculty {
  id: number;
  name: string;
}

interface Subject {
  id: number;
  name: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);

  // Static data
  const universities: University[] = [
    { id: 1, name: 'Université Hassan II' },
    { id: 2, name: 'Université Mohammed V' },
    { id: 3, name: 'Université Cadi Ayyad' },
    { id: 4, name: 'Université Ibn Tofail' },
    { id: 5, name: 'Université Abdelmalek Essaâdi' }
  ];

  const faculties: Faculty[] = [
    { id: 1, name: 'Faculté des Sciences (FS)' },
    { id: 2, name: 'Faculté des Sciences et Techniques (FST)' },
    { id: 3, name: 'École Supérieure de Technologie (EST)' },
    { id: 4, name: 'École Nationale des Sciences Appliquées (ENSA)' },
    { id: 5, name: 'Faculté des Sciences Économiques (FSE)' },
    { id: 6, name: 'Faculté de Droit (FD)' }
  ];

  const subjects: Subject[] = [
    { id: 1, name: 'Physique' },
    { id: 2, name: 'Mathématiques' },
    { id: 3, name: 'Sciences de la Vie' },
    { id: 4, name: 'Économie' },
    { id: 5, name: 'Droit' },
    { id: 6, name: 'Informatique' },
    { id: 7, name: 'Philosophie' },
    { id: 8, name: 'Culture Générale' }
  ];

  const navItems: NavItem[] = [
    { id: 'home', label: 'Accueil', icon: Home, href: '#home' },
    { id: 'quiz', label: 'Quiz', icon: BookOpen, href: '#quiz' },
    { id: 'ranking', label: 'Classement', icon: Trophy, href: '#ranking' },
  ];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const toggleDropdown = useCallback((dropdown: DropdownType, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveDropdown((prev) => (prev === dropdown ? null : dropdown));
  }, []);

  const closeAllDropdowns = useCallback(() => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  }, []);

  // Dropdown components
  const DropdownItem = React.memo(({ 
    href, 
    iconColor = 'bg-blue-500',
    children 
  }: { 
    href: string; 
    iconColor?: string;
    children: React.ReactNode;
  }) => (
    <a
      href={href}
      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-600 transition-all duration-200 group rounded-lg mx-2"
      onClick={closeAllDropdowns}
    >
      <div className={`h-2 w-2 rounded-full ${iconColor} mr-3 group-hover:scale-125 transition-transform flex-shrink-0 ring-2 ring-white group-hover:ring-blue-100`} />
      <span className="truncate font-medium">{children}</span>
    </a>
  ));

  const MobileDropdownSection = React.memo(({ 
    title, 
    items, 
    iconColor = 'bg-blue-400',
    hrefPrefix 
  }: { 
    title: string; 
    items: { id: number; name: string }[];
    iconColor?: string;
    hrefPrefix: string;
  }) => (
    <div className="space-y-1 pt-4">
      <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-blue-100 bg-white/10 rounded-lg mx-2">
        {title}
      </div>
      {items.slice(0, 4).map((item) => (
        <a
          key={item.id}
          href={`#${hrefPrefix}-${item.id}`}
          className="flex items-center px-6 py-3 text-white/90 hover:text-white hover:bg-white/15 rounded-lg transition-all duration-200 group"
          onClick={closeAllDropdowns}
        >
          <div className={`h-2 w-2 rounded-full ${iconColor} mr-3 flex-shrink-0 group-hover:scale-125 transition-transform`} />
          <span className="truncate font-medium">{item.name}</span>
        </a>
      ))}
    </div>
  ));

  const DesktopDropdown = ({ 
    title, 
    type, 
    items, 
    width = 'w-64',
    iconColor = 'bg-blue-500'
  }: {
    title: string;
    type: DropdownType;
    items: { id: number; name: string }[];
    width?: string;
    iconColor?: string;
  }) => (
    <div className="relative">
      <button
        onClick={(e) => toggleDropdown(type, e)}
        className={`inline-flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
          activeDropdown === type 
            ? 'bg-white/20 text-white shadow-lg' 
            : 'text-white/90 hover:text-white hover:bg-white/10 hover:shadow-md'
        }`}
      >
        <span>{title}</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${
          activeDropdown === type ? 'rotate-180 scale-110' : ''
        }`} />
      </button>
      
      {activeDropdown === type && (
        <div className={`absolute left-0 mt-2 ${width} bg-white rounded-xl shadow-2xl shadow-blue-900/30 border border-blue-100 py-2 z-50 animate-in slide-in-from-top-3 duration-200`}>
          {items.map((item) => (
            <DropdownItem 
              key={item.id} 
              href={`#${type ? type.slice(0, -1) : ''}-${item.id}`} 
              iconColor={iconColor}
            >
              {item.name}
            </DropdownItem>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <nav 
      ref={navbarRef}
      className={`sticky top-0 z-50 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 shadow-lg transition-all duration-300 ${
        isScrolled 
          ? 'shadow-blue-900/40 backdrop-blur-lg bg-opacity-95' 
          : 'shadow-blue-900/25 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo Section */}
          <div className="flex items-center space-x-3 lg:space-x-4 flex-shrink-0 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-400/20 blur-xl rounded-full group-hover:bg-emerald-400/30 transition-colors duration-300" />
              <GraduationCap className="relative h-8 w-8 lg:h-10 lg:w-10 text-emerald-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <div className="absolute -top-1 -right-1 h-4 w-4 lg:h-5 lg:w-5 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full border-2 border-blue-800 shadow-sm" />
            </div>
            <div className="text-white">
              <h1 className="text-xl lg:text-2xl font-bold tracking-tight leading-tight bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                Moroccan<span className="text-emerald-400">Quiz</span>
              </h1>
              <p className="text-xs lg:text-sm text-blue-100 font-medium tracking-wide opacity-90">
                Université App
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 flex-1 justify-center mx-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="inline-flex items-center space-x-2.5 text-white/90 hover:text-white px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 group hover:shadow-lg hover:shadow-white/5"
              >
                <item.icon className="h-5 w-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" />
                <span className="font-medium whitespace-nowrap group-hover:tracking-wide transition-all duration-200">
                  {item.label}
                </span>
              </a>
            ))}

            <DesktopDropdown 
              title="Universités" 
              type="universities" 
              items={universities} 
              width="w-72"
              iconColor="bg-blue-500"
            />

            <DesktopDropdown 
              title="Facultés" 
              type="faculties" 
              items={faculties} 
              width="w-80"
              iconColor="bg-emerald-500"
            />

            <DesktopDropdown 
              title="Matières" 
              type="subjects" 
              items={subjects} 
              width="w-72"
              iconColor="bg-purple-500"
            />
          </div>

          {/* Right Section - User Actions */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            
            {/* Search Bar */}
            <div className="hidden lg:block relative">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-300 pointer-events-none transition-colors duration-200 group-focus-within:text-white" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un quiz, matière..."
                  className="pl-11 pr-10 py-3 w-64 xl:w-80 rounded-xl bg-white/10 text-white placeholder-blue-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent focus:bg-white/15 transition-all duration-200 backdrop-blur-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white p-1 transition-colors duration-200"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Notifications */}
            <button 
              className="relative p-2.5 text-blue-100 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 group"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5 group-hover:scale-110 group-hover:animate-bell-shake transition-all duration-300" />
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-blue-800 shadow-lg animate-pulse">
                3
              </span>
            </button>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={(e) => toggleDropdown('user', e)}
                className={`flex items-center space-x-2.5 p-2.5 rounded-xl transition-all duration-200 group ${
                  activeDropdown === 'user' 
                    ? 'bg-white/20 text-white shadow-lg' 
                    : 'text-blue-100 hover:text-white hover:bg-white/10 hover:shadow-md'
                }`}
                aria-label="User menu"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <User className="relative h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full border-2 border-blue-800 shadow-sm" />
                </div>
                <span className="hidden lg:inline font-medium whitespace-nowrap">Ahmed B.</span>
                <ChevronDown className={`h-4 w-4 transition-all duration-300 ${
                  activeDropdown === 'user' ? 'rotate-180 scale-110' : ''
                }`} />
              </button>
              
              {activeDropdown === 'user' && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl shadow-blue-900/40 border border-blue-100 py-2 z-50 animate-in slide-in-from-top-3 duration-200">
                  <div className="px-4 py-3 border-b border-blue-50 bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-2xl">
                    <div className="font-bold text-gray-900 text-lg">Ahmed Benali</div>
                    <div className="text-sm text-gray-600 truncate flex items-center gap-2 mt-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span>Étudiant - Université Hassan II</span>
                    </div>
                  </div>
                  
                  <div className="py-2">
                    <a href="#profile" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-600 transition-all duration-200 group">
                      <User className="h-4 w-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">Mon Profil</span>
                    </a>
                    <a href="#my-quizzes" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-600 transition-all duration-200 group">
                      <BookOpen className="h-4 w-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">Mes Quiz</span>
                    </a>
                    <a href="#saved" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-600 transition-all duration-200 group">
                      <Bookmark className="h-4 w-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">Enregistrés</span>
                    </a>
                    <a href="#settings" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-600 transition-all duration-200 group">
                      <Settings className="h-4 w-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">Paramètres</span>
                    </a>
                  </div>
                  
                  <div className="border-t border-blue-50 py-2">
                    <a 
                      href="#logout" 
                      className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 transition-all duration-200 group font-medium"
                      onClick={closeAllDropdowns}
                    >
                      <LogOut className="h-4 w-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span>Déconnexion</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 text-blue-100 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 relative group"
              aria-label="Toggle mobile menu"
            >
              <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              {isMobileMenuOpen ? (
                <X className="relative h-6 w-6 animate-in rotate-90 fade-in-0 duration-300" />
              ) : (
                <Menu className="relative h-6 w-6 animate-in fade-in-0 duration-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-500 ease-out overflow-hidden ${
        isMobileMenuOpen 
          ? 'max-h-[85vh] opacity-100 visible' 
          : 'max-h-0 opacity-0 invisible'
      }`}>
        <div className="bg-gradient-to-b from-blue-700/95 via-blue-800/95 to-blue-900/95 backdrop-blur-xl border-t border-blue-500/30">
          <div className="px-4 py-5 space-y-1">
            
            {/* Mobile Search */}
            <div className="relative mb-4">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-300 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/15 text-white placeholder-blue-200 border border-white/25 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3.5 text-white/95 hover:text-white hover:bg-white/15 rounded-xl transition-all duration-200 active:scale-[0.98] group"
                  onClick={closeAllDropdowns}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">{item.label}</span>
                </a>
              ))}
            </div>

            {/* Mobile Dropdown Sections */}
            <MobileDropdownSection 
              title="Universités" 
              items={universities}
              iconColor="bg-blue-400"
              hrefPrefix="mobile-university"
            />

            <MobileDropdownSection 
              title="Facultés" 
              items={faculties}
              iconColor="bg-emerald-400"
              hrefPrefix="mobile-faculty"
            />

            <MobileDropdownSection 
              title="Matières" 
              items={subjects}
              iconColor="bg-purple-400"
              hrefPrefix="mobile-subject"
            />

            {/* Mobile User Actions */}
            <div className="pt-4 border-t border-blue-500/40 space-y-1">
              <a
                href="#profile-mobile"
                className="flex items-center space-x-3 px-4 py-3.5 text-white/95 hover:text-white hover:bg-white/15 rounded-xl transition-all duration-200 group"
                onClick={closeAllDropdowns}
              >
                <User className="h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">Mon Profil</span>
              </a>
              <a
                href="#logout-mobile"
                className="flex items-center space-x-3 px-4 py-3.5 text-red-300 hover:text-white hover:bg-red-500/30 rounded-xl transition-all duration-200 group"
                onClick={closeAllDropdowns}
              >
                <LogOut className="h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">Déconnexion</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;