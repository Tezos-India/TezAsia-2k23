/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': "['ui-sans-serif', 'system-ui', ...]",
      'serif': "['ui-serif', 'Georgia', ...]",
      'mono': "['ui-monospace', 'SFMono-Regular', ...]",
      'display': "['Oswald', ...]",
      
    },
    extend: {
      fontFamily:{
        primary:'MyFont',
        secondary:'paragraph',
        nunito: ['nunito', 'sans-serif'],
        montserrat:['Montserrat','sans-serif']
      }
    },
  },
  plugins: [],
}

//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
    
//     extend: {},
//   },
//   plugins: [],
// }