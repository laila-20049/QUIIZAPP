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
  MapPin,
  Heart,
  Star,
  TrendingUp,
  Target,
  Flag,
  Globe as GlobeIcon,
  Bookmark,
  Compass,
  Lightbulb,
  Rocket,
  Crown,
  Medal,
  Sun,
  Moon,
  Coffee,
  Brain,
  Palette,
  Music,
  Gamepad2,
  Camera,
  Languages
} from 'lucide-react';

// Composants réutilisables pour réduire le code
const TextInput = ({
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  Icon,
  error,
  touched
}) => (
  <div className="space-y-3">
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Icon className={`h-5 w-5 transition-colors ${
          error ? 'text-red-500' : value && !error ? 'text-green-500' : 'text-gray-400 group-hover:text-blue-500'
        }`} />
      </div>
      <input
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`block w-full pl-12 pr-10 py-4 rounded-xl border-2 transition-all duration-300 focus:ring-0 focus:outline-none focus:border-blue-500 ${
          error
            ? 'border-red-300 bg-red-50'
            : value && !error
            ? 'border-green-300 bg-green-50'
            : 'border-gray-300 bg-gray-50 group-hover:border-blue-400'
        }`}
        placeholder={placeholder}
      />
      {value && !error && (
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        </div>
      )}
    </div>
    {error && touched && (
      <p className="text-sm text-red-600 flex items-center gap-2">
        <AlertCircle className="h-4 w-4" />
        {error}
      </p>
    )}
  </div>
);

const PasswordInput = ({
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  touched,
  show,
  toggleShow
}) => (
  <div className="space-y-3">
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Lock className={`h-5 w-5 transition-colors ${
          error ? 'text-red-500' : value && !error ? 'text-green-500' : 'text-gray-400 group-hover:text-blue-500'
        }`} />
      </div>
      <input
        name={name}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`block w-full pl-12 pr-12 py-4 rounded-xl border-2 transition-all duration-300 focus:ring-0 focus:outline-none focus:border-blue-500 ${
          error
            ? 'border-red-300 bg-red-50'
            : value && !error
            ? 'border-green-300 bg-green-50'
            : 'border-gray-300 bg-gray-50 group-hover:border-blue-400'
        }`}
        placeholder={placeholder}
      />
      <button type="button" onClick={toggleShow} className="absolute inset-y-0 right-0 pr-4 flex items-center">
        {show ? (
          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
        ) : (
          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
        )}
      </button>
    </div>
    {error && touched && (
      <p className="text-sm text-red-600 flex items-center gap-2">
        <AlertCircle className="h-4 w-4" />
        {error}
      </p>
    )}
  </div>
);

const SelectCard = ({ selected, onClick, children, className = '' }) => (
  <button
    type="button"
    onClick={onClick}
    className={`group p-4 rounded-2xl border-2 transition-all duration-300 ${
      selected
        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg'
        : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
    } ${className}`}
  >
    {children}
  </button>
);

const InterestPill = ({ selected, onClick, Icon, name, color }) => (
  <button
    type="button"
    onClick={onClick}
    className={`group p-4 rounded-xl border-2 transition-all duration-300 ${
      selected
        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg'
        : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
    }`}
  >
    <div className="flex flex-col items-center gap-2">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
        selected ? `bg-gradient-to-r ${color} text-white` : 'bg-gray-100 text-gray-600'
      }`}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="text-sm font-medium text-gray-900">{name}</div>
    </div>
  </button>
);

// Universités marocaines
const moroccanUniversities = [
  { id: 'um5', name: 'Université Mohammed V de Rabat', domain: '@um5.ac.ma', color: 'from-red-500 to-red-600', logo: '🦁', city: 'Rabat', students: '45K+' },
  { id: 'uh2c', name: 'Université Hassan II de Casablanca', domain: '@uh2c.ac.ma', color: 'from-blue-500 to-blue-600', logo: '🌊', city: 'Casablanca', students: '65K+' },
  { id: 'uca', name: 'Université Cadi Ayyad de Marrakech', domain: '@uca.ac.ma', color: 'from-green-500 to-green-600', logo: '🏛️', city: 'Marrakech', students: '38K+' },
  { id: 'uit', name: 'Université Ibn Tofail de Kénitra', domain: '@uit.ac.ma', color: 'from-purple-500 to-purple-600', logo: '📚', city: 'Kénitra', students: '32K+' },
  { id: 'uae', name: 'Université Abdelmalek Essaâdi', domain: '@uae.ac.ma', color: 'from-yellow-500 to-yellow-600', logo: '🌅', city: 'Tétouan', students: '28K+' },
  { id: 'usmba', name: 'Université Sidi Mohamed Ben Abdellah', domain: '@usmba.ac.ma', color: 'from-indigo-500 to-indigo-600', logo: '🕌', city: 'Fès', students: '42K+' },
  { id: 'uiz', name: 'Université Ibn Zohr', domain: '@uiz.ac.ma', color: 'from-pink-500 to-pink-600', logo: '🏖️', city: 'Agadir', students: '35K+' },
  { id:'ump', name: 'Université Mohammed Premier', domain: '@ump.ac.ma', color: 'from-orange-500 to-orange-600', logo: '🏜️', city: 'Oujda', students: '26K+' }
];

// Facultés marocaines
const moroccanFaculties = [
  { id: 'fst', name: 'Faculté des Sciences et Techniques', icon: '⚙️', color: 'from-green-100 to-green-200', textColor: 'text-green-800', popular: true },
  { id: 'fs', name: 'Faculté des Sciences', icon: '🔬', color: 'from-blue-100 to-blue-200', textColor: 'text-blue-800', popular: true },
  { id: 'fm', name: 'Faculté de Médecine et de Pharmacie', icon: '🏥', color: 'from-red-100 to-red-200', textColor: 'text-red-800' },
  { id: 'fd', name: 'Faculté de Droit', icon: '⚖️', color: 'from-purple-100 to-purple-200', textColor: 'text-purple-800' },
  { id: 'fl', name: 'Faculté des Lettres et Sciences Humaines', icon: '📚', color: 'from-yellow-100 to-yellow-200', textColor: 'text-yellow-800' },
  { id: 'fseg', name: 'Faculté des Sciences Économiques et de Gestion', icon: '📈', color: 'from-indigo-100 to-indigo-200', textColor: 'text-indigo-800' },
  { id: 'ensam', name: 'ENSAM - École Nationale Supérieure', icon: '🏭', color: 'from-gray-100 to-gray-200', textColor: 'text-gray-800' },
  { id: 'ensa', name: 'ENSA - École Nationale des Sciences Appliquées', icon: '💻', color: 'from-teal-100 to-teal-200', textColor: 'text-teal-800', popular: true }
];

// Niveaux d'études
const studyLevels = [
  { id: 's1', name: 'Semestre 1', level: 'L1', emoji: '🆕', color: 'from-blue-100 to-blue-200' },
  { id: 's2', name: 'Semestre 2', level: 'L1', emoji: '📚', color: 'from-blue-200 to-blue-300' },
  { id: 's3', name: 'Semestre 3', level: 'L2', emoji: '📖', color: 'from-green-100 to-green-200' },
  { id: 's4', name: 'Semestre 4', level: 'L2', emoji: '🎯', color: 'from-green-200 to-green-300' },
  { id: 's5', name: 'Semestre 5', level: 'L3', emoji: '🏆', color: 'from-purple-100 to-purple-200' },
  { id: 's6', name: 'Semestre 6', level: 'L3', emoji: '🎓', color: 'from-purple-200 to-purple-300' },
  { id: 'm1', name: 'Master 1', level: 'M1', emoji: '🔬', color: 'from-red-100 to-red-200' },
  { id: 'm2', name: 'Master 2', level: 'M2', emoji: '💼', color: 'from-red-200 to-red-300' }
];

// Centres d'intérêt
const interests = [
  { id: 'science', name: 'Sciences', icon: Brain, color: 'from-blue-500 to-blue-600' },
  { id: 'tech', name: 'Technologie', icon: Zap, color: 'from-purple-500 to-purple-600' },
  { id: 'art', name: 'Arts & Design', icon: Palette, color: 'from-pink-500 to-pink-600' },
  { id: 'music', name: 'Musique', icon: Music, color: 'from-green-500 to-green-600' },
  { id: 'sports', name: 'Sports', icon: Trophy, color: 'from-orange-500 to-orange-600' },
  { id: 'games', name: 'Jeux', icon: Gamepad2, color: 'from-red-500 to-red-600' },
  { id: 'photo', name: 'Photographie', icon: Camera, color: 'from-teal-500 to-teal-600' },
  { id: 'languages', name: 'Langues', icon: Languages, color: 'from-indigo-500 to-indigo-600' },
  { id: 'travel', name: 'Voyage', icon: Compass, color: 'from-yellow-500 to-yellow-600' },
  { id: 'books', name: 'Lecture', icon: BookOpen, color: 'from-blue-500 to-blue-600' }
];

export default function Register() {
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
    interests: [],
    acceptTerms: false,
    newsletter: true
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [academicInfo, setAcademicInfo] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const { register, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setAnimateIn(true);
    clearError();
  }, [clearError]);

  useEffect(() => {
    // Auto-remplir le domaine email si une université est sélectionnée
    if (formData.university && !formData.email.includes('@')) {
      const selectedUni = moroccanUniversities.find(u => u.id === formData.university);
      if (selectedUni) {
        setFormData(prev => ({
          ...prev,
          email: prev.email.split('@')[0] + selectedUni.domain
        }));
      }
    }
  }, [formData.university]);

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
    
    // Clear status messages when user edits form
    if (successMessage) {
      setSuccessMessage('');
    }
    if (submitError) {
      setSubmitError('');
    }
    
    setFormData(prev => ({ 
      ...prev, 
      [name]: newValue
    }));
    
    if (touched[name]) {
      validateField(name, newValue);
    }
    
    if (name === 'password' && formData.confirmPassword) {
      validateField('confirmPassword', formData.confirmPassword);
    }
  };

  const handleUniversitySelect = (university) => {
    setFormData(prev => ({ ...prev, university: university.id }));
    setTouched(prev => ({ ...prev, university: true }));
    validateField('university', university.id);
    
    // Auto-remplir le domaine email
    if (!formData.email.includes('@')) {
      setFormData(prev => ({
        ...prev,
        email: prev.email.split('@')[0] + university.domain
      }));
    }
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

  const toggleInterest = (interestId) => {
    setSelectedInterests(prev => 
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 15;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 10;
    
    if (strength < 40) return { strength, label: 'Faible', color: 'from-red-500 to-red-600' };
    if (strength < 70) return { strength, label: 'Moyen', color: 'from-yellow-500 to-yellow-600' };
    return { strength, label: 'Fort', color: 'from-green-500 to-green-600' };
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
      const fields = ['fullName', 'email', 'password', 'confirmPassword'];
      fields.forEach(field => {
        setTouched(prev => ({ ...prev, [field]: true }));
        validateField(field, formData[field]);
      });
      
      if (isStep1Valid()) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      const fields = ['university', 'faculty', 'studyLevel'];
      fields.forEach(field => {
        setTouched(prev => ({ ...prev, [field]: true }));
        validateField(field, formData[field]);
      });
      
      if (isStep2Valid()) {
        // Préparer les infos académiques pour la synthèse
        const uni = moroccanUniversities.find(u => u.id === formData.university);
        const fac = moroccanFaculties.find(f => f.id === formData.faculty);
        const level = studyLevels.find(l => l.id === formData.studyLevel);
        
        setAcademicInfo({
          university: uni?.name,
          faculty: fac?.name,
          level: level?.name,
          logo: uni?.logo,
          color: uni?.color
        });
        
        setCurrentStep(3);
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else if (currentStep === 3) {
      setCurrentStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSuccessMessage('');

    // Forcer la validation finale
    setTouched(prev => ({ ...prev, acceptTerms: true }));
    validateField('acceptTerms', formData.acceptTerms);

    if (!isStep1Valid()) {
      setCurrentStep(1);
      return;
    }

    if (!isStep2Valid()) {
      setCurrentStep(2);
      return;
    }

    if (!formData.acceptTerms) {
      setCurrentStep(3);
      return;
    }

    setIsSubmitting(true);
    clearError();

    const payload = {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      university: formData.university,
      faculty: formData.faculty,
      studyLevel: formData.studyLevel,
      studentId: formData.studentId || undefined,
      phone: formData.phone || undefined,
      interests: selectedInterests,
      newsletter: formData.newsletter,
    };

    try {
      const result = await register(payload);

      if (result?.success) {
        setRegistrationSuccess(true);
        setSuccessMessage('🎉 Votre compte a été créé avec succès !');
        setTimeout(() => navigate('/dashboard'), 1200);
      } else {
        const message = result?.error || 'Impossible de créer le compte pour le moment.';
        setSubmitError(message);
      }
    } catch (err) {
      setSubmitError(err?.message || 'Une erreur inattendue est survenue.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const stats = [
    { number: '75K+', label: 'Étudiants actifs', icon: Users, color: 'from-blue-500 to-blue-600', description: 'Communauté grandissante' },
    { number: '850+', label: 'Quiz disponibles', icon: BookOpen, color: 'from-green-500 to-green-600', description: 'Toutes spécialités' },
    { number: '97%', label: 'Taux de réussite', icon: Trophy, color: 'from-yellow-500 to-yellow-600', description: 'Meilleurs résultats' },
    { number: '4.8', label: 'Satisfaction', icon: Star, color: 'from-purple-500 to-purple-600', description: 'Note moyenne' }
  ];

  const steps = [
    { number: 1, title: 'Identité', icon: User, description: 'Informations personnelles' },
    { number: 2, title: 'Académique', icon: GraduationCap, description: 'Profil universitaire' },
    { number: 3, title: 'Personnalisation', icon: Heart, description: 'Centres d\'intérêt' }
  ];

  if (registrationSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl p-10 text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 opacity-20 blur-3xl rounded-full -z-10"></div>
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-100 to-green-200 rounded-2xl mb-6">
              <CheckCircle2 className="h-14 w-14 text-green-600 animate-pulse" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Bienvenue à bord !
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Votre compte a été créé avec succès. Préparez-vous à une aventure d'apprentissage unique.
          </p>
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <Loader className="h-6 w-6 text-green-600 animate-spin" />
              <span className="text-gray-700 font-medium">Redirection vers la connexion...</span>
            </div>
            <div className="text-sm text-gray-500">Veuillez patienter quelques instants</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className={`max-w-7xl mx-auto transition-all duration-700 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Navigation */}
        <div className="flex items-center justify-between mb-12">
          <Link to="/" className="group">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <div className="relative p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl transform group-hover:scale-105 transition-transform duration-300">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Moroccan University Quiz
                </div>
                <div className="text-sm text-gray-600 font-medium">Plateforme officielle</div>
              </div>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="text-sm text-gray-600">
              Déjà inscrit ?
            </div>
            <Link 
              to="/login" 
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Se connecter
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Colonne de gauche - Présentation */}
          <div className="space-y-10">
            {/* Hero Section */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-blue-200 px-5 py-2 rounded-full text-blue-700 font-medium">
                <Rocket className="h-5 w-5" />
                <span>Nouveau : Recommandations personnalisées</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Rejoignez la plus grande <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">communauté étudiante</span> du Maroc
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Créez votre compte et accédez à des centaines de quiz universitaires, des compétitions passionnantes et une communauté d'apprentissage unique.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={index}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                        <div className="text-sm font-semibold text-gray-700">{stat.label}</div>
                        <div className="text-xs text-gray-500">{stat.description}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Features */}
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg border border-blue-100 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-yellow-500" />
                Pourquoi nous choisir ?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { 
                    icon: Target, 
                    title: 'Quiz personnalisés', 
                    description: 'Adaptés à votre université et niveau', 
                    color: 'text-blue-600' 
                  },
                  { 
                    icon: TrendingUp, 
                    title: 'Progression intelligente', 
                    description: 'Suivez votre évolution en temps réel', 
                    color: 'text-green-600' 
                  },
                  { 
                    icon: Trophy, 
                    title: 'Compétitions', 
                    description: 'Affrontez d\'autres étudiants', 
                    color: 'text-yellow-600' 
                  },
                  { 
                    icon: Shield, 
                    title: 'Données sécurisées', 
                    description: 'Chiffrement de niveau bancaire', 
                    color: 'text-purple-600' 
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br from-${feature.color.split('-')[1]}-100 to-${feature.color.split('-')[1]}-200`}>
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 mb-1">{feature.title}</div>
                      <div className="text-sm text-gray-600">{feature.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-32 translate-x-32"></div>
              <div className="relative p-8 text-white">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl">
                    👨‍🎓
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-300 fill-current" />
                      ))}
                    </div>
                    <p className="text-lg italic mb-4">
                      "Cette plateforme a révolutionné ma façon d'apprendre. Les quiz sont parfaitement alignés avec le programme national et la communauté est incroyablement motivante !"
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold">Fatima Zahra El Amrani</div>
                        <div className="text-blue-200 text-sm">Étudiante en M1 - FST Settat</div>
                      </div>
                      <div className="text-4xl opacity-50">"</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne de droite - Formulaire */}
          <div className="space-y-8">
            {/* Progress Steps */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-8">
                {steps.map((step, index) => (
                  <React.Fragment key={step.number}>
                    <div className="flex flex-col items-center z-10">
                      <div className={`relative w-14 h-14 rounded-full flex items-center justify-center border-2 shadow-lg transition-all duration-500 ${
                        currentStep >= step.number
                          ? 'border-transparent bg-gradient-to-r from-blue-500 to-purple-600 text-white scale-110'
                          : 'border-gray-300 bg-white text-gray-400'
                      }`}>
                        <step.icon className="h-6 w-6" />
                        {currentStep >= step.number && (
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                            <CheckCircle2 className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="text-center mt-3">
                        <div className={`text-sm font-bold ${
                          currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          Étape {step.number}
                        </div>
                        <div className="text-xs text-gray-500">{step.title}</div>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-1 mx-4 transition-all duration-500 ${
                        currentStep > step.number ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-green-200 text-green-800 rounded-full text-sm font-medium">
                  <Zap className="h-4 w-4" />
                  Progression: {Math.round((currentStep / 3) * 100)}%
                </div>
              </div>
            </div>

            {/* Formulaire Card */}
            <form onSubmit={handleSubmit} className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 p-8 text-center overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{backgroundImage: `url('data:image/svg+xml,%3Csvg width="20" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 10 0 L 0 0 0 10" fill="none" stroke="white" stroke-width="0.5" opacity="0.1"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23smallGrid)"/%3E%3C/svg%3E')`}}></div>
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 border border-white/30">
                    <UserPlus className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-3">
                    {currentStep === 1 ? 'Créez votre compte' : 
                     currentStep === 2 ? 'Votre profil académique' : 
                     'Personnalisez votre expérience'}
                  </h2>
                  <p className="text-blue-100 text-lg">
                    {currentStep === 1 ? 'Commencez par vos informations de base' : 
                     currentStep === 2 ? 'Sélectionnez votre établissement' : 
                     'Dites-nous ce qui vous intéresse'}
                  </p>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mx-8 mt-8 p-4 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-2xl flex items-start gap-4">
                  <div className="p-2 bg-gradient-to-r from-red-500 to-red-600 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-red-800 mb-1">Erreur d'inscription</p>
                    <p className="text-red-600">{error}</p>
                  </div>
                </div>
              )}

              {/* Form Content */}
              <div className="p-8">
                {currentStep === 1 && (
                  <div className="space-y-8">
                    {/* Full Name */}
                    <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <User className="h-5 w-5 text-blue-600" />
                      Nom complet
                    </label>
                    <TextInput
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      onBlur={() => handleBlur('fullName')}
                      placeholder="Ex: Ahmed El Mansouri"
                      Icon={User}
                      error={errors.fullName}
                      touched={touched.fullName}
                    />

                    {/* Email */}
                    <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Mail className="h-5 w-5 text-blue-600" />
                      Email universitaire
                    </label>
                    <TextInput
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur('email')}
                      placeholder="nom.prenom@universite.ac.ma"
                      Icon={Mail}
                      error={errors.email}
                      touched={touched.email}
                    />
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Shield className="h-3 w-3" />
                      Uniquement les emails universitaires (.ac.ma ou .edu.ma)
                    </div>

                    {/* Password */}
                    <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Lock className="h-5 w-5 text-blue-600" />
                      Mot de passe
                    </label>
                    <PasswordInput
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={() => handleBlur('password')}
                      placeholder="Minimum 8 caractères"
                      error={errors.password}
                      touched={touched.password}
                      show={showPassword}
                      toggleShow={() => setShowPassword(!showPassword)}
                    />
                      
                      {formData.password && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Force du mot de passe</span>
                            <span className={`text-sm font-bold ${
                              passwordStrength.strength < 40 ? 'text-red-600' :
                              passwordStrength.strength < 70 ? 'text-yellow-600' :
                              'text-green-600'
                            }`}>
                              {passwordStrength.label}
                            </span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full bg-gradient-to-r ${passwordStrength.color} transition-all duration-500`}
                              style={{ width: `${passwordStrength.strength}%` }}
                            />
                          </div>
                          <div className="grid grid-cols-4 gap-2 text-xs">
                            {['8 caractères', 'Majuscule', 'Chiffre', 'Spécial'].map((req, i) => (
                              <div key={i} className="text-center">
                                <div className={`inline-flex items-center justify-center w-5 h-5 rounded-full mb-1 ${
                                  i === 0 && formData.password.length >= 8 ? 'bg-green-100 text-green-600' :
                                  i === 1 && /[A-Z]/.test(formData.password) ? 'bg-green-100 text-green-600' :
                                  i === 2 && /\d/.test(formData.password) ? 'bg-green-100 text-green-600' :
                                  i === 3 && /[!@#$%^&*]/.test(formData.password) ? 'bg-green-100 text-green-600' :
                                  'bg-gray-100 text-gray-400'
                                }`}>
                                  {i === 0 && formData.password.length >= 8 ? '✓' :
                                   i === 1 && /[A-Z]/.test(formData.password) ? '✓' :
                                   i === 2 && /\d/.test(formData.password) ? '✓' :
                                   i === 3 && /[!@#$%^&*]/.test(formData.password) ? '✓' : '•'}
                                </div>
                                <div className="text-gray-500">{req}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Lock className="h-5 w-5 text-blue-600" />
                      Confirmer le mot de passe
                    </label>
                    <PasswordInput
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onBlur={() => handleBlur('confirmPassword')}
                      placeholder="Retapez votre mot de passe"
                      error={errors.confirmPassword}
                      touched={touched.confirmPassword}
                      show={showConfirmPassword}
                      toggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                    {formData.confirmPassword && !errors.confirmPassword && (
                      <p className="text-sm text-green-600 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Les mots de passe correspondent parfaitement
                      </p>
                    )}
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-8">
                    {/* Universities */}
                    <div className="space-y-4">
                      <label className="block text-lg font-bold text-gray-900">
                        <span className="flex items-center gap-3">
                          <Building className="h-6 w-6 text-blue-600" />
                          Sélectionnez votre université
                        </span>
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {moroccanUniversities.map((uni) => (
                          <SelectCard
                            key={uni.id}
                            selected={formData.university === uni.id}
                            onClick={() => handleUniversitySelect(uni)}
                            className="relative text-left overflow-hidden"
                          >
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                              {formData.university === uni.id ? (
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                                  <CheckCircle2 className="h-5 w-5 text-white" />
                                </div>
                              ) : (
                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                                </div>
                              )}
                            </div>
                            <div className="flex items-start gap-4">
                              <div className={`w-14 h-14 ${uni.color} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                                {uni.logo}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-bold text-gray-900 mb-1 line-clamp-2">{uni.name}</div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <MapPin className="h-3 w-3" />
                                  {uni.city}
                                </div>
                                <div className="text-xs text-gray-500 mt-2">{uni.students} étudiants</div>
                              </div>
                            </div>
                          </SelectCard>
                        ))}
                      </div>
                      {errors.university && touched.university && (
                        <p className="text-sm text-red-600 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          {errors.university}
                        </p>
                      )}
                    </div>

                    {/* Faculties */}
                    <div className="space-y-4">
                      <label className="block text-lg font-bold text-gray-900">
                        <span className="flex items-center gap-3">
                          <School className="h-6 w-6 text-blue-600" />
                          Votre faculté / école
                        </span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {moroccanFaculties.map((faculty) => (
                          <SelectCard
                            key={faculty.id}
                            selected={formData.faculty === faculty.id}
                            onClick={() => handleFacultySelect(faculty)}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 ${faculty.color} rounded-lg flex items-center justify-center text-xl`}>
                                {faculty.icon}
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-gray-900 text-sm">{faculty.name}</div>
                                {faculty.popular && (
                                  <div className="inline-flex items-center gap-1 mt-1 text-xs text-blue-600">
                                    <TrendingUp className="h-3 w-3" />
                                    Populaire
                                  </div>
                                )}
                              </div>
                              {formData.faculty === faculty.id && (
                                <CheckCircle2 className="h-5 w-5 text-blue-500" />
                              )}
                            </div>
                          </SelectCard>
                        ))}
                      </div>
                      {errors.faculty && touched.faculty && (
                        <p className="text-sm text-red-600 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          {errors.faculty}
                        </p>
                      )}
                    </div>

                    {/* Study Level */}
                    <div className="space-y-4">
                      <label className="block text-lg font-bold text-gray-900">
                        <span className="flex items-center gap-3">
                          <GraduationCap className="h-6 w-6 text-blue-600" />
                          Niveau d'études
                        </span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {studyLevels.map((level) => (
                          <SelectCard
                            key={level.id}
                            selected={formData.studyLevel === level.id}
                            onClick={() => handleStudyLevelSelect(level)}
                            className="text-center"
                          >
                            <div className="text-2xl mb-2">{level.emoji}</div>
                            <div className="font-bold text-gray-900 text-sm">{level.name}</div>
                            <div className="text-xs text-gray-500 mt-1">{level.level}</div>
                          </SelectCard>
                        ))}
                      </div>
                      {errors.studyLevel && touched.studyLevel && (
                        <p className="text-sm text-red-600 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          {errors.studyLevel}
                        </p>
                      )}
                    </div>

                    {/* Additional Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-900">
                          <span className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-600" />
                            Numéro étudiant (optionnel)
                          </span>
                        </label>
                        <input
                          name="studentId"
                          value={formData.studentId}
                          onChange={handleChange}
                          onBlur={() => handleBlur('studentId')}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-0"
                          placeholder="CNE12345678"
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-900">
                          <span className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-blue-600" />
                            Téléphone (optionnel)
                          </span>
                        </label>
                        <input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          onBlur={() => handleBlur('phone')}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-0"
                          placeholder="06 12 34 56 78"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-8">
                    {/* Academic Summary */}
                    {academicInfo && (
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-3">
                          <GraduationCap className="h-5 w-5 text-blue-600" />
                          Résumé de votre profil académique
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div className={`w-16 h-16 ${academicInfo.color} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                              {academicInfo.logo}
                            </div>
                            <div>
                              <div className="font-bold text-gray-900 text-lg">{academicInfo.university}</div>
                              <div className="text-gray-600">{academicInfo.faculty} • {academicInfo.level}</div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            Ces informations nous aident à personnaliser votre expérience et à vous recommander des quiz adaptés.
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Interests */}
                    <div className="space-y-4">
                      <label className="block text-lg font-bold text-gray-900">
                        <span className="flex items-center gap-3">
                          <Heart className="h-6 w-6 text-pink-600" />
                          Vos centres d'intérêt
                        </span>
                      </label>
                      <p className="text-gray-600">
                        Sélectionnez vos centres d'intérêt pour recevoir des recommandations personnalisées
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                        {interests.map((interest) => (
                          <InterestPill
                            key={interest.id}
                            selected={selectedInterests.includes(interest.id)}
                            onClick={() => toggleInterest(interest.id)}
                            Icon={interest.icon}
                            name={interest.name}
                            color={interest.color}
                          />
                        ))}
                      </div>
                      {selectedInterests.length > 0 && (
                        <div className="text-sm text-green-600 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          {selectedInterests.length} centre(s) d'intérêt sélectionné(s)
                        </div>
                      )}
                    </div>

                    {/* Newsletter & Terms */}
                    <div className="space-y-4">
                      <label className="flex items-start gap-4 p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer">
                        <input
                          name="newsletter"
                          type="checkbox"
                          checked={formData.newsletter}
                          onChange={handleChange}
                          className="mt-1 h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                        />
                        <div>
                          <div className="font-medium text-gray-900">Recevoir des nouveautés</div>
                          <div className="text-sm text-gray-600 mt-1">
                            Soyez informé des nouveaux quiz, compétitions et fonctionnalités
                          </div>
                        </div>
                      </label>
                      
                      <label className="flex items-start gap-4 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 cursor-pointer">
                        <input
                          name="acceptTerms"
                          type="checkbox"
                          checked={formData.acceptTerms}
                          onChange={handleChange}
                          onBlur={() => handleBlur('acceptTerms')}
                          className="mt-1 h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-blue-300"
                        />
                        <div>
                          <div className="font-medium text-gray-900">J'accepte les conditions</div>
                          <div className="text-sm text-gray-700 mt-1">
                            Je reconnais avoir lu et accepté les{' '}
                            <Link to="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
                              conditions d'utilisation
                            </Link>{' '}
                            et la{' '}
                            <Link to="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
                              politique de confidentialité
                            </Link>
                          </div>
                          {errors.acceptTerms && touched.acceptTerms && (
                            <p className="text-sm text-red-600 flex items-center gap-2 mt-2">
                              <AlertCircle className="h-4 w-4" />
                              {errors.acceptTerms}
                            </p>
                          )}
                        </div>
                      </label>
                    </div>

                    {/* Security Info */}
                    <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-green-600" />
                        <div className="text-sm text-green-800">
                          <span className="font-bold">Vos données sont sécurisées</span> avec un chiffrement de niveau bancaire.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Success Message */}
                {successMessage && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-xl p-4 flex items-center gap-3 animate-bounce">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-green-800 font-bold text-lg">{successMessage}</p>
                    </div>
                  </div>
                )}

                {submitError && (
                  <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-500 rounded-xl p-4 text-red-700">
                    {submitError}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4 pt-8">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handlePreviousStep}
                      className="flex-1 py-4 px-6 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
                    >
                      Retour
                    </button>
                  )}
                  
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      disabled={
                        (currentStep === 1 && !isStep1Valid()) ||
                        (currentStep === 2 && !isStep2Valid())
                      }
                      className={`flex-1 py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
                        (currentStep === 1 && !isStep1Valid()) || (currentStep === 2 && !isStep2Valid())
                          ? 'bg-gray-300 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-xl hover:-translate-y-1'
                      }`}
                    >
                      <span>Continuer</span>
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.acceptTerms}
                      className={`flex-1 py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
                        isSubmitting || !formData.acceptTerms
                          ? 'bg-gray-300 cursor-not-allowed'
                          : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-xl hover:-translate-y-1'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader className="h-5 w-5 animate-spin" />
                          Création en cours...
                        </>
                      ) : (
                        <>
                          <UserPlus className="h-5 w-5" />
                          Créer mon compte
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Login Link */}
              <div className="px-8 pb-8 text-center">
                <div className="text-gray-600">
                  Vous avez déjà un compte ?{' '}
                  <Link 
                    to="/login" 
                    className="font-bold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Connectez-vous ici
                  </Link>
                </div>
              </div>
            </form>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
                <div className="text-2xl font-bold text-gray-900 mb-1">100%</div>
                <div className="text-sm text-gray-600">Gratuit</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
                <div className="text-2xl font-bold text-gray-900 mb-1">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
          <p>© 2025 Moroccan University Quiz. Tous droits réservés.</p>
          <p className="mt-2">Plateforme officielle des universités marocaines.</p>
        </div>
      </div>
    </div>
  );
};