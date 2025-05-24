/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f0ff',
          100: '#cce0ff',
          200: '#99c2ff',
          300: '#66a3ff',
          400: '#3385ff',
          500: '#0066ff',
          600: '#0052cc',
          700: '#003d99',
          800: '#002966',
          900: '#001433',
        },
        secondary: {
          50: '#f0f4f9',
          100: '#e1e9f2',
          200: '#c3d3e6',
          300: '#a5bed9',
          400: '#87a8cd',
          500: '#6992c0',
          600: '#5475a3',
          700: '#405886',
          800: '#2b3b5a',
          900: '#171d2d',
        },
        success: {
          500: '#198754',
        },
        danger: {
          500: '#DC3545',
        },
        warning: {
          500: '#FFC107',
        },
        info: {
          500: '#0DCAF0',
        },
        gray: {
          50: '#F4F7F9',
          100: '#EDF2F7',
          200: '#E2E8F0',
          300: '#CBD5E0',
          400: '#A0AEC0',
          500: '#718096',
          600: '#4A5568',
          700: '#2D3748',
          800: '#1A202C',
          900: '#171923',
        },
      },
      fontFamily: {
        sans: ['Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 6px rgba(0, 0, 0, 0.08)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #0D6EFD, #0052D4)',
      },
    },
  },
  plugins: [],
};