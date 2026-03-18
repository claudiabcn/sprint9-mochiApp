export type Intensity = "None" | "Low" | "High";

export type ServiceType =
  | "VestibularRehabilitation"
  | "Physiotherapy"
  | "PhysicalActivity";

export interface DizzinessRecord {
  id: number;
  user_id: string;
  date_recorded: string;
  intensity: Intensity;
}

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

export interface Center {
  id: number;
  name: string;
}

export interface CheckinStepProps {
  form: CheckinFormState;
  onChange: (patch: Partial<CheckinFormState>) => void;
}
