import React from 'react';
import { Bookmark } from 'lucide-react';

const Saved = () => {
  const savedQuizzes = [
    {
      id: 1,
      title: 'Algèbre Avancée',
      subject: 'Mathématiques',
      difficulty: 'Difficile',
      savedDate: '2024-12-10'
    },
    {
      id: 2,
      title: 'Thermodynamique',
      subject: 'Physique',
      difficulty: 'Moyen',
      savedDate: '2024-12-08'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Bookmark className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Quiz Sauvegardés</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Vos quiz sauvegardés pour plus tard
          </p>
        </div>

        {/* Saved Quizzes */}
        {savedQuizzes.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-12 text-center border border-gray-200 dark:border-gray-700">
            <Bookmark className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Aucun quiz sauvegardé pour le moment
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {savedQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {quiz.title}
                    </h3>
                    <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>{quiz.subject}</span>
                      <span>•</span>
                      <span>{quiz.difficulty}</span>
                    </div>
                  </div>
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700">
                    Commencer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Saved;
