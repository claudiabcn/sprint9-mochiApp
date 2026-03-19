import { useEffect, useState, useCallback, useRef } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { useAuth } from "@/features/auth/context/AuthContext";
import {
  getClasses,
  getExercisesByClass,
  getTotalProgress,
  upsertCapability,
  removeCapability,
} from "@/features/rehab/services/rehabService";
import { calcProgress, groupByClass } from "@/features/rehab/utils/rehabUtils";
import { REHAB_TEXTS } from "@/features/rehab/utils/rehabTexts";
import type { ExerciseWithCapability, CapabilityStatus, ExerciseGroup } from "@/features/rehab/utils/rehabTypes";
import { ProgressBar } from "@/features/rehab/components/ProgressBar";
import { ExerciseGroup as ExerciseGroupComponent } from "@/features/rehab/components/ExerciseGroup";

interface PageState {
  exercises: ExerciseWithCapability[];
  groups: ExerciseGroup[];
  progress: number;
  total: number;
  capable: number;
  partial: number;
  classes: string[];
  loadedClassIndex: number;
  hasMore: boolean;
  loadingMore: boolean;
  error: string | null;
}

const INITIAL_STATE: PageState = {
  exercises: [],
  groups: [],
  progress: 0,
  total: 0,
  capable: 0,
  partial: 0,
  classes: [],
  loadedClassIndex: 0,
  hasMore: true,
  loadingMore: false,
  error: null,
};

export function RehabPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [pageState, setPageState] = useState<PageState>(INITIAL_STATE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!user?.id) return;

    Promise.all([getClasses(), getTotalProgress(user.id)])
      .then(async ([classes, progressData]) => {
        if (classes.length === 0) {
          setPageState((prev) => ({ ...prev, hasMore: false, classes }));
          setLoading(false);
          return;
        }

        const exercises = await getExercisesByClass(user.id!, classes[0]);

        setPageState({
          exercises,
          groups: groupByClass(exercises),
          progress: calcProgress(progressData.capable, progressData.partial, progressData.total),
          total: progressData.total,
          capable: progressData.capable,
          partial: progressData.partial,
          classes,
          loadedClassIndex: 1,
          hasMore: classes.length > 1,
          loadingMore: false,
          error: null,
        });
        setLoading(false);
      })
      .catch(() => {
        setPageState((prev) => ({ ...prev, error: REHAB_TEXTS.ERROR }));
        setLoading(false);
      });
  }, [user?.id]);

  const loadNextClass = useCallback(async () => {
    if (!user?.id || !pageState.hasMore || pageState.loadingMore) return;

    setPageState((prev) => ({ ...prev, loadingMore: true }));

    try {
      const nextClass = pageState.classes[pageState.loadedClassIndex];
      const newExercises = await getExercisesByClass(user.id!, nextClass);
      const allExercises = [...pageState.exercises, ...newExercises];
      const nextIndex = pageState.loadedClassIndex + 1;

      setPageState((prev) => ({
        ...prev,
        exercises: allExercises,
        groups: groupByClass(allExercises),
        loadedClassIndex: nextIndex,
        hasMore: nextIndex < prev.classes.length,
        loadingMore: false,
      }));
    } catch {
      setPageState((prev) => ({
        ...prev,
        loadingMore: false,
        error: REHAB_TEXTS.ERROR,
      }));
    }
  }, [user?.id, pageState]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadNextClass();
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadNextClass]);

  const handleToggle = useCallback(
    async (exerciseId: number, status: CapabilityStatus | null) => {
      if (!user?.id) return;

      setPageState((prev) => {
        const prevExercise = prev.exercises.find((ex) => ex.id === exerciseId);
        const prevStatus = prevExercise?.capability_status ?? null;

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
        setPageState((prev) => ({ ...prev, error: REHAB_TEXTS.SAVING_ERROR }));
      }
    },
    [user?.id],
  );

  return (
    <MainLayout>
      <section
        className="w-full rounded-3xl px-8 py-7 mb-8 text-white"
        style={{ background: "linear-gradient(135deg, #C4A9FF 0%, #FF9ECD 100%)" }}
      >
        <h1 className="text-2xl font-bold mb-1">{REHAB_TEXTS.TITLE}</h1>
        <p className="text-white/80 text-sm">{REHAB_TEXTS.SUBTITLE}</p>
      </section>

      {loading && (
        <div className="flex flex-col gap-4 animate-pulse">
          <div className="h-16 rounded-2xl bg-[#F5E6FF]" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 rounded-2xl bg-[#F5E6FF]" />
          ))}
        </div>
      )}

      {!loading && (
        <>
          <ProgressBar progress={pageState.progress} />

          {pageState.error && (
            <p className="text-sm text-[#8B8BA5] text-center mb-4">{pageState.error}</p>
          )}

          {pageState.groups.map((group) => (
            <ExerciseGroupComponent key={group.class} group={group} onToggle={handleToggle} />
          ))}

          <div ref={sentinelRef} className="h-8" />

          {pageState.loadingMore && (
            <div className="flex flex-col gap-3 animate-pulse mt-2">
              <div className="h-32 rounded-2xl bg-[#F5E6FF]" />
            </div>
          )}
        </>
      )}
    </MainLayout>
  );
}