import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-accent-500 rounded-full animate-spin" style={{ animationDelay: '-0.5s' }}></div>
        <div className="mt-4 text-center">
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 