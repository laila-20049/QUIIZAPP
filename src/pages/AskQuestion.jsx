import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Send, Tag, AlertCircle, CheckCircle2 } from 'lucide-react';
import { saveQuestion } from '../utils/forumStorage';

const AskQuestion = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    tags: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est requis';
    } else if (formData.title.trim().length < 10) {
      newErrors.title = 'Le titre doit contenir au moins 10 caractères';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'La description est requise';
    } else if (formData.content.trim().length < 20) {
      newErrors.content = 'La description doit contenir au moins 20 caractères';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Votre nom est requis';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Process tags
    const tagsArray = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    
    const questionData = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      author: formData.author.trim(),
      tags: tagsArray,
    };
    
    try {
      const newQuestion = saveQuestion(questionData);
      setShowSuccess(true);
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate(`/forum/question/${newQuestion.id}`);
      }, 1500);
    } catch (error) {
      console.error('Error saving question:', error);
      setErrors({ submit: 'Une erreur est survenue. Veuillez réessayer.' });
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-10 text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Question publiée !
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Votre question a été publiée avec succès. Vous allez être redirigé...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/forum"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Retour au forum
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Poser une question
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Partagez vos questions avec la communauté et obtenez des réponses
          </p>
        </div>

        {/* Tips Card */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
          <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-3 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Conseils pour une bonne question
          </h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li className="flex items-start gap-2">
              <span className="font-bold mt-0.5">•</span>
              <span>Choisissez un titre clair et descriptif</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold mt-0.5">•</span>
              <span>Expliquez votre problème en détail avec le contexte</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold mt-0.5">•</span>
              <span>Ajoutez des tags pertinents pour faciliter la recherche</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold mt-0.5">•</span>
              <span>Soyez respectueux et utilisez un langage approprié</span>
            </li>
          </ul>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          {/* Author */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
              Votre nom
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-0 focus:outline-none transition-colors ${
                errors.author
                  ? 'border-red-300 bg-red-50 dark:bg-red-900/20 focus:border-red-500'
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-blue-500 text-gray-900 dark:text-white'
              }`}
              placeholder="Ex: Ahmed Bennani"
            />
            {errors.author && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.author}
              </p>
            )}
          </div>

          {/* Title */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
              Titre de la question
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-0 focus:outline-none transition-colors ${
                errors.title
                  ? 'border-red-300 bg-red-50 dark:bg-red-900/20 focus:border-red-500'
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-blue-500 text-gray-900 dark:text-white'
              }`}
              placeholder="Ex: Comment résoudre une équation différentielle ?"
            />
            {errors.title && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.title}
              </p>
            )}
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {formData.title.length} caractères (minimum 10)
            </p>
          </div>

          {/* Content */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
              Description détaillée
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={8}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-0 focus:outline-none transition-colors resize-none ${
                errors.content
                  ? 'border-red-300 bg-red-50 dark:bg-red-900/20 focus:border-red-500'
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-blue-500 text-gray-900 dark:text-white'
              }`}
              placeholder="Expliquez votre question en détail. Ajoutez le contexte, ce que vous avez déjà essayé, et toute information pertinente..."
            />
            {errors.content && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.content}
              </p>
            )}
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {formData.content.length} caractères (minimum 20)
            </p>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Tags (optionnel)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:ring-0 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Ex: mathématiques, algèbre, examens"
            />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Séparez les tags par des virgules
            </p>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <p className="text-red-600 dark:text-red-400 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                {errors.submit}
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate('/forum')}
              className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg hover:scale-105'
              }`}
            >
              <Send className="h-5 w-5" />
              {isSubmitting ? 'Publication...' : 'Publier la question'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
