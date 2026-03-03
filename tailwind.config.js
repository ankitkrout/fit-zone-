/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',      // Blue from logo
        primaryLight: '#60A5FA',
        secondary: '#F97316',    // Orange from logo
        secondaryLight: '#FB923C',
        dark: '#0F172A',        // Dark Navy from logo
        darkLight: '#1E293B',
        darkCard: '#1E293B',
        darkBorder: '#334155',
        // Legacy colors (kept for compatibility)
        primaryLegacy: '#ff1a1a',
        primaryDarkLegacy: '#d60000',
        darkLegacy: '#111111',
        darkLightLegacy: '#1a1a1a',
        darkCardLegacy: '#181818',
        darkBorderLegacy: '#222222',
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

