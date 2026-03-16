import { LAYOUT_TEXTS } from "./utils/layoutsTexts";

export function Footer() {
  const { FOOTER } = LAYOUT_TEXTS;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[#C4A9FF]/20 bg-white/60 mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <p className="text-xs text-[#8B8BA5]">
          {FOOTER.COPYRIGHT(currentYear)}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a 
            href={FOOTER.INSTAGRAM_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium text-[#C4A9FF] hover:text-[#8B8BA5] transition-colors group"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="group-hover:scale-110 transition-transform"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span>{FOOTER.INSTAGRAM_HANDLE}</span>
          </a>

          {/* Texto para desktop */}
          <p className="text-xs text-[#C4A9FF]/60 border-l border-[#C4A9FF]/20 pl-4 hidden sm:block">
            {FOOTER.ACADEMY}
          </p>
          {/* Texto para móvil */}
          <p className="text-xs text-[#C4A9FF]/60 sm:hidden">
            {FOOTER.ACADEMY}
          </p>
        </div>

      </div>
    </footer>
  );
}