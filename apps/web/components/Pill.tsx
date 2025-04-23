import React from 'react';

interface PillProps {
  icon?: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Pill: React.FC<PillProps> = ({ icon, selected = false, onClick, children, className }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${
      selected
        ? 'bg-primary-blue text-white'
        : 'bg-white text-gray-700 border border-gray-200'
    } ${className || ''}`}
  >
    {icon}
    <span>{children}</span>
  </button>
);
