/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#6366f1',
          600: '#5856eb',
          700: '#4f46e5',
          900: '#312e81',
        },
        secondary: {
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        accent: {
          500: '#f59e0b',
          600: '#d97706',
        },
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          500: '#64748b',
          600: '#475569',
          900: '#0f172a',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'vote': 'vote 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 0.5s ease-out',
      },
      keyframes: {
        vote: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' }
        },
        bounceGentle: {
          '0%, 20%, 53%, 80%, 100%': { transform: 'translateY(0)' },
          '40%, 43%': { transform: 'translateY(-8px)' },
          '70%': { transform: 'translateY(-3px)' }
        }
      }
    },
  },
  plugins: [],
}