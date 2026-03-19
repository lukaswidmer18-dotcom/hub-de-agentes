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
        // Paleta do PRD
        primary: {
          DEFAULT: '#1F6FEB',
          dark: '#1557C7',
          light: '#4B8FF7',
        },
        secondary: {
          DEFAULT: '#2FD2C9',
          dark: '#26B3AB',
          light: '#5DDDD7',
        },
        accent: {
          DEFAULT: '#FFC857',
          dark: '#E6B34E',
          light: '#FFD98C',
        },
        neutral: {
          900: '#101820',
          700: '#4B5563',
          500: '#9CA3AF',
          300: '#D1D5DB',
          100: '#F7FAFC',
        },
        error: '#FF4D4F',
        success: '#32D583',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.36s cubic-bezier(0.22, 1, 0.36, 1)',
        'slide-up': 'slideUp 0.36s cubic-bezier(0.22, 1, 0.36, 1)',
        'breathe': 'breathe 3.2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scaleY(1) translateY(0)' },
          '50%': { transform: 'scaleY(1.012) translateY(-1.5px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
