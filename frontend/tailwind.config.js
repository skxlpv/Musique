/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.7s ease-in',
      },

      colors: {
        border: {
          DEFAULT: "#303030",
          hover: "#404040"
        },
        foreground: {
          DEFAULT: "#ffffff",
          muted: "#a0a0a0"
        },
        background: {
          DEFAULT: "#000000",
          secondary: "#111111",
          tertiary: "#222222"
        },
        primary: {
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          900: "#1e3a8a"
        },
        success: "#22c55e",
        error: "#ef4444",
        warning: {
          DEFAULT: "#f59e0b",
          light: "#0c0a04"
        },
        info: "#0ea5e9",
        accent: {
          purple: "#8b5cf6",
          blue: "#3b82f6",
          teal: "#14b8a6",
          amber: "#f59e0b"
        }
      }
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    }
  },
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
  preflight: true
}