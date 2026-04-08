'use client';

interface SummaryData {
  totalMembers: number;
  totalEvents: number;
  activeMembers: number;
  activePct: number;
  avgAttendanceRate: number;
  newMembers90d: number;
  avgResponseRate: number;
  avgReliabilityRate: number;
}

interface SummaryCardsProps {
  data: SummaryData;
}

interface CardConfig {
  label: string;
  value: string;
  iconBg: string;
  icon: React.ReactNode;
}

export default function SummaryCards({ data }: SummaryCardsProps) {
  const cards: CardConfig[] = [
    {
      label: 'Total Members',
      value: data.totalMembers.toLocaleString(),
      iconBg: 'bg-gradient-to-br from-[#2d3e50] to-[#3d5068]',
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      label: 'Total Events',
      value: data.totalEvents.toLocaleString(),
      iconBg: 'bg-gradient-to-br from-[#d4a537] to-[#c49730]',
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: 'Active Members',
      value: `${data.activeMembers.toLocaleString()} (${data.activePct.toFixed(0)}%)`,
      iconBg: 'bg-gradient-to-br from-[#10b981] to-[#059669]',
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: 'Avg Attendance Rate',
      value: `${data.avgAttendanceRate.toFixed(1)}%`,
      iconBg: 'bg-gradient-to-br from-[#3b82f6] to-[#2563eb]',
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      label: 'Response Rate',
      value: `${data.avgResponseRate.toFixed(1)}%`,
      iconBg: 'bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8]',
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
    },
    {
      label: 'Reliability',
      value: `${data.avgReliabilityRate.toFixed(1)}%`,
      iconBg: 'bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed]',
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      label: 'New Members (90d)',
      value: data.newMembers90d.toLocaleString(),
      iconBg: 'bg-gradient-to-br from-[#f59e0b] to-[#d97706]',
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-[#2d3e50]/5 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#2d3e50]/5 to-transparent rounded-bl-full" />
          <div className="relative">
            <div
              className={`w-14 h-14 rounded-2xl ${card.iconBg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
            >
              {card.icon}
            </div>
            <p className="text-gray-400 text-xs font-medium uppercase tracking-wider leading-tight">
              {card.label}
            </p>
            <p
              className="text-3xl font-bold text-[#2d3e50] mt-1 leading-tight"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {card.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
