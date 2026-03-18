import { supabase } from "@/lib/supabase";
import type { HighlightsData } from "@/features/highlights/utils/highlightsTypes";
import { calcStreak, avgMinutesByDay } from "@/features/highlights/utils/highlightsUtils";

interface SessionFilters {
  service_type?: string;
  name?: string;
  excludeName?: string;
}

async function getSessionStreak(userId: string, filters: SessionFilters): Promise<number> {
  let query = supabase
    .from("sessions")
    .select("date_recorded")
    .eq("user_id", userId);

  if (filters.service_type) query = query.eq("service_type", filters.service_type);
  if (filters.name) query = query.eq("name", filters.name);
  if (filters.excludeName) query = query.neq("name", filters.excludeName);

  const { data, error } = await query;
  if (error) throw new Error("Error al obtener la racha de sesiones");

  const dates = new Set((data ?? []).map((r) => r.date_recorded));
  return calcStreak(dates);
}

async function getDizzinessFreeDays(userId: string): Promise<number> {
  const { data, error } = await supabase
    .from("dizziness")
    .select("date_recorded, intensity")
    .eq("user_id", userId);

  if (error) throw new Error("Error al obtener los datos de vértigos");

  const dates = new Set(
    (data ?? []).filter((r) => r.intensity === "None").map((r) => r.date_recorded),
  );

  return calcStreak(dates);
}

async function getAvgExerciseMinutes(userId: string): Promise<number> {
  const { data, error } = await supabase
    .from("sessions")
    .select("date_recorded, duration")
    .eq("user_id", userId)
    .eq("service_type", "PhysicalActivity")
    .neq("name", "Flexi");

  if (error) throw new Error("Error al obtener minutos de ejercicio");
  return avgMinutesByDay(data ?? []);
}

export async function getHighlights(userId: string): Promise<HighlightsData> {
  const [stretchingDays, vestibularDays, dizzinessFreeDays, avgExerciseMinutes] =
    await Promise.all([
      getSessionStreak(userId, { service_type: "PhysicalActivity", name: "Flexi" }),
      getSessionStreak(userId, { service_type: "VestibularRehabilitation" }),
      getDizzinessFreeDays(userId),
      getAvgExerciseMinutes(userId),
    ]);

  return { stretchingDays, vestibularDays, dizzinessFreeDays, avgExerciseMinutes };
}
