import React from 'react';
import { CreditCard, Heart, Lock } from 'lucide-react';

const Subscription = () => {
  const plans = [
    {
      name: 'Gratuit',
      price: '0 DA',
      features: ['5 quiz par mois', 'Résultats de base', 'Support par email'],
      recommended: false
    },
    {
      name: 'Pro',
      price: '2 999 DA',
      period: '/mois',
      features: ['Quiz illimités', 'Statistiques avancées', 'Accès au forum', 'Support prioritaire'],
      recommended: true
    },
    {
      name: 'Premium',
      price: '6 999 DA',
      period: '/mois',
      features: ['Tous les avantages Pro', 'Certificats', 'Contenu exclusif', 'Live sessions'],
      recommended: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CreditCard className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Abonnements
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Choisissez le plan qui vous convient
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg shadow-lg p-8 relative transition-transform ${
                plan.recommended
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white scale-105 border-2 border-yellow-400'
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold">
                    Recommandé
                  </span>
                </div>
              )}
              
              <h3 className={`text-2xl font-bold mb-2 ${plan.recommended ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                {plan.name}
              </h3>
              <div className={`mb-6 ${plan.recommended ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && <span>{plan.period}</span>}
              </div>
              
              <ul className={`space-y-3 mb-8 ${plan.recommended ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button
                className={`w-full py-2 px-4 rounded-lg font-bold transition ${
                  plan.recommended
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Choisir ce plan
              </button>
            </div>
          ))}
        </div>

        {/* Security Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 flex items-center gap-4">
          <Lock className="h-8 w-8 text-green-600 dark:text-green-400" />
          <div>
            <p className="font-bold text-gray-900 dark:text-white">Paiement Sécurisé</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Tous les paiements sont chiffrés et sécurisés
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
