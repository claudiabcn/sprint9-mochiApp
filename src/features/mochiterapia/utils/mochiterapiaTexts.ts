export const MOCHITERAPIA_TEXTS = {
  TITLE: "Mochiterapia 🐰",
  SUBTITLE: "Un momento de calma con Mochi",
  NEXT: "Siguiente",
  PREV: "Anterior",
  ERROR: "No se pudieron cargar las frases.",
  ALT: "Foto de Mochi",
} as const;

export const MOCHI_PHOTOS = Array.from(
  { length: 37 },
  (_, i) => `/Mochi/Mochi (${i + 1}).jpg`,
);
