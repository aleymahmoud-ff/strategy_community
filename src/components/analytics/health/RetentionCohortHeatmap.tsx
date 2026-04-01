"use client";

interface Props {
  data: { eventName: string; values: number[] }[];
}

function cellColor(v: number): string {
  if (v >= 70) return "bg-emerald-500 text-white";
  if (v >= 50) return "bg-emerald-400 text-white";
  if (v >= 35) return "bg-amber-400 text-white";
  if (v >= 20) return "bg-orange-400 text-white";
  if (v > 0) return "bg-red-400 text-white";
  return "bg-gray-100 text-gray-300";
}

export default function RetentionCohortHeatmap({ data }: Props) {
  const maxCols = Math.max(...data.map((d) => d.values.length), 0);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[#2d3e50]">Retention Cohort Grid</h3>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="w-3 h-3 rounded bg-emerald-500 inline-block" /> High
          <span className="w-3 h-3 rounded bg-amber-400 inline-block" /> Medium
          <span className="w-3 h-3 rounded bg-red-400 inline-block" /> Low
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="text-xs">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left text-gray-400 font-medium">Cohort</th>
              {Array.from({ length: maxCols }, (_, i) => (
                <th key={i} className="px-1 py-1 text-center text-gray-400 font-medium">+{i}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.eventName}>
                <td className="px-2 py-1 text-[#2d3e50] font-semibold whitespace-nowrap">{row.eventName}</td>
                {Array.from({ length: maxCols }, (_, j) => (
                  <td key={j} className="px-1 py-1 text-center">
                    {j < row.values.length ? (
                      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-md text-[9px] font-medium ${cellColor(row.values[j])}`}>
                        {row.values[j]}
                      </span>
                    ) : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
