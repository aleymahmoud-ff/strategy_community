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

interface SegmentConversionData {
  segment: string;
  invitationRate: number;
  confirmationRate: number;
  attendanceRate: number;
}

interface SegmentConversionChartProps {
  data: SegmentConversionData[];
}

function formatSegment(segment: string): string {
  return segment
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

interface TooltipPayloadItem {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-sm px-3 py-2 text-sm min-w-[160px]">
      <p className="font-semibold text-[#2d3e50] mb-1">{label ? formatSegment(label) : ''}</p>
      {payload.map((item) => (
        <div key={item.name} className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-1.5 text-gray-600 capitalize">
            <span
              className="inline-block w-2 h-2 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            {item.name}
          </span>
          <span className="font-medium text-[#2d3e50]">{item.value.toFixed(1)}%</span>
        </div>
      ))}
    </div>
  );
}

interface LegendPayloadItem {
  value: string;
  color: string;
}

interface CustomLegendProps {
  payload?: LegendPayloadItem[];
}

function CustomLegend({ payload }: CustomLegendProps) {
  if (!payload?.length) return null;
  return (
    <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 mt-2">
      {payload.map((entry) => (
        <div key={entry.value} className="flex items-center gap-1.5 text-xs text-gray-600 capitalize">
          <span
            className="inline-block w-2.5 h-2.5 rounded-sm flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          {entry.value}
        </div>
      ))}
    </div>
  );
}

export default function SegmentConversionChart({ data }: SegmentConversionChartProps) {
  const chartData = data.map((item) => ({
    ...item,
    segment: item.segment,
  }));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-sm font-semibold text-[#2d3e50] mb-4">
        Segment Conversion Rates
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={chartData}
          margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
          barCategoryGap="28%"
          barGap={2}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
          <XAxis
            dataKey="segment"
            tick={{ fontSize: 11, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={formatSegment}
          />
          <YAxis
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 11, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
          <Legend content={<CustomLegend />} />
          <Bar dataKey="invitationRate" name="invitation" fill="#e5e7eb" radius={[3, 3, 0, 0]} />
          <Bar dataKey="confirmationRate" name="confirmation" fill="#3b82f6" radius={[3, 3, 0, 0]} />
          <Bar dataKey="attendanceRate" name="attendance" fill="#10b981" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
