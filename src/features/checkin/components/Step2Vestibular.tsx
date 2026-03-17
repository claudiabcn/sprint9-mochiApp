import { VESTIBULAR_CENTERS, DURATIONS } from "@/features/checkin/utils/checkinTexts";
import { type CheckinFormState } from "@/features/checkin/utils/checkinTypes";
import { Button } from "@/shared/components/Button";

interface Props {
  form: CheckinFormState;
  onChange: (patch: Partial<CheckinFormState>) => void;
}

export function Step2Vestibular({ form, onChange }: Props) {
  const session = form.vestibular_session;

  const handleToggle = (yes: boolean) => {
    onChange({
      had_vestibular: yes,
      vestibular_session: yes
        ? { service_type: "VestibularRehabilitation", name: "Rehabilitación vestibular", center_id: VESTIBULAR_CENTERS[0].id, duration: VESTIBULAR_CENTERS[0].duration, attended: true }
        : null,
    });
  };

  const handleCenter = (centerId: number) => {
    const center = VESTIBULAR_CENTERS.find((c) => c.id === centerId)!;
    onChange({ vestibular_session: { ...session!, center_id: center.id, duration: center.duration } });
  };

  const handleDuration = (duration: number) => {
    onChange({ vestibular_session: { ...session!, duration } });
  };

  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-[#8B8BA5]">¿Has hecho rehabilitación vestibular hoy?</p>

      <div className="flex gap-3">
        {[true, false].map((val) => (
          <Button
            variant="secondary"
            size="sm"
            key={String(val)}
            onClick={() => handleToggle(val)}
            className={`flex-1 text-sm font-medium transition-all ${
              form.had_vestibular === val ? "bg-gradient-to-r from-[#C4A9FF] to-[#FF9ECD] text-white" : "bg-[#F5F5FF] text-[#8B8BA5]"
            }`}
          >
            {val ? "✓ Sí" : "✗ No"}
          </Button>
        ))}
      </div>

      {form.had_vestibular && session && (
        <div className="flex flex-col gap-4 pt-1">
          <div>
            <label className="text-xs font-medium text-[#4A4A6A] mb-2 block">Centro</label>
            <div className="grid grid-cols-2 gap-2">
              {VESTIBULAR_CENTERS.map((c) => (
                <Button
                  variant={session.center_id === c.id ? "primary" : "secondary"}
                  size="sm"
                  key={c.id}
                  onClick={() => handleCenter(c.id)}
                  className={`text-xs font-medium text-left transition-all ${session.center_id === c.id ? "text-white" : "bg-[#F5F5FF] text-[#8B8BA5] border border-transparent"}`}
                >
                  {c.name}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-[#4A4A6A] mb-2 block">Duración</label>
            <div className="flex flex-wrap gap-2">
              {DURATIONS.map((d) => (
                <Button
                  variant="secondary"
                  size="sm"
                  key={d}
                  onClick={() => handleDuration(d)}
                  className={`text-xs font-medium transition-all ${
                    session.duration === d ? "bg-gradient-to-r from-[#C4A9FF] to-[#FF9ECD] text-white" : "bg-[#F5F5FF] text-[#8B8BA5]"
                  }`}
                >
                  {d} min
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
