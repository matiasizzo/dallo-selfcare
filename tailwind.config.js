/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f0f9f6',
          100: '#dcf1ea',
          200: '#bbe3d6',
          300: '#8dcebb',
          400: '#59b49a',
          500: '#379880',
          600: '#297a68',
          700: '#236254',
          800: '#1f4f44',
          900: '#1c4239',
          950: '#0a2520',
        },
        skin: {
          50:  '#fdf8f4',
          100: '#faeee5',
          200: '#f4dacc',
          300: '#ecbfa9',
          400: '#e09b7e',
          500: '#d47d5a',
          600: '#c4633f',
          700: '#a44f32',
          800: '#87422d',
          900: '#6f3828',
        },
        neutral: {
          50:  '#f9f9f9',
          100: '#f3f3f3',
          200: '#e8e8e8',
          800: '#1e1e1e',
          900: '#111111',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
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
