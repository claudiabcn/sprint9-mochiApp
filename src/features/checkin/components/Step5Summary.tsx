import {
  VESTIBULAR_CENTERS,
  PHYSIO_CENTERS,
  CHECKIN_TEXTS,
} from "@/features/checkin/utils/checkinTexts";
import type { CheckinFormState } from "@/features/checkin/utils/checkinTypes";
import {
  formatSessionSummary,
  formatActivitySummary,
} from "@/features/checkin/utils/checkinUtils";

interface Props {
  form: CheckinFormState;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-[#C4A9FF]/10 last:border-0">
      <span className="text-xs text-[#8B8BA5]">{label}</span>
      <span className="text-xs font-semibold text-[#4A4A6A]">{value}</span>
    </div>
  );
}

export function Step5Summary({ form }: Props) {
  const vestibularCenter = form.vestibular_session
    ? VESTIBULAR_CENTERS.find(
        (c) => c.id === form.vestibular_session!.center_id,
      )?.name
    : null;

  const physioCenter = form.physio_session
    ? PHYSIO_CENTERS.find((c) => c.id === form.physio_session!.center_id)?.name
    : null;

  const [dizziness, vestibular, physio, activity] = CHECKIN_TEXTS.STEP_TITLES;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-[#8B8BA5] mb-1">
        Revisa tu check-in antes de guardar
      </p>

      <div className="rounded-2xl bg-[#FAFAFF] border border-[#C4A9FF]/20 px-4 py-2">
        <Row
          label={dizziness}
          value={CHECKIN_TEXTS.INTENSITY_LABELS[form.dizziness_intensity]}
        />
        <Row
          label={vestibular}
          value={formatSessionSummary(
            vestibularCenter,
            form.vestibular_session?.duration,
          )}
        />
        <Row
          label={physio}
          value={formatSessionSummary(
            physioCenter,
            form.physio_session?.duration,
          )}
        />
        <Row
          label={activity}
          value={formatActivitySummary(form.activity_sessions)}
        />
      </div>
    </div>
  );
}
