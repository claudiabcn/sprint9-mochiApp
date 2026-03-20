import { useCheckinContext } from "@/features/checkin/context/CheckinContext";
import { Button } from "@/shared/components/Button";

function formatDateDisplay(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function MissingCheckinsModal({ onClose }: { onClose: () => void }) {
  const { missingDates, open } = useCheckinContext();

  const handleSelect = (date: string) => {
    onClose();
    open(date);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(74,74,106,0.3)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-6 w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-base font-bold text-[#4A4A6A] mb-1">
          Check-ins pendientes
        </h2>
        <p className="text-xs text-[#8B8BA5] mb-5">
          Selecciona un día para completarlo
        </p>

        <div className="flex flex-col gap-2">
          {missingDates.map((date) => (
            <Button
              key={date}
              variant="outline"
              size="md"
              onClick={() => handleSelect(date)}
              className="capitalize"
            >
              {formatDateDisplay(date)}
            </Button>
          ))}
        </div>

        <Button
          variant="ghost"
          size="md"
          onClick={onClose}
          className="mt-5 w-full"
        >
          Cerrar
        </Button>
      </div>
    </div>
  );
}
