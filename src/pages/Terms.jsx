import React from 'react';
import { FileText, Download } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Conditions d'utilisation
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Dernière mise à jour: 14 décembre 2024
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700 prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-3">1. Conditions Générales</h2>
          <p className="text-gray-700 dark:text-gray-300">
            En utilisant QUIIZAPP, vous acceptez les conditions d'utilisation suivantes. Notre plateforme fournit une solution d'apprentissage interactive pour les étudiants des universités marocaines.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-3">2. Utilisation Autorisée</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Vous vous engagez à utiliser QUIIZAPP uniquement à des fins éducatives légales. Vous ne devez pas:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>Reproduire ou distribuer le contenu sans autorisation</li>
            <li>Utiliser des outils de scraping ou d'automation</li>
            <li>Participer à des activités illégales ou nuisibles</li>
            <li>Violer les droits d'auteur ou la propriété intellectuelle</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-3">3. Responsabilité des Utilisateurs</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Vous êtes responsable de la confidentialité de votre compte et de la sécurité de votre mot de passe. Vous acceptez de notifier immédiatement QUIIZAPP de toute utilisation non autorisée de votre compte.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-3">4. Modifications des Services</h2>
          <p className="text-gray-700 dark:text-gray-300">
            QUIIZAPP se réserve le droit de modifier ou d'interrompre les services à tout moment, avec ou sans préavis.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-3">5. Limitation de Responsabilité</h2>
          <p className="text-gray-700 dark:text-gray-300">
            QUIIZAPP ne peut pas être tenu responsable des dommages directs ou indirects résultant de l'utilisation ou de l'incapacité à utiliser la plateforme.
          </p>
        </div>

        {/* Download Button */}
        <div className="mt-8 flex justify-center">
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <Download className="h-5 w-5" />
            Télécharger PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Terms;
