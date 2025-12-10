import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Save,
  Plus,
  Trash2,
  Image as ImageIcon,
  Clock,
  Hash,
  Tag,
  BookOpen,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  X,
  Upload,
  Eye,
  EyeOff,
  Link as LinkIcon,
  FileText,
  Check,
  Settings,
  Layers,
  BarChart,
  Target,
  Users,
  Globe,
  Lock,
  HelpCircle,
  Code,
  Type,
  List,
  Radio,
  CheckSquare,
  PenTool
} from 'lucide-react';
import { useDatabase } from '../../hooks/useDatabase';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorBoundary from '../../components/common/ErrorBoundary';

const QuizCreate = () => {
  const navigate = useNavigate();
  const { createQuiz, createQuestion, loading: apiLoading, error } = useDatabase();
  
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [previewMode, setPreviewMode] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const fileInputRef = useRef(null);

  // État du formulaire principal
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

  // Initialiser une question par défaut
  useEffect(() => {
    if (questions.length === 0) {
      addNewQuestion();
    }
  }, []);

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
    
    setQuestions([...questions, newQuestion]);
    setCurrentQuestion(newQuestion);
    setSelectedQuestionIndex(questions.length);
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
    if (questions.length <= 1) return;
    
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

  // Soumission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }
    
    setLoading(true);
    
    try {
      // Créer le quiz
      const quizData = {
        ...formData,
        questionsCount: questions.length,
        authorId: 1, // ID de l'utilisateur connecté
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const quiz = await createQuiz(quizData);
      
      // Créer les questions
      for (const question of questions) {
        await createQuestion({
          ...question,
          quizId: quiz.id
        });
      }
      
      alert('Quiz créé avec succès !');
      navigate(`/quiz/${quiz.id}`);
      
    } catch (error) {
      console.error('Error creating quiz:', error);
      alert('Erreur lors de la création du quiz');
    } finally {
      setLoading(false);
    }
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
              onClick={() => duplicateQuestion(selectedQuestionIndex)}
              className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Dupliquer
            </button>
            <button
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

        {/* Code snippet */}
        {currentQuestion.type === 'code' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Code de départ
            </label>
            <textarea
              value={currentQuestion.codeSnippet}
              onChange={(e) => handleQuestionChange('codeSnippet', e.target.value)}
              className="w-full px-4 py-3 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows={4}
              placeholder="// Code initial..."
            />
          </div>
        )}
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
    </div>
  );

  // Étape 1: Informations de base
  const Step1 = () => (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center mb-6">
        <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center mr-3">
          1
        </div>
        <div>
          <h2 className="text-xl font-semibold">Informations de base</h2>
          <p className="text-gray-600">Définissez les détails principaux de votre quiz</p>
        </div>
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
            placeholder="Ex: Introduction à la Programmation Python"
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
            placeholder="Décrivez votre quiz..."
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Durée (minutes)
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                min="5"
                max="180"
              />
            </div>
          </div>

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
      </div>
    </div>
  );

  // Étape 2: Questions
  const Step2 = () => (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center mb-6">
        <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center mr-3">
          2
        </div>
        <div>
          <h2 className="text-xl font-semibold">Questions</h2>
          <p className="text-gray-600">Créez les questions de votre quiz</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {currentQuestion ? (
            <QuestionEditor />
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucune question sélectionnée
              </h3>
              <p className="text-gray-600">
                Sélectionnez une question ou créez-en une nouvelle
              </p>
            </div>
          )}
        </div>
        
        <div>
          <QuestionsSidebar />
          
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-amber-800 mb-1">Conseils</h4>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• Chaque quiz doit avoir au moins 5 questions</li>
                  <li>• Varier la difficulté des questions</li>
                  <li>• Ajouter des explications pour chaque réponse</li>
                  <li>• Tester votre quiz avant publication</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Étape 3: Configuration avancée
  const Step3 = () => (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center mb-6">
        <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center mr-3">
          3
        </div>
        <div>
          <h2 className="text-xl font-semibold">Configuration avancée</h2>
          <p className="text-gray-600">Paramètres supplémentaires pour votre quiz</p>
        </div>
      </div>

      <div className="space-y-6">
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
                placeholder={`Objectif ${index + 1}`}
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prérequis
          </label>
          {formData.prerequisites.map((prereq, index) => (
            <div key={index} className="flex items-center mb-2">
              <Layers className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="text"
                value={prereq}
                onChange={(e) => handleArrayFieldChange('prerequisites', index, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder={`Prérequis ${index + 1}`}
              />
              {formData.prerequisites.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField('prerequisites', index)}
                  className="ml-2 p-2 text-gray-400 hover:text-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField('prerequisites')}
            className="mt-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            + Ajouter un prérequis
          </button>
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
            Publier immédiatement
          </label>
        </div>
      </div>
    </div>
  );

  if (loading || apiLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" label="Création du quiz..." />
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
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Créer un nouveau Quiz</h1>
                <p className="text-gray-600 mt-2">
                  Concevez un quiz interactif pour vos étudiants
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => setPreviewMode(true)}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Prévisualiser
                </button>
                
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">Progression:</span>
                  <span className="font-medium">{questions.length} questions</span>
                </div>
              </div>
            </div>
            
            {/* Steps indicator */}
            <div className="mt-8">
              <div className="flex items-center">
                {[1, 2, 3].map((stepNum) => (
                  <React.Fragment key={stepNum}>
                    <button
                      onClick={() => setStep(stepNum)}
                      className={`flex items-center justify-center h-10 w-10 rounded-full font-medium ${
                        step === stepNum
                          ? 'bg-indigo-600 text-white'
                          : step > stepNum
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {step > stepNum ? <Check className="h-5 w-5" /> : stepNum}
                    </button>
                    {stepNum < 3 && (
                      <div
                        className={`h-1 w-24 mx-2 ${
                          step > stepNum ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </React.Fragment>
                ))}
                <div className="ml-6">
                  <span className="text-sm font-medium text-gray-700">
                    {step === 1 && 'Informations de base'}
                    {step === 2 && 'Questions'}
                    {step === 3 && 'Configuration'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {step === 1 && <Step1 />}
            {step === 2 && <Step2 />}
            {step === 3 && <Step3 />}
            
            {/* Navigation */}
            <div className="mt-8 flex justify-between">
              <div>
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Précédent
                  </button>
                )}
              </div>
              
              <div className="flex space-x-4">
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
                  >
                    Suivant
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                    >
                      Sauvegarder comme brouillon
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center"
                    >
                      <Save className="h-5 w-5 mr-2" />
                      Publier le quiz
                    </button>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default QuizCreate;