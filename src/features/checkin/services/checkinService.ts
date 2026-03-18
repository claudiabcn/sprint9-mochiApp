import type { CheckinFormState } from "@/features/checkin/utils/checkinTypes";
import { saveDizziness } from "./dizzinessService";
import { saveSessions } from "./sessionService";

export async function saveFullCheckin(
  userId: string,
  form: CheckinFormState,
): Promise<void> {
  await saveDizziness(userId, form);
  await saveSessions(userId, form);
}
