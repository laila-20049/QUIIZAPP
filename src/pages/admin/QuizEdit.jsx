import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Save,
  ArrowLeft,
  Eye,
  Copy,
  Trash2,
  Download,
  Share2,
  History,
  BarChart,
  Users,
  Clock,
  Tag,
  Lock,
  Globe,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  X,
  Plus,
  Check,
  Image as ImageIcon,
  Settings,
  Layers,
  Target,
  BookOpen,
  Hash,
  Type,
  Code,
  Radio,
  CheckSquare,
  FileText,
  Link as LinkIcon,
  List,
  HelpCircle,
  Upload,
  PenTool,
  Zap,
  TrendingUp
} from 'lucide-react';
import { useDatabase } from '../hooks/useDatabase';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBoundary from '../components/ErrorBoundary';

const QuizEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getQuizById, createQuiz, createQuestion, updateUser, loading: apiLoading, error } = useDatabase();
  
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('edit');
  const [step, setStep] = useState(1);
  const [previewMode, setPreviewMode] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subjectId: '',
    universityId: '',
    facultyId: '',
    level: 'S1',
    difficulty: 'beginner',
    duration: 30,
    tags: [],
    isPro: false,
    isPublished: true,
    coverImage: '',
    learningObjectives: [''],
    prerequisites: [''],
    language: 'fr',
    category: 'Informatique'
  });
  
  const fileInputRef = useRef(null);

  // Charger le quiz
  useEffect(() => {
    const loadQuiz = async () => {
      try {
        setLoading(true);
        const quizData = await getQuizById(id);
        
        if (quizData) {
          setQuiz(quizData);
          setFormData({
            title: quizData.title,
            description: quizData.description,
            subjectId: quizData.subjectId,
            universityId: quizData.universityId,
            facultyId: quizData.facultyId,
            level: quizData.level,
            difficulty: quizData.difficulty,
            duration: quizData.duration,
            tags: quizData.tags || [],
            isPro: quizData.isPro,
            isPublished: quizData.isPublished,
            coverImage: quizData.coverImage || '',
            learningObjectives: quizData.learningObjectives || [''],
            prerequisites: quizData.prerequisites || [''],
            language: quizData.language || 'fr',
            category: quizData.category || 'Informatique'
          });
          
          // Transformer les questions pour l'édition
          const transformedQuestions = quizData.questions?.map(q => ({
            ...q,
            id: q.id || Date.now(),
            options: q.options || ['', '', '', ''],
            correctAnswer: q.correctAnswer || 0,
            explanation: q.explanation || '',
            difficulty: q.difficulty || 'medium',
            points: q.points || 1,
            timeLimit: q.timeLimit || 60,
            tags: q.tags || [],
            hint: q.hint || '',
            codeSnippet: q.codeSnippet || '',
            hasImage: !!q.imageUrl,
            imageUrl: q.imageUrl || ''
          })) || [];
          
          setQuestions(transformedQuestions);
          if (transformedQuestions.length > 0) {
            setCurrentQuestion(transformedQuestions[0]);
          }
        }
      } catch (error) {
        console.error('Error loading quiz:', error);
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [id, getQuizById]);

  // Données simulées
  const subjects = [
    { id: 1, name: 'Programmation Python', category: 'Informatique' },
    { id: 2, name: 'Machine Learning', category: 'Informatique' },
    { id: 3, name: 'Algèbre Linéaire', category: 'Mathématiques' },
    { id: 4, name: 'Électromagnétisme', category: 'Physique' }
  ];

  const universities = [
    { id: 1, name: 'Université Hassan II', acronym: 'UH2' },
    { id: 2, name: 'Université Mohammed V', acronym: 'UM5' },
    { id: 3, name: 'Université Cadi Ayyad', acronym: 'UCA' }
  ];

  const faculties = [
    { id: 1, name: 'Faculté des Sciences', universityId: 1 },
    { id: 2, name: 'Faculté des Sciences et Techniques', universityId: 1 },
    { id: 3, name: 'ENSA', universityId: 2 }
  ];

  const difficultyLevels = [
    { value: 'beginner', label: 'Débutant', color: 'bg-green-100 text-green-800' },
    { value: 'intermediate', label: 'Intermédiaire', color: 'bg-blue-100 text-blue-800' },
    { value: 'advanced', label: 'Avancé', color: 'bg-purple-100 text-purple-800' },
    { value: 'expert', label: 'Expert', color: 'bg-red-100 text-red-800' }
  ];

  const questionTypes = [
    { value: 'multiple_choice', label: 'Choix Multiple', icon: Radio },
    { value: 'true_false', label: 'Vrai/Faux', icon: CheckSquare },
    { value: 'short_answer', label: 'Réponse Courte', icon: Type },
    { value: 'essay', label: 'Dissertation', icon: FileText },
    { value: 'code', label: 'Code', icon: Code },
    { value: 'matching', label: 'Appariement', icon: LinkIcon },
    { value: 'ordering', label: 'Ordonnancement', icon: List }
  ];

  // Gestionnaires de formulaire
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayFieldChange = (field, index, value) => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const addArrayField = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayField = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleTagInput = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tag = e.target.value.trim();
      if (tag && !formData.tags.includes(tag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tag]
        }));
        e.target.value = '';
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Gestion des questions
  const addNewQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      type: 'multiple_choice',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: '',
      difficulty: 'medium',
      points: 1,
      timeLimit: 60,
      tags: [],
      hint: '',
      codeSnippet: '',
      hasImage: false,
      imageUrl: ''
    };
    
    const newQuestions = [...questions, newQuestion];
    setQuestions(newQuestions);
    setCurrentQuestion(newQuestion);
    setSelectedQuestionIndex(newQuestions.length - 1);
  };

  const duplicateQuestion = (index) => {
    const questionToDuplicate = { ...questions[index], id: Date.now() };
    const newQuestions = [...questions];
    newQuestions.splice(index + 1, 0, questionToDuplicate);
    setQuestions(newQuestions);
    setCurrentQuestion(questionToDuplicate);
    setSelectedQuestionIndex(index + 1);
  };

  const deleteQuestion = (index) => {
    if (questions.length <= 1) {
      alert('Un quiz doit avoir au moins une question');
      return;
    }
    
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
    const newIndex = index > 0 ? index - 1 : 0;
    setSelectedQuestionIndex(newIndex);
    setCurrentQuestion(newQuestions[newIndex] || null);
  };

  const handleQuestionChange = (field, value) => {
    if (!currentQuestion) return;
    
    const updatedQuestion = { ...currentQuestion, [field]: value };
    setCurrentQuestion(updatedQuestion);
    
    const newQuestions = [...questions];
    newQuestions[selectedQuestionIndex] = updatedQuestion;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (index, value) => {
    if (!currentQuestion) return;
    
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    handleQuestionChange('options', newOptions);
  };

  const addOption = () => {
    if (!currentQuestion) return;
    handleQuestionChange('options', [...currentQuestion.options, '']);
  };

  const removeOption = (index) => {
    if (!currentQuestion || currentQuestion.options.length <= 2) return;
    
    const newOptions = currentQuestion.options.filter((_, i) => i !== index);
    handleQuestionChange('options', newOptions);
    
    // Ajuster la réponse correcte si nécessaire
    if (currentQuestion.correctAnswer === index) {
      handleQuestionChange('correctAnswer', 0);
    } else if (currentQuestion.correctAnswer > index) {
      handleQuestionChange('correctAnswer', currentQuestion.correctAnswer - 1);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Simuler l'upload
      const reader = new FileReader();
      reader.onloadend = () => {
        handleQuestionChange('imageUrl', reader.result);
        handleQuestionChange('hasImage', true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Validation
  const validateForm = () => {
    const errors = [];
    
    if (!formData.title.trim()) errors.push('Le titre est requis');
    if (!formData.description.trim()) errors.push('La description est requise');
    if (!formData.subjectId) errors.push('La matière est requise');
    
    // Valider les questions
    questions.forEach((q, index) => {
      if (!q.question.trim()) errors.push(`La question ${index + 1} est vide`);
      if (q.type === 'multiple_choice') {
        const validOptions = q.options.filter(opt => opt.trim());
        if (validOptions.length < 2) errors.push(`La question ${index + 1} doit avoir au moins 2 options`);
        if (q.correctAnswer < 0 || q.correctAnswer >= validOptions.length) {
          errors.push(`La question ${index + 1} a une réponse correcte invalide`);
        }
      }
    });
    
    return errors;
  };

  // Sauvegarder les modifications
  const handleSave = async (publish = false) => {
    const errors = validateForm();
    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }
    
    setSaving(true);
    
    try {
      // En réalité, ici on appellerait une API pour mettre à jour le quiz
      const updatedQuiz = {
        ...quiz,
        ...formData,
        questionsCount: questions.length,
        updatedAt: new Date().toISOString(),
        isPublished: publish ? true : formData.isPublished
      };
      
      console.log('Quiz updated:', updatedQuiz);
      
      // Simuler un délai de sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert(publish ? 'Quiz publié avec succès !' : 'Quiz sauvegardé avec succès !');
      
      if (publish) {
        navigate(`/quiz/${id}`);
      }
      
    } catch (error) {
      console.error('Error saving quiz:', error);
      alert('Erreur lors de la sauvegarde du quiz');
    } finally {
      setSaving(false);
    }
  };

  const handleDuplicate = async () => {
    if (window.confirm('Voulez-vous dupliquer ce quiz ?')) {
      try {
        // Logique de duplication
        const duplicatedQuiz = {
          ...formData,
          title: `${formData.title} (Copie)`,
          isPublished: false
        };
        
        console.log('Quiz duplicated:', duplicatedQuiz);
        alert('Quiz dupliqué avec succès !');
      } catch (error) {
        console.error('Error duplicating quiz:', error);
        alert('Erreur lors de la duplication du quiz');
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce quiz ? Cette action est irréversible.')) {
      try {
        // Logique de suppression
        console.log('Deleting quiz:', id);
        navigate('/admin/quizzes');
        alert('Quiz supprimé avec succès !');
      } catch (error) {
        console.error('Error deleting quiz:', error);
        alert('Erreur lors de la suppression du quiz');
      }
    }
  };

  const handleExport = () => {
    // Logique d'export
    const exportData = {
      quiz: formData,
      questions: questions
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz-${formData.title.replace(/\s+/g, '-').toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Quiz exporté avec succès !');
  };

  // Rendu du prévisualisation
  const renderPreview = () => {
    if (!previewMode) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
            <h2 className="text-xl font-bold">Prévisualisation du Quiz</h2>
            <button
              onClick={() => setPreviewMode(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-2">{formData.title}</h1>
              <p className="text-gray-600 mb-4">{formData.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{formData.duration} min</span>
                </div>
                <div className="flex items-center">
                  <Hash className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{questions.length} questions</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2 text-gray-400" />
                  <span>
                    {difficultyLevels.find(d => d.value === formData.difficulty)?.label}
                  </span>
                </div>
                <div className="flex items-center">
                  {formData.isPro ? (
                    <Lock className="h-4 w-4 mr-2 text-amber-500" />
                  ) : (
                    <Globe className="h-4 w-4 mr-2 text-green-500" />
                  )}
                  <span>{formData.isPro ? 'Premium' : 'Gratuit'}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              {questions.map((q, index) => (
                <div key={q.id} className="border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <span className="bg-gray-100 text-gray-800 font-medium rounded-lg px-3 py-1 mr-3">
                        Question {index + 1}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        q.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                        q.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {q.difficulty === 'easy' ? 'Facile' :
                         q.difficulty === 'medium' ? 'Moyen' : 'Difficile'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-xs mr-2">
                        {q.points} point{q.points > 1 ? 's' : ''}
                      </span>
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600 ml-1">{q.timeLimit}s</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium mb-4">{q.question}</h3>
                  
                  {q.hasImage && q.imageUrl && (
                    <div className="mb-6">
                      <img 
                        src={q.imageUrl} 
                        alt="Question" 
                        className="max-w-full h-auto rounded-lg"
                      />
                    </div>
                  )}
                  
                  {q.type === 'multiple_choice' && (
                    <div className="space-y-3">
                      {q.options.filter(opt => opt.trim()).map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className={`p-4 border rounded-lg flex items-center ${
                            optIndex === q.correctAnswer
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200'
                          }`}
                        >
                          <div className={`h-6 w-6 rounded-full border flex items-center justify-center mr-3 ${
                            optIndex === q.correctAnswer
                              ? 'border-green-500 bg-green-500'
                              : 'border-gray-300'
                          }`}>
                            {optIndex === q.correctAnswer && (
                              <Check className="h-4 w-4 text-white" />
                            )}
                          </div>
                          <span>{option}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {q.explanation && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <HelpCircle className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="font-medium text-blue-800">Explication</span>
                      </div>
                      <p className="text-blue-700">{q.explanation}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Statistiques du quiz
  const QuizStats = () => (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Statistiques du Quiz</h3>
        <BarChart className="h-5 w-5 text-gray-400" />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-700">{quiz?.attempts || 0}</div>
          <div className="text-sm text-blue-600">Tentatives</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-700">{quiz?.avgScore ? `${Math.round(quiz.avgScore)}%` : '0%'}</div>
          <div className="text-sm text-green-600">Score moyen</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-purple-700">{quiz?.successRate || 0}%</div>
          <div className="text-sm text-purple-600">Taux de réussite</div>
        </div>
        <div className="bg-amber-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-amber-700">{quiz?.rating || 0}/5</div>
          <div className="text-sm text-amber-600">Note moyenne</div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Distribution des scores</span>
          </div>
          <div className="space-y-2">
            {['90-100%', '80-89%', '70-79%', '60-69%', '0-59%'].map((range, index) => (
              <div key={range} className="flex items-center">
                <span className="w-16 text-sm text-gray-600">{range}</span>
                <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${100 - (index * 20)}%` }}
                  />
                </div>
                <span className="w-12 text-right text-sm font-medium">{100 - (index * 20)}%</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Dernières tentatives</span>
            <Link to={`/admin/quiz/${id}/attempts`} className="text-indigo-600 hover:text-indigo-800">
              Voir toutes
            </Link>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm">Utilisateur {i}</span>
                </div>
                <div className="text-right">
                  <div className="font-medium">85%</div>
                  <div className="text-xs text-gray-500">Il y a {i} jour{i > 1 ? 's' : ''}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Composant de l'éditeur de question
  const QuestionEditor = () => {
    if (!currentQuestion) return null;

    const QuestionTypeIcon = questionTypes.find(t => t.value === currentQuestion.type)?.icon || Radio;

    return (
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <QuestionTypeIcon className="h-5 w-5 text-indigo-600 mr-2" />
            <h3 className="text-lg font-semibold">
              Question {selectedQuestionIndex + 1}
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => duplicateQuestion(selectedQuestionIndex)}
              className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Dupliquer
            </button>
            <button
              type="button"
              onClick={() => deleteQuestion(selectedQuestionIndex)}
              disabled={questions.length <= 1}
              className="px-3 py-1 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 disabled:opacity-50"
            >
              Supprimer
            </button>
          </div>
        </div>

        {/* Type de question */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type de question
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {questionTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => handleQuestionChange('type', type.value)}
                  className={`p-3 border rounded-lg flex flex-col items-center justify-center transition-all ${
                    currentQuestion.type === type.value
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="text-xs">{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Question */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Question *
          </label>
          <textarea
            value={currentQuestion.question}
            onChange={(e) => handleQuestionChange('question', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            rows={3}
            placeholder="Entrez votre question..."
          />
        </div>

        {/* Image */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Image (optionnel)
            </label>
            {currentQuestion.hasImage && currentQuestion.imageUrl && (
              <button
                type="button"
                onClick={() => {
                  handleQuestionChange('hasImage', false);
                  handleQuestionChange('imageUrl', '');
                }}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Supprimer l'image
              </button>
            )}
          </div>
          
          {currentQuestion.hasImage && currentQuestion.imageUrl ? (
            <div className="relative">
              <img 
                src={currentQuestion.imageUrl} 
                alt="Preview" 
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-400 transition-colors"
            >
              <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">Cliquez pour télécharger une image</p>
              <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF jusqu'à 5MB</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          )}
        </div>

        {/* Options (pour choix multiple) */}
        {currentQuestion.type === 'multiple_choice' && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Options de réponse *
              </label>
              <button
                type="button"
                onClick={addOption}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
              >
                + Ajouter une option
              </button>
            </div>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center">
                  <button
                    type="button"
                    onClick={() => handleQuestionChange('correctAnswer', index)}
                    className={`h-6 w-6 rounded-full border flex items-center justify-center mr-3 flex-shrink-0 ${
                      index === currentQuestion.correctAnswer
                        ? 'border-green-500 bg-green-500'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {index === currentQuestion.correctAnswer && (
                      <Check className="h-4 w-4 text-white" />
                    )}
                  </button>
                  
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder={`Option ${index + 1}`}
                  />
                  
                  {currentQuestion.options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeOption(index)}
                      className="ml-3 p-2 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Paramètres avancés */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center text-sm font-medium text-gray-700 mb-4"
          >
            {showAdvanced ? (
              <ChevronUp className="h-4 w-4 mr-2" />
            ) : (
              <ChevronDown className="h-4 w-4 mr-2" />
            )}
            Paramètres avancés
          </button>
          
          {showAdvanced && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulté
                </label>
                <select
                  value={currentQuestion.difficulty}
                  onChange={(e) => handleQuestionChange('difficulty', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="easy">Facile</option>
                  <option value="medium">Moyen</option>
                  <option value="hard">Difficile</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Points
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={currentQuestion.points}
                  onChange={(e) => handleQuestionChange('points', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Temps limite (secondes)
                </label>
                <input
                  type="number"
                  min="30"
                  max="300"
                  value={currentQuestion.timeLimit}
                  onChange={(e) => handleQuestionChange('timeLimit', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Indice (optionnel)
                </label>
                <input
                  type="text"
                  value={currentQuestion.hint}
                  onChange={(e) => handleQuestionChange('hint', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Donnez un indice..."
                />
              </div>
            </div>
          )}
        </div>

        {/* Explication */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Explication de la réponse (optionnel)
          </label>
          <textarea
            value={currentQuestion.explanation}
            onChange={(e) => handleQuestionChange('explanation', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            rows={2}
            placeholder="Expliquez pourquoi cette réponse est correcte..."
          />
        </div>
      </div>
    );
  };

  // Barre latérale des questions
  const QuestionsSidebar = () => (
    <div className="bg-white rounded-xl shadow-sm border p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Questions ({questions.length})</h3>
        <button
          onClick={addNewQuestion}
          className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      
      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {questions.map((q, index) => (
          <button
            key={q.id}
            onClick={() => {
              setSelectedQuestionIndex(index);
              setCurrentQuestion(q);
            }}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              selectedQuestionIndex === index
                ? 'bg-indigo-50 border border-indigo-200'
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium">Question {index + 1}</span>
              <span className={`text-xs px-2 py-1 rounded ${
                q.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                q.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {q.points} pt
              </span>
            </div>
            <p className="text-sm text-gray-600 truncate">
              {q.question || 'Question non rédigée'}
            </p>
            <div className="flex items-center mt-2 text-xs text-gray-500">
              <Tag className="h-3 w-3 mr-1" />
              <span>{q.type === 'multiple_choice' ? 'Choix multiple' : q.type}</span>
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-amber-800 mb-1">Conseils d'édition</h4>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Vérifiez les réponses correctes</li>
              <li>• Corrigez les fautes d'orthographe</li>
              <li>• Testez le quiz après modification</li>
              <li>• Informez les utilisateurs des changements</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" label="Chargement du quiz..." />
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Quiz non trouvé</h1>
          <p className="text-gray-600 mb-6">Le quiz que vous essayez de modifier n'existe pas.</p>
          <Link
            to="/admin/quizzes"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux quizzes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 py-8">
        {renderPreview()}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center mb-2">
                  <Link
                    to="/admin/quizzes"
                    className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Retour
                  </Link>
                  <h1 className="text-3xl font-bold text-gray-900">Modifier le Quiz</h1>
                </div>
                <div className="flex items-center flex-wrap gap-2">
                  <span className="text-gray-600">ID: {id}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">
                    Créé le {new Date(quiz.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">
                    {quiz.attempts || 0} tentatives
                  </span>
                  {quiz.isPublished ? (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Publié
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                      Brouillon
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewMode(true)}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Prévisualiser
                </button>
                
                <button
                  type="button"
                  onClick={() => setShowStats(!showStats)}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <BarChart className="h-4 w-4 mr-2" />
                  Statistiques
                </button>
                
                <div className="relative group">
                  <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Settings className="h-4 w-4 mr-2" />
                    Plus
                  </button>
                  <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <button
                      onClick={handleDuplicate}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Dupliquer
                    </button>
                    <button
                      onClick={handleExport}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Exporter
                    </button>
                    <button
                      onClick={handleDelete}
                      className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-6 flex border-b">
              {['edit', 'questions', 'settings', 'analytics'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  {tab === 'edit' && 'Édition'}
                  {tab === 'questions' && 'Questions'}
                  {tab === 'settings' && 'Paramètres'}
                  {tab === 'analytics' && 'Analytiques'}
                </button>
              ))}
            </div>
          </div>

          {/* Contenu principal */}
          {activeTab === 'analytics' ? (
            <QuizStats />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Panneau d'édition principal */}
              <div className="lg:col-span-2 space-y-8">
                {activeTab === 'edit' && (
                  <div className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-center mb-6">
                      <PenTool className="h-5 w-5 text-indigo-600 mr-2" />
                      <h2 className="text-xl font-semibold">Informations du quiz</h2>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Titre du quiz *
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description *
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          rows={4}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Matière *
                          </label>
                          <select
                            name="subjectId"
                            value={formData.subjectId}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          >
                            <option value="">Sélectionnez une matière</option>
                            {subjects.map(subject => (
                              <option key={subject.id} value={subject.id}>
                                {subject.name} ({subject.category})
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Difficulté
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {difficultyLevels.map(level => (
                              <button
                                key={level.value}
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, difficulty: level.value }))}
                                className={`p-3 border rounded-lg text-center transition-colors ${
                                  formData.difficulty === level.value
                                    ? 'border-indigo-500 bg-indigo-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                <span className={`text-sm font-medium ${level.color.split(' ')[1]}`}>
                                  {level.label}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tags
                        </label>
                        <div className="border border-gray-300 rounded-lg px-4 py-3">
                          <div className="flex flex-wrap gap-2 mb-2">
                            {formData.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                              >
                                {tag}
                                <button
                                  type="button"
                                  onClick={() => removeTag(tag)}
                                  className="ml-2 text-blue-600 hover:text-blue-800"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                          <input
                            type="text"
                            onKeyDown={handleTagInput}
                            className="w-full border-0 focus:ring-0 p-0"
                            placeholder="Appuyez sur Entrée ou , pour ajouter un tag"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'questions' && (
                  <>
                    {currentQuestion ? (
                      <QuestionEditor />
                    ) : (
                      <div className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="text-center py-12">
                          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Aucune question sélectionnée
                          </h3>
                          <p className="text-gray-600">
                            Sélectionnez une question ou créez-en une nouvelle
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {activeTab === 'settings' && (
                  <div className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-center mb-6">
                      <Settings className="h-5 w-5 text-indigo-600 mr-2" />
                      <h2 className="text-xl font-semibold">Paramètres avancés</h2>
                    </div>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Université
                          </label>
                          <select
                            name="universityId"
                            value={formData.universityId}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          >
                            <option value="">Sélectionnez une université</option>
                            {universities.map(uni => (
                              <option key={uni.id} value={uni.id}>{uni.name} ({uni.acronym})</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Faculté
                          </label>
                          <select
                            name="facultyId"
                            value={formData.facultyId}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          >
                            <option value="">Sélectionnez une faculté</option>
                            {faculties
                              .filter(f => !formData.universityId || f.universityId == formData.universityId)
                              .map(faculty => (
                                <option key={faculty.id} value={faculty.id}>{faculty.name}</option>
                              ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Objectifs d'apprentissage
                        </label>
                        {formData.learningObjectives.map((obj, index) => (
                          <div key={index} className="flex items-center mb-2">
                            <Target className="h-5 w-5 text-gray-400 mr-2" />
                            <input
                              type="text"
                              value={obj}
                              onChange={(e) => handleArrayFieldChange('learningObjectives', index, e.target.value)}
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                            {formData.learningObjectives.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeArrayField('learningObjectives', index)}
                                className="ml-2 p-2 text-gray-400 hover:text-red-600"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addArrayField('learningObjectives')}
                          className="mt-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                          + Ajouter un objectif
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Niveau
                          </label>
                          <select
                            name="level"
                            value={formData.level}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          >
                            <option value="S1">S1</option>
                            <option value="S2">S2</option>
                            <option value="S3">S3</option>
                            <option value="S4">S4</option>
                            <option value="S5">S5</option>
                            <option value="S6">S6</option>
                            <option value="Master">Master</option>
                            <option value="Doctorat">Doctorat</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Langue
                          </label>
                          <select
                            name="language"
                            value={formData.language}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          >
                            <option value="fr">Français</option>
                            <option value="en">Anglais</option>
                            <option value="ar">Arabe</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="isPro"
                            name="isPro"
                            checked={formData.isPro}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                          <label htmlFor="isPro" className="ml-2 block text-sm text-gray-700">
                            Quiz Premium (réservé aux abonnés)
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="isPublished"
                            name="isPublished"
                            checked={formData.isPublished}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                          <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700">
                            Publier le quiz
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Barre latérale */}
              <div className="space-y-8">
                {activeTab === 'questions' && <QuestionsSidebar />}
                
                {/* Panneau d'actions */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="font-semibold mb-4">Actions</h3>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => handleSave(false)}
                      disabled={saving}
                      className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {saving ? 'Sauvegarde...' : 'Sauvegarder les modifications'}
                    </button>
                    
                    <button
                      onClick={() => handleSave(true)}
                      disabled={saving}
                      className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                    >
                      Publier les modifications
                    </button>
                    
                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Autres actions</h4>
                      <div className="space-y-2">
                        <button
                          onClick={() => navigate(`/quiz/${id}`)}
                          className="w-full text-left px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50"
                        >
                          Voir le quiz publié
                        </button>
                        <button
                          onClick={handleDuplicate}
                          className="w-full text-left px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50"
                        >
                          Dupliquer ce quiz
                        </button>
                        <button
                          onClick={handleExport}
                          className="w-full text-left px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50"
                        >
                          Exporter en JSON
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Statistiques rapides */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="font-semibold mb-4">Statistiques rapides</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Tentatives totales</span>
                      <span className="font-medium">{quiz.attempts || 0}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Score moyen</span>
                      <span className="font-medium">{quiz.avgScore ? `${Math.round(quiz.avgScore)}%` : '0%'}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Taux de réussite</span>
                      <span className="font-medium">{quiz.successRate || 0}%</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Note moyenne</span>
                      <span className="font-medium">{quiz.rating || 0}/5</span>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="text-xs text-gray-500">
                        Dernière modification: {new Date(quiz.updatedAt).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default QuizEdit;