import { LogOut } from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { signOut } from "@/features/auth/services/authService";
import { useNavigate } from "react-router-dom";

export function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const displayName = user?.user_metadata?.username ?? " ";
  const greeting = `¡Hola ${displayName}🐰!`;

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-[#C4A9FF]/20">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #C4A9FF 0%, #FF9ECD 100%)" }}
          >
            <svg width="18" height="18" viewBox="0 0 36 36" fill="none">
              <ellipse cx="18" cy="22" rx="9" ry="8" stroke="white" strokeWidth="2" fill="none" />
              <ellipse cx="12" cy="11" rx="3" ry="6" stroke="white" strokeWidth="2" fill="none" />
              <ellipse cx="24" cy="11" rx="3" ry="6" stroke="white" strokeWidth="2" fill="none" />
              <circle cx="14.5" cy="21" r="1" fill="white" />
              <circle cx="21.5" cy="21" r="1" fill="white" />
              <path d="M16 24.5 Q18 26 20 24.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </svg>
          </div>
          <div className="leading-tight">
            <span className="font-bold text-sm" style={{ color: "#C4A9FF" }}>mochiApp</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-[#4A4A6A] hidden sm:block">
            {greeting}
          </span>
          
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm text-[#8B8BA5] hover:text-[#FF6B9D] hover:bg-[#FFF0F5] transition-all duration-200"
            title="Cerrar sesión"
          >
            <LogOut size={15} />
            </button>
        </div>
      </div>
    </header>
  );
}