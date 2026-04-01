'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from 'recharts';

interface GuestFunnelChartProps {
  data: Record<string, number>;
}

const COLORS: Record<string, string> = {
  MEMBER: '#10b981',
  POTENTIAL_GUEST: '#8b5cf6',
  POTENTIAL_PREMIUM_GUEST: '#d4a537',
  DROPPED_GUEST: '#ef4444',
};

function formatLabel(key: string): string {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

interface TooltipPayloadItem {
  value: number;
  payload: { name: string };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-sm px-3 py-2 text-sm">
      <p className="font-semibold text-[#2d3e50]">{formatLabel(payload[0].payload.name)}</p>
      <p className="text-gray-600">{payload[0].value} members</p>
    </div>
  );
}

export default function GuestFunnelChart({ data }: GuestFunnelChartProps) {
  const chartData = Object.entries(data)
    .filter(([key]) => key !== 'UNKNOWN')
    .map(([key, value]) => ({ name: key, count: value }));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-sm font-semibold text-[#2d3e50] mb-4">
        Guest Status Funnel
      </h3>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 4, right: 24, left: 8, bottom: 4 }}
          barSize={24}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" horizontal={false} />
          <XAxis
            type="number"
            allowDecimals={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={150}
            tick={{ fontSize: 11, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={formatLabel}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
            {chartData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[entry.name] ?? '#9ca3af'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
