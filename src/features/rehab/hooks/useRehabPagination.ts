import { useEffect, useRef, useCallback } from "react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { getExercisesByClass } from "@/features/rehab/services/rehabService";
import { groupByClass } from "@/features/rehab/utils/rehabUtils";
import { REHAB_TEXTS } from "@/features/rehab/utils/rehabTexts";
import type { RehabData } from "@/features/rehab/hooks/useRehabData";

export function useRehabPagination(
  data: RehabData,
  setData: React.Dispatch<React.SetStateAction<RehabData>>,
) {
  const { user } = useAuth();
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const hasMore = data.loadedClassIndex < data.classes.length;

  const loadNextClass = useCallback(async () => {
    if (!user?.id || !hasMore) return;

    setData((prev) => ({ ...prev, loadingMore: true } as RehabData));

    try {
      const nextClass = data.classes[data.loadedClassIndex];
      const newExercises = await getExercisesByClass(user.id!, nextClass);
      const allExercises = [...data.exercises, ...newExercises];
      const nextIndex = data.loadedClassIndex + 1;

      setData((prev) => ({
        ...prev,
        exercises: allExercises,
        groups: groupByClass(allExercises),
        loadedClassIndex: nextIndex,
        error: null,
      }));
    } catch {
      setData((prev) => ({ ...prev, error: REHAB_TEXTS.ERROR }));
    }
  }, [user?.id, data, hasMore, setData]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) loadNextClass(); },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadNextClass]);

  return { sentinelRef, hasMore };
}
