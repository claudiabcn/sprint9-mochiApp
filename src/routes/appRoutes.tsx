import { Routes, Route, Navigate } from "react-router-dom";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { AuthGuard } from "@/features/auth/components/AuthGuard";
import { HomePage } from "@/features/home/components/HomePage";
import { MochiterapiaPage } from "@/features/mochiterapia/components/MochiterapiaPage";
import { RehabPage } from "@/features/rehab/components/RehabPage";

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
            <HomePage />
          </AuthGuard>
        }
      />
      <Route
        path="/mochiterapia"
        element={
          <AuthGuard>
            <MochiterapiaPage />
          </AuthGuard>
        }
      />
      <Route
        path="/ejercicios"
        element={
          <AuthGuard>
            <RehabPage />
          </AuthGuard>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
