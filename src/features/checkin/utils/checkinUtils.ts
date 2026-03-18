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
