import type { ExerciseWithCapability, CapabilityStatus } from "@/features/rehab/utils/rehabTypes";

interface ExerciseItemProps {
  exercise: ExerciseWithCapability;
  onToggle: (exerciseId: number, status: CapabilityStatus | null) => void;
}

export function ExerciseItem({ exercise, onToggle }: ExerciseItemProps) {
  const status = exercise.capability_status;

  const handlePress = (pressed: CapabilityStatus) => {
    onToggle(exercise.id, status === pressed ? null : pressed);
  };

  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-[#C4A9FF]/10 last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#4A4A6A]">{exercise.name}</p>
        {exercise.description && (
          <p className="text-xs text-[#8B8BA5] mt-0.5 line-clamp-2">{exercise.description}</p>
        )}
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => handlePress("Partially capable")}
          className="text-lg hover:scale-110 transition-transform"
          style={{ opacity: status === "Partially capable" ? 1 : 0.25 }}
          aria-label="Parcialmente capaz"
        >
          🌱
        </button>
        <button
          onClick={() => handlePress("Capable")}
          className="text-lg hover:scale-110 transition-transform"
          style={{ opacity: status === "Capable" ? 1 : 0.25 }}
          aria-label="Capaz"
        >
          🐰
        </button>
      </div>
    </div>
  );
}