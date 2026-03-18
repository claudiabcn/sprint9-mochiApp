export interface HighlightsData {
  stretchingDays: number;
  vestibularDays: number;
  dizzinessFreeDays: number;
  avgExerciseMinutes: number;
}

export type HighlightsState =
  | { status: "loading" }
  | { status: "success"; data: HighlightsData }
  | { status: "error"; message: string };

export interface StreakCardProps {
  value: number;
  label: string;
  icon: string;
  iconBg: string;
  barColor: string;
  goal?: number;
}

export interface FlatCardProps {
  value: number;
  label: string;
  unit: string;
  icon: string;
  iconBg: string;
}
