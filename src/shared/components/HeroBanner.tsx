interface HeroBannerProps {
  title: string;
  subtitle: string;
}

export function HeroBanner({ title, subtitle }: HeroBannerProps) {
  return (
    <section
      className="w-full rounded-2xl px-6 py-5 mb-6 text-white"
      style={{ background: "linear-gradient(135deg, #C4A9FF 0%, #FF9ECD 100%)" }}
    >
      <h1 className="text-lg font-bold mb-0.5">{title}</h1>
      <p className="text-white/80 text-xs">{subtitle}</p>
    </section>
  );
}
