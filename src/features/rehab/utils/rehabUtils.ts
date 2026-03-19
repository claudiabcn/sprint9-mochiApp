import type { ExerciseWithCapability, ExerciseGroup } from "@/features/rehab/utils/rehabTypes";

export function calcProgress(capable: number, partial: number, total: number): number {
  if (total === 0) return 0;
  return Math.round(((capable + partial * 0.5) / total) * 100);
}

export function groupByClass(exercises: ExerciseWithCapability[]): ExerciseGroup[] {
  const map = new Map<string, ExerciseWithCapability[]>();
  for (const ex of exercises) {
    if (!map.has(ex.class)) map.set(ex.class, []);
    map.get(ex.class)!.push(ex);
  }
  return Array.from(map.entries()).map(([cls, exs]) => ({ class: cls, exercises: exs }));
}
