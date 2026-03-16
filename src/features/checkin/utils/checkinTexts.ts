import { Intensity } from "../services/checkinService";

export const CHECKIN_TEXTS = {
  INTENSITY_LABELS: {
    None: "Ninguno",
    Low: "Algunos",
    High: "Muchos",
  } as Record<Intensity, string>,
  
  STEPS: {
    TITLE_DIZZINESS: "¿Cómo están los vértigos hoy?",
    TITLE_SESSIONS: "¿Qué actividades has hecho?",
  }
} as const;