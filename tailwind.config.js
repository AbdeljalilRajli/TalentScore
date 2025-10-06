/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette - exact values provided
        cream: {
          50: '#fefcfa',
          100: '#fdf9f4',
          200: '#fbf3e9',
          300: '#f8edde',
          400: '#f7e7d3',
          500: '#F5EFE6', // Main cream color
          600: '#ddd7ce',
          700: '#b8b3ab',
          800: '#938f88',
          900: '#787570',
        },
        beige: {
          50: '#faf8f3',
          100: '#f5f1e7',
          200: '#ebe3d0',
          300: '#e1d5b9',
          400: '#eee7d7',
          500: '#E8DFCA', // Main beige color
          600: '#d1c9b6',
          700: '#aea798',
          800: '#8b857a',
          900: '#726d64',
        },
        ocean: {
          50: '#f2f6fb',
          100: '#e6edf7',
          200: '#c0d2eb',
          300: '#9ab7df',
          400: '#8aa5d5',
          500: '#6D94C5', // Main ocean blue
          600: '#6285b1',
          700: '#526f94',
          800: '#425977',
          900: '#364962',
        },
        sky: {
          50: '#f7fbfe',
          100: '#eff7fd',
          200: '#d7ebfa',
          300: '#bfdef7',
          400: '#d6e8f5',
          500: '#CBDCEB', // Main sky blue
          600: '#b7c6d4',
          700: '#99a5b0',
          800: '#7b848c',
          900: '#656d73',
        },
        // Enhanced neutrals for better contrast
        neutral: {
          50: '#fafbfc',
          100: '#f4f6f8',
          300: '#d6dce3',
          400: '#b8c2cc',
          500: '#9aa4b0',
          600: '#7c8691',
          700: '#5f6b76',
          800: '#4a545e',
          900: '#363d45',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'large': '0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 2px 10px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 20px rgba(79, 70, 229, 0.3)',
        'glow-accent': '0 0 20px rgba(16, 185, 129, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
