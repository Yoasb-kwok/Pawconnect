/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 三色貓主題配色系統 (Calico Cat Color Palette)
        // 主色調：白色、橙色、黑色 - 現代化設計
        calico: {
          // 白色系 - 純淨背景
          white: {
            50: '#FFFFFF',
            100: '#FAFAFA',
            200: '#F5F5F5',
            300: '#F0F0F0',
            400: '#E8E8E8',
            500: '#E0E0E0',
          },
          // 橙色系 - 溫暖肉球色（三色貓的橙色斑塊）
          orange: {
            50: '#FFF8F0',
            100: '#FFE8D1',
            200: '#FFD4A3',
            300: '#FFB870',
            400: '#FF9A3C',
            500: '#FF8C42', // 主橙色 - 三色貓橙色
            600: '#E67E38',
            700: '#CC6F2E',
            800: '#B36024',
            900: '#99511A',
          },
          // 黑色/深灰系 - 三色貓的黑色斑塊
          black: {
            50: '#F5F5F5',
            100: '#E0E0E0',
            200: '#BDBDBD',
            300: '#9E9E9E',
            400: '#757575',
            500: '#4A4A4A', // 主黑色 - 三色貓黑色
            600: '#3A3A3A',
            700: '#2C2C2C',
            800: '#1E1E1E',
            900: '#0F0F0F',
          },
          // 肉球粉 - 柔和的肉球色
          paw: {
            50: '#FFF5F5',
            100: '#FFE8E8',
            200: '#FFD1D1',
            300: '#FFB3B3',
            400: '#FF8A8A',
            500: '#FF6B6B', // 主肉球粉
            600: '#FF5252',
            700: '#E63946',
          },
        },
        // 保留原有分類顏色（用於功能區分）
        dog: {
          50: '#FFF4E6',
          100: '#FFE0B2',
          200: '#FFCC80',
          300: '#FFB74D',
          400: '#FFA726',
          500: '#FF8C42', // 使用三色貓橙色
          600: '#E67E38',
          700: '#F57C00',
        },
        cat: {
          50: '#F5F5F5',
          100: '#E0E0E0',
          200: '#BDBDBD',
          300: '#9E9E9E',
          400: '#757575',
          500: '#4A4A4A', // 使用三色貓黑色
          600: '#3A3A3A',
          700: '#2C2C2C',
        },
        other: {
          50: '#E3F2FD',
          100: '#BBDEFB',
          200: '#90CAF9',
          300: '#64B5F6',
          400: '#42A5F5',
          500: '#2196F3',
          600: '#1E88E5',
          700: '#1976D2',
        },
        bird: {
          50: '#FFFDE7',
          100: '#FFF9C4',
          200: '#FFF59D',
          300: '#FFF176',
          400: '#FFEE58',
          500: '#FFEB3B',
          600: '#FDD835',
          700: '#FBC02D',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
