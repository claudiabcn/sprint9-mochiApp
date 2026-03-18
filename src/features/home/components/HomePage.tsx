import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { useAuth } from "@/features/auth/context/AuthContext";
import { CheckinSection } from "@/features/checkin/components/CheckinSection";
import { CheckinModal } from "@/features/checkin/components/CheckinModal";
import { CheckinProvider } from "@/features/checkin/context/CheckinContext";
import { HighlightsSection } from "@/features/highlights/components/HighlightsSection";
import { HOME_TEXTS } from "@/features/home/utils/homeTexts";

export function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { WELCOME, SECTIONS, CARDS, CARD_ACTION } = HOME_TEXTS;

  const username = user?.user_metadata?.username ?? "amiga";

  return (
    <CheckinProvider>
      <MainLayout>
        <section
          className="w-full rounded-3xl px-8 py-7 mb-8 text-white"
          style={{
            background: "linear-gradient(135deg, #C4A9FF 0%, #FF9ECD 100%)",
          }}
        >
          <h1 className="text-2xl font-bold mb-1">{WELCOME.TITLE(username)}</h1>
          <p className="text-white/80 text-sm">{WELCOME.SUBTITLE}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-[#4A4A6A] mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#F5E6FF]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C4A9FF"
                strokeWidth="2.5"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </span>
            {SECTIONS.STATS_TITLE}
          </h2>
          <HighlightsSection />
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-[#4A4A6A] mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#F5E6FF]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C4A9FF"
                strokeWidth="2.5"
              >
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
              </svg>
            </span>
            {SECTIONS.CHECKIN_TITLE}
          </h2>
          <CheckinSection />
        </section>

        <section>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CARDS.map(({ label, desc, icon, route }) => (
              <div
                key={label}
                onClick={() => navigate(route)}
                className="rounded-2xl bg-white border border-[#C4A9FF]/20 p-5 flex flex-col gap-2 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-xl bg-[#F5E6FF] flex items-center justify-center mb-1">
                  <span className="text-[#C4A9FF] text-base">{icon}</span>
                </div>
                <h3 className="font-semibold text-[#4A4A6A] text-sm">
                  {label}
                </h3>
                <p className="text-xs text-[#8B8BA5]">{desc}</p>
                <span className="text-xs text-[#C4A9FF] font-medium mt-1">
                  {CARD_ACTION}
                </span>
              </div>
            ))}
          </div>
        </section>
      </MainLayout>
      <CheckinModal />
    </CheckinProvider>
  );
}
