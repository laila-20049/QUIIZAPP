import React from 'react';
import { Shield, FileText } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Politique de Confidentialité
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Dernière mise à jour: 14 décembre 2024
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700 prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-3">1. Informations Collectées</h2>
          <p className="text-gray-700 dark:text-gray-300">
            QUIIZAPP collecte des informations personnelles incluant:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Université et faculté</li>
            <li>Historique des quiz et résultats</li>
            <li>Données de navigation</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-3">2. Utilisation des Données</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Vos données sont utilisées pour:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>Personnaliser votre expérience d'apprentissage</li>
            <li>Améliorer nos services</li>
            <li>Vous envoyer des notifications pertinentes</li>
            <li>Analyser les statistiques d'utilisation</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-3">3. Protection des Données</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Nous utilisons le chiffrement SSL et d'autres mesures de sécurité pour protéger vos données personnelles contre l'accès non autorisé.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-3">4. Droits de l'Utilisateur</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Vous avez le droit d'accéder, de modifier ou de supprimer vos données personnelles à tout moment. Contactez-nous pour toute demande.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-3">5. Cookies</h2>
          <p className="text-gray-700 dark:text-gray-300">
            QUIIZAPP utilise des cookies pour améliorer votre expérience. Vous pouvez les désactiver dans les paramètres de votre navigateur.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-3">6. Contact</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Pour toute question sur cette politique, contactez-nous à: privacy@quiizapp.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
