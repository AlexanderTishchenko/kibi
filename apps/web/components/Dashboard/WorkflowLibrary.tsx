import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkflowCard, { WorkflowCardProps } from './WorkflowCard';

// Sample workflow data
const sampleWorkflows: WorkflowCardProps[] = [
  {
    id: "wf1",
    title: "Client Onboarding Automation",
    description: "Automatically send welcome emails, collect info, and set up accounts for new clients.",
    category: "Client Management",
    timeSaved: "3.5 hrs/week",
    creditsRequired: 5,
    popularity: 5,
    isInstalled: true
  },
  {
    id: "wf2",
    title: "Invoice Follow-up Sequence",
    description: "Send automatic reminders for unpaid invoices based on due dates.",
    category: "Finance",
    timeSaved: "2 hrs/week",
    creditsRequired: 3,
    popularity: 4,
    isInstalled: true
  },
  {
    id: "wf3",
    title: "Social Media Content Calendar",
    description: "Schedule and post content across multiple platforms from one dashboard.",
    category: "Marketing",
    timeSaved: "5 hrs/week",
    creditsRequired: 8,
    popularity: 4,
    isInstalled: false
  },
  {
    id: "wf4",
    title: "Customer Feedback Collection",
    description: "Automatically gather and organize customer feedback after service completion.",
    category: "Customer Support",
    timeSaved: "1.5 hrs/week",
    creditsRequired: 4,
    popularity: 3,
    isInstalled: false
  },
  {
    id: "wf5",
    title: "Team Task Assignment",
    description: "Delegate and track tasks based on team capacity and specialties.",
    category: "Team Management",
    timeSaved: "4 hrs/week",
    creditsRequired: 6,
    popularity: 5,
    isInstalled: false
  },
  {
    id: "wf6",
    title: "Lead Qualification Flow",
    description: "Score and route incoming leads based on custom criteria.",
    category: "Sales",
    timeSaved: "3 hrs/week",
    creditsRequired: 7,
    popularity: 4,
    isInstalled: false
  }
];

const WorkflowLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState("installed");
  
  const installedWorkflows = sampleWorkflows.filter(workflow => workflow.isInstalled);
  const recommendedWorkflows = sampleWorkflows.filter(workflow => !workflow.isInstalled);
  
  return (
    <div className="mt-6">
      <Tabs defaultValue="installed" onValueChange={setActiveTab} value={activeTab}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Workflows</h2>
          <TabsList className="bg-secondary">
            <TabsTrigger value="installed" className="data-[state=active]:bg-kb-purple data-[state=active]:text-white">
              My Workflows ({installedWorkflows.length})
            </TabsTrigger>
            <TabsTrigger value="recommended" className="data-[state=active]:bg-kb-purple data-[state=active]:text-white">
              Recommended ({recommendedWorkflows.length})
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="installed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
            {installedWorkflows.map((workflow) => (
              <WorkflowCard key={workflow.id} {...workflow} />
            ))}
          </div>
          {installedWorkflows.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">You haven't installed any workflows yet.</p>
              <button 
                className="mt-3 text-kb-purple font-medium"
                onClick={() => setActiveTab("recommended")}
              >
                Browse recommended workflows
              </button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="recommended">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
            {recommendedWorkflows.map((workflow) => (
              <WorkflowCard key={workflow.id} {...workflow} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkflowLibrary;
