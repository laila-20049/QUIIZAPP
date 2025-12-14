import React from 'react';
import { FileText } from 'lucide-react';

const AdminDocs = () => {
  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <FileText className="h-10 w-10 text-blue-600 dark:text-blue-400" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Documentation</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">API Reference</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Documentation complète de l'API pour les développeurs
          </p>
          <button className="text-blue-600 dark:text-blue-400 hover:underline">
            Consulter →
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Guide d'Administration</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Comment gérer la plateforme et les utilisateurs
          </p>
          <button className="text-blue-600 dark:text-blue-400 hover:underline">
            Consulter →
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">FAQ Technique</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Réponses aux questions fréquemment posées
          </p>
          <button className="text-blue-600 dark:text-blue-400 hover:underline">
            Consulter →
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Meilleures Pratiques</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Conseils pour optimiser votre utilisation de la plateforme
          </p>
          <button className="text-blue-600 dark:text-blue-400 hover:underline">
            Consulter →
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDocs;
