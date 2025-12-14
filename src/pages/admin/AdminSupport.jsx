import React from 'react';
import { MessageSquare } from 'lucide-react';

const AdminSupport = () => {
  const tickets = [
    { id: 1, subject: 'Problème de connexion', status: 'open', date: '2024-12-12' },
    { id: 2, subject: 'Bug d\'affichage', status: 'in-progress', date: '2024-12-10' },
    { id: 3, subject: 'Demande de fonctionnalité', status: 'closed', date: '2024-12-05' },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare className="h-10 w-10 text-blue-600 dark:text-blue-400" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Support</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 dark:text-white">Sujet</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 dark:text-white">Statut</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 dark:text-white">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 text-gray-900 dark:text-white">{ticket.subject}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    ticket.status === 'open'
                      ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      : ticket.status === 'in-progress'
                      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  }`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{ticket.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSupport;
