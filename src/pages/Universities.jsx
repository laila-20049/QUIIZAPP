import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import {
  MapPin,
  Users,
  BookOpen,
  Search,
  Filter,
  Star,
  ChevronRight,
  GraduationCap,
  Award,
  TrendingUp,
  Globe,
  Building,
  Clock,
  BarChart3,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Universities = () => {
  const navigate = useNavigate();
  const { quizzes = [] } = useQuiz();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [sortBy, setSortBy] = useState('students');
  const [loading, setLoading] = useState(false);

  // Toutes les universités marocaines
  const allUniversities = [
    {
      id: 1,
      name: 'Université Hassan II',
      city: 'Casablanca',
      acronym: 'UH2',
      founded: 1993,
      students: 12500,
      quizzes: 142,
      rating: 4.7,
      description: 'Première université du Maroc avec une forte présence dans les sciences et l\'ingénierie.',
      color: 'from-blue-600 to-blue-800',
      featured: true,
      faculties: [
        'Faculté des Sciences',
        'Faculté des Sciences et Techniques',
        'Faculté des Sciences Économiques',
        'Faculté de Droit'
      ]
    },
    {
      id: 2,
      name: 'Université Mohammed V',
      city: 'Rabat',
      acronym: 'UM5',
      founded: 1957,
      students: 11000,
      quizzes: 138,
      rating: 4.8,
      description: 'Université capitale réputée pour ses programmes en lettres et sciences humaines.',
      color: 'from-green-600 to-green-800',
      featured: true,
      faculties: [
        'Faculté des Sciences',
        'ENSIAS',
        'ENSMR',
        'Faculté de Lettres'
      ]
    },
    {
      id: 3,
      name: 'Université Cadi Ayyad',
      city: 'Marrakech',
      acronym: 'UCA',
      founded: 1978,
      students: 9500,
      quizzes: 125,
      rating: 4.6,
      description: 'Université dynamique du sud avec excellence en sciences appliquées.',
      color: 'from-purple-600 to-purple-800',
      featured: true,
      faculties: [
        'Faculté des Sciences Semlalia',
        'ENSA Marrakech',
        'Faculté des Sciences et Techniques'
      ]
    },
    {
      id: 4,
      name: 'Université Ibn Tofail',
      city: 'Kénitra',
      acronym: 'UIT',
      founded: 1989,
      students: 8200,
      quizzes: 98,
      rating: 4.4,
      description: 'Centre académique régional pour sciences et technologies.',
      color: 'from-red-600 to-red-800',
      featured: false,
      faculties: [
        'Faculté des Sciences',
        'Faculté des Sciences Techniques'
      ]
    },
    {
      id: 5,
      name: 'Université Sidi Mohamed Ben Abdellah',
      city: 'Fès',
      acronym: 'USMBA',
      founded: 1975,
      students: 8800,
      quizzes: 112,
      rating: 4.5,
      description: 'Université historique avec traditions académiques fortes.',
      color: 'from-amber-600 to-amber-800',
      featured: false,
      faculties: [
        'Faculté des Sciences Dhar El Mahraz',
        'ENSA Fès',
        'Faculté de Lettres'
      ]
    },
    {
      id: 6,
      name: 'Université Abdelmalek Essaâdi',
      city: 'Tétouan',
      acronym: 'UAE',
      founded: 1973,
      students: 7600,
      quizzes: 105,
      rating: 4.3,
      description: 'Université du nord avec programmes innovants en sciences.',
      color: 'from-indigo-600 to-indigo-800',
      featured: false,
      faculties: [
        'ENCG Tétouan',
        'Faculté des Sciences Tétouan',
        'Faculté de Littérature'
      ]
    },
    {
      id: 7,
      name: 'Université Ibn Zohr',
      city: 'Agadir',
      acronym: 'UIZ',
      founded: 1989,
      students: 6500,
      quizzes: 88,
      rating: 4.2,
      description: 'Université moderne du sud avec focus sur technologies.',
      color: 'from-cyan-600 to-cyan-800',
      featured: false,
      faculties: [
        'Faculté des Sciences',
        'ENSA Agadir',
        'Faculté des Sciences Techniques'
      ]
    },
    {
      id: 8,
      name: 'Université Chouaib Doukkali',
      city: 'El Jadida',
      acronym: 'UCD',
      founded: 1989,
      students: 5200,
      quizzes: 72,
      rating: 4.1,
      description: 'Université côtière avec programmes en sciences marines.',
      color: 'from-emerald-600 to-emerald-800',
      featured: false,
      faculties: [
        'Faculté des Sciences',
        'ENSA El Jadida'
      ]
    },
    {
      id: 9,
      name: 'Université Mohammed Premier',
      city: 'Oujda',
      acronym: 'UMP',
      founded: 1978,
      students: 7200,
      quizzes: 95,
      rating: 4.3,
      description: 'Université frontière avec perspectives internationales.',
      color: 'from-rose-600 to-rose-800',
      featured: false,
      faculties: [
        'Faculté des Sciences',
        'ENSA Oujda'
      ]
    },
    {
      id: 10,
      name: 'Université Sultan Moulay Slimane',
      city: 'Beni Mellal',
      acronym: 'USMS',
      founded: 1989,
      students: 5800,
      quizzes: 82,
      rating: 4.0,
      description: 'Université centrale avec programmes généraux solides.',
      color: 'from-orange-600 to-orange-800',
      featured: false,
      faculties: [
        'Faculté des Sciences',
        'Faculté de Technologie'
      ]
    },
    {
      id: 11,
      name: 'Université Al Akhawayn',
      city: 'Ifrane',
      acronym: 'AUI',
      founded: 1993,
      students: 2800,
      quizzes: 65,
      rating: 4.9,
      description: 'Université privée d\'élite avec standards internationaux.',
      color: 'from-violet-600 to-violet-800',
      featured: false,
      faculties: [
        'School of Science and Engineering',
        'School of Business and Economics'
      ]
    },
    {
      id: 12,
      name: 'Université Marrakech Cadi Ayyad',
      city: 'Marrakech',
      acronym: 'UMCA',
      founded: 2014,
      students: 4200,
      quizzes: 58,
      rating: 3.9,
      description: 'Université nouvelle avec programmes modernes.',
      color: 'from-pink-600 to-pink-800',
      featured: false,
      faculties: [
        'Faculté de Droit',
        'Faculté de Sciences Humaines'
      ]
    }
  ];

  const cities = ['all', ...new Set(allUniversities.map(u => u.city))].sort();

  // Filtrer les universités
  const filteredUniversities = allUniversities
    .filter(uni => {
      const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           uni.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCity = selectedCity === 'all' || uni.city === selectedCity;
      return matchesSearch && matchesCity;
    })
    .sort((a, b) => {
      if (sortBy === 'students') return b.students - a.students;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'quizzes') return b.quizzes - a.quizzes;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  const handleExploreUniversity = (universityId) => {
    navigate(`/university/${universityId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" label="Chargement des universités..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Building className="h-8 w-8 text-blue-400" />
            <h1 className="text-4xl lg:text-5xl font-bold">
              Toutes les Universités Marocaines
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl">
            Explorez les universités partenaires et leurs quiz spécialisés
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Chercher une université..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* City Filter */}
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Toutes les villes</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="students">Trier par: Étudiants</option>
              <option value="rating">Trier par: Note</option>
              <option value="quizzes">Trier par: Quiz</option>
              <option value="name">Trier par: Nom</option>
            </select>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            {filteredUniversities.length} université{filteredUniversities.length !== 1 ? 's' : ''} trouvée{filteredUniversities.length !== 1 ? 's' : ''}
          </div>
        </div>
      </section>

      {/* Universities Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredUniversities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredUniversities.map(university => (
                <div
                  key={university.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Header avec couleur */}
                  <div className={`h-32 bg-gradient-to-r ${university.color} relative overflow-hidden`}>
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <Star className="h-4 w-4 text-yellow-300 fill-current" />
                      <span className="text-white font-semibold text-sm">{university.rating}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Titre et location */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {university.name}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span>{university.city}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600">{university.acronym}</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {university.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-6 py-4 border-t border-b border-gray-200">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {(university.students / 1000).toFixed(1)}k
                        </div>
                        <div className="text-xs text-gray-600">Étudiants</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {university.quizzes}
                        </div>
                        <div className="text-xs text-gray-600">Quiz</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {university.faculties.length}
                        </div>
                        <div className="text-xs text-gray-600">Facultés</div>
                      </div>
                    </div>

                    {/* Faculties */}
                    <div className="mb-6">
                      <div className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        Facultés
                      </div>
                      <div className="space-y-1">
                        {university.faculties.slice(0, 2).map((faculty, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {faculty}
                          </div>
                        ))}
                        {university.faculties.length > 2 && (
                          <div className="text-xs text-gray-500 mt-1">
                            +{university.faculties.length - 2} autres
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Button */}
                    <button
                      onClick={() => handleExploreUniversity(university.id)}
                      className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r ${university.color} text-white hover:shadow-lg`}
                    >
                      <span>Explorer</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
              <Building className="h-20 w-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Aucune université trouvée
              </h3>
              <p className="text-gray-600 mb-8">
                Essayez d'ajuster vos critères de recherche
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCity('all');
                }}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Stats globales */}
      <section className="bg-white py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Statistiques Globales
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {allUniversities.length}
              </div>
              <div className="text-gray-600">Universités</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {allUniversities.reduce((sum, u) => sum + u.students, 0).toLocaleString()}
              </div>
              <div className="text-gray-600">Étudiants</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {allUniversities.reduce((sum, u) => sum + u.quizzes, 0)}+
              </div>
              <div className="text-gray-600">Quiz Disponibles</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-amber-600 mb-2">
                {(allUniversities.reduce((sum, u) => sum + u.rating, 0) / allUniversities.length).toFixed(1)}
              </div>
              <div className="text-gray-600">Note Moyenne</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Universities;
