import { useNavigate, useLocation } from "react-router-dom";

const TABS = [
  {
    route: "/mochiterapia",
    ariaLabel: "Mochiterapia",
    icon: (color: string) => (
      <svg width="22" height="22" viewBox="0 0 36 36" fill="none">
        <ellipse cx="18" cy="22" rx="9" ry="8" stroke={color} strokeWidth="2" fill="none" />
        <ellipse cx="12" cy="11" rx="3" ry="6" stroke={color} strokeWidth="2" fill="none" />
        <ellipse cx="24" cy="11" rx="3" ry="6" stroke={color} strokeWidth="2" fill="none" />
        <circle cx="14.5" cy="21" r="1" fill={color} />
        <circle cx="21.5" cy="21" r="1" fill={color} />
        <path d="M16 24.5 Q18 26 20 24.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    route: "/re-evolucion",
    ariaLabel: "Re-evolución",
    icon: (color: string) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    route: "/ejercicios",
    ariaLabel: "Ejercicios de rehabilitación",
    icon: (color: string) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v6" />
        <path d="M9 10l-3 4" />
        <path d="M15 10l3 4" />
        <path d="M10 20l2-4 2 4" />
      </svg>
    ),
  },
];

export function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#C4A9FF]/20 flex items-center justify-around px-4 h-16">
      {TABS.map(({ route, ariaLabel, icon }) => {
        const isActive = pathname === route;
        const color = isActive ? "#C4A9FF" : "#8B8BA5";
        return (
          <button
            key={route}
            onClick={() => navigate(route)}
            aria-label={ariaLabel}
            className="flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-200"
            style={{ background: isActive ? "#F5E6FF" : "transparent" }}
          >
            {icon(color)}
          </button>
        );
      })}
    </nav>
  );
}