/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Red Palette (warm, empathetic, accessible)
        red: {
          50: '#FEF2F2',   // Very light red (backgrounds, hover states)
          100: '#FEE2E2',  // Light red (accents, borders)
          200: '#FECACA',  // Soft red
          300: '#FCA5A5',  // Medium red (secondary accents)
          400: '#F87171',  // Bright red
          500: '#EF4444',  // Standard red
          600: '#DC2626',  // Primary red (buttons, headers)
          700: '#B91C1C',  // Dark red (hover states)
          800: '#991B1B',  // Very dark red (deep accents)
          900: '#7F1D1D',  // Almost black red
        },
        // Semantic color aliases
        primary: {
          light: '#FEE2E2',
          DEFAULT: '#DC2626',
          dark: '#991B1B',
        },
        accent: {
          light: '#FCA5A5',
          DEFAULT: '#EF4444',
          dark: '#B91C1C',
        },
      },
      // Gradient utilities
      backgroundImage: {
        'gradient-red-primary': 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
        'gradient-red-soft': 'linear-gradient(135deg, #FEE2E2 0%, #FCA5A5 100%)',
        'gradient-red-warm': 'linear-gradient(to right, #DC2626, #EF4444, #F87171)',
      },
      // Box shadows with red tint
      boxShadow: {
        'red-sm': '0 1px 2px 0 rgba(220, 38, 38, 0.05)',
        'red-md': '0 4px 6px -1px rgba(220, 38, 38, 0.1)',
        'red-lg': '0 10px 15px -3px rgba(220, 38, 38, 0.1)',
        'red-xl': '0 20px 25px -5px rgba(220, 38, 38, 0.1)',
      },
      // Ring colors (for focus states)
      ringColor: {
        DEFAULT: '#DC2626',
        secondary: '#EF4444',
      },
      // Transition timing (smooth, empathetic)
      transitionDuration: {
        DEFAULT: '300ms',
      },
      // Typography
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        serif: ['Georgia', 'serif'],
        mono: ['"Roboto Mono"', 'monospace'],
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
      },
      // Spacing (for consistent rhythm)
      spacing: {
        gutter: '1.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    // Custom plugin for focus rings
    function ({ addUtilities }) {
      addUtilities({
        '.focus-ring': {
          '@apply outline-none ring-2 ring-offset-2 ring-red-600': {},
        },
      });
    },
  ],
};
