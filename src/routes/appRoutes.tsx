import { Routes, Route, Navigate } from "react-router-dom";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { AuthGuard } from "@/features/auth/components/AuthGuard";


function Dashboard() {
  return <div className="p-8 text-[#4A4A6A]">Dashboard 🐰</div>;
}

function ForgotPassword() {
  return <div className="p-8 text-[#4A4A6A]">Recuperar contraseña</div>;
}

export function AppRoutes() {
  return (
    <Routes>

      <Route
        path="/login"
        element={
          <AuthGuard redirectIfAuthenticated redirectTo="/dashboard">
            <LoginForm />
          </AuthGuard>
        }
      />
      

      <Route
        path="/dashboard"
        element={
          <AuthGuard>
            <Dashboard />
          </AuthGuard>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}