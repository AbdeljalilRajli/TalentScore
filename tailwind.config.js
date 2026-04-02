/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // Light theme neutral scale
        neutral: {
          50: '#FAFAFA',     // Lightest - main background
          100: '#F5F5F5',    // Card backgrounds
          200: '#EBEBEB',    // Borders light
          300: '#E0E0E0',    // Borders
          400: '#BDBDBD',    // Disabled
          500: '#9E9E9E',    // Muted text
          600: '#757575',    // Secondary text
          700: '#616161',    // Body text
          800: '#424242',    // Strong text
          900: '#212121',    // Headings
          950: '#121212',    // Darkest
        },
        // Primary - Teal Blue from palette #487A91
        primary: {
          50: '#EDF4F7',
          100: '#D1E3EB',
          200: '#A8C9D6',
          300: '#7CAFC0',
          400: '#5A93A8',
          500: '#487A91',    // Main primary color
          600: '#3D6477',
          700: '#31525E',
          800: '#263F48',
          900: '#1A2C32',
          950: '#0F1A1D',
        },
        // Secondary - Dark Teal #1D4F6A
        secondary: {
          50: '#E8F1F5',
          100: '#C5DBE5',
          200: '#9BC1D2',
          300: '#71A7BF',
          400: '#4D8DAA',
          500: '#1D4F6A',    // Main secondary color
          600: '#194558',
          700: '#143947',
          800: '#0F2C37',
          900: '#0A1F27',
          950: '#051217',
        },
        // Tertiary - Warm Beige #BAA286
        tertiary: {
          50: '#FAF7F2',
          100: '#F2EBDF',
          200: '#E8DCC4',
          300: '#D9C8A8',
          400: '#CAB58E',
          500: '#BAA286',    // Main tertiary color
          600: '#9E886B',
          700: '#826E56',
          800: '#665541',
          900: '#4A3D2F',
          950: '#2E261D',
        },
        // Success - Soft green
        success: {
          50: '#F0F9F4',
          100: '#D1F0DB',
          200: '#A8E0BD',
          300: '#78CF9A',
          400: '#4BB87D',
          500: '#2F9A62',
          600: '#247A4D',
          700: '#1B5C3A',
          800: '#13402A',
          900: '#0B2619',
        },
        // Error - Soft rose
        error: {
          50: '#FDF2F2',
          100: '#F9D8D8',
          200: '#F4B8B8',
          300: '#EC8F8F',
          400: '#E25E5E',
          500: '#D64545',
          600: '#B93636',
          700: '#962C2C',
          800: '#702121',
          900: '#4A1616',
        },
        // Warning - Soft amber
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        // Legacy aliases for backward compatibility during transition
        wallet: {
          bg: '#FAFAFA',
          card: '#FFFFFF',
          purple: '#487A91',
          yellow: '#BAA286',
          cream: '#F5F5F5',
          dark: '#212121',
          text: '#212121',
          muted: '#757575',
        }
      },
      borderRadius: {
        'sm': '6px',
        'DEFAULT': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
      },
      boxShadow: {
        'soft': '0 1px 3px -1px rgba(0, 0, 0, 0.06), 0 2px 6px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 12px -4px rgba(0, 0, 0, 0.08), 0 2px 8px -2px rgba(0, 0, 0, 0.04)',
        'strong': '0 8px 24px -8px rgba(0, 0, 0, 0.12), 0 4px 12px -4px rgba(0, 0, 0, 0.06)',
        'glow': '0 0 20px -4px rgba(72, 122, 145, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      }
    },
  },
  plugins: [],
}
