import { supabase } from "@/lib/supabase";
import type { CheckinFormState, SessionEntry } from "../../../utils/checkinTypes";

export type Intensity = "None" | "Low" | "High";

export interface DizzinessRecord {
  id: number;
  user_id: string;
  date_recorded: string;
  intensity: Intensity;
}

export function sliderToIntensity(value: number): Intensity {
  if (value === 0) return "None";
  if (value === 1) return "Low";
  return "High"; 
}

export function intensityLabel(intensity: Intensity): string {
  const labels: Record<Intensity, string> = {
    "None": "Ninguno",
    "Low": "Algunos",
    "High": "Muchos"
  };
  return labels[intensity] || labels["None"];
}
export async function getTodayCheckin(userId: string): Promise<DizzinessRecord | null> {
  const today = new Date().toISOString().split("T")[0];
  const { data, error } = await supabase
    .from("dizziness")
    .select("*")
    .eq("user_id", userId)
    .eq("date_recorded", today)
    .maybeSingle();
  if (error) throw new Error("Error al obtener el check-in de hoy");
  return data;
}

async function saveDizziness(userId: string, intensity: Intensity): Promise<void> {
  const today = new Date().toISOString().split("T")[0];
  const { error } = await supabase
    .from("dizziness")
    .upsert(
      { user_id: userId, date_recorded: today, intensity },
      { onConflict: "user_id,date_recorded" }
    );
  if (error) throw new Error("Error al guardar los vértigos");
}

async function saveSessions(userId: string, sessions: SessionEntry[]): Promise<void> {
  if (sessions.length === 0) return;
  const today = new Date().toISOString().split("T")[0];

  await supabase
    .from("sessions")
    .delete()
    .eq("user_id", userId)
    .eq("date_recorded", today)
    .in("service_type", sessions.map((s) => s.service_type));

  const rows = sessions.map((s) => ({
    user_id: userId,
    service_type: s.service_type,
    name: s.name,
    center_id: s.center_id,
    duration: s.duration,
    attended: s.attended,
    date_recorded: today,
  }));

  const { error } = await supabase.from("sessions").insert(rows);
  if (error) throw new Error("Error al guardar las sesiones");
}

export async function saveFullCheckin(userId: string, form: CheckinFormState): Promise<void> {
  await saveDizziness(userId, form.dizziness_intensity);

  const sessions: SessionEntry[] = [];
  if (form.had_vestibular && form.vestibular_session) sessions.push(form.vestibular_session);
  if (form.had_physio && form.physio_session) sessions.push(form.physio_session);
  if (form.had_activity) sessions.push(...form.activity_sessions);

  await saveSessions(userId, sessions);
}
