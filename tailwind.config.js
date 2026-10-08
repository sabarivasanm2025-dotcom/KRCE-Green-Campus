/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#030d08',
          900: '#051810',
          850: '#072418',
          800: '#0b3222',
          700: '#0f4831',
          600: '#146042',
          500: '#1a7d57',
        },
        emerald: {
          glow: '#10b981',
          subtle: '#059669',
        },
        lime: {
          accent: '#a3e635',
          neon: '#bef264',
          soft: '#d9f99d',
        },
        charcoal: {
          900: '#0a0d0c',
          800: '#121714',
          700: '#1a221d',
          600: '#26312a',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Outfit', 'Cabinet Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'forest-gradient': 'linear-gradient(180deg, #030d08 0%, #072418 50%, #030d08 100%)',
        'glass-glow': 'radial-gradient(circle at 50% 0%, rgba(163, 230, 53, 0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'glow-lime': '0 0 35px -5px rgba(163, 230, 53, 0.3)',
        'glow-emerald': '0 0 40px -8px rgba(16, 185, 129, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-card': '0 20px 40px -15px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'spin-very-slow': 'spin 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
