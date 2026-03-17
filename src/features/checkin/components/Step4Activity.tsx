import { type CheckinFormState, type SessionEntry } from "../utils/checkinTypes";
import { ACTIVITIES, DURATIONS} from "../utils/checkinTexts";

interface Props {
  form: CheckinFormState;
  onChange: (patch: Partial<CheckinFormState>) => void;
}

export function Step4Activity({ form, onChange }: Props) {
  const handleToggle = (yes: boolean) => {
    onChange({ had_activity: yes, activity_sessions: yes ? [] : [] });
  };

  const addActivity = (activityName: string) => {
    const activity = ACTIVITIES.find((a) => a.name === activityName)!;
    const newSession: SessionEntry = {
      service_type: "PhysicalActivity",
      name: activity.name,
      center_id: activity.center_id,
      duration: activity.duration,
      attended: true,
    };
    onChange({ activity_sessions: [...form.activity_sessions, newSession] });
  };

  const removeActivity = (index: number) => {
    onChange({ activity_sessions: form.activity_sessions.filter((_, i) => i !== index) });
  };

  const updateDuration = (index: number, duration: number) => {
    const updated = form.activity_sessions.map((s, i) => i === index ? { ...s, duration } : s);
    onChange({ activity_sessions: updated });
  };

  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-[#8B8BA5]">¿Has hecho alguna actividad física hoy?</p>

      <div className="flex gap-3">
        {[true, false].map((val) => (
          <button
            key={String(val)}
            onClick={() => handleToggle(val)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
              form.had_activity === val ? "text-white shadow-sm" : "bg-[#F5F5FF] text-[#8B8BA5]"
            }`}
            style={form.had_activity === val ? { background: "linear-gradient(90deg, #C4A9FF, #FF9ECD)" } : {}}
          >
            {val ? "✓ Sí" : "✗ No"}
          </button>
        ))}
      </div>

      {form.had_activity && (
        <div className="flex flex-col gap-4">
          {form.activity_sessions.map((s, i) => (
            <div key={i} className="rounded-xl bg-[#F5E6FF] p-3 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#4A4A6A]">{s.name}</span>
                <button onClick={() => removeActivity(i)} className="text-xs text-[#FF6B9D] hover:opacity-70">
                  Quitar
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {DURATIONS.map((d) => (
                  <button
                    key={d}
                    onClick={() => updateDuration(i, d)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      s.duration === d ? "text-white" : "bg-white text-[#8B8BA5]"
                    }`}
                    style={s.duration === d ? { background: "linear-gradient(90deg, #C4A9FF, #FF9ECD)" } : {}}
                  >
                    {d}min
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div>
            <label className="text-xs font-medium text-[#4A4A6A] mb-2 block">Añadir actividad</label>
            <div className="grid grid-cols-2 gap-2">
              {ACTIVITIES.map((a) => (
                <button
                  key={a.name}
                  onClick={() => addActivity(a.name)}
                  className="py-2 px-3 rounded-xl text-xs font-medium text-left bg-[#F5F5FF] text-[#8B8BA5] hover:bg-[#EDE6FF] hover:text-[#C4A9FF] transition-all"
                >
                  + {a.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
