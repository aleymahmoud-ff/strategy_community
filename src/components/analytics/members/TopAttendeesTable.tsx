'use client';

import { membershipColors, formatMembership } from '@/lib/constants';

interface TopAttendee {
  name: string;
  company: string;
  membership: string | null;
  eventsAttended: number;
  rate: number;
}

interface TopAttendeesTableProps {
  data: TopAttendee[];
}

function RateBadge({ rate }: { rate: number }) {
  let colorClass = 'bg-red-100 text-red-700';
  if (rate >= 70) colorClass = 'bg-emerald-100 text-emerald-700';
  else if (rate >= 50) colorClass = 'bg-amber-100 text-amber-700';

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {rate.toFixed(0)}%
    </span>
  );
}

function MembershipBadge({ membership }: { membership: string | null }) {
  if (!membership) return <span className="text-xs text-gray-400">—</span>;
  const colors = membershipColors[membership] ?? { bg: 'bg-gray-100', text: 'text-gray-600' };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
      {formatMembership(membership)}
    </span>
  );
}

export default function TopAttendeesTable({ data }: TopAttendeesTableProps) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-sm font-semibold text-[#2d3e50] mb-4">Top Attendees</h3>
        <p className="text-sm text-gray-400 text-center py-8">No data available.</p>
      </div>
    );
  }

  const totalEvents = Math.max(...data.map((d) => d.eventsAttended + Math.round((d.eventsAttended / d.rate) * (100 - d.rate))), 15);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-sm font-semibold text-[#2d3e50] mb-4">Top Attendees</h3>
      <div className="overflow-x-auto -mx-2">
        <table className="w-full text-sm min-w-[560px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide pb-2 px-2 w-8">#</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide pb-2 px-2">Member</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide pb-2 px-2">Membership</th>
              <th className="text-right text-xs font-medium text-gray-400 uppercase tracking-wide pb-2 px-2">Events</th>
              <th className="text-right text-xs font-medium text-gray-400 uppercase tracking-wide pb-2 px-2">Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((member, index) => {
              const rank = index + 1;
              // Navy gradient: rank 1 is darkest, fades lighter
              const gradientStyle =
                rank === 1
                  ? { background: 'linear-gradient(135deg, #2d3e50 0%, #3d5068 100%)' }
                  : rank === 2
                  ? { background: 'linear-gradient(135deg, #3d5068 0%, #4e6380 100%)' }
                  : rank === 3
                  ? { background: 'linear-gradient(135deg, #4e6380 0%, #607898 100%)' }
                  : { background: 'linear-gradient(135deg, #607898 0%, #7a90ab 100%)' };

              return (
                <tr key={`${member.name}-${index}`} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-2">
                    <span
                      className="inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold flex-shrink-0"
                      style={gradientStyle}
                    >
                      {rank}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <p className="font-semibold text-[#2d3e50] leading-tight">{member.name}</p>
                    {member.company && (
                      <p className="text-xs text-gray-400 mt-0.5 leading-tight">{member.company}</p>
                    )}
                  </td>
                  <td className="py-3 px-2">
                    <MembershipBadge membership={member.membership} />
                  </td>
                  <td className="py-3 px-2 text-right">
                    <span className="text-[#2d3e50] font-medium">{member.eventsAttended}</span>
                    <span className="text-gray-400">/{totalEvents}</span>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <RateBadge rate={member.rate} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
