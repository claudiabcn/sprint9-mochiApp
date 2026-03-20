import { supabase } from "@/lib/supabase";
import type { CheckinFormState } from "@/features/checkin/utils/checkinTypes";

function formatDateLocal(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export async function getTodayCheckin(userId: string) {
  const today = formatDateLocal(new Date());

  const { data, error } = await supabase
    .from("dizziness")
    .select("*")
    .eq("user_id", userId)
    .eq("date_recorded", today)
    .maybeSingle();

  if (error) throw new Error("Error al obtener el check-in de hoy");
  return data;
}

export async function getMissingCheckins(userId: string): Promise<string[]> {
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - i - 1);
    return formatDateLocal(d);
  });

  const { data, error } = await supabase
    .from("dizziness")
    .select("date_recorded")
    .eq("user_id", userId)
    .in("date_recorded", last7Days);

  if (error) throw new Error("Error al obtener los check-ins pendientes");

  const done = new Set((data ?? []).map((r) => r.date_recorded));
  return last7Days.filter((d) => !done.has(d));
}

export async function saveDizziness(
  userId: string,
  form: Pick<CheckinFormState, "dizziness_intensity">,
  date?: string,
): Promise<void> {
  const dateRecorded = date ?? formatDateLocal(new Date());

  const { error } = await supabase.from("dizziness").upsert(
    {
      user_id: userId,
      date_recorded: dateRecorded,
      intensity: form.dizziness_intensity,
    },
    { onConflict: "user_id,date_recorded" },
  );

  if (error) throw new Error("Error al guardar los vértigos");
}
