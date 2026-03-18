import { supabase } from "@/lib/supabase";
import type { CheckinFormState } from "@/features/checkin/utils/checkinTypes";

export async function getTodayCheckin(userId: string) {
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

export async function saveDizziness(
  userId: string,
  form: Pick<CheckinFormState, "dizziness_intensity">,
): Promise<void> {
  const today = new Date().toISOString().split("T")[0];

  const { error } = await supabase.from("dizziness").upsert(
    {
      user_id: userId,
      date_recorded: today,
      intensity: form.dizziness_intensity,
    },
    { onConflict: "user_id,date_recorded" },
  );

  if (error) throw new Error("Error al guardar los vértigos");
}
