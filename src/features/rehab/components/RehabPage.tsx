import { MainLayout } from "@/layouts/MainLayout";
import { useRehabData } from "@/features/rehab/hooks/useRehabData";
import { useRehabPagination } from "@/features/rehab/hooks/useRehabPagination";
import { useRehabToggle } from "@/features/rehab/hooks/useRehabToggle";
import { REHAB_TEXTS } from "@/features/rehab/utils/rehabTexts";
import { ProgressBar } from "@/features/rehab/components/ProgressBar";
import { ExerciseGroup } from "@/features/rehab/components/ExerciseGroup";

export function RehabPage() {
  const { data, setData } = useRehabData();
  const { sentinelRef, hasMore } = useRehabPagination(data, setData);
  const { handleToggle } = useRehabToggle(data, setData);

  return (
    <MainLayout>
      <section
        className="w-full rounded-3xl px-8 py-7 mb-8 text-white"
        style={{ background: "linear-gradient(135deg, #C4A9FF 0%, #FF9ECD 100%)" }}
      >
        <h1 className="text-2xl font-bold mb-1">{REHAB_TEXTS.TITLE}</h1>
        <p className="text-white/80 text-sm">{REHAB_TEXTS.SUBTITLE}</p>
      </section>

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
