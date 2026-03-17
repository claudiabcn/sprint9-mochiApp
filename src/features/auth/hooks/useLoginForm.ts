import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithUsername } from "@/features/auth/services/authService";
import {
  getAuthErrorMessage,
  validateLoginFields,
} from "@/features/auth/utils/authErrors";
import {
  type LoginFields,
  type LoginErrors,
} from "@/features/auth/utils/authTypes";

export function useLoginForm() {
  const navigate = useNavigate();
  const [values, setValues] = useState<LoginFields>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [loading, setLoading] = useState(false);
  const handleChange =
    (field: keyof LoginFields) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));

      if (errors[field] || errors.general) {
        setErrors((prev) => ({
          ...prev,
          [field]: undefined,
          general: undefined,
        }));
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateLoginFields(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    try {
      await loginWithUsername(values.username, values.password);
      navigate("/dashboard");
    } catch (error) {
      setErrors({ general: getAuthErrorMessage(error) });
    } finally {
      setLoading(false);
    }
  };

  return { values, errors, loading, handleChange, handleSubmit };
}
