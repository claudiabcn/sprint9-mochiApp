import { useAuth } from "@/features/auth/context/AuthContext";

export function Home() {
  const { signOut, user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF5FA]">
      <div className="bg-white p-10 rounded-3xl shadow-xl text-center border border-[#FFD6E8]">
        <h1 className="text-3xl font-bold text-[#C4A9FF] mb-2">¡Hola! 👋</h1>
        <button onClick={() => signOut()} className="px-6 py-2 bg-[#FF9ECD] text-white rounded-2xl font-semibold">
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}