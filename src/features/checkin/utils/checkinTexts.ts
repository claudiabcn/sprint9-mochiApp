import { Intensity } from "@/features/checkin/utils/checkinTypes";
import { CheckinFormState } from "@/features/checkin/utils/checkinTypes";

export const CHECKIN_TEXTS = {
  MODAL_TITLE: "Check-in Diario 🐰",
  STEP_TITLES: [
    "Vértigos",
    "Rehabilitación vestibular",
    "Fisioterapia",
    "Actividad física",
    "Resumen",
  ],
  BUTTONS: {
    BACK: "← Atrás",
    CANCEL: "Cancelar",
    NEXT: "Siguiente →",
    SAVE: "Guardar",
    SAVING: "Guardando...",
  },
  INTENSITY_LABELS: {
    None: "Ninguno",
    Low: "Algunos",
    High: "Muchos",
  } as Record<Intensity, string>,
  STEPS: {
    TITLE_DIZZINESS: "¿Cómo están los vértigos hoy?",
    TITLE_SESSIONS: "¿Qué actividades has hecho?",
    SUMMARY_SUBTITLE: "Revisa tu check-in antes de guardar",
  },
  HOME: {
    GREETING: "¿Qué tal hoy?",
    STATUS_DONE: "✓ Registrado hoy",
    STATUS_PENDING: "Registra como fue tu día.",
  },
} as const;

export const VESTIBULAR_CENTERS = [
  { id: 1, name: "IRVE", duration: 60 },
  { id: 2, name: "CAP", duration: 30 },
  { id: 3, name: "Cos & Essència", duration: 45 },
  { id: 4, name: "Casa", duration: 15 },
];

export const PHYSIO_CENTERS = [
  { id: 5, name: "Fissa", duration: 60 },
  { id: 6, name: "Fde Fisio", duration: 60 },
  { id: 7, name: "MyFisio", duration: 60 },
];

export const ACTIVITIES = [
  { name: "Flexi", center_id: 8, center_name: "Casa", duration: 30 },
  {
    name: "Padel",
    center_id: 8,
    center_name: "FES Padel Can Dragó",
    duration: 60,
  },
  {
    name: "Twerk",
    center_id: 9,
    center_name: "Centre Cívic Sagrada Família",
    duration: 90,
  },
  {
    name: "Dirigida",
    center_id: 10,
    center_name: "Eurofitness Can Dragó",
    duration: 45,
  },
  {
    name: "Piscina",
    center_id: 10,
    center_name: "Eurofitness Can Dragó",
    duration: 45,
  },
  {
    name: "Gym",
    center_id: 10,
    center_name: "Eurofitness Can Dragó",
    duration: 45,
  },
];

export const DURATIONS = [15, 30, 45, 60, 75, 90];

export const INITIAL_STATE: CheckinFormState = {
  dizziness_intensity: "None",
  dizziness_slider: 0,
  had_vestibular: false,
  vestibular_session: null,
  had_physio: false,
  physio_session: null,
  had_activity: false,
  activity_sessions: [],
};