import { useCallback } from "react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { upsertCapability, removeCapability } from "@/features/rehab/services/rehabService";
import { calcProgress, groupByClass } from "@/features/rehab/utils/rehabUtils";
import { REHAB_TEXTS } from "@/features/rehab/utils/rehabTexts";
import type { CapabilityStatus } from "@/features/rehab/utils/rehabTypes";
import type { RehabData } from "@/features/rehab/hooks/useRehabData";

export function useRehabToggle(
  data: RehabData,
  setData: React.Dispatch<React.SetStateAction<RehabData>>,
) {
  const { user } = useAuth();

  const handleToggle = useCallback(
    async (exerciseId: number, status: CapabilityStatus | null) => {
      if (!user?.id) return;

      setData((prev) => {
        const prevStatus = prev.exercises.find((ex) => ex.id === exerciseId)?.capability_status ?? null;

        const capable =
          prev.capable +
          (status === "Capable" ? 1 : 0) -
          (prevStatus === "Capable" ? 1 : 0);
        const partial =
          prev.partial +
          (status === "Partially capable" ? 1 : 0) -
          (prevStatus === "Partially capable" ? 1 : 0);

        const updatedExercises = prev.exercises.map((ex) =>
          ex.id === exerciseId ? { ...ex, capability_status: status } : ex,
        );

        return {
          ...prev,
          exercises: updatedExercises,
          groups: groupByClass(updatedExercises),
          capable,
          partial,
          progress: calcProgress(capable, partial, prev.total),
        };
      });

      try {
        if (status === null) {
          await removeCapability(user.id, exerciseId);
        } else {
          await upsertCapability(user.id, exerciseId, status);
        }
      } catch {
        setData((prev) => ({ ...prev, error: REHAB_TEXTS.SAVING_ERROR }));
      }
    },
    [user?.id, setData],
  );

  return { handleToggle };
}
