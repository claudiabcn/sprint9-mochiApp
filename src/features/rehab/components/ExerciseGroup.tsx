import type { ExerciseGroup as ExerciseGroupType, CapabilityStatus } from "@/features/rehab/utils/rehabTypes";
import { ExerciseItem } from "@/features/rehab/components/ExerciseItem";

interface ExerciseGroupProps {
  group: ExerciseGroupType;
  onToggle: (exerciseId: number, status: CapabilityStatus | null) => void;
}

export function ExerciseGroup({ group, onToggle }: ExerciseGroupProps) {
  return (
    <div className="bg-white border border-[#C4A9FF]/20 rounded-2xl px-5 py-4 mb-4">
      <h3 className="text-sm font-semibold text-[#4A4A6A] mb-2">{group.class}</h3>
      {group.exercises.map((exercise) => (
        <ExerciseItem key={exercise.id} exercise={exercise} onToggle={onToggle} />
      ))}
    </div>
  );
}
