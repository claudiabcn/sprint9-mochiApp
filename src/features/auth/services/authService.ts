import { supabase } from "@/lib/supabase";

export interface AuthServiceError {
  message: string;
}

// ─── Login ────────────────────────────────────────────────────────────────────

export async function loginWithUsername(
  username: string,
  password: string
): Promise<void> {
  // 1. Resolver el email asociado al username via RPC
  const { data: email, error: rpcError } = await supabase.rpc(
    "get_email_by_username",
    { p_username: username.trim().toLowerCase() }
  );

  if (rpcError || !email) {
    throw new Error("Usuario o contraseña incorrectos");
  }

  // 2. Autenticar con Supabase
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
    throw new Error("Usuario o contraseña incorrectos");
  }
}

// ─── Sign out ─────────────────────────────────────────────────────────────────

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error("Error al cerrar sesión");
}
