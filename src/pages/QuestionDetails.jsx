import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MessageSquare, 
  Eye, 
  Clock, 
  ThumbsUp, 
  Send, 
  User,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { 
  getQuestions, 
  getAnswers, 
  saveAnswer, 
  getComments, 
  saveComment,
  upvoteAnswer,
  formatDate 
} from '../utils/forumStorage';

const QuestionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [comments, setComments] = useState({});
  const [newAnswer, setNewAnswer] = useState({ content: '', author: '' });
  const [newComment, setNewComment] = useState({});
  const [showCommentForm, setShowCommentForm] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = () => {
    const questions = getQuestions();
    const foundQuestion = questions.find(q => q.id === parseInt(id));
    
    if (!foundQuestion) {
      navigate('/forum');
      return;
    }
    
    setQuestion(foundQuestion);
    
    const questionAnswers = getAnswers(parseInt(id));
    setAnswers(questionAnswers);
    
    // Load comments for each answer
    const allComments = {};
    questionAnswers.forEach(answer => {
      allComments[answer.id] = getComments(answer.id);
    });
    setComments(allComments);
  };

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!newAnswer.author.trim()) {
      setError('Votre nom est requis');
      return;
    }
    
    if (!newAnswer.content.trim() || newAnswer.content.trim().length < 10) {
      setError('La réponse doit contenir au moins 10 caractères');
      return;
    }
    
    const answerData = {
      questionId: parseInt(id),
      content: newAnswer.content.trim(),
      author: newAnswer.author.trim(),
    };
    
    saveAnswer(answerData);
    setNewAnswer({ content: '', author: '' });
    setSuccess('Réponse ajoutée avec succès !');
    loadData();
    
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleCommentSubmit = (answerId) => {
    const commentData = newComment[answerId];
    
    if (!commentData?.author?.trim() || !commentData?.content?.trim()) {
      return;
    }
    
    saveComment({
      answerId,
      content: commentData.content.trim(),
      author: commentData.author.trim(),
    });
    
    setNewComment(prev => ({ ...prev, [answerId]: { content: '', author: '' } }));
    setShowCommentForm(prev => ({ ...prev, [answerId]: false }));
    loadData();
  };

  const handleUpvote = (answerId) => {
    upvoteAnswer(answerId);
    loadData();
  };

  const toggleCommentForm = (answerId) => {
    setShowCommentForm(prev => ({ ...prev, [answerId]: !prev[answerId] }));
  };

  const updateCommentField = (answerId, field, value) => {
    setNewComment(prev => ({
      ...prev,
      [answerId]: {
        ...prev[answerId],
        [field]: value
      }
    }));
  };

  if (!question) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          to="/forum"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Retour au forum
        </Link>

        {/* Question Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 border border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {question.title}
          </h1>
          
          {/* Question Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="font-medium">{question.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{formatDate(question.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>{question.views} vues</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>{question.answerCount} réponses</span>
            </div>
          </div>
          
          {/* Question Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {question.content}
            </p>
          </div>
          
          {/* Tags */}
          {question.tags && question.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {question.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-6 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            <span className="text-green-700 dark:text-green-300">{success}</span>
          </div>
        )}

        {/* Answers Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {answers.length} {answers.length === 1 ? 'Réponse' : 'Réponses'}
          </h2>
          
          {answers.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center border border-gray-200 dark:border-gray-700">
              <MessageSquare className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                Aucune réponse pour le moment. Soyez le premier à répondre !
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {answers.map((answer) => (
                <div
                  key={answer.id}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-md"
                >
                  {/* Answer Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <button
                      onClick={() => handleUpvote(answer.id)}
                      className="flex flex-col items-center gap-1 group"
                    >
                      <ThumbsUp className="h-6 w-6 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                        {answer.upvotes}
                      </span>
                    </button>
                    
                    <div className="flex-1">
                      <p className="text-gray-800 dark:text-gray-200 mb-4 whitespace-pre-wrap">
                        {answer.content}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span className="font-medium">{answer.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{formatDate(answer.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Comments Section */}
                  {comments[answer.id] && comments[answer.id].length > 0 && (
                    <div className="ml-12 mt-4 space-y-3 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                      {comments[answer.id].map((comment) => (
                        <div key={comment.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                            {comment.content}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                            <span className="font-medium">{comment.author}</span>
                            <span>•</span>
                            <span>{formatDate(comment.createdAt)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Add Comment Button */}
                  <div className="ml-12 mt-4">
                    {!showCommentForm[answer.id] ? (
                      <button
                        onClick={() => toggleCommentForm(answer.id)}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                      >
                        Ajouter un commentaire
                      </button>
                    ) : (
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Votre nom"
                          value={newComment[answer.id]?.author || ''}
                          onChange={(e) => updateCommentField(answer.id, 'author', e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:ring-0 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                        <textarea
                          placeholder="Écrivez votre commentaire..."
                          value={newComment[answer.id]?.content || ''}
                          onChange={(e) => updateCommentField(answer.id, 'content', e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:ring-0 resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleCommentSubmit(answer.id)}
                            className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                          >
                            Publier
                          </button>
                          <button
                            onClick={() => toggleCommentForm(answer.id)}
                            className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
                          >
                            Annuler
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Answer Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Votre réponse
          </h3>
          
          <form onSubmit={handleAnswerSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                Votre nom
              </label>
              <input
                type="text"
                value={newAnswer.author}
                onChange={(e) => setNewAnswer(prev => ({ ...prev, author: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:ring-0 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Ex: Ahmed Bennani"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                Votre réponse
              </label>
              <textarea
                value={newAnswer.content}
                onChange={(e) => setNewAnswer(prev => ({ ...prev, content: e.target.value }))}
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:ring-0 resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Partagez votre réponse ou solution..."
              />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {newAnswer.content.length} caractères (minimum 10)
              </p>
            </div>
            
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                <span className="text-red-600 dark:text-red-400">{error}</span>
              </div>
            )}
            
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Send className="h-5 w-5" />
              Publier la réponse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetails;
