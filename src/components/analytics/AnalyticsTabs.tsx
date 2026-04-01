'use client';

import { useState } from 'react';

type TabId = 'events' | 'members' | 'health';

interface AnalyticsTabsProps {
  eventsContent: React.ReactNode;
  membersContent: React.ReactNode;
  healthContent: React.ReactNode;
}

const TABS: { id: TabId; label: string }[] = [
  { id: 'events', label: 'Events' },
  { id: 'members', label: 'Members' },
  { id: 'health', label: 'Health' },
];

export default function AnalyticsTabs({
  eventsContent,
  membersContent,
  healthContent,
}: AnalyticsTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>('events');

  const contentMap: Record<TabId, React.ReactNode> = {
    events: eventsContent,
    members: membersContent,
    health: healthContent,
  };

  return (
    <div className="space-y-6">
      {/* Tab Bar */}
      <div className="flex items-center gap-1 bg-white rounded-2xl p-1.5 shadow-sm border border-gray-100 w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-[#2d3e50] text-white shadow-sm'
                : 'text-[#2d3e50] hover:bg-[#2d3e50]/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>{contentMap[activeTab]}</div>
    </div>
  );
}
