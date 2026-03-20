import type { CheckinFormState } from "@/features/checkin/utils/checkinTypes";
import { saveDizziness } from "./dizzinessService";
import { saveSessions } from "./sessionService";

export async function saveFullCheckin(
  userId: string,
  form: CheckinFormState,
  date?: string,
): Promise<void> {
  await saveDizziness(userId, form, date);
  await saveSessions(userId, form, date);
}
