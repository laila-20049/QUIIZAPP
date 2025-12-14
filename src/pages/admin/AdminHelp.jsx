import React from 'react';
import { HelpCircle } from 'lucide-react';

const AdminHelp = () => {
  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <HelpCircle className="h-10 w-10 text-blue-600 dark:text-blue-400" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Aide Admin</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Guide Administrateur</h2>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300">
            Bienvenue dans le panneau administrateur de QUIIZAPP. Voici les principales sections:
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Gestion des Quiz:</strong> Créez, modifiez et publiez des quiz</li>
            <li><strong>Gestion des Utilisateurs:</strong> Consultez les profils et statistiques des utilisateurs</li>
            <li><strong>Tentatives:</strong> Visualisez les tentatives de quiz et les résultats</li>
            <li><strong>Documentation:</strong> Accédez aux guides complets</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminHelp;
