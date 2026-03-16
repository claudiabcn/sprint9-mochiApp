export const FALLBACK_MESSAGE = "Ocurrió un error inesperado. Inténtalo de nuevo";
const INVALID_CREDENTIALS = "Usuario o contraseña incorrectos";

export const SUPABASE_ERROR_MAP: Record<string, string> = {
  invalid_credentials:        INVALID_CREDENTIALS,
  user_not_found:             INVALID_CREDENTIALS,
  wrong_password:             INVALID_CREDENTIALS,
  user_banned:                "Tu cuenta ha sido suspendida. Contacta con soporte",
  user_disabled:              "Tu cuenta está desactivada",
  over_request_rate_limit:    "Demasiados intentos. Espera un momento e inténtalo de nuevo",
  over_email_send_rate_limit: "Demasiados intentos. Espera un momento e inténtalo de nuevo",
  session_not_found:          "Tu sesión ha expirado. Inicia sesión de nuevo",
  refresh_token_not_found:    "Tu sesión ha expirado. Inicia sesión de nuevo",
  refresh_token_already_used: "Tu sesión ha expirado. Inicia sesión de nuevo",
  unexpected_failure:         "Error del servidor. Inténtalo de nuevo más tarde",
};