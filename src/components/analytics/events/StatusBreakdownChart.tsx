'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface StatusBreakdownDataPoint {
  name: string;
  attended: number;
  absent: number;
  confirmed: number;
  declined: number;
  invitedOnly: number;
}

interface StatusBreakdownChartProps {
  data: StatusBreakdownDataPoint[];
}

const BARS = [
  { key: 'attended', color: '#10b981', label: 'Attended' },
  { key: 'confirmed', color: '#3b82f6', label: 'Confirmed' },
  { key: 'absent', color: '#f59e0b', label: 'Absent' },
  { key: 'declined', color: '#ef4444', label: 'Declined' },
  { key: 'invitedOnly', color: '#e5e7eb', label: 'Invited Only' },
] as const;

export default function StatusBreakdownChart({ data }: StatusBreakdownChartProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3
        className="text-lg font-semibold text-[#2d3e50] mb-6"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        Status Breakdown by Event
      </h3>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
            width={32}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              fontSize: 12,
            }}
            labelStyle={{ color: '#2d3e50', fontWeight: 600, marginBottom: 4 }}
            cursor={{ fill: '#f9fafb' }}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 16 }}
            iconType="circle"
            iconSize={8}
          />
          {BARS.map((bar) => (
            <Bar
              key={bar.key}
              dataKey={bar.key}
              name={bar.label}
              stackId="status"
              fill={bar.color}
              radius={bar.key === 'attended' ? [0, 0, 0, 0] : undefined}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
