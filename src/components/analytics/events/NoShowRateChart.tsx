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

interface NoShowRateDataPoint {
  name: string;
  rate: number;
}

interface NoShowRateChartProps {
  data: NoShowRateDataPoint[];
}

function getBarColor(rate: number): string {
  if (rate > 30) return '#ef4444';
  if (rate > 15) return '#d4a537';
  return '#10b981';
}

interface TooltipPayload {
  value: number;
  name: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const rate = payload[0].value;
  const color = getBarColor(rate);
  return (
    <div
      style={{
        backgroundColor: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        padding: '10px 14px',
        fontSize: 12,
      }}
    >
      <p style={{ color: '#2d3e50', fontWeight: 600, marginBottom: 4 }}>{label}</p>
      <p style={{ color }}>
        No-show Rate: <strong>{rate.toFixed(1)}%</strong>
      </p>
    </div>
  );
}

export default function NoShowRateChart({ data }: NoShowRateChartProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3
          className="text-lg font-semibold text-[#2d3e50]"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          No-Show Rate by Event
        </h3>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#10b981]" />
            &le;15%
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#d4a537]" />
            15–30%
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
            &gt;30%
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={Math.max(240, data.length * 36)}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 40, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" horizontal={false} />
          <XAxis
            type="number"
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={120}
            tick={{ fontSize: 11, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
          <Bar dataKey="rate" name="No-show Rate" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.rate)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
