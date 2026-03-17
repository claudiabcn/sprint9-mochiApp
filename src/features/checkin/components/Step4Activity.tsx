import { Button } from "@/shared/components/Button";
import { type CheckinFormState, type SessionEntry } from "@/features/checkin/utils/checkinTypes";
import { ACTIVITIES, DURATIONS} from "@/features/checkin/utils/checkinTexts";
import { Trash } from "lucide-react";

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
          <Button
            variant="secondary"
            size="sm"
            key={String(val)}
            onClick={() => handleToggle(val)}
            className={`flex-1 text-sm font-medium transition-all ${
              form.had_activity === val ? "bg-gradient-to-r from-[#C4A9FF] to-[#FF9ECD] text-white" : "bg-[#F5F5FF] text-[#8B8BA5]"
            }`}
          >
            {val ? "✓ Sí" : "✗ No"}
          </Button>
        ))}
      </div>

      {form.had_activity && (
        <div className="flex flex-col gap-4">
          {form.activity_sessions.map((s, i) => (
            <div key={i} className="rounded-xl bg-[#F5E6FF] p-3 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#4A4A6A]">{s.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeActivity(i)}
                  className="text-xs text-[#8B8BA5] hover:text-[#C4A9FF] hover:opacity-70"
                >
                  <Trash size={16} />
                </Button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {DURATIONS.map((d) => (
                  <Button
                    variant="secondary"
                    size="sm"
                    key={d}
                    onClick={() => updateDuration(i, d)}
                    className={`text-xs font-medium transition-all ${
                      s.duration === d ? "bg-gradient-to-r from-[#C4A9FF] to-[#FF9ECD] text-white" : "bg-[#F5F5FF] text-[#8B8BA5]"
                    }`}
                  >
                    {d}min
                  </Button>
                ))}
              </div>
            </div>
          ))}

          <div>
            <label className="text-xs font-medium text-[#4A4A6A] mb-2 block">Añadir actividad</label>
            <div className="grid grid-cols-2 gap-2">
              {ACTIVITIES.map((a) => (
                <Button
                  variant={form.activity_sessions.some(s => s.name === a.name) ? "primary" : "secondary"}
                  size="sm"
                  key={a.name}
                  onClick={() => addActivity(a.name)}
                  className={`text-xs font-medium text-left transition-all ${form.activity_sessions.some(s => s.name === a.name) ? "text-white" : "bg-[#F5F5FF] text-[#8B8BA5] hover:bg-[#EDE6FF] hover:text-[#C4A9FF]"}`}
                >
                  + {a.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
