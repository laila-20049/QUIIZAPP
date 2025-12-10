import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';
import {
  BookOpen,
  Trophy,
  Bookmark,
  BarChart3,
  CheckCircle,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Clock,
  Star,
  GraduationCap
} from 'lucide-react';

const Card = ({ title, description, icon: Icon, action, onClick, color }) => (
  <button
    onClick={onClick}
    className="group w-full text-left bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-5 flex gap-4 items-start"
  >
    <div className={`p-3 rounded-lg bg-gradient-to-br ${color} text-white shadow-inner`}> 
      <Icon className="h-5 w-5" />
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
      </div>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
      {action && <div className="mt-3 inline-flex items-center text-sm font-medium text-indigo-600">{action}</div>}
    </div>
  </button>
);

const Stat = ({ label, value, icon: Icon }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
    <div className="p-2.5 rounded-lg bg-gray-100 text-gray-700">
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <div className="text-xs text-gray-500 uppercase tracking-wide">{label}</div>
      <div className="text-xl font-semibold text-gray-900">{value}</div>
    </div>
  </div>
);

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { quizzes = [], filteredQuizzes = [] } = useQuiz();

  const completed = quizzes.filter((q) => q.isCompleted).length;
  const bookmarked = quizzes.filter((q) => q.isBookmarked).length;
  const trending = filteredQuizzes.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-white p-7 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm text-indigo-100">Espace Utilisateur</p>
              <h1 className="text-3xl font-bold mt-1">Bienvenue {user?.name || 'apprenant'} 👋</h1>
              <p className="text-indigo-100 mt-2">Accédez rapidement à vos quiz, résultats et favoris.</p>
            </div>
            <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-sm font-semibold">Compte {user?.role || 'user'}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat label="Quiz terminés" value={completed} icon={CheckCircle} />
          <Stat label="Favoris" value={bookmarked} icon={Bookmark} />
          <Stat label="En cours" value={quizzes.length - completed} icon={Clock} />
          <Stat label="Score moyen" value="--" icon={BarChart3} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            title="Parcourir les quiz"
            description="Choisissez parmi toutes les matières, gratuits ou payants."
            icon={BookOpen}
            action="Voir les quiz"
            color="from-blue-500 to-cyan-500"
            onClick={() => navigate('/quizzes')}
          />
          <Card
            title="Reprendre un quiz"
            description="Continuez vos quiz en cours ou démarrez un premium."
            icon={Sparkles}
            action="Ouvrir mes quiz"
            color="from-purple-500 to-pink-500"
            onClick={() => navigate('/quizzes')}
          />
          <Card
            title="Mes résultats"
            description="Consultez vos scores, chronos et historiques."
            icon={Trophy}
            action="Voir mes résultats"
            color="from-amber-500 to-orange-500"
            onClick={() => navigate('/results')}
          />
          <Card
            title="Favoris / enregistrés"
            description="Retrouvez vos quiz marqués pour plus tard."
            icon={Bookmark}
            action="Voir mes favoris"
            color="from-emerald-500 to-green-500"
            onClick={() => navigate('/saved')}
          />
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-gray-500">Suggestions pour vous</div>
              <div className="text-lg font-semibold text-gray-900">Quiz populaires</div>
            </div>
            <button
              onClick={() => navigate('/quizzes')}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              Voir tout
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {trending.map((quiz) => (
              <div key={quiz.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <GraduationCap className="h-4 w-4 text-indigo-500" />
                  <span>{quiz.subject}</span>
                </div>
                <div className="mt-2 font-semibold text-gray-900 line-clamp-2">{quiz.title}</div>
                <div className="flex items-center justify-between text-xs text-gray-500 mt-3">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{quiz.duration} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-amber-500" />
                    <span>{quiz.rating}</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate(quiz.isPaid ? '/payment' : `/quiz/${quiz.id}`, { state: { quiz } })}
                  className="mt-4 w-full text-sm font-medium px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                  {quiz.isPaid ? 'Accéder (payant)' : 'Commencer' }
                </button>
              </div>
            ))}
            {trending.length === 0 && (
              <div className="text-sm text-gray-500">Aucun quiz à suggérer pour le moment.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
