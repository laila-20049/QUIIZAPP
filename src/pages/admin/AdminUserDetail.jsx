import React from 'react';
import { User } from 'lucide-react';

const AdminUserDetail = () => {
  const user = {
    id: 1,
    name: 'Ahmed Bennani',
    email: 'ahmed@example.com',
    faculty: 'FS',
    university: 'Université Hassan II',
    joinDate: '2024-01-15',
    quizzesCompleted: 25,
    averageScore: 82.5,
    recentActivity: [
      { date: '2024-12-10', action: 'Complété: Algèbre Linéaire', score: 85 },
      { date: '2024-12-08', action: 'Complété: Calcul Différentiel', score: 78 },
    ]
  };

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <User className="h-10 w-10 text-blue-600 dark:text-blue-400" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Détail Utilisateur</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Nom</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Quiz Complétés</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{user.quizzesCompleted}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Moyenne</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{user.averageScore}%</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Activité Récente</h2>
        <div className="space-y-3">
          {user.recentActivity.map((activity, index) => (
            <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
              <div>
                <p className="text-gray-900 dark:text-white font-medium">{activity.action}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{activity.date}</p>
              </div>
              <span className="text-green-600 dark:text-green-400 font-bold">{activity.score}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminUserDetail;
