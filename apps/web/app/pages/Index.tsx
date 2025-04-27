"use client"
import React, { useState } from "react";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import MetricsCard from "@/components/Dashboard/MetricsCard";
import WorkflowLibrary from "@/components/Dashboard/WorkflowLibrary";
import UserProfile from "@/components/Dashboard/UserProfile";
import KibiAssistant from "@/components/Dashboard/KibiAssistant";
import IndustryFilter from "@/components/Dashboard/IndustryFilter";

const Index = () => {
  const [showAssistant, setShowAssistant] = useState(true);
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  
  // Sample user data
  const userData = {
    username: "Sarah",
    credits: 125,
    avatar: "https://i.pravatar.cc/300?img=5",
    level: 4,
    progress: 65,
    totalTimeSaved: "42 hours",
    totalMoneySaved: "$3,240"
  };

  const handleIndustryChange = (industry: string) => {
    setSelectedIndustry(industry);
    // In a real application, this would filter the workflows based on industry
    console.log(`Selected industry: ${industry}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6 px-4">
        <DashboardHeader username={userData.username} credits={userData.credits} />
        
        {/* Industry Filter */}
        <IndustryFilter onIndustryChange={handleIndustryChange} />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main content area - 8 columns on large screens */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <MetricsCard 
                title="Time Saved This Week" 
                value="12.5 hours" 
                subtitle="From 5 workflows" 
                trend={15} 
                type="time" 
              />
              <MetricsCard 
                title="Money Saved This Week" 
                value="$960" 
                subtitle="Based on $80/hr rate" 
                trend={8} 
                type="money" 
              />
              <MetricsCard 
                title="Active Workflows" 
                value="5" 
                subtitle="2 running now" 
                trend={-1} 
                type="custom" 
              />
            </div>
            
            <WorkflowLibrary />
          </div>
          
          {/* Sidebar - 4 columns on large screens */}
          <div className="lg:col-span-4">
            <UserProfile 
              name={userData.username}
              avatar={userData.avatar}
              level={userData.level}
              progress={userData.progress}
              totalTimeSaved={userData.totalTimeSaved}
              totalMoneySaved={userData.totalMoneySaved}
              achievements={[]} // Still passing empty array to maintain prop types
            />
          </div>
        </div>
      </div>
      
      {/* Kibi Assistant - Fixed positioned */}
      {showAssistant && <KibiAssistant onClose={() => setShowAssistant(false)} />}
    </div>
  );
};

export default Index;
