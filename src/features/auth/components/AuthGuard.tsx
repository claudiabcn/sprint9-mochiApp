import { Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";
import { AuthGuardProps } from "@/features/auth/utils/authTypes";

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
