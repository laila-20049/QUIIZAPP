import React from 'react';
import { HelpCircle, MessageSquare, Mail, Phone } from 'lucide-react';

const Help = () => {
  const faqs = [
    {
      question: 'Comment créer un compte ?',
      answer: 'Visitez la page d\'inscription et remplissez vos données personnelles.'
    },
    {
      question: 'Comment réinitialiser mon mot de passe ?',
      answer: 'Cliquez sur "Mot de passe oublié" depuis la page de connexion.'
    },
    {
      question: 'Comment puis-je contacter le support ?',
      answer: 'Vous pouvez nous contacter via email à support@quiizapp.com'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Centre d'aide</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Trouvez des réponses et contactez-nous
          </p>
        </div>

        {/* FAQs */}
        <div className="mb-8 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
            >
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Nous contacter
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                <p className="text-gray-900 dark:text-white font-medium">support@quiizapp.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Chat en direct</p>
                <p className="text-gray-900 dark:text-white font-medium">Disponible 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
