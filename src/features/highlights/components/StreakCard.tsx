import type { StreakCardProps } from "@/features/highlights/utils/highlightsTypes";

export function StreakCard({
  value,
  label,
  icon,
  iconBg,
  barColor,
  goal = 7,
}: StreakCardProps) {
  const pct = Math.min((value / goal) * 100, 100);
  return (
    <div className="bg-white border border-[#C4A9FF]/20 rounded-2xl p-4 flex flex-col">
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center text-sm mb-3"
        style={{ background: iconBg }}
      >
        {icon}
      </div>
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-[28px] font-medium text-[#4A4A6A] leading-none">
          {value}
        </span>
        <span className="text-xs text-[#8B8BA5]">días</span>
      </div>
      <p className="text-xs text-[#8B8BA5] mb-3">{label}</p>
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
  );
}

export function SkeletonStreak() {
  return (
    <div className="bg-white border border-[#C4A9FF]/20 rounded-2xl p-4 flex flex-col gap-2 animate-pulse">
      <div className="w-7 h-7 rounded-lg bg-[#F5E6FF]" />
      <div className="h-7 w-10 rounded-lg bg-[#F5E6FF]" />
      <div className="h-3 w-24 rounded bg-[#F5E6FF]" />
      <div className="h-[5px] rounded-full bg-[#F5E6FF] mt-1" />
    </div>
  );
}
