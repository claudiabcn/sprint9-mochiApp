import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export function useLoginForm() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState<{username?: string, password?: string, general?: string}>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: "username" | "password") => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.username || !values.password) {
      setErrors({ general: "Completa todos los campos" });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const { data: email, error: rpcError } = await supabase
        .rpc("get_email_by_username", { p_username: values.username.trim().toLowerCase() });

      if (rpcError || !email) {
        console.error("RPC Error:", rpcError);
        setErrors({ general: "Usuario no encontrado" });
        return;
      }

      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password: values.password,
      });

      if (authError) {
        console.error("Auth Error:", authError.message);
        setErrors({ general: "Contraseña incorrecta" });
        return;
      }

      navigate("/home");
    } catch (err) {
      setErrors({ general: "Error de conexión" });
    } finally {
      setLoading(false);
    }
  };

  return { values, errors, loading, handleChange, handleSubmit };
}