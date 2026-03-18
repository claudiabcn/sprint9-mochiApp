import { supabase } from "@/lib/supabase";
import type { HighlightsData } from "@/features/home/utils/highlightsTypes";

function formatDateLocal(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}


function calcStreak(datesWithRecord: Set<string>): number {
  const today = new Date();
  const todayStr = formatDateLocal(today);

  const startOffset = datesWithRecord.has(todayStr) ? 0 : 1;
  let streak = 0;

  for (let i = startOffset; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = formatDateLocal(d);

    if (datesWithRecord.has(dateStr)) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

async function getStretchingStreak(userId: string): Promise<number> {
  const { data, error } = await supabase
    .from("sessions")
    .select("date_recorded")
    .eq("user_id", userId)
    .eq("service_type", "PhysicalActivity")
    .eq("name", "Flexi");

  if (error) throw new Error("Error al obtener días de estiramientos");

  const dates = new Set((data ?? []).map((r) => r.date_recorded));
  return calcStreak(dates);
}

async function getVestibularStreak(userId: string): Promise<number> {
  const { data, error } = await supabase
    .from("sessions")
    .select("date_recorded")
    .eq("user_id", userId)
    .eq("service_type", "VestibularRehabilitation");

  if (error)
    throw new Error("Error al obtener días de rehabilitación vestibular");

  const dates = new Set((data ?? []).map((r) => r.date_recorded));
  return calcStreak(dates);
}

async function getDizzinessFreeDays(userId: string): Promise<number> {
  const { data, error } = await supabase
    .from("dizziness")
    .select("date_recorded, intensity")
    .eq("user_id", userId);

  if (error) throw new Error("Error al obtener los datos de vértigos");

  const noDizzinessDates = new Set(
    (data ?? [])
      .filter((r) => r.intensity === "None")
      .map((r) => r.date_recorded),
  );

  return calcStreak(noDizzinessDates);
}

async function getAvgExerciseMinutes(userId: string): Promise<number> {
  const { data, error } = await supabase
    .from("sessions")
    .select("date_recorded, duration")
    .eq("user_id", userId)
    .eq("service_type", "PhysicalActivity")
    .neq("name", "Flexi");

  if (error) throw new Error("Error al obtener minutos de ejercicio");

  const records = data ?? [];
  if (records.length === 0) return 0;

  const byDay = new Map<string, number>();
  for (const r of records) {
    byDay.set(r.date_recorded, (byDay.get(r.date_recorded) ?? 0) + r.duration);
  }

  const total = Array.from(byDay.values()).reduce((a, b) => a + b, 0);
  return Math.round(total / byDay.size);
}

export async function getHighlights(userId: string): Promise<HighlightsData> {
  const [
    stretchingDays,
    vestibularDays,
    dizzinessFreeDays,
    avgExerciseMinutes,
  ] = await Promise.all([
    getStretchingStreak(userId),
    getVestibularStreak(userId),
    getDizzinessFreeDays(userId),
    getAvgExerciseMinutes(userId),
  ]);

  return {
    stretchingDays,
    vestibularDays,
    dizzinessFreeDays,
    avgExerciseMinutes,
  };
}
