import React, { useState } from 'react';
import { 
  Filter, 
  Search, 
  Grid, 
  List, 
  ChevronDown,
  BookOpen,
  GraduationCap,
  Calendar,
  Clock,
  Users,
  Star,
  TrendingUp,
  Sparkles,
  X,
  RefreshCw,
  Eye,
  Bookmark,
  Share2,
  Download,
  SortAsc,
  SortDesc,
  Layers,
  BarChart3
} from 'lucide-react';
// Inline module list component to avoid missing file issues and keep layout
const ModulesList = ({
  selectedLevel,
  selectedFaculty,
  selectedCategories,
  searchQuery,
  sortBy,
  sortOrder,
  viewMode,
  mode = 'browse',
}) => {
  // Sample dataset (can be replaced by API later)
  const modules = [
    { id: 1, title: 'Analyse 1', faculty: 'Faculté des Sciences', level: 'S1', category: 'math', rating: 4.7, students: 1200 },
    { id: 2, title: 'Algèbre Linéaire', faculty: 'Faculté des Sciences', level: 'S1', category: 'math', rating: 4.6, students: 980 },
    { id: 3, title: 'Programmation C', faculty: 'Faculté des Sciences et Techniques', level: 'S2', category: 'computer', rating: 4.5, students: 1500 },
    { id: 4, title: 'Économie Générale', faculty: 'Faculté des Sciences Économiques', level: 'S3', category: 'economics', rating: 4.3, students: 860 },
    { id: 5, title: 'Droit Constitutionnel', faculty: 'Faculté de Droit', level: 'S2', category: 'law', rating: 4.4, students: 730 },
  ];

  const filtered = modules
    .filter(m => !selectedLevel || m.level === selectedLevel)
    .filter(m => !selectedFaculty || m.faculty === selectedFaculty)
    .filter(m => selectedCategories.length === 0 || selectedCategories.includes(m.category))
    .filter(m => !searchQuery || m.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'alphabetical':
        return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      case 'recent':
      case 'popularity':
        return sortOrder === 'asc' ? a.students - b.students : b.students - a.students;
      case 'rating':
        return sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
      default:
        return 0;
    }
  });

  const Card = ({ module }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-semibold text-gray-900">{module.title}</h4>
          <p className="text-sm text-gray-600 mt-1">{module.faculty} • {module.level}</p>
        </div>
        <div className="text-sm font-medium text-amber-600">⭐ {module.rating}</div>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span>{module.students.toLocaleString()} étudiants</span>
        <span className="px-2 py-1 bg-gray-100 rounded-lg">{module.category}</span>
      </div>
      {mode === 'browse' && (
        <button className="mt-4 inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800">
          <Eye className="h-4 w-4" />
          Voir le module
        </button>
      )}
    </div>
  );

  if (sorted.length === 0) {
    return (
      <div className="mt-8 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-gray-600">
        Aucun module trouvé avec ces filtres.
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="mt-8 space-y-4">
        {sorted.map(module => (
          <Card key={module.id} module={module} />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {sorted.map(module => (
        <Card key={module.id} module={module} />
      ))}
    </div>
  );
};

const ModuleBrowser = () => {
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState('S1');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity'); // 'popularity', 'alphabetical', 'recent'
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const levels = [
    { id: 'S1', label: 'Semestre 1', description: 'Initiation' },
    { id: 'S2', label: 'Semestre 2', description: 'Fondamentaux' },
    { id: 'S3', label: 'Semestre 3', description: 'Spécialisation' },
    { id: 'S4', label: 'Semestre 4', description: 'Approfondissement' },
    { id: 'S5', label: 'Semestre 5', description: 'Projet & Recherche' },
    { id: 'S6', label: 'Semestre 6', description: 'Stage & Mémoire' }
  ];

  const faculties = [
    { id: 'sciences', name: 'Faculté des Sciences', color: 'bg-blue-500', count: 45 },
    { id: 'medecine', name: 'Faculté de Médecine', color: 'bg-red-500', count: 32 },
    { id: 'droit', name: 'Faculté de Droit', color: 'bg-purple-500', count: 28 },
    { id: 'lettres', name: 'Faculté des Lettres', color: 'bg-yellow-500', count: 36 },
    { id: 'economie', name: 'Faculté des Sciences Économiques', color: 'bg-green-500', count: 31 },
    { id: 'ingenierie', name: 'Faculté des Sciences et Techniques', color: 'bg-indigo-500', count: 42 }
  ];

  const categories = [
    { id: 'math', name: 'Mathématiques', icon: '🧮', count: 24 },
    { id: 'physics', name: 'Physique', icon: '⚛️', count: 18 },
    { id: 'chemistry', name: 'Chimie', icon: '🧪', count: 16 },
    { id: 'biology', name: 'Biologie', icon: '🧬', count: 22 },
    { id: 'computer', name: 'Informatique', icon: '💻', count: 35 },
    { id: 'languages', name: 'Langues', icon: '🗣️', count: 20 },
    { id: 'law', name: 'Droit', icon: '⚖️', count: 28 },
    { id: 'economics', name: 'Économie', icon: '📈', count: 19 }
  ];

  const sortOptions = [
    { id: 'popularity', label: 'Popularité', icon: TrendingUp },
    { id: 'alphabetical', label: 'Alphabétique', icon: SortAsc },
    { id: 'recent', label: 'Récent', icon: Calendar },
    { id: 'rating', label: 'Note', icon: Star }
  ];

  const stats = [
    { label: 'Modules disponibles', value: '245+', icon: Layers, color: 'text-blue-600 bg-blue-100' },
    { label: 'Quiz actifs', value: '1,850+', icon: BookOpen, color: 'text-green-600 bg-green-100' },
    { label: 'Étudiants inscrits', value: '18,650+', icon: Users, color: 'text-purple-600 bg-purple-100' },
    { label: 'Taux de réussite', value: '88%', icon: TrendingUp, color: 'text-amber-600 bg-amber-100' }
  ];

  const handleSort = (optionId) => {
    if (sortBy === optionId) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(optionId);
      setSortOrder('desc');
    }
  };

  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSelectedFaculty(null);
    setSelectedLevel('S1');
    setSearchQuery('');
    setSelectedCategories([]);
    setSortBy('popularity');
    setSortOrder('desc');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* En-tête avec titre et stats */}
      <div className="mb-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl">
                <Layers className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Bibliothèque de <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Modules</span>
                </h1>
                <p className="text-gray-600 mt-2">
                  Explorez tous les modules universitaires avec leurs quiz et ressources
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              {viewMode === 'grid' ? (
                <>
                  <List className="h-4 w-4" />
                  Liste
                </>
              ) : (
                <>
                  <Grid className="h-4 w-4" />
                  Grille
                </>
              )}
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exporter
            </button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar des filtres */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Filtres rapides */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filtres
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                >
                  <RefreshCw className="h-4 w-4" />
                  Réinitialiser
                </button>
              </div>

              {/* Recherche */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un module..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Niveau */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Niveau
                </h4>
                <div className="space-y-2">
                  {levels.map(level => (
                    <button
                      key={level.id}
                      onClick={() => setSelectedLevel(level.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                        selectedLevel === level.id
                          ? 'bg-blue-50 border border-blue-200 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-medium">{level.label}</div>
                      <div className="text-xs text-gray-500">{level.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Catégories */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Catégories
                </h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => toggleCategory(category.id)}
                      className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-all ${
                        selectedCategories.includes(category.id)
                          ? 'bg-blue-50 border border-blue-200'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span>{category.icon}</span>
                        <span className="text-gray-700">{category.name}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        selectedCategories.includes(category.id)
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Facultés */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Facultés
                </h4>
                <div className="space-y-2">
                  {faculties.map(faculty => (
                    <button
                      key={faculty.id}
                      onClick={() => setSelectedFaculty(faculty.id)}
                      className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-all ${
                        selectedFaculty === faculty.id
                          ? 'bg-blue-50 border border-blue-200'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${faculty.color}`}></div>
                        <span className="text-gray-700">{faculty.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">{faculty.count}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
              <h4 className="text-sm font-medium text-blue-800 mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                En bref
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">Modules populaires</span>
                  <span className="text-sm font-semibold text-blue-900">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">Nouveaux cette semaine</span>
                  <span className="text-sm font-semibold text-blue-900">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">À venir</span>
                  <span className="text-sm font-semibold text-blue-900">12</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="lg:col-span-3">
          {/* Barre de contrôle */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {selectedCategories.length > 0 && `${selectedCategories.length} catégorie(s)`}
                  {selectedFaculty && ` • ${faculties.find(f => f.id === selectedFaculty)?.name}`}
                  {selectedLevel && ` • Semestre ${selectedLevel}`}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Filtres actifs */}
                <div className="flex flex-wrap gap-2">
                  {selectedCategories.map(catId => {
                    const cat = categories.find(c => c.id === catId);
                    return (
                      <span
                        key={catId}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {cat?.icon} {cat?.name}
                        <button
                          onClick={() => toggleCategory(catId)}
                          className="ml-1 hover:text-blue-900"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    );
                  })}
                  {selectedFaculty && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {faculties.find(f => f.id === selectedFaculty)?.name}
                      <button
                        onClick={() => setSelectedFaculty(null)}
                        className="ml-1 hover:text-purple-900"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                </div>

                {/* Tri */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Trier par:</span>
                  <div className="flex gap-1">
                    {sortOptions.map(option => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={option.id}
                          onClick={() => handleSort(option.id)}
                          className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 ${
                            sortBy === option.id
                              ? 'bg-blue-100 text-blue-600'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          {option.label}
                          {sortBy === option.id && (
                            <span className="text-xs">
                              {sortOrder === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Liste des modules */}
          <ModulesList 
            selectedLevel={selectedLevel}
            selectedFaculty={selectedFaculty}
            selectedCategories={selectedCategories}
            searchQuery={searchQuery}
            sortBy={sortBy}
            sortOrder={sortOrder}
            viewMode={viewMode}
            mode="browse"
          />

          {/* Suggestions */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Star className="h-6 w-6 text-yellow-500" />
              Suggestions pour vous
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Algorithmique Avancée', faculty: 'Informatique', level: 'S4', rating: 4.8 },
                { title: 'Économétrie', faculty: 'Sciences Économiques', level: 'S3', rating: 4.6 },
                { title: 'Droit des Affaires', faculty: 'Droit', level: 'S5', rating: 4.7 }
              ].map((module, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">{module.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                          {module.faculty}
                        </span>
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded">
                          {module.level}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{module.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Explorez les concepts avancés avec des quiz interactifs
                  </p>
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                      Explorer
                    </button>
                    <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Bookmark className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant Building pour remplacer l'import manquant
const Building = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

export default ModuleBrowser;