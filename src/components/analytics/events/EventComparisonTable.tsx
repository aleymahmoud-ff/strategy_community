'use client';

import { useState } from 'react';

interface EventRow {
  name: string;
  date: string;
  invited: number;
  confirmed: number;
  attended: number;
  absent: number;
  declined: number;
  attendanceRate: number;
  responseRate: number;
  reliabilityRate: number;
  actualAttendanceRate: number;
}

interface EventComparisonTableProps {
  data: EventRow[];
}

type SortColumn = keyof EventRow;
type SortDir = 'asc' | 'desc';

function RateBadge({ rate }: { rate: number }) {
  const color =
    rate >= 60
      ? 'bg-emerald-100 text-emerald-700'
      : rate >= 40
      ? 'bg-amber-100 text-amber-700'
      : 'bg-red-100 text-red-700';
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${color}`}>
      {rate.toFixed(1)}%
    </span>
  );
}

function NumBadge({
  value,
  color,
}: {
  value: number;
  color: 'blue' | 'green' | 'amber' | 'red' | 'navy';
}) {
  const colorMap = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-emerald-100 text-emerald-700',
    amber: 'bg-amber-100 text-amber-700',
    red: 'bg-red-100 text-red-700',
    navy: 'bg-[#2d3e50]/10 text-[#2d3e50]',
  };
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${colorMap[color]}`}
    >
      {value}
    </span>
  );
}

interface SortIconProps {
  column: SortColumn;
  sortCol: SortColumn;
  sortDir: SortDir;
}

function SortIcon({ column, sortCol, sortDir }: SortIconProps) {
  if (column !== sortCol) {
    return (
      <svg className="w-3.5 h-3.5 text-gray-300 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    );
  }
  return sortDir === 'asc' ? (
    <svg className="w-3.5 h-3.5 text-[#d4a537] inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
  ) : (
    <svg className="w-3.5 h-3.5 text-[#d4a537] inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

const COLUMNS: { key: SortColumn; label: string }[] = [
  { key: 'name', label: 'Event' },
  { key: 'date', label: 'Date' },
  { key: 'invited', label: 'Invited' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'attended', label: 'Attended' },
  { key: 'absent', label: 'Absent' },
  { key: 'declined', label: 'Declined' },
  { key: 'responseRate', label: 'Response' },
  { key: 'reliabilityRate', label: 'Reliability' },
  { key: 'actualAttendanceRate', label: 'Attendance' },
];

export default function EventComparisonTable({ data }: EventComparisonTableProps) {
  const [sortCol, setSortCol] = useState<SortColumn>('date');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  function handleSort(col: SortColumn) {
    if (col === sortCol) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortCol(col);
      setSortDir('desc');
    }
  }

  const sorted = [...data].sort((a, b) => {
    const valA = a[sortCol];
    const valB = b[sortCol];
    const dir = sortDir === 'asc' ? 1 : -1;

    if (typeof valA === 'number' && typeof valB === 'number') {
      return (valA - valB) * dir;
    }
    return String(valA).localeCompare(String(valB)) * dir;
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100">
        <h3
          className="text-lg font-semibold text-[#2d3e50]"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Event Comparison
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">Click column headers to sort</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer select-none hover:text-[#2d3e50] transition-colors whitespace-nowrap"
                >
                  {col.label}
                  <SortIcon column={col.key} sortCol={sortCol} sortDir={sortDir} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {sorted.length === 0 ? (
              <tr>
                <td
                  colSpan={COLUMNS.length}
                  className="px-4 py-10 text-center text-gray-400 text-sm"
                >
                  No event data available
                </td>
              </tr>
            ) : (
              sorted.map((row) => (
                <tr key={row.name} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-sm font-semibold text-[#2d3e50] whitespace-nowrap">
                      {row.name}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
                    {new Date(row.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <NumBadge value={row.invited} color="navy" />
                  </td>
                  <td className="px-4 py-3">
                    <NumBadge value={row.confirmed} color="blue" />
                  </td>
                  <td className="px-4 py-3">
                    <NumBadge value={row.attended} color="green" />
                  </td>
                  <td className="px-4 py-3">
                    <NumBadge value={row.absent} color="amber" />
                  </td>
                  <td className="px-4 py-3">
                    <NumBadge value={row.declined} color="red" />
                  </td>
                  <td className="px-4 py-3">
                    <RateBadge rate={row.responseRate} />
                  </td>
                  <td className="px-4 py-3">
                    <RateBadge rate={row.reliabilityRate} />
                  </td>
                  <td className="px-4 py-3">
                    <RateBadge rate={row.actualAttendanceRate} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
