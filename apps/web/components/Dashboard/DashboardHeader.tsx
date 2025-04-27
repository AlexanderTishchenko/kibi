//apps/web/components/Dashboard/DashboardHeader.tsx
"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Bell, Settings, Search } from "lucide-react";
import CreditsBadge from './CreditsBadge';
import BuyCreditsModal from '../BuyCreditsModal';
import HourglassIcon from '../ui/HourglassIcon';
import useLogout from '@/hooks/useLogout';

interface DashboardHeaderProps {
  username: string;
  credits: number;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ username, credits }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  // Fetch latest credits from local API (overrides prop)
  const { data: balance = credits } = useQuery<number, Error>({
    queryKey: ['credits'],
    queryFn: async () => {
      const res = await fetch('/api/me/credits');
      if (!res.ok) throw new Error('Failed fetching credits');
      const json = await res.json();
      return json.credits as number;
    },
  });
  const logout = useLogout();
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        
        <BuyCreditsModal trigger={<CreditsBadge credits={balance} />} />
        
        <Button variant="outline" size="icon" className="rounded-full">
          <Bell className="h-5 w-5 text-muted-foreground" />
        </Button>
        
        <div className="relative" ref={wrapperRef}>
          <Button variant="outline" size="icon" className="rounded-full" onClick={() => setMenuOpen(!menuOpen)}>
            <Settings className="h-5 w-5 text-muted-foreground" />
          </Button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
