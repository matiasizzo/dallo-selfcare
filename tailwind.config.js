/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content.ts',
  ],
  theme: {
    extend: {
      colors: {
        // ── Verde Salvia (Calma) ─────────────────────────────────────
        brand: {
          50:  '#eef3ee',
          100: '#d5e2d6',
          200: '#adc5af',
          300: '#83a886',
          400: '#5d8c61',
          500: '#3d6045',   // base — Verde Salvia
          600: '#355539',
          700: '#2c472f',
          800: '#213525',
          900: '#16231a',
          950: '#0b130e',
        },
        // ── Terracota (Vitalidad) ────────────────────────────────────
        terra: {
          50:  '#fbf4f0',
          100: '#f5e4db',
          200: '#ecc9b8',
          300: '#e0a98e',
          400: '#d49070',
          500: '#c4876a',   // base — Terracota
          600: '#b06e52',
          700: '#935840',
          800: '#754531',
          900: '#5a3425',
        },
        // ── Crema / Luz ──────────────────────────────────────────────
        cream: {
          50:  '#fdfcfa',
          100: '#f9f7f3',
          200: '#f5f2ec',   // base — fondo principal
          300: '#ede9e0',
          400: '#ddd8cc',
          500: '#ccc5b6',
        },
        // ── Carbón / Estructura ──────────────────────────────────────
        carbon: {
          50:  '#f3f3f3',
          100: '#e0e0e0',
          200: '#c2c2c2',
          300: '#a3a3a3',
          400: '#737373',
          500: '#525252',
          700: '#363636',
          800: '#2a2a2a',
          900: '#1e1e1e',   // base — Carbón
          950: '#121212',
        },
      },
      fontFamily: {
        sans:  ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
