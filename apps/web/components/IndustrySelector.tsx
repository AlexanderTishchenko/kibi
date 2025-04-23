import React from 'react';
import { Pill } from './Pill';
import { HomeIcon, BuildingOfficeIcon, UsersIcon, Cog6ToothIcon, BanknotesIcon } from '@heroicons/react/24/outline';

const industries = [
  { name: 'All Industries', icon: HomeIcon },
  { name: 'Real Estate', icon: BuildingOfficeIcon },
  { name: 'Talent Acquisition', icon: UsersIcon },
  { name: 'Admin', icon: Cog6ToothIcon },
  { name: 'Finance', icon: BanknotesIcon },
  { name: 'Sales', icon: UsersIcon },
];

export const IndustrySelector: React.FC = () => {
  const [selected, setSelected] = React.useState('All Industries');
  return (
    <div>
      <p className="text-xl font-semibold text-gray-700">Browse by Industry</p>
      <p className="text-sm text-gray-500 mt-1">Find workflows specifically designed for your business</p>
      <div className="flex space-x-3 overflow-x-auto mt-2 pb-2">
        {industries.map((ind) => (
          <Pill
            key={ind.name}
            icon={<ind.icon className={`w-4 h-4 ${selected === ind.name ? 'text-white' : 'text-gray-500'}`} />}
            selected={selected === ind.name}
            onClick={() => setSelected(ind.name)}
          >
            {ind.name}
          </Pill>
        ))}
      </div>
    </div>
  );
};
