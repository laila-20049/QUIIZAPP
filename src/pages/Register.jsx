import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  UserPlus, 
  BookOpen, 
  GraduationCap,
  AlertCircle,
  CheckCircle2,
  Loader,
  Building,
  Users,
  Trophy,
  Clock,
  Zap,
  ChevronRight,
  Shield,
  Sparkles,
  Award,
  Globe,
  School,
  FileText,
  Phone,
  MapPin
} from 'lucide-react';

// Universités marocaines
const moroccanUniversities = [
  { id: 'um5', name: 'Université Mohammed V de Rabat', domain: '@um5.ac.ma', color: 'bg-red-500', city: 'Rabat' },
  { id: 'uh2c', name: 'Université Hassan II de Casablanca', domain: '@uh2c.ac.ma', color: 'bg-blue-500', city: 'Casablanca' },
  { id: 'uca', name: 'Université Cadi Ayyad de Marrakech', domain: '@uca.ac.ma', color: 'bg-green-500', city: 'Marrakech' },
  { id: 'uit', name: 'Université Ibn Tofail de Kénitra', domain: '@uit.ac.ma', color: 'bg-purple-500', city: 'Kénitra' },
  { id: 'uae', name: 'Université Abdelmalek Essaâdi', domain: '@uae.ac.ma', color: 'bg-yellow-500', city: 'Tétouan' },
  { id: 'usmba', name: 'Université Sidi Mohamed Ben Abdellah', domain: '@usmba.ac.ma', color: 'bg-indigo-500', city: 'Fès' },
  { id: 'uiz', name: 'Université Ibn Zohr', domain: '@uiz.ac.ma', color: 'bg-pink-500', city: 'Agadir' },
  { id:'ump', name: 'Université Mohammed Premier', domain: '@ump.ac.ma', color: 'bg-orange-500', city: 'Oujda' }
];

// Facultés marocaines
const moroccanFaculties = [
  { id: 'fst', name: 'Faculté des Sciences et Techniques', icon: '⚙️', color: 'bg-green-100 text-green-800' },
  { id: 'fs', name: 'Faculté des Sciences', icon: '🔬', color: 'bg-blue-100 text-blue-800' },
  { id: 'fm', name: 'Faculté de Médecine et de Pharmacie', icon: '🏥', color: 'bg-red-100 text-red-800' },
  { id: 'fd', name: 'Faculté de Droit', icon: '⚖️', color: 'bg-purple-100 text-purple-800' },
  { id: 'fl', name: 'Faculté des Lettres et Sciences Humaines', icon: '📚', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'fseg', name: 'Faculté des Sciences Économiques et de Gestion', icon: '📈', color: 'bg-indigo-100 text-indigo-800' },
  { id: 'ensam', name: 'ENSAM - École Nationale Supérieure', icon: '🏭', color: 'bg-gray-100 text-gray-800' },
  { id: 'ensa', name: 'ENSA - École Nationale des Sciences Appliquées', icon: '💻', color: 'bg-teal-100 text-teal-800' }
];

// Niveaux d'études
const studyLevels = [
  { id: 's1', name: 'Semestre 1', level: 'L1' },
  { id: 's2', name: 'Semestre 2', level: 'L1' },
  { id: 's3', name: 'Semestre 3', level: 'L2' },
  { id: 's4', name: 'Semestre 4', level: 'L2' },
  { id: 's5', name: 'Semestre 5', level: 'L3' },
  { id: 's6', name: 'Semestre 6', level: 'L3' },
  { id: 'm1', name: 'Master 1', level: 'M1' },
  { id: 'm2', name: 'Master 2', level: 'M2' }
];

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({ 
    fullName: '',
    email: '', 
    password: '',
    confirmPassword: '',
    university: '',
    faculty: '',
    studyLevel: '',
    studentId: '',
    phone: '',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const { register, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setAnimateIn(true);
    clearError();
  }, [clearError]);

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'fullName':
        if (!value) {
          newErrors.fullName = 'Le nom complet est requis';
        } else if (value.length < 3) {
          newErrors.fullName = 'Le nom doit contenir au moins 3 caractères';
        } else if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value)) {
          newErrors.fullName = 'Le nom ne doit contenir que des lettres';
        } else {
          delete newErrors.fullName;
        }
        break;
      
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
        } else if (value.length < 8) {
          newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          newErrors.password = 'Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre';
        } else {
          delete newErrors.password;
        }
        break;
      
      case 'confirmPassword':
        if (!value) {
          newErrors.confirmPassword = 'Veuillez confirmer votre mot de passe';
        } else if (value !== formData.password) {
          newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      
      case 'university':
        if (!value) {
          newErrors.university = 'Veuillez sélectionner votre université';
        } else {
          delete newErrors.university;
        }
        break;
      
      case 'faculty':
        if (!value) {
          newErrors.faculty = 'Veuillez sélectionner votre faculté';
        } else {
          delete newErrors.faculty;
        }
        break;
      
      case 'studyLevel':
        if (!value) {
          newErrors.studyLevel = 'Veuillez sélectionner votre niveau d\'études';
        } else {
          delete newErrors.studyLevel;
        }
        break;
      
      case 'studentId':
        if (value && !/^[A-Z0-9]{5,15}$/.test(value)) {
          newErrors.studentId = 'Format de numéro étudiant invalide';
        } else {
          delete newErrors.studentId;
        }
        break;
      
      case 'phone':
        if (value && !/^(\+212|0)[5-7][0-9]{8}$/.test(value.replace(/\s/g, ''))) {
          newErrors.phone = 'Format de numéro de téléphone marocain invalide';
        } else {
          delete newErrors.phone;
        }
        break;
      
      case 'acceptTerms':
        if (!value) {
          newErrors.acceptTerms = 'Vous devez accepter les conditions d\'utilisation';
        } else {
          delete newErrors.acceptTerms;
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
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({ 
      ...prev, 
      [name]: newValue
    }));
    
    if (touched[name]) {
      validateField(name, newValue);
    }
    
    // Si le mot de passe change, revalider la confirmation
    if (name === 'password' && formData.confirmPassword) {
      validateField('confirmPassword', formData.confirmPassword);
    }
  };

  const handleUniversitySelect = (university) => {
    setFormData(prev => ({ ...prev, university: university.id }));
    setTouched(prev => ({ ...prev, university: true }));
    validateField('university', university.id);
  };

  const handleFacultySelect = (faculty) => {
    setFormData(prev => ({ ...prev, faculty: faculty.id }));
    setTouched(prev => ({ ...prev, faculty: true }));
    validateField('faculty', faculty.id);
  };

  const handleStudyLevelSelect = (level) => {
    setFormData(prev => ({ ...prev, studyLevel: level.id }));
    setTouched(prev => ({ ...prev, studyLevel: true }));
    validateField('studyLevel', level.id);
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 15;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 10;
    
    if (strength < 40) return { strength, label: 'Faible', color: 'bg-red-500' };
    if (strength < 70) return { strength, label: 'Moyen', color: 'bg-yellow-500' };
    return { strength, label: 'Fort', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const isStep1Valid = () => {
    return formData.fullName && 
           formData.email && 
           formData.password && 
           formData.confirmPassword &&
           !errors.fullName &&
           !errors.email &&
           !errors.password &&
           !errors.confirmPassword;
  };

  const isStep2Valid = () => {
    return formData.university && 
           formData.faculty && 
           formData.studyLevel &&
           !errors.university &&
           !errors.faculty &&
           !errors.studyLevel;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Valider tous les champs de l'étape 1
      const fields = ['fullName', 'email', 'password', 'confirmPassword'];
      fields.forEach(field => {
        setTouched(prev => ({ ...prev, [field]: true }));
        validateField(field, formData[field]);
      });
      
      if (isStep1Valid()) {
        setCurrentStep(2);
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Marquer tous les champs comme touchés
    Object.keys(formData).forEach(key => {
      setTouched(prev => ({ ...prev, [key]: true }));
    });
    
    // Valider tous les champs
    let isValid = true;
    Object.keys(formData).forEach(key => {
      if (key !== 'studentId' && key !== 'phone') { // Ces champs sont optionnels
        const valid = validateField(key, formData[key]);
        if (!valid) isValid = false;
      }
    });
    
    if (!isValid) {
      setIsSubmitting(false);
      return;
    }
    
    // Préparer les données pour l'API
    const university = moroccanUniversities.find(u => u.id === formData.university);
    const faculty = moroccanFaculties.find(f => f.id === formData.faculty);
    const studyLevel = studyLevels.find(l => l.id === formData.studyLevel);
    
    const registrationData = {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      university: university?.name,
      faculty: faculty?.name,
      studyLevel: studyLevel?.name,
      studentId: formData.studentId || undefined,
      phone: formData.phone || undefined
    };
    
    const result = await register(registrationData);
    setIsSubmitting(false);
    
    if (result.success) {
      setRegistrationSuccess(true);
      // Animation de succès puis redirection
      setTimeout(() => {
        navigate('/login', { 
          state: { 
            message: 'Inscription réussie ! Vous pouvez maintenant vous connecter.',
            email: formData.email
          }
        });
      }, 2000);
    }
  };

  const stats = [
    { number: '50K+', label: 'Étudiants actifs', icon: Users },
    { number: '500+', label: 'Quiz disponibles', icon: BookOpen },
    { number: '95%', label: 'Taux de réussite', icon: Trophy },
    { number: '24/7', label: 'Support disponible', icon: Clock }
  ];

  const steps = [
    { number: 1, title: 'Informations personnelles', icon: User },
    { number: 2, title: 'Informations académiques', icon: GraduationCap },
    { number: 3, title: 'Confirmation', icon: CheckCircle2 }
  ];

  if (registrationSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-moroccan-light via-white to-blue-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Inscription réussie !
          </h2>
          <p className="text-gray-600 mb-6">
            Votre compte a été créé avec succès. Vous allez être redirigé vers la page de connexion.
          </p>
          <div className="flex items-center justify-center">
            <Loader className="h-6 w-6 text-moroccan-green animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-moroccan-light via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
                  Rejoignez la <span className="text-moroccan-green">communauté étudiante</span>
                </h1>
                <p className="text-xl text-gray-600">
                  Créez votre compte et accédez à des centaines de quiz universitaires adaptés à votre niveau.
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

            {/* Avantages */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                Avantages de votre inscription
              </h3>
              <div className="space-y-3">
                {[
                  { icon: BookOpen, text: 'Accès illimité aux quiz de toutes les facultés', color: 'text-blue-600' },
                  { icon: Trophy, text: 'Participez aux classements et compétitions', color: 'text-yellow-600' },
                  { icon: Award, text: 'Obtenez des badges et certifications', color: 'text-purple-600' },
                  { icon: Users, text: 'Rejoignez une communauté de plus de 50 000 étudiants', color: 'text-green-600' }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
                    <benefit.icon className={`h-5 w-5 mt-0.5 ${benefit.color}`} />
                    <span className="text-sm text-gray-700">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Témoignage */}
            <div className="bg-gradient-to-r from-moroccan-red to-moroccan-green rounded-xl p-6 text-white">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                  👨‍🎓
                </div>
                <div className="flex-1">
                  <p className="text-white/90 mb-3 italic">
                    "Cette plateforme m'a permis d'améliorer mes résultats de 30%. Les quiz sont parfaitement adaptés au programme marocain !"
                  </p>
                  <div className="font-semibold">Ahmed El Mansouri</div>
                  <div className="text-sm text-white/80">Étudiant en S4 - FST Mohammedia</div>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne de droite - Formulaire */}
          <div className="space-y-6">
            {/* Indicateur de progression */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                {steps.map((step, index) => (
                  <React.Fragment key={step.number}>
                    <div className="flex flex-col items-center flex-1">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                        currentStep >= step.number
                          ? 'border-moroccan-green bg-moroccan-green text-white'
                          : 'border-gray-300 bg-white text-gray-400'
                      }`}>
                        <step.icon className="h-6 w-6" />
                      </div>
                      <div className="text-xs mt-2 text-center font-medium text-gray-600 hidden sm:block">
                        {step.title}
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-2 transition-all ${
                        currentStep > step.number ? 'bg-moroccan-green' : 'bg-gray-300'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Carte de formulaire */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* En-tête */}
              <div className="relative bg-gradient-to-r from-moroccan-red via-moroccan-red to-moroccan-green p-8 text-center overflow-hidden">
                <div className="absolute inset-0 bg-pattern-morocco opacity-10"></div>
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl backdrop-blur-sm mb-4 border border-white/30">
                    <UserPlus className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-2">
                    Créer un compte
                  </h2>
                  <p className="text-white/90">
                    Étape {currentStep} sur 2
                  </p>
                </div>
              </div>

              {/* Message d'erreur global */}
              {error && (
                <div className="mx-8 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-red-800 font-medium">Erreur d'inscription</p>
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                </div>
              )}

              {/* Formulaire */}
              <form className="p-8 space-y-6" onSubmit={handleSubmit}>
                {currentStep === 1 && (
                  <div className="space-y-6">
                    {/* Nom complet */}
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                        <span className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Nom complet
                        </span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className={`h-5 w-5 ${
                            errors.fullName ? 'text-red-400' : 
                            formData.fullName && !errors.fullName ? 'text-green-500' : 'text-gray-400'
                          }`} />
                        </div>
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          value={formData.fullName}
                          onChange={handleChange}
                          onBlur={() => handleBlur('fullName')}
                          className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-moroccan-green focus:border-transparent transition-all ${
                            errors.fullName 
                              ? 'border-red-300 bg-red-50' 
                              : formData.fullName && !errors.fullName
                              ? 'border-green-300 bg-green-50'
                              : 'border-gray-300'
                          }`}
                          placeholder="Ex: Ahmed El Mansouri"
                        />
                        {formData.fullName && !errors.fullName && (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          </div>
                        )}
                      </div>
                      {errors.fullName && touched.fullName && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Email universitaire */}
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
                            formData.email && !errors.email ? 'text-green-500' : 'text-gray-400'
                          }`} />
                        </div>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={() => handleBlur('email')}
                          className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-moroccan-green focus:border-transparent transition-all ${
                            errors.email 
                              ? 'border-red-300 bg-red-50' 
                              : formData.email && !errors.email
                              ? 'border-green-300 bg-green-50'
                              : 'border-gray-300'
                          }`}
                          placeholder="nom.prenom@universite.ac.ma"
                        />
                        {formData.email && !errors.email && (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          </div>
                        )}
                      </div>
                      {errors.email && touched.email && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.email}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        Utilisez votre email universitaire officiel (.ac.ma ou .edu.ma)
                      </p>
                    </div>

                    {/* Mot de passe */}
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
                            formData.password && !errors.password ? 'text-green-500' : 'text-gray-400'
                          }`} />
                        </div>
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={handleChange}
                          onBlur={() => handleBlur('password')}
                          className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-moroccan-green focus:border-transparent transition-all ${
                            errors.password 
                              ? 'border-red-300 bg-red-50' 
                              : formData.password && !errors.password
                              ? 'border-green-300 bg-green-50'
                              : 'border-gray-300'
                          }`}
                          placeholder="Minimum 8 caractères"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                          )}
                        </button>
                      </div>
                      {errors.password && touched.password && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.password}
                        </p>
                      )}
                      {formData.password && !errors.password && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">Force du mot de passe:</span>
                            <span className={`font-medium ${
                              passwordStrength.strength < 40 ? 'text-red-600' :
                              passwordStrength.strength < 70 ? 'text-yellow-600' :
                              'text-green-600'
                            }`}>
                              {passwordStrength.label}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all ${passwordStrength.color}`}
                              style={{ width: `${passwordStrength.strength}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Confirmation mot de passe */}
                    <div className="space-y-2">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        <span className="flex items-center gap-2">
                          <Lock className="h-4 w-4" />
                          Confirmer le mot de passe
                        </span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className={`h-5 w-5 ${
                            errors.confirmPassword ? 'text-red-400' : 
                            formData.confirmPassword && !errors.confirmPassword ? 'text-green-500' : 'text-gray-400'
                          }`} />
                        </div>
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          onBlur={() => handleBlur('confirmPassword')}
                          className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-moroccan-green focus:border-transparent transition-all ${
                            errors.confirmPassword 
                              ? 'border-red-300 bg-red-50' 
                              : formData.confirmPassword && !errors.confirmPassword
                              ? 'border-green-300 bg-green-50'
                              : 'border-gray-300'
                          }`}
                          placeholder="Retapez votre mot de passe"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && touched.confirmPassword && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.confirmPassword}
                        </p>
                      )}
                      {formData.confirmPassword && !errors.confirmPassword && formData.password === formData.confirmPassword && (
                        <p className="text-sm text-green-600 flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4" />
                          Les mots de passe correspondent
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    {/* Sélection de l'université */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        <span className="flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          Université
                        </span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {moroccanUniversities.map((uni) => (
                          <button
                            key={uni.id}
                            type="button"
                            onClick={() => handleUniversitySelect(uni)}
                            className={`p-4 rounded-lg border-2 text-left transition-all ${
                              formData.university === uni.id
                                ? 'border-moroccan-green bg-green-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-10 h-10 ${uni.color} rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                                {uni.name.split(' ')[1]?.substring(0, 2) || 'UN'}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-gray-900 text-sm line-clamp-2">{uni.name}</div>
                                <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                  <MapPin className="h-3 w-3" />
                                  {uni.city}
                                </div>
                              </div>
                              {formData.university === uni.id && (
                                <CheckCircle2 className="h-5 w-5 text-moroccan-green flex-shrink-0" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                      {errors.university && touched.university && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.university}
                        </p>
                      )}
                    </div>

                    {/* Sélection de la faculté */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        <span className="flex items-center gap-2">
                          <School className="h-4 w-4" />
                          Faculté / École
                        </span>
                      </label>
                      <div className="grid grid-cols-1 gap-2">
                        {moroccanFaculties.map((faculty) => (
                          <button
                            key={faculty.id}
                            type="button"
                            onClick={() => handleFacultySelect(faculty)}
                            className={`p-3 rounded-lg border-2 text-left transition-all ${
                              formData.faculty === faculty.id
                                ? 'border-moroccan-green bg-green-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{faculty.icon}</span>
                              <span className="flex-1 font-medium text-gray-900 text-sm">{faculty.name}</span>
                              {formData.faculty === faculty.id && (
                                <CheckCircle2 className="h-5 w-5 text-moroccan-green" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                      {errors.faculty && touched.faculty && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.faculty}
                        </p>
                      )}
                    </div>

                    {/* Niveau d'études */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        <span className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4" />
                          Niveau d'études
                        </span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {studyLevels.map((level) => (
                          <button
                            key={level.id}
                            type="button"
                            onClick={() => handleStudyLevelSelect(level)}
                            className={`p-3 rounded-lg border-2 text-center transition-all ${
                              formData.studyLevel === level.id
                                ? 'border-moroccan-green bg-green-50 text-moroccan-green'
                                : 'border-gray-200 hover:border-gray-300 text-gray-700'
                            }`}
                          >
                            <div className="font-semibold text-sm">{level.name}</div>
                            <div className="text-xs opacity-75">{level.level}</div>
                          </button>
                        ))}
                      </div>
                      {errors.studyLevel && touched.studyLevel && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.studyLevel}
                        </p>
                      )}
                    </div>

                    {/* Numéro étudiant (optionnel) */}
                    <div className="space-y-2">
                      <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">
                        <span className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Numéro étudiant (optionnel)
                        </span>
                      </label>
                      <input
                        id="studentId"
                        name="studentId"
                        type="text"
                        value={formData.studentId}
                        onChange={handleChange}
                        onBlur={() => handleBlur('studentId')}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-moroccan-green focus:border-transparent"
                        placeholder="Ex: CNE12345678"
                      />
                      {errors.studentId && touched.studentId && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.studentId}
                        </p>
                      )}
                    </div>

                    {/* Téléphone (optionnel) */}
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        <span className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Téléphone (optionnel)
                        </span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={() => handleBlur('phone')}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-moroccan-green focus:border-transparent"
                        placeholder="06 12 34 56 78"
                      />
                      {errors.phone && touched.phone && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Conditions d'utilisation */}
                    <div className="space-y-2">
                      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <input
                          id="acceptTerms"
                          name="acceptTerms"
                          type="checkbox"
                          checked={formData.acceptTerms}
                          onChange={handleChange}
                          className="mt-1 h-4 w-4 text-moroccan-green focus:ring-moroccan-green border-gray-300 rounded"
                        />
                        <label htmlFor="acceptTerms" className="text-sm text-gray-700">
                          J'accepte les <Link to="/terms" className="text-moroccan-green hover:underline font-medium">conditions d'utilisation</Link> et la <Link to="/privacy" className="text-moroccan-green hover:underline font-medium">politique de confidentialité</Link>
                        </label>
                      </div>
                      {errors.acceptTerms && touched.acceptTerms && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.acceptTerms}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Boutons de navigation */}
                <div className="flex gap-4">
                  {currentStep === 2 && (
                    <button
                      type="button"
                      onClick={handlePreviousStep}
                      className="flex-1 py-3 px-6 border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Retour
                    </button>
                  )}
                  
                  {currentStep === 1 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      disabled={!isStep1Valid()}
                      className={`flex-1 py-3 px-6 rounded-lg font-medium text-white transition-all flex items-center justify-center gap-2 ${
                        isStep1Valid()
                          ? 'bg-gradient-to-r from-moroccan-red to-moroccan-green hover:shadow-lg'
                          : 'bg-gray-300 cursor-not-allowed'
                      }`}
                    >
                      Continuer
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting || !isStep2Valid() || !formData.acceptTerms}
                      className={`flex-1 py-3 px-6 rounded-lg font-medium text-white transition-all flex items-center justify-center gap-2 ${
                        isSubmitting || !isStep2Valid() || !formData.acceptTerms
                          ? 'bg-gray-300 cursor-not-allowed'
                          : 'bg-gradient-to-r from-moroccan-red to-moroccan-green hover:shadow-lg'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader className="h-5 w-5 animate-spin" />
                          Création en cours...
                        </>
                      ) : (
                        <>
                          Créer mon compte
                          <UserPlus className="h-5 w-5" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>

              {/* Lien vers connexion */}
              <div className="px-8 pb-8">
                <div className="text-center text-sm text-gray-600">
                  Vous avez déjà un compte ?{' '}
                  <Link 
                    to="/login" 
                    className="font-medium text-moroccan-green hover:text-moroccan-green/80 transition-colors"
                  >
                    Connectez-vous
                  </Link>
                </div>
              </div>
            </div>

            {/* Sécurité et confidentialité */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Vos données sont protégées</p>
                  <p className="text-blue-700">
                    Nous utilisons un chiffrement de niveau bancaire pour protéger vos informations personnelles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
