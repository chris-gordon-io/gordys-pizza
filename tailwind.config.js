/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FBF8EF',
        crimson: {
          DEFAULT: '#A82938',
          dark: '#7E1822',
          light: '#F6DADD',
        },
        teal: {
          DEFAULT: '#0E2C35',
          mid: '#194D5D',
        },
      },
      fontFamily: {
        logo: ['"Alfa Slab One"', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        condensed: ['"Avenir Next Condensed"', '"Avenir Next"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Avenir Next"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'logo-rise': {
          '0%': { transform: 'translateY(60vh)', opacity: '0' },
          '60%': { opacity: '1' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'letter-settle': {
          '0%, 70%': { transform: 'translateY(var(--rise, 0))' },
          '85%': { transform: 'translateY(calc(var(--curve, 0) - 4px))' },
          '100%': { transform: 'translateY(var(--curve, 0))' },
        },
      },
      animation: {
        'logo-rise': 'logo-rise 1100ms cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
    },
  },
  plugins: [],
}
