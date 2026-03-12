import { MainLayout } from "@/shared/components/MainLayout";
import { useAuth } from "@/features/auth/context/AuthContext";

export function HomePage() {
  const { user } = useAuth();
  const username = user?.user_metadata?.username ?? "amiga";

  return (
    <MainLayout>

      <section
        className="w-full rounded-3xl px-8 py-7 mb-8 text-white"
        style={{ background: "linear-gradient(135deg, #C4A9FF 0%, #FF9ECD 100%)" }}
      >
        <h1 className="text-2xl font-bold mb-1">¡Bienvenida de vuelta, {username}! 🐰</h1>
        <p className="text-white/80 text-sm">Sigue adelante con tu rutina diaria. ¡Cada paso cuenta!</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-[#4A4A6A] mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#F5E6FF]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4A9FF" strokeWidth="2.5">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </span>
          Destacados
        </h2>
        <div className="rounded-2xl bg-white/60 border border-[#C4A9FF]/20 px-6 py-8 text-center text-sm text-[#8B8BA5]">
          📊 Aquí irán tus estadísticas — próximo paso
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-[#4A4A6A] mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#F5E6FF]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4A9FF" strokeWidth="2.5">
              <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
          </span>
          Check-in Diario
        </h2>
        <div className="rounded-2xl bg-white/60 border border-[#C4A9FF]/20 px-6 py-8 text-center text-sm text-[#8B8BA5]">
          ✅ Aquí irá el check-in diario — próximo paso
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Mochiterapia", desc: "Tu espacio de bienestar emocional" },
            { label: "Re-evolución", desc: "Observa tu progreso y mejora continua" },
            { label: "Tipos de ejercicio de rehab", desc: "Explora y practica tus ejercicios" },
          ].map(({ label, desc }) => (
            <div
              key={label}
              className="rounded-2xl bg-white border border-[#C4A9FF]/20 p-5 flex flex-col gap-2 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="w-9 h-9 rounded-xl bg-[#F5E6FF] flex items-center justify-center mb-1">
                <span className="text-[#C4A9FF] text-base">🐰</span>
              </div>
              <h3 className="font-semibold text-[#4A4A6A] text-sm">{label}</h3>
              <p className="text-xs text-[#8B8BA5]">{desc}</p>
              <span className="text-xs text-[#C4A9FF] font-medium mt-1">Entrar →</span>
            </div>
          ))}
        </div>
      </section>

    </MainLayout>
  );
}
