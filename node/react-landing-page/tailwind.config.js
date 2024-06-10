/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1B1B1C',
        secondary: '#DD7740',
        grayBg: '#343434',
        cardBg: '#F3EBE7',
        inputBorder: '#D5D5D5'
      },
      boxShadow: {
        'shadow-card': '0 10px 30px 0 rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}

