/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 짙은 남색 포인트 색상
        navy: { 50: '#eef4ff', 100: '#dbe7ff', 700: '#2f54d6', 800: '#2443b3', 900: '#1b2f80' },
        accent: { 100: '#ccfbf1', 500: '#14b8a6', 700: '#0f766e' },
      },
      fontFamily: {
        sans: ['Pretendard', '"Apple SD Gothic Neo"', '"Noto Sans KR"', '"Malgun Gothic"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
