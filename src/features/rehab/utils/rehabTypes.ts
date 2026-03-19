export type CapabilityStatus = "Capable" | "Partially capable" | "Incapable";

export interface VestibularExercise {
  id: number;
  name: string;
  class: string;
  description: string;
}

export interface UserCapability {
  id: number;
  user_id: string;
  vestibular_exercise_id: number;
  level: number;
  capability_status: CapabilityStatus;
  updated_at: string;
}

export interface ExerciseWithCapability extends VestibularExercise {
  capability_status: CapabilityStatus | null;
}

export interface ExerciseGroup {
  class: string;
  exercises: ExerciseWithCapability[];
}
