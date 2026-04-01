'use client';

interface LeastEngagedMember {
  name: string;
  company: string;
  eventsInvited: number;
  eventsAttended: number;
  lastAttended: string;
}

interface LeastEngagedTableProps {
  data: LeastEngagedMember[];
}

function LastAttendedBadge({ value }: { value: string }) {
  const isNever = !value || value.toLowerCase() === 'never';
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
        isNever
          ? 'bg-red-100 text-red-700'
          : 'bg-gray-100 text-gray-600'
      }`}
    >
      {isNever ? 'Never' : value}
    </span>
  );
}

export default function LeastEngagedTable({ data }: LeastEngagedTableProps) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-sm font-semibold text-[#2d3e50] mb-4">Least Engaged Members</h3>
        <p className="text-sm text-gray-400 text-center py-8">No data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-sm font-semibold text-[#2d3e50] mb-4">Least Engaged Members</h3>
      <div className="overflow-x-auto -mx-2">
        <table className="w-full text-sm min-w-[520px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide pb-2 px-2">Member</th>
              <th className="text-right text-xs font-medium text-gray-400 uppercase tracking-wide pb-2 px-2">Invited</th>
              <th className="text-right text-xs font-medium text-gray-400 uppercase tracking-wide pb-2 px-2">Attended</th>
              <th className="text-right text-xs font-medium text-gray-400 uppercase tracking-wide pb-2 px-2">Last Attended</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((member, index) => (
              <tr key={`${member.name}-${index}`} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-2">
                  <p className="font-medium text-[#2d3e50] leading-tight">{member.name}</p>
                  {member.company && (
                    <p className="text-xs text-gray-400 mt-0.5 leading-tight">{member.company}</p>
                  )}
                </td>
                <td className="py-3 px-2 text-right">
                  <span className="text-gray-600 font-medium">{member.eventsInvited}</span>
                </td>
                <td className="py-3 px-2 text-right">
                  <span
                    className={`font-medium ${
                      member.eventsAttended === 0 ? 'text-red-500' : 'text-gray-600'
                    }`}
                  >
                    {member.eventsAttended}
                  </span>
                </td>
                <td className="py-3 px-2 text-right">
                  <LastAttendedBadge value={member.lastAttended} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
