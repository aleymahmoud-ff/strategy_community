"use client";

interface Props {
  atRisk: number;
  dropped: number;
  churnRate: number;
}

export default function ChurnIndicatorCards({ atRisk, dropped, churnRate }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 border-l-4 border-l-[#d4a537]">
        <p className="text-gray-400 text-xs uppercase tracking-wider font-medium mb-2">At-Risk Members</p>
        <p className="text-3xl font-bold text-[#d4a537]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{atRisk}</p>
        <p className="text-gray-400 text-xs mt-1">Attended 2+ but missed last 2 events</p>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 border-l-4 border-l-red-400">
        <p className="text-gray-400 text-xs uppercase tracking-wider font-medium mb-2">Dropped Members</p>
        <p className="text-3xl font-bold text-red-500" style={{ fontFamily: "'Montserrat', sans-serif" }}>{dropped}</p>
        <p className="text-gray-400 text-xs mt-1">Status: DROPPED_GUEST</p>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 border-l-4 border-l-[#2d3e50]">
        <p className="text-gray-400 text-xs uppercase tracking-wider font-medium mb-2">Churn Rate</p>
        <p className="text-3xl font-bold text-[#2d3e50]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{churnRate}%</p>
        <p className="text-gray-400 text-xs mt-1">(At-risk + Dropped) / Total</p>
      </div>
    </div>
  );
}
