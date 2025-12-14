import React from 'react';
import { Users } from 'lucide-react';

const AdminUsers = () => {
  const users = [
    { id: 1, name: 'Ahmed Bennani', email: 'ahmed@example.com', faculty: 'FS', quizzes: 25 },
    { id: 2, name: 'Fatima Alaoui', email: 'fatima@example.com', faculty: 'FL', quizzes: 18 },
    { id: 3, name: 'Mohamed Saïd', email: 'saïd@example.com', faculty: 'FI', quizzes: 42 },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Users className="h-10 w-10 text-blue-600 dark:text-blue-400" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Gestion des Utilisateurs</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 dark:text-white">Nom</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 dark:text-white">Email</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 dark:text-white">Faculté</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 dark:text-white">Quiz complétés</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{user.name}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{user.email}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{user.faculty}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{user.quizzes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
