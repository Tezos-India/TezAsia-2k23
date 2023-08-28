/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bgBlack: '#101010',
        themePink: '#CF46E5',
        DarkPink: '#9B32AD',
        themeBlue: '#7C9BEA',
        darkBlue: '#152C67',
        footerGray: '#5A535B',
        cardGray: '#272525',
        inputGray: '#313131',
        disabledGray: '#858080',
        lightGray: '#7D7C7D',
        activeGreen: '#5CEBC9',
        tableBlue: '#141624',
      },
      backgroundImage: {
        primaryGradient:
          'bg-gradient-to-r from-themePink via-themeBlue to-activeGreen',
        secondaryGradient: 'bg-gradient-to-r from-themePink to-themeBlue',
        landingSec2: "url('/src/assets/images/landingSec2Bg.jpg')",
        landingSec4: "url('/src/assets/images/etherlinkImage.jpg')"
      },
      fontFamily: {
        primary: ['Nunito', 'Helvetica', 'Arial', 'sans-serif'],
        secondary: ['Righteous', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        base: [
          '1rem',
          {
            lineHeight: '1.5rem',
          },
        ],
        h1: [
          '3.2rem',
          {
            lineHeight: '2.25rem',
            letterSpacing: '-0.02em',
          },
        ],
        h2: [
          '2.25rem',
          {
            lineHeight: '2.25rem',
            letterSpacing: '-0.02em',
          },
        ],
        h3: [
          '1.5rem',
          {
            lineHeight: '2.25rem',
            letterSpacing: '-0.02em',
          },
        ],
        h4: [
          '1.25rem',
          {
            lineHeight: '2.25rem',
            letterSpacing: '-0.02em',
          },
        ],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['dark'], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: 'dark', // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    logs: false,
  },
}
