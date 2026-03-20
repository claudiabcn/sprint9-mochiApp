import type { CheckinFormState } from "@/features/checkin/utils/checkinTypes";
import {
  sliderToIntensity,
  moodEmoji,
} from "@/features/checkin/utils/checkinUtils";
import { CHECKIN_TEXTS } from "@/features/checkin/utils/checkinTexts";

export function Step1Dizziness({
  form,
  onChange,
}: {
  form: CheckinFormState;
  onChange: any;
}) {
  const handleSlider = (value: number) => {
    onChange({
      dizziness_slider: value,
      dizziness_intensity: sliderToIntensity(value),
    });
  };

  const percentage = (form.dizziness_slider / 2) * 100;

  return (
    <div className="flex flex-col gap-6">
      {" "}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-[#8B8BA5]">
            ¿Cómo están los vértigos hoy?
          </span>
          <span className="text-2xl transition-transform duration-300 scale-110">
            {moodEmoji(form.dizziness_slider)}
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={2}
          step={1}
          value={form.dizziness_slider}
          onChange={(e) => handleSlider(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #C4A9FF ${percentage}%, #EDE6FF ${percentage}%)`,
            accentColor: "#C4A9FF",
          }}
        />

        <div className="flex justify-center mt-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C4A9FF] bg-[#C4A9FF]/10 px-4 py-1.5 rounded-full">
            {CHECKIN_TEXTS.INTENSITY_LABELS[form.dizziness_intensity]}
          </span>
        </div>
      </div>
    </div>
  );
}
