import { supabase } from "@/lib/supabase";
import type { ExerciseWithCapability, CapabilityStatus } from "@/features/rehab/utils/rehabTypes";

export async function getClasses(): Promise<string[]> {
  const { data, error } = await supabase
    .from("vestibular_exercises")
    .select("class")
    .order("class");

  if (error) throw new Error("Error al obtener las clases");

  const unique = [...new Set((data ?? []).map((r) => r.class).filter(Boolean))];
  return unique;
}

export async function getExercisesByClass(
  userId: string,
  className: string,
): Promise<ExerciseWithCapability[]> {
  const [{ data: exercises, error: exError }, { data: capabilities, error: capError }] =
    await Promise.all([
      supabase
        .from("vestibular_exercises")
        .select("id, name, class, description")
        .eq("class", className)
        .order("name"),
      supabase
        .from("user_capabilities")
        .select("vestibular_exercise_id, capability_status")
        .eq("user_id", userId),
    ]);

  if (exError) throw new Error("Error al obtener los ejercicios");
  if (capError) throw new Error("Error al obtener las capacidades");

  const capMap = new Map(
    (capabilities ?? []).map((c) => [c.vestibular_exercise_id, c.capability_status as CapabilityStatus]),
  );

  return (exercises ?? []).map((ex) => ({
    ...ex,
    capability_status: capMap.get(ex.id) ?? null,
  }));
}

export async function getTotalProgress(userId: string): Promise<{ capable: number; partial: number; total: number }> {
  const [{ count: total }, { data: capabilities, error }] = await Promise.all([
    supabase.from("vestibular_exercises").select("id", { count: "exact", head: true }),
    supabase.from("user_capabilities").select("capability_status").eq("user_id", userId),
  ]);

  if (error) throw new Error("Error al obtener el progreso");

  const capable = (capabilities ?? []).filter((c) => c.capability_status === "Capable").length;
  const partial = (capabilities ?? []).filter((c) => c.capability_status === "Partially capable").length;

  return { capable, partial, total: total ?? 0 };
}

export async function upsertCapability(
  userId: string,
  exerciseId: number,
  status: CapabilityStatus,
): Promise<void> {
  const { error } = await supabase
    .from("user_capabilities")
    .upsert(
      { user_id: userId, vestibular_exercise_id: exerciseId, capability_status: status },
      { onConflict: "user_id,vestibular_exercise_id" },
    );

  if (error) throw new Error("Error al guardar la capacidad");
}

export async function removeCapability(userId: string, exerciseId: number): Promise<void> {
  const { error } = await supabase
    .from("user_capabilities")
    .delete()
    .eq("user_id", userId)
    .eq("vestibular_exercise_id", exerciseId);

  if (error) throw new Error("Error al eliminar la capacidad");
}