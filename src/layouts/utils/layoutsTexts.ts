export const LAYOUT_TEXTS = {
  HEADER: {
    APP_NAME: "mochiApp",
    GREETING: (name: string) => `¡Hola ${name}🐰!`,
    LOGOUT_TOOLTIP: "Cerrar sesión",
  }, 
  FOOTER: {
    COPYRIGHT: (year: number) => `© ${year} mochiApp · Recuperándome en 3, 2, 1... 🐰`,
    INSTAGRAM_HANDLE: "@mochi.soyminiloop",
    INSTAGRAM_URL: "https://www.instagram.com/mochi.soyminiloop",
    ACADEMY: "IT Academy",
  }
} as const;