export function Footer() {
  return (
    <footer className="w-full border-t border-[#C4A9FF]/20 bg-white/60 backdrop-blur-sm mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-[#8B8BA5]">
          © {new Date().getFullYear()} mochiApp · Tu camino a la recuperación 🐰
        </p>
        <p className="text-xs text-[#C4A9FF]/60">
          Hecho con cariño
        </p>
      </div>
    </footer>
  );
}
