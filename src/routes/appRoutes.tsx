import { Routes, Route, Navigate } from "react-router-dom";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { AuthGuard } from "@/features/auth/components/AuthGuard";
import { Home } from "@/features/home/Home"; 

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <AuthGuard redirectIfAuthenticated redirectTo="/home">
            <LoginForm />
          </AuthGuard>
        }
      />

      <Route
        path="/home"
        element={
          <AuthGuard>
            <Home />
          </AuthGuard>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}