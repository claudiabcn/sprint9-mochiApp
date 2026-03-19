import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { getClasses, getExercisesByClass, getTotalProgress } from "@/features/rehab/services/rehabService";
import { calcProgress, groupByClass } from "@/features/rehab/utils/rehabUtils";
import { REHAB_TEXTS } from "@/features/rehab/utils/rehabTexts";
import type { ExerciseWithCapability, ExerciseGroup } from "@/features/rehab/utils/rehabTypes";

export interface RehabData {
  exercises: ExerciseWithCapability[];
  groups: ExerciseGroup[];
  progress: number;
  total: number;
  capable: number;
  partial: number;
  classes: string[];
  loadedClassIndex: number;
  loading: boolean;
  error: string | null;
}

const INITIAL: RehabData = {
  exercises: [],
  groups: [],
  progress: 0,
  total: 0,
  capable: 0,
  partial: 0,
  classes: [],
  loadedClassIndex: 0,
  loading: true,
  error: null,
};

export function useRehabData() {
  const { user } = useAuth();
  const [data, setData] = useState<RehabData>(INITIAL);

  useEffect(() => {
    if (!user?.id) return;

    Promise.all([getClasses(), getTotalProgress(user.id)])
      .then(async ([classes, progressData]) => {
        if (classes.length === 0) {
          setData((prev) => ({ ...prev, classes, loading: false }));
          return;
        }

        const exercises = await getExercisesByClass(user.id!, classes[0]);

        setData({
          exercises,
          groups: groupByClass(exercises),
          progress: calcProgress(progressData.capable, progressData.partial, progressData.total),
          total: progressData.total,
          capable: progressData.capable,
          partial: progressData.partial,
          classes,
          loadedClassIndex: 1,
          loading: false,
          error: null,
        });
      })
      .catch(() =>
        setData((prev) => ({ ...prev, loading: false, error: REHAB_TEXTS.ERROR })),
      );
  }, [user?.id]);

  return { data, setData };
}
