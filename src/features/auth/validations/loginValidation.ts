export interface LoginFields {
  username: string;
  password: string;
}

export interface LoginErrors {
  username?: string;
  password?: string;
  general?: string;
}

export function validateLogin(values: LoginFields): LoginErrors {
  const errors: LoginErrors = {};

  if (!values.username.trim()) {
    errors.username = "El usuario es requerido";
  }

  if (!values.password) {
    errors.password = "La contraseña es requerida";
  } 
  return errors;
}
