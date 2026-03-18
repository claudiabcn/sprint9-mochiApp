import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { getHighlights } from "@/features/home/services/highlightsService";
import type {
  HighlightsData,
  HighlightsState,
} from "@/features/home/utils/highlightsTypes";
import { HIGHLIGHTS_TEXTS } from "@/features/home/utils/homeTexts";

interface StreakCardProps {
  value: number;
  label: string;
  icon: string;
  iconBg: string;
  barColor: string;
  goal?: number;
}

interface FlatCardProps {
  value: number;
  label: string;
  unit: string;
  icon: string;
  iconBg: string;
}

function StreakCard({
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

function FlatCard({ value, label, unit, icon, iconBg }: FlatCardProps) {
  return (
    <div className="bg-white border border-[#C4A9FF]/20 rounded-2xl p-4 flex items-center gap-4">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
        style={{ background: iconBg }}
      >
        {icon}
      </div>
      <div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-medium text-[#4A4A6A] leading-none">
            {value}
          </span>
          <span className="text-xs text-[#8B8BA5]">{unit}</span>
        </div>
        <p className="text-xs text-[#8B8BA5] mt-1">{label}</p>
      </div>
    </div>
  );
}

function SkeletonStreak() {
  return (
    <div className="bg-white border border-[#C4A9FF]/20 rounded-2xl p-4 flex flex-col gap-2 animate-pulse">
      <div className="w-7 h-7 rounded-lg bg-[#F5E6FF]" />
      <div className="h-7 w-10 rounded-lg bg-[#F5E6FF]" />
      <div className="h-3 w-24 rounded bg-[#F5E6FF]" />
      <div className="h-[5px] rounded-full bg-[#F5E6FF] mt-1" />
    </div>
  );
}

function SkeletonFlat() {
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

export function HighlightsSection() {
  const { user } = useAuth();
  const [state, setState] = useState<HighlightsState>({ status: "loading" });

  useEffect(() => {
    if (!user?.id) return;
    setState({ status: "loading" });
    getHighlights(user.id)
      .then((data) => setState({ status: "success", data }))
      .catch(() =>
        setState({ status: "error", message: HIGHLIGHTS_TEXTS.ERROR }),
      );
  }, [user?.id]);

  if (state.status === "loading") {
    return (
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <SkeletonFlat />
          <SkeletonStreak />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <SkeletonStreak />
          <SkeletonFlat />
        </div>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="rounded-2xl bg-white/60 border border-[#C4A9FF]/20 px-6 py-6 text-center text-sm text-[#8B8BA5]">
        {state.message}
      </div>
    );
  }

  const {
    dizzinessFreeDays,
    avgExerciseMinutes,
    vestibularDays,
    stretchingDays,
  } = state.data;

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <FlatCard
          value={dizzinessFreeDays}
          label={HIGHLIGHTS_TEXTS.DIZZINESS_FREE_DAYS}
          unit="días"
          icon="✨"
          iconBg="#E8F5FF"
        />
        <FlatCard
          value={avgExerciseMinutes}
          label={HIGHLIGHTS_TEXTS.AVG_EXERCISE}
          unit="min"
          icon="💪"
          iconBg="#F5FFE8"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <StreakCard
          value={vestibularDays}
          label={HIGHLIGHTS_TEXTS.VESTIBULAR_DAYS}
          icon="🏥"
          iconBg="#FFE8F5"
          barColor="#FF9ECD"
        />
        <StreakCard
          value={stretchingDays}
          label={HIGHLIGHTS_TEXTS.STRETCHING_DAYS}
          icon="🧘"
          iconBg="#F5E6FF"
          barColor="#C4A9FF"
        />
      </div>
    </div>
  );
}
