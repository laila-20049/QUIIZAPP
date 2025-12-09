// Base de données simulée améliorée avec système de cache et validation

export const Database = {
  // ========== UTILISATEURS ==========
  users: [
    {
      id: 1,
      email: "admin@quiz.ma",
      password: "$2b$10$hashed_password_example", // bcrypt hash simulé
      firstName: "Ahmed",
      lastName: "Alaoui",
      role: "admin",
      avatar: null,
      universityId: 1,
      facultyId: 1,
      level: "S6",
      isPro: true,
      subscription: "premium",
      createdAt: "2024-01-15T10:00:00Z",
      lastLogin: "2024-01-20T14:30:00Z",
      isActive: true,
      permissions: ["manage_quizzes", "manage_users", "view_analytics", "manage_system"],
      bio: "Administrateur système de la plateforme QuizMaster",
      socialLinks: {
        github: "https://github.com/ahmedalaoui",
        linkedin: "https://linkedin.com/in/ahmedalaoui"
      },
      settings: {
        theme: "dark",
        notifications: true,
        language: "fr"
      }
    },
    {
      id: 2,
      email: "fatima.zahra@um5.ac.ma",
      password: "$2b$10$hashed_password_example",
      firstName: "Fatima",
      lastName: "Zahra",
      role: "student",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      universityId: 2,
      facultyId: 3,
      level: "S3",
      isPro: false,
      subscription: "free",
      createdAt: "2024-01-10T09:15:00Z",
      lastLogin: "2024-01-20T16:45:00Z",
      isActive: true,
      permissions: ["take_quiz", "view_profile", "save_quizzes"],
      bio: "Étudiante en informatique passionnée par l'IA",
      socialLinks: {
        github: "https://github.com/fatimazahra",
        twitter: "https://twitter.com/fatimazahra"
      },
      settings: {
        theme: "light",
        notifications: true,
        language: "fr"
      },
      streak: 7, // jours consécutifs d'activité
      xp: 1250 // points d'expérience
    },
    {
      id: 3,
      email: "m.berrada@uh2.ac.ma",
      password: "$2b$10$hashed_password_example",
      firstName: "Dr. Mohammed",
      lastName: "Berrada",
      role: "professor",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      universityId: 1,
      facultyId: 2,
      level: null,
      isPro: true,
      subscription: "premium",
      createdAt: "2024-01-05T08:00:00Z",
      lastLogin: "2024-01-19T11:20:00Z",
      isActive: true,
      permissions: ["create_quiz", "manage_own_quizzes", "view_analytics", "grade_students"],
      bio: "Professeur d'informatique spécialisé en Machine Learning",
      socialLinks: {
        linkedin: "https://linkedin.com/in/mberrada",
        researchgate: "https://researchgate.net/profile/mberrada"
      },
      settings: {
        theme: "auto",
        notifications: true,
        language: "fr"
      },
      verified: true
    },
    {
      id: 4,
      email: "karim.alami@uca.ac.ma",
      password: "$2b$10$hashed_password_example",
      firstName: "Karim",
      lastName: "Alami",
      role: "student",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      universityId: 3,
      facultyId: 5,
      level: "S4",
      isPro: true,
      subscription: "premium",
      createdAt: "2024-01-12T14:20:00Z",
      lastLogin: "2024-01-21T09:15:00Z",
      isActive: true,
      permissions: ["take_quiz", "view_profile", "pro_features"],
      bio: "Étudiant en médecine avec passion pour les neurosciences",
      settings: {
        theme: "dark",
        notifications: false,
        language: "en"
      },
      streak: 3,
      xp: 850
    }
  ],

  // ========== UNIVERSITÉS ==========
  universities: [
    {
      id: 1,
      name: "Université Hassan II",
      acronym: "UH2",
      city: "Casablanca",
      logo: "https://via.placeholder.com/100x100/3B82F6/FFFFFF?text=UH2",
      website: "https://www.uh2.ac.ma",
      description: "Université publique marocaine située à Casablanca",
      isActive: true,
      studentsCount: 45000,
      ranking: 2,
      faculties: [1, 2, 7, 8]
    },
    {
      id: 2,
      name: "Université Mohammed V",
      acronym: "UM5",
      city: "Rabat",
      logo: "https://via.placeholder.com/100x100/10B981/FFFFFF?text=UM5",
      website: "https://www.um5.ac.ma",
      description: "Université publique marocaine située à Rabat",
      isActive: true,
      studentsCount: 52000,
      ranking: 1,
      faculties: [3, 4, 9, 10]
    },
    {
      id: 3,
      name: "Université Cadi Ayyad",
      acronym: "UCA",
      city: "Marrakech",
      logo: "https://via.placeholder.com/100x100/8B5CF6/FFFFFF?text=UCA",
      website: "https://www.uca.ma",
      description: "Université publique marocaine située à Marrakech",
      isActive: true,
      studentsCount: 38000,
      ranking: 3,
      faculties: [5, 6, 11]
    },
    {
      id: 4,
      name: "Université Ibn Tofail",
      acronym: "UIT",
      city: "Kénitra",
      logo: "https://via.placeholder.com/100x100/EF4444/FFFFFF?text=UIT",
      website: "https://www.uit.ac.ma",
      description: "Université publique marocaine située à Kénitra",
      isActive: true,
      studentsCount: 28000,
      ranking: 4,
      faculties: [12, 13]
    }
  ],

  // ========== FACULTÉS ==========
  faculties: [
    {
      id: 1,
      name: "Faculté des Sciences",
      acronym: "FS",
      universityId: 1,
      description: "Faculté des Sciences de l'Université Hassan II",
      dean: "Pr. Ahmed Benjelloun",
      email: "fs@uh2.ac.ma",
      phone: "+212 5 22 23 45 67"
    },
    {
      id: 2,
      name: "Faculté des Sciences et Techniques",
      acronym: "FST",
      universityId: 1,
      description: "FST de l'Université Hassan II",
      dean: "Pr. Samira El Hajji",
      email: "fst@uh2.ac.ma",
      phone: "+212 5 22 23 45 68"
    },
    {
      id: 3,
      name: "École Nationale des Sciences Appliquées",
      acronym: "ENSA",
      universityId: 2,
      description: "ENSA de l'Université Mohammed V",
      dean: "Pr. Khalid El Khadiri",
      email: "ensa@um5.ac.ma",
      phone: "+212 5 37 77 88 99"
    }
  ],

  // ========== MATIÈRES ==========
  subjects: [
    {
      id: 1,
      name: "Programmation Python",
      category: "Informatique",
      icon: "💻",
      description: "Programmation en Python et algorithmique",
      color: "blue",
      popularity: 95,
      topics: ["Bases Python", "POO", "Algorithmique", "Bibliothèques standards"],
      difficulty: ["Débutant", "Intermédiaire"]
    },
    {
      id: 2,
      name: "Machine Learning",
      category: "Informatique",
      icon: "🤖",
      description: "Apprentissage automatique et intelligence artificielle",
      color: "purple",
      popularity: 88,
      topics: ["Classification", "Régression", "Deep Learning", "NLP", "Computer Vision"],
      difficulty: ["Intermédiaire", "Avancé"]
    },
    {
      id: 3,
      name: "Algèbre Linéaire",
      category: "Mathématiques",
      icon: "📊",
      description: "Matrices, espaces vectoriels, valeurs propres",
      color: "green",
      popularity: 76,
      topics: ["Matrices", "Déterminants", "Espaces vectoriels", "Diagonalisation"],
      difficulty: ["Débutant", "Intermédiaire"]
    }
  ],

  // ========== QUIZZES ==========
  quizzes: [
    {
      id: 1,
      title: "Introduction à la Programmation Python",
      description: "Maîtrisez les bases de la programmation en Python : variables, structures de contrôle, fonctions et POO.",
      subjectId: 1,
      universityId: 1,
      facultyId: 1,
      level: "S1",
      authorId: 3,
      questionsCount: 20,
      duration: 30,
      difficulty: "beginner",
      isPro: false,
      isPublished: true,
      isFeatured: true,
      isVerified: true,
      attempts: 1250,
      avgScore: 72.5,
      successRate: 68,
      rating: 4.3,
      ratingCount: 245,
      createdAt: "2024-01-10T09:00:00Z",
      updatedAt: "2024-01-15T14:20:00Z",
      tags: ["Python", "Débutant", "Algorithmique", "Programmation"],
      learningObjectives: [
        "Comprendre les types de données",
        "Maîtriser les structures conditionnelles",
        "Implémenter des fonctions",
        "Introduction à la POO"
      ],
      prerequisites: ["Aucun prérequis nécessaire"],
      coverImage: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec1?w=800&h=400&fit=crop",
      language: "fr",
      estimatedTime: "30 minutes",
      category: "Informatique"
    },
    {
      id: 2,
      title: "Machine Learning Avancé - Deep Learning",
      description: "Architectures avancées de deep learning : CNN, RNN, Transformers et applications en NLP.",
      subjectId: 2,
      universityId: 2,
      facultyId: 3,
      level: "Master",
      authorId: 3,
      questionsCount: 35,
      duration: 75,
      difficulty: "expert",
      isPro: true,
      isPublished: true,
      isFeatured: true,
      isVerified: true,
      attempts: 842,
      avgScore: 58.2,
      successRate: 42,
      rating: 4.8,
      ratingCount: 124,
      createdAt: "2024-01-12T11:30:00Z",
      updatedAt: "2024-01-18T16:45:00Z",
      tags: ["Deep Learning", "PyTorch", "Computer Vision", "NLP", "IA"],
      learningObjectives: [
        "Maîtriser les architectures CNN",
        "Implémenter des modèles Transformer",
        "Optimiser les hyperparamètres",
        "Déployer des modèles en production"
      ],
      prerequisites: ["Bases en Python", "Concepts ML", "Algèbre linéaire"],
      coverImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
      language: "fr",
      estimatedTime: "1 heure 15 minutes",
      category: "Informatique"
    },
    {
      id: 3,
      title: "Algèbre Linéaire - Espaces Vectoriels",
      description: "Concepts fondamentaux des espaces vectoriels, applications linéaires et diagonalisation.",
      subjectId: 3,
      universityId: 1,
      facultyId: 2,
      level: "S2",
      authorId: 3,
      questionsCount: 25,
      duration: 45,
      difficulty: "intermediate",
      isPro: false,
      isPublished: true,
      isFeatured: false,
      isVerified: true,
      attempts: 890,
      avgScore: 65.8,
      successRate: 55,
      rating: 4.1,
      ratingCount: 178,
      createdAt: "2024-01-08T10:15:00Z",
      updatedAt: "2024-01-16T09:30:00Z",
      tags: ["Algèbre", "Matrices", "Espaces Vectoriels", "Mathématiques"],
      learningObjectives: [
        "Comprendre les espaces vectoriels",
        "Maîtriser les applications linéaires",
        "Diagonaliser des matrices",
        "Résoudre des systèmes linéaires"
      ],
      prerequisites: ["Algèbre élémentaire"],
      coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop",
      language: "fr",
      estimatedTime: "45 minutes",
      category: "Mathématiques"
    }
  ],

  // ========== QUESTIONS ==========
  questions: [
    {
      id: 1,
      quizId: 1,
      type: "multiple_choice",
      question: "Quel mot-clé est utilisé pour définir une fonction en Python ?",
      options: [
        "function",
        "def", 
        "define",
        "func"
      ],
      correctAnswer: 1,
      explanation: "Le mot-clé 'def' est utilisé pour définir une fonction en Python. Exemple: def ma_fonction():",
      difficulty: "easy",
      points: 1,
      timeLimit: 60,
      hasImage: false,
      imageUrl: null,
      tags: ["Fonctions", "Syntaxe"],
      hint: "Regardez la documentation officielle de Python",
      codeSnippet: "# Comment définir une fonction ?"
    },
    {
      id: 2,
      quizId: 1,
      type: "multiple_choice",
      question: "Quelle est la sortie de : print(3 * 'a') ?",
      options: [
        "aaa",
        "3a",
        "a3",
        "Erreur"
      ],
      correctAnswer: 0,
      explanation: "En Python, multiplier une chaîne par un entier répète la chaîne. C'est une opération de concaténation.",
      difficulty: "easy",
      points: 1,
      timeLimit: 60,
      hasImage: false,
      imageUrl: null,
      tags: ["Opérations", "Strings"],
      hint: "Pensez à la concaténation de chaînes"
    }
  ],

  // ========== TENTATIVES DE QUIZ ==========
  quizAttempts: [
    {
      id: 1,
      userId: 2,
      quizId: 1,
      score: 85,
      correctAnswers: 17,
      totalQuestions: 20,
      timeSpent: 1425,
      completedAt: "2024-01-20T15:30:00Z",
      status: "completed",
      mode: "practice",
      sessionId: "session_001",
      answers: [
        { questionId: 1, selectedAnswer: 1, isCorrect: true, timeSpent: 45 },
        { questionId: 2, selectedAnswer: 0, isCorrect: true, timeSpent: 30 }
      ],
      xpEarned: 85,
      badgesEarned: ["python_beginner"]
    },
    {
      id: 2,
      userId: 2,
      quizId: 1,
      score: 90,
      correctAnswers: 18,
      totalQuestions: 20,
      timeSpent: 1560,
      completedAt: "2024-01-21T10:15:00Z",
      status: "completed",
      mode: "exam",
      sessionId: "session_002",
      answers: [
        { questionId: 1, selectedAnswer: 1, isCorrect: true, timeSpent: 40 },
        { questionId: 2, selectedAnswer: 0, isCorrect: true, timeSpent: 35 }
      ],
      xpEarned: 100,
      badgesEarned: ["quick_learner"]
    }
  ],

  // ========== CLASSEMENT ==========
  leaderboard: [
    {
      id: 1,
      userId: 2,
      quizId: 1,
      score: 90,
      rank: 1,
      timeSpent: 1560,
      completedAt: "2024-01-21T10:15:00Z",
      xp: 100
    },
    {
      id: 2,
      userId: 1,
      quizId: 1,
      score: 88,
      rank: 2,
      timeSpent: 1620,
      completedAt: "2024-01-20T16:20:00Z",
      xp: 88
    }
  ],

  // ========== PROGRÈS UTILISATEUR ==========
  userProgress: [
    {
      id: 1,
      userId: 2,
      subjectId: 1,
      quizzesCompleted: 5,
      totalScore: 425,
      averageScore: 85,
      timeSpent: 12500,
      level: "advanced",
      badges: ["python_expert", "quick_learner"],
      lastActivity: "2024-01-21T10:15:00Z",
      xp: 1250,
      streak: 7,
      rank: "Diamant"
    }
  ],

  // ========== BADGES ==========
  badges: [
    {
      id: 1,
      name: "Débutant en Python",
      description: "Complétez votre premier quiz Python",
      icon: "🐍",
      color: "green",
      xpReward: 50,
      criteria: { quizzesCompleted: 1, subject: "Python", minScore: 60 }
    },
    {
      id: 2,
      name: "Expert en Algorithmique",
      description: "Score > 90% dans 5 quizzes d'algorithmique",
      icon: "💡",
      color: "gold",
      xpReward: 200,
      criteria: { minScore: 90, quizzesCount: 5, subject: "Algorithmique" }
    }
  ],

  // ========== USER BADGES ==========
  userBadges: [
    {
      id: 1,
      userId: 2,
      badgeId: 1,
      earnedAt: "2024-01-15T14:30:00Z",
      progress: 100
    }
  ],

  // ========== ABONNEMENTS ==========
  subscriptions: [
    {
      id: 1,
      userId: 1,
      plan: "premium",
      startDate: "2024-01-01T00:00:00Z",
      endDate: "2024-12-31T23:59:59Z",
      status: "active",
      paymentMethod: "credit_card",
      autoRenew: true,
      price: 299.99
    }
  ],

  // ========== NOTIFICATIONS ==========
  notifications: [
    {
      id: 1,
      userId: 2,
      type: "quiz_completed",
      title: "Quiz Terminé !",
      message: "Vous avez terminé le quiz 'Introduction à Python' avec un score de 85%",
      isRead: false,
      createdAt: "2024-01-20T15:30:00Z",
      data: { quizId: 1, score: 85 },
      priority: "medium",
      action: { label: "Voir les résultats", url: "/quiz/1/results" }
    },
    {
      id: 2,
      userId: 2,
      type: "badge_earned",
      title: "Nouveau Badge !",
      message: "Vous avez obtenu le badge 'Débutant en Python'",
      isRead: false,
      createdAt: "2024-01-15T14:30:00Z",
      data: { badgeId: 1, badgeName: "Débutant en Python" },
      priority: "high",
      action: { label: "Voir le badge", url: "/profile/badges" }
    }
  ],

  // ========== FAVORIS ==========
  favorites: [
    {
      id: 1,
      userId: 2,
      quizId: 1,
      addedAt: "2024-01-18T11:20:00Z"
    }
  ],

  // ========== COMMENTAIRES ==========
  comments: [
    {
      id: 1,
      quizId: 1,
      userId: 2,
      content: "Excellent quiz pour débuter avec Python ! Les explications sont très claires.",
      rating: 5,
      createdAt: "2024-01-20T15:35:00Z",
      updatedAt: "2024-01-20T15:35:00Z",
      likes: 12,
      isEdited: false
    }
  ]
};

// ========== CACHE EN MÉMOIRE ==========
const Cache = {
  quizzes: new Map(),
  users: new Map(),
  subjects: new Map(),
  maxAge: 5 * 60 * 1000 // 5 minutes
};

// ========== VALIDATEURS ==========
const Validators = {
  isEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  isPasswordStrong: (password) => password.length >= 8,
  isQuizDataValid: (quiz) => {
    const required = ['title', 'subjectId', 'authorId', 'difficulty'];
    return required.every(field => quiz[field]);
  }
};

// ========== API AMÉLIORÉE ==========
export const DatabaseAPI = {
  // Système de cache
  cache: {
    get: (key, type) => {
      const cached = Cache[type]?.get(key);
      if (cached && Date.now() - cached.timestamp < Cache.maxAge) {
        return cached.data;
      }
      return null;
    },
    set: (key, data, type) => {
      Cache[type]?.set(key, {
        data,
        timestamp: Date.now()
      });
    },
    clear: (type) => {
      if (type) {
        Cache[type]?.clear();
      } else {
        Object.values(Cache).forEach(cache => cache?.clear());
      }
    },
    invalidate: (key, type) => {
      Cache[type]?.delete(key);
    }
  },

  // Users
  getUserById: (id) => {
    const cacheKey = `user_${id}`;
    const cached = DatabaseAPI.cache.get(cacheKey, 'users');
    if (cached) return cached;

    const user = Database.users.find(user => user.id === id);
    if (user) {
      DatabaseAPI.cache.set(cacheKey, user, 'users');
    }
    return user;
  },

  getUserByEmail: (email) => {
    if (!Validators.isEmail(email)) {
      throw new Error('Email invalide');
    }
    return Database.users.find(user => user.email === email);
  },

  authenticateUser: (email, password) => {
    const user = DatabaseAPI.getUserByEmail(email);
    if (!user) return null;
    
    // En réalité, comparer avec bcrypt
    const passwordMatch = password === "demo123"; // Simplifié pour la démo
    if (!passwordMatch) return null;
    
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      avatar: user.avatar,
      permissions: user.permissions
    };
  },

  updateUser: (id, updates) => {
    const index = Database.users.findIndex(user => user.id === id);
    if (index === -1) return false;

    Database.users[index] = { ...Database.users[index], ...updates };
    DatabaseAPI.cache.invalidate(`user_${id}`, 'users');
    return true;
  },

  // Quizzes
  getQuizzes: (filters = {}) => {
    const cacheKey = JSON.stringify(filters);
    const cached = DatabaseAPI.cache.get(cacheKey, 'quizzes');
    if (cached) return cached;

    let quizzes = Database.quizzes.filter(quiz => {
      if (filters.isPublished !== undefined && quiz.isPublished !== filters.isPublished) {
        return false;
      }
      if (filters.universityId && quiz.universityId !== filters.universityId) {
        return false;
      }
      if (filters.subjectId && quiz.subjectId !== filters.subjectId) {
        return false;
      }
      if (filters.difficulty && quiz.difficulty !== filters.difficulty) {
        return false;
      }
      if (filters.level && quiz.level !== filters.level) {
        return false;
      }
      if (filters.isPro !== undefined && quiz.isPro !== filters.isPro) {
        return false;
      }
      if (filters.isFeatured !== undefined && quiz.isFeatured !== filters.isFeatured) {
        return false;
      }
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matches = 
          quiz.title.toLowerCase().includes(searchTerm) ||
          quiz.description.toLowerCase().includes(searchTerm) ||
          quiz.tags?.some(tag => tag.toLowerCase().includes(searchTerm));
        if (!matches) return false;
      }
      return true;
    });

    // Tri
    if (filters.sortBy) {
      quizzes.sort((a, b) => {
        switch (filters.sortBy) {
          case 'popularity': return b.attempts - a.attempts;
          case 'rating': return b.rating - a.rating;
          case 'newest': return new Date(b.createdAt) - new Date(a.createdAt);
          case 'difficulty': 
            const difficultyOrder = { 'beginner': 1, 'intermediate': 2, 'expert': 3 };
            return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
          default: return 0;
        }
      });
    }

    // Pagination
    if (filters.page && filters.limit) {
      const start = (filters.page - 1) * filters.limit;
      const end = start + filters.limit;
      quizzes = quizzes.slice(start, end);
    }

    DatabaseAPI.cache.set(cacheKey, quizzes, 'quizzes');
    return quizzes;
  },

  getQuizById: (id) => {
    const cacheKey = `quiz_${id}`;
    const cached = DatabaseAPI.cache.get(cacheKey, 'quizzes');
    if (cached) return cached;

    const quiz = Database.quizzes.find(q => q.id === id);
    if (!quiz) return null;

    // Enrichir avec les données liées
    const enrichedQuiz = {
      ...quiz,
      subject: Database.subjects.find(s => s.id === quiz.subjectId),
      university: Database.universities.find(u => u.id === quiz.universityId),
      faculty: Database.faculties.find(f => f.id === quiz.facultyId),
      author: Database.users.find(u => u.id === quiz.authorId),
      questions: Database.questions.filter(q => q.quizId === id),
      attempts: Database.quizAttempts.filter(a => a.quizId === id),
      comments: Database.comments.filter(c => c.quizId === id)
    };

    DatabaseAPI.cache.set(cacheKey, enrichedQuiz, 'quizzes');
    return enrichedQuiz;
  },

  createQuiz: (quizData) => {
    if (!Validators.isQuizDataValid(quizData)) {
      throw new Error('Données du quiz invalides');
    }

    const newQuiz = {
      id: Database.quizzes.length + 1,
      ...quizData,
      attempts: 0,
      avgScore: 0,
      successRate: 0,
      rating: 0,
      ratingCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPublished: quizData.isPublished || false,
      isFeatured: false,
      isVerified: false
    };

    Database.quizzes.push(newQuiz);
    DatabaseAPI.cache.clear('quizzes');
    return newQuiz;
  },

  // Questions
  getQuestionsByQuizId: (quizId) => 
    Database.questions.filter(q => q.quizId === quizId),

  createQuestion: (questionData) => {
    const newQuestion = {
      id: Database.questions.length + 1,
      ...questionData,
      createdAt: new Date().toISOString()
    };

    Database.questions.push(newQuestion);
    // Invalider le cache du quiz concerné
    DatabaseAPI.cache.invalidate(`quiz_${questionData.quizId}`, 'quizzes');
    return newQuestion;
  },

  // Quiz Attempts
  createQuizAttempt: (attemptData) => {
    const newAttempt = {
      id: Database.quizAttempts.length + 1,
      ...attemptData,
      completedAt: new Date().toISOString()
    };

    Database.quizAttempts.push(newAttempt);
    
    // Mettre à jour les stats du quiz
    const quizIndex = Database.quizzes.findIndex(q => q.id === attemptData.quizId);
    if (quizIndex !== -1) {
      const quiz = Database.quizzes[quizIndex];
      quiz.attempts++;
      
      // Recalculer la moyenne des scores
      const attempts = Database.quizAttempts.filter(a => a.quizId === attemptData.quizId);
      quiz.avgScore = attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length;
      
      // Invalider le cache
      DatabaseAPI.cache.invalidate(`quiz_${attemptData.quizId}`, 'quizzes');
    }

    return newAttempt;
  },

  // Leaderboard
  getQuizLeaderboard: (quizId, limit = 10) => {
    const cacheKey = `leaderboard_${quizId}_${limit}`;
    const cached = DatabaseAPI.cache.get(cacheKey, 'leaderboard');
    if (cached) return cached;

    const entries = Database.leaderboard
      .filter(lb => lb.quizId === quizId)
      .sort((a, b) => b.score - a.score || a.timeSpent - b.timeSpent)
      .slice(0, limit)
      .map(entry => ({
        ...entry,
        user: Database.users.find(u => u.id === entry.userId)
      }));

    DatabaseAPI.cache.set(cacheKey, entries, 'leaderboard');
    return entries;
  },

  // User Progress
  getUserProgress: (userId) => {
    const progress = Database.userProgress.find(up => up.userId === userId);
    if (!progress) {
      // Créer une entrée par défaut si elle n'existe pas
      const defaultProgress = {
        id: Database.userProgress.length + 1,
        userId,
        quizzesCompleted: 0,
        totalScore: 0,
        averageScore: 0,
        timeSpent: 0,
        level: "beginner",
        badges: [],
        lastActivity: new Date().toISOString(),
        xp: 0,
        streak: 0,
        rank: "Bronze"
      };
      Database.userProgress.push(defaultProgress);
      return defaultProgress;
    }
    return progress;
  },

  // Search
  searchQuizzes: (query, options = {}) => {
    const searchTerm = query.toLowerCase();
    let results = Database.quizzes.filter(quiz =>
      quiz.title.toLowerCase().includes(searchTerm) ||
      quiz.description.toLowerCase().includes(searchTerm) ||
      quiz.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      quiz.learningObjectives?.some(obj => obj.toLowerCase().includes(searchTerm))
    );

    if (options.subjectId) {
      results = results.filter(q => q.subjectId === options.subjectId);
    }

    if (options.difficulty) {
      results = results.filter(q => q.difficulty === options.difficulty);
    }

    return results;
  },

  // Analytics
  getAnalytics: (period = 'month') => {
    const now = new Date();
    let startDate;
    
    switch (period) {
      case 'day': startDate = new Date(now.setDate(now.getDate() - 1)); break;
      case 'week': startDate = new Date(now.setDate(now.getDate() - 7)); break;
      case 'month': startDate = new Date(now.setMonth(now.getMonth() - 1)); break;
      default: startDate = new Date(now.setMonth(now.getMonth() - 1));
    }

    const recentAttempts = Database.quizAttempts.filter(
      a => new Date(a.completedAt) >= startDate
    );

    return {
      totalQuizzes: Database.quizzes.length,
      totalUsers: Database.users.length,
      totalAttempts: Database.quizAttempts.length,
      recentAttempts: recentAttempts.length,
      avgScore: Database.quizAttempts.reduce((sum, a) => sum + a.score, 0) / Database.quizAttempts.length,
      popularSubjects: Database.subjects.map(subject => ({
        ...subject,
        quizCount: Database.quizzes.filter(q => q.subjectId === subject.id).length
      })).sort((a, b) => b.quizCount - a.quizCount)
    };
  },

  // Favorites
  toggleFavorite: (userId, quizId) => {
    const existingIndex = Database.favorites.findIndex(
      f => f.userId === userId && f.quizId === quizId
    );

    if (existingIndex !== -1) {
      Database.favorites.splice(existingIndex, 1);
      return { action: 'removed' };
    } else {
      const newFavorite = {
        id: Database.favorites.length + 1,
        userId,
        quizId,
        addedAt: new Date().toISOString()
      };
      Database.favorites.push(newFavorite);
      return { action: 'added', favorite: newFavorite };
    }
  },

  getUserFavorites: (userId) => {
    const favoriteIds = Database.favorites
      .filter(f => f.userId === userId)
      .map(f => f.quizId);
    
    return Database.quizzes.filter(quiz => favoriteIds.includes(quiz.id));
  }
};

// ========== UTILITAIRES ==========
export const DatabaseUtils = {
  formatDate: (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  calculateLevel: (xp) => {
    const levels = [
      { name: "Novice", minXP: 0, color: "gray" },
      { name: "Apprenti", minXP: 100, color: "blue" },
      { name: "Confirmé", minXP: 500, color: "green" },
      { name: "Expert", minXP: 1500, color: "purple" },
      { name: "Maître", minXP: 3000, color: "gold" }
    ];
    
    return levels.reverse().find(level => xp >= level.minXP) || levels[0];
  },

  generateCertificate: (userId, quizId, score) => {
    const user = DatabaseAPI.getUserById(userId);
    const quiz = DatabaseAPI.getQuizById(quizId);
    
    return {
      id: `CERT_${Date.now()}`,
      userId,
      quizId,
      userName: `${user.firstName} ${user.lastName}`,
      quizTitle: quiz.title,
      score,
      issueDate: new Date().toISOString(),
      certificateNumber: `QM-${Date.now().toString(36).toUpperCase()}`
    };
  }
};

export default Database;