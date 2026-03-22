/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          blue: '#2563eb',
          'blue-deep': '#1e3a8a',
          green: '#22c55e',
          'green-bright': '#4ade80',
          teal: '#0d9488',
        },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 45%, #0d9488 75%, #22c55e 100%)',
        'gradient-hero': 'linear-gradient(135deg, #172554 0%, #2563eb 50%, #16a34a 100%)',
        'gradient-soft': 'linear-gradient(180deg, rgba(37,99,235,0.12) 0%, rgba(34,197,94,0.08) 100%)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(37, 99, 235, 0.35)',
        'glow-green': '0 0 40px rgba(34, 197, 94, 0.35)',
        card: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2.5s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s ease-in-out infinite',
        'spin-slow': 'spin 1.2s linear infinite',
        'whatsapp-attn': 'whatsappAttn 1.15s ease-in-out 3',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(34, 197, 94, 0.45)' },
          '50%': { opacity: '0.95', boxShadow: '0 0 0 16px rgba(34, 197, 94, 0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        whatsappAttn: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' },
          '50%': { transform: 'scale(1.06)', boxShadow: '0 0 0 10px rgba(34, 197, 94, 0.25)' },
        },
      },
    },
  },
  plugins: [],
};
