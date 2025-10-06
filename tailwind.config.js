/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Remapped semantic palette to user's requested colors
        // ocean -> primary teal-blue #26667F
        ocean: {
          50: '#f0f5f8',
          100: '#d9e6ed',
          200: '#b3ccd9',
          300: '#86aabb',
          400: '#5e8798',
          500: '#3f6f82',
          600: '#26667F', // primary
          700: '#1f566c',
          800: '#194557',
          900: '#143846',
        },
        // sage -> accent green #67C090
        sage: {
          50: '#ecf9f2',
          100: '#d9f3e6',
          200: '#b8e7d1',
          300: '#92daba',
          400: '#78cfa7',
          500: '#67C090', // accent
          600: '#57a67b',
          700: '#458764',
          800: '#356a50',
          900: '#2a5440',
        },
        // sky -> mint light #DDF4E7
        sky: {
          50: '#f6fcf9',
          100: '#eefaf4',
          200: '#DDF4E7', // light brand
          300: '#c7ead7',
          400: '#a9dcc3',
          500: '#8ecfb1',
          600: '#72b999',
          700: '#5e9d82',
          800: '#4e826c',
          900: '#406a58',
        },
        // cream -> complementary soft neutral derived from the mint tone
        cream: {
          50: '#f8fdfb',
          100: '#f0fbf6',
          200: '#e7f7ef',
          300: '#DDF4E7',
          400: '#cdebdc',
          500: '#bfe0d0',
          600: '#9ec9b5',
          700: '#7eac98',
          800: '#648c7b',
          900: '#506f62',
        },
        // Enhanced neutrals for better contrast (unchanged)
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
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Poppins', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Poppins', 'system-ui', 'sans-serif'],
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
