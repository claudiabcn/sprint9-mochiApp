import { useState } from "react";
import { useCheckinContext } from "@/features/checkin/context/CheckinContext";
import { MissingCheckinsModal } from "./MissingCheckinsModal";
import { CHECKIN_TEXTS } from "../utils/checkinTexts";

export function CheckinSection() {
  const { open, todayDone, form, missingDates } = useCheckinContext();
  const [showMissing, setShowMissing] = useState(false);

  return (
    <>
      <div
        className="w-full rounded-2xl px-6 py-5 flex items-center justify-between cursor-pointer transition-all duration-200 hover:shadow-md"
        style={{
          background: "linear-gradient(135deg, #F5E6FF 0%, #EDE6FF 100%)",
          border: "1px solid rgba(196,169,255,0.3)",
        }}
        onClick={() => open()}
      >
        <div>
          <h3 className="font-semibold text-[#4A4A6A] text-sm mb-0.5">
            {CHECKIN_TEXTS.HOME.GREETING}
          </h3>
          {todayDone ? (
            <p className="text-xs text-[#C4A9FF] font-medium">
              {CHECKIN_TEXTS.HOME.STATUS_DONE}
            </p>
          ) : (
            <p className="text-xs text-[#8B8BA5]">
              {CHECKIN_TEXTS.HOME.STATUS_PENDING}
            </p>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            open();
          }}
          className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 bg-gradient-to-r from-[#C4A9FF] to-[#FF9ECD]"
        >
          {todayDone ? "Editar" : "Abrir Check-in"}
        </button>
      </div>

      {missingDates.length > 0 && (
        <button
          onClick={() => setShowMissing(true)}
          className="mt-3 w-full flex items-center justify-between px-4 py-3 rounded-2xl border border-[#FF9ECD]/30 bg-[#FFF5FA] hover:bg-[#FFE8F5] transition-colors"
        >
          <div className="flex items-center gap-2">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FF9ECD"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span className="text-xs font-medium text-[#4A4A6A]">
              Tienes {missingDates.length} check-in
              {missingDates.length > 1 ? "s" : ""} pendiente
              {missingDates.length > 1 ? "s" : ""}
            </span>
          </div>
          <span className="text-xs text-[#FF9ECD] font-medium">Ver →</span>
        </button>
      )}

      {showMissing && (
        <MissingCheckinsModal onClose={() => setShowMissing(false)} />
      )}
    </>
  );
}
