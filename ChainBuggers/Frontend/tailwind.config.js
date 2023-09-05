/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
      },
      colors: {
        white: "#fff",
        darkslateblue: {
          100: "#11315b",
          200: "#21204a",
        },
        lightsteelblue: "#bdcadb",
        aliceblue: "#f0f6ff",
        gray: {
          100: "#fafcff",
          200: "#7d7d7d",
          300: "#232323",
          400: "#18171a",
          500: "#0e0f15",
          600: "rgba(26, 20, 47, 0.8)",
          700: "rgba(255, 255, 255, 0.5)",
          800: "rgba(255, 255, 255, 0.3)",
          900: "rgba(255, 255, 255, 0.25)",
          1000: "rgba(255, 255, 255, 0.6)",
          1100: "rgba(255, 255, 255, 0.58)",
          1200: "rgba(255, 255, 255, 0.22)",
          1300: "rgba(255, 255, 255, 0.1)",
        },
        blueviolet: "#6851ff",
        dimgray: {
          100: "#717171",
          200: "#6c6c6c",
          300: "#5d5d5f",
        },
        whitesmoke: {
          100: "#eff1f3",
          200: "#eee",
        },
        gold: "#ffc610",
        orange: "#ffa426",
        mediumseagreen: {
          100: "#4abd5d",
          200: "#00a665",
        },
        darkslategray: "#333",
        darkorange: "#e48b07",
        black: "#000",
        darkgray: "#999",
        "neutral-2-03": "#9d9bb9",
      },
      fontFamily: {
        "mynft-caption": "Poppins",
        roboto: "Roboto",
        oxanium: "Oxanium",
        inter: "Inter",
        "montserrat": "Montserrat"
      },
    },
    fontSize: {
      sm: "0.88rem",
      base: "1rem",
      "2xl": '1.2rem',
      "3xl": '1.3rem',
      "4xl": '1.4rem',
      "5xl": "1.5rem",
      xs: "0.75rem",
      lg: "1.13rem",
      "21xl": "2.5rem",
      "3xs": "0.63rem",
      "5xs": "0.5rem",
    },
  },

};