import React, { useState, useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home, ExternalLink, Copy } from 'lucide-react';

const ErrorBoundary = ({ 
  children, 
  title = "Oups ! Quelque chose s'est mal passé",
  message = "Une erreur est survenue. Veuillez réessayer ou contacter le support si le problème persiste.",
  retryText = "Réessayer",
  homeText = "Retour à l'accueil",
  showHomeButton = true,
  onRetry,
  onError,
  className = "",
  fallback: FallbackComponent
}) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const handleError = (errorEvent) => {
      setHasError(true);
      setError(errorEvent.error);
      
      if (onError) {
        onError(errorEvent.error);
      }
    };

    window.addEventListener('error', handleError);
    
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, [onError]);

  const handleRetry = () => {
    setHasError(false);
    setError(null);
    setErrorInfo(null);
    
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  const copyErrorDetails = async () => {
    const errorText = `${error?.toString()}\n\n${errorInfo?.componentStack}`;
    try {
      await navigator.clipboard.writeText(errorText);
      alert('Détails copiés dans le presse-papier');
    } catch {
      alert('Impossible de copier les détails');
    }
  };

  // Si un composant de fallback personnalisé est fourni
  if (hasError && FallbackComponent) {
    return <FallbackComponent error={error} resetError={() => setHasError(false)} />;
  }

  if (hasError) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 ${className}`}>
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          {/* Contenu similaire à la version class */}
          <div className="text-center">
            <div className="relative inline-block mb-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
                <AlertTriangle className="h-10 w-10 text-red-600" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
            <p className="text-gray-600 mb-8">{message}</p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleRetry}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2"
              >
                <RefreshCw className="h-5 w-5" />
                {retryText}
              </button>
              
              {showHomeButton && (
                <button
                  onClick={() => (window.location.href = '/')}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
                >
                  <Home className="h-5 w-5" />
                  {homeText}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default ErrorBoundary;