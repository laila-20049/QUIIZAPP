import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Home, Search, ChevronRight } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
          <AlertCircle className="h-10 w-10 text-red-600" />
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Page non trouvée</h2>
        
        <p className="text-gray-600 mb-8">
          Désolé, la page que vous recherchez n'existe pas ou a été supprimée.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/')}
            className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            <Home className="h-5 w-5" />
            Retour à l'accueil
            <ChevronRight className="h-5 w-5" />
          </button>
          
          <button
            onClick={() => navigate('/quizzes')}
            className="w-full inline-flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            <Search className="h-5 w-5" />
            Voir les quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
