import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { getHighlights } from "@/features/highlights/services/highlightsService";
import type { HighlightsData, HighlightsState, StreakCardProps, FlatCardProps } from "@/features/highlights/utils/highlightsTypes";
import { HIGHLIGHTS_TEXTS } from "@/features/highlights/utils/highlightsTexts";
import { StreakCard, SkeletonStreak } from "@/features/highlights/components/StreakCard";
import { FlatCard, SkeletonFlat } from "@/features/highlights/components/FlatCard";

function buildFlatStats(data: HighlightsData): FlatCardProps[] {
  return [
    { value: data.dizzinessFreeDays, label: HIGHLIGHTS_TEXTS.DIZZINESS_FREE_DAYS, unit: "días", icon: "✨", iconBg: "#E8F5FF" },
    { value: data.avgExerciseMinutes, label: HIGHLIGHTS_TEXTS.AVG_EXERCISE, unit: "min", icon: "💪", iconBg: "#F5FFE8" },
  ];
}

function buildStreakStats(data: HighlightsData): StreakCardProps[] {
  return [
    { value: data.vestibularDays, label: HIGHLIGHTS_TEXTS.VESTIBULAR_DAYS, icon: "🏥", iconBg: "#FFE8F5", barColor: "#FF9ECD" },
    { value: data.stretchingDays, label: HIGHLIGHTS_TEXTS.STRETCHING_DAYS, icon: "🧘", iconBg: "#F5E6FF", barColor: "#C4A9FF" },
  ];
}

export function HighlightsSection() {
  const { user } = useAuth();
  const [state, setState] = useState<HighlightsState>({ status: "loading" });

  useEffect(() => {
    if (!user?.id) return;
    setState({ status: "loading" });
    getHighlights(user.id)
      .then((data) => setState({ status: "success", data }))
      .catch(() => setState({ status: "error", message: HIGHLIGHTS_TEXTS.ERROR }));
  }, [user?.id]);

  if (state.status === "loading") {
    return (
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <SkeletonFlat /><SkeletonFlat />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <SkeletonStreak /><SkeletonStreak />
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

  const flatStats = buildFlatStats(state.data);
  const streakStats = buildStreakStats(state.data);

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        {flatStats.map((stat) => <FlatCard key={stat.label} {...stat} />)}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {streakStats.map((stat) => <StreakCard key={stat.label} {...stat} />)}
      </div>
    </div>
  );
}
