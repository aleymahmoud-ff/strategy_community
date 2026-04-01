"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
  data: { month: string; total: number }[];
}

export default function GrowthAreaChart({ data }: Props) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-sm font-semibold text-[#2d3e50] mb-4">Member Growth Over Time</h3>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#9ca3af" }} />
          <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} />
          <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #f3f4f6", fontSize: 12 }} />
          <Area type="monotone" dataKey="total" stroke="#2d3e50" fill="rgba(45,62,80,0.08)" strokeWidth={2.5} dot={{ r: 3, fill: "#2d3e50" }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
