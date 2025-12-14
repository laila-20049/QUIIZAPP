import React from 'react';
import { BookOpen } from 'lucide-react';

const AdminQuizzes = () => {
  const quizzes = [
    { id: 1, title: 'Algèbre Linéaire', author: 'Admin', status: 'published', attempts: 342 },
    { id: 2, title: 'Calcul Intégral', author: 'Admin', status: 'published', attempts: 215 },
    { id: 3, title: 'Physique Quantique', author: 'Admin', status: 'draft', attempts: 0 },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <BookOpen className="h-10 w-10 text-blue-600 dark:text-blue-400" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Gestion des Quiz</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 dark:text-white">Titre</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 dark:text-white">Auteur</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 dark:text-white">Statut</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 dark:text-white">Tentatives</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {quizzes.map((quiz) => (
              <tr key={quiz.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 text-gray-900 dark:text-white">{quiz.title}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{quiz.author}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    quiz.status === 'published'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {quiz.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{quiz.attempts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminQuizzes;
