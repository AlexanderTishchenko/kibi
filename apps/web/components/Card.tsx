import React from 'react';

export const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-white rounded shadow p-5">
    {children}
  </div>
);
