import { PHYSIO_CENTERS, DURATIONS, type CheckinFormState } from "../../../utils/checkinTypes";

interface Props {
  form: CheckinFormState;
  onChange: (patch: Partial<CheckinFormState>) => void;
}

export function Step3Physio({ form, onChange }: Props) {
  const session = form.physio_session;

  const handleToggle = (yes: boolean) => {
    onChange({
      had_physio: yes,
      physio_session: yes
        ? { service_type: "Physiotherapy", name: "Fisioterapia", center_id: PHYSIO_CENTERS[0].id, duration: PHYSIO_CENTERS[0].duration, attended: true }
        : null,
    });
  };

  const handleCenter = (centerId: number) => {
    const center = PHYSIO_CENTERS.find((c) => c.id === centerId)!;
    onChange({ physio_session: { ...session!, center_id: center.id, duration: center.duration } });
  };

  const handleDuration = (duration: number) => {
    onChange({ physio_session: { ...session!, duration } });
  };

  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-[#8B8BA5]">¿Has ido a fisioterapia hoy?</p>

      <div className="flex gap-3">
        {[true, false].map((val) => (
          <button
            key={String(val)}
            onClick={() => handleToggle(val)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
              form.had_physio === val ? "text-white shadow-sm" : "bg-[#F5F5FF] text-[#8B8BA5]"
            }`}
            style={form.had_physio === val ? { background: "linear-gradient(90deg, #C4A9FF, #FF9ECD)" } : {}}
          >
            {val ? "✓ Sí" : "✗ No"}
          </button>
        ))}
      </div>

      {form.had_physio && session && (
        <div className="flex flex-col gap-4 pt-1">
          <div>
            <label className="text-xs font-medium text-[#4A4A6A] mb-2 block">Centro</label>
            <div className="grid grid-cols-2 gap-2">
              {PHYSIO_CENTERS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleCenter(c.id)}
                  className={`py-2 px-3 rounded-xl text-xs font-medium text-left transition-all ${
                    session.center_id === c.id
                      ? "bg-[#EDE6FF] text-[#C4A9FF] border border-[#C4A9FF]/40"
                      : "bg-[#F5F5FF] text-[#8B8BA5] border border-transparent"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-[#4A4A6A] mb-2 block">Duración</label>
            <div className="flex flex-wrap gap-2">
              {DURATIONS.map((d) => (
                <button
                  key={d}
                  onClick={() => handleDuration(d)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    session.duration === d ? "text-white" : "bg-[#F5F5FF] text-[#8B8BA5]"
                  }`}
                  style={session.duration === d ? { background: "linear-gradient(90deg, #C4A9FF, #FF9ECD)" } : {}}
                >
                  {d} min
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
