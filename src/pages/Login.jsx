import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  LogIn, 
  BookOpen, 
  GraduationCap,
  AlertCircle,
  CheckCircle2,
  Loader,
  Building,
  UserCheck,
  Shield,
  Sparkles,
  Smartphone,
  Clock,
  Users,
  Trophy,
  Star,
  Target,
  ChevronRight,
  Award,
  Heart,
  Zap,
  Coffee,
  University,
  Globe,
  ShieldCheck,
  ArrowRight,
  Sparkle
} from 'lucide-react';

// Universités marocaines
const moroccanUniversities = [
  { name: 'Université Mohammed V de Rabat', domain: '@um5.ac.ma', color: 'bg-red-500' },
  { name: 'Université Hassan II de Casablanca', domain: '@uh2c.ac.ma', color: 'bg-blue-500' },
  { name: 'Université Cadi Ayyad de Marrakech', domain: '@uca.ac.ma', color: 'bg-green-500' },
  { name: 'Université Ibn Tofail de Kénitra', domain: '@uit.ac.ma', color: 'bg-purple-500' },
  { name: 'Université Abdelmalek Essaâdi', domain: '@uae.ac.ma', color: 'bg-yellow-500' },
  { name: 'Université Sidi Mohamed Ben Abdellah', domain: '@usmba.ac.ma', color: 'bg-indigo-500' }
];

// Facultés marocaines
const moroccanFaculties = [
  { name: 'Faculté des Sciences', icon: '🔬', color: 'bg-blue-100 text-blue-800' },
  { name: 'Faculté des Sciences et Techniques', icon: '⚙️', color: 'bg-green-100 text-green-800' },
  { name: 'Faculté de Médecine', icon: '🏥', color: 'bg-red-100 text-red-800' },
  { name: 'Faculté de Droit', icon: '⚖️', color: 'bg-purple-100 text-purple-800' },
  { name: 'Faculté des Lettres', icon: '📚', color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Faculté des Sciences Économiques', icon: '📈', color: 'bg-indigo-100 text-indigo-800' }
];

const Login = () => {
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showUniversityDropdown, setShowUniversityDropdown] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [loginMethod, setLoginMethod] = useState('email');
  const [animateIn, setAnimateIn] = useState(false);

  const { login, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Animation d'entrée
  useEffect(() => {
    setAnimateIn(true);
    if (typeof clearError === 'function') {
      clearError();
    }
    // Run once on mount to avoid rerender loops if clearError identity changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Redirection après connexion
  const from = location.state?.from?.pathname || '/dashboard';

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'email':
        if (!value) {
          newErrors.email = 'L\'email universitaire est requis';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = 'Format d\'email invalide';
        } else if (!value.includes('.ac.ma') && !value.includes('.edu.ma')) {
          newErrors.email = 'Veuillez utiliser votre email universitaire (.ac.ma ou .edu.ma)';
        } else {
          delete newErrors.email;
        }
        break;
      
      case 'password':
        if (!value) {
          newErrors.password = 'Le mot de passe est requis';
        } else if (value.length < 6) {
          newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
        } else {
          delete newErrors.password;
        }
        break;
      
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    
    if (touched[name]) {
      validateField(name, value);
    }
    
    if (name === 'email') {
      const uni = moroccanUniversities.find(u => value.includes(u.domain));
      setSelectedUniversity(uni || null);
    }
  };

  const handleUniversitySelect = (university) => {
    const email = `etudiant${university.domain}`;
    setFormData(prev => ({ ...prev, email }));
    setSelectedUniversity(university);
    setShowUniversityDropdown(false);
    setTouched(prev => ({ ...prev, email: true }));
    validateField('email', email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTouched({ email: true, password: true });
    
    const isEmailValid = validateField('email', formData.email);
    const isPasswordValid = validateField('password', formData.password);
    
    if (!isEmailValid || !isPasswordValid) {
      setIsSubmitting(false);
      return;
    }
    
    const result = await login(formData.email, formData.password, formData.rememberMe);
    setIsSubmitting(false);
    
    if (result.success) {
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 500);
    }
  };

  const isFormValid = formData.email && formData.password && Object.keys(errors).length === 0;

  // Données de démonstration
  const demoAccounts = [
    { 
      email: 'admin@quiz.edu.ma', 
      password: 'password123', 
      role: 'Administrateur', 
      university: 'Plateforme',
      badge: '👑'
    },
    { 
      email: 'etudiant@um5.ac.ma', 
      password: 'student2024', 
      role: 'Étudiant', 
      university: 'UM5 Rabat',
      badge: '🎓'
    },
    { 
      email: 'professeur@uh2c.ac.ma', 
      password: 'prof2024', 
      role: 'Professeur', 
      university: 'UH2C',
      badge: '👨‍🏫'
    }
  ];

  const fillDemoAccount = (account) => {
    setFormData({
      email: account.email,
      password: account.password,
      rememberMe: false
    });
    setTouched({ email: true, password: true });
    setErrors({});
    clearError();
    
    const uni = moroccanUniversities.find(u => account.email.includes(u.domain));
    setSelectedUniversity(uni || null);
  };

  // Données de statistiques
  const stats = [
    { number: '50K+', label: 'Étudiants', icon: Users, color: 'text-blue-500 bg-blue-100' },
    { number: '500+', label: 'Quiz', icon: BookOpen, color: 'text-green-500 bg-green-100' },
    { number: '95%', label: 'Satisfaction', icon: Trophy, color: 'text-amber-500 bg-amber-100' },
    { number: '24/7', label: 'Support', icon: Clock, color: 'text-purple-500 bg-purple-100' }
  ];

  // Données de fonctionnalités
  const features = [
    { icon: '📚', title: 'Quiz Spécialisés', desc: 'Par matière et niveau' },
    { icon: '📊', title: 'Progression', desc: 'Suivi détaillé' },
    { icon: '🏆', title: 'Classements', desc: 'Comparaison universitaire' },
    { icon: '🤝', title: 'Communauté', desc: 'Échange entre étudiants' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className={`max-w-7xl w-full transition-all duration-500 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Section gauche - Présentation */}
          <div className="space-y-8">
            {/* Logo et titre */}
            <div>
              <Link to="/" className="inline-flex items-center gap-3 group mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                    <GraduationCap className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Moroccan Quiz
                  </h1>
                  <p className="text-gray-600 text-sm">Plateforme éducative</p>
                </div>
              </Link>

              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-gray-900">
                  Connectez-vous à votre <span className="text-blue-600">espace étudiant</span>
                </h2>
                <p className="text-lg text-gray-600">
                  Accédez à des centaines de quiz universitaires, suivez votre progression et excellez dans vos études.
                </p>
              </div>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-sm border">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${stat.color}`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900">{stat.number}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Fonctionnalités */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-500" />
                Pourquoi nous choisir ?
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{feature.icon}</span>
                      <span className="font-medium text-gray-900">{feature.title}</span>
                    </div>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Universités partenaires */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Building className="h-5 w-5 text-blue-500" />
                Universités partenaires
              </h3>
              <div className="flex flex-wrap gap-2">
                {moroccanUniversities.slice(0, 5).map((uni, index) => (
                  <button
                    key={index}
                    onClick={() => handleUniversitySelect(uni)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium text-white ${uni.color} hover:opacity-90 transition-opacity`}
                  >
                    {uni.name.split('de ')[1]?.split(' ')[0] || uni.name.split(' ')[1]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section droite - Formulaire */}
          <div className="space-y-6">
            {/* Carte de connexion */}
            <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-sm mb-4">
                  <LogIn className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Connexion Étudiant
                </h2>
                <p className="text-white/90">
                  Utilisez vos identifiants universitaires
                </p>
              </div>

              {/* Formulaire */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Sélecteur de méthode */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setLoginMethod('email')}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                      loginMethod === 'email'
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Email
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginMethod('studentId')}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                      loginMethod === 'studentId'
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Numéro étudiant
                  </button>
                </div>

                {/* Champ email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email universitaire</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur('email')}
                      placeholder="ex: nom.prenom@universite.ac.ma"
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email && touched.email
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.email && touched.email && (
                    <p className="text-red-600 text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Champ mot de passe */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Mot de passe</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={() => handleBlur('password')}
                      placeholder="Votre mot de passe"
                      className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.password && touched.password
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && touched.password && (
                    <p className="text-red-600 text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Options */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">Se souvenir de moi</span>
                  </label>
                  <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                    Mot de passe oublié ?
                  </Link>
                </div>

                {/* Erreur globale */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-red-700">
                      <AlertCircle className="h-5 w-5" />
                      <span className="text-sm">{error}</span>
                    </div>
                  </div>
                )}

                {/* Bouton de connexion */}
                <button
                  type="submit"
                  disabled={!isFormValid || isLoading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader className="h-5 w-5 animate-spin" />
                      Connexion...
                    </>
                  ) : (
                    <>
                      <LogIn className="h-5 w-5" />
                      Se connecter
                    </>
                  )}
                </button>

                {/* Lien d'inscription */}
                <div className="text-center pt-4 border-t">
                  <p className="text-gray-600 text-sm">
                    Pas encore de compte ?{' '}
                    <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                      S'inscrire
                    </Link>
                  </p>
                </div>
              </form>
            </div>

            {/* Comptes de démonstration */}
            <div className="bg-white rounded-xl p-4 border">
              <div className="flex items-center gap-2 mb-3">
                <Coffee className="h-5 w-5 text-amber-500" />
                <h3 className="font-medium text-gray-900">Comptes de démonstration</h3>
              </div>
              <div className="space-y-2">
                {demoAccounts.map((account, index) => (
                  <button
                    key={index}
                    onClick={() => fillDemoAccount(account)}
                    className="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>{account.badge}</span>
                        <div>
                          <div className="font-medium text-gray-900 text-sm">{account.email}</div>
                          <div className="text-xs text-gray-500">{account.role}</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">pass: {account.password}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sécurité */}
            <div className="text-center space-y-1">
              <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                <ShieldCheck className="h-3 w-3" />
                Connexion sécurisée SSL
              </p>
              <p className="text-xs text-gray-500">
                En vous connectant, vous acceptez nos{' '}
                <Link to="/terms" className="text-blue-600 hover:text-blue-700">
                  conditions
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Footer avec facultés */}
        <div className="mt-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Plateforme utilisée par 50+ établissements marocains
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {moroccanFaculties.map((faculty, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg text-center ${faculty.color}`}
                >
                  <div className="text-xl mb-1">{faculty.icon}</div>
                  <div className="text-sm font-medium">{faculty.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;