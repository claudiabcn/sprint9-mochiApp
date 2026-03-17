import { FALLBACK_MESSAGE, AUTH_MESSAGES } from "./authTexts";
import { LoginFields, LoginErrors } from "./authTypes";

export const SUPABASE_ERROR_MAP: Record<string, string> = {
  invalid_login_credentials: AUTH_MESSAGES.INVALID_CREDENTIALS,
  user_not_found: AUTH_MESSAGES.INVALID_CREDENTIALS,
  user_banned: AUTH_MESSAGES.ACCOUNT_SUSPENDED,
  user_disabled: AUTH_MESSAGES.ACCOUNT_DISABLED,
  over_request_rate_limit: AUTH_MESSAGES.TOO_MANY_ATTEMPTS,
  over_email_send_rate_limit: AUTH_MESSAGES.TOO_MANY_ATTEMPTS,
  session_not_found: AUTH_MESSAGES.SESSION_EXPIRED,
  refresh_token_not_found: AUTH_MESSAGES.SESSION_EXPIRED,
  refresh_token_already_used: AUTH_MESSAGES.SESSION_EXPIRED,
  unexpected_failure: AUTH_MESSAGES.SERVER_ERROR,
};

export function validateLoginFields(values: LoginFields): LoginErrors {
  const errors: LoginErrors = {};
  if (!values.username) errors.username = AUTH_MESSAGES.REQUIRED_FIELD;
  if (!values.password) {
    errors.password = AUTH_MESSAGES.REQUIRED_FIELD;
  }
  return errors;
}

export function getAuthErrorMessage(
  error: unknown,
  fallback = FALLBACK_MESSAGE,
): string {
  if (!error) return fallback;

  if (typeof error === "object" && error !== null && "code" in error) {
    const code = (error as { code: string }).code;
    return SUPABASE_ERROR_MAP[code] ?? fallback;
  }

  if (error instanceof Error) {
    const message = error.message;
    if (message in AUTH_MESSAGES) {
      return AUTH_MESSAGES[message as keyof typeof AUTH_MESSAGES];
    }
    return fallback;
  }

  return fallback;
}
