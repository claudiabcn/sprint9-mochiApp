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
