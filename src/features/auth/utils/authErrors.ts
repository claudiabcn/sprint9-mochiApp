import { 
  type LoginFields, 
  type LoginErrors, 
} from "../utils/types";
import { FALLBACK_MESSAGE, SUPABASE_ERROR_MAP} from "../utils/authTexts";

export function validateLoginFields(values: LoginFields): LoginErrors {
  const errors: LoginErrors = {};

  if (!values.username.trim()) {
    errors.username = "¿Cómo te llamas? Ingresa tu usuario 🐰";
  }

  if (!values.password) {
    errors.password = "Ingresa tu contraseña";
  } 
  return errors;
}

export function getAuthErrorMessage(error: unknown): string {
  if (!error) return FALLBACK_MESSAGE;

  if (typeof error === "object" && "code" in error) {
    const code = (error as { code: string }).code;
    return SUPABASE_ERROR_MAP[code] ?? FALLBACK_MESSAGE;
  }

  if (error instanceof Error) return error.message;

  return FALLBACK_MESSAGE;
}
