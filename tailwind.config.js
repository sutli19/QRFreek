/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand tokens — "signal" palette: deep ink + electric violet + scan-line cyan
        ink: {
          950: '#070A12',
          900: '#0B0F1A',
          800: '#121728',
          700: '#1A2036',
          600: '#252C47',
          500: '#4A5272',
          400: '#6B7390',
          300: '#9AA1B8',
        },
        haze: {
          50: '#F6F7FB',
          100: '#EEF1F8',
          200: '#E3E7F3',
        },
        signal: {
          50: '#F1EEFE',
          100: '#E4DCFD',
          300: '#B6A3FB',
          400: '#8E76F7',
          500: '#6C5CE7',
          600: '#5645D6',
          700: '#4534B0',
        },
        scan: {
          400: '#3DEBD4',
          500: '#00D9C0',
          600: '#00B3A0',
        },
        bloom: {
          400: '#FF8FB3',
          500: '#FF6B9D',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(15, 17, 35, 0.18)',
        'glass-lg': '0 20px 60px -10px rgba(15, 17, 35, 0.35)',
        'glow-signal': '0 0 40px -5px rgba(108, 92, 231, 0.45)',
        'glow-scan': '0 0 30px -2px rgba(0, 217, 192, 0.4)',
        'inner-glass': 'inset 0 1px 0 0 rgba(255,255,255,0.12)',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      keyframes: {
        blobMove: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -40px) scale(1.08)' },
          '66%': { transform: 'translate(-20px, 25px) scale(0.95)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        toastIn: {
          '0%': { opacity: '0', transform: 'translateY(-12px) scale(0.96)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseRing: {
          '0%': { boxShadow: '0 0 0 0 rgba(0, 217, 192, 0.45)' },
          '70%': { boxShadow: '0 0 0 12px rgba(0, 217, 192, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(0, 217, 192, 0)' },
        },
      },
      animation: {
        blob: 'blobMove 14s ease-in-out infinite',
        'blob-slow': 'blobMove 20s ease-in-out infinite',
        scanline: 'scanline 2.2s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'pop-in': 'popIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'toast-in': 'toastIn 0.32s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        shimmer: 'shimmer 2.5s linear infinite',
        'pulse-ring': 'pulseRing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
