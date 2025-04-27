
import React from 'react';
import { Button } from "@/components/ui/button";
import { Bell, Settings, Search } from "lucide-react";
import CreditsBadge from './CreditsBadge';
import HourglassIcon from '../ui/HourglassIcon';

interface DashboardHeaderProps {
  username: string;
  credits: number;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ username, credits }) => {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between pb-6 border-b mb-8">
      <div className="flex items-center gap-3 mb-4 md:mb-0">
        <div className="bg-gradient-to-r from-kb-purple to-kb-teal p-2 rounded-xl">
          <HourglassIcon size={32} fillPercentage={75} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back, <span className="kb-gradient-text">{username}</span>
          </h1>
          <p className="text-muted-foreground">Let's automate your business today</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative mr-2 hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input 
            type="text" 
            placeholder="Search workflows..." 
            className="bg-secondary pl-10 pr-4 py-2 rounded-full text-sm w-[200px] focus:outline-none focus:ring-2 focus:ring-kb-purple"
          />
        </div>
        
        <CreditsBadge credits={credits} />
        
        <Button variant="outline" size="icon" className="rounded-full">
          <Bell className="h-5 w-5 text-muted-foreground" />
        </Button>
        
        <Button variant="outline" size="icon" className="rounded-full">
          <Settings className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
