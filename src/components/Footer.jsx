import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Trophy, 
  Users, 
  Mail, 
  Home,
  HelpCircle,
  Settings,
  ChevronUp,
  Star,
  Globe,
  Lock,
  ExternalLink
} from 'lucide-react';

const FooterMobile = () => {
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    { id: 'home', label: 'Accueil', icon: Home, href: '#home' },
    { id: 'quiz', label: 'Quiz', icon: BookOpen, href: '#quiz' },
    { id: 'ranking', label: 'Classement', icon: Trophy, href: '#ranking' },
    { id: 'community', label: 'Communauté', icon: Users, href: '#community' },
    { id: 'more', label: 'Plus', icon: ChevronUp, href: '#more' },
  ];

  const quickLinks = [
    { label: 'À propos', href: '#about' },
    { label: 'Contact', href: '#contact' },
    { label: 'FAQ', href: '#faq' },
    { label: 'CGU', href: '#terms' },
    { label: 'Confidentialité', href: '#privacy' },
  ];

  return (
    <footer className="bg-gradient-to-t from-gray-900 via-gray-900 to-gray-950 text-white lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-gray-800/50 backdrop-blur-lg bg-opacity-95">
      
      {/* Main Navigation Bar */}
      <div className="relative">
        {/* Active indicator */}
        <div 
          className="absolute top-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-300 ease-out rounded-full"
          style={{
            width: '20%',
            left: `${navItems.findIndex(item => item.id === activeTab) * 20}%`,
          }}
        />
        
        <div className="grid grid-cols-5 px-2 py-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center transition-all duration-200 relative group ${
                activeTab === item.id 
                  ? 'text-green-400' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {/* Active state glow */}
              {activeTab === item.id && (
                <div className="absolute inset-0 bg-green-400/10 blur-md rounded-xl" />
              )}
              
              <div className="relative">
                <item.icon className={`h-5 w-5 transition-transform duration-200 ${
                  activeTab === item.id ? 'scale-110' : 'group-hover:scale-105'
                }`} />
                
                {/* Notification badge for quiz */}
                {item.id === 'quiz' && (
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                )}
              </div>
              
              <span className="text-xs font-medium mt-1 transition-all duration-200">
                {item.label}
              </span>
              
              {/* Active indicator dot */}
              {activeTab === item.id && (
                <div className="absolute -bottom-3 h-0.5 w-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Expanded Content (for "Plus" tab) */}
      {activeTab === 'more' && (
        <div className="animate-in slide-in-from-bottom-10 duration-300">
          <div className="px-4 py-5 bg-gradient-to-b from-gray-800/90 to-gray-900/90 border-t border-gray-700/50">
            
            {/* Quick Links */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Liens Rapides
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {quickLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="flex items-center justify-between px-3 py-2.5 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-all duration-200 group"
                  >
                    <span className="text-sm text-gray-300 group-hover:text-white">
                      {link.label}
                    </span>
                    <ExternalLink className="h-3 w-3 text-gray-500 group-hover:text-green-400 transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* App Info */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <GraduationCap className="h-8 w-8 text-green-400" />
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-gray-900" />
                </div>
                <div>
                  <div className="text-sm font-bold">Moroccan<span className="text-green-400">Quiz</span></div>
                  <div className="text-xs text-gray-400">Version 2.1.0</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-green-400 hover:bg-gray-800/50 rounded-lg transition-colors">
                  <Settings className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-800/50 rounded-lg transition-colors">
                  <HelpCircle className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Security Badge */}
            <div className="mt-4 p-3 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-lg border border-gray-700/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-green-400" />
                  <span className="text-xs text-gray-300">Sécurisé & Privé</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-3 w-3 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-xs text-gray-400 ml-1">4.8</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mini Stats Bar (Visible on all tabs except "more") */}
      {activeTab !== 'more' && (
        <div className="px-4 py-2.5 bg-gradient-to-r from-gray-800/30 to-gray-900/30 border-t border-gray-800/30">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" />
              <span className="text-gray-300">Quiz actifs: <span className="text-green-400 font-semibold">24</span></span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-3 w-3 text-yellow-400" />
              <span className="text-gray-300">Ton rang: <span className="text-yellow-400 font-semibold">#12</span></span>
            </div>
          </div>
        </div>
      )}

      {/* Copyright */}
      <div className="px-4 py-3 bg-gradient-to-t from-gray-950 to-gray-900 border-t border-gray-800/50">
        <div className="text-center text-xs text-gray-500">
          © 2025 Moroccan Quiz App • Tous droits réservés
        </div>
      </div>
    </footer>
  );
};

export default FooterMobile;