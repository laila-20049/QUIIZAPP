import React from 'react';
import { ClipboardList, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const MyQuizzes = () => {
  const myQuizzes = [
    {
      id: 1,
      title: 'Algèbre Linéaire - Partie 1',
      status: 'completed',
      score: 85,
      date: '2024-12-10',
      time: '1h 30min'
    },
    {
      id: 2,
      title: 'Calcul Différentiel',
      status: 'in-progress',
      progress: 45,
      date: '2024-12-12'
    },
    {
      id: 3,
      title: 'Physique Moderne',
      status: 'not-started',
      date: '2024-12-15'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <ClipboardList className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Mes Quiz</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Consultez vos quiz en cours et vos résultats
          </p>
        </div>

        {/* Quiz List */}
        <div className="space-y-4">
          {myQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {quiz.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {quiz.date}
                    </span>
                    {quiz.time && <span>{quiz.time}</span>}
                  </div>
                </div>
                <div className="text-right">
                  {quiz.status === 'completed' && (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-green-600 dark:text-green-400 font-bold">
                        {quiz.score}%
                      </span>
                    </div>
                  )}
                  {quiz.status === 'in-progress' && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-500" />
                      <span className="text-blue-600 dark:text-blue-400 font-bold">
                        {quiz.progress}%
                      </span>
                    </div>
                  )}
                  {quiz.status === 'not-started' && (
                    <span className="text-gray-500 dark:text-gray-400">Non commencé</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyQuizzes;
