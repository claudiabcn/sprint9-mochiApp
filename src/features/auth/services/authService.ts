import { supabase } from "@/lib/supabase";

export async function loginWithUsername(
  username: string,
  password: string,
): Promise<void> {
  const { data: email, error: rpcError } = await supabase.rpc(
    "get_email_by_username",
    { p_username: username.trim().toLowerCase() },
  );

  if (rpcError || !email) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
    throw signInError;
  }
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}
