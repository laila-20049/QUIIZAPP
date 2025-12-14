import React from 'react';
import { Star, Trophy, Zap } from 'lucide-react';

const Achievements = () => {
  const achievements = [
    { name: 'Premier Quiz', icon: '🎯', description: 'Complétez votre premier quiz', unlocked: true },
    { name: 'Perfectionniste', icon: '⭐', description: 'Obtenez 100% à un quiz', unlocked: true },
    { name: 'Marathon', icon: '🏃', description: 'Complétez 10 quiz en une journée', unlocked: false },
    { name: 'Champion', icon: '🏆', description: 'Atteindre le top 10 du classement', unlocked: false },
    { name: 'Savant', icon: '🧠', description: 'Obtenez une moyenne de 90%', unlocked: false },
    { name: 'Contributeur', icon: '📢', description: 'Posez 5 questions au forum', unlocked: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Réalisations</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Débloquez des réalisations en utilisant la plateforme
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <div
              key={achievement.name}
              className={`rounded-lg p-6 border-2 transition-all ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-300 dark:border-yellow-600'
                  : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 opacity-60'
              }`}
            >
              <div className="text-4xl mb-4">{achievement.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {achievement.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {achievement.description}
              </p>
              {achievement.unlocked && (
                <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-xs font-bold">Débloqué</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
