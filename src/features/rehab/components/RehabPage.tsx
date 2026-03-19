import { MainLayout } from "@/layouts/MainLayout";
import { useRehabData } from "@/features/rehab/hooks/useRehabData";
import { useRehabPagination } from "@/features/rehab/hooks/useRehabPagination";
import { useRehabToggle } from "@/features/rehab/hooks/useRehabToggle";
import { REHAB_TEXTS } from "@/features/rehab/utils/rehabTexts";
import { HeroBanner } from "@/shared/components/HeroBanner";
import { ProgressBar } from "@/features/rehab/components/ProgressBar";
import { ExerciseGroup } from "@/features/rehab/components/ExerciseGroup";

export function RehabPage() {
  const { data, setData } = useRehabData();
  const { sentinelRef, hasMore } = useRehabPagination(data, setData);
  const { handleToggle } = useRehabToggle(data, setData);

  return (
    <MainLayout>
      <HeroBanner title={REHAB_TEXTS.TITLE} subtitle={REHAB_TEXTS.SUBTITLE} />

      {data.loading && (
        <div className="flex flex-col gap-4 animate-pulse">
          <div className="h-16 rounded-2xl bg-[#F5E6FF]" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 rounded-2xl bg-[#F5E6FF]" />
          ))}
        </div>
      )}

      {!data.loading && (
        <>
          <ProgressBar progress={data.progress} />

          {data.error && (
            <p className="text-sm text-[#8B8BA5] text-center mb-4">{data.error}</p>
          )}

          {data.groups.map((group) => (
            <ExerciseGroup key={group.class} group={group} onToggle={handleToggle} />
          ))}

          {hasMore && <div ref={sentinelRef} className="h-8" />}
        </>
      )}
    </MainLayout>
  );
}
