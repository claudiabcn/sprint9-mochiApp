import { useCheckinContext } from "@/features/checkin/context/CheckinContext";
import { CheckinModal } from "./CheckinModal";
import { intensityLabel } from "@/features/checkin/services/checkinService";

export function CheckinSection() {
  const { open, todayDone, form } = useCheckinContext();

  return (
    <>
      <div
        className="w-full rounded-2xl px-6 py-5 flex items-center justify-between cursor-pointer transition-all duration-200 hover:shadow-md"
        style={{ background: "linear-gradient(135deg, #F5E6FF 0%, #EDE6FF 100%)", border: "1px solid rgba(196,169,255,0.3)" }}
        onClick={open}
      >
        <div>
          <h3 className="font-semibold text-[#4A4A6A] text-sm mb-0.5">¿Cómo te sientes hoy?</h3>
          {todayDone ? (
            <p className="text-xs text-[#C4A9FF] font-medium">
              ✓ Registrado hoy · {intensityLabel(form.dizziness_intensity)}
            </p>
          ) : (
            <p className="text-xs text-[#8B8BA5]">Registra tu estado y progreso diario</p>
          )}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); open(); }}
          className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ background: "linear-gradient(90deg, #C4A9FF 0%, #FF9ECD 100%)" }}
        >
          {todayDone ? "Editar" : "Abrir Check-in"}
        </button>
      </div>
      <CheckinModal />
    </>
  );
}