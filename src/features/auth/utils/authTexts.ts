export const FALLBACK_MESSAGE =
  "Ocurrió un error inesperado. Inténtalo de nuevo";

export const AUTH_MESSAGES = {
  INVALID_CREDENTIALS: "Usuario o contraseña incorrectos",
  ACCOUNT_SUSPENDED: "Tu cuenta ha sido suspendida. Contacta con soporte",
  ACCOUNT_DISABLED: "Tu cuenta está desactivada",
  TOO_MANY_ATTEMPTS:
    "Demasiados intentos. Espera un momento e inténtalo de nuevo",
  SESSION_EXPIRED: "Tu sesión ha expirado. Inicia sesión de nuevo",
  SERVER_ERROR: "Error del servidor. Inténtalo de nuevo más tarde",
  REQUIRED_FIELD: "Este campo es obligatorio",
} as const;

export const AUTH_LABELS = {
  APP_NAME: "mochiApp",
  LOGIN_SUBTITLE: "Inicia sesión para continuar",
  USER_LABEL: "Usuario",
  PASSWORD_LABEL: "Contraseña",
  USER_PLACEHOLDER: "Tu usuario",
  PASSWORD_PLACEHOLDER: "Tu contraseña",
  LOGIN_BUTTON: "Iniciar sesión",
  LOADING_BUTTON: "Cargando...",
} as const;
