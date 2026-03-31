/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      colors: {
        wallet: {
          bg: '#1b1c1e',
          card: '#2a2b2f',
          purple: '#c6b5f9',
          yellow: '#f8d57e',
          cream: '#fcf2db',
          dark: '#121212',
          text: '#ffffff',
          muted: '#8a8a8e',
        }
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      animation: {
        'scan': 'scan 3s ease-in-out infinite',
        'line-draw': 'line-draw 2s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%, 100%': { top: '0%' },
          '50%': { top: '100%' },
        },
        'line-draw': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
