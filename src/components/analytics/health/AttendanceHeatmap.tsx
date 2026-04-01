"use client";

interface EventStatus {
  eventName: string;
  status: string | null;
}

interface Props {
  data: { name: string; events: EventStatus[] }[];
  eventNames: string[];
}

function statusCell(status: string | null): { bg: string; label: string } {
  switch (status) {
    case "ATTENDED": return { bg: "bg-emerald-500 text-white", label: "✓" };
    case "ABSENT": return { bg: "bg-red-400 text-white", label: "✗" };
    case "CONFIRMED": return { bg: "bg-[#d4a537] text-white", label: "C" };
    case "INVITED": return { bg: "bg-blue-200 text-blue-700", label: "I" };
    case "DECLINED": return { bg: "bg-red-200 text-red-600", label: "D" };
    default: return { bg: "bg-gray-100 text-gray-300", label: "—" };
  }
}

export default function AttendanceHeatmap({ data, eventNames }: Props) {
  // Abbreviate event names
  const shortNames = eventNames.map((n) => {
    if (n.includes("Ramadan")) return n.includes("2024") ? "R24" : "R25";
    return n.replace("Meetup ", "M");
  });

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[#2d3e50]">Attendance Heatmap — Top 30 Members</h3>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="w-3 h-3 rounded bg-emerald-500 inline-block" /> Attended
          <span className="w-3 h-3 rounded bg-red-400 inline-block" /> Absent
          <span className="w-3 h-3 rounded bg-[#d4a537] inline-block" /> Confirmed
          <span className="w-3 h-3 rounded bg-gray-100 inline-block border" /> Not invited
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="text-xs">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left text-gray-400 font-medium min-w-[140px]">Member</th>
              {shortNames.map((n, i) => (
                <th key={i} className="px-1 py-1 text-center text-gray-400 font-medium">{n}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.name} className="hover:bg-gray-50">
                <td className="px-2 py-1 text-[#2d3e50] font-medium whitespace-nowrap">{row.name}</td>
                {row.events.map((e, i) => {
                  const { bg, label } = statusCell(e.status);
                  return (
                    <td key={i} className="px-1 py-1 text-center">
                      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-md text-[9px] font-medium ${bg}`}>{label}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
