import { REHAB_TEXTS } from "@/features/rehab/utils/rehabTexts";

interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="bg-white border border-[#C4A9FF]/20 rounded-2xl p-5 mb-6">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-medium text-[#4A4A6A]">{REHAB_TEXTS.PROGRESS_LABEL}</span>
        <span className="text-sm font-bold text-[#C4A9FF]">{progress}%</span>
      </div>
      <div className="h-3 rounded-full bg-[#F5F0FF] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, background: "linear-gradient(90deg, #C4A9FF, #FF9ECD)" }}
        />
      </div>
    </div>
  );
}
