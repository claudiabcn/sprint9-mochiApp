export interface LoginFields {
  username: string;
  password: string;
}

export interface LoginErrors {
  username?: string;
  password?: string;
  general?: string;
}

export function validateLoginFields(values: LoginFields): LoginErrors {
  const errors: LoginErrors = {};

  if (!values.username.trim()) {
    errors.username = "Ingresa tu usuario🐰";
  }

  if (!values.password) {
    errors.password = "Ingresa tu contraseña🐰";
  }

  return errors;
}

const FALLBACK_MESSAGE = "Ocurrió un error inesperado. Inténtalo de nuevo";
const INVALID_CREDENTIALS = "Usuario o contraseña incorrectos";

const SUPABASE_ERROR_MAP: Record<string, string> = {
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

export function getAuthErrorMessage(error: unknown): string {
  if (!error) return FALLBACK_MESSAGE;

  if (typeof error === "object" && "code" in error) {
    const code = (error as { code: string }).code;
    return SUPABASE_ERROR_MAP[code] ?? FALLBACK_MESSAGE;
  }

  if (error instanceof Error) return error.message;

  return FALLBACK_MESSAGE;
}
