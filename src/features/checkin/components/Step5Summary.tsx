import { intensityLabel } from "../services/checkinService";
import type { CheckinFormState } from "../../../utils/checkinTypes";
import { VESTIBULAR_CENTERS, PHYSIO_CENTERS } from "../../../utils/checkinTypes";

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
    ? VESTIBULAR_CENTERS.find((c) => c.id === form.vestibular_session!.center_id)?.name
    : null;

  const physioCenter = form.physio_session
    ? PHYSIO_CENTERS.find((c) => c.id === form.physio_session!.center_id)?.name
    : null;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-[#8B8BA5] mb-1">Revisa tu check-in antes de guardar</p>

      <div className="rounded-2xl bg-[#FAFAFF] border border-[#C4A9FF]/20 px-4 py-2">
        <Row label="Vértigos" value={`${intensityLabel(form.dizziness_intensity)}`} />
        <Row
          label="Rehabilitación vestibular"
          value={form.had_vestibular && vestibularCenter
            ? `${vestibularCenter} · ${form.vestibular_session!.duration} min`
            : "No"}
        />
        <Row
          label="Fisioterapia"
          value={form.had_physio && physioCenter
            ? `${physioCenter} · ${form.physio_session!.duration} min`
            : "No"}
        />
        <Row
          label="Actividad física"
          value={form.had_activity && form.activity_sessions.length > 0
            ? form.activity_sessions.map((s) => `${s.name} ${s.duration}min`).join(", ")
            : "No"}
        />
      </div>
    </div>
  );
}
