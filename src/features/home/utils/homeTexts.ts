export const HOME_TEXTS = {
  WELCOME: {
    TITLE: (name: string) => `¡Bienvenida de vuelta, ${name}! 🐰`,
    SUBTITLE: "Sigue adelante con tu rutina diaria. ¡Cada paso cuenta!",
  },
  SECTIONS: {
    STATS_TITLE: "Destacados",
    CHECKIN_TITLE: "Check-in Diario",
  },
  CARDS: [
    {
      label: "Mochiterapia",
      desc: "Tu espacio de bienestar emocional",
      icon: "🐰",
    },
    {
      label: "Re-evolución",
      desc: "Observa tu progreso y mejora continua",
      icon: "🐰",
    },
    {
      label: "Tipos de ejercicio de rehabilitación",
      desc: "Explora y practica tus ejercicios",
      icon: "🐰",
    },
  ],
  CARD_ACTION: "Entrar →",
} as const;

export const HIGHLIGHTS_TEXTS = {
  STRETCHING_DAYS: "en racha estirando",
  VESTIBULAR_DAYS: "en racha rehabilitación vestibular",
  DIZZINESS_FREE_DAYS: "en racha sin vértigos",
  AVG_EXERCISE: "media ejercicio diario",
  UNIT_DAYS: "días",
  UNIT_MIN: "min",
  ERROR: "No se pudieron cargar los destacados.",
} as const;
