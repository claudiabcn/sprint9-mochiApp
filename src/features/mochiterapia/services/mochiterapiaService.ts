import { supabase } from "@/lib/supabase";

export async function getAllPhrases(): Promise<string[]> {
  const { data, error } = await supabase
    .from("motivational_phrases")
    .select("phrase");

  if (error) throw new Error("Error al obtener las frases motivadoras");
  if (!data || data.length === 0) throw new Error("No hay frases disponibles");

  return data.map((r) => r.phrase);
}
