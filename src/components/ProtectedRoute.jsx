import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Loader2, 
  Shield, 
  Lock, 
  AlertCircle, 
  Home, 
  LogIn,
  UserCheck,
  XCircle,
  CheckCircle,
  Key
} from 'lucide-react';
import Loader from './Loader'; // Assuming you have the enhanced Loader component

const ProtectedRoute = ({ 
  children, 
  requiredRole, 
  requiredPermission,
  requireAuth = true,
  redirectUnauthenticated = true,
  redirectTo = '/login',
  showRedirectCountdown = true
}) => {
  const { isAuthenticated, user, isLoading, hasRole, hasPermission } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [redirectCountdown, setRedirectCountdown] = useState(5);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    if (accessDenied && showRedirectCountdown && redirectCountdown > 0) {
      const timer = setTimeout(() => {
        setRedirectCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (accessDenied && redirectCountdown === 0) {
      navigate(redirectTo, { 
        state: { from: location.pathname },
        replace: true 
      });
    }
  }, [accessDenied, redirectCountdown, navigate, redirectTo, location, showRedirectCountdown]);

  useEffect(() => {
    // Reset access denied state when route changes
    setAccessDenied(false);
    setRedirectCountdown(5);
  }, [location.pathname]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <Loader 
          size="large" 
          color="blue" 
          type="gradient-spinner" 
          text="Vérification des autorisations..."
        />
        <p className="mt-4 text-gray-600 dark:text-gray-400 animate-pulse">
          Sécurisation de votre session...
        </p>
      </div>
    );
  }

  if (!requireAuth) {
    return children;
  }

  if (!isAuthenticated) {
    if (redirectUnauthenticated) {
      setAccessDenied(true);
      return (
        <AccessDeniedScreen
          title="Accès non autorisé"
          message="Vous devez être connecté pour accéder à cette page."
          icon={<Lock className="h-12 w-12" />}
          countdown={redirectCountdown}
          redirectTo={redirectTo}
          actionText="Se connecter"
          onAction={() => navigate(redirectTo, { state: { from: location.pathname } })}
        />
      );
    }
    return (
      <AccessDeniedScreen
        title="Connexion requise"
        message="Veuillez vous connecter pour accéder à cette page."
        icon={<LogIn className="h-12 w-12" />}
        showAction={false}
      />
    );
  }

  if (requiredRole && !hasRole(requiredRole)) {
    setAccessDenied(true);
    return (
      <AccessDeniedScreen
        title="Rôle insuffisant"
        message={`Cette page nécessite le rôle "${requiredRole}". Vous avez le rôle "${user?.role}".`}
        icon={<UserCheck className="h-12 w-12" />}
        countdown={redirectCountdown}
        redirectTo="/"
        actionText="Retour à l'accueil"
        onAction={() => navigate('/')}
        severity="warning"
      />
    );
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    setAccessDenied(true);
    return (
      <AccessDeniedScreen
        title="Permission insuffisante"
        message="Vous ne disposez pas des autorisations nécessaires pour accéder à cette ressource."
        icon={<Key className="h-12 w-12" />}
        countdown={redirectCountdown}
        redirectTo="/"
        actionText="Retour à l'accueil"
        onAction={() => navigate('/')}
        severity="error"
        showUserInfo
      />
    );
  }

  // User has access - log access attempt
  useEffect(() => {
    if (isAuthenticated && user && !accessDenied) {
      console.log(`Access granted to ${location.pathname} for user ${user.id}`);
      // You could add analytics logging here
    }
  }, [isAuthenticated, user, location.pathname, accessDenied]);

  return (
    <div className="relative">
      {/* Security indicator */}
      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-full border border-green-200 dark:border-green-800">
          <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
          <span className="text-xs font-medium text-green-700 dark:text-green-300">
            Sécurisé
          </span>
        </div>
      </div>
      
      {/* User role badge */}
      {user?.role && (
        <div className="absolute top-4 left-4 z-10">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full border border-blue-200 dark:border-blue-800">
            <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </span>
          </div>
        </div>
      )}
      
      {children}
    </div>
  );
};

// Reusable Access Denied Component
const AccessDeniedScreen = ({ 
  title, 
  message, 
  icon, 
  countdown,
  redirectTo,
  actionText,
  onAction,
  severity = 'error',
  showAction = true,
  showUserInfo = false
}) => {
  const { user } = useAuth();
  
  const severityStyles = {
    error: {
      bg: 'bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/10 dark:to-pink-900/10',
      border: 'border-red-200 dark:border-red-800',
      iconBg: 'bg-gradient-to-br from-red-500 to-pink-500',
      text: 'text-red-800 dark:text-red-300',
      accent: 'text-red-600 dark:text-red-400'
    },
    warning: {
      bg: 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10',
      border: 'border-yellow-200 dark:border-yellow-800',
      iconBg: 'bg-gradient-to-br from-yellow-500 to-orange-500',
      text: 'text-yellow-800 dark:text-yellow-300',
      accent: 'text-yellow-600 dark:text-yellow-400'
    },
    info: {
      bg: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10',
      border: 'border-blue-200 dark:border-blue-800',
      iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-500',
      text: 'text-blue-800 dark:text-blue-300',
      accent: 'text-blue-600 dark:text-blue-400'
    }
  };

  const styles = severityStyles[severity];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className={`max-w-md w-full rounded-2xl shadow-2xl p-8 ${styles.bg} border-2 ${styles.border} backdrop-blur-sm`}>
        {/* Header */}
        <div className="text-center mb-6">
          <div className={`inline-flex p-4 rounded-full ${styles.iconBg} mb-4`}>
            <div className="text-white">
              {icon}
            </div>
          </div>
          <h1 className={`text-2xl font-bold ${styles.text} mb-2`}>
            {title}
          </h1>
          <p className={`${styles.accent}`}>
            {message}
          </p>
        </div>

        {/* User info (if applicable) */}
        {showUserInfo && user && (
          <div className="mb-6 p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                {user.firstName?.[0]}{user.lastName?.[0]}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Rôle : {user.role}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Countdown timer */}
        {countdown !== undefined && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Redirection dans :
              </span>
              <span className={`text-lg font-bold ${styles.accent}`}>
                {countdown}s
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full ${styles.iconBg.replace('bg-gradient-to-br', 'bg-gradient-to-r')} transition-all duration-1000 ease-linear`}
                style={{ width: `${(countdown / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="space-y-3">
          {showAction && onAction && (
            <button
              onClick={onAction}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white ${styles.iconBg.replace('bg-gradient-to-br', 'bg-gradient-to-r')} hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2`}
            >
              {actionText}
            </button>
          )}
          
          <button
            onClick={() => window.history.back()}
            className="w-full py-3 px-4 rounded-lg font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <XCircle className="h-5 w-5" />
            Retour
          </button>

          <button
            onClick={() => window.location.href = '/'}
            className="w-full py-3 px-4 rounded-lg font-medium text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Home className="h-5 w-5" />
            Page d'accueil
          </button>
        </div>

        {/* Security info */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <AlertCircle className="h-4 w-4" />
            <span>Pour toute question concernant les autorisations, contactez l'administrateur.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Higher-order component for route protection
export const withProtectedRoute = (Component, options = {}) => {
  return function WithProtectedRoute(props) {
    return (
      <ProtectedRoute {...options}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
};

// Route permission checker hook
export const useRoutePermission = (requiredRole, requiredPermission) => {
  const { hasRole, hasPermission } = useAuth();
  
  const canAccess = React.useMemo(() => {
    if (requiredRole && !hasRole(requiredRole)) return false;
    if (requiredPermission && !hasPermission(requiredPermission)) return false;
    return true;
  }, [requiredRole, requiredPermission, hasRole, hasPermission]);

  return canAccess;
};

export default ProtectedRoute;