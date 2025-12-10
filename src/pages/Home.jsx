import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';
import QuizCard from '../components/QuizCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { 
  Play, 
  Trophy, 
  Users, 
  Star, 
  TrendingUp, 
  BookOpen,
  Clock,
  Award,
  GraduationCap,
  Zap,
  ArrowRight,
  ChevronRight,
  Shield,
  Target,
  Search,
  Filter,
  Sparkles,
  Medal,
  Globe,
  Lightbulb,
  Rocket,
  Coffee,
  Heart,
  Crown,
  Flame,
  BarChart3,
  Eye,
  MessageCircle,
  Calendar,
  MapPin,
  Building,
  CheckCircle,
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const { quizzes: contextQuizzes, statistics: contextStats } = useQuiz();
  const { user, isAuthenticated } = useAuth();
  
  const [featuredQuizzes, setFeaturedQuizzes] = useState([]);
  const [newQuizzes, setNewQuizzes] = useState([]);
  const [trendingQuizzes, setTrendingQuizzes] = useState([]);
  const [recommendedQuizzes, setRecommendedQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showStats, setShowStats] = useState(true);

  // Statistiques complètes
  const stats = {
    totalQuizzes: 245,
    activeUsers: 18650,
    averageScore: 82,
    quizzesCompleted: 124580,
    totalUniversities: 32,
    successRate: 88,
    totalSubjects: 56,
    totalHours: 62300
  };

  // Fonctionnalités principales
  const features = [
    {
      icon: Trophy,
      title: "Classement Compétitif",
      description: "Affrontez d'autres étudiants et montez dans le classement avec notre système de points et de badges.",
      color: "from-yellow-500 to-amber-600",
      details: ["Classements hebdomadaires", "Badges de performance", "Recompenses exclusives"]
    },
    {
      icon: BookOpen,
      title: "Quiz par Matière",
      description: "Des quiz spécialisés couvrant toutes les matières universitaires marocaines avec questions validées.",
      color: "from-blue-500 to-blue-700",
      details: ["56 matières couvertes", "Questions validées", "Programmes officiels"]
    },
    {
      icon: Clock,
      title: "Timer Intelligent",
      description: "Gérez votre temps efficacement avec notre système de timer adaptatif et analyses de performance.",
      color: "from-green-500 to-emerald-600",
      details: ["Timer personnalisable", "Analyses détaillées", "Suggestions d'amélioration"]
    },
    {
      icon: Shield,
      title: "Certification",
      description: "Obtenez des certificats officiels de réussite que vous pouvez partager sur LinkedIn et votre CV.",
      color: "from-purple-500 to-purple-700",
      details: ["Certificats officiels", "Partage LinkedIn", "Validation en ligne"]
    },
    {
      icon: Zap,
      title: "Mode Défi",
      description: "Défiez vos amis en temps réel dans des duels passionnants et gagnez des récompenses exclusives.",
      color: "from-pink-500 to-rose-600",
      details: ["Duels en direct", "Invitations par lien", "Historique des matchs"]
    },
    {
      icon: Target,
      title: "Apprentissage Adaptatif",
      description: "Des quiz qui s'adaptent à votre niveau de compétence pour une progression optimale.",
      color: "from-orange-500 to-red-600",
      details: ["Niveau auto-détecté", "Questions progressives", "Parcours personnalisé"]
    }
  ];

  // Universités avec plus de données
  const universities = [
    { 
      name: "Université Hassan II", 
      city: "Casablanca", 
      students: 12500, 
      quizzes: 142,
      ranking: 1,
      color: "bg-gradient-to-r from-blue-500 to-blue-600"
    },
    { 
      name: "Université Mohammed V", 
      city: "Rabat", 
      students: 11000, 
      quizzes: 138,
      ranking: 2,
      color: "bg-gradient-to-r from-green-500 to-green-600"
    },
    { 
      name: "Université Cadi Ayyad", 
      city: "Marrakech", 
      students: 9500, 
      quizzes: 125,
      ranking: 3,
      color: "bg-gradient-to-r from-purple-500 to-purple-600"
    },
    { 
      name: "Université Ibn Tofail", 
      city: "Kénitra", 
      students: 8200, 
      quizzes: 98,
      ranking: 4,
      color: "bg-gradient-to-r from-red-500 to-red-600"
    },
    { 
      name: "Université Sidi Mohamed Ben Abdellah", 
      city: "Fès", 
      students: 8800, 
      quizzes: 112,
      ranking: 5,
      color: "bg-gradient-to-r from-amber-500 to-amber-600"
    },
    { 
      name: "Université Abdelmalek Essaâdi", 
      city: "Tétouan", 
      students: 7600, 
      quizzes: 105,
      ranking: 6,
      color: "bg-gradient-to-r from-indigo-500 to-indigo-600"
    },
    { 
      name: "Université Chouaib Doukkali", 
      city: "El Jadida", 
      students: 6200, 
      quizzes: 88,
      ranking: 7,
      color: "bg-gradient-to-r from-cyan-500 to-cyan-600"
    },
    { 
      name: "Université Al Akhawayn", 
      city: "Ifrane", 
      students: 2800, 
      quizzes: 65,
      ranking: 8,
      color: "bg-gradient-to-r from-emerald-500 to-emerald-600"
    }
  ];

  // Catégories de quiz
  const categories = [
    { id: 'all', name: 'Tous les quiz', icon: '🎯', count: stats.totalQuizzes },
    { id: 'informatique', name: 'Informatique', icon: '💻', count: 68 },
    { id: 'mathematiques', name: 'Mathématiques', icon: '🧮', count: 42 },
    { id: 'physique', name: 'Physique', icon: '⚡', count: 38 },
    { id: 'medecine', name: 'Médecine', icon: '🏥', count: 34 },
    { id: 'droit', name: 'Droit', icon: '⚖️', count: 29 },
    { id: 'economie', name: 'Économie', icon: '💰', count: 27 },
    { id: 'langues', name: 'Langues', icon: '🗣️', count: 24 },
    { id: 'ingenierie', name: 'Ingénierie', icon: '🔧', count: 46 }
  ];

  // Témoignages
  const testimonials = [
    {
      name: "Ahmed El Fassi",
      role: "Étudiant en Informatique",
      university: "Université Hassan II",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      content: "Cette plateforme m'a permis de réussir mes examens avec brio. Les quiz correspondent parfaitement au programme et le système de progression est motivant.",
      rating: 5,
      date: "Il y a 2 semaines"
    },
    {
      name: "Fatima Zahra",
      role: "Étudiante en Médecine",
      university: "Université Mohammed V",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      content: "Les quiz d'anatomie sont incroyablement détaillés. J'ai amélioré mes notes de 30% depuis que j'utilise cette plateforme régulièrement.",
      rating: 5,
      date: "Il y a 1 mois"
    },
    {
      name: "Karim Alami",
      role: "Étudiant en Droit",
      university: "Université Cadi Ayyad",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      content: "En tant que futur avocat, les quiz de droit constitutionnel m'ont été extrêmement utiles pour préparer le barreau. Très professionnel !",
      rating: 4,
      date: "Il y a 3 semaines"
    }
  ];

  // Handlers pour les actions des cartes de quiz
  const handleStartQuiz = (quizId) => {
    const quiz = contextQuizzes.find(q => q.id === quizId);
    
    if (quiz && quiz.isPro && !user?.isPro) {
      navigate('/premium', { state: { quiz } });
    } else {
      navigate(`/quiz/${quizId}`);
    }
  };

  const handleBookmark = (quizId, isBookmarked) => {
    console.log(`Quiz ${quizId} ${isBookmarked ? 'ajouté aux' : 'retiré des'} favoris`);
  };

  const handleLike = (quizId, isLiked) => {
    console.log(`Quiz ${quizId} ${isLiked ? 'aimé' : 'pas aimé'}`);
  };

  const handleShare = (quizId) => {
    const quiz = contextQuizzes.find(q => q.id === quizId);
    if (quiz && navigator.share) {
      navigator.share({
        title: quiz.title,
        text: `Découvrez ce quiz sur Moroccan University Quiz: ${quiz.description}`,
        url: `${window.location.origin}/quiz/${quizId}`
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/quiz/${quizId}`);
      alert('Lien copié dans le presse-papier !');
    }
  };

  const handleQuickStart = () => {
    if (contextQuizzes.length > 0) {
      const randomQuiz = contextQuizzes[Math.floor(Math.random() * contextQuizzes.length)];
      handleStartQuiz(randomQuiz.id);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Filtrer les quizzes
      setFeaturedQuizzes(contextQuizzes.filter(q => q.isFeatured).slice(0, 6));
      setNewQuizzes(contextQuizzes.filter(q => q.isNew).slice(0, 4));
      setTrendingQuizzes(contextQuizzes.sort((a, b) => b.attempts - a.attempts).slice(0, 4));
      
      // Quiz recommandés basés sur l'utilisateur
      if (user) {
        const userSubjects = user.subjects || [1, 2]; // IDs des matières
        const recommended = contextQuizzes
          .filter(q => userSubjects.includes(q.subjectId))
          .slice(0, 3);
        setRecommendedQuizzes(recommended);
      }
      
      setLoading(false);
    };

    loadData();
  }, [contextQuizzes, user]);

  const StatCard = ({ icon: Icon, value, label, color, trend, subLabel }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${color} mb-4`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm font-medium text-gray-700 mb-1">{label}</div>
      {trend && (
        <div className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
          trend > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {trend > 0 ? '↗' : '↘'} {Math.abs(trend)}%
        </div>
      )}
      {subLabel && <div className="text-xs text-gray-500 mt-1">{subLabel}</div>}
    </div>
  );

  const FeatureCard = ({ feature }) => {
    const Icon = feature.icon;
    return (
      <div className="group bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} mb-6 transform group-hover:scale-110 transition-transform duration-500`}>
          <Icon className="h-7 w-7 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
          {feature.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {feature.description}
        </p>
        <ul className="space-y-2">
          {feature.details.map((detail, index) => (
            <li key={index} className="flex items-center gap-2 text-xs text-gray-500">
              <CheckCircle className="h-3 w-3 text-green-500" />
              {detail}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const UniversityCard = ({ university }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg ${university.color} flex items-center justify-center font-bold text-white`}>
            {university.name.split(' ').map(w => w[0]).join('')}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{university.name}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="h-3 w-3" />
              {university.city}
            </div>
          </div>
        </div>
        {university.ranking <= 3 && (
          <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-lg text-xs font-bold">
            <Crown className="h-3 w-3" />
            Top {university.ranking}
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-gray-900">{university.quizzes}</div>
          <div className="text-xs text-gray-600">Quiz</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-gray-900">{(university.students / 1000).toFixed(1)}k</div>
          <div className="text-xs text-gray-600">Étudiants</div>
        </div>
      </div>
    </div>
  );

  const TestimonialCard = ({ testimonial }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-start gap-3 mb-4">
        <img 
          src={testimonial.avatar} 
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
          <div className="text-sm text-gray-600">{testimonial.role}</div>
          <div className="text-xs text-gray-500">{testimonial.university}</div>
        </div>
        <div className="ml-auto flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i}
              className={`h-4 w-4 ${
                i < testimonial.rating 
                  ? 'text-yellow-500 fill-current' 
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
      <div className="text-sm text-gray-500">{testimonial.date}</div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" label="Chargement de la plateforme..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden min-h-screen flex items-center">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-white/5 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left column */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-2">
                <Sparkles className="h-4 w-4 text-yellow-300" />
                <span className="text-sm font-medium">Plateforme N°1 des Quiz Universitaires au Maroc</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                  Testez Vos
                </span>
                <br />
                <span className="bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
                  Connaissances
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                La plateforme ultime pour les étudiants universitaires marocains.
                <span className="text-yellow-300 font-semibold"> Maîtrisez vos cours, </span>
                excellez dans vos examens et rejoignez la plus grande communauté étudiante.
              </p>

              {/* Quick stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-white/5 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl font-bold">{stats.totalQuizzes}+</div>
                  <div className="text-sm text-blue-200">Quiz</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl font-bold">{stats.totalUniversities}</div>
                  <div className="text-sm text-blue-200">Universités</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl font-bold">{stats.totalSubjects}</div>
                  <div className="text-sm text-blue-200">Matières</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl font-bold">{stats.successRate}%</div>
                  <div className="text-sm text-blue-200">Réussite</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleQuickStart}
                  className="group bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Zap className="h-6 w-6" />
                  Commencer un Quiz Aléatoire
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </button>
                
                <Link 
                  to="/quizzes"
                  className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-sm"
                >
                  <Search className="h-5 w-5" />
                  Explorer les Quiz
                </Link>
              </div>
            </div>

            {/* Right column - Illustration */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6">
                    <GraduationCap className="h-16 w-16 text-white" />
                  </div>
                  <div className="space-y-4">
                    <div className="text-2xl font-bold">Rejoignez {stats.activeUsers.toLocaleString()}+ étudiants</div>
                    <p className="text-blue-100">
                      Déjà convaincus par notre plateforme
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm">
                      <div className="flex -space-x-2">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full border-2 border-white"></div>
                        ))}
                      </div>
                      <span className="text-blue-200">Communauté active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-white"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-white"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-4 pb-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex flex-col items-center justify-center px-6 py-4 rounded-xl min-w-[140px] transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-blue-50 border-2 border-blue-500 shadow-lg transform scale-105'
                    : 'bg-gray-50 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <div className="font-semibold text-gray-900 text-sm text-center mb-1">{category.name}</div>
                <div className="text-xs text-gray-600">{category.count} quiz</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-4">
              <Sparkles className="h-4 w-4" />
              <span className="font-medium">Pourquoi nous choisir ?</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Une expérience d'apprentissage
              <span className="text-blue-600"> unique</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conçue spécialement pour répondre aux besoins des étudiants universitaires marocains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Quizzes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Quiz <span className="text-blue-600">Populaires</span>
              </h2>
              <p className="text-xl text-gray-600">
                Les quiz les plus appréciés par la communauté cette semaine
              </p>
            </div>
            <Link 
              to="/quizzes" 
              className="hidden lg:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg group"
            >
              Voir tous les quiz
              <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          {featuredQuizzes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredQuizzes.map(quiz => (
                <QuizCard 
                  key={quiz.id} 
                  quiz={quiz}
                  onStartQuiz={handleStartQuiz}
                  onBookmark={handleBookmark}
                  onLike={handleLike}
                  onShare={handleShare}
                  showActions={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                Aucun quiz disponible
              </h3>
              <p className="text-gray-600 mb-8">
                Les quiz seront bientôt ajoutés à la plateforme
              </p>
              <Link 
                to="/quizzes/create" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Rocket className="h-5 w-5" />
                Créer un quiz
              </Link>
            </div>
          )}

          <div className="text-center mt-12 lg:hidden">
            <Link 
              to="/quizzes" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700"
            >
              Explorer tous les quiz
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Notre <span className="text-yellow-300">impact</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Des chiffres qui démontrent notre engagement envers l'excellence académique
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard 
              icon={BookOpen}
              value={stats.totalQuizzes}
              label="Quiz Disponibles"
              subLabel="Mises à jour quotidiennes"
              color="from-blue-400 to-blue-600"
              trend={12}
            />
            <StatCard 
              icon={Users}
              value={stats.activeUsers.toLocaleString()}
              label="Étudiants Actifs"
              subLabel="Communauté grandissante"
              color="from-green-400 to-green-600"
              trend={8}
            />
            <StatCard 
              icon={Trophy}
              value={`${stats.averageScore}%`}
              label="Score Moyen"
              subLabel="Excellence académique"
              color="from-yellow-400 to-yellow-600"
              trend={5}
            />
            <StatCard 
              icon={TrendingUp}
              value={`${stats.successRate}%`}
              label="Taux de Réussite"
              subLabel="Satisfaction garantie"
              color="from-purple-400 to-purple-600"
              trend={7}
            />
          </div>

          {/* Additional stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="text-2xl font-bold">{stats.quizzesCompleted.toLocaleString()}</div>
              <div className="text-blue-200 text-sm">Quiz Complétés</div>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="text-2xl font-bold">{stats.totalHours.toLocaleString()}h</div>
              <div className="text-blue-200 text-sm">Temps d'Apprentissage</div>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="text-2xl font-bold">{stats.totalUniversities}</div>
              <div className="text-blue-200 text-sm">Universités</div>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="text-2xl font-bold">{stats.totalSubjects}</div>
              <div className="text-blue-200 text-sm">Matières</div>
            </div>
          </div>
        </div>
      </section>

      {/* Universities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-4">
              <Building className="h-4 w-4" />
              <span className="font-medium">Partenaire des universités</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Universités <span className="text-blue-600">Partenaires</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des quiz spécifiquement adaptés aux programmes de chaque établissement universitaire marocain
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {universities.map((university, index) => (
              <UniversityCard key={index} university={university} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/universities" 
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium"
            >
              Explorer toutes les universités
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ce que disent nos <span className="text-blue-600">étudiants</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez les expériences de ceux qui ont déjà transformé leur apprentissage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>

          {/* Overall rating */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <div className="text-5xl font-bold text-gray-900 mb-2">4.8</div>
                <div className="flex items-center justify-center lg:justify-start gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-500 fill-current" />
                  ))}
                </div>
                <div className="text-gray-600">Note moyenne sur 5.0</div>
              </div>
              
              <div className="flex-1 max-w-2xl">
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map(rating => (
                    <div key={rating} className="flex items-center gap-3">
                      <span className="w-12 text-gray-600">{rating} étoiles</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-500 rounded-full"
                          style={{ width: `${(6 - rating) * 20}%` }}
                        />
                      </div>
                      <span className="w-12 text-gray-600 text-right">{Math.floor((6 - rating) * 20)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mb-6">
            <Rocket className="h-10 w-10 text-gray-900" />
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Prêt à transformer votre apprentissage ?
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Rejoignez la plus grande communauté étudiante du Maroc et commencez votre parcours d'excellence dès aujourd'hui
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <>
                <button
                  onClick={handleQuickStart}
                  className="bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Zap className="h-6 w-6" />
                  Nouveau Quiz
                </button>
                <Link 
                  to="/profile" 
                  className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300"
                >
                  Voir Ma Progression
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/register" 
                  className="bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Sparkles className="h-6 w-6" />
                  Commencer Gratuitement
                </Link>
                <Link 
                  to="/login" 
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
                >
                  Se Connecter
                </Link>
              </>
            )}
          </div>
          
          {/* Trust indicators */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold">✅</div>
              <div className="text-sm text-gray-300 mt-2">100% Gratuit</div>
            </div>
            <div>
              <div className="text-2xl font-bold">🎯</div>
              <div className="text-sm text-gray-300 mt-2">Programmes Officiels</div>
            </div>
            <div>
              <div className="text-2xl font-bold">🛡️</div>
              <div className="text-sm text-gray-300 mt-2">Données Sécurisées</div>
            </div>
            <div>
              <div className="text-2xl font-bold">📱</div>
              <div className="text-sm text-gray-300 mt-2">Mobile Friendly</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
