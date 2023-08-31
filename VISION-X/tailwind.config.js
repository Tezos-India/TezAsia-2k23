var {blue} = require('tailwindcss/colors')
/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode:"class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: 'Sora'
    },
    extend: {
      colors:{
        "primary": blue,
      },
     
    },
  },
  plugins: [],
}
