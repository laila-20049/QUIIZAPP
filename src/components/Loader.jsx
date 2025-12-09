import React from 'react';

const Loader = ({ 
  size = 'medium', 
  color = 'blue',
  type = 'spinner',
  text = '',
  fullscreen = false,
  className = ''
}) => {
  // Size configurations
  const sizeConfig = {
    tiny: { container: 'h-4 w-4', border: 'border-2', text: 'text-xs' },
    small: { container: 'h-8 w-8', border: 'border-3', text: 'text-sm' },
    medium: { container: 'h-12 w-12', border: 'border-4', text: 'text-base' },
    large: { container: 'h-16 w-16', border: 'border-4', text: 'text-lg' },
    xlarge: { container: 'h-20 w-20', border: 'border-4', text: 'text-xl' }
  };

  // Color configurations with gradients
  const colorConfig = {
    blue: {
      spinner: 'border-gray-200 border-t-blue-500 border-r-blue-500',
      dots: 'bg-blue-500',
      ring: 'border-blue-200 border-t-blue-600',
      text: 'text-blue-600'
    },
    green: {
      spinner: 'border-gray-200 border-t-green-500 border-r-green-500',
      dots: 'bg-green-500',
      ring: 'border-green-200 border-t-green-600',
      text: 'text-green-600'
    },
    red: {
      spinner: 'border-gray-200 border-t-red-500 border-r-red-500',
      dots: 'bg-red-500',
      ring: 'border-red-200 border-t-red-600',
      text: 'text-red-600'
    },
    purple: {
      spinner: 'border-gray-200 border-t-purple-500 border-r-purple-500',
      dots: 'bg-purple-500',
      ring: 'border-purple-200 border-t-purple-600',
      text: 'text-purple-600'
    },
    indigo: {
      spinner: 'border-gray-200 border-t-indigo-500 border-r-indigo-500',
      dots: 'bg-indigo-500',
      ring: 'border-indigo-200 border-t-indigo-600',
      text: 'text-indigo-600'
    },
    white: {
      spinner: 'border-gray-800/30 border-t-white border-r-white',
      dots: 'bg-white',
      ring: 'border-gray-800/30 border-t-white',
      text: 'text-white'
    },
    gradient: {
      spinner: 'border-gray-200 border-t-transparent border-r-transparent',
      dots: 'bg-gradient-to-r from-blue-500 to-purple-500',
      ring: 'border-transparent',
      text: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'
    }
  };

  // Loader types
  const renderLoader = () => {
    const config = sizeConfig[size];
    const colors = colorConfig[color];

    switch (type) {
      case 'dots':
        return (
          <div className="flex items-center justify-center space-x-1">
            <div 
              className={`${config.container} ${colors.dots} rounded-full animate-bounce`}
              style={{ animationDelay: '0ms' }}
            />
            <div 
              className={`${config.container} ${colors.dots} rounded-full animate-bounce`}
              style={{ animationDelay: '150ms' }}
            />
            <div 
              className={`${config.container} ${colors.dots} rounded-full animate-bounce`}
              style={{ animationDelay: '300ms' }}
            />
          </div>
        );

      case 'ring':
        return (
          <div className={`${config.container} relative`}>
            <div className={`absolute inset-0 ${config.border} ${colors.ring} rounded-full animate-spin`} />
            <div className={`absolute inset-2 ${config.border} ${colors.ring} rounded-full animate-spin reverse`} 
              style={{ animationDuration: '1.5s' }} />
          </div>
        );

      case 'pulse':
        return (
          <div className={`${config.container} relative`}>
            <div className={`absolute inset-0 ${colors.dots} rounded-full animate-ping opacity-75`} />
            <div className={`relative ${config.container} ${colors.dots} rounded-full`} />
          </div>
        );

      case 'progress':
        return (
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-progress"
              style={{ 
                animation: 'progress 1.5s ease-in-out infinite',
                backgroundSize: '200% 100%'
              }}
            />
          </div>
        );

      case 'gradient-spinner':
        return (
          <div className={`${config.container} relative`}>
            <div className="absolute inset-0 border-4 border-transparent rounded-full animate-spin"
              style={{
                background: `conic-gradient(transparent, ${getGradientColors(color)})`,
                mask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), #000 0)'
              }}
            />
          </div>
        );

      case 'spinner':
      default:
        return (
          <div className="relative">
            <div className={`${config.container} ${config.border} ${colors.spinner} rounded-full animate-spin`} />
            {color === 'gradient' && (
              <div className={`absolute inset-0 ${config.container} ${config.border} border-transparent rounded-full animate-spin`}
                style={{
                  background: `conic-gradient(transparent, ${getGradientColors()})`,
                  mask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), #000 0)'
                }}
              />
            )}
          </div>
        );
    }
  };

  const getGradientColors = () => {
    switch (color) {
      case 'blue': return '#3b82f6, #60a5fa, #93c5fd';
      case 'green': return '#10b981, #34d399, #6ee7b7';
      case 'red': return '#ef4444, #f87171, #fca5a5';
      case 'purple': return '#8b5cf6, #a78bfa, #c4b5fd';
      case 'indigo': return '#6366f1, #818cf8, #a5b4fc';
      default: return '#3b82f6, #8b5cf6, #ec4899';
    }
  };

  // Add custom CSS for animations
  const customStyles = `
    @keyframes progress {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    .animate-progress {
      animation: progress 1.5s ease-in-out infinite;
    }
    .animate-bounce {
      animation: bounce 1.4s infinite ease-in-out both;
    }
    @keyframes bounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }
    .reverse {
      animation-direction: reverse;
    }
  `;

  const content = (
    <>
      <style>{customStyles}</style>
      <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
        {renderLoader()}
        {text && (
          <div className={`font-medium ${colorConfig[color].text} ${sizeConfig[size].text} animate-pulse`}>
            {text}
          </div>
        )}
      </div>
    </>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
};

// Prop types for better developer experience
Loader.propTypes = {
  size: (props, propName, componentName) => {
    const validSizes = ['tiny', 'small', 'medium', 'large', 'xlarge'];
    if (!validSizes.includes(props[propName])) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. ` +
        `Expected one of [${validSizes.join(', ')}].`
      );
    }
  },
  color: (props, propName, componentName) => {
    const validColors = ['blue', 'green', 'red', 'purple', 'indigo', 'white', 'gradient'];
    if (!validColors.includes(props[propName])) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. ` +
        `Expected one of [${validColors.join(', ')}].`
      );
    }
  },
  type: (props, propName, componentName) => {
    const validTypes = ['spinner', 'dots', 'ring', 'pulse', 'progress', 'gradient-spinner'];
    if (!validTypes.includes(props[propName])) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. ` +
        `Expected one of [${validTypes.join(', ')}].`
      );
    }
  }
};

export default Loader;