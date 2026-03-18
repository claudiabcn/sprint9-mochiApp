import type { FlatCardProps } from "@/features/highlights/utils/highlightsTypes";

export function FlatCard({ value, label, unit, icon, iconBg }: FlatCardProps) {
  return (
    <div className="bg-white border border-[#C4A9FF]/20 rounded-2xl p-4 flex items-center gap-4">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0" style={{ background: iconBg }}>
        {icon}
      </div>
      <div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-medium text-[#4A4A6A] leading-none">{value}</span>
          <span className="text-xs text-[#8B8BA5]">{unit}</span>
        </div>
        <p className="text-xs text-[#8B8BA5] mt-1">{label}</p>
      </div>
    </div>
  );
}

export function SkeletonFlat() {
  return (
    <div className="bg-white border border-[#C4A9FF]/20 rounded-2xl p-4 flex items-center gap-4 animate-pulse">
      <div className="w-9 h-9 rounded-xl bg-[#F5E6FF] flex-shrink-0" />
      <div className="flex flex-col gap-2">
        <div className="h-6 w-10 rounded-lg bg-[#F5E6FF]" />
        <div className="h-3 w-24 rounded bg-[#F5E6FF]" />
      </div>
    </div>
  );
}
