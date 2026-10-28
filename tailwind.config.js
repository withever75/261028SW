/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 짙은 남색 포인트 색상
        navy: { 50: '#eef2f8', 100: '#d9e2f0', 700: '#1f3a6e', 800: '#162b55', 900: '#0f1f3d' },
      },
      fontFamily: {
        sans: ['Pretendard', '"Apple SD Gothic Neo"', '"Noto Sans KR"', '"Malgun Gothic"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
