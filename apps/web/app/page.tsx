"use client";
import React from 'react';
import { Header } from '../components/Header';
import { IndustrySelector } from '../components/IndustrySelector';
import KPICard from '../components/KPICard';
import ProfileCard from '../components/ProfileCard';
import { AccountSetupCard } from '../components/AccountSetupCard';
import WorkflowCard from '../components/WorkflowCard';
import { KibiChatWidget } from '../components/KibiChatWidget';
import { ClockIcon, CurrencyDollarIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import { Pill } from '../components/Pill';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  React.useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [user, loading, router]);
  const [tab, setTab] = React.useState<'my' | 'recommended'>('my');

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  const myWorkflows = [
    { id: 1, title: 'Client Onboarding', rating: 5, category: 'Client Management', description: 'Automate onboarding emails and contract signing', timeSaved: 3.5, credits: 5 },
    { id: 2, title: 'Invoice Follow-up', rating: 4, category: 'Finance', description: 'Send reminders for overdue invoices', timeSaved: 2, credits: 3 }
  ];

  const recommendedWorkflows = [
    { id: 3, title: 'Lead Qualification', rating: 5, category: 'Sales', description: 'Score leads based on engagement metrics', timeSaved: 4, credits: 6 },
    { id: 4, title: 'Expense Tracking', rating: 5, category: 'Finance', description: 'Log expenses and generate reports', timeSaved: 5, credits: 4 },
    { id: 5, title: 'Candidate Screening', rating: 4, category: 'Talent Acquisition', description: 'Screen candidates via questionnaire', timeSaved: 3, credits: 5 },
    { id: 6, title: 'Report Generation', rating: 5, category: 'Admin', description: 'Compile weekly performance reports', timeSaved: 6, credits: 7 }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F4] p-8">
      <Header />
      <div className="max-w-[1376px] mx-auto grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="space-y-8">
          <IndustrySelector />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <KPICard title="Time Saved This Week" icon={<ClockIcon className="w-4 h-4 text-gray-500" />} value="12.5 hours" caption="From 5 workflows" trend={{ direction: 'up', percent: 15 }} />
            <KPICard title="Money Saved This Week" icon={<CurrencyDollarIcon className="w-4 h-4 text-gray-500" />} value="$960" caption="Based on $80/hr rate" trend={{ direction: 'up', percent: 8 }} />
            <KPICard title="Active Workflows" icon={<RocketLaunchIcon className="w-4 h-4 text-gray-500" />} value="5" caption="2 running now" trend={{ direction: 'down', percent: 1 }} />
            <div className="w-[220px] h-[116px]" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-gray-700">Workflows</h2>
              <Pill selected={tab === 'my'} onClick={() => setTab('my')}>My Workflows (2)</Pill>
              <Pill selected={tab === 'recommended'} onClick={() => setTab('recommended')}>Recommended (4)</Pill>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {(tab === 'my' ? myWorkflows : recommendedWorkflows).map((wf) => (
                <WorkflowCard key={wf.id} {...wf} />
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <ProfileCard />
          <AccountSetupCard />
        </div>
      </div>
      <KibiChatWidget />
    </div>
  );
}
