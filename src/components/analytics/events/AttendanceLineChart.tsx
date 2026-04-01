'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface AttendanceDataPoint {
  name: string;
  invited: number;
  confirmed: number;
  attended: number;
  absent: number;
}

interface AttendanceLineChartProps {
  data: AttendanceDataPoint[];
}

const LINES = [
  { key: 'invited', color: '#2d3e50', label: 'Invited', strokeWidth: 1.5 },
  { key: 'confirmed', color: '#3b82f6', label: 'Confirmed', strokeWidth: 1.5 },
  { key: 'attended', color: '#10b981', label: 'Attended', strokeWidth: 2.5 },
  { key: 'absent', color: '#f59e0b', label: 'Absent', strokeWidth: 1.5 },
] as const;

export default function AttendanceLineChart({ data }: AttendanceLineChartProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3
        className="text-lg font-semibold text-[#2d3e50] mb-6"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        Attendance Over Time
      </h3>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
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
          />
          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 16 }}
            iconType="circle"
            iconSize={8}
          />
          {LINES.map((line) => (
            <Line
              key={line.key}
              type="monotone"
              dataKey={line.key}
              name={line.label}
              stroke={line.color}
              strokeWidth={line.strokeWidth}
              dot={{ r: 3, fill: line.color, strokeWidth: 0 }}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
