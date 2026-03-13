import { supabase } from "@/lib/supabase";
import { getAuthErrorMessage } from "../../../utils/authErrors";

export async function loginWithUsername(username: string, password: string): Promise<void> {
  const { data: email, error: rpcError } = await supabase.rpc(
    "get_email_by_username",
    { p_username: username.trim().toLowerCase() }
  );

  if (rpcError || !email) {
    throw new Error("Usuario o contraseña incorrectos");
  }

  const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

  if (signInError) {
    throw new Error(getAuthErrorMessage(signInError));
  }
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(getAuthErrorMessage(error));
}
