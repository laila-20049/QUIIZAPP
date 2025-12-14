import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Eye, User, Clock } from 'lucide-react';
import { formatDate, getAnswersByQuestionId } from '../utils/forumStorage';

const ForumQuestionCard = ({ question }) => {
  const answerCount = getAnswersByQuestionId(question.id).length;

  return (
    <Link
      to={`/forum/question/${question.id}`}
      className={`block w-full pl-12 pr-12 py-4 rounded-xl border-2 transition-all duration-300 focus:ring-0 focus:outline-none focus:border-blue-500 ${
        errors.confirmPassword
          ? 'border-red-300 bg-red-50'
          : formData.confirmPassword && !errors.confirmPassword
          ? 'border-green-300 bg-green-50'
          : 'border-gray-300 bg-gray-50 group-hover:border-blue-400'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {question.title}
          </h3>

          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {question.content}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              <span className="font-medium">{question.author}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{formatDate(question.createdAt)}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Eye className="h-4 w-4" />
              <span>{question.views || 0} vues</span>
            </div>

            <div className="flex items-center gap-1.5">
              <MessageCircle className="h-4 w-4" />
              <span
                className={
                  answerCount > 0
                    ? 'text-green-600 dark:text-green-400 font-semibold'
                    : ''
                }
              >
                {answerCount} {answerCount === 1 ? 'réponse' : 'réponses'}
              </span>
            </div>
          </div>

          {question.tags && question.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {question.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {answerCount > 0 && (
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-bold group-hover:scale-110 transition-transform">
              {answerCount}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ForumQuestionCard;
