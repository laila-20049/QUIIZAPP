import React from 'react';
import { BarChart3 } from 'lucide-react';

const QuizAttempts = () => {
  const attempts = [
    { id: 1, student: 'Ahmed Bennani', score: 85, time: '45 min', date: '2024-12-12' },
    { id: 2, student: 'Fatima Alaoui', score: 92, time: '38 min', date: '2024-12-11' },
    { id: 3, student: 'Mohamed Saïd', score: 78, time: '52 min', date: '2024-12-10' },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <BarChart3 className="h-10 w-10 text-blue-600 dark:text-blue-400" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Tentatives Quiz</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 dark:text-white">Étudiant</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 dark:text-white">Score</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 dark:text-white">Durée</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 dark:text-white">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {attempts.map((attempt) => (
              <tr key={attempt.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{attempt.student}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded font-bold">
                    {attempt.score}%
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{attempt.time}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{attempt.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuizAttempts;
