/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pastel-pink': {
          50: '#fef5f9',
          100: '#fde9f3',
          200: '#fcd3e7',
          300: '#fab0d4',
          400: '#f77eb8',
          500: '#f06ba0',
          600: '#e03d7d',
          700: '#c12862',
          800: '#a02451',
          900: '#852347',
        },
        'pastel-yellow': {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
      },
    },
  },
  plugins: [],
}