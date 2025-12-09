import { useState, useCallback, useRef } from 'react';
import { DatabaseAPI, DatabaseUtils } from '../data/database';

// Configuration des requêtes
const DEFAULT_CONFIG = {
  retryCount: 3,
  retryDelay: 1000,
  cacheTimeout: 5 * 60 * 1000, // 5 minutes
  timeout: 30000 // 30 secondes
};

export const useDatabase = (config = {}) => {
  const [state, setState] = useState({
    loading: false,
    error: null,
    data: null
  });

  const [cache, setCache] = useState({});
  const abortControllers = useRef(new Map());
  const pendingRequests = useRef(new Set());

  const mergedConfig = { ...DEFAULT_CONFIG, ...config };

  // Nettoyage des requêtes
  const cleanupRequest = useCallback((requestId) => {
    const controller = abortControllers.current.get(requestId);
    if (controller) {
      controller.abort();
      abortControllers.current.delete(requestId);
    }
    pendingRequests.current.delete(requestId);
  }, []);

  // Annuler toutes les requêtes
  const cancelAllRequests = useCallback(() => {
    abortControllers.current.forEach(controller => controller.abort());
    abortControllers.current.clear();
    pendingRequests.current.clear();
  }, []);

  // Gestion du cache
  const getCachedData = useCallback((key) => {
    const cached = cache[key];
    if (cached && Date.now() - cached.timestamp < mergedConfig.cacheTimeout) {
      return cached.data;
    }
    return null;
  }, [cache, mergedConfig.cacheTimeout]);

  const setCachedData = useCallback((key, data) => {
    setCache(prev => ({
      ...prev,
      [key]: {
        data,
        timestamp: Date.now()
      }
    }));
  }, []);

  // Fonction de retry avec backoff exponentiel
  const retryWithBackoff = useCallback(async (fn, retryCount = 0) => {
    try {
      return await fn();
    } catch (err) {
      if (retryCount >= mergedConfig.retryCount) {
        throw err;
      }
      
      const delay = mergedConfig.retryDelay * Math.pow(2, retryCount);
      await new Promise(resolve => setTimeout(resolve, delay));
      
      return retryWithBackoff(fn, retryCount + 1);
    }
  }, [mergedConfig.retryCount, mergedConfig.retryDelay]);

  // Fonction de requête principale
  const executeQuery = useCallback(async (queryFn, options = {}) => {
    const {
      cacheKey,
      useCache = true,
      onSuccess,
      onError,
      skipLoading = false
    } = options;

    const requestId = Symbol('request');

    // Vérifier le cache
    if (useCache && cacheKey) {
      const cachedData = getCachedData(cacheKey);
      if (cachedData) {
        return cachedData;
      }
    }

    // Préparer la requête
    if (!skipLoading) {
      setState(prev => ({ ...prev, loading: true, error: null }));
    }

    const controller = new AbortController();
    abortControllers.current.set(requestId, controller);
    pendingRequests.current.add(requestId);

    try {
      // Timeout
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), mergedConfig.timeout);
      });

      // Exécuter la requête avec retry
      const queryPromise = retryWithBackoff(async () => {
        const result = await queryFn();
        if (controller.signal.aborted) {
          throw new DOMException('Request aborted', 'AbortError');
        }
        return result;
      });

      const data = await Promise.race([queryPromise, timeoutPromise]);

      // Mettre en cache si nécessaire
      if (useCache && cacheKey) {
        setCachedData(cacheKey, data);
      }

      // Mettre à jour l'état
      setState(prev => ({
        ...prev,
        loading: false,
        error: null,
        data
      }));

      // Callback de succès
      if (onSuccess) {
        onSuccess(data);
      }

      return data;

    } catch (err) {
      // Ignorer les erreurs d'annulation
      if (err.name === 'AbortError') {
        return;
      }

      const error = err instanceof Error ? err : new Error(String(err));
      
      // Mettre à jour l'état d'erreur
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));

      // Callback d'erreur
      if (onError) {
        onError(error);
      }

      throw error;

    } finally {
      cleanupRequest(requestId);
    }
  }, [
    getCachedData,
    setCachedData,
    retryWithBackoff,
    cleanupRequest,
    mergedConfig.timeout
  ]);

  // Méthodes spécifiques
  const getQuizzes = useCallback(async (filters = {}, options = {}) => {
    const cacheKey = `quizzes_${JSON.stringify(filters)}`;
    return executeQuery(
      () => DatabaseAPI.getQuizzes(filters),
      { cacheKey, ...options }
    );
  }, [executeQuery]);

  const getQuizById = useCallback(async (id, options = {}) => {
    const cacheKey = `quiz_${id}`;
    return executeQuery(
      () => DatabaseAPI.getQuizById(id),
      { cacheKey, ...options }
    );
  }, [executeQuery]);

  const searchQuizzes = useCallback(async (query, options = {}, searchOptions = {}) => {
    const cacheKey = `search_${query}_${JSON.stringify(searchOptions)}`;
    return executeQuery(
      () => DatabaseAPI.searchQuizzes(query, searchOptions),
      { cacheKey, useCache: false, ...options }
    );
  }, [executeQuery]);

  const createQuiz = useCallback(async (quizData, options = {}) => {
    return executeQuery(
      () => DatabaseAPI.createQuiz(quizData),
      { useCache: false, ...options }
    );
  }, [executeQuery]);

  const createQuestion = useCallback(async (questionData, options = {}) => {
    return executeQuery(
      () => DatabaseAPI.createQuestion(questionData),
      { useCache: false, ...options }
    );
  }, [executeQuery]);

  const createQuizAttempt = useCallback(async (attemptData, options = {}) => {
    return executeQuery(
      () => DatabaseAPI.createQuizAttempt(attemptData),
      { useCache: false, ...options }
    );
  }, [executeQuery]);

  const authenticateUser = useCallback(async (email, password, options = {}) => {
    return executeQuery(
      () => DatabaseAPI.authenticateUser(email, password),
      { useCache: false, ...options }
    );
  }, [executeQuery]);

  const updateUser = useCallback(async (id, updates, options = {}) => {
    return executeQuery(
      () => DatabaseAPI.updateUser(id, updates),
      { useCache: false, ...options }
    );
  }, [executeQuery]);

  const toggleFavorite = useCallback(async (userId, quizId, options = {}) => {
    return executeQuery(
      () => DatabaseAPI.toggleFavorite(userId, quizId),
      { useCache: false, ...options }
    );
  }, [executeQuery]);

  const getAnalytics = useCallback(async (period = 'month', options = {}) => {
    const cacheKey = `analytics_${period}`;
    return executeQuery(
      () => DatabaseAPI.getAnalytics(period),
      { cacheKey, ...options }
    );
  }, [executeQuery]);

  const getUserFavorites = useCallback(async (userId, options = {}) => {
    const cacheKey = `favorites_${userId}`;
    return executeQuery(
      () => DatabaseAPI.getUserFavorites(userId),
      { cacheKey, ...options }
    );
  }, [executeQuery]);

  // Méthodes utilitaires
  const formatDate = useCallback((dateString) => {
    return DatabaseUtils.formatDate(dateString);
  }, []);

  const calculateLevel = useCallback((xp) => {
    return DatabaseUtils.calculateLevel(xp);
  }, []);

  const generateCertificate = useCallback((userId, quizId, score) => {
    return DatabaseUtils.generateCertificate(userId, quizId, score);
  }, []);

  // Gestion de l'état
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const setData = useCallback((data) => {
    setState(prev => ({ ...prev, data }));
  }, []);

  const resetState = useCallback(() => {
    setState({
      loading: false,
      error: null,
      data: null
    });
  }, []);

  // État dérivé
  const hasData = state.data !== null;
  const isLoading = state.loading;
  const hasError = state.error !== null;
  const isIdle = !state.loading && !state.error && !state.data;

  // Nettoyage à la fin du composant
  useEffect(() => {
    return () => {
      cancelAllRequests();
    };
  }, [cancelAllRequests]);

  return {
    // État
    ...state,
    hasData,
    isLoading,
    hasError,
    isIdle,
    pendingRequests: pendingRequests.current.size,

    // Méthodes de requête
    getQuizzes,
    getQuizById,
    searchQuizzes,
    createQuiz,
    createQuestion,
    createQuizAttempt,
    authenticateUser,
    updateUser,
    toggleFavorite,
    getAnalytics,
    getUserFavorites,

    // Méthodes de cache
    clearCache: (key) => {
      if (key) {
        setCache(prev => {
          const newCache = { ...prev };
          delete newCache[key];
          return newCache;
        });
      } else {
        setCache({});
      }
    },
    invalidateCache: (keyPattern) => {
      setCache(prev => {
        const newCache = { ...prev };
        Object.keys(newCache).forEach(key => {
          if (key.match(keyPattern)) {
            delete newCache[key];
          }
        });
        return newCache;
      });
    },

    // Utilitaires
    formatDate,
    calculateLevel,
    generateCertificate,

    // Gestion de l'état
    clearError,
    setData,
    resetState,
    cancelAllRequests,

    // Configuration
    config: mergedConfig
  };
};

// Hook spécialisé pour les quizzes
export const useQuizzes = (initialFilters = {}) => {
  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const {
    loading,
    error,
    data: quizzes,
    getQuizzes,
    clearError
  } = useDatabase();

  const loadQuizzes = useCallback(async (newFilters = {}, reset = false) => {
    const currentPage = reset ? 1 : page;
    const mergedFilters = { ...filters, ...newFilters, page: currentPage, limit: 10 };
    
    const result = await getQuizzes(mergedFilters, { skipLoading: !reset });
    
    if (result) {
      setHasMore(result.length === 10);
      if (!reset) {
        setPage(prev => prev + 1);
      }
    }
    
    return result;
  }, [filters, page, getQuizzes]);

  const refreshQuizzes = useCallback(() => {
    setPage(1);
    setHasMore(true);
    return loadQuizzes({}, true);
  }, [loadQuizzes]);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    return refreshQuizzes();
  }, [refreshQuizzes]);

  return {
    // État
    quizzes,
    loading,
    error,
    filters,
    page,
    hasMore,

    // Actions
    loadMore: () => loadQuizzes({}),
    refreshQuizzes,
    updateFilters,
    setFilters,
    clearError
  };
};

// Hook spécialisé pour l'authentification
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const {
    loading,
    error,
    authenticateUser,
    updateUser,
    clearError
  } = useDatabase();

  const login = useCallback(async (email, password) => {
    const result = await authenticateUser(email, password);
    if (result) {
      setUser(result);
      localStorage.setItem('quiz_user', JSON.stringify(result));
    }
    return result;
  }, [authenticateUser]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('quiz_user');
  }, []);

  const updateProfile = useCallback(async (updates) => {
    if (!user) return null;
    
    const result = await updateUser(user.id, updates);
    if (result) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('quiz_user', JSON.stringify(updatedUser));
    }
    return result;
  }, [user, updateUser]);

  // Restaurer la session au démarrage
  useEffect(() => {
    const savedUser = localStorage.getItem('quiz_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('quiz_user');
      }
    }
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    loading,
    error,
    login,
    logout,
    updateProfile,
    clearError
  };
};

// Hook pour le cache intelligent
export const useQuery = (queryKey, queryFn, options = {}) => {
  const {
    enabled = true,
    staleTime = 5 * 60 * 1000,
    cacheTime = 10 * 60 * 1000,
    refetchOnMount = true
  } = options;

  const {
    data,
    loading,
    error,
    executeQuery,
    getCachedData,
    setCachedData
  } = useDatabase();

  const [localState, setLocalState] = useState({
    data: null,
    isLoading: false,
    error: null,
    isFetching: false
  });

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    setLocalState(prev => ({ ...prev, isFetching: true, isLoading: true }));

    try {
      const result = await executeQuery(queryFn, { cacheKey: queryKey });
      setLocalState(prev => ({
        ...prev,
        data: result,
        isLoading: false,
        isFetching: false,
        error: null
      }));
    } catch (err) {
      setLocalState(prev => ({
        ...prev,
        error: err.message,
        isLoading: false,
        isFetching: false
      }));
    }
  }, [enabled, queryKey, queryFn, executeQuery]);

  // Vérifier le cache au montage
  useEffect(() => {
    if (!enabled) return;

    const cachedData = getCachedData(queryKey);
    if (cachedData) {
      setLocalState(prev => ({ ...prev, data: cachedData }));
    }

    if (refetchOnMount || !cachedData) {
      fetchData();
    }
  }, [enabled, queryKey, refetchOnMount, getCachedData, fetchData]);

  return {
    ...localState,
    refetch: fetchData,
    isSuccess: !localState.isLoading && !localState.error && localState.data !== null,
    isError: !!localState.error
  };
};