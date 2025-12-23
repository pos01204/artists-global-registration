import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // idus 브랜드 컬러 (idus-orange 형태)
        idus: {
          orange: '#FF6F00',
          'orange-light': '#FFE0B2',
          'orange-dark': '#E65100',
          black: '#212121',
          'black-90': 'rgba(33, 33, 33, 0.9)',
          'black-70': 'rgba(33, 33, 33, 0.7)',
          'black-50': 'rgba(33, 33, 33, 0.5)',
          'black-20': 'rgba(33, 33, 33, 0.2)',
          'black-10': 'rgba(33, 33, 33, 0.1)',
          white: '#FFFFFF',
          gray: '#F5F5F5',
          'gray-dark': '#9E9E9E',
        },
        // idusOrange 형태도 지원
        idusOrange: {
          DEFAULT: '#FF6F00',
          10: 'rgba(255, 111, 0, 0.1)',
          20: 'rgba(255, 111, 0, 0.2)',
          light: '#FFE0B2',
          dark: '#E65100',
        },
      },
      fontFamily: {
        pretendard: [
          'Pretendard Variable',
          'Pretendard',
          'SUITE Variable',
          'system-ui',
          'sans-serif',
        ],
        suite: ['SUITE Variable', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-soft': 'bounceSoft 2s infinite',
        'pulse-soft': 'pulseSoft 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

