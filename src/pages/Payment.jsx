import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  CreditCard, 
  Lock, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Key,
  Sparkles,
  Zap,
  Clock,
  ShieldCheck,
  BadgeCheck,
  Receipt,
  Smartphone,
  Wallet,
  QrCode,
  Banknote,
  ChevronRight,
  Info
} from 'lucide-react';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { quiz, user } = location.state || {};

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState('card'); // 'card', 'mobile', 'wallet', 'bank'
  const [formData, setFormData] = useState({
    // Informations personnelles
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    
    // Informations de carte
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    
    // Conditions
    acceptTerms: false,
    newsletter: true
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSecurity, setShowSecurity] = useState(true);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === 'checkbox' ? checked : value;

    // Formatage automatique du numéro de carte
    if (name === 'cardNumber') {
      newValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (newValue.replace(/\s/g, '').length > 16) return;
    }

    // Formatage du CVV
    if (name === 'cvv' && value.length > 3) return;

    // Formatage du téléphone
    if (name === 'phone') {
      newValue = value.replace(/[^0-9+]/g, '');
      if (newValue.length > 13) return;
    }

    setFormData(prev => ({ ...prev, [name]: newValue }));
    
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = 'Le prénom est requis';
    if (!formData.lastName) newErrors.lastName = 'Le nom est requis';
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    if (!formData.phone) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (!/^(\+212|0)[5-7][0-9]{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Format de téléphone marocain invalide';
    }
    if (!formData.address) newErrors.address = 'L\'adresse est requise';
    if (!formData.city) newErrors.city = 'La ville est requise';
    if (!formData.postalCode) newErrors.postalCode = 'Le code postal est requis';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (selectedMethod === 'card') {
      if (!formData.cardNumber) {
        newErrors.cardNumber = 'Le numéro de carte est requis';
      } else if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
        newErrors.cardNumber = 'Le numéro de carte doit contenir 16 chiffres';
      }
      if (!formData.cardName) newErrors.cardName = 'Le nom sur la carte est requis';
      if (!formData.expiryMonth) newErrors.expiryMonth = 'Le mois d\'expiration est requis';
      if (!formData.expiryYear) newErrors.expiryYear = 'L\'année d\'expiration est requise';
      if (!formData.cvv) {
        newErrors.cvv = 'Le CVV est requis';
      } else if (formData.cvv.length !== 3) {
        newErrors.cvv = 'Le CVV doit contenir 3 chiffres';
      }
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Vous devez accepter les conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep2()) return;

    setIsProcessing(true);

    // Simulation du traitement du paiement
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep(3); // Page de succès
    }, 2000);
  };

  const getCardType = (number) => {
    const cleaned = number.replace(/\s/g, '');
    if (/^4/.test(cleaned)) return { name: 'Visa', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (/^5[1-5]/.test(cleaned)) return { name: 'Mastercard', color: 'text-red-600', bg: 'bg-red-100' };
    if (/^3[47]/.test(cleaned)) return { name: 'Amex', color: 'text-teal-600', bg: 'bg-teal-100' };
    return null;
  };

  const months = [
    { value: '01', label: '01 - Janvier' },
    { value: '02', label: '02 - Février' },
    { value: '03', label: '03 - Mars' },
    { value: '04', label: '04 - Avril' },
    { value: '05', label: '05 - Mai' },
    { value: '06', label: '06 - Juin' },
    { value: '07', label: '07 - Juillet' },
    { value: '08', label: '08 - Août' },
    { value: '09', label: '09 - Septembre' },
    { value: '10', label: '10 - Octobre' },
    { value: '11', label: '11 - Novembre' },
    { value: '12', label: '12 - Décembre' }
  ];

  const years = Array.from({ length: 10 }, (_, i) => {
    const year = new Date().getFullYear() + i;
    return { value: year.toString(), label: year.toString() };
  });

  const paymentMethods = [
    {
      id: 'card',
      name: 'Carte Bancaire',
      icon: CreditCard,
      description: 'Visa, Mastercard, Amex',
      popular: true
    },
    {
      id: 'mobile',
      name: 'Paiement Mobile',
      icon: Smartphone,
      description: 'Jawal Pay, Cmi, Inwi Money',
      popular: true
    },
    {
      id: 'wallet',
      name: 'Portefeuille Électronique',
      icon: Wallet,
      description: 'PayPal, Payoneer, Skrill'
    },
    {
      id: 'bank',
      name: 'Virement Bancaire',
      icon: Banknote,
      description: 'CIH, Attijari, BMCE'
    }
  ];

  const securityFeatures = [
    { icon: ShieldCheck, text: 'Chiffrement SSL 256-bit' },
    { icon: Lock, text: 'Données cryptées' },
    { icon: BadgeCheck, text: 'Certifié PCI DSS' },
    { icon: Zap, text: 'Paiement instantané' }
  ];

  if (currentStep === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center animate-fadeIn">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full blur-2xl opacity-20"></div>
            <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mb-6">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Paiement Réussi !
            </span>
          </h2>
          <p className="text-gray-600 mb-8">
            Votre paiement a été traité avec succès. Vous pouvez maintenant accéder au quiz premium.
          </p>
          
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 mb-8 border border-gray-200 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Quiz:</span>
                <span className="font-semibold text-gray-900">{quiz?.title || 'Quiz Premium'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Référence:</span>
                <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                  {`PAY-${Date.now().toString().slice(-8)}`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Montant:</span>
                <span className="font-bold text-lg text-emerald-600">99 MAD</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Date:</span>
                <span className="font-semibold text-gray-900">
                  {new Date().toLocaleDateString('fr-FR')}
                </span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => navigate(quiz ? `/quiz/${quiz.id}` : '/quizzes')}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <Zap className="h-5 w-5" />
              Commencer le Quiz
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all"
            >
              Voir mes achats
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Un reçu a été envoyé à {formData.email || user?.email}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Retour au quiz
          </button>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Finalisez votre <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">commande</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Accédez immédiatement au quiz premium avec un paiement 100% sécurisé
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 font-bold transition-all duration-300 ${
                  step === currentStep
                    ? 'border-blue-600 bg-blue-600 text-white scale-110 shadow-lg'
                    : step < currentStep
                    ? 'border-green-500 bg-green-500 text-white'
                    : 'border-gray-300 bg-white text-gray-400'
                }`}>
                  {step < currentStep ? <CheckCircle className="h-6 w-6" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-24 h-1 mx-4 transition-all duration-300 ${
                    step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-24 mt-4">
            <span className={`text-sm font-medium ${
              currentStep >= 1 ? 'text-blue-600' : 'text-gray-500'
            }`}>Informations</span>
            <span className={`text-sm font-medium ${
              currentStep >= 2 ? 'text-blue-600' : 'text-gray-500'
            }`}>Paiement</span>
            <span className={`text-sm font-medium ${
              currentStep >= 3 ? 'text-blue-600' : 'text-gray-500'
            }`}>Confirmation</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulaire */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Sparkles className="h-7 w-7" />
                  {currentStep === 1 ? 'Informations Personnelles' : 'Informations de Paiement'}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-8">
                {currentStep === 1 && (
                  <div className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <User className="h-4 w-4 inline mr-2" />
                          Prénom
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
                            errors.firstName 
                              ? 'border-red-500 bg-red-50' 
                              : formData.firstName
                              ? 'border-green-400 bg-green-50'
                              : 'border-gray-300'
                          }`}
                          placeholder="Votre prénom"
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.firstName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <User className="h-4 w-4 inline mr-2" />
                          Nom
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
                            errors.lastName 
                              ? 'border-red-500 bg-red-50' 
                              : formData.lastName
                              ? 'border-green-400 bg-green-50'
                              : 'border-gray-300'
                          }`}
                          placeholder="Votre nom"
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Mail className="h-4 w-4 inline mr-2" />
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
                            errors.email 
                              ? 'border-red-500 bg-red-50' 
                              : formData.email
                              ? 'border-green-400 bg-green-50'
                              : 'border-gray-300'
                          }`}
                          placeholder="ex: nom@email.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Phone className="h-4 w-4 inline mr-2" />
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
                            errors.phone 
                              ? 'border-red-500 bg-red-50' 
                              : formData.phone
                              ? 'border-green-400 bg-green-50'
                              : 'border-gray-300'
                          }`}
                          placeholder="+212 6 12 34 56 78"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="h-4 w-4 inline mr-2" />
                        Adresse
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
                          errors.address 
                            ? 'border-red-500 bg-red-50' 
                            : formData.address
                            ? 'border-green-400 bg-green-50'
                            : 'border-gray-300'
                        }`}
                        placeholder="Votre adresse complète"
                      />
                      {errors.address && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.address}
                        </p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ville
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
                            errors.city 
                              ? 'border-red-500 bg-red-50' 
                              : formData.city
                              ? 'border-green-400 bg-green-50'
                              : 'border-gray-300'
                          }`}
                          placeholder="Casablanca"
                        />
                        {errors.city && (
                          <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.city}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Code Postal
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
                            errors.postalCode 
                              ? 'border-red-500 bg-red-50' 
                              : formData.postalCode
                              ? 'border-green-400 bg-green-50'
                              : 'border-gray-300'
                          }`}
                          placeholder="20000"
                        />
                        {errors.postalCode && (
                          <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.postalCode}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pays
                        </label>
                        <div className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50">
                          <span className="text-gray-700">Maroc 🇲🇦</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-3"
                    >
                      Continuer vers le paiement
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-8">
                    {/* Sélection de méthode de paiement */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Choisissez votre méthode de paiement
                      </h3>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {paymentMethods.map((method) => {
                          const Icon = method.icon;
                          return (
                            <button
                              key={method.id}
                              type="button"
                              onClick={() => setSelectedMethod(method.id)}
                              className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                                selectedMethod === method.id
                                  ? 'border-blue-500 bg-blue-50 shadow-md'
                                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${
                                  selectedMethod === method.id ? 'bg-blue-100' : 'bg-gray-100'
                                }`}>
                                  <Icon className={`h-5 w-5 ${
                                    selectedMethod === method.id ? 'text-blue-600' : 'text-gray-600'
                                  }`} />
                                </div>
                                <div className="text-left">
                                  <div className="font-medium text-gray-900">{method.name}</div>
                                  <div className="text-xs text-gray-500">{method.description}</div>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Formulaire de carte */}
                    {selectedMethod === 'card' && (
                      <div className="space-y-6">
                        <div className="relative">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <CreditCard className="h-4 w-4 inline mr-2" />
                            Numéro de Carte
                          </label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 pl-12 border rounded-xl focus:ring-2 focus:ring-blue-500 ${
                              errors.cardNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'
                            }`}
                            placeholder="1234 5678 9012 3456"
                          />
                          <CreditCard className="absolute left-4 top-11 h-5 w-5 text-gray-400" />
                          {getCardType(formData.cardNumber) && (
                            <div className={`absolute right-4 top-11 px-2 py-1 rounded text-xs font-medium ${
                              getCardType(formData.cardNumber).bg
                            } ${getCardType(formData.cardNumber).color}`}>
                              {getCardType(formData.cardNumber).name}
                            </div>
                          )}
                          {errors.cardNumber && (
                            <p className="text-red-500 text-sm mt-2">{errors.cardNumber}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nom sur la Carte
                          </label>
                          <input
                            type="text"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 ${
                              errors.cardName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                            }`}
                            placeholder="Nom complet"
                          />
                          {errors.cardName && (
                            <p className="text-red-500 text-sm mt-2">{errors.cardName}</p>
                          )}
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <Calendar className="h-4 w-4 inline mr-1" />
                              Mois
                            </label>
                            <select
                              name="expiryMonth"
                              value={formData.expiryMonth}
                              onChange={handleChange}
                              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 ${
                                errors.expiryMonth ? 'border-red-500 bg-red-50' : 'border-gray-300'
                              }`}
                            >
                              <option value="">MM</option>
                              {months.map(month => (
                                <option key={month.value} value={month.value}>{month.value}</option>
                              ))}
                            </select>
                            {errors.expiryMonth && (
                              <p className="text-red-500 text-sm mt-2">{errors.expiryMonth}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Année
                            </label>
                            <select
                              name="expiryYear"
                              value={formData.expiryYear}
                              onChange={handleChange}
                              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 ${
                                errors.expiryYear ? 'border-red-500 bg-red-50' : 'border-gray-300'
                              }`}
                            >
                              <option value="">AAAA</option>
                              {years.map(year => (
                                <option key={year.value} value={year.value}>{year.label}</option>
                              ))}
                            </select>
                            {errors.expiryYear && (
                              <p className="text-red-500 text-sm mt-2">{errors.expiryYear}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <Key className="h-4 w-4 inline mr-1" />
                              CVV
                            </label>
                            <div className="relative">
                              <input
                                type="password"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleChange}
                                maxLength="3"
                                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 ${
                                  errors.cvv ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                }`}
                                placeholder="123"
                              />
                              <button
                                type="button"
                                onClick={() => setShowSecurity(!showSecurity)}
                                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                              >
                                <Info className="h-5 w-5" />
                              </button>
                            </div>
                            {errors.cvv && (
                              <p className="text-red-500 text-sm mt-2">{errors.cvv}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Autres méthodes de paiement */}
                    {selectedMethod !== 'card' && (
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
                            {selectedMethod === 'mobile' && <Smartphone className="h-8 w-8 text-white" />}
                            {selectedMethod === 'wallet' && <Wallet className="h-8 w-8 text-white" />}
                            {selectedMethod === 'bank' && <Banknote className="h-8 w-8 text-white" />}
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            {paymentMethods.find(m => m.id === selectedMethod)?.name}
                          </h4>
                          <p className="text-gray-600 text-sm mb-4">
                            Vous serez redirigé vers la plateforme de paiement sécurisée
                          </p>
                          <button
                            type="button"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                          >
                            Continuer
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Conditions et newsletter */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                        <input
                          type="checkbox"
                          name="acceptTerms"
                          checked={formData.acceptTerms}
                          onChange={handleChange}
                          className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="text-sm text-gray-700">
                          J'accepte les <a href="/terms" className="text-blue-600 hover:underline font-medium">conditions d'utilisation</a> et la <a href="/privacy" className="text-blue-600 hover:underline font-medium">politique de confidentialité</a>
                        </label>
                      </div>
                      {errors.acceptTerms && (
                        <p className="text-red-500 text-sm">{errors.acceptTerms}</p>
                      )}

                      <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <input
                          type="checkbox"
                          name="newsletter"
                          checked={formData.newsletter}
                          onChange={handleChange}
                          className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="text-sm text-gray-700">
                          <span className="font-medium">Recevoir les nouveautés</span> - Soyez informé des nouveaux quiz et promotions
                        </label>
                      </div>
                    </div>

                    {/* Boutons de navigation */}
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={handlePreviousStep}
                        className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                      >
                        <ArrowLeft className="h-5 w-5" />
                        Retour
                      </button>
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-700 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isProcessing ? (
                          <>
                            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                            Traitement en cours...
                          </>
                        ) : (
                          <>
                            <Lock className="h-5 w-5" />
                            Payer 99 MAD
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Sidebar - Résumé et sécurité */}
          <div className="lg:col-span-1 space-y-6">
            {/* Résumé de commande */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Receipt className="h-6 w-6 text-blue-600" />
                Récapitulatif
              </h3>
              
              <div className="space-y-6">
                {/* Quiz info */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4">
                  <div className="text-sm text-gray-600 mb-1">Accès Premium</div>
                  <div className="font-semibold text-gray-900">{quiz?.title || 'Quiz Sélectionné'}</div>
                  <div className="text-xs text-gray-500 mt-2">Accès illimité • Certificat inclus</div>
                </div>

                {/* Détails de prix */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Sous-total</span>
                    <span className="font-semibold">99 MAD</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">TVA (20%)</span>
                    <span className="font-semibold">19.80 MAD</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-blue-600">118.80 MAD</span>
                    </div>
                  </div>
                </div>

                {/* Garanties */}
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium text-gray-900">Accès immédiat</div>
                      <div className="text-xs text-gray-600">Débloqué après paiement</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium text-gray-900">Garantie satisfait</div>
                      <div className="text-xs text-gray-600">Remboursement sous 7 jours</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sécurité */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-200 p-6">
              <h4 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                Sécurité garantie
              </h4>
              <div className="space-y-3">
                {securityFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <Icon className="h-4 w-4 text-emerald-600" />
                      </div>
                      <span className="text-sm text-emerald-800">{feature.text}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 pt-4 border-t border-emerald-200">
                <div className="flex items-center justify-center gap-2">
                  <div className="text-xs text-emerald-700">🔒</div>
                  <div className="text-xs text-emerald-700">🔐</div>
                  <div className="text-xs text-emerald-700">🛡️</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;