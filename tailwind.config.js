/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  theme: {
    extend: {

      colors: {
        primary: '#35674B',
        secondary: {
          DEFAULT: '#3d7697',
          100: '#C51297',
          200: '#831266',
        },
        tertiary: '#a83e6a'


      },



      fontFamily: {
        'work-medium': [ 'WorkSansMedium', 'sans-serif' ],
        'work-black': ['WorkSansBlack', 'sans-serif'],
      }


    },
  },
  plugins: [],
}