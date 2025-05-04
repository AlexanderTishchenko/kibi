//apps/web/components/Dashboard/IndustryFilter.tsx
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Home, Briefcase, Settings, CreditCard, TrendingUp } from 'lucide-react';

interface Industry {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface IndustryFilterProps {
  onIndustryChange: (industry: string) => void;
}

const industries: Industry[] = [
  { id: 'all', name: 'All Industries', icon: Building2 },
  { id: 'real-estate', name: 'Real Estate', icon: Home },
  { id: 'talent-acquisition', name: 'Talent Acquisition', icon: Briefcase },
  { id: 'admin', name: 'Admin', icon: Settings },
  { id: 'finance', name: 'Finance', icon: CreditCard },
  { id: 'sales', name: 'Sales', icon: TrendingUp },
];

const IndustryFilter: React.FC<IndustryFilterProps> = ({ onIndustryChange }) => {
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  const handleIndustryChange = (value: string) => {
    setSelectedIndustry(value);
    onIndustryChange(value);
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col items-start mb-3">
        <h2 className="text-lg font-semibold mb-1">Browse by Industry</h2>
        <p className="text-sm text-muted-foreground">Find workflows specifically designed for your business</p>
      </div>

      <div className="overflow-x-auto pb-2">
        <Tabs value={selectedIndustry} onValueChange={handleIndustryChange} className="w-full">
          <TabsList className="bg-secondary h-auto p-1 flex gap-1">
            {industries.map((industry) => (
              <TabsTrigger 
                key={industry.id}
                value={industry.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-white px-4 py-2"
              >
                <div className="flex items-center gap-2">
                  <industry.icon className="h-4 w-4" />
                  <span>{industry.name}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default IndustryFilter;
