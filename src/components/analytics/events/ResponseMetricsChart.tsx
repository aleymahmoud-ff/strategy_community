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

interface ResponseMetricsDataPoint {
  name: string;
  responseRate: number;
  reliabilityRate: number;
  actualAttendanceRate: number;
}

interface ResponseMetricsChartProps {
  data: ResponseMetricsDataPoint[];
}

const LINES = [
  { key: 'responseRate', color: '#3b82f6', label: 'Response Rate', strokeWidth: 2 },
  { key: 'reliabilityRate', color: '#8b5cf6', label: 'Reliability', strokeWidth: 2 },
  { key: 'actualAttendanceRate', color: '#10b981', label: 'Attendance Rate', strokeWidth: 2.5 },
] as const;

export default function ResponseMetricsChart({ data }: ResponseMetricsChartProps) {
  return (
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
          width={40}
          domain={[0, 100]}
          tickFormatter={(v) => `${v}%`}
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
          formatter={(value, name) => [`${value}%`, name]}
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
  );
}
