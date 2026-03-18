import { useEffect, useState, useRef, useCallback } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { getAllPhrases } from "@/features/mochiterapia/services/mochiterapiaService";
import { shuffle } from "@/features/mochiterapia/utils/mochiterapiaUtils";
import { MOCHITERAPIA_TEXTS, MOCHI_PHOTOS } from "@/features/mochiterapia/utils/mochiterapiaTexts";

type PageState =
  | { status: "loading" }
  | { status: "ready"; phrases: string[]; photos: string[]; index: number }
  | { status: "error"; message: string };

export function MochiterapiaPage() {
  const [state, setState] = useState<PageState>({ status: "loading" });
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    getAllPhrases()
      .then((phrases) => {
        setState({
          status: "ready",
          phrases: shuffle(phrases),
          photos: shuffle([...MOCHI_PHOTOS]),
          index: 0,
        });
      })
      .catch(() =>
        setState({ status: "error", message: MOCHITERAPIA_TEXTS.ERROR }),
      );
  }, []);

  const goTo = useCallback((delta: number) => {
    setState((prev) => {
      if (prev.status !== "ready") return prev;
      const total = Math.max(prev.phrases.length, prev.photos.length);
      const next = (prev.index + delta + total) % total;
      return { ...prev, index: next };
    });
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const currentPhrase = state.status === "ready"
    ? state.phrases[state.index % state.phrases.length]
    : "";
  const currentPhoto = state.status === "ready"
    ? state.photos[state.index % state.photos.length]
    : "";

  return (
    <MainLayout>
      <section
        className="w-full rounded-3xl px-8 py-7 mb-8 text-white"
        style={{ background: "linear-gradient(135deg, #C4A9FF 0%, #FF9ECD 100%)" }}
      >
        <h1 className="text-2xl font-bold mb-1">{MOCHITERAPIA_TEXTS.TITLE}</h1>
        <p className="text-white/80 text-sm">{MOCHITERAPIA_TEXTS.SUBTITLE}</p>
      </section>

      {state.status === "loading" && (
        <div className="w-full max-w-sm mx-auto animate-pulse flex flex-col gap-4">
          <div className="w-full aspect-square rounded-3xl bg-[#F5E6FF]" />
          <div className="h-4 w-3/4 rounded bg-[#F5E6FF] mx-auto" />
          <div className="h-4 w-1/2 rounded bg-[#F5E6FF] mx-auto" />
        </div>
      )}

      {state.status === "error" && (
        <p className="text-sm text-[#8B8BA5] text-center">{state.message}</p>
      )}

      {state.status === "ready" && (
        <div className="flex items-center gap-3 w-full max-w-sm mx-auto">
          <button
            onClick={() => goTo(-1)}
            aria-label={MOCHITERAPIA_TEXTS.PREV}
            className="hidden sm:flex w-10 h-10 rounded-full border border-[#C4A9FF]/30 items-center justify-center text-[#C4A9FF] hover:bg-[#F5E6FF] transition-colors flex-shrink-0"
          >
            ←
          </button>

          <div
            className="flex-1 flex flex-col items-center gap-5"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="w-full rounded-3xl overflow-hidden border border-[#C4A9FF]/20 shadow-sm">
              <img
                src={currentPhoto}
                alt={MOCHITERAPIA_TEXTS.ALT}
                className="w-full aspect-square object-cover"
              />
            </div>
            <p className="text-center text-[#4A4A6A] text-base font-medium leading-relaxed px-2">
              "{currentPhrase}"
            </p>
          </div>

          <button
            onClick={() => goTo(1)}
            aria-label={MOCHITERAPIA_TEXTS.NEXT}
            className="hidden sm:flex w-10 h-10 rounded-full border border-[#C4A9FF]/30 items-center justify-center text-[#C4A9FF] hover:bg-[#F5E6FF] transition-colors flex-shrink-0"
          >
            →
          </button>
        </div>
      )}
    </MainLayout>
  );
}
