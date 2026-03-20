import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { useCheckinContext } from "@/features/checkin/context/CheckinContext";
import { Step1Dizziness } from "@/features/checkin/components/Step1Dizziness";
import { Step2Vestibular } from "@/features/checkin/components/Step2Vestibular";
import { Step3Physio } from "@/features/checkin/components/Step3Physio";
import { Step4Activity } from "@/features/checkin/components/Step4Activity";
import { Step5Summary } from "@/features/checkin/components/Step5Summary";
import { Button } from "@/shared/components/Button";
import { CHECKIN_TEXTS } from "@/features/checkin/utils/checkinTexts";
const STEP_TITLES = [
  "Vértigos",
  "Rehabilitación vestibular",
  "Fisioterapia",
  "Actividad física",
  "Resumen",
];

export function CheckinModal() {
  const {
    isOpen,
    close,
    step,
    next,
    prev,
    totalSteps,
    form,
    patch,
    loading,
    error,
    handleSave,
  } = useCheckinContext();

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      style={{
        background: "rgba(196,169,255,0.15)",
        backdropFilter: "blur(4px)",
      }}
      onClick={close}
    >
      <div
        className="w-full max-w-sm bg-white rounded-3xl p-7 shadow-2xl"
        style={{ boxShadow: "0 8px 40px rgba(196,169,255,0.25)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-2">
          <div>
            <h2 className="text-lg font-bold text-[#4A4A6A]">
              {CHECKIN_TEXTS.MODAL_TITLE}
            </h2>

          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={close}
            className="text-[#8B8BA5] hover:text-[#4A4A6A] transition-colors"
          >
            <X size={18} />
          </Button>
        </div>

        <div className="flex gap-1.5 mb-6">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full flex-1 transition-all duration-300"
              style={{
                background:
                  i < step
                    ? "linear-gradient(90deg, #C4A9FF, #FF9ECD)"
                    : "#EDE6FF",
              }}
            />
          ))}
        </div>

        <div className="min-h-[180px]">
          {step === 1 && <Step1Dizziness form={form} onChange={patch} />}
          {step === 2 && <Step2Vestibular form={form} onChange={patch} />}
          {step === 3 && <Step3Physio form={form} onChange={patch} />}
          {step === 4 && <Step4Activity form={form} onChange={patch} />}
          {step === 5 && <Step5Summary form={form} />}
        </div>

        {error && (
          <p className="text-sm text-[#FF6B9D] text-center bg-[#FFF0F5] rounded-xl px-4 py-2 mt-4">
            {error}
          </p>
        )}

        <div className="flex gap-3 mt-6">
          <Button
            variant="secondary"
            size="md"
            onClick={step > 1 ? prev : close}
            className="flex-1 rounded-2xl text-sm font-medium"
          >
            {step > 1
              ? CHECKIN_TEXTS.BUTTONS.BACK
              : CHECKIN_TEXTS.BUTTONS.CANCEL}
          </Button>

          {step < totalSteps ? (
            <Button
              variant="primary"
              size="lg"
              onClick={next}
              className="flex-1 rounded-2xl text-sm font-semibold"
            >
              {CHECKIN_TEXTS.BUTTONS.NEXT}
            </Button>
          ) : (
            <Button
              variant="primary"
              size="lg"
              onClick={handleSave}
              disabled={loading}
              className="flex-1 rounded-2xl text-sm font-semibold disabled:opacity-50"
            >
              {loading
                ? CHECKIN_TEXTS.BUTTONS.SAVING
                : CHECKIN_TEXTS.BUTTONS.SAVE}
            </Button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
