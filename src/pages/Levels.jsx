import React from 'react';
import { GraduationCap } from 'lucide-react';

const Levels = () => {
  const levels = [
    { name: 'Baccalauréat S1', icon: '1️⃣', count: 89 },
    { name: 'Baccalauréat S2', icon: '2️⃣', count: 95 },
    { name: 'DEUG 1', icon: '3️⃣', count: 78 },
    { name: 'DEUG 2', icon: '4️⃣', count: 82 },
    { name: 'Licence 1', icon: '5️⃣', count: 64 },
    { name: 'Licence 2', icon: '6️⃣', count: 71 },
    { name: 'Licence 3', icon: '7️⃣', count: 58 },
    { name: 'Master 1', icon: '8️⃣', count: 45 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Niveaux d'études</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Sélectionnez votre niveau académique
          </p>
        </div>

        {/* Levels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {levels.map((level) => (
            <div
              key={level.name}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-all cursor-pointer border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500"
            >
              <div className="text-4xl mb-4">{level.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {level.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {level.count} quiz
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Levels;
