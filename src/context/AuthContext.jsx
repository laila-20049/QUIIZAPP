import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as api from '../utils/api';

// Constants
const STORAGE_KEYS = {
  USER: 'quiz_user_data',
  TOKEN: 'quiz_token',
  REFRESH_TOKEN: 'quiz_refresh_token'
};

// Initial state
const initialState = {
  user: null,
  token: null,
  refreshToken: null,
  status: 'idle',
  error: null,
  isLoading: false
};

// Action types
const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  UPDATE_USER: 'UPDATE_USER',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  REFRESH_TOKEN: 'REFRESH_TOKEN'
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };

    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        status: 'authenticated',
        error: null,
        isLoading: false
      };

    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        token: null,
        refreshToken: null,
        status: 'unauthenticated',
        error: action.payload,
        isLoading: false
      };

    case ActionTypes.LOGOUT:
      return {
        ...initialState,
        status: 'unauthenticated'
      };

    case ActionTypes.UPDATE_USER:
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null
      };

    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload };

    case ActionTypes.CLEAR_ERROR:
      return { ...state, error: null };

    case ActionTypes.REFRESH_TOKEN:
      return {
        ...state,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken
      };

    default:
      return state;
  }
};

// Utility functions
const saveToStorage = (user, token, refreshToken) => {
  try {
    if (user) localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    if (token) localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    if (refreshToken) localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  } catch (error) {
    console.error('Error saving to storage:', error);
  }
};

const loadFromStorage = () => {
  try {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    
    return {
      user: user ? JSON.parse(user) : null,
      token,
      refreshToken
    };
  } catch (error) {
    console.error('Error loading from storage:', error);
    return { user: null, token: null, refreshToken: null };
  }
};

const clearStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
};

// Create context
const AuthContext = createContext(undefined);

// Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Provider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth from storage
  useEffect(() => {
    const initializeAuth = async () => {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      
      try {
        const { user, token, refreshToken } = loadFromStorage();
        
        if (user && token) {
          dispatch({
            type: ActionTypes.LOGIN_SUCCESS,
            payload: { user, token, refreshToken }
          });
        } else {
          dispatch({ type: ActionTypes.SET_LOADING, payload: false });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (email, password, rememberMe = false) => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      dispatch({ type: ActionTypes.CLEAR_ERROR });

      const result = await api.login(email, password);
      
      if (result.success) {
        const { user, token, refreshToken } = result.data;
        
        dispatch({
          type: ActionTypes.LOGIN_SUCCESS,
          payload: { user, token, refreshToken }
        });

        if (rememberMe) {
          saveToStorage(user, token, refreshToken);
        }

        return { success: true };
      } else {
        dispatch({
          type: ActionTypes.LOGIN_FAILURE,
          payload: result.error?.message || 'Login failed'
        });
        return { success: false, error: result.error?.message || 'Login failed' };
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message || 'An error occurred';
      dispatch({
        type: ActionTypes.LOGIN_FAILURE,
        payload: errorMessage
      });
      return { success: false, error: errorMessage };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      dispatch({ type: ActionTypes.CLEAR_ERROR });

      const result = await api.register(userData);
      
      if (result.success) {
        const { user, token, refreshToken } = result.data;
        
        dispatch({
          type: ActionTypes.LOGIN_SUCCESS,
          payload: { user, token, refreshToken }
        });

        saveToStorage(user, token, refreshToken);

        return { success: true };
      } else {
        dispatch({ type: ActionTypes.SET_LOADING, payload: false });
        return { success: false, error: result.error?.message || 'Registration failed' };
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message || 'An error occurred';
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await api.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearStorage();
      dispatch({ type: ActionTypes.LOGOUT });
    }
  };

  // Refresh token function
  const refreshToken = async () => {
    try {
      const result = await api.refreshAuthToken();
      
      if (result.success) {
        dispatch({
          type: ActionTypes.REFRESH_TOKEN,
          payload: { token: result.token, refreshToken: result.refreshToken }
        });
        
        saveToStorage(state.user, result.token, result.refreshToken);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Token refresh error:', error);
      return false;
    }
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      // TODO: Implement API call
      dispatch({
        type: ActionTypes.UPDATE_USER,
        payload: profileData
      });
      
      const updatedUser = { ...state.user, ...profileData };
      saveToStorage(updatedUser, state.token, state.refreshToken);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Helper functions
  const hasRole = (role) => {
    return state.user?.role === role;
  };

  const hasPermission = (permission) => {
    return state.user?.permissions?.includes(permission) || false;
  };

  const isProUser = () => {
    return state.user?.isPro || false;
  };

  const clearError = () => {
    dispatch({ type: ActionTypes.CLEAR_ERROR });
  };

  const getAuthHeaders = () => {
    if (state.token) {
      return {
        'Authorization': `Bearer ${state.token}`,
        'Content-Type': 'application/json'
      };
    }
    return {
      'Content-Type': 'application/json'
    };
  };

  const value = {
    // State
    user: state.user,
    token: state.token,
    isAuthenticated: state.status === 'authenticated',
    isLoading: state.isLoading,
    error: state.error,
    status: state.status,
    
    // Actions
    login,
    register,
    logout,
    refreshToken,
    updateProfile,
    clearError,
    
    // Helpers
    hasRole,
    hasPermission,
    isProUser,
    getAuthHeaders
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
