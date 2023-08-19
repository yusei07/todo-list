/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './dist/**/*.{html,js}',
    './src/**/*.{html,js}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter'],
      },
      colors: {
        semiBlack: '#1E1E1E',
        semiGray: '#E2E2E1',
        white: '#FDFDFD',
        semiPink: '#C8A0D7',
        softGreen: '#D0DDDB'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
  ],
}
