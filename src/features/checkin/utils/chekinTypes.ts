export type Intensity = "None" | "Low" | "High";

export interface DizzinessRecord {
  id: number;
  user_id: string;
  date_recorded: string;
  intensity: Intensity;
}