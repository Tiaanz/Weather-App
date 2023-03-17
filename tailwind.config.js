/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      header: ['Lobster'],
      quote: ['Kalam'],
    },
    screens: {
      'vsm': '426px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
    },
    extend: {
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}
