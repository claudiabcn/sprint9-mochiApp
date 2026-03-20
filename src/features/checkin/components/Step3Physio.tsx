import {
  PHYSIO_CENTERS,
  DURATIONS,
} from "@/features/checkin/utils/checkinTexts";
import type { CheckinStepProps } from "@/features/checkin/utils/checkinTypes";
import { getActiveButtonClass } from "@/features/checkin/utils/checkinUtils";
import { Button } from "@/shared/components/Button";



export function Step3Physio({ form, onChange }: CheckinStepProps) {
  const session = form.physio_session;

  const handleToggle = (yes: boolean) => {
    onChange({
      had_physio: yes,
      physio_session: yes
        ? {
            service_type: "Physiotherapy",
            name: "Fisioterapia",
            center_id: PHYSIO_CENTERS[0].id,
            duration: PHYSIO_CENTERS[0].duration,
            attended: true,
          }
        : null,
    });
  };

  const handleCenter = (centerId: number) => {
    const center = PHYSIO_CENTERS.find((c) => c.id === centerId)!;
    onChange({
      physio_session: {
        ...session!,
        center_id: center.id,
        duration: center.duration,
      },
    });
  };

  const handleDuration = (duration: number) => {
    onChange({ physio_session: { ...session!, duration } });
  };

return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-[#8B8BA5]">¿Has ido a fisioterapia hoy?</p>

      {/* TAMAÑO MD: La pregunta principal */}
      <div className="flex gap-3">
        {[true, false].map((val) => (
          <Button
            variant="secondary"
            size="md"
            key={String(val)}
            onClick={() => handleToggle(val)}
            className={`flex-1 text-md font-medium transition-all ${getActiveButtonClass(form.had_physio === val)}`}
          >
            {val ? "✓ Sí" : "✗ No"}
          </Button>
        ))}
      </div>

      {form.had_physio && session && (
        <div className="flex flex-col gap-4 pt-1">
          <div>
            <label className="text-sm font-medium text-[#4A4A6A] mb-2 block">
              Centro
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PHYSIO_CENTERS.map((c) => (
                <Button
                  variant={session.center_id === c.id ? "primary" : "secondary"}
                  size="sm" // TAMAÑO SM: Centros (equilibrio entre legibilidad y espacio)
                  key={c.id}
                  onClick={() => handleCenter(c.id)}
                  className={`text-sm font-medium transition-all ${getActiveButtonClass(session.center_id === c.id)}`}
                >
                  {c.name}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-[#4A4A6A] mb-2 block">
              Duración
            </label>
            <div className="flex flex-wrap gap-1.5">
              {DURATIONS.map((d) => (
                <Button
                  variant="secondary"
                  size="sm" // TAMAÑO XS: Para que los minutos no saturen la vista
                  key={d}
                  onClick={() => handleDuration(d)}
                  className={`text-xs font-medium transition-all ${getActiveButtonClass(session.duration === d)}`}
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
