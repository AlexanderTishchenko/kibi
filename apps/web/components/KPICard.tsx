import React from 'react';

interface KPICardProps {
  title: string;
  icon: React.ReactNode;
  value: React.ReactNode;
  caption: string;
  trend?: { direction: 'up' | 'down'; percent: number };
}

const KPICard: React.FC<KPICardProps> = ({ title, icon, value, caption, trend }) => (
  <div className="bg-white rounded shadow p-5 flex flex-col justify-between" style={{ width: '220px', height: '116px' }}>
    <div className="flex items-center justify-between text-sm text-gray-500">
      <span>{title}</span>
      <span>{icon}</span>
    </div>
    <div className="text-2xl font-semibold text-gray-700">{value}</div>
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-500">{caption}</span>
      {trend && (
        <span className={`flex items-center text-sm ${trend.direction === 'up' ? 'text-accent-green' : 'text-accent-red'}`}>
          {trend.direction === 'up' ? '+' : '-'}{trend.percent}%
        </span>
      )}
    </div>
  </div>
);

export default KPICard;
