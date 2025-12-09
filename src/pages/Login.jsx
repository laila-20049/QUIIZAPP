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
  Fingerprint,
  Clock,
  Globe,
  Users,
  Trophy,
  Star,
  Target,
  ChevronRight,
  Award,
  Heart,
  Zap,
  Coffee
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
  const [loginMethod, setLoginMethod] = useState('email'); // 'email', 'phone', 'studentId'
  const [animateIn, setAnimateIn] = useState(false);

  const { login, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Animation d'entrée
  useEffect(() => {
    setAnimateIn(true);
    clearError();
  }, [clearError]);

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
      // Trouver l'université correspondante
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
    
    // Marquer tous les champs comme touchés
    setTouched({ email: true, password: true });
    
    // Valider tous les champs
    const isEmailValid = validateField('email', formData.email);
    const isPasswordValid = validateField('password', formData.password);
    
    if (!isEmailValid || !isPasswordValid) {
      setIsSubmitting(false);
      return;
    }
    
    const result = await login(formData.email, formData.password, formData.rememberMe);
    setIsSubmitting(false);
    
    if (result.success) {
      // Animation de succès avant redirection
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 500);
    }
  };

  const isFormValid = formData.email && formData.password && Object.keys(errors).length === 0;

  // Données de démonstration pour les comptes de test
  const demoAccounts = [
    { 
      email: 'admin@quiz.ma', 
      password: 'password123', 
      role: 'Administrateur', 
      university: 'Plateforme',
      badge: '👑'
    },
    { 
      email: 'etudiant@um5.ac.ma', 
      password: 'student2024', 
      role: 'Étudiant S4', 
      university: 'UM5 Rabat',
      badge: '🎓',
      faculty: 'FST'
    },
    { 
      email: 'professeur@uh2c.ac.ma', 
      password: 'prof2024', 
      role: 'Professeur', 
      university: 'UH2 Casablanca',
      badge: '👨‍🏫',
      faculty: 'Faculté des Sciences'
    },
    { 
      email: 'coordinateur@uca.ac.ma', 
      password: 'coord2024', 
      role: 'Coordinateur', 
      university: 'UCAD Marrakech',
      badge: '📊',
      faculty: 'Faculté de Droit'
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
    
    // Trouver l'université correspondante
    const uni = moroccanUniversities.find(u => account.email.includes(u.domain));
    setSelectedUniversity(uni || null);
  };

  const stats = [
    { number: '50K+', label: 'Étudiants actifs', icon: Users },
    { number: '500+', label: 'Quiz disponibles', icon: BookOpen },
    { number: '95%', label: 'Satisfaction', icon: Trophy },
    { number: '24/7', label: 'Disponibilité', icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-moroccan-light via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className={`max-w-7xl w-full transition-all duration-700 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Colonne de gauche - Présentation */}
          <div className="space-y-8">
            {/* Logo et titre */}
            <div className="space-y-4">
              <Link to="/" className="inline-flex items-center gap-4 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-moroccan-red to-moroccan-green rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                  <div className="relative p-4 bg-gradient-to-r from-moroccan-red to-moroccan-green rounded-2xl transform group-hover:scale-105 transition-transform duration-300">
                    <GraduationCap className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-moroccan-red to-moroccan-green bg-clip-text text-transparent">
                    Moroccan University Quiz
                  </div>
                  <div className="text-lg text-gray-600 font-arabic mt-1">
                    منصة الاختبارات الجامعية المغربية
                  </div>
                </div>
              </Link>

              <div className="space-y-4">
                <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                  Connectez-vous à votre <span className="text-moroccan-green">espace étudiant</span>
                </h1>
                <p className="text-xl text-gray-600">
                  Accédez à des centaines de quiz universitaires, suivez votre progression et excellez dans vos études.
                </p>
              </div>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      index === 0 ? 'bg-blue-100 text-blue-600' :
                      index === 1 ? 'bg-green-100 text-green-600' :
                      index === 2 ? 'bg-yellow-100 text-yellow-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Universités partenaires */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Building className="h-5 w-5 text-moroccan-red" />
                Universités partenaires
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {moroccanUniversities.slice(0, 6).map((uni, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg text-center text-xs font-medium text-white ${uni.color} hover:opacity-90 transition-opacity cursor-pointer transform hover:scale-105 transition-transform`}
                    onClick={() => handleUniversitySelect(uni)}
                  >
                    {uni.name.split(' ')[1]}
                  </div>
                ))}
              </div>
            </div>

            {/* Fonctionnalités */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Pourquoi nous choisir ?
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: '📚', text: 'Quiz par matière et niveau', color: 'bg-blue-100 text-blue-800' },
                  { icon: '📊', text: 'Statistiques détaillées', color: 'bg-green-100 text-green-800' },
                  { icon: '🏆', text: 'Classements universitaires', color: 'bg-yellow-100 text-yellow-800' },
                  { icon: '🤝', text: 'Communauté étudiante', color: 'bg-purple-100 text-purple-800' }
                ].map((feature, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg ${feature.color} flex items-center gap-2`}
                  >
                    <span>{feature.icon}</span>
                    <span className="text-sm font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne de droite - Formulaire */}
          <div className="space-y-8">
            {/* Carte de connexion principale */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* En-tête avec gradient marocain */}
              <div className="relative bg-gradient-to-r from-moroccan-red via-moroccan-red to-moroccan-green p-8 text-center overflow-hidden">
                <div className="absolute inset-0 bg-pattern-morocco opacity-10"></div>
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl backdrop-blur-sm mb-4 border border-white/30">
                    <LogIn className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-3">
                    Connexion Étudiant
                  </h2>
                  <p className="text-white/90">
                    Utilisez vos identifiants universitaires
                  </p>
                </div>
              </div>

              {/* Sélecteur de méthode de connexion */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex space-x-2">
                  {[
                    { id: 'email', icon: Mail, label: 'Email', active: true },
                    { id: 'studentId', icon: UserCheck, label: 'Numéro étudiant' },
                    { id: 'phone', icon: Smartphone, label: 'Téléphone' }
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setLoginMethod(method.id)}
                      className={`flex-1 flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                        loginMethod === method.id
                          ? 'border-moroccan-green bg-green-50 text-moroccan-green'
                          : 'border-gray-200 hover:border-gray-300 text-gray-600'
                      }`}
                    >
                      <method.icon className="h-6 w-6 mb-2" />
                      <span className="text-sm font-medium">{method.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Formulaire */}
              <form className="p-8 space-y-6" onSubmit={handleSubmit}>
                {/* Champ Email avec sélection d'université */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    <span className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email universitaire
                    </span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className={`h-5 w-5 ${
                        errors.email ? 'text-red-400' : 
                        formData.email ? 'text-green-500' : 'text-gray-400'
                      }`} />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="ex: nom.prenom@universite.ac.ma"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur('email')}
                      onFocus={() => setShowUniversityDropdown(true)}
                      className={`block w-full pl-10 pr-10 py-4 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                        errors.email && touched.email
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50'
                          : formData.email && !errors.email
                          ? 'border-green-300 focus:ring-green-500 focus:border-green-500 bg-green-50'
                          : 'border-gray-300 focus:ring-moroccan-green focus:border-moroccan-green bg-white'
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowUniversityDropdown(!showUniversityDropdown)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <Building className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    </button>
                  </div>
                  
                  {/* Dropdown des universités */}
                  {showUniversityDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-auto">
                      {moroccanUniversities.map((uni, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleUniversitySelect(uni)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3"
                        >
                          <div className={`w-8 h-8 rounded-full ${uni.color}`}></div>
                          <div>
                            <div className="font-medium text-gray-900">{uni.name}</div>
                            <div className="text-sm text-gray-500">ex: etudiant{uni.domain}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Indicateur d'université sélectionnée */}
                  {selectedUniversity && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className={`w-3 h-3 rounded-full ${selectedUniversity.color}`}></div>
                      <span className="text-sm text-gray-600">
                        Université détectée: {selectedUniversity.name}
                      </span>
                    </div>
                  )}

                  {errors.email && touched.email && (
                    <div className="flex items-center gap-1 text-red-600 text-sm mt-2 animate-shake">
                      <AlertCircle className="h-4 w-4" />
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Champ Mot de passe */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    <span className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Mot de passe
                    </span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className={`h-5 w-5 ${
                        errors.password ? 'text-red-400' : 
                        formData.password ? 'text-green-500' : 'text-gray-400'
                      }`} />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Votre mot de passe universitaire"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={() => handleBlur('password')}
                      className={`block w-full pl-10 pr-10 py-4 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                        errors.password && touched.password
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50'
                          : formData.password && !errors.password
                          ? 'border-green-300 focus:ring-green-500 focus:border-green-500 bg-green-50'
                          : 'border-gray-300 focus:ring-moroccan-green focus:border-moroccan-green bg-white'
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && touched.password && (
                    <div className="flex items-center gap-1 text-red-600 text-sm mt-2 animate-shake">
                      <AlertCircle className="h-4 w-4" />
                      {errors.password}
                    </div>
                  )}
                </div>

                {/* Options supplémentaires */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                        formData.rememberMe
                          ? 'bg-moroccan-green border-moroccan-green'
                          : 'border-gray-300 group-hover:border-gray-400'
                      }`}>
                        {formData.rememberMe && (
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        )}
                      </div>
                    </div>
                    <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900">
                      Se souvenir de moi sur cet appareil
                    </span>
                  </label>
                  
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-moroccan-green hover:text-moroccan-red font-medium flex items-center gap-1 transition-colors"
                  >
                    <Shield className="h-4 w-4" />
                    Mot de passe oublié ?
                  </Link>
                </div>

                {/* Erreur globale */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-fadeIn">
                    <div className="flex items-center gap-2 text-red-700">
                      <AlertCircle className="h-5 w-5" />
                      <div>
                        <span className="text-sm font-medium">{error}</span>
                        <p className="text-xs text-red-600 mt-1">
                          Vérifiez vos identifiants ou contactez le support étudiant
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bouton de connexion */}
                <button
                  type="submit"
                  disabled={!isFormValid || isLoading || isSubmitting}
                  className="group relative w-full flex justify-center py-5 px-4 border border-transparent rounded-xl text-lg font-bold text-white bg-gradient-to-r from-moroccan-red to-moroccan-green hover:from-moroccan-red/90 hover:to-moroccan-green/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-moroccan-green disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-xl"></div>
                  <span className="relative flex items-center gap-3">
                    {isLoading || isSubmitting ? (
                      <>
                        <Loader className="h-6 w-6 animate-spin" />
                        Connexion en cours...
                      </>
                    ) : (
                      <>
                        <LogIn className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                        Accéder à mon espace
                        <ChevronRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </>
                    )}
                  </span>
                </button>

                {/* Lien d'inscription */}
                <div className="text-center pt-6 border-t border-gray-200">
                  <p className="text-gray-600">
                    Nouveau sur Moroccan University Quiz ?{' '}
                    <Link 
                      to="/register" 
                      className="font-bold text-moroccan-green hover:text-moroccan-red transition-colors inline-flex items-center gap-1"
                    >
                      Créer un compte étudiant
                      <Sparkles className="h-4 w-4" />
                    </Link>
                  </p>
                </div>
              </form>
            </div>

            {/* Comptes de démonstration */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Coffee className="h-5 w-5 text-amber-600" />
                  Comptes de démonstration
                </h3>
                <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">
                  Cliquez pour remplir
                </span>
              </div>
              
              <div className="space-y-3">
                {demoAccounts.map((account, index) => (
                  <button
                    key={index}
                    onClick={() => fillDemoAccount(account)}
                    className="w-full flex items-center justify-between p-4 text-left bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 rounded-xl border border-gray-200 hover:border-moroccan-green/50 transition-all group transform hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{account.badge}</div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">
                          {account.email}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                            {account.role}
                          </span>
                          {account.faculty && (
                            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                              {account.faculty}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-gray-500 mb-1">
                        {account.university}
                      </span>
                      <div className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                        pass: {account.password}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700 text-center">
                  <Shield className="h-4 w-4 inline mr-1" />
                  Ces comptes sont sécurisés et réservés à la démonstration
                </p>
              </div>
            </div>

            {/* Sécurité et confidentialité */}
            <div className="text-center space-y-2">
              <p className="text-xs text-gray-500">
                <Shield className="h-3 w-3 inline mr-1" />
                Votre connexion est sécurisée par chiffrement SSL 256-bit
              </p>
              <p className="text-xs text-gray-500">
                En vous connectant, vous acceptez nos{' '}
                <Link to="/terms" className="text-moroccan-green hover:text-moroccan-red">
                  conditions d'utilisation
                </Link>{' '}
                et notre{' '}
                <Link to="/privacy" className="text-moroccan-green hover:text-moroccan-red">
                  politique de confidentialité
                </Link>
              </p>
              <div className="flex items-center justify-center gap-4 pt-2">
                <Globe className="h-4 w-4 text-gray-400" />
                <span className="text-xs text-gray-500">
                  🇲🇦 Plateforme officielle des universités marocaines
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bandeau d'universités en bas */}
        <div className="mt-12">
          <div className="bg-gradient-to-r from-moroccan-red/5 to-moroccan-green/5 rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                <Building className="h-5 w-5 inline mr-2 text-moroccan-red" />
                Plateforme utilisée par 50+ établissements marocains
              </h3>
              <Heart className="h-5 w-5 text-moroccan-red animate-pulse" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {moroccanFaculties.map((faculty, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg text-center ${faculty.color} hover:opacity-90 transition-opacity`}
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