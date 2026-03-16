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

export async function saveFullCheckin(userId: string, form: CheckinFormState): Promise<void> {
  const today = new Date().toISOString().split("T")[0];


  const { error: dizzinessError } = await supabase
    .from("dizziness")
    .upsert(
      { user_id: userId, date_recorded: today, intensity: form.dizziness_intensity },
      { onConflict: "user_id,date_recorded" }
    );
  if (dizzinessError) throw new Error("Error al guardar los vértigos");


  const sessions: SessionEntry[] = [];
  if (form.had_vestibular && form.vestibular_session) sessions.push(form.vestibular_session);
  if (form.had_physio && form.physio_session) sessions.push(form.physio_session);
  if (form.had_activity) sessions.push(...form.activity_sessions);

  if (sessions.length === 0) return;


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

  const { error: sessionsError } = await supabase.from("sessions").insert(rows);
  if (sessionsError) throw new Error("Error al guardar las sesiones");
}