import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { saveFullCheckin } from "@/features/checkin/services/checkinService";
import { getTodayCheckin, getMissingCheckins } from "@/features/checkin/services/dizzinessService";
import type { Intensity } from "@/features/checkin/utils/checkinTypes";
import { INITIAL_STATE } from "@/features/checkin/utils/checkinTexts";
import { type CheckinFormState } from "@/features/checkin/utils/checkinTypes";

interface CheckinContextType {
  isOpen: boolean;
  open: (date?: string) => void;
  close: () => void;
  step: number;
  totalSteps: number;
  next: () => void;
  prev: () => void;
  form: CheckinFormState;
  patch: (partial: Partial<CheckinFormState>) => void;
  todayDone: boolean;
  loading: boolean;
  error: string | null;
  handleSave: () => Promise<void>;
  missingDates: string[];
  activeDate: string | null;
}

const CheckinContext = createContext<CheckinContextType | undefined>(undefined);
const TOTAL_STEPS = 5;

export function CheckinProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<CheckinFormState>(INITIAL_STATE);
  const [todayDone, setTodayDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [missingDates, setMissingDates] = useState<string[]>([]);
  const [activeDate, setActiveDate] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    getTodayCheckin(user.id).then((r) => {
      if (!r) return;
      setTodayDone(true);
      const intensityToSlider: Record<string, number> = { None: 0, Low: 1, High: 2 };
      setForm((prev) => ({
        ...prev,
        dizziness_intensity: r.intensity as Intensity,
        dizziness_slider: intensityToSlider[r.intensity] ?? 0,
      }));
    });

    getMissingCheckins(user.id).then(setMissingDates);
  }, [user]);

  const patch = (partial: Partial<CheckinFormState>) =>
    setForm((prev) => ({ ...prev, ...partial }));

  const open = (date?: string) => {
    setError(null);
    setStep(1);
    setActiveDate(date ?? null);
    setForm(INITIAL_STATE);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setActiveDate(null);
  };

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      await saveFullCheckin(user.id, form, activeDate ?? undefined);
      if (!activeDate) {
        setTodayDone(true);
      } else {
        setMissingDates((prev) => prev.filter((d) => d !== activeDate));
      }
      close();
    } catch {
      setError("No se pudo guardar el check-in. Inténtalo de nuevo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CheckinContext.Provider value={{
      isOpen, open, close,
      step, totalSteps: TOTAL_STEPS, next, prev,
      form, patch,
      todayDone, loading, error, handleSave,
      missingDates, activeDate,
    }}>
      {children}
    </CheckinContext.Provider>
  );
}

export function useCheckinContext() {
  const ctx = useContext(CheckinContext);
  if (!ctx) throw new Error("useCheckinContext must be used within CheckinProvider");
  return ctx;
}
