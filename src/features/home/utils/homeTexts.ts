export const HOME_TEXTS = {
  WELCOME: {
    TITLE: (name: string) => `¡Bienvenida de vuelta, ${name}! 🐰`,
    SUBTITLE: "Sigue adelante con tu rutina diaria. ¡Cada paso cuenta!",
  },
  SECTIONS: {
    STATS_TITLE: "Destacados",
    STATS_PLACEHOLDER: "📊 PENDIENTE DE HACER.",
    CHECKIN_TITLE: "Check-in Diario",
  },
  CARDS: [
    { 
      label: "Mochiterapia", 
      desc: "Tu espacio de bienestar emocional",
      icon: "🐰" 
    },
    { 
      label: "Re-evolución", 
      desc: "Observa tu progreso y mejora continua",
      icon: "🐰" 
    },
    { 
      label: "Tipos de ejercicio de rehabilitación", 
      desc: "Explora y practica tus ejercicios",
      icon: "🐰" 
    },
  ],
  CARD_ACTION: "Entrar →",
} as const;