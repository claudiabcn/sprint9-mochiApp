import { sliderToIntensity, intensityLabel } from "../services/checkinService";
import type { CheckinFormState } from "../../../utils/checkinTypes";

interface Props {
  form: CheckinFormState;
  onChange: (patch: Partial<CheckinFormState>) => void;
}

function moodEmoji(value: number) {
  if (value <= 3) return "😊";
  if (value <= 6) return "😐";
  return "😣";
}

export function Step1Dizziness({ form, onChange }: Props) {
  const handleSlider = (value: number) => {
    onChange({ dizziness_slider: value, dizziness_intensity: sliderToIntensity(value) });
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-[#4A4A6A]">¿Cómo están los vértigos hoy?</span>
          <span className="text-2xl">{moodEmoji(form.dizziness_slider)}</span>
        </div>
        <input
          type="range" min={1} max={10}
          value={form.dizziness_slider}
          onChange={(e) => handleSlider(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #C4A9FF ${(form.dizziness_slider - 1) * 11.11}%, #EDE6FF ${(form.dizziness_slider - 1) * 11.11}%)`,
            accentColor: "#C4A9FF",
          }}
        />
        <div className="flex justify-between mt-2 text-xs text-[#8B8BA5]">
          <span>Ninguno</span>
          <span className="font-semibold text-[#C4A9FF]">
            {form.dizziness_slider}/10 · {intensityLabel(form.dizziness_intensity)}
          </span>
          <span>Muchos</span>
        </div>
      </div>
    </div>
  );
}
