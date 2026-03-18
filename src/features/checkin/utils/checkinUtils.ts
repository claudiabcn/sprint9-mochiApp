import type { Intensity } from "./checkinTypes";

export function sliderToIntensity(value: number): Intensity {
  if (value === 0) return "None";
  if (value === 1) return "Low";
  return "High";
}

export function moodEmoji(value: number): string {
  if (value === 0) return "😊";
  if (value === 1) return "😐";
  return "😣";
}

export function getActiveButtonClass(isActive: boolean): string {
  return isActive
    ? "bg-gradient-to-r from-[#C4A9FF] to-[#FF9ECD] text-white"
    : "bg-[#F5F5FF] text-[#8B8BA5]";
}

export function formatSessionSummary(
  centerName: string | undefined | null,
  duration: number | undefined | null,
): string {
  if (!centerName) return "No";
  return `${centerName} · ${duration} min`;
}

export function formatActivitySummary(
  sessions: { name: string; duration: number }[],
): string {
  if (sessions.length === 0) return "No";
  return sessions.map((s) => `${s.name} ${s.duration}min`).join(", ");
}
