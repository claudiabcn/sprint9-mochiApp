import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useState } from "react";
import { useLoginForm } from "@/features/auth/hooks/useLoginForm";
import { Button } from "@/shared/components/Button";

export function LoginForm() {
  const { values, errors, loading, handleChange, handleSubmit } = useLoginForm();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#EDD9FF] px-4"
      style={{ background: "linear-gradient(135deg, #e8d5ff 0%, #d6c4ff 40%, #f0d6ff 100%)" }}
    >
      <div className="w-full max-w-sm rounded-3xl bg-white px-8 py-10 shadow-xl border border-white/50">
        
        <div className="flex flex-col items-center mb-7">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: "linear-gradient(135deg, #C4A9FF 0%, #FF9ECD 100%)" }}
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <ellipse cx="18" cy="22" rx="9" ry="8" stroke="white" strokeWidth="1.8" fill="none"/>
              <ellipse cx="12" cy="11" rx="3" ry="6" stroke="white" strokeWidth="1.8" fill="none"/>
              <ellipse cx="24" cy="11" rx="3" ry="6" stroke="white" strokeWidth="1.8" fill="none"/>
              <circle cx="14.5" cy="21" r="1" fill="white"/>
              <circle cx="21.5" cy="21" r="1" fill="white"/>
              <path d="M16 24.5 Q18 26 20 24.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            </svg>
          </div>

          <h1 className="text-2xl font-bold" style={{ color: "#C4A9FF" }}>
            mochiApp
          </h1>
          <p className="text-sm mt-1 text-[#8B8BA5]">
            Inicia sesión para continuar
          </p>
        </div>

        {errors.general && (
          <div className="mb-4 rounded-xl px-4 py-3 text-sm text-center bg-[#FFF0F5] text-[#FF6B9D] border border-[#FFD6E8]">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#4A4A6A]">
              Usuario
            </label>

            <div
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 bg-[#FAFAFF] border ${
                errors.username ? "border-[#FF6B9D]" : "border-[#C4A9FF]/30"
              }`}
            >
              <User size={18} className="text-[#C4A9FF]" />

              <input
                type="text"
                value={values.username}
                onChange={handleChange("username")}
                placeholder="Tu usuario"
                className="flex-1 bg-transparent outline-none text-sm text-[#4A4A6A] placeholder:text-[#C0C0D8]"
              />
            </div>

            {errors.username && (
              <span className="text-xs text-[#FF6B9D] pl-1">
                {errors.username}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#4A4A6A]">
              Contraseña
            </label>

            <div
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 bg-[#FAFAFF] border ${
                errors.password ? "border-[#FF6B9D]" : "border-[#C4A9FF]/30"
              }`}
            >
              <Lock size={18} className="text-[#C4A9FF]" />

              <input
                type={showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                placeholder="Tu contraseña"
                className="flex-1 bg-transparent outline-none text-sm text-[#4A4A6A] placeholder:text-[#C0C0D8]"
              />

              <Button
                variant="ghost"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </div>

            {errors.password && (
              <span className="text-xs text-[#FF6B9D] pl-1">
                {errors.password}
              </span>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="mt-2 w-full py-3.5"
          >
            {loading ? "Cargando..." : "Iniciar sesión"}
          </Button>
        </form>
      </div>
    </div>
  );
}