import React from 'react';

interface ProgressBarProps {
  percent: number;
  labelLeft?: string;
  labelRight?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ percent, labelLeft, labelRight }) => (
  <div className="w-full">
    <div className="flex justify-between mb-1 text-sm text-gray-500">
      {labelLeft && <span>{labelLeft}</span>}
      {labelRight && <span>{labelRight}</span>}
    </div>
    <div className="w-full h-1.5 bg-gray-200 rounded">
      <div
        className="h-full bg-primary-blue rounded"
        style={{ width: `${percent}%` }}
      />
    </div>
  </div>
);
