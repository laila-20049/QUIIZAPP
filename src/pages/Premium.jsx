import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Calendar,
  Hash,
  CheckCircle,
  Shield,
  Save,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';

const Premium = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('idle'); // idle | saving | saved | loading
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });

  // Charger les données sauvegardées au démarrage
  useEffect(() => {
    setStatus('loading');
    
    // Chercher d'abord dans premium_profile
    const premiumSaved = localStorage.getItem('premium_profile');
    if (premiumSaved) {
      try {
        const data = JSON.parse(premiumSaved);
        setFormData(data);
        setStatus('idle');
        return;
      } catch (e) {
        console.warn('Erreur chargement premium_profile');
      }
    }
    
    // Fallback: charger depuis payment_data (si vient du paiement)
    const paymentSaved = localStorage.getItem('payment_data');
    if (paymentSaved) {
      try {
        const data = JSON.parse(paymentSaved);
        setFormData(prev => ({ ...prev, ...data }));
        setStatus('idle');
        return;
      } catch (e) {
        console.warn('Erreur chargement payment_data');
      }
    }
    
    setStatus('idle');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'cardNumber') {
      newValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (newValue.replace(/\s/g, '').length > 16) return;
    }

    if (name === 'cvv' && value.length > 4) return;
    if (name === 'phone') {
      newValue = value.replace(/[^0-9+]/g, '');
      if (newValue.length > 13) return;
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.firstName?.trim()) nextErrors.firstName = 'Prénom requis';
    if (!formData.lastName?.trim()) nextErrors.lastName = 'Nom requis';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) nextErrors.email = 'Email invalide';
    if (!formData.phone || !/^(\+212|0)[5-7][0-9]{8}$/.test(formData.phone.replace(/\s/g, ''))) nextErrors.phone = 'Téléphone marocain invalide (ex: +212612345678)';
    if (!formData.address?.trim()) nextErrors.address = 'Adresse requise';
    if (!formData.city?.trim()) nextErrors.city = 'Ville requise';
    if (!formData.postalCode?.trim()) nextErrors.postalCode = 'Code postal requis';

    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length !== 16) nextErrors.cardNumber = 'Carte (16 chiffres requis)';
    if (!formData.cardName?.trim()) nextErrors.cardName = 'Nom sur la carte requis';
    if (!formData.expiryMonth?.trim()) nextErrors.expiryMonth = 'Mois requis';
    if (!formData.expiryYear?.trim()) nextErrors.expiryYear = 'Année requise';
    if (!formData.cvv || formData.cvv.length < 3) nextErrors.cvv = 'CVV (3 chiffres) requis';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    setStatus('saving');
    setTimeout(() => {
      // Sauvegarder dans premium_profile ET payment_data pour accès depuis Payment
      localStorage.setItem('premium_profile', JSON.stringify(formData));
      localStorage.setItem('payment_data', JSON.stringify(formData));
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 2000);
    }, 600);
  };

  const inputClasses = 'w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition';
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() + i).toString());

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="h-4 w-4" /> Retour
        </button>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
          <div className="flex items-start gap-3 mb-6">
            <Shield className="h-10 w-10 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Espace Premium</h1>
              <p className="text-gray-600">Saisissez vos informations personnelles et de paiement puis sauvegardez-les en toute sécurité sur votre appareil.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Infos personnelles */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
                <User className="h-5 w-5 text-blue-600" /> Informations Personnelles
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Votre prénom" className={inputClasses} />
                {errors.firstName && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Votre nom" className={inputClasses} />
                {errors.lastName && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.lastName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="vous@email.com" className={inputClasses} />
                {errors.email && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <input name="phone" value={formData.phone} onChange={handleChange} placeholder="+212 6 12 34 56 78" className={inputClasses} />
                {errors.phone && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                <input name="address" value={formData.address} onChange={handleChange} placeholder="Rue, avenue..." className={inputClasses} />
                {errors.address && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.address}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                  <input name="city" value={formData.city} onChange={handleChange} placeholder="Casablanca" className={inputClasses} />
                  {errors.city && <p className="text-xs text-red-600 mt-1"><AlertCircle className="h-3 w-3 inline" /> {errors.city}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Code Postal</label>
                  <input name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="20000" className={inputClasses} />
                  {errors.postalCode && <p className="text-xs text-red-600 mt-1"><AlertCircle className="h-3 w-3 inline" /> {errors.postalCode}</p>}
                </div>
              </div>
            </div>

            {/* Carte bancaire */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
                <CreditCard className="h-5 w-5 text-green-600" /> Carte Bancaire
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de Carte</label>
                <input name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="1234 5678 9012 3456" className={inputClasses} maxLength="19" />
                {errors.cardNumber && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.cardNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom sur la Carte</label>
                <input name="cardName" value={formData.cardName} onChange={handleChange} placeholder="AHMED BENALI" className={inputClasses} style={{ textTransform: 'uppercase' }} />
                {errors.cardName && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.cardName}</p>}
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mois</label>
                  <select name="expiryMonth" value={formData.expiryMonth} onChange={handleChange} className={inputClasses}>
                    <option value="">MM</option>
                    {months.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  {errors.expiryMonth && <p className="text-xs text-red-600 mt-1">{errors.expiryMonth}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Année</label>
                  <select name="expiryYear" value={formData.expiryYear} onChange={handleChange} className={inputClasses}>
                    <option value="">AAAA</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                  {errors.expiryYear && <p className="text-xs text-red-600 mt-1">{errors.expiryYear}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input name="cvv" value={formData.cvv} onChange={handleChange} placeholder="123" className={inputClasses} maxLength="4" type="password" />
                  {errors.cvv && <p className="text-xs text-red-600 mt-1">{errors.cvv}</p>}
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
                <div className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-green-800">
                    <p className="font-semibold mb-1">🔒 Sécurisé</p>
                    <p>Les données sont sauvegardées <strong>localement sur votre appareil</strong> et ne sont jamais envoyées au serveur.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <button
              onClick={handleSave}
              disabled={status === 'saving'}
              className={`inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-white transition transform ${
                status === 'saving' ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
              }`}
            >
              <Save className="h-4 w-4" />
              {status === 'saving' ? 'Sauvegarde...' : status === 'saved' ? '✅ Sauvegardé!' : 'Sauvegarder'}
            </button>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" /> 
              <span>Réutilisable lors du paiement</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
