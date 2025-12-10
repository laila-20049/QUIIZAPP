import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';
import {
  MapPin,
  Users,
  BookOpen,
  Star,
  ChevronLeft,
  ArrowRight,
  GraduationCap,
  Award,
  Clock,
  Globe,
  Mail,
  Phone,
  MapPinIcon,
  Building,
  CheckCircle,
  Grid,
  List,
  Search,
  Filter,
  Lock,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';
import QuizCard from '../components/QuizCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const UniversityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { quizzes = [] } = useQuiz();
  const { isAuthenticated, user } = useAuth();

  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  // Toutes les universités avec détails complets
  const universities = [
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
      fullDescription: 'Fondée en 1993, l\'Université Hassan II de Casablanca est la plus grande université du Maroc. Elle offre une éducation de qualité avec un accent particulier sur les sciences, les technologies et l\'ingénierie. L\'université a établi des partenariats avec des institutions internationales de premier plan.',
      website: 'www.uh2c.ac.ma',
      email: 'contact@uh2c.ac.ma',
      phone: '+212 5 22 XX XX XX',
      color: 'from-blue-600 to-blue-800',
      image: '🏢',
      faculties: [
        { name: 'Faculté des Sciences', students: 3200, programs: 'Licence, Master, Doctorat' },
        { name: 'Faculté des Sciences et Techniques', students: 2800, programs: 'Ingénierie, Master' },
        { name: 'Faculté des Sciences Économiques', students: 2100, programs: 'Économie, Gestion' },
        { name: 'Faculté de Droit', students: 1500, programs: 'Droit, Jurisprudence' }
      ],
      programs: [
        { name: 'Licence en Informatique', level: 'Bac+3', students: 450 },
        { name: 'Master en Intelligence Artificielle', level: 'Bac+5', students: 180 },
        { name: 'Doctorat en Sciences', level: 'Bac+8', students: 80 },
        { name: 'Licence en Mathématiques', level: 'Bac+3', students: 320 }
      ],
      achievements: [
        'Classée parmi les top 500 universités mondiales',
        '50+ laboratoires de recherche',
        'Partenariats avec 200+ universités internationales',
        '95% taux d\'insertion professionnelle'
      ],
      ranking: 'Top 500 Mondial, Classée 1ère au Maroc'
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
      fullDescription: 'Fondée en 1957, l\'Université Mohammed V de Rabat est l\'une des plus anciennes universités du Maroc. Elle excelle particulièrement dans les domaines des sciences informatiques, de l\'ingénierie et des sciences humaines.',
      website: 'www.um5.ac.ma',
      email: 'contact@um5.ac.ma',
      phone: '+212 5 37 XX XX XX',
      color: 'from-green-600 to-green-800',
      image: '🏫',
      faculties: [
        { name: 'Faculté des Sciences', students: 2900, programs: 'Sciences générales' },
        { name: 'ENSIAS', students: 1200, programs: 'École d\'Ingénierie Informatique' },
        { name: 'ENSMR', students: 800, programs: 'École d\'Ingénierie' },
        { name: 'Faculté de Lettres', students: 2100, programs: 'Lettres, Langues' }
      ],
      programs: [
        { name: 'Diplôme d\'Ingénieur ENSIAS', level: 'Bac+5', students: 600 },
        { name: 'Master en Informatique', level: 'Bac+5', students: 250 },
        { name: 'Licence en Langues Étrangères', level: 'Bac+3', students: 380 }
      ],
      achievements: [
        'ENSIAS parmi les meilleures écoles d\'informatique africaines',
        'Centre de recherche en IA reconnu internationalement',
        'Startup accelerator universitaire',
        '90% emploi dans les 6 mois après graduation'
      ],
      ranking: 'Top 300 Mondial, Classée 2ème au Maroc'
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
      fullDescription: 'Fondée en 1978, l\'Université Cadi Ayyad de Marrakech est un pôle majeur d\'excellence académique du sud du Maroc.',
      website: 'www.ucam.ac.ma',
      email: 'contact@ucam.ac.ma',
      phone: '+212 5 24 XX XX XX',
      color: 'from-purple-600 to-purple-800',
      image: '🎓',
      faculties: [
        { name: 'Faculté des Sciences Semlalia', students: 2400, programs: 'Sciences générales' },
        { name: 'ENSA Marrakech', students: 950, programs: 'Ingénierie Agricole' },
        { name: 'Faculté des Sciences et Techniques', students: 2100, programs: 'Sciences et Tech' }
      ],
      programs: [
        { name: 'Master en Agriculture Durable', level: 'Bac+5', students: 220 },
        { name: 'Licence en Biologie', level: 'Bac+3', students: 400 }
      ],
      achievements: [
        'Centre d\'excellence en agriculture',
        'Recherche en énergies renouvelables',
        'Partenariats agricoles internationaux'
      ],
      ranking: 'Classée 3ème au Maroc'
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
      fullDescription: 'Fondée en 1989, l\'Université Ibn Tofail offre une formation de qualité en sciences et technologies.',
      website: 'www.uit.ac.ma',
      email: 'contact@uit.ac.ma',
      phone: '+212 5 37 XX XX XX',
      color: 'from-red-600 to-red-800',
      image: '🔬',
      faculties: [
        { name: 'Faculté des Sciences', students: 2200, programs: 'Sciences' },
        { name: 'Faculté des Sciences Techniques', students: 1800, programs: 'Technologies' }
      ],
      programs: [
        { name: 'Master en Sciences de l\'Eau', level: 'Bac+5', students: 150 }
      ],
      achievements: [
        'Laboratoires modernes',
        'Recherche en environnement'
      ],
      ranking: 'Classée 4ème au Maroc'
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
      fullDescription: 'Fondée en 1975, l\'Université Sidi Mohamed Ben Abdellah est une institution historique avec une riche tradition académique.',
      website: 'www.usmba.ac.ma',
      email: 'contact@usmba.ac.ma',
      phone: '+212 5 35 XX XX XX',
      color: 'from-amber-600 to-amber-800',
      image: '📚',
      faculties: [
        { name: 'Faculté des Sciences Dhar El Mahraz', students: 2500, programs: 'Sciences' },
        { name: 'ENSA Fès', students: 850, programs: 'Ingénierie' },
        { name: 'Faculté de Lettres', students: 1900, programs: 'Lettres, Langues' }
      ],
      programs: [
        { name: 'Ingénieur Agronome ENSA', level: 'Bac+5', students: 350 }
      ],
      achievements: [
        'Une des plus anciennes universités du Maroc',
        'Écoles d\'ingénierie réputées',
        'Recherche en sciences naturelles'
      ],
      ranking: 'Classée 5ème au Maroc'
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
      fullDescription: 'Fondée en 1973, l\'Université Abdelmalek Essaâdi offre des programmes innovants.',
      website: 'www.uae.ac.ma',
      email: 'contact@uae.ac.ma',
      phone: '+212 5 39 XX XX XX',
      color: 'from-indigo-600 to-indigo-800',
      image: '🏛️',
      faculties: [
        { name: 'ENCG Tétouan', students: 1200, programs: 'Commerce, Gestion' },
        { name: 'Faculté des Sciences Tétouan', students: 2100, programs: 'Sciences' },
        { name: 'Faculté de Littérature', students: 1600, programs: 'Littérature' }
      ],
      programs: [
        { name: 'Master en Management', level: 'Bac+5', students: 280 }
      ],
      achievements: [
        'ENCG reconnue internationalement',
        'Partenariats avec universités espagnoles',
        'Programmes d\'échange Erasmus+'
      ],
      ranking: 'Classée 6ème au Maroc'
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
      fullDescription: 'Fondée en 1989, l\'Université Ibn Zohr propose des formations modernes.',
      website: 'www.uiz.ac.ma',
      email: 'contact@uiz.ac.ma',
      phone: '+212 5 28 XX XX XX',
      color: 'from-cyan-600 to-cyan-800',
      image: '💻',
      faculties: [
        { name: 'Faculté des Sciences', students: 1800, programs: 'Sciences' },
        { name: 'ENSA Agadir', students: 700, programs: 'Ingénierie' },
        { name: 'Faculté des Sciences Techniques', students: 1600, programs: 'Technologies' }
      ],
      programs: [
        { name: 'Master en Énergies Marines', level: 'Bac+5', students: 120 }
      ],
      achievements: [
        'Recherche en énergies marines',
        'Centre de technologie côtière',
        'Partenariats en innovation'
      ],
      ranking: 'Classée 7ème au Maroc'
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
      fullDescription: 'Fondée en 1989, l\'Université Chouaib Doukkali est une institution côtière spécialisée dans les sciences marines et appliquées. Elle bénéficie d\'une localisation stratégique en bord de mer et propose des programmes innovants liés à l\'environnement marin.',
      website: 'www.ucd.ac.ma',
      email: 'contact@ucd.ac.ma',
      phone: '+212 5 23 XX XX XX',
      color: 'from-emerald-600 to-emerald-800',
      image: '🌊',
      faculties: [
        { name: 'Faculté des Sciences', students: 1600, programs: 'Sciences générales et marines' },
        { name: 'ENSA El Jadida', students: 650, programs: 'Ingénierie Agricole & Aquaculture' }
      ],
      programs: [
        { name: 'Master en Aquaculture Durable', level: 'Bac+5', students: 180 },
        { name: 'Master en Sciences Marines', level: 'Bac+5', students: 140 },
        { name: 'Licence en Biologie Marine', level: 'Bac+3', students: 320 }
      ],
      achievements: [
        'Centre d\'excellence en sciences marines',
        'Recherche en aquaculture durable',
        'Laboratoires d\'analyses marines modernes',
        'Partenariats avec instituts océanographiques internationaux',
        'Programme de conservation marine'
      ],
      ranking: 'Classée 8ème au Maroc, Spécialiste en Sciences Marines'
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
      fullDescription: 'Fondée en 1978, l\'Université Mohammed Premier à Oujda offre une perspective internationale unique.',
      website: 'www.ump.ac.ma',
      email: 'contact@ump.ac.ma',
      phone: '+212 5 36 XX XX XX',
      color: 'from-rose-600 to-rose-800',
      image: '🌍',
      faculties: [
        { name: 'Faculté des Sciences', students: 2000, programs: 'Sciences' },
        { name: 'ENSA Oujda', students: 800, programs: 'Ingénierie' }
      ],
      programs: [
        { name: 'Master en Coopération Internationale', level: 'Bac+5', students: 160 }
      ],
      achievements: [
        'Localisation frontière unique',
        'Échanges internationaux',
        'Partenariats algériens et espagnols'
      ],
      ranking: 'Classée 9ème au Maroc'
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
      fullDescription: 'Fondée en 1989, l\'Université Sultan Moulay Slimane est une institution centrale.',
      website: 'www.usms.ac.ma',
      email: 'contact@usms.ac.ma',
      phone: '+212 5 23 XX XX XX',
      color: 'from-orange-600 to-orange-800',
      image: '🏛️',
      faculties: [
        { name: 'Faculté des Sciences', students: 1800, programs: 'Sciences' },
        { name: 'Faculté de Technologie', students: 1400, programs: 'Technologie' }
      ],
      programs: [
        { name: 'Licence en Informatique', level: 'Bac+3', students: 320 }
      ],
      achievements: [
        'Formation généraliste solide',
        'Programmes accessibles'
      ],
      ranking: 'Classée 10ème au Maroc'
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
      fullDescription: 'Fondée en 1993, Al Akhawayn University est une institution privée d\'élite.',
      website: 'www.aui.ma',
      email: 'admissions@aui.ma',
      phone: '+212 5 35 XX XX XX',
      color: 'from-violet-600 to-violet-800',
      image: '👑',
      faculties: [
        { name: 'School of Science and Engineering', students: 900, programs: 'Sciences, Ingénierie' },
        { name: 'School of Business and Economics', students: 700, programs: 'Affaires, Économie' }
      ],
      programs: [
        { name: 'Bachelor en Computer Science', level: 'Bac+4', students: 280 }
      ],
      achievements: [
        'Université privée prestige',
        'Standards internationaux',
        'Petites classes (ratio 15:1)',
        'Alumni mondiaux'
      ],
      ranking: 'Top Université Privée au Maroc'
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
      fullDescription: 'Fondée en 2014, l\'Université Marrakech Cadi Ayyad est une institution nouvelle.',
      website: 'www.umca.ac.ma',
      email: 'contact@umca.ac.ma',
      phone: '+212 5 24 XX XX XX',
      color: 'from-pink-600 to-pink-800',
      image: '🎓',
      faculties: [
        { name: 'Faculté de Droit', students: 1200, programs: 'Droit' },
        { name: 'Faculté de Sciences Humaines', students: 1400, programs: 'Sciences Humaines' }
      ],
      programs: [
        { name: 'Master en Droit International', level: 'Bac+5', students: 120 }
      ],
      achievements: [
        'Institution nouvelle et moderne',
        'Programmes contemporains'
      ],
      ranking: 'Université nouvellement fondée'
    }
  ];

  const university = universities.find(u => u.id === parseInt(id));

  // Filtrer les quiz de l'université
  const universityQuizzes = quizzes.filter(quiz => {
    // Filtrer par université - accepter les quiz qui ont l'université assignée
    const isFromUniversity = quiz.university && quiz.university.toLowerCase() === university?.name.toLowerCase();
    
    if (!isFromUniversity) return false;
    
    // Filtrer par sujet
    const matchesSubject = selectedSubject === 'all' || quiz.subject === selectedSubject;
    
    // Filtrer par difficulté
    const matchesDifficulty = difficultyFilter === 'all' || 
      (difficultyFilter === 'Facile' && quiz.difficulty === 'easy') ||
      (difficultyFilter === 'Moyen' && quiz.difficulty === 'medium') ||
      (difficultyFilter === 'Difficile' && (quiz.difficulty === 'hard' || quiz.difficulty === 'expert'));
    
    // Filtrer par recherche
    const matchesSearch = searchTerm === '' || quiz.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSubject && matchesDifficulty && matchesSearch;
  });

  const subjects = ['all', ...new Set(quizzes
    .filter(q => q.university === university?.name)
    .map(q => q.subject)
  )];

  const difficulties = ['all', 'Facile', 'Moyen', 'Difficile'];

  if (!university) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <button
          onClick={() => navigate('/universities')}
          className="mb-8 flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <ChevronLeft className="h-5 w-5" />
          Retour aux universités
        </button>
        <Building className="h-20 w-20 text-gray-400 mb-6" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Université non trouvée</h1>
        <p className="text-gray-600">La page que vous recherchez n'existe pas.</p>
      </div>
    );
  }

  const difficultyColors = {
    'Facile': 'text-green-600 bg-green-50',
    'Moyen': 'text-amber-600 bg-amber-50',
    'Difficile': 'text-red-600 bg-red-50'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/universities')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition"
          >
            <ChevronLeft className="h-5 w-5" />
            Retour aux universités
          </button>
        </div>
      </div>

      {/* University Header */}
      <section className={`bg-gradient-to-r ${university.color} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-7xl">{university.image}</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl lg:text-5xl font-bold">{university.name}</h1>
                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Star className="h-5 w-5 text-yellow-300 fill-current" />
                  <span className="font-bold">{university.rating}</span>
                </div>
              </div>
              <p className="text-white/90 text-lg mb-4">{university.description}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{university.city} • {university.acronym}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>{university.students.toLocaleString()} étudiants</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  <span>{university.quizzes}+ quiz</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* University Info */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">À Propos</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {university.fullDescription}
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Classement</div>
                    <div className="text-gray-600">{university.ranking}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Fondée</div>
                    <div className="text-gray-600">En {university.founded}</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations de Contact</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <Globe className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">Site Web</div>
                    <a href={`https://${university.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {university.website}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">Email</div>
                    <a href={`mailto:${university.email}`} className="text-blue-600 hover:underline">
                      {university.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <Phone className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">Téléphone</div>
                    <a href={`tel:${university.phone}`} className="text-blue-600 hover:underline">
                      {university.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          {university.achievements.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Réalisations & Points Forts</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {university.achievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Faculties & Programs */}
      <section className="bg-gray-50 py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Facultés & Programmes</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Faculties */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Building className="h-6 w-6 text-blue-600" />
                Facultés
              </h3>
              <div className="space-y-3">
                {university.faculties.map((faculty, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition">
                    <div className="font-semibold text-gray-900 mb-2">{faculty.name}</div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {faculty.students} étudiants
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {faculty.programs}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Programs */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-green-600" />
                Programmes Disponibles
              </h3>
              <div className="space-y-3">
                {university.programs.map((program, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-lg border border-gray-200 hover:border-green-300 transition">
                    <div className="font-semibold text-gray-900 mb-2">{program.name}</div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="px-2 py-1 bg-green-50 text-green-700 rounded">{program.level}</span>
                      <span>{program.students} étudiants</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quizzes Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quiz Disponibles</h2>
            <p className="text-gray-600">
              {universityQuizzes.length} quiz trouvé{universityQuizzes.length !== 1 ? 's' : ''} pour {university.name}
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Chercher un quiz..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Subject Filter */}
              {subjects.length > 1 && (
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Tous les sujets</option>
                  {subjects.filter(s => s !== 'all').map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              )}

              {/* Difficulty Filter */}
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tous les niveaux</option>
                {difficulties.filter(d => d !== 'all').map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>

              {/* View Mode */}
              <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex-1 py-1.5 rounded transition ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                >
                  <Grid className="h-4 w-4 mx-auto" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex-1 py-1.5 rounded transition ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                >
                  <List className="h-4 w-4 mx-auto" />
                </button>
              </div>
            </div>
          </div>

          {/* Quizzes Display */}
          {universityQuizzes.length > 0 ? (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {universityQuizzes.map(quiz => (
                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                  onStart={() => navigate(`/quiz/${quiz.id}`)}
                  compact={viewMode === 'list'}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun quiz trouvé</h3>
              <p className="text-gray-600 mb-6">
                Essayez d'ajuster vos critères de filtrage
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSubject('all');
                  setDifficultyFilter('all');
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default UniversityDetail;
