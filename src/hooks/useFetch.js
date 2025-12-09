import { useState, useEffect, useCallback, useRef } from 'react';

// Types pour TypeScript (optionnel)
/*
type UseFetchOptions = {
  manual?: boolean;
  cache?: boolean | 'force-cache' | 'no-cache';
  cacheTime?: number;
  retry?: boolean | number;
  retryDelay?: number | ((attempt: number) => number);
  timeout?: number;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  onFinally?: () => void;
  headers?: Record<string, string>;
  credentials?: 'include' | 'omit' | 'same-origin';
  mode?: 'cors' | 'no-cors' | 'same-origin';
  redirect?: 'follow' | 'error' | 'manual';
};

type UseFetchResult<T> = {
  data: T | null;
  error: Error | null;
  loading: boolean;
  status: number | null;
  refetch: (params?: any) => Promise<void>;
  abort: () => void;
  updateData: (updater: (currentData: T | null) => T) => void;
  clearData: () => void;
  clearError: () => void;
  reset: () => void;
  isSuccess: boolean;
  isError: boolean;
  isIdle: boolean;
  isAborted: boolean;
};
*/

// Cache global pour toutes les instances
const globalCache = new Map();
const CACHE_TIMEOUT = 5 * 60 * 1000; // 5 minutes par défaut

// Fonction utilitaire pour générer une clé de cache
const generateCacheKey = (url, params) => {
  const sortedParams = params ? Object.keys(params)
    .sort()
    .reduce((acc, key) => {
      acc[key] = params[key];
      return acc;
    }, {}) : {};
  return `${url}_${JSON.stringify(sortedParams)}`;
};

// Fonction de retry avec backoff exponentiel
const retryWithBackoff = async (fn, retries, retryDelay) => {
  let lastError;
  
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (attempt === retries) break;
      
      const delay = typeof retryDelay === 'function' 
        ? retryDelay(attempt)
        : (retryDelay || 1000) * Math.pow(2, attempt);
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
};

// Hook useFetch principal
export const useFetch = (url, options = {}) => {
  const {
    manual = false,
    cache = true,
    cacheTime = CACHE_TIMEOUT,
    retry = false,
    retryDelay = 1000,
    timeout = 30000,
    onSuccess,
    onError,
    onFinally,
    headers = {},
    credentials = 'same-origin',
    mode = 'cors',
    redirect = 'follow',
    initialData = null,
    params = {},
    body = null,
    method = 'GET',
    ...fetchOptions
  } = options;

  const [state, setState] = useState({
    data: initialData,
    error: null,
    loading: !manual,
    status: null,
    isAborted: false
  });

  const abortControllerRef = useRef(null);
  const isMountedRef = useRef(true);
  const fetchIdRef = useRef(0);

  // Fonction pour nettoyer le cache expiré
  const cleanupExpiredCache = useCallback(() => {
    const now = Date.now();
    for (const [key, cached] of globalCache.entries()) {
      if (now - cached.timestamp > cacheTime) {
        globalCache.delete(key);
      }
    }
  }, [cacheTime]);

  // Fonction pour obtenir des données du cache
  const getCachedData = useCallback((cacheKey) => {
    cleanupExpiredCache();
    
    const cached = globalCache.get(cacheKey);
    if (!cached) return null;
    
    // Vérifier si le cache est expiré
    if (Date.now() - cached.timestamp > cacheTime) {
      globalCache.delete(cacheKey);
      return null;
    }
    
    return cached.data;
  }, [cacheTime, cleanupExpiredCache]);

  // Fonction pour mettre en cache les données
  const setCachedData = useCallback((cacheKey, data) => {
    globalCache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
  }, []);

  // Fonction pour construire l'URL avec les params
  const buildUrl = useCallback((baseUrl, queryParams) => {
    if (!queryParams || Object.keys(queryParams).length === 0) {
      return baseUrl;
    }
    
    const urlObj = new URL(baseUrl, window.location.origin);
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        urlObj.searchParams.append(key, String(value));
      }
    });
    
    return urlObj.toString();
  }, []);

  // Fonction pour effectuer la requête
  const fetchData = useCallback(async (fetchParams = {}, fetchBody = null) => {
    // Annuler la requête précédente si elle existe
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Créer un nouvel abort controller
    abortControllerRef.current = new AbortController();
    const currentFetchId = ++fetchIdRef.current;

    // Vérifier si le composant est toujours monté
    if (!isMountedRef.current) return;

    const mergedParams = { ...params, ...fetchParams };
    const mergedBody = fetchBody !== null ? fetchBody : body;
    const finalUrl = buildUrl(url, mergedParams);
    const cacheKey = generateCacheKey(url, mergedParams);

    // Vérifier le cache si activé et méthode GET
    if (cache && method === 'GET' && cache !== 'force-cache') {
      const cachedData = getCachedData(cacheKey);
      if (cachedData !== null) {
        setState(prev => ({
          ...prev,
          data: cachedData,
          loading: false,
          error: null,
          isAborted: false
        }));
        
        if (onSuccess) {
          onSuccess(cachedData);
        }
        
        if (onFinally) {
          onFinally();
        }
        
        return cachedData;
      }
    }

    // Mettre à jour l'état de chargement
    if (currentFetchId === fetchIdRef.current) {
      setState(prev => ({
        ...prev,
        loading: true,
        error: null,
        isAborted: false
      }));
    }

    try {
      // Préparer les options de fetch
      const fetchConfig = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        credentials,
        mode,
        redirect,
        signal: abortControllerRef.current.signal,
        ...fetchOptions
      };

      // Ajouter le body si nécessaire
      if (mergedBody && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        fetchConfig.body = JSON.stringify(mergedBody);
      }

      // Fonction de fetch avec timeout
      const fetchWithTimeout = () => {
        return new Promise((resolve, reject) => {
          const timeoutId = setTimeout(() => {
            reject(new Error(`Request timeout after ${timeout}ms`));
          }, timeout);

          fetch(finalUrl, fetchConfig)
            .then(response => {
              clearTimeout(timeoutId);
              
              // Vérifier le status HTTP
              if (!response.ok) {
                const error = new Error(`HTTP error! status: ${response.status}`);
                error.status = response.status;
                throw error;
              }
              
              // Extraire les données en fonction du content-type
              const contentType = response.headers.get('content-type');
              if (contentType && contentType.includes('application/json')) {
                return response.json().then(data => ({ data, response }));
              } else {
                return response.text().then(data => ({ data, response }));
              }
            })
            .then(resolve)
            .catch(reject);
        });
      };

      // Exécuter la requête avec retry si configuré
      let result;
      if (retry !== false) {
        const retryCount = retry === true ? 3 : retry;
        result = await retryWithBackoff(fetchWithTimeout, retryCount, retryDelay);
      } else {
        result = await fetchWithTimeout();
      }

      const { data, response } = result;

      // Vérifier si le fetchId est toujours valide
      if (currentFetchId !== fetchIdRef.current) {
        return null;
      }

      // Mettre en cache si nécessaire
      if (cache && method === 'GET') {
        setCachedData(cacheKey, data);
      }

      // Mettre à jour l'état
      if (isMountedRef.current) {
        setState(prev => ({
          ...prev,
          data,
          loading: false,
          error: null,
          status: response.status,
          isAborted: false
        }));
      }

      // Appeler le callback de succès
      if (onSuccess) {
        onSuccess(data);
      }

      return data;

    } catch (error) {
      // Vérifier si le fetchId est toujours valide
      if (currentFetchId !== fetchIdRef.current) {
        return null;
      }

      // Vérifier si l'erreur est due à une annulation
      const isAborted = error.name === 'AbortError';
      
      if (isMountedRef.current && !isAborted) {
        setState(prev => ({
          ...prev,
          loading: false,
          error,
          status: error.status || null,
          isAborted
        }));
      }

      // Appeler le callback d'erreur (sauf pour les annulations)
      if (!isAborted && onError) {
        onError(error);
      }

      if (!isAborted) {
        throw error;
      }
    } finally {
      // Vérifier si c'est le fetch actuel
      if (currentFetchId === fetchIdRef.current) {
        // Appeler le callback finally
        if (onFinally) {
          onFinally();
        }
      }
    }
  }, [
    url,
    params,
    body,
    method,
    cache,
    cacheTime,
    retry,
    retryDelay,
    timeout,
    onSuccess,
    onError,
    onFinally,
    headers,
    credentials,
    mode,
    redirect,
    fetchOptions,
    buildUrl,
    getCachedData,
    setCachedData
  ]);

  // Fonction pour réexécuter la requête
  const refetch = useCallback(async (newParams, newBody) => {
    return fetchData(newParams, newBody);
  }, [fetchData]);

  // Fonction pour annuler la requête en cours
  const abort = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setState(prev => ({ ...prev, isAborted: true }));
    }
  }, []);

  // Fonction pour mettre à jour les données localement
  const updateData = useCallback((updater) => {
    setState(prev => ({
      ...prev,
      data: updater(prev.data)
    }));
  }, []);

  // Fonction pour effacer les données
  const clearData = useCallback(() => {
    setState(prev => ({ ...prev, data: initialData }));
  }, [initialData]);

  // Fonction pour effacer les erreurs
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Fonction pour réinitialiser l'état
  const reset = useCallback(() => {
    setState({
      data: initialData,
      error: null,
      loading: false,
      status: null,
      isAborted: false
    });
  }, [initialData]);

  // Fonction pour invalider le cache
  const invalidateCache = useCallback((pattern) => {
    if (pattern) {
      for (const [key] of globalCache.entries()) {
        if (key.includes(pattern)) {
          globalCache.delete(key);
        }
      }
    } else {
      globalCache.clear();
    }
  }, []);

  // Effet pour le fetch automatique
  useEffect(() => {
    isMountedRef.current = true;

    if (!manual) {
      fetchData();
    }

    return () => {
      isMountedRef.current = false;
      
      // Annuler la requête en cours lors du démontage
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [manual, fetchData]);

  // État dérivé
  const isSuccess = !state.loading && !state.error && state.data !== null;
  const isError = !!state.error && !state.isAborted;
  const isIdle = !state.loading && !state.error && state.data === null;

  return {
    // État
    data: state.data,
    error: state.error,
    loading: state.loading,
    status: state.status,
    
    // Actions
    refetch,
    abort,
    updateData,
    clearData,
    clearError,
    reset,
    invalidateCache,
    
    // État dérivé
    isSuccess,
    isError,
    isIdle,
    isAborted: state.isAborted,
    
    // Références utiles
    abortController: abortControllerRef.current
  };
};

// Hook spécialisé pour les requêtes POST
export const usePost = (url, options = {}) => {
  return useFetch(url, { ...options, method: 'POST' });
};

// Hook spécialisé pour les requêtes PUT
export const usePut = (url, options = {}) => {
  return useFetch(url, { ...options, method: 'PUT' });
};

// Hook spécialisé pour les requêtes PATCH
export const usePatch = (url, options = {}) => {
  return useFetch(url, { ...options, method: 'PATCH' });
};

// Hook spécialisé pour les requêtes DELETE
export const useDelete = (url, options = {}) => {
  return useFetch(url, { ...options, method: 'DELETE' });
};

// Hook pour les requêtes avec polling
export const usePolling = (url, interval = 5000, options = {}) => {
  const intervalRef = useRef(null);
  const {
    data,
    error,
    loading,
    refetch,
    abort,
    ...fetchResult
  } = useFetch(url, { ...options, manual: true });

  // Démarrer le polling
  const startPolling = useCallback(() => {
    if (intervalRef.current) return;
    
    // Première requête immédiate
    refetch();
    
    // Puis à intervalle régulier
    intervalRef.current = setInterval(() => {
      refetch();
    }, interval);
  }, [interval, refetch]);

  // Arrêter le polling
  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Nettoyage
  useEffect(() => {
    return () => {
      stopPolling();
      abort();
    };
  }, [stopPolling, abort]);

  return {
    data,
    error,
    loading,
    refetch,
    abort,
    startPolling,
    stopPolling,
    isPolling: !!intervalRef.current,
    ...fetchResult
  };
};

// Hook pour les requêtes avec infinite scroll
export const useInfiniteFetch = (url, options = {}) => {
  const {
    pageSize = 20,
    initialPage = 1,
    ...fetchOptions
  } = options;

  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);
  const [allData, setAllData] = useState([]);
  
  const {
    data,
    error,
    loading,
    refetch,
    ...fetchResult
  } = useFetch(
    url,
    {
      ...fetchOptions,
      params: { ...fetchOptions.params, page, limit: pageSize },
      manual: true
    }
  );

  // Charger la première page
  useEffect(() => {
    loadMore();
  }, []);

  // Mettre à jour les données accumulées quand de nouvelles données arrivent
  useEffect(() => {
    if (data) {
      setAllData(prev => [...prev, ...(Array.isArray(data) ? data : [data])]);
      setHasMore(data.length === pageSize);
    }
  }, [data, pageSize]);

  // Charger plus de données
  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return;
    
    const result = await refetch({ page, limit: pageSize });
    if (result) {
      setPage(prev => prev + 1);
    }
  }, [hasMore, loading, page, pageSize, refetch]);

  // Réinitialiser
  const reset = useCallback(() => {
    setPage(initialPage);
    setHasMore(true);
    setAllData([]);
    fetchResult.reset();
  }, [initialPage, fetchResult]);

  return {
    data: allData,
    error,
    loading,
    hasMore,
    page,
    loadMore,
    reset,
    refresh: () => {
      reset();
      loadMore();
    },
    ...fetchResult
  };
};

// Hook pour les requêtes avec dépendances
export const useDependentFetch = (url, dependencies = [], options = {}) => {
  const [shouldFetch, setShouldFetch] = useState(true);
  
  const fetchResult = useFetch(url, {
    ...options,
    manual: true
  });

  // Réexécuter quand les dépendances changent
  useEffect(() => {
    if (shouldFetch) {
      fetchResult.refetch();
    }
  }, dependencies);

  return {
    ...fetchResult,
    setShouldFetch
  };
};

// Hook pour le préchargement
export const usePreload = (urls, options = {}) => {
  const [preloaded, setPreloaded] = useState(new Map());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const preload = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const promises = urls.map(url => 
        fetch(url, options).then(res => res.json())
      );
      
      const results = await Promise.all(promises);
      
      const newPreloaded = new Map();
      urls.forEach((url, index) => {
        newPreloaded.set(url, results[index]);
      });
      
      setPreloaded(newPreloaded);
      return results;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [urls, options]);

  const getPreloadedData = useCallback((url) => {
    return preloaded.get(url);
  }, [preloaded]);

  return {
    preloaded,
    loading,
    error,
    preload,
    getPreloadedData,
    clearPreloaded: () => setPreloaded(new Map())
  };
};

// Exporter le cache global pour un contrôle manuel
export const fetchCache = {
  get: (key) => {
    const cached = globalCache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_TIMEOUT) {
      return cached.data;
    }
    return null;
  },
  set: (key, data) => {
    globalCache.set(key, {
      data,
      timestamp: Date.now()
    });
  },
  delete: (key) => globalCache.delete(key),
  clear: () => globalCache.clear(),
  keys: () => Array.from(globalCache.keys())
};