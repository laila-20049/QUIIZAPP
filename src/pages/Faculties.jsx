import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Building, 
  MapPin, 
  Users, 
  Star,
  ChevronDown,
  Grid,
  List,
  BookOpen,
  GraduationCap,
  Globe,
  Calendar,
  TrendingUp,
  ExternalLink,
  Heart,
  Share2,
  Download,
  BarChart3,
  Check,
  X,
  Plus,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Award,
  Target,
  Layers,
  Clock,
  Eye,
  Edit,
  Trash2,
  Filter as FilterIcon,
  SortAsc,
  SortDesc,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Hash
} from 'lucide-react';
import { useDatabase } from '../hooks/useDatabase';
import LoadingSpinner from '../components/LoadingSpinner';

const Faculties = ({ 
  onFacultySelect,
  selectedUniversity = null,
  showFilters = true,
  mode = 'browse', // 'select', 'browse', or 'compact'
  limit = null,
  showActions = false,
  onFavoriteToggle = null,
  onShare = null,
  enableComparison = false,
  selectedFaculties = [],
  onSelectionChange = null
}) => {
  const [faculties, setFaculties] = useState([]);
  const [filteredFaculties, setFilteredFaculties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparedFaculties, setComparedFaculties] = useState([]);
  
  const { getQuizzes } = useDatabase();

  // Données complètes des facultés marocaines
  const facultiesData = useMemo(() => [
    {
      id: 1,
      name: "Faculté des Sciences",
      acronym: "FS",
      university: "Université Hassan II",
      universityId: 1,
      city: "Casablanca",
      region: "Casablanca-Settat",
      type: "Sciences Fondamentales",
      subType: "Sciences Exactes",
      students: 12500,
      professors: 450,
      rating: 4.3,
      reviews: 128,
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop",
      logo: "https://via.placeholder.com/100/3B82F6/FFFFFF?text=FS",
      description: "Fondée en 1975, la Faculté des Sciences de Casablanca est l'une des plus prestigieuses facultés de sciences au Maroc. Elle offre des formations de licence, master et doctorat dans les domaines des mathématiques, physique, chimie et biologie.",
      descriptionFull: "La Faculté des Sciences de Casablanca, créée en 1975, est un établissement d'enseignement supérieur public relevant de l'Université Hassan II de Casablanca. Elle assure des formations fondamentales et appliquées dans les domaines des sciences exactes et naturelles. La faculté dispose de laboratoires de recherche modernes et collabore avec plusieurs institutions internationales.",
      departments: ["Mathématiques", "Physique", "Chimie", "Biologie", "Géologie", "Informatique"],
      specialties: ["Mathématiques Appliquées", "Physique des Matériaux", "Chimie Organique", "Biotechnologie", "Géologie Appliquée"],
      established: 1975,
      website: "https://www.fs.uh2.ac.ma",
      email: "contact@fs.uh2.ac.ma",
      phone: "+212 5 22 23 45 67",
      address: "Boulevard des Facultés, Casablanca",
      social: {
        facebook: "https://facebook.com/fscasablanca",
        twitter: "https://twitter.com/fscasablanca",
        linkedin: "https://linkedin.com/school/fscasablanca"
      },
      ranking: 2,
      acceptanceRate: 65,
      graduationRate: 78,
      employmentRate: 85,
      researchBudget: 45000000,
      partnerships: 25,
      facilities: ["Bibliothèque", "Laboratoires", "Amphithéâtres", "Restaurant universitaire", "Résidences"],
      accreditation: ["Ministère de l'Éducation", "Conférence des Grandes Écoles"],
      languages: ["Français", "Arabe"],
      admission: ["Baccalauréat scientifique", "Concours d'entrée"],
      popularQuizzes: 45,
      studentClubs: 12
    },
    {
      id: 2,
      name: "Faculté des Sciences et Techniques",
      acronym: "FST",
      university: "Université Hassan II",
      universityId: 1,
      city: "Mohammedia",
      region: "Casablanca-Settat",
      type: "Sciences et Techniques",
      subType: "Ingénierie",
      students: 8200,
      professors: 320,
      rating: 4.5,
      reviews: 96,
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=400&fit=crop",
      logo: "https://via.placeholder.com/100/10B981/FFFFFF?text=FST",
      description: "La FST de Mohammedia forme des ingénieurs et chercheurs dans les domaines des sciences appliquées et du génie avec des programmes modernes et adaptés au marché.",
      descriptionFull: "La Faculté des Sciences et Techniques de Mohammedia, créée en 1986, est une institution d'excellence dans la formation d'ingénieurs et de chercheurs. Elle propose des filières d'ingénierie civile, mécanique, électrique et informatique, avec une forte orientation vers la recherche appliquée et l'innovation.",
      departments: ["Génie Civil", "Génie Informatique", "Génie Mécanique", "Génie Électrique", "Génie Chimique"],
      specialties: ["Génie Logiciel", "Réseaux et Télécoms", "Mécanique des Structures", "Énergies Renouvelables"],
      established: 1986,
      website: "https://www.fstm.ac.ma",
      email: "info@fstm.ac.ma",
      phone: "+212 5 23 31 47 89",
      address: "Route d'El Jadida, Mohammedia",
      social: {
        facebook: "https://facebook.com/fstmohammedia",
        linkedin: "https://linkedin.com/school/fstmohammedia"
      },
      ranking: 3,
      acceptanceRate: 60,
      graduationRate: 82,
      employmentRate: 90,
      researchBudget: 35000000,
      partnerships: 18,
      facilities: ["Ateliers techniques", "Centre de calcul", "FabLab", "Incubateur"],
      accreditation: ["Commission des Titres d'Ingénieur", "Ministère de l'Industrie"],
      languages: ["Français", "Anglais"],
      admission: ["Classes préparatoires", "Concours national"],
      popularQuizzes: 38,
      studentClubs: 8
    },
    {
      id: 3,
      name: "École Nationale des Sciences Appliquées",
      acronym: "ENSA",
      university: "Université Mohammed V",
      universityId: 2,
      city: "Rabat",
      region: "Rabat-Salé-Kénitra",
      type: "École d'Ingénieurs",
      subType: "Ingénierie Avancée",
      students: 4200,
      professors: 180,
      rating: 4.7,
      reviews: 145,
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=400&fit=crop",
      logo: "https://via.placeholder.com/100/8B5CF6/FFFFFF?text=ENSA",
      description: "ENSA Rabat forme des ingénieurs d'État dans les domaines des technologies de l'information, réseaux et systèmes intelligents avec une approche innovante.",
      descriptionFull: "L'École Nationale des Sciences Appliquées de Rabat, fondée en 1998, est une grande école d'ingénieurs marocaine. Elle propose des formations d'excellence en informatique, réseaux, data science et cybersécurité, avec de solides partenariats industriels et internationaux.",
      departments: ["Informatique", "Réseaux", "Data Science", "Cybersécurité", "Intelligence Artificielle"],
      specialties: ["Big Data", "Cloud Computing", "IoT", "Machine Learning", "Blockchain"],
      established: 1998,
      website: "https://www.ensar.ac.ma",
      email: "direction@ensar.ac.ma",
      phone: "+212 5 37 77 88 99",
      address: "Avenue Mohamed Ben Abdallah Regragui, Rabat",
      social: {
        twitter: "https://twitter.com/ensarrabat",
        linkedin: "https://linkedin.com/school/ensarrabat"
      },
      ranking: 1,
      acceptanceRate: 45,
      graduationRate: 88,
      employmentRate: 95,
      researchBudget: 60000000,
      partnerships: 32,
      facilities: ["Data Center", "Lab IA", "Salle immersive", "Coworking space"],
      accreditation: ["Commission des Titres d'Ingénieur", "CTI France"],
      languages: ["Français", "Anglais", "Arabe"],
      admission: ["Concours national commun", "Classes préparatoires"],
      popularQuizzes: 52,
      studentClubs: 15
    },
    {
      id: 4,
      name: "Faculté de Médecine et de Pharmacie",
      acronym: "FMP",
      university: "Université Cadi Ayyad",
      universityId: 3,
      city: "Marrakech",
      region: "Marrakech-Safi",
      type: "Médecine",
      subType: "Santé",
      students: 6500,
      professors: 280,
      rating: 4.6,
      reviews: 112,
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&h=400&fit=crop",
      logo: "https://via.placeholder.com/100/EF4444/FFFFFF?text=FMP",
      description: "La FMP de Marrakech forme des médecins, pharmaciens et dentistes avec des programmes cliniques avancés et une recherche médicale de pointe.",
      descriptionFull: "La Faculté de Médecine et de Pharmacie de Marrakech, établie en 1984, est un pôle d'excellence en formation médicale et pharmaceutique au Maroc. Elle dispose d'un centre hospitalier universitaire moderne et de laboratoires de recherche biomédicale.",
      departments: ["Médecine", "Pharmacie", "Chirurgie Dentaire", "Biologie Médicale", "Santé Publique"],
      specialties: ["Cardiologie", "Oncologie", "Pharmacologie", "Odontologie", "Épidémiologie"],
      established: 1984,
      website: "https://www.fmp.uca.ma",
      email: "secretariat@fmp.uca.ma",
      phone: "+212 5 24 43 46 49",
      address: "Rue Sidi Abbad, Marrakech",
      social: {
        facebook: "https://facebook.com/fmpmarrakech",
        instagram: "https://instagram.com/fmpmarrakech"
      },
      ranking: 4,
      acceptanceRate: 40,
      graduationRate: 75,
      employmentRate: 92,
      researchBudget: 55000000,
      partnerships: 28,
      facilities: ["CHU", "Labo d'anatomie", "Pharmacie pilote", "Simulation médicale"],
      accreditation: ["Ministère de la Santé", "OMS Collaborating Centre"],
      languages: ["Français", "Arabe", "Anglais"],
      admission: ["Concours médecine", "Bac S mention très bien"],
      popularQuizzes: 41,
      studentClubs: 10
    },
    {
      id: 5,
      name: "Faculté des Sciences Juridiques, Économiques et Sociales",
      acronym: "FSJES",
      university: "Université Mohammed V",
      universityId: 2,
      city: "Rabat",
      region: "Rabat-Salé-Kénitra",
      type: "Sciences Sociales",
      subType: "Droit et Économie",
      students: 18500,
      professors: 520,
      rating: 4.2,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop",
      logo: "https://via.placeholder.com/100/F59E0B/FFFFFF?text=FSJES",
      description: "La FSJES de Rabat est la plus grande faculté de droit et sciences économiques au Maroc, formant des juristes, économistes et gestionnaires.",
      descriptionFull: "Créée en 1962, la Faculté des Sciences Juridiques, Économiques et Sociales de Rabat est un établissement historique qui forme l'élite administrative et économique du Maroc. Elle propose des formations en droit, économie, gestion et sciences politiques.",
      departments: ["Droit", "Économie", "Gestion", "Sociologie", "Sciences Politiques"],
      specialties: ["Droit des Affaires", "Économétrie", "Marketing", "Relations Internationales"],
      established: 1962,
      website: "https://www.fsjesr.ac.ma",
      email: "fsjes@um5.ac.ma",
      phone: "+212 5 37 27 26 25",
      address: "Avenue des Nations Unies, Rabat",
      social: {
        facebook: "https://facebook.com/fsjesrabat",
        twitter: "https://twitter.com/fsjesrabat"
      },
      ranking: 5,
      acceptanceRate: 85,
      graduationRate: 70,
      employmentRate: 78,
      researchBudget: 25000000,
      partnerships: 22,
      facilities: ["Bibliothèque de droit", "Moot court", "Centre de documentation"],
      accreditation: ["Ministère de la Justice", "Barreau de Rabat"],
      languages: ["Arabe", "Français"],
      admission: ["Baccalauréat toutes séries"],
      popularQuizzes: 36,
      studentClubs: 18
    },
    {
      id: 6,
      name: "École Supérieure de Technologie",
      acronym: "EST",
      university: "Université Ibn Tofail",
      universityId: 4,
      city: "Kénitra",
      region: "Rabat-Salé-Kénitra",
      type: "Technologie",
      subType: "Techniques Appliquées",
      students: 3800,
      professors: 150,
      rating: 4.4,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
      logo: "https://via.placeholder.com/100/EC4899/FFFFFF?text=EST",
      description: "L'EST de Kénitra forme des techniciens supérieurs et ingénieurs d'État dans les domaines industriels avec une approche pratique et professionnelle.",
      descriptionFull: "L'École Supérieure de Technologie de Kénitra, fondée en 1992, se spécialise dans la formation de techniciens supérieurs et d'ingénieurs d'État dans les domaines du génie des procédés, maintenance industrielle et logistique.",
      departments: ["Génie des Procédés", "Maintenance Industrielle", "Logistique", "Qualité", "Informatique Industrielle"],
      specialties: ["Automatisme", "Logistique 4.0", "Contrôle qualité", "Maintenance prédictive"],
      established: 1992,
      website: "https://www.est-uit.ac.ma",
      email: "contact@est-uit.ac.ma",
      phone: "+212 5 37 37 40 40",
      address: "Campus universitaire, Kénitra",
      social: {
        linkedin: "https://linkedin.com/school/estkenitra"
      },
      ranking: 6,
      acceptanceRate: 70,
      graduationRate: 80,
      employmentRate: 87,
      researchBudget: 18000000,
      partnerships: 15,
      facilities: ["Ateliers industriels", "Plateforme logistique", "Centre d'essais"],
      accreditation: ["Ministère de l'Industrie", "Fédération des Industries"],
      languages: ["Français", "Arabe"],
      admission: ["Baccalauréat scientifique", "DUT"],
      popularQuizzes: 28,
      studentClubs: 6
    },
    {
      id: 7,
      name: "Faculté des Lettres et des Sciences Humaines",
      acronym: "FLSH",
      university: "Université Abdelmalek Essaâdi",
      universityId: 5,
      city: "Tétouan",
      region: "Tanger-Tétouan-Al Hoceïma",
      type: "Lettres et Humanités",
      subType: "Arts et Humanités",
      students: 9200,
      professors: 380,
      rating: 4.1,
      reviews: 54,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=400&fit=crop",
      logo: "https://via.placeholder.com/100/06B6D4/FFFFFF?text=FLSH",
      description: "La FLSH de Tétouan offre des formations en littérature, langues, histoire et philosophie avec une riche tradition académique et culturelle.",
      descriptionFull: "La Faculté des Lettres et des Sciences Humaines de Tétouan, créée en 1989, est un centre d'excellence pour les études littéraires et humaines au Nord du Maroc. Elle dispose d'un patrimoine culturel riche et de programmes de recherche en études méditerranéennes.",
      departments: ["Littérature", "Histoire", "Philosophie", "Langues", "Archéologie", "Anthropologie"],
      specialties: ["Littérature comparée", "Histoire méditerranéenne", "Philosophie islamique", "Linguistique"],
      established: 1989,
      website: "https://www.flsh.ae.ma",
      email: "flsh@uae.ac.ma",
      phone: "+212 5 39 99 23 45",
      address: "Route de Sebta, Tétouan",
      social: {
        facebook: "https://facebook.com/flshtetouan"
      },
      ranking: 7,
      acceptanceRate: 90,
      graduationRate: 68,
      employmentRate: 72,
      researchBudget: 15000000,
      partnerships: 12,
      facilities: ["Bibliothèque spécialisée", "Musée universitaire", "Centre de langues"],
      accreditation: ["Ministère de la Culture"],
      languages: ["Arabe", "Français", "Espagnol"],
      admission: ["Baccalauréat littéraire"],
      popularQuizzes: 22,
      studentClubs: 14
    },
    {
      id: 8,
      name: "Faculté des Sciences de l'Éducation",
      acronym: "FSE",
      university: "Université Hassan II",
      universityId: 1,
      city: "Casablanca",
      region: "Casablanca-Settat",
      type: "Éducation",
      subType: "Sciences Pédagogiques",
      students: 4200,
      professors: 160,
      rating: 4.0,
      reviews: 48,
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
      logo: "https://via.placeholder.com/100/84CC16/FFFFFF?text=FSE",
      description: "La FSE de Casablanca forme les futurs enseignants et chercheurs en sciences de l'éducation avec des programmes innovants et pratiques.",
      descriptionFull: "La Faculté des Sciences de l'Éducation de Casablanca, établie en 1995, se consacre à la formation des enseignants, conseillers pédagogiques et chercheurs en éducation. Elle développe des méthodes pédagogiques innovantes et mène des recherches en didactique.",
      departments: ["Pédagogie", "Psychologie", "Didactique", "Administration Scolaire", "Éducation Spécialisée"],
      specialties: ["Psychologie scolaire", "Didactique des disciplines", "Management éducatif", "Technologies éducatives"],
      established: 1995,
      website: "https://www.fse.uh2.ac.ma",
      email: "info@fse.uh2.ac.ma",
      phone: "+212 5 22 23 48 90",
      address: "Avenue Hassan II, Casablanca",
      social: {
        twitter: "https://twitter.com/fsecasablanca"
      },
      ranking: 8,
      acceptanceRate: 75,
      graduationRate: 77,
      employmentRate: 85,
      researchBudget: 12000000,
      partnerships: 10,
      facilities: ["Centre de ressources pédagogiques", "Salle d'observation", "Laboratoire de psychologie"],
      accreditation: ["Ministère de l'Éducation Nationale"],
      languages: ["Français", "Arabe"],
      admission: ["Bac +2 en sciences humaines"],
      popularQuizzes: 19,
      studentClubs: 7
    },
    {
      id: 9,
      name: "Institut National des Postes et Télécommunications",
      acronym: "INPT",
      university: "Institut National",
      universityId: 6,
      city: "Rabat",
      region: "Rabat-Salé-Kénitra",
      type: "École d'Ingénieurs",
      subType: "Télécommunications",
      students: 2800,
      professors: 120,
      rating: 4.8,
      reviews: 92,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop",
      logo: "https://via.placeholder.com/100/6366F1/FFFFFF?text=INPT",
      description: "L'INPT est une grande école d'ingénieurs spécialisée dans les TIC, formant des experts en télécommunications et technologies numériques.",
      descriptionFull: "L'Institut National des Postes et Télécommunications, créé en 1961, est un établissement public de formation d'ingénieurs et de managers dans le domaine des technologies de l'information et de la communication. Il est reconnu pour son excellence académique et ses liens étroits avec l'industrie.",
      departments: ["Télécommunications", "Réseaux", "Informatique", "Management", "Électronique"],
      specialties: ["5G et Réseaux", "Cybersécurité", "Data Science", "IoT", "Gestion de Projet"],
      established: 1961,
      website: "https://www.inpt.ac.ma",
      email: "contact@inpt.ac.ma",
      phone: "+212 5 37 77 77 77",
      address: "Madinat Al Irfane, Rabat",
      social: {
        linkedin: "https://linkedin.com/school/inptrabat",
        twitter: "https://twitter.com/inptrabat"
      },
      ranking: 1,
      acceptanceRate: 30,
      graduationRate: 92,
      employmentRate: 98,
      researchBudget: 70000000,
      partnerships: 45,
      facilities: ["Lab 5G", "Centre de cybersécurité", "Incubateur tech", "FabLab"],
      accreditation: ["Commission des Titres d'Ingénieur", "CTI France", "EUR-ACE"],
      languages: ["Français", "Anglais"],
      admission: ["Concours national très sélectif"],
      popularQuizzes: 65,
      studentClubs: 20
    },
    {
      id: 10,
      name: "Faculté de Droit et Sciences Économiques",
      acronym: "FDSE",
      university: "Université Cadi Ayyad",
      universityId: 3,
      city: "Marrakech",
      region: "Marrakech-Safi",
      type: "Sciences Sociales",
      subType: "Droit et Économie",
      students: 11500,
      professors: 420,
      rating: 4.3,
      reviews: 76,
      image: "https://images.unsplash.com/photo-1589391886085-8b6b0ac72a1a?w=800&h=400&fit=crop",
      logo: "https://via.placeholder.com/100/F97316/FFFFFF?text=FDSE",
      description: "La FDSE de Marrakech propose des formations en droit, économie et gestion dans un environnement académique dynamique et innovant.",
      descriptionFull: "La Faculté de Droit et Sciences Économiques de Marrakech est un établissement moderne qui forme des juristes, économistes et gestionnaires pour répondre aux besoins du marché régional et national. Elle développe des programmes adaptés aux évolutions socio-économiques.",
      departments: ["Droit Privé", "Droit Public", "Économie", "Gestion", "Finance"],
      specialties: ["Droit des Affaires", "Droit Fiscal", "Économie du Développement", "Finance Islamique"],
      established: 1990,
      website: "https://www.fdse.uca.ma",
      email: "fdse@uca.ac.ma",
      phone: "+212 5 24 43 43 43",
      address: "Avenue Prince Moulay Abdellah, Marrakech",
      social: {
        facebook: "https://facebook.com/fdsemarrakech"
      },
      ranking: 9,
      acceptanceRate: 80,
      graduationRate: 73,
      employmentRate: 79,
      researchBudget: 22000000,
      partnerships: 20,
      facilities: ["Bibliothèque juridique", "Médiathèque", "Salles de conférence"],
      accreditation: ["Ministère de la Justice"],
      languages: ["Arabe", "Français"],
      admission: ["Baccalauréat toutes séries"],
      popularQuizzes: 34,
      studentClubs: 11
    }
  ], []);

  // Types de facultés
  const facultyTypes = [
    { id: 'all', name: 'Toutes les facultés', icon: '🏛️' },
    { id: 'Sciences Fondamentales', name: 'Sciences Fondamentales', icon: '🔬' },
    { id: 'Sciences et Techniques', name: 'Sciences et Techniques', icon: '⚙️' },
    { id: 'École d\'Ingénieurs', name: 'Écoles d\'Ingénieurs', icon: '🎓' },
    { id: 'Médecine', name: 'Médecine et Santé', icon: '🏥' },
    { id: 'Sciences Sociales', name: 'Sciences Sociales', icon: '📊' },
    { id: 'Technologie', name: 'Technologie', icon: '💻' },
    { id: 'Lettres et Humanités', name: 'Lettres et Humanités', icon: '📚' },
    { id: 'Éducation', name: 'Éducation', icon: '👨‍🏫' }
  ];

  // Villes
  const cities = [
    'all',
    ...new Set(facultiesData.map(f => f.city))
  ];

  // Options de tri
  const sortOptions = [
    { id: 'name', label: 'Nom (A-Z)', icon: SortAsc },
    { id: 'rating', label: 'Note', icon: Star },
    { id: 'students', label: 'Nombre d\'étudiants', icon: Users },
    { id: 'ranking', label: 'Classement', icon: TrendingUp },
    { id: 'established', label: 'Date de création', icon: Calendar }
  ];

  useEffect(() => {
    const loadFaculties = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let filtered = facultiesData;
      
      if (selectedUniversity) {
        filtered = filtered.filter(f => f.universityId === selectedUniversity.id);
      }
      
      setFaculties(filtered);
      setFilteredFaculties(filtered);
      setLoading(false);
    };

    loadFaculties();
  }, [selectedUniversity]);

  // Filtrage et tri
  useEffect(() => {
    let filtered = [...faculties];
    
    // Filtre par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(f => 
        f.name.toLowerCase().includes(query) ||
        f.acronym.toLowerCase().includes(query) ||
        f.university.toLowerCase().includes(query) ||
        f.city.toLowerCase().includes(query) ||
        f.departments.some(d => d.toLowerCase().includes(query)) ||
        f.specialties?.some(s => s.toLowerCase().includes(query))
      );
    }
    
    // Filtre par type
    if (selectedType !== 'all') {
      filtered = filtered.filter(f => f.type === selectedType);
    }
    
    // Filtre par ville
    if (selectedCity !== 'all') {
      filtered = filtered.filter(f => f.city === selectedCity);
    }
    
    // Tri
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'name') {
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    // Pagination
    if (limit) {
      filtered = filtered.slice(0, limit);
    } else {
      const startIndex = (currentPage - 1) * itemsPerPage;
      filtered = filtered.slice(startIndex, startIndex + itemsPerPage);
    }
    
    setFilteredFaculties(filtered);
  }, [searchQuery, selectedType, selectedCity, sortBy, sortOrder, faculties, currentPage, itemsPerPage, limit]);

  const handleFacultySelect = (faculty) => {
    if (comparisonMode && enableComparison) {
      const isSelected = comparedFaculties.some(f => f.id === faculty.id);
      if (isSelected) {
        setComparedFaculties(prev => prev.filter(f => f.id !== faculty.id));
      } else if (comparedFaculties.length < 3) {
        setComparedFaculties(prev => [...prev, faculty]);
      }
    } else {
      setSelectedFaculty(faculty);
      onFacultySelect?.(faculty);
    }
  };

  const toggleFavorite = (facultyId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(facultyId)) {
        newFavorites.delete(facultyId);
      } else {
        newFavorites.add(facultyId);
      }
      return newFavorites;
    });
    onFavoriteToggle?.(facultyId);
  };

  const handleShare = (faculty) => {
    if (onShare) {
      onShare(faculty);
    } else {
      navigator.clipboard.writeText(`${faculty.name} - ${faculty.university}`);
      alert('Lien copié dans le presse-papier');
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedCity('all');
    setSortBy('name');
    setSortOrder('asc');
    setShowFiltersPanel(false);
  };

  const FacultyCard = ({ faculty }) => (
    <div className="group relative">
      <div 
        className={`bg-white rounded-xl shadow-sm border-2 transition-all duration-300 hover:shadow-xl cursor-pointer overflow-hidden ${
          selectedFaculty?.id === faculty.id 
            ? 'border-blue-500 ring-2 ring-blue-200' 
            : comparedFaculties.some(f => f.id === faculty.id)
            ? 'border-purple-500 ring-2 ring-purple-200'
            : 'border-gray-200 hover:border-blue-300'
        }`}
        onClick={() => handleFacultySelect(faculty)}
      >
        {/* Image et badges */}
        <div className="relative h-48 bg-gradient-to-r from-gray-900 to-gray-700 overflow-hidden">
          <img 
            src={faculty.image} 
            alt={faculty.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              {faculty.acronym}
            </div>
            {faculty.ranking <= 3 && (
              <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                Top {faculty.ranking}
              </div>
            )}
          </div>
          
          {/* Actions */}
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(faculty.id);
              }}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              <Heart className={`h-4 w-4 ${
                favorites.has(faculty.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleShare(faculty);
              }}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              <Share2 className="h-4 w-4 text-gray-600" />
            </button>
          </div>
          
          {/* Note */}
          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white px-3 py-2 rounded-lg flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="font-bold">{faculty.rating}</span>
            <span className="text-gray-300 text-sm">({faculty.reviews})</span>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                {faculty.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Building className="h-4 w-4 text-blue-500" />
                <span className="font-medium">{faculty.university}</span>
              </div>
            </div>
            {enableComparison && (
              <div className={`h-5 w-5 rounded border flex items-center justify-center flex-shrink-0 ${
                comparedFaculties.some(f => f.id === faculty.id)
                  ? 'border-purple-500 bg-purple-500'
                  : 'border-gray-300'
              }`}>
                {comparedFaculties.some(f => f.id === faculty.id) && (
                  <Check className="h-3 w-3 text-white" />
                )}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-green-500" />
              <span className="truncate">{faculty.city}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="h-4 w-4 text-purple-500" />
              <span>{(faculty.students / 1000).toFixed(1)}k</span>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {faculty.description}
          </p>

          {/* Départements */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {faculty.departments.slice(0, 3).map((dept, index) => (
              <span 
                key={index}
                className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium"
              >
                {dept}
              </span>
            ))}
            {faculty.departments.length > 3 && (
              <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                +{faculty.departments.length - 3}
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t">
            <div className="text-center">
              <div className="text-xs text-gray-500">Acceptation</div>
              <div className="font-bold text-gray-900">{faculty.acceptanceRate}%</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500">Diplômés</div>
              <div className="font-bold text-gray-900">{faculty.graduationRate}%</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500">Emploi</div>
              <div className="font-bold text-gray-900">{faculty.employmentRate}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const FacultyListItem = ({ faculty }) => (
    <div 
      className={`bg-white rounded-xl border-2 p-5 transition-all duration-300 hover:shadow-lg cursor-pointer ${
        selectedFaculty?.id === faculty.id 
          ? 'border-blue-500 bg-blue-50' 
          : comparedFaculties.some(f => f.id === faculty.id)
          ? 'border-purple-500 bg-purple-50'
          : 'border-gray-200 hover:border-blue-300'
      }`}
      onClick={() => handleFacultySelect(faculty)}
    >
      <div className="flex items-start gap-5">
        {/* Logo */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-lg">
            {faculty.acronym}
          </div>
        </div>
        
        {/* Contenu principal */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {faculty.name}
              </h3>
              <div className="flex items-center flex-wrap gap-3 text-sm text-gray-600 mb-2">
                <div className="flex items-center gap-1">
                  <Building className="h-4 w-4" />
                  <span className="font-medium">{faculty.university}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{faculty.city}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{faculty.students.toLocaleString()} étudiants</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="font-bold">{faculty.rating}</span>
                <span className="text-gray-500">({faculty.reviews})</span>
              </div>
              
              {enableComparison && (
                <div className={`h-5 w-5 rounded border flex items-center justify-center ${
                  comparedFaculties.some(f => f.id === faculty.id)
                    ? 'border-purple-500 bg-purple-500'
                    : 'border-gray-300'
                }`}>
                  {comparedFaculties.some(f => f.id === faculty.id) && (
                    <Check className="h-3 w-3 text-white" />
                  )}
                </div>
              )}
            </div>
          </div>
          
          <p className="text-gray-600 mb-4 line-clamp-2">
            {faculty.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            {/* Départements */}
            <div className="flex flex-wrap gap-1.5">
              {faculty.departments.slice(0, 4).map((dept, index) => (
                <span 
                  key={index}
                  className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
                >
                  {dept}
                </span>
              ))}
            </div>
            
            {/* Stats */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Target className="h-4 w-4 text-green-500" />
                <span>{faculty.acceptanceRate}% acceptation</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="h-4 w-4 text-blue-500" />
                <span>{faculty.graduationRate}% diplômés</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const FacultyCompact = ({ faculty }) => (
    <div 
      className={`bg-white rounded-lg border p-4 transition-all hover:shadow-md cursor-pointer ${
        selectedFaculty?.id === faculty.id 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-200 hover:border-blue-300'
      }`}
      onClick={() => handleFacultySelect(faculty)}
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center font-bold">
          {faculty.acronym}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 truncate">{faculty.name}</h4>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Building className="h-3 w-3" />
            <span className="truncate">{faculty.university}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <Star className="h-4 w-4 text-yellow-500 fill-current" />
          <span className="font-medium">{faculty.rating}</span>
        </div>
      </div>
    </div>
  );

  // Tableau de comparaison
  const ComparisonTable = () => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Comparaison des facultés</h3>
        <button
          onClick={() => setComparisonMode(false)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Critère</th>
              {comparedFaculties.map(faculty => (
                <th key={faculty.id} className="text-left p-4 min-w-[200px]">
                  <div className="font-bold text-lg">{faculty.acronym}</div>
                  <div className="text-sm text-gray-600">{faculty.name}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-4 font-medium">Université</td>
              {comparedFaculties.map(faculty => (
                <td key={faculty.id} className="p-4">{faculty.university}</td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-4 font-medium">Ville</td>
              {comparedFaculties.map(faculty => (
                <td key={faculty.id} className="p-4">{faculty.city}</td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-4 font-medium">Étudiants</td>
              {comparedFaculties.map(faculty => (
                <td key={faculty.id} className="p-4">{faculty.students.toLocaleString()}</td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-4 font-medium">Note</td>
              {comparedFaculties.map(faculty => (
                <td key={faculty.id} className="p-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span>{faculty.rating}</span>
                  </div>
                </td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-4 font-medium">Taux d'acceptation</td>
              {comparedFaculties.map(faculty => (
                <td key={faculty.id} className="p-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${faculty.acceptanceRate}%` }}
                    />
                  </div>
                  <span className="text-sm">{faculty.acceptanceRate}%</span>
                </td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-4 font-medium">Taux de diplomation</td>
              {comparedFaculties.map(faculty => (
                <td key={faculty.id} className="p-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${faculty.graduationRate}%` }}
                    />
                  </div>
                  <span className="text-sm">{faculty.graduationRate}%</span>
                </td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-4 font-medium">Taux d'emploi</td>
              {comparedFaculties.map(faculty => (
                <td key={faculty.id} className="p-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${faculty.employmentRate}%` }}
                    />
                  </div>
                  <span className="text-sm">{faculty.employmentRate}%</span>
                </td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-4 font-medium">Budget recherche</td>
              {comparedFaculties.map(faculty => (
                <td key={faculty.id} className="p-4">
                  {(faculty.researchBudget / 1000000).toFixed(1)}M MAD
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setComparedFaculties([])}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Effacer la comparaison
        </button>
        <button
          onClick={() => setComparisonMode(false)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Terminer la comparaison
        </button>
      </div>
    </div>
  );

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(limit || 6)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
              <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                {selectedUniversity 
                  ? `Facultés de ${selectedUniversity.name}`
                  : 'Répertoire des Facultés Marocaines'
                }
              </h1>
            </div>
            <p className="text-gray-600">
              Découvrez et comparez les {facultiesData.length} principales facultés universitaires au Maroc
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Mode comparaison */}
            {enableComparison && comparedFaculties.length > 0 && (
              <button
                onClick={() => setComparisonMode(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <BarChart3 className="h-4 w-4" />
                Comparer ({comparedFaculties.length})
              </button>
            )}
            
            {/* Actions */}
            {mode === 'browse' && (
              <>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
                
                <button
                  onClick={() => setShowFiltersPanel(!showFiltersPanel)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <FilterIcon className="h-4 w-4" />
                  Filtres
                  {showFiltersPanel && <ChevronDown className="h-4 w-4" />}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Statistiques globales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-700">{facultiesData.length}</div>
            <div className="text-sm text-blue-600">Facultés</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-700">
              {facultiesData.reduce((sum, f) => sum + f.students, 0).toLocaleString()}
            </div>
            <div className="text-sm text-green-600">Étudiants</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-700">
              {facultiesData.reduce((sum, f) => sum + f.professors, 0).toLocaleString()}
            </div>
            <div className="text-sm text-purple-600">Enseignants</div>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-amber-700">
              {facultiesData.reduce((sum, f) => sum + f.researchBudget, 0).toLocaleString()}
            </div>
            <div className="text-sm text-amber-600">MAD recherche</div>
          </div>
        </div>
      </div>

      {/* Panneau de filtres avancés */}
      {showFiltersPanel && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-slideDown">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Filtres avancés</h3>
            <button
              onClick={resetFilters}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              <RefreshCw className="h-4 w-4 inline mr-1" />
              Réinitialiser
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Type de faculté */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de faculté
              </label>
              <div className="space-y-2">
                {facultyTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedType === type.id
                        ? 'bg-blue-100 text-blue-700 border border-blue-300'
                        : 'hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <span className="mr-2">{type.icon}</span>
                    {type.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Ville */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ville
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Toutes les villes</option>
                {cities.filter(c => c !== 'all').map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            
            {/* Tri */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trier par
              </label>
              <div className="space-y-2">
                {sortOptions.map(option => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => {
                        if (sortBy === option.id) {
                          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                        } else {
                          setSortBy(option.id);
                          setSortOrder('asc');
                        }
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
                        sortBy === option.id
                          ? 'bg-blue-100 text-blue-700 border border-blue-300'
                          : 'hover:bg-gray-50 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span>{option.label}</span>
                      </div>
                      {sortBy === option.id && (
                        <span className="text-xs font-medium">
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
      )}

      {/* Mode comparaison */}
      {comparisonMode && comparedFaculties.length > 0 && (
        <ComparisonTable />
      )}

      {/* Recherche rapide */}
      {showFilters && !showFiltersPanel && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par nom, ville, département..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  selectedType === 'all'
                    ? 'bg-blue-100 text-blue-700 border-blue-300'
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                }`}
              >
                Toutes
              </button>
              {facultyTypes.slice(1, 5).map(type => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    selectedType === type.id
                      ? 'bg-blue-100 text-blue-700 border-blue-300'
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {type.name}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <span>{faculties.length} facultés</span>
              </div>
              <div className="flex items-center gap-1">
                <Hash className="h-4 w-4" />
                <span>{filteredFaculties.length} résultats</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Liste des facultés */}
      {filteredFaculties.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Aucune faculté trouvée
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Aucune faculté ne correspond à vos critères de recherche. Essayez de modifier vos filtres ou votre recherche.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <>
          {mode === 'compact' ? (
            <div className="space-y-3">
              {filteredFaculties.map(faculty => (
                <FacultyCompact key={faculty.id} faculty={faculty} />
              ))}
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-6"
            }>
              {filteredFaculties.map(faculty => 
                viewMode === 'grid' 
                  ? <FacultyCard key={faculty.id} faculty={faculty} />
                  : <FacultyListItem key={faculty.id} faculty={faculty} />
              )}
            </div>
          )}
        </>
      )}

      {/* Pagination */}
      {!limit && filteredFaculties.length > 0 && (
        <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600">
            Affichage de {(currentPage - 1) * itemsPerPage + 1} à {Math.min(currentPage * itemsPerPage, faculties.length)} sur {faculties.length}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            {Array.from({ length: Math.ceil(faculties.length / itemsPerPage) }, (_, i) => i + 1)
              .filter(page => 
                page === 1 || 
                page === Math.ceil(faculties.length / itemsPerPage) ||
                Math.abs(page - currentPage) <= 1
              )
              .map((page, index, array) => (
                <React.Fragment key={page}>
                  {index > 0 && page - array[index - 1] > 1 && (
                    <span className="px-2">...</span>
                  )}
                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                </React.Fragment>
              ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(Math.ceil(faculties.length / itemsPerPage), prev + 1))}
              disabled={currentPage === Math.ceil(faculties.length / itemsPerPage)}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value={12}>12 par page</option>
            <option value={24}>24 par page</option>
            <option value={48}>48 par page</option>
          </select>
        </div>
      )}

      {/* Faculté sélectionnée (pour le mode select) */}
      {mode === 'select' && selectedFaculty && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-bold text-blue-900 text-lg mb-1">
                Faculté sélectionnée
              </h3>
              <div className="text-blue-700">
                <div className="font-semibold">{selectedFaculty.name}</div>
                <div className="text-sm">{selectedFaculty.university} • {selectedFaculty.city}</div>
              </div>
            </div>
            <button
              onClick={() => handleFacultySelect(null)}
              className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium border border-blue-300 rounded-lg hover:bg-blue-50"
            >
              Changer
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white rounded-lg border border-blue-100">
              <div className="text-2xl font-bold text-blue-700">{selectedFaculty.acceptanceRate}%</div>
              <div className="text-xs text-blue-600">Taux d'acceptation</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border border-blue-100">
              <div className="text-2xl font-bold text-blue-700">{selectedFaculty.graduationRate}%</div>
              <div className="text-xs text-blue-600">Diplômés</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border border-blue-100">
              <div className="text-2xl font-bold text-blue-700">{selectedFaculty.employmentRate}%</div>
              <div className="text-xs text-blue-600">Emploi</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border border-blue-100">
              <div className="text-2xl font-bold text-blue-700">{selectedFaculty.rating}</div>
              <div className="text-xs text-blue-600">Note</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Faculties;