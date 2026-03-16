import { Header } from "@/layouts/Header";
import { Footer } from "@/layouts/Footer";
import { MainLayoutProps } from "./utils/layoutsTypes";

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5FA]">
      <Header />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}