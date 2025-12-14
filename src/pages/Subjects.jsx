import React from 'react';
import { BookOpen, Search } from 'lucide-react';

const Subjects = () => {
  const subjects = [
    { name: 'Mathématiques', icon: '📐', count: 125 },
    { name: 'Physique', icon: '⚛️', count: 98 },
    { name: 'Chimie', icon: '🧪', count: 87 },
    { name: 'Biologie', icon: '🧬', count: 76 },
    { name: 'Informatique', icon: '💻', count: 112 },
    { name: 'Français', icon: '📚', count: 64 },
    { name: 'Anglais', icon: '🌐', count: 91 },
    { name: 'Histoire', icon: '📜', count: 54 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Matières</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Explorez tous les quiz par matière académique
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une matière..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-0"
            />
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject) => (
            <div
              key={subject.name}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 dark:border-gray-700"
            >
              <div className="text-4xl mb-4">{subject.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {subject.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {subject.count} quiz disponibles
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subjects;
