import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Users, 
  Star, 
  Play, 
  BookOpen, 
  GraduationCap, 
  MapPin,
  BarChart3,
  Lock,
  Unlock,
  Trophy,
  Zap,
  Sparkles,
  TrendingUp,
  Target,
  Award,
  CheckCircle,
  Heart,
  Share2,
  Bookmark,
  TrendingDown,
  Crown,
  Timer,
  Percent,
  Bell,
  Eye
} from 'lucide-react';

const QuizCard = ({ 
  quiz = {
    id: 1,
    title: "Introduction à la Programmation",
    description: "Quiz couvrant les bases de la programmation en Python avec des exercices pratiques et des défis interactifs",
    subject: "Informatique",
    university: "Université Hassan II",
    faculty: "Faculté des Sciences",
    level: "S1",
    questionsCount: 20,
    duration: 30,
    participants: 1250,
    difficulty: "medium",
    rating: 4.5,
    isPro: false,
    isCompleted: false,
    bestScore: null,
    currentScore: null,
    completionRate: null,
    averageScore: 72,
    tags: ["Python", "Algorithmique", "Bases", "Débutant"],
    createdAt: "2024-01-15",
    author: "Dr. Ahmed Benali",
    popularity: "trending", // trending, hot, new, popular
    streakRequired: null,
    timeRecord: null,
    isBookmarked: false,
    isLiked: false,
    likes: 45,
    shares: 12
  },
  onStartQuiz,
  onBookmark,
  onLike,
  onShare,
  compact = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(quiz.isBookmarked);
  const [isLiked, setIsLiked] = useState(quiz.isLiked);
  const [likeCount, setLikeCount] = useState(quiz.likes);
  const [showDetails, setShowDetails] = useState(false);

  // Difficulty configurations
  const difficultyConfig = {
    easy: { 
      color: "text-green-700 bg-gradient-to-r from-green-100 to-emerald-100 border-green-300",
      icon: "🌱",
      label: "Facile"
    },
    medium: { 
      color: "text-yellow-700 bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-300",
      icon: "⚡",
      label: "Moyen"
    },
    hard: { 
      color: "text-red-700 bg-gradient-to-r from-red-100 to-pink-100 border-red-300",
      icon: "🔥",
      label: "Difficile"
    },
    expert: { 
      color: "text-purple-700 bg-gradient-to-r from-purple-100 to-violet-100 border-purple-300",
      icon: "👑",
      label: "Expert"
    }
  };

  // Subject icons with colors
  const subjectConfig = {
    "Informatique": { icon: "💻", color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
    "Mathématiques": { icon: "📊", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
    "Physique": { icon: "⚛️", color: "bg-gradient-to-r from-red-500 to-orange-500" },
    "Économie": { icon: "💰", color: "bg-gradient-to-r from-green-500 to-emerald-500" },
    "Droit": { icon: "⚖️", color: "bg-gradient-to-r from-gray-500 to-gray-700" },
    "Philosophie": { icon: "🧠", color: "bg-gradient-to-r from-indigo-500 to-blue-500" },
    "SVT": { icon: "🔬", color: "bg-gradient-to-r from-teal-500 to-green-500" },
    "Culture Générale": { icon: "🌍", color: "bg-gradient-to-r from-yellow-500 to-amber-500" }
  };

  // Popularity badges
  const popularityConfig = {
    trending: { 
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      icon: <TrendingUp className="h-3 w-3" />,
      label: "Tendance"
    },
    hot: { 
      color: "bg-gradient-to-r from-red-500 to-orange-500",
      icon: <Zap className="h-3 w-3" />,
      label: "Populaire"
    },
    new: { 
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      icon: <Sparkles className="h-3 w-3" />,
      label: "Nouveau"
    },
    popular: { 
      color: "bg-gradient-to-r from-green-500 to-emerald-500",
      icon: <Users className="h-3 w-3" />,
      label: "Populaire"
    }
  };

  const handleStartQuiz = () => {
    if (onStartQuiz) {
      onStartQuiz(quiz.id);
    }
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    if (onBookmark) onBookmark(quiz.id, !isBookmarked);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    const newLiked = !isLiked;
    setIsLiked(newLiked);
    setLikeCount(prev => newLiked ? prev + 1 : prev - 1);
    if (onLike) onLike(quiz.id, newLiked);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (onShare) onShare(quiz.id);
  };

  const getTimeSince = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaines`;
    return `Il y a ${Math.floor(diffDays / 30)} mois`;
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-3 w-3 ${
          index < Math.floor(rating) ? 'text-yellow-500 fill-current' :
          index < rating ? 'text-yellow-500 fill-current opacity-50' :
          'text-gray-300'
        }`}
      />
    ));
  };

  if (compact) {
    return (
      <div
        className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`h-8 w-8 rounded-lg ${subjectConfig[quiz.subject]?.color || 'bg-gray-500'} flex items-center justify-center text-white`}>
                <span className="text-sm">{subjectConfig[quiz.subject]?.icon || "📚"}</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm line-clamp-1">
                  {quiz.title}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${difficultyConfig[quiz.difficulty].color}`}>
                    {difficultyConfig[quiz.difficulty].icon} {quiz.difficulty}
                  </span>
                  <span className="text-xs text-gray-500">
                    {quiz.questionsCount} Q
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={handleBookmark}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? 'text-blue-500 fill-current' : 'text-gray-400'}`} />
            </button>
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{quiz.duration}min</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{(quiz.participants / 1000).toFixed(1)}k</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {renderStars(quiz.rating)}
              <span className="text-gray-700 dark:text-gray-300 font-medium">{quiz.rating}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-all duration-300 overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top gradient bar */}
      <div className={`h-1.5 ${subjectConfig[quiz.subject]?.color || 'bg-gradient-to-r from-gray-500 to-gray-700'}`} />
      
      {/* Popularity badge */}
      {quiz.popularity && popularityConfig[quiz.popularity] && (
        <div className={`absolute top-3 right-3 ${popularityConfig[quiz.popularity].color} text-white px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 backdrop-blur-sm z-10`}>
          {popularityConfig[quiz.popularity].icon}
          {popularityConfig[quiz.popularity].label}
        </div>
      )}

      {/* Completion badge */}
      {quiz.isCompleted && (
        <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 backdrop-blur-sm z-10">
          <CheckCircle className="h-3 w-3" />
          Complété
        </div>
      )}

      {/* Paid/Free badge */}
      {quiz.isPaid && (
        <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 backdrop-blur-sm z-10">
          <Crown className="h-3 w-3" />
          Payant {quiz.price && `${quiz.price} MAD`}
        </div>
      )}
      {!quiz.isPaid && (
        <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 backdrop-blur-sm z-10">
          <Star className="h-3 w-3" />
          Gratuit
        </div>
      )}

      {/* Bookmark button */}
      <button
        onClick={handleBookmark}
        className={`absolute top-12 right-3 p-2 rounded-lg backdrop-blur-sm transition-all duration-300 z-10 ${
          isBookmarked 
            ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' 
            : 'bg-white/80 dark:bg-gray-900/80 text-gray-500 hover:text-blue-500'
        }`}
      >
        <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
      </button>

      {/* Content */}
      <div className="p-5">
        {/* Subject and university */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className={`h-10 w-10 rounded-xl ${subjectConfig[quiz.subject]?.color || 'bg-gray-500'} flex items-center justify-center text-white shadow-lg`}>
              <span className="text-lg">{subjectConfig[quiz.subject]?.icon || "📚"}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{quiz.subject}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs border ${difficultyConfig[quiz.difficulty].color}`}>
                  {difficultyConfig[quiz.difficulty].icon} {difficultyConfig[quiz.difficulty].label}
                </span>
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <GraduationCap className="h-3 w-3" />
                {quiz.university}
              </div>
            </div>
          </div>
        </div>

        {/* Title and description */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {quiz.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
            {quiz.description}
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Questions</div>
              <div className="font-semibold text-gray-900 dark:text-gray-100">{quiz.questionsCount}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Timer className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Durée</div>
              <div className="font-semibold text-gray-900 dark:text-gray-100">{quiz.duration} min</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Participants</div>
              <div className="font-semibold text-gray-900 dark:text-gray-100">
                {(quiz.participants / 1000).toFixed(1)}k
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div className="p-1.5 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Star className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Note</div>
              <div className="flex items-center gap-1">
                {renderStars(quiz.rating)}
                <span className="font-semibold text-gray-900 dark:text-gray-100">{quiz.rating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {quiz.tags.map((tag, index) => (
            <span 
              key={index}
              className="px-2.5 py-1 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium border border-gray-200 dark:border-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Score progress */}
        {(quiz.bestScore || quiz.currentScore) && (
          <div className="mb-4 space-y-2 transition-all duration-300">
              {quiz.bestScore && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Meilleur score</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">{quiz.bestScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div
                      style={{ width: `${quiz.bestScore}%` }}
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out"
                    />
                  </div>
                </div>
              )}
              
              {quiz.currentScore && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Dernier essai</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">{quiz.currentScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div
                      style={{ width: `${quiz.currentScore}%` }}
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                    />
                  </div>
                </div>
              )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`p-2 rounded-lg transition-colors ${
                isLiked 
                  ? 'bg-red-50 dark:bg-red-900/20 text-red-600' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500'
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <span className="text-xs text-gray-600 dark:text-gray-400">{likeCount}</span>
            
            <button
              onClick={handleShare}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <span className="text-xs text-gray-600 dark:text-gray-400">{quiz.shares}</span>
          </div>
          
          <button
            onClick={handleStartQuiz}
            disabled={quiz.isPro && !quiz.isCompleted}
            className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 hover:scale-105 active:scale-95 ${
              quiz.isPro && !quiz.isCompleted
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl"
                : quiz.isCompleted
                ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:shadow-xl"
                : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg hover:shadow-xl"
            }`}
          >
            {quiz.isPro && !quiz.isCompleted ? (
              <>
                <Lock className="h-4 w-4" />
                <span>Premium</span>
              </>
            ) : quiz.isCompleted ? (
              <>
                <Target className="h-4 w-4" />
                <span>Refaire</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                <span>Commencer</span>
              </>
            )}
          </button>
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{quiz.faculty}</span>
            </div>
            <div className="text-xs">
              {getTimeSince(quiz.createdAt)} • Par {quiz.author}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Grid component with animations
export const QuizCardGrid = ({ quizzes, onStartQuiz, loading = false, layout = 'grid' }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className={`${
        layout === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'flex flex-col'
      } gap-6`}>
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-5 animate-pulse">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
                </div>
              </div>
              <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            </div>
            <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-6"></div>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
              ))}
            </div>
            <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${
        layout === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'flex flex-col'
      } gap-6`}
    >
      {quizzes.map((quiz, index) => (
        <div key={quiz.id} className="transition-all duration-300 hover:scale-105">
          <QuizCard 
            quiz={quiz} 
            onStartQuiz={onStartQuiz}
            onBookmark={(id, bookmarked) => console.log(`Bookmarked ${id}: ${bookmarked}`)}
            onLike={(id, liked) => console.log(`Liked ${id}: ${liked}`)}
            onShare={(id) => console.log(`Shared ${id}`)}
            compact={layout === 'list'}
          />
        </div>
      ))}
    </div>
  );
};

export default QuizCard;