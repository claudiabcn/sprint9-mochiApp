import { supabase } from "@/lib/supabase";
import { getAuthErrorMessage } from "../errors/authErrors";

export async function loginWithUsername(username: string, password: string): Promise<void> {
  // 1. Resolver el email asociado al username via RPC
  const { data: email, error: rpcError } = await supabase.rpc(
    "get_email_by_username",
    { p_username: username.trim().toLowerCase() }
  );

  // RPC fallida o username no existe → mismo mensaje genérico por seguridad
  if (rpcError || !email) {
    throw new Error("Usuario o contraseña incorrectos");
  }

  // 2. Autenticar con Supabase
  const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

  if (signInError) {
    throw new Error(getAuthErrorMessage(signInError));
  }
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(getAuthErrorMessage(error));
}
