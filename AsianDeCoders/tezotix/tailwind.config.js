/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            borderWidth: {
                primary: 1
            },
            borderColor: {
                primary: "rgba(255, 255, 255, 0.2)",
                secondary: "rgba(255, 255, 255, 0.3)"
            },
            borderRadius: {
                10: "10px",
                20: "20px",
                30: "30px",
                40: "40px",
                50: "50px",
            },
            padding: {
                10: "10px",
                15: "15px",
                20: "20px",
                25: "25px",
                30: "30px",
                35: "35px",
                40: "40px",
                45: "45px",
                50: "50px",
            },
            margin: {
                10: "10px",
                15: "15px",
                20: "20px",
                25: "25px",
                30: "30px",
                35: "35px",
                40: "40px",
                45: "45px",
                50: "50px",
            },
            colors: {
                primaryBg: "#0A0B0D",
                secondaryBg: "#191B20",
                lightGray: "#979797",
                darkGray: "rgba(255, 255, 255, 0.1)",
                white10: "rgba(255, 255, 255, 0.1)",
                white50: "rgba(255, 255, 255, 0.5)",
                white66: "rgba(255, 255, 255, 0.66)",
                white70: "rgba(255, 255, 255, 0.70)",
                white75: "rgba(255, 255, 255, 0.75)",
                white80: "rgba(255, 255, 255, 0.8)",
                white90: "rgba(255, 255, 255, 0.9)",
                green: "#3C775A",
                yellow: "#F9D852"
            },
            fontFamily: {
                primary: ["Space Grotesk"],
                poppins: ["Poppins"]
            },
            backgroundImage: {
                primaryGradient: "linear-gradient(132deg, #F7C0EC 0%, #A7BDEA 100%)",
                secondaryGradient: "linear-gradient(132deg, #FF5137 0%, #FD16D5 100%)",
                blackToTrans: "linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.00) 100%)",
            },
        }
    },
    plugins: [
        require('@tailwindcss/line-clamp')
    ],
}