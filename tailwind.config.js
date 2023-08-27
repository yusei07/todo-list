/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
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
        softGreen: '#D0DDDB',
        secondary: '#a2a29f'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/forms")
  ],
  daisyui: {
    themes: false,
    darkTheme: "dark",
    base: false,
    styled: true,
    utils: true,
    rtl: false,
    prefix: "",
    logs: true,
  },
}
