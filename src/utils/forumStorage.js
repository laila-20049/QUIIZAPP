// Helper functions for forum data persistence using localStorage

const STORAGE_KEYS = {
  QUESTIONS: 'forum_questions',
  ANSWERS: 'forum_answers',
  COMMENTS: 'forum_comments',
};

// Generate unique ID
export const generateId = () => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Questions
export const getQuestions = () => {
  try {
    const questions = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
    return questions ? JSON.parse(questions) : [];
  } catch (error) {
    console.error('Error loading questions:', error);
    return [];
  }
};

export const getQuestionById = (id) => {
  const questions = getQuestions();
  return questions.find(q => q.id === id);
};

export const saveQuestion = (questionData) => {
  const questions = getQuestions();
  const newQuestion = {
    id: generateId(),
    title: questionData.title,
    content: questionData.content,
    author: questionData.author || 'Étudiant Anonyme',
    createdAt: new Date().toISOString(),
    tags: questionData.tags || [],
    views: 0,
  };
  questions.unshift(newQuestion);
  localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
  return newQuestion;
};

export const deleteQuestion = (id) => {
  const questions = getQuestions().filter(q => q.id !== id);
  localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
  // Also delete related answers and comments
  const answers = getAnswers().filter(a => a.questionId !== id);
  localStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(answers));
};

export const incrementQuestionViews = (id) => {
  const questions = getQuestions();
  const question = questions.find(q => q.id === id);
  if (question) {
    question.views = (question.views || 0) + 1;
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
  }
};

// Answers
export const getAnswers = () => {
  try {
    const answers = localStorage.getItem(STORAGE_KEYS.ANSWERS);
    return answers ? JSON.parse(answers) : [];
  } catch (error) {
    console.error('Error loading answers:', error);
    return [];
  }
};

export const getAnswersByQuestionId = (questionId) => {
  const answers = getAnswers();
  return answers.filter(a => a.questionId === questionId);
};

export const saveAnswer = (answerData) => {
  const answers = getAnswers();
  const newAnswer = {
    id: generateId(),
    questionId: answerData.questionId,
    content: answerData.content,
    author: answerData.author || 'Étudiant Anonyme',
    createdAt: new Date().toISOString(),
    upvotes: 0,
  };
  answers.push(newAnswer);
  localStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(answers));
  return newAnswer;
};

export const deleteAnswer = (id) => {
  const answers = getAnswers().filter(a => a.id !== id);
  localStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(answers));
  // Also delete related comments
  const comments = getComments().filter(c => c.answerId !== id);
  localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
};

export const upvoteAnswer = (id) => {
  const answers = getAnswers();
  const answer = answers.find(a => a.id === id);
  if (answer) {
    answer.upvotes = (answer.upvotes || 0) + 1;
    localStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(answers));
  }
};

// Comments
export const getComments = () => {
  try {
    const comments = localStorage.getItem(STORAGE_KEYS.COMMENTS);
    return comments ? JSON.parse(comments) : [];
  } catch (error) {
    console.error('Error loading comments:', error);
    return [];
  }
};

export const getCommentsByAnswerId = (answerId) => {
  const comments = getComments();
  return comments.filter(c => c.answerId === answerId);
};

export const saveComment = (commentData) => {
  const comments = getComments();
  const newComment = {
    id: generateId(),
    answerId: commentData.answerId,
    content: commentData.content,
    author: commentData.author || 'Étudiant Anonyme',
    createdAt: new Date().toISOString(),
  };
  comments.push(newComment);
  localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
  return newComment;
};

export const deleteComment = (id) => {
  const comments = getComments().filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
};

// Utility functions
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'À l\'instant';
  if (diffMins < 60) return `Il y a ${diffMins} min`;
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  if (diffDays < 7) return `Il y a ${diffDays}j`;
  
  return date.toLocaleDateString('fr-FR', { 
    day: 'numeric', 
    month: 'short',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined 
  });
};

// Initialize with sample data if empty
export const initializeSampleData = () => {
  const questions = getQuestions();
  if (questions.length === 0) {
    const sampleQuestions = [
      {
        id: generateId(),
        title: 'Comment préparer l\'examen d\'algèbre linéaire ?',
        content: 'Bonjour, je cherche des conseils pour bien préparer mon examen d\'algèbre linéaire. Quels sont les chapitres les plus importants ? Des ressources recommandées ?',
        author: 'Ahmed Bennani',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        tags: ['mathématiques', 'examens', 'algèbre'],
        views: 45,
      },
      {
        id: generateId(),
        title: 'Différence entre pointeurs et références en C++ ?',
        content: 'Je suis confus sur la différence entre les pointeurs et les références en C++. Quelqu\'un peut m\'expliquer avec des exemples simples ?',
        author: 'Sara El Amrani',
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        tags: ['programmation', 'C++'],
        views: 32,
      },
      {
        id: generateId(),
        title: 'Meilleurs livres pour apprendre la physique quantique ?',
        content: 'Je veux approfondir mes connaissances en physique quantique. Quels livres me recommandez-vous pour un étudiant de niveau L3 ?',
        author: 'Youssef Idrissi',
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        tags: ['physique', 'ressources'],
        views: 28,
      },
    ];
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(sampleQuestions));
  }
};
