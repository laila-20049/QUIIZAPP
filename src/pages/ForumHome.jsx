import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  PlusCircle, 
  Search, 
  TrendingUp, 
  Clock,
  Users,
  BookOpen,
  HelpCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import ForumQuestionCard from '../components/ForumQuestionCard';
import { getQuestions, initializeSampleData } from '../utils/forumStorage';

const ForumHome = () => {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent'); // recent, popular, unanswered

  useEffect(() => {
    initializeSampleData();
    loadQuestions();
  }, []);

  const loadQuestions = () => {
    const allQuestions = getQuestions();
    setQuestions(allQuestions);
  };

  const filteredQuestions = questions.filter(q =>
    q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (q.tags && q.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === 'popular') {
      return (b.views || 0) - (a.views || 0);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="h-12 w-12" />
            <h1 className="text-4xl md:text-5xl font-bold">Forum de discussion</h1>
          </div>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl">
            Rejoignez la discussion, posez vos questions et partagez vos connaissances avec la communauté étudiante
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link
              to="/forum/ask"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all hover:scale-105 shadow-lg"
            >
              <PlusCircle className="h-5 w-5" />
              Poser une question
            </Link>
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/30"
            >
              <HelpCircle className="h-5 w-5" />
              Questions fréquentes
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: MessageSquare, label: 'Questions', value: questions.length, color: 'from-blue-500 to-blue-600' },
            { icon: Users, label: 'Contributeurs', value: '150+', color: 'from-green-500 to-green-600' },
            { icon: BookOpen, label: 'Réponses', value: '500+', color: 'from-purple-500 to-purple-600' },
            { icon: TrendingUp, label: 'Vues', value: '2.5K', color: 'from-yellow-500 to-yellow-600' },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une question..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:ring-0 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setSortBy('recent')}
                className={`px-4 py-3 rounded-xl font-medium transition-all ${
                  sortBy === 'recent'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <Clock className="h-5 w-5 inline mr-2" />
                Récentes
              </button>
              <button
                onClick={() => setSortBy('popular')}
                className={`px-4 py-3 rounded-xl font-medium transition-all ${
                  sortBy === 'popular'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <TrendingUp className="h-5 w-5 inline mr-2" />
                Populaires
              </button>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {sortedQuestions.length > 0 ? (
            sortedQuestions.map((question) => (
              <ForumQuestionCard key={question.id} question={question} />
            ))
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center border-2 border-dashed border-gray-300 dark:border-gray-600">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 mb-6">
                <MessageSquare className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {searchTerm ? 'Aucune question trouvée' : 'Aucune question pour le moment'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchTerm
                  ? 'Essayez de modifier votre recherche'
                  : 'Soyez le premier à poser une question à la communauté'}
              </p>
              <Link
                to="/forum/ask"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
              >
                <PlusCircle className="h-5 w-5" />
                Poser une question
              </Link>
            </div>
          )}
        </div>

        {/* Quick Tips */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 border border-blue-200 dark:border-gray-600">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white dark:bg-gray-600 rounded-xl">
              <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Conseils pour poser une bonne question
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 mt-0.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span>Soyez clair et précis dans votre titre</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 mt-0.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span>Décrivez le contexte et ce que vous avez déjà essayé</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 mt-0.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span>Utilisez des tags appropriés pour catégoriser votre question</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumHome;
