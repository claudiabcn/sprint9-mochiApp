import type { Intensity } from "../features/checkin/services/checkinService";

export type ServiceType = "VestibularRehabilitation" | "Physiotherapy" | "PhysicalActivity";

export interface SessionEntry {
  service_type: ServiceType;
  name: string;
  center_id: number;
  duration: number;
  attended: boolean;
}

export interface CheckinFormState {

  dizziness_intensity: Intensity;
  dizziness_slider: number;

  had_vestibular: boolean;
  vestibular_session: SessionEntry | null;

  had_physio: boolean;
  physio_session: SessionEntry | null;

  had_activity: boolean;
  activity_sessions: SessionEntry[];
}

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
  { name: "Padel", center_id: 8, center_name: "FES Padel Can Dragó", duration: 60 },
  { name: "Twerk", center_id: 9, center_name: "Centre Cívic Sagrada Família", duration: 90 },
  { name: "Dirigida", center_id: 10, center_name: "Eurofitness Can Dragó", duration: 45 },
  { name: "Piscina", center_id: 10, center_name: "Eurofitness Can Dragó", duration: 45 },
  { name: "Gym", center_id: 10, center_name: "Eurofitness Can Dragó", duration: 45 },
];

export const DURATIONS = [15, 30, 45, 60, 75, 90];

export const INITIAL_STATE: CheckinFormState = {
  dizziness_intensity: "None",
  dizziness_slider: 2,
  had_vestibular: false,
  vestibular_session: null,
  had_physio: false,
  physio_session: null,
  had_activity: false,
  activity_sessions: [],
};
