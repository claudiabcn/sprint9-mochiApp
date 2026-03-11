import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface AuthGuardProps {
  children: ReactNode;
  redirectIfAuthenticated?: boolean;
  redirectTo?: string;
}

export function AuthGuard({
  children,
  redirectIfAuthenticated = false,
  redirectTo = "/dashboard",
}: AuthGuardProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF5FA]">
        <div className="w-8 h-8 rounded-full border-4 border-[#C4A9FF] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (redirectIfAuthenticated && user) return <Navigate to={redirectTo} replace />;
  if (!redirectIfAuthenticated && !user) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
