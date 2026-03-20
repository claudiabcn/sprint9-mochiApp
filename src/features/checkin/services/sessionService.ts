import { supabase } from "@/lib/supabase";
import type { CheckinFormState, SessionEntry } from "@/features/checkin/utils/checkinTypes";

function formatDateLocal(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function buildSessions(form: CheckinFormState): SessionEntry[] {
  const sessions: SessionEntry[] = [];
  if (form.had_vestibular && form.vestibular_session) sessions.push(form.vestibular_session);
  if (form.had_physio && form.physio_session) sessions.push(form.physio_session);
  if (form.had_activity) sessions.push(...form.activity_sessions);
  return sessions;
}

export async function saveSessions(
  userId: string,
  form: CheckinFormState,
  date?: string,
): Promise<void> {
  const dateRecorded = date ?? formatDateLocal(new Date());
  const sessions = buildSessions(form);
  if (sessions.length === 0) return;

  await supabase
    .from("sessions")
    .delete()
    .eq("user_id", userId)
    .eq("date_recorded", dateRecorded)
    .in("service_type", sessions.map((s) => s.service_type));

  const rows = sessions.map((s) => ({
    user_id: userId,
    service_type: s.service_type,
    name: s.name,
    center_id: s.center_id,
    duration: s.duration,
    attended: s.attended,
    date_recorded: dateRecorded,
  }));

  const { error } = await supabase.from("sessions").insert(rows);
  if (error) throw new Error("Error al guardar las sesiones");
}
