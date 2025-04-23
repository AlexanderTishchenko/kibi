import React from 'react';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' }> = ({ variant = 'primary', children, className, ...props }) => (
  <button
    {...props}
    className={`px-4 py-2 rounded ${
      variant === 'primary'
        ? 'bg-primary-blue text-white hover:bg-primary-blue/90'
        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
    } ${className || ''}`}
  >
    {children}
  </button>
);
