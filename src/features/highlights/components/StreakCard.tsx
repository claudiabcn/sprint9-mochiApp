import type { StreakCardProps } from "@/features/highlights/utils/highlightsTypes";

export function StreakCard({ value, label, icon, iconBg, barColor, goal = 7 }: StreakCardProps) {
  const pct = Math.min((value / goal) * 100, 100);
  return (
    <div className="bg-white border border-[#C4A9FF]/20 rounded-2xl p-4 flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
          style={{ background: iconBg }}
        >
          {icon}
        </div>
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-medium text-[#4A4A6A] leading-none">{value}</span>
            <span className="text-xs text-[#8B8BA5]">días</span>
          </div>
          <p className="text-xs text-[#8B8BA5] mt-0.5">{label}</p>
        </div>
      </div>
      <div>
        <div className="h-[5px] rounded-full bg-[#F5F0FF] overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, background: barColor }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[11px] text-[#C4A9FF]/60">0</span>
          <span className="text-[11px] text-[#C4A9FF]/60">{goal} días</span>
        </div>
      </div>
    </div>
  );
}

export function SkeletonStreak() {
  return (
    <div className="bg-white border border-[#C4A9FF]/20 rounded-2xl p-4 flex flex-col gap-3 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#F5E6FF] flex-shrink-0" />
        <div className="flex flex-col gap-2">
          <div className="h-7 w-12 rounded-lg bg-[#F5E6FF]" />
          <div className="h-3 w-24 rounded bg-[#F5E6FF]" />
        </div>
      </div>
      <div className="h-[5px] rounded-full bg-[#F5E6FF]" />
    </div>
  );
}