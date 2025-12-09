import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'indigo', 
  variant = 'spinner', // 'spinner', 'dots', 'pulse', 'ring'
  label = '',
  labelPosition = 'right', // 'right', 'left', 'top', 'bottom'
  fullScreen = false,
  className = '',
  overlay = false,
  overlayOpacity = '50', // 0-100
  center = true
}) => {
  // Tailles
  const sizeClasses = {
    sm: { spinner: 'h-4 w-4', dots: 'h-1 w-1', ring: 'h-4 w-4', text: 'text-sm' },
    md: { spinner: 'h-8 w-8', dots: 'h-2 w-2', ring: 'h-8 w-8', text: 'text-base' },
    lg: { spinner: 'h-12 w-12', dots: 'h-3 w-3', ring: 'h-12 w-12', text: 'text-lg' },
    xl: { spinner: 'h-16 w-16', dots: 'h-4 w-4', ring: 'h-16 w-16', text: 'text-xl' }
  };

  // Couleurs
  const colorClasses = {
    indigo: 'text-indigo-600 fill-indigo-600',
    blue: 'text-blue-600 fill-blue-600',
    green: 'text-green-600 fill-green-600',
    red: 'text-red-600 fill-red-600',
    yellow: 'text-yellow-600 fill-yellow-600',
    purple: 'text-purple-600 fill-purple-600',
    pink: 'text-pink-600 fill-pink-600',
    white: 'text-white fill-white',
    gray: 'text-gray-600 fill-gray-600',
    black: 'text-gray-900 fill-gray-900'
  };

  // Variantes de spinner
  const renderSpinner = () => {
    const currentSize = sizeClasses[size][variant];
    
    switch (variant) {
      case 'dots':
        return (
          <div className="flex items-center justify-center space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`${currentSize} ${colorClasses[color]} rounded-full animate-bounce`}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        );

      case 'pulse':
        return (
          <div className="relative">
            <div className={`${sizeClasses[size].ring} ${colorClasses[color]}`}>
              <div className="absolute inset-0 animate-ping rounded-full bg-current opacity-75" />
              <div className="relative rounded-full bg-current" />
            </div>
          </div>
        );

      case 'ring':
        return (
          <div className="relative">
            <div className={`${currentSize} rounded-full border-4 border-solid border-current border-r-transparent animate-spin`} />
            <div className={`${currentSize} absolute inset-0 rounded-full border-4 border-solid border-current opacity-25`} />
          </div>
        );

      case 'spinner':
      default:
        return (
          <div className="relative">
            <div className={`${currentSize} animate-spin rounded-full border-2 border-solid border-current border-r-transparent`} />
            <div className={`${currentSize} absolute inset-0 rounded-full border-2 border-solid border-current opacity-25`} />
          </div>
        );
    }
  };

  // Layout du label
  const renderWithLabel = () => {
    const flexDirection = {
      right: 'flex-row items-center',
      left: 'flex-row-reverse items-center',
      top: 'flex-col-reverse items-center',
      bottom: 'flex-col items-center'
    };

    const spacing = {
      right: 'space-x-3',
      left: 'space-x-reverse space-x-3',
      top: 'space-y-reverse space-y-2',
      bottom: 'space-y-2'
    };

    return (
      <div className={`flex ${flexDirection[labelPosition]} ${spacing[labelPosition]}`}>
        {renderSpinner()}
        {label && (
          <span className={`${sizeClasses[size].text} font-medium text-gray-700 animate-pulse`}>
            {label}
          </span>
        )}
      </div>
    );
  };

  // Overlay
  if (overlay) {
    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-${overlayOpacity}`}>
        <div className={`${center ? 'flex items-center justify-center' : ''} ${className}`}>
          {label ? renderWithLabel() : renderSpinner()}
        </div>
      </div>
    );
  }

  // Full screen
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          {renderSpinner()}
          {label && (
            <p className="mt-4 text-lg font-medium text-gray-700 animate-pulse">
              {label}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Version normale
  return (
    <div className={`${center ? 'flex items-center justify-center' : ''} ${className}`}>
      {label ? renderWithLabel() : renderSpinner()}
    </div>
  );
};

// Spinner rapide avec Lucide React (alternative)
export const QuickSpinner = ({ 
  size = 24, 
  color = 'currentColor', 
  speed = 'normal',
  className = '' 
}) => {
  const speedClasses = {
    slow: 'animate-spin-slow',
    normal: 'animate-spin',
    fast: 'animate-spin-fast'
  };

  return (
    <Loader2 
      size={size} 
      className={`${speedClasses[speed]} ${className}`}
      style={{ color }}
    />
  );
};

// Skeleton loader
export const SkeletonLoader = ({ 
  type = 'text', // 'text', 'card', 'circle', 'image'
  count = 1,
  className = '',
  width = '100%',
  height = 'auto'
}) => {
  const skeletons = Array(count).fill(null);

  const renderSkeleton = (index) => {
    switch (type) {
      case 'card':
        return (
          <div 
            key={index}
            className="rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer"
            style={{ width, height: height || '200px' }}
          />
        );

      case 'circle':
        return (
          <div 
            key={index}
            className="rounded-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer"
            style={{ width, height: width }}
          />
        );

      case 'image':
        return (
          <div 
            key={index}
            className="aspect-video rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer"
            style={{ width }}
          />
        );

      case 'text':
      default:
        return (
          <div 
            key={index}
            className="h-4 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer"
            style={{ width, height }}
          />
        );
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {skeletons.map((_, index) => renderSkeleton(index))}
    </div>
  );
};

// Page loader avec progress
export const PageLoader = ({ progress = 0, message = 'Chargement...' }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm">
      <div className="w-64 space-y-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>{message}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-gray-200">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <LoadingSpinner size="md" color="indigo" center />
      </div>
    </div>
  );
};

export default LoadingSpinner;